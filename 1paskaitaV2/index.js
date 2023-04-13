console.log("Hello from V2");
const express = require("express");  // express modulio importavimas
const app = express();    // aplikacijos sukurimas
const port = 3000;    // porto (kanalo) skaicius
  // rout(kelias) ruote/path
  //get - grazink duomenis
app.get("/", (req, res) => {
     // req - request(kas ateina is isores), res - response(kas ateina is vidaus)
     res.send("Mano vardas yra Teodoras");  // send metodas issiuncia duomenis
});
 
app.get("/today", (req, res) => {
    res.send(new Date().toDateString());
});

app.get("/user", (req, res) => {
    const user = {
        name: "Teodoras",
        age: "Dead on arrival"
    };
    res.send(user);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});