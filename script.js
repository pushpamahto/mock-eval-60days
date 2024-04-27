document.addEventListener("DOMContentLoaded", function() {
    let categorySelect = document.getElementById("category-select");
    let searchInput = document.getElementById("search-input")
    let sortSelect = document.getElementById("sort-select")
    let productGrid = document.getElementById("product-grid")

    fetch("https://fakestoreapi.com/products/categories")
    .then(response => response.json())
    .then(categories => {
        let option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
});

function fetchProducts(){
    let category = categorySelect.value;
    let searchQuery = searchInput.value.toLowerCase();
    let sortOrder = sortSelect.value;

    let url = "https://fakestoreapi.com/products";

    if(category){
        url += `?category=${category}`;
    }

    fetch(url)
    .then(response => response.json())
    .then(products => {

        if(searchQuery){
            products = products.filter(product =>
                product.title.toLowerCase().includes(searchquery)
            );
        }

        if(sortOrder ==="asc"){
            products.sort((a,b) => a.price - b.price);
        }else if(sortOrder ==="desc"){
            products.sort((a,b) => b.price - a.price);
        }

        productGrid.innerHTML="";

        products.foreach(product => {
            let productItem = document.createElement("div");
            productItem.classList.add("product-item");

            let image = document.creaateElement("img");
            image.src = product.image;
            image.alt = product.title;
            image.classList.add("product-image");

            let title = document.createElement("div");
            title.textContent = product.title;
            title.classList.add("product-title");

            let price = document.createElement("div");
            price.textCont = `$${product.price.toFixed(2)}`;
            price.className.add = ("product-price");

            productItem.appendChild(image);
            productItem.appendChild(title);
            productItem.appendChild(price);

            productGrid.appendChild(productItem)

        });
    });
}

categorySelect.addEventListener("change", fetchProducts);
searchInput.addEventListener("input", fetchProducts);
sortSelect.addEventListener("change", fetchProducts);

fetchProducts();
