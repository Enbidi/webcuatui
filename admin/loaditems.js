
const itemList = JSON.parse(window.localStorage.getItem("database"));

function changeItem(id) {
  const name = document.getElementById(`${id}Name`);
  const price = document.getElementById(`${id}Price`);
  const img = document.getElementById(`${id}Display`);
  const discountCode = document.getElementById(`${id}DiscountCode`);
  const desc = document.getElementById(`${id}Desc`);
  for (let item of itemList) {
    if (item.id == id) {
      item.name = name.value;
      item.price = price.value;
      item.img = img.src;
      item.discountCode = discountCode.value;
      item.desc = desc.value;
      return;
    }
  }
}

function loadImg(e, id, postfix=true) {
  let display;
  if (postfix)
    display = document.getElementById(`${id}Display`);
  else
    display = document.getElementById(`${id}`);
  display.src = URL.createObjectURL(e.target.files[0]);
}

function deleteItem(id) {
  for (let i = 0; i < itemList.length; i++) {
    if (itemList[i].id == id) {
      itemList.splice(i, 1);
      loadItems(0, itemList.length);
      return;
    }
  }
}

const template = (strings, id, name, price, img, discountCode, desc) => 
`
<div class="card px-0 col-sm-3">
  <div class="imgContainer h-75">
    <img id="${id}Display" src="${img}" class="card-img-top" alt="Hãy chọn ảnh hiển thị">
  </div>
  <div class="card-body input-group">
    <span class="input-group-text">ID: </span>
    <input id="${id}ID" class="form-control" readonly type="text" value="${id}"/>
  </div>
  <div class="card-body input-group">
    <span class="input-group-text">Tên: </span>
    <input id="${id}Name" class="form-control" type="text" value="${name}"/>
  </div>
  <div class="card-body input-group">
    <span class="input-group-text">Giá: </span>
    <input id="${id}Price" class="form-control" type="number" value="${price}"/>
  </div>
  <div class="card-body input-group">
    <span class="input-group-text">Hình: </span>
    <input id="${id}Img" class="form-control" type="file" onchange="loadImg(event, '${id}')" placeholder="${img}"/>
  </div>
  <div class="card-body input-group">
    <span class="input-group-text">Mã giảm giá: </span>
    <input id="${id}DiscountCode" class="form-control" type="text" value="${discountCode}"/>
  </div>
  <div class="card-body input-group">
    <span class="input-group-text">Mô tả: </span>
    <input id="${id}Desc" class="form-control" type="text" value="${desc}"/>
  </div>
  <div class="card-footer text-center">
    <button type="button" class="btn btn-primary"
    onclick="changeItem('${id}')">Lưu thay đổi</button>
    <button type="button" class="btn btn-danger"
    onclick="deleteItem('${id}')">Xóa sản phẩm</button>
  </div>
</div>`;

function loadItems(s, e, cond=() => true) {
  const container = document.getElementById("container");
  container.innerHTML = "";
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
      row.innerHTML += template`${item.id} ${item.name} ${item.price} ${".." + item.img} ${item.discountCode} ${item.desc}`;
    }
    container.appendChild(row);
  }
  if (!flag) {
    let c = document.createElement("h3");
    c.innerHTML = "Không có kết quả phù hợp!";
    container.appendChild(c);
  }
}

function lastId() {
  const lastId = parseInt(itemList[itemList.length - 1].id.slice(2));
  var newId = lastId + 1;
  document.getElementById("ID").value = "sp" + newId;
}

function appendItem() {
  const container = document.getElementById("container");
  const id = document.getElementById("ID").value;
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const img = document.getElementById("display").src;
  const discountCode = document.getElementById("discountCode").value;
  const desc = document.getElementById("desc").value;
  if (container.lastElementChild.childElementCount < 4) {
    container.lastElementChild.innerHTML += template`${id} ${name} ${price} ${img} ${discountCode} ${desc}`;
  }
  else {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML += template`${id} ${name} ${price} ${img} ${discountCode} ${desc}`;
    container.appendChild(row);
  }
}

document.addEventListener("DOMContentLoaded", lastId);

addEventListener("beforeunload", (e) => {
  window.localStorage.setItem("database", JSON.stringify(itemList));
})