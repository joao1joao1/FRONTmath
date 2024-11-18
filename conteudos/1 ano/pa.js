import { trocarTema, verificarTema } from "../../helpers/tema-helper.js"

const botaoTema = document.querySelector(".botaoTema img")
const body = document.querySelector("body")
const main = document.querySelector("main")

botaoTema.addEventListener("click", () =>{
    trocarTema(body,main, botaoTema)
    console.log("cheguei")
})

verificarTema(body, main, botaoTema)


