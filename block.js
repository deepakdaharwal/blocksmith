const hexToBinary= require("hex-to-binary");
const {GENESIS_DATA, MINE_RATE}= require("./config");
const cryptoHash= require("./crypto-hash");
class Block{
    constructor({timestamp, prevHash,hash,data, nonce, difficulty}){
        this.timestamp= timestamp;
        this.prevHash= prevHash;
        this.hash= hash;
        this.data=data;
        this.nonce=nonce;
        this.difficulty=difficulty;
    }
    static genesis(){
        return new this(GENESIS_DATA);
    }
    static mineBlock({prevBlock,data}){
        let hash, timestamp;
        const prevHash= prevBlock.hash;
       let {difficulty}= prevBlock;

        let nonce=0;
        do{
            nonce++;
            timestamp=Date.now();
            difficulty= Block.adjustDifficulty({
                originalBlock: prevBlock,
                timestamp,
            });
            hash=cryptoHash(timestamp,prevHash,data,nonce,difficulty)
        }while(hexToBinary(hash).substring(0,difficulty)!= '0'.repeat(difficulty));
        return new this({
           timestamp,
           prevHash,
           data, 
           difficulty, 
           nonce, 
           hash,
        });
    }
    static adjustDifficulty({originalBlock,timestamp}){
        const{difficulty}=originalBlock;
        if(difficulty<1){
            return 1;
        }
        const difference=timestamp-originalBlock.timestamp;
        if(difference> MINE_RATE){
            return difficulty-1;
        }
        return difficulty+1;
    }
}
const block1= new Block({timestamp:"17/09/23",prevHash:"0xacb",hash:"0xc12",data:"hello"});
const block2= new Block({timestamp:"3/9/23",prevHash:"0xc12",hash:"123",data:"world"});
const block3= new Block({
    prevHash:"123", hash:"7897",timestamp:"9/9/23", data:"How Are you?"
});

// console.log(block1);
// console.log(block2);
// console.log(block3);

// const genesisBlock = Block.genesis();
// console.log(genesisBlock);

// const result= Block.mineBlock({prevBlock: block1, data: "block2"});
// console.log(result);
module.exports= Block;