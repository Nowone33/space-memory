document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault(); // empeche le rechargement non souhaité


    const emailInput = document.getElementById("emailConnect").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users"));// recupere nos users du local storage
   
    if(users){
        const userActuel = users.find(user => user.email === emailInput);

        if(userActuel){

            if(userActuel.password === passwordInput){
                alert("Connexion réussie");

                sessionStorage.setItem("loggedInUser", JSON.stringify(userActuel));
                window.location.href = "profil.html";

            }else{
                alert("Mot de passe incorrect.")
            }
        } else {
            alert("Auncun compte ne correspond à cette adresse mail")
        }
    } else {
        alert("Aucun compte n'a été créé pour le moment inscrivez vous.")
    }
    
    document.getElementById("loginForm").reset()
});

// bouton ANNULER
document.getElementById("cancelButton").addEventListener("click", function(event){
    location.reload();
})