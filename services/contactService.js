const { validateContact } = require("../utils/validation");
const { ValidationError, ContactManagerError } = require("../utils/errorTypes");

function cleanText(value) {
  if (typeof value !== "string") {
    return value;
  }

  return value.trim();
}

function normalizeText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().toLowerCase();
}

function createContact(name, email, phone) {
  const contact = {
    name: cleanText(name),
    email: cleanText(email),
    phone: cleanText(phone),
  };

  validateContact(contact);

  return contact;
}

function checkDuplicateEmail(contacts, email) {
  const normalizedEmail = normalizeText(email);

  return contacts.some((contact) => {
    return normalizeText(contact.email) === normalizedEmail;
  });
}

function addContact(contacts, name, email, phone) {
  const contact = createContact(name, email, phone);

  if (checkDuplicateEmail(contacts, contact.email)) {
    throw new Error("Contact with this email already exists");
  }

  contacts.push(contact);

  console.log(`✓ Contact added: ${contact.name}`);
}

function deleteContact(contacts, email) {
  const normalizedEmail = normalizeText(email);

  const index = contacts.findIndex((contact) => {
    return normalizeText(contact.email) === normalizedEmail;
  });

  if (index === -1) {
    throw new Error(`No contact found with email: ${email}`);
  }

  const deletedContact = contacts.splice(index, 1)[0];

  console.log(`✓ Contact deleted: ${deletedContact.name}`);
}

function listContacts(contacts) {
  console.log("\n=== All Contacts ===");

  if (contacts.length === 0) {
    console.log("No contacts found");
    return;
  }

  contacts.forEach((contact, index) => {
    console.log(
      `${index + 1}. ${contact.name} - ${contact.email} - ${contact.phone}`,
    );
  });
}

function searchContacts(contacts, query) {
  const normalizedQuery = normalizeText(query);

  const results = contacts.filter((contact) => {
    return (
      normalizeText(contact.name).includes(normalizedQuery) ||
      normalizeText(contact.email).includes(normalizedQuery)
    );
  });

  console.log(`\n=== Search Results for "${query}" ===`);

  if (results.length === 0) {
    console.log(`No contacts found matching "${query}"`);
    return;
  }

  results.forEach((contact, index) => {
    console.log(
      `${index + 1}. ${contact.name} - ${contact.email} - ${contact.phone}`,
    );
  });
}

module.exports = {
  createContact,
  addContact,
  deleteContact,
  listContacts,
  searchContacts,
};
