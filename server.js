
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/businessCards',
   { useNewUrlParser: true, useUnifiedTopology: true });

const cardSchema = new mongoose.Schema({
  name: String,
  Coname: String,
  number: String,
  email: String,
  text: String,
  line: String
});

const Card = mongoose.model('Card', cardSchema);

app.post('/api/cards', async (req, res) => {
  try {
    const newCard = new Card(req.body);
    await newCard.save();
    res.status(201).send(newCard);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/cards/:name', async (req, res) => {
  try {
    const card = await Card.findOne({ name: req.params.name });
    if (card) {
      res.status(200).send(card);
    } else {
      res.status(404).send({ message: 'Card not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
