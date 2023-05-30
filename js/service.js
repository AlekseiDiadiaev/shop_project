const API = './js/db.json'

async function getProducts(){
    try{
        const res = await fetch(API);
        const data = res.json();
        return data;
    } catch(err){
        alert(err)
    }
}

async function getCompaniesHTML() {
    let data = await getProducts()
    data = data.map(item => item.company)
    const companiesList = Array.from(new Set(data));
    let res = '';
    companiesList.forEach(item => {
        res += `<li class="filters__companies-item">
                    <button data-value="${item.toLowerCase()}">${item}</button>
                </li>`
    })
    return res;
}


async function getPriceRange() {
    let data = await getProducts()
    data = data.map(item => item.price)
    const min = Math.min(...data)
    const max = Math.max(...data)
    return {min, max};
}


async function getCardsHTML(count = null){
    const data = await getProducts();
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

