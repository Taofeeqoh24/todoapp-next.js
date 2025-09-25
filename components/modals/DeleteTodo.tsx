"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "@/api/fetchApi";

interface DeleteTodoProps {
  id: number;
}

function DeleteTodoModal({ id }: DeleteTodoProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this todo?")) {
      mutation.mutate(id);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-[8px] lg:text-sm bg-red-600 text-white p-1 border rounded-lg lg:w-14 w-8 hover:bg-red-700"
      disabled={mutation.isPending}
    >
        {mutation.isPending ? "..." : "Delete"}
    </button>
  );
}

export default DeleteTodoModal;
