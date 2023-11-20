import { useEffect, useState } from "react";
import "./App.css";
import { ThrowErrorComponent } from "./components/ThrowErrorComponent";
import { ErrorMessage } from "./components/Error";

function App() {
  window.onerror = () => {
    console.log("ERROR HAPPENED SOMEWHERE");
  };

  const [error, setError] = useState("");

  useEffect(() => {
    // message is empty (meaning no errors). Adjust as needed
    if (!error) {
      setError("");
      return;
    }

    // error exists. Display the message and hide after 5 secs
    setError(error);

    const timer = setTimeout(() => {
      setError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [error]); // executes every time `message` changes. Adjust as needed

  return (
    <>
      {error ? <ErrorMessage message={error} /> : null}
      <h1>Errors YOU Can Throw</h1>
      <ThrowErrorComponent
        message="Eval Error"
        endpoint="http://localhost:3003/evalError"
        setError={(message) => setError(message)}
      />
      <ThrowErrorComponent
        message="URI Error"
        endpoint="http://localhost:3003/uriError"
        setError={(message) => setError(message)}
      />
      <ThrowErrorComponent
        message="Type Error"
        endpoint="http://localhost:3003/typeError"
        setError={(message) => setError(message)}
      />
      <ThrowErrorComponent
        message="Reference Error"
        endpoint="http://localhost:3003/referenceError"
        setError={(message) => setError(message)}
      />
      <ThrowErrorComponent
        message="Syntax Error"
        endpoint="http://localhost:3003/syntaxError"
        setError={(message) => setError(message)}
      />
      <ThrowErrorComponent
        message="Range Error"
        endpoint="http://localhost:3003/rangeError"
        setError={(message) => setError(message)}
      />
      <button
        onClick={() => {
          throw Error("THROWING GLOBAL ERROR");
        }}
      >
        I will cause a global error (see console)
      </button>
    </>
  );
}

export default App;
