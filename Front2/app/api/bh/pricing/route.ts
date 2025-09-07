import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date") || "2025-07-07"
    const type = searchParams.get("type") || "single"
    const event = searchParams.get("event") || "no_promo"
    const lead = searchParams.get("lead") || "15"

    const query = `
      SELECT Paid_price, pred_q0_025, pred_q0_5, pred_q0_975,
             rev__q0_025, rev__q0_5, rev__q0_975,
             best_025, best_50, best_975
      FROM [HotelDW].[Fact].[BH]
      WHERE arr_month = MONTH(@date)
        AND YEAR(Arrival_date) = 2024
        AND type_de_chambre = @type
        AND booking_lead <= @lead
        AND event = @event
      ORDER BY Paid_price ASC
    `

    const result = await executeQuery(query, {
      date,
      type,
      lead: Number.parseInt(lead),
      event,
    })

    return NextResponse.json(result.recordset)
  } catch (error) {
    console.error("Pricing API Error:", error)
    return NextResponse.json({ error: "Failed to fetch pricing data" }, { status: 500 })
  }
}
