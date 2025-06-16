import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query
    if (!userId) {
      res.status(400).json({ error: 'userId is required' })
      return
    }
    try {
      await client.connect()
      const db = client.db('chatbot')
      const collection = db.collection('memories')
      const memories = await collection.find({ userId }).toArray()
      res.status(200).json(memories)
    } catch (err) {
      res.status(500).json({ error: 'Failed to get memories' })
    }
  } else {
    res.status(405).end()
  }
} 