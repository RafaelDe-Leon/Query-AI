const { MongoClient } = require('mongodb')
require('dotenv').config()

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/SPLSEARCH'
const dbName = 'SPLSEARCH'

module.exports = async (req, res) => {
  const client = new MongoClient(url)
  try {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('splunk.queries')
    const data = await collection.find({}).toArray()
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  } finally {
    await client.close()
  }
}
