// générer une couleur àléatoire
export const randomColor = (alpha) => {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    
    return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
  }
  
  // générer un tableau de couleur àléatoires
  export  function randomColorArray(nombreCouleurs,alpha) {
      var tableauCouleurs = [];
    
      for (var i = 0; i < nombreCouleurs; i++) {
        tableauCouleurs.push(randomColor(alpha));
      }
    
      return tableauCouleurs;
    }
    