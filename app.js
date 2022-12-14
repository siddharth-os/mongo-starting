const { MongoClient } = require("mongodb");
// Connection URI
// const uri ="mongodb+srv://sample-hostname:27017/?poolSize=20&writeConcern=majority";
const uri="mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1";
// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    const database = client.db("fruitsDB");
    const movies = database.collection("fruits");
    // query for movies that have a runtime less than 15 minutes
    const query = { color:'red' };
    // const options = {
    //   // sort returned documents in ascending order by title (A->Z)
    //   sort: { title: 1 },
    //   // Include only the `title` and `imdb` fields in each returned document
    //   projection: { _id: 0, title: 1, imdb: 1 },
    // };
    const cursor = movies.find(query);
    // print a message if no documents were found
    if ((await movies.estimatedDocumentCount) === 0) {
      console.log("No documents found!");
    }
    // replace console.dir with your callback to access individual elements
    await cursor.forEach(console.dir);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

