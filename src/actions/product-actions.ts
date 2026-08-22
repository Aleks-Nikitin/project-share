"use server";
import { auth } from "@clerk/nextjs/server";
import { productSchema } from "./product-validations";

type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message: string;
};

export const addProductAction = async (
  prevState: FormState,
  formData: FormData,
) => {
  console.log(formData);
  try {
    const { userId } = await auth();
    if (!userId)
      return {
        success: false,
        message: "You need to be signed in to submit a product",
      };
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedData = productSchema.safeParse(rawFormData);
    if (!validatedData.success) {
      const errors = validatedData.error.flatten().fieldErrors;
      console.log("errors", errors);
      return {
        success: false,
        errors,
        message: "Validation failed",
      };
    }
    const data = validatedData.data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: error,
      message: "Product added",
    };
  }
};
