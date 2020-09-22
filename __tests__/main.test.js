import genDiff from '../src/main.js';

test('genDiff test', () => {
  const objBefore = {
    name: 'vasya',
    mail: {
      email: 'vaziliybober@gmail.com',
      index: 1008228,
    },
    dog: 'Terra',
    university: 'HSE',
  };

  const objAfter = {
    name: {
      firstname: 'petya',
      secondname: 'bomjev',
    },
    mail: {
      email: 'petya@mail.ru',
      index: 1008228,
    },
    cat: 'Mur',
    university: 'HSE',
  };

  const diff = {
    name: {
      status: 'modified',
      valueBefore: 'vasya',
      valueAfter: {
        firstname: 'petya',
        secondname: 'bomjev',
      },
    },

    mail: {
      status: 'unknown',
      value: {
        email: {
          status: 'modified',
          valueBefore: 'vaziliybober@gmail.com',
          valueAfter: 'petya@mail.ru',
        },
        index: {
          status: 'unchanged',
          value: 1008228,
        },
      },
    },

    dog: {
      status: 'removed',
      value: 'Terra',
    },

    cat: {
      status: 'added',
      value: 'Mur',
    },

    university: {
      status: 'unchanged',
      value: 'HSE',
    },
  };

  const actual = genDiff(objBefore, objAfter);
  expect(actual).toEqual(diff);
});
