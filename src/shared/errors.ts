export class UnauthorizedError extends Error {
    constructor (message: string) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ForbiddenError extends Error {
    constructor (message: string) {
        super(message)
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends Error {
    constructor (message: string) {
        super(message)
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ServerError extends Error {
    constructor (message: string) {
        super(message)
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
