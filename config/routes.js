const routes = require('express').Router();
var activity = require('../repository/activity')
var todo = require('../repository/todo')

// Activity
const activityPath = 'activity-groups'
routes.get('/' + activityPath, activity.findAll);
routes.get('/' + activityPath + '/:id', activity.findOne);
routes.post('/' + activityPath, activity.create);
routes.patch('/' + activityPath + "/:id", activity.update);
routes.delete('/' + activityPath + "/:id", activity.delete);

// Todo
const todoPath = 'todo-items'
routes.get('/' + todoPath, todo.findAll);
routes.get('/' + todoPath + '/:id', todo.findOne);
routes.post('/' + todoPath, todo.create);
routes.patch('/' + todoPath + "/:id", todo.update);
routes.delete('/' + todoPath + "/:id", todo.delete);

module.exports = routes