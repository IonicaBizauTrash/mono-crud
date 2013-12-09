var dbUrl = "mongodb://localhost:27017/app_52a357298eb3ce0b18000001";
var DATABASE;

// Mongo
var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient;
MongoClient.connect(dbUrl, function (err, db) {
    DATABASE = db;
});

module.exports = objToReturn = {
    // find
    read: function (options, callback) {

        debugger;
        // process options
        processOptions(options, [
            { key: "q",     defaultVal: {} },
            { key: "o",     defaultVal: {} },
            { key: "db",    defaultVal: "" }
        ]);

        if (!DATABASE) {
            setTimeout(function () {
                objToReturn.read(options, callback);
            }, 500);
            return;
        }

        // get collection
        var collection = DATABASE.collection(options.collection)

        // and finally, find
        collection.find(options.q, options.o).toArray(callback);
    },
    // create
    create: function (options, callback) {

        // process options
        processOptions(options, [
            { key: "d",     defaultVal: {} }
        ]);

        if (!DATABASE) {
            setTimeout(function () {
                objToReturn.create(options, callback);
            }, 500);
            return;
        }

        // get collection
        var collection = DATABASE.collection(options.collection)

        // and finally, insert something there
        collection.insert(options.d, callback);
    },
    // update
    update: function (options, callback) {

        // process options
        processOptions(options, [
            { key: "q",     defaultVal: {} },
            { key: "o",     defaultVal: {} },
            { key: "d",     defaultVal: {} }
        ]);

        if (!DATABASE) {
            setTimeout(function () {
                objToReturn.update(options, callback);
            }, 500);
            return;
        }

        // get collection
        var collection = database.collection(options.collection)

        // and finally, update something there
        collection.update(options.q, options.d, options.o, callback);
    },
    // remove
    delete: function (options, callback) {

        // process options
        processOptions(options, [
            { key: "q",     defaultVal: {} }
        ]);

        if (!DATABASE) {
            setTimeout(function () {
                objToReturn.delete(options, callback);
            }, 500);
            return;
        }

        // get collection
        var collection = database.collection(options.collection)

        // and finally, remove something
        collection.remove(options.q, callback);
    }
};

function processOptions (options, fields) {

    fields = fields || [];

    for (var i = 0; i < fields.length; ++i) {
        var cField = fields[i];
        var defaultVal = cField.defaultVal;
        var key = cField.key;

        options[key] = options[key] || defaultVal;
    }
}

