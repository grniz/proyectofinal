function addToCart(id, product) {
  let carrito = "64d9699ec3fa7f3e5b873948";
  postCart(id, carrito)
    .then((dato) => {
      alert("producto agregado al carrito", dato);
    })
    .catch((err) => console.log(err, "no se agrego el producto "));
}

async function postCart(id, carrito) {
  try {
    const response = await fetch(`/api/carts/${carrito}/product/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function increase(idCart, idProduct) {
  console.log(idCart, idProduct);
  let carrito = "64d9699ec3fa7f3e5b873948";
  postCart(idProduct, carrito)
    .then((dato) => {
      alert("producto agregado al carrito", dato);
    })
    .catch((err) => console.log(err, "no se agrego el producto "));
}