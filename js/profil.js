window.addEventListener("DOMContentLoaded", function(){
    // recuperation du localstorage
    const localUser = JSON.parse(this.sessionStorage.getItem("loggedInUser"));

    // si utilisateur connecté
    if(localUser){

        this.document.getElementById("username").textContent = localUser.username;
        this.document.getElementById("email").textContent = localUser.email;

        
    }

})
