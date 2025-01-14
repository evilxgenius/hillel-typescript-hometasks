type User = {
    username: string;
    password: string;
}
type Guest = {
    sessionId: string;
}
type Admin = User & {
    role: "admin";
}
type ExternalUser = {
    oauthToken: string;
}
type Entity = User | Guest | Admin | ExternalUser;

function isObject(entity: unknown): entity is Object {
    return typeof entity === 'object' && !Array.isArray(entity) && entity !== null;
}

function isUser(entity: Entity): entity is User {
    return ["username", "password"].every(key => key in entity) && !("role" in entity)
}

function isGuest(entity: Entity): entity is Guest {
    return "sessionId" in entity;
}

function isAdmin(entity: Entity): entity is Admin {
    return "role" in entity && entity.role === "admin";
}

function isExternalUser(entity: Entity): entity is ExternalUser {
    return "oauthToken" in entity;
}

function login(entity: Entity): void | never {
    if (!isObject(entity)) {
        throw new Error(`Wrong entity type. Passed "${entity}"`);
    } else if (isAdmin(entity)) {
        console.log(`Admin login with username: ${entity.username}`);
    } else if (isUser(entity)) {
        console.log(`User login with username: ${entity.username}`);
    } else if (isGuest(entity)) {
        console.log(`Guest login with sessionId: ${entity.sessionId}`);
    } else if (isExternalUser(entity)) {
        console.log(`External user login with OAuth token: ${entity.oauthToken}`);
    } else {
        console.log("Unprocessible entity");
    }
}

const user: User = { username: "JohnDoe", password: "123456" };
const guest: Guest = { sessionId: "Guest123" };
const admin: Admin = { username: "AdminUser", password: "AdminAdmin", role: "admin" };
const externalUser: ExternalUser = { oauthToken: "Bearer encrypted123" };


// Додав загальну перевірку на об'єкт, щоб не дублювати це в type guard
// login викине виключення якщо буде передане
try {
    const somethingElse = (["Who", "I", "am", "?"] as unknown) as Entity
    login(somethingElse);
} catch (e) {
    const message: string = e instanceof Error ? e.message : "An unknown error occurred"
    console.log(message);
}

login(user);
login(guest);
login(admin);
login(externalUser);
