import Image from "next/image";
import classes from "./page.module.css";
import { getMealById } from "@/apis/meals/mealsCrud";
import { notFound } from "next/navigation";

export default async function MealsSlugPage({ params }) {
  const { mealSlug } = params;
  const meal = await getMealById(mealSlug);

  if (!meal) {
    return notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");
  const { title, slug, image, summary, instructions, creator, creator_email } =
    meal;
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={"https://foddies-app-nextjs.s3.amazonaws.com/" + image}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${creator_email}`}>{creator}</a>
          </p>
          <p className={classes.summary}>{summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: instructions,
          }}
        ></p>
      </main>
    </>
  );
}
