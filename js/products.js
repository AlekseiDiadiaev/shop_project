const productsCards = document.querySelector('.products__cards-wrapper'),
      companiesNode = document.querySelector('.filters__companies-list'),
      rangeInput = document.querySelector('#price-range-input');
      rangeView = document.querySelector('.filters__price-value');

getCardsHTML().then(res => productsCards.innerHTML = res);

getCompaniesHTML().then(res => {
    companiesNode.innerHTML = `<li class="filters__companies-item">
                                        <button data-value="all">All</button>
                                    </li>${res}`});

getPriceRange().then(res => {
    rangeInput.setAttribute("min", res.min);
    rangeInput.setAttribute("max", res.max);
    rangeInput.setAttribute("value", res.min);
    rangeView.innerHTML = `Value: ${res.min}$`
})

rangeInput.addEventListener('input', (e) => {
    rangeView.innerHTML = `Value: ${e.target.value}$`
})
