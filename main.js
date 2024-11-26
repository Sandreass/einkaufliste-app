const dialogElem = document.querySelector(".dialog_elem");
const addBtn = document.querySelector(".add_list_btn");
const closeBtn = document.querySelector(".close_dialog");
const formElem = document.querySelector("form");

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});

const inputPreis = document.querySelector('input[name="preis"]');
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
  dialogElem.showModal();
});

closeBtn.addEventListener("click", () => {
  dialogElem.close();
});

window.addEventListener("click", (event) => {
  if (event.target === dialogElem) {
    dialogElem.close();
  }
});

formElem.addEventListener("submit", (event) => {
  event.preventDefault();

  const { name, menge, preis } = event.target.elements;

  const nameValue = name.value.trim();
  const formattedName =
    nameValue.charAt(0).toUpperCase() + nameValue.slice(1).toLowerCase();

  const mengeValue = menge.value.trim();
  const preisValue = preis.value.trim();

  const exitingdata = getDataFromLocaleStorage();

  const newData = {
    name: formattedName,
    menge: mengeValue,
    preis: preisValue,
  };

  const updatedData = [...exitingdata, newData];

  saveToLocaleStorage(updatedData);

  name.value = "";
  menge.value = "";
  preis.value = "";

  renderProducts();
});

const saveToLocaleStorage = (dataObj) => {
  localStorage.setItem("Products", JSON.stringify(dataObj));
};

const getDataFromLocaleStorage = () => {
  const data = localStorage.getItem("Products");
  return data ? JSON.parse(data) : [];
};

const renderProducts = () => {
  const products = getDataFromLocaleStorage();

  const rootElem = document.querySelector(".root");

  rootElem.innerHTML = `<ul class="lists_container">
  ${products
    .map(
      (product) => `
    <li class="list_card">
    <p><strong>${product.name} ${product.menge}</strong></p>
    <div class = "btn_container">
    <span><i class="fa-regular fan-pen-to-square"></i></span>
    <span><i class="fa-regular fan-trash-can"></i></span>
    `).join("")}
    </ul>
`;
};

renderProducts();
