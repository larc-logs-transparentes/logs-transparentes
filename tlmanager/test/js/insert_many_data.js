const axios = require('axios');

const createTree = async (tree_name, commitment_size) => {
    return axios.post('http://localhost:8000/tree-create', {
        "tree_name": tree_name,
        "commitment_size": commitment_size
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
    })
}

const insertLeaf = (tree_name, data) => {
    return axios.post('http://localhost:8000/insert-leaf', {
        "tree_name": tree_name,
        "data": data
    }).then((res) => {
        //console.log(res.data);
    }).catch((err) => {
        //console.log(err);
    })
}

const commitTree = (tree_name) => {
    return axios.post('http://localhost:8000/tree/commit', {
        "tree_name": tree_name
    })
    .then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
    })
    
}

const main = async () => {
    const start = new Date().getTime();
    await createTree("tree1", 2048);
    const inserts = [];
    for (let i = 0; i < 1000; i++) {
        for (let j = 0; j < 1000; j++) {
            inserts.push(insertLeaf("tree1", "data" + i + j));
        }
        await Promise.all(inserts);
        inserts.length = 0;
    }
    await commitTree("tree1");
    const end = new Date().getTime();
    console.log("Time taken: ", end - start, "ms"); 
}

main();