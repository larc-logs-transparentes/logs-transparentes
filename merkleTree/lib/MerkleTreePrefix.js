"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkleTreePrefix = void 0;
const buffer = require("buffer");
const sha256 = __importDefault(require("crypto-js/sha256"));
const treeify = __importDefault(require("treeify"));
const Base = __importDefault(require("./Base"));
const _ = require('lodash');
// TODO: Clean up and DRY up code
// Disclaimer: The multiproof code is unaudited and may possibly contain serious issues. It's in a hacky state as is and it's begging for a rewrite!
const SHA256F = require('crypto-js/sha256');
/**
 * Class reprensenting a Merkle Tree
 * @namespace MerkleTreePrefix
 */
class MerkleTreePrefix extends Base.default {
    /**
     * @desc Constructs a Merkle Tree.
     * All nodes and leaves are stored as Buffers.
     * Lonely leaf nodes are promoted to the next level up without being hashed again.
     * @param {Buffer[]} leaves - Array of hashed leaves. Each leaf must be a Buffer.
     * @param {Function} hashFunction - Hash function to use for hashing leaves and nodes
     * @param {Object} options - Additional options
     * @example
     *```js
     *const MerkleTreePrefix = require('merkletreePrefixjs')
     *const crypto = require('crypto')
     *
     *function sha256(data) {
     *  // returns Buffer
     *  return crypto.createHash('sha256').update(data).digest()
     *}
     *
     *const leaves = ['a', 'b', 'c'].map(value => keccak(value))
     *
     *const tree = new MerkleTreePrefix(leaves, sha256)
     *```
     */
    constructor(leaves, hashFn = sha256.default, options = {}) {
        super();
        this.duplicateOdd = false;
        this.hashLeaves = false;
        this.isBitcoinTree = false;
        this.leaves = [];
        this.layers = [];
        this.sortLeaves = false;
        this.sortPairs = false;
        this.sort = false;
        this.fillDefaultHash = null;
        this.isBitcoinTree = !!options.isBitcoinTree;
        this.hashLeaves = !!options.hashLeaves;
        this.sortLeaves = !!options.sortLeaves;
        this.sortPairs = !!options.sortPairs;
        this.fillDefaultHash = options.fillDefaultHash;
        /*if (options.fillDefaultHash) {
          if (typeof options.fillDefaultHash === 'function') {
            this.fillDefaultHash = options.fillDefaultHash
          } else if (Buffer.isBuffer(options.fillDefaultHash) || typeof options.fillDefaultHash === 'string') {
            this.fillDefaultHash = (idx?: number, hashFn?: THashFn):THashFnResult => options.fillDefaultHash as THashFnResult
          } else {
            throw new Error('method "fillDefaultHash" must be a function, Buffer, or string')
          }
        }*/
        this.sort = !!options.sort;
        if (this.sort) {
            this.sortLeaves = true;
            this.sortPairs = true;
        }
        this.duplicateOdd = !!options.duplicateOdd;
        this.hashFn = this.bufferifyFn(hashFn);
        this.processLeaves(leaves);
    }
    hashFnPref(leaf) {
        leaf.leaf = this.hashFn(leaf.leaf);
        return leaf;
    }
    processLeaves(leaves) {
        if (this.hashLeaves) {
            leaves = leaves.map(this.hashFnPref);
        }
        this.leaves = leaves.map((leaf) => ({ leaf: this.bufferify(leaf.leaf), vote: leaf.vote }));
        if (this.fillDefaultHash) {
            for (let i = 0; i < Math.pow(2, Math.ceil(Math.log2(this.leaves.length))); i++)
                if (i >= this.leaves.length) {
                    const emptyl = SHA256F("");
                    const emptyMap = new Array();
                    const emptyLeaf = { leaf: this.bufferify(emptyl), vote: emptyMap };
                    this.leaves.push(emptyLeaf);
                }
        }
        this.layers = [this.leaves];
        this._createHashes(this.leaves);
    }
    _createHashes(nodes) {
        while (nodes.length > 1) {
            const layerIndex = this.layers.length;
            this.layers.push([]);
            for (let i = 0; i < nodes.length; i += 2) {
                const left = nodes[i];
                const right = i + 1 === nodes.length ? left : nodes[i + 1];
                const newLeaf = this.parentOf(left, right);
                this.layers[layerIndex].push(newLeaf);
            }
            nodes = this.layers[layerIndex];
        }
    }
    parentOf(leftNode, rightNode) {
        let parentVote = _.cloneDeep(leftNode.vote).concat(_.cloneDeep(rightNode.vote));
        parentVote = parentVote.filter((item, i) => {
            const index = parentVote.findIndex((x) => x[0] === item[0]);
            if (index === i)
                return true;
            else
                parentVote[index][1] += item[1];
            return false;
        });
        const parentHash = this.hashFn(buffer.Buffer.concat([this.hashFn(parentVote.toString()), leftNode.leaf, rightNode.leaf], 3));
        return {
            leaf: parentHash,
            vote: parentVote
        };
    }
    /**
     * addLeaf
     * @desc Adds a leaf to the tree and re-calculates layers.
     * @param {String|Buffer} - Leaf
     * @param {Boolean} - Set to true if the leaf should be hashed before being added to tree.
     * @example
     *```js
     *tree.addLeaf(newLeaf)
     *```
     */
    addLeaf(leaf, shouldHash = false) {
        if (shouldHash) {
            leaf.leaf = this.hashFn(leaf.leaf);
        }
        this.processLeaves(this.leaves.concat(leaf));
    }
    /**
     * addLeaves
     * @desc Adds multiple leaves to the tree and re-calculates layers.
     * @param {String[]|Buffer[]} - Array of leaves
     * @param {Boolean} - Set to true if the leaves should be hashed before being added to tree.
     * @example
     *```js
     *tree.addLeaves(newLeaves)
     *```
     */
    addLeaves(leaves, shouldHash = false) {
        if (shouldHash) {
            leaves = leaves.map(this.hashFnPref);
        }
        this.processLeaves(this.leaves.concat(leaves));
    }
    /**
     * getLeaves
     * @desc Returns array of leaves of Merkle Tree.
     * @return {Buffer[]}
     * @example
     *```js
     *const leaves = tree.getLeaves()
     *```
     */
    /*TODO getLeaves (values?: any[]):Buffer[] {
     if (Array.isArray(values)) {
       if (this.hashLeaves) {
         values = values.map(this.hashFn)
         if (this.sortLeaves) {
           values = values.sort(Buffer.compare)
         }
       }
 
       return this.leaves.filter(leaf => this._bufferIndexOf(values, leaf) !== -1)
     }
 
     return this.leaves
   }
   */
    /**
     * getLeaf
     * @desc Returns the leaf at the given index.
     * @param {Number} - Index number
     * @return {Buffer}
     * @example
     *```js
     *const leaf = tree.getLeaf(1)
     *```
     */
    getLeaf(index) {
        if (index < 0 || index > this.leaves.length - 1) {
            return {
                leaf: buffer.Buffer.from([]),
                vote: null
            };
        }
        return this.leaves[index];
    }
    /**
     * getNode
     * @desc Returns the node at the given index.
     * @param {Number} - Index number
     * @param {Number} - Depth number
     * @return {Buffer}
     */
    getNode(index, depth) {
        if (index < 0 || index > this.leaves.length - 1) {
            return {
                leaf: buffer.Buffer.from([]),
                vote: null
            };
        }
        return this.layers[depth][index];
    }
    /**
     * getLeafIndex
     * @desc Returns the index of the given leaf, or -1 if the leaf is not found.
     * @param {String|Buffer} - Target leaf
     * @return {number}
     * @example
     *```js
     *const leaf = Buffer.from('abc')
     *const index = tree.getLeafIndex(leaf)
     *```
     */
    /*TODO/ getLeafIndex (target: TLeaf):number {
     target = this.bufferify(target)
     const leaves = this.getLeaves()
     for (let i = 0; i < leaves.length; i++) {
       const leaf = leaves[i]
       if (leaf.equals(target)) {
         return i
       }
     }
 
     return -1
   }
   */
    /**
     * getLeafCount
     * @desc Returns the total number of leaves.
     * @return {number}
     * @example
     *```js
     *const count = tree.getLeafCount()
     *```
     */
    getLeafCount() {
        return this.leaves.length;
    }
    /**
     * getHexLeaves
     * @desc Returns array of leaves of Merkle Tree as hex strings.
     * @return {String[]}
     * @example
     *```js
     *const leaves = tree.getHexLeaves()
     *```
     */
    getHexLeaves() {
        return this.leaves.map(l => ({
            leaf: this.bufferToHex(l.leaf),
            vote: JSON.stringify(l.vote)
        }));
    }
    /**
     * marshalLeaves
     * @desc Returns array of leaves of Merkle Tree as a JSON string.
     * @param {String[]|Buffer[]} - Merkle tree leaves
     * @return {String} - List of leaves as JSON string
     * @example
     *```js
     *const jsonStr = MerkleTreePrefix.marshalLeaves(leaves)
     *```
     */
    static marshalLeaves(leaves) {
        return JSON.stringify(leaves.map(leaf => MerkleTreePrefix.bufferToHex(leaf)), null, 2);
    }
    /**
     * unmarshalLeaves
     * @desc Returns array of leaves of Merkle Tree as a Buffers.
     * @param {String|Object} - JSON stringified leaves
     * @return {Buffer[]} - Unmarshalled list of leaves
     * @example
     *```js
     *const leaves = MerkleTreePrefix.unmarshalLeaves(jsonStr)
     *```
     */
    static unmarshalLeaves(jsonStr) {
        let parsed = null;
        if (typeof jsonStr === 'string') {
            parsed = JSON.parse(jsonStr);
        }
        else if (jsonStr instanceof Object) {
            parsed = jsonStr;
        }
        else {
            throw new Error('Expected type of string or object');
        }
        if (!parsed) {
            return [];
        }
        if (!Array.isArray(parsed)) {
            throw new Error('Expected JSON string to be array');
        }
        return parsed.map(MerkleTreePrefix.bufferify);
    }
    /**
     * getLayers
     * @desc Returns multi-dimensional array of all layers of Merkle Tree, including leaves and root.
     * @return {Buffer[]}
     * @example
     *```js
     *const layers = tree.getLayers()
     *```
     */
    getLayers() {
        return this.layers;
    }
    /**
     * getHexLayers
     * @desc Returns multi-dimensional array of all layers of Merkle Tree, including leaves and root as hex strings.
     * @return {String[]}
     * @example
     *```js
     *const layers = tree.getHexLayers()
     *```
     */
    getHexLayers() {
        return this.layers.reduce((acc, item) => {
            if (Array.isArray(item)) {
                acc.push(item.map(layer => this.bufferToHex(layer)));
            }
            else {
                acc.push(item);
            }
            return acc;
        }, []);
    }
    /**
     * getLayersFlat
     * @desc Returns single flat array of all layers of Merkle Tree, including leaves and root.
     * @return {Buffer[]}
     * @example
     *```js
     *const layers = tree.getLayersFlat()
     *```
     */
    getLayersFlat() {
        const layers = this.layers.reduce((acc, item) => {
            if (Array.isArray(item)) {
                acc.unshift(...item);
            }
            else {
                acc.unshift(item);
            }
            return acc;
        }, []);
        layers.unshift(buffer.Buffer.from([0]));
        return layers;
    }
    /**
     * getHexLayersFlat
     * @desc Returns single flat array of all layers of Merkle Tree, including leaves and root as hex string.
     * @return {String[]}
     * @example
     *```js
     *const layers = tree.getHexLayersFlat()
     *```
     */
    getHexLayersFlat() {
        return this.getLayersFlat().map(layer => this.bufferToHex(layer));
    }
    /**
     * getLayerCount
     * @desc Returns the total number of layers.
     * @return {number}
     * @example
     *```js
     *const count = tree.getLayerCount()
     *```
     */
    getLayerCount() {
        return this.getLayers().length;
    }
    /**
     * getRoot
     * @desc Returns the Merkle root hash as a Buffer.
     * @return {Buffer}
     * @example
     *```js
     *const root = tree.getRoot()
     *```
     */
    getRoot() {
        if (this.layers.length === 0)
            return {
                leaf: buffer.Buffer.from([]),
                vote: []
            };
        return this.layers[this.layers.length - 1][0];
    }
    /**
     * getHexRoot
     * @desc Returns the Merkle root hash as a hex string.
     * @return {String}
     * @example
     *```js
     *const root = tree.getHexRoot()
     *```
     */
    getHexRoot() {
        return {
            leaf: this.bufferToHex(this.getRoot().leaf),
            vote: this.getRoot().vote
        };
    }
    /**
     * getProof
     * @desc Returns the proof for a target leaf.
     * @param {Buffer} leaf - Target leaf
     * @param {Number} [index] - Target leaf index in leaves array.
     * Use if there are leaves containing duplicate data in order to distinguish it.
     * @return {Object[]} - Array of objects containing a position property of type string
     * with values of 'left' or 'right' and a data property of type Buffer.
     * @example
     * ```js
     *const proof = tree.getProof(leaves[2])
     *```
     *
     * @example
     *```js
     *const leaves = ['a', 'b', 'a'].map(value => keccak(value))
     *const tree = new MerkleTreePrefix(leaves, keccak)
     *const proof = tree.getProof(leaves[2], 2)
     *```
     */
    // TODO
    getProof(leaf, index, depth) {
        const proof = [];
        if (!Number.isInteger(index) && typeof depth === 'undefined') {
            index = -1;
            depth = 0;
            if (!buffer.Buffer.isBuffer(leaf.leaf))
                leaf.leaf = this.bufferify(leaf.leaf);
            for (let i = 0; i < this.leaves.length; i++) {
                if (buffer.Buffer.compare(leaf.leaf, this.leaves[i].leaf) === 0) {
                    index = i;
                }
            }
        }
        if (index <= -1) {
            return [];
        }
        for (let i = depth; i < this.layers.length; i++) {
            const layer = this.layers[i];
            const isRightNode = index % 2;
            const pairIndex = (isRightNode ? index - 1
                : this.isBitcoinTree && index === layer.length - 1 && i < this.layers.length - 1
                    // Proof Generation for Bitcoin Trees
                    ? index
                    // Proof Generation for Non-Bitcoin Trees
                    : index + 1);
            if (pairIndex < layer.length) {
                proof.push({
                    position: isRightNode ? 'left' : 'right',
                    data: layer[pairIndex]
                });
            }
            // set index to parent index
            index = (index / 2) | 0;
        }
        return proof;
    }
    /**
     * getHexProof
     * @desc Returns the proof for a target leaf as hex strings.
     * @param {Buffer} leaf - Target leaf
     * @param {Number} [index] - Target leaf index in leaves array.
     * Use if there are leaves containing duplicate data in order to distinguish it.
     * @return {String[]} - Proof array as hex strings.
     * @example
     * ```js
     *const proof = tree.getHexProof(leaves[2])
     *```
     */
    /*/TODO
   getHexProof (leaf: Buffer | string, index?: number):string[] {
     return this.getProof(leaf, index).map(item => this.bufferToHex(item.data))
   }
   */
    /**
    * getPositionalHexProof
    * @desc Returns the proof for a target leaf as hex strings and the position in binary (left == 0).
    * @param {Buffer} leaf - Target leaf
    * @param {Number} [index] - Target leaf index in leaves array.
    * Use if there are leaves containing duplicate data in order to distinguish it.
    * @return {(string | number)[][]} - Proof array as hex strings. position at index 0
    * @example
    * ```js
    *const proof = tree.getPositionalHexProof(leaves[2])
    *```
    */
    /* TODO
    getPositionalHexProof (leaf: Buffer | string, index?: number): (string | number)[][] {
      return this.getProof(leaf, index).map(item => {
        return [
          item.position === 'left' ? 0 : 1,
          this.bufferToHex(item.data)
        ]
      })
    }
    */
    /**
     * marshalProof
     * @desc Returns proof array as JSON string.
     * @param {String[]|Object[]} proof - Merkle tree proof array
     * @return {String} - Proof array as JSON string.
     * @example
     * ```js
     *const jsonStr = MerkleTreePrefix.marshalProof(proof)
     *```
     */
    static marshalProof(proof) {
        const json = proof.map(item => {
            if (typeof item === 'string') {
                return item;
            }
            if (buffer.Buffer.isBuffer(item)) {
                return MerkleTreePrefix.bufferToHex(item);
            }
            return {
                position: item.position,
                data: MerkleTreePrefix.bufferToHex(item.data)
            };
        });
        return JSON.stringify(json, null, 2);
    }
    /**
     * unmarshalProof
     * @desc Returns the proof for a target leaf as a list of Buffers.
     * @param {String|Object} - Merkle tree leaves
     * @return {String|Object} - Marshalled proof
     * @example
     * ```js
     *const proof = MerkleTreePrefix.unmarshalProof(jsonStr)
     *```
     */
    static unmarshalProof(jsonStr) {
        let parsed = null;
        if (typeof jsonStr === 'string') {
            parsed = JSON.parse(jsonStr);
        }
        else if (jsonStr instanceof Object) {
            parsed = jsonStr;
        }
        else {
            throw new Error('Expected type of string or object');
        }
        if (!parsed) {
            return [];
        }
        if (!Array.isArray(parsed)) {
            throw new Error('Expected JSON string to be array');
        }
        return parsed.map(item => {
            if (typeof item === 'string') {
                return MerkleTreePrefix.bufferify(item);
            }
            else if (item instanceof Object) {
                return {
                    position: item.position,
                    data: MerkleTreePrefix.bufferify(item.data)
                };
            }
            else {
                throw new Error('Expected item to be of type string or object');
            }
        });
    }
    /**
     * getProofIndices
     * @desc Returns the proof indices for given tree indices.
     * @param {Number[]} treeIndices - Tree indices
     * @param {Number} depth - Tree depth; number of layers.
     * @return {Number[]} - Proof indices
     * @example
     * ```js
     *const proofIndices = tree.getProofIndices([2,5,6], 4)
     *console.log(proofIndices) // [ 23, 20, 19, 8, 3 ]
     *```
     */
    getProofIndices(treeIndices, depth) {
        const leafCount = Math.pow(2, depth);
        let maximalIndices = new Set();
        for (const index of treeIndices) {
            let x = leafCount + index;
            while (x > 1) {
                maximalIndices.add(x ^ 1);
                x = (x / 2) | 0;
            }
        }
        const a = treeIndices.map(index => leafCount + index);
        const b = Array.from(maximalIndices).sort((a, b) => a - b).reverse();
        maximalIndices = a.concat(b);
        const redundantIndices = new Set();
        const proof = [];
        for (let index of maximalIndices) {
            if (!redundantIndices.has(index)) {
                proof.push(index);
                while (index > 1) {
                    redundantIndices.add(index);
                    if (!redundantIndices.has(index ^ 1))
                        break;
                    index = (index / 2) | 0;
                }
            }
        }
        return proof.filter(index => {
            return !treeIndices.includes(index - leafCount);
        });
    }
    getProofIndicesForUnevenTree(sortedLeafIndices, leavesCount) {
        const depth = Math.ceil(Math.log2(leavesCount));
        const unevenLayers = [];
        for (let index = 0; index < depth; index++) {
            const unevenLayer = leavesCount % 2 !== 0;
            if (unevenLayer) {
                unevenLayers.push({ index, leavesCount });
            }
            leavesCount = Math.ceil(leavesCount / 2);
        }
        const proofIndices = [];
        let layerNodes = sortedLeafIndices;
        for (let layerIndex = 0; layerIndex < depth; layerIndex++) {
            const siblingIndices = layerNodes.map((index) => {
                if (index % 2 === 0) {
                    return index + 1;
                }
                return index - 1;
            });
            let proofNodeIndices = siblingIndices.filter((index) => !layerNodes.includes(index));
            const unevenLayer = unevenLayers.find(({ index }) => index === layerIndex);
            if (unevenLayer && layerNodes.includes(unevenLayer.leavesCount - 1)) {
                proofNodeIndices = proofNodeIndices.slice(0, -1);
            }
            proofIndices.push(proofNodeIndices);
            layerNodes = [...new Set(layerNodes.map((index) => {
                    if (index % 2 === 0) {
                        return index / 2;
                    }
                    if (index % 2 === 0) {
                        return (index + 1) / 2;
                    }
                    return (index - 1) / 2;
                }))];
        }
        return proofIndices;
    }
    /**
     * getMultiProof
     * @desc Returns the multiproof for given tree indices.
     * @param {Number[]} indices - Tree indices.
     * @return {Buffer[]} - Multiproofs
     * @example
     * ```js
     *const indices = [2, 5, 6]
     *const proof = tree.getMultiProof(indices)
     *```
     */
    /*
   getMultiProof (tree?: any[], indices?: any[]):Buffer[] {
     if (!indices) {
       indices = tree
       tree = this.getLayersFlat()
     }
 
     const isUneven = this.isUnevenTree()
     if (isUneven) {
       if (indices.every(Number.isInteger)) {
         return this.getMultiProofForUnevenTree(indices)
       }
     }
 
     if (!indices.every(Number.isInteger)) {
       let els = indices
       if (this.sortPairs) {
         els = els.sort(Buffer.compare)
       }
 
       let ids = els.map((el) => this._bufferIndexOf(this.leaves, el)).sort((a, b) => a === b ? 0 : a > b ? 1 : -1)
       if (!ids.every((idx) => idx !== -1)) {
         throw new Error('Element does not exist in Merkle tree')
       }
 
       const hashes = []
       const proof = []
       let nextIds = []
 
       for (let i = 0; i < this.layers.length; i++) {
         const layer = this.layers[i]
         for (let j = 0; j < ids.length; j++) {
           const idx = ids[j]
           const pairElement = this._getPairNode(layer, idx)
 
           hashes.push(layer[idx])
           if (pairElement) {
             proof.push(pairElement)
           }
 
           nextIds.push((idx / 2) | 0)
         }
 
         ids = nextIds.filter((value, i, self) => self.indexOf(value) === i)
         nextIds = []
       }
 
       return proof.filter((value) => !hashes.includes(value))
     }
 
     return this.getProofIndices(indices, this._log2((tree.length / 2) | 0)).map(index => tree[index])
   }
 
   private getMultiProofForUnevenTree (tree?: any[], indices?: any[]):Buffer[] {
     if (!indices) {
       indices = tree
       tree = this.getLayers()
     }
 
     let proofHashes : Buffer[] = []
     let currentLayerIndices: number[] = indices
     for (const treeLayer of tree) {
       const siblings: Buffer[] = []
       for (const index of currentLayerIndices) {
         if (index % 2 === 0) {
           const idx = index + 1
           if (!currentLayerIndices.includes(idx)) {
             if (treeLayer[idx]) {
               siblings.push(treeLayer[idx])
               continue
             }
           }
         }
         const idx = index - 1
         if (!currentLayerIndices.includes(idx)) {
           if (treeLayer[idx]) {
             siblings.push(treeLayer[idx])
             continue
           }
         }
       }
 
       proofHashes = proofHashes.concat(siblings)
       const uniqueIndices = new Set<number>()
 
       for (const index of currentLayerIndices) {
         if (index % 2 === 0) {
           uniqueIndices.add(index / 2)
           continue
         }
 
         if (index % 2 === 0) {
           uniqueIndices.add((index + 1) / 2)
           continue
         }
 
         uniqueIndices.add((index - 1) / 2)
       }
 
       currentLayerIndices = Array.from(uniqueIndices)
     }
 
     return proofHashes
   }
 */
    /**
     * getHexMultiProof
     * @desc Returns the multiproof for given tree indices as hex strings.
     * @param {Number[]} indices - Tree indices.
     * @return {String[]} - Multiproofs as hex strings.
     * @example
     * ```js
     *const indices = [2, 5, 6]
     *const proof = tree.getHexMultiProof(indices)
     *```
     */
    /*TODO
    getHexMultiProof (tree: Buffer[] | string[], indices: number[]):string[] {
      return this.getMultiProof(tree, indices).map((x) => this.bufferToHex(x))
    }
    */
    /**
     * getProofFlags
     * @desc Returns list of booleans where proofs should be used instead of hashing.
     * Proof flags are used in the Solidity multiproof verifiers.
     * @param {Number[]|Buffer[]} leaves
     * @param {Buffer[]} proofs
     * @return {Boolean[]} - Boolean flags
     * @example
     * ```js
     *const indices = [2, 5, 6]
     *const proof = tree.getMultiProof(indices)
     *const proofFlags = tree.getProofFlags(leaves, proof)
     *```
     */
    /* TODO
   getProofFlags (leaves: any[], proofs: Buffer[] | string[]):boolean[] {
     if (!Array.isArray(leaves) || leaves.length <= 0) {
       throw new Error('Invalid Inputs!')
     }
 
     let ids : number[]
     if (leaves.every(Number.isInteger)) {
       ids = leaves.sort((a, b) => a === b ? 0 : a > b ? 1 : -1) // Indices where passed
     } else {
       ids = leaves.map((el) => this._bufferIndexOf(this.leaves, el)).sort((a, b) => a === b ? 0 : a > b ? 1 : -1)
     }
 
     if (!ids.every((idx: number) => idx !== -1)) {
       throw new Error('Element does not exist in Merkle tree')
     }
 
     const _proofs: Buffer[] = (proofs as any[]).map(item => this.bufferify(item))
 
     const tested = []
     const flags = []
     for (let index = 0; index < this.layers.length; index++) {
       const layer = this.layers[index]
       ids = ids.reduce((ids, idx) => {
         const skipped = tested.includes(layer[idx])
         if (!skipped) {
           const pairElement = this._getPairNode(layer, idx)
           const proofUsed = _proofs.includes(layer[idx]) || _proofs.includes(pairElement)
           pairElement && flags.push(!proofUsed)
           tested.push(layer[idx])
           tested.push(pairElement)
         }
         ids.push((idx / 2) | 0)
         return ids
       }, [])
     }
 
     return flags
   }
 */
    /**
     * verify
     * @desc Returns true if the proof path (array of hashes) can connect the target node
     * to the Merkle root.
     * @param {Object[]} proof - Array of proof objects that should connect
     * target node to Merkle root.
     * @param {TLeafPref} targetNode - Target node Buffer
     * @param {TLeafPref} root - Merkle root Buffer
     * @return {Boolean}
     * @example
     *```js
     *const root = tree.getRoot()
     *const proof = tree.getProof(leaves[2])
     *const verified = tree.verify(proof, leaves[2], root)
     *```
     */
    verify(proof, targetNode, root) {
        let hash = targetNode;
        if (!Array.isArray(proof) || !targetNode || !root)
            return false;
        for (let i = 0; i < proof.length; i++) {
            const node = proof[i];
            let data = node.data;
            let isLeftNode = node.position === 'left';
            const buffers = [];
            buffers.push(hash);
            buffers[isLeftNode ? 'unshift' : 'push'](data);
            hash = this.parentOf(buffers[0], buffers[1]);
            console.log(`${this.bufferToHex((buffers[0].leaf))} + ${this.bufferToHex((buffers[1].leaf))} = ${this.bufferToHex(hash.leaf)}`);
        }
        console.log(this.bufferToHex(root.leaf));
        return buffer.Buffer.compare(hash.leaf, root.leaf) === 0;
    }
    modifyNode(data, index, depth) {
        if (typeof depth === 'undefined')
            depth = 0;
        this.layers[depth][index].vote = data;
    }
    /**
     * verifyMultiProof
     * @desc Returns true if the multiproofs can connect the leaves to the Merkle root.
     * @param {Buffer} root - Merkle tree root
     * @param {Number[]} proofIndices - Leave indices for proof
     * @param {Buffer[]} proofLeaves - Leaf values at indices for proof
     * @param {Number} leavesCount - Count of original leaves
     * @param {Buffer[]} proof - Multiproofs given indices
     * @return {Boolean}
     * @example
     *```js
     *const leaves = tree.getLeaves()
     *const root = tree.getRoot()
     *const treeFlat = tree.getLayersFlat()
     *const leavesCount = leaves.length
     *const proofIndices = [2, 5, 6]
     *const proofLeaves = proofIndices.map(i => leaves[i])
     *const proof = tree.getMultiProof(treeFlat, indices)
     *const verified = tree.verifyMultiProof(root, proofIndices, proofLeaves, leavesCount, proof)
     *```
     */
    verifyMultiProof(root, proofIndices, proofLeaves, leavesCount, proof) {
        const isUneven = this.isUnevenTree();
        if (isUneven) {
            // TODO: combine these functions and simplify
            return this.verifyMultiProofForUnevenTree(root, proofIndices, proofLeaves, leavesCount, proof);
        }
        const depth = Math.ceil(Math.log2(leavesCount));
        root = this.bufferify(root);
        proofLeaves = proofLeaves.map(leaf => this.bufferify(leaf));
        proof = proof.map(leaf => this.bufferify(leaf));
        const tree = {};
        for (const [index, leaf] of this._zip(proofIndices, proofLeaves)) {
            tree[(Math.pow(2, depth)) + index] = leaf;
        }
        for (const [index, proofitem] of this._zip(this.getProofIndices(proofIndices, depth), proof)) {
            tree[index] = proofitem;
        }
        let indexqueue = Object.keys(tree).map(value => +value).sort((a, b) => a - b);
        indexqueue = indexqueue.slice(0, indexqueue.length - 1);
        let i = 0;
        while (i < indexqueue.length) {
            const index = indexqueue[i];
            if (index >= 2 && ({}).hasOwnProperty.call(tree, index ^ 1)) {
                let pair = [tree[index - (index % 2)], tree[index - (index % 2) + 1]];
                if (this.sortPairs) {
                    pair = pair.sort(buffer.Buffer.compare);
                }
                const hash = pair[1] ? this.hashFn(buffer.Buffer.concat(pair)) : pair[0];
                tree[(index / 2) | 0] = hash;
                indexqueue.push((index / 2) | 0);
            }
            i += 1;
        }
        return !proofIndices.length || (({}).hasOwnProperty.call(tree, 1) && tree[1].equals(root));
    }
    verifyMultiProofWithFlags(root, leaves, proofs, proofFlag) {
        root = this.bufferify(root);
        leaves = leaves.map(this.bufferify);
        proofs = proofs.map(this.bufferify);
        const leavesLen = leaves.length;
        const totalHashes = proofFlag.length;
        const hashes = [];
        let leafPos = 0;
        let hashPos = 0;
        let proofPos = 0;
        for (let i = 0; i < totalHashes; i++) {
            const bufA = proofFlag[i] ? (leafPos < leavesLen ? leaves[leafPos++] : hashes[hashPos++]) : proofs[proofPos++];
            const bufB = leafPos < leavesLen ? leaves[leafPos++] : hashes[hashPos++];
            const buffers = [bufA, bufB].sort(buffer.Buffer.compare);
            hashes[i] = this.hashFn(buffer.Buffer.concat(buffers));
        }
        return buffer.Buffer.compare(hashes[totalHashes - 1], root) === 0;
    }
    verifyMultiProofForUnevenTree(root, indices, leaves, leavesCount, proof) {
        root = this.bufferify(root);
        leaves = leaves.map(leaf => this.bufferify(leaf));
        proof = proof.map(leaf => this.bufferify(leaf));
        const computedRoot = this.calculateRootForUnevenTree(indices, leaves, leavesCount, proof);
        return root.equals(computedRoot);
    }
    /**
     * getDepth
     * @desc Returns the tree depth (number of layers)
     * @return {Number}
     * @example
     *```js
     *const depth = tree.getDepth()
     *```
     */
    getDepth() {
        return this.getLayers().length - 1;
    }
    /**
     * getLayersAsObject
     * @desc Returns the layers as nested objects instead of an array.
     * @example
     *```js
     *const layersObj = tree.getLayersAsObject()
     *```
     */
    getLayersAsObject() {
        const layers = this.getLayers().map((layer) => layer.map((value) => (buffer.Buffer.isBuffer(value.leaf) ? this.bufferToHex(value.leaf) : value.leaf)));
        const objs = [];
        for (let i = 0; i < layers.length; i++) {
            const arr = [];
            for (let j = 0; j < layers[i].length; j++) {
                const obj = { [layers[i][j]]: null };
                if (objs.length) {
                    obj[layers[i][j]] = {};
                    const a = objs.shift();
                    const akey = Object.keys(a)[0];
                    obj[layers[i][j]][akey] = a[akey];
                    if (objs.length) {
                        const b = objs.shift();
                        const bkey = Object.keys(b)[0];
                        obj[layers[i][j]][bkey] = b[bkey];
                    }
                }
                arr.push(obj);
            }
            objs.push(...arr);
        }
        return objs[0];
    }
    /**
     * verify
     * @desc Returns true if the proof path (array of hashes) can connect the target node
     * to the Merkle root.
     * @param {Object[]} proof - Array of proof objects that should connect
     * target node to Merkle root.
     * @param {Buffer} targetNode - Target node Buffer
     * @param {Buffer} root - Merkle root Buffer
     * @param {Function} hashFunction - Hash function for hashing leaves and nodes
     * @param {Object} options - Additional options
     * @return {Boolean}
     * @example
     *```js
     *const verified = MerkleTreePrefix.verify(proof, leaf, root, sha256, options)
     *```
     */
    /*   static verify (proof: any[], targetNode: TLeafPref, root: TLeafPref, hashFn = SHA256, options: Options = {}):boolean {
        const tree = new MerkleTreePrefix([], hashFn, options)
        return tree.verify(proof, targetNode, root)
      }
     */
    /**
     * getMultiProof
     * @desc Returns the multiproof for given tree indices.
     * @param {Buffer[]} tree - Tree as a flat array.
     * @param {Number[]} indices - Tree indices.
     * @return {Buffer[]} - Multiproofs
     *
     *@example
     * ```js
     *const flatTree = tree.getLayersFlat()
     *const indices = [2, 5, 6]
     *const proof = MerkleTreePrefix.getMultiProof(flatTree, indices)
     *```
     */
    /*TODO
   static getMultiProof (tree: Buffer[] | string[], indices: number[]):Buffer[] {
     const t = new MerkleTreePrefix([])
     return t.getMultiProof(tree, indices)
   }
   */
    /**
     * resetTree
     * @desc Resets the tree by clearing the leaves and layers.
     * @example
     *```js
     *tree.resetTree()
     *```
     */
    resetTree() {
        this.leaves = [];
        this.layers = [];
    }
    /**
     * getPairNode
     * @desc Returns the node at the index for given layer.
     * @param {Buffer[]} layer - Tree layer
     * @param {Number} index - Index at layer.
     * @return {Buffer} - Node
     *
     *@example
     * ```js
     *const node = tree.getPairNode(layer, index)
     *```
     */
    _getPairNode(layer, idx) {
        const pairIdx = idx % 2 === 0 ? idx + 1 : idx - 1;
        if (pairIdx < layer.length) {
            return layer[pairIdx];
        }
        else {
            return null;
        }
    }
    /**
     * toTreeString
     * @desc Returns a visual representation of the merkle tree as a string.
     * @return {String}
     * @example
     *```js
     *console.log(tree.toTreeString())
     *```
     */
    _toTreeString() {
        const obj = this.getLayersAsObject();
        return treeify.default.asTree(obj, true);
    }
    /**
     * toStringpow
     * @desc Returns a visual representation of the merkle tree as a string.
     * @example
     *```js
     *console.log(tree.toString())
     *```
     */
    toString() {
        return this._toTreeString();
    }
    isUnevenTree(treeLayers) {
        const depth = (treeLayers === null || treeLayers === void 0 ? void 0 : treeLayers.length) || this.getDepth();
        return !this.isPowOf2(depth);
    }
    isPowOf2(v) {
        return v && !(v & (v - 1));
    }
    calculateRootForUnevenTree(leafIndices, leafHashes, totalLeavesCount, proofHashes) {
        const leafTuples = this._zip(leafIndices, leafHashes).sort(([indexA], [indexB]) => indexA - indexB);
        const leafTupleIndices = leafTuples.map(([index]) => index);
        const proofIndices = this.getProofIndicesForUnevenTree(leafTupleIndices, totalLeavesCount);
        let nextSliceStart = 0;
        const proofTuplesByLayers = [];
        for (let i = 0; i < proofIndices.length; i++) {
            const indices = proofIndices[i];
            const sliceStart = nextSliceStart;
            nextSliceStart += indices.length;
            proofTuplesByLayers[i] = this._zip(indices, proofHashes.slice(sliceStart, nextSliceStart));
        }
        const tree = [leafTuples];
        for (let layerIndex = 0; layerIndex < proofTuplesByLayers.length; layerIndex++) {
            const currentLayer = proofTuplesByLayers[layerIndex].concat(tree[layerIndex]).sort(([indexA], [indexB]) => indexA - indexB)
                .map(([, hash]) => hash);
            const s = tree[layerIndex].map(([layerIndex]) => layerIndex);
            const parentIndices = [...new Set(s.map((index) => {
                    if (index % 2 === 0) {
                        return index / 2;
                    }
                    if (index % 2 === 0) {
                        return (index + 1) / 2;
                    }
                    return (index - 1) / 2;
                }))];
            const parentLayer = [];
            for (let i = 0; i < parentIndices.length; i++) {
                const parentNodeTreeIndex = parentIndices[i];
                const bufA = currentLayer[i * 2];
                const bufB = currentLayer[i * 2 + 1];
                const hash = bufB ? this.hashFn(buffer.Buffer.concat([bufA, bufB])) : bufA;
                parentLayer.push([parentNodeTreeIndex, hash]);
            }
            tree.push(parentLayer);
        }
        return tree[tree.length - 1][0][1];
    }
}
exports.MerkleTreePrefix = MerkleTreePrefix;
if (typeof window !== 'undefined') {
    ;
    window.MerkleTreePrefix = MerkleTreePrefix;
}
exports.default = MerkleTreePrefix;
