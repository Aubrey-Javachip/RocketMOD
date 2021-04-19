//Aubrey Schelbauer
//Title: Rock, Paper, Scissors, Shoot!
//4/18/21
//Total Hours: 12

//POINT BREAKDOWN
//Allow player to control the Rocket after it's fired - 5pts
//Create a new spaceship type(w/new art) that's smaller, moves faster, and worth more points - 20pts
//Create and implement a new weapon (w/ new behavior and graphics) - 20pts
//Redesign the game's artwork, UI, and sound to change the theme - 60pts
//(The paper plane weapon can be controlled using the arrow keys after being fired. 
//The pink paper crane is my faster, smaller enemy type that is worth 50 pts.
//The Scissors is a faster more precise new weapon type and the rock is a slower new weapon type.
//I changed the theme into a childish Rock, Paper, Scissors parody with paper and wind sounds, free bgm, 
// self drawn assets, etc.)


//game config
let config = {
    type: Phaser.CANVAS,
    width:640,
    height:480,
    scene: [Menu,Play]
}

let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 4;

//reserve keyboard bindings
let keyF, keyR, keyE, keyW, keyLEFT, keyRIGHT