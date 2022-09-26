const db = require("../model");
const statusCode = require("../constants/statusCode");
const status = require("../constants/statusMessage");
const { GiveResponse } = require("../helpers/utility");
const Activity = db.Activity;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  Activity.findAll()
    .then(data => {
      res.send(GiveResponse(status.success, status.success, data));
    })
    .catch(err => {
      res.status(statusCode.internalServerError).send(GiveResponse(status.internalServerError, err.message));
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Activity.findByPk(id)
    .then(data => {
      if (data) {
        res.send(GiveResponse(status.success, status.success, data));
      } else {
        res.status(statusCode.notFound).send(GiveResponse(status.notFound, `Activity with ID ${id} Not Found`));
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

  const activity = {
    title: req.body.title,
    email: req.body.email
  };

  Activity.create(activity)
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

  const data = await Activity.findByPk(id)
  if (!data) {
    res.status(statusCode.notFound).send(GiveResponse(status.notFound, `Activity with ID ${id} Not Found`));
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

  const data = await Activity.findByPk(id)
  if (!data) {
    res.status(statusCode.notFound).send(GiveResponse(status.notFound, `Activity with ID ${id} Not Found`));
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