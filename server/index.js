const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
        "mongodb+srv://luissmartinss:LlUuIiSs212526@vertexai.pnavd.mongodb.net/?retryWrites=true&w=majority&appName=vertexai";

const client = new MongoClient(uri, {
        serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
        },
});

async function run() {
        try {
                await client.connect();

                await client.db("admin").command({ ping: 1 });
                console.log("Welcome to VertexAI DB");
        } finally {
                await client.close();
        }
}
run().catch(console.dir);
