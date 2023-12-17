type Contact = {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  status: string;
};

export class ContactResponse {
  id: string;
  contact: Contact;
  status: string;
}
