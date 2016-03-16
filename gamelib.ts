class Jeu {

    elements:GameElement[];
    private assets:Assets;
    context:CanvasRenderingContext2D;
    refreshId:number;

    private _backgroundColor:String = "black";

    set couleurFond(value:string) {
        this._backgroundColor = value;

        this.render();
    }

    constructor(private canvas:HTMLCanvasElement) {
        this.elements = new Array<GameElement>();
        this.context = this.canvas.getContext('2d');
        this.refreshId = setInterval(()=>this.render(), 60);
        this.assets = new Assets();
    }

    creeElement(type:GameElementType) {
        let size = new Size(this.canvas.width, this.canvas.height);
        let element:GameElement = GameFactory.newElement(type, size);
        this.elements.push(element);
        this.render();
    }

    private clear() {
        this.context.fillStyle = this._backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private render() {
        this.clear();

        this.elements.forEach((el) => {
            this.drawElement(el);
        });
    }

    private drawElement(el:GameElement) {
        switch (el.type) {
            case GameElementType.TresorElement:
                this.context.fillStyle = 'yellow';
                this.context.fillRect(el.x, el.y, 20, 20);
                break;
            case GameElementType.EnnemiElement:
                this.context.fillStyle = 'red';
                this.context.fillRect(el.x, el.y, 20, 20);
                break;
            case GameElementType.HerosElement:
                if (this.assets)
                    this.context.drawImage(this.assets.potion, el.x, el.y);

                //this.context.fillStyle = 'blue';
                //this.context.fillRect(el.x, el.y, 20, 20);
                break;
            default:
                alert('drawElement : type inconnu');
        }

        /*this.context.fillStyle = null;*/
    }
}

class Assets {
    potion:HTMLImageElement;

    constructor() {
        this.potion = new Image();
        this.potion.src = "images/potion.png";
    }
}

class GameFactory {
    static newElement(type:GameElementType, size:Size):GameElement {
        let element:GameElement;
        switch (type) {
            case GameElementType.TresorElement :
                element = new Tresor(size);
                break;
            case GameElementType.EnnemiElement :
                element = new Ennemi(size);
                break;
            case GameElementType.HerosElement :
                element = new Heros(size);
                break;
            default:
                alert('newElement : type inconnu');
        }
        return element;
    }
}

/* ELEMENTS ***********************************************/

/**
 * différents types d'elements gérés par le jeu
 */
enum GameElementType{
    TresorElement,
    EnnemiElement,
    HerosElement
}

enum TypeTresor{
    Potion
}

/**
 * categorisation des objets du jeu affichable sur le canvas
 */
interface GameElement {
    x:number;
    y:number;
    type:GameElementType;
}

/**
 * classe de base des ennemis et du heros
 */
class Perso implements GameElement {
    x:number;
    y:number;
    type:GameElementType;

    constructor(public size:Size) {
    }
}

class Heros extends Perso {
    private DEFAULT_X = 30;
    private DEFAULT_Y = 30;

    constructor(size:Size) {
        super(size);
        this.x = this.DEFAULT_X;
        this.y = this.DEFAULT_Y;
        this.type = GameElementType.HerosElement;
    }
}

/**
 * classe ennemi : déplacement automatique cf.bouge()
 */
class Ennemi extends Perso {
    private direction = 1;

    size = new Size(20, 20)

    constructor(public area:Size, size:Size = null) {
        super(size);

        this.size = size ? size : this.size;

        this.x = Math.random() * area.width;
        this.y = Math.random() * area.height;
        this.type = GameElementType.EnnemiElement;
        this.bouge();
    }

    bouge() {
        setInterval(()=> {
            if (this.x >= this.area.width - this.size.width || this.x <= 0)
                this.direction *= -1;
            this.x += this.direction;
        }, 16);
    }
}

class Tresor implements GameElement {
    x:number;
    y:number;
    type:GameElementType = GameElementType.TresorElement;

    constructor(size:Size) {
        this.x = Math.random() * size.width;
        this.y = Math.random() * size.height;
    }
}

/* UTILS ***********************************************/

enum Orientation{ Vertical, Horizontal }

class Size {
    constructor(public width:number,
                public height:number) {
    }
}

/* UTILS ***********************************************/
var jeu:Jeu;

function initGame() {
    let canvas = document.getElementById('canvas');
    jeu = new Jeu(canvas as HTMLCanvasElement);

    jeu.creeElement(GameElementType.TresorElement);
    jeu.creeElement(GameElementType.EnnemiElement);
    jeu.creeElement(GameElementType.HerosElement);
}

class ControlClavier {
    constructor(heros:Heros) {

    }
}





