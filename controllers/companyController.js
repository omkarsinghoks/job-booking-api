const Company = require("../models/companyModel");
async function companyRegisterHandler(req, res) {
  try {
    const { name, description, logoUrl } = req.body;
    if (!name || !description) {
      res.status(400).json({
        message: "Name and description are required",
      });
    }
    // Check if the company already exists
    const existingCompany = await Company.find({ name });
    if (existingCompany.length > 0) {
      throw new Error("Company already exists");
    }
    await Company.create({
      name,
      description,
      logoUrl: logoUrl,
      addedBy: req.user.id,
    });

    res.status(200).json({
      message: "Company registered successfully",
      company: {
        name,
        description,
        logoUrl: logoUrl || "https://www.gravatar.com/avatar/",
        addedBy: req.user.id,
      },
    });
    
  } catch (error) {
    console.error("Error in company registration:", error);
    throw new Error(`Internal server error: ${error.message}`);
  }
};

const getAllCompaniesHandler = async (req, res) => {
  try {
    const companies = await Company.find().populate(
      "addedBy",
      "username email"
    );
    res.status(200).json({
      message: "Companies fetched successfully",
      companies,
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
};

const getCompanyByIdHandler = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId).populate(
      "addedBy",
      "username email"
    );
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({
      message: "Company fetched successfully",
      company,
    });
  } catch (error) {
    console.error("Error fetching company:", error);
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
};

async function updateCompanyHandler(req, res) {
  try {
    const { id } = req.params;
    const { name, description, logoUrl } = req.body;
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    if (name) company.name = name;
    if (description) company.description = description;
    if (logoUrl) company.logoUrl = logoUrl;
    await company.save();
    res.status(200).json({
      message: "Company updated successfully",
      company: {
        id: company._id,
        name: company.name,
        description: company.description,
        logoUrl: company.logoUrl,
        addedBy: company.addedBy,
      },
    });
  } catch (error) {
    console.error("Error updating company:", error);
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
}

module.exports = {
  companyRegisterHandler,
  getAllCompaniesHandler,
  getCompanyByIdHandler,
  updateCompanyHandler,
};
