


const errors = require("./errorTypes");
const ValidationError = errors.ValidationError;

function validateName(name) {
  if (!name || name.trim() === "") {
    throw new ValidationError("Name is required");
  }
}

function validateEmail(email) {
  if (!email || email.trim() === "") {
    throw new ValidationError("Email is required");
  }

  if (!email.includes("@")) {
    throw new ValidationError("Email must contain @ symbol");
  }
}

function validatePhone(phone) {
  if (!phone || phone.trim() === "") {
    throw new ValidationError("Phone is required");
  }
}
    //מרכזת את כל הבדיקות 
    //אם משהו לא תקין --- נזרקת שגיאה
function validateContact(contact) {
  validateName(contact.name);
  validateEmail(contact.email);
  validatePhone(contact.phone);
}

module.exports = {
  validateContact,validateName,
  validateEmail,validatePhone
};