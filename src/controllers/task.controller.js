import Task from "../models/Tasks";

export async function createTask(req, res) {
  const { name, done, projectid } = req.body;

  const newTask = await Task.create(
    {
      name,
      done,
      projectid
    },
    { fields: ["name", "done", "projectid"] }
  );

  res.json({ message: "new task create" });
}

export async function getTask(req, res) {
  const tasks = await Task.findAll({
    attributes: ["id", "projectid", "name", "done"],
    order: [["id", "DESC"]]
  });

  res.json({ tasks });
}

export async function getOneTask(req, res) {
  const { id } = req.params;
  const task = await Task.findOne({
    where: { id },
    attributes: ["id", "name", "projectid", "done"]
  });

  res.json({ task });
}

export async function updateTask(req, res) {
  const { id } = req.params;
  const { name, done, projectid } = req.body;

  const task = await Task.findOne({
    attributes: ["name", "projectid", "done", "id"],
    where: { id }
  });

  const updateTask = await task.update(
    {
      name,
      done,
      projectid
    },
    { where: { id } }
  );

  res.json({
    message: "Actualizado",
    updateTask
  });
}

export async function deleteTask(req, res) {
  const { id } = req.params;
  const task = await Task.destroy({
    where: {
      id
    }
  });

  res.json({
    task,
    message: "Eliminado correctamente"
  });
}

export async function getTasksByProject(req, res) {
  const { projectid } = req.params;
  const task = await Task.findAll({
    where: { projectid },
    attributes: ["id", "name", "projectid", "done"]
  });
  res.json({ task });
}
