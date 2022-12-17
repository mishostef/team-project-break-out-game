import { EASY_LEVEl, HARD_LEVEL, MEDIUM_LEVEL } from "./constants";
import { DOMView } from "../view/DOMView";

const dom = DOMView.getInstance();

export function setGameLevel(input: HTMLInputElement) {
    document.querySelectorAll('input').forEach((input) => {
        input.checked = false;
    });
    input.checked = true;

    switch (input.id) {
        case "easy":
            return EASY_LEVEl;
        case "medium":
            return MEDIUM_LEVEL;
        case "hard":
            return HARD_LEVEL;
    }
}

export function showGameOverMessage(scorePoints: number) {
    const gameoverDiv = dom.getElement("#gameOver");

    gameoverDiv.style.display = "block";
    (gameoverDiv as HTMLDivElement).innerText = `Game over, score:${scorePoints}`;
  }

