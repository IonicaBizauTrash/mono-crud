var Crud = require("../operations");

Crud.read({
    query: {},
    t: "528f78dc197ef1c23714a04d"
}, function (err, data) {
    console.log(err, data);
    process.exit();
});
