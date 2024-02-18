"use server";

import xss from "xss";
import fs from "node:fs";
import { redirect } from "next/navigation";
import { storeMealInDb } from "./mealsCrud";

const validateFeild = (field) => {
  if (field === "" || field.trim() === "") {
    return false;
  }
  return true;
};

export async function storeMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),

    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    !validateFeild(meal.title) ||
    !validateFeild(meal.summary) ||
    !validateFeild(meal.creator) ||
    !validateFeild(meal.creator_email) ||
    !validateFeild(formData.get("instructions")) ||
    !validateFeild(formData.get("image"))
  ) {
    return {
      message: "All fields are required",
    };
  }

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

  (meal.instructions = xss(formData.get("instructions"))),
    (meal.image = `/images/${fileName}`),
    (meal.slug = slug),
    // Save the meal to the database
    await storeMealInDb(meal);

  redirect(`/meals`);
}
