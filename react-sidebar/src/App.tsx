import Sidebar from "./components/Others/sidebar";
import { Route, Routes } from "react-router-dom";
import TextInput from "./components/TextInput";
import TextArea from "./components/TextArea";
import "./App.css";
import { useState } from "react";
// Add these basic page components
function Home() {
  return <div className="p-6">Home Page</div>;
}

function About() {
  return <div className="p-6">About Page</div>;
}

function Contact() {
  return <div className="p-6">Contact Page</div>;
}

function App() {
  return (
    <>
      <div className="m-10 flex items-center">
        <TextArea label="name" />
      </div>
      <div className="m-10 flex items-center">
        <TextArea errorMessage="wrong" />
      </div>

      <div className="m-10 flex items-center ">
        <TextInput
          label=" نام خانوادگی"
          placeholder="نام خانوادگی خود را وارد کنید"
        />
      </div>
      <div className="m-10 flex items-center">
        <TextInput label="نام" placeholder="نام خود را وارد کنید" />
      </div>
      <div className="m-10 flex items-center">
        <TextInput label="ایمیل" errorMessage="ایمیل اشتباه است" />
      </div>

      {/* <div className="app flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div> */}
    </>
  );
}

export default App;
