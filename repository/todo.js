const db = require("../model");
const statusCode = require("../constants/statusCode");
const status = require("../constants/statusMessage");
const { GiveResponse } = require("../helpers/utility");
const Todo = db.Todo;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  const query = {}
  const { activity_group_id } = req.query
  if (activity_group_id) {
    query[where] = {
      activity_group_id: activity_group_id
    }
  }
  Todo.findAll(query)
    .then(data => {
      res.send(GiveResponse(status.success, status.success, data));
    })
    .catch(err => {
      res.status(statusCode.internalServerError).send(GiveResponse(status.internalServerError, err.message));
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Todo.findByPk(id)
    .then(data => {
      if (data) {
        res.send(GiveResponse(status.success, status.success, data));
      } else {
        res.status(statusCode.notFound).send(GiveResponse(status.notFound, `Todo with ID ${id} Not Found`));
      }
    })
    .catch(err => {
      res.status(statusCode.internalServerError).send(GiveResponse(status.internalServerError, "Error retrieving data with id=" + id));
    });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(statusCode.badRequest).send(GiveResponse(status.badRequest, "title cannot be null"));
    return;
  }
  if (!req.body.activity_group_id) {
    res.status(statusCode.badRequest).send(GiveResponse(status.badRequest, "activity group cannot be null"));
    return;
  }

  const todo = {
    title: req.body.title,
    activity_group_id: req.body.activity_group_id,
    is_active: true,
    priority: req.body.priority ?? "very-high"
  };

  Todo.create(todo)
    .then(data => {
      res.send(GiveResponse(status.success, status.success, data));
    })
    .catch(err => {
      res.status(statusCode.internalServerError).send(GiveResponse(status.internalServerError, "Error retrieving data with id=" + id));
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  if (!req.body.title) {
    res.status(statusCode.badRequest).send(GiveResponse(status.badRequest, "title cannot be null"));
    return
  }

  const data = await Todo.findByPk(id)
  if (!data) {
    res.status(statusCode.notFound).send(GiveResponse(status.notFound, `Todo with ID ${id} Not Found`));
    return
  }

  data.update(Object.assign(req.body, { updatedAt: Date() })).then(result => {
      res.send(GiveResponse(status.success, status.success, result));
    })
    .catch(err => {
      res.status(statusCode.internalServerError).send(GiveResponse(status.internalServerError, "Error retrieving data with id=" + id));
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  const data = await Todo.findByPk(id)
  if (!data) {
    res.status(statusCode.notFound).send(GiveResponse(status.notFound, `Todo with ID ${id} Not Found`));
    return
  }

  data.destroy()
    .then(() => {
      res.send(GiveResponse(status.success, status.success));
    })
    .catch(err => {
      res.status(statusCode.internalServerError).send(GiveResponse(status.internalServerError, "Error retrieving data with id=" + id));
    });
};