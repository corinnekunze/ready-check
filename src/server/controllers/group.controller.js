const database = require('../database.js');
const Group = require('../models/group.model.js');


function returnError(error, response) {
  response.status(500).send({
    message: error.message || 'An error occured!',
  });
}

function contentEmpty(content, response) {
  if (content) { return true; }
  return response.status(400).send({
    message: 'Group content cannot be empty',
  });
}

function groupNotFound(response) {
  return response.status(404).send({
    message: 'Group not found',
  });
}

function responseError(error, response) {
  if (error.kind === 'ObjectId') { return groupNotFound(response); }
  return returnError(error, response);
}

exports.create = (request, response) => {
  const group = new Group({
    name: request.body.name,
  });
  group.save().then((data) => {
    response.send(data);
  }).catch(error => returnError(error, response));
};

exports.findAll = (request, response) => {
  Group.find().then((groups) => {
    response.send(groups);
  }).catch(error => returnError(error, response));
};

exports.findOne = (request, response) => {
  Group.findById(request.params.groupId).then((group) => {
    if (!group) { return groupNotFound(response); }
    response.send(group);
  }).catch((error) => {
    if (error.kind === 'ObjectId') { return groupNotFound(response); }
    return returnError(error, response);
  });
};

exports.update = (request, response) => {
  if (contentEmpty(request.body, response)) { return false; }

  Group.findByIdAndUpdate(request.params.groupId, {
    name: request.body.name,
  }, { new: true }).then((group) => {
    if (!group) { return groupNotFound(response); }
    response.send(group);
  }).catch((error => responseError(response, error)));
};

exports.delete = (request, response) => {
  Group.findByIdAndRemove(request.params.groupId).then((group) => {
    if (!group) { return groupNotFound(response); }
    response.send({ message: 'Group deleted successfully!' });
  }).catch(error => responseError(response, error));
};
