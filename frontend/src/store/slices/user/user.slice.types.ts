export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export type UserState = {
  profile: User | null;
};
