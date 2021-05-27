export default function Usuario(props) {
  return (
    <div className="usuario">
      <label htmlFor="nombre-de-usuario">Nombre de usuario: </label>
      <br></br>
      <input
        id="nombre-de-usuario"
        value={props.usuario}
        onChange={props.change}
      />
      <button
        onClick={props.click}
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        aceptar
      </button>
      <style jsx>{`
        .usuario {
          justify-self: center;
          margin-top: 20px;
          font-weight: bold;
        }
        .usuario input {
          margin-top: 5px;
        }
        .usuario button {
          background-color: #fff3b7;
          border: solid 1px;
          margin: 5px;
          height: 33px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  )
}
