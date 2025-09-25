"use client";
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchTodoById } from '../../../api/fetchApi';
import Header from '@/components/Header';

function TodoDetail() {
  const params = useParams<{ id: string }>();
  const todoId = Number(params.id);
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['todo', todoId],
    queryFn: () => fetchTodoById(todoId),
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError) return <div className="p-4 text-red-500">Error loading todo</div>;
  if (!data) return <div className="p-4 text-red-500">Todo not found</div>;

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto mt-6 bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
        <p><strong>ID:</strong> {data.id}</p>
        <p><strong>Task:</strong> {data.title}</p>
        <p>
          <strong>Status:</strong>{' '}
          <span className={data.completed ? 'text-green-600' : 'text-yellow-600'}>
            {data.completed ? 'Completed' : 'Pending'}
          </span>
        </p>
        <p><strong>User ID:</strong> {data.user_id}</p>

        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          ← Back
        </button>
      </div>
    </>
  );
}

export default TodoDetail;
