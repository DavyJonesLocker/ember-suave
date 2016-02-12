const wrap = (f, g) => (...args) => g(f, ...args);
instance.method(...args);
