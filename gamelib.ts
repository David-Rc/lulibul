class Jeu {

    elements:GameElement[];
    context:CanvasRenderingContext2D;
    refreshId : number;

    constructor(private canvas:HTMLCanvasElement) {
        this.elements = new Array<GameElement>();
        this.context = this.canvas.getContext('2d');
        this.refreshId = setInterval(()=>this.render(), 60);
    }

    creeElement(type:GameElementType) {
        let zone = new Zone(this.canvas.width, this.canvas.height);
        let element:GameElement = GameFactory.newElement(type, zone);
        this.elements.push(element);
        this.render();
    }

    private clear() {
        this.context.fillStyle = 'black';
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
                this.context.fillStyle = 'blue';
                this.context.fillRect(el.x, el.y, 20, 20);
                break;
            default:
                alert('drawElement : type inconnu');
        }
        /*this.context.fillStyle = null;*/
    }
}

class GameFactory{
    static newElement(type:GameElementType, zone:Zone):GameElement{
        let element:GameElement;
        switch (type) {
            case GameElementType.TresorElement :
                element = new Tresor(zone);
                break;
            case GameElementType.EnnemiElement :
                element = new Ennemi(zone);
                break;
            case GameElementType.HerosElement :
                element = new Heros(zone);
                break;
            default:
                alert('newElement : type inconnu');
        }
        return element;
    }
}

enum GameElementType{ TresorElement, EnnemiElement, HerosElement }

/**
 * categorisation des objets du jeu affichable sur le canvas
 */
interface GameElement {
    x:number;
    y:number;
    type:GameElementType;
}


class Zone{
    constructor(public width:number,public height:number){}
}

/**
 * classe de base des ennemis et du heros
 */
class Perso implements GameElement {
    x:number;
    y:number;
    type:GameElementType;
    constructor(public zone:Zone){}
}


class Heros extends Perso {
    private DEFAULT_X = 30;
    private DEFAULT_Y = 30;

    constructor(zone:Zone) {
        super(zone);
        this.x = this.DEFAULT_X;
        this.y = this.DEFAULT_Y;
        this.type = GameElementType.HerosElement;
    }
}

/**
 * classe ennemi : déplacement automatique cf.bouge()
 */
class Ennemi extends Perso {
    direction = 1;

    constructor(zone:Zone) {
        super(zone);
        this.x = Math.random() * zone.width;
        this.y = Math.random() * zone.height;
        this.type = GameElementType.EnnemiElement;
        this.bouge();
    }

    bouge() {
        setInterval(()=> {
            if( this.x >= this.zone.width || this.x <= 0)
                this.direction *= -1;
            this.x += this.direction;
        },16);
    }
}

class Tresor implements GameElement {
    x:number;
    y:number;
    type:GameElementType = GameElementType.TresorElement;
    constructor(zone:Zone){
        this.x = Math.random() * zone.width;
        this.y = Math.random() * zone.height;
    }
}

var jeu;
function initGame() {
    let canvas = document.getElementById('canvas');
    jeu = new Jeu(canvas as HTMLCanvasElement);

    jeu.creeElement(GameElementType.TresorElement);
    jeu.creeElement(GameElementType.EnnemiElement);
    jeu.creeElement(GameElementType.HerosElement);
}

class ControlClavier{
    constructor(heros:Heros){

    }
}





