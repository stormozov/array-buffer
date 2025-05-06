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
    if ( typeof attrs !== 'object' || Array.isArray(attrs) ) {
      throw new Error(`Параметр attrs должен быть объектом. Проведена проверка: ${typeof attrs}.`);
    }

    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        if (Object.keys(this).includes(key)) {
          if (key === 'name') this.#validateName(value);
          if (key === 'type') this.#validateType(value);
          this.#validateNumericProperty(key, value);

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
    this.#validateNumericProperty('attack', value);
    this._attack = value;
  }

  /**
   * Валидация имени персонажа.
   * 
   * @param {string} name - Имя персонажа.
   * 
   * @throws {Error} - Если имя персонажа некорректно.
   */
  #validateName(name) {
    if (typeof name !== 'string' || name.length < 2 || name.length > 10) {
      throw new Error('Имя должно быть строкой длиной от 2 до 10 символов.');
    }
  }

  /**
   * Валидация типа персонажа.
   * 
   * @param {string} type - Тип персонажа.
   * 
   * @throws {Error} - Если тип персонажа некорректно.
   */
  #validateType(type) {
    if (!Character.#validTypes.includes(type) || typeof type !== 'string') {
      throw new Error('Некорректный тип персонажа.');
    }
  }

  /**
   * Валидация типа персонажа.
   * 
   * @param {string} type - Тип персонажа.
   * 
   * @throws {Error} - Если имя или тип персонажа некорректно.
   */
  #validateNameAndType(name, type) {
    this.#validateName(name);
    this.#validateType(type);
  }

  /**
   * Валидация числового свойства персонажа.
   * 
   * @param {string} key - Имя свойства.
   * @param {number} value - Значение свойства.
   * 
   * @throws {Error} - Если значение свойства не числом.
   */
  #validateNumericProperty(key, value) {
    if (
      key === 'attack' 
      || key === 'health'
      || key === 'defense'
      || key === 'distance'
      || key === 'level'
    ) {
      if (typeof value !== 'number') {
        throw new Error(`Свойство ${key} должно быть числом.`);
      }
      if (value < 0) {
        throw new Error(`Свойство ${key} не может быть отрицательным.`);
      }
      if (!Number.isInteger(value)) {
        throw new Error(`Свойство ${key} должно быть целым числом.`);
      }
    }
  }
}
