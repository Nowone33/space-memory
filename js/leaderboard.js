let username = '';
let score;
let leaderboard = [];

window.addEventListener("DOMContentLoaded", function() {
    const localUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (localUser) {
        username = localUser.username;
    }

    // Vérifiez si les données du leaderboard existent dans localStorage
    const storedLeaderboard = localStorage.getItem("leaderboard");
    if (storedLeaderboard) {
        try {
            leaderboard = JSON.parse(storedLeaderboard);
            // Vérifiez si leaderboard est un tableau
            if (!Array.isArray(leaderboard)) {
                leaderboard = [];
            }
        } catch (error) {
            console.error("Erreur lors du parsing des données du leaderboard :", error);
            leaderboard = [];
        }
    } else {
        leaderboard = [];
    }

    displayLeaderBoard();
});

function updateScore(newScore) {
    score = newScore;
    console.log("Updating score:", score); // Ajoutez cette ligne
    if (username !== '') {
        console.log(username + " a fait un score de : " + score);
        addToLeaderBoard(username, score);
    } else {
        username = 'anon';
        console.log(username + " a fait un score de : " + score);
        addToLeaderBoard(username, score);
    }
}

function addToLeaderBoard(username, score) {
    leaderboard.push({ username, score });
    leaderboard.sort((a, b) => a.score - b.score);
    if (leaderboard.length > 10) {
        leaderboard.pop();
    }
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    console.log("Updated leaderboard:", leaderboard); // Ajoutez cette ligne
    displayLeaderBoard();
}

function displayLeaderBoard() {
    const leaderboardList = document.getElementById("leaderboard-list");

    if(!leaderboardList){
        return;
    }
    leaderboardList.innerHTML = "";

    // Vérifiez si le leaderboard contient des données
    if (leaderboard.length > 0) {
        leaderboard.forEach((lign, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${lign.username} - ${lign.score}`;
            leaderboardList.appendChild(listItem);
        });
    } else {
        
        const listItem = document.createElement("li");
        listItem.textContent = "Aucun score enregistré.";
        leaderboardList.appendChild(listItem);
    }
    console.log("Displayed leaderboard:", leaderboard); // Ajoutez cette ligne
}


export default function displayTopThree(user){
    const topThreelist = document.getElementById("topThree-list");
    topThreelist.innerHTML="";

    const userScores = leaderboard.filter(lign => lign.username === user);

    userScores.sort((a,b) => a.score - b.score)

    if(userScores.length > 0){
        for(let i= 0; i < Math.min(3, userScores.length); i++){
            const listItem = document.createElement("li");
            listItem.textContent = `${i + 1}. ${userScores[i].username} - ${userScores[i].score}`;
            topThreelist.appendChild(listItem)
        }
                 
            } else {
                const listItem = document.createElement("li");
                listItem.textContent = "Aucun score enregistré pour ce joueur.";
                topThreelist.appendChild(listItem);
            }
        
    
}

// Exporter la fonction updateScore
export { updateScore };

