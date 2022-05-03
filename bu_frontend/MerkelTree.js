const sha256 = require("./helper");
const util = require("util");

//TODO: Add comments

class MerkelTree {
	constructor() {
		this.root = [];
	}
	/**
	 * Takes a list of transaction as input and
	 * @param {TransactionList} transactionList
	 */
	createTree(transactionList) {
		this.root.unshift(transactionList);
		this.root.unshift(transactionList.map(t => t.hash));

		while (this.root[0].length > 1) {
			let temp = [];

			for (let index = 0; index < this.root[0].length; index += 2) {
				if (index < this.root[0].length - 1 && index % 2 == 0)
					temp.push(sha256(this.root[0][index] + this.root[0][index + 1]));
				else temp.push(this.root[0][index]);
			}
			this.root.unshift(temp);
		}
	}

	verify(transaction) {
		let position = this.root.slice(-1)[0].findIndex(t => t.hash == transaction.hash);
		console.log(position);
		if (position) {

			let verifyHash = transaction.getHash();

			for (let index = this.root.length - 2; index > 0; index--) {

				let neighbour = null;
				if (position % 2 == 0) {
					neighbour = this.root[index][position + 1];
					position = Math.floor((position) / 2)
					verifyHash = sha256(verifyHash + neighbour);
				}
				else {
					neighbour = this.root[index][position - 1];
					position = Math.floor((position - 1) / 2)
					verifyHash = sha256(neighbour + verifyHash);
				}

			}
			console.log(verifyHash == this.root[0][0] ? "Valid" : "Not Valid");
		}
		else {
			console.log("Data not found with the id");

		}
	}
}

module.exports = MerkelTree;