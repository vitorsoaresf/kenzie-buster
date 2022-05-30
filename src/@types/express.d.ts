import { DVD } from "../entities/dvd.entity";
import { User } from "../entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      validated: User  ;
      decoded: User;
      dvd: DVD;
    }
  }
}
