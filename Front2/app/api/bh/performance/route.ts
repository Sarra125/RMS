import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "single"

    const query = `
      SELECT 
        arr_month,
        AVG(rev_type_de_chambre) as avg_revpar,
        AVG(Occupancy_rate_arrival) as avg_occupancy,
        AVG(nbre_res) as avg_reservations
      FROM [HotelDW].[Fact].[BH]
      WHERE type_de_chambre = @type
      GROUP BY arr_month
      ORDER BY arr_month
    `

    const result = await executeQuery(query, {
      type,
    })

    return NextResponse.json(result.recordset)
  } catch (error) {
    console.error("Performance API Error:", error)
    return NextResponse.json({ error: "Failed to fetch performance data" }, { status: 500 })
  }
}
