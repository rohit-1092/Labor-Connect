export function errorHandler(err, req, res, next) { 
  console.error("❌ Error:", err); // Log the error for debugging

  if (typeof err === "string") {
    return res.status(400).json({ message: err });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Invalid Token" });
  }

  return res.status(500).json({ message: "Internal Server Error", details: err.message });
}
