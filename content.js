// Cria o botão flutuante
const toggleButton = document.createElement("button");
toggleButton.id = "toggleSidebarButton";
toggleButton.innerHTML = "👁️"; // Ícone de olho
document.body.appendChild(toggleButton);

// Define o estado de visibilidade (padrão como verdadeiro)
let isVisible = true;
let isDragging = false; // Variável para monitorar se o botão foi arrastado

// Função para alternar visibilidade ao clicar
toggleButton.addEventListener("click", () => {
  if (!isDragging) { // Só executa se não houver arraste
    const targetDiv = document.querySelector("div._aigw.x1n2onr6.x5yr21d.x17dzmu4.x78zum5.xdt5ytf.xa1v5g2.x1plvlek.xryxfnj");

    if (targetDiv) {
      // Alterna visibilidade
      isVisible = !isVisible;
      targetDiv.style.display = isVisible ? "flex" : "none";

      // Efeito de onda
      toggleButton.classList.add("ripple");
      setTimeout(() => toggleButton.classList.remove("ripple"), 300);
    } else {
      console.error("Div alvo não encontrada. Verifique o seletor ou inspecione novamente.");
    }
  }
  isDragging = false; // Redefine isDragging após o clique
}); 

// Função para tornar o botão arrastável
toggleButton.onmousedown = function (event) {
  event.preventDefault();
  isDragging = false; // Reseta o estado de arraste

  // Posição inicial do mouse
  let shiftX = event.clientX - toggleButton.getBoundingClientRect().left;
  let shiftY = event.clientY - toggleButton.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {
    toggleButton.style.left = pageX - shiftX + 'px';
    toggleButton.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    isDragging = true; // Marca como arraste se o mouse se mover
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  toggleButton.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    toggleButton.onmouseup = null;
  };
};

toggleButton.ondragstart = function () {
  return false;
};

// Função para carregar o CSS dinamicamente
function injectCSS(file) {
  const link = document.createElement("link");
  link.href = chrome.runtime.getURL(file);
  link.type = "text/css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

// Injetando o CSS na página
injectCSS("styles.css");

// Resto do código do content.js...
