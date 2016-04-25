import expect from 'unexpected';

suite('Simple tests', function() {
  test('amd.js', async function() {
    let amd = await System.import('example-app/amd.js');
    expect(amd.fn(), 'to equal', 5);
  });

  test('cjs.js', async function() {
    let cjs = await System.import('example-app/cjs.js');
    expect(cjs, 'to equal', 'hello world');
  });

  test('es6.js', async function() {
    let es6 = await System.import('example-app/es6.js');
    let result = await es6.a();
    expect(result, 'to equal', 'first function');
  });
});