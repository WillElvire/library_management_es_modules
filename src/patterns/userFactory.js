import { Student, Teacher } from "../core/user.js";

// Factory Pattern for creating different user types.
export class UserFactory {
  create(type, { id, name }) {
    switch (type) {
      case "student":
        return new Student(id, name);
      case "teacher":
        return new Teacher(id, name);
      default:
        throw new Error(`Unknown user type: ${type}`);
    }
  }
}

