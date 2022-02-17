const sha256 = require("./helper");

class Transaction {
	constructor(to, from, amount) {
		this.to = to;
		this.from = from;
		this.amount = amount;
		this.id = Transaction.getCount();
		this.hash = sha256(this.to + this.from + this.amount + this.id);
		Transaction.incrementCount();
	}

	static getCount() {

		return Transaction.count;
	}

	static incrementCount() {
		Transaction.count++;
	}

	getHash() {
		return sha256(this.to + this.from + this.amount + this.id);
	}

	toString() {
		return `
        to:${this.to}
        from:${this.from}
        amount:${this.amount}
        hash:${this.hash}
        id:${this.id}`;
	}
}

Transaction.count = 0;

module.exports = Transaction;