var cart = [];

if (window.localStorage.getItem("cart")) {
  cart = JSON.parse(window.localStorage.getItem("cart"));
}

const addToCart = (name, price, img, id, discountCode) => {
  cart.push(
    {
      name: name,
      price: price,
      img: img,
      id: id,
      quantity: 1,
      discountCode: discountCode.split(",")
    }
  );
  window.localStorage.setItem("cart", JSON.stringify(cart));
}

function loadItems(s, e, imgPrefix=".", cartPrefix=".", cond=() => true) {
  const container = document.getElementById("container");
  const template = (strings, name, price, img, id, discountCode) => 
    `
    <div class="card px-0 col-sm-3">
        <div class="imgContainer h-75">
          <img src="${imgPrefix + img}" class="card-img-top">
          <div class="itemDetail">
            <a href="./chi_tiet_sp/index.html?id=${id}" class="btn btn-warning">Xem chi tiết</a>
          </div>
        </div>
        <div class="card-header text-center">
          <h6 class="card-title">${name}</h6>
        </div>
        <div class="card-body">
          Giá: <span name="price">${price}</span>
        </div>
        <div class="card-footer text-center">
          <button type="button" class="btn btn-primary"
          onclick="addToCart('${name}', '${price}', '${cartPrefix + img}', '${id}', '${discountCode}')">Thêm vào giỏ hàng</button>
        </div>
      </div>`;  
  let flag = false;
  for (let i = s; i < Math.min(e, itemList.length); i += 4) {
    let row = document.createElement("div");
    row.className = "row";
    let j = i;
    while (j < Math.min(i + 4, itemList.length)) {
      var item = itemList[j];
      j++;
      if (!cond(item))
        continue;
      else if (!flag)
        flag = true;
      row.innerHTML += template`${item.name} ${item.price} ${item.img} ${item.id} ${item.discountCode.join(",")}`;
    }
    container.appendChild(row);
  }
  if (!flag) {
    let c = document.createElement("h3");
    c.innerHTML = "Không có kết quả phù hợp!";
    container.appendChild(c);
  }
}