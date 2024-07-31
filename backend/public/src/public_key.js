const router = require("express").Router()
const tlmanager_adapter = require("../src/adapters/tlmanager.adapter")

router.get("", async (req, res) => {
    console.info(`[public_key] GET public_key`)
  
    const response = await tlmanager_adapter.get_public_key()
    res.json(response)
})
  
module.exports = router;


