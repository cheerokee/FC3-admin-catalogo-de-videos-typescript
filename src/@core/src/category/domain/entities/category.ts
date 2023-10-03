import Entity from "#seedwork/domain/entity/entity";
import UniqueEntityId from "#seedwork/domain/value-objects/unique-entity.id";
import { EntityValidationError } from "#seedwork/domain/errors/validation-error";
import { CategoryUpdateDto } from "../index";
import { CategoryValidatorFactory } from "../index";

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
}
//entidade - identidade, comportamentos e atributos
// id auto incremento
// politica e detalhes
// UUID - Universally Unique Identifier V4 - IETF RFC
export class Category extends Entity<CategoryProperties> {

  // readonly permite bloquear uma edição direta do props ex: category.props = {...};
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    Category.validate(props);
    // Validar o objeto na integra
    // Valida filho - composição de objetos
    // Validação deferida - domain service - pedido(cliente_id) e cliente
    super(props,id);

    this.description = this.props.description ?? null;
    // this.is_active = this.props.is_active ?? true;

    if(this.props.is_active !== false) {
      this.activate();
    } else
      this.deactivate();

    this.props.created_at = this.props.created_at ?? new Date();
  }

  update(props: CategoryUpdateDto) {
    Category.validate(props as CategoryProperties);

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

  static validate(props: CategoryProperties) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(props);

    if(!isValid)
      throw new EntityValidationError(validator.errors);
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value ?? null;
  }

  get description() {
    return this.props.description;
  }

  // Forçar a não utilizar set fora da entidade.
  private set description(value: string) {
    this.props.description = value ?? null;
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
// Entidades vs Entidades Anemicas
// TDD - Kent Beck
// Tests - Fail - Success - Refactor

