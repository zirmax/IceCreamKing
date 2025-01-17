import Phaser from "phaser"

export default class Player extends Phaser.GameObjects.Image {


    constructor(scene, x, y) {
        super(scene, x, y, 'player');

    }

    create() {

        // this.setBounce(0.2);
        // this.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('king', { start: 14, end: 17 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'king', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('king', { start: 14, end: 17 }),
            frameRate: 10,
            repeat: -1,
        });

    }

    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        const pointer = this.input.activePointer;
        const velocity = Math.max(150, window.innerWidth / 5)
        const center = window.innerWidth * window.devicePixelRatio / 2
        let mobileTouchPosition = ""
        if (pointer.isDown) {
            const touchX = pointer.x;
            if (touchX > center) {
                mobileTouchPosition = "right"
            } else {
                mobileTouchPosition = "left"
            }
        }

        this.input.on('pointerup', () => {
            mobileTouchPosition = ""
        });

        if (cursors.left.isDown || mobileTouchPosition === "left") {
            this.setVelocityX(-velocity);
            this.setFlip(true, false)
            this.anims.play('left', true);
        }
        else if (cursors.right.isDown || mobileTouchPosition === "right") {
            this.setVelocityX(velocity);
            this.setFlip(false, false)
            this.anims.play('right', true);
        }
        else {
            this.setVelocityX(0);
            this.anims.play('turn');
        }

    }







}

