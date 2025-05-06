import DistanceAttacker from '../DistanceAttacker';
import Magician from '../Magician';

describe('Класс DistanceAttacker', () => {
  describe('Конструктор', () => {
    it('Должен создавать экземпляр класса DistanceAttacker', () => {
      const distanceAttacker = new DistanceAttacker('Робин', 'Magician');
      expect(distanceAttacker).toBeInstanceOf(DistanceAttacker);
    });
  });

  describe('Методы', () => {
    describe('attack()', () => {
      let instance;

      beforeEach(() => {
        instance = new Magician('Гендальф');
      });

      it('Должен возвращать значение атаки у мага при дистанции в 3 и силе 60', () => {
        instance.attack = 60;
        instance.attributes = { distance: 3 };
        
        expect(instance.attack).toBe(48);
      });

      it('Должен возвращать значение атаки у мага при дистанции в 3, силе 60 и применении эффекта дурмана', () => {
        instance.attack = 60;
        instance.confusionEffect = true;
        instance.attributes = { distance: 3 };

        expect(instance.attack).toBe(40);
      });
    });

    describe('confusionEffect()', () => {
      let instance;

      beforeEach(() => {
        instance = new Magician('Саруман');
      });

      it('Должен возвращать значение состояния дурмана у мага по умолчанию', () => {
        expect(instance.confusionEffect).toBe(false);
      });

      it('Должен возвращать измененное значение состояния дурмана у мага', () => {
        instance.confusionEffect = true;
        expect(instance.confusionEffect).toBe(true);
      });
    });
  });
});
