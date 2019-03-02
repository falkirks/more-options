const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('/capture is where its at'));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.post('/capture', function(req, res) {
  console.log(req.body);
  // ...
  res.end('got!');
});

app.listen(port, () => console.log(`capture app listening on port ${port}!`));
