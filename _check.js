const { Pool } = require("pg");
const pool = new Pool({
  connectionString:
    "postgres://postgres:432cb33gE1Ae5e5g2b1D35ac3b34aed3@roundhouse.proxy.rlwy.net:30539/railway",
});
(async () => {
  const users = [
    "ayalaedgarivan369@gmail.com",
    "ayalaedgarivan369.ok@gmail.com",
  ];
  for (const email of users) {
    const u = await pool.query('SELECT id, name, surname, email, phone, "createdAt" FROM "User" WHERE email = $1', [email]);
    if (u.rows.length > 0) {
      const user = u.rows[0];
      const orders = await pool.query('SELECT COUNT(*) as count FROM "Order" WHERE "UserId" = $1', [user.id]);
      const company = await pool.query('SELECT COUNT(*) as count FROM "Company" WHERE "UserId" = $1', [user.id]);
      const sub = await pool.query("SELECT * FROM subscriptions WHERE uid = $1", [user.id]);
      console.log("=== " + email + " ===");
      console.log("ID:", user.id);
      console.log("Nombre:", user.name, user.surname);
      console.log("Telefono:", user.phone);
      console.log("Creado:", user.createdAt);
      console.log("Ordenes:", orders.rows[0].count);
      console.log("Empresa:", company.rows[0].count);
      console.log("Suscripcion:", sub.rows.length > 0 ? JSON.stringify(sub.rows[0]) : "No tiene");
      console.log("");
    }
  }
  pool.end();
})();
