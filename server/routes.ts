import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { tasks } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // タスク一覧の取得
  app.get("/api/tasks", async (_req, res) => {
    const allTasks = await db.select().from(tasks).orderBy(tasks.createdAt);
    res.json(allTasks);
  });

  // タスクの作成
  app.post("/api/tasks", async (req, res) => {
    const newTask = await db.insert(tasks).values({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status
    }).returning();
    res.json(newTask[0]);
  });

  // タスクの更新
  app.put("/api/tasks/:id", async (req, res) => {
    const updatedTask = await db.update(tasks)
      .set({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        updatedAt: new Date()
      })
      .where(eq(tasks.id, parseInt(req.params.id)))
      .returning();
    res.json(updatedTask[0]);
  });

  // タスクの削除
  app.delete("/api/tasks/:id", async (req, res) => {
    await db.delete(tasks).where(eq(tasks.id, parseInt(req.params.id)));
    res.status(204).end();
  });

  const httpServer = createServer(app);
  return httpServer;
}
