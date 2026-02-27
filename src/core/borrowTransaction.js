import { addDays, isAfter } from "../utils/dateUtils.js";

export class BorrowTransaction {
  constructor(id, user, book, loanDays = 7) {
    this.id = id;
    this.user = user;
    this.book = book;
    this.borrowedAt = new Date();
    this.dueDate = addDays(this.borrowedAt, loanDays);
    this.returnedAt = null;
  }

  markReturned(date = new Date()) {
    this.returnedAt = date;
  }

  isReturned() {
    return this.returnedAt !== null;
  }

  isOverdue(now = new Date()) {
    return !this.isReturned() && isAfter(now, this.dueDate);
  }
}

