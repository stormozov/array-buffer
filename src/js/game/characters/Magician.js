import DistanceAttacker from './DistanceAttacker';

/**
 * Класс персонажа Magician.
 * @extends DistanceAttacker - класс с логикой атаки на расстоянии.
 */
export default class Magician extends DistanceAttacker {
  constructor(name) {
    super(name, 'Magician');
  }
}
