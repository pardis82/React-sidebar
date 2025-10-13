import Sidebar from "../src/components/Others/sidebar"
import "./App.css"
const menuitems = [
  { id: 1 , lable: "setting" },
  { id: 2 , lable: "Customers" },
  { id: 3 , lable: "Dash" },
];
function App() {

  return (
    <div className="App">
      <Sidebar menuItems={menuitems} />
    </div>
  );
}

export default App
