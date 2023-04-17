const express = require("express");  
const cors = require("cors");
const app = express();    
app.use(express.json());

app.use(cors());

const port = 3000;    

console.log("1 Pratimas");

const cars = ["Audi", "BMW", "VW", "Renault"];

app.get("/cars", (req, res) => {
    
    res.send(cars);  
});

app.post("/cars", (req, res) => {
    cars.push("Mercedes Benz");
    res.send(cars);
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
