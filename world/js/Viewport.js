class Viewport {
    constructor(canvas, zoom = 1, offset = null) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")

        this.zoom = zoom;
        this.center = new Point(canvas.width / 2, canvas.height / 2);

        this.offset = offset ?  offset : scale(this.center, -1)



        this.#addEventListeners();

        this.mouse = new Point(0, 0)
        this.drag = {
            start: new Point(0, 0),
            end: new Point(0, 0),
            offset: new Point(0, 0),
            active: false
        }


        this.canvas.setAttribute("tabindex", 0);

    }


    reset() {
        this.ctx.restore();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.center.x, this.center.y)
        this.ctx.scale(1 / this.zoom, 1 / this.zoom)
        const offset = this.getOffset()
        this.ctx.translate(offset.x, offset.y)
    }

    getMouse(evt, subtractDrapOffset = false) {
        const p = new Point(
            ((evt.offsetX - this.center.x) * this.zoom - this.offset.x),
            ((evt.offsetY - this.center.y) * this.zoom - this.offset.y)
        )


        return subtractDrapOffset ? subtract(p, this.drag.offset) : p;

    }

    getOffset() {
        return add(this.offset, this.drag.offset)
    }


    #addEventListeners() {
        this.canvas.addEventListener('wheel', this.#handleMouseWheel.bind(this))
        this.canvas.addEventListener('keydown', this.#handleKeyDown.bind(this))
        this.canvas.addEventListener('mousemove', this.#handleMouseMove.bind(this))
        this.canvas.addEventListener('keyup', this.#handleKeyUp.bind(this))
    }



    #handleKeyDown(evt) {

        // console.log(evt, 'key')
        if (evt.isComposing || evt.keyCode === 16) {
            this.drag.active = true
            this.drag.start = this.mouse
        }
        // do something
    }

    #handleMouseMove(evt) {
        this.mouse = this.getMouse(evt)
        if (this.drag.active) {
            // console.log(evt, 'mouse')
            this.drag.end = this.getMouse(evt)
            this.drag.offset = subtract(this.drag.end, this.drag.start)
            // console.log(this.getMouse(evt))
        }
        // return this.getMouse(evt)
    }

    #handleKeyUp(evt) {

        if (evt.isComposing || evt.keyCode === 16) {
            this.offset = add(this.offset, this.drag.offset)
            this.drag = {
                start: new Point(0, 0),
                end: new Point(0, 0),
                offset: new Point(0, 0),
                active: false
            }

        }

    }


    #handleMouseWheel(evt) {
        const dir = Math.sign(evt.deltaY);
        const step = 0.1;
        this.zoom += dir * step;
        this.zoom = Math.max(1, Math.min(5, this.zoom))
       
    }





}