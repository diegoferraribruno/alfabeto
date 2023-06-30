let project = {
    size: {
        with: 3508,
        height: 2480
    },
    offset: { x: 0, y: 0 },
    background: {
        image: undefined,
        transparent: true,
        color: "#ffffff"
    },
    animation: {
        fps: 6,
        frames: 1
    }
}

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext('2d')

let cameraOffset = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
let cameraZoom = 1
let MAX_ZOOM = 32
let MIN_ZOOM = 0.27
let SCROLL_SENSITIVITY = 0.005

let mode = "paint";
var brush = new Image()
brush.src = "brush5.png"

let isDragging = false
let dragStart = { x: 0, y: 0 }

let ispaint = false

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let initialPinchDistance = null
let lastZoom = cameraZoom
let lastpinch = 4

function draw() {
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at

    ctx.scale(cameraZoom, cameraZoom)
    ctx.translate(-window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y)
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    /*  ctx.fillStyle = "#cccccc"
      drawRect(0, 0, project.size.with, project.size.height)
      ctx.lineWidth = 5;
      ctx.strokeStyle = "black";
      ctx.stroke();*/
    drawCanvasSize()

    ctx.translate(window.innerWidth / 2, window.innerHeight / 2)

    ctx.fillStyle = "#00dd55"
    drawRect(-35, -35, 20, 20)
    drawRect(15, -35, 20, 20)
    drawRect(-35, 15, 70, 20)

    ctx.fillStyle = "#fff"
    drawText("Center and zoom Canvas", -255, -100, 32, "courier")

    // ctx.rotate(-31 * Math.PI / 180)
    ctx.fillStyle = `#${(Math.round(Date.now() / 40) % 4096).toString(16)}`
    drawText(lastpinch, -110, 100, 32, "courier")

    ctx.fillStyle = "#fff"
    // ctx.rotate(31 * Math.PI / 180)

    drawText("width: " + project.size.with + " height: " + project.size.height + " ", -26, 0, 48, "courier")
    comandosExec()
    ctx.restore()

    // requestAnimationFrame(draw)
}
function drawCanvasSize() {
    var x = 0
    var y = 0;
    var width = project.size.with;
    var height = project.size.height;

    var borderWidth = 2;
    var offset = borderWidth * 2;

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(x - borderWidth, y - borderWidth, width + offset, height + offset);
    ctx.fillStyle = project.background.color;
    if (project.background.transparent) {
        ctx.globalCompositeOperation = 'destination-out'
    }
    ctx.fillRect(x, y, width, height);
    if (project.background.transparent) {
        ctx.globalCompositeOperation = 'destination-over'
    }
}
// Gets the relevant location from a mouse or single touch event
function getEventLocation(e) {
    if (e.touches && e.touches.length == 1) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    else if (e.clientX && e.clientY) {
        return { x: e.clientX, y: e.clientY }
    }
}

function drawRect(x, y, width, height) {
    ctx.fillRect(x, y, width, height)
}

function drawText(text, x, y, size, font) {
    ctx.font = `${size}px ${font}`
    ctx.fillText(text, x, y)
}

let comandos = [[brush, 100, 100, 38, 38]]
function comandosExec() {
    for (i = 0; i < comandos.length; i++) {
        let comando = comandos[i]
        if (comando[0] == "GCO") {
            ctx.globalCompositeOperation = comando[1]
        } else {
            ctx.drawImage(comando[0], comando[1], comando[2], comando[3], comando[4]);
        }
    }
}

function onPointerDown(e) {
    dragStart.x = Math.floor(getEventLocation(e).x / cameraZoom - cameraOffset.x)
    dragStart.y = Math.floor(getEventLocation(e).y / cameraZoom - cameraOffset.y)
    if (mode === "paint" || mode === "erase") {
        let comando = [brush, dragStart.x, dragStart.y, 32, 32]
        comandos.push(comando)
        draw()
        ispaint = true
    } else {

        isDragging = true
    }
}

function onPointerUp(e) {
    isDragging = false
    ispaint = false
    initialPinchDistance = null
    lastZoom = cameraZoom
}

function onPointerMove(e) {
    if (ispaint) {
        dragStart.x = getEventLocation(e).x / cameraZoom - cameraOffset.x
        dragStart.y = getEventLocation(e).y / cameraZoom - cameraOffset.y
        let comando = [brush, dragStart.x, dragStart.y, 32, 32]
        comandos.push(comando)
        draw()
    }
    if (isDragging) {
        cameraOffset.x = getEventLocation(e).x / cameraZoom - dragStart.x
        cameraOffset.y = getEventLocation(e).y / cameraZoom - dragStart.y
        draw()
    }

}

function handleTouch(e, singleTouchHandler) {
    if (e.touches.length == 1) {
        singleTouchHandler(e)
    }
    else if (e.type == "touchmove" && e.touches.length == 2) {
        isDragging = false
        handlePinch(e)
    }
}

function handlePinch(e) {
    e.preventDefault()

    let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY }

    // This is distance squared, but no need for an expensive sqrt as it's only used in ratio
    let currentDistance = Math.abs(touch1.x - touch2.x) / 2 + Math.abs(touch1.y - touch2.y) / 2

    let distX = Math.floor(currentDistance / 50)
    if ((distX % 1) == 0 && distX != lastpinch) {
        lastpinch = distX
        let centerpos = { x: (touch1.x + touch2.x) / 2, y: (touch1.y - touch2.y) / 2 }
        if (initialPinchDistance == null) {
            initialPinchDistance = currentDistance
        }
        else {
            if (currentDistance > initialPinchDistance) {
                adjustZoom(1, null, centerpos.x, centerpos.y)
            } else if (currentDistance < initialPinchDistance) {
                adjustZoom(-1, null, centerpos.x, centerpos.y)
            }

        }
    }
}

function adjustZoom(zoomAmount, zoomFactor, x, y) {

    if (!isDragging) {

        if (zoomAmount > 0) {
            cameraZoom *= 2
        } else if (zoomAmount < 0) {
            cameraZoom /= 2
        }
        else if (zoomFactor) {
            if (zoomFactor > 1) {
                cameraZoom *= 2
            } else if (zoomFactor < 1) {
                cameraZoom /= 2
            }
            //  cameraZoom = zoomFactor * lastZoom
        }
        cameraZoom = Math.min(cameraZoom, MAX_ZOOM)
        cameraZoom = Math.max(cameraZoom, MIN_ZOOM)
        if (cameraZoom == MIN_ZOOM) {
            cameraOffset.x = window.innerWidth / 2
            cameraOffset.y = window.innerHeight / 2
        } else if (cameraZoom > 1 && cameraZoom < 2) {
            cameraZoom = 1
            cameraOffset.x = Math.floor(-dragStart.x + window.innerWidth / 2 / cameraZoom) // 2 cameraOffset.x - Math.abs(cameraOffset.x - x - window.innerWidth / 2) / 4
            cameraOffset.y = Math.floor(-dragStart.y + window.innerHeight / 2 / cameraZoom)// 2 cameraOffset.x - Math.abs(cameraOffset.y - y - window.innerHeight / 2) / 4
        } else {
            cameraOffset.x = Math.floor(-dragStart.x + window.innerWidth / 2 / cameraZoom) // 2 cameraOffset.x - Math.abs(cameraOffset.x - x - window.innerWidth / 2) / 4
            cameraOffset.y = Math.floor(-dragStart.y + window.innerHeight / 2 / cameraZoom)// 2 cameraOffset.x - Math.abs(cameraOffset.y - y - window.innerHeight / 2) / 4
        }
        console.log(zoomAmount)
        draw()
        setTimeout(() => document.getElementById("x1").innerHTML = cameraZoom + "x")
    }
}

function zoom(value) {
    if (value) {
        adjustZoom(value, null, dragStart.x, dragStart.y)
    }
    //temporary
    mode = "zoom"
    criaCabeca()
    // resetZoom()
}

function resetZoom() {
    cameraZoom = 1
    cameraOffset.x = window.innerWidth / 2
    cameraOffset.y = window.innerHeight / 2
    draw()

}

function scrollMoveCanva(x, y) {
    cameraOffset.x -= x / cameraZoom
    cameraOffset.y -= y / cameraZoom
    draw()
}
canvas.addEventListener('mousedown', onPointerDown)
canvas.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
canvas.addEventListener('mouseup', onPointerUp)
canvas.addEventListener('touchend', (e) => handleTouch(e, onPointerUp))
canvas.addEventListener('mousemove', onPointerMove)
canvas.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
canvas.addEventListener('wheel', (e) => { e.preventDefault(); adjustZoom(e.deltaY, null, e.clientX, e.clientY) })

// Ready, set, go
draw()
