import "./App.css";
import { ThrowErrorComponent } from "./components/ThrowErrorComponent";

function App() {
  return (
    <>
      <div></div>
      <h1>Errors YOU Can Throw</h1>
      <ThrowErrorComponent
        message="Eval Error"
        endpoint="http://localhost:3003/evalError"
      />
    </>
  );
}

export default App;
