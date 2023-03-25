export type BloonId = number & { _brand: 'bloonId' };

export type BloonType = 'red' | 'blue' | 'green' | 'yellow' | 'white' | 'black';

export type Bloon = {
  id: BloonId;
  type: BloonType;
  frozen: boolean;
  frozenTime: number;
  frozenDuration: number;
  distance: number;
}

export const createBloonId = (num: number) => num as BloonId;
