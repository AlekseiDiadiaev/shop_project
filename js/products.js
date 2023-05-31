const productsCards = document.querySelector('.products__cards-wrapper'),
      companiesNode = document.querySelector('.filters__companies-list'),
      rangeInput = document.querySelector('#price-range-input'),
      rangeView = document.querySelector('.filters__price-value'),
      searchInput= document.querySelector('#search-input'),
      comaniesList = document.querySelector('.filters__companies-list');
      

// Start render

getProducts().then(data => {
    productsCards.innerHTML = getCardsHTML(data)
    companiesNode.innerHTML = getCompaniesHTML(data)
    const {min, max} = getPriceRange(data);
    rangeInput.setAttribute("min", min);
    rangeInput.setAttribute("max", max);
    rangeInput.setAttribute("value", max);
    rangeView.innerHTML = `Value: ${max}$`
    rangeMax = max;
});


rangeInput.addEventListener('input', (e) => {
    rangeView.innerHTML = `Value: ${e.target.value}$`
})

//Filters

let companyFilterStr = 'all';
let searchStr = '';
let rangeMax;

comaniesList.addEventListener('click', e => {
    if(e.target && e.target.classList.contains('filters__companies-item')){
        const comaniesItems = document.querySelectorAll('.filters__companies-item');
        comaniesItems.forEach(item => item.classList.remove('filters__companies-item_active'))
        e.target.classList.add('filters__companies-item_active')

        companyFilterStr = e.target.getAttribute('data-value')
        data = getFilteredData(currentData, searchStr, companyFilterStr, rangeMax)
        productsCards.innerHTML = getCardsHTML(data);
    }
})

searchInput.addEventListener('input', e => {
    searchStr = e.target.value
    data = getFilteredData(currentData, searchStr, companyFilterStr, rangeMax)
    productsCards.innerHTML = getCardsHTML(data);
})

rangeInput.addEventListener('input', e => {
    rangeMax = e.target.value
    data = getFilteredData(currentData, searchStr, companyFilterStr, rangeMax)
    productsCards.innerHTML = getCardsHTML(data);
})
        



