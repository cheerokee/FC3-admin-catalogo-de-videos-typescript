import UniqueEntityId from "../value-objects/unique-entity-id.vo";

// Props = any - desobriga a fazer class Xpto extends Entity<Anithing>
export default abstract class Entity<Props = any> {

  public readonly uniqueEntityId: UniqueEntityId;

  // readonly permite bloquear uma edição direta do props ex: category.props = {...};
  constructor(public readonly props: Props, id?: UniqueEntityId) {
    this.uniqueEntityId = id || new UniqueEntityId(); // Quebrando o limite arquitetural
  }

  get id(): string {
    return this.uniqueEntityId.value;
  }

  // Required - Faz qualquer propriedade que tiver dentro dos tipos definidos aqui ser obrigatórias
  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props
    } as Required<{ id: string } & Props>;
  }
}
