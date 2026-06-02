import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { getCustomEvents, addCustomEvent, deleteCustomEvent } from '@/lib/db'

export async function GET() {
  try {
    const events = await getCustomEvents()
    return NextResponse.json({ success: true, events })
  } catch (error) {
    console.error('Error fetching custom events API:', error)
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // 1. Verify session
    const session = await getSession()
    if (!session || !session.authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Parse and validate body
    const body = await request.json()
    const { title, date, time, description, location, image } = body

    if (!title || !date || !time || !description) {
      return NextResponse.json(
        { success: false, error: 'Title, date, time, and description are required' },
        { status: 400 }
      )
    }

    // 3. Add to database
    const id = await addCustomEvent({
      title,
      date,
      time,
      description,
      location: location || '',
      image: image || '',
    })

    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error('Error creating custom event:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    // 1. Verify session
    const session = await getSession()
    if (!session || !session.authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Parse query parameters
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 })
    }

    // 3. Delete from database
    await deleteCustomEvent(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting custom event:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
