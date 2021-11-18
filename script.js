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
                <img class="w-50"
                    src="${img}"
                    alt="">
                <h5 class="card-title">${name}</h5>
                <p class="card-text fs-4">${description}</p>
                <p class="card-text fs-4">$${price}</p>
                <a href="#" class="btn btn-primary">
                    <i class="bi bi-cart-plus-fill"></i>
                    add cart
                </a>
            </div>
        </div>
      `;
  };

  const prodContainer = document.getElementById("productsContainer");
  const btnAdmin = document.getElementById("btnAdmin");
  const adminForm = document.getElementById("adminForm");
  const closeForm = document.getElementById("closeForm");
  const form = document.getElementById("form");
  const cartModal = document.getElementById("cartModal");
  const closeCart = document.getElementById("closeCart");
  const btnCart = document.getElementById("btnCart");
  const btnMemory = document.getElementById("btnMemory");
  const btnLogin = document.getElementById("btnLogin");
  const loginForm = document.getElementById("loginForm");
  const closeLogin = document.getElementById("closeLogin");

  /*----Load products in localStorage----*/

  let products = [];
  let localData = localStorage.getItem("products");

  if (localData != null) {
    localData = JSON.parse(localData);
    // console.log("localStorage al recargar la pagina:", localData);
    products = products.concat(localData);
    // console.log("Array de products al concatenar:", products);
    products.forEach((product) => {
      addToDom(product.img, product.name, product.description, product.price);
    });
  }

  /*----Open modal----*/

  const openModal = (btn, form) => {
    btn.addEventListener("click", () => {
      form.classList.toggle("d-none");
    });
  };

  openModal(btnAdmin, adminForm);
  openModal(closeForm, adminForm);
  openModal(btnLogin, loginForm);
  openModal(closeLogin, loginForm);
  openModal(btnCart, cartModal);
  openModal(closeCart, cartModal);

  /*---Clear Local Storage----*/

  btnMemory.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
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
