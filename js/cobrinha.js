var canvas = window.document.querySelector("#cobra");
var contexto = canvas.getContext("2d");
var caixa = 32;
var cobra =[];
cobra[0] = {x: 8*caixa,
            y: 8*caixa };
var direcao = "right";
/*criando coordenadas aleatórias para a comida*/
var comida = {
    x: Math.floor(Math.random() * 15 + 1) * caixa,
    y: Math.floor(Math.random() * 15 + 1) * caixa
}


/*Criando o ambiente, o quadradinho */
function criarBG(){
    contexto.fillStyle = "lightgreen";
    contexto.fillRect(0, 0, 16*caixa, 16*caixa);
}

/*Criando a cobrinha*/

function criarCobrinha(){
    for(i=0; i < cobra.length; i++){
        contexto.fillStyle = "green";
        contexto.fillRect(cobra[i].x, cobra[i].y, caixa, caixa);
    }
}

/*Criando a comida*/
function criarComida(){
    contexto.fillStyle = "orange";
    contexto.fillRect(comida.x, comida.y, caixa, caixa);
}

/*Adicionando um "escutador de eventos para pegar os cliques do nosso teclado*/

window.document.addEventListener("keydown", atualizar);

function atualizar(evento){
    if(evento.keyCode == 37 && direcao != "right") {direcao = "left";}
    else if (evento.keyCode == 38 && direcao != "up") {direcao = "down";} /*minhas direções inverteram*/
    else if (evento.keyCode == 39 && direcao != "left") {direcao = "right";}
    else if (evento.keyCode == 40 && direcao != "down") {direcao = "up";}
}
/*Criando a funçao para iniciar o jogo*/

function iniciarJogo(){
    /*Criando a condição para a cobrinha voltar para a caixa  quando ela sair*/
    /*Essa condição é criada antes de iniciar o jogo*/
    if (cobra[0].x > 15*caixa && direcao == "right") {cobra[0].x = 0;}
    else if (cobra[0].x < 0 && direcao == "left") {cobra[0].x = 16*caixa;}
    else if (cobra[0].y > 15*caixa && direcao == "up") {cobra[0].y = 0;}
    else if (cobra[0].y < 0 && direcao == "down") {cobra[0].y = 16*caixa;}

    criarBG();
    criarCobrinha();
    criarComida(); 

    /*Precisamos da posição inicial da cobrinha*/
    var cobraX = cobra[0].x;
    var cobraY = cobra[0].y;

    /*se a cobra estiver indo para o lado direito adiciona um quadrado para a direita e vice versa */
    /*se a cobra estiver indo para cima adiciona um quadrado para cima e vice versa */
    if (direcao == "right") {cobraX += caixa;}
    else if (direcao == "left") {cobraX -= caixa;}
    else if (direcao == "up") {cobraY += caixa;}
    else if (direcao == "down") {cobraY -= caixa;}

    /*Condição para o fim do jogo*/
    for(i = 1; i < cobra.length; i++){
        if(cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y){
            clearInterval(jogo);
            window.alert("Game over :(");
        }
    }

    /*Se a coordenada da cobrinha for diferent da coordenada da comida, a cobra continua do mesmo tamanho */ 
    if (cobraX != comida.x || cobraY != comida.y){
        cobra.pop();
    }
    else {/*Se as coordenadas forem iguais a comida aparece em outro lugar e...*/
        comida.x = Math.floor(Math.random() * 15 + 1) * caixa;
        comida.y =  Math.floor(Math.random() * 15 + 1) * caixa;
    }
    

    var novaCabeca = {
        x: cobraX,
        y: cobraY
    }
     /*Vamos criar uma nova cabeça para a cobrinha com "unshift" */
    /*O método unshift() adiciona um ou mais elementos no início de um array e retorna o número de elementos (propriedade length) atualizado. */
    cobra.unshift(novaCabeca);/*Se as coordenadas forem iguais a cobrinha cresce*/

}

var jogo = setInterval(iniciarJogo, 250);/*Define a velocidade da cobrinha em milisegundos*/
