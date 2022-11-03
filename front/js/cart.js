
let cart = JSON.parse(localStorage.getItem("cart"));
let cartItem = document.getElementById('cart__items');
let inputQuantity = document.getElementsByClassName('itemQuantity');
let deleteItem = document.getElementsByClassName('deleteItem');
let totalQuantityElt = document.getElementById('totalQuantity');
let totalPriceElt = document.getElementById('totalPrice');

let totalQuantity = 0;
let totalPrice = 0;

for (let item of cart) {
    fetch("http://localhost:3000/api/products/" + item.id)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (product) {
            let price = product.price;
            if (item.quantity > 0) {
                totalQuantity += item.quantity;
                //ou totalPrice = totalPrice + price * item.quantity;
                totalPrice += price * item.quantity;
            }
            let element = `<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
                <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${product.name}</h2>
                    <p>${item.color}</p>
                    <p>${price}€</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté :</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" data-old-value="${item.quantity}" value="${item.quantity}">
                            <span class="quantityError"></span>
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`;
            cartItem.innerHTML += element;
            totalQuantityElt.innerText = totalQuantity;
            totalPriceElt.innerText = totalPrice;

        })

        .then(function () {
            for (let i = 0; i < inputQuantity.length; i++) {
                inputQuantity[i].addEventListener('change', function (event) {
                    modifQuantity(this, event)
                })
            }

            for (let k = 0; k < deleteItem.length; k++) {
                deleteItem[k].addEventListener('click', function () {
                    deleteProduct(this)
                });
            }
        })
        .catch((err) => {
            // Une erreur est survenue
            console.log(err);
        });

}

function modifQuantity(element, event) {
    let article = element.closest('article');
    let newQuantity = event.target.value;
    let productId = article.dataset.id;
    let productColor = article.dataset.color;

    let oldValue = element.dataset.oldValue;
    element.dataset.oldValue = newQuantity;
    calculateTotal(productId, oldValue, newQuantity);

    console.log(oldValue)

    for (let j = 0; j < cart.length; j++) {
        if (cart[j].id === productId && cart[j].color === productColor) {
            cart[j].quantity = parseInt(newQuantity);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
}
function deleteProduct(element) {
    let article = element.closest('article');

    let productId = article.dataset.id;
    let productColor = article.dataset.color;

    let input = element.closest('article').querySelector('.itemQuantity');
    let oldValue = input.dataset.oldValue;
    calculateTotal(productId, oldValue, 0);

    for (let j = 0; j < cart.length; j++) {
        if (cart[j].id === productId && cart[j].color === productColor) {
            cart.splice(j, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
    article.remove();
}

function calculateTotal(productId, oldQuantity, newQuantity) {
    fetch("http://localhost:3000/api/products/" + productId)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(product) {
            let quantityDifference = 0;
            let price = product.price;
            let priceDifference = 0;
            newQuantity = parseInt(newQuantity);
            oldQuantity = parseInt(oldQuantity);

            // Cas où l'ancienne et la nouvelle quantité sont > 0 -> traitement normal
            if (newQuantity > 0 && oldQuantity > 0) {
                quantityDifference = newQuantity - oldQuantity;
                priceDifference = quantityDifference * price;

                // Cas où l'ancienne quantité est < 0 et la nouvelle quantité est > 0 -> différence = nouvelle quantité
            } else if (newQuantity > 0 && oldQuantity < 0) {
                quantityDifference = newQuantity;
                priceDifference = quantityDifference * price;

                // Cas où l'ancienne quantité est > 0 et la nouvelle quantité est < 0 ->
                // différence = on soustrait l'ancienne quantité
            } else if (newQuantity < 0 && oldQuantity > 0) {
                quantityDifference = - oldQuantity;
                priceDifference = quantityDifference * price;
            }

            totalQuantityElt.innerText = parseInt(totalQuantityElt.innerText) + quantityDifference;
            totalPriceElt.innerText = parseInt(totalPriceElt.innerText) + priceDifference;
        })
}


// Contact form

const checkFirstnameInput = () => {
    const firstName = document.getElementById("firstName");
    if (!/\b([A-ZÀ-ÿa-z][-,a-z. ']+[ ]*)+$/.test(firstName.value)) {
        document.getElementById("firstNameErrorMsg").innerHTML = "Le prénom n'est pas valide";
    } else {
        document.getElementById("firstNameErrorMsg").innerHTML = "";
        return true;
    }
}

const checkLastnameInput = () => {
    const lastName = document.getElementById("lastName");
    if (!/\b([A-Za-z][-,a-z. ']+[ ]*)+$/.test(lastName.value)) {
        document.getElementById("lastNameErrorMsg").innerHTML = "Le nom n'est pas valide";
    } else {
        document.getElementById("lastNameErrorMsg").innerHTML = "";
        return true;
    }
}

const checkAddressInput = () => {
    const address = document.getElementById("address");
    if (!/^[A-Za-z0-9\s]{5,100}$/.test(address.value)) {
        document.getElementById("addressErrorMsg").innerHTML = "L'adresse n'est pas valide";
    } else {
        document.getElementById("addressErrorMsg").innerHTML = "";
        return true;
    }
}

const checkCityInput = () => {
    const city = document.getElementById("city");
    if (!/\b([A-Za-z][-,a-z. ']+[ ]*)+$/.test(city.value)) {
        document.getElementById("cityErrorMsg").innerHTML = "La ville n'est pas valide";
    } else {
        document.getElementById("cityErrorMsg").innerHTML = "";
        return true;
    }
}

const checkEmailInput = () => {
    const email = document.getElementById("email");
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
        document.getElementById("emailErrorMsg").innerHTML = "L'email n'est pas valide";
    } else {
        document.getElementById("emailErrorMsg").innerHTML = "";
        return true;
    }
}

const checkFormInputs = () => {
    const form = document.querySelector(".cart__order__form");
    form.firstName.addEventListener('change', checkFirstnameInput);
    form.lastName.addEventListener('change', checkLastnameInput);
    form.address.addEventListener('change', checkAddressInput);
    form.city.addEventListener('change', checkCityInput);
    form.email.addEventListener('change', checkEmailInput);
}

checkFormInputs();


const validateForm = () => {
    const a = checkFirstnameInput();
    const b = checkLastnameInput();
    const c = checkAddressInput();
    const d = checkCityInput();
    const e = checkEmailInput();
    return (a && b && c && d && e);
}


let orderBtn = document.getElementById("order");
orderBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (validateForm()) {
        let productsID = [];
        for (let p of cart) {
            productsID.push(p.id);
        }
        let order = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: productsID,
        }
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify(order),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                window.location.href = `confirmation.html?id=${data.orderId}`;
                localStorage.clear();
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        alert("Un ou plusieurs champs sont mal renseignés.");
    }
})