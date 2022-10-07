import { expect, test } from 'vitest'
import { Stack } from '../src'

test('Stack toString', async () => {
  expect(new Stack().toString()).toBe('[]')
})

test('Stack push', async () => {
  const stack = new Stack<number>()
  stack.push(1)
  expect(stack.toString()).toBe('[1]')
  stack.push(2)
  expect(stack.toString()).toBe('[1,2]')
})

test('Stack isEmpty', async () => {
  const stack = new Stack<number>()
  expect(stack.isEmpty()).toBe(true)
  stack.push(1)
  expect(stack.isEmpty()).toBe(false)
})

test('Stack size', async () => {
  const stack = new Stack<number>()
  expect(stack.size()).toBe(0)
  stack.push(1)
  expect(stack.size()).toBe(1)
})

test('Stack pop', async () => {
  const stack = new Stack<number>()
  expect(stack.pop()).toBeNull()
  stack.push(1)
  expect(stack.pop()).toBe(1)
  expect(stack.toString()).toBe('[]')
})

test('Stack peek', async () => {
  const stack = new Stack<number>()
  expect(stack.peek()).toBeNull()
  stack.push(1)
  expect(stack.peek()).toBe(1)
  expect(stack.toString()).toBe('[1]')
})

test('Stack clear', async () => {
  const stack = new Stack<number>()
  expect(stack.size()).toBe(0)
  stack.push(1)
  stack.push(2)
  stack.push(3)
  expect(stack.size()).toBe(3)
  stack.clear()
  expect(stack.size()).toBe(0)
})
