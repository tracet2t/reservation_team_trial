const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      console.log(result.error.errors);
      const errorMessages = result.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  };
  
  module.exports = validate;