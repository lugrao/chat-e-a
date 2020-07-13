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
          e.preventDefault();
        }}
      >
        Aceptar
      </button>
    </div>
  );
}
