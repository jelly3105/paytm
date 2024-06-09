export type UserType = {
    username: string,
    password: string,
    firstname: string,
    lastname: string
};

export type UpdateUserType = {
    password?: string,
    firstname?: string,
    lastname?: string
};