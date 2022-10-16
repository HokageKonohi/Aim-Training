const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timelist = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#ADFF2F', '#FF0000', '#FF1493', '#FFFF00', '#00BFFF', '#8B008B', '#DEB887', '#FFE4C4', '#8B4513', '#2F4F4F', '#0000FF', '#00008B', '#00FFFF', '#FFD700',]

let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timelist.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')

        startGame()
    }
})


board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    createRandomCircle()
    setInterval(decreaseTime, 1000)
    setTime(time)

}
function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`

}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Попадания в <span class="primary">${score}</span> целий: </h1>`
}


function createRandomCircle() {
    const circle = document.createElement('div')
    const sise = getRandomNumber(10, 60)
    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - sise)
    const y = getRandomNumber(0, width - sise)


    circle.style.background = getRandomColor()

    circle.classList.add('circle')
    circle.style.width = `${sise}px`
    circle.style.height = `${sise}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}
