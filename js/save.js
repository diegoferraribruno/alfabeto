// Save | Download image from stackoverflow
// Convert canvas to image added to startup .getElementById("btn-download")

function salvaImagem() {
    save_frame()
    let nome = iD("filename").value
    if (nome != null && nome != "") {
        var dataURL = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        //downloadImage(dataURL, 'my-canvas.jpeg');
        downloadImage(dataURL, `${nome}.png`);
    } else { Alert(alerts[language][18]) }
}

//function downloadImage(data, filename = 'untitled.jpeg') {
function downloadImage(data, filename = "untitled.png") {
    var a = document.createElement("a");
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { confirmLink("apoio.html") }, 1200);
    //
}
var cont
var spritao = new Image();

async function export_anim() {
    save_frame()

    let len = animacao.length
    if (len == 0) {
        Alert(alerts[language][0] + " " + alerts[language][19])
        return
    }
    if (iD("filenameS").value == "") {
        Alert(alerts[language][20])
        return
    }
    Alert(alerts[language][21] + "<br>" + alerts[language][17])

    let exp = document.createElement("canvas")
    exp.width = canvas.width * len
    exp.height = canvas.height
    exp.id = "exp";
    exp.style.visibility = "hidden"
    exp.style.position = "absolute"
    iD("tela").appendChild(exp);
    cont = iD("exp").getContext("2d");

    for (i = 0; i < len; i++) {
        blob = dataURItoBlob(animacao[i]);
        let imagem = new Image();
        imagem.src = URL.createObjectURL(blob);
        let pos = i * canvas.width
        imagem.onload = function () {
            cont.globalCompositeOperation = "source-over"
            cont.drawImage(imagem, 0, 0, imagem.width, imagem.height, pos, 0, imagem.width, imagem.height);
            if (iD("unir").checked && background_anim == true) {
                if (!iD("sobrepor").checked) {
                    cont.globalCompositeOperation = "destination-over"
                    cont.drawImage(backgroundSprite, 0, 0, exp.width, exp.height)

                } else {
                    cont.globalCompositeOperation = "source-under"
                    cont.drawImage(backgroundSprite, 0, 0, exp.width, exp.height)
                    cont.globalCompositeOperation = "destination-over"
                }

            }
        }
    }


    setTimeout(() => {
        let fname = iD("filenameS").value
        var dataURL = iD("exp")
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        if (iD("seq").checked) {
            downloadImage(dataURL, `${fname}.png`);
        }
        spritao.src = dataURL
        spritao.onload = function () {

            if (iD("gif").checked) {
                exp.width = canvas.width
                exp.height = canvas.height
                let myanima = new Image()
                myanima.src = spritao.src
                myanima.onload = function () {

                    var encoder = new GIFEncoder();
                    encoder.setRepeat(0); //auto-loop
                    encoder.setDelay(1000 / fps);
                    console.log(encoder.start())

                    for (i = 0; i < animacao.length; i++) {
                        cont.fillStyle = "rgb(255,255,255)"
                        cont.fillRect(0, 0, canvas.width, canvas.height); //GIF can't do transparent so do white
                        cont.drawImage(myanima, - canvas.width * i, 0, myanima.width, myanima.height)
                        encoder.addFrame(cont);
                    }
                    encoder.finish();
                    encoder.download(fname + ".gif");
                }

            }
            removeElement("exp")

        }
    }, 1200 + (100 * len))
}
function confirmLink(url) {
    if (url == "apoio.html") {
        criaConteudo()
        apoio()
    } else {
        let canvasD = iD("canvas_div")
        if (canvasD) {
            let confirm = iD("confirm")
            if (!confirm) {
                let item = document.createElement("div")
                item.id = "confirm"
                item.classList.add("confirm")
                item.innerHTML = " Ir para a página:<br> <div  class='shadow'><a href='" + url + "'> " + url + " ✅</a> </div>"
                item.innerHTML += "<div onClick='cancela()' class='shadow'>cancela ❌</div>"
                document.body.appendChild(item)
            } else {
                cancela()
                confirmLink(url)
            }
        } else {
            window.open(url, '_self');
        }
    }
}
function cancela(oque = "confirm") {
    let confirm = iD(oque)
    confirm.parentElement.removeChild(confirm)
}
function criaConteudo() {
    let ap = iD("conteudo")
    if (!ap) {
        var conteudo = document.createElement("div")
        conteudo.id = "conteudo"
        conteudo.classList.add("day")
        conteudo.classList.add("fundobranco")
        document.body.appendChild(conteudo)
    } else {
        cancela("conteudo")
    }
}
function apoio() {
    let ap = iD("conteudo")
    if (ap) {
        let apoioHTML = `
			    <div onClick='cancela("conteudo")' style=' float:right'class='bot'>❎</div>
           Este website é um projeto de
            <a href="https://github.com/diegoferraribruno"> código livre</a> em constante evolução.<br><br>
           Se desejar contribuir financeiramente com seu desenvolvedor, você pode via:</b>
					<a href="https://github.com/sponsors/diegoferraribruno"> Github Sponsors</a> ou fazendo um PIX para:<br>
			 <input type="text" size="26" value="f6aecef5-e60b-408e-97e1-30ee3927c0c0" id="myInput" readonly>

<button onclick="copyPix()">Copiar</button><br><br>
Ajude também a divulguar:</b><br>
					https://diegoferraribruno.github.io<br><br>
				Grato pela sua atenção<br><br>
				</div>
            <div id="bio2"></div>`
        iD("conteudo").innerHTML = apoioHTML

        createAvatar(0, "bio2")
    }

}

function copyPix() {
    var copyText = iD("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(copyText.value);
    Alert(alerts[language][15] + " " + copyText.value);
}
function createAvatar(id = 0, onde = "bio2") {

    var avatar = document.createElement("img")
    avatar.src = "./avatar/" + usuarios[id].id + ".png"
    avatar.classList.add('mini')
    avatar.setAttribute("style", "float:right; margin-left:6px; margin-right:6px;")
    iD(onde).appendChild(avatar)
    iD(onde).innerHTML +=
        "<b>" + usuarios[id].nome + "</b><br>" + usuarios[id].bio +
        "<br><a href='" + usuarios[id].link + "' target='blank'>link</a>";
}


var usuarios = [{
    id: "01",
    nome: "Diego Ferrari Bruno",
    link: "https://diegoferraribruno.github.io",
    bio: "Pai, artista, designer, programador",
}]

function export2txt() {
    changedBrush = false
    changeBrush()
    setTimeout(() => {
        let brushes = Object.keys(newBrushes)
        let lenb = brushes.length
        Alert("salvando 🖌️ x " + lenb)
        let expBrush = []
        let lenc = basicBrushes.length
        if (lenc > 9) {
            console.log("maior q 9")
            for (let i = 9; i < lenc; i++) {
                let prush = new Image();
                prush = basicBrushes[i]

                console.log(basicBrushes[i])
                expBrush.push(prush)
            }
        }

        /*   for (i = 0; i < lenb; i++) {
            let bob = newBrushes[brushes[i]][0].src
           expBrush[brushes[i]] = bob
          }
        */
        let canvasInfo = {
            "width": canvas.width,
            "height": canvas.height
        }
        let pacote = {
            "expBrush": expBrush,
            "canvasInfo": canvasInfo,
            "newBrushes": brushes,
            "customBrushes": customBrushes,
            "comandosb": comandosb
        }
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(pacote, null, 2)], {
            type: "text/plain"
        }));
        a.setAttribute("download", "data.art");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }, 400)
}