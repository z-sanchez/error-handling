//custom error class
export class AppError extends Error {
  errorCode: number;
  statusCode: number;

  constructor(errorCode: number, message: string, statusCode: number) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }

  getDetails() {
    return {
      errorCode: this.errorCode,
      message: this.message,
      stack: this.stack,
    };
  }
}
