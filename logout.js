export function logOut() {
    const button = document.querySelector("#userr button")
    button.addEventListener("click", () => {
        localStorage.removeItem("token")
        window.location.reload()
    })
    
}
