import { productsController} from "./data.js";
import {renderProducts} from "./render.js";
import { checkCartState, disableBtn, renderCartBubble, renderCart, showTotal} from "./carrito.js";

export const products = document.querySelector(".products-container");

export const productsCart = document.querySelector(".cart-container");

export const total = document.querySelector(".total");

const categories = document.querySelector(".categories");

const categoriesList = document.querySelectorAll(".category");

const btnLoad = document.querySelector(".btn-load");

export const buyBtn = document.querySelector(".btn-buy");

export const cartBubble = document.querySelector(".cart-bubble");

const cartBtn = document.querySelector(".cart-label");

const barsBtn = document.querySelector(".menu-label");

const cartMenu = document.querySelector(".cart");

const barsMenu = document.querySelector(".navbar-list");

const overlay = document.querySelector(".overlay");

const successModal = document.querySelector(".add-modal");

export const deleteBtn = document.querySelector(".btn-delete");

  // carrito
  export let cart = JSON.parse(localStorage.getItem("cart")) || [];


/***********  Lógica de filtros  ************/

// Función para cambiar el estado del boton ver mas
// Recibe una categoria

const changeShowMoreBtnState = (category) => {
  if (!category) {
    btnLoad.classList.remove("hidden");
    return;
  }
  btnLoad.classList.add("hidden");
};

// Función para el estado del boton visual de los botones de filtro de categorias
// Recibe una categoria

const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};

// Función para cambiar todos los estados relacionados a los filtros
const changeFilterState = (e) => {
  const selectedCategory = e.target.dataset.category;
  changeBtnActiveState(selectedCategory);
  changeShowMoreBtnState(selectedCategory);
};

// Función que va aplicar los filtros a los productos por categoria

const applyFilter = (e) => {
  if (!e.target.classList.contains("category")) return;
  changeFilterState(e);
  if (!e.target.dataset.category) {
    products.innerHTML = "";
    renderProducts();
  } else {
    renderProducts(0, e.target.dataset.category);
    productsController.nextProductsIndex = 1;
  }
};

// Función que indica si estamos en el último array del array de productos divididos

const isLastIndexOf = () => {
  productsController.nextProductsIndex === productsController.productsLimit;
};

// Función para mostrar más productos al apretar en el boton ver mas
const showMoreProducts = () => {
  renderProducts(productsController.nextProductsIndex);
  productsController.nextProductsIndex++;
  if (isLastIndexOf()) {
    btnLoad.classList.add("hidden");
  }
};

/*************  Menu interface  *************/
// Lógica para la apertura del menu, carrito y overlay

// Togglea el menu y si el carrito esta abierto, lo cierra. Finalmente, muesta el overaly

const toggleMenu = () => {
  barsMenu.classList.toggle("open-menu");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

// Togglea el cart y si el menu esta abierto, lo cierra. Finalmente, muestra el overlay

const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (barsMenu.classList.contains("open-menu")) {
    barsMenu.classList.remove("open-menu");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

//Funcion que al clickear un en lace del menu hamburguesa me lo cierra, siempre y cuando clickeemos un ul que
//contiene la clase navbar-link
const closeOnClick = (e) => {
  if (!e.target.classList.contains("navbar-link")) return;
  barsMenu.classList.remove("open-menu");
  overlay.classList.remove("show-overlay");
};

// Al scrollear, si no esta abierto ni el menu ni el carrito, no pasa nada. Pero si alguno lo esta, se remueven las clases necesarias para cerrarlo

const closeOnScroll = () => {
  if (
    !barsMenu.classList.contains("open-menu") &&
    !cartMenu.classList.contains("open-cart")
  )
    return;

  barsMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

// Al clickear el overlay, cerrar el menu o cart en caso de que esten abiertos.

const closeOnOverlayClick = () => {
  barsMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

// Logica del carrito

// Funcion para añadir un producto al carrito
// si el producto no existe en el carrito, crea uno
// si el producto existe, añade una unidad
// guarda el carrito nuevo en el localStorage
// renderiza el carrito
// muestra el total del carrito
// habilitamos el boton de compra si corresponde

const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;

  const { id, name, bid, img } = e.target.dataset;

  const product = productData(id, name, bid, img);

  // console.log(product);
  if (isExistingCartProduct(product)) {
    addUnitToProduct(product);
    showSuccessModal("Se agregó una unidad del producto al carrito");
  } else {
    createCartProduct(product);
    showSuccessModal("El producto se ha agregado al carrito");
  }
  checkCartState();
};

// Función para crear un producto en el carrito

const createCartProduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};

// Funcion para constatar si existe un producto en el carrito

const isExistingCartProduct = (product) => {
  return cart.find((item) => item.id === product.id);
};

// constructor trucho de un productData
const productData = (id, name, bid, img) => {
  return { id, name, bid, img };
};

// Funcion para mostrar el modal de exito

const showSuccessModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent = msg;
  setTimeout(() => {
    successModal.classList.remove("active-modal");
  }, 1500);
};

// Funcion para manipular el evento de apretar en el boton del menos
// recibe un id

const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);

  // Si el producto que toco, tiene 1 sola unidad

  if (existingCartProduct.quantity === 1) {
    if (window.confirm("Desea eliminar el producto del carrito?")) {
      removeProductFromCart(existingCartProduct);
    }

    return;
  }
  substractProductUnit(existingCartProduct);
};

// Función para añadir una unidad de producto a un producto existente en el carrito

const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct
  );
};

// Funcion para restarle una unidad a un producto del carrito

const substractProductUnit = (existingProduct) => {
  cart = cart.map((product) => {
    return product.id === existingProduct.id
      ? { ...product, quantity: Number(product.quantity) - 1 }
      : product;
  });
};

// Funcion para remover un producto del carrito

const removeProductFromCart = (existingProduct) => {
  cart = cart.filter((product) => product.id !== existingProduct.id);
  checkCartState();
};

// Funcion para manipular ele vento de apretar en el boton mas del producto en el carrito
// recibe un id

const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  addUnitToProduct(existingCartProduct);
};

// Funcion para manipular los eventos de los botones mas y menos
// recibe el evento

const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    handlePlusBtnEvent(e.target.dataset.id);
  }

  checkCartState();
};

// Funcion para reetear los items del carrito
const resetCartItems = () => {
  cart = [];
  checkCartState();
};

// Funcion para relizar una de las acciones que nos permite el carrito,ya sea borrar o comprar.

const completeCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;

  if (window.confirm(confirmMsg)) {
    resetCartItems();
    alert(successMsg);
  }
};

// Funcion para completar la compra

const completeBuy = () => {
  completeCartAction("Desea completar su compra?", "Gracias por su compra!");
};

// Funcion para borrar el carrito

const deleteCart = () => {
  completeCartAction(
    "Desea eliminar los productos del carrito?",
    "No hay productos en el carrito"
  );
};

// Funcion inicializadora
const init = () => {
  renderProducts();
  categories.addEventListener("click", applyFilter);
  btnLoad.addEventListener("click", showMoreProducts);
  cartBtn.addEventListener("click", toggleCart);
  barsBtn.addEventListener("click", toggleMenu);
  window.addEventListener("scroll", closeOnScroll);
  barsMenu.addEventListener("click", closeOnClick);
  overlay.addEventListener("click", closeOnOverlayClick);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showTotal);
  products.addEventListener("click", addProduct);
  productsCart.addEventListener("click", handleQuantity);
  buyBtn.addEventListener("click", completeBuy);
  deleteBtn.addEventListener("click", deleteCart);
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  renderCartBubble(cart);
};

init();
