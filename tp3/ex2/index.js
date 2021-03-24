// Types JSDoc

/**
 * Image associée à un produit
 * @typedef {Object} Image
 * @property {string} src Source de l'image
 * @property {string} alt Texte alternatif decrivant l'image
 */

/**
 * Définition du type Product
 * @typedef {Object} Product
 * @property {number} id Identifiant unique associé au produit
 * @property {string} name Nom du produit
 * @property {string} description Description du produit
 * @property {number} price Prix du produit
 * @property {Image} image Aperçu du produit (photo)
 */

// Fonctions utilitaires

/**
 * Créé un élément à partir de son code texte HTML (https://stackoverflow.com/a/35385518)
 * @param {String} HTML
 * @return {Element}
 */
const htmlToElement = html => {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

/**
 * Créé l'élément associé à un produit dans la vitrine de la boutique
 * @param {Product} produit Objet produit
 * @param {function} onOrder Écouteur d'ajout au panier
 * @param {number} count Compte par défaut au panier
 */
const createShopElement = ({ id, name, description, price, image }, onOrder, count = 0) => {
    // Création de l'élément
    const productElement = htmlToElement(
        `<div class="produit" id="${id}-product">
            <h4>${name}</h4>
            <figure><img src="${image.src}" alt="${image.alt}"></figure>
            <div class="description">${description}</div>
            <div class="prix">${price}</div>
            <div class="controle">
                <input id="${id}-qte" step="1" min="0" max="9" type="number" value="${count}"></input>
                <button class="commander" id="${id}-order"></button>
            </div>
        </div>`);
    // Ajout de l'écouteur d'ajout au panier
    productElement.querySelector(`[id='${id}-order']`).addEventListener('click', () => {
        onOrder(productElement.querySelector(`[id='${id}-qte']`).value)
    });
    return productElement;
};

/**
 * Créé l'élément associé à un produit dans le panier
 * @param {Product} produit Objet produit
 * @param {function} onRemove Écouteur de suppression du panier
 * @param {number} count Compte du panier
 */
const createCartElement = ({ id, name, price, image }, onRemove, count = 1) => {
    // Création de l'élément
    const productElement = htmlToElement(
        `<div class="achat" id="${id}-achat">
            <figure><img src="${image.src}" alt="${image.alt}"></figure>
            <h4>${name}</h4>
            <div class="quantite">${count}</div>
            <div class="prix">${price}</div>
            <div class="controle">
                <button class="retirer" id="${id}-remove"></button>
            </div>
        </div>`);
    // Ajout de l'écouteur de suppression du panier
    productElement.querySelector(`[id='${id}-remove']`).addEventListener('click', () => {
        onRemove(count);
    });
    return productElement;
};

// Création du cadis et récupération des éléments

const cart = new Map();
const shopElement = document.getElementById('boutique'),
    filterElement = document.getElementById('filter'),
    amountElement = document.getElementById('montant'),
    purchaseElement = document.getElementById('achats');

/**
 * Mise à jour de l'affichage du cadis
 */
const updateCart = () => {
    // Tableau des couples (id, count)
    const arr = Array.from(cart.entries());
    // Mise à jour de la liste affichée
    purchaseElement.replaceChildren(...arr
        .filter(([id, count]) => count > 0)
        .map(([id, count]) => createCartElement(products[id], () => {
            cart.set(id, 0);
            updateCart(products);
        }, count)));
    // Calcul et mise à jour de l'affichage du coût total
    amountElement.innerText = arr.reduce((acc, [id, count]) => acc + count * products[id].price, 0);
};

/**
 * Mise à jour de l'affichage de la vitrine de la boutique
 * @param {Product[]} products Les produits en vente
 */
const updateShop = products => {
    shopElement.replaceChildren(...products
        .map(product => createShopElement(product, count => {
            cart.set(product.id, count);
            updateCart();
        }, cart.get(product.id))));
};

updateShop(products);

// Barre de recherche

filterElement.addEventListener('input', e => {
    // On récupère le texte tapé dans la barre
    const input = e.target.value;
    // Si l'input est vide, on reinitialise la vitrine
    if (input === '') return updateShop(products);
    // Sinon on lance la recherche
    const fuse = new Fuse(products, {
        includeScore: true,
        keys: ['id', 'name']
    });
    const results = fuse.search(input);
    // Une fois les résultats obtenus, on met à jour la vitrine
    updateShop(results.map(({ item }) => item));
})