import { total,cartBubble, productsCart, deleteBtn,buyBtn} from "./index.js";
import { cart } from "./index.js";


// Funcion para guardar un array de objetos nuevos en el localStorage
const saveLocalStorage = (cartList) => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  };

// Renderizado de un producto del carrito.

const renderCartProduct = (cartProduct) => {
    const { id, name, bid, img, quantity } = cartProduct;
    return `    
    <div class="cart-item">
      <img src=${img} alt="Nft del carrito" />
      <div class="item-info">
        <h3 class="item-title">${name}</h3>
        <p class="item-bid">Current bid</p>
        <span class="item-price">${bid} ETH</span>
      </div>
      <div class="item-handler">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id=${id}>+</span>
      </div>
    </div>`;
  };
  // Funcion para renderizar el carrito
// Recibe un array con objetos y lo renderiza en el carrito.
// si no hay elementos en el array del carrito, renderiza un mensaje de que no hay productos
export const renderCart = () => {
    if (!cart.length) {
      productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
      return;
    }
    productsCart.innerHTML = cart.map(renderCartProduct).join("");
  };


  //Funcion para obtener el precio total de la compra

const getCartTotal = () => {
    return cart.reduce((acc, cur) => acc + Number(cur.bid) * cur.quantity, 0);
  };
  
  // Funcion para renderizar el precio total de la compra
  
  export const showTotal = () => {
    total.innerHTML = `${getCartTotal().toFixed(2)} eTH`;
  };
  
  // Funcion para renderizar la cantidad de productos que hay en el carrito en la burbuja del icono del carrito
  
  export const renderCartBubble = () => {
    console.log(cart.reduce((acc, cur) => acc + cur.quantity, 0));
    cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
  };
  // mirar esto
  // cart.reduce((acc, cur) => acc + cur.quantity, 0);
  
  //Funcion es habilitar el boton de compra si el carrito tiene algo.
  
  export const disableBtn = (btn) => {
    if (!cart.length) {
      btn.classList.add("disabled");
    } else {
      btn.classList.remove("disabled");
    }
  };
  
  // Funcion para chequear el estado del carrito una vez realizada alguna manipulacion del mismo
  // agregar, quitar, comprar, etc
  
  export const checkCartState = () => {
    saveLocalStorage(cart);
    renderCart(cart);
    showTotal(cart);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    renderCartBubble(cart);
  };
