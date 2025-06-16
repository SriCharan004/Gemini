import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, content } = req.body
    if (!userId || !content) {
      res.status(400).json({ error: 'userId and content are required' })
      return
    }
    try {
      await client.connect()
      const db = client.db('chatbot')
      const collection = db.collection('memories')
      await collection.insertOne({ userId, content, timestamp: new Date() })
      res.status(200).json({ message: 'Memory saved' })
    } catch (err) {
      res.status(500).json({ error: 'Failed to save memory' })
    }
  } else {
    res.status(405).end()
  }
} 