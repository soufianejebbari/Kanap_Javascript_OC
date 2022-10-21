let cart = JSON.parse(localStorage.getItem("cart"));
let cartItem = document.getElementById('cart__items');
let inputQuantity = document.getElementsByClassName('itemQuantity');
let deleteItem = document.getElementsByClassName('deleteItem');

for (let item of cart) {
    fetch("http://localhost:3000/api/products/" + item.id)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (product) {
            let price = parseInt(product.price);
            let element = `
                <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
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
                      <p>Qté : ${item.quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
          `;
            cartItem.innerHTML += element;
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

    for (let j = 0; j < cart.length; j++) {
        if (cart[j].id === productId && cart[j].color === productColor) {
            cart[j].quantity = parseInt(newQuantity);
            localStorage.setItem('cart', JSON.stringify(cart))
            console.log(cart)
        }
    }
}

function deleteProduct(element) {

}
