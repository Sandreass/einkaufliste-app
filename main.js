const dialogElem = document.querySelector(".dialog_elem");
const addBtn = document.querySelector(".add_list_btn");
const closeBtn = document.querySelector(".close_dialog");
const formElem = document.querySelector("form");

const inputPreis = document.querySelector('input[name="preis"]')
inputPreis.addEventListener('input',(e)=>{
    const inputPriceValue = e.target.value;
    let msgElem = e.target.nextElementSibling;

    if (msgElem) {
        msgElem.remove()
    }

    if (isNaN(inputPriceValue) || inputPriceValue < 1) {
        msgElem = document.createElement('p');
        msgElem.classList.add('msg');
        msgElem.textContent = 'Preis muss größer als 1 sein!';
        msgElem.style.color = 'red'; 
        msgElem.style.fontSize = '0.9rem';
        msgElem.style.padding = '0.4rem 0';
        
        e.target.parentElement.appendChild(msgElem); 
    }else if (inputPriceValue === '') {
        msgElem = document.createElement('p');
        msgElem.classList.add('msg');
        msgElem.textContent = 'Dieses Feld darf nicht leer sein!';
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

  const exitingdata = getDataFromLocaleStorage();

  const newData = {
    name: name.value,
    menge: menge.value,
    preis: preis.value,
  };

  console.log(newData.preis);

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
