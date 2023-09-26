"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const invalid_uuid_error_1 = __importDefault(require("../errors/invalid-uuid.error"));
const value_object_1 = __importDefault(require("./value-object"));
class UniqueEntityId extends value_object_1.default {
    constructor(id) {
        super(id || (0, uuid_1.v4)());
        this.id = id;
        this.validate();
    }
    validate() {
        const isValid = (0, uuid_1.validate)(this.value);
        if (!isValid)
            throw new invalid_uuid_error_1.default();
    }
}
exports.default = UniqueEntityId;
// Projeto é o código e o código é projeto
