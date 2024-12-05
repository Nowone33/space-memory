import displayTopThree from "./leaderboard.js";

window.addEventListener("DOMContentLoaded", function(){
    // recuperation du localstorage
    const localUser = JSON.parse(this.sessionStorage.getItem("loggedInUser"));

    // si utilisateur connecté
    if(localUser){

        this.document.getElementById("username").textContent = localUser.username;
        this.document.getElementById("email").textContent = localUser.email;

        displayTopThree(localUser.username)
    }

})

document.addEventListener("DOMContentLoaded", function(){

    const logoutBouton = document.getElementById("logOut");

    logoutBouton.addEventListener("click", function(){
        sessionStorage.removeItem("loggedInUser");

        window.location.href = "index.html";
    })
})
