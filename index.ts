abstract class Shape {
    name: string;
    color: string;

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }

    abstract calculateArea(): number;
    abstract calculatePerimeter(): number;

    printInfo(): void {
        console.log(`Name: ${this.name}, Color: ${this.color}`);
    }
}

abstract class EllipticalShape extends Shape {
    radiusA: number;
    radiusB: number;

    constructor(name: string, color: string, radiusA: number, radiusB: number) {
        super(name, color);
        this.radiusA = radiusA;
        this.radiusB = radiusB;
    }

    printDiameter(): void {
        console.log(`Diameter A: ${this.radiusA * 2}, Diameter B: ${this.radiusB * 2}`);
    }
}

abstract class PolygonalShape extends Shape {
    sides: number[];

    constructor(name: string, color: string, sides: number[]) {
        super(name, color);
        this.sides = sides;
    }

    getNumberOfSides(): number {
        return this.sides.length;
    }

    calculatePerimeter(): number {
        return this.sides.reduce((acc, side) => acc + side, 0);
    }

    abstract printAreaFormula(): string;
}

class Circle extends EllipticalShape {
    constructor(color: string, radius: number) {
        super('Circle', color, radius, radius);
    }

    calculateArea(): number {
        return Math.PI * this.radiusA ** 2;
    }

    calculatePerimeter(): number {
        return 2 * Math.PI * this.radiusA;
    }
}

class Ellipse extends EllipticalShape {
    constructor(color: string, radiusA: number, radiusB: number) {
        super('Ellipse', color, radiusA, radiusB);
    }

    calculateArea(): number {
        return Math.PI * this.radiusA * this.radiusB;
    }

    calculatePerimeter(): number {
        return 2 * Math.PI * Math.sqrt((this.radiusA ** 2 + this.radiusB ** 2) / 2);
    }
}

class Rectangle extends PolygonalShape {
    constructor(color: string, width: number, height: number) {
        super('Rectangle', color, [width, height, width, height]);
    }

    calculateArea(): number {
        return this.sides[0] * this.sides[1];
    }

    printAreaFormula(): string {
        return 'a * b';
    }
}

class Square extends PolygonalShape {
    constructor(color: string, side: number) {
        super('Square', color, [side, side, side, side]);
    }

    calculateArea(): number {
        return this.sides[0] ** 2;
    }

    printAreaFormula(): string {
        return 'a^2';
    }
}

class Triangle extends PolygonalShape {
    constructor(color: string, sideA: number, sideB: number, sideC: number) {
        super('Triangle', color, [sideA, sideB, sideC]);
    }

    calculateArea(): number {
        const p = this.calculatePerimeter() / 2;

        return Math.sqrt(p * (p - this.sides[0]) * (p - this.sides[1]) * (p - this.sides[2]));
    }

    printAreaFormula(): string {
        return '2 * Math.sqrt(p * (p - a) * (p - b) * (p - c))';
    }

    printTriangleType(): void {
        const [a, b, c] = this.sides;
    
        if (a === b && b === c) {
            console.log('Equilateral');
        } else if (a === b || a === c || b === c) {
            console.log('Isosceles');
        } else {
            console.log('Scalene');
        }
    }

    calcHeight(): number {
        const [a, b, c] = this.sides;
        const p = this.calculatePerimeter() / 2;

        return 2 * Math.sqrt(p * (p - a) * (p - b) * (p - c)) / a;
    }
}

class Polygon extends PolygonalShape {
    constructor(color: string, sides: number[]) {
        super('Polygon', color, sides);
    }

    calculateArea(): number {
        const n = this.getNumberOfSides();
        let sum = 0;

        for (let i = 0; i < n; i++) {
            sum += this.sides[i] * this.sides[(i + 1) % n];
        }

        return 0.25 * Math.sqrt(sum * sum - 2 * sum * sum * Math.cos(2 * Math.PI / n));
    }

    printAreaFormula(): string {
        return '0.25 * sqrt(sum^2 - 2 * sum^2 * cos(2 * PI / n))';
    }
}
