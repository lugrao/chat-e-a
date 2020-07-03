import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io();

export default function App(msjs) {
  const [mensajes, setMensajes] = useState([{ contenido: "a ver che" }]);
  const [nuevoMensaje, setNuevoMensaje] = useState({ contenido: "" });
  const [enviado, setEnviado] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/mensajes").then(async (res) => {
      const msjs = await res.json();
      setMensajes(msjs);
    });

    if (enviado) {
      socket.emit("mensaje-del-cliente", nuevoMensaje);
      setNuevoMensaje({ contenido: "" });
      setEnviado(false);
    }
  });

  function enviar() {
    event.preventDefault();
    setEnviado(true);
  }
  function capturarValor(event) {
    setNuevoMensaje({ contenido: event.target.value });
  }
  function recargar() {
    setRefresh(!refresh);
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

App.getInitialProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/mensajes");
  const json = await res.json();
  return { msjs: json };
};
