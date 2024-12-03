// Selectionne la zone ou s'affichera le jeu sur la page html
const game = document.getElementById('game')
// créer le plateau de carte
const grid = document.createElement('section')
grid.setAttribute('class', 'grid')
// Insert le plateau de carte dans la zone de jeu definit
game.appendChild(grid)
//creer une carte
let cards=[];

// recuperer les données pour alimenter chaque carte
fetch("./js/legume.json")
    .then((response) => response.json())
    .then((data) =>{
        cards = [...data,...data];
        //On mélange avant de les afficher
        shuffleCards();
        // utiliser une fonction qui génère les cartes dans le fetch pour éviter le probleme async
        generateCards();
       
        
    })
    .catch((error) => {
        console.error("Erreur lors du chargement des données :", error);
    });



function generateCards(){
    //pour chaque valeur du fichier json
    cards.forEach((item) => {
    
        // creer une carte dans une enveloppe div
        const card = document.createElement('div');
        
        // on lui ajoute la class card pour le css dédié
        card.classList.add('card');
        // on récupère son nom donnée dans le json
        card.dataset.image = item.image;
        card.dataset.name = item.name;
        card.innerHTML=`
        <div >
            <img class="card" src="${item.image}" alt="${item.name}"/>
        </div> `;

        // on l'insert dans la grille de jeu
        grid.appendChild(card)
    

});
}

function shuffleCards(){
    let currentIndex = cards.length;
    let randomIndex;
    let temporaryValue;

    while(currentIndex !==0){
        randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex --;

        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue

    }
}

