const canvas = document.querySelector('canvas');
//setando oq canvas que tipo de documento (const),
const c = canvas.getContext('2d')
// aqui esta falando que o Objeto será em 2d


canvas.width = 1024
//altura do canvas
canvas.height = 576
//largura do canvas

c.fillStyle = "red";
//coloca a cor 
c.fillRect(0, 0, canvas.width, canvas.height); //cria um retangulo preenchido
//ta falando aonde deve ficar o rect no caso no mesmo tamanho do canvas



//orientação Objeto daqui para baixo
class Sprite {
    constructor(position) {
        this.position = position
    }

    draw() {
        c.fillRect()
    }
};

//criando um Objeto na posição x = 0 y = 0
const player = new Sprite ({
    x: 0,
    y: 0
})