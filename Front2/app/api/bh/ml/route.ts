import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const arr_month = searchParams.get("arr_month") || "7"
    const event = searchParams.get("event") || "no_promo"
    const booking_lead_max = searchParams.get("booking_lead_max") || "90"
    const type = searchParams.get("type") || "single"

    const query = `
      SELECT Paid_price, nbre_res, arr_day as [arrival_day], 
             type_de_chambre as [type_de_chambre], booking_lead as [booking_lead]
      FROM [HotelDW].[Fact].[BH]
      WHERE arr_month = @arr_month 
        AND event = @event 
        AND booking_lead <= @booking_lead_max 
        AND type_de_chambre = @type
      ORDER BY Paid_price ASC
    `

    const result = await executeQuery(query, {
      arr_month: Number.parseInt(arr_month),
      event,
      booking_lead_max: Number.parseInt(booking_lead_max),
      type,
    })

    return NextResponse.json(result.recordset)
  } catch (error) {
    console.error("ML API Error:", error)
    return NextResponse.json({ error: "Failed to fetch ML data" }, { status: 500 })
  }
}
