import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "single"

    const query = `
      SELECT CAST([date] AS DATE) AS [date], [suggested_price]
      FROM [HotelDW].[dbo].[final_price]
      WHERE type_de_chambre = @type
      ORDER BY CAST([date] AS DATE);
    `

    const result = await executeQuery(query, { type })

    return NextResponse.json(result.recordset)
  } catch (error) {
    console.error("Final Price API Error:", error)
    return NextResponse.json({ error: "Failed to fetch final price data" }, { status: 500 })
  }
}
