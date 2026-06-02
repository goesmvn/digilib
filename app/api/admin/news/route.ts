import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { getCustomNews, addCustomNews, deleteCustomNews } from '@/lib/db'

export async function GET() {
  try {
    const news = await getCustomNews()
    return NextResponse.json({ success: true, news })
  } catch (error) {
    console.error('Error fetching custom news API:', error)
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
    const { title, excerpt, image, link, category } = body

    if (!title || !excerpt || !link) {
      return NextResponse.json(
        { success: false, error: 'Title, excerpt, and link are required' },
        { status: 400 }
      )
    }

    // 3. Add to database
    const id = await addCustomNews({
      title,
      excerpt,
      image: image || '',
      link,
      category: category || 'Berita',
    })

    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error('Error creating custom news:', error)
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
    await deleteCustomNews(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting custom news:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
