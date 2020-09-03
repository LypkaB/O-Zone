'use strict';

/*<----- Get data from DB  ----->*/
function getData() {
    const goodsWrapper = document.querySelector('.goods');

    return fetch('./assets/db.json')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('No data received, error is ' + response.status);
            }
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            console.warn(err);
            goodsWrapper.innerHTML = '<div class="error-message">Oppps...something went wrong</div>';
        });
}

/*<----- Cards goods  ----->*/
function renderCards(data) {
    const goodsWrapper = document.querySelector('.goods');

    data.goods.forEach(good => {
        const card = document.createElement('div');

        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `<div class="card" data-category="${good.category}">
        
                              ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
                              
                              <div class="card-img-wrapper">
                                  <span class="card-img-top"
                                        style="background-image: url('${good.img}')">
                                  </span>
                              </div>
                              
                              <div class="card-body justify-content-between">
                                  <div class="card-price${good.sale ? ' sale' : ''}">${good.price} $</div>
                                  <h5 class="card-title">${good.title}</h5>
                                  <button class="btn btn-primary">Add cart</button>
                              </div>
                          </div>`;

        goodsWrapper.appendChild(card);
    });
}

/*<----- Cart ----->*/
function toggleCart() {
    const cartBtn = document.querySelector('#cart'),
          modalCart = document.querySelector('.cart'),
          closeCartModal = document.querySelector('.cart-close');

    cartBtn.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeCartModal.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
}

/*<----- Add/delete goods in cart ----->*/
function addRemoveCart() {
    const cards = document.querySelectorAll('.goods .card'),
          cartWrapper = document.querySelector('.cart-wrapper'),
          cartEmpty = document.querySelector('#cart-empty'),
          countGoods = document.querySelector('.counter');

    cards.forEach(card => {
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

        cardsPrice.forEach(cardPrice => {
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

/*<----- Checkbox ----->*/
function toggleCheckbox() {
    const checkbox = document.querySelector('.filter-check_checkbox');

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            this.nextElementSibling.classList.add('checked');
        } else {
            this.nextElementSibling.classList.remove('checked');
        }
    });
}

/*<----- Search and filters  ----->*/
function searchAndFilters() {
    const cards = document.querySelectorAll('.goods .card'),
          search = document.querySelector('.search-wrapper_input'),
          searchBtn = document.querySelector('.search-btn'),
          min = document.querySelector('#min'),
          max = document.querySelector('#max'),
          discountCheckbox = document.querySelector('#discount-checkbox');

    /*<----- Search ----->*/
    function searchAction() {
        const searchText = new RegExp(search.value.trim(), 'i');

        cards.forEach(card => {
            const title = card.querySelector('.card-title');

            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });
    }

    search.addEventListener('keypress', e => {
        if (e.key === 'Enter') searchAction();
    });

    searchBtn.addEventListener('click', searchAction);

    /*<----- Price filter ----->*/
    function priceFilter() {
        cards.forEach(card => {
            const cardPrice = card.querySelector('.card-price'),
                  price = parseFloat(cardPrice.textContent);

            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });
    }

    min.addEventListener('change', priceFilter);
    max.addEventListener('change', priceFilter);

    /*<----- Discount filter ----->*/
    discountCheckbox.addEventListener('click', () => {
        cards.forEach(card => {
            if (discountCheckbox.checked) {
                if (!card.querySelector('.card-sale')) {
                    card.parentNode.style.display = 'none';
                }
            } else {
                card.parentNode.style.display = '';
            }
        });
    });
}

/*<----- Catalog  ----->*/
function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card'),
          categories = new Set(),
          catalogList = document.querySelector('.catalog-list'),
          catalogBtn = document.querySelector('.catalog-button'),
          catalogWrapper = document.querySelector('.catalog');

    cards.forEach(card => categories.add(card.dataset.category));

    categories.forEach(item => {
        const li = document.createElement('li');

        li.textContent = item;
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener('click', (e) => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }

        if (e.target.tagName === 'LI') {
            cards.forEach(card => {
                if (card.dataset.category === e.target.textContent) {
                    card.parentNode.style.display = '';
                } else {
                    card.parentNode.style.display = 'none';
                }
            });
        }
    });
}

getData().then(data => {
    renderCards(data);
    toggleCart();
    addRemoveCart();
    toggleCheckbox();
    searchAndFilters();
    renderCatalog();
});
