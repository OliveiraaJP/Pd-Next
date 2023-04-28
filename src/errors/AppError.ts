import { IAppError } from "../interfaces/IAppError";

export default class AppError implements IAppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}