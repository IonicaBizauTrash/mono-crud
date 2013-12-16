var monoUser = "user"
  , monoPass = "1234"
  , monoDb   = "mono"

var templates = {
  "528f78dc197ef1c23714a04d": {
    "connectionStr": "mongodb://" + monoUser + ":" + monoPass + "@localhost:27017/" + monoDb,
    "collection": "m_applications"
  },
  "528f78f1197ef1c23714a04e": {
    "connectionStr": "mongodb://" + monoUser + ":" + monoPass + "@localhost:27017/" + monoDb,
    "collection": "m_modules",
  },
  "52923eb6ea5c6526b8870cde": {
    "connectionStr": "mongodb://" + monoUser + ":" + monoPass + "@localhost:27017/" + monoDb,
    "collection": "m_miids"
  },
  "528f7902197ef1c23714a04f": {
    "connectionStr": "mongodb://" + monoUser + ":" + monoPass + "@localhost:27017/" + monoDb,
    "collection": "m_roles"
  }
};

module.exports = templates;
