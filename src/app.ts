import { Brick } from "./figures/Brick";
import { Vector } from "./utils/vector";

const playBtn = document.getElementById('play-btn');

playBtn.addEventListener('click', () => {
    document.getElementById('container').style.display = 'none';
    startGame();
})

function startGame() {
    const bricksImage = [
        "/assets/brick-blue.png",
        "/assets/brick-green.png",
        "/assets/brick-purple.png",
        "/assets/brick-red.png",
        "/assets/brick-yellow.png"
    ]

    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');

    let x = 40;
    let y = 10;

    const bricks: Brick[] = [];

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 10; col++) {
            const pos: Vector = {
                x,y
            }
            const randPos = Math.random() * bricksImage.length | 0;
            const brick = new Brick(pos, bricksImage[randPos])
            bricks.push(brick);
            x += 110;
        }
    
        x = 40;
        y += 50;
    }
    
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < bricks.length; c++) {
            const brick = bricks[c];
            drawImage(brick.position.x, brick.position.y, brick.getImage())
        }
    }

    function drawImage(x: number, y: number, source: string) {
        const brick = new Image();
        brick.src = source;

        brick.onload = () => {
            ctx.drawImage(brick, x, y, 100, 40);
        }
    }
}