// Demo script wiring up the core components using dependency injection.

import { UserFactory } from "./patterns/userFactory.js";
import { NotificationCenter } from "./patterns/notificationObserver.js";
import { FlatFineStrategy } from "./patterns/fineStrategies.js";
import { LibrarySystem } from "./core/librarySystem.js";
import { addDays } from "./utils/dateUtils.js";

const userFactory = new UserFactory();
const notificationCenter = new NotificationCenter();
const fineStrategy = new FlatFineStrategy(1); // 1 currency unit per day

// Inject dependencies into LibrarySystem (no singletons here → testable).
const library = new LibrarySystem({
  userFactory,
  notificationCenter,
  fineStrategy,
});

// Sample usage
const alice = library.addUser("student", "Alice");
const teacherBob = library.addUser("teacher", "Bob");

const book1 = library.addBook("Clean Code", "Robert C. Martin");
const book2 = library.addBook("Domain-Driven Design", "Eric Evans");

const tx1 = library.borrowBook(alice.id, book1.id, 7);
const tx2 = library.borrowBook(teacherBob.id, book2.id, 7);

// Simulate time passing (10 days after borrow for both)
const referenceDate = addDays(tx1.borrowedAt, 10);
const overdues = library.checkOverdues(referenceDate);

console.log(\"Overdue results:\", overdues.map(o => ({\n  user: o.transaction.user.name,\n  book: o.transaction.book.title,\n  daysOverdue: o.daysOverdue,\n  fine: o.fine,\n})));\n\nconsole.log(\"Alice notifications:\", alice.getNotifications());\nconsole.log(\"Bob notifications:\", teacherBob.getNotifications());\n\n*** End Patch"}>>
