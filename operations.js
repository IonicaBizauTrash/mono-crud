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
        // operations
        exports[method] = function (crudObject, callback) {
            model(createCrudRequest(crudObject), createCallback(callback));
        };

        // listeners
        var serverEvent = 'crud.' + method;
        M.on(serverEvent, function (request, callback) {
 
            request.method = method;
            request.options = request.options || {};

            if (!callback) {
                callback = function(err) {
                    if (err) {
                        console.error('Error executing server operation: ' + serverEvent);
                        console.error('******************')
                        console.error(err);
                        console.error('------------------')
                        console.error(request);
                        console.error('******************')
                    }
                };
            }
            model(request, callback);
        });
    })(METHODS[i]);
}


// private functions
function createCrudRequest (crudObj) {

    var crudRequest = {};

    // template id is mandatory
    if (!crudObj.t) {
        return null;
    }

    crudRequest = {
        role:       crudObj.role,
        options:    crudObj.options || {},
        templateId: crudObj.t,
        method:     crudObj.method,
        session:    crudObj.session,
        noJoins:    crudObj.noJoins,
        query:      crudObj.q || {},
    };

    crudRequest.query._tp = crudObj.t;

    // update
    if (crudObj.d && crudObj.d.constructor.name === 'Object') {

        // set type
        if (crudObj.method === 'create') {
            crudObj.d._tp = crudObj.t;
        }

        crudRequest.data = crudObj.d;
    }

    // options
    if (crudObj.o && crudObj.o.constructor.name === 'Object') {
        crudRequest.options = data.o;
    } else {
        crudRequest.options = {};
    }

    return crudRequest;
}

function createCallback (callback) {
    callback = callback || function () {};
    return callback;
}
