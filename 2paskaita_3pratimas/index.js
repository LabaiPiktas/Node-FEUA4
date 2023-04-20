const express = require("express");  
const cors = require("cors");
const app = express();    
app.use(express.json());

app.use(cors());

const port = 3000;    

console.log("2 Pratimas");

const products = ["Pienas", "Varškė", "Sviestas", "Duona", "Dešra"];

app.get("/products", (req, res) => {
    
    res.send(products);  
});

app.post("/products", (req, res) => {
    products.push("Degtinė");
    res.send(products);
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});