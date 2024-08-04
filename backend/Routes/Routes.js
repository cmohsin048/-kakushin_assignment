const express = require('express');
const Router = express.Router();
const { registration, login } = require('../controler/Usercontroler');
const AuthenticateUser = require('../Middlewear/User');
const { createTask,getTasks,updateTask,deleteTask } = require('../controler/Taskcontroler');

Router.route('/register').post(registration);
Router.route('/login').post(login, AuthenticateUser);
Router.route('/tasks').post(createTask)
Router.route('/tasks').get(getTasks )
Router.route('/tasks/:id').patch(updateTask);
Router.route('/tasks/:id').delete(deleteTask);


module.exports = Router;
