let startText = 0
let texts = [
  ["", "", "🖐 oie.", "Pode desenhar aqui!", "🖌️ 👆️"],
  ["", "", "Ou tirar uma 📷", "depois apagar 🧽 e", "no modo por baixo ⭕,"],
  ["", "", "tirar outra 📷", "E fazer uma bela", "foto-montagem!"]
]

document.addEventListener("DOMContentLoaded", startup);

function startup() {
  window.addEventListener("resize", checkOrientation, false);
  window.addEventListener("orientationchange", checkOrientation, false);
  document.getElementById('inputSprite').addEventListener('change', importSprite);
  setInterval(checkOrientation, 2000);

  document.querySelector('emoji-picker').addEventListener('emoji-click', function onEvent(event) {
    trocaEmoji(event.detail.unicode);
    emojipicker();
  });
  Fundo("none")
  counter = setInterval(() => undoing(), 70)
  window.onkeydown = function (event) {
    //on enter key
    let activeEl = document.activeElement
    console.log(activeEl.tagName, activeEl.type)
    if (activeEl.tagName != "INPUT" && activeEl.tagName != "EMOJI-PICKER" && activeEl.type != "text") {
      if (event.key === "Enter" && mode == "recortar") {
        cortar();
      } else if (event.key === "Enter" && mode == "cam") {
        tirafoto()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        next_frame()
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        prev_frame()

      } else if (event.key === "Escape" && mode == "cam") {
        removeVideo();
      }
      else if (event.key === "Escape") {
        removeClass()
        window.parent.focus()
      } else if (event.key === "z") {
        modeTo("zoomx")
      } else if (event.key === "p" || event.key === "b") {
        modeTo("pintar")
        removeClass()
      } else if (event.key === "e") {
        modeTo("apagar")
        removeClass()
      } else if (event.code === "Space") {
        if (mode == "play") { stop(); } else { play(); }
      } else if (event.key === "+") {
        console.log("mais um")
        new_frame()
      } else if (event.key === "Delete") {
        removeFrame()
      }

    }
  }
  modeTo("pintar")
  removeClass();

  document.getElementById(
    "globalComposite"
  ).innerHTML =
    `<span style="position:relative; width:32px; display:inline-block; left:4px; ` +
    `padding-top: 0px;">🔲</span> <span style="color:white;` +
    `position:absolute;  display:block; width:20px; left: 3px; top:-5px;" title="Pintando por cima">⭕</span> `;
  window.addEventListener("resize", function (event) {
    resizeScreen();
  });
  resizeScreen();
  document.getElementById("undo").addEventListener(
    "touchstart",
    (event) => {
      event.preventDefault();
      undoT();
    },
    false
  );
  document.getElementById("undo").addEventListener(
    "touchend",
    (event) => {
      event.preventDefault();
      undoTEnd();
    },
    false
  );
  document.getElementById("redo").addEventListener(
    "touchstart",
    (event) => {
      event.preventDefault();
      redoT();
    },
    false
  );
  document.getElementById("redo").addEventListener(
    "touchend",
    (event) => {
      event.preventDefault();
      redoTEnd();
    },
    false
  );
  window.addEventListener("keyup", handleKeyUp);
  window.addEventListener("keydown", handleKeys);

  document.getElementById("zoombar").value =
    zoomScale.indexOf(zoomFactor);

  desenhoDiv.addEventListener("gesturestart", prevent);
  win.addEventListener("touchmove", prevent);

  initStrokeRange()
  setTimeout(() => resizeScreen(), 10)
  night()
  setTimeout(() => {
    canvas.addEventListener("pointerdown", handleStart);
    canvas.addEventListener("pointerup", handleUp);
    canvas.addEventListener("pointercancel", handleCancel);
    canvas.addEventListener("pointermove", handleMove);
    canvas.addEventListener("pointerleave", handleEnd);
    // limpaCabeca();
    apresenta()
  }, 1000);
  setTimeout(() => localize(), 160)
  loading()
}

function loading() {
  /* setTimeout(() => document.getElementById("carregandoc").innerHTML = "<span class='carregandoc'>3</span>", 200)
   setTimeout(() => document.getElementById("carregandoc").innerHTML = "<span class='carregandoc'>2</span>", 600)
   setTimeout(() => document.getElementById("carregandoc").innerHTML = "<span class='carregandoc'>1</span>", 1000)
   setTimeout(() => document.getElementById("carregandoc").innerHTML = "<span class='carregandoc'>Art!</span>", 1400)*/
  //setTimeout(() => { document.getElementById("carregando").classList.add("desaparece"); }, 3000)
  setTimeout(() => { removeElement("carregandoa") }, 10000)
}

function apresenta() {
  if (comandos.length == 0 && mode == "pintar") {

    // alert("desenha no xadrez")
    canvasBack.ctx.font = 24 + 'px serif';
    canvasBack.ctx.textAlign = "center";
    canvasBack.ctx.textBaseline = "middle";
    let len = texts[startText].length
    for (i = 0; i < len; i++) {
      canvasBack.ctx.fillText(texts[startText][i], 160, 40 * i + 40)
    }
    setTimeout(() => {
      canvasBack.ctx.setTransform(1, 0, 0, 1, 0, 0);
      canvasBack.ctx.clearRect(0, 0, canvas.width, canvas.height);
      setTimeout(() => { apresenta() }
        , 600);
    }, 1800);
    startText++
    if (startText >= texts.length) {
      startText = 0
    }

  }

}