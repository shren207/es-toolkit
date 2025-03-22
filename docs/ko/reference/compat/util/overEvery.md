# overEvery

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

모든 predicate 함수가 truthy 값을 반환할 때만 `true`를 반환하는 새로운 함수를 생성해요.

## 인터페이스

```typescript
function overEvery<T extends any[]>(
  ...predicates: Array<((...args: T) => unknown) | Array<(...args: T) => unknown> | string | object | null | undefined>
): (...args: T) => boolean;
```

### 파라미터

- `predicates` (`Array<((...args: T) => unknown) | Array<(...args: T) => unknown> | string | object | null | undefined>`): 검사할 predicate 함수들이에요.

### 반환 값

(`Function`): 전달된 인자로 호출했을 때 모든 predicate가 truthy 값을 반환하는지 검사하는 새로운 함수를 반환해요.

## 예시

```typescript
// 함수 predicate 사용
const isEven = (n: number) => n % 2 === 0;
const isPositive = (n: number) => n > 0;
const isLessThan10 = (n: number) => n < 10;

const func = overEvery([isEven, isPositive, isLessThan10]);

func(4); // => true (4는 짝수, 양수, 10보다 작음)
func(3); // => false (3은 짝수가 아님)
func(-2); // => false (-2는 양수가 아님)
func(12); // => false (12는 10보다 작지 않음)

// property 단축 표현 사용
const predicate = overEvery(['a', 1]);
predicate({ a: 1, b: 2 }); // => true
predicate({ a: 0, b: 2 }); // => false

// matches 단축 표현 사용
const predicate = overEvery([{ a: 1 }, { b: 2 }]);
predicate({ a: 1, b: 2, c: 3 }); // => true
predicate({ a: 2, b: 2, c: 3 }); // => false

// matchesProperty 단축 표현 사용
const predicate = overEvery([['a', 1], ['b', 2]]);
predicate({ a: 1, b: 2, c: 3 }); // => true
predicate({ a: 2, b: 2, c: 3 }); // => false
```
