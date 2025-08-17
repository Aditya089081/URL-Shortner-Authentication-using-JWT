// model/linkModel.js
import { db } from "../config/dbClient.js";

export const saveLink = async ({ shortcode, url, user_id }) => {
  const [result] = await db.execute(
    "INSERT INTO shortners (shortcode, url, user_id) VALUES (?, ?, ?)",
    [shortcode, url, user_id]
  );
  return result.insertId;
};


export const getLinkByShortCode = async (shortcode) => {
  const [rows] = await db.execute(
    "SELECT * FROM Shortners WHERE shortcode = ? LIMIT 1",
    [shortcode]
  );
  return rows[0];
};
export const getLinksByUser = async (user_id) => {
  const [rows] = await db.execute(
    "SELECT * FROM shortners WHERE user_id = ? ORDER BY created_at DESC",
    [user_id]
  );
  return rows;
};
export const findShortLinkById = async(id) =>{
  const [result] = await db.execute(
    "SELECT * FROM Shortners WHERE id = ? LIMIT 1",[id]
  );
  return result[0];
}