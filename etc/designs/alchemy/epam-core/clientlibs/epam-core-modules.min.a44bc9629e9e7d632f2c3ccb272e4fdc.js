(function (f) {
  function g(i) {
    i._dependenciesInQueue--;
    if (i._dependenciesInQueue) {
      return;
    }
    h(i.id, i.dependencies, i.factory);
  }
  function b(i) {
    return !(i in c.cache);
  }
  function d(i) {
    return c.cache[i];
  }
  function e(i) {
    var k = i.dependencies ? i.dependencies.map(d) : [c],
      j = i.factory.apply(null, k);
    if (!i.id) {
      return;
    }
    c.cache[i.id] = j;
    h.queue.resolve(i.id);
  }
  function a(i) {
    return typeof i === "string";
  }
  function h(n, m, j) {
    if (!a(n) && n !== null) {
      j = m;
      m = n;
      n = null;
    }
    if (!Array.isArray(m)) {
      j = m;
      m = null;
    }
    if (n in c.cache) {
      return;
    }
    var l = { id: n, factory: j, dependencies: m },
      k = l.dependencies && m.filter(b),
      i = l.dependencies && k.length;
    if (i) {
      h.queue.wait(k, l);
      return;
    }
    e(l);
  }
  h.queue = {
    _events: {},
    wait: function (i, j) {
      j._dependenciesInQueue = i.length;
      i.forEach(
        function (k) {
          this._events[k] = this._events[k] || [];
          this._events[k].push(j);
        }.bind(this)
      );
    },
    resolve: function (i) {
      if (!(i in this._events)) {
        return;
      }
      this._events[i].forEach(g);
      delete this._events[i];
    },
  };
  function c(j, i) {
    if (Array.isArray(j)) {
      h(j, i);
      return;
    }
    if (!(j in c.cache)) {
      console.log("Unresolved dependencies:", h.queue._events);
      throw (
        'Component "' +
        j +
        '" is not resolved yet. Add module ID to the dependencies of the current module.'
      );
    }
    return c.cache[j];
  }
  c.cache = Object.create(null);
  h("require", [], function () {
    return c;
  });
  f.define = h;
  f.require = c;
})(window);
