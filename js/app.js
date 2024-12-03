// Selectionne la zone ou s'affichera le jeu sur la page html
const game = document.getElementById('game')
// créer le plateau de carte
const grid = document.createElement('section')
grid.setAttribute('class', 'grid')
// Insert le plateau de carte dans la zone de jeu definit
game.appendChild(grid)



let cards=[];
let score = 0;
let firstCard, secondCard;
let lockBoard = false;

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
        card.setAttribute("data-name", item.name)
        // on récupère son nom donnée dans le json
        card.dataset.image = item.image;
        card.dataset.name = item.name;
        card.innerHTML=`
        <div class="front">
            <img class="front-image" src="${item.image}" alt=" carte ${item.name}"/>
        </div>
        <div class="back"></div>
         `;

        // on l'insert dans la grille de jeu
        grid.appendChild(card)
        card.addEventListener("click", flipCard);
    

});
}

function shuffleCards(){
    let currentIndex = cards.length;
    let randomIndex;
    let temporaryValue;

    while(currentIndex !==0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex --;

        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue

    }
}


function flipCard(){
    if(lockBoard){
        return;
    }
    if(this === firstCard){
        return;
    }
    this.classList.add("flipped");

    if(!firstCard){
        firstCard = this;
        return;
    }
    secondCard = this;
    score ++;
    document.querySelector(".score").textContent = score;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch(){
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if(isMatch){
        disableCard();
    }else{
        unflipCard();
    } 

    function disableCard(){

        firstCard.removeEventListener("click",flipCard);
        secondCard.removeEventListener("click", flipCard);

        resetBoard();
    }
 
    function unflipCard(){
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }    

    
}


function resetBoard(){
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }


function restart(){
    resetBoard();
    shuffleCards();
    score = 0;
    document.querySelector(".score").textContent = score;
    grid.innerHTML ="";
    generateCards();
}

document.addEventListener("keydown", (event) => {
    if(event.code === 'Space'){
        restart();
    }
})