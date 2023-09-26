import { Either, Right, left, right } from './either';

function doSomething(shouldSuccess: boolean): Either<string, string> {
  if (shouldSuccess) {
    return right('success');
  } else {
    return left('error');
  }
}

test('Success result', () => {
  const result = doSomething(true);

  //   if (result.isRight()) {
  //     console.log(result.value);
  //   }

  expect(result.isRight).toBe(true);
  expect(result.isLeft).toBe(false);
});

test('Error result', () => {
  const result = doSomething(false);

  expect(result.isLeft).toBe(true);
  expect(result.isRight).toBe(false);
});
