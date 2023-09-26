"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const entity_1 = __importDefault(require("../../../@seedwork/domain/entity/entity"));
const validation_error_1 = require("../../../@seedwork/domain/errors/validation-error");
const category_validator_1 = __importDefault(require("../validators/category.validator"));
//entidade - identidade, comportamentos e atributos
// id auto incremento
// politica e detalhes
// UUID - Universally Unique Identifier V4 - IETF RFC
class Category extends entity_1.default {
    // readonly permite bloquear uma edição direta do props ex: category.props = {...};
    constructor(props, id) {
        var _a, _b;
        // Validar o objeto na integra
        // Valida filho - composição de objetos
        // Validação deferida - domain service - pedido(cliente_id) e cliente
        super(props, id);
        this.props = props;
        Category.validate(props);
        this.description = (_a = this.props.description) !== null && _a !== void 0 ? _a : null;
        // this.is_active = this.props.is_active ?? true;
        if (this.props.is_active !== false) {
            this.activate();
        }
        else
            this.deactivate();
        this.props.created_at = (_b = this.props.created_at) !== null && _b !== void 0 ? _b : new Date();
    }
    update(props) {
        Category.validate(props);
        this.name = props.name;
        this.description = props.description;
        // const dtoKeys = Object.keys(new CategoryUpdateDto());
        //
        // for (let [key, value] of Object.entries(props)) {
        //   if(!dtoKeys.includes(key))
        //     throw new InvalidUpdateDataError();
        //
        //   this.props[key] = value;
        // }
    }
    // static validate(props: Omit<CategoryProperties, 'created_at'>) {
    //   ValidatorRules.values(props.name,'name').required().string().maxLength(255);
    //   ValidatorRules.values(props.description,'description').string();
    //   ValidatorRules.values(props.is_active,'is_active').boolean();
    // }
    static validate(props) {
        const validator = category_validator_1.default.create();
        const isValid = validator.validate(props);
        if (!isValid)
            throw new validation_error_1.EntityValidationError(validator.errors);
    }
    get name() {
        return this.props.name;
    }
    set name(value) {
        this.props.name = value !== null && value !== void 0 ? value : null;
    }
    get description() {
        return this.props.description;
    }
    // Forçar a não utilizar set fora da entidade.
    set description(value) {
        this.props.description = value !== null && value !== void 0 ? value : null;
    }
    get is_active() {
        return this.props.is_active;
    }
    // private set is_active(value: boolean) {
    //   this.props.is_active = value ?? true;
    // }
    get created_at() {
        return this.props.created_at;
    }
    activate() {
        this.props.is_active = true;
    }
    deactivate() {
        this.props.is_active = false;
    }
}
exports.Category = Category;
// Entidades vs Entidades Anemicas
// TDD - Kent Beck
// Tests - Fail - Success - Refactor
