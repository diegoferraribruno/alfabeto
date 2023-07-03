let filters = ["none", "invert", "blur", "grayscale", "sepia", "contrast", "brightness"]
let fx = 0

function FX(fx, onde) {
    canvasFront.ctx.save()
    if (onde == undefined) {
        onde = canvasFront.ctx
        confirmFX(fx, filters[fx])
    }
    if (fx != 0) {

        if (fx > 3) {
            let quanto = iD(filters[fx] + "Bar").value
            onde.filter = filters[fx] + "(" + quanto + "%)"

        } else if (fx == 1) {

            onde.filter = filters[fx] + "()"
        } else if (fx == 2) {
            let quanto = iD(filters[fx] + "Bar").value

            onde.filter = filters[fx] + "(" + quanto + "px)"
        } else if (fx == 3) {
            let quanto = iD(filters[fx] + "Bar").value

            onde.filter = filters[fx] + "(" + quanto + ")"

        } else if (fx == 6) {
            let quanto = iD(filters[fx] + "Bar").value

            onde.filter = filters[fx] + "(" + quanto + ")"

        }
        updatecanvasFront()

    } else {
        onde.filter = filters[fx]
    }

}
function updatecanvasFront() {
    // canvasFront.style.backgroundColor = "#ffffff"
    canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvasFront.ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);
    canvasFront.ctx.drawImage(canvas, 0, 0)
    canvasFront.ctx.restore()
}

function confirmFX(fx, fxname) {
    //removeClass()
    let confirm = iD("confirmFX")
    menufx(fx)
    confirm.classList.remove("esconde")
    "display: none;"
    confirm.innerHTML = `<div  class="shadow" onClick="applyFX('` + fx + `')">  ✅ </div >` +
        `<div onClick="cancelaFX()"
         class='shadow'">`+ textos[language]["80"] + ` ❌</div>`
}
function applyFX() {
    menufx()

    removeClass()
    img_b64 = canvasFront.toDataURL("image/png");
    desenha("s", "source-over", img_b64, 0, 0, canvas.width, canvas.height)
    canvasFront.filter = filters[0]

    // comandosParaComandosb()
    setTimeout(() => {
        //   comando = ["FX", fx]
        //  comandos.unshift(comando)
        save_frame()
        Alert(alerts[language][14], 0.8)
        canvasFront.filter = filters[0]
        canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
        canvasFront.ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }, 300)
    setTimeout(() =>
        mostraMenu("FX")
        , 1000)
}
function cancelaFX() {
    setTimeout(() =>
        mostraMenu("FX")
        , 1000)
    menufx()
    canvasFront.filter = filters[0]
    canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvasFront.ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);
}


function menufx(qual = undefined) {
    let confirm = iD("confirmFX")
    if (qual == undefined) {
        confirm.classList.add("esconde")
        for (i = 0; i < 7; i++) {
            document.getElementById("fx" + i).style.display = "block"

        }
    } else {
        confirm.classList.remove("esconde")
        for (i = 0; i < 7; i++) {
            document.getElementById("fx" + i).style.display = "none"

        }
        document.getElementById("fx" + qual).style.display = "block"
    }
}