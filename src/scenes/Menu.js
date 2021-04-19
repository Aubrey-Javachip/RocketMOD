class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //audio load in
        this.load.audio('sfx_select', './assets/scribble.wav');
        this.load.audio('sfx_explosion', './assets/crumple.wav');
        this.load.audio('sfx_rocket', './assets/breeze.ogg');
        this.load.audio('theme','./assets/Theme.wav');
        this.load.image('menu', './assets/menu.png');
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

        this.add.image(0,0,'menu').setOrigin(0,0); 
        
        menuConfig.color = '#FFFFFF';
      

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
                spaceshipSpeed: 4,
                gameTimer: 60000
            }
            this.sound.play('theme');
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
            if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
                //hard mode
                game.settings = {
                    spaceshipSpeed: 5,
                    gameTimer: 45000
                }
                this.sound.play('theme');
                this.sound.play('sfx_select');
                this.scene.start('playScene');
            }

        
        }
    
}