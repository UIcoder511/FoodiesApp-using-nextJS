"use server";

import xss from "xss";
import fs from "node:fs";
import { redirect } from "next/navigation";
import { storeMealInDb } from "./mealsCrud";

export async function storeMeal(formData) {
  const slug = formData.get("title").toLowerCase().replace(/ /g, "-");

  const image = formData.get("image");
  const extension = image.name.split(".").pop();
  const fileName = `${formData.get(
    "title"
  )}-${new Date().getTime()}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (err) => {
    if (err) {
      throw new Error("Failed to store image.");
    }
  });

  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: xss(formData.get("instructions")),
    image: `/images/${fileName}`,
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    slug: slug,
  };

  // Save the meal to the database
  await storeMealInDb(meal);

  redirect(`/meals`);
}
