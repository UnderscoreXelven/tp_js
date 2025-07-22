function randomDescription(){
    const descriptions = ["Haribo c'est beau la vie", "Oui c'est bien moi", "Hey bonjour à tous"];
    const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
    const element = document.querySelector(".description-profil");
    element.textContent = randomDesc;
}

document.addEventListener("DOMContentLoaded", () => {
    // Description initiale
    randomDescription();

    // Dark mode toggle avec sauvegarde
    const toggle = document.querySelector('#dark-mode-container input[type="checkbox"]');
    const savedDarkMode = localStorage.getItem('dark-mode') === 'true';
    toggle.checked = savedDarkMode;
    document.body.classList.toggle('dark-mode', savedDarkMode);

    toggle.addEventListener('change', () => {
        const enabled = toggle.checked;
        document.body.classList.toggle('dark-mode', enabled);
        localStorage.setItem('dark-mode', enabled);
    });

    // Variables éléments
    const btnDesc = document.querySelector(".description-button");
    const avatars = document.querySelectorAll("#form-avatars img");
    const pseudoInput = document.getElementById("pseudo");
    const nextButton = document.getElementById("next-button");
    const descriptionEl = document.querySelector(".description-profil");
    const form = document.querySelector("form");
    const profileCard = document.getElementById("profile-card");

    // Message erreur pseudo
    const errorMessage = document.createElement("span");
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "0.9em";
    errorMessage.style.textAlign = "center";
    errorMessage.style.marginTop = "5px";
    document.getElementById("form-pseudo").appendChild(errorMessage);

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

        // Cacher formulaire et afficher carte profil
        form.style.display = "none";

        profileCard.innerHTML = `
            <img src="${avatar.src}" alt="Avatar de ${pseudo}">
            <h2>${pseudo}</h2>
            <p>${description}</p>
            <button id="reset-button">Recommencer</button>
        `;

        profileCard.style.display = "block";

        // Bouton recommencer
        document.getElementById("reset-button").addEventListener("click", () => {
            profileCard.style.display = "none";
            form.style.display = "flex";
            nextButton.disabled = true;
            pseudoInput.value = "";
            descriptionEl.textContent = "";
            avatars.forEach(img => img.classList.remove("selected-avatar"));
            errorMessage.textContent = "";
        });
    });
});