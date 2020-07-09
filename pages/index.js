import io from "socket.io-client";
import { useState, useEffect } from "react";

// const socket = io();

const dev = process.env.NODE_ENV !== "production";
const url = dev ? "http://localhost:3000" : "https://chat-nextjs.herokuapp.com";
const socket = io(url);

export default function App() {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState({ contenido: "" });

  useEffect(() => {
    socket.on("mensaje-del-servidor", (msjs) => {
      setMensajes(msjs);
    });
  });

  function enviar(event) {
    event.preventDefault();
    socket.emit("mensaje-del-cliente", nuevoMensaje);
    setNuevoMensaje({ contenido: "" });
  }
  function capturarValor(event) {
    setNuevoMensaje({ contenido: event.target.value });
  }

  return (
    <div>
      <h1>chat</h1>

      <form onSubmit={enviar}>
        {mensajes.map((mensaje, index) => {
          return <p key={index}>{mensaje.contenido}</p>;
        })}

        <input onChange={capturarValor} value={nuevoMensaje.contenido}></input>
        <button type="submit" onClick={enviar}>
          enviar
        </button>
      </form>
    </div>
  );
}

// App.getInitialProps = async (ctx) => {
//   const res = await fetch(`${url}/mensajes`);
//   const json = await res.json();
//   return { msjs: json };
// };
