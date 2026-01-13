createPollBtn.addEventListener('click', () => pollModal.style.display = 'block'); // Avataan äänestyksen luomismodal
closePoll.addEventListener('click', () => pollModal.style.display = 'none'); // Suljetaan modal

// Lisätään vaihtoehto äänestykseen
addOptionBtn.addEventListener('click', () => {
    const input = document.createElement('input'); // Luodaan syötekenttä
    input.type = 'text'; // Tekstikenttä
    input.className = 'pollOption'; // Luokan asetus
    input.placeholder = `Vaihtoehto ${pollForm.querySelectorAll('.pollOption').length + 1}`; // Vaihtoehdon numerointi automaattisesti
    pollForm.insertBefore(input, addOptionBtn); // Lisätään kenttä ennen nappia
});

// Äänestyksen luominen
pollForm.addEventListener('submit', (e) => { // Lomakkeen lähetys
    e.preventDefault(); // Uudelleen latauksen esto

    // Haetaan kysymys ja vaihtoehdot
    const question = document.getElementById('pollQuestion').value.trim(); // Kysymys, poistetaan tyhjät välit
    const options = [...document.querySelectorAll('.pollOption')] // Vaihtoehdot
        .map(o => o.value.trim()) // Otetaan arvo, poistetaan tyhjät välit
        .filter(Boolean); // Poistetaan tyhjät vaihtoehdot

    // Ainakin 2 vaihtoehtoa vaaditaan
    if (!question || options.length < 2) { // Jos kysymys tyhjä, vaihtoehtoja alle 2 - ilmoitus käyttäjälle
        alert("Kirjoita kysymys ja vähintään kaksi vaihtoehtoa!");
        return;
    }

    // Tallennetaan äänestys
    const polls = getPolls(); // Haetaan äänestykset
    polls.push({ question, options }); // Lisätään uusi äänestys taulukkoon
    savePolls(polls); // Tallennetaan äänestykset

    infoMessage.textContent = "Äänestys on luotu!";
    pollForm.reset(); // Tyhjennetään lomake

    // 2 vaihtoehtoa jätetään, muut poistetaan
    pollForm.querySelectorAll('.pollOption')
        .forEach((opt, i) => i > 1 && opt.remove());

    pollModal.style.display = 'none'; // Modalin sulkeminen
    renderPolls(); // Päivitetään äänestykset
});

// Renderöidään äänestykset
function renderPolls() {
    const polls = getPolls(); // Haetaan äänestykset
    const loggedUser = localStorage.getItem('loggedInUser'); // Kirjautunut käyttäjä
    pollContainer.innerHTML = ''; // Tyhjennetään äänestyscontainer

    // Jos äänestyksiä ei ole, näytetään viesti
    if (polls.length === 0) {
        const msg = document.createElement('p'); // Luodaan viestielementti
        msg.textContent = "Ei äänestyksiä saatavilla."; // Asetetaan viestin teksti
        msg.style.fontStyle = "italic";
        msg.style.opacity = "0.7";
        pollContainer.appendChild(msg); // Lisätään viesti
        return;
    }
    // Käydään äänestykset läpi
    polls.forEach((poll, index) => {
        const pollDiv = document.createElement('div'); // Luodaan äänestyskortti
        pollDiv.className = 'poll'; // Äänestyskortin tyyli

        const question = document.createElement('h3'); // Kysymyksen luonti
        question.textContent = poll.question; // Kysymyksen teksti
        pollDiv.appendChild(question); // Lisätään kysymys korttiin

        // Tarkistetaan kirjautuminen
        if (!loggedUser) { // Jos käyttäjä ei ole kirjautunut
            const info = document.createElement('p'); // Luodaan infoelementti
            info.textContent = "Kirjaudu sisään ja osallistu äänestykseen."; // Ilmoitus käyttäjälle
            info.style.fontStyle = "italic";
            info.style.opacity = "0.7";
            pollDiv.appendChild(info); // Lisätään info korttiin
            pollContainer.appendChild(pollDiv); // Lisätään äänestyskortti containeriin
            return; // Lopetus
        }

        const userData = JSON.parse(localStorage.getItem(`user_${loggedUser}`)); // Haetaan käyttäjätiedot
        const voted = poll.voters && poll.voters.includes(loggedUser); // Käyttäjän äänestyksen tarkistus
        // Lasketaan äänet
        const totalVotes = poll.votes // Äänimäärä
            ? poll.votes.reduce((a, b) => a + b, 0) // Summa kaikista äänistä
            : 0; // Jos ei ääniä, nolla

        // Äänestysvaihtoehdot
        if (!voted) { //Jos käyttäjä ei ole äänestänyt
            poll.options.forEach((option, idx) => { // Käydään vaihtoehdot läpi
                const optionDiv = document.createElement('div'); // Luodaan äänestyskortti
                optionDiv.className = 'poll-option poll-option--vote'; // Äänestysvaihtoehdon tyyli

                // Luodaan radio-nappi
                const radio = document.createElement('input'); // Luodaan elementti
                radio.type = 'radio'; // Radiotyyppi
                radio.name = `poll_${index}`; // Kysymyksen indeksi
                radio.value = idx; // Vaihtoehdon indeksi

                const label = document.createElement('label'); // Label vaihtoehdolle
                label.textContent = option; // Asetetaan vaihtoehdon teksti
                label.style.marginLeft = '6px'; // Väli radion ja tekstin väliin

                optionDiv.appendChild(radio); // Lisätään radio korttiin
                optionDiv.appendChild(label); // Lisätään label korttiin
                pollDiv.appendChild(optionDiv); // Lisätään vaihtoehto korttiin
            });

            const voteBtn = document.createElement('button'); // Äänestysnapin luonti
            voteBtn.textContent = "Äänestä"; // Napin teksti
            voteBtn.addEventListener('click', () => vote(index)); // Äänestystoiminto
            pollDiv.appendChild(voteBtn); // Lisätään äänestysnappi korttiin
        }
        // Äännestystulosten näyttäminen
        if (voted) { // Jos käyttäjä on äänestänyt
            poll.options.forEach((option, idx) => { // Käydään vaihtoehdot läpi
                const votes = poll.votes ? poll.votes[idx] : 0; // Haetaan vaihtoehdon äänet

                const optionDiv = document.createElement('div'); // Luodaan vaihtoehtokortti
                optionDiv.className = 'poll-option poll-option--result'; // Tyyli tulosksortille

                const label = document.createElement('span'); //Label vaihtoehdolle
                label.textContent = option; // Asetetaan vaihtoehdon teksti
                optionDiv.appendChild(label); // Lisätään label korttiin

                // Luodaan prosenttipalkki, jos ääniä on ännettu
                if (votes > 0) { //Jos vaihtoehdolla on ääniä
                    const bar = document.createElement('div'); // Luodaan palkki
                    bar.className = 'poll-bar'; // Palkin tyyli
                    bar.style.width = `${(votes / totalVotes) * 100}%`; // Palkin leveys prosentteina
                    bar.textContent = `${Math.round((votes / totalVotes) * 100)}%`; // Prosenttiosuus palkkiin
                    optionDiv.appendChild(bar); // Lisätään pallki korttiin
                }
                
                // Äänimäärän näyttäminen
                const voteCount = document.createElement('span'); // Luodaan äänimääräelementti
                voteCount.className = 'vote-count'; // Tyyli äänimäärälle
                voteCount.textContent = `Äänet: ${votes}`; // Äänimäärä
                voteCount.style.display = 'block'; // Uudelle riville
                optionDiv.appendChild(voteCount); // Lisätään äänimäärä kortille

                pollDiv.appendChild(optionDiv); // Lisätään vaihtoehto kortille
            });
        }
        
        // Äänestysten poistonappi adminille
        if (userData.role === "admin") { //Takistetaan onko kirjautunut adminina
            const deleteBtn = document.createElement('button'); // Luodaan poistonappi
            deleteBtn.textContent = "Poista äänestys"; // Napille teksti
            deleteBtn.style.backgroundColor = "#FF4B5C"; // Napille taustaväri
            deleteBtn.style.color = "white"; // Napin tekstin väri
            
            // Poistonapin toiminto
            deleteBtn.addEventListener('click', () => {
                if (confirm("Haluatko varmasti poistaa tämän äänestyksen?")) { // Varmistus ennen poistoa
                    polls.splice(index, 1); // Poistetaan äänestys
                    savePolls(polls); // Tallennetaan muutokset
                    infoMessage.textContent = "Äänestys poistettu!"; // Ilmoitus käyttäjälle
                    renderPolls(); // Päivitetään äänestykset
                }
            });

            pollDiv.appendChild(deleteBtn); // Lisätään poistonappi korttiin
        }

        pollContainer.appendChild(pollDiv); // Lisätään äänestyskortti containeriin
    });
}

// Äänestäminen
function vote(pollIndex) {
    const polls = getPolls(); // Haetaan äänestykset
    const poll = polls[pollIndex]; // Valittu äänestys
    const user = localStorage.getItem('loggedInUser'); // Kirjautunut käyttäjä

    if (!poll.votes) poll.votes = Array(poll.options.length).fill(0); // Äänimäärien alustaminen
    if (!poll.voters) poll.voters = []; // Äänestäjien alustaminen

    if (poll.voters.includes(user)) return; // Jos käyttäjä äänestänyt, lopetus

    const selected = document.querySelector(`input[name="poll_${pollIndex}"]:checked`); // Valittu vaihtoehto
    if (!selected) { // Jos mitään ei ole valittu
        alert("Valitse vaihtoehto!"); // Ilmoitus käyttäjälle
        return; // Lopetus
    }

    poll.votes[selected.value]++; // Lisätään ääni valitulle vaihtoehdolle
    poll.voters.push(user); // Lisätään käyttäjä äänestäneiden listaan

    savePolls(polls); // Tallennetaan äänestykset
    infoMessage.textContent = `Kiitos äänestäsi, ${user}!`; // Viesti käyttäjälle äänestyksen jälkeen
    renderPolls(); // Päivitetään äänestykset
}
