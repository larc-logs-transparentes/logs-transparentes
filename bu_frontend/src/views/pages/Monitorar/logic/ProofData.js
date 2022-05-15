export default class ProofData {
    constructor() {
        this.consistencyProofData = {
            raizAssinada: null,
            BUsAdicionados: [],
            cont: 0,
            ultimo: false,
        }        
    }

    getProofData() {
        return this.consistencyProofData
    }

    setProofData(newProofData) {
        this.consistencyProofData = newProofData
    }
}