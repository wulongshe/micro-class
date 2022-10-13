export type LikeArray<T> = {
  [key: number]: T
  length: number
}

export class Stack<T> {
  private items: LikeArray<T> = { length: 0 }
  private _pushed = 0
  get pushed() {
    return this._pushed
  }

  push(element: T) {
    this.items[this.items.length++] = element
    this._pushed++
  }

  pop(): T | null {
    if (this.isEmpty()) {
      return null
    }
    this.items.length--
    const result = this.items[this.items.length]
    delete this.items[this.items.length]
    return result
  }

  peek(): T | null {
    if (this.isEmpty()) {
      return null
    }
    return this.items[this.items.length - 1]
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  size(): number {
    return this.items.length
  }

  clear() {
    this.items = { length: 0 }
    this.items.length = 0
  }

  toString(): string {
    return `[${[].join.call(this.items, ',')}]`
  }
}
