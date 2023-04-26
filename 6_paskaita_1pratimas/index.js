const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 8080;
/*const data = require("./data");  // importuoja duomenis*/

const app = express();
app.use(express.json());
app.use(cors());

const tickets = [];

app.get('/tickets', (req, res) => {
  res.json(tickets);
});

app.get('/tickets/:id', (req, res) => {
  const item = tickets.find((item) => item.id === +req.params.id);
  if (!item) {
    res.status(404).send('Ticket not found');
  } else {
    res.send(item);
  }
});

app.post('/tickets', (req, res) => {
  const item = req.body;
  item.id = tickets.length + 1;
  tickets.push(item);
  res.status(201).send('Ticket added to cart');
});

app.delete('/tickets/:id', (req, res) => {
  const index = tickets.findIndex((item) => item.id === +req.params.id);
  if (index === -1) {
    res.status(404).send('Ticket not found');
  } else {
    tickets.splice(index, 1);
    res.send('Ticket removed from cart');
  }
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
