import * as PIXI from "pixi.js"
import { Loader } from "pixi.js"
import finn from "./images/FinnSword.png"
import background from "./images/City1.png"


export class Game{

    private _pixi: PIXI.Application

    loader: Loader

    private x: number
    private speedX = 0

    city: PIXI.Sprite

    finnSprite: PIXI.Sprite

    constructor() {
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        this._pixi = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight })
        document.body.appendChild(this._pixi.view)
        

        this.loader = new PIXI.Loader
        this.loader.add("finn", finn)
        this.loader.add("background", background)
        this.loader.load(() => this.loadCompleted())


        
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))

        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    public loadCompleted() {

        let background: PIXI.Texture = PIXI.Texture.from("background")
        this.city = new PIXI.Sprite(background)
        this.city.scale.set(0.75)

        this._pixi.stage.addChild(this.city)
        

        let finn: PIXI.Texture = PIXI.Texture.from("finn")
        this.finnSprite =  new PIXI.Sprite(finn)
        this.finnSprite.scale.set(5)
        this.finnSprite.anchor.set(0.5)
        this.finnSprite.x = 400
        this.finnSprite.y = 600
        this._pixi.stage.addChild(this.finnSprite)
        
        this._pixi.ticker.add((delta: number) => this.update(delta))
       
    }

    public update(delta: number): void {
        this.finnSprite.x += this.speedX * delta
    }

    onKeyDown(e: KeyboardEvent): any {

        switch (e.key.toUpperCase()) {
            case "ARROWLEFT":
                console.log(this.speedX)
                this.finnSprite.scale.set(-5, 5)
                this.speedX = -6
                break
            case "ARROWRIGHT":
                this.speedX = 6
                this.finnSprite.scale.set(5)
                console.log(this.speedX)
                break
        }
    }

    onKeyUp(e: KeyboardEvent): any {
        switch (e.key.toUpperCase()) {
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.speedX = 0
                break
        }
    }

   

}