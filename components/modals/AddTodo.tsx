"use client";

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddTodoModal({ isOpen, onClose,}: AddTodoModalProps) {
  const [titleText, setTitleText] = React.useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (title: string) => {
      const userId = localStorage.getItem("todo-user-id") || "guest"; 
      const { data, error } = await supabase
        .from("todos")
        .insert([{ title, completed: false, user_id: userId }]) 
        .select();

      if (error) throw error;
      return data?.[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); 
      setTitleText("");
      onClose();
    },
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!titleText.trim()) return;
    mutation.mutate(titleText);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Add New Todo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            placeholder="Enter your task"
            className="w-full p-2 border rounded mb-4"
          />
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-800 text-white rounded shadow-md hover:bg-white hover:text-purple-800"
            >
              Add
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTodoModal;
