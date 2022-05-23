

const indx = (req, res, next) => {
  try {
    const docusername = req.header("x-delete");
    req.docun = docusername;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = indx;
