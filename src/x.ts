const path= require ('path');
const dotenv= require ('dotenv');

dotenv.config({path:path.join(__dirname,'..','.env')})

const {MONGO_PATH}= process.env

console.log(MONGO_PATH);
