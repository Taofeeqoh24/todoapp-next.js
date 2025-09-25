"use client";
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';

interface EditTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: { id: number; title: string; completed?: boolean } | null ;
}

function EditTodoModal({ isOpen, onClose, todo}: EditTodoModalProps) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const mutation = useMutation({
    mutationFn: async ({ id, title }: { id: number; title: string }) => {
      const { data, error } = await supabase
        .from("todos")
        .update({ title })
        .eq("id", id)
        .select();

      if (error) throw error;
      return data?.[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // refresh todos
      onClose();
    },
  });

  if (!isOpen || !todo) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    mutation.mutate({ id: todo.id, title });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title || todo.title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <div className="flex justify-end gap-2">
            <button onClick={onClose} type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button onClick={handleSubmit} type="submit" className="px-4 py-2 bg-purple-800 text-white rounded shadow-md hover:bg-white hover:text-purple-800">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTodoModal;
