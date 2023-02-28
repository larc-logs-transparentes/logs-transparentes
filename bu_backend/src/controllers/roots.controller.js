const { modeloroot } = require("../models/root.model")

exports.findAllroot = () => {
    return modeloroot.find({}).then((data) => {
        return data
    })
};