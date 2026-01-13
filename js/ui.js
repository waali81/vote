// Päivitetään napit kirjautumisen mukaan
function updateButtons() {
    const loggedUser = localStorage.getItem('loggedInUser'); // Haetaan kirjautunut käyttäjä

    // Jos kirjaunut käyttäjä, näytetään uloskirjautumisnappi
    if (loggedUser) {
        loginBtn.style.display = "none"; // Piilotetaan kirjautumisnappi
        registerBtn.style.display = "none"; // Piilotetaan rekisteröitymisnappi
        logoutBtn.style.display = "inline-block";

        const userData = JSON.parse(localStorage.getItem(`user_${loggedUser}`)); // Haetaan käyttäjätiedot (admin vai käyttäjä)
        createPollBtn.style.display = userData.role === "admin" ? "inline-block" : "none"; // Adminille äänestyksen luomisnappi
    } else { // Muuten näytetään kirjautumis- ja rekisteröitymisnapit
        loginBtn.style.display = "inline-block";
        registerBtn.style.display = "inline-block";
        logoutBtn.style.display = "none"; // Piilotetaan uloskirjautumisnappi
        createPollBtn.style.display = "none"; // Piilotetaan Äänestyksen luomisnappi
    }

    renderPolls(); // Päivitetään äänestykset
}