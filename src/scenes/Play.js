class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tile sprites
        this.load.image('paperplane', './assets/paperplane.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('faststar', './assets/faststarbg.png');
        this.load.image('skytwo', './assets/skytwo.png');
        //load spritesheet
        this.load.spritesheet('explosion','./assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            encFrame: 9
        })
    } 
    create () {
        //place waterfall
        this.sky = this.add.tileSprite(0, 0, game.config.width, game.config.height,'skytwo').setOrigin(0,0);

        //this.add.text(20,20, "Rocket Patrol Play");
        //green UI background
        //this.add.rectangle(0,borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0);
        //white borders
        this.add.rectangle(0,0,game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0,0,borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);

        //add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2,game.config.height - borderUISize - borderPadding, 'paperplane').setOrigin(0.5,0.5);

        //add 3 spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0,0);

        this.fastship = new Fastship(this, borderUISize * 8, borderUISize * 5, 'faststar', 0, 50).setOrigin(0,0);
        this.p1Weapon = new NewWeapon(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'paperplane').setOrigin(0.5,0.5);
        //this.p1Weapon2 = new NewWeapon2(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'paperplane').setOrigin(4,0.5);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
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
        
        
         //display time
        // let timeConfig = {
        //    fontFamily: 'Tahoma',
        //    fontSize: '28px',
            //backgroundColor: '#F3B141',
        //    color: '#ffffff',
        //    align: 'right',
        //    padding: {
        //        top: 20,
        //        bottom: 20,
        //    },
        //    fixedWidth: 100
        //}
        //this.timeLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, game.settings.gameTimer, timeConfig);

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
        //update Rocket and ships
        this.p1Rocket.update();
        this.p1Weapon.update();
        //this.p1Weapon2.update();
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
        //this.newScore = this.p1score += this.weaponScore;
        //this.newScore += ship.points;
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        //load explosion sfx
        this.sound.play('sfx_explosion');
    }
}