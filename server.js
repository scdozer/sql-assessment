const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  massive = require('massive');

require('dotenv').config();

const mainCtrl = require('./mainCtrl');

const app = express();

app.use(bodyParser.json())
app.use(cors());

// You need to complete the information below to connect
// to the assessbox database on your postgres server.
massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db);

  // Initialize user table and vehicle table.
  db.init_tables.user_create_seed().then(response => {
    console.log('User table init');
    db.init_tables.vehicle_create_seed().then(response => {
      console.log('Vehicle table init');
    })
  })

})


// ===== Build enpoints below ============

app.get('/api/users', mainCtrl.getUsers)
app.get('/api/vehicles', mainCtrl.getVehicles)
app.post('/api/users', mainCtrl.addUser)
app.post('/api/vehicles', mainCtrl.addVehicle)
app.get('/api/user/:userId/vehiclecount', mainCtrl.vehicleCountById)
app.get('/api/user/:userId/vehicle', mainCtrl.vehiclesById)
app.get('/api/vehicle', mainCtrl.vehiclesByEmail)
app.get('/api/newervehiclesbyyear', mainCtrl.vehiclesByYear)
app.put('/api/vehicle/:vehicleId/user/:userId', mainCtrl.updateOwner)
app.delete('/api/user/:userId/vehicle/:vehicleId', mainCtrl.removeOwner)
app.delete('/api/vehicle/:vehicleId', mainCtrl.deleteVehicle)




// ===== Do not change port ===============
const port = 3000;
app.listen(port, () => {
  console.log('Listening on port: ', port);
})
