const routes = require('express').Router();
var activity = require('../repository/activity')

// Activity
const activityPath = 'activity-groups'
routes.get('/' + activityPath, activity.findAll);
routes.get('/' + activityPath + '/:id', activity.findOne);
routes.post('/' + activityPath, activity.create);
routes.patch('/' + activityPath, activity.update);
routes.delete('/' + activityPath, activity.update);

// Todo
const todoPath = 'todo-items'
routes.get('/' + todoPath, activity.findAll);
routes.get('/' + todoPath + '/:id', activity.findOne);
routes.post('/' + todoPath, activity.create);
routes.patch('/' + todoPath, activity.update);
routes.delete('/' + todoPath, activity.update);

module.exports = routes