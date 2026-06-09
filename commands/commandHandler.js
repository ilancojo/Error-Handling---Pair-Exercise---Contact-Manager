const { loadContacts, writeContacts } = require("../utils/fileUtils");
const {
  addContact,
  deleteContact,
  listContacts,
  searchContacts,
} = require("../services/contactService");

function showHelp() {
  console.log(`Usage: node contacts.js [command] [arguments]

Commands:
  add "name" "email" "phone"
  list
  search "query"
  delete "email"
  help`);
}

function handleCommand(args) {
  const command = args[0];

  try {
    if (command === "add") {
      if (args.length < 4) {
        throw new Error("Missing arguments for add command");
      }

      const contacts = loadContacts();
      addContact(contacts, args[1], args[2], args[3]);
      writeContacts(contacts);
    } else if (command === "delete") {
      if (args.length < 2) {
        throw new Error("Missing arguments for delete command");
      }

      const contacts = loadContacts();
      deleteContact(contacts, args[1]);
      writeContacts(contacts);
    } else if (command === "list") {
      const contacts = loadContacts();
      listContacts(contacts);
    } else if (command === "search") {
      if (args.length < 2) {
        throw new Error("Missing arguments for search command");
      }

      const contacts = loadContacts();
      searchContacts(contacts, args[1]);
    } else if (command === "help" || !command) {
      showHelp();
    } else {
      console.log(`✗ Error: Unknown command '${command}'`);
      console.log("Usage: node contacts.js [add|list|search|delete|help]");
    }
  } catch (error) {
    console.log(`✗ Error: ${error.message}`);
  }
}

module.exports = { handleCommand };
