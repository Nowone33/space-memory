document.getElementById("signinForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Empeche le rechargement de la page
    handleFormSubmit();
});


document.getElementById('password').addEventListener("input", function() {
    const passwordInput = document.getElementById("password");
    verifPassword(passwordInput);
})


let message =""; // va servir pour y incorporer non message d'erreur

// Gère la soumission du formulaire -> bouton creation
function handleFormSubmit() {
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    // Appeler chaque validation
    const isUsernameValid = verifUser(usernameInput);
    const isEmailValid = verifEmail(emailInput);
    const isPasswordValid = verifPassword(passwordInput);
    const isConfirmPasswordValid = verifConfirmPassword(confirmPasswordInput);

    // Si tout est valide, enregistrer dans le localStorage
    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        const user = {
            username: usernameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value.trim(),
        };
        if(saveUserLocalStorage(user)){
            alert("Compte enregistré avec succès.");
            document.getElementById("signinForm").reset();
        }
        
    } else {
        alert("Tous les champs ne sont pas remplis correctement. Veuillez vérifier le formulaire.");
    }
}

// Gère l'action d'enregistrer dans le localStorage
function saveUserLocalStorage(newUser) {
    //
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(user => user.email === newUser.email || user.username === newUser.username); 
    if(userExists){
        alert("Un utilisateur avec cet email ou ce nom existe deja." )
        return false;
    } else {
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        return true;
    }
}

// Gère les informations saisies dans les input à chaque sortie de saisie avec `blur`
function verifFormSignIn() {
    document.getElementById("signinForm").addEventListener(
        "blur",
        function (event) {
            const champ = event.target;

            switch (champ.id) {
                case "username":
                    verifUser(champ);
                    break;
                case "email":
                    verifEmail(champ);
                    break;
                case "confirmPassword":
                    verifConfirmPassword(champ);
                    break;
            }
        },
        true
    );
}

// Initialisation de la validation des champs
verifFormSignIn();


// Validation des champs individuels
function verifUser(input) {
    const userValue = input.value.trim();

    if (userValue === "") {
        message = "Ce champ ne peut pas être vide";
        writeErrorMessage(input, message);
        return false;
    } else if (userValue.length < 3) {
        message = "Le champ username doit contenir au moins 3 caractères";
        writeErrorMessage(input, message);
        return false;
    } else {
        clearErrorMessage(input);
        return true;
    }
}

function verifEmail(input) {
    const emailValue = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
        message = "Ce champ ne peut pas être vide";
        writeErrorMessage(input, message);
        return false;
    } else if (!emailRegex.test(emailValue)) {
        message = "L'email doit être valide et sous le format XXXX@XX.XX";
        writeErrorMessage(input, message);
        return false;
    } else {
        clearErrorMessage(input);
        return true;
    }
}


function verifPassword(input) {
    const passwordValue = input.value.trim();
    let strength = 0;
    let minusculeRegex = /[a-z]/
    let majuculeRegex = /[A-Z]/
    let chiffreRegex = /[0-9]/
    let charSpeRegex = /[!@#$%^&*£(){}]/

    if (passwordValue === "") {
        message = "Ce champ ne peut pas être vide";
        writeErrorMessage(input, message);
        updatePasswordStrength(0);
        return false;
    } else {
        clearErrorMessage(input);
    }
    if(password.length >= 8){
        strength += 25;
    }
    if(minusculeRegex.test(passwordValue)){
        strength += 25;
    }
    if(majuculeRegex.test(passwordValue)){
        strength += 25;
    }
    if(chiffreRegex.test(passwordValue)){
        strength += 25;
    }
    if(charSpeRegex.test(passwordValue)){
        strength += 25;
    }
    updatePasswordStrength(strength);

    if(strength < 100){
        message = "Le mot de passe doit contenir au mois 8 charactères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 charactère spécial."
        writeErrorMessage(input, message);
        return false;
    } else {
        clearErrorMessage(input);
       
        return true;
    }
}


function updatePasswordStrength(strength){
    const passwordStrength = document.getElementById("passwordStrength");
    passwordStrength.value = strength;
}

function verifConfirmPassword(input) {
    const confirmValue = input.value.trim();
    const passwordValue = document.getElementById("password").value.trim();

    if (confirmValue === "") {
        message = "Ce champ ne peut pas être vide";
        writeErrorMessage(input, message);
        return false;
    } else if (confirmValue !== passwordValue) {
        message = "La confirmation doit être identique au mot de passe.";
        writeErrorMessage(input, message);
        return false;
    } else {
        clearErrorMessage(input);
        return true;
    }
}

// Message d'erreur écrit en rouge sous chaque input 
function writeErrorMessage(input, message) {
    let existingError = input.nextElementSibling;
    if (existingError && existingError.classList.contains("error-message")) {
        existingError.innerText = message;
        return;
    }
    let errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    errorMessage.innerText = message;

    input.insertAdjacentElement("afterend", errorMessage);
}
// Effacer le message d'erreur à chaque fois que ca a été corrigé
function clearErrorMessage(input) {
    let existingError = input.nextElementSibling;
    if (existingError && existingError.classList.contains("error-message")) {
        existingError.remove();
    }
}




document.getElementById("cancelButton").addEventListener("click", function(event){
    location.reload();
})