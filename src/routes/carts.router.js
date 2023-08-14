import { Router } from "express";
import Carts from "../dao/dbMangers/cartManager.js";
import Product from "../dao/dbMangers/productManager.js";

const router = Router();
const cartManager = new Carts();
const productManager = new Product();

// Metodo GET para obtener los carritos
router.get("/", async (req, res) => {
    try {
      const carts = await cartManager.findCarts();
      res.json({ message: "success", cart: carts });
    } catch (err) {
      res.status(500).json({
        message: "Error al obtener los carritos",
        data: err,
      });
    }
  });

// Metodo GetById para obtener un carrito

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManager.findCartById(cid);
    const data = cart.products;
    if (cart) {
      res.render("carts", { cart: data, idCart: cart._id });
    } else {
      res.status(404).json({
        message: "Carrito no encontrado",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener el carrito",
      data: err,
    });
  }
});

// Metodo Post para agregar carritos
router.post("/", async (req, res) => {
    let newCart = {
      products: [],
    };
    try {
      const result = await cartManager.createCart(newCart);
      res.json({ message: "Carrito creado exitosamente", data: newCart });
    } catch (err) {
      res.status(500).json({ message: "Error al crear el carrito ", data: err });
    }
  });


// metodo Post para agregar productos al carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await cartManager.findCartById(cid);

    cart.products.forEach((product) => console.log(product));
    let productExistsInCart = cart.products.findIndex(
      (dato) => dato.product == pid
    );
    productExistsInCart == -1 ? cart.products.push({
      product: pid,
      quantity: 1,
    })
    : (cart.products[productExistsInCart].quantity =
      cart.products[productExistsInCart].quantity + 1);

    const result = await cartManager.updateCart(cid, cart);
    const updatedCart = await cartManager.findCartById(cid);
    console.log(updatedCart);
    
    res.json({ message: "Carrito actualizado con éxito", data: updatedCart });
  } catch (err) {
    res.status(500).json({
      message: "Error al actualizar el carrito",
      data: err,
    });
  }
});

export default router;
  
