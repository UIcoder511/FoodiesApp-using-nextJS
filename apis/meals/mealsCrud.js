import sql from "better-sqlite3";

const db = new sql("meals.db");

export async function getMeals() {
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   throw new Error("Failed to load meals.");
  const stmt = db.prepare("SELECT * FROM meals");
  const meals = stmt.all();
  return meals;
}

export function getMealById(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function storeMealInDb(meal) {
  const stmt = db.prepare(
    "INSERT INTO meals (title, summary, instructions, image, creator, creator_email, slug) VALUES (@title, @summary, @instructions, @image, @creator, @creator_email, @slug)"
  );
  stmt.run(meal);
}
