"use client";

import { storeMeal } from "@/apis/meals/mealsActions";
import { useFormStatus } from "react-dom";
import ImagePicker from "@/app/components/meals/image-picker";
import classes from "./meal-form.module.css";

export default function MealForm() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <form className={classes.form} action={storeMeal}>
      <div className={classes.row}>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="name" required />
        </p>
        <p>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" name="email" required />
        </p>
      </div>
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="summary">Short Summary</label>
        <input type="text" id="summary" name="summary" required />
      </p>
      <p>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          rows="10"
          required
        ></textarea>
      </p>
      <ImagePicker label="Image" name="image" />
      <p className={classes.actions}>
        <button type="submit">Share Meal</button>
      </p>
    </form>
  );
}
