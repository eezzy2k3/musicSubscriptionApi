const Joi = require('joi');



    // validation for signing up user
     const validateRegisterSchema = (user) =>{
        const schema = Joi.object({
            name: Joi.string().required().min(4),
            email: Joi.string().email().min(1).required(),
            password: Joi.string().required().min(6),
        }).unknown();
        return schema.validate(user);
    
    }

    module.exports = validateRegisterSchema