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

const gravity = 0.7

class Sprite {
    constructor({position, velocity, color = 'red', offset}) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x, 
                y: this.position.y
            },
            offset: offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
        this.health = 100
    }

    draw() {
        c.fillStyle = this.color

        c.fillRect(this.position.x, this.position.y, this.width, this.height) //tamanho e lugar do player
        
        //ataque do boneco
        if (this.isAttacking) {
        c.fillStyle = 'green'
        c.fillRect(
            this.attackBox.position.x, 
            this.attackBox.position.y,
            this.attackBox.width,
            this.attackBox.height)
    }
}

    update() { //atualizando o player que dermos o comando (para poder andar no w a s d)
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x   //atraso na barra de dano
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y  = 0 //chão se colocar 1 vai transforma em uma areia movediça
        } else this.velocity.y += gravity
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
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
    },
    offset: {
        x:0 ,
        y:0

    }
})

const enemy = new Sprite({
    //lugar aonde o inimigo vai nascer
    position: {
        x: 400,
        y: 100
    },
    //velocidade padrão (é modificada então se aplica mesmo se mudar)
    velocity: {
        x: 0,
        y: 0
    },
    //cor
    color: 'blue',
    
    //ataque (-50 pra ser pro lado do inimigo)
    offset: {
        x:-50 ,
        y:0
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
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
         rectangle2.position.x &&
        rectangle1.attackBox.position.x <=
         rectangle2.position.x + rectangle2.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
         rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height 
    )
}

//animação
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //velocidade do player
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -4
    } else  if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 4
    }

    //velocidade do inimigo enewy
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -4
    } else  if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 4
    }

    //detect for collision
    if (
        rectangularCollision ({
            rectangle1: player,
            rectangle2: enemy
        }) && 
        player.isAttacking
    )  {
        player.isAttacking = false //calculo de vida, 
        enemy.health -= 20
        document.querySelector('#vida_do_inimigo').style.width = enemy.health + '%'
    }

    if (
        rectangularCollision ({
            rectangle1: enemy,
            rectangle2: player
        }) && 
        enemy.isAttacking
    )  {
        enemy.isAttacking = false
        player.health -= 20
        document.querySelector('#vida_do_player').style.width = player.health + '%'
    }
}

animate()

// criando o W A S D 
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -10
            break
        case ' ':
            player.attack()
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -10
            break
        case 'ArrowDown':
            enemy.isAttacking = true
            break
    }
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

    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})