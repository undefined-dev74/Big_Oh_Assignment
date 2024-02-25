import ProductPage from "@/views/ProductPage";
import { Button, Stack } from "@mui/material";
import { useState } from "react";
import "./App.css";
import StepperForm from "./views/StepperForm";

function App() {
  const [title, setTitle] = useState("Select Assignment");
  const [currentAssignment, setCurrentAssignment] = useState(2);
  return (
    <>
      <h1>{title}</h1>
      <Stack direction="row" justifyContent="center">
        <Button
          variant="text"
          onClick={() => {
            setCurrentAssignment(1);
            setTitle("Assignment 1");
          }}
        >
          Assignment 1
        </Button>
        <Button
          variant="text"
          onClick={() => {
            setCurrentAssignment(2);
            setTitle("Assignment 2");
          }}
        >
          Assignment 2
        </Button>
      </Stack>
      <div className="card">
        {currentAssignment === 1 && <ProductPage />}
        {currentAssignment === 2 && <StepperForm />}
      </div>
    </>
  );
}

export default App;
