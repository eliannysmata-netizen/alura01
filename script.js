// Canvas e contexto
const canvas = document.getElementById('monalisaCanvas');
const ctx = canvas.getContext('2d');

// Variáveis para rastrear o mouse
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

// Cores originais da Monalisa (tons de ouro, marrom e verde)
const colors = {
    skinTone: '#D4A574',      // Tom de pele quente
    darkSkinTone: '#B8956A',  // Tom mais escuro para sombreado
    hairColor: '#3D2817',     // Marrom escuro para o cabelo
    eyeWhite: '#FFFAF0',      // Branco dos olhos
    eyePupil: '#2F1B0C',      // Marrom escuro da pupila
    lip: '#C85450',           // Vermelho/coral para os lábios
    backgroundLeft: '#6B5344',  // Marrom para fundo esquerdo
    backgroundRight: '#4A7C59', // Verde para fundo direito
    highlight: '#E8C9A0',     // Highlight claro
};

// Rastreador de mouse
document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    // Atualizar exibição de posição
    document.getElementById('mousePos').textContent = 
        `X: ${Math.round(mouseX)}, Y: ${Math.round(mouseY)}`;
});

// Função para desenhar o fundo
function drawBackground() {
    // Fundo esquerdo (mais escuro - marrom)
    const gradLeft = ctx.createLinearGradient(0, 0, canvas.width / 2, 0);
    gradLeft.addColorStop(0, colors.backgroundLeft);
    gradLeft.addColorStop(1, colors.backgroundRight);
    ctx.fillStyle = gradLeft;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Adicionar sutil textura
    addBackgroundTexture();
}

// Adicionar textura ao fundo
function addBackgroundTexture() {
    for (let i = 0; i < 1000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.03})`;
        ctx.fillRect(x, y, size, size);
    }
}

// Função para desenhar a cabeça
function drawHead() {
    // Contorno da cabeça
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, canvas.height / 2 - 50, 80, 100, 0, 0, Math.PI * 2);
    ctx.fillStyle = colors.skinTone;
    ctx.fill();
    ctx.strokeStyle = colors.darkSkinTone;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Pescoço
    ctx.fillStyle = colors.skinTone;
    ctx.fillRect(canvas.width / 2 - 30, canvas.height / 2 + 50, 60, 80);
    
    // Sombreado no pescoço
    ctx.fillStyle = colors.darkSkinTone;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(canvas.width / 2 + 20, canvas.height / 2 + 50, 20, 80);
    ctx.globalAlpha = 1;
}

// Função para desenhar o cabelo
function drawHair() {
    // Cabelo principal
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, canvas.height / 2 - 100, 85, 85, 0, 0, Math.PI * 2);
    ctx.fillStyle = colors.hairColor;
    ctx.fill();
    
    // Mechas de cabelo com destaque
    ctx.strokeStyle = colors.highlight;
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.4;
    
    for (let i = 0; i < 5; i++) {
        const x = canvas.width / 2 - 40 + i * 20;
        const y = canvas.height / 2 - 130;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + 5, y + 30, x, y + 60);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}

// Função para desenhar os olhos
function drawEyes() {
    const eyeLeftX = canvas.width / 2 - 30;
    const eyeRightX = canvas.width / 2 + 30;
    const eyeY = canvas.height / 2 - 60;
    const eyeRadius = 15;
    
    // Desenhar ambos os olhos
    drawEye(eyeLeftX, eyeY, eyeRadius, mouseX, mouseY);
    drawEye(eyeRightX, eyeY, eyeRadius, mouseX, mouseY);
}

// Função para desenhar um olho individual
function drawEye(x, y, radius, mouseX, mouseY) {
    // Branco do olho
    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius * 1.2, 0, 0, Math.PI * 2);
    ctx.fillStyle = colors.eyeWhite;
    ctx.fill();
    ctx.strokeStyle = colors.darkSkinTone;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    // Calcular a posição da pupila baseada na posição do mouse
    const angle = Math.atan2(mouseY - y, mouseX - x);
    const distance = radius * 0.5; // Distância máxima que a pupila pode se mover
    
    const pupilX = x + Math.cos(angle) * distance;
    const pupilY = y + Math.sin(angle) * distance;
    
    // Pupila
    ctx.beginPath();
    ctx.ellipse(pupilX, pupilY, radius * 0.4, radius * 0.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = colors.eyePupil;
    ctx.fill();
    
    // Brilho no olho (destaque)
    ctx.beginPath();
    ctx.arc(pupilX - radius * 0.15, pupilY - radius * 0.2, radius * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fill();
    
    // Sobancelha
    ctx.beginPath();
    ctx.quadraticCurveTo(x - radius, y - radius - 8, x + radius, y - radius - 5);
    ctx.strokeStyle = colors.hairColor;
    ctx.lineWidth = 2.5;
    ctx.stroke();
}

// Função para desenhar o nariz
function drawNose() {
    const noseX = canvas.width / 2;
    const noseY = canvas.height / 2 - 20;
    
    // Línea central do nariz
    ctx.beginPath();
    ctx.moveTo(noseX, noseY - 20);
    ctx.lineTo(noseX, noseY + 15);
    ctx.strokeStyle = colors.darkSkinTone;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.4;
    ctx.stroke();
    ctx.globalAlpha = 1;
    
    // Narinas
    ctx.fillStyle = colors.darkSkinTone;
    ctx.globalAlpha = 0.3;
    
    // Narina esquerda
    ctx.beginPath();
    ctx.ellipse(noseX - 4, noseY + 12, 2.5, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Narina direita
    ctx.beginPath();
    ctx.ellipse(noseX + 4, noseY + 12, 2.5, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
}

// Função para desenhar a boca (o famoso sorriso da Monalisa)
function drawMouth() {
    const mouthX = canvas.width / 2;
    const mouthY = canvas.height / 2 + 30;
    
    // Lábio superior
    ctx.beginPath();
    ctx.moveTo(mouthX - 20, mouthY);
    ctx.quadraticCurveTo(mouthX, mouthY - 8, mouthX + 20, mouthY);
    ctx.strokeStyle = colors.lip;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    
    // Lábio inferior
    ctx.beginPath();
    ctx.moveTo(mouthX - 20, mouthY);
    ctx.quadraticCurveTo(mouthX, mouthY + 10, mouthX + 20, mouthY);
    ctx.stroke();
    
    // Preenchimento dos lábios
    ctx.beginPath();
    ctx.moveTo(mouthX - 20, mouthY);
    ctx.quadraticCurveTo(mouthX, mouthY - 8, mouthX + 20, mouthY);
    ctx.quadraticCurveTo(mouthX, mouthY + 10, mouthX - 20, mouthY);
    ctx.fillStyle = colors.lip;
    ctx.globalAlpha = 0.4;
    ctx.fill();
    ctx.globalAlpha = 1;
    
    // Linha de expressão (famoso sorriso enigmático)
    ctx.beginPath();
    ctx.moveTo(mouthX - 25, mouthY + 5);
    ctx.quadraticCurveTo(mouthX, mouthY - 2, mouthX + 25, mouthY + 5);
    ctx.strokeStyle = colors.darkSkinTone;
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.3;
    ctx.stroke();
    ctx.globalAlpha = 1;
}

// Função para desenhar highlights (iluminação)
function drawHighlights() {
    // Highlight na testa
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2 - 20, canvas.height / 2 - 120, 15, 10, -0.3, 0, Math.PI * 2);
    ctx.fillStyle = colors.highlight;
    ctx.globalAlpha = 0.3;
    ctx.fill();
    ctx.globalAlpha = 1;
    
    // Highlight na bochecha esquerda
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2 - 50, canvas.height / 2 - 20, 20, 12, 0, 0, Math.PI * 2);
    ctx.fillStyle = colors.highlight;
    ctx.globalAlpha = 0.25;
    ctx.fill();
    ctx.globalAlpha = 1;
}

// Função para adicionar sombras
function drawShadows() {
    // Sombra no lado direito do rosto
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2 + 60, canvas.height / 2 - 30, 25, 40, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = colors.darkSkinTone;
    ctx.globalAlpha = 0.2;
    ctx.fill();
    ctx.globalAlpha = 1;
}

// Função principal para desenhar tudo
function draw() {
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar em ordem (de trás para frente)
    drawBackground();
    drawHead();
    drawShadows();
    drawHair();
    drawEyes();
    drawNose();
    drawMouth();
    drawHighlights();
    
    // Continuar animação
    requestAnimationFrame(draw);
}

// Iniciar a animação
draw();

// Event listener para quando o mouse sai do canvas
document.addEventListener('mouseleave', () => {
    mouseX = canvas.width / 2;
    mouseY = canvas.height / 2;
});