/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-spread */
import * as Babel from '@babel/standalone/babel.min';

const transpileCode = str => {
  let transpiledCode;
  try {
    transpiledCode = Babel.transform(str, { presets: ['es2015'] }).code;
  } catch (err) {
    console.log('Transpilation error', err);
  }
  return transpiledCode;
};

const getFunctionFromSnippet = function(snippet) {
  // eslint-disable-next-line
  return new Function(snippet);
};

const getScore = (code, name, expectations) => {
  try {
    let score = 0;
    const transpiledCode = transpileCode(code);
    const returnFnSnippet = `return ${name}`;
    const wrapperFn = getFunctionFromSnippet(transpiledCode.concat(returnFnSnippet));
    const fnInstance = wrapperFn();
    expectations.forEach(expectation => {
      const output = fnInstance.apply(null, expectation.args);
      if (expectation.return === output) {
        score += 10;
      }
    });
    return score;
  } catch (err) {
    console.log('Error in PlaygroundUtil: getScore', err);
    throw err;
  }
};

export { getScore };
