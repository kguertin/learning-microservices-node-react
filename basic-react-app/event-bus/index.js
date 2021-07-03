const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;
  events.push(events);

  try {
    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);
    axios.post('http://localhost:4003/events', event);

    res.send({ status: 'OK' });
  } catch (e) {
    console.log(e);
  }
}); 

app.get('/events', (req, res) => {
  try {
    res.send(events);
  } catch (err) {
    console.log(err);
  }
});

app.listen(4005, () => console.log('Listening on 4005'));
