class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //audio load in
        this.load.audio('sfx_select', './assets/scribble.wav');
        this.load.audio('sfx_explosion', './assets/crumple.wav');
        this.load.audio('sfx_rocket', './assets/breeze.ogg');
        this.load.image('sky', './assets/sky.png');
    }
    create () {
        //create menu
        let menuConfig = {
            fontFamily: 'Tahoma',
            fontSize: '28px',
            //backgroundColor: '#000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.image(0,0,'sky').setOrigin(0,0); 
        //menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        //menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#FFFFFF';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize +
        borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        //menu keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //this.add.text(20,20, "Rocket Patrol Menu");

        //change scenes
        //this.scene.start("playScene");
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
            if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
                //hard mode
                game.settings = {
                    spaceshipSpeed: 4,
                    gameTimer: 45000
                }
                this.sound.play('sfx_select');
                this.scene.start('playScene');
            }
        }
    
}