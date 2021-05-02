
//installs? (communicates with?) node libararies. Express handles routing(get, post requests), node-fetch handles fetch requests (request was an old library that has been discontinued, cause other stuff was better. Nedb helps with the database, i may delete all of this once i do my final edits)
const express = require('express');
const fetch = require('node-fetch');
const Datastore = require('nedb');
//sets express libary and then establishes server that I named 3000
// express static pushes the file to the server. Also limits how much data can be pushed through "i think"
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();


// database related. could possible delete. But It is sending a get request to the /api (this is and endpoint you have created, using this lets the server and client side connect? or communicate.)
app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});
//Whew boy alot is happening here. we are setting a get request to /weather, with paramaters latlon
app.get('/weather/:latlon', async (request, response) => {
console.log(request.params);
const latlon = request.params.latlon.split(',');
console.log(latlon);
const lat = latlon[0];
const lon = latlon[1];
console.log(lat, lon);
//const API_key = '0f814fa32c40dcee1f8186fb0eaaddd7'
const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=0f814fa32c40dcee1f8186fb0eaaddd7`
//const api_url = 'https://api.openweathermap.org/data/2.5/weather?lat=50.0&lon=-75.21&appid=0f814fa32c40dcee1f8186fb0eaaddd7'
const fetch_response = await fetch(api_url);
const json = await fetch_response.json();
response.json(json);
}

  );