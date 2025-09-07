import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date") || "2025-07-07"
    const type = searchParams.get("type") || "single"
    const chartType = searchParams.get("chartType") || "positioning" // "positioning" or "comparison"

    const query =
      chartType === "positioning"
        ? `
        SELECT TOP (8) 
            c.Hotel_id, 
            h.Hotel_name, 
            c.Date, 
            c.Prix
        FROM [HotelDW].[Fact].[Competitors_Prices] c
        JOIN [HotelDW].[Dim].[Hotel] h 
            ON c.Hotel_id = h.Hotel_id
        WHERE c.Date = '2025-07-07' 
          AND c.type_de_chambre = @type
        ORDER BY c.Prix ASC;
      `
        : `
        SELECT Hotel_id, Date, Prix
        FROM [HotelDW].[Fact].[Competitors_Prices]
        WHERE type_de_chambre = @type
      `

    const result = await executeQuery(query, {
      date,
      type,
    })

    return NextResponse.json(result.recordset)
  } catch (error) {
    console.error("Competitors API Error:", error)
    return NextResponse.json({ error: "Failed to fetch competitors data" }, { status: 500 })
  }
}
