function changePrice(e, id, price, code) {
  const p = document.getElementById(`${id}Price`);
  const q = document.getElementById(`${id}Quantity`);
  const cart = JSON.parse(window.localStorage.getItem("cart"));
  let flag = false;
  let total = 0;
  for (let item of cart) {
    if (item.id == id) {
      if (!flag && code) {
        for (let c of item.discountCode) {
          if (c == code) {
            flag = true;
            break;
          }
        }
      }
      item.quantity = flag ? parseInt(q.value) - 0.1 : parseInt(q.value);
      total = price * (!flag ? parseInt(q.value) : parseInt(q.value) - 0.1);
      item.total = total;
      continue;
    }
  }
  window.localStorage.setItem("cart", JSON.stringify(cart));
  p.innerHTML = total;
  totalMoney(null);
}

function loadCart() {
  const container = document.getElementById("itemContainer");
  const cartItems = JSON.parse(window.localStorage.getItem("cart"));
  const itemTemplate = function(strings, name, price, img, id) {
    return `
      <div class="card rounded-3 mb-4">
        <div class="card-body p-4">
          <div class="row d-flex justify-content-between align-items-center">
            <div class="col-md-2 col-lg-2 col-xl-2">
              <img
                src="${img}"
                class="img-fluid rounded-3" alt="Cotton T-shirt">
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
              <p class="lead fw-normal mb-2">${name}</p>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
              <input id="${id}Quantity" onchange="changePrice(event, '${id}', ${price})" min="0" name="quantity" value="1" type="number"
                class="form-control form-control-sm" />
              <input id="${id}Code" onchange="changePrice(event, '${id}', ${price}, this.value)" class="form-control form-control-sm" type="text" placeholder="Nhập mã" />
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
              <h5 id="${id}Price" class="mb-0">${price}</h5>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
              <button class="text-danger btn btn-default" onclick="deleteItem('${id}')">
                <i class="fas fa-trash fa-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  container.innerHTML = "";
  for (let item of cartItems) {
    container.innerHTML += itemTemplate`${item.name} ${item.price} ${item.img} ${item.id}`;
  }
}

function deleteItem(id) {
  let cart = JSON.parse(window.localStorage.getItem("cart"));
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      cart.splice(i, i + 1);
    }
  }
  window.localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function totalMoney(e, code=false, id) {
  let res = document.getElementById("totalMoney");
  let total = 0;
  let cart = JSON.parse(window.localStorage.getItem("cart"));
  for (let item of cart) {
    total += (item.total || item.quantity * item.price);
  }
  res.innerHTML = total;
}

if (window.localStorage.getItem("cart")) {
  document.addEventListener("DOMContentLoaded", loadCart);
  document.addEventListener("DOMContentLoaded", totalMoney);
}