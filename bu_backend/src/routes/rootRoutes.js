const router = require("express").Router();
const roots_controller = require("../controllers/roots.controller")

router.get("/get_all", (req, res) => {
    console.log("/root/")
    roots_controller.findAllroot().then((response) => {
        res.json(response);
    }).catch((err) => {
        console.log(err);
        res.json(err)
    })
});
  
module.exports = router;