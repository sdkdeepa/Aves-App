// interface of JWT token with Header and Payload
import { JwtHeader } from 'jsonwebtoken';
import { JwtPayload } from './JwtPayload';

export interface Jwt {
    header: JwtHeader 
    payload: JwtPayload 
}