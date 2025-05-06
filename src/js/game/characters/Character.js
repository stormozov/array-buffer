/**
 * Базовый класс для всех персонажей.
 */
export default class Character {

  /**
   * Валидные типы персонажа.
   */
  static #validTypes = [
    'Bowman',
    'Swordsman',
    'Magician',
    'Demon',
    'Undead',
    'Zombie'
  ];

  constructor(name, type) {
    // Валидация аргументов
    this.#validateNameAndType(name, type);

    // Свойства персонажа (изменяются через сеттер attributes)
    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
    this.defense = 0;
    this.distance = 1;

    // Защищённые свойства (взаимодействие через геттеры и сеттеры)
    this._attack = 0;
  }

  /**
   * Установка атрибутов персонажа.
   * @param {Object} attrs - Объект с атрибутами персонажа.
   */
  set attributes(attrs = {}) {
    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        if (Object.keys(this).includes(key)) {
          this[key] = value;
        }
      });
    }
  }

  /**
   * Получить значение атаки у персонажа.
   * @returns {number} - Значение атаки.
   */
  get attack() {
    return this._attack;
  }

  /**
   * Установить значение атаки у персонажа.
   * @param {number} value - Значение атаки.
   */
  set attack(value) {
    this._attack = value;
  }

  /**
   * Валидация имени и типа персонажа.
   * 
   * @param {string} name - Имя персонажа.
   * @param {string} type - Тип персонажа.
   * 
   * @throws {Error} - Если имя или тип персонажа некорректны.
   */
  #validateNameAndType(name, type) {
    if (typeof name !== 'string' || name.length < 2 || name.length > 10) {
      throw new Error('Имя должно быть строкой длиной от 2 до 10 символов.');
    }

    if (!Character.#validTypes.includes(type)) {
      throw new Error('Некорректный тип персонажа.');
    }
  }
}
