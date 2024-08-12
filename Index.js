const canvas = document.querySelector('canvas');
//setando oq canvas que tipo de documento (const),
const c = canvas.getContext('2d')
// aqui esta falando que o Objeto será em 2d


canvas.width = 1024
//altura do canvas
canvas.height = 576
//largura do canvas

// c.fillStyle = "red";
//coloca a cor 
c.fillRect(0, 0, canvas.width, canvas.height); //cria um retangulo preenchido
//ta falando aonde deve ficar o rect no caso no mesmo tamanho do canvas



//orientação Objeto daqui para baixo

const gravity = 0.2

class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height) //tamanho e lugar do player
    }

    update() { //atualizando o player que dermos o comando (para poder andar no w a s d)
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y  = 0
        } else this.velocity.y += gravity
    }
}
//criando um Objeto na posição x = 0 y = 0

//criando o inimigo
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
})

player.draw()

enemy.draw()

console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

//animação
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    if(keys.a.pressed) {
        player.velocity.x = -1
    }else  if (keys.d.pressed) {
        player.velocity.x = 1
    }
}

animate()
// criando o W A S D 
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break

    }
    console.log(event.key);
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
    console.log(event.key);
})