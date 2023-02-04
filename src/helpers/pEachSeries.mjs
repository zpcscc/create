/* eslint-disable no-restricted-syntax */
const pEachSeries = async (iterable, iterator) => {
  let index = 0;

  for (const value of iterable) {
    // eslint-disable-next-line
    const returnValue = await iterator(await value, index++);
    if (returnValue === pEachSeries.stop) {
      break;
    }
  }

  return iterable;
};

pEachSeries.stop = Symbol('pEachSeries.stop');

export default pEachSeries;
