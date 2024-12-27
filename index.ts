interface ICalculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
    percent(a: number, b: number): number;
}

class Calculator implements ICalculator {
    add(a: number, b: number): number { return a + b; }
    subtract(a: number, b: number): number { return a - b; }
    multiply(a: number, b: number): number { return a * b; }
    divide(a: number, b: number): number | never {
        if (b === 0) throw new Error("Division by zero is not allowed");

        return a / b;
    }
    percent(a: number, b: number): number { return (a * b) / 100; }

    calculate(operation: string, a: number, b: number): number | never {
        switch (operation) {
            case "add":      return this.add(a, b);
            case "subtract": return this.subtract(a, b);
            case "multiply": return this.multiply(a, b);
            case "divide":   return this.divide(a, b);
            case "percent":  return this.percent(a, b);
            default: throw new Error(`Unknown operation: ${operation}`);
        }
    }
}

// Example usage
const calculator = new Calculator();

console.log(calculator.calculate("add", 1, 2));
console.log(calculator.calculate("subtract", 3, 4));
console.log(calculator.calculate("multiply", 5, 6));
console.log(calculator.calculate("divide", 7, 8));
console.log(calculator.calculate("percent", 9, 10));
