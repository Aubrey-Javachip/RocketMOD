//Rock weapon prefab
class Rock extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame);

        //add object to existing scene (this = rocket)
        scene.add.existing(this);
        this.isFiring = false; //track firing
        this.moveSpeed = 0.7; //pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket')
    }

    update(){
        //leftandright movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if(keyRIGHT.isDown && this.x <= game.config.width -borderUISize - this.width){
                    this.x += this.moveSpeed;
            }
        }
        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyW) && !this.isFiring) {
            this.isFiring = true;
            // rocket sfx
            this.sfxRocket.play();
        }
        //if fired move rocket up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
            //if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
              //  this.x -= this.moveSpeed;
            //} else if(keyRIGHT.isDown && this.x <= game.config.width -borderUISize - this.width){
            //        this.x += this.moveSpeed;
            }
        
        //reset on miss
        if(this.y <= borderUISize * 5 + borderPadding) {
            this.isFiring = false;
            this.reset();
        }
    }

    //reset rocket
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
        }
    }