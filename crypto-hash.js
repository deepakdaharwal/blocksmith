const crypto= require("crypto");

const cryptoHash=(...inputs)=>{
    const hash= crypto.createHash("sha256")
    hash.update(inputs.sort().join("")) //helloworld and world hello sort karne ke kaaran same hash de denge
    return hash.digest("hex");
};
//result= cryptoHash("hello","world");
result= cryptoHash("world","hello");
module.exports= cryptoHash;
//console.log(result);