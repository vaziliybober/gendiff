import genDiff from '../src/main.js';

test('genDiff test', () => {
  const objBefore = {
    name: 'vasya',
    mail: {
      email: 'vaziliybober@gmail.com',
      index: 1008228,
    },
    dog: 'Terra',
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
  };

  const diff = [
    {
      name: 'cat',
      status: 'added',
      value: 'Mur',
    },

    {
      name: 'dog',
      status: 'removed',
      value: 'Terra',
    },

    {
      name: 'mail',
      status: 'nested',
      children: [
        {
          name: 'email',
          status: 'modified',
          valueBefore: 'vaziliybober@gmail.com',
          valueAfter: 'petya@mail.ru',
        },

        {
          name: 'index',
          status: 'unchanged',
          value: 1008228,
        },
      ],
    },

    {
      name: 'name',
      status: 'modified',
      valueBefore: 'vasya',
      valueAfter: {
        firstname: 'petya',
        secondname: 'bomjev',
      },
    },
  ];

  const actual = genDiff(objBefore, objAfter);
  expect(actual).toEqual(diff);
});
