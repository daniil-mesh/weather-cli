import { Modify } from '../types/modify.js';

export class Output {
  constructor(private data: any) {}

  public get(...modifies: Modify[]) {
    modifies.forEach((modify) => (this.data = modify(this.data)));
    return this.data;
  }
}
