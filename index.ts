type CreateUserAction = {
    type: 'CREATE_USER';
    payload: { name: string; age: number };
};

type DeleteUserAction = {
    type: 'DELETE_USER';
    payload: { userId: number };
};

type UpdateUserAction = {
    type: 'UPDATE_USER';
    payload: { userId: number; name?: string; age?: number };
};

type BlockUserAction = {
    type: 'BLOCK_USER';
    payload: { userId: number; reason: string };
};

type Action = CreateUserAction | DeleteUserAction | UpdateUserAction | BlockUserAction;

function exhaustiveActionCheck(action: never): never {
    throw new Error(`Unhandled action type: ${JSON.stringify(action)}`);
}

function handleAction(action: Action): void | never {
    switch (action.type) {
        case 'CREATE_USER':
            console.log(`New user created: Name - ${action.payload.name}, Age - ${action.payload.age}`);
            break;
        case 'DELETE_USER':
            console.log(`User with ID ${action.payload.userId} has been deleted.`);
            break;
        case 'UPDATE_USER':
            let message: string = `User with ID ${action.payload.userId} has been updated.`;

            if ("name" in action.payload) {
                message += ` Name - ${action.payload.name}`;  
            }

            if ("age" in action.payload) {
                message += ` Age - ${action.payload.age}`;
            }

            console.log(message);
            break;
        case 'BLOCK_USER':
            console.log(`User with ID ${action.payload.userId} blocked. Why? - ${action.payload.reason}`);
            break;
        default:
            exhaustiveActionCheck(action);
    }
}

const actions: Action[] = [
    { type: 'CREATE_USER', payload: { name: 'John Doe', age: 25 } },
    { type: 'DELETE_USER', payload: { userId: 1 } },
    { type: 'UPDATE_USER', payload: { userId: 2, name: 'Jane Doe' } },
    { type: 'BLOCK_USER', payload: { userId: 3, reason: 'Violation of terms' } },
    // { type: 'UNBLOCK_USER', payload: { userId: 3 } }, // ERROR!
];

actions.forEach(handleAction);
