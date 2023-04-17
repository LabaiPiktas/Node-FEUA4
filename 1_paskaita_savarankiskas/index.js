console.log("Hello savarankiskas darbas");
const casual = require ('casual');
const express = require("express");
const app = express(); 
const port = 3000;

app.get("/randomUser", (req, res) => {
    // req - request(kas ateina is isores), res - response(kas ateina is vidaus)
    req.get("casual");
    res.send(` ${casual.first_name}  ${casual.last_name}  ${casual.country}  ${casual.city}  ${casual.address}  `);  // send metodas issiuncia duomenis
});

app.get("/randomColor", (req, res) => {
    req.get("casual");
    res.send(casual.rgb_hex);
});

app.get("/randomColors", (req, res) => {
    req.get("casual");
    res.send(casual.rgb_array);
});

app.get("/randomColorsArr", (req, res) => {
    const randomColorArray = [];
    for(let i = 0; i < 5; i++){
        randomColorArray[i] = casual.color_name;
    }
    res.send(randomColorArray);
});


/*
app.get("/randomPlaces", (req, res) => {
    const places = [];
    const numPlaces = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < numPlaces; i++) {
        const place = {
            country: casual.country,
            city: casual.city,
            address: casual._address
        }
    }
});
*/
/*const name = `${casual.name_prefix} ${casual.first_name} ${casual.last_name}`;
console.log(name);*/


app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});