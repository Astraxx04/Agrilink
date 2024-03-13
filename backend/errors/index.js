const CustomAPIError = require("./custom-error");
const BadRequestError = require("./badRequest-error");
const UnauthenticatedError = require("./unauthenticated-error");
const NotFoundError = require("./notFound-error");

module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError,
    NotFoundError
};