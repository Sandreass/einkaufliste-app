const dialogElem = document.querySelector(".dialog_elem");
const addBtn = document.querySelector(".add_list_btn");
const closeBtn = document.querySelector("[data-close-btn]");
const formElem = document.querySelector("form");
const inputPreis = document.querySelector('input[name="preis"]');
const h4Elem = document.createElement("h4");
const rootElem = document.querySelector(".root");
const sortMengeBtn = document.querySelector(".sort_menge");
const sortNameBtn = document.querySelector(".sort_name");
const sortPreisBtn = document.querySelector(".sort_preis");

dialogElem.insertBefore(h4Elem, dialogElem.firstChild);

let isEditing = false;
let currentEditId = null;
let sortDirection = "asc";

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});

inputPreis.addEventListener("input", (e) => {
  const inputPriceValue = e.target.value;
  let msgElem = e.target.nextElementSibling;

  if (msgElem) {
    msgElem.remove();
  }
  if (isNaN(inputPriceValue) || inputPriceValue < 1) {
    msgElem = document.createElement("p");
    msgElem.classList.add("msg");
    msgElem.textContent = "Preis muss größer als 1 sein!";
    msgElem.style.color = "red";
    msgElem.style.fontSize = "0.9rem";
    msgElem.style.padding = "0.4rem 0";

    e.target.parentElement.appendChild(msgElem);
  } else if (inputPriceValue === "") {
    msgElem = document.createElement("p");
    msgElem.classList.add("msg");
    msgElem.textContent = "Dieses Feld darf nicht leer sein!";
    e.target.parentElement.appendChild(msgElem);
  }
});

addBtn.addEventListener("click", () => {
  isEditing = false;
  formElem.reset();
  dialogElem.showModal();

  h4Elem.textContent = "Produckt hinzufügen";
});

closeBtn.addEventListener("click", () => {
  dialogElem.close();
});

formElem.addEventListener("submit", (e) => {
  e.preventDefault();

  const { name, menge, preis } = e.target.elements;

  const nameValue = name.value.trim();
  const formattedName =
    nameValue.charAt(0).toUpperCase() + nameValue.slice(1).toLowerCase();
  const mengeValue = parseFloat(menge.value.trim());
  const preisValue = parseFloat(preis.value.trim());

  const exitingData = getDataFromLocaleStorage();

  if (isEditing && currentEditId !== null) {
    const updatedEditedData = exitingData.map((product) => {
      return product.id === currentEditId
        ? {
            ...product,
            name: formattedName,
            menge: mengeValue,
            preis: preisValue,
          }
        : product;
    });

    saveToLocaleStorage(updatedEditedData);
  } else {
    const newData = {
      name: formattedName,
      menge: mengeValue,
      preis: preisValue,
      id: new Date().getTime(),
    };

    const updatedDate = [...exitingData, newData];
    saveToLocaleStorage(updatedDate);
  }

  formElem.reset();

  dialogElem.close();
  renderProducts();
});

const saveToLocaleStorage = (dataObj) => {
  localStorage.setItem("Products", JSON.stringify(dataObj));
};

const getDataFromLocaleStorage = () => {
  const data = localStorage.getItem("Products");
  return data ? JSON.parse(data) : [];
};

const renderProducts = (products = null) => {
  const productsToARender = products || getDataFromLocaleStorage();

  rootElem.innerHTML = `
<ul class='lists_container'>
${productsToARender
  .map(
    (product) => `
    <li class='list_card'>
    <p><strong>${product.menge} ${product.name}</strong></p>
    <div class="btn_container">
    <span onclick="editProduct(${product.id})"><i class="fa-regular fa-pen-to-square"></i></span>
    <span onclick="deleteProduct(${product.id})"><i class="fa-regular fa-trash-can"></i></span>
    </div>
    </li>
    `
  )
  .join("")}
</ul>
`;
};

const editProduct = (id) => {
  const products = getDataFromLocaleStorage();

  const productToEdit = products.find((product) => product.id === id);

  if (productToEdit) {
    isEditing = true;
    currentEditId = id;

    const { name, menge, preis } = formElem.elements;

    name.value = productToEdit.name;
    menge.value = productToEdit.menge;
    preis.value = productToEdit.preis;

    dialogElem.showModal();

    h4Elem.innerText = "Product bearbeiten";
  }
};

const deleteProduct = (id) => {
  const products = getDataFromLocaleStorage();
  const updateDeletedData = products.filter((product) => product.id !== id);
  saveToLocaleStorage(updateDeletedData);
  renderProducts();
};

const sortFn = (e) => {
  const span = e.target.closest(" [data-sort-key]");
  if (span) {
    span.classList.toggle("active");
  } else {
    return true;
  }

  const sortKey = span.dataset.sortKey;
  const icon = span.querySelector("i");

  if (icon) {
    icon.classList.toggle("active");
  }

  const products = getDataFromLocaleStorage();

  if (sortDirection === "asc") {
    products.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
    sortDirection = "desc";
  } else {
    products.sort((a, b) => (a[sortKey] < b[sortKey] ? 1 : -1));
    sortDirection = "asc";
  }

  renderProducts(products);
};

sortMengeBtn.addEventListener("click", sortFn);
sortNameBtn.addEventListener("click", sortFn);
sortPreisBtn.addEventListener("click", sortFn);
