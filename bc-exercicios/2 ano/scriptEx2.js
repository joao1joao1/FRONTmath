import { exercicios } from '../../questões/segundoano.js';

const setaDireita = document.getElementById("seta-direita");
const setaEsquerda = document.getElementById("seta-esquerda");
const botaoResolucao = document.getElementById("botaoResolucao");
const botaoProximo = document.getElementById("botaoProximo");
const pergunta = document.getElementById("pergunta");
const alternativas = document.getElementById("alternativas");
const questao = document.getElementById("questao");

let indiceQuestao = 0;

function carregarQuestao() {
  const questaoAtual = exercicios[0].questions[indiceQuestao];

  pergunta.innerHTML = `<p>${questaoAtual.question}</p>`;
  alternativas.innerHTML = "";

  questaoAtual.options.forEach((opcao, index) => {
    const botaoOpcao = document.createElement("button");
    botaoOpcao.textContent = `(${String.fromCharCode(65 + index)}) ${opcao}`;
    botaoOpcao.addEventListener("click", () => {
      const botoesOpcao = alternativas.querySelectorAll("button");
      botoesOpcao.forEach((botao) => {
        botao.classList.remove("certo", "errado");
      });

      if (opcao === questaoAtual.answer) {
        botaoOpcao.classList.add("certo");
      } else {
        botaoOpcao.classList.add("errado");
      }
    });
    alternativas.appendChild(botaoOpcao);
  });
}

function proximaQuestao() {
  indiceQuestao++;
  if (indiceQuestao >= exercicios[0].questions.length) {
    indiceQuestao = 0;
  }
  carregarQuestao();
}

function questaoAnterior() {
  indiceQuestao--;
  if (indiceQuestao < 0) {
    indiceQuestao = exercicios[0].questions.length - 1;
  }
  carregarQuestao();
}

function verificarResposta() {
  const botoesOpcao = alternativas.querySelectorAll("button");
  let respostaSelecionada = null;

  botoesOpcao.forEach((botao) => {
    if (botao.classList.contains("certo") || botao.classList.contains("errado")) {
      respostaSelecionada = botao.textContent.trim().slice(1, -1);
    }
  });

  if (respostaSelecionada === exercicios[0].questions[indiceQuestao].answer) {
    alert("Resposta correta!");
  } else {
    alert("Resposta incorreta!");
  }

  // Adiciona classe para destacar a resposta correta
  botoesOpcao.forEach((botao) => {
    if (botao.textContent.trim().slice(1, -1) === exercicios[0].questions[indiceQuestao].answer) {
      botao.classList.add("certo");
    } else {
      botao.classList.add("errado");
    }
  });
}

setaDireita.addEventListener("click", proximaQuestao);
setaEsquerda.addEventListener("click", questaoAnterior);
botaoResolucao.addEventListener("click", verificarResposta);
botaoProximo.addEventListener("click", proximaQuestao);

carregarQuestao();