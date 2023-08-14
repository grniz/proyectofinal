import { Router } from "express";
import CartProduct from "../dao/dbMangers/cartProductManager.js";

const router = Router();
const cartProductManager = new CartProduct();

// metodo Post para agregar productos al carrito
router.post("/", async (req, res) => {
    const { id, quantity } = req.body;  
    let newCartProduct = {
      id: id,
      quantity: quantity,
    };
    try {
      const cart = await cartProductManager.createCartProduct(newCartProduct);
      res.json({ message: "Producto agregado al carrito exitosamente", data: cart });
    } catch (err) {
      res.status(500).json({
        message: "Error al agregar el producto al carrito",
        data: err,
      });
    }
  });

// Metodo Put Para actualizar los productos del carrito
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
      const cart = await cartProductManager.updateCartProduct(id, quantity);
      res.json({ message: "Producto actualizado exitosamente al carrito", data: cart });
    } catch (err) {
      res.status(500).json({
        message: "Error al actualizar el producto del carrito",
        data: err,
      });
    }
  });
  
export default router;