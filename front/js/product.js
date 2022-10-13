// Get param from window url with search params

const GetParamFromUrl = (url, param) => {
    let newUrl = new URL(url);
    let search_params = new URLSearchParams(newUrl.search);
    let paramValue = search_params.get(param);
    return paramValue;
}

// Get info for the current product (with param id)
let window_url = window.location.href;
const productId = GetParamFromUrl(window_url, 'id');
const id_api = `http://localhost:3000/api/products/${productId}`;

const InsertProduct = () => {
    fetch(id_api)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (product) {
            document.getElementsByClassName("item__img")[0].insertAdjacentHTML('afterbegin', `<img
           src="${product.imageUrl}"
           alt="${product.altTxt}"/>`);
            document.getElementById("title").insertAdjacentHTML('afterbegin', `${product.name} `);
            document.getElementById("price").insertAdjacentHTML('afterbegin', `${product.price} `);
            document.getElementById("description").insertAdjacentHTML('afterbegin', `${product.description} `);
            for (let c in product.colors) {
                document.getElementById("colors").insertAdjacentHTML('beforeend', `<option value="${product.colors[c]}">${product.colors[c]}</option>`)
            }

        });
}

InsertProduct();

const addBtn = document.getElementById("addToCart");
addBtn.addEventListener('click', () => {
    let item = {
        id: productId,
        // name: document.getElementById("title").innerHTML,
        // price: document.getElementById("price").innerHTML,
        color: document.getElementById("colors").value,
        quantity: document.getElementById("quantity").value,
        // imageUrl: document.getElementsByClassName("item__img").src,
        // altTxt: document.getElementsByClassName("item__img").alt,
    }
    // Initialisation local storage
    // localStorage.clear();
    const myCart = JSON.parse(localStorage.getItem("cart"));
    // console.log(myCart);
    // if myCart is not empty
    if (myCart) {
        let findItem = myCart.find((element) => element.id === item.id && element.color === item.color);
        // if selected product is already @ myCart
        if (findItem) {
            let newQuantity = parseInt(item.quantity) + parseInt(findItem.quantity);
            findItem.quantity = newQuantity;
            localStorage.setItem("cart", JSON.stringify(myCart));
            console.log("hi");
            // if selected product is not @ myCart
        } else {
            myCart.push(item);
            localStorage.setItem("cart", JSON.stringify(myCart));
            console.log("hello");
        }

        // if myCart is empty
    } else {
        let myCart = [];
        myCart.push(item);
        localStorage.setItem("cart", JSON.stringify(myCart));
        console.log("coucou");
    }
    console.log(myCart);
})