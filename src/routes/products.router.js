import { Router } from "express";
import Products from "../dao/dbMangers/productManager.js";

const router = Router();
const productManager = new Products();

// Metodo GET para obtener todos los productos
router.get("/", async (req, res) => {
    const { limit } = req.query;
    try {
      const response = await productManager.findProducts();
      if (limit) {
        let tempArray = response.slice(0, limit);
        res.render("productos", { products: tempArray });
      } else {
        res.render("productos", { products: response });
      }
    } catch (err) {
      res.render({ message: "Error al obtener los productos", data: err });
    }
  });

// Metodo GetById muestra el producto segun el id

router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
      const product = await productManager.findProductById(pid);
      if (product) {
        res.json({ message: "producto encontrado", products: product });
      } else {
        res.status(404).json({
          message: "produco no existe",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error al obtener el producto",
        data: err,
      });
    }
  });


// Metodo POST para crear productos
router.post("/", async (req, res) => {
    let codeExist;
    try {
      let products = await productsManager.findProducts();
      codeExist = products.find((product) => product.code === code);
    } catch (err) {
      console.log(err);
    }
  
    const {
        title,
        description,
        price,
        status,
        thumbnails,
        code,
        stock,
        category,
     
    } = req.body;
  
    if (!title || !description || !price || !code || !stock) {
      res.status(400).json({ message: "Faltan datos" });
    }
  
    if (codeExist) {
      res.status(400).json({ message: "El codigo del producto ya existe" });
    } else {
      let product = {
        title,
        description,
        price,
        status,
        thumbnails: !thumbnails ? "" : thumbnails,
        code,
        stock,
        category,
      };
      try {
        await productManager.createProduct(product);
        res.json({ message: "Producto creado exitosamente", data: product });
      } catch (err) {
        res
          .status(500)
          .json({ message: "Error al crear el producto", data: err });
      }
    }
  });

  // metodo PUT para actualizar los productos

  router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const data = req.body;
    try {
      if (Object.keys(data).length === 0) {
        res.status(400).json({ message: "Faltan datos para actualizar el producto" });
      } else {
        await productManager.update(pid, data);
        res.json({
          message: "Producto actualizado",
          data: data,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error al actualizar el producto",
        data: err,
      });
    }
  });

// Metodo DELETE 

router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
      const respuesta = await productManager.delete(pid);
      if (respuesta) {
        res.json({
          mensaje: "Producto eliminado exitosamente",
          producto: respuesta,
        });
      } else {
        res.status(404).json({ mensaje: "Producto no encontrado" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ mensaje: "Error al eliminar el producto", err: err });
    }
  });
  
export default router;