const express = require("express");  // express importas
const cors = require("cors");      // cort importas
const app = express();       // express aplikacijos inicijavimas
app.use(express.json());     // aplikacija priima duomenis JSON formatu
app.use(cors());     // aplikacija naudoja CORS apsaugą

const port = 3000;    // kanalas reikalingas serveriui

console.log("1 Pratimas");

const cars = ["Audi", "BMW", "VW", "Renault"];
       // GET kelias, kuris grąžina duomenis
app.get("/cars", (req, res) => {
    // res (response) - duomenys kuriuos mes grąžiname
    res.send(cars);     // res.send() - metodas kuris grąžina klientui atsakymą
});

app.post("/cars", (req, res) => {
// req (request) - duomenys kuriuos mes gauman iš išorės
// req.body - pagrindiniai duomenys iš išorės

    /*const car = req.body.car;*/
    /*console.log(req.body);*/
    cars.push("Mercedes Benz");
    res.send(cars);  // POST dalyje siunčiam atgal klientui tai, ką jis pats atsiuntė mums
  });
  // app.listen() - metodas kuris paleidžia klausytis mūsų serverio nurodytu kanalu
  // port - kanalas
  // () => {} -funkcija kuri pasileidžia, kai serveris startuoja
  // console.log naudojam, kad žinoti kokiu kanalu veikia serveris
app.listen(port, () => {
    console.log(`Server is running on the http://localhost:${port}/`);
});
