import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const mois = searchParams.get("mois") || "7"
    const bookingLeadMax = searchParams.get("bookingLeadMax") || "90"

    const query = `
      SELECT Paid_price, nbre_res, event, type_de_chambre
      FROM [HotelDW].[Fact].[BH]
      WHERE arr_month = @mois AND booking_lead <= @bookingLeadMax
    `

    const result = await executeQuery(query, {
      mois: Number.parseInt(mois),
      bookingLeadMax: Number.parseInt(bookingLeadMax),
    })

    return NextResponse.json(result.recordset)
  } catch (error) {
    console.error("EDA API Error:", error)
    return NextResponse.json({ error: "Failed to fetch EDA data" }, { status: 500 })
  }
}
