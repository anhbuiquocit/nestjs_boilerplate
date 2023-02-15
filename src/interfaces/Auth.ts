export interface PayloadInterface {
    email: string,
    sub: string,
    roles: string,
    iat: string,
    exp: string,
    [key: string]: any;
}