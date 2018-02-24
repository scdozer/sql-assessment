module.exports = {
  // Get all Users
  getUsers: (req, res, next) => {
    const dbInstance = req.app.get('db');

    dbInstance.get_users()
      .then(response => res.status(200).send(response))
      .catch(error => console.log(error))
  },


  // Get All Vehicles
  getVehicles: (req, res, next) => {
    const dbInstance = req.app.get('db');

    dbInstance.get_vehicles()
      .then(response => res.status(200).send(response))
      .catch(error => console.log(error))
  },

  // Add User
  addUser: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { name, email} = req.body;

    dbInstance.add_user({ name, email})
      .then(response => res.status(200).send(response))
      .catch(error => console.log(error))
  },


  // Add Vehicle
  addVehicle: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { make, model, year, owner_id} = req.body;

    dbInstance.add_vehicle({ make, model, year, owner_id})
      .then(response => res.status(200).send(response))
      .catch(error => console.log(error))
  },


  // Get Count of Give Users Vehicles
  vehicleCountById: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { userId } = req.params;
    dbInstance.vehicle_count({ userId })
      .then(response => res.status(200).send(response))
      .catch(error => console.log(error))
  },

  // Get Count of Given Users Vehicles
  vehiclesById: (req, res, next) => {
    const dbInstance = req.app.get('db');
    // console.log(req.params.userId);
    const { userId } = req.params;
    dbInstance.vehicles_by_id({ userId })
      .then(response => res.status(200).send(response))
      .catch(error => console.log(error))
  },


  // Get vehicles by email
  vehiclesByEmail: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { userEmail } = req.query;
    dbInstance.vehicles_by_email({ userEmail })
      .then(response => res.status(200).send(response))
      .catch(error => console.log(error))
  },


  // Get vehicles by email/letter query
  vehiclesByEmail: (req, res, next) => {
    const dbInstance = req.app.get('db');
    // console.log(req.query);
    if (req.query.userEmail){
      const { userEmail } = req.query;
      return dbInstance.vehicles_by_email({ userEmail })
        .then(response => res.status(200).send(response))
        .catch(error => console.log(error))
    } else if (req.query.userFirstStart){
      const { userFirstStart } = req.query;
      return dbInstance.vehicles_by_letter([ userFirstStart + '%'])
        .then(response => res.status(200).send(response))
        .catch(error => console.log(error))
    }
  },

  // Get vehicles by year
  vehiclesByYear: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance.vehicles_by_year()
      .then(response => res.status(200).send(response))
      .catch(error => console.log(error))
  },

  // Update owner
  updateOwner: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { userId, vehicleId } = req.params

    dbInstance.update_owner({userId, vehicleId})
      .then(response => res.status(200).send(response))
      .catch(error => console.log(error))
  },

  // Remove Owner
  removeOwner: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { vehicleId } = req.params

    dbInstance.remove_owner({ vehicleId })
      .then(response => res.status(200).send(response))
      .catch(error => console.log(error))
  },


  // Delete Vehicle
  deleteVehicle: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { vehicleId } = req.params

    dbInstance.delete_vehicle([ vehicleId ])
      .then(response => res.status(200).send(response))
      .catch(error => console.log(error))
  },



}
