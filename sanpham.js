function loadItems(o) {
  const name = document.getElementsByName("name");
  const price = document.getElementsByName("price");
  const img = document.getElementsByName("image");

  for (let i = 0; i < name.length; i++) {
    name[i].innerHTML = itemList[i + o].name;
    price[i].innerHTML = itemList[i + o].price;
    img[i].src = itemList[i + o].img;
  }
}