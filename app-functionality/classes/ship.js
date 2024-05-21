export default class Ship {
  constructor(length, numHits) {
    this.length = length;
    this.numHits = numHits;
    this.sunk = false;
  }

  getNumHits() {
    return this.numHits;
  }

  hit() {
    if (this.numHits < this.length) {
      this.numHits++;
      return true;
    } else return false;
  }

  isSunk() {
    if (this.numHits === this.length) {
      return true;
    } else return false;
  }
}
