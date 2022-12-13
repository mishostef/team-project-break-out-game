import { update } from "./engine/gameLoop";

const playBtn = document.getElementById('play-btn');

playBtn.addEventListener('click', () => {
    document.getElementById('container').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';

    showDetails();
    startGame();
});

function startGame() {
    update(performance.now());
}

function showDetails() {
    const detailsBox = document.getElementById('details-box');
    detailsBox.style.display = 'flex';
    detailsBox.style.justifyContent = 'space-around';
}