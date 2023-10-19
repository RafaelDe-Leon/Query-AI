require('dotenv').config()
const cors = require('cors')

const { MongoClient } = require('mongodb')
const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')))

// Enable CORS
app.use(cors())

async function fetchData() {
  // Connection URL
  const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/SPLSEARCH'
  // const url = process.env.MONGODB_URI

  // Database Name
  const dbName = 'SPLSEARCH'

  // Create a new MongoClient
  const client = new MongoClient(url)

  try {
    // Connect to the MongoDB server
    await client.connect()

    // Get the database
    const db = client.db(dbName)

    // Get the collection
    const collection = db.collection('splunk.queries')

    // Query the collection
    const query = {} // This empty query object will match all documents in the collection
    const data = await collection.find(query).toArray()

    return data
  } finally {
    // Ensure the client is closed
    await client.close()
  }
}

// Call the function
fetchData().catch(console.error)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/data', async (req, res) => {
  try {
    const data = await fetchData()
    console.log(data) // Log data to server console
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
