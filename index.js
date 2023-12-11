const express= require("express")
const ytsr = require('@distube/ytsr');
const bodyParser = require('body-parser');
const cors = require('cors');
const app=express()


app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/videos/searcher', async (req, res) => {
    await ytsr(req.body.search,{limit:50})
        .then(async (result)=> {
            const response=result;
            const data=  await ytsr(req.body.search,{type:"playlist",limit:10})
            res.json({items:[...response.items, data.items]})
        })
        .catch(error=>res.status(500).json(error))
})

// app.post("/video",async (req,res)=>{
//     try{
//         // const filters1 = await ytsr.getFilters('github');
//         // const filter1 = filters1.get('Type').get('playlist');
//         // const filters2 = await ytsr.getFilters(filter1.url);
//         // const filter2 = filters2.get('Features').get('Live');
//         // const options = {
//         //     pages: 2,
//         //
//         // }
//         // const searchResults = await ytsr(filter2.url, options);
//
//
//     }catch (e) {
//         return res.json(e)
//     }
//
// })

app.listen(3000,()=>console.log("server is listen on 5000"))