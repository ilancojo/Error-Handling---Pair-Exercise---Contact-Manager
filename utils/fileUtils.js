const fs = require("fs");

const FILE_NAME = "contacts.json";

function loadContacts() {
  console.log(`Loading contacts from ${FILE_NAME}...`);

  try {
    const data = fs.readFileSync(FILE_NAME, "utf8");
    const contacts = JSON.parse(data);

    if (!Array.isArray(contacts)) {
      throw new Error("Contacts file must contain an array");
    }

    console.log(`✓ Loaded ${contacts.length} contacts`);
    return contacts;
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("✗ File not found - creating new contact list");
      return [];
    }

    if (error instanceof SyntaxError) {
      console.log("✗ Error: Contacts file is corrupted");
      return [];
    }

    console.log("✗ Error: Could not load contacts file");
    return [];
  }
}

function writeContacts(contacts) {
    try {
        fs.writeFileSync(
            FILE_NAME,
            JSON.stringify(contacts, null, 2),
            "utf8"
        )

        console.log(`✓ Contacts saved to ${FILE_NAME}`)
    } catch (error) {
        throw new Error("Could not save contacts to file")
    }
 }
module.exports = {
  loadContacts,
  writeContacts,
};
