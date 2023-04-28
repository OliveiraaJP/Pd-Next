import { IAppError } from "../interfaces/IAppError";

export default class InternalServerError implements IAppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string = "Internal server error", statusCode = 500) {
    this.message = message;
    this.statusCode = statusCode;
  }
}