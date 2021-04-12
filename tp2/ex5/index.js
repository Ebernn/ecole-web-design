// On récupère l'élément "result"
const result = document.getElementById('result');

/**
 * Permute deux élements d'indices i et j
 * @param {Array} arr Tableau
 * @param {number} i Indice i
 * @param {number} j Indice j
 */
const permuter = (arr, i, j) => {
  console.log(arr);
  [arr[i], arr[j]] = [arr[j], arr[i]];
  return arr;
};

/**
 * Tri les éléments du tableau dans l'ordre croissant (tri par sélection)
 * @param {Array} arr Tableau à trier
 * @returns {Array} La même instance de tableau, triée
 */
const selection = arr => {
  const n = arr.length;
  let indice_min, min, i, j;
  for(i = 0; i < n - 1; i++){
    min = arr[i];
    indice_min = i;
    for(j = i + 1; j < n; j++){
      if(min > arr[j]){
        min = arr[j];
        indice_min = j;
      }
    }
    permuter(arr, i, indice_min);
  }
  return arr;
};

// On affiche un exemple de résultat sur la page
result.innerHTML = selection([4, 1, 2, 3, 4, 98, 12, 12]).join(' , ');