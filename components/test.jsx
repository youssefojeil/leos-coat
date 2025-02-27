import React from 'react';

const Test = () => {
  return (
    <button className="border-bg-000 shadow bg-bg-100 flex w-full flex-col items-start gap-2 overflow-hidden rounded-xl border p-4 text-left transition-all hover:border-accent-pro-200 scale-100 cursor-pointer opacity-100 active:scale-[0.9875]">
      <div className="bg-gradient-to-b  from-transparent to-red-700/40  pointer-events-none  absolute  inset-0  h-full  w-full"></div>
      <div className="flex flex-col gap-0.5 w-full">
        <div className="flex  gap-1  items-center  w-max  mb-1.5  uppercase  bg-gradient-to-bl  from-accent-pro-200  to-accent-pro-100  text-oncolor-100  rounded-md  px-1.5  py-[0.2rem]  text-[0.7rem]  font-medium  border  border-bg-000  shadow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="animate-pulse"
          >
            <path d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z"></path>
          </svg>
          New
        </div>
        <div className="grow font-medium text-text-100">
          Try Google Docs in Chats and Projects
        </div>
        <div className="text-sm text-text-300">
          Connect your Google Docs directly to Claude to provide additional
          context for your conversations.&nbsp;
          <a href="#" className="hover:text-accent-pro-100 underline">
            Try it out
          </a>
        </div>
      </div>
    </button>
  );
};

export default Test;
