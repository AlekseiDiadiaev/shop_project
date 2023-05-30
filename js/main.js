const bagBtn = document.querySelector('.header__cart-btn');
      bag = document.querySelector('.bag');
      bagClose = document.querySelector('.bag__close')
      overlay = document.querySelector('.overlay')

bagBtn.addEventListener('click' , () => {
    bag.classList.add('bag_visible');
    overlay.classList.add('overlay_visible');
})

bagClose.addEventListener('click' , () => {
    bag.classList.remove('bag_visible');
    overlay.classList.remove('overlay_visible');
})

overlay.addEventListener('click' , () => {
    bag.classList.remove('bag_visible');
    overlay.classList.remove('overlay_visible');
})

