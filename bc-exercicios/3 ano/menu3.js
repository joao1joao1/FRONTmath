import { logOut } from "../../logout.js"

function verifyToken() {
    const token = localStorage.getItem("token")

    if(!token) {
        window.location = "../../login.html"
        return
    }
}

verifyToken()
logOut()