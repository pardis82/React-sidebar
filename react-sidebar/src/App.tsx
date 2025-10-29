import Sidebar from "./components/Others/sidebar";
import { Route, Routes } from "react-router-dom";
import TextInput from "./components/TextInput";
import TextArea from "./components/TextArea";
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
      <Sidebar />

      {/* Main content area */}
      <main className="bg-white flex-1 overflow-auto flex flex-col items-center justify-center bg-gray-50">
        {/* Centered content */}
        <div className="space-y-6 w-full max-w-md">
          <TextArea label="name" />
          <TextArea errorMessage="wrong" />
          <TextInput
            label="نام خانوادگی"
            placeholder="نام خانوادگی خود را وارد کنید"
          />
          <TextInput label="نام" placeholder="نام خود را وارد کنید" />
          <TextInput label="ایمیل" errorMessage="ایمیل اشتباه است" />
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
