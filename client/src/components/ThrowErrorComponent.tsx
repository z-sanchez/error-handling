import { useState } from "react";
import axios from "axios";

export const ThrowErrorComponent = ({
  endpoint,
  message,
  setError,
}: {
  endpoint: string;
  message: string;
  setError: (message: string) => void;
}) => {
  const [response, setResponse] = useState("No Request Sent");

  const makeAxiosRequest = () => {
    axios
      .get(endpoint)
      .then((result) => {
        setResponse(JSON.stringify(result));
      })
      .catch((error) => {
        //AXIOS will enter this catch block even if the server responds with data
        //error.response will be undefined and error.message carries network errors not from server
        error.response
          ? setResponse(JSON.stringify(error.response.data))
          : setResponse(error.message);

        error.response
          ? setError(error.response.data.message)
          : setError(error.message);
      });
  };

  // const makeFetchRequest = async () => {
  //   try {
  //     const response = await fetch(endpoint);
  //     const result = await response.json();

  //     if (!response.ok) {
  //       // If the server response is not okay, throw an error with details from the response body
  //       throw new Error(
  //         JSON.stringify({
  //           name: result.name,
  //           message: result.message,
  //           stack: result.stack,
  //         }) || "An error occurred"
  //       );
  //     }
  //     setResponse(JSON.stringify(result));
  //   } catch (error) {
  //     if (error instanceof Error) setResponse(error.message as string);
  //   }
  // };

  const makeFetchRequest = () => {
    fetch(endpoint)
      .then(async (response) => {
        if (!response.ok) {
          // If the server response is not okay, throw an error with details from the response body
          //this if block will get the error details hidden in the response
          const result = await response.json();
          throw new Error(
            JSON.stringify({
              name: result.name,
              message: result.message,
              stack: result.stack,
            }) || "An error occurred"
          );
        }

        return response.json();
      })
      .then((result) => {
        setResponse(JSON.stringify(result));
      })
      .catch((error) => {
        if (error instanceof Error) {
          setResponse(error.message as string);
          setError(JSON.parse(error.message).message);
        }
      });
  };

  return (
    <div className="card">
      <p className="read-the-docs">{message}</p>
      <button onClick={() => makeAxiosRequest()}>THROW ME! (AXIOS)</button>
      <button onClick={() => makeFetchRequest()}>THROW ME! (Fetch)</button>
      <p>
        Response <code>{response}</code>
      </p>
    </div>
  );
};
