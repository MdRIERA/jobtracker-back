const Job = require("../models/Job");

const getJobs = async (req, res) => {
  try {
    const filter = {};

    if (req.query.company) {
      filter.company = {
        $regex: `^${req.query.company}$`,
        $options: "i",
      };
    }

    if (req.query.title) {
      filter.title = {
        $regex: `^${req.query.title}$`,
        $options: "i",
      };
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ofertas" });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Oferta no encontrada" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener oferta" });
  }
};

const createJob = async (req, res) => {
  try {
    const { title, company, location, description, url, source, salary } =
      req.body;

    if (!title?.trim() || !company?.trim()) {
      return res
        .status(400)
        .json({ message: "Title y company son obligatorios" });
    }

    const job = await Job.create({
      user: req.user._id,
      title,
      company,
      location,
      description,
      url,
      source,
      salary,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error al crear oferta" });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Oferta no encontrada" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar oferta" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Oferta no encontrada" });
    }

    await job.deleteOne();

    res.json({ message: "Oferta eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar oferta" });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};