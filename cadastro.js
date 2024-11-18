async function register() {
    const name = document.querySelector("#nome").value
    const email = document.querySelector("#email").value
    const telefone = document.querySelector("#telefone").value
    const password = document.querySelector("#senha").value

    if (name === "" || email === "" || password === "" || telefone === "") {
        alert("Preencha todas as informações!")
        return
    }

    const user = {
        name,
        email,
        telefone,
        password
    }

    const response = await fetch("https://backen-dmath.vercel.app/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({user})
    }).then(response => response.json())

    alert(response.message)
    if(response.userExists) {
        window.location.reload()
        return
    }

    window.location.href = "./login.html"
}

const button = document.querySelector("button")
button.addEventListener("click", (event) => {
    event.preventDefault()
    register()
})