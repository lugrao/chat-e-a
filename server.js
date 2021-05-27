const app = require("express")()
const server = require("http").Server(app)
const io = require("socket.io")(server)
const next = require("next")

const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

let port = process.env.PORT || 3000

let mensajes = [{ usuario: "Una voz familiar", contenido: "Empezá a chatear." }]

io.on("connection", (socket) => {
  socket.emit("mensaje-del-servidor", mensajes)

  socket.on("mensaje-del-cliente", (msj) => {
    mensajes.push(msj)
    socket.emit("mensaje-del-servidor", mensajes)
    socket.broadcast.emit("mensaje-del-servidor", mensajes)
  })
})

nextApp.prepare().then(() => {
  app.get("/mensajes", (req, res) => {
    res.json(mensajes)
  })

  app.get("*", (req, res) => {
    return nextHandler(req, res)
  })
})

server.listen(port, (err) => {
  if (err) throw err
  console.log(`Corriendo en http://localhost:${port}/`)
})
