const mongoose=require('mongoose')
const List=require('../Models/listing')
const data=require('./data')

const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust'
main()
.then(()=>
    {console.log("connected to db");

    }).catch((err)=>
        {console.log(err);

        })
async function main(){
    await mongoose.connect(MONGO_URL)
}
//function to initalise data in db
const initdb= async()=>{
    await List.deleteMany({})
    // console.log(initialdata.data);
    await List.insertMany(data.data)
    console.log('data was initialized');
}

initdb();
