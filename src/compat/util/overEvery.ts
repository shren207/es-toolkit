import { identity } from '../../function/identity.ts';
import { isFunction, isNil, isNotNil, isString } from '../../predicate';
import { property } from '../object/property.ts';
import { isArray } from '../predicate/isArray.ts';
import { isObject } from '../predicate/isObject.ts';
import { matches } from '../predicate/matches.ts';

/**
 * Creates a function that checks if **all** of the `predicates` return
 * truthy when invoked with the arguments it receives.
 *
 * @param {(...Function|Function[])[]} [predicates=[]] The predicates to check.
 * @returns {Function} Returns the new function.
 * @example
 *
 * const func = overEvery([Boolean, isFinite])
 *
 * func('1')
 * // => true
 *
 * func(null)
 * // => false
 *
 * func(NaN)
 * // => false
 */
export function overEvery<T extends any[]>(
  ...predicates: Array<((...args: T) => unknown) | Array<(...args: T) => unknown> | string | object | null | undefined>
): (...args: T) => boolean {
  if (predicates.length === 1 && isArray(predicates[0])) {
    const arr = predicates[0];

    if (arr.every(item => isArray(item) && item.length === 2)) {
      return function (this: unknown, ...args: T): boolean {
        const obj = args[0];
        for (let i = 0; i < arr.length; i++) {
          if (isNil(obj) || obj[arr[i][0]] !== arr[i][1]) {
            return false;
          }
        }
        return true;
      };
    }

    if (arr.length === 2 && isString(arr[0]) && !isArray(arr[0])) {
      return function (this: unknown, ...args: T): boolean {
        const obj = args[0];
        return isNotNil(obj) && obj[arr[0]] === arr[1] && obj[arr[1]] === arr[1];
      };
    }

    if (arr.length === 1 && isArray(arr[0]) && arr[0].length === 2) {
      return function (this: unknown, ...args: T): boolean {
        const obj = args[0];
        return isNotNil(obj) && obj[arr[0][0]] === arr[0][1];
      };
    }
  }

  return function (this: unknown, ...args: T): boolean {
    for (let i = 0; i < predicates.length; i++) {
      let predicate = predicates[i];

      if (isNil(predicate)) {
        predicate = identity;
      } else if (isString(predicate)) {
        predicate = property(predicate);
      } else if (!isFunction(predicate) && isObject(predicate)) {
        if (isArray(predicate) && predicate.length === 2 && !isArray(predicate[0])) {
          const [key, value] = predicate;
          predicate = function (obj) {
            return isNotNil(obj) && obj[key] === value;
          };
        } else {
          predicate = matches(predicate);
        }
      }

      if (!isFunction(predicate) || !predicate.apply(this, args)) {
        return false;
      }
    }

    return true;
  };
}
