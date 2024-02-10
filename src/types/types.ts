export type UserType = {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
};

export type UsersDataType = UserType[];

export type NewUserType = {
  username: string;
  age: number;
  hobbies: string[] | [];
};
