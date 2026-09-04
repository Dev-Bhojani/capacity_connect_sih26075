import { useState } from "react";
import "./App.css";
import Card from "./Reusable_components/Card/Card";
import Textarea from "./Reusable_components/Textarea/Textarea";
import SearchBar from "./Reusable_components/SearchBar/SearchBar";
import ErrorState from "./Reusable_components/ErrorState/ErrorState";
import Dropdown from "./Reusable_components/Dropdown/Dropdown";
import {
  FiBarChart2,
  FiChevronDown,
  FiDownload,
  FiTrash2,
} from "react-icons/fi";
import Button from "./Reusable_components/Button/Button";
import Landing from "./Pages/Landing/Landing";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Landing />
    </>
  );
}

export default App;
