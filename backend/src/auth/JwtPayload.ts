// interface for JWT token payload: 

export interface JwtPayload {
    iss: string, // issuer
    sub: string, // subject
    iat: number, // issued at
    exp: number // expiration time
}