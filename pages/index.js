import io from "socket.io-client";
import { useState, useEffect } from "react";

const dev = process.env.NODE_ENV !== "production";
const url = dev ? "http://localhost:3000" : "https://chat-nextjs.herokuapp.com";
const socket = io(url);

export default function App() {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState({ contenido: "" });
  const [usuario, setUsuario] = useState("anónimo");
  const [inputUsuario, setInputUsuario] = useState(true);

  useEffect(() => {
    socket.on("mensaje-del-servidor", (msjs) => {
      setMensajes(msjs);
      document.getElementById(`mensaje-${msjs.length - 1}`).scrollIntoView();
    });
  });

  function enviar(event) {
    event.preventDefault();
    if (/\S/.test(nuevoMensaje.contenido)) {
      socket.emit("mensaje-del-cliente", nuevoMensaje);
      setNuevoMensaje({ contenido: "" });
    }
  }

  function capturarValor(event) {
    if (!usuario) {
      setUsuario("anónimo");
    }
    setNuevoMensaje({ usuario: usuario, contenido: event.target.value });
  }

  return (
    <div className="app">
      <h1>chat e-a</h1>

      <form onSubmit={enviar}>
        <div className="mensajes">
          {mensajes.map((mensaje, index) => {
            return (
              <p key={index} id={"mensaje-" + index}>
                <b>{mensaje.usuario}:</b> {mensaje.contenido}
              </p>
            );
          })}
        </div>
        {inputUsuario ? (
          <div className="usuario">
            <label for="nombre-de-usuario">Nombre de usuario: </label>
            <input
              id="nombre-de-usuario"
              value={usuario}
              onChange={(e) => {
                setUsuario(e.target.value);
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                if (/\S/.test(e.target.previousSibling.value)) {
                  setInputUsuario(!inputUsuario);
                }
              }}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              Aceptar
            </button>
          </div>
        ) : (
          <div className="escribir">
            <label for="mensaje">
              <b>Mensaje: </b>
            </label>
            <input
              id="mensaje"
              onChange={capturarValor}
              value={nuevoMensaje.contenido}
              placeholder="..."
            ></input>
            <button type="submit" onClick={enviar}>
              enviar
            </button>
          </div>
        )}
      </form>

      <style global jsx>{`
        body {
          background-color: #fffcff;
        }
        h1 {
          text-align: center;
        }
        form {
          display: grid;
          grid-template-columns: 1fr;
          max-width: 600px;
          margin: 5px auto;
        }
        .usuario {
          justify-self: center;
          margin-top: 20px;
          font-weight: bold;
        }
        .usuario button {
          background-color: #e0d8ff;
          border-color: gray;
        }
        .mensajes {
          background-color: white;
          height: 70vh;
          // max-height: 300px;
          overflow-x: hidden;
        }
        .escribir {
          justify-self: center;
          margin-top: 20px;
        }
        button {
          background-color: #fff7ea;
          border: solid 1px;
          margin: 0 3px;
        }
      `}</style>
    </div>
  );
}
