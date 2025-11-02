import Sidebar from "./components/Others/sidebar";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import SelectTextField from "./components/Others/SelectTextFields";

import TextField from "./components/Others/TextField";
import "./App.css";

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
    <div className="flex h-screen">
      {/* Sidebar always visible on the left */}
      {/* <Sidebar /> */}

      {/* Main content area */}
      <main className="bg-white flex-1 overflow-auto flex  items-center justify-center bg-gray-50">
        {/* Centered content */}
        <div className="space-y-6 w-full max-w-md">
          <TextField
            label="نام"
            multiline
            minrows={5}
            maxrows={10}
            defaultValue="پردیس"
          />
          <TextField label="نام" placeholder="نام خود را وارد کنید" />
          <TextField errorMessage="اشتباه" />
          <TextField multiline errorMessage="اشتباه" />
          <SelectTextField
            errorMessage="wrong"
            options={[
              { value: "1", label: "Default value" },
              {
                value: "2",
                label: "one",
              },
            ]}
          />
          <SelectTextField
            label="name"
            options={[
              { value: "1", label: "Default value" },
              {
                value: "2",
                label: "one",
              },
            ]}
          />
        </div>

        {/* Example: if you later enable routes */}
        {/* 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        */}
      </main>
    </div>
  );
}

export default App;
