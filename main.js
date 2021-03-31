const SHA256 = require('crypto-js/sha256');


class Block{
    constructor(index, timestamp, data, previousHash = ''){
     this.index=index;
     this.timestamp=timestamp;
     this.data=data;
     this.previousHash=previousHash;
     this.hash=this.calculateHash();
     this.nonce=0;  
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+ this.nonce).toString();

    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("block mined: "+ this.hash);

    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0, "03/29/2021", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }



    isChainValid(){
        for(let i = 1; i < this.chain.lenght; i++){
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i];
        
        if (currentBlock.hash !== currentBlock.calculateHash());{
            return false;
            }
        
        if(currentBlock.previousHash !== previousBlock.hash){
        return false;
         }

    }
     return true;


}}

let silvercoin = new Blockchain();

console.log('Mining Block: 1...Yay!');
silvercoin.addBlock(new Block(1, "03/29/2021", { amount: 4 }));

console.log('Mining Block: 2...Yay!');
silvercoin.addBlock(new Block(2, "03/29/2021", { amount: 10 })); 

console.log('Mining Block: 3... fucken eh Yay!');
silvercoin.addBlock(new Block(3, "03/29/2021", { amount: 400 }));

console.log('Mining Block: 4...Yay!');
silvercoin.addBlock(new Block(4, "03/29/2021", { amount: 120 })); 

 // console.log('is blockchain valid? ' + silvercoin.isChainValid());
//console.log(JSON.stringify(silvercoin, null, 4));localStorage
