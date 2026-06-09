const { validateContact } = require("../utils/validation");

const { DuplicateContactError,
    ContactNotFoundError } = require("../utils/errorTypes");


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

function normalizeEmail(email) {
  return normalizeText(email);
}



function createContact(name, email, phone) {
  const contact = {
    name: cleanText(name),
    email: cleanText(email),
    phone: cleanText(phone)
  };
  validateContact(contact);
  return contact;
}

function searchContacts(contacts, name) {
  const normalizedName = normalizeText(name);

  return contacts.filter(contact => {
   
    const contactName = normalizeText(contact.name);
    return contactName.includes(normalizedName)
    });
}

function checkDuplicateEmail(contacts, email) {
  const normalizedEmail = normalizeEmail(email);

  return contacts.some(contact => {
    return normalizeEmail(contact.email) === normalizedEmail;
  });
}

function addContact(contacts, contact) {
  validateContact(contact);
  const emailExists = checkDuplicateEmail(contacts, contact.email);

  if (emailExists) {
    throw new DuplicateContactError("Contact with this email already exists");
  }
  return [...contacts, contact];
}

function deleteContact(contacts, email) {
  const normalizedEmail = normalizeEmail(email);

  const deletedContact = contacts.find(contact => {
    return normalizeEmail(contact.email) === normalizedEmail;
  });

  if (!deletedContact) {
    throw new ContactNotFoundError(`No contact found with email: ${email}`);
  }

  const updatedContacts = contacts.filter(contact => {
    return normalizeEmail(contact.email) !== normalizedEmail;
  });

  return {
    updatedContacts,
    deletedContact
  };
}

module.exports = {
  createContact,
  searchContacts,
  addContact,
  deleteContact
};