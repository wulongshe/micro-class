export class Stack<T> {
  private count = 0
  private items: { [key: number]: T } = {}

  push(element: T) {
    this.items[this.count++] = element
  }

  pop(): T | null {
    if (this.isEmpty()) {
      return null
    }
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }

  peek(): T | null {
    if (this.isEmpty()) {
      return null
    }
    return this.items[this.count - 1]
  }

  isEmpty(): boolean {
    return this.count === 0
  }

  size(): number {
    return this.count
  }

  clear() {
    this.items = {}
    this.count = 0
  }

  toString(): string {
    if (this.isEmpty()) {
      return '[]'
    }
    let objString = `${this.items[0]}`
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return `[${objString}]`
  }
}
