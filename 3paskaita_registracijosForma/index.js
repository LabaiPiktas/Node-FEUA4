const express = require("express");  // express importas
const cors = require("cors");      // cort importas
const app = express();       // express aplikacijos inicijavimas
app.use(express.json());     // aplikacija priima duomenis JSON formatu
app.use(cors());     // aplikacija naudoja CORS apsaugą

const port = 3000;    // kanalas reikalingas serveriui

console.log("registration form");

const users = [
    {
      id: 1,
      name: "John",
      surname: "Doe",
      email: "johndoe@example.com",
      password: "password123",
      address: "123 Main St",
      city: "New York",
      zip: 10001,
      phone: "555-555-1234"
    },
    {
      id: 2,
      name: "Jane",
      surname: "Doe",
      email: "janedoe@example.com",
      password: "password456",
      address: "456 Main St",
      city: "Los Angeles",
      zip: 90001,
      phone: "555-555-5678"
    },
    // add more users as needed
  ];
  
       // GET kelias, kuris grąžina duomenis
app.get("/users", (req, res) => {
    // res (response) - duomenys kuriuos mes grąžiname
    res.send(users);     // res.send() - metodas kuris grąžina klientui atsakymą
});

app.post("/users", (req, res) => {
// req (request) - duomenys kuriuos mes gauman iš išorės
// req.body - pagrindiniai duomenys iš išorės
const user = {
    password: req.body.password,
    email: req.body.email,
    name: req.body.name,
    surname: req.body.surname,
    address: req.body.address,
    zip: req.body.zip,
    city: req.body.city,
    phone: req.body.phone,
    isAgreement: req.body.isAgreement,
};
    /*const car = req.body.car;*/
    /*console.log(req.body);*/
    users.push(user);
    res.send(users);  // POST dalyje siunčiam atgal klientui tai, ką jis pats atsiuntė mums
  });



  // app.listen() - metodas kuris paleidžia klausytis mūsų serverio nurodytu kanalu
  // port - kanalas
  // () => {} -funkcija kuri pasileidžia, kai serveris startuoja
  // console.log naudojam, kad žinoti kokiu kanalu veikia serveris
app.listen(port, () => {
    console.log(`Server is running on the http://localhost:${port}/`);
});
