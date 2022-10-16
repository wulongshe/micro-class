import { List } from './List'
import { MiSet } from './MiSet'

export interface LinkListNode<T> {
  element: T
  previous: LinkListNode<T>
  next: LinkListNode<T>
}

export class LinkList<T> implements IterableIterator<T> {
  private readonly root = LinkList.createNode(null as T)
  private length = 0;

  public next: (...args: []) => IteratorResult<T>;
  public [Symbol.iterator]() {
    this.next = this.values().next
    return this
  }

  constructor(list?: T[]) {
    this.clear()
    this.insertAll(list || [])
  }

  private static createNode<T>(element: T): LinkListNode<T> {
    return { element, previous: null, next: null }
  }

  get size() {
    return this.length
  }

  values(): IterableIterator<T> {
    const { root } = this, it = {
      [Symbol.iterator]() {
        node = root
        return it
      },
      next() {
        if (node.next === root) {
          return { value: void 0, done: true }
        }
        node = node.next
        return { value: node.element, done: false }
      }
    }
    let node = root
    return it
  }

  clear() {
    const { root } = this
    root.previous = root
    root.next = root
    this.length = 0
  }
  isEmpty(): boolean {
    return this.size === 0
  }
  insert(element: T, reverse = false) {
    const node = LinkList.createNode(element)
    const { root } = this
    if (reverse) {
      root.next.previous = node
      node.previous = root
      node.next = root.next
      root.next = node
    } else {
      root.previous.next = node
      node.next = root
      node.previous = root.previous
      root.previous = node
    }
    this.length++
  }
  insertAll(list: T[], reverse = false) {
    for (const element of list) {
      this.insert(element, reverse)
    }
  }
  equals(list: LinkList<T>): boolean {
    const it1 = this[Symbol.iterator]()
    const it2 = list[Symbol.iterator]()
    let ret1: IteratorResult<T, undefined>, ret2: IteratorResult<T, undefined>
    while (
      ret1 = it1.next(),
      ret2 = it2.next(),
      !ret1.done || !ret2.done
    ) {
      if (ret1.done !== ret2.done) {
        return false
      }
      if (ret1.value !== ret2.value) {
        return false
      }
    }
    return true
  }
  contains(element: T): boolean {
    for (const ele of this.values()) {
      if (ele === element) return true
    }
    return false
  }
  containsAll(list: T[]): boolean {
    return MiSet.difference(new MiSet(list), new MiSet(this)).size === 0
  }
  indexOf(element: T) {
    let index = 0, node = this.root
    while (node.next !== this.root) {
      node = node.next
      if (node.element === element) return index
      index++
    }
    return -1
  }
  lastIndexOf(element: T) {
    let index = -1, node = this.root
    while (node.previous !== this.root) {
      node = node.previous
      if (node.element === element) return index
      index--
    }
    return 0
  }

  remove(element: T): boolean {
    let node = this.root
    while (node.next !== this.root) {
      node = node.next
      if (node.element === element) {
        node.previous.next = node.next
        node.next.previous = node.previous
        return true
      }
    }
    return false
  }
  removeAll(list: T[]): boolean {
    if (!this.containsAll(list)) return false
    const set = new Set(list)
    let node = this.root
    while (node.next !== this.root) {
      node = node.next
      if (set.has(node.element)) {
        node.previous.next = node.next
        node.next.previous = node.previous
      }
    }
    return true
  }
  removeRange(start: number, end: number): boolean {
    return !!this.splice(start, end - start)
  }

  poll(reverse = false): T | null {
    if (this.size === 0) return null
    const { root } = this
    let element = null
    if (!reverse) {
      element = root.next.element
      root.next.next.previous = root
      root.next = root.next.next
    } else {
      element = root.previous.element
      root.previous.previous.next = root
      root.previous = root.previous.previous
    }
    this.length--
    return element
  }
  peek(reverse = false): T | null {
    return !reverse
      ? this.root.next.element
      : this.root.previous.element
  }
  element(index: number): T | null {
    if (index < 0) index = index + this.size
    if (index > this.size || index < 0) return null
    if (index > (this.size >> 1)) index -= this.size
    let node = this.root
    if (index >= 0) {
      while (
        node = node.next,
        index--
      ) { }
    } else {
      while (index++) {
        node = node.previous
      }
    }
    return node.element
  }

  slice(start?: number, end?: number, step?: number): LinkList<T> {
    [start, end, step] = List.sliceDefaultValue(this.length, start, end, step)
    if (step === 0) throw Error('slice step cannot be zero')
    const list = new LinkList<T>()
    let index = 0, node = this.root
    if (step > 0 && start < end) {
      while (node.next !== this.root && index < end) {
        node = node.next
        if (start <= index) {
          list.insert(node.element)
        }
        index++
      }
    } else if (step < 0 && start > end) {
      start -= this.size, end -= this.size, index--
      while (node.previous !== this.root && end < index) {
        node = node.previous
        if (index <= start) {
          list.insert(node.element, true)
        }
        index--
      }
    }
    return list
  }
  splice(start: number, deleteCount: number, list: T[] = []): LinkList<T> {
    if (start < 0) return null
    let node = this.root, from = this.root, to = this.root
    const ret = new LinkList<T>()
    if (start > this.size) {
      from = this.root.previous
      to = this.root
    } else {
      while (start-- > 0) {
        node = node.next
      }
      from = node
      while (deleteCount-- > 0) {
        node = node.next
      }
      to = node.next
    }
    ret.root.next = from.next
    from.next.previous = ret.root
    ret.root.previous = to.previous
    to.previous.next = ret.root

    this.length -= deleteCount
    for (const ele of list) {
      node = LinkList.createNode(ele)
      from.next = node
      node.previous = from
      from = node
      this.length++
    }
    from.next = to
    to.previous = from
    return ret
  }

  clone(): LinkList<T> {
    const cloneList = new LinkList<T>()
    for (const ele of this.values()) {
      cloneList.insert(ele)
    }
    return cloneList
  }

  toArray(): T[] {
    return [...this]
  }
  toString() {
    return `{${this.toArray().join(' -> ')}}`
  }
}
