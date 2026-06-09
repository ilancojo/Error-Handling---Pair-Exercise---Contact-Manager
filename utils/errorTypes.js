/*
The purpose of this file is to collect all of the project's special error types in one place.
 */


//The base class for all errors in the project.All our errors inherit from it.

class ContactManagerError extends Error {
  constructor(message) {
    super(message);///Pass the message to the parent Error class - "error.message".
    this.name = this.constructor.name;
  }
}

//Designed for problems with incorrect input//from -validation.js
class ValidationError extends ContactManagerError {}

//Invalid commands error from the Terminal.
class CommandError extends ContactManagerError {
  constructor(message, usage = null) {
    super(message);
    this.usage = usage; //Description of why the argument is used 
  }
}

class DuplicateContactError extends ContactManagerError {}
class ContactNotFoundError extends ContactManagerError {}


module.exports = {
  ContactManagerError,
  ValidationError,
  CommandError,

  DuplicateContactError,
  ContactNotFoundError
};