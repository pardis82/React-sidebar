import Sidebar from "./components/Others/sidebar";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import SelectTextField from "./components/Others/SelectTextFields";
import Select from "./components/Others/SelectField";
import SimpleTooltip from "./components/Others/SimpleTooltip";
import type { OptionProps } from "./components/Others/SelectField";
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
  const [selected, setSelected] = useState<OptionProps[]>([]);
  const [selectedCounties , setSelectedCountires] = useState<OptionProps[]>([])
  const [selectedLevel , setSelectedLevel] = useState<OptionProps[]> ([])

  return (
    <div className="flex h-screen ">
      {/* Sidebar always visible on the left */}
      {/* <Sidebar /> */}

      {/* Main content area */}
      <main className="bg-red-300 flex-1 overflow-auto flex  items-center justify-center bg-gray-50">
        {/* Centered content */}
        <div className="mr-3 mt-40 space-y-6 w-full max-w-md">
          <TextField
            label="نام"
            multiline
            minrows={2}
            maxrows={10}
            defaultValue="پردیس"
          />
          <TextField
            label="نام"
            placeholder="نام خود را وارد کنید"
            helperText="نام باید حداقل 3 حرف باشد"
          />
          <TextField errorMessage="اشتباه" />
          <TextField multiline errorMessage="اشتباه" />

          <TextField
            label="رمز عبور"
            errorMessage="اجباری است"
            helperText="رمز باید حداقل 8 کاراکتر باشد"
          />
          <Select
            multiple={true}
            showSelectAll={true}
            selectAllText="همه" // ← Custom text
            deselectAllText="لغو همه" // ← Custom text
            options={[
              { value: "1", label: "گزینه ۱" },
              { value: "2", label: "گزینه ۲" },
              { value: "3", label: "گزینه ۳" },
            ]}
            value={selected}
            onChange={setSelected}
            label="انتخاب شما"
          />
        </div>
        <div className="mr-10 mt-20 p-4 border rounded-lg bg-white">
          <p className="text-sm mb-3 text-gray-700">Grid test 2 columns</p>
          <div className="grid grid-cols-2 gap-6 ">
            <TextField
              label="نام"
              placeholder="نام خود را وارد کنید"
              helperText="نام باید حداقل 3 حرف باشد"
            />
            <TextField label="نام خانوادگی" />

            <TextField label="ایمیل" />
            <Select
              multiple={true}
              showSelectAll={true}
              selectAllText="همه" // ← Custom text
              deselectAllText="لغو همه" // ← Custom text
              label="سطح"
              options={[
                { value: 1, label: "A1" },
                { value: 2, label: "A2" },
                { value: 3, label: "B1" },
              ]}
              value={selectedLevel}
              onChange={setSelectedLevel}
            />
          </div>
        </div>
        <div className="mr-10 mt-10 p-4 border rounded-lg bg-white ">
          <p className="text-sm mb-3 text-gray-700">Grid test 3 columns</p>
          <div className=" grid grid-cols-3 gap-4">
            <TextField label="کد ملی" />
            <TextField label="سن" />
            <Select
              multiple={true}
              showSelectAll={true}
              selectAllText="همه" // ← Custom text
              deselectAllText="لغو همه" // ← Custom text
              label="کشور"
              options={[
                { value: "ir", label: "Iran" },
                { value: "de", label: "Germany" },
              ]}
              value={selectedCounties}
              onChange={setSelectedCountires}
            />
          </div>
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
