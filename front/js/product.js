const getParamFromUrl = (url, param) => {
    let newUrl = new URL(url);
    let searchParams = new URLSearchParams(newUrl.search);
    return searchParams.get(param);
}

let windowUrl = window.location.href;
const productId = getParamFromUrl(windowUrl, 'id');
const productAPI = `http://localhost:3000/api/products/${productId}`;

const fetchProduct = async (url) => {
    await fetch(url)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            displayProduct(value);
        })
        .catch(function(error) {
            console.log(error);
        })
};

const displayProduct = async (product) => {
    document.getElementsByClassName("item__img")[0].insertAdjacentHTML('afterbegin', `<img
          src="${product.imageUrl}"
          alt="${product.altTxt}"/>`);
    document.getElementById("title").insertAdjacentHTML('afterbegin', `${product.name} `);
    document.getElementById("price").insertAdjacentHTML('afterbegin', `${product.price} `);
    document.getElementById("description").insertAdjacentHTML('afterbegin', `${product.description} `);
    for (let c in product.colors) {
        document.getElementById("colors").insertAdjacentHTML('beforeend', `<option value="${product.colors[c]}">${product.colors[c]}</option>`)
    }
}

const colorValid = (color) => {
    if (color === "") {
        alert("Veuillez sélectionner une couleur");
    } else {
        return true;
    }
}


const quantityValid = (quantity) => {
    if (quantity == 0 || quantity == "" || quantity > 100) {
        alert("Veuillez choisir une quantité comprise entre 1 et 100");
    } else {
        return true;
    }
}

const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

const checkCart = (item, cart) => {
    // If cart exists we look for identical product (same color and id)
    if (cart) {
        let findItem = cart.find((element) => element.id === item.id && element.color === item.color);
        // If we find identical product, we increment quantity
        if (findItem) {
            findItem.quantity = parseInt(item.quantity) + parseInt(findItem.quantity);
            saveCart(cart);
            // If product is not already in cart we add it to cart
        } else {
            cart.push(item);
            saveCart(cart);
        }
    } else {
        let cart = [];
        cart.push(item);
        saveCart(cart);
    }
}

const redirectToCart = () => {
    window.location.href = "cart.html"
}

const addToCart = () => {
    let myItem = {
        id: productId,
        color: document.getElementById("colors").value,
        quantity: document.getElementById("quantity").value,
    }
    const myCart = JSON.parse(localStorage.getItem("cart"));

    if (colorValid(myItem.color) && quantityValid(myItem.quantity)) {
        checkCart(myItem, myCart);
        redirectToCart();
    }
}

fetchProduct(productAPI);
const addBtn = document.getElementById("addToCart");
addBtn.addEventListener('click', addToCart);