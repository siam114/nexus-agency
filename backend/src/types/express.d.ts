import { IAuthTokenPayload } from "./index.js";

declare global {
  namespace Express {
    interface Request {
      user?: IAuthTokenPayload;
    }
  }
}

export {};

