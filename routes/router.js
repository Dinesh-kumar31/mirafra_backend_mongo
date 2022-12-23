const express = require('express');
const app = express.Router();
const apiService = require('../services/service')
const middleware = require('../middleware/auth')

app.post('/login', apiService.login);
app.get('/allEmployee',middleware.verifyToken, apiService.getAllEmployee);
app.post('/createEmployee',middleware.verifyToken, apiService.createEmployee);
app.put('/updateEmployee/:id',middleware.verifyToken, apiService.updateEmployee);
app.delete('/deleteEmployee/:id',middleware.verifyToken, apiService.deleteEmployee);
app.post('/addRatings',middleware.verifyToken, apiService.addRating);
app.get('/getRating/:empId',middleware.verifyToken, apiService.getRating);
app.put('/updateRating/:rateid',middleware.verifyToken, apiService.updateRatings);

module.exports = app