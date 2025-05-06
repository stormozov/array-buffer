import Magician from '../Magician.js';

describe('Класс Magician', () => {
  describe('Конструктор', () => {
    test('Должен создавать персонажа Magician', () => {
      const magician = new Magician('Magician');
      expect(magician).toBeInstanceOf(Magician);
    });
  });
});
