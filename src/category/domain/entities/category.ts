import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import Entity from "../../../@seedwork/domain/entity/entity";
import { CategoryUpdateDto } from "../dtos/category-update.dto";
import InvalidUpdateDataError from "../../../@seedwork/errors/invalid-update-data.error";

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
    super(props,id);

    this.description = this.props.description ?? null;
    // this.is_active = this.props.is_active ?? true;

    if(this.props.is_active !== false) {
      this.activate();
    } else
      this.deactivate();

    this.props.created_at = this.props.created_at ?? new Date();
  }

  get name() {
    return this.props.name;
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

  update(props: CategoryUpdateDto) {
    const dtoKeys = Object.keys(new CategoryUpdateDto());

    for (let [key, value] of Object.entries(props)) {
      if(!dtoKeys.includes(key))
        throw new InvalidUpdateDataError();

      this.props[key] = value;
    }
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
