export function validationMiddleware(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      const formattedErrors = err.errors.map((error) => ({
        path: error.path.join('.'),
        message: error.message,
      }));
      res.status(400).json({ errors: formattedErrors });
    }
  };
}
