import { Request, Response } from "express";
import { prisma } from "../prismaClient";

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany();
  res.status(200).json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const { title, importance, task, limitTime } = req.body;
  const newTask = await prisma.task.create({
    data: {
      title,
      importance,
      task,
      limitTime: new Date(limitTime),
    },
  });
  console.log(newTask);
  res.status(200).json({ message: "Task Adicionada com sucesso!", newTask });
};

export const deleteTaks = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNum = parseInt(id);

  if (isNaN(idNum)) {
    res.status(400).json({ error: "ID inválido" });
  }

  const taskExists = await prisma.task.findUnique({
    where: { id: idNum },
  });

  if (!taskExists) {
    res.status(404).json({ error: "Task não encontrada" });
  }
  const tarefaapagada = await prisma.task.delete({
    where: { id: parseInt(id) },
  });
  res
    .status(200)
    .json({ message: "tarefa apagada com sucesso!", tarefaapagada });
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { task } = req.body;

  const idNum = parseInt(id);

  if (isNaN(idNum)) {
    res.status(400).json({ error: "ID inválido" });
  }

  const taskExists = await prisma.task.findUnique({
    where: { id: idNum },
  });

  if (!taskExists) {
    res.status(404).json({ error: "Task não encontrada" });
  }

  if (task.trim() === "") {
    res.status(400).json({ message: "Tarefa vazia." });
  } else {
    const update = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { task: task },
    });
    res.status(200).json({ alert: "task atualizada com sucesso!", update });
  }
};
