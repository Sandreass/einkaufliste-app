const dialogElem = document.querySelector(".dialog_elem");
const backroup = document.querySelector("#dialog_container");
const addBtn = document.querySelector(".add_list_btn");

addBtn.addEventListener("click", () => {
  backroup.classList.add("backroup");
  dialogElem.show();
  console.log("click");
  
});
