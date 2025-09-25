// types/todo.d.ts

export interface Todo {
  id: number;
  title: string;
  completed?: boolean;
  created_at?: string;
  user_id?: string;
}

export interface TodosResponse {
  data: Todo[];
  total: number;
}
