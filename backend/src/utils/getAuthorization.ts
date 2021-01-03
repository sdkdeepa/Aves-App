export function getAuthorization(event) {
    return event.headers.Authorization.split(' ')[1]; 
}