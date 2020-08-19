'use strict';

let checkbox = document.querySelectorAll('.filter-check_checkbox');
const btnCart = document.querySelector('#cart'),
      modalCart = document.querySelector('.cart'),
      closeModalCart = document.querySelector('.cart-close');

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
