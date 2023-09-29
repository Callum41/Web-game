const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d') // Canvas context, the responsible for the drawings

canvas.width = 1024 // The amount of pixels to display
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2

class Sprite {
    constructor({ position, velocity }){ // los {} son para que se pase un objeto, y que no haya problemas al ser varios parámetros
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0 
        } else this.velocity.y += gravity
    }
}

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

const enemy = new Sprite ({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
})

console.log(player);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}
let lastKey

function animate() {
    window.requestAnimationFrame(animate) // Create an infinite loop to make an animation frame by frame
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
    console.log(player.velocity.x)
    // Player movement
    if (keys.a.pressed && lastKey === 'a'){
        player.velocity.x = -1
    } else if (keys.d.pressed && lastKey === 'd'){
        player.velocity.x = 1 
    }
    // Enemy movement
    if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft'){
        enemy.velocity.x = -1
    } else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight'){
        enemy.velocity.x = 1 
    }
}
animate()

window.addEventListener('keydown', (event) => {
    console.log(event.key);
    switch(event.key){
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
        break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
        break
        case 'w':
            player.velocity.y = -10
        break

        // enemy keys

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'Arrowleft'
        break
        case 'ArrowUp':
            enemy.velocity.y = -10
        break
    }
    console.log(event.key)
})
window.addEventListener('keyup', (event) => {
    
        switch(event.key){
            case 'd':
                keys.d.pressed = false
            break
            case 'a':
                keys.a.pressed = false
            break

            // Enemy keys

            case 'ArrowRight':
                keys.ArrowRight.pressed = false
            break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = false
            break
        }
        console.log(event.key)
})  