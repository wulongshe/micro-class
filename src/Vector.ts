export type Tuple<D extends number, V, T extends unknown[] = []> =
  T['length'] extends D
  ? T
  : Tuple<D, V, [V, ...T]>

export type Tuples<T extends number[], V> =
  T extends [infer D extends number, ...infer N extends number[]]
  ? Tuple<D, V> | Tuples<N, V>
  : never

type CrossProduct<T extends Tuples<[2, 3], number>> =
  T extends Tuple<3, number>
  ? (that: T | Vector<T>) => Vector<T>
  : never

type Vertical<T extends Tuples<[2, 3], number>> =
  T extends Tuple<2, number>
  ? (reverse?: boolean) => Vector<T>
  : T extends Tuple<3, number>
  ? (that: T | Vector<T>, reverse?: boolean) => Vector<T>
  : never

export class Vector<T extends Tuples<[2, 3], number>> {
  tuple: T
  constructor(items: T | Vector<T>) {
    this.tuple = Array.isArray(items) ? items : items.tuple
  }

  static resolveTuple<T extends Tuples<[2, 3], number>>(vector: T | Vector<T>) {
    return Array.isArray(vector) ? vector : vector.tuple
  }
  static reverse<T extends Tuples<[2, 3], number>>(first: T | Vector<T>) {
    return new Vector(first).reverse()
  }
  static unit<T extends Tuples<[2, 3], number>>(first: T | Vector<T>) {
    return new Vector(first).unit()
  }
  static add<T extends Tuples<[2, 3], number>>(first: T | Vector<T>, second: T | Vector<T>) {
    return new Vector(first).add(second)
  }
  static sub<T extends Tuples<[2, 3], number>>(first: T | Vector<T>, second: T | Vector<T>) {
    return new Vector(first).sub(second)
  }
  static dotProduct<T extends Tuples<[2, 3], number>>(first: T | Vector<T>, second: T | Vector<T>) {
    return new Vector(first).dotProduct(second)
  }
  static crossProduct<T extends Tuple<3, number>>(first: T | Vector<T>, second: T | Vector<T>) {
    return new Vector(first).crossProduct(second as T)
  }

  magnitude() {
    return Math.sqrt(this.tuple.map(v => v * v).reduce((prev, curr) => prev + curr))
  }
  reverse() {
    this.tuple.forEach((val, i, tuple) => tuple[i] = -val)
    return this
  }
  unit(reverse = false) {
    const mod = this.magnitude()
    const unitVector = new Vector(this.tuple.map(val => val / mod) as T)
    return !reverse ? unitVector : unitVector.reverse()
  }
  private binaryFunc<T extends Tuples<[2, 3], number>>(
    that: T | Vector<T>,
    operator: (a: number, b: number) => number
  ) {
    !Array.isArray(that) && (that = that.tuple)
    this.tuple.forEach((_, i, tuple) => tuple[i] = operator(tuple[i], (that as T)[i]))
    return this
  }
  equals(that: T | Vector<T>) {
    const [u1, u2] = this.tuple
    const [v1, v2] = Vector.resolveTuple(that)
    return u1 === v1 && u2 === v2
  }
  isParallel(that: T | Vector<T>) {
    const [u1, u2, u3] = this.tuple
    const [v1, v2, v3] = Vector.resolveTuple(that)
    return u3 && v3
      ? u1 * v2 === v1 * u2 && u2 * v3 === v2 * u3
      : u1 * v2 === v1 * u2
  }
  isVertical(that: T | Vector<T>) {
    return this.dotProduct(that) === 0
  }
  add(that: T | Vector<T>) {
    return this.binaryFunc(that, (a, b) => a + b)
  }
  sub(that: T | Vector<T>) {
    return this.binaryFunc(that, (a, b) => a - b)
  }
  dotProduct(that: T | Vector<T>) {
    const tuple = Vector.resolveTuple(that)
    return this.tuple.reduce((prev, curr, i) => prev + curr * tuple[i], 0)
  }
  crossProduct: CrossProduct<T> = ((that: T | Vector<T>) => {
    const [u1, u2, u3] = this.tuple as Tuple<3, number>
    const [v1, v2, v3] = Vector.resolveTuple(that) as Tuple<3, number>
    const tuple = [u2 * v3 - v2 * u3, u1 * v3 - v1 * u3, u1 * v2 - v1 * u2] as T
    return new Vector(tuple)
  }) as any
  vertical: Vertical<T> = ((that: T | Vector<T> = false as any, reverse = false) => {
    if (this.tuple.length === 2) {
      reverse = that as unknown as boolean
      const [x, y] = this.tuple
      return new Vector(reverse ? [-y, x] : [y, -x])
    } else if (this.tuple.length === 3) {
      that = new Vector(this).crossProduct(that as Tuple<3, number>) as any
      return reverse ? that.reverse() : that
    }
  }) as any
}
