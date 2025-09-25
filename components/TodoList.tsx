"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodos, toggleTodoStatus} from "@/api/fetchApi";
import  { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import FilterControls from "./Filter";
import EditTodoModal from "./modals/EditTodo";
import DeleteTodoModal from "./modals/DeleteTodo";
import { Todo, TodosResponse } from "@/types/todo";


function TodoList() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<TodosResponse, Error>({
    queryKey: ["todos", page],
    queryFn: () => fetchTodos(page),
    placeholderData: (previousData) => previousData ?? { data: [], total: 0 },
  });

  //toggle todo status mutation
  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) => 
      toggleTodoStatus(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  })

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (isError)
    return (
      <div className=" h-screen m-4 rounded-4xl text-2xl p-8 bg-white text-red-500">
        <p className="text-center">Error loading todos</p>
      </div>
    );
  if (!data) {
    return <div className="text-center p-4">No data available.</div>;
  }

  const totalPages = Math.ceil(data.total / 10);
  const filteredTodos = data?.data?.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all"
        ? true
        : filterStatus === "completed"
        ? todo.completed
        : !todo.completed;

    return matchesSearch && matchesFilter;
  }) ?? [];

  const handleOpenEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setShowEdit(true);
  };

  return (
    <div className="rounded-4xl p-4 lg:p-10 min-h-screen bg-slate-200 mt-[10px]">
      <div className="flex justify-between mt-[-10px] max-lg:flex-col">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterControls
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>
      <p className="font-bold text-2xl ml-4">My Tasks</p>
      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="m-4 p-2 rounded-lg flex justify-between items-center bg-purple-300 hover:bg-[#F3F0CA] hover:text-purple-800 hover:shadow-md hover:border"
          >
            <Link href={`/todos/${todo.id}`}>
              <div>
                <span
                  className={`text-[10px] lg:text-[12px] font-bold p-1 lg:p-2 ${
                    todo.completed ? "text-purple-800" : "text-yellow-600"
                  }`}
                >
                  <button className="bg-[#F3F0CA] shadow-md rounded-lg p-1.5">
                    {todo.completed ? "Completed" : "Pending"}
                  </button>
                </span>
                <span className="text-[12px] lg:text-[16px]">{todo.title}</span>
                <input
                  type="checkbox"
                  checked={todo.completed ?? false}
                  onChange={() =>
                    toggleMutation.mutate({
                      id: todo.id,
                      completed: !todo.completed,
                    })
                  }
                  disabled={toggleMutation.isPending}
                  className="ml-1 cursor-pointer"
                />
                <span
                  className={`${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                ></span>
              </div>
            </Link>
            <div className="border-gray-50 rounded-sm shadow-xl text-nowrap ">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleOpenEdit(todo);
                }}
                className="text-[10px] lg:text-sm border hover:shadow-md rounded-lg m-2 p-1 lg:w-14 w-8"
              >
                Edit
              </button>

              <DeleteTodoModal id={todo.id} />
            </div>
            {showEdit && (
              <EditTodoModal
                isOpen={showEdit}
                onClose={() => setShowEdit(false)}
                todo={selectedTodo}
              />
            )}

          </li>
          
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between m-4 mt-8 space-x-2">
        <button
          className="text-sm px-3 py-1 bg-purple-800 shadow-md text-white rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="bg-purple-800 shadow-md text-white px-3 py-1">{`${page} of ${totalPages}`}</span>
        <button
          className="px-3 text-sm py-1 bg-purple-800 shadow-md text-white rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TodoList;
