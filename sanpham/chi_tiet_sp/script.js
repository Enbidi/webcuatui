const cart = JSON.parse(window.localStorage.getItem("cart"));

function findItem(id) {
  for (let item of itemList) {
    if (item.id == id) {
      return item;
    }
  }
  return null;
}


const addToCart = (name, price, img, id) => {
  cart.push(
    {
      name: name,
      price: price,
      img: img,
      id: id,
      quantity: 1
    }
  );
  window.localStorage.setItem("cart", JSON.stringify(cart));
}

function loadData() {
  const url = new URL(location);
  let id = url.searchParams.get("id");
  const item = findItem(id);
  const btn = document.getElementById("addToCartBtn");
  btn.onclick = () => addToCart(item.name, item.price, item.img, item.id);
  const imgItem = document.getElementById("imgItem");
  const name = document.getElementById("name");
  const desc = document.getElementById("desc");
  const dc1 = document.getElementById("dc1");
  const dc2 = document.getElementById("dc2");
  const price = document.getElementById("price");
  imgItem.src = "../.." + item.img;
  name.innerHTML = item.name;
  dc1.innerHTML = item.discountCode[0];
  dc2.innerHTML = item.discountCode[1];
  desc.innerHTML = item.desc;
  price.innerHTML = item.price;
  for (let comment of item.comments) {
    appendComment(comment);
  }
}

function appendComment(comment, container=document.getElementById("commentContainer")) {
  let c = document.createElement("div");
  let user = document.createElement("h6");
  user.innerHTML = comment.user;
  let content = document.createElement("p");
  content.innerHTML = comment.content;
  c.appendChild(user);
  c.appendChild(content);
  c.className = "rounded shadow-lg border p-3 m-2"
  container.appendChild(c);
}

function checkComment() {
  if (window.localStorage.getItem("logged_in")) {
    let c = document.getElementById("commentArea");
    c.placeholder = "Nhập bình luận của bạn về sản phẩm...";
    c.removeAttribute("disabled");
  }
}

document.addEventListener("DOMContentLoaded", loadData);
document.addEventListener("DOMContentLoaded", checkComment);