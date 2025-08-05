import { validate } from "class-validator"
import { NextFunction } from "express"
import { AppError } from "./error"

const validateDto = async(DTO:any, next:NextFunction) => {

    const errors = await validate(DTO)
    if(errors.length){
       const errorMessages = errors.map((error) => {
            Object.values(error.constraints || {}).flat()
       })
       return next(errorMessages)
    }
    return;
    
}
export default validateDto;