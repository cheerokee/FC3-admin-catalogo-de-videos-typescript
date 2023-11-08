import { Chance } from 'chance';
import { PropOrFactory } from "#seedwork/@types/prop-or-factory";
import { CastMemberTypes, CastMemberTypeVo } from "../value-objects/cast-member-type.vo";
import { CastMember } from "./cast-member";
import { Category } from "#category/domain";

export class CastMemberFakeBuilder<TBuild = any> {
  private countObjs;
  private chance: Chance.Chance;
  private _unique_entity_id = undefined;
  private _created_at = undefined;
  private _name: PropOrFactory<string> = (_index) => this.chance.word();
  private _cast_member_type: PropOrFactory<CastMemberTypeVo> =
    (_index) => new CastMemberTypeVo(
      this.chance.integer({
        min: 0,
        max: Object.values(CastMemberTypes).length - 1
      })
    );

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  static aCastMember() {
    return new CastMemberFakeBuilder<CastMember>();
  }

  static theCastMembers(countObjs: number) {
    return new CastMemberFakeBuilder<CastMember[]>(countObjs);
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

  withType(valueOrFactory: PropOrFactory<CastMemberTypeVo>) {
    this._cast_member_type = valueOrFactory;
    return this;
  }

  withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._created_at = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const castMembers = new Array(this.countObjs)
      .fill(undefined)
      .map((_,index) => {
        return new CastMember({
          name: this.callFactory(this._name,index),
          ...(
            this._created_at &&
            { created_at: this.callFactory(this._created_at, index) }
          )
        },
          this.callFactory(this._cast_member_type, index), // todo checar se isso está correto
          !this._unique_entity_id ? undefined : this.callFactory(this._unique_entity_id, index)
        )
      });

    return this.countObjs === 1 ? castMembers[0] as any : castMembers;
  }

  get unique_entity_id() {
    return this.getValue("unique_entity_id");
  }

  get created_at() {
    return this.getValue('created_at');
  }

  get name() {
    return this.getValue('name');
  }

  get cast_member_type() {
    return this.getValue("cast_member_type");
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
