import { update } from "./engine/gameLoop";

const playBtn = document.getElementById('play-btn');

playBtn.addEventListener('click', () => {
    document.getElementById('container').style.display = 'none';
    startGame();
});

function startGame() {
    update(performance.now());
}
