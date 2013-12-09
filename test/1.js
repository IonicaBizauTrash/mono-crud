var Crud = require("../operations");

Crud.read({
    collection: "m_modules"
}, function (err, data) {
    console.log(err, data);
    process.exit();
});
