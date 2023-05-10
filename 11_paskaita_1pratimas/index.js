const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);
// 1
app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
//  2 vieno user postinimas
app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').insertOne(user);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
// 3
app.get('/comments', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('comments')
      .aggregate([
        {
          $lookup: {
            from: 'users', // kitos kolekcijos pavadinimas
            localField: 'user_id', // owners kolekcijos raktas per kurį susijungia
            foreignField: '_id', // kitos kolekcijos raktas per kurį susijungia
            as: 'commentsBase', // naujo rakto pavadinimas
          },
        },
      ])
      .toArray();
    // $lookup - sujungia dvi kolekcijas
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/petsWithOwner', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('pets')
      .aggregate([
        {
          $lookup: {
            from: 'owners', // kita kolekcija, su kuria jungiamasi
            localField: 'ownerId', // laukas iš pets kolekcijos
            foreignField: '_id', // laukas iš owners kolekcijos
            as: 'owner_info', // išeigos masyvo laukas
          },
        },
        {
          $unwind: '$owner_info', // išplečia masyvą, kad kiekvienas elementas būtų atskiras dokumentas
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/owners', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('owners').deleteMany(); // ištrina visus
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('comments')
      .deleteOne({ _id: new ObjectId(id) }); // ištrina vieną
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/pets/:id', async (req, res) => {
  // prieš pridedant gyvūną, reikia pridėti jų savininkų kolekciją
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('pets')
      .insertMany([
        {
          type: 'cat',
          name: 'Murka',
          ownerId: new ObjectId(id), // pasiimam iš parametrų pvz. /pets/645a7886c5e5702f9adb1470
        },
      ]);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/owners', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('owners')
      .insertMany([
        {
          name: 'Alice Smith',
          email: 'alice.smith@example.com',
          city: 'New York',
          income: 6000,
        },
        {
          name: 'Bob Johnson',
          email: 'bob.johnson@example.com',
          city: 'Los Angeles',
          income: 7000,
        },
        {
          name: 'Charlie Brown',
          email: 'charlie.brown@example.com',
          city: 'Chicago',
          income: 4500,
        },
        {
          name: 'David Lee',
          email: 'david.lee@example.com',
          city: 'San Francisco',
          income: 8000,
        },
        {
          name: 'Emily Davis',
          email: 'emily.davis@example.com',
          city: 'Boston',
          income: 5500,
        },
        {
          name: 'Frank Rodriguez',
          email: 'frank.rodriguez@example.com',
          city: 'Miami',
          income: 6500,
        },
        {
          name: 'Grace Kim',
          email: 'grace.kim@example.com',
          city: 'Seattle',
          income: 5000,
        },
        {
          name: 'Henry Nguyen',
          email: 'henry.nguyen@example.com',
          city: 'Houston',
          income: 7500,
        },
        {
          name: 'Isabella Taylor',
          email: 'isabella.taylor@example.com',
          city: 'Washington DC',
          income: 9000,
        },
        {
          name: 'Bob Chen',
          email: 'jack.chen@example.com',
          city: 'San Diego',
          income: 6000,
        },
      ]);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
