import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

// MySQL connection configuration
const dbConfig = {
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export async function POST(request: NextRequest) {
  let connection;
  try {
    const formData = await request.json();

    // Create connection
    connection = await mysql.createConnection(dbConfig);

    // Insert data into tour-request table
    const query = `
      INSERT INTO \`tour-request\` 
      (name, country, adults, children, arrivalDate, daysCount, places, needHotels, vehicle, activities, contact, email, submittedAt) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      formData.name,
      formData.country,
      formData.adults,
      formData.children,
      formData.arrivalDate,
      formData.daysCount,
      formData.places,
      formData.needHotels,
      formData.vehicle,
      formData.activities,
      formData.contact,
      formData.email,
      new Date(),
    ];

    const [result] = await connection.execute(query, values);

    // Close connection
    await connection.end();

    return NextResponse.json(
      {
        success: true,
        message: "Tour request submitted successfully",
        insertId: (result as mysql.OkPacket).insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit tour request",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
