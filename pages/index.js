import io from "socket.io-client"
import { useState, useEffect } from "react"
import Usuario from "../components/Usuario"
import Redactar from "../components/Redactar"
import Mensajes from "../components/Mensajes"

const dev = process.env.NODE_ENV !== "production"
const url = dev ? "http://localhost:3000" : "https://chat-e-a.herokuapp.com/"
const socket = io(url)

export default function App() {
  const hora = `${new Date().getHours()}:${new Date().getMinutes()}`
  const [mensajes, setMensajes] = useState([])
  const [nuevoMensaje, setNuevoMensaje] = useState({
    contenido: "",
    timestamp: hora,
  })
  const [usuario, setUsuario] = useState("anónimo")
  const [inputUsuario, setInputUsuario] = useState(true)

  useEffect(() => {
    socket.on("mensaje-del-servidor", (msjs) => {
      setMensajes(msjs)
      document.getElementById(`mensaje-${msjs.length - 1}`).scrollIntoView()
    })
  })

  function enviar(event) {
    event.preventDefault()
    if (/\S/.test(nuevoMensaje.contenido)) {
      socket.emit("mensaje-del-cliente", nuevoMensaje)
      setNuevoMensaje({ contenido: "" })
    }
  }

  function capturarValor(event) {
    if (!usuario) {
      setUsuario("anónimo")
    }
    setNuevoMensaje({
      usuario: usuario,
      contenido: event.target.value,
      timestamp: hora,
    })
  }

  return (
    <div className="app">
      <h1>chat e-a</h1>
      <form onSubmit={enviar}>
        <Mensajes mensajes={mensajes} />
        {inputUsuario ? (
          <Usuario
            usuario={usuario}
            click={(e) => {
              e.preventDefault()
              if (/\S/.test(e.target.previousSibling.value)) {
                setInputUsuario(!inputUsuario)
              }
            }}
            change={(e) => {
              setUsuario(e.target.value)
            }}
          />
        ) : (
          <Redactar
            change={capturarValor}
            value={nuevoMensaje.contenido}
            click={enviar}
          />
        )}
      </form>

      <style global jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Open+Sans:wght@400;700&display=swap");

        body {
          font-family: "Open Sans", sans-serif;
          background-color: #fffaf2;
        }
        h1 {
          font-family: "Alfa Slab One", cursive;
          font-weight: normal;
          text-align: center;
        }
        form {
          display: grid;
          grid-template-columns: 1fr;
          max-width: 600px;
          margin: 5px auto;
        }
      `}</style>
    </div>
  )
}
