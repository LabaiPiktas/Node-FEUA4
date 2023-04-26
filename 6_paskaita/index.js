// Trys būdai susikurti node.js aplikaciją:
// 1. Ranka pasirašyti package.json ir index.js failą, bet reikės susirašyti reikalingus modulius atskirai
// 2. Komanda "npm init", kuri sukurs jums package.json ir index.js failus, bet reikės susirašyti reikalingus modulius atskirai
// 3. Persikopijuoti package.json failą ir index.js failą (prasitrinti nereikalingas eilutes). Užtenka parašyti "npm install", kad surašyti visus modulius

// 1. Terminale pasirašome "npm install nodemon"
// 2. prisidedame į package.json failą scripts skiltį naują skriptą "dev": "nodemon index.js"
// 3. leidžiame aplikaciją terminale su komanda "npm run dev", run reikalingas, nes komanda sukurta mūsų, o ne sistemiška

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 8080;

/*const port = 3000;*/

const app = express();
app.use(express.json());
app.use(cors());

const tickets = [];

app.get('/tickets', (req, res) => {
  res.send(tickets);
});
/*
app.get('/tickets/:id', (req, res) => {
  const item = cart.find((item) => item.id === +req.params.id);
  if (!item) {
    res.status(404).send('Item not found');
  } else {
    res.send(item);
  }
});
*/
app.post('/tickets', (req, res) => {
  const item = req.body;
  item.id = tickets.length + 1;
  tickets.push(item);
  res.status(201).send('Ticket added to cart');
});
/*
app.delete('/tickets/:id', (req, res) => {
  const index = tickets.findIndex((item) => item.id === +req.params.id);
  if (index === -1) {
    res.status(404).send('Item not found');
  } else {
    tickets.splice(index, 1);
    res.send('Item removed from cart');
  }
});
*/
app.listen(port, () => console.log(`Server started on port ${port}...`));
