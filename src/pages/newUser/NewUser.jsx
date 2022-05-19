import "./newUser.css";

export default function NewUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Nuevo Usuario</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john" />
        </div>
        <div className="newUserItem">
          <label>Nombre Completo</label>
          <input type="text" placeholder="John Smith" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" />
        </div>
        <div className="newUserItem">
          <label>Telefono</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>
        <div className="newUserItem">
          <label>Direccion</label>
          <input type="text" placeholder="New York | USA" />
        </div>
        <div className="newUserItem">
          <label>Genero</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Hombre</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Mujer</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Helicoptero Apache</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Activo</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Si</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserButton">Crear</button>
      </form>
    </div>
  );
}
