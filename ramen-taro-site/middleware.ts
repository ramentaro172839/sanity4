import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // 本番環境でStudioページへのアクセスを制限
  if (request.nextUrl.pathname.startsWith('/studio')) {
    // 開発環境またはローカル環境の場合はアクセス許可
    if (process.env.NODE_ENV === 'development' || 
        request.nextUrl.hostname === 'localhost' ||
        request.nextUrl.hostname === '127.0.0.1') {
      return NextResponse.next()
    }
    
    // 特定の認証クエリパラメータがある場合のみアクセス許可
    const adminKey = request.nextUrl.searchParams.get('admin')
    const expectedKey = process.env.STUDIO_ADMIN_KEY
    
    if (adminKey && expectedKey && adminKey === expectedKey) {
      return NextResponse.next()
    }
    
    // それ以外の場合は404を返す
    return new NextResponse('Not Found', { status: 404 })
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/studio/:path*'
}