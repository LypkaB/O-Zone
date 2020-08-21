'use strict';

let checkbox = document.querySelectorAll('.filter-check_checkbox');
const btnCart = document.querySelector('#cart'),
      modalCart = document.querySelector('.cart'),
      closeModalCart = document.querySelector('.cart-close'),
      cards = document.querySelectorAll('.goods .card'),
      cartWrapper = document.querySelector('.cart-wrapper'),
      cartEmpty = document.querySelector('#cart-empty'),
      countGoods = document.querySelector('.counter');

/*<----- Check box ----->*/
checkbox.forEach((item) => {
    item.addEventListener('change', function() {
        if (this.checked) {
            this.nextElementSibling.classList.add('checked');
        } else {
            this.nextElementSibling.classList.remove('checked');
        }
    });
});

/*<----- Cart ----->*/
btnCart.addEventListener('click', () => {
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeModalCart.addEventListener('click', () => {
    modalCart.style.display = 'none';
    document.body.style.overflow = '';
});

/*<----- Add/delete goods in cart ----->*/
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
        })
    })
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
