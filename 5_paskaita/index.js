// Trys būdai susikurti node.js aplikaciją:
// 1. Ranka pasirašyti package.json ir index.js failą, bet reikės susirašyti reikalingus modulius atskirai
// 2. Komanda "npm init", kuri sukurs jums package.json ir index.js failus, bet reikės susirašyti reikalingus modulius atskirai
// 3. Persikopijuoti package.json failą ir index.js failą (prasitrinti nereikalingas eilutes). Užtenka parašyti "npm install", kad surašyti visus modulius

// 1. Terminale pasirašome "npm install nodemon"
// 2. prisidedame į package.json failą scripts skiltį naują skriptą "dev": "nodemon index.js"
// 3. leidžiame aplikaciją terminale su komanda "npm run dev", run reikalingas, nes komanda sukurta mūsų, o ne sistemiška

const express = require("express");
const cors = require("cors");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
// 1
app.get("/cart", (req, res) => {
  res.send(users);
});
// 2
app.post("/cart", (req, res) => {
  
  const user = req.body;
  users.push(user);
  res.send(user);
});
//3
app.get('/cart/item/:id', (req, res) => {
    const id = req.params.id;
    
    const foundItem = data.find((item) => item.id === +id);
    if (foundItem) {
        res.send(foundItem);
    } else {
        res.status(404).send('Item not found');
    }
    console.log(foundItem);
  });

app.listen(port, () => console.log(`Server started on port ${port}...`));