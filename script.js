document.addEventListener('DOMContentLoaded', function() {
    let productsContainer = document.getElementById('products');
    let filterSelect = document.getElementById('filter');
    let searchInput = document.querySelector('.product-search input');
    let sortSelect = document.getElementById('sort');
    let products = [];

    // Fetch products from FakeStoreAPI
    async function fetchProducts() {

        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            products = data;
            return data;

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Display products
    async function displayProducts() {

        let productsData = await fetchProducts();
        productsContainer.innerHTML = '';

        if (productsData && productsData.length > 0) {
            productsData.forEach(product => {
                let productItem = document.createElement('div');

                productItem.classList.add('product-content');
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>Price: $${product.price}</p>
                `;

                productsContainer.appendChild(productItem);
            });
        } else {
            productsContainer.innerHTML = '<p>No products found</p>';
        }
    }

    displayProducts();

    // Filter products by category
    filterSelect.addEventListener('change', function() {

        let category = this.value;
        if (category) {
            let filteredProducts = products.filter(product => product.category === category);
            displayFilteredProducts(filteredProducts);
        } else {
            displayProducts();
        }
    });

    // Display filtered products
    function displayFilteredProducts(filteredProducts) {
        productsContainer.innerHTML = '';

        if (filteredProducts.length > 0) {

            filteredProducts.forEach(product => {

                let productItem = document.createElement('div');
                productItem.classList.add('product-content');
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>Price: $${product.price}</p>
                `;

                productsContainer.appendChild(productItem);
            });
        } else {
            productsContainer.innerHTML = '<p>No products found for this category</p>';
        }
    }

    // Search products by title
    searchInput.addEventListener('input', function() {

        let searchTerm = this.value.trim().toLowerCase();
        let filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm));
        displayFilteredProducts(filteredProducts);
    });

    // Sort products by price
    sortSelect.addEventListener('change', function() {
        
        let sortOrder = this.value;
        if (sortOrder === 'asc') {
            let sortedProducts = products.slice().sort((a, b) => a.price - b.price);
            displayFilteredProducts(sortedProducts);
        } else if (sortOrder === 'desc') {
            let sortedProducts = products.slice().sort((a, b) => b.price - a.price);
            displayFilteredProducts(sortedProducts);
        }
    });
});
