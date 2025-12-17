import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // obtener el token de las cookies //
  const token = request.cookies.get('token')

  // si no hay token, redirigir al login // 
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // si hay token, permitir la navegación // 
  return NextResponse.next()
}

// configurar en qué rutas se ejecuta este middleware //
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/dashboard/table/:path*',
    '/trash/:path*'
  ]
}
