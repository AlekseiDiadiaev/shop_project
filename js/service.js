const API = './js/db.json'

let currentData = []; 

async function getProducts(){
    try{
        const res = await fetch(API);
        const data = await res.json();
        currentData = data;
        return data;
    } catch(err){
        alert(err)
    } 
}

function getCompaniesHTML(data) {
    data = data.map(item => item.company)
    const companiesList = Array.from(new Set(data));
    let res = `<li class="filters__companies-item filters__companies-item_active" data-value="all" tabindex="0">
                    All
                </li>`;
    companiesList.forEach(item => {
        res += `<li class="filters__companies-item" 
                data-value="${item.toLowerCase()}" 
                tabindex="0">
                    ${item}
                </li>`
    })
    return res;
}


function getPriceRange(data) {
    data = data.map(item => item.price)
    const min = Math.min(...data)
    const max = Math.max(...data)
    return {min, max};
}


function getCardsHTML(data, count = null){
    if(!count) {
        count = data.length;
    }

    let result = '';

    data.length = count;

    data.forEach(item => {
        result += `<div class="card" data-company="${item.company}" id="${item.id}">
                    <div class="card__img">
                        <img src="${item.img}" alt="Furniture">
                    </div>
                    <div class="card__title">${item.name}</div>
                    <div class="card__price">$${item.price}</div>
                </div>`
    })
    
    return result;
}

function getFilteredData(data, searchStr, company, rangeMax){
    let result = data;
    result = result.filter(item => item.price <= rangeMax);


    if (company === 'all') {
        result = result;
    } else {
        result = result.filter(item => item.company.toLowerCase() === company)
    }
   
    searchStr = searchStr.toLowerCase();
    result = result.filter(item => {
        const name = item.name.toLowerCase();
        return name.includes(searchStr);
    })  

    return result;
}

function setBagCounter(node){
    const jsonBag = localStorage.getItem('bag');

    if(!jsonBag || jsonBag === '[]') {
        node.innerHTML = 0;
        node.classList.remove('visible-flex')
    } else {
        const bag = JSON.parse(jsonBag);
    
        node.innerHTML = bag.length;
        node.classList.add('visible-flex')
    }
}

function getBagCardsHTML(data) {
    const jsonBag = localStorage.getItem('bag');
    if(!jsonBag || jsonBag === '[]') return '';
    const bag = JSON.parse(jsonBag);
    let result = '';
   
    bag.forEach(item => {
        const index = data.findIndex(product => +product.id === +item.id);
        if(index === -1) return false;
        const {img, name, price, id} = data[index];
        result += `<div class="bag-card" data-bag-cart-id="${id}">
                        <div class="bag-card__img">
                            <img src="${img}" alt="Furniture">
                        </div>
                        <div class="bag-card__descr">
                            <div class="big-card__descr-wrapper">
                                <div class="bag-card__name">${name}</div>
                                <div class="bag-card__price">$${price}</div>
                            </div>
                            <button class="bag-card__remove" data-bag-cart-id="${id}">remove</button>
                        </div>
                        <div class="bag-card__count">
                            <button class="bag-card__more-btn" data-bag-cart-id="${id}">></button>
                            <div class="bag-card__counter">${item.count}</div>
                            <button class="bag-card__less-btn" data-bag-cart-id="${id}">></button>
                        </div>
                    </div>`
    })
    
    return result;
}

function changeNumOfProduct(num, id){
    const jsonBag = localStorage.getItem('bag');
    const bag = JSON.parse(jsonBag);
    const index = bag.findIndex(item => +item.id === +id);
    bag[index].count += num;
    if(bag[index].count < 0) bag[index].count = 0;
    localStorage.setItem('bag', JSON.stringify(bag));
}

function removeItemInBag(id) {
    const jsonBag = localStorage.getItem('bag');
    const bag = JSON.parse(jsonBag);
    const index = bag.findIndex(item => +item.id === +id);
    bag.splice(index, 1)
    localStorage.setItem('bag', JSON.stringify(bag));
}

function getTotalBagPrice(data) {
    const jsonBag = localStorage.getItem('bag');
    if(!jsonBag || jsonBag === '[]') return '';
    const bag = JSON.parse(jsonBag);
    let result = 0;
    bag.forEach(item => {
        const index = data.findIndex(product => +product.id === +item.id);
        if(index === -1) return false;
        result += +data[index].price * item.count;
    })
    return result;
}

function clearBag() {
    localStorage.removeItem('bag');
}