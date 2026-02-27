// Core LibrarySystem designed for dependency injection and testability.
// Dependencies are injected via constructor:
// - userFactory: creates users
// - notificationCenter: observer for overdue events
// - fineStrategy: strategy for fine calculation

import { BorrowTransaction } from "./borrowTransaction.js";
import { generateId } from "../utils/idGenerator.js";
import { addDays } from "../utils/dateUtils.js";

export class LibrarySystem {
  constructor({ userFactory, notificationCenter, fineStrategy }) {
    this.userFactory = userFactory;
    this.notificationCenter = notificationCenter;
    this.fineStrategy = fineStrategy;

    this.users = new Map();
    this.books = new Map();
    this.transactions = new Map();
  }

  // User management
  addUser(type, name) {
    const id = generateId("user");
    const user = this.userFactory.create(type, { id, name });
    this.users.set(id, user);
    this.notificationCenter.subscribe(user);
    return user;
  }

  getUser(id) {
    return this.users.get(id);
  }

  // Book management
  addBook(title, author) {
    const id = generateId("book");
    const book = { id, title, author, isBorrowed: false };
    this.books.set(id, book);
    return book;
  }

  getBook(id) {
    return this.books.get(id);
  }

  // Borrowing / returning
  borrowBook(userId, bookId, loanDays = 7) {
    const user = this.getUser(userId);
    const book = this.getBook(bookId);

    if (!user) throw new Error(`User ${userId} not found`);
    if (!book) throw new Error(`Book ${bookId} not found`);
    if (book.isBorrowed) throw new Error(`Book \"${book.title}\" already borrowed`);

    const currentBorrowed = this.getBorrowedTransactions(userId).length;
    if (!user.canBorrow(currentBorrowed)) {
      throw new Error(
        `User ${user.name} reached limit ${user.getMaxBorrowLimit()}`,
      );
    }

    book.isBorrowed = true;
    const id = generateId("tx");
    const tx = new BorrowTransaction(id, user, book, loanDays);
    this.transactions.set(id, tx);
    return tx;
  }

  returnBook(bookId) {
    const tx = [...this.transactions.values()].find(
      (t) => t.book.id === bookId && !t.isReturned(),
    );
    if (!tx) throw new Error(`No active transaction for book ${bookId}`);

    tx.markReturned();
    tx.book.isBorrowed = false;
    return tx;
  }

  getBorrowedTransactions(userId) {
    return [...this.transactions.values()].filter(
      (t) => t.user.id === userId && !t.isReturned(),
    );
  }

  // Overdue + fines
  checkOverdues(referenceDate = new Date()) {
    const results = [];
    for (const tx of this.transactions.values()) {
      if (tx.isOverdue(referenceDate)) {
        const daysOverdue = Math.ceil(
          (referenceDate.getTime() - tx.dueDate.getTime()) / (1000 * 60 * 60 * 24),
        );
        const fine = this.fineStrategy.calculateFine(daysOverdue);
        this.notificationCenter.notifyOverdue(tx.user, tx.book);
        results.push({ transaction: tx, daysOverdue, fine });
      }
    }
    return results;
  }
}

