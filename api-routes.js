const { MongoClient, ObjectId } = require("mongodb");
const router = require("express").Router();
const url = process.env.MONGODB_URI || require("./securet/mangodb.json").url; // Correct path to the MongoDB JSON file
const client = new MongoClient(url);

const getCollection = async (dbName, collectionName) => {
  await client.connect();
  return client.db(dbName).collection(collectionName);
};

// Mapping routes

router.get("/", async (_, response) => {
  const collection = await getCollection("ToDoApi", "ToDo");
  const todos = await collection.find({}).toArray(); // Find all items and convert to array
  response.json(todos);
});

router.post("/", async (request, response) => {
  const { item, complete } = request.body;
  const collection = await getCollection("ToDoApi", "ToDo");
  const result = await collection.insertOne({ item, complete });
  response.json({ message: "New ToDo Added!" });
});

// im getting a input must be a 24 char hex string??
router.put("/:id", async (request, response) => {
  const id = request.params.id.trim();
  const collection = await getCollection("ToDoApi", "ToDo");

  const todo = await collection.findOne({ _id: new ObjectId(id) }); // Error the id isent hex string???

  if (!todo) {
    return response.status(404).json({ error: "Todo not found" });
  }

  const updatedComplete = !todo.complete; // Toggle the 'complete' field

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { complete: updatedComplete } }, // Use updatedComplete here
  );

  response.json({ id: _id, complete: updatedComplete }); // Use updatedComplete here
});

module.exports = router;
