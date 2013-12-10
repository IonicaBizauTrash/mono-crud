var Crud = require("../operations");

Crud.read({
    query: {}
}, function (err, data) {
    console.log(err, data);
    process.exit();
});
