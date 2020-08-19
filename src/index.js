'use strict';

let checkbox = document.querySelectorAll('.filter-check_checkbox');

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
