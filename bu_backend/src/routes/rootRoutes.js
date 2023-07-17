const router = require("express").Router();
const roots_controller = require("../controllers/bu.controller")

router.get("/get_all", (req, res) => {
    roots_controller.getAllRoots().then((response) => {
        res.json(response);
    }).catch((err) => {
        res.json(err)
    })
});
  
  
module.exports = router;