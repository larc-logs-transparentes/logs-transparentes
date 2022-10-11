const router = require('express').Router()

router.post('/leaves', (req, res) => {
    console.log(req.body)
    return res.json(req.body)
})
  
module.exports = router