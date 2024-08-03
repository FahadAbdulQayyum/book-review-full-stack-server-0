import { IUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}





// import * as express from 'express';
// import { IUser } from '../models/user';

// declare global {
//   namespace Express {
//     interface User {
//       id: number;
//       name: string;
//       // Add any other properties for your user here
//     }

//     interface Request {
//       // user?: User;
//       user?: IUser;
//     }
//   }
// }