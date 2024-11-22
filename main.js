const dialogElem = document.querySelector(".dialog_elem");
const addBtn = document.querySelector(".add_list_btn");
const closeBtn = document.querySelector(".close_dialog");

const formElem = document.querySelector("form");

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

  /*const name = document.getElementById("name").value;
  const menge = document.getElementById("menge").value;
  const preis = document.getElementById("preis").value;*/

  const { name, menge, preis } = event.target.elements;

  const exitingdata = getDataFromLocaleStorage();

  const newData = {
    name: name.value,
    menge: menge.value,
    preis: preis.value,
  };

  const updatedData = [...exitingdata, newData];

  saveToLocaleStorage(updatedData);
});

const saveToLocaleStorage = (dataObj) => {
  localStorage.setItem("Products", JSON.stringify(dataObj));
};

const getDataFromLocaleStorage = () => {
  const data = localStorage.getItem("Products");
  return data ? JSON.parse(data) : [];
};
