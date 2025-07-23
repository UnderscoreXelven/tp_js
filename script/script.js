function randomDescription() {
    const descriptions = ["Haribo c'est beau la vie", "Oui c'est bien moi", "Hey bonjour à tous"];
    const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
    const element = document.querySelector(".description-profil");
    element.textContent = randomDesc;
}

document.addEventListener("DOMContentLoaded", () => {
    // Variables éléments
    const btnDesc = document.querySelector(".description-button");
    const avatars = document.querySelectorAll("#form-avatars img");
    const pseudoInput = document.getElementById("pseudo");
    const nextButton = document.getElementById("next-button");
    const descriptionEl = document.querySelector(".description-profil");
    const form = document.querySelector("form");
    const profileCard = document.getElementById("profile-card");
    const errorContainer = document.getElementById("form-pseudo");

    // Message erreur pseudo
    const errorMessage = document.createElement("span");
    errorMessage.classList.add("error-message")
    errorContainer.appendChild(errorMessage);

    // Fonction validation formulaire
    function validateForm() {
        const pseudo = pseudoInput.value.trim();
        const isPseudoValid = /^[A-Za-zÀ-ÿ]+$/.test(pseudo);
        const isAvatarSelected = document.querySelector(".selected-avatar") !== null;
        const isDescriptionPresent = descriptionEl.textContent.trim().length > 0;

        if (!isPseudoValid && pseudo.length > 0) {
            errorMessage.textContent = "Le pseudo ne doit contenir que des lettres.";
        } else {
            errorMessage.textContent = "";
        }

        nextButton.disabled = !(isPseudoValid && isAvatarSelected && isDescriptionPresent);
    }

    // Reset complet du profil et formulaire
    function resetProfile() {
        profileCard.style.display = "none";
        form.style.display = "flex";
        nextButton.disabled = true;
        pseudoInput.value = "";
        avatars.forEach(img => img.classList.remove("selected-avatar"));
        errorMessage.textContent = "";
        localStorage.removeItem("user-profile");
        randomDescription();
        validateForm();
    }

    // Affiche la carte profil avec données, et attache listener unique au bouton reset
    function showProfileCard(profile) {
        form.style.display = "none";
        profileCard.innerHTML = `
            <img src="${profile.avatar}" alt="Avatar de ${profile.pseudo}">
            <h2>${profile.pseudo}</h2>
            <p>${profile.description}</p>
            <button id="reset-button">Recommencer</button>
        `;
        profileCard.style.display = "block";

        const resetBtn = document.getElementById("reset-button");
        resetBtn.addEventListener("click", resetProfile);
    }

    // Gestion dark mode
    const toggle = document.querySelector('#dark-mode-container input[type="checkbox"]');
    const savedDarkMode = localStorage.getItem('dark-mode') === 'true';
    toggle.checked = savedDarkMode;
    document.body.classList.toggle('dark-mode', savedDarkMode);

    toggle.addEventListener('change', () => {
        const enabled = toggle.checked;
        document.body.classList.toggle('dark-mode', enabled);
        localStorage.setItem('dark-mode', enabled);
    });

    // Description initiale
    randomDescription();

    // Vérifie s'il existe un profil sauvegardé
    const savedProfile = JSON.parse(localStorage.getItem("user-profile"));
    if (savedProfile) {
        showProfileCard(savedProfile);
    }

    // Bouton changer description
    btnDesc.addEventListener("click", (event) => {
        event.preventDefault();
        randomDescription();
        validateForm();
    });

    // Gestion sélection avatar
    avatars.forEach(img => {
        img.addEventListener("click", () => {
            avatars.forEach(i => i.classList.remove("selected-avatar"));
            img.classList.add("selected-avatar");
            validateForm();
        });
    });

    // Validation en temps réel pseudo
    pseudoInput.addEventListener("input", validateForm);

    // Afficher la carte profil au clic sur Suivant
    nextButton.addEventListener("click", () => {
        const pseudo = pseudoInput.value.trim();
        const description = descriptionEl.textContent.trim();
        const avatar = document.querySelector(".selected-avatar");

        if (!pseudo || !description || !avatar) return;

        const profileData = {
            pseudo,
            description,
            avatar: avatar.src
        };

        // Sauvegarde le profil
        localStorage.setItem("user-profile", JSON.stringify(profileData));

        // Affiche la carte avec les données
        showProfileCard(profileData);
    });
});