import * as mongodb from 'mongodb';

export interface Login {
  name: string;
  isAdmin: boolean;
  isPlaner: boolean;
  isBauherr: boolean;


  password: string;
  id?: mongodb.ObjectId;
}