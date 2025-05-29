let page = 0;
const maxPage = 100;

async function getProduct() {
    let list = document.querySelector('.posts');
    list.innerHTML = '';
    let response = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10}`);
    let content = await response.json();
    let products = content.products;

    products.forEach(product => {
        list.innerHTML += /*html*/`
        <link rel="stylesheet" href="/public/style/script_style.css">
            <div class="post img">
             <a href="product?id=${product.id}">
                <img src="${product.thumbnail}" width="300" alt="${product.title}">
                <h4>${product.title}</h4>
                <h5>Цена: ${product.price} $</h5>
            </div>
        `;
    });
    document.getElementById('pageDisplay').textContent = `${page + 1}`;
}

function navigatePage(direction) {
    if (direction === 'next' && page < maxPage) page++;
    else if (direction === 'prev' && page > 0) page--;
    getProduct();
}

document.getElementById('nextB').addEventListener('click', () => navigatePage('next'));
document.getElementById('prevB').addEventListener('click', () => navigatePage('prev'));

getProduct();