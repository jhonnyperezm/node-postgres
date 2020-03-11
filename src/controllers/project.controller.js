import Project from "../models/Projects";

export async function createProject(req, res) {
  const { name, priority, description, deliverydate } = req.body;

  try {
    let newProject = await Project.create(
      {
        name,
        priority,
        description,
        deliverydate
      },
      { fields: ["name", "priority", "description", "deliverydate"] }
    );

    if (newProject) {
      return res.json({
        message: "Project created succcesfully",
        data: newProject
      });
    }
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: "somenthing goes wrong"
    });
  }
}

export async function getProjects(req, res) {
  const projects = await Project.findAll();
  res.json({
    data: projects
  });
}

export async function getOneProject(req, res) {
  const { id } = req.params;
  const project = await Project.findOne({
    where: {
      id
    }
  });

  res.json({
    data: project
  });
}

export async function deleteProject(req, res) {
  const { id } = req.params;
  const deleterowCount = await Project.destroy({
    where: {
      id
    }
  });
  console.log(deleterowCount);

  res.json({
    message: "Project deleted",
    count: deleterowCount
  });
}

export async function updateProject(req, res) {
  const { id } = req.params;
  const { name, priority, description, deliverydate } = req.body;

  const projects = await Project.findAll({
    attributes: ["id", "name", "priority", "description", "deliverydate"],
    where: {
      id
    }
  });

  if (projects.length > 0) {
    projects.forEach(async project => {
      await project.update({
        name,
        priority,
        description,
        deliverydate
      });
    });
  }

  return res.json({
    message: "Correcto",
    data: projects
  });
}
