import DistanceAttacker from './DistanceAttacker';

/**
 * Класс персонажа Demon.
 * @extends DistanceAttacker - класс с логикой атаки на расстоянии.
 */
export default class Demon extends DistanceAttacker {
  constructor(name) {
    super(name, 'Demon');
  }
}
