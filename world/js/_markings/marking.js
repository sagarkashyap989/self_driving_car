class Marking{
    constructor(center, directionVector, width, height){
        this.center = center;
        this.directionVector  = directionVector;
        this.width      = width;
        this.height = height

        console.log(angle(directionVector), 'bha')

        this.support = new Segment(
            translate(center, angle(directionVector), height / 2),
            translate(center, angle(directionVector), -height/2)
        )

        this.poly = new Envelope(this.support, width /2, 0).poly;
    

 
    }
    draw(ctx){
       
        this.poly.draw(ctx)
    }
}