import { Category } from "./category";

describe('Category Integration Tests',() => {

  describe("create method",() => {
    it('should a invalid category using name property',() => {
      expect(() => new Category({ name: null }))
        .containsErrorMessages({
          name: [
            'name should not be empty',
            'name must be a string',
            'name must be shorter than or equal to 255 characters'
          ]
        });

      expect(() => new Category({ name: '' }))
        .containsErrorMessages({
          name: [
            'name should not be empty'
          ]
        });

      expect(() => new Category({ name: 5 as any }))
        .containsErrorMessages({
          name: [
            'name must be a string',
            'name must be shorter than or equal to 255 characters'
          ]
        });

      expect(() => new Category({ name: 't'.repeat(256) }))
        .containsErrorMessages({
          name: [
            'name must be shorter than or equal to 255 characters'
          ]
        });
    });

    it('should a invalid category using description property',() => {
      expect(() => new Category({ name: 'teste', description: 5 as any }))
        .containsErrorMessages({
          description: [
            'description must be a string',
          ]
        })
    });

    it('should a invalid category using is_active property',() => {
      expect(() => new Category({ name: 'teste', is_active: " " as any }))
        .containsErrorMessages({
          is_active: [
            'is_active must be a boolean value',
          ]
        })
    });

    it("should a valid category",() => {
      expect.assertions(0);
      new Category({ name: "Movie" });
      new Category({ name: "Movie", description: "some description" });
      new Category({ name: "Movie", description: null });
      new Category({ name: "Movie", description: "some description", is_active: false });
      new Category({ name: "Movie", description: "some description", is_active: true });
    });
  })

  describe("update method",() => {
    it('should a invalid category using name property',() => {
      const category = new Category({ name: "test" });

      expect(() => category.update({ name: null }))
        .containsErrorMessages({
          name: [
            'name should not be empty',
            'name must be a string',
            'name must be shorter than or equal to 255 characters'
          ]
        });

      expect(() => category.update({ name: '' }))
        .containsErrorMessages({
          name: [
            'name should not be empty'
          ]
        });

      expect(() => category.update({ name: 5 as any }))
        .containsErrorMessages({
          name: [
            'name must be a string',
            'name must be shorter than or equal to 255 characters'
          ]
        });

      expect(() => category.update({ name: 't'.repeat(256) }))
        .containsErrorMessages({
          name: [
            'name must be shorter than or equal to 255 characters'
          ]
        });
    });

    it('should a invalid category using description property',() => {
      const category = new Category({ name: "test" });

      expect(() => category.update({ name: 'teste', description: 5 as any }))
        .containsErrorMessages({
          description: [
            'description must be a string',
          ]
        })
    });

    it("should a valid category",() => {
      expect.assertions(0);
      const category = new Category({ name: "Movie" });
      category.update({ name: "Movie", description: "some description" });
      category.update({ name: "Movie", description: null });
    });
  })
})

// describe('Category Integration Tests',() => {
//
//   describe("create method",() => {
//     it('should a invalid category using name property',() => {
//       expect(() => new Category({ name: null }))
//         .toThrow(new ValidationError('The name is required'));
//
//       expect(() => new Category({ name: '' }))
//         .toThrow(new ValidationError('The name is required'));
//
//       expect(() => new Category({ name: 5 as any }))
//         .toThrow(new ValidationError('The name must be string'));
//
//       expect(() => new Category({ name: 't'.repeat(256) }))
//         .toThrow(new ValidationError('The name must be less or equal than 255 characters'));
//     });
//
//     it('should a invalid category using description property',() => {
//       expect(() => new Category({ name: 'teste', description: 5 as any }))
//         .toThrow(new ValidationError('The description must be string'));
//     });
//
//     it('should a invalid category using is_active property',() => {
//       expect(() => new Category({ name: 'teste', is_active: " " as any }))
//         .toThrow(new ValidationError('The is_active must be a boolean'));
//     });
//
//     it("should a valid category",() => {
//       expect.assertions(0);
//       new Category({ name: "Movie" });
//       new Category({ name: "Movie", description: "some description" });
//       new Category({ name: "Movie", description: null });
//       new Category({ name: "Movie", description: "some description", is_active: false });
//       new Category({ name: "Movie", description: "some description", is_active: true });
//     });
//   })
//
//   describe("update method",() => {
//     it('should a invalid category using name property',() => {
//       const category = new Category({ name: "test" });
//
//       expect(() => category.update({ name: null }))
//         .toThrow(new ValidationError('The name is required'));
//
//       expect(() => category.update({ name: '' }))
//         .toThrow(new ValidationError('The name is required'));
//
//       expect(() => category.update({ name: 5 as any }))
//         .toThrow(new ValidationError('The name must be string'));
//
//       expect(() => category.update({ name: 't'.repeat(256) }))
//         .toThrow(new ValidationError('The name must be less or equal than 255 characters'));
//     });
//
//     it('should a invalid category using description property',() => {
//       const category = new Category({ name: "test" });
//
//       expect(() => category.update({ name: 'teste', description: 5 as any }))
//         .toThrow(new ValidationError('The description must be string'));
//     });
//
//     it("should a valid category",() => {
//       expect.assertions(0);
//       const category = new Category({ name: "Movie" });
//       category.update({ name: "Movie", description: "some description" });
//       category.update({ name: "Movie", description: null });
//     });
//   })
// })
