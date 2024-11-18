let tema = "claro";

const botaoTema = document.getElementsByClassName("botaoTema")
const body = document.querySelector("body")
const main= document.querySelector("main")
console.log(body)
console.log(botaoTema)

export function trocarTema(body, main, botaoTema) {
    if (localStorage.getItem("tema")) {
        tema = localStorage.getItem("tema")
    }

    if (tema == "claro") {
        main.classList.add("escuro")
        body.classList.add("fundoEscuro")
        localStorage.setItem("tema", "escuro")
        botaoTema.style.justifyContent = "flex-end"
        botaoTema.innerHTML = 
                    `<img src="../../../imagens mathtech/icon-moon.png" alt="">`
    }; 
    if (tema=="escuro"){
        main.classList.remove("escuro")
        body.classList.remove("fundoEscuro")
        localStorage.setItem("tema", "claro")
        botaoTema.style.justifyContent = "flex-start"
        botaoTema.innerHTML = `
                    <img src="../../../imagens mathtech/icon-sun.png" alt="">`
    }
};

export function verificarTema(body, botaoTema){
    if (localStorage.getItem("tema")){
        tema= localStorage.getItem("tema")
    }

    if (tema==="escuro"){
        body.classList.add("fundoEscuro")
        main.classList.add("escuro")
        botaoTema.style.justifyContent = "flex-end"
    }
};