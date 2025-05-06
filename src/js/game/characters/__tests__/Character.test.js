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

    it('Выбрасывает ошибку при вводе имени не в виде строки', () => {
      expect(() => new Character(123, 'Swordsman')).toThrow(throwsDict.name);
    });

    it('Выбрасывает при вводе имени меньше 2 символов', () => {
      expect(() => new Character('В', 'Swordsman')).toThrow(throwsDict.name);
    });

    it('Выбрасывает ошибку при вводе имени больше 10 символов', () => {
      expect(() => new Character('Максимилиан', 'Swordsman')).toThrow(throwsDict.name);
    });

    it('Выбрасывает ошибку при вводе типа персонажа не в виде строки', () => {
      expect(() => new Character('Робин', 123)).toThrow(throwsDict.type);
    });

    it('Выбрасывает ошибку при вводе типа персонажа, которого нет в списке', () => {
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

      describe('Установка корректных атрибутов', () => {
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
      });

      describe('Обработка невалидных данных', () => {
        it('Выбрасывает ошибку, если attrs не объект', () => {
          const nonObjectValue = [
            'nonObjectValue',
            123,
            false,
            NaN,
            Symbol(''),
            BigInt(0),
          ];

          nonObjectValue.forEach((value) => {
            expect(() => instance.attributes = value)
              .toThrow(`Параметр attrs должен быть объектом. Проведена проверка: ${typeof value}.`);
          });
        });

        it('Выбрасывает ошибку, если health не число', () => {
          const invalidTypes = ['string', true, {}, [], null, undefined, Symbol(''), BigInt(0)];

          invalidTypes.forEach((type) => {
            expect(() => instance.attributes = { health: type })
              .toThrow('Свойство health должно быть числом.');
          });
        });

        it('Выбрасывает ошибку, если health отрицательное', () => {
          expect(() => instance.attributes = { health: -10 })
            .toThrow('Свойство health не может быть отрицательным.');
        });

        it('Выбрасывает ошибку, если level не целое число', () => {
          expect(() => instance.attributes = { level: 1.5 })
            .toThrow('Свойство level должно быть целым числом.');
        });

        it('Выбрасывает ошибку, если name не строка', () => {
          const invalidTypes = [123, false, NaN, Symbol(''), BigInt(0)];

          invalidTypes.forEach((type) => {
            expect(() => instance.attributes = { name: type })
              .toThrow('Имя должно быть строкой длиной от 2 до 10 символов.');
          });
        });

        it('Выбрасывает ошибку, если type не строка', () => {
          const invalidTypes = [123, false, NaN, Symbol(''), BigInt(0)];

          invalidTypes.forEach((typeValue) => {
            expect(() => instance.attributes = { type: typeValue })
              .toThrow('Некорректный тип персонажа.');
          });
        });
      });

      describe('Игнорирование некорректных значений', () => {
        it('Должен игнорировать null', () => {
          instance.attributes = null;
          expect(instance.health).toBe(100);
        });

        it('Должен игнорировать undefined', () => {
          instance.attributes = undefined;
          expect(instance.health).toBe(100);
        });
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
