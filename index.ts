// Academic performance: total credits, gpa
// Person info: first name, last name, birth day, gender: male, female, other
// Contact info = ...
// Full person info = ...;

enum Roles {
    Student = "student",
    Teacher = "teacher"
}

enum Genders {
    Male = 'male',
    Female = 'female'
}

enum Disciplines {
    ComputerScience = "Computer Science",
    Mathematics = "Mathematics",
    Physics = "Physics",
    Biology = "Biology",
    Chemistry = "Chemistry"
}

enum AcademicStatuses {
    Active = "active",
    AcademicLeave = "academic leave",
    Graduated = "graduated",
    Expelled = "expelled"
}

type PersonInfo = {
    firstName: string;
    lastName: string;
    birthDay: Date;
    gender: Genders;
    email: string;
    phone: string;
}

const defaultContact = {
    email: "info@university.com",
    phone: "+380955555555",
};

class UniversityError extends Error {
    message: string;

    constructor(message: string) {
        super(message);
        this.name = "UniversityError";
    }
}

class University {
    name: string;
    courses: Array<Course> = [];
    groups: Array<Group> = [];
    people: Array<Person> = [];

    constructor(name: string) {
        this.name = name;
    }

    addCourse(course: Course): void {
        this.courses.push(course);
    }

    addGroup(group: Group): void {
        this.groups.push(group);
    }

    addPerson(person: Person): void {
        this.people.push(person);
    }

    findGroupByCourse(course: Course): Group | void {
        return this.groups.find((group) => group.course === course);
    }

    getAllPeopleByRole(role: Roles): Person[] | never {
        switch (role) {
            case "student":
                return this.people.filter((person) => person.role === "student");
            case "teacher":
                return this.people.filter((person) => person.role === "teacher");
            default:
                return this.assertNeverRole(role);
        }
    }

    assertNeverRole(role: Roles): never {
        throw new Error(`Unhandled role: ${role}`);
    }
}

class Course {
    name: string;
    credits: number;
    discipline: Disciplines;

    constructor(name: string, credits: number, discipline: Disciplines) {
        this.name = name;
        this.credits = credits;
        this.discipline = discipline;
    }
}

class Group {
    name: string;
    course: Course;
    teacher: Teacher;
    students: Array<Student> = [];

    constructor(name: string, course: Course, teacher: Teacher) {
        this.name = name;
        this.course = course;
        this.teacher = teacher;
    }

    addStudent(student: Student): never | void {
        if (this.students.includes(student)) {
            throw new UniversityError("Student is already in the group");
        }

        this.students.push(student);
    }

    removeStudentById(id: number): never | void {
        const index: number = this.students.findIndex((student) => student.id === id);

        if (!~index) {
            throw new UniversityError("Student not found in group");
        }

        this.students.splice(index, 1);
    }

    getAverageGroupScore(): number {
        if (this.students.length) {
            return 0;
        }

        const totalScore: number = this.students.reduce(
            (sum, student) => sum + student.getAverageScore(),
            0
        );

        return totalScore / this.students.length;
    }

    getStudents(): Student[] {
        return [...this.students];
    }

    getStudentById(id: number | number[]): never | Student | Student[] {
        if (Array.isArray(id)) {
            return this.students.filter(student => id.includes(student.id));
        }
        
        const student: Student | void = this.students.find(student => student.id === id);
    
        if (!student) {
            throw new UniversityError("Student not found in group");
        } 

        return student;    
    }
}

class Person {
    static nextId: number = 1;

    firstName: string;
    lastName: string;
    birthDay: Date;
    id: number;
    gender: Genders;
    contactInfo: typeof defaultContact;
    role: Roles;

    constructor(info: PersonInfo, role: Roles) {
        const { firstName, lastName, birthDay, gender, email, phone } = info;

        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDay = birthDay;
        this.id = Person.nextId++;
        this.gender = gender;
        this.contactInfo = { email, phone };
        this.role = role;
    }

    get fullName(): string {
        return `${this.lastName} ${this.firstName}`;
    }

    get age(): number {
        const today: Date = new Date();
        let age: number = today.getFullYear() - this.birthDay.getFullYear();
        const monthDiff: number = today.getMonth() - this.birthDay.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < this.birthDay.getDate())
        ) {
            age--;
        }

        return age;
    }
}

class Teacher extends Person {
    specializations = [];
    courses: Array<Course> = [];

    constructor(info: PersonInfo, specializations = []) {
        super(info, "teacher" as Roles.Teacher);
        this.specializations = specializations;
    }

    assignCourse(course: Course): void {
        this.courses.push(course);
    }

    removeCourse(courseName: string): void {
        this.courses = this.courses.filter((course) => course.name !== courseName);
    }

    getCourses(): Course[] {
        return [...this.courses];
    }
}

class Student extends Person {
    academicPerformance = {
        totalCredits: 0,
        gpa: 0,
    };
    enrolledCourses: Array<Course> = [];
    status: AcademicStatuses;

    constructor(info: PersonInfo) {
        super(info, "student" as Roles.Student);
        this.status = "active" as AcademicStatuses;
    }

    enrollCourse(course: Course): never | void {
        if (this.status !== "active") {
            throw new UniversityError(
                "Cannot enroll: Student is not in active status"
            );
        }

        this.enrolledCourses.push(course);
        this.academicPerformance.totalCredits += course.credits;
    }

    getAverageScore(): number {
        return this.academicPerformance.gpa;
    }

    updateAcademicStatus(newStatus: AcademicStatuses): void {
        this.status = newStatus;
    }

    getEnrolledCourses(): Course[] {
        return [...this.enrolledCourses];
    }
}