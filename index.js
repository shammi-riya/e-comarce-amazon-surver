const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());
require('dotenv').config();
const port = process.env.PORT || 5000;





const uri = `mongodb+srv://${process.env.userDb}:${process.env.passwordDb}@cluster0.f4myxpg.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});




async function run() {
    try {
        const proudctsCollection = client.db("amazon-surverDb").collection('products');
        const cartsCollection = client.db("amazon-surverDb").collection('carts');





        app.get('/products', async (req, res) => {
            const result = await proudctsCollection.find().toArray();
            res.send(result)
        })



        app.post('/add-cart',async (req, res) => {
            const body = req.body;
            console.log(body);
            const result = await cartsCollection.insertOne(body);
            res.send(result);

        })

        app.get('/cart',async(req,res)=>{
            const result = await cartsCollection.find().toArray();
            res.send(result);
        })



        app.delete("/carts/:id" ,async(req,res)=>{
            const id = req.params.id;
            console.log(id);
            const quiry = {_id : new ObjectId(id)};
            const result = await cartsCollection.deleteOne(quiry);
            console.log(result);
            res.send(result);
        })









        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);












app.get('/', (req, res) => {
    res.send('hello amazon')
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})