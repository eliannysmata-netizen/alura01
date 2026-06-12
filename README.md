# 🎨 Monalisa Interativa - Projeto Alura

Um projeto interativo que reproduz a famosa pintura da **Monalisa** de Leonardo da Vinci, com uma funcionalidade especial: **os olhos acompanham o movimento do seu mouse**!

## ✨ Características

- **Pintura Interativa**: Reprodução detalhada da Monalisa com cores originais da obra
- **Olhos Dinâmicos**: Os olhos da Monalisa seguem o cursor do mouse em tempo real
- **Cores Autênticas**: Tons de ouro, marrom e verde que remetem à obra original
- **Design Responsivo**: Funciona em diferentes tamanhos de tela
- **Animação Suave**: Renderização contínua com `requestAnimationFrame`

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da página
- **CSS3**: Estilização e animações
- **Canvas API**: Desenho e renderização da Monalisa
- **JavaScript**: Lógica interativa dos olhos

## 📁 Arquivos do Projeto

```
alura01/
├── index.html       # Arquivo principal HTML
├── styles.css       # Estilos CSS
├── script.js        # Lógica JavaScript
└── README.md        # Este arquivo
```

## 🚀 Como Usar

1. **Clone o repositório** (ou baixe os arquivos)
2. **Abra o arquivo `index.html`** no seu navegador
3. **Mova o mouse** pela tela e veja os olhos da Monalisa seguindo você!

## 🎯 Como Funciona

### Rastreamento do Mouse
O código usa o evento `mousemove` para capturar a posição atual do cursor:

```javascript
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});
```

### Cálculo da Pupila
Para cada olho, é calculado o ângulo entre o centro do olho e a posição do mouse usando trigonometria:

```javascript
const angle = Math.atan2(mouseY - y, mouseX - x);
const distance = radius * 0.5;
const pupilX = x + Math.cos(angle) * distance;
const pupilY = y + Math.sin(angle) * distance;
```

### Renderização
A pintura é desenhada continuamente usando a Canvas API:

```javascript
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawHead();
    drawHair();
    drawEyes();
    // ... mais elementos
    requestAnimationFrame(draw);
}
```

## 🎨 Paleta de Cores

- **Pele**: `#D4A574` (tom quente)
- **Cabelo**: `#3D2817` (marrom escuro)
- **Olhos**: `#FFFAF0` (branco) e `#2F1B0C` (pupila)
- **Lábios**: `#C85450` (coral/vermelho)
- **Fundo**: Degradê de `#6B5344` a `#4A7C59`

## 📚 Conceitos de Programação Utilizados

- **Trigonometria**: Cálculo de ângulos e posições
- **Canvas API**: Desenho de formas e manipulação de contexto
- **Event Listeners**: Rastreamento de eventos do mouse
- **Animation Loop**: Renderização contínua com `requestAnimationFrame`
- **CSS Gradients**: Gradientes lineares no fundo

## 💡 Possíveis Melhorias

- [ ] Adicionar piscar dos olhos automático
- [ ] Adicionar expressões faciais diferentes
- [ ] Implementar botões para mudar o fundo
- [ ] Adicionar som de fundo temático
- [ ] Criar versões de outros quadros famosos

## 📝 Notas

Este projeto foi desenvolvido como parte do curso **Alura** e demonstra conhecimentos de:
- HTML5 Canvas
- JavaScript interativo
- CSS moderno
- Trigonometria aplicada

## 👨‍💻 Autor

**Elianny Smata**

---

**Aproveite o projeto! Mova o mouse e veja a Monalisa acompanhá-lo! 😊**