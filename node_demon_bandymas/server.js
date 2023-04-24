const express = require("express");
const cors = require("cors");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

console.log("demon is alive");


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




app.listen(port, () => console.log(`Server started on port ${port}...`));