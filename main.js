const dialogElem = document.querySelector(".dialog_elem");

const addBtn = document.querySelector(".add_list_btn");

const closeBtn = document.querySelector(".close_dialog");

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
