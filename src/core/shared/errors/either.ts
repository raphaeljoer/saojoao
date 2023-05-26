export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isFailure(): this is Left<L, A> {
    return true;
  }

  isSuccess(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isFailure(): this is Left<L, A> {
    return false;
  }

  isSuccess(): this is Right<L, A> {
    return true;
  }
}

export const fail = <L, A>(l: L): Either<L, A> => {
  return new Left<L, A>(l);
};

export const success = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};
