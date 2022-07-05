// * Canvas variables
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

// * Keycodes
const ARROW_UP = 38;
const ARROW_LEFT = 37;
const ARROW_DOWN = 40;
const ARROW_RIGHT = 39;
const W = 87;
const A = 65;
const S = 83;
const D = 68;

// * Player variables

// Player size
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;

// Player movement speed
const PLAYER_MOVEMENT_SPEED = 4.25;

// PLayer bounce
const PLAYER_BOUNCE_SPEED = 8;
const PLAYER_BOUNCE_TIME = 30;

// Player other variables
const PLAYER_RESPAWN_TIME = 50;
const PLAYER_LIVES = 3;
const PLAYER_SCORE_SPAN = document.querySelector(".score");
const PLAYER_LIVES_SPAN = document.querySelector(".lives");

// * Barrel variables
const BARREL_WIDTH = 40;
const BARREL_HEIGHT = 40;
const BARREL_QUANTITY = 4;
const BARREL_MIN_MOVEMENT_SPEED = 0.5;
const BARREL_MAX_MOVEMENT_SPEED = 2;

// * Food variables
const FOOD_WIDTH = 40;
const FOOD_HEIGHT = 40;
const FOOD_QUANTITY = 4;
const FOOD_MIN_MOVEMENT_SPEED = 0.5;
const FOOD_MAX_MOVEMENT_SPEED = 1.5;
const FOOD_GRAMS = 10;
