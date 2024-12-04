document.getElementById("signinForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Empeche le rechargement de la page
    handleFormSubmit();
});

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
        saveUserLocalStorage(user);
        alert("Compte enregistré avec succès.");
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
        return;
    } else {
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
    }
    //
    
    console.log("Utilisateur enregistré dans le localStorage :", localStorage.getItem("users")); // Confirme le contenu
    console.log("Utilisateur enregistré dans le local storage :", newUser);
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
                case "password":
                    verifPassword(champ);
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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^_&*])(?=.{8,})/;

    if (passwordValue === "") {
        message = "Ce champ ne peut pas être vide";
        writeErrorMessage(input, message);
        return false;
    } else if (!passwordRegex.test(passwordValue)) {
        message = "Le mot de passe doit contenir au moins 8 caractères, un chiffre et un caractère spécial";
        writeErrorMessage(input, message);
        return false;
    } else {
        clearErrorMessage(input);
        return true;
    }
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