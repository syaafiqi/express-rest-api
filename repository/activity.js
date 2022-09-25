const db = require("../model");
const Activity = db.Activity;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  Activity.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Activity.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find data with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving data with id=" + id
      });
    });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Title can not be empty!"
    });
    return;
  }

  const activity = {
    title: req.body.title,
    email: req.body.email
  };

  Activity.create(activity)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the data."
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Activity.update(req.body, {
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        res.send({
          message: "Data was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Data with id=${id}. Maybe Data was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Data with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Activity.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Data was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Data with id=${id}. Maybe Data was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Data with id=" + id
      });
    });
};