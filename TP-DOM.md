# TP DOM – Création d’une interface de profil utilisateur dynamique

## Objectif

Créer une **interface interactive** en JavaScript pur (sans bibliothèque) permettant à un utilisateur de **créer un petit profil personnalisé** avec un thème, un pseudo, une description et un avatar.

Ce travail entraîne à **manipuler le DOM**, **gérer les événements**, **valider les entrées utilisateur**, et **mettre à jour dynamiquement l’interface**.

---

## Contraintes techniques

- **Aucun framework** ou bibliothèque externe n’est autorisé.
- HTML et CSS peuvent être simples ou fournis, tout se joue en **JavaScript**.
- Le code JS doit être **structuré, lisible, commenté**.

---

## Structure attendue de l’interface

L’interface contiendra les éléments suivants :

1. **Un sélecteur de thème Light/Dark**, toujours accessible en bas de l'écran.
2. **Une description** (type slogan) qui change aléatoirement parmi 3 propositions :
    - au **chargement de la page**,
    - et à l’**appui sur un bouton "Changer de description"**.
3. **Un champ input pour entrer un pseudo** :
    - Le pseudo ne doit contenir **que des lettres (a-z, A-Z)**.
    - Aucune validation côté HTML : **tout se fait en JS**.
4. **Un choix d’avatar parmi 3 images** (affichées en miniatures, type 40x40 ou à adapter pour la lisibilité).
    - Un seul avatar peut être sélectionné à la fois.
5. **Un bouton "Suivant" désactivé par défaut**, qui s’active uniquement si :
    - Un **pseudo valide** est entré
    - Une **description est sélectionnée**
    - Un **avatar est choisi**

---

## Comportement à implémenter

### 1. Thème Light/Dark

- Une zone cliquable permet de **changer le thème** clair ↔ sombre.
- Le thème doit modifier **au moins** :
    - la couleur de fond
    - la couleur du texte

### 2. Description dynamique

- Trois phrases de description sont proposées.
- Une de ces phrases est affichée :
    - automatiquement au chargement de la page
    - manuellement via un bouton "Changer de description"
- Le changement doit se faire **sans répétition immédiate**.

### 3. Champ pseudo

- L'utilisateur entre son pseudo dans un champ texte.
- Le champ est **validé dynamiquement** :
    - uniquement des lettres
    - en cas d'erreur, un message ou une couleur signale le problème.

### 4. Choix d’un avatar

- Trois images d’avatar sont affichées en miniatures.
- L’utilisateur clique pour sélectionner **un seul avatar** à la fois.
- Le style de l’avatar sélectionné est visuellement identifiable (bordure, ombre, etc.).

### 5. Bouton "Suivant"

- Il est **grisé / désactivé** tant que tous les critères ne sont pas remplis.
- Lorsqu’un pseudo valide est saisi, qu’une description est présente et qu’un avatar est choisi, le bouton devient **cliquable**.

### 6. Résumé final

- En appuyant sur le bouton "Suivant", le **formulaire disparaît**.
- À la place, une **carte profil (card)** apparaît, contenant :
    - le pseudo
    - la description
    - l’avatar choisi
- Un bouton "Réinitialiser" ou "Recommencer" (optionnel) peut rétablir le formulaire.

---

## Conseils

- Travailler **par étape**, commencer par une fonctionnalité simple avant de tout intégrer.
- Utiliser les événements `input`, `click`, `change`, `DOMContentLoaded`.
- Utiliser `classList.add/remove/toggle` pour les styles.
- Pour vérifier si un champ est valide, utiliser des **regex** : `/^[a-zA-Z]+$/`
- Penser à **factoriser le code** (évite les répétitions).
- Commenter !

---

## À rendre

- Un fichier `.html` avec l’interface
- Un fichier `.js` propre et commenté
- Un fichier `.css` pour personnaliser le style

---

## Bonus

- Ajouter une animation CSS à l’apparition de la card
- Rendre l’interface **responsive** et adaptée aux mobiles
- Ajouter une validation pour interdire les pseudos trop courts (ex : < 3 lettres)