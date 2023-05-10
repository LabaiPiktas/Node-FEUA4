const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);
// 1
app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('fakeUsers')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
// 2
app.post('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('fakeUsers')
      .insertMany([
        {
          name: 'Benas',
          email: 'user0@example.com',
          city: 'Nida',
          income: 5234,
        },
        {
          name: 'Marijonas',
          email: 'user1@example.com',
          city: 'Kaunas',
          income: 8678,
        },
        {
          name: 'Agnė',
          email: 'user2@example.com',
          city: 'Vilnius',
          income: 9512,
        },
        {
          name: 'Ramūnas',
          email: 'user3@example.com',
          city: 'Klaipėda',
          income: 3656,
        },
        {
          name: 'Marija',
          email: 'user4@example.com',
          city: 'Roma',
          income: 7895,
        },
        {
          name: 'Mari',
          email: 'user5@example.com',
          city: 'Paryžius',
          income: 2349,
        },
        {
          name: 'Gabriel',
          email: 'user6@example.com',
          city: 'Londonas',
          income: 6889,
        },
        {
          name: 'Amelija',
          email: 'user7@example.com',
          city: 'Kretinga',
          income: 4234,
        },
        {},
      ]);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
// 3
app.get('/usersCount', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('fakeUsers')
      .countDocuments();

    await con.close();

    res.send({ count: data });
  } catch (error) {
    res.status(500).send(error);
  }
});
// 4
app.get('/usersCount/Jonas', async (req, res) => {
  try {
    const con = await client.connect();
    const count = await con
      .db('ManoDuomenuBaze')
      .collection('fakeUsers')
      .countDocuments({ name: 'Jonas' });

    await con.close();
    res.send({ count });
  } catch (error) {
    res.status(500).send(error);
  }
});

// 5
app.get('/cities', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('fakeUsers')
      .distinct('city');

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
// 6
app.get('/lowestincome', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('fakeUsers')
      .aggregate([
        { $group: { _id: '$name', lowestincome: { $sum: '$income' } } },
        { $sort: { lowestincome: -1 } },
      ])
      .toArray();

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
// 7
app.get('/highestIncome', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('fakeUsers')
      .aggregate([
        { $group: { _id: '$name', highestIncome: { $sum: '$income' } } },
        { $sort: { highestIncome: 1 } },
      ])
      .toArray();

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
// 8

app.get('/dynamicUsersCount/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const con = await client.connect();
    const count = await con
      .db('ManoDuomenuBaze')
      .collection('fakeUsers')
      .countDocuments({ name });
    await con.close();

    if (count === 0) {
      res.status(404).send('User not found');
    } else {
      res.send({ count });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// vieno user postinimas
app.post('/oneUser', async (req, res) => {
  try {
    const user = req.body;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('fakeUsers')
      .insertOne(user);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
