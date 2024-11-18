import { logOut } from "../../logout.js"

async function verifyToken() {
    const token = localStorage.getItem("token")

    if(!token) {
        window.location = "../../login.html"
        return
    }

    const response = await fetch("https://backen-dmath.vercel.app/verify", {
        headers: {
            "Authorization": token
        }
    }).then(response => response.json())

    if(!response.ok) {
        alert(response.message)
        window.location.href = "../../login.html"
    }
}

verifyToken()
logOut()