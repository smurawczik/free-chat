export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type UserState = {
  profile: User | null;
  contacts: User[];
};
