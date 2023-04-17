const express = require("express");  // express modulio importavimas
const cors = require("cors");
const app = express();    // aplikacijos sukurimas
app.use(express.json());

app.use(cors());

const port = 3000;    // porto (kanalo) skaicius

const names = ["Teodoras"];

app.post("/", (req, res) => {
  const name = req.body.name;
  res.send(req.body);
})

app.post("/", (req, res) => {
  names.push("Test Names");
  res.send("Test Name");
});
    
        app.get('/', (req, res) => {
            res.send(names);
        });

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });

    console.log(names);