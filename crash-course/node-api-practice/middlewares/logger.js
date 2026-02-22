// log method + url

export const logger = (req, res) => {
  console.log(`${req.method} ${req.url}`);
};
