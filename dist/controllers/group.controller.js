'use strict';

var Group = require('../models/group.model.js');

function returnError(error, response) {
  response.status(500).send({
    message: error.message || 'An error occured!'
  });
}

function contentEmpty(content, response) {
  if (content) {
    return true;
  }
  return response.status(400).send({
    message: 'Group content cannot be empty'
  });
}

function groupNotFound(response) {
  return response.status(404).send({
    message: 'Group not found'
  });
}

function responseError(error, response) {
  if (error.kind === 'ObjectId') {
    return groupNotFound(response);
  }
  return returnError(error, response);
}

exports.create = function (request, response) {
  if (contentEmpty(request.body, response)) {
    return false;
  }

  var group = new Group({
    name: request.body.name
  });

  group.save().then(function (data) {
    response.send(data);
  }).catch(function (error) {
    return returnError(error, response);
  });
};

exports.findAll = function (request, response) {
  Group.find().then(function (groups) {
    response.send(groups);
  }).catch(function (error) {
    return returnError(error, response);
  });
};

exports.findOne = function (request, response) {
  Group.findById(request.params.groupId).then(function (group) {
    if (!group) {
      return groupNotFound(response);
    }
    response.send(group);
  }).catch(function (error) {
    if (error.kind === 'ObjectId') {
      return groupNotFound(response);
    }
    return returnError(error, response);
  });
};

exports.update = function (request, response) {
  if (contentEmpty(request.body, response)) {
    return false;
  }

  Group.findByIdAndUpdate(request.params.groupId, {
    name: request.body.name
  }, { new: true }).then(function (group) {
    if (!group) {
      return groupNotFound(response);
    }
    response.send(group);
  }).catch(function (error) {
    return responseError(response, error);
  });
};

exports.delete = function (request, response) {
  Group.findByIdAndRemove(request.params.groupId).then(function (group) {
    if (!group) {
      return groupNotFound(response);
    }
    response.send({ message: 'Group deleted successfully!' });
  }).catch(function (error) {
    return responseError(response, error);
  });
};