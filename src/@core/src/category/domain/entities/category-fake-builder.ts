import { Chance } from 'chance';
import { UniqueEntityId } from "#seedwork/domain";
import { Category } from "#category/domain";

import { PropOrFactory } from "#seedwork/@types/prop-or-factory";

export class CategoryFakeBuilder<TBuild = any> {

  private countObjs;
  private chance: Chance.Chance;

  // auto generated in entity
  private _unique_entity_id = undefined;
  // auto generated in entity
  private _created_at = undefined;
  private _name: PropOrFactory<string> = (_index) => this.chance.word();
  private _description: PropOrFactory<string> = (_index) => this.chance.paragraph();
  private _is_active: PropOrFactory<boolean> = (_index) => true;

  // retirando a possibilidade de acessar o constructor diretamente atraves do private
  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  // abstract
  static aCategory() {
    return new CategoryFakeBuilder<Category>();
  }

  static theCategories(contObjs: number) {
    return new CategoryFakeBuilder<Category[]>(contObjs);
  }

  withUniqueEntityId(valueOrFactory: PropOrFactory<UniqueEntityId>) {
    this._unique_entity_id = valueOrFactory;
    return this;
  }

  withName(valueOrFactory: PropOrFactory<string>) { // fluent pattern
    this._name = valueOrFactory;
    return this;
  }

  withInvalidNameEmpty(value: "" | null | undefined) {
    this._name = value;
    return this;
  }

  withInvalidNameTooLong(value?: string) {
    this._name = value ?? this.chance.word({ length: 256 });
    return this;
  }

  withInvalidNameNotAString(value?: any) {
    this._name = value ?? 5;
    return this;
  }

  withDescription(valueOrFactory: PropOrFactory<string | null>) { // fluent pattern
    this._description = valueOrFactory;
    return this;
  }

  withInvalidDescriptionNotAString(value?: any) {
    this._description = value ?? 5;
    return this;
  }

  activate() {
    this._is_active = true;
    return this;
  }

  deactivate() {
    this._is_active = false;
    return this;
  }

  withInvalidIsActiveEmpty(value: "" | null | undefined) {
    this._is_active = value as any;
    return this;
  }

  withInvalidIsActiveNotABoolean(value?: any) {
    this._is_active = value ?? 'fake boolean';
    return this;
  }

  withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._created_at = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const categories = new Array(this.countObjs)
      .fill(undefined)
      .map((_,index) => {
        return new Category({
          name: this.callFactory(this._name,index),
          description: this.callFactory(this._description,index),
          is_active: this.callFactory(this._is_active,index),
          ...(
            this._created_at &&
            { created_at: this.callFactory(this._created_at, index) }
          )
        }, !this._unique_entity_id ? undefined : this.callFactory(this._unique_entity_id, index))
      });

    return this.countObjs === 1 ? categories[0] as any : categories;
  }

  get unique_entity_id() {
    return this.getValue("unique_entity_id");
  }

  get name() {
    return this.getValue('name');
  }

  get description() {
    return this.getValue('description');
  }

  get is_active() {
    return this.getValue('is_active');
  }

  get created_at() {
    return this.getValue('created_at');
  }

  private getValue(prop) {
    const optional = ['unique_entity_id', 'created_at'];
    const privateProp = `_${ prop }`;

    if(!this[privateProp] && optional.includes(prop)) {
      throw new Error(`Property ${ prop } not have a factory, use 'with' methods`);
    }

    return this.callFactory(this[privateProp],0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === 'function' ? factoryOrValue(index) : factoryOrValue;
  }
}

// const categoryMovie = CategoryFakeBuilder.aCategory().build();
// const faker = CategoryFakeBuilder.theCategories(2);
// faker.withName((index) => `cateogory ${ index }`).build();
// faker.name
// const test = faker.build();
// faker.build();
// faker.build();
// faker.build();
// CategoryFakeBuilder.aCategory().build();
