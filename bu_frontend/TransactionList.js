class TransactionList {
	constructor() {
		this.list = [];
	}

	add(transaction) {
		this.list.push(transaction);
	}
}

module.exports = TransactionList;