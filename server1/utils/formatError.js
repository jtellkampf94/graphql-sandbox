const formatError = (error) => {
  const formattedError = {
    success: false,
    errors: [],
  };

  // Invalid Mongoose Object Id error
  if (error.name === "CastError") {
    formattedError.errors.push({ field: "id", message: "Not found" });
  }

  // Mongoose Duplicate key error
  if (error.code === 11000) {
    const startIndex = error.message.indexOf("ex: ") + 4;
    const endIndex = error.message.indexOf("_1");

    const field = error.message.slice(startIndex, endIndex);

    formattedError.errors.push({
      field,
      message:
        field.charAt(0).toUpperCase() + field.slice(1) + " already taken",
    });
  }

  // Mongoose Validation error
  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));

    formattedError.errors = formattedError.errors.concat(errors);
  }

  if (formattedError.errors.length === 0) {
    console.log(error);
  }

  return formattedError;
};

module.exports = formatError;
