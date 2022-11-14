export type CreateUserParams = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type IUser = {
  id: number | string;
  username: string;
  email?: string;
  firstName: string;
  lastName: string;
};
