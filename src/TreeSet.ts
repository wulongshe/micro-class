import { BinarySearchTree } from './BinarySearchTree'
import { MiSet } from './MiSet'
import { Stack } from './Stack'
import type { Compare, ReplaceReturn } from './types'
import type { BinaryTreeNode } from './BinarySearchTree'
import type { MiSetMethodNames } from './MiSet'

const { equals, union, difference, intersect, xor } = MiSet.prototype

export class TreeSet<T> extends BinarySearchTree<T> implements MiSet<T> {
  [Symbol.toStringTag] = 'TreeSet'
  private iterableIterator = TreeSet.createIterableIterator(this.root, ({ value }) => value/* , this.stack */)

  constructor(compare: Compare<T>, items: T[] = []) {
    super(compare, items, false)
  }

  private static createStaticFunc(method: MiSetMethodNames, self = this) {
    return function <T, S extends Set<T>>(compare: Compare<T>, first: Set<T>, ...that: S[]) {
      return that.reduce((prev, curr) => prev[method](curr), new self(compare, [...first]))
    }
  }

  static equals = MiSet.equals
  static union = TreeSet.createStaticFunc('union')
  static difference = TreeSet.createStaticFunc('difference')
  static intersect = TreeSet.createStaticFunc('intersect')
  static xor = TreeSet.createStaticFunc('xor')

  equals = equals
  union = union as ReplaceReturn<typeof union, this>
  difference = difference as ReplaceReturn<typeof difference, this>
  intersect = intersect as ReplaceReturn<typeof intersect, this>
  xor = xor as ReplaceReturn<typeof xor, this>

  get [Symbol.iterator]() {
    this.iterableIterator = TreeSet.createIterableIterator(this.root, ({ value }) => value)
    return this.iterableIterator[Symbol.iterator]
  }
  get next() {
    return this.iterableIterator.next
  }

  add(value: T) {
    this.insert(value)
    return this
  }
  clear(): void {
    this.root = null
  }
  delete(value: T): boolean {
    return this.remove(value)
  }
  forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
    const cb = callbackfn.bind(thisArg)
    this.traverse(val => cb(val, val, this))
  }
  has(value: T): boolean {
    return this.search(value) >= 0
  }

  private static recursive<T>(stack: Stack<BinaryTreeNode<T>>, node: BinaryTreeNode<T> | null) {
    while (node) {
      stack.push(node)
      node = node.left
    }
  }
  private static createIterableIterator<T, R>(
    root: BinaryTreeNode<T> | null,
    get: (value: BinaryTreeNode<T>) => R,
    stack = new Stack<BinaryTreeNode<T>>()
  ): IterableIterator<R> {
    const iterableIterator: IterableIterator<R> = {
      [Symbol.iterator]: () => {
        stack.clear()
        TreeSet.recursive(stack, root)
        return iterableIterator
      },
      next: (): IteratorResult<R> => {
        const node = stack.pop()
        if (!node) return { value: void 0, done: true }
        TreeSet.recursive(stack, node.right)
        return { value: get(node), done: false }
      }
    }
    return iterableIterator
  }

  values(): IterableIterator<T> {
    return TreeSet.createIterableIterator(this.root, ({ value }) => value)
  }
  entries(): IterableIterator<[T, T]> {
    return TreeSet.createIterableIterator(this.root, ({ value }) => [value, value])
  }
  keys(): IterableIterator<T> {
    return TreeSet.createIterableIterator(this.root, ({ value }) => value)
  }

  toString() {
    return `{${[...this].join(',')}}`
  }
}
