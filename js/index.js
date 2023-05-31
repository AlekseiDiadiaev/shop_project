const featuredCards = document.querySelector('.featured__cards-wrapper')

getProducts().then(data => {
    featuredCards.innerHTML = getCardsHTML(data, 3)
});    
