
# Todo App (Next.js)

A modern, responsive todo application built with Next.js, TypeScript, and Supabase. This project features real-time data synchronization, pagination, search, filtering, and a clean user interface.

## Features

- Add, edit, and delete todos
- Mark todos as completed or pending
- Search todos by title
- Filter todos by status (all, completed, pending)
- Paginated todo list
- Responsive UI with Tailwind CSS
- Data persistence using Supabase

## Tech Stack

- Next.js 15
- React 19
- Supabase
- React Query
- Tailwind CSS
- TypeScript


## Getting Started

1. **Install dependencies:**
	```bash
	npm install
	```
2. **Set up Supabase:**
	- Create a project at [Supabase](https://supabase.com)
	- Add a `todos` table with columns: `id`, `title`, `completed`, `created_at`, `user_id`
	- Copy your Supabase URL and anon key to `.env.local`:
	  ```env
	  NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
	  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
	  ```
3. **Run the development server:**
	```bash
	npm run dev
	```
4. **Open the app:**
	Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Click "Add todos" to create a new task
- Use the search bar to find tasks
- Filter tasks by status
- Edit or delete tasks using the action buttons

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


