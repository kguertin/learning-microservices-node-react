const express = require('express');
const cors = require('cors');
const { json } = require('express');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/posts', (req, res) => {});

app.post('/events', (req, res) => {});

app.listen(4002, () => console.log('listening on 4002'));
