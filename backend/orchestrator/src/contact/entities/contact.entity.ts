type Contact = {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
};

export class ContactResponse {
  id: string;
  contact: Contact;
}
