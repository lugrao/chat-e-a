const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = 3000;

let mensajes = [{contenido: "empezá a chatear"}];

io.on("connect", (socket) => {

  socket.emit("mensaje-del-servidor", mensajes);

  socket.on("mensaje-del-cliente", (msj) => {
    mensajes.push(msj);
  });
});

nextApp.prepare().then(() => {
  app.get("/mensajes", (req, res) => {
    res.json(mensajes);
  });

  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });
});

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`listo el pollo en puerto http://localhost:${port}`);
});
