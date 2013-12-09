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
            model(createCrudObject(crudObject), callback);
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
function createCrudObject (crudObj) {

    var crudRequest = {};

    // template id is mandatory
    if (!crudObj.t) {
        return null;
    }

    crudRequest = {
        role:       crudObj.role,
        options:    crudObj.options || {},
        templateId: crudObj.t;
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

function createResponseHandler (method, link) {
    return function(err, results, readCount) {
        if (err) {
            return link.send(err.statusCode || 500, err.message || err);
        }

        link.res.headers['content-type'] = 'application/json; charset=utf-8';


        // TODO How can this be fixed using a better way?
        var constructorNameOfResults = results.constructor.name;
        if (results && constructorNameOfResults === "Object" && typeof results.toArray === "function") {
            constructorNameOfResults = "Cursor"
        }

         // if we have an array or a cursor, set X-Mono-CRUD-Count response header
        if (["Cursor", "Array"].indexOf(constructorNameOfResults) !== -1) {
            link.res.headers['X-Mono-CRUD-Count'] = (readCount || 0).toString();
        }
 
        if (method === 'read' && constructorNameOfResults === 'Cursor') {

            // stream result
            var stream = results.stream();
            link.stream.start(200);

            stream.on('end', function() {
                link.stream.end();
            });
            stream.on('error', function(err) {
                link.stream.error(500, err.toString());
            });
            stream.on('data', function(data) {
                link.stream.data(data);
            });

        } else {
            link.send(200, results);
        }
    };
}
