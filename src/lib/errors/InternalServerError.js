export class InternalServerError extends Error {
  constructor(message = "Internal Server Error") {
    super(message);
    this.name = "InternalServerError";
    this.status = 500;
  }
}
