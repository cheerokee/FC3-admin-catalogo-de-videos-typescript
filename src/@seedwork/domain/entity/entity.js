"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unique_entity_id_1 = __importDefault(require("../value-objects/unique-entity.id"));
// Props = any - desobriga a fazer class Xpto extends Entity<Anithing>
class Entity {
    // readonly permite bloquear uma edição direta do props ex: category.props = {...};
    constructor(props, id) {
        this.props = props;
        this.uniqueEntityId = id || new unique_entity_id_1.default(); // Quebrando o limite arquitetural
    }
    get id() {
        return this.uniqueEntityId.value;
    }
    // Required - Faz qualquer propriedade que tiver dentro dos tipos definidos aqui ser obrigatórias
    toJSON() {
        return Object.assign({ id: this.id }, this.props);
    }
}
exports.default = Entity;
