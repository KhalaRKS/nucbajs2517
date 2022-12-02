const products = document.querySelector(".products-container");

const productsCart = document.querySelector(".cart-container");

const total = document.querySelector(".total");

const categories = document.querySelector(".categories");

const categoriesList = document.querySelectorAll(".category");

const btnLoad = document.querySelector(".btn-load");

const buyBtn = document.querySelector(".btn-buy");

const cartBubble = document.querySelector(".cart-bubble");

const cartBtn = document.querySelector(".cart-label");

const barsBtn = document.querySelector(".menu-label");

const cartMenu = document.querySelector(".cart");

const barsMenu = document.querySelector(".navbar-list");

const overlay = document.querySelector(".overlay");

const successModal = document.querySelector(".add-modal");

const deleteBtn = document.querySelector(".btn-delete");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Funcion para guardar un array de objetos nuevos en el localStorage
const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

// Funci[on individual de renderizado de productos

const renderProduct = (product) => {
  const { id, name, bid, user, userImg, cardImg } = product;
  return ` 
  <div class="product">
      <img src=${cardImg} alt=${name} />
      <div class="product-info">
          <!-- top -->
          <div class="product-top">
              <h3>${name}</h3>
              <p>Current Bid</p>
          </div>
          <!-- mid -->
          <div class="product-mid">
              <div class="product-user">
                  <img src=${userImg} alt="user" />
                  <p>@${user}</p>
              </div>
              <span>${bid} eTH</span>
          </div>
          <!-- bot -->
          <div class="product-bot">
              <div class="product-offer">
                  <div class="offer-time">
                      <img src="./assets/img/fire.png" alt="" />
                      <p>05:12:07</p>
                  </div>
                  <button class="btn-add"
                  data-id='${id}'
                  data-name='${name}'
                  data-bid='${bid}'
                  data-img='${cardImg}'>Add</button>
              </div>
          </div>
      </div>
  </div>`;
};

// Función de renderizados de los productos con el boton Ver Mas
// Recibe un index, en caso de que no valdra 0, y rendiraza los 6  elementos siguientes correspondientes al index

const renderDividedProducts = (index = 0) => {
  products.innerHTML += productsController.dividedProducts[index]
    .map(renderProduct)
    .join("");
};

// Función de renderizado de los productos del carrito cuando se aplican filtros
// Recibe un string con el nombre de la categoria

const renderFilteredProducts = (category) => {
  const productsList = productsData.filter(
    (product) => product.category === category
  );
  products.innerHTML = productsList.map(renderProduct).join("");
};

// Función para agregar productos al carrito

// Recibe un index, en caso de no recibirlo este sera 0, y una categoria, en caso de no recibirla sera undefined.

const renderProducts = (index = 0, category = undefined) => {
  if (!category) {
    renderDividedProducts(index);
    return;
  }
  renderFilteredProducts(category);
};

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
  barsMenu.classList.toggle("open-cart");
  if (barsMenu.classList.contains("open-menu")) {
    barsMenu.classList.remove("open-menu");
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
const renderCart = () => {
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

const showTotal = () => {
  total.innerHTML = `${getCartTotal().toFixed(2)} eTH`;
};

// Funcion para renderizar la cantidad de productos que hay en el carrito en la burbuja del icono del carrito

const renderCartBubble = () => {
  console.log(cart.reduce((acc, cur) => acc + cur.quantity, 0));
  cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
};
// mirar esto
// cart.reduce((acc, cur) => acc + cur.quantity, 0);

//Funcion es habilitar el boton de compra si el carrito tiene algo.

const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
};

// Funcion para chequear el estado del carrito una vez realizada alguna manipulacion del mismo
// agregar, quitar, comprar, etc

const checkCartState = () => {
  saveLocalStorage(cart);
  renderCart(cart);
  showTotal(cart);
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  renderCartBubble(cart);
};

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
