const wordContainer = document.getElementById('wordContainer');
const usedLettersElement = document.getElementById('usedLetters');
const button = document.getElementById("mybutton");

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyParts = [ //Lo vamos a modificar para hombre y mujer, sabelo
    [4, 2, 1, 1], // [Pos x, Pos y, x, y]
    [4, 3, 1, 2],
    [3, 5, 1, 1],
    [5, 5, 1, 1],
    [3, 3, 1, 1],
    [5, 3, 1, 1]
];

var selectWord;
var usedLetters;
var mistakes;
var hits;

const drawLetter = letter =>{
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter;
    usedLettersElement.appendChild(letterElement);
}

const drawBodyPart = bodyPart =>{
    //Se selecciona el color y que parte a dibujar
    ctx.fillStyle = '#fff'
    ctx.fillRect(...bodyPart);
}

const wrongLetter = letter =>{
    //Llama y banda la parte del cuerpo a dibujar
    //Suma un error
    //Valida si perdimos 
    drawBodyPart(bodyParts[mistakes]);
    mistakes++;
    if(mistakes === bodyParts.length){endGame()};
}

const endGame = () =>{
    //Desactiva la funcion de las teclas
    //Aparece el boton
    document.removeEventListener("keydown", letterEvent);
    button.style.display = 'block';
}

const correctLetter = letter =>{
    //Separa las letras del container y itera por cada esa
    //Donde esté la letra, le quita el transparente
    //Suma un acierto
    //Valida si se completó la palabra
    const {children} = wordContainer;

    for (let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter){
            children[i].classList.toggle('hidden');
            hits++;
        }
        
    }
   
    if(hits === selectWord.length) {endGame()}
}

const letterInput = letter => {
    //Si la letra está en la palabra del ahorcado o no
    //Llama la funcion correspondiente
    if (selectWord.includes(letter)) {
        correctLetter(letter);
    } else{
        wrongLetter(letter);
    }
    drawLetter(letter);
    usedLetters.push(letter);
};

const letterEvent = event => {
    //Recibe la tecla que apretaron
    //Si es una letra y si todavia no se apretó
    //Llama a la otra funcion
    let newLetter = event.key.toUpperCase();
    if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    }
}

const drawWord = () => {
    //Vamos a crear un span con dos clases y una tra de la palabra
    //Se lo mandamos al contenedor de la palabra en html
    selectWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter;
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
}

const selecRandomtWord = () => {
    //Elegimos una palabra random de la arraw de "words.js"
    //La ponemos en mayusculas
    //La guardamos en una variable y lo convertimos en una arraw de caracteres    
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectWord = word.split('');
}

const drawHangMan = () => { //Lo vamos a modificar, sabelo
    //Creamos el tamaño del canvas y el tamaño de los pixeles
    //Dividiendo el tamaño de pixel con el de canvas, sacamos las posiciones min y max
    //Le ponemos color al pixel
    //Vamos pintando mediante posiciones y cant de pixeles a pintar
    ctx.canvas.width = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FF5733';
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
}

const startGame = () => {
    //Limpiamos todo al comenzar un nuevo juego
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    button.style.display = 'none';

    drawHangMan();
    selecRandomtWord();
    drawWord();

    document.addEventListener("keydown", letterEvent);
};

button.addEventListener("click", startGame);