function apoio() {
    let ap = iD("conteudo")
    if (ap) {
        let apoioHTML
        switch (language) {
            case "pt_BR":
                apoioHTML = `<center>
                <span onClick='cancela("conteudo")' style=' float:right'class='close'></span>
            <a href="https://github.com/sponsors/diegoferraribruno"><img src="img/githubsponsors.png"style="display:block; float:left"></a><br><br>
Este website é um projeto de
<a href="https://github.com/diegoferraribruno"> código livre</a> em constante evolução.<br><br>
           <img src="img/pix.png" onclick="copyPix()" style="display:block; float:right">
           Se desejar contribuir financeiramente com seu desenvolvedor, você pode via:</b>
           <a href="https://github.com/sponsors/diegoferraribruno"> Github Sponsors</a> ou fazendo um PIX para:<br>
           <input type="text" size="26" value="f6aecef5-e60b-408e-97e1-30ee3927c0c0" id="myInput" readonly>
           
           <br><br>
           Ajude também a divulguar:</b><br>
           https://diegoferraribruno.github.io<br><br>
           Grato pela sua atenção<br><br>
           </div>
           <div id="bio2"></div></center>`
                iD("conteudo").innerHTML = apoioHTML

                createAvatar(0, "bio2")
                break;
            case "en":
                apoioHTML = `<center>
                <span onClick='cancela("conteudo")' class='close'></span>
                <a href="https://github.com/sponsors/diegoferraribruno"><img src="img/githubsponsors.png"style="display:block; float:left"></a><br><br>
    This is an
    <a href="https://github.com/diegoferraribruno">  Open Source Project</a> in constant evolution.<br><br>
               <img src="img/pix.png" onclick="copyPix()" style="display:block; float:right">
               If you want to contribute, you may do it by</b>
               <a href="https://github.com/sponsors/diegoferraribruno"> Github Sponsors</a> or doing a PIX (Brazil) to this key:<br>
               <input type="text" size="26" value="f6aecef5-e60b-408e-97e1-30ee3927c0c0" id="myInput" readonly>
               
               <br><br>
               Help also spreading the word about this.</b><br>
               https://diegoferraribruno.github.io<br><br>
               Thanks for you suport!<br><br>
               </div>
               <div id="bio2"></div></center>`
                iD("conteudo").innerHTML = apoioHTML

                createAvatar(0, "bio2")
                break;

        }
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
        "<br><a href='" + usuarios[id].link + "' target='blank'>Web-site</a> " +
        '<a href="https://github.com/diegoferraribruno">GitHub</a> ' +
        "<a href='https://www.linkedin.com/in/diego-ferrari-bruno-99563b209/'>linked<b>in</b></a> " +
        "<a href='https://twitter.com/DiegoFerrariBr1'>X</a> " +
        "<a href='https://diegoferraribruno.itch.io'>itch</a> "

}


var usuarios = [{
    id: "01",
    nome: "Diego Ferrari Bruno",
    link: "https://diegoferraribruno.github.io",
    bio: "Pai, artista, designer, programador",
}]



function setShareLinks() {
    var pageUrl = "https://diegoferraribruno.github.io"
    var pageTitle = encodeURIComponent(document.title);

    iD("menuyoga").addEventListener('click', function (event) {
        //console.log(event)
        let url = null;
        console.log(event.target)
        if (event.target.classList.contains('share__link--facebook')) {
            url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
            socialWindow(url, 570, 570);
        }

        if (event.target.classList.contains('share__link--twitter')) {
            url = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + pageTitle;
            socialWindow(url, 570, 300);
        }

        if (event.target.classList.contains('share__link--linkedin')) {
            url = "https://www.linkedin.com/shareArticle?mini=true&url=" + pageUrl;
            socialWindow(url, 570, 570);
        }

        if (event.target.classList.contains('share__link--whatsapp')) {
            url = "whatsapp://send?text=" + pageTitle + "%20" + pageUrl;
            socialWindow(url, 570, 450);
        }

        if (event.target.classList.contains('share__link--mail')) {
            url = "mailto:?subject=%22" + pageTitle + "%22&body=Read%20the%20article%20%22" + pageTitle + "%22%20on%20" + pageUrl;
            socialWindow(url, 570, 450);
        }

    }, false);
}

function socialWindow(url, width, height) {
    console.log(url)
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;
    var params = "menubar=no,toolbar=no,status=no,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
    window.open(url, "", params);
}