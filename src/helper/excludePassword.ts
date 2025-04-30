import { IUser, IUserWithoutPassword } from "../interfaces/IUser";

export function excludePassword(user: IUser): IUserWithoutPassword {
  const { password, token, ...rest } = user;
  return {...rest, token: token || undefined} as IUserWithoutPassword;
}
