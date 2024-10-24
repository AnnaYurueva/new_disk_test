export interface IUserRegistration {
    email: string
    password: string
    confirm_password: string
}
export interface IUserLogin {
    email: string
    password: string
}
export interface INote {
    id?: number
    title: string
    content: string
}