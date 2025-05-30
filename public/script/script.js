let page = 0;
const maxPage = 100;

async function getProduct() {
    let list = document.querySelector('.posts');
    list.querySelectorAll('.post').forEach(post => post.remove());

    let searchQuery = document.querySelector('.poisk').value.trim();
    let url;

    if (searchQuery === '') {
        url = `https://dummyjson.com/products?limit=10&skip=${page * 10}`;
    } else {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`;
    }

    let response = await fetch(url);
    let content = await response.json();
    let products = content.products;

    products.forEach(product => {
        list.innerHTML += /*html*/`
            <link rel="stylesheet" href="/public/style/script_style.css">
            <div class="post img">
                <a href="product?id=${product.id}">
                    <img src="${product.thumbnail}" width="300" alt="${product.title}">
                    <div class="">
                        <h4 class="text">${product.title}</h4>
                        <h5>Цена: ${product.price} $</h5>
                    </div>
                </a>
            </div>
        `;
    });

    document.getElementById('pageDisplay').textContent = `${page + 1}`;
}

function navigatePage(pages) {
    if (pages === 'next' && page < maxPage) page++;
    else if (pages === 'prev' && page > 0) page--;
    getProduct();
}

document.getElementById('nextB').addEventListener('click', () => navigatePage('next'));
document.getElementById('prevB').addEventListener('click', () => navigatePage('prev'));

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && document.querySelector('.poisk') === document.activeElement) {
        page = 0;
        getProduct();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    let list = document.querySelector('.posts');
    list.innerHTML += /*html*/`
    <input class="poisk" type="text" placeholder="Поиск">`;
    getProduct();
});