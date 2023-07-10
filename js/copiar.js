let selectionPaths = [];
let currentPath = [];
let isSelecting2 = false;

function drawSelection() {
    canvasFront.ctx.clearRect(0, 0, canvas.width, canvas.height);
    //canvasFront.ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // Replace 'image' with your actual image variable

    for (const path of selectionPaths) {
        canvasFront.ctx.beginPath();

        canvasFront.ctx.setLineDash([2, 2]);
        canvasFront.ctx.moveTo(path[0][0], path[0][1]);
        for (let i = 1; i < path.length; i++) {
            canvasFront.ctx.lineTo(path[i][0], path[i][1]);
        }
        canvasFront.ctx.closePath();
        canvasFront.ctx.fillStyle = '#ff000066'; // Set fill color with opacity
        canvasFront.ctx.fill(); // Fill the selection shape
    }

    if (currentPath.length > 1) {
        canvasFront.ctx.beginPath();

        canvasFront.ctx.setLineDash([2, 2]);
        canvasFront.ctx.moveTo(currentPath[0][0], currentPath[0][1]);
        for (let i = 1; i < currentPath.length; i++) {
            canvasFront.ctx.lineTo(currentPath[i][0], currentPath[i][1]);
        }
        canvasFront.ctx.closePath();
        canvasFront.ctx.fillStyle = '#ff000066'; // Set fill color with opacity
        canvasFront.ctx.strokeStyle = '#ffffff88'; // Set stroke color with opacity
        canvasFront.ctx.lineWidth = 1;
        canvasFront.ctx.fill(); // Fill the current selection shape

        canvasFront.ctx.stroke()
    }
}

    function copySelection() {
        const minX = Math.min(...selectionPaths.flat().map(([x]) => x));
        const minY = Math.min(...selectionPaths.flat().map(([, y]) => y));
        const maxX = Math.max(...selectionPaths.flat().map(([x]) => x));
        const maxY = Math.max(...selectionPaths.flat().map(([, y]) => y));
        const width = maxX - minX;
        const height = maxY - minY;
        canvasFront.width = width;
        canvasFront.height = height;
  
        for (const path of selectionPaths) {
          canvasFront.ctx.beginPath();
          canvasFront.ctx.moveTo(path[0][0] - minX, path[0][1] - minY);
          for (let i = 1; i < path.length; i++) {
            canvasFront.ctx.lineTo(path[i][0] - minX, path[i][1] - minY);
          }
          canvasFront.ctx.closePath();
          canvasFront.ctx.fillStyle = '#000000';
          canvasFront.ctx.fill(); // Fill the selection shape
        }
        canvasFront.ctx.globalCompositeOperation = 'source-in'; // Set global composite operation to source-in
        canvasFront.ctx.drawImage(canvas, -minX, -minY, canvas.width, canvas.height);
  
        undoLevel = 0
        save_frame()
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        workingframe++
        swapImg = canvasFront.toDataURL('image/png');
        animacao.splice(workingframe, 0, swapImg);
        let work = []
        comandosb.splice(workingframe, 0, work);
        canvasFront.ctx.setTransform(1, 0, 0, 1, 0, 0);
        canvasFront.ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);
        comandos = []
        comando = ["s", "source-over", swapImg, minX, minY, canvasFront.width, canvasFront.height];
        comandos.push(comando)
        comandosParaComandosb()
        changeBrush()
        changeFrame(workingframe)
        iD("contador").innerHTML = workingframe
        canvasFront.width = canvas.width
canvasFront.height = canvas.height
      }
  
    function handleKeyDown(event) {
     if (event.ctrlKey && event.key === 'c') {
          copySelection();
        } else if (event.ctrlKey && event.key === 'x') {
          cutSelection();
        }
      }
    