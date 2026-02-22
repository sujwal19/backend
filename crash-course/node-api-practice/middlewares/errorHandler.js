// catch thrown errors
// send status + JSON message

export const errorHandler = (err, req, res) => {
  console.log("Error:", err);
  res.writeHead(
    err.status || 500, //
    { "Content-Type": "application/json" },
  );
  res.end(
    JSON.stringify({
      success: false,
      message: err.message || "Internal Server Error",
    }),
  );
};
