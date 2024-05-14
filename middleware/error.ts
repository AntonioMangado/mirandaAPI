export class APIError extends Error {
    status: number;
    message: string;
    safe: boolean;

    constructor(message: string, status: number, safe = false) {
        super(message)
        this.message = message;
        this.status = status;
        this.safe = safe;
    }
}