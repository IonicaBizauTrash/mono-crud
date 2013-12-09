if (typeof M === "undefined") {
    M = {
        on: function () {}
    };
}

var model = require('./model');
var METHODS = [
    'create',
    'read',
    'update',
    'delete'
];


for (var i in METHODS) {
    (function(method) {
        exports[method] = function (crudObject, callback) {
            model[method](createCrudRequest(crudObject), createCallback(callback));
        };
    })(METHODS[i]);
}

function createCrudRequest (crudObject) {
    crudObject = crudObject || {};
    return crudObject;
}

function createCallback (callback) {
    callback = callback || function () {};
    return callback;
}
