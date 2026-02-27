// Simple Observer pattern implementation for overdue notifications.
// Observers are User-like objects with a notify(message) method.

export class NotificationCenter {
  constructor() {
    this.observers = new Set();
  }

  subscribe(user) {
    this.observers.add(user);
  }

  unsubscribe(user) {
    this.observers.delete(user);
  }

  notifyOverdue(user, book) {
    if (this.observers.has(user) && typeof user.notify === "function") {
      user.notify(`Book \"${book.title}\" is overdue.`);
    }
  }
}

