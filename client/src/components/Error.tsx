export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div>
      <p>
        <strong>ERROR:</strong> {message}
        <br />
        <small>
          UI version: <code>GLOBAL ERROR</code>
        </small>
      </p>
    </div>
  );
};
