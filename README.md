Käyttötapauskuvaukset

# 1. Rekisteröityminen käyttäjäksi

    Käyttäjät: Käyttäjä
    Laukaisija: Henkilö haluaa rekisteröityä käyttäjäksi, jotta voi äänestää
    Esiehto: Henkilö ei ole aiemmin rekisteröitynyt
    Jälkiehto: Käyttäjätili on luotu ja tallennettu
    Käyttötapauksen kulku:
        1. Henkilö avaa käyttäjäksi rekisteröitymiskohdan
        2. Henkilö syöttää tiedot (nimi, salasana)
        3. Järjestelmä validoi tiedot ja luo käyttäjätilin
        4. Järjestelmä vahvistaa onnistuneen rekisteröitymisen
    Poikkeuksellinen toiminta:
        1. Syötetyt tiedot ovat virheellisiä --> ilmoitus virheistä ja korjauspyynnöt henkilölle
        2. Tunnukset on jo käytössä --> ilmoitus henkilölle


# 2. Rekisteröityminen ylläpitäjäksi

    Käyttäjät: Ylläpitäjä
    Laukaisija: Henkilö haluaa rekisteröityä ylläpitäjäksi, hallitakseen äänestyksiä ja äänestääkseen
    Esiehto: Henkilö ei ole aiemmin rekisteröitynyt
    Jälkiehto: Ylläpitäjätili on luotu ja tallennettu
    Käyttötapauksen kulku:
        1. Henkilö avaa ylläpitäjäksi rekisteröitymiskohdan
        2. Henkilö syöttää tiedot (nimi, salasana)
        3. Järjestelmä validoi tiedot ja luo ylläpitäjätilin
        4. Järjestelmä vahvistaa onnistuneen rekisteröitymisen
    Poikkeuksellinen toiminta:
        1. Syötetyt tiedot ovat virheellisiä --> ilmoitus virheistä ja korjauspyynnöt
        2. Tunnukset on jo käytössä --> ilmoitus


# 3. Kirjautuminen

    Käyttäjät: Käyttäjä, ylläpitäjä
    Laukaisija: Käyttäjä/ylläpitäjä haluaa käyttää järjestelmää omalla tilillään
    Esiehto: Tili on olemassa
    Jälkiehto: Käyttäjä/ylläpitäjä on kirjautunut sisään
    Käyttötapauksen kulku:
        1. Syöttää nimen ja salasanan
        2. Järjestelmä tarkistaa tiedot
        3. Käyttäjä/ylläpitäjä kirjautuu sisään omaan näkymäänsä
    Poikkeuksellinen toiminta:
        1. Virheellinen salasana --> ilmoitus virheestä
        2. Tiliä ei löydy --> kehoitus rekisteröityä


# 4. Selaa äänestyksiä

    Käyttäjät: Käyttäjä, ylläpitäjä
    Laukaisija: Henkilö haluaa nähdä äänestykset
    Esiehto: Henkilö on kirjautunut sisään
    Jälkiehto: Henkilö näkee äänestykset
    Käyttötapauksen kulku:
        1. Järjestelmä hakee äänestykset
        2. Näyttää äänestykset henkilölle
    Poikkeuksellinen toiminta:
        1. Ei äänestyksiä --> järjestelmä ilmoittaa, ettei äänestyksiä ole luotu


# 5. Osallistuu äänestykseen

    Käyttäjät: Käyttäjä, ylläpitäjä
    Laukaisija: Käyttäjä haluaa äänestää
    Esiehto: Käyttäjä on kirjautunut sisään ja äänestys luotu
    Jälkiehto: Käyttäjän ääni tallennettu
    Käyttötapauksen kulku:
        1. Käyttäjä avaa äänestyksen
        2. Käyttäjä valitsee vaihtoehdon
        3. Annettu ääni tallennetaan
    Poikkeuksellinen toiminta:
        1. Käyttäjä on jo äänestänyt äänestyksessä --> järjestelmä estää äänestyksen uudestaan


# 6. Seuraa äänestystilannetta

    Käyttäjät: Käyttäjä, ylläpitäjä
    Laukaisija: Henkilö haluaa nähdä äänestystilanteen
    Esiehto: Käyttäjä on kirjautunut sisään
    Jälkiehto: Tilanne näytetään henkilölle
    Käyttötapauksen kulku:
        1. Käyttäjä avaa äänestyksen
        2. Järjestelmä hakee äänestysyilanteen ja näyttää sen


# 7. Luo äänestyksiä

    Käyttäjät: Ylläpitäjä
    Laukaisija: Ylläpitäjä haluaa luoda uuden äänestyksen
    Esiehto: Ylläpitäjä on kirjautunut sisään
    Jälkiehto: Uusi äänestys on luotu ja tallennettu
    Käyttötapauksen kulku:
        1. Ylläpitäjä avaa äänestyksen luontinäkymän
        2. Syöttää äänestyksen tiedot (kysymys, vaihtoehdot)
        3. Uusi äänestys tallennetaan
        4. Vahvistetaan onnistunut äänestyksen luominen
    Poikkeuksellinen toiminta:
        1. Puuttuvat tiedot --> pyyntö tietojen täydentämiseen


# 8. Poistaa äänestyksiä

    Käyttäjät: Ylläpitäjä
    Laukaisija: Ylläpitäjä haluaa poistaa äänestyksen
    Esiehto: Ylläpitäjä on kirjautunut sisään ja äänestys on luotu
    Jälkiehto: Äänestys on poistettu järjestelmästä
    Käyttötapauksen kulku:
        1. Ylläpitäjä avaa poistettavan äänestyksen
        2. Ylläpitäjä valitsee "Poista"
        3. Järjestelmä pyytää varmistuksen
        4. Ylläpitäjä vahvistaa poistamisen
        5. Järjestelmä poistaa äänestyksen