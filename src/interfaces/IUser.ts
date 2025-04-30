export interface IUserBase {
  name: string;
  email: string;
}

export interface IUserRegister extends IUserBase {
  password: string;
}

export interface IUser extends IUserRegister {
  id: number;
  token: string | undefined | null;
  role: string;
  photoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IUserLogin extends Omit<IUserRegister, "name"> {}

export interface IUserWithoutPassword extends Omit<IUser, "password"> {}

export interface IUserUpdate extends Partial<IUser> {}
