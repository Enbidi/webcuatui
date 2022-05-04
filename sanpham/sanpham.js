var cart;

if (window.localStorage.getItem("cart")) {
  cart = JSON.parse(window.localStorage.getItem("cart"));
}
else {
  cart = [];
}

function loadItems(o) {
  const name = document.getElementsByName("name");
  const price = document.getElementsByName("price");
  const img = document.getElementsByName("image");
  const cartButton = document.getElementsByName("cartButton");

  for (let i = 0; i < name.length; i++) {
    name[i].innerHTML = itemList[i + o].name;
    price[i].innerHTML = itemList[i + o].price;
    img[i].src = itemList[i + o].img;
    cartButton[i].onclick = () => {
      cart.push((({name, price, img, id}) => ({name, price, img, id}))(itemList[i + o]));
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
}