const routes = require('express').Router();
var activity = require('../repository/activity')
const cache = require('../middleware/cache.js')
var todo = require('../repository/todo')

// Activity
const activityPath = 'activity-groups'
routes.get('/' + activityPath, cache(5), activity.findAll);
routes.get('/' + activityPath + '/:id', cache(10), activity.findOne);
routes.post('/' + activityPath, activity.create);
routes.patch('/' + activityPath + "/:id", activity.update);
routes.delete('/' + activityPath + "/:id", activity.delete);

// Todo
const todoPath = 'todo-items'
routes.get('/' + todoPath, cache(5), todo.findAll);
routes.get('/' + todoPath + '/:id', cache(10), todo.findOne);
routes.post('/' + todoPath, todo.create);
routes.patch('/' + todoPath + "/:id", todo.update);
routes.delete('/' + todoPath + "/:id", todo.delete);

module.exports = routes