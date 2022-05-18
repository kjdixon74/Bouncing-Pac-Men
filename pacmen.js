"use strict";

const pacArray = [
  ["PacMan1.png", "PacMan2.png"],
  ["PacMan3.png", "PacMan4.png"],
];
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  // Add image to div id = game
  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.src = "PacMan1.png";
  newimg.width = 100;

  // set position here
  newimg.style.left = position.x;
  newimg.style.top = position.y;

  // add new Child image to game
  game.appendChild(newimg);

  // To track each PacMan opening/closing his mouth
  let direction = 0;
  let pos = 0;

  // return details in an object
  // new style of creating an object
  return {
    position,
    velocity,
    newimg,
    direction,
    pos,
  };
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    // Update position in JS aka shadow DOM
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    // Update position in DOM
    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;

    // Open and close PacMan's mouth on each movement
    item.pos = item.pos === 0 ? 1 : 0;
    item.newimg.src = pacArray[item.direction][item.pos];
  });
  setTimeout(update, 100);
}

function checkCollisions(item) {
  // detect collision with all walls and make pacman bounce

  // Get page height and width
  const pageWidth = window.innerWidth;
  const pageHeight = window.innerHeight;

  // When pacman hits page boundaries, reverse velocity and change direction
  if (item.position.x + item.velocity.x + item.newimg.width >= pageWidth) {
    item.velocity.x = -item.velocity.x;

    // Toggle between images 3 [1][0] and 4 [1][1] when PacMan is going left
    item.direction = 1;
  }

  if (item.position.x + item.velocity.x <= 0) {
    item.velocity.x = -item.velocity.x;

    // Toggle between images 1 [0][0] and 2 [0][1] when PacMan is going right
    item.direction = 0;
  }

  if (
    item.position.y + item.velocity.y + item.newimg.height >= pageHeight ||
    item.position.y + item.velocity.y <= 0
  ) {
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}
