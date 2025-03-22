import { bench, describe } from 'vitest';
import { overEvery as overEveryToolkitCompat_ } from 'es-toolkit/compat';
import { overEvery as overEveryLodash_ } from 'lodash';

const overEveryToolkitCompat = overEveryToolkitCompat_;
const overEveryLodash = overEveryLodash_;

describe('overEvery', () => {
  const compatPredicate = overEveryToolkitCompat([Boolean, isFinite, (n: number) => !isNaN(n), (n: number) => n > 0]);
  const lodashPredicate = overEveryLodash([Boolean, isFinite, (n: number) => !isNaN(n), (n: number) => n > 0]);

  bench('es-toolkit/compat', () => {
    compatPredicate(4);
    compatPredicate(3);
    compatPredicate(-2);
    compatPredicate(12);
    compatPredicate(NaN);
    compatPredicate(Infinity);
  });

  bench('lodash', () => {
    lodashPredicate(4);
    lodashPredicate(3);
    lodashPredicate(-2);
    lodashPredicate(12);
    lodashPredicate(NaN);
    lodashPredicate(Infinity);
  });
});
