import { supabase } from '../lib/supabase';
import { Todo, TodosResponse } from "../types/todo";

const getUserId = (): string => {
    if (typeof window === "undefined") return "";
  let userId = localStorage.getItem('todo-user-id');
  if (!userId) {
    userId = 'user-' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('todo-user-id', userId);
  }
  return userId;
};


export const fetchTodos = async (page: number = 1): Promise<TodosResponse> => {
  const limit = 10;
  const skip = (page - 1) * limit;
  const userId = getUserId();
  try {

    const { data, error, count } = await supabase
      .from('todos')
      .select('*', { count: 'exact' })
      .eq('user_id', userId) 
      .range(skip, skip + limit - 1)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    return {
      data: data || [],
      total: count || 0,
    };
  } catch (err) {
    console.error("Fetch todos error:", err);
    throw err;
  }
};


export const fetchTodoById = async (id: number): Promise<Todo> => {
    if (!id || isNaN(id)) {
        throw new Error("Invalid todo ID");
    }
    const userId = getUserId();

  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
        console.error("Fetch todo by id error:", error);
        throw error;
    };

    return data as Todo;
  } catch (err) {
    console.error("Fetch todo by id error:", err);
    throw err;
  }
};

export const updateTodo = async (id: number, updates: Partial<Todo>): Promise<Todo> => {
  const userId = getUserId();
  
  try {
    const { data, error } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId) // Only update if it belongs to this user
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data as Todo;
  } catch (err) {
    console.error("Update todo error:", err);
    throw err;
  }
};

// Delete todo for DeleteTodo component
export const deleteTodo = async (id: number): Promise<void> => {
  const userId = getUserId();
  
  try {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .eq('user_id', userId); 

    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("Delete todo error:", err);
    throw err;
  }
};

// Toggle todo completion status
export const toggleTodoStatus = async (id: number, completed: boolean): Promise<Todo> => {
  return updateTodo(id, { completed });
};

export type { Todo, TodosResponse };