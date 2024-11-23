const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")
const jwt = require("jsonwebtoken")

const app = express()

const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, SECRET_KEY } = process.env

app.use(cors())
app.use(express.json())

app.post("/register", (request, response) => {
    const user = request.body.user
    
    const searchCommand = `
        select * from users
        where email = ?
    `
    db.query(searchCommand, [user.email], (error, data)=> {
        if(error) {
            console.log(error)
            return 
        }

        if(data.length !== 0) {
            response.json({message: "Já existe um usuário utilizando este e-mail. Tente outro e-mail.", userExists: true})
            return
        }

        const insertCommand = `
            insert into users(name, email, password)
            values(?, ?, ?)
        `

        db.query(insertCommand, [user.name, user.email, user.password], (error) => {
            if (error) {
                console.log(error)
                return
            }

            response.json({message: "USUÁRIO CADASTRADO COM SUCESSO!"})
        })
    })
})

app.post("/login", (request, response) => {
    
    const user = request.body.user

    const searchCommand = `
        select * from users
        where email = ?
    `

    db.query(searchCommand, [user.email], (error, data) => {
        if (error) {
            console.log(error)
            return
        }
        
        if (data.length === 0) {
            response.json({message: "Não há nenhum usuário cadastrado nesse e-mail."})
            return
        }

        if (user.password === data[0].password) {
            const email = user.email
            const id = data[0].id
            const name = data[0].name
            const token = jwt.sign({ id, email, name }, SECRET_KEY, { expiresIn: "1h" })
            response.json({ token, ok: true })
            return
        }

        response.json({message: "inválido"})

    })
})

app.get("/verify", (request, response) => {
    const token = request.headers.authorization

    jwt.verify(token, SECRET_KEY, (error) => {
        if(error) {
            response.json({message: "Token Inválido. Efetue o login novamente."})
            return
        }

        response.json({ ok: true })
    })
})

app.get("/getname", (request, response) => {
    const token = request.headers.authorization

    const decoded = jwt.verify(token, SECRET_KEY)

    response.json({name: decoded.name})
})

app.listen(5500, ()=> {
    console.log("rodando")
})

const db = mysql.createPool({
    connectionLimit: 10,
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD
})