const Application = require("../models/Application");
const Job = require("../models/Job");

const getApplications = async (req, res) => {
  try {
    const filter = { user: req.user._id };

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.company) {
      filter.company = {
        $regex: `^${req.query.company}$`,
        $options: "i",
      };
    }

    if (req.query.position) {
      filter.position = {
        $regex: `^${req.query.position}$`,
        $options: "i",
      };
    }

    const applications = await Application.find(filter)
      .populate("job")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener candidaturas" });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("job");

    if (!application) {
      return res.status(404).json({ message: "Candidatura no encontrada" });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener candidatura" });
  }
};

const createApplication = async (req, res) => {
  try {
    const { job, company, position, status, appliedAt, notes, contactPerson } =
      req.body;

    if (!company?.trim() || !position?.trim()) {
      return res
        .status(400)
        .json({ message: "Company y position son obligatorios" });
    }

    const application = await Application.create({
      user: req.user._id,
      job,
      company,
      position,
      status,
      appliedAt,
      notes,
      contactPerson,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: "Error al crear candidatura" });
  }
};

const createApplicationFromJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: "Oferta no encontrada" });
    }

    const existingApplication = await Application.findOne({
      user: req.user._id,
      job: job._id,
    });

    if (existingApplication) {
      return res.status(400).json({ message: "Ya te has apuntado a esta oferta" });
    }

    const application = await Application.create({
      user: req.user._id,
      job: job._id,
      company: job.company,
      position: job.title,
      status: "aplicada",
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: "Error al aplicar a la oferta" });
  }
};

const updateApplication = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({ message: "Candidatura no encontrada" });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar candidatura" });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({ message: "Candidatura no encontrada" });
    }

    await application.deleteOne();

    res.json({ message: "Candidatura eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar candidatura" });
  }
};

module.exports = {
  getApplications,
  getApplicationById,
  createApplication,
  createApplicationFromJob,
  updateApplication,
  deleteApplication,
};