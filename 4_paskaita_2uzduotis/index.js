const express = require("express");
const cors = require("cors");
const port = 3000;
 

const data = require("./data");  // importuoja duomenis


const app = express();
app.use(express.json());
app.use(cors());


// 1
app.get("/", (req, res) => {
    res.send(data);
    });

// 2 

app.get("/items/:category", (req, res) => {
    const category = req.params.category;
    const filteredCategory = data.filter((client) => client.category.toLowerCase() === category.toLowerCase());
    res.send(filteredCategory);
});

// 3  uzkomentuoti 1 ir 2, kad paleisti 3

app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    
    const foundItem = data.find((item) => item.id === +id);
    if (foundItem) {
        res.send(foundItem);
    } else {
        res.status(404).send('Item not found');
    }
    console.log(foundItem);
  });
  
  
 // 4
 app.get("/items", (req, res) => {
    const items = data.map((client) => client.name);
    res.send(items);
});

// 5
  app.get('/itemsInStock', (req, res) => {
    const itemsInStock = data.map((item) => ({name: item.name, stock: item.stock}));
    res.send(itemsInStock);
  });
  
app.listen(port, () => console.log(`Server started on port ${port}...`));