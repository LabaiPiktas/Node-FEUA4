const products = ["Pienas", "Varškė", "Sviestas", "Duona", "Dešra"];

function displayProducts() {
    const productList = document.querySelector("#productList");
    productList.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        const li = document.createElement("li");
        li.innerText = products[i];
        productList.appendChild(li);
    }
}

function addProduct() {
    const productNameInput = document.querySelector("#productName");
    const productName = productNameInput.value;
    if (productName !== "") {
        products.push(productName);
        displayProducts();
        productNameInput.value = "";
    }
}

displayProducts();
