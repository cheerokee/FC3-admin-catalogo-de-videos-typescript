import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

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
export class Category {

  public readonly id: UniqueEntityId;

  // readonly permite bloquear uma edição direta do props ex: category.props = {...};
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    this.id = id ?? new UniqueEntityId(); // Quebrando o limite arquitetural
    this.description = this.props.description ?? null;
    this.is_active = this.props.is_active ?? true;
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

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at() {
    return this.props.created_at;
  }
}
// Entidades vs Entidades Anemicas
// TDD - Kent Beck
// Tests - Fail - Success - Refactor
