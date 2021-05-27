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
      <style jsx>{`
        .redactar {
          justify-self: center;
          margin-top: 20px;
        }
        .redactar input {
          margin-top: 5px;
        }
        .redactar button {
          background-color: #e0d8ff;
          border: solid 1px;
          margin: 5px;
        }
      `}</style>
    </div>
  )
}
