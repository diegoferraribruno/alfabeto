var language = "pt_BR"
function localize() {
    if (language == "pt_BR") {
        language = "en"
        document.getElementById("localize").innerHTML = "🇬🇧"

    } else {
        language = "pt_BR"
        document.getElementById("localize").innerHTML = "🇧🇷"
    }
    Array.from(document.querySelectorAll('txt'))
        .forEach(function (el) {
            let name = el.getAttribute("name")
            el.innerHTML = textos[language][name]

            //            textos[name] = inn
            // console.log(name)
        });
}
var alerts = {
    "pt_BR": {
        0: "Por favor,<br> adicione ➕ quadros a sua animação",
        1: "Quadro",
        2: "Modo foto única 📷.",
        3: "Modo sequencia de quadros 🎥 🎞️.",
        4: "Camera API indisponível no seu navegador",
        5: "Não foi possivel acessar a camera",
        6: "Modo infinito",
        7: "Ativado",
        8: "Desativado",
        9: "Modo",
        10: "duplicado",
        11: "apagador",
        12: "⚠️ Pintando <b>por trás</b> do quadro.",
        13: "⚠️ Pintando por <b>cima</b> do quadro.",
        14: 'Efeito aplicado',
        15: "Chave PIX copiada: ",
        16: "recortando o quadro.<br>",
        17: "Por favor, aguarde.",
        18: "Por favor, preencher o nome do arquivo",
        19: "antes de exportar sua animação.",
        20: "escreva um titulo para seu arquivo de imagem",
        21: "Seu arquivo esta sendo preparado.",
        22: "importando seu projeto",
        23: "imagem de fundo removida"
    },
    "en": {
        0: "Please,<br> ada ➕ frames to your animation",
        1: "Frame",
        2: "Single shot mode 📷.",
        3: "Sequence of frames mode 🎥 🎞️.",
        4: "Camera API is not available in your browser",
        5: "Could not access the camera",
        6: "Infinity paint mode",
        7: "Activated",
        8: "Deactivated",
        9: "Mode",
        10: "duplicated",
        11: "ereaser",
        12: "⚠️ Painting <b>behind</b> the canvas",
        13: "⚠️ Painting <b>over</b> the canvas",
        14: 'Applied Effect',
        15: "PIX key copied to clipboard: ",
        16: "Croping the canvas.<br>",
        17: "Please, Wait.",
        18: "Please, fill the file name field.",
        19: "before exporting your animation",
        20: "write a title for you image file",
        21: "your file is beeing prepared.",
        22: "importing your project",
        23: "background image removed"
    }
}
let example = alerts[language][0]
let textos = {
    "pt_BR": {
        "1": "Toque numa áre pintada para capturar sua cor",
        "2": "Toque numa áre pintada para capturar sua cor",
        "3": "<b>⚠️Atenção!⚠️</b><br>",
        "4": "Este é um App de diversão!<br>durante o processo de criação e exportação, a imagem perderá qualidade!<br> Dito isto, espero que você se divirta!<br>",
        "5": "Feito por:",
        "6": " com códigos de:",
        "7": "e uma turma aí do",
        "8": "Mudanças nas versões:",
        "9": "Tamanho atual:",
        "10": "Largura: ",
        "11": "Altura:",
        "12": "recorte manual",
        "13": "limite 30 quadros",
        "14": "Apagador",
        "15": "Use o 📌 para guardar sua cor.",
        "16": "pinceis personalizados",
        "17": "quadro como pincel",
        "18": "Configurações do quadro",
        "19": "Tamanho do quadro",
        "20": "Transparencia do quadro",
        "21": "Quadros visiveis",
        "22": "Adicionar Fundo falso:",
        "23": "Preencher tudo ",
        "24": "Velocidade da Animação🎞️",
        "25": "Quadros Por Segundo",
        "26": "Remover quadro atual",
        "27": "clonar o quadro",
        "28": "Mudar ordem do quadro",
        "29": "Carregar imagem",
        "30": "Ajustar tela ao tamanho da imagem ",
        "31": "Enviar uma animação",
        "32": "Auto detectar quadros",
        "33": "carregar como plano de fundo?",
        "34": "sobrepor plano de fundo",
        "35": "quantidade de quadros",
        "36": "largura:",
        "37": "altura:",
        "38": "Remover Filtros",
        "39": "Invertido",
        "40": "Desfoque",
        "41": "Sepia",
        "42": "Contraste",
        "43": "Salvar quadro atual",
        "44": "Título:",
        "45": "Exportar sequencia de quadros",
        "46": "Exportar Gif animado:",
        "47": "Unir quadro com fundo",
        "48": "Título:",
        "49": "Exportar projeto",
        "50": "Salvar antes?",
        "51": "Recortar automaticamente ",
        "52": "Recortar para seleção",
        "53": "⚠️ impossivel desfazer",
        "54": "limpar quadro",
        "55": "Apagar toda aanimação",
        "56": "Remover quadro atual",
        "57": "Rotacionar a tela",
        "58": "Confirmar rotação",
        "59": "Brightness / brilho",
        "60": "Modo de exposição Manual",
        "61": "exposureTime",
        "62": "Compensação de exposição",
        "63": "Saturação",
        "64": "Contraste",
        "65": "Definição",
        "66": "Distancia focal",
        "68": "Pan",
        "69": "Tilt",
        "70": "balancço do branco e cor Manual",
        "71": "Temperatura da cor",
        "72": "Balanço do branco ",
        "73": "Modo de Foco Manual"
    },
    "en": {
        "1": "Touch a painted area to pick it's color",
        "2": "Touch a painted area to pick it's color",
        "3": "<b>⚠️Atention!⚠️</b><br>",
        "4": "This is a fun app!<br>  during creation and exporting , image will loose some quality! That said, i hope you have fun!<br>",
        "5": "Made By:",
        "6": "whith code from:",
        "7": "and a gang from ",
        "8": "Version Changes:",
        "9": "Current Size:",
        "10": "Width: ",
        "11": "Height:",
        "12": "Manual crop",
        "13": "limit to 30 frames",
        "14": "Ereaser",
        "15": "Use the 📌 to save your colors.",
        "16": "Personalized brushes",
        "17": "Use frame as brush",
        "18": "Canvas configurations",
        "19": "Canvas Size",
        "20": "Canvas Transparency",
        "21": "Visible frame layers",
        "22": "Add fake background:",
        "23": "Fill all ",
        "24": "Animation speed 🎞️",
        "25": "Frames Per Second",
        "26": "Remove Actual Frame",
        "27": "Clone frame",
        "28": "Change Frame Order",
        "29": "Load image",
        "30": "Ajust canvas to image size",
        "31": "Load an animation sprite-sheet",
        "32": "Auto-detect frames",
        "33": "Load as a background animation?",
        "34": "Background animation over canvas",
        "35": "Amount of frames",
        "36": "width:",
        "37": "height:",
        "38": "Remove Filters",
        "39": "Invert",
        "40": "Blur",
        "41": "Sepia",
        "42": "Contrast",
        "43": "Salve actual frame",
        "44": "Title: ",
        "45": "Export sprite-sheet (frame sequence)",
        "46": "Export animated Gif",
        "47": "Unite canvas with background",
        "48": "Title:",
        "49": "Export project",
        "50": "save before?",
        "51": "Auto-crop Canvas ",
        "52": "Crop to Selection",
        "53": "⚠️ impossible undo",
        "54": "Clear Canvas",
        "55": "Erease all animation",
        "56": "Remove actual frame",
        "57": "Rotate canvas",
        "58": "confirm rotation",
        "59": "Brightness",
        "60": "Manual exposure Mode",
        "61": "exposureTime",
        "62": "Exposure compensation",
        "63": "Aaturation",
        "64": "Contrast",
        "65": "Sharpness",
        "66": "Focus Distance",
        "68": "Pan",
        "69": "Tilt",
        "70": "Manual white Balance / color",
        "71": "ColorTemperature",
        "72": "White balace ",
        "73": "Manual Focus Mode"
    }
}