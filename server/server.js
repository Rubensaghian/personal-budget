const morgan = require('morgan');
const errorHandler = require('errorhandler');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
app.use(bodyParser.json());
app.use(errorHandler());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json()); 
const PORT = 3000; 
app.get('/', (req, res) => {
    res.send('Hello World!')
  })


const envRouter = express.Router();
app.use("/envelopes", envRouter); 

let envelopes = [
  {
    budget: 500,
    id: 0,
    name: rent
  }
]; 

envRouter.param("id", (req, res, next, id) => {
  const num = Number(id);
  const envelope = findEnvById(num); 
  if (envelope){
  req.envelope = envelope; 
  next(); }
  else {
    res.status(404).send();
  }
})

envRouter.post("/" , (req, res, next) => {
  const envelope = req.body
  envelopes.push(envelope); 
  res.send(envelope);
})
envRouter.get("/", (req, res, next) => {
  res.send(envelopes); 
})
envRouter.get("/:id", (req, res, next) => {
  res.send(req.envelope); 
})
envRouter.put("/:envelope", (req, res, next) => {
    const id = req.params.id;
    envelopes[id] = req.params; 
})

envRouter.delete("/:id", (req, res, next) => {
    envelopes.splice(req.envelope.id, 1); 
    res.send(req.envelope); 
})

envRouter.post("/transfer/:from/:to", (req, res, next) => {
  const fromId = req.params.from; 
  const toId = req.params.to; 
  const amount = req.body.amount; 
  const env = findEnvById(fromId);
  if (env.budget - amount > -1) {
    envelopes[fromId].budget -= amount; 
    envelopes[toId].budget += amount; 
    res.send(envelopes); 
  }
  else {
    res.status(404).send(); 
  }
  
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`); 
})

