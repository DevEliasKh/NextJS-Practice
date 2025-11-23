import { useState } from "react";

import Header from "./components/Header";
import UserInputs from "./components/UserInputs";
import Result from "./components/Result";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    investmentDuration: 10,
  });

  const inputIsValid = userInput.investmentDuration > 0;

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevData) => {
      return { ...prevData, [inputIdentifier]: +newValue };
    });
  }
  return (
    <>
      <Header />
      <UserInputs userInput={userInput} onChange={handleChange} />
      {inputIsValid ? (
        <Result userInput={userInput} />
      ) : (
        <p>Please add a proper duration</p>
      )}
    </>
  );
}

export default App;
