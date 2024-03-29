"use client";

import { storeMeal } from "@/apis/meals/mealsActions";
import { useFormState } from "react-dom";
import ImagePicker from "@/app/components/meals/image-picker";
import classes from "./meal-form.module.css";
import MealFormSubmit from "./meal-form-submit";

export default function MealForm() {
  const [state, action] = useFormState(storeMeal, { message: "" });

  return (
    <form className={classes.form} action={action}>
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

      {state.message && <p>{state.message}</p>}

      <p className={classes.actions}>
        <MealFormSubmit />
      </p>
    </form>
  );
}
