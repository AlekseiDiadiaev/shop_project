const bagBtn = document.querySelector('.header__cart-btn');
      bag = document.querySelector('.bag');
      bagClose = document.querySelector('.bag__close')
      bagCardsWrapper = document.querySelector('.bag__cards-wrapper')
      bagTotalPrice = document.querySelector('.bag__total-price')
      bagSubmit = document.querySelector('.bag__submit')
      overlay = document.querySelector('.overlay')
      bagCounter = document.querySelector('.header__cart-counter')
      cardsWrapper = document.querySelector('.cards-wrapper');


setBagCounter(bagCounter);
//Bag

bagBtn.addEventListener('click' , () => {
    bag.classList.add('bag_visible');
    overlay.classList.add('overlay_visible');
    bagCardsWrapper.innerHTML = getBagCardsHTML(currentData);
    bagTotalPrice.innerHTML = getTotalBagPrice(currentData) ? 'Total: $' + getTotalBagPrice(currentData) : 'Total:';
})

bagClose.addEventListener('click' , () => {
    bag.classList.remove('bag_visible');
    overlay.classList.remove('overlay_visible');
})

overlay.addEventListener('click' , () => {
    bag.classList.remove('bag_visible');
    overlay.classList.remove('overlay_visible');
})

bagCardsWrapper.addEventListener('click', e => {
    
    if(e.target && e.target.classList.contains('bag-card__more-btn')) {
        id = e.target.getAttribute('data-bag-cart-id');
        changeNumOfProduct(1, id);
        bagCardsWrapper.innerHTML = getBagCardsHTML(currentData);
        bagTotalPrice.innerHTML = getTotalBagPrice(currentData) ? 'Total: $' + getTotalBagPrice(currentData) : 'Total:';
    }

    if(e.target && e.target.classList.contains('bag-card__less-btn')) {
        id = e.target.getAttribute('data-bag-cart-id');
        changeNumOfProduct(-1, id);
        bagCardsWrapper.innerHTML = getBagCardsHTML(currentData);
        bagTotalPrice.innerHTML = getTotalBagPrice(currentData) ? 'Total: $' + getTotalBagPrice(currentData) : 'Total:';
    }
    
    if(e.target && e.target.classList.contains('bag-card__remove')) {
        id = e.target.getAttribute('data-bag-cart-id');
        removeItemInBag(id)
        bagCardsWrapper.innerHTML = getBagCardsHTML(currentData);
        setBagCounter(bagCounter);
        bagTotalPrice.innerHTML = getTotalBagPrice(currentData) ? 'Total: $' + getTotalBagPrice(currentData) : 'Total:';
    }
})

bagSubmit.addEventListener('click', () => {
    clearBag();
    alert('Your order is accepted!');
    bagCardsWrapper.innerHTML = getBagCardsHTML(currentData);
    bagTotalPrice.innerHTML = getTotalBagPrice(currentData) ? 'Total: $' + getTotalBagPrice(currentData) : 'Total:';
    setBagCounter(bagCounter);
    bag.classList.remove('bag_visible');
    overlay.classList.remove('overlay_visible');
})




// Card
if(cardsWrapper){
    cardsWrapper.addEventListener('click', e => {
        if(e.target && e.target.classList.contains('card')){
           
            e.target.classList.add('card__anim')
            setTimeout(() => {
                e.target.classList.remove('card__anim')
            },700)
            const productId = e.target.id; 
    
            let jsonOldBag = localStorage.getItem('bag');
            let oldBag;
    
            if (!jsonOldBag) {
                oldBag = [{
                    id: productId,
                    count: 1
                }]
            } else {
                oldBag = JSON.parse(jsonOldBag)
                const index = oldBag.findIndex(item => item.id === productId)
    
                if(index === -1){
                    oldBag = [...oldBag, {
                        id: productId,
                        count: 1
                    }]
                } else {
                    oldBag[index].count++
                }
            }
            
            const jsonBag = JSON.stringify(oldBag);
            localStorage.setItem('bag', jsonBag);
    
            setBagCounter(bagCounter);
        }
    })
}



