const API_URL = "https://jsonplaceholder.typicode.com/todos";

export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Ошибка загрузки задач");
  }

  return response.json();
}

export async function getTask(id: number): Promise<Task> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Задача не найдена");
  }

  return response.json();
}

export async function createTask(
  task: Omit<Task, "id">
): Promise<Task> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Ошибка создания задачи");
  }

  return response.json();
}

export async function updateTask(
  id: number,
  task: Partial<Task>
): Promise<Task> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Ошибка обновления");
  }

  return response.json();
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Ошибка удаления");
  }
}