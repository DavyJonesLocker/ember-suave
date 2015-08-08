do {
  console.log('foo');
} while (true);

for (let i = 0; i < length; i++) {
  console.log('foo');
}

if (true) {
  console.log(true);
} else {
  console.log(false);
}

switch (x) {
  case 1:
    console.log(1);
  default:
    console.log(0);
}

try {
  x();
} catch(error) {
  console.log(error);
}

function foo() {
  return { a: 'abc' };
}

console.log(typeof ['a', 'b'] === 'object');
