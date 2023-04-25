let keyZ = false
let keyY = false
let keyCtrl = false
var shiftHeld = false;

function handleKeyUp(evt) {
    if (evt.keyCode === 16) {
        shiftHeld = false
        redoTEnd()
    }
    if (evt.keyCode === 17) {
        keyCtrl = false
        redoTEnd()
        undoTEnd()

    }
    if (evt.key === "y") {
        redoTEnd()
        keyY = false
    }
    if (evt.keyCode === 90) {
        keyZ = false
        undoTEnd()

    }
}
function handleKeys(evt) {
    if (evt.keyCode === 90) {
        keyZ = true
    }
    if (evt.keyCode === 16) {
        shiftHeld = true
    }
    if (evt.keyCode === 17) {
        keyCtrl = true
    }
    if (evt.key === "y") {
        keyY = true
    }
    if (keyCtrl) {
        if (keyZ) {
            if (shiftHeld) {
                redoT();
            } else { undoT() }

        } else if (keyY) {
            redoT()
        }

    }
}

var tempImg = document.createElement("img");
function handleStart(evt) {
    removeClass();
    cursor.style.opacity = 0.4
    changedBrush = false;
    evt.preventDefault();
    origin.x = (evt.pageX - offsetX) / zoomFactor
    origin.y = (evt.pageY - offsetY) / zoomFactor
    if (pixelGood) {
        origin.x = redondo(origin.x)
        origin.y = redondo(origin.y)
    }
    offsetX = canvas.getBoundingClientRect().left;
    offsetY = canvas.getBoundingClientRect().top;
    if (mode === "recortar") {
        swapImg = canvas.toDataURL("image/png");
        blob = dataURItoBlob(swapImg);
        tempImg = document.createElement("img");
        tempImg.src = URL.createObjectURL(blob);
        isSelecting = true;
    }
    if (mode == "emoji") {
        isEmoji = true
        isDrawing = false
    }
    if (mode == "zoom") {
        isGrabing = true;
    }
    if (mode == "pintar" || mode == "apagar" || mode == "cores") {
        isDrawing = true
        mouseOver = true;

        offsetX = canvas.getBoundingClientRect().left;
        offsetY = canvas.getBoundingClientRect().top;
        x = (evt.pageX - offsetX) / zoomFactor
        y = (evt.pageY - offsetY) / zoomFactor
        if (pixelGood) {
            x = redondo(x)
            y = redondo(y)
        }
        if (brushMode == 0) {
            desenha(
                "p",
                context.globalCompositeOperation,
                x,
                y,
                origin.x,
                origin.y + 0.1,
                strokeColor,
                stroke,
                linejoin
            );
        }
        else {
            desenha(
                "brush",
                context.globalCompositeOperation,
                x,
                y,
                origin.x,
                origin.y,
                strokeColor,
                strokeWidth,
                brushName
            );
        }

    }
    if (mode == "picker") {
        isPicking = true
    }

}


var canvasBack = document.createElement("canvas")
canvasBack.width = canvas.width
canvasBack.height = canvas.height
canvasBack.ctx = canvasBack.getContext('2d')
canvasBack.ctx.drawImage(canvas, 0, 0)
let cursorShow = true


function handleMove(evt) {
    evt.preventDefault();
    offsetX = canvas.getBoundingClientRect().left;
    offsetY = canvas.getBoundingClientRect().top;
    x = (evt.pageX - offsetX) / zoomFactor
    y = (evt.pageY - offsetY) / zoomFactor
    if (pixelGood) {
        x = redondo(x)
        y = redondo(y)
    }
    if (isSelecting === true) {
        cropEnd.x = x
        cropEnd.y = y
        context.strokeStyle = "#ffccccdd";
        desenhaRetangulo();
    }
    if (isDrawing === true) {
        mouseOver = true;
        if (brushMode == 0) {
            desenha(
                "p",
                context.globalCompositeOperation,
                x,
                y,
                origin.x,
                origin.y,
                strokeColor,
                stroke,
                linejoin
            );

        } else {
            desenha(
                "brush",
                context.globalCompositeOperation,
                x,
                y,
                origin.x,
                origin.y,
                strokeColor,
                strokeWidth,
                brushName
            );

        }

    }
    if (isPicking) {
        var imageData = context.getImageData(x, y, 1, 1).data;
        if (imageData[3] > 1) {
            RGBAToHSLA(
                imageData[0],
                imageData[1],
                imageData[2],
                imageData[3]
            );
            setStrokeColor();
        }
    }
    if (isGrabing) {
        scrollCanva((origin.x - x) * zoomFactor, (origin.y - y) * zoomFactor);
    }
    if (!isGrabing && mode != "recortar") {
        origin.x = x
        origin.y = y

        cursor.style.left = evt.pageX + "px";
        cursor.style.top = evt.pageY + "px";
        cursor.style.opacity = 0.6
        if (isDrawing == false && (pixelGood == true || context.globalCompositeOperation == "destination-out") && mode != "emoji") {

            if (cursorShow == true) {
                restoreCanvas()
                drawBrush(
                    context.globalCompositeOperation,
                    x,
                    y,
                    origin.x,
                    origin.y,
                    strokeColor,
                    strokeWidth,
                    brushName)

            } else {
                restoreCanvas()
            }
        }


    }
}
function handleUp(evt) {
    cursor.style.opacity = 0
    offsetX = canvas.getBoundingClientRect().left;
    offsetY = canvas.getBoundingClientRect().top;
    let over = checkOverCanvas(evt.pageX, evt.pageY)
    x = (evt.pageX - offsetX) / zoomFactor
    y = (evt.pageY - offsetY) / zoomFactor
    if (pixelGood) {
        x = redondo(x)
        y = redondo(y)
    }
    if (isSelecting === true && over === true) {
        cropEnd.x = x
        cropEnd.y = y
        desenhaRetangulo();
    } else if (isSelecting === true && over === false) {
        cropEnd.x = 0
        cropEnd.y = 0
        limpaRetangulo()
    }

    if (mode === "emoji" && isEmoji) {
        let size = document.getElementById("emosize").value
        desenha(
            "e",
            context.globalCompositeOperation,
            x,
            y,
            emoji,
            size
        );
        ultimoToque.x = x
        ultimoToque.y = y
        isEmoji = false
    }
    if (mode === "recortar") {
        mostraMenu("recortar")
        isSelecting = false
        desenhaRetangulo()
    }

    if (isPicking) {

        var imageData = context.getImageData(x, y, 1, 1).data;
        if (imageData[3] > 1) {
            RGBAToHSLA(
                imageData[0],
                imageData[1],
                imageData[2],
                imageData[3]
            );
            setStrokeColor();
        }
        isPicking = false
    }
    if (isDrawing) {
        ultimoToque.x = x
        ultimoToque.y = y
        isDrawing = false;
    }
    if (isGrabing) {
        origin.x = x
        origin.y = y
        isGrabing = false;

    }
}

function handleEnd(evt) {
    mouseOver = false;
    setTimeout(() => {
        if (mouseOver == false) {
            isDrawing = false;
            isGrabing = false;
            isPicking = false;
            isSelecting = false;
        }
    }, 500);
}

function handleCancel(evt) {
    evt.preventDefault();
}

function prevent(evt) {
    evt.preventDefault();
}

function checkOverCanvas(x, y, offset = 0) {
    if (x > canvas.offsetLeft + offset && x < canvas.offsetWidth + canvas.offsetLeft - offset && y > canvas.offsetTop + offset && y < canvas.offsetHeight + canvas.offsetTop - offset) {
        return true;
    } else {
        return false;
    }
}

