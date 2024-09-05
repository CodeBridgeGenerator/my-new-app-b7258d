const { CollegeDetails } = require('./collegeDetails.class');
const createModel = require('../../models/collegeDetails.model');
const hooks = require('./collegeDetails.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/collegeDetails', new CollegeDetails(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('collegeDetails');

  service.hooks(hooks);
};