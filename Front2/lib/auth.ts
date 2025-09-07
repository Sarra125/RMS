export interface User {
  email: string
  role: "admin" | "revenue_manager"
}

export const MOCK_CREDENTIALS = {
  email: "abdelkadersarra4@gmail.com",
  password: "12345678",
}

export function validateCredentials(email: string, password: string): boolean {
  return email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password
}

export function createMockToken(user: User): string {
  return btoa(JSON.stringify({ ...user, timestamp: Date.now() }))
}

export function validateToken(token: string): User | null {
  try {
    const decoded = JSON.parse(atob(token))
    // Simple validation - in production, check expiry, signature, etc.
    if (decoded.email === MOCK_CREDENTIALS.email) {
      return { email: decoded.email, role: "admin" }
    }
    return null
  } catch {
    return null
  }
}
