const Career = require('../models/Career');

// @desc    Compare multiple careers
// @route   POST /api/careers/compare
// @access  Public
const compareCareers = async (req, res) => {
  try {
    const { careerIds } = req.body;
    
    if (!careerIds || !Array.isArray(careerIds) || careerIds.length < 2) {
      return res.status(400).json({ message: 'Please provide at least 2 career IDs to compare' });
    }
    
    if (careerIds.length > 3) {
      return res.status(400).json({ message: 'Maximum 3 careers can be compared at once' });
    }
    
    const careers = await Career.find({ _id: { $in: careerIds } });
    
    if (careers.length !== careerIds.length) {
      return res.status(404).json({ message: 'One or more careers not found' });
    }
    
    res.json(careers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all careers with search and filter
// @route   GET /api/careers?search=&category=&minSalary=&maxSalary=
// @access  Public
const getCareers = async (req, res) => {
  try {
    const { search, category, minSalary, maxSalary, sortBy } = req.query;
    
    // Build query
    let query = {};
    
    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { requiredSkills: { $in: [new RegExp(search, 'i')] } },
      ];
    }
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by salary range
    if (minSalary || maxSalary) {
      query['salaryRange.min'] = {};
      if (minSalary) {
        query['salaryRange.min'].$gte = parseInt(minSalary);
      }
      if (maxSalary) {
        query['salaryRange.max'] = { $lte: parseInt(maxSalary) };
      }
    }
    
    // Build sort object
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case 'salaryAsc':
          sort = { 'salaryRange.min': 1 };
          break;
        case 'salaryDesc':
          sort = { 'salaryRange.max': -1 };
          break;
        case 'title':
          sort = { title: 1 };
          break;
        default:
          sort = { createdAt: -1 };
      }
    } else {
      sort = { createdAt: -1 };
    }
    
    const careers = await Career.find(query).sort(sort);
    res.json(careers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single career
// @route   GET /api/careers/:id
// @access  Public
const getCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (career) {
      res.json(career);
    } else {
      res.status(404).json({ message: 'Career not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create career (Admin only)
// @route   POST /api/careers
// @access  Private/Admin
const createCareer = async (req, res) => {
  try {
    const {
      title,
      description,
      requiredSkills,
      roadmap,
      salaryRange,
      growthOpportunities,
      category,
      image,
    } = req.body;

    const career = await Career.create({
      title,
      description,
      requiredSkills,
      roadmap,
      salaryRange,
      growthOpportunities,
      category,
      image: image || '',
    });

    res.status(201).json(career);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update career (Admin only)
// @route   PUT /api/careers/:id
// @access  Private/Admin
const updateCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (career) {
      career.title = req.body.title || career.title;
      career.description = req.body.description || career.description;
      career.requiredSkills = req.body.requiredSkills || career.requiredSkills;
      career.roadmap = req.body.roadmap || career.roadmap;
      career.salaryRange = req.body.salaryRange || career.salaryRange;
      career.growthOpportunities = req.body.growthOpportunities || career.growthOpportunities;
      career.category = req.body.category || career.category;
      career.image = req.body.image || career.image;

      const updatedCareer = await career.save();
      res.json(updatedCareer);
    } else {
      res.status(404).json({ message: 'Career not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete career (Admin only)
// @route   DELETE /api/careers/:id
// @access  Private/Admin
const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (career) {
      await career.deleteOne();
      res.json({ message: 'Career removed' });
    } else {
      res.status(404).json({ message: 'Career not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCareers,
  getCareer,
  createCareer,
  updateCareer,
  deleteCareer,
  compareCareers,
};
