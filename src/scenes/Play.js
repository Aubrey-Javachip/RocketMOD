class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tile sprites
        this.load.image('paperplane', './assets/paperplane.png');
        this.load.image('scissors', './assets/scissors.png');
        this.load.image('rock', './assets/rock.png');
        this.load.image('Red', './assets/Redplane.png');
        this.load.image('Blue', './assets/Blueplane.png');
        this.load.image('Yellow', './assets/Yellplane.png');
        this.load.image('Crane', './assets/Crane.png');
        this.load.image('skytwo', './assets/skytwo.png');
        //load spritesheet
        this.load.spritesheet('explosion','./assets/shred.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            encFrame: 9
        })
    } 
    create () {

        let playConfig = {
            fontFamily: 'Tahoma',
            fontSize: '16px',
            color: '#3c89d0',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }


        //place skysprite
        this.sky = this.add.tileSprite(0, 0, game.config.width, game.config.height,'skytwo').setOrigin(0,0);

        //scene borders
        this.add.rectangle(0,0,game.config.width, borderUISize, 0xFFD1DC).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFD1DC).setOrigin(0,0);
        this.add.rectangle(0,0,borderUISize, game.config.height, 0xFFD1DC).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFD1DC).setOrigin(0,0);

        //add instructions
        this.add.text(1,0, 'Use <- and -> to move  (Press W - Rock) (Press F - Paper) (Press E - Scissors)', playConfig).setOrigin(0,0);
        //this.add.text('Use <- and -> to move  (Press W - Rock) (Press F - Paper) (Press E - Scissors)').setOrigin(0,0)

        //add paper plane (player 1)
        this.p1Rocket = new Plane(this, game.config.width/2,game.config.height - borderUISize - borderPadding, 'paperplane').setOrigin(0.5,0.5);

        //add 4 enemy planes
        this.ship01 = new Enemyplane(this, game.config.width + borderUISize * 6, borderUISize * 4, 'Red', 0, 30).setOrigin(0,0);
        this.ship02 = new Enemyplane(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'Blue', 0, 20).setOrigin(0,0);
        this.ship03 = new Enemyplane(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'Yellow', 0, 10).setOrigin(0,0);
        this.fastship = new Fastcrane(this, borderUISize * 8, borderUISize * 5, 'Crane', 0, 50).setOrigin(0,0);
        //add weapon types
        this.p1Weapon = new Scissors(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'scissors').setOrigin(0.5,0.5);
        this.p1Weapon2 = new Rock(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rock').setOrigin(0.5,0.5);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                emd: 9,
                first: 0
            }),
            frameRate: 30
        });

        //initialize score
        this.weaponScore = 0;
        this.p1Score = 0;
        this.clock = 60;

        //display score
        let scoreConfig = {
            fontFamily: 'Tahoma',
            fontSize: '28px',
            //backgroundColor: '#F3B141',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score += this.weaponScore, scoreConfig);


        //Game over flag
        this.gameOver = false;

        //60 sec playtime
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        
        

    }

    

    update() {
        //check for restart input
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.sky.tilePositionY -= 4;

        //this.clock -= 1;
        //this.timeLeft.text = this.clock;

        if(!this.gameOver) {
        //update planes and weapons
        this.p1Rocket.update();
        this.p1Weapon.update();
        this.p1Weapon2.update();
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();
        this.fastship.update();
        }

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.fastship)) {
            this.p1Rocket.reset();
            this.shipExplode(this.fastship);
            //console.log('kaboom newship');
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            //console.log('kaboom ship 03');
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            //console.log('kaboom ship 02');
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            //console.log('kaboom ship 01');
        }
        if(this.checkCollision(this.p1Weapon, this.fastship)) {
            this.p1Weapon.reset();
            this.shipExplode(this.fastship);
            //console.log('kaboom newship');
        }

        if(this.checkCollision(this.p1Weapon, this.ship03)) {
            this.p1Weapon.reset();
            this.shipExplode(this.ship03);
            //console.log('kaboom ship 03');
        }
        if(this.checkCollision(this.p1Weapon, this.ship02)) {
            this.p1Weapon.reset();
            this.shipExplode(this.ship02);
            //console.log('kaboom ship 02');
        }
        if(this.checkCollision(this.p1Weapon, this.ship01)) {
            this.p1Weapon.reset();
            this.shipExplode(this.ship01);
            //console.log('kaboom ship 01');
        }
        if(this.checkCollision(this.p1Weapon, this.fastship)) {
            this.p1Weapon.reset();
            this.shipExplode(this.fastship);
            //console.log('kaboom newship');
        }

        if(this.checkCollision(this.p1Weapon2, this.ship03)) {
            this.p1Weapon2.reset();
            this.shipExplode(this.ship03);
            //console.log('kaboom ship 03');
        }
        if(this.checkCollision(this.p1Weapon2, this.ship02)) {
            this.p1Weapon2.reset();
            this.shipExplode(this.ship02);
            //console.log('kaboom ship 02');
        }
        if(this.checkCollision(this.p1Weapon2, this.ship01)) {
            this.p1Weapon2.reset();
            this.shipExplode(this.ship01);
            //console.log('kaboom ship 01');
        }

    }

    
    checkCollision(rocket, ship) {
        // simple AABB Check
        if(rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            } else {
                return false;
            }
        
        
    }
    
    shipExplode(ship){
        //temporary hide ship
        ship.alpha = 0;
        //create explosion at ship position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion');//.setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        //load explosion sfx
        this.sound.play('sfx_explosion');
    }
}