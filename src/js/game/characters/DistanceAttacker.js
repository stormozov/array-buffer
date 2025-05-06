import Character from './Character';

/**
 * Класс персонажа, который может атаковать в зависимости от расстояния.
 * @extends Character - базовый класс персонажа.
 */
export default class DistanceAttacker extends Character {
  _hasConfusionEffect = false;
  maxAttackDistance = 5;

  /**
   * Получить значение атаки у персонажа.
   * @returns {number} - Значение атаки.
   */
  get attack() {
    let attackValue = this._attack * (1 - (this.distance - 1) * 0.1);
    
    if (this._hasConfusionEffect) {
      attackValue -= Math.log2(this.distance) * this.maxAttackDistance;
    }

    return Math.max(0, Math.round(attackValue));
  }

  /**
   * Установить значение атаки у персонажа.
   * @param {number} value - Значение атаки.
   */
  set attack(value) {
    this._attack = value;
  }

  /**
   * Получить значение состояния дурмана у персонажа.
   * @returns {boolean} - Значение состояния дурмана.
   */
  get confusionEffect() {
    return this._hasConfusionEffect;
  }

  /**
   * Установить значение состояния дурмана у персонажа.
   * @param {boolean} value - Значение состояния дурмана.
   */
  set confusionEffect(value) {
    this._hasConfusionEffect = Boolean(value);
  }
}
