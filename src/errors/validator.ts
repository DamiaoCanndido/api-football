import { HttpException } from './http-exception';

export class Validator<T extends {}> {
  constructor(private data: T) {}

  blank(): this {
    for (const key in this.data) {
      if (this.data[key] === '') {
        throw new HttpException(400, `The field ${key} is empty.`);
      }
    }
    return this;
  }

  missing(): this {
    for (const key in Object.entries(this.data)) {
      if (Object.entries(this.data)[key][1] === undefined) {
        throw new HttpException(
          400,
          `The field ${Object.keys(this.data)[key]} is missing.`
        );
      }
    }
    return this;
  }
}
