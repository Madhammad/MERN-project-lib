export const errorHandler = (statusCode, message) => {
      const error = new Error(message);
      error.statusCode = statusCode;
      error.success = false; // Explicitly set this to false
      return error;
    };