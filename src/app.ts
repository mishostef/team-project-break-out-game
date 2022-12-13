import { update } from "./engine/gameLoop";
console.log('app.ts')
const playBtn = document.getElementById('play-btn');

playBtn.addEventListener('click', () => {
    document.getElementById('container').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';

    showDetails();
    startGame();
});

document.getElementById('setting-btn').addEventListener('click', () => {
    const settingsContainer = document.getElementById('settings-container');
    const container = document.getElementById('container');

    settingsContainer.style.display = 'block';
    container.style.display = 'none';

    document.getElementById('back-btn').addEventListener('click', () => {
        settingsContainer.style.display = 'none';
        container.style.display = 'block';
    })
})

function startGame() {
    update(performance.now());
}

function showDetails() {
    const detailsBox = document.getElementById('details-box');
    detailsBox.style.display = 'flex';
    detailsBox.style.justifyContent = 'space-around';
}