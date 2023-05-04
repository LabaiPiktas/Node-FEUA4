const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/products', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDoumenuBaze')
      .collection('Products')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    // destrukcija iš objekto
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('ManoDoumenuBaze')
      .collection('Products')
      .findOne(new ObjectId(id)); // suranda vieną objektą duomenų bazėje
    // būtinai importuoti ObjectId iš mongodb
    await con.close();
    if (!data) {
      res.status(404).send('Product not found');
    } else {
      res.send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get('/products/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const con = await client.connect();
    const data = await con
      .db('ManoDoumenuBaze')
      .collection('Products')
      .find({ category }) // ištraukia pagal tam tikrą lauką pvz. genre
      .toArray();
    await con.close();
    if (data.length === 0) {
      res.status(404).send('Product category not found');
    } else {
      res.send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// asc - ascending - didėjimo tvarka
// dsc - descending - mažėjimo tvarka
app.get('/products/priceSort/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const sort = type === 'asc' ? 1 : -1;
    const con = await client.connect();
    const data = await con
      .db('ManoDoumenuBaze')
      .collection('Products')
      .find()
      .sort({ price: sort }) // sortina didėjimo/mažėjimo tvarka
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/products', async (req, res) => {
  try {
    const product = req.body;
    const con = await client.connect();
    const data = await con
      .db('ManoDoumenuBaze')
      .collection('Products')
      .insertOne(product);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
