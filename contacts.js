import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

function updateContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

// contacts.js

/*
 * Розкоментуй і запиши значення
 * const contactsPath = ;
 */

export async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}
// listContacts();
export async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const res = await listContacts();
  const contact = res.find((item) => item.id === contactId);
  return contact || null;
}
export async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const res = await listContacts();
  const index = res.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = res.splice(index, 1);
  await updateContacts(res);
  return deletedContact;
}

export async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await updateContacts(contacts)
  return newContact
}
