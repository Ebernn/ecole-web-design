// On récupère les deux éléments contenant le calcul de TVA
const champTextePU = document.getElementById("PU");
const champTexteTVA = document.getElementById("TVA");
const champTexteQT = document.getElementById("QT");
const champTextePTTC = document.getElementById("PT");

/**
 * Calcul du prix à payer toute taxe comprise des produits
 * @param {number} Prix_Unitaire Prix d'une unité de produit
 * @param {number} Taux_TVA Taux de TVA appliqué
 * @param {number} Quantite Quantité totale de produit achetés
 * @returns {number} Prix toute taxe comprise
 */
const calculerPrixTTC = (Prix_Unitaire, Taux_TVA, Quantite) =>
  Prix_Unitaire * Quantite + (Prix_Unitaire * Quantite * Taux_TVA) / 100;

// On écoute les click du bouton "Calculer"
document.getElementById("calculate").addEventListener("click", () => {
  // On détermine le prix toute taxe comprise des produits
  const prixTTC = calculerPrixTTC(
    parseFloat(champTextePU.value),
    parseFloat(champTexteTVA.value),
    parseFloat(champTexteQT.value)
  );
  // On affiche cette valeur s'il sagit d'un nombre
  champTextePTTC.value = isNaN(prixTTC) ? "???" : prixTTC;
});
