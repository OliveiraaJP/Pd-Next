import { IAppError } from "../interfaces/IAppError";

export default class RouteNotFoundError implements IAppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string = "Route not found", statusCode = 404) {
    this.message = message;
    this.statusCode = statusCode;
  }
}