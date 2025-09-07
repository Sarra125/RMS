import { type NextRequest, NextResponse } from "next/server"
import { validateCredentials, createMockToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!validateCredentials(email, password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const user = { email, role: "admin" as const }
    const token = createMockToken(user)

    return NextResponse.json({
      user,
      token,
      message: "Login successful",
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
