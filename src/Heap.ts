export type Compare<T> = (a: T, b: T) => boolean

export class Heap<T> {
  private map = new Map<T, number>()
  private heap: T[] = []

  constructor(private compare: Compare<T>, items: T[] = []) {
    this.buildHeap(items)
  }

  private set(index: number, value: T) {
    this.heap[index] = value
    this.map.set(this.heap[index], index)
  }

  size(): number {
    return this.heap.length
  }

  shiftUp(index: number) {
    const { heap, compare } = this, value = heap[index]
    while (true) {
      const parent = (index - 1) >> 1
      if (parent < 0 || compare(heap[parent], value)) break
      this.set(index, heap[parent])
      index = parent
    }
    this.set(index, value)
  }

  shiftDown(index: number) {
    const { heap, compare } = this, value = heap[index], size = this.size()
    let left: number
    while ((left = (index << 1) + 1) < size) {
      const child = left + 1 < size && compare(heap[left + 1], heap[left]) ? left + 1 : left
      if (compare(value, heap[child])) break
      this.set(index, heap[child])
      index = child
    }
    this.set(index, value)
  }

  insert(value: T): number {
    const index = this.size()
    this.set(index, value)
    this.shiftUp(index)
    return index
  }

  buildHeap(items: T[]) {
    items.forEach(this.insert.bind(this))
  }

  replace(index: number, value: T): boolean {
    const size = this.size()
    if (index >= size) return false

    this.map.delete(this.heap[index])
    this.set(index, value)

    this.shiftUp(index)
    this.shiftDown(index)

    return true
  }

  peek(): T | null {
    if (this.size() === 0) return null
    return this.heap[0]
  }

  search(value: T): number | undefined {
    return this.map.get(value)
  }

  remove(index = 0): T | null {
    const size = this.size()
    if (index >= size) return null
    const value = this.heap[index]

    this.map.delete(this.heap[index])
    this.set(index, this.heap[size - 1])

    this.heap.length = size - 1
    this.shiftDown(index)

    return value
  }

  static sort<T>(items: T[], compare: Compare<T>): T[] {
    const heap = new Heap(compare, items)
    for (let i = 0; i < items.length; i++) {
      items[i] = heap.remove()!
    }
    return items
  }

  toString(): string {
    if (this.size() === 0) return '[]'
    let objString = `${this.heap[0]}`
    for (let i = 1; i < this.size(); i++) {
      objString = `${objString},${this.heap[i]}`
    }
    return `[${objString}]`
  }
}
