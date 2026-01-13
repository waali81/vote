// Näyttää login tai register modalin
function showModal(action) {
    currentAction = action; // Tallenetaan nykyinen toiminto, login tai register
    modal.style.display = "block"; // Näytetään modal
    modalTitle.textContent = action === "login" ? "Kirjaudu sisään" : "Rekisteröidy"; // Asetetaan otsikko
    submitBtn.textContent = action === "login" ? "Kirjaudu" : "Rekisteröidy"; // Vaihdetaan submitin teksti
    roleRadios.style.display = action === "register" ? "block" : "none"; // Roolivalinta vain rekisteröitymisessä
}

closeBtn.onclick = () => modal.style.display = "none"; // Modalin sulkeminen

loginBtn.addEventListener('click', () => showModal("login")); // Avaa kirjautumismodalin
registerBtn.addEventListener('click', () => showModal("register")); // Avaa rekisteröitymismodalin

// Lomakkeen käsittely
modalForm.addEventListener('submit', (e) => { // Lomakkeen lähetys
    e.preventDefault(); // Estää sivun uudelleenlatauksen

    // Haetaan käyttäjätiedot
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Tarkistetaan, että kentätä on töytetty
    if (!username || !password) {
        alert("Täytä kaikki kentät!");
        return;
    }

    // Rekisteröinti
    if (currentAction === "register") {
        // Tarkistetaan onko käyttäjätunnus olemassa
        if (localStorage.getItem(`user_${username}`)) {
            alert("Käyttäjätunnus on jo käytössä!"); // Jos on, ilmoitus käyttäjälle
        } else {
            const role = document.querySelector('input[name="role"]:checked').value; // Haetaan valittu rooli
            localStorage.setItem(`user_${username}`, JSON.stringify({ password, role })); // Tallennetaan käyttäjä localStorageen
            const shy = "\u00AD"; // Tavuviiva
            infoMessage.textContent = `Rekisteröity${shy}minen onnistui, ${username}!`; // Näytetään rekisteröitymisen onnistumisviesti
            modal.style.display = "none"; // Suljetaan modal
        }
    
    }
    // Kirjautuminen
    else {
        const stored = localStorage.getItem(`user_${username}`); // Haetaan käyttäjätiedot localStoragesta
        if (!stored) { // Jos käyttäjätietoja ei löydy, ilmoitetaan siitä käyttäjälle
            alert("Käyttäjää ei löydy, muista rekisteröityä!");
        } else {
            const userData = JSON.parse(stored);
            if (userData.password === password) { // Tarkistetaan salasana
                localStorage.setItem("loggedInUser", username); // Tallennetaan kirjautunut käyttäjä
                infoMessage.textContent = `Tervetuloa, ${username}!`; // Viesti käyttäjälle
                modal.style.display = "none"; // Suljetaan modal
            } else { // Jos väärä salasana, ilmoitus käyttäjälle
                alert("Väärä salasana!");
            }
        }
    }

    // Tyhjennetään lomake ja päivitetään napit
    modalForm.reset();
    updateButtons();
});

// Uloskirjautuminen
logoutBtn.addEventListener('click', () => {
    infoMessage.textContent = `Tervemenoa, ${localStorage.getItem('loggedInUser')}!`;
    localStorage.removeItem('loggedInUser'); //Poistetaan kirjautunut käyttäjä
    updateButtons(); // Päivitetään napit
});