class ApiError extends Error{
    constructor(
        statusCode,
        errors = [],
        message = "Something went Wrong",
        stack,
    ){
            super(message)
            this.statusCode = statusCode
            this.errors = errors
            this.success = false;
            this.message = message;
            this.data = null

            if(stack){
                    this.stack = stack;
            }else{
                    Error.captureStackTrace(this,this.constructor)
            }
    }
}

export {ApiError};