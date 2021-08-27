const formatError = (error) => {
  if (error.name === "CastError") {
    return {
      success: false,
      errors: [{ field: "id", message: "Not found" }],
    };
  }

  if (error.code === 11000) {
    const startIndex = error.message.indexOf("ex: ") + 4;
    const endIndex = error.message.indexOf("_1");

    const field = error.message.slice(startIndex, endIndex);

    return {
      success: false,
      errors: [
        {
          field,
          message:
            field.charAt(0).toUpperCase() + field.slice(1) + " already taken",
        },
      ],
    };
  }
};

module.exports = formatError;
