const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

// console.log(gameArea);
// console.log(startScreen);
// console.log(score);

let player = {
    // from here we can increase the game speed
    speed: 5,
    score: 0,
};

startScreen.addEventListener('click', start);

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys);
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
    // console.log(keys);
}

function isCollide(a, b) {
    aRect = a.getBoundingClientRect(); // read point 1
    bRect = b.getBoundingClientRect();

    // below are colliding conditions , if one of them will be true so we return false
    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) ||
        (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveLiness() {
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function (item) {

        if (item.y >= 645) {
            item.y -= 760;
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })

}

function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game over <br> Your final score is : "
        + player.score + " <br> Press here to restart the game."
    score.classList.add("hide");
}

function moveEnemy(car) {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function (item) {

        if (isCollide(car, item)) {
            console.log("Boom hit");
            endGame();
        }

        if (item.y >= 660) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })

}

function gamePlay() {
    // console.log("hey i am clicked");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    // console.log(road);

    if (player.start) {

        moveLiness();
        moveEnemy(car);

        if (keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 80)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";



        window.requestAnimationFrame(gamePlay);
        console.log(player.score++);

        player.score++;
        score.innerHTML = "Score : " + player.score;

    }

}

function start() {

    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for (x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    // car.innerText = "hey i am ur car";
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (x = 0; x < 3; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundColor = randamcolor();
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }

    function randamcolor() {
        function c() {
            let hex = Math.floor(Math.random() * 256).toString(16);
            // to avoid single digit and making sure to have 2 digits every time
            return ("0" + String(hex)).substr(-2);
        }

        return "#" + c() + c() + c();
    }

}