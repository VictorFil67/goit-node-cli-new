import { program } from "commander";
import yargs from "yargs";
import * as contactsOperations from "./contacts.js";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ...
      const list = await contactsOperations.listContacts();
      console.log(list);
      break;

    case "get":
      // ... id
      const contact = await contactsOperations.getContactById(id);
      console.log(contact);
      break;

    case "add":
      // ... name email phone
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log(newContact);
      break;

    case "remove":
      // ... id
      const deletedContact = await contactsOperations.removeContact(id);
      console.log(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
// const actionIndex = process.argv.indexOf("--action");
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   invokeAction({ action });
// }
// const { argv } = yargs(process.argv);
// console.log(argv);
// const { _, $0, ...comands } = argv;
// invokeAction(comands);
invokeAction(options);
// invokeAction({ action: action });
