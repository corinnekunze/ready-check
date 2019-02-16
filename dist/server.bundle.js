/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/controllers/group.controller.js":
/*!****************************************************!*\
  !*** ./src/server/controllers/group.controller.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Group = __webpack_require__(/*! ../models/group.model.js */ "./src/server/models/group.model.js");

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

exports.create = (request, response) => {
  const group = new Group({
    name: request.body.name
  });
  group.save().then(data => {
    response.send(data);
  }).catch(error => returnError(error, response));
};

exports.findAll = (request, response) => {
  Group.find().then(groups => {
    response.send(groups);
  }).catch(error => returnError(error, response));
};

exports.findOne = (request, response) => {
  Group.findById(request.params.groupId).then(group => {
    if (!group) {
      return groupNotFound(response);
    }

    response.send(group);
  }).catch(error => {
    if (error.kind === 'ObjectId') {
      return groupNotFound(response);
    }

    return returnError(error, response);
  });
};

exports.update = (request, response) => {
  if (contentEmpty(request.body, response)) {
    return false;
  }

  Group.findByIdAndUpdate(request.params.groupId, {
    name: request.body.name
  }, {
    new: true
  }).then(group => {
    if (!group) {
      return groupNotFound(response);
    }

    response.send(group);
  }).catch(error => responseError(response, error));
};

exports.delete = (request, response) => {
  Group.findByIdAndRemove(request.params.groupId).then(group => {
    if (!group) {
      return groupNotFound(response);
    }

    response.send({
      message: 'Group deleted successfully!'
    });
  }).catch(error => responseError(response, error));
};

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const config = __webpack_require__(/*! config */ "config");

const express = __webpack_require__(/*! express */ "express");

const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");

__webpack_require__(/*! dotenv */ "dotenv").config();

const app = express();

const routes = __webpack_require__(/*! ./routes/router */ "./src/server/routes/router.js");

global.baseDir = __dirname;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/', routes);
app.use(express.static('dist'));
const webPort = config.get('port') || 8080;
const dbUrl = 'mongodb://localhost:27017/ready-check'; // const dbUrl = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}
//               @ready-check-bemau.mongodb.net/test?retryWrites=true`;

mongoose.connect(dbUrl, {
  useNewUrlParser: true
}).then(() => {
  app.listen(webPort, () => {
    console.log(`App listening on port ${webPort}.`);
  });
}).catch(error => {
  console.log(error);
});
module.exports = app;
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./src/server/models/group.model.js":
/*!******************************************!*\
  !*** ./src/server/models/group.model.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const GroupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  created_at: Date,
  updated_at: Date
});
module.exports = mongoose.model('Group', GroupSchema);

/***/ }),

/***/ "./src/server/routes/group.routes.js":
/*!*******************************************!*\
  !*** ./src/server/routes/group.routes.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const groups = __webpack_require__(/*! ../controllers/group.controller.js */ "./src/server/controllers/group.controller.js");

module.exports = app => {
  app.post('/groups', groups.create);
  app.get('/groups', groups.findAll);
  app.get('/groups/:groupId', groups.findOne);
  app.put('/groups/:groupId', groups.update);
  app.delete('/groups/:groupId', groups.delete);
};

/***/ }),

/***/ "./src/server/routes/router.js":
/*!*************************************!*\
  !*** ./src/server/routes/router.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const routes = __webpack_require__(/*! express */ "express").Router();

__webpack_require__(/*! ./group.routes.js */ "./src/server/routes/group.routes.js")(routes);

const path = __webpack_require__(/*! path */ "path");

routes.get('/', (request, response) => {
  response.sendFile(path.join(global.baseDir, '../../views/index.html'));
});
module.exports = routes;

/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./src/server/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/server/index.js */"./src/server/index.js");


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "config":
/*!*************************!*\
  !*** external "config" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("config");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=server.bundle.js.map