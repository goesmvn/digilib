import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import path from 'path'
import fs from 'fs'

const DATA_DIR = path.join(process.cwd(), 'data')
const DB_FILE = path.join(DATA_DIR, 'digilib.db')

let dbPromise: Promise<Database> | null = null

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

export async function getDB() {
  if (dbPromise) return dbPromise

  dbPromise = (async () => {
    const db = await open({
      filename: DB_FILE,
      driver: sqlite3.Database,
    })

    // Initialize tables
    await db.exec(`
      CREATE TABLE IF NOT EXISTS news (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        image TEXT,
        date TEXT NOT NULL,
        link TEXT NOT NULL,
        category TEXT
      );
      
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        description TEXT NOT NULL,
        location TEXT,
        image TEXT
      );
    `)

    // Dynamic schema migration: add image column if it does not exist
    try {
      await db.exec('ALTER TABLE events ADD COLUMN image TEXT;')
    } catch (e) {
      // Column already exists, safe to ignore
    }

    return db
  })()

  return dbPromise
}

export interface CustomNews {
  id: string
  title: string
  excerpt: string
  image?: string
  date: string
  link: string
  category?: string
}

export interface CustomEvent {
  id: string
  title: string
  date: string
  time: string
  description: string
  location?: string
  image?: string
}

export async function getCustomNews(): Promise<CustomNews[]> {
  try {
    const db = await getDB()
    return await db.all<CustomNews[]>('SELECT * FROM news ORDER BY date DESC')
  } catch (e) {
    console.error('Error reading custom news:', e)
    return []
  }
}

export async function addCustomNews(newsItem: Omit<CustomNews, 'id' | 'date'>): Promise<string> {
  const db = await getDB()
  const id = `custom-news-${Date.now()}`
  const date = new Date().toISOString().slice(0, 10)
  
  await db.run(
    'INSERT INTO news (id, title, excerpt, image, date, link, category) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      id,
      newsItem.title,
      newsItem.excerpt,
      newsItem.image || null,
      date,
      newsItem.link || `/api/news-image?id=${id}`, // Fallback if no link provided
      newsItem.category || 'Library'
    ]
  )
  return id
}

export async function deleteCustomNews(id: string): Promise<void> {
  const db = await getDB()
  await db.run('DELETE FROM news WHERE id = ?', [id])
}

export async function getCustomEvents(): Promise<CustomEvent[]> {
  try {
    const db = await getDB()
    return await db.all<CustomEvent[]>('SELECT * FROM events ORDER BY date ASC')
  } catch (e) {
    console.error('Error reading custom events:', e)
    return []
  }
}

export async function addCustomEvent(eventItem: Omit<CustomEvent, 'id'>): Promise<string> {
  const db = await getDB()
  const id = `custom-event-${Date.now()}`
  
  await db.run(
    'INSERT INTO events (id, title, date, time, description, location, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      id,
      eventItem.title,
      eventItem.date,
      eventItem.time,
      eventItem.description,
      eventItem.location || null,
      eventItem.image || null
    ]
  )
  return id
}

export async function deleteCustomEvent(id: string): Promise<void> {
  const db = await getDB()
  await db.run('DELETE FROM events WHERE id = ?', [id])
}
