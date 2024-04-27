// Catch The All Element Here 
const productContainer = document.getElementById("products")

const showProducts = (productList)=> {
    productContainer.innerHTML = "";
    productList.forEach((item)=>{
    // Now we will create some html element to display products data on UI 
    const productBox = document.createElement('div');
        productBox.className = "product-content";  

        const productImg = document.createElement('img')
              productImg.src = item.image;
        
        const productName = document.createElement('h2') 
            productName.textContent = item.title
            
        const productPrice = document.createElement('p') 
        productPrice.textContent =` price : $${item.price}`;

        productBox.append(
            productImg ,
            productName ,
            productPrice
        )

        productContainer.appendChild (
            productBox
        )

    })
}

const FetchProducts = async (searchQuery , sort ,category ) => {
    
    let url = 'https://fakestoreapi.com/products'
    
    if(sort) {
        url = "https://fakestoreapi.com/products?sort=${sort}"
    }

    
    if(searchQuery) {
        url = "https://fakestoreapi.com/products?title=${searchQuery}"
    }

    if(category) {
        url = "https://fakestoreapi.com/products/category/${category}"
    }

    try {
        const response = await fetch(url)
        const finalResponse = await response.json()
        showProducts(finalResponse)
        console.log(finalResponse)
    } catch (error) {
        console.log("error : " , error)
    }
}

FetchProducts()

// Filter Logic Here 

// Catch Cateory Element 
const selectedCategory = document.getElementById('filter')
selectedCategory.addEventListener('change' , ()=> {   
        FetchProducts('','' ,selectedCategory.value)
   
})

// Search Logic Here 

// Catch Cateory Element 

// Sort Logic Here 

// Catch Cateory Element 
const sortingOrder = document.getElementById('sort')
    sortingOrder.addEventListener('change' , ()=> {   
    FetchProducts('',sortingOrder.value ,'')

})