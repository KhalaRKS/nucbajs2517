import { productsData,productsController } from "./data.js";
import { products } from "./index.js";
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

// Función de renderizado de los productos del carrito cuando se aplican filtros
// Recibe un string con el nombre de la categoria

 const renderFilteredProducts = (category) => {
    const productsList = productsData.filter(
      (product) => product.category === category
    );
    products.innerHTML = productsList.map(renderProduct).join("");
  };


// Función de renderizados de los productos con el boton Ver Mas
// Recibe un index, en caso de que no valdra 0, y rendiraza los 6  elementos siguientes correspondientes al index
 const renderDividedProducts = (index = 0) => {
    products.innerHTML += productsController.dividedProducts[index]
      .map(renderProduct)
      .join("");
  };
  
  // Función para agregar productos al carrito

// Recibe un index, en caso de no recibirlo este sera 0, y una categoria, en caso de no recibirla sera undefined.

export const renderProducts = (index = 0, category = undefined) => {
    if (!category) {
      renderDividedProducts(index);
      return;
    }
    renderFilteredProducts(category);
  };