const button = document.querySelector("#button");
button.addEventListener("click", () => {
    const product = document.querySelector("input[name='product']").value;

    fetch("http://localhost:300/", {
        method: "POST",
        headers: {
            "Content-Type": "aplication/json",

        },
        body: JSON.stringify({ product})
    })
})