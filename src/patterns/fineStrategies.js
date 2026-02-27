// Strategy Pattern: different fine calculation strategies.

export class FlatFineStrategy {
  constructor(ratePerDay) {
    this.ratePerDay = ratePerDay;
  }

  calculateFine(daysOverdue) {
    return Math.max(0, daysOverdue) * this.ratePerDay;
  }
}

export class NoFineStrategy {
  calculateFine() {
    return 0;
  }
}

