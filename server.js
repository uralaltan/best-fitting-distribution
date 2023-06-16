const { chiSquareGoodnessOfFit } = require("./distributions");

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/* The user have to go to this endpoint and request a json in this format -> { "data": [1,2,3,4,5] } 
then our api returns the distributions and their scores in json format */
// You can test the api via shell with "npm run start"

app.post('/evaluate', (req, res) => {
  const userData = req.body;

  if (!userData || !userData.data || !Array.isArray(userData.data)) {
    res.status(400).json({ error: 'Invalid request format' });
    return;
  }

  const inputList = userData.data; 

  const result = chiSquareGoodnessOfFit(inputList);

  res.json({ result: result });

});