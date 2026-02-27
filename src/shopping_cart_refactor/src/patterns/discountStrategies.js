// Strategy Pattern for discount calculation

export class NoDiscountStrategy {
  calculate(total, items) {
    return total;
  }
}

export class PercentageDiscountStrategy {
  constructor(percentage) {
    this.percentage = percentage;
  }

  calculate(total, items) {
    const discount = (total * this.percentage) / 100;
    return total - discount;
  }
}

export class ThresholdDiscountStrategy {
  constructor(threshold, percentage) {
    this.threshold = threshold;
    this.percentage = percentage;
  }

  calculate(total, items) {
    if (total < this.threshold) return total;
    const discount = (total * this.percentage) / 100;
    return total - discount;
  }
}

