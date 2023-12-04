import * as joi from "joi";
import {Request} from "express";
import {userLoginSchema} from "./models-joi/userLoginSchema";
import {createConversationSchema} from "./models-joi/createConversationSchema";
import {addMessageConversationSchema} from "./models-joi/addMessageConversationSchema";
import {seeMessageConversationSchema} from "./models-joi/seeMessageConversationSchema";
import {reactionMessageSchema} from "./models-joi/reactionMessageSchema";
import {editMessageSchema} from "./models-joi/editMessageSchema";

interface JoiRequestValidatorResponse {
    error?: string
}

interface JoiRouteValidator {
    route: string,
    method: string,
    validatorSchema: joi.ObjectSchema<any>
}

class JoiRequestValidator {
    validators: JoiRouteValidator[] =
        [
            {
                route: "users/login",
                method: "POST",
                validatorSchema: userLoginSchema,
            }, {
                route: "conversations/",
                method: "POST",
                validatorSchema: createConversationSchema
            }, {
                route: "conversations/:id",
                method: "POST",
                validatorSchema: addMessageConversationSchema
            }, {
                route: "conversations/see/:id",
                method: "POST",
                validatorSchema: seeMessageConversationSchema
            },{
                route: "messages/:id",
                method: "PUT",
                validatorSchema: editMessageSchema
            },{
                route: "messages/:id",
                method: "POST",
                validatorSchema: reactionMessageSchema
        }
        ];

    validate(request: Request): JoiRequestValidatorResponse {


        const validator = this.validators.find((validator) => {
            return validator.route ===  (request.baseUrl + request.route.path).substring(1) && validator.method === request.method;
        });
        if (!validator) {
            return {};
        }
        const {error} = validator.validatorSchema.validate(request.body);
        if (error) {
            return {error: error.details[0].message};
        }
        return {};
    }
}

export const JoiRequestValidatorInstance = new JoiRequestValidator();