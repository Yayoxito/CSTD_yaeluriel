/*
 * Yael Uriel Ordaz García
 * Videogame breakout
 * 2026-03-25
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

// Context of the Canvas
let ctx;

// A variable to store the game object
let game;

// Variable to store the time at the previous frame
let oldTime = 0;

let playerSpeed = 0.5;
let ballSpeed = 0.5;
let superBallSpeed = 0.9;

//Variable para el cartel de puntos
let breaks = 0;
//Variable que para mostrar "game over" o "you win" sea el caso
let result;

// Class for the main character in the game
class Player extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "player", sheetCols);
        this.velocity = new Vector(0, 0);

        this.motion = {
            left: {
                axis: "x",
                sign: -1,
            },
            right: {
                axis: "x",
                sign: 1,
            },
        }

        // Keys pressed to move the player
        this.keys = [];
    }

    update(deltaTime) {
        // Restart the velocity
        this.velocity.x = 0;
        this.velocity.y = 0;
        // Modify the velocity according to the directions pressed
        for (const direction of this.keys) {
            const axis = this.motion[direction].axis;
            const sign = this.motion[direction].sign;
            this.velocity[axis] += sign;
        }

        this.velocity = this.velocity.normalize().times(playerSpeed);

        this.position = this.position.plus(this.velocity.times(deltaTime));

        this.clampWithinCanvas();
    }

    clampWithinCanvas() {
        // Top border
        if (this.position.y - this.halfSize.y < 0) {
            this.position.y = this.halfSize.y;
        // Left border
        }
        if (this.position.x - this.halfSize.x < 0) {
            this.position.x = this.halfSize.x;
        // Bottom border
        }
        if (this.position.y + this.halfSize.y > canvasHeight) {
            this.position.y = canvasHeight - this.halfSize.y;
        // Right border
        }
        if (this.position.x + this.halfSize.x > canvasWidth) {
            this.position.x = canvasWidth - this.halfSize.x;
        }
    }
}


class Ball extends GameObject{
    constructor(position, radius, color){
        super(position, radius * 2, radius * 2, color);
        this.radius = radius; //radio de la pelota
        this.velocity = new Vector(0, 0 );
    }

    update(deltaTime, speed){ // Recibe la velocidad actual (normal o super)
        this.velocity = this.velocity.normalize().times(speed);
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }

    reset() {
        this.position = new Vector(canvasWidth / 2, 500);
        this.velocity = new Vector(0,0);
    }

    serve() {
        let angle = (Math.random() * Math.PI / 2) + Math.PI * 1.25; 
        this.velocity.x = Math.cos(angle);
        this.velocity.y = Math.sin(angle);
    }
}

class Game {
    constructor() {
        this.createEventListeners();
        this.initObjects();

        this.lives = 3; //vidas dentro del juego

        //Variables para la funcionalidad extra
        this.charge = 0; // Progreso de la barra (0 a 15)
        this.maxCharge = 15;
        this.isSuperBall = false; // Estado especial

        //Estados del juego
        this.gameOverState = false; //game over
        this.gameWinState = false; //win
    }

    initObjects() {
        //background
        this.background = new GameObject(new Vector(canvasWidth / 2, canvasHeight / 2), canvasWidth, canvasHeight);
        this.background.setSprite("../assets/sprites/fondo.jpg")
        
        //jugador
        this.player = new Player(new Vector(canvasWidth / 2, 550), 150, 30, "#6767b1");

        //paredes
        this.barrierTop = new GameObject(new Vector(canvasWidth / 2, 0), canvasWidth, 1);
        this.barrierLeft = new GameObject(new Vector(0, canvasHeight / 2), 1, canvasHeight);
        this.barrierRight = new GameObject(new Vector(canvasWidth, canvasHeight / 2), 1, canvasHeight);

        //pelota
        this.ball = new Ball(new Vector(canvasWidth / 2, 500), 10, "white");

        //carteles
        this.cartellives = new TextLabel(20, canvasHeight - 20, "40px Ubuntu Mono", "white");
        this.cartelbreaks = new TextLabel(canvasWidth - 160, canvasHeight - 20, "40px Ubuntu Mono", "white");
        this.cartelresult = new TextLabel(canvasWidth / 2 - 90, canvasHeight / 2, "40px Ubuntu Mono", "White");
        
        //cajas
        this.actors = [];
        const rows = 11; //filas
        const cols = 9; // columnas
        const padding = 5; //espaciado
        const w = 82.5; //widht
        const h = 20; //height

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let x = c * (w + padding) + 50;
                let y = r * (h + padding) + 50;
                const brick = new GameObject(new Vector(x, y), w, h, "grey");
                brick.setSprite("../assets/sprites/bloque.PNG");
                this.actors.push(brick);
            }
        }
    }

    draw(ctx) {
        this.background.draw(ctx);

        for (let actor of this.actors) {
            actor.draw(ctx);
        }

        this.barrierTop.draw(ctx);
        this.barrierLeft.draw(ctx);
        this.barrierRight.draw(ctx);

        this.player.draw(ctx);

        if (this.isSuperBall) {
            this.ball.color = "#00ffff"; //cuando se activa la funcionalidad extra
        } else {
            this.ball.color = "white"; //normal
        }
        this.ball.draw(ctx);

        this.ProgressBar(ctx);

        this.cartellives.draw(ctx, `Vidas: ${this.lives}`);
        this.cartelbreaks.draw(ctx, `Points: ${breaks}`);
        if(this.gameOverState || this.gameWinState){
            this.cartelresult.draw(ctx, result);
        }
        
    }

    ProgressBar(ctx){
        const barWidth = 200;
        const barHeight = 20;
        const x = canvasWidth / 2 - barWidth / 2;
        const y = 20;

        // Contorno
        ctx.strokeStyle = "white";
        ctx.strokeRect(x, y, barWidth, barHeight);

        // Relleno
        const fillWidth = (this.charge / this.maxCharge) * barWidth;
        ctx.fillStyle = this.isSuperBall ? "#00ffff" : "#4444ff";
        ctx.fillRect(x, y, fillWidth, barHeight);

        // Texto descriptivo
        ctx.fillStyle = "white";
        ctx.font = "15px Ubuntu Mono";
        ctx.textAlign = "center";
        ctx.fillText(this.isSuperBall ? "SUPER BOLA ACTIVA" : "CARGA POWER UP", canvasWidth / 2, y - 10);
        ctx.textAlign = "left"; // Reset para otros textos
    }

    update(deltaTime) {
        // detener el juego cuando este en alguno de estos estados
        if (this.gameOverState || this.gameWinState) return;

        // Ajustar velocidad de la bola según el estado
        let currentSpeed = this.isSuperBall ? superBallSpeed : ballSpeed;
        this.ball.velocity = this.ball.velocity.normalize().times(currentSpeed);

        // Move the player
        this.player.update(deltaTime);

        this.ball.update(deltaTime, currentSpeed);

        //Colisión Bola vs Jugador
        if (boxOverlap(this.ball, this.player)) {
            //Distancia entre la pelota y el paddle del jugador
            let distancia = this.ball.position.x - this.player.position.x;
            let norm = distancia / this.player.halfSize.x;
            let angulomax = Math.PI / 3; // angulo maximo
            let angulobounce = norm * angulomax;

            // Nueva dirección de la pelota
            this.ball.velocity.x = Math.sin(angulobounce);
            this.ball.velocity.y = -Math.cos(angulobounce);

            // Ajustar posición para evitar bugs
            this.ball.position.y = this.player.position.y - this.player.halfSize.y - this.ball.radius;
        }

        //Colisión Bola vs Bloques (actors)
        for (let i = this.actors.length - 1; i >= 0; i--) {
            let brick = this.actors[i];
            if (boxOverlap(this.ball, brick)) {
                
                // Si NO es super bola, rebota normalmente
                if (!this.isSuperBall) {
                    this.ball.velocity.y *= -1;
                    this.charge++; // Solo carga si es bola normal
                }
                
                // Activar Super Bola al llegar al máximo
                if (this.charge >= this.maxCharge) {
                    this.isSuperBall = true;
                    this.charge = this.maxCharge; // Mantener llena
                }

                this.actors.splice(i, 1);
                breaks++;
                break;
            }
        }

        //Colisión Bola vs paredes
        if(boxOverlap(this.ball, this.barrierTop)){
            this.ball.velocity.y *= -1;
            this.ball.position.y = this.ball.radius;
        }
        if(boxOverlap(this.ball, this.barrierLeft) || boxOverlap(this.ball, this.barrierRight)){
            this.ball.velocity.x *= -1;
        }

        //mensaje de win
        if (this.actors.length === 0) {
            this.win();
        }

        //reset de la pelota
        // Reset de la pelota (Manejo de vidas especial)
        if (this.ball.position.y > canvasHeight) {
            if (this.isSuperBall) {
                // Si era super bola, NO pierde vida, pero pierde el poder
                this.isSuperBall = false;
                this.charge = 0;
                this.ball.reset();
            } else {
                this.lives--;
                this.charge = 0; // Se pierde la carga acumulada al morir
                if (this.lives > 0) {
                    this.ball.reset();
                } else {
                    this.gameOver();
                }
            }
        }
    }

    // Se definen todas las caracteristicas del game over 
    gameOver() {
        console.log("Game Over");
        result = "Game Over";
        this.gameOverState = true;
        this.ball.reset();
    }

    // Se definen todas las carateristicas del win
    win() {
        console.log("You Win");
        result = "You Win";
        this.gameWinState = true;
        this.ball.reset();
    }

    //Se definen las caracterisiticas del reset
    reset() {
        this.lives = 3;
        this.charge = 0;
        this.isSuperBall = false;
        breaks = 0;
        result = "";
        this.gameOverState = false;
        this.gameWinState = false;
        this.ball.reset();
        this.initObjects(); // Reinicia bloques y posición
    }

    createEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.key == 'a') {
                this.addKey('left');
            } else if (event.key == 'd') {
                this.addKey('right');
            }

            if (event.code == 'Space') {
                if (this.gameOverState || this.gameWinState) {
                    this.reset();
                } else if (this.ball.velocity.x === 0 && this.ball.velocity.y === 0) { // el espacio solo funciona cuando la velocidad es 0, cuando esta quieta la pelota
                    this.ball.serve();
                }
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'a') {
                this.delKey('left');
            } else if (event.key == 'd') {
                this.delKey('right');
            }
        });        
    }

    addKey(direction) {
        if (!this.player.keys.includes(direction)) {
            this.player.keys.push(direction);
        }
    }

    delKey(direction) {
        if (this.player.keys.includes(direction)) {
            this.player.keys.splice(this.player.keys.indexOf(direction), 1);
        }
    }
}


// Starting function that will be called from the HTML page
function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    // Create the game object
    game = new Game();

    drawScene(0);
}


// Main loop function to be called once per frame
function drawScene(newTime) {
    // Compute the time elapsed since the last frame, in milliseconds
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    game.update(deltaTime);

    game.draw(ctx);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
