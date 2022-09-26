// Récupérer les informations depuis l'api

fetch("http://localhost:3000/api/products")
    .catch((error) => console.log(error))
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (kanap) {
        let articles = kanap;
        for (let article in articles) {
            let articleLink = document.createElement('a');
            document.querySelector('.items').appendChild(articleLink);
            articleLink.href = `product.html?id=${kanap[article]._id}`;

            let newArticle = document.createElement('article');
            articleLink.appendChild(newArticle);

            let newImg = document.createElement('img');
            newArticle.appendChild(newImg)
            newImg.src = kanap[article].imageUrl;

            let articleTitle = document.createElement('h3');
            newArticle.appendChild(articleTitle)
            articleTitle.innerHTML = kanap[article].name;

            // ALT de l'image
            // Classe du h3
            // P & la classe

            /*
            
             <a href="./product.html?id=42">
               <article>
                <img src="`${kanap[article]._id}`" alt="Lorem ipsum dolor sit amet, Kanap name1">
                <h3 class="productName">Kanap name1</h3>
                <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
              </article>
              </a>

             */
        }
    })








