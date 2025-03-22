# overEvery

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](mdc:../../../compatibility.md).
:::

Creates a function that checks if **all** of the predicates return truthy when invoked with the arguments it receives.

## Interface

```typescript
function overEvery<T extends any[]>(
  ...predicates: Array<((...args: T) => unknown) | Array<(...args: T) => unknown> | string | object | null | undefined>
): (...args: T) => boolean;
```

### Parameters

- `predicates` (`Array<((...args: T) => unknown) | Array<(...args: T) => unknown> | string | object | null | undefined>`): The predicates to check.

### Returns

(`Function`): Returns the new function that checks if all predicates return truthy when invoked with the received arguments.

## Examples

```typescript
// Using function predicates
const isEven = (n: number) => n % 2 === 0;
const isPositive = (n: number) => n > 0;
const isLessThan10 = (n: number) => n < 10;

const func = overEvery([isEven, isPositive, isLessThan10]);

func(4); // => true (4 is even, positive, and less than 10)
func(3); // => false (3 is not even)
func(-2); // => false (-2 is not positive)
func(12); // => false (12 is not less than 10)

// Using property shorthand
const predicate = overEvery(['a', 1]);
predicate({ a: 1, b: 2 }); // => true
predicate({ a: 0, b: 2 }); // => false

// Using matches shorthand
const predicate = overEvery([{ a: 1 }, { b: 2 }]);
predicate({ a: 1, b: 2, c: 3 }); // => true
predicate({ a: 2, b: 2, c: 3 }); // => false

// Using matchesProperty shorthand
const predicate = overEvery([['a', 1], ['b', 2]]);
predicate({ a: 1, b: 2, c: 3 }); // => true
predicate({ a: 2, b: 2, c: 3 }); // => false
```
