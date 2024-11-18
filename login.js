const button = document.querySelector("#botao")

async function logar() {
    const email = document.querySelector("#email").value
    const password = document.querySelector("#senha").value

    if (password === "" || email === "") {
        alert("Preencha todas as informações!")
        return
    }

    const user = {
        email,
        password
    }

    const response = await fetch("https://backen-dmath.vercel.app/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({user})
    }).then(response => response.json())

    if (response.ok) {
        console.log(response.token)
        localStorage.setItem("token", response.token)
        window.location = "./index.html#aTv"
        alert("LOGIN FEITO COM SUCESSO!")
        return
    }

    alert(response.message)
    window.location.reload()
}

button.addEventListener("click", (event)=> {
    event.preventDefault()
    logar()
})