"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.handleCastError = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const handleValidationError = (res, error) => {
    const errors = {};
    Object.keys(error.errors).forEach((key) => {
        const err = error.errors[key];
        if (err instanceof mongoose_1.default.Error.ValidatorError) {
            errors[key] = {
                message: err.message,
                name: err.name,
                properties: err.properties,
                kind: err.kind,
                path: err.path,
                value: err.value,
            };
        }
        else {
            errors[key] = {
                message: err.message,
                name: err.name,
                kind: err.kind,
                path: err.path,
                value: err.value,
            };
        }
    });
    return res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
            name: error.name,
            errors,
        },
    });
};
const handleCastError = (res, error) => {
    return res.status(400).json({
        message: 'Invalid ID format',
        success: false,
        error: {
            name: error.name,
            message: `Invalid ${error.path}: ${error.value}`,
            path: error.path,
            value: error.value,
            kind: error.kind
        }
    });
};
exports.handleCastError = handleCastError;
const handleError = (res, error) => {
    if (error instanceof mongoose_1.default.Error.ValidationError) {
        return handleValidationError(res, error);
    }
    if (error instanceof mongoose_1.default.Error.CastError) {
        return (0, exports.handleCastError)(res, error);
    }
    if (error.name === 'InsufficientCopiesError') {
        return res.status(400).json({
            message: error.message,
            success: false,
            error: {
                name: error.name,
                details: error.details
            }
        });
    }
    res.status(500).json({
        message: 'Internal server error',
        success: false,
        error: {
            name: error.name || 'UnknownError',
            message: error.message
        }
    });
};
exports.handleError = handleError;
