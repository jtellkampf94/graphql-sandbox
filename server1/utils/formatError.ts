interface FormattedError {
  success: boolean;
  errors: Array<{ field: string; message: string }> | [];
}

const formatError = (error: any) => {
  let formattedError: FormattedError = {
    success: false,
    errors: [],
  };

  // Invalid Mongoose Object Id error
  if (error.name === "CastError") {
    formattedError.errors = [
      ...formattedError.errors,
      { field: "id", message: "Not found" },
    ];
  }

  // Mongoose Duplicate key error
  if (error.code === 11000) {
    const startIndex = error.message.indexOf("ex: ") + 4;
    const endIndex = error.message.indexOf("_1");

    const field = error.message.slice(startIndex, endIndex);

    formattedError.errors = [
      ...formattedError.errors,
      {
        field,
        message:
          field.charAt(0).toUpperCase() + field.slice(1) + " already taken",
      },
    ];
  }

  // Mongoose Validation error
  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((error) => ({
      //@ts-ignore
      field: error.path,
      //@ts-ignore
      message: error.message,
    }));

    formattedError.errors = [...formattedError.errors, ...errors];
  }

  if (formattedError.errors.length === 0) {
    console.log(error);
  }

  return formattedError;
};

export default formatError;
