const express=require('express');
const app=express();
const path=require('path')
const mongoose=require('mongoose')
const List=require('./Models/listing')

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

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('working')
})
// app.get('/test',(req,res)=>{
//     const list1=new List({
//         title:'default place',
//         description:'sunset',
//         image:{filename:'helloo',
//             url:"https//"
//         },
//         price:1000,
//         location:"lucnkow",
//         country:'india'
//     })
//     // list1.save().then(res=>{console.log(res);})
//     res.send("ok")
// })

// home page that has list of all places
app.get('/listing',async(req,res)=>{
    let list=await List.find({})
    res.render('./listings/index.ejs',{list})
})

app.get('/listing/:id',async(req,res)=>{
    let {id}=req.params
    let post=await List.findById(id)
    res.render('./listings/show',{post})
})
app.listen(8080,()=>{
    console.log('Server running on port 8080');
})