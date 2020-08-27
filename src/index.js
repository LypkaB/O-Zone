'use strict';

let checkbox = document.querySelectorAll('.filter-check_checkbox');
const btnCart = document.querySelector('#cart'),
      modalCart = document.querySelector('.cart'),
      closeModalCart = document.querySelector('.cart-close'),
      cards = document.querySelectorAll('.goods .card'),
      cartWrapper = document.querySelector('.cart-wrapper'),
      cartEmpty = document.querySelector('#cart-empty'),
      countGoods = document.querySelector('.counter');

/*<----- Checkbox ----->*/
function toggleCheckbox() {
    checkbox.forEach((item) => {
        item.addEventListener('change', function() {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
}

/*<----- Cart ----->*/
function toggleCart() {
    btnCart.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeModalCart.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
}

/*<----- Add/delete goods in cart ----->*/
function addRemoveCart() {
    cards.forEach((card) => {
        const btn = card.querySelector('button');

        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true),
                  removeBtn = cardClone.querySelector('.btn');

            cartWrapper.appendChild(cardClone);
            totalPrice();

            removeBtn.textContent = 'Remove from cart';
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                totalPrice();
            });
        });
    });

    /*<----- Show total price & badge ----->*/
    function totalPrice() {
        const cardsCart = cartWrapper.querySelectorAll('.card'),
              cardsPrice = cartWrapper.querySelectorAll('.card-price'),
              cartTotal = document.querySelector('.cart-total span');
        let sum = 0;

        countGoods.textContent = cardsCart.length;

        cardsPrice.forEach((cardPrice) => {
            let price = parseFloat(cardPrice.textContent);

            sum += price;
        });

        cartTotal.textContent = sum;

        if (cardsCart.length !== 0) {
            cartEmpty.remove();
        } else {
            cartWrapper.appendChild(cartEmpty);
        }
    }
}

/*<----- Filters and search ----->*/
function filterAndSearch() {
    const discountCheckbox = document.querySelector('#discount-checkbox'),
          min = document.querySelector('#min'),
          max = document.querySelector('#max');

    /*<----- Discount filter ----->*/
    discountCheckbox.addEventListener('click', () => {
        cards.forEach((card) => {
            if (discountCheckbox.checked) {
                if (!card.querySelector('.card-sale')) {
                    card.parentNode.style.display = 'none';
                }
            } else {
                card.parentNode.style.display = '';
            }
        });
    });

    /*<----- Price filter ----->*/
    function priceFilter() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price'),
                  price = parseFloat(cardPrice.textContent);

            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        })
    }

    min.addEventListener('change', priceFilter);
    max.addEventListener('change', priceFilter);
}

toggleCheckbox();
toggleCart();
addRemoveCart();
filterAndSearch();
