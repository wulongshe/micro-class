export class MiSet<T> extends Set<T> {
  equals(that: Set<T>): boolean {
    return MiSet.equals(this, that)
  }

  static equals<T, S extends Set<T>>(first: S, second: S): boolean {
    for (const val of second) {
      if (!first.has(val)) {
        return false
      }
    }
    for (const val of first) {
      if (!second.has(val)) {
        return false
      }
    }
    return true
  }

  // 并集
  union<S extends Set<T>>(that: S): MiSet<T> {
    for (const val of that) {
      this.add(val)
    }
    return this
  }

  static union<T, S extends Set<T>>(first: Set<T>, ...that: S[]): MiSet<T> {
    return that.reduce((prev, curr) => prev.union(curr), new MiSet<T>([...first]))
  }

  // 差集
  difference<S extends Set<T>>(that: S): MiSet<T> {
    for (const val of that) {
      this.delete(val)
    }
    return this
  }

  static difference<T, S extends Set<T>>(first: Set<T>, ...that: S[]): MiSet<T> {
    return that.reduce((prev, curr) => prev.difference(curr), new MiSet<T>([...first]))
  }

  // 交集
  intersect<S extends Set<T>>(that: S): MiSet<T> {
    for (const val of this) {
      if (!that.has(val)) {
        this.delete(val)
      }
    }
    return this
  }

  static intersect<T, S extends Set<T>>(first: Set<T>, ...that: S[]): MiSet<T> {
    return that.reduce((prev, curr) => prev.intersect(curr), new MiSet<T>([...first]))
  }

  // 异或
  xor<S extends Set<T>>(that: S): MiSet<T> {
    for (const val of that) {
      if (this.has(val)) {
        this.delete(val)
      } else {
        this.add(val)
      }
    }
    return this
  }

  static xor<T, S extends Set<T>>(first: Set<T>, ...that: S[]): MiSet<T> {
    return that.reduce((prev, curr) => prev.xor(curr), new MiSet<T>([...first]))
  }

  toString(): string {
    if (this.size === 0) {
      return '{}'
    }
    let objString = ''
    for (const val of this) {
      objString = `${objString},${val}`
    }
    return `{${objString.slice(1)}}`
  }
}
