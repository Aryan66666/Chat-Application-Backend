"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const validateDto = async (DTO, next) => {
    const errors = await (0, class_validator_1.validate)(DTO);
    if (errors.length) {
        const errorMessages = errors.map((error) => {
            Object.values(error.constraints || {}).flat();
        });
        return next(errorMessages);
    }
    return;
};
exports.default = validateDto;
//# sourceMappingURL=validate.js.map