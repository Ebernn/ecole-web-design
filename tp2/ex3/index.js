// On récupère les éléments de la commande
const entryInputElement = document.getElementById("input-entree");
const dishInputElement = document.getElementById("input-plat");
const puddingInputElement = document.getElementById("input-dessert");
// l'affichage des montants
const entryAmountElement = document.getElementById("montant-entree");
const dishAmountElement = document.getElementById("montant-plat");
const puddingAmountElement = document.getElementById("montant-dessert");
const totalAmountElement = document.getElementById("total");
// et le bouton "Choisir"
const choiceButton = document.getElementById("choisir");

/**
 * Fonction utilitaire pour récupérer l'élément option sélectionné
 * @param {HTMLSelectElement} e Elément HTML <select>
 * @returns {HTMLOptionElement} L'élément option sélectionné
 */
const getSelectedElement = e => e.options[e.selectedIndex];

/**
 * Fonction utilitaire pour récupérer le prix de l'élément
 * @param {HTMLOptionElement} e Elément option sélectionné
 * @returns {number} Le prix de l'élément sélectionné
 */
const getPrice = e => parseFloat(e.getAttribute("data-price"));

/**
 * Mise à jour de l'affiche du montant
 */
const updatePreview = () => {
  // On récupère le montant de l'entrée, du plat et du dessert.
  const entryAmount = getPrice(getSelectedElement(entryInputElement));
  const dishAmount = getPrice(getSelectedElement(dishInputElement));
  const puddingAmount = getPrice(getSelectedElement(puddingInputElement));
  // Mise à jour de l'affichage
  entryAmountElement.innerHTML = `${entryAmount} €`;
  dishAmountElement.innerHTML = `${dishAmount} €`;
  puddingAmountElement.innerHTML = `${puddingAmount} €`;
  totalAmountElement.innerHTML = `Total : ${entryAmount + dishAmount + puddingAmount} €`;
};

// On met à jour l'affiche à chaque click du bouton "Choisir"
choiceButton.addEventListener('click', updatePreview);
