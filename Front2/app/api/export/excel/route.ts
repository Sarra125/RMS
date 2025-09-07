import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date") || "2025-07-07"
    const bookingLead = searchParams.get("bookingLead") || "15"

    const query = `
      SELECT 
        [date],
        [my_price],
        [median_price],
        [suggested_price],
        [action],
        [type_de_chambre]
      FROM [HotelDW].[dbo].[final_price]
      ORDER BY [type_de_chambre], [date]
    `

    const result = await executeQuery(query, {
      date,
    })

    return NextResponse.json(result.recordset)
  } catch (error) {
    console.error("Excel Export API Error:", error)
    return NextResponse.json({ error: "Failed to fetch export data" }, { status: 500 })
  }
}
