import { ContactResponse } from "../../../api/types";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastConnection: string | null;
}

export type Contact = User & { status: ContactResponse["status"] };

export type UserState = {
  profile: User | null;
  contacts: Contact[];
};
