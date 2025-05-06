import Demon from '../Demon';

describe('Класс Demon', () => {
  describe('Конструктор', () => {
    test('Должен создавать персонажа Demon', () => {
      const demon = new Demon('Demon');
      expect(demon).toBeInstanceOf(Demon);
    });
  });
});
