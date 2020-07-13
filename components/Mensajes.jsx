export default function Mensajes(props) {
  return (
    <div className="mensajes">
      {props.mensajes.map((mensaje, index) => {
        return (
          <p key={index} id={"mensaje-" + index}>
            <b>{mensaje.usuario}:</b> {mensaje.contenido}
            <span className="timestamp">{mensaje.timestamp}</span>
          </p>
        );
      })}
      <style jsx>{`
        .mensajes {
          background-color: white;
          height: 70vh;
          overflow-x: hidden;
          padding: 0 20px;
        }
        .timestamp {
          color: #a5a5a5;
          font-size: 11px;
          margin-left: 8px;
        }
      `}</style>
    </div>
  );
}
