// Interface-like base class for users.
export class User {
  constructor(id, name) {
    if (new.target === User) {
      throw new Error("User is an abstract base class");
    }
    this.id = id;
    this.name = name;
    this.notifications = [];
  }

  // \"Interface\" contract: subclasses must override.
  getMaxBorrowLimit() {
    throw new Error("getMaxBorrowLimit must be implemented by subclasses");
  }

  canBorrow(currentBorrowedCount) {
    return currentBorrowedCount < this.getMaxBorrowLimit();
  }

  notify(message) {
    this.notifications.push(message);
  }

  getNotifications() {
    return [...this.notifications];
  }
}

export class Student extends User {
  getMaxBorrowLimit() {
    return 3;
  }
}

export class Teacher extends User {
  getMaxBorrowLimit() {
    return 5;
  }
}

