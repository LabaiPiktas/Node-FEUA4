const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

const posts = [];

app.get('/posts', (req, res) => {
  res.send(posts);
});

// {id, title, done}
app.post('/posts', (req, res) => {
  const post = req.body;
  const newPost = { id: posts.length + 1, ...post }; // pridedamas id prie siunčiamo objekto
  posts.push(newPost); // pridedama į masyvą
  res.send(newPost); // išsiunčiamas response
});

app.get('/posts/:id', (req, res) => {
  const id = +req.params.id;
  const foundPost = posts.find((post) => post.id === id); // randa {...}, jei ne undefined
  if (foundPost) {
    // jeigu randa
    res.send(foundPost);
  } else {
    // jeigu neranda - 404 not found
    // res.status() - grąžina statusą
    res.status(404).send({ message: 'Post not found' });
  }
});

app.delete('/posts/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = posts.findIndex((post) => post.id === id); // randa 0-begalybės, neranda -1
  if (foundIndex !== -1) {
    // jeigu randa
    const deletingPost = posts.find((post) => post.id === id);
    posts.splice(foundIndex, 1);
    res.send(deletingPost); // grąžinam elementą kurį trinam
  } else {
    // jeigu neranda
    res.status(404).send({ message: 'Post not found' });
  }
});

app.put('/posts/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = posts.findIndex((post) => post.id === id);
  if (foundIndex !== -1) {
    const post = req.body; // naujai siunčiamas todo
    const updatingPost = { id, ...post }; // senas id + naujas todo
    posts.splice(foundIndex, 1, updatingPost); // užkeičiamas atnaujintas todo
    res.send(updatingPost);
  } else {
    res.status(404).send({ message: 'Post not found' });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
