import Character from '../Character';

describe('Класс Character', () => {
  describe('Конструктор', () => {
    const throwsDict = {
      name: 'Имя должно быть строкой длиной от 2 до 10 символов.',
      type: 'Некорректный тип персонажа.',
    }

    it('Должен создавать персонажа Character', () => {
      const character = new Character('Агиль', 'Demon');
      expect(character).toBeInstanceOf(Character);
    });

    it('Должен выдать ошибку при вводе имени не в виде строки', () => {
      expect(() => new Character(123, 'Swordsman')).toThrow(throwsDict.name);
    });

    it('Должен выдать ошибку при вводе имени меньше 2 символов', () => {
      expect(() => new Character('В', 'Swordsman')).toThrow(throwsDict.name);
    });

    it('Должен выдать ошибку при вводе имени больше 10 символов', () => {
      expect(() => new Character('Максимилиан', 'Swordsman')).toThrow(throwsDict.name);
    });

    it('Должен выдать ошибку при вводе типа не в виде строки', () => {
      expect(() => new Character('Робин', 123)).toThrow(throwsDict.type);
    });

    it('Должен выдать ошибку при вводе типа, которого нет в списке', () => {
      expect(() => new Character('Робин', 'Archer')).toThrow(throwsDict.type);
    });
  });

  describe('Методы', () => {
    describe('attributes()', () => {
      let instance;
      const expectedAttributes = {
        health: 200,
        level: 2,
        defense: 1,
        distance: 2,
      };

      beforeEach(() => {
        instance = new Character('Робин', 'Swordsman');
      });

      it('Должен оставить атрибуты без изменений', () => {
        const expectedAttributes = {
          health: 100,
          level: 1,
          defense: 0,
          distance: 1,
        };

        Object.entries(expectedAttributes).forEach(([key, value]) => {
          expect(instance[key]).toBe(value);
        });
      });

      it('Должен установить новые атрибуты', () => {
        instance.attributes = expectedAttributes;

        Object.entries(expectedAttributes).forEach(([key, value]) => {
          expect(instance[key]).toBe(value);
        });
      });

      it('Должен обновить существующие атрибуты даже если переданы несуществующие', () => {
        instance.attributes = {
          ...expectedAttributes,
          attack: 10,
          test: 'nonExistentValue',
        };

        Object.entries(expectedAttributes).forEach(([key, value]) => {
          expect(instance[key]).toBe(value);
        });
      });

      it('Не должен добавлять несуществующие атрибуты', () => {
        instance.attributes = {
          attack: 10,
          test: 'nonExistentValue',
        };

        expect(instance.attack).toBe(0);
        expect(instance).not.toHaveProperty('test');
      });

      it('Должен игнорировать null или undefined', () => {
        instance.attributes = null;
        expect(instance.health).toBe(100);
        
        instance.attributes = undefined;
        expect(instance.health).toBe(100);
      });
    });

    describe('attack()', () => {
      let instance;

      beforeEach(() => {
        instance = new Character('Робин', 'Swordsman');
      });

      it('Должен возвращать значение атаки по умолчанию', () => {
        expect(instance.attack).toBe(0);
      });

      it('Должен устанавливать значение атаки', () => {
        instance.attack = 50;
        expect(instance.attack).toBe(50);
      });
    });
  });
});
