const products = ["Pienas (€1.70)", "Varškė (€2.55)", "Sviestas (€1.20)", "Duona (€0.90)", "Dešra (€3.45)"];
const exchangeRate = 1.0; // 1 euro = 1 euro

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
    const productPriceInput = document.querySelector("#productPrice");
    const productName = productNameInput.value;
    const productPrice = parseFloat(productPriceInput.value);
    if (productName !== "" && !isNaN(productPrice)) {
        const product = `${productName} (€${productPrice.toFixed(2)})`;
        products.push(product);
        displayProducts();
        productNameInput.value = "";
        productPriceInput.value = "";
    }
}

displayProducts();
