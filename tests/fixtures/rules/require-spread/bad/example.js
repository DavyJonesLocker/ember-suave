const wrap = (f, g) => (...args) => g.apply(g, [f].concat(args));
