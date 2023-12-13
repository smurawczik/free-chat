export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastConnection: string | null;
}

export type UserState = {
  profile: User | null;
  contacts: User[];
};
