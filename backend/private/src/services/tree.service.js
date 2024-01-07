const tlmanager_adapter = require("../adapters/tlmanager.adapter");

exports.commitAllTree = async () => {
    const trees = await tlmanager_adapter.getTrees()['trees']

    for (const tree of trees) {
        console.info(`Commiting tree ${tree}`)
        const response = await tlmanager_adapter.commit(tree)
        console.info(response)
    }

    return {}
}
