// step 6
const CART_ITEMS_CONTAINER = document.getElementById("cart-items-container");
const TOTAL_COST_TEXT = document.getElementById("total-cost");

// console.log(CART_ITEMS_CONTAINER);
// console.log(TOTAL_COST_TEXT);

// step 1
// Product class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// step 2
// a cart item constructor inheriting properties from the product class
class CartItem extends Product {
  constructor(id, name, price, quantity) {
    super(id, name, price);
    this.quantity = quantity;
  }

  // step 3
  //   A method to calculate the cost of each item in the cart
  calculateCartItem() {
    return this.price * this.quantity;
  }
}

// step 4
// a class to store all the shopping cart items
class ShoppingCart {
  constructor(userShoppingCart) {
    this.userShoppingCart = userShoppingCart;
  }

  //   a method to display all items in the user shopping cart
  //   step 7
  displayShoppingCartItems() {
    let userProducts = this.userShoppingCart.map((item) => {
      return `<div class="flex justify-between border-b">
          <div>
            <h1 class="text-2xl font-semibold text-gray-400">${item.name}</h1>
            <button
            id = ${item.id}
              class="bg-orange-500 text-white p-1 rounded-md shadow-md mt-2 cursor-pointer my-2 delete--btn"
            >
              <i class="bi bi-trash"></i>
            </button>

            <h4>${item.calculateCartItem()}</h4>
          </div>

          <div>
            <h3 class="text-2xl font-semibold text-right">${item.price}</h3>
            <div class="flex gap-4 items-center">
              <button
              id = ${item.id}
                class="bg-orange-500 text-white p-1 rounded-md shadow-md mt-2 cursor-pointer increase--btn"
              >
                <i class="bi bi-plus"></i>
              </button>
              <button>${item.quantity}</button>
              <button
              id = ${item.id}
                class="bg-orange-500 text-white p-1 rounded-md shadow-md mt-2 cursor-pointer decrease--btn"
              >
                <i class="bi bi-dash"></i>
              </button>
            </div>
          </div>
        </div>`;
    });

    CART_ITEMS_CONTAINER.innerHTML = userProducts.join("");
    // better to place this after the html element that has the class name

    // targeting all the buttons with the class of increase--btn
    const INCREASE_BTN = document.querySelectorAll(".increase--btn");
    // targeting all the buttons with the class of increase--btn
    const DECREASE_BTN = document.querySelectorAll(".decrease--btn");
    // targeting all the button with class of delete--btn
    const DELETE_BTN = document.querySelectorAll(".delete--btn");
    console.log(DELETE_BTN);

    // use the array method called 'foreach' to add a function to a querySelectorAll
    INCREASE_BTN.forEach((value) => {
      // getting the value of the id attribute of each of the button
      let id_of_product = value.getAttribute("id");
      value.addEventListener("click", () =>
        this.increaseCartQuantities(id_of_product)
      );
    });
    // *****

    DECREASE_BTN.forEach((value) => {
      let id_of_product = value.getAttribute("id");
      value.addEventListener("click", () =>
        this.decreaseCartQuantities(id_of_product)
      );
    });
    // *****

    DELETE_BTN.forEach((value) => {
      let id_of_product = value.getAttribute("id");
      value.addEventListener("click", () => this.deleteCartItem(id_of_product));
    });
  }

  // A method to increase the quantity of an item
  increaseCartQuantities(id_of_product) {
    // use the for array method to go through all the products the user has in his cart
    this.userShoppingCart.forEach((item) => {
      // check if a product in the user shopping cart matches the id attribute of the product that is clicked
      if (item.id === id_of_product) {
        // increase the quantity of that product by one
        item.quantity = item.quantity + 1;
      }
    });
    // then re-display the products again with the updated quantity
    this.displayShoppingCartItems();
    this.calculateTotalItemsInCart();
  }
  // *****

  // A method to decrease the quantity of an item
  decreaseCartQuantities(id_of_product) {
    // use the for array method to go through all the products the user has in his cart
    this.userShoppingCart.forEach((item) => {
      // check if a product in the user shopping cart matches the id attribute of the product that is clicked
      if (item.id === id_of_product && item.quantity > 1) {
        // increase the quantity of that product by one
        item.quantity = item.quantity - 1;
      }
    });
    // then re-display the products again with the updated quantity
    this.displayShoppingCartItems();
    this.calculateTotalItemsInCart();
  }
  // *****

  // A method to delete cart items
  deleteCartItem(id_of_product) {
    // use the filter method to remove the product that has the id that is clicked
    let itemsLeftInCart = this.userShoppingCart.filter(
      (item) => item.id !== id_of_product
    );

    this.userShoppingCart = itemsLeftInCart;
    this.displayShoppingCartItems();
    this.calculateTotalItemsInCart();
  }

  // A method to caculate the total cost of products in the cart
  calculateTotalItemsInCart() {
    let total = 0;
    this.userShoppingCart.forEach((item) => {
      // this calculation runs from left to right
      total = total + item.price * item.quantity;
    });
    TOTAL_COST_TEXT.innerText = total;
  }
}

// step 5
// instance of shoppingCart Array
const cart = new ShoppingCart([
  new CartItem("1", "Iphone", 2000, 1),
  new CartItem("2", "Samsung", 4000, 1),
  new CartItem("3", "Techno", 5000, 1),
  new CartItem("4", "Itel", 7000, 1),
  new CartItem("5", "Gionee", 9000, 1),
]);

cart.displayShoppingCartItems();
cart.calculateTotalItemsInCart();
