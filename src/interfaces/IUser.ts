export interface IUserLogin {
  email: string;
  password: string;

}
export interface IUserBase extends IUserLogin {
  name: string;
  role: string;
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

export interface IUserUpdate extends Partial<IUser> {}
