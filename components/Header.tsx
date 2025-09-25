"use client";

import { useState } from "react";
import AddTodoModal from "./modals/AddTodo";

function Header() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className=" m-2 flex justify-between items-center text-white">
        <div className=" p-5 lg:p-10 ">
          <h1 className="md:text-[1.5em] text-[1rem] lg:text-[2rem] text-white font-bold">
            Welcome Back Taofeeqoh!
          </h1>
            <p className="lg:text-sm text-[10px] text-white">
            You can add a new task or view your tasks below.
            </p>
        </div>
        <div className="heading-buttons">
          <AddTodoModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
          <button
            className="font-bold bg-white lg:text-sm text-[12px] text-purple-800 items-center p-2 rounded-md lg:w-24 mr-8"
            onClick={() => setShowModal(true)}
          >
            Add todos
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
