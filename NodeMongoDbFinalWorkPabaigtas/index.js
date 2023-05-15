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
app.get('/memberships', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('services').find().toArray();
    await con.close();
    if (data.length === 0) {
      res.status(404).send('No membership found');
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
//  2
app.post('/memberships', async (req, res) => {
  try {
    const membership = req.body;
    const con = await client.connect();
    const existingMembership = await con
      .db(dbName)
      .collection('services')
      .findOne({ name: membership.name });
    if (existingMembership) {
      res.status(409).send({ error: 'Membership already exists' });
    } else {
      const data = await con
        .db(dbName)
        .collection('services')
        .insertOne(membership);
      await con.close();
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
// 3
app.delete('/memberships/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('services')
      .deleteOne({ _id: new ObjectId(id) }); // ištrina vieną
    await con.close();
    if (data.deletedCount === 0) {
      res.status(404).send('Membership not found');
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
// 4
// asc - ascending - didėjimo tvarka
// dsc - descending - mažėjimo tvarka

app.get('/users/:order', async (req, res) => {
  try {
    const { order } = req.params;
    const sort = order === 'asc' ? 1 : -1;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('users')
      .find()
      .sort({ name: sort })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
// 5
app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    const con = await client.connect();

    const existingUser = await con
      .db(dbName)
      .collection('users')
      .findOne({ email: user.email });
    if (existingUser) {
      await con.close();
      return res.status(400).send({ message: 'User already exists' });
    }
    const data = await con.db(dbName).collection('users').insertOne(user);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
// users get
app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').find().toArray();
    await con.close();
    if (data.length === 0) {
      res.status(404).send('No users found');
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').find().toArray();
    await con.close();
    if (data.length === 0) {
      res.status(404).send('No users found');
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
// Fetch a single membership by ID
app.get('/memberships/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const membership = await con
      .db(dbName)
      .collection('services')
      .findOne({ _id: new ObjectId(id) });
    await con.close();

    if (membership) {
      res.send(membership);
    } else {
      res.status(404).send('Membership not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('users')
      .deleteOne({ _id: new ObjectId(userId) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
