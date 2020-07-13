export default function Redactar(props) {
  return (
    <div className="redactar">
      <label htmlFor="mensaje">
        <b>Mensaje: </b>
      </label>
      <br></br>
      <input
        id="mensaje"
        onChange={props.change}
        value={props.value}
        placeholder="..."
      ></input>
      <button type="submit" onClick={props.click}>
        enviar
      </button>
    </div>
  );
}
