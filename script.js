(() => {
  class Product {
    constructor(img, name, description, price) {
      this.img = img;
      this.name = name;
      this.description = description;
      this.price = price;
    }
  }

  /*----Add product to DOM----*/

  const addToDom = (img, name, description, price) => {
    prodContainer.innerHTML += `
      <div class="card text-center col-3">
            <div class="card-body">
                <img class="w-75"
                    src="${img}"
                    alt="">
                <h5 class="card-title">${name}</h5>
                <p class="card-text fs-4">${description}</p>
                <p class="card-text fs-4">$${price}</p>
                <a href="#" class="btnAddToCart btn btn-primary">
                    <i class="bi bi-cart-plus-fill"></i>
                    add cart
                </a>
            </div>
        </div>
      `;
  };

  /*----Nav modals buttons----*/
  const btnAdmin = document.getElementById("btnAdmin");
  const btnLogin = document.getElementById("btnLogin");
  const btnCart = document.getElementById("btnCart");
  const closeAdmin = document.getElementById("closeAdmin");
  const closeLogin = document.getElementById("closeLogin");
  const closeCart = document.getElementById("closeCart");
  const adminModal = document.getElementById("adminModal");
  const loginModal = document.getElementById("loginModal");
  const cartModal = document.getElementById("cartModal");
  /*----Forms----*/
  const prodContainer = document.getElementById("productsContainer");
  const form = document.getElementById("form");
  const btnMemory = document.getElementById("btnMemory");

  /*----Load products in localStorage----*/

  let products = [];
  let localData = localStorage.getItem("products");

  if (localData != null) {
    localData = JSON.parse(localData);
    products = products.concat(localData);
    products.forEach((product) => {
      addToDom(product.img, product.name, product.description, product.price);
    });
  }

  /*----Open modal----*/

  const openModal = (btn, form, modalOne, modalTwo) => {
    btn.addEventListener("click", () => {
      form.classList.toggle("d-none");
      modalOne.classList.add("d-none");
      modalTwo.classList.add("d-none");
    });
  };

  openModal(btnAdmin, adminModal, loginModal, cartModal);
  openModal(closeAdmin, adminModal, loginModal, cartModal);
  openModal(btnLogin, loginModal, adminModal, cartModal);
  openModal(closeLogin, loginModal, adminModal, cartModal);
  openModal(btnCart, cartModal, adminModal, loginModal);
  openModal(closeCart, cartModal, adminModal, loginModal);

  /*---Clear Local Storage----*/

  btnMemory.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
  });

  /*----Add to cart----*/

  prodContainer.addEventListener("click", (e) => {
    if (e.target.classList == "btnAddToCart btn btn-primary") {
      console.log(e.target);
    }
  });

  /*----Form to add products----*/

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = new FormData(form);

    products.push(
      new Product(
        formData.get("img"),
        formData.get("name"),
        formData.get("description"),
        formData.get("price")
      )
    );
    // console.log("products despues del push: ", products);

    localStorage.setItem("products", JSON.stringify(products));

    // console.log("localStorage despues del push:", localStorage);

    window.location.reload();
    form.reset();
  });
})();
