"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const category_1 = require("./category");
const unique_entity_id_1 = __importDefault(require("../../../@seedwork/domain/value-objects/unique-entity.id"));
// dubles de testes - mock
// stub - fake object
// spyOn - espionar uma variable, classe ou metodo
// mock - fake object - expectativa
describe("Category Unit Tests", () => {
    beforeEach(() => {
        // Fazendo com que o validator não seja executado, objetivo isolar o teste.
        category_1.Category.validate = jest.fn();
    });
    test('constructor of category', () => {
        // Triple AAA = Arrange Act Assert
        // Arrange + Act
        let category = new category_1.Category({ name: 'Movie' });
        expect(category_1.Category.validate).toHaveBeenCalled();
        // Dessa forma conseguimos omitir o created at, pois ele só conseguimos obter dentro da classe Category
        let props = (0, lodash_1.omit)(category.props, 'created_at');
        // Assert
        // Sem omitir o created at nao conseguiriamos trabalhar com strictEqual
        expect(props).toStrictEqual({
            name: 'Movie',
            description: null,
            is_active: true
        });
        expect(category.props.created_at).toBeInstanceOf(Date);
        category = new category_1.Category({
            name: 'Movie',
            description: 'some description',
            is_active: true
        });
        /* Compara propriedade por propriedade do objeto com modelo, inclusive os tipos de cada propriedade */
        let created_at = new Date();
        expect(category.props).toStrictEqual({
            name: 'Movie',
            description: 'some description',
            is_active: true,
            created_at
        });
        category = new category_1.Category({
            name: 'Movie',
            description: 'other description'
        });
        /*
        * toMatchObject - Checa parcialmente se um objeto é igual a outro, significa que se o
        * objeto construído tiver uma propriedade a mais que o modelo, ele vai considerar com verdadeiro,
        * nesse caso se quisermos comprar propriedade por propriedade devemos usar o toStrictEqual
        * */
        expect(category.props).toMatchObject({
            name: 'Movie',
            description: 'other description'
        });
        category = new category_1.Category({
            name: 'Movie',
            is_active: true
        });
        expect(category.props).toMatchObject({
            name: 'Movie',
            is_active: true
        });
        created_at = new Date();
        category = new category_1.Category({
            name: 'Movie',
            created_at
        });
        expect(category.props).toMatchObject({
            name: 'Movie',
            created_at
        });
    });
    test('id field', () => {
        const data = [
            { props: { name: 'Movie' } },
            { props: { name: 'Movie' }, id: null },
            { props: { name: 'Movie' }, id: undefined },
            { props: { name: 'Movie' }, id: new unique_entity_id_1.default() },
        ];
        data.forEach(i => {
            const category = new category_1.Category(i.props, i.id);
            expect(category.id).not.toBeNull(); // Usando o not como combinação
            expect(typeof category.id).toBe("string");
            expect(category.uniqueEntityId).toBeInstanceOf(unique_entity_id_1.default);
        });
    });
    test('getter of name field', () => {
        const category = new category_1.Category({ name: 'Movie' });
        expect(category.name).toBe('Movie');
    });
    test('getter and setter of description field', () => {
        let category = new category_1.Category({ name: 'Movie', description: 'some description' });
        expect(category.description).toBe('some description');
        category = new category_1.Category({ name: 'Movie' });
        expect(category.description).toBeNull();
        category = new category_1.Category({ name: 'Movie', description: undefined });
        expect(category.description).toBeNull();
    });
    test('getter and setter of is_active props', () => {
        let category = new category_1.Category({
            name: 'Movie'
        });
        expect(category.props.is_active).toBeTruthy();
        category = new category_1.Category({
            name: 'Movie',
            is_active: true
        });
        expect(category.description).toBeNull();
        category = new category_1.Category({
            name: 'Movie',
            is_active: false
        });
        expect(category.is_active).toBeFalsy();
    });
    test('getter of created_at props', () => {
        let category = new category_1.Category({
            name: 'Movie'
        });
        expect(category.props.created_at).toBeInstanceOf(Date);
        let created_at = new Date();
        category = new category_1.Category({
            name: 'Movie',
            created_at
        });
        expect(category.created_at).toBe(created_at);
    });
    test('update category', () => {
        const category = new category_1.Category({ name: 'cat 1', description: 'desc 1' });
        category.update({ name: 'cat 2', description: 'desc 2' });
        // Chamou o validador na construção e na atualização
        expect(category_1.Category.validate).toHaveBeenCalledTimes(2);
        expect(category.name).toBe('cat 2');
        expect(category.description).toBe('desc 2');
        category.update({ name: 'cat 2', description: 'desc 3' });
        expect(category.name).toBe('cat 2');
        expect(category.description).toBe('desc 3');
        // expect(() => {
        //   category.update({ name: 'cat 3', xpto: 123 } as any);
        // }).toThrow(new InvalidUpdateDataError());
    });
    test('active and deactive category', () => {
        let category = new category_1.Category({ name: 'cat 1' });
        expect(category.is_active).toBeTruthy();
        category.deactivate();
        expect(category.is_active).toBeFalsy();
        category.activate();
        expect(category.is_active).toBeTruthy();
        category = new category_1.Category({ name: 'cat 1', is_active: null });
        expect(category.is_active).toBeTruthy();
        category = new category_1.Category({ name: 'cat 1', is_active: undefined });
        expect(category.is_active).toBeTruthy();
        category = new category_1.Category({ name: 'cat 1', is_active: false });
        expect(category.is_active).toBeFalsy();
    });
});
