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
app.get("/cars/:model", (req, res) => {
    const model = req.params.model;
    const filteredClients = data.filter((client) => client.car.toLowerCase() === model.toLocaleLowerCase());
    res.send(filteredClients);
});

// 3
app.get("/clients/:id", (req, res) => {
    const id = req.params.id;
    // 1 === "1"
    const foundClient = data.find((client) => client.id === +id);
    res.send(foundClient);
  });

    // 4

    app.get("/emails", (req, res) => {
        const emails = data.map((client) => client.email);
        res.send(emails);
    });

    // 5
app.get("/females", (req, res) => {
    const filteredFemales = data.filter((client) => client.gender === "Female");
    const femalesFullNames = filteredFemales.map(
      (female) => `${female.first_name} ${female.last_name}`
    );
    res.send(femalesFullNames);
  });

app.listen(port, () => console.log(`Server started on port ${port}...`));