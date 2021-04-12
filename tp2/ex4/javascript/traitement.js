function Lire_Propriete() {
  var image = document.getElementById("imag");

  var bordure = document.getElementById("bord");
  var hauteur = document.getElementById("haut");
  var Nom = document.getElementById("Nom");
  var source = document.getElementById("sorc");
  var largeur = document.getElementById("larg");

  bordure.value = image.border;
  hauteur.value = image.height;
  largeur.value = image.width;
  Nom.value = image.name;
  source.value = image.src;
}

function Ecrire_Propriete() {
  var image = document.getElementById("imag");

  var bordure = document.getElementById("bord");
  var hauteur = document.getElementById("haut");
  var Nom = document.getElementById("Nom");
  var source = document.getElementById("sorc");
  var largeur = document.getElementById("larg");

  image.border = bordure.value;
  image.height = hauteur.value;
  image.width = largeur.value;
  image.name = Nom.value;
  image.src = source.value;
}
