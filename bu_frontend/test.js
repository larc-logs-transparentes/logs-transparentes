// TODO: Add comments

const MerkelTree = require("./MerkelTree");
const TransactionList = require("./TransactionList");
const Transaction = require("./Transaction");
const util = require("util");

let transactionList = new TransactionList();

for (let index = 0; index < 5; index++) {
	transactionList.add(new Transaction(Math.random(), Math.random(), Math.random()));
}

const tree = new MerkelTree();

tree.createTree(transactionList.list);
console.log(util.inspect(tree, false, null, true /* enable colors */));
tree.verify(transactionList.list[2]);

// Lets tamper the data

transactionList.list[2].to = "shoveit";
console.log(util.inspect(transactionList, false, null, true /* enable colors */));
tree.verify(transactionList.list[2]);