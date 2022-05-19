import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Registrar tres observadores:
    // 1. observador 'state_changed', llamado cada vez que cambia el estado
    // 2. Observador de errores, llamado en caso de falla
    // 3. Observador de finalización, llamado al completar con éxito
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe los eventos de cambio de estado, como el progreso, la pausa y la reanudación
        // Obtenga el progreso de la tarea, incluida la cantidad de bytes cargados y la cantidad total de bytes que se cargarán
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Manejar cargas fallidas
      },
      () => {
        // Manejar cargas exitosas al completar
        // Por ejemplo, obtener la URL de descarga: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat };
          addProduct(product, dispatch);
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Nuevo Producto</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Imagen</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Titulo</label>
          <input
            name="title"
            type="text"
            placeholder="Nombre Producto"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Descripcion</label>
          <input
            name="desc"
            type="text"
            placeholder="Descripcion..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Precio</label>
          <input
            name="price"
            type="number"
            placeholder="$$$$"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categorias</label>
          <input type="text" placeholder="peluches,coleccionables,etc" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Crear
        </button>
      </form>
    </div>
  );
}