import sql from "mssql"

const config: sql.config = {
  user: "sa",
  password: "12345678910",
  server: "desktop-ca0hhci",
  database: "HotelDW",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
}

let pool: sql.ConnectionPool | null = null

export async function getDbConnection() {
  if (!pool) {
    pool = new sql.ConnectionPool(config)
    await pool.connect()
  }
  return pool
}

export async function executeQuery(query: string, params?: Record<string, any>) {
  const connection = await getDbConnection()
  const request = connection.request()

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      request.input(key, value)
    })
  }

  return await request.query(query)
}
