document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault(); // empeche le rechargement non souhaité


    const emailInput = document.getElementById("emailConnect").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users"));// recupere nos users du local storage
    
    const userActuel = users.some(user => {
        // L'utilisateur existe
        if(user.email === emailInput){

            if(user.password === passwordInput){
                alert("Connexion réussie ! ")

                //Conserver l'user actuel dans le session storage pour l'utiliser 
                sessionStorage.setItem("loggedInUser", JSON.stringify(user));

                // rediriger vers la page profil
                window.location.href = 'profil.html';

            } else {
                alert("mot de passe incorrect.")
            }

        } else{
            alert("Aucun compte ne correspond à cet email")

        }}) 
    
});

// bouton ANNULER
document.getElementById("cancelButton").addEventListener("click", function(event){
    location.reload();
})