const featuredCards = document.querySelector('.featured__cards-wrapper')

getCardsHTML(3).then(res => featuredCards.innerHTML = res);
