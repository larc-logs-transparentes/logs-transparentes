const router = require("express").Router()
const tlmanager_adapter = require("../adapters/tlmanager.adapter")

/* TLManager routes */
router.get("/all-leaf-data", async (req, res) => {
    console.info(`[global_tree.controller] GET all-leaf-data`)
    
    const response = await tlmanager_adapter.getGlobalTreeAllLeafData()
    res.json(response)
})

module.exports = router