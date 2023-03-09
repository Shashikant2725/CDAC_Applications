const {default:mongoose} = require('mongoose');

const dbConnect = ()=>{
    const connect=mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected Successfully",connect);
}
module.exports = dbConnect;