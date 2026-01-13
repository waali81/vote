// Elementit
const logoutBtn = document.getElementById('logoutBtn');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalForm = document.getElementById('modalForm');
const submitBtn = document.getElementById('submitBtn');
const closeBtn = document.querySelector('.close');
const infoMessage = document.getElementById('infoMessage');
const roleRadios = document.getElementById('roleRadios');

const createPollBtn = document.getElementById('createPollBtn');
const pollModal = document.getElementById('pollModal');
const pollForm = document.getElementById('pollForm');
const closePoll = document.getElementById('closePoll');
const addOptionBtn = document.getElementById('addOptionBtn');
const pollContainer = document.getElementById('pollContainer');

// Tallentaa nykyisen toiminnnon, login tai register
let currentAction = "";

// Hakee äänestykset localStoragesta
function getPolls() {
    return JSON.parse(localStorage.getItem('polls') || '[]'); // Palauttaa tyhjän taulukon, jos äänestyksiä ei ole
}

// Tallentaa äänestykset localStorageen
function savePolls(polls) {
    localStorage.setItem('polls', JSON.stringify(polls)); // Taulukko merkkijonoksi ja tallennus
}

// Nappien päivitys sivun latautuessa
document.addEventListener('DOMContentLoaded', () => {
    updateButtons();
});