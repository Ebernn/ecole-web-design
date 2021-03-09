// On récupère les deux éléments contenant les deux nombres
const n1El = document.getElementById("n1");
const n2El = document.getElementById("n2");
// et l'élément contenant le résultat du produit
const resEl = document.getElementById("res");

// On écoute les évenements "click" du boutton Calculer le produit
document.getElementById("calc").addEventListener('click', () => {
    // On récupère les deux nombres, on calcul leur produit
    const result = parseFloat(n1El.value) * parseFloat(n2El.value);
    // On affiche leur produit si le résultat est un nombre
    resEl.innerText = `Resultat: ${isNaN(result) ? "???" : result}`;
});