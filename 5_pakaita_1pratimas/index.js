const express = require("express");
const cors = require("cors");
const port = 3000;

/*const data = require("./data");  // importuoja duomenis*/

const app = express();
app.use(express.json());
app.use(cors());

let cart = [];

app.get('/cart', (req, res) => {
  res.json(cart);
});

app.get('/cart/:id', (req, res) => {
  const item = cart.find((item) => item.id === parseInt(req.params.id));
  if (!item) {
    res.status(404).send('Item not found');
  } else {
    res.json(item);
  }
});

app.post('/cart', (req, res) => {
  const item = req.body;
  item.id = cart.length + 1;
  cart.push(item);
  res.status(201).send('Item added to cart');
});

app.delete('/cart/:id', (req, res) => {
  const index = cart.findIndex((item) => item.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).send('Item not found');
  } else {
    cart.splice(index, 1);
    res.send('Item removed from cart');
  }
});






app.listen(port, () => console.log(`Server started on port ${port}...`));