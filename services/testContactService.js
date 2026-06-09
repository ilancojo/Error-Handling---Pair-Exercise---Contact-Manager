const {
  createContact,
  searchContacts,
  addContact,
  deleteContact
} = require("./contactService");

let contacts = [
  { name: "John Doe", email: "john@example.com", phone: "555-123-4567" },
  { name: "Jane Smith", email: "jane@example.com", phone: "555-987-6543" }
];

console.log("=== Success Tests ===");

try {
  const newContact = createContact(
    " Bob Brown ",
    " bob@gmail.com ",
    " 555-111-2222 "
  );

  contacts = addContact(contacts, newContact);

  console.log("After add:");
  console.log(contacts);

  console.log("Search john:");
  console.log(searchContacts(contacts, "john"));

  console.log("Search gmail:");
  console.log(searchContacts(contacts, "gmail"));

  const result = deleteContact(contacts, "jane@example.com");

  contacts = result.updatedContacts;

  console.log("Deleted contact:");
  console.log(result.deletedContact);

  console.log("After delete:");
  console.log(contacts);

} catch (error) {
  console.log(error.name);
  console.log(error.message);
}


console.log("=== Invalid Email Test ===");

try {
  createContact("Bad User", "invalid-email", "555-1234");
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}


console.log("=== Delete Not Found Test ===");

try {
  deleteContact(contacts, "notfound@example.com");
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}


console.log("=== Duplicate Email Test ===");

try {
  const duplicateContact = createContact(
    "Fake John",
    "john@example.com",
    "555-0000"
  );

  contacts = addContact(contacts, duplicateContact);
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}