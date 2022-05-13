const accounts = JSON.parse(window.localStorage.getItem("accounts"));

const inputOnChange = (e, email, fieldName) => {
    for (let acc of accounts) {
        if (acc.email == email) {
            switch (fieldName) {
                case "Name":
                    acc.name = e.target.value;
                    break;
                case "Email":
                    acc.email = e.target.value;
                    break;
                case "Pass":
                    acc.pass = e.target.value;
                    break;
            }
        }
    }
}

function createInputGroup(name, value, email) {
    const container = document.createElement("div");
    const span = document.createElement("span");
    const input = document.createElement("input");
    container.className = "input-group";
    span.className += "input-group-text rounded-0";
    span.style = "width: 70px";
    span.innerHTML = name;
    input.type = "text";
    input.className = "form-control rounded-0";
    input.value = value;
    input.setAttribute("onchange", `inputOnChange(event, "${email}", "${name}")`);
    container.appendChild(span);
    container.appendChild(input);
    return container;
}

function loadAccounts() {
    const container = document.getElementById("accContainer");
    for (let acc of accounts) {
        console.log(acc);
        const { name, email, pass } = acc;
        const li = document.createElement("li");
        li.className = "list-group-item m-2 p-0 shadow-md";
        li.appendChild(createInputGroup("Name", name, email));
        li.appendChild(createInputGroup("Email", email, email));
        li.appendChild(createInputGroup("Pass", pass, email));
        container.appendChild(li);
    }
}

document.addEventListener("DOMContentLoaded", loadAccounts);
addEventListener("beforeunload", () => {
    window.localStorage.setItem("accounts", JSON.stringify(accounts));
})