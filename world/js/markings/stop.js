class Stop extends Marking {
    constructor(center, directionVector, width, height) {
        super(center, directionVector, width, height)
        this.img = new Image();
        this.img.src = 'car.png';
        this.type = 'stop'
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.center.x, this.center.y);
        ctx.rotate(angle(this.directionVector) - Math.PI / 2);
     
        ctx.drawImage(this.img, -this.img.width/2, -this.img.height/3)

        ctx.restore();
        // this.support.draw(ctx)
    }
}