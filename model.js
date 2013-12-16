// Mongo
var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient;
var Templates = require("./templates");

module.exports = objToReturn = {
    // find
    read: function (options, callback) {

        // process options
        processOptions(options, [
            { key: "q",     defaultVal: {} },
            { key: "o",     defaultVal: {} },
            { key: "t",     defaultVal: "" }
        ]);

        getCollectionFromTemplate (options.t, function (err, collection) {
        
            if (err) { return callback (err); }
            
            // and finally, find
            collection.find(options.q, options.o).toArray(callback);
        });
    },
    // create
    create: function (options, callback) {

        // process options
        processOptions(options, [
            { key: "d",     defaultVal: {} },
            { key: "t",     defaultVal: "" }
        ]);

        getCollectionFromTemplate (options.t, function (err, collection) {
        
            if (err) { return callback (err); }
        
            // and finally, insert something there
            collection.insert(options.d, callback);
        });
    },
    // update
    update: function (options, callback) {

        // process options
        processOptions(options, [
            { key: "q",     defaultVal: {} },
            { key: "o",     defaultVal: {} },
            { key: "d",     defaultVal: {} },
            { key: "t",     defaultVal: "" }
        ]);

        getCollectionFromTemplate (options.t, function (err, collection) {
        
            if (err) { return callback (err); }
        
            // and finally, update something there
            collection.update(options.q, options.d, options.o, callback);
        });
    },
    // remove
    delete: function (options, callback) {

        // process options
        processOptions(options, [
            { key: "q",     defaultVal: {} },
            { key: "t",     defaultVal: "" }
        ]);

        getCollectionFromTemplate (options.t, function (err, collection) {
        
            if (err) { return callback (err); }
        
            // and finally, remove something
            collection.remove(options.q, callback);
        });
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

var dbCache = {};
function getCollectionFromTemplate (templateId, callback) {
    
    if (!templateId) {
        return callback("Template id not provided.");
    }

    if (dbCache[templateId]) {
        return callback(null, dbCache[templateId]);
    }

    if (typeof templateId._id === "string") {
        templateId = templateId._id;
    }

    var templObject = Templates[templateId];
    
    if (templateId.constructor.name === "Object") {
        templObject = templateId;
    }

    if (!templObject) {
        return callback ("Template not found.");
    }

    if (typeof templObject.connectionStr !== "string" || templObject.connectionStr === "") {
        return callback ("connectionStrnig must be a non empty string.");
    }

    console.log(templObject);
    MongoClient.connect(templObject.connectionStr, function (err, db) {

        if (err) { return callback (err); }
        
        var col = dbCache[templateId] = db.collection(templObject.collection);

        callback(null, col);
    });
}
