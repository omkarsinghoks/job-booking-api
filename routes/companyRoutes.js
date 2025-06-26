const router = require("express").Router();
const {
  companyRegisterHandler,
  getAllCompaniesHandler,
  getCompanyByIdHandler,
  updateCompanyHandler,
} = require("../controllers/companyController");
router.post("/register", companyRegisterHandler);
router.get("/all", getAllCompaniesHandler);
router.get("/:id", getCompanyByIdHandler);
router.put("/:id", updateCompanyHandler);

module.exports = router;
