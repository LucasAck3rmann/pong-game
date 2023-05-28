//variaveisdabolinha
let xBolinha = 600;
let yBolinha = 400;
let dBolinha = 35;
let raio = dBolinha / 2;
//variaveisdaraquete
let xRaquete = 8;
let yRaquete = 350;
//variaveisdooponente
let xRaqueteoponente = 1182;
let yRaqueteoponente = 350;
let velocidadeyOponente;
let chanceDeErrar = 0;
//tamnhoraquete
let raqueteComprimento = 9;
let raqueteAltura = 125;
//velocidadedabolinha
let velocidadexBolinha = 12;
let velocidadeyBolinha = 12;
let colidiu= false;
//placardojogo
let meusPontos = 0;
let pontosOponente = 0;
//sons game
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(1200,800);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMnhaRaquete();
  colisaoRaquetes(xRaquete, yRaquete);
  colisaoRaquetes(xRaqueteoponente, yRaqueteoponente)
  mostraRaquete(xRaqueteoponente, yRaqueteoponente);
  movimentaRaqueteoponente();
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
  movimentaRaqueteOponente();
}

function mostraBolinha(){
  circle(xBolinha,yBolinha,dBolinha);
}

function movimentaBolinha(){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento,
       raqueteAltura);
}

function verificaColisaoBorda()
{
  if (xBolinha+raio > width || xBolinha-raio < 0)
  {
    velocidadexBolinha *= -1;
  }
  
  if (yBolinha+raio > height || yBolinha-raio < 0)
  {
    velocidadeyBolinha *= -1;
  }
}

function movimentaMnhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -=13;
  }
if (keyIsDown(DOWN_ARROW)){
    yRaquete +=13;
  }
}

function verificacolisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento&&
    yBolinha - raio < yRaquete + raqueteAltura &&
    yBolinha + raio > yRaquete){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function colisaoRaquetes(x,y){
  colidiu = 
  collideRectCircle(x,y,raqueteComprimento,
  raqueteAltura,xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadexBolinha *= -1
  raquetada.play();
  }
}

function movimentaRaqueteoponente(){
  velocidadeyOponente = yBolinha -yRaqueteoponente-
  raqueteComprimento /2 - 30;
  yRaqueteoponente += velocidadeyOponente
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(35);
  fill(0);
  rect(212, 30, 75, 50)
  fill(255);
  text(meusPontos, 250, 65 )
  fill(0);
  rect(912,30, 75, 50)
  fill(255);
  text(pontosOponente, 950,65)
}


function marcaPonto()
{
  if (xBolinha+raio > width)
  {
    meusPontos += 1;
  ponto.play();
  }
  if(xBolinha-raio < 0)
  {
    pontosOponente += 1;
  ponto.play();
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}

function movimentaRaqueteOponente(){
  velocidadeyOponente = yBolinha -yRaqueteoponente - raqueteComprimento / 2 - 30;
  yRaqueteoponente += velocidadeyOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}