function bar() {
  // I expect `this` to be a specific thing
}

bar.apply(someSpecialSnowflake, argsArray);
