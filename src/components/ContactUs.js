import React from "react";

const ContactUs = () => {
  return (
    <div>
      <h1 className="text-3xl p-4 font-semibold">ContactUs Page</h1>
      <form className="p-4 space-x-2">
        <input
          className="border-2 border-black rounded-lg p-2"
          placeholder="name"
        />
        <input
          className="border-2 border-black rounded-lg p-2"
          placeholder="message"
        />
        <button className="border-2 border-black rounded-lg p-2 bg-slate-400">
          submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
