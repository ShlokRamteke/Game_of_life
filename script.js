let size=50;
let htmlElements;
let cells;
let EMPTY=0;
let ALIVE=1;

function createField() {
    htmlElements=[];
    cells=[];
    let table=document.getElementById('field');
    table.innerHTML = ""; 

    for (let y=0;y<size; y++){
        let tr=document.createElement('tr');
        let tdElements=[];
        cells.push(new Array(size).fill(EMPTY));
        htmlElements.push(tdElements);
        table.appendChild(tr);
        for (let x=0;x < size;x++){
            let td=document.createElement('td');
            tdElements.push(td);
            tr.appendChild(td);
        }
    }
}

function draw(){
    
    for (let y=0;y<size;y++){
        for (let x=0; x<size;x++ ){
            htmlElements[y][x].setAttribute('class','cell '+(cells[y][x]== 1 ? 'filled':'empty'));
        }
    }
}

function countNeighbors(x,y) {
    
    let count=0;
    for (dy= -1;dy <= 1;dy++){
        for (dx= -1;dx <= 1;dx++){
            let nx=(x+dx+size) % size, ny=(y+dy+size) %size;
            count=count+cells[ny][nx];
        }
    }
    return count - cells[y][x];
}

function newGeneration() {
    
    let newCells=[]; 
    for (let i=0;i<size;i++){
        newCells.push(new Array(size).fill(EMPTY));
    }
    for (let y=0;y<size;y++){
        for (let x=0;x<size;x++){
            let neighbors =countNeighbors(x,y);
            if(cells[y][x]==EMPTY && neighbors==3){
                newCells[y][x]=ALIVE;
            }
            if( cells[y][x]==ALIVE && (neighbors==2 || neighbors==3)){
                newCells[y][x]=ALIVE;
            }
        }
    }
    cells=newCells;
    draw();
}
function increaseSize() {
    if (size < 150){
        size += 10;
        clearInterval(intervalId);
        createField();
        init();
        console.log(size);
    } else{
        alert("Maximum Size");
    
    }
}

function decreaseSize() {
    if (size > 10) {
    size -= 10;
    clearInterval(intervalId);
    createField();
    init();
    }
}

function init() {
    
    
    for (let i=0;i<Math.floor(size*size*0.3);i++){
        let x, y;
        do {
            x=Math.floor(Math.random()*size),y =Math.floor(Math.random()*size);
            if (cells[y][x]==EMPTY) {
                cells[y][x]=ALIVE;
                break;
            }
        } while(true);
    }
    draw();
    intervalId = setInterval(newGeneration,100);
}
createField();
init();