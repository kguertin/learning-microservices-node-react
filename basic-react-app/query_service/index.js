const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { json } = require('express');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};
const handleEvent = (type, data) => {
  if (type === 'postCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'commentCreated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'commentUpdated') {
    const { id, postId, status, content } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);

    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  try {
    const { type, data } = req.body;
    handleEvent(type, data);

    res.send({});
  } catch (e) {
    res.send({});
  }
});

app.listen(4002, async () => {
  console.log('listening on 4002');
  try {
    const res = await axios.get('http://localhost:4005/events');
    console.log(res.data);
    for (let event of res.data) {
      console.log('Processing event:', event.type);
      handleEvent(event.type, event.data);
    }
  } catch (e) {
    console.log(e);
  }
});
