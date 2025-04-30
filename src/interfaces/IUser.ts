export interface IUserBase {
  name: string;
  email: string;
  role: string;
  password: string;
  photoUrl?: string;
}

export interface IUser extends IUserBase {
  id: number;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IUserWithoutPassword extends Omit<IUser, "password"> {}
