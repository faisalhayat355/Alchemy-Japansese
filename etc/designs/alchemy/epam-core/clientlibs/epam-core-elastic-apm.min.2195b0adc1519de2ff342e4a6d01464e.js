(function (J, Q) {
  "object" === typeof exports && "object" === typeof module
    ? (module.exports = Q())
    : "function" === typeof define && define.amd
    ? define([], Q)
    : "object" === typeof exports
    ? (exports["elastic-apm-rum"] = Q())
    : (J["elastic-apm-rum"] = Q());
})(self, function () {
  return (function () {
    function J(z) {
      var t = oa[z];
      if (void 0 !== t) return t.exports;
      t = oa[z] = { exports: {} };
      Q[z].call(t.exports, t, t.exports, J);
      return t.exports;
    }
    var Q = {
        "../rum-core/dist/es/bootstrap.js": function (z, t, h) {
          function w() {
            (0, v.isPlatformSupported)()
              ? ((0, r.patchAll)(),
                (q.state.bootstrapTime = (0, v.now)()),
                (n = !0))
              : v.isBrowser &&
                console.log("[Elastic APM] platform is not supported!");
            return n;
          }
          h.r(t);
          h.d(t, {
            bootstrap: function () {
              return w;
            },
          });
          var v = h("../rum-core/dist/es/common/utils.js"),
            r = h("../rum-core/dist/es/common/patching/index.js"),
            q = h("../rum-core/dist/es/state.js"),
            n = !1;
        },
        "../rum-core/dist/es/common/after-frame.js": function (z, t, h) {
          function w(r) {
            var q = function () {
                clearTimeout(n);
                cancelAnimationFrame(p);
                setTimeout(r);
              },
              n = setTimeout(q, v),
              p = requestAnimationFrame(q);
          }
          h.r(t);
          h.d(t, {
            default: function () {
              return w;
            },
          });
          var v = 100;
        },
        "../rum-core/dist/es/common/apm-server.js": function (z, t, h) {
          h.r(t);
          var w = h("../rum-core/dist/es/common/queue.js"),
            v = h("../rum-core/dist/es/common/throttle.js"),
            r = h("../rum-core/dist/es/common/ndjson.js"),
            q = h("../rum-core/dist/es/common/truncate.js"),
            n = h("../rum-core/dist/es/common/constants.js"),
            p = h("../rum-core/dist/es/common/utils.js"),
            m = h("../rum-core/dist/es/common/polyfills.js"),
            g = h("../rum-core/dist/es/common/compress.js"),
            k = h("../rum-core/dist/es/state.js"),
            c = h("../rum-core/dist/es/common/http/fetch.js"),
            f = h("../rum-core/dist/es/common/http/xhr.js");
          z = (function () {
            function e(a, b) {
              this._configService = a;
              this._loggingService = b;
              this.queue = void 0;
              this.throttleEvents = p.noop;
            }
            var d = e.prototype;
            d.init = function () {
              var a = this,
                b = this._configService.get("queueLimit"),
                l = this._configService.get("flushInterval"),
                u = this._configService.get("eventsLimit");
              this.queue = new w.default(
                function (x) {
                  (x = a.sendEvents(x)) &&
                    x.catch(function (y) {
                      a._loggingService.warn(
                        "Failed sending events!",
                        a._constructError(y)
                      );
                    });
                },
                { queueLimit: b, flushInterval: l }
              );
              this.throttleEvents = (0, v.default)(
                this.queue.add.bind(this.queue),
                function () {
                  return a._loggingService.warn(
                    "Dropped events due to throttling!"
                  );
                },
                { limit: u, interval: 6e4 }
              );
              this._configService.observeEvent(n.QUEUE_FLUSH, function () {
                a.queue.flush();
              });
            };
            d._postJson = function (a, b) {
              var l = this,
                u = this._configService.get("apmRequest"),
                x = {
                  payload: b,
                  headers: { "Content-Type": "application/x-ndjson" },
                  beforeSend: u,
                };
              return (0, g.compressPayload)(x)
                .catch(function (y) {
                  k.__DEV__ &&
                    l._loggingService.debug(
                      "Compressing the payload using CompressionStream API failed",
                      y.message
                    );
                  return x;
                })
                .then(function (y) {
                  return l._makeHttpRequest("POST", a, y);
                })
                .then(function (y) {
                  return y.responseText;
                });
            };
            d._constructError = function (a) {
              var b = a.status,
                l = a.responseText;
              if ("undefined" == typeof b) return a;
              a = a.url + " HTTP status: " + b;
              if (k.__DEV__ && l)
                try {
                  var u = [],
                    x = JSON.parse(l);
                  x.errors &&
                    0 < x.errors.length &&
                    (x.errors.forEach(function (y) {
                      return u.push(y.message);
                    }),
                    (a += " " + u.join(",")));
                } catch (y) {
                  this._loggingService.debug(
                    "Error parsing response from APM server",
                    y
                  );
                }
              return Error(a);
            };
            d._makeHttpRequest = function (a, b, l) {
              l = void 0 === l ? {} : l;
              var u = l.timeout,
                x = void 0 === u ? n.HTTP_REQUEST_TIMEOUT : u,
                y = l.payload,
                B = l.headers,
                C = l.beforeSend;
              return !C && (0, c.shouldUseFetchWithKeepAlive)(a, y)
                ? (0, c.sendFetchRequest)(a, b, {
                    keepalive: !0,
                    timeout: x,
                    payload: y,
                    headers: B,
                  }).catch(function (F) {
                    if (F instanceof TypeError)
                      return (0, f.sendXHR)(a, b, {
                        timeout: x,
                        payload: y,
                        headers: B,
                        beforeSend: C,
                      });
                    throw F;
                  })
                : (0, f.sendXHR)(a, b, {
                    timeout: x,
                    payload: y,
                    headers: B,
                    beforeSend: C,
                  });
            };
            d.fetchConfig = function (a, b) {
              var l = this,
                u = this.getEndpoints().configEndpoint;
              if (!a)
                return m.Promise.reject(
                  "serviceName is required for fetching central config."
                );
              u += "?service.name\x3d" + a;
              b && (u += "\x26service.environment\x3d" + b);
              var x = this._configService.getLocalConfig();
              x && (u += "\x26ifnonematch\x3d" + x.etag);
              a = this._configService.get("apmRequest");
              return this._makeHttpRequest("GET", u, {
                timeout: 5e3,
                beforeSend: a,
              })
                .then(function (y) {
                  if (304 === y.status) return x;
                  var B = JSON.parse(y.responseText);
                  if ((y = y.getResponseHeader("etag")))
                    (B.etag = y.replace(/["]/g, "")),
                      l._configService.setLocalConfig(B, !0);
                  return B;
                })
                .catch(function (y) {
                  y = l._constructError(y);
                  return m.Promise.reject(y);
                });
            };
            d.createMetaData = function () {
              var a = this._configService;
              a = {
                service: {
                  name: a.get("serviceName"),
                  version: a.get("serviceVersion"),
                  agent: { name: "rum-js", version: a.version },
                  language: { name: "javascript" },
                  environment: a.get("environment"),
                },
                labels: a.get("context.tags"),
              };
              return (0, q.truncateModel)(q.METADATA_MODEL, a);
            };
            d.addError = function (a) {
              var b;
              this.throttleEvents(((b = {}), (b[n.ERRORS] = a), b));
            };
            d.addTransaction = function (a) {
              var b;
              this.throttleEvents(((b = {}), (b[n.TRANSACTIONS] = a), b));
            };
            d.ndjsonErrors = function (a, b) {
              var l = b ? "e" : "error";
              return a.map(function (u) {
                var x;
                return r.default.stringify(
                  ((x = {}), (x[l] = b ? (0, g.compressError)(u) : u), x)
                );
              });
            };
            d.ndjsonMetricsets = function (a) {
              return a
                .map(function (b) {
                  return r.default.stringify({ metricset: b });
                })
                .join("");
            };
            d.ndjsonTransactions = function (a, b) {
              var l = this,
                u = b ? "x" : "transaction";
              return a.map(function (x) {
                var y,
                  B = "",
                  C = "";
                b ||
                  (x.spans &&
                    ((B = x.spans
                      .map(function (F) {
                        return r.default.stringify({ span: F });
                      })
                      .join("")),
                    delete x.spans),
                  x.breakdown &&
                    ((C = l.ndjsonMetricsets(x.breakdown)),
                    delete x.breakdown));
                return (
                  r.default.stringify(
                    ((y = {}),
                    (y[u] = b ? (0, g.compressTransaction)(x) : x),
                    y)
                  ) +
                  B +
                  C
                );
              });
            };
            d.sendEvents = function (a) {
              var b, l;
              if (0 !== a.length) {
                for (var u = [], x = [], y = 0; y < a.length; y++) {
                  var B = a[y];
                  B[n.TRANSACTIONS] && u.push(B[n.TRANSACTIONS]);
                  B[n.ERRORS] && x.push(B[n.ERRORS]);
                }
                if (0 !== u.length || 0 !== x.length) {
                  a = this._configService;
                  u = ((b = {}), (b[n.TRANSACTIONS] = u), (b[n.ERRORS] = x), b);
                  if ((b = a.applyFilters(u)))
                    return (
                      (u = 2 < a.get("apiVersion")),
                      (x = []),
                      (a = this.createMetaData()),
                      x.push(
                        r.default.stringify(
                          ((l = {}),
                          (l[u ? "m" : "metadata"] = u
                            ? (0, g.compressMetadata)(a)
                            : a),
                          l)
                        )
                      ),
                      (x = x.concat(
                        this.ndjsonErrors(b[n.ERRORS], u),
                        this.ndjsonTransactions(b[n.TRANSACTIONS], u)
                      )),
                      (l = x.join("")),
                      (b = this.getEndpoints().intakeEndpoint),
                      this._postJson(b, l)
                    );
                  this._loggingService.warn(
                    "Dropped payload due to filtering!"
                  );
                }
              }
            };
            d.getEndpoints = function () {
              var a = this._configService.get("serverUrl"),
                b = this._configService.get("apiVersion");
              b =
                this._configService.get("serverUrlPrefix") ||
                "/intake/v" + b + "/rum/events";
              return {
                intakeEndpoint: a + b,
                configEndpoint: a + "/config/v1/rum/agents",
              };
            };
            return e;
          })();
          t["default"] = z;
        },
        "../rum-core/dist/es/common/compress.js": function (z, t, h) {
          function w(d) {
            return d.map(function (a) {
              return {
                ap: a.abs_path,
                f: a.filename,
                fn: a.function,
                li: a.lineno,
                co: a.colno,
              };
            });
          }
          function v(d) {
            if (!d) return null;
            var a = {},
              b = d.page,
              l = d.http,
              u = d.response,
              x = d.destination,
              y = d.user;
            d = d.custom;
            b && (a.p = { rf: b.referer, url: b.url });
            if (l) {
              b = {};
              var B = l.method,
                C = l.status_code,
                F = l.response;
              b.url = l.url;
              B && (b.mt = B);
              C && (b.sc = C);
              F &&
                (b.r = {
                  ts: F.transfer_size,
                  ebs: F.encoded_body_size,
                  dbs: F.decoded_body_size,
                });
              a.h = b;
            }
            u &&
              (a.r = {
                ts: u.transfer_size,
                ebs: u.encoded_body_size,
                dbs: u.decoded_body_size,
              });
            x &&
              ((l = x.service),
              (a.dt = {
                se: { n: l.name, t: l.type, rc: l.resource },
                ad: x.address,
                po: x.port,
              }));
            y && (a.u = { id: y.id, un: y.username, em: y.email });
            d && (a.cu = d);
            return a;
          }
          function r(d) {
            if (!d) return null;
            var a = q(d.navigationTiming);
            var b = d.agent;
            d = {};
            a && (d = { fb: a.rs, di: a.di, dc: a.dc });
            if (b) {
              var l = b.firstContentfulPaint;
              b = b.largestContentfulPaint;
              l && (d.fp = l);
              b && (d.lp = b);
            }
            d = 0 === Object.keys(d).length ? null : d;
            return { nt: a, a: d };
          }
          function q(d) {
            if (!d) return null;
            var a = {};
            f.COMPRESSED_NAV_TIMING_MARKS.forEach(function (b, l) {
              a[b] = d[f.NAVIGATION_TIMING_MARKS[l]];
            });
            return a;
          }
          function n(d) {
            var a = d.service,
              b = a.agent;
            return {
              se: {
                n: a.name,
                ve: a.version,
                a: { n: b.name, ve: b.version },
                la: { n: a.language.name },
                en: a.environment,
              },
              l: d.labels,
            };
          }
          function p(d) {
            var a = d.spans.map(function (l) {
              var u = {
                id: l.id,
                n: l.name,
                t: l.type,
                s: l.start,
                d: l.duration,
                c: v(l.context),
                o: l.outcome,
                sr: l.sample_rate,
              };
              l.parent_id !== d.id && (u.pid = l.parent_id);
              !0 === l.sync && (u.sy = !0);
              l.subtype && (u.su = l.subtype);
              l.action && (u.ac = l.action);
              return u;
            });
            a = {
              id: d.id,
              tid: d.trace_id,
              n: d.name,
              t: d.type,
              d: d.duration,
              c: v(d.context),
              k: r(d.marks),
              me: g(d.breakdown),
              y: a,
              yc: { sd: a.length },
              sm: d.sampled,
              sr: d.sample_rate,
              o: d.outcome,
            };
            if (d.experience) {
              var b = d.experience;
              a.exp = { cls: b.cls, fid: b.fid, tbt: b.tbt, lt: b.longtask };
            }
            d.session &&
              ((b = d.session), (a.ses = { id: b.id, seq: b.sequence }));
            return a;
          }
          function m(d) {
            var a = d.exception;
            a = {
              id: d.id,
              cl: d.culprit,
              ex: { mg: a.message, st: w(a.stacktrace), t: d.type },
              c: v(d.context),
            };
            var b = d.transaction;
            b &&
              ((a.tid = d.trace_id),
              (a.pid = d.parent_id),
              (a.xid = d.transaction_id),
              (a.x = { t: b.type, sm: b.sampled }));
            return a;
          }
          function g(d) {
            return d.map(function (a) {
              var b = a.span;
              a = a.samples;
              return null != b
                ? {
                    y: { t: b.type },
                    sa: {
                      ysc: { v: a["span.self_time.count"].value },
                      yss: { v: a["span.self_time.sum.us"].value },
                    },
                  }
                : {
                    sa: {
                      xdc: { v: a["transaction.duration.count"].value },
                      xds: { v: a["transaction.duration.sum.us"].value },
                      xbc: { v: a["transaction.breakdown.count"].value },
                    },
                  };
            });
          }
          function k(d, a) {
            void 0 === a && (a = "gzip");
            var b = "function" === typeof CompressionStream;
            return new c.Promise(function (l) {
              if (!b || (0, e.isBeaconInspectionEnabled)()) return l(d);
              var u = d.headers,
                x = d.beforeSend,
                y = new Blob([d.payload])
                  .stream()
                  .pipeThrough(new CompressionStream(a));
              return new Response(y).blob().then(function (B) {
                u["Content-Encoding"] = a;
                return l({ payload: B, headers: u, beforeSend: x });
              });
            });
          }
          h.r(t);
          h.d(t, {
            compressMetadata: function () {
              return n;
            },
            compressTransaction: function () {
              return p;
            },
            compressError: function () {
              return m;
            },
            compressMetricsets: function () {
              return g;
            },
            compressPayload: function () {
              return k;
            },
          });
          var c = h("../rum-core/dist/es/common/polyfills.js"),
            f = h(
              "../rum-core/dist/es/performance-monitoring/capture-navigation.js"
            ),
            e = h("../rum-core/dist/es/common/utils.js");
        },
        "../rum-core/dist/es/common/config-service.js": function (z, t, h) {
          function w() {
            w =
              Object.assign ||
              function (p) {
                for (var m = 1; m < arguments.length; m++) {
                  var g = arguments[m],
                    k;
                  for (k in g)
                    Object.prototype.hasOwnProperty.call(g, k) && (p[k] = g[k]);
                }
                return p;
              };
            return w.apply(this, arguments);
          }
          function v(p) {
            if (!p) return {};
            var m = {},
              g = /^data-([\w-]+)$/;
            p = p.attributes;
            for (var k = 0; k < p.length; k++) {
              var c = p[k];
              if (g.test(c.nodeName)) {
                var f = c.nodeName
                  .match(g)[1]
                  .split("-")
                  .map(function (e, d) {
                    return 0 < d
                      ? e.charAt(0).toUpperCase() + e.substring(1)
                      : e;
                  })
                  .join("");
                m[f] = c.value || c.nodeValue;
              }
            }
            return m;
          }
          h.r(t);
          var r = h("../rum-core/dist/es/common/utils.js"),
            q = h("../rum-core/dist/es/common/event-handler.js"),
            n = h("../rum-core/dist/es/common/constants.js");
          z = (function () {
            function p() {
              this.config = {
                serviceName: "",
                serviceVersion: "",
                environment: "",
                serverUrl: "http://localhost:8200",
                serverUrlPrefix: "",
                active: !0,
                instrument: !0,
                disableInstrumentations: [],
                logLevel: "warn",
                breakdownMetrics: !1,
                ignoreTransactions: [],
                eventsLimit: 80,
                queueLimit: -1,
                flushInterval: 500,
                distributedTracing: !0,
                distributedTracingOrigins: [],
                distributedTracingHeaderName: "traceparent",
                pageLoadTraceId: "",
                pageLoadSpanId: "",
                pageLoadSampled: !1,
                pageLoadTransactionName: "",
                propagateTracestate: !1,
                transactionSampleRate: 1,
                centralConfig: !1,
                monitorLongtasks: !0,
                apiVersion: 2,
                context: {},
                session: !1,
                apmRequest: null,
              };
              this.events = new q.default();
              this.filters = [];
              this.version = "";
            }
            var m = p.prototype;
            m.init = function () {
              var g = (0, r.getCurrentScript)();
              g = v(g);
              this.setConfig(g);
            };
            m.setVersion = function (g) {
              this.version = g;
            };
            m.addFilter = function (g) {
              if ("function" !== typeof g)
                throw Error("Argument to must be function");
              this.filters.push(g);
            };
            m.applyFilters = function (g) {
              for (var k = 0; k < this.filters.length; k++)
                if (((g = this.filters[k](g)), !g)) return;
              return g;
            };
            m.get = function (g) {
              return g.split(".").reduce(function (k, c) {
                return k && k[c];
              }, this.config);
            };
            m.setUserContext = function (g) {
              void 0 === g && (g = {});
              var k = {},
                c = g;
              g = c.id;
              var f = c.username;
              c = c.email;
              if ("number" === typeof g || "string" === typeof g) k.id = g;
              "string" === typeof f && (k.username = f);
              "string" === typeof c && (k.email = c);
              this.config.context.user = (0, r.extend)(
                this.config.context.user || {},
                k
              );
            };
            m.setCustomContext = function (g) {
              void 0 === g && (g = {});
              this.config.context.custom = (0, r.extend)(
                this.config.context.custom || {},
                g
              );
            };
            m.addLabels = function (g) {
              var k = this;
              this.config.context.tags || (this.config.context.tags = {});
              Object.keys(g).forEach(function (c) {
                return (0, r.setLabel)(c, g[c], k.config.context.tags);
              });
            };
            m.setConfig = function (g) {
              void 0 === g && (g = {});
              var k = g,
                c = k.transactionSampleRate;
              if ((k = k.serverUrl)) g.serverUrl = k.replace(/\/+$/, "");
              (0, r.isUndefined)(c) ||
                (1e-4 > c && 0 < c && (c = 1e-4),
                (g.transactionSampleRate = Math.round(1e4 * c) / 1e4));
              (0, r.merge)(this.config, g);
              this.events.send(n.CONFIG_CHANGE, [this.config]);
            };
            m.validate = function (g) {
              void 0 === g && (g = {});
              var k = ["serviceName", "serverUrl"],
                c = { missing: [], invalid: [] };
              Object.keys(g).forEach(function (e) {
                -1 === k.indexOf(e) || g[e] || c.missing.push(e);
              });
              g.serviceName &&
                !/^[a-zA-Z0-9 _-]+$/.test(g.serviceName) &&
                c.invalid.push({
                  key: "serviceName",
                  value: g.serviceName,
                  allowed: "a-z, A-Z, 0-9, _, -, \x3cspace\x3e",
                });
              var f = g.transactionSampleRate;
              "undefined" !== typeof f &&
                ("number" !== typeof f || isNaN(f) || 0 > f || 1 < f) &&
                c.invalid.push({
                  key: "transactionSampleRate",
                  value: f,
                  allowed: "Number between 0 and 1",
                });
              return c;
            };
            m.getLocalConfig = function () {
              var g = sessionStorage;
              this.config.session && (g = localStorage);
              if ((g = g.getItem(n.LOCAL_CONFIG_KEY))) return JSON.parse(g);
            };
            m.setLocalConfig = function (g, k) {
              g &&
                (k && ((k = this.getLocalConfig()), (g = w({}, k, g))),
                (k = sessionStorage),
                this.config.session && (k = localStorage),
                k.setItem(n.LOCAL_CONFIG_KEY, JSON.stringify(g)));
            };
            m.dispatchEvent = function (g, k) {
              this.events.send(g, k);
            };
            m.observeEvent = function (g, k) {
              return this.events.observe(g, k);
            };
            return p;
          })();
          t["default"] = z;
        },
        "../rum-core/dist/es/common/constants.js": function (z, t, h) {
          h.r(t);
          h.d(t, {
            SCHEDULE: function () {
              return w;
            },
            INVOKE: function () {
              return v;
            },
            ADD_EVENT_LISTENER_STR: function () {
              return r;
            },
            REMOVE_EVENT_LISTENER_STR: function () {
              return q;
            },
            RESOURCE_INITIATOR_TYPES: function () {
              return n;
            },
            REUSABILITY_THRESHOLD: function () {
              return p;
            },
            MAX_SPAN_DURATION: function () {
              return m;
            },
            PAGE_LOAD_DELAY: function () {
              return g;
            },
            PAGE_LOAD: function () {
              return k;
            },
            ROUTE_CHANGE: function () {
              return c;
            },
            NAME_UNKNOWN: function () {
              return b;
            },
            TYPE_CUSTOM: function () {
              return f;
            },
            USER_TIMING_THRESHOLD: function () {
              return B;
            },
            TRANSACTION_START: function () {
              return C;
            },
            TRANSACTION_END: function () {
              return F;
            },
            CONFIG_CHANGE: function () {
              return H;
            },
            QUEUE_FLUSH: function () {
              return I;
            },
            QUEUE_ADD_TRANSACTION: function () {
              return N;
            },
            XMLHTTPREQUEST: function () {
              return R;
            },
            FETCH: function () {
              return S;
            },
            HISTORY: function () {
              return M;
            },
            EVENT_TARGET: function () {
              return ca;
            },
            CLICK: function () {
              return da;
            },
            ERROR: function () {
              return X;
            },
            BEFORE_EVENT: function () {
              return ea;
            },
            AFTER_EVENT: function () {
              return fa;
            },
            LOCAL_CONFIG_KEY: function () {
              return ha;
            },
            HTTP_REQUEST_TYPE: function () {
              return d;
            },
            LONG_TASK: function () {
              return ia;
            },
            PAINT: function () {
              return ja;
            },
            MEASURE: function () {
              return ka;
            },
            NAVIGATION: function () {
              return la;
            },
            RESOURCE: function () {
              return ma;
            },
            FIRST_CONTENTFUL_PAINT: function () {
              return Y;
            },
            LARGEST_CONTENTFUL_PAINT: function () {
              return U;
            },
            KEYWORD_LIMIT: function () {
              return na;
            },
            TEMPORARY_TYPE: function () {
              return a;
            },
            USER_INTERACTION: function () {
              return e;
            },
            TRANSACTION_TYPE_ORDER: function () {
              return l;
            },
            ERRORS: function () {
              return V;
            },
            TRANSACTIONS: function () {
              return A;
            },
            CONFIG_SERVICE: function () {
              return D;
            },
            LOGGING_SERVICE: function () {
              return E;
            },
            TRANSACTION_SERVICE: function () {
              return G;
            },
            APM_SERVER: function () {
              return K;
            },
            PERFORMANCE_MONITORING: function () {
              return L;
            },
            ERROR_LOGGING: function () {
              return Z;
            },
            TRUNCATED_TYPE: function () {
              return W;
            },
            FIRST_INPUT: function () {
              return O;
            },
            LAYOUT_SHIFT: function () {
              return aa;
            },
            OUTCOME_SUCCESS: function () {
              return u;
            },
            OUTCOME_FAILURE: function () {
              return x;
            },
            OUTCOME_UNKNOWN: function () {
              return y;
            },
            SESSION_TIMEOUT: function () {
              return P;
            },
            HTTP_REQUEST_TIMEOUT: function () {
              return T;
            },
          });
          var w = "schedule",
            v = "invoke",
            r = "addEventListener",
            q = "removeEventListener",
            n = "link css script img xmlhttprequest fetch beacon iframe".split(
              " "
            ),
            p = 5e3,
            m = 3e5,
            g = 1e3,
            k = "page-load",
            c = "route-change",
            f = "custom",
            e = "user-interaction",
            d = "http-request",
            a = "temporary",
            b = "Unknown",
            l = [k, c, e, d, f, a],
            u = "success",
            x = "failure",
            y = "unknown",
            B = 60,
            C = "transaction:start",
            F = "transaction:end",
            H = "config:change",
            I = "queue:flush",
            N = "queue:add_transaction",
            R = "xmlhttprequest",
            S = "fetch",
            M = "history",
            ca = "eventtarget",
            da = "click",
            X = "error",
            ea = ":before",
            fa = ":after",
            ha = "elastic_apm_config",
            ia = "longtask",
            ja = "paint",
            ka = "measure",
            la = "navigation",
            ma = "resource",
            Y = "first-contentful-paint",
            U = "largest-contentful-paint",
            O = "first-input",
            aa = "layout-shift",
            V = "errors",
            A = "transactions",
            D = "ConfigService",
            E = "LoggingService",
            G = "TransactionService",
            K = "ApmServer",
            L = "PerformanceMonitoring",
            Z = "ErrorLogging",
            W = ".truncated",
            na = 1024,
            P = 18e5,
            T = 1e4;
        },
        "../rum-core/dist/es/common/context.js": function (z, t, h) {
          function w(b) {
            var l = b.serverTiming;
            b = {
              transfer_size: b.transferSize,
              encoded_body_size: b.encodedBodySize,
              decoded_body_size: b.decodedBodySize,
            };
            if ((l = (0, g.getServerTimingInfo)(l)))
              b.headers = { "server-timing": l };
            return b;
          }
          function v(b) {
            var l = b.protocol,
              u = b.hostname;
            b = b.port;
            "" === b &&
              (b = "http:" === l ? "80" : "https:" === l ? "443" : "");
            l = b;
            b = u.charCodeAt(0) === c && u.charCodeAt(u.length - 1) === f;
            var x = u;
            b && (x = u.slice(1, -1));
            return {
              service: { resource: u + ":" + l, name: "", type: "" },
              address: x,
              port: Number(l),
            };
          }
          function r() {
            return { page: { referer: document.referrer, url: location.href } };
          }
          function q(b, l) {
            if (l) {
              switch (b.type) {
                case e:
                  var u = l.method;
                  var x = l.target;
                  var y = l.response;
                  l = new p.Url(l.url);
                  var B = v(l);
                  l = { http: { method: u, url: l.href }, destination: B };
                  if (x && "undefined" !== typeof x.status) var C = x.status;
                  else y && (C = y.status);
                  l.http.status_code = C;
                  x = l;
                  break;
                case d:
                  C = l.entry;
                  x = l.url;
                  y = new p.Url(x);
                  y = v(y);
                  x = { http: { url: x, response: w(C) }, destination: y };
                  break;
                case a:
                  (C = new p.Url(l.url)), (x = { destination: v(C) });
              }
              b.addContext(x);
            }
          }
          function n(b, l) {
            l = void 0 === l ? {} : l;
            var u = k;
            if (null == l) l = {};
            else {
              var x = {},
                y = Object.keys(l),
                B;
              for (B = 0; B < y.length; B++) {
                var C = y[B];
                0 <= u.indexOf(C) || (x[C] = l[C]);
              }
              l = x;
            }
            u = r();
            x = {};
            b.type === m.PAGE_LOAD &&
              (0, g.isPerfTimelineSupported)() &&
              (y = g.PERF.getEntriesByType(m.NAVIGATION)) &&
              0 < y.length &&
              (x = { response: w(y[0]) });
            b.addContext(u, x, l);
          }
          h.r(t);
          h.d(t, {
            getPageContext: function () {
              return r;
            },
            addSpanContext: function () {
              return q;
            },
            addTransactionContext: function () {
              return n;
            },
          });
          var p = h("../rum-core/dist/es/common/url.js"),
            m = h("../rum-core/dist/es/common/constants.js"),
            g = h("../rum-core/dist/es/common/utils.js"),
            k = ["tags"],
            c = 91,
            f = 93,
            e = "external",
            d = "resource",
            a = "hard-navigation";
        },
        "../rum-core/dist/es/common/event-handler.js": function (z, t, h) {
          h.r(t);
          var w = h("../rum-core/dist/es/common/constants.js");
          z = (function () {
            function v() {
              this.observers = {};
            }
            var r = v.prototype;
            r.observe = function (q, n) {
              var p = this;
              if ("function" === typeof n)
                return (
                  this.observers[q] || (this.observers[q] = []),
                  this.observers[q].push(n),
                  function () {
                    var m = p.observers[q].indexOf(n);
                    -1 < m && p.observers[q].splice(m, 1);
                  }
                );
            };
            r.sendOnly = function (q, n) {
              (q = this.observers[q]) &&
                q.forEach(function (p) {
                  try {
                    p.apply(void 0, n);
                  } catch (m) {
                    console.log(m, m.stack);
                  }
                });
            };
            r.send = function (q, n) {
              this.sendOnly(q + w.BEFORE_EVENT, n);
              this.sendOnly(q, n);
              this.sendOnly(q + w.AFTER_EVENT, n);
            };
            return v;
          })();
          t["default"] = z;
        },
        "../rum-core/dist/es/common/http/fetch.js": function (z, t, h) {
          function w() {
            w =
              Object.assign ||
              function (g) {
                for (var k = 1; k < arguments.length; k++) {
                  var c = arguments[k],
                    f;
                  for (f in c)
                    Object.prototype.hasOwnProperty.call(c, f) && (g[f] = c[f]);
                }
                return g;
              };
            return w.apply(this, arguments);
          }
          function v(g, k) {
            if (!(q() && "keepalive" in new Request(""))) return !1;
            k = k ? (k instanceof Blob ? k.size : new Blob([k]).size) : 0;
            return "POST" === g && k < m;
          }
          function r(g, k, c) {
            var f = c.keepalive;
            f = void 0 === f ? !1 : f;
            var e = c.timeout;
            e = void 0 === e ? n.HTTP_REQUEST_TIMEOUT : e;
            var d = c.payload;
            c = c.headers;
            var a = {};
            if ("function" === typeof AbortController) {
              var b = new AbortController();
              a.signal = b.signal;
              setTimeout(function () {
                return b.abort();
              }, e);
            }
            var l;
            return window
              .fetch(
                k,
                w(
                  {
                    body: d,
                    headers: c,
                    method: g,
                    keepalive: f,
                    credentials: "omit",
                  },
                  a
                )
              )
              .then(function (u) {
                l = u;
                return l.text();
              })
              .then(function (u) {
                u = { url: k, status: l.status, responseText: u };
                if (!(0, p.isResponseSuccessful)(l.status)) throw u;
                return u;
              });
          }
          function q() {
            return (
              "function" === typeof window.fetch &&
              "function" === typeof window.Request
            );
          }
          h.r(t);
          h.d(t, {
            BYTE_LIMIT: function () {
              return m;
            },
            shouldUseFetchWithKeepAlive: function () {
              return v;
            },
            sendFetchRequest: function () {
              return r;
            },
            isFetchSupported: function () {
              return q;
            },
          });
          var n = h("../rum-core/dist/es/common/constants.js"),
            p = h("../rum-core/dist/es/common/http/response-status.js"),
            m = 6e4;
        },
        "../rum-core/dist/es/common/http/response-status.js": function (
          z,
          t,
          h
        ) {
          function w(v) {
            return 0 === v || (399 < v && 600 > v) ? !1 : !0;
          }
          h.r(t);
          h.d(t, {
            isResponseSuccessful: function () {
              return w;
            },
          });
        },
        "../rum-core/dist/es/common/http/xhr.js": function (z, t, h) {
          function w(n, p, m) {
            var g = m.timeout,
              k = void 0 === g ? HTTP_REQUEST_TIMEOUT : g,
              c = m.payload,
              f = m.headers,
              e = m.beforeSend;
            return new q.Promise(function (d, a) {
              var b = new window.XMLHttpRequest();
              b[v.XHR_IGNORE] = !0;
              b.open(n, p, !0);
              b.timeout = k;
              if (f)
                for (var l in f)
                  f.hasOwnProperty(l) && b.setRequestHeader(l, f[l]);
              b.onreadystatechange = function () {
                if (4 === b.readyState) {
                  var u = b.status,
                    x = b.responseText;
                  (0, r.isResponseSuccessful)(u)
                    ? d(b)
                    : a({ url: p, status: u, responseText: x });
                }
              };
              b.onerror = function () {
                a({ url: p, status: b.status, responseText: b.responseText });
              };
              l = !0;
              "function" === typeof e &&
                (l = e({ url: p, method: n, headers: f, payload: c, xhr: b }));
              l
                ? b.send(c)
                : a({
                    url: p,
                    status: 0,
                    responseText: "Request rejected by user configuration.",
                  });
            });
          }
          h.r(t);
          h.d(t, {
            sendXHR: function () {
              return w;
            },
          });
          var v = h("../rum-core/dist/es/common/patching/patch-utils.js"),
            r = h("../rum-core/dist/es/common/http/response-status.js"),
            q = h("../rum-core/dist/es/common/polyfills.js");
        },
        "../rum-core/dist/es/common/instrument.js": function (z, t, h) {
          function w(r, q) {
            var n,
              p =
                ((n = {}),
                (n[v.XMLHTTPREQUEST] = !1),
                (n[v.FETCH] = !1),
                (n[v.HISTORY] = !1),
                (n[v.PAGE_LOAD] = !1),
                (n[v.ERROR] = !1),
                (n[v.EVENT_TARGET] = !1),
                (n[v.CLICK] = !1),
                n);
            if (!r) return p;
            Object.keys(p).forEach(function (m) {
              -1 === q.indexOf(m) && (p[m] = !0);
            });
            return p;
          }
          h.r(t);
          h.d(t, {
            getInstrumentationFlags: function () {
              return w;
            },
          });
          var v = h("../rum-core/dist/es/common/constants.js");
        },
        "../rum-core/dist/es/common/logging-service.js": function (z, t, h) {
          h.r(t);
          var w = h("../rum-core/dist/es/common/utils.js");
          z = (function () {
            function v(q) {
              void 0 === q && (q = {});
              this.levels = ["trace", "debug", "info", "warn", "error"];
              this.level = q.level || "warn";
              this.prefix = q.prefix || "";
              this.resetLogMethods();
            }
            var r = v.prototype;
            r.shouldLog = function (q) {
              return this.levels.indexOf(q) >= this.levels.indexOf(this.level);
            };
            r.setLevel = function (q) {
              q !== this.level && ((this.level = q), this.resetLogMethods());
            };
            r.resetLogMethods = function () {
              var q = this;
              this.levels.forEach(function (n) {
                function p() {
                  var m = n;
                  if ("trace" === n || "debug" === n) m = "info";
                  var g = arguments;
                  g[0] = this.prefix + g[0];
                  console &&
                    ((m = console[m] || console.log),
                    "function" === typeof m && m.apply(console, g));
                }
                q[n] = q.shouldLog(n) ? p : w.noop;
              });
            };
            return v;
          })();
          t["default"] = z;
        },
        "../rum-core/dist/es/common/ndjson.js": function (z, t, h) {
          h.r(t);
          z = (function () {
            function w() {}
            w.stringify = function (v) {
              return JSON.stringify(v) + "\n";
            };
            return w;
          })();
          t["default"] = z;
        },
        "../rum-core/dist/es/common/observers/page-clicks.js": function (
          z,
          t,
          h
        ) {
          function w(r) {
            var q = function (n) {
              if (n.target instanceof Element) {
                var p = n.target,
                  m;
                n = null;
                var g = (m = p.tagName.toLowerCase());
                if (p.dataset.transactionName) g = p.dataset.transactionName;
                else {
                  var k = p.getAttribute("name");
                  k && (g = m + '["' + k + '"]');
                }
                m = g;
                (p = p.getAttribute("class")) &&
                  (n = { custom: { classes: p } });
                (p = r.startTransaction("Click - " + m, v.USER_INTERACTION, {
                  managed: !0,
                  canReuse: !0,
                  reuseThreshold: 300,
                })) &&
                  n &&
                  p.addContext(n);
              }
            };
            window.addEventListener("click", q, !0);
            return function () {
              window.removeEventListener("click", q, !0);
            };
          }
          h.r(t);
          h.d(t, {
            observePageClicks: function () {
              return w;
            },
          });
          var v = h("../rum-core/dist/es/common/constants.js");
        },
        "../rum-core/dist/es/common/observers/page-visibility.js": function (
          z,
          t,
          h
        ) {
          function w(p, m) {
            "hidden" === document.visibilityState &&
              (q.state.lastHiddenStart = 0);
            var g = function () {
                "hidden" === document.visibilityState && v(p, m);
              },
              k = function () {
                return v(p, m);
              };
            window.addEventListener("visibilitychange", g, !0);
            window.addEventListener("pagehide", k, !0);
            return function () {
              window.removeEventListener("visibilitychange", g, !0);
              window.removeEventListener("pagehide", k, !0);
            };
          }
          function v(p, m) {
            if ((m = m.getCurrentTransaction())) {
              var g = p.observeEvent(r.QUEUE_ADD_TRANSACTION, function () {
                p.dispatchEvent(r.QUEUE_FLUSH);
                q.state.lastHiddenStart = (0, n.now)();
                g();
              });
              m.end();
            } else
              p.dispatchEvent(r.QUEUE_FLUSH),
                (q.state.lastHiddenStart = (0, n.now)());
          }
          h.r(t);
          h.d(t, {
            observePageVisibility: function () {
              return w;
            },
          });
          var r = h("../rum-core/dist/es/common/constants.js"),
            q = h("../rum-core/dist/es/state.js"),
            n = h("../rum-core/dist/es/common/utils.js");
        },
        "../rum-core/dist/es/common/patching/fetch-patch.js": function (
          z,
          t,
          h
        ) {
          function w(m) {
            function g(e) {
              e.state = q.SCHEDULE;
              m(q.SCHEDULE, e);
            }
            function k(e) {
              e.state = q.INVOKE;
              m(q.INVOKE, e);
            }
            function c(e, d) {
              var a = e.getReader();
              (function l() {
                a.read().then(
                  function (u) {
                    u.done ? k(d) : l();
                  },
                  function (u) {
                    d.data.aborted = u && "AbortError" === u.name;
                    d.data.error = u;
                    k(d);
                  }
                );
              })();
            }
            if ((0, p.isFetchSupported)()) {
              var f = window.fetch;
              window.fetch = function (e, d) {
                var a = this,
                  b = arguments;
                if ("string" === typeof e) {
                  var l = new Request(e, d);
                  b = e;
                } else if (e) (l = e), (b = l.url);
                else return f.apply(a, b);
                var u = {
                  source: q.FETCH,
                  state: "",
                  type: "macroTask",
                  data: { target: l, method: l.method, url: b, aborted: !1 },
                };
                return new v.Promise(function (x, y) {
                  r.globalState.fetchInProgress = !0;
                  g(u);
                  try {
                    var B = f.apply(a, [l]);
                  } catch (C) {
                    y(C);
                    u.data.error = C;
                    k(u);
                    r.globalState.fetchInProgress = !1;
                    return;
                  }
                  B.then(
                    function (C) {
                      var F = C.clone ? C.clone() : {};
                      x(C);
                      (0, n.scheduleMicroTask)(function () {
                        u.data.response = C;
                        var H = F.body;
                        H ? c(H, u) : k(u);
                      });
                    },
                    function (C) {
                      y(C);
                      (0, n.scheduleMicroTask)(function () {
                        u.data.aborted = C && "AbortError" === C.name;
                        u.data.error = C;
                        k(u);
                      });
                    }
                  );
                  r.globalState.fetchInProgress = !1;
                });
              };
            }
          }
          h.r(t);
          h.d(t, {
            patchFetch: function () {
              return w;
            },
          });
          var v = h("../rum-core/dist/es/common/polyfills.js"),
            r = h("../rum-core/dist/es/common/patching/patch-utils.js"),
            q = h("../rum-core/dist/es/common/constants.js"),
            n = h("../rum-core/dist/es/common/utils.js"),
            p = h("../rum-core/dist/es/common/http/fetch.js");
        },
        "../rum-core/dist/es/common/patching/history-patch.js": function (
          z,
          t,
          h
        ) {
          function w(r) {
            if (window.history) {
              var q = history.pushState;
              "function" === typeof q &&
                (history.pushState = function (n, p, m) {
                  r(v.INVOKE, {
                    source: v.HISTORY,
                    data: { state: n, title: p, url: m },
                  });
                  q.apply(this, arguments);
                });
            }
          }
          h.r(t);
          h.d(t, {
            patchHistory: function () {
              return w;
            },
          });
          var v = h("../rum-core/dist/es/common/constants.js");
        },
        "../rum-core/dist/es/common/patching/index.js": function (z, t, h) {
          function w() {
            m ||
              ((m = !0),
              (0, v.patchXMLHttpRequest)(function (g, k) {
                p.send(n.XMLHTTPREQUEST, [g, k]);
              }),
              (0, r.patchFetch)(function (g, k) {
                p.send(n.FETCH, [g, k]);
              }),
              (0, q.patchHistory)(function (g, k) {
                p.send(n.HISTORY, [g, k]);
              }));
            return p;
          }
          h.r(t);
          h.d(t, {
            patchAll: function () {
              return w;
            },
            patchEventHandler: function () {
              return p;
            },
          });
          var v = h("../rum-core/dist/es/common/patching/xhr-patch.js"),
            r = h("../rum-core/dist/es/common/patching/fetch-patch.js"),
            q = h("../rum-core/dist/es/common/patching/history-patch.js");
          z = h("../rum-core/dist/es/common/event-handler.js");
          var n = h("../rum-core/dist/es/common/constants.js"),
            p = new z.default(),
            m = !1;
        },
        "../rum-core/dist/es/common/patching/patch-utils.js": function (
          z,
          t,
          h
        ) {
          function w(k) {
            return "__apm_symbol__" + k;
          }
          function v(k, c) {
            k[w("OriginalDelegate")] = c;
          }
          function r(k, c, f) {
            for (var e = k; e && !e.hasOwnProperty(c); )
              e = Object.getPrototypeOf(e);
            !e && k[c] && (e = k);
            k = w(c);
            var d;
            if (e && !(d = e[k])) {
              d = e[k] = e[c];
              var a = e && Object.getOwnPropertyDescriptor(e, c);
              a = a
                ? !1 === a.writable
                  ? !1
                  : !(
                      "function" === typeof a.get &&
                      "undefined" === typeof a.set
                    )
                : !0;
              if (a) {
                var b = f(d, k, c);
                e[c] = function () {
                  return b(this, arguments);
                };
                v(e[c], d);
              }
            }
            return d;
          }
          h.r(t);
          h.d(t, {
            globalState: function () {
              return q;
            },
            apmSymbol: function () {
              return w;
            },
            patchMethod: function () {
              return r;
            },
            XHR_IGNORE: function () {
              return n;
            },
            XHR_SYNC: function () {
              return p;
            },
            XHR_URL: function () {
              return m;
            },
            XHR_METHOD: function () {
              return g;
            },
          });
          var q = { fetchInProgress: !1 },
            n = w("xhrIgnore"),
            p = w("xhrSync"),
            m = w("xhrURL"),
            g = w("xhrMethod");
        },
        "../rum-core/dist/es/common/patching/xhr-patch.js": function (z, t, h) {
          function w(q) {
            function n(c, f) {
              c.state !== r.INVOKE &&
                ((c.state = r.INVOKE), (c.data.status = f), q(r.INVOKE, c));
            }
            function p(c) {
              function f(d) {
                e[r.ADD_EVENT_LISTENER_STR](d, function (a) {
                  a = a.type;
                  "readystatechange" === a
                    ? 4 === e.readyState && 0 !== e.status && n(c, "success")
                    : n(c, "load" === a ? "success" : a);
                });
              }
              if (c.state !== r.SCHEDULE) {
                c.state = r.SCHEDULE;
                q(r.SCHEDULE, c);
                var e = c.data.target;
                f("readystatechange");
                f("load");
                f("timeout");
                f("error");
                f("abort");
              }
            }
            var m = XMLHttpRequest.prototype;
            if (m && m[r.ADD_EVENT_LISTENER_STR])
              var g = (0, v.patchMethod)(m, "open", function () {
                  return function (c, f) {
                    c[v.XHR_IGNORE] ||
                      ((c[v.XHR_METHOD] = f[0]),
                      (c[v.XHR_URL] = f[1]),
                      (c[v.XHR_SYNC] = !1 === f[2]));
                    return g.apply(c, f);
                  };
                }),
                k = (0, v.patchMethod)(m, "send", function () {
                  return function (c, f) {
                    if (c[v.XHR_IGNORE]) return k.apply(c, f);
                    var e = {
                      source: r.XMLHTTPREQUEST,
                      state: "",
                      type: "macroTask",
                      data: {
                        target: c,
                        method: c[v.XHR_METHOD],
                        sync: c[v.XHR_SYNC],
                        url: c[v.XHR_URL],
                        status: "",
                      },
                    };
                    try {
                      return p(e), k.apply(c, f);
                    } catch (d) {
                      throw (n(e, "error"), d);
                    }
                  };
                });
          }
          h.r(t);
          h.d(t, {
            patchXMLHttpRequest: function () {
              return w;
            },
          });
          var v = h("../rum-core/dist/es/common/patching/patch-utils.js"),
            r = h("../rum-core/dist/es/common/constants.js");
        },
        "../rum-core/dist/es/common/polyfills.js": function (z, t, h) {
          h.r(t);
          h.d(t, {
            Promise: function () {
              return w;
            },
          });
          z = h("../../node_modules/promise-polyfill/src/index.js");
          t = {};
          h("../rum-core/dist/es/common/utils.js").isBrowser
            ? (t = window)
            : "undefined" !== typeof self && (t = self);
          var w = "Promise" in t ? t.Promise : z.default;
        },
        "../rum-core/dist/es/common/queue.js": function (z, t, h) {
          h.r(t);
          z = (function () {
            function w(r, q) {
              void 0 === q && (q = {});
              this.onFlush = r;
              this.items = [];
              this.queueLimit = q.queueLimit || -1;
              this.flushInterval = q.flushInterval || 0;
              this.timeoutId = void 0;
            }
            var v = w.prototype;
            v._setTimer = function () {
              var r = this;
              this.timeoutId = setTimeout(function () {
                return r.flush();
              }, this.flushInterval);
            };
            v._clear = function () {
              "undefined" !== typeof this.timeoutId &&
                (clearTimeout(this.timeoutId), (this.timeoutId = void 0));
              this.items = [];
            };
            v.flush = function () {
              this.onFlush(this.items);
              this._clear();
            };
            v.add = function (r) {
              this.items.push(r);
              -1 !== this.queueLimit && this.items.length >= this.queueLimit
                ? this.flush()
                : "undefined" === typeof this.timeoutId && this._setTimer();
            };
            return w;
          })();
          t["default"] = z;
        },
        "../rum-core/dist/es/common/service-factory.js": function (z, t, h) {
          h.r(t);
          h.d(t, {
            serviceCreators: function () {
              return m;
            },
            ServiceFactory: function () {
              return g;
            },
          });
          var w = h("../rum-core/dist/es/common/apm-server.js"),
            v = h("../rum-core/dist/es/common/config-service.js"),
            r = h("../rum-core/dist/es/common/logging-service.js"),
            q = h("../rum-core/dist/es/common/constants.js"),
            n = h("../rum-core/dist/es/state.js"),
            p,
            m =
              ((p = {}),
              (p[q.CONFIG_SERVICE] = function () {
                return new v.default();
              }),
              (p[q.LOGGING_SERVICE] = function () {
                return new r.default({ prefix: "[Elastic APM] " });
              }),
              (p[q.APM_SERVER] = function (k) {
                k = k.getService([q.CONFIG_SERVICE, q.LOGGING_SERVICE]);
                return new w.default(k[0], k[1]);
              }),
              p),
            g = (function () {
              function k() {
                this.instances = {};
                this.initialized = !1;
              }
              var c = k.prototype;
              c.init = function () {
                if (!this.initialized) {
                  this.initialized = !0;
                  var f = this.getService(q.CONFIG_SERVICE);
                  f.init();
                  var e = this.getService([q.LOGGING_SERVICE, q.APM_SERVER]),
                    d = e[0];
                  e = e[1];
                  f.events.observe(q.CONFIG_CHANGE, function () {
                    var a = f.get("logLevel");
                    d.setLevel(a);
                  });
                  e.init();
                }
              };
              c.getService = function (f) {
                var e = this;
                if ("string" === typeof f)
                  return (
                    this.instances[f] ||
                      ("function" === typeof m[f]
                        ? (this.instances[f] = m[f](this))
                        : n.__DEV__ &&
                          console.log(
                            "Cannot get service, No creator for: " + f
                          )),
                    this.instances[f]
                  );
                if (Array.isArray(f))
                  return f.map(function (d) {
                    return e.getService(d);
                  });
              };
              return k;
            })();
        },
        "../rum-core/dist/es/common/throttle.js": function (z, t, h) {
          function w(v, r, q) {
            var n = this,
              p = q.limit,
              m = q.interval,
              g = 0,
              k;
            return function () {
              g++;
              "undefined" === typeof k &&
                (k = setTimeout(function () {
                  g = 0;
                  k = void 0;
                }, m));
              return g > p && "function" === typeof r
                ? r.apply(n, arguments)
                : v.apply(n, arguments);
            };
          }
          h.r(t);
          h.d(t, {
            default: function () {
              return w;
            },
          });
        },
        "../rum-core/dist/es/common/truncate.js": function (z, t, h) {
          function w(f, e, d, a) {
            void 0 === e && (e = n.KEYWORD_LIMIT);
            void 0 === d && (d = !1);
            void 0 === a && (a = "N/A");
            d && v(f) && (f = a);
            return "string" === typeof f ? f.substring(0, e) : f;
          }
          function v(f) {
            return null == f || "" === f || "undefined" === typeof f;
          }
          function r(f, e, d) {
            d = w(f[e], d[0], d[1]);
            v(d) ? delete f[e] : (f[e] = d);
          }
          function q(f, e, d) {
            void 0 === f && (f = {});
            void 0 === d && (d = e);
            for (
              var a = Object.keys(f),
                b = [],
                l = function (x) {
                  x = a[x];
                  var y = !0 === f[x] ? b : f[x];
                  Array.isArray(y)
                    ? "*" === x
                      ? Object.keys(d).forEach(function (B) {
                          return r(d, B, y);
                        })
                      : r(d, x, y)
                    : q(y, e, d[x]);
                },
                u = 0;
              u < a.length;
              u++
            )
              l(u);
            return e;
          }
          h.r(t);
          h.d(t, {
            truncate: function () {
              return w;
            },
            truncateModel: function () {
              return q;
            },
            SPAN_MODEL: function () {
              return g;
            },
            TRANSACTION_MODEL: function () {
              return k;
            },
            ERROR_MODEL: function () {
              return c;
            },
            METADATA_MODEL: function () {
              return p;
            },
            RESPONSE_MODEL: function () {
              return m;
            },
          });
          var n = h("../rum-core/dist/es/common/constants.js"),
            p = {
              service: {
                name: [n.KEYWORD_LIMIT, !0],
                version: !0,
                agent: { version: [n.KEYWORD_LIMIT, !0] },
                environment: !0,
              },
              labels: { "*": !0 },
            },
            m = { "*": !0, headers: { "*": !0 } };
          z = {
            user: { id: !0, email: !0, username: !0 },
            tags: { "*": !0 },
            http: { response: m },
            destination: {
              address: [n.KEYWORD_LIMIT],
              service: { "*": [n.KEYWORD_LIMIT, !0] },
            },
            response: m,
          };
          var g = {
              name: [n.KEYWORD_LIMIT, !0],
              type: [n.KEYWORD_LIMIT, !0],
              id: [n.KEYWORD_LIMIT, !0],
              trace_id: [n.KEYWORD_LIMIT, !0],
              parent_id: [n.KEYWORD_LIMIT, !0],
              transaction_id: [n.KEYWORD_LIMIT, !0],
              subtype: !0,
              action: !0,
              context: z,
            },
            k = {
              name: !0,
              parent_id: !0,
              type: [n.KEYWORD_LIMIT, !0],
              id: [n.KEYWORD_LIMIT, !0],
              trace_id: [n.KEYWORD_LIMIT, !0],
              span_count: { started: [n.KEYWORD_LIMIT, !0] },
              context: z,
            },
            c = {
              id: [n.KEYWORD_LIMIT, !0],
              trace_id: !0,
              transaction_id: !0,
              parent_id: !0,
              culprit: !0,
              exception: { type: !0 },
              transaction: { type: !0 },
              context: z,
            };
        },
        "../rum-core/dist/es/common/url.js": function (z, t, h) {
          function w(p, m) {
            void 0 === m && (m = 2);
            var g = new n(p);
            p = g.query;
            g = g.path.substring(1).split("/");
            for (
              var k = /\W|_/g,
                c = /[0-9]/g,
                f = /[a-z]/g,
                e = /[A-Z]/g,
                d = [],
                a = !1,
                b = 0;
              b < g.length;
              b++
            ) {
              var l = g[b];
              if (a || b > m - 1) {
                l && d.push("*");
                break;
              }
              if (2 <= (l.match(k) || []).length) d.push(":id"), (a = !0);
              else {
                var u = (l.match(c) || []).length;
                if (3 < u || (3 < l.length && 0.3 <= u / l.length))
                  d.push(":id"), (a = !0);
                else {
                  var x = (l.match(e) || []).length;
                  u = (l.match(f) || []).length / l.length;
                  x /= l.length;
                  5 < l.length && ((0.3 < x && 0.6 > x) || (0.3 < u && 0.6 > u))
                    ? (d.push(":id"), (a = !0))
                    : l && d.push(l);
                }
              }
            }
            return (
              "/" +
              (2 <= d.length ? d.join("/") : d.join("")) +
              (p ? "?{query}" : "")
            );
          }
          h.r(t);
          h.d(t, {
            Url: function () {
              return n;
            },
            slugifyUrl: function () {
              return w;
            },
          });
          var v = h("../rum-core/dist/es/common/utils.js"),
            r = [
              ["#", "hash"],
              ["?", "query"],
              ["/", "path"],
              ["@", "auth", 1],
              [NaN, "host", void 0, 1],
            ],
            q = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,
            n = (function () {
              function p(g) {
                var k = this.extractProtocol(g || "");
                g = k.protocol;
                var c = k.address,
                  f = k.slashes;
                k = !g && !f;
                var e = this.getLocation(),
                  d = r.slice();
                c = c.replace("\\", "/");
                f || (d[2] = [NaN, "path"]);
                for (var a = 0; a < d.length; a++) {
                  var b = d[a],
                    l = b[0],
                    u = b[1];
                  if ("string" === typeof l) {
                    if (((f = c.indexOf(l)), ~f)) {
                      var x = b[2];
                      x
                        ? ((l = c.lastIndexOf(l)),
                          (f = Math.max(f, l)),
                          (this[u] = c.slice(0, f)),
                          (c = c.slice(f + x)))
                        : ((this[u] = c.slice(f)), (c = c.slice(0, f)));
                    }
                  } else (this[u] = c), (c = "");
                  this[u] = this[u] || (k && b[3] ? e[u] || "" : "");
                  b[3] && (this[u] = this[u].toLowerCase());
                }
                k &&
                  "/" !== this.path.charAt(0) &&
                  (this.path = "/" + this.path);
                this.relative = k;
                this.protocol = g || e.protocol;
                this.hostname = this.host;
                this.port = "";
                if (/:\d+$/.test(this.host)) {
                  c = this.host.split(":");
                  g = c.pop();
                  c = c.join(":");
                  a: {
                    switch (this.protocol) {
                      case "http:":
                        k = "80" === g;
                        break a;
                      case "https:":
                        k = "443" === g;
                        break a;
                    }
                    k = !0;
                  }
                  k ? (this.host = c) : (this.port = g);
                  this.hostname = c;
                }
                this.origin =
                  this.protocol && this.host && "file:" !== this.protocol
                    ? this.protocol + "//" + this.host
                    : "null";
                this.href = this.toString();
              }
              var m = p.prototype;
              m.toString = function () {
                var g = this.protocol;
                g += "//";
                if (this.auth) {
                  var k = this.auth.split(":");
                  g +=
                    (k[0] ? "[REDACTED]" : "") +
                    (k[1] ? ":[REDACTED]" : "") +
                    "@";
                }
                g += this.host;
                g += this.path;
                g += this.query;
                return (g += this.hash);
              };
              m.getLocation = function () {
                var g = {};
                v.isBrowser && (g = window);
                return g.location;
              };
              m.extractProtocol = function (g) {
                g = q.exec(g);
                return {
                  protocol: g[1] ? g[1].toLowerCase() : "",
                  slashes: !!g[2],
                  address: g[3],
                };
              };
              return p;
            })();
        },
        "../rum-core/dist/es/common/utils.js": function (z, t, h) {
          function w() {
            return "withCredentials" in new window.XMLHttpRequest();
          }
          function v(A) {
            for (var D = [], E = 0; E < A.length; E++) D.push(aa[A[E]]);
            return D.join("");
          }
          function r() {
            return "undefined" != typeof crypto &&
              "function" == typeof crypto.getRandomValues
              ? crypto.getRandomValues(V)
              : "undefined" != typeof msCrypto &&
                "function" == typeof msCrypto.getRandomValues
              ? msCrypto.getRandomValues(V)
              : V;
          }
          function q(A) {
            return v(r()).substr(0, A);
          }
          function n(A) {
            if (A && A.traceId && A.id && A.parentId)
              return (
                "00-" +
                A.traceId +
                "-" +
                (A.sampled ? A.id : A.parentId) +
                "-" +
                (A.sampled ? "01" : "00")
              );
          }
          function p(A) {
            if (
              (A =
                /^([\da-f]{2})-([\da-f]{32})-([\da-f]{16})-([\da-f]{2})$/.exec(
                  A
                ))
            )
              return { traceId: A[2], id: A[3], sampled: "00" !== A[4] };
          }
          function m(A) {
            return (
              /^[\da-f]{2}-[\da-f]{32}-[\da-f]{16}-[\da-f]{2}$/.test(A) &&
              "00000000000000000000000000000000" !== A.slice(3, 35) &&
              "0000000000000000" !== A.slice(36, 52)
            );
          }
          function g(A) {
            A = A.sampleRate;
            if (!("number" !== typeof A || 256 < String(A).length))
              return "es\x3ds:" + A;
          }
          function k(A, D, E) {
            "function" === typeof A.setRequestHeader
              ? A.setRequestHeader(D, E)
              : A.headers && "function" === typeof A.headers.append
              ? A.headers.append(D, E)
              : (A[D] = E);
          }
          function c(A, D) {
            var E = !1;
            "string" === typeof D
              ? (E = A === D)
              : D && "function" === typeof D.test
              ? (E = D.test(A))
              : Array.isArray(D) &&
                D.forEach(function (G) {
                  E || (E = c(A, G));
                });
            return E;
          }
          function f() {
            return (
              U &&
              "function" === typeof Set &&
              "function" === typeof JSON.stringify &&
              O &&
              "function" === typeof O.now &&
              w()
            );
          }
          function e(A, D, E) {
            if (E && A) {
              A = R(A);
              var G = typeof D;
              void 0 != D &&
                "boolean" !== G &&
                "number" !== G &&
                (D = String(D));
              E[A] = D;
              return E;
            }
          }
          function d(A) {
            void 0 === A && (A = []);
            for (var D = [], E = 0; E < A.length; E++) {
              var G = A[E],
                K = G.duration,
                L = G.description;
              G = G.name;
              L && (G += ";desc\x3d" + L);
              K && (G += ";dur\x3d" + K);
              D.push(G);
            }
            return D.join(", ");
          }
          function a() {
            return O.timing.fetchStart;
          }
          function b(A) {
            return A && A.split("?")[0];
          }
          function l(A) {
            return null !== A && "object" === typeof A;
          }
          function u(A) {
            return "function" === typeof A;
          }
          function x(A, D, E) {
            for (var G = 0, K = D.length; G < K; ++G) {
              var L = D[G];
              if (l(L) || u(L))
                for (
                  var Z = Object.keys(L), W = 0, na = Z.length;
                  W < na;
                  W++
                ) {
                  var P = Z[W],
                    T = L[P];
                  E && l(T)
                    ? (l(A[P]) || (A[P] = Array.isArray(T) ? [] : {}),
                      x(A[P], [T], !1))
                    : (A[P] = T);
                }
            }
            return A;
          }
          function y() {
            if ("undefined" !== typeof document)
              for (
                var A = document.getElementsByTagName("script"),
                  D = 0,
                  E = A.length;
                D < E;
                D++
              ) {
                var G = A[D];
                if (0 < G.src.indexOf("elastic")) return G;
              }
          }
          function B() {
            if ("undefined" !== typeof document) {
              var A = document.currentScript;
              return A ? A : y();
            }
          }
          function C(A) {
            return x(A, Y.call(arguments, 1), !1);
          }
          function F(A) {
            return x(A, Y.call(arguments, 1), !0);
          }
          function H(A) {
            return "undefined" === typeof A;
          }
          function I() {}
          function N(A, D, E) {
            if (null == A) throw new TypeError("array is null or not defined");
            A = Object(A);
            var G = A.length >>> 0;
            if ("function" !== typeof D)
              throw new TypeError("predicate must be a function");
            for (var K = 0; K < G; ) {
              var L = A[K];
              if (D.call(E, L, K, A)) return L;
              K++;
            }
          }
          function R(A) {
            return A.replace(/[.*"]/g, "_");
          }
          function S(A, D) {
            for (var E = null, G = 0; G < A.length; G++) {
              var K = A[G];
              D && D(K.type) && (!E || E._end < K._end) && (E = K);
            }
            return E;
          }
          function M(A) {
            return S(A, function (D) {
              return -1 === String(D).indexOf("external");
            });
          }
          function ca(A) {
            return S(A, function (D) {
              return -1 !== String(D).indexOf("external");
            });
          }
          function da(A) {
            for (var D = A[0], E = 1; E < A.length; E++) {
              var G = A[E];
              D._start > G._start && (D = G);
            }
            return D;
          }
          function X() {
            return O.now();
          }
          function ea(A) {
            return "number" === typeof A && 0 <= A ? A : X();
          }
          function fa(A, D) {
            return H(D) || H(A) ? null : parseInt(D - A);
          }
          function ha(A) {
            setTimeout(A, 0);
          }
          function ia(A) {
            ma.Promise.resolve().then(A);
          }
          function ja() {
            return "function" === typeof O.getEntriesByType;
          }
          function ka(A) {
            return (
              "undefined" !== typeof PerformanceObserver &&
              PerformanceObserver.supportedEntryTypes &&
              0 <= PerformanceObserver.supportedEntryTypes.indexOf(A)
            );
          }
          function la() {
            if (null != sessionStorage.getItem("_elastic_inspect_beacon_"))
              return !0;
            if (!window.URL || !window.URLSearchParams) return !1;
            try {
              var A = new URL(window.location.href).searchParams.has(
                "_elastic_inspect_beacon_"
              );
              A && sessionStorage.setItem("_elastic_inspect_beacon_", !0);
              return A;
            } catch (D) {}
            return !1;
          }
          h.r(t);
          h.d(t, {
            extend: function () {
              return C;
            },
            merge: function () {
              return F;
            },
            isUndefined: function () {
              return H;
            },
            noop: function () {
              return I;
            },
            baseExtend: function () {
              return x;
            },
            bytesToHex: function () {
              return v;
            },
            isCORSSupported: function () {
              return w;
            },
            isObject: function () {
              return l;
            },
            isFunction: function () {
              return u;
            },
            isPlatformSupported: function () {
              return f;
            },
            isDtHeaderValid: function () {
              return m;
            },
            parseDtHeaderValue: function () {
              return p;
            },
            getServerTimingInfo: function () {
              return d;
            },
            getDtHeaderValue: function () {
              return n;
            },
            getTSHeaderValue: function () {
              return g;
            },
            getCurrentScript: function () {
              return B;
            },
            getElasticScript: function () {
              return y;
            },
            getTimeOrigin: function () {
              return a;
            },
            generateRandomId: function () {
              return q;
            },
            getEarliestSpan: function () {
              return da;
            },
            getLatestNonXHRSpan: function () {
              return M;
            },
            getLatestXHRSpan: function () {
              return ca;
            },
            getDuration: function () {
              return fa;
            },
            getTime: function () {
              return ea;
            },
            now: function () {
              return X;
            },
            rng: function () {
              return r;
            },
            checkSameOrigin: function () {
              return c;
            },
            scheduleMacroTask: function () {
              return ha;
            },
            scheduleMicroTask: function () {
              return ia;
            },
            setLabel: function () {
              return e;
            },
            setRequestHeader: function () {
              return k;
            },
            stripQueryStringFromUrl: function () {
              return b;
            },
            find: function () {
              return N;
            },
            removeInvalidChars: function () {
              return R;
            },
            PERF: function () {
              return O;
            },
            isPerfTimelineSupported: function () {
              return ja;
            },
            isBrowser: function () {
              return U;
            },
            isPerfTypeSupported: function () {
              return ka;
            },
            isBeaconInspectionEnabled: function () {
              return la;
            },
          });
          var ma = h("../rum-core/dist/es/common/polyfills.js"),
            Y = [].slice,
            U = "undefined" !== typeof window,
            O = U && "undefined" !== typeof performance ? performance : {},
            aa = [];
          for (z = 0; 256 > z; ++z) aa[z] = (z + 256).toString(16).substr(1);
          var V = new Uint8Array(16);
        },
        "../rum-core/dist/es/error-logging/error-logging.js": function (
          z,
          t,
          h
        ) {
          function w(g) {
            var k = !1,
              c = {};
            Object.keys(g).forEach(function (f) {
              if (!(0 <= m.indexOf(f))) {
                var e = g[f];
                if (null != e && "function" !== typeof e) {
                  if ("object" === typeof e) {
                    if ("function" !== typeof e.toISOString) return;
                    e = e.toISOString();
                  }
                  c[f] = e;
                  k = !0;
                }
              }
            });
            if (k) return c;
          }
          h.r(t);
          var v = h("../rum-core/dist/es/error-logging/stack-trace.js"),
            r = h("../rum-core/dist/es/common/utils.js"),
            q = h("../rum-core/dist/es/common/context.js"),
            n = h("../rum-core/dist/es/common/truncate.js"),
            p = ["tags"],
            m = ["stack", "message"];
          z = (function () {
            function g(c, f, e) {
              this._apmServer = c;
              this._configService = f;
              this._transactionService = e;
            }
            var k = g.prototype;
            k.createErrorDataModel = function (c) {
              var f = (0, v.createStackTraces)(c);
              f = (0, v.filterInvalidFrames)(f);
              var e = "(inline script)",
                d = f[f.length - 1];
              d && d.filename && (e = d.filename);
              var a = c.error;
              c = c.message;
              d = "";
              var b = {};
              a &&
                "object" === typeof a &&
                ((c = c || a.message), (d = a.name), (a = w(a))) &&
                (b.custom = a);
              d || (c && -1 < c.indexOf(":") && (d = c.split(":")[0]));
              var l = (a = this._transactionService.getCurrentTransaction())
                  ? a.context
                  : {},
                u = this._configService.get("context");
              if (null == u) u = {};
              else {
                var x = {},
                  y = Object.keys(u),
                  B;
                for (B = 0; B < y.length; B++) {
                  var C = y[B];
                  0 <= p.indexOf(C) || (x[C] = u[C]);
                }
                u = x;
              }
              x = (0, q.getPageContext)();
              b = (0, r.merge)({}, x, l, u, b);
              f = {
                id: (0, r.generateRandomId)(),
                culprit: e,
                exception: { message: c, stacktrace: f, type: d },
                context: b,
              };
              a &&
                (f = (0, r.extend)(f, {
                  trace_id: a.traceId,
                  parent_id: a.id,
                  transaction_id: a.id,
                  transaction: { type: a.type, sampled: a.sampled },
                }));
              return (0, n.truncateModel)(n.ERROR_MODEL, f);
            };
            k.logErrorEvent = function (c) {
              "undefined" !== typeof c &&
                ((c = this.createErrorDataModel(c)),
                "undefined" !== typeof c.exception.message &&
                  this._apmServer.addError(c));
            };
            k.registerListeners = function () {
              var c = this;
              window.addEventListener("error", function (f) {
                return c.logErrorEvent(f);
              });
              window.addEventListener("unhandledrejection", function (f) {
                return c.logPromiseEvent(f);
              });
            };
            k.logPromiseEvent = function (c) {
              c = c.reason;
              null == c && (c = "\x3cno reason specified\x3e");
              this.logErrorEvent(
                "string" === typeof c.message
                  ? {
                      error: c,
                      message:
                        "Unhandled promise rejection: " +
                        (c.name ? c.name + ": " : "") +
                        c.message,
                    }
                  : {
                      message:
                        "Unhandled promise rejection: " +
                        ("object" === typeof c
                          ? "\x3cobject\x3e"
                          : "function" === typeof c
                          ? "\x3cfunction\x3e"
                          : c),
                    }
              );
            };
            k.logError = function (c) {
              var f = {};
              "string" === typeof c ? (f.message = c) : (f.error = c);
              return this.logErrorEvent(f);
            };
            return g;
          })();
          t["default"] = z;
        },
        "../rum-core/dist/es/error-logging/index.js": function (z, t, h) {
          function w() {
            q.serviceCreators[r.ERROR_LOGGING] = function (n) {
              n = n.getService([
                r.APM_SERVER,
                r.CONFIG_SERVICE,
                r.TRANSACTION_SERVICE,
              ]);
              return new v.default(n[0], n[1], n[2]);
            };
          }
          h.r(t);
          h.d(t, {
            registerServices: function () {
              return w;
            },
          });
          var v = h("../rum-core/dist/es/error-logging/error-logging.js"),
            r = h("../rum-core/dist/es/common/constants.js"),
            q = h("../rum-core/dist/es/common/service-factory.js");
        },
        "../rum-core/dist/es/error-logging/stack-trace.js": function (z, t, h) {
          function w(n) {
            return n.map(function (p) {
              if (p.functionName) {
                var m = p.functionName;
                m = m.split("/");
                m = 1 < m.length ? ["Object", m[m.length - 1]].join(".") : m[0];
                m = m.replace(/.<$/gi, ".\x3canonymous\x3e");
                m = m.replace(/^Anonymous function$/, "\x3canonymous\x3e");
                m = m.split(".");
                m = 1 < m.length ? m[m.length - 1] : m[0];
                p.functionName = m;
              }
              return p;
            });
          }
          function v(n) {
            var p = n.error,
              m = n.filename,
              g = n.lineno;
            n = n.colno;
            var k = [];
            if (p)
              try {
                k = q().parse(p);
              } catch (c) {}
            0 === k.length &&
              (k = [{ fileName: m, lineNumber: g, columnNumber: n }]);
            return w(k).map(function (c) {
              var f = c.fileName,
                e = c.lineNumber,
                d = c.columnNumber;
              c = c.functionName;
              c = void 0 === c ? "\x3canonymous\x3e" : c;
              if ((!f && !e) || (!d && !e)) return {};
              var a = f;
              void 0 === a && (a = "");
              "\x3canonymous\x3e" === a && (a = "");
              var b = a;
              var l =
                window.location.origin ||
                window.location.protocol +
                  "//" +
                  window.location.hostname +
                  (window.location.port ? ":" + window.location.port : "");
              -1 < b.indexOf(l) && (b = b.replace(l + "/", ""));
              a = a ? 0 === window.location.href.indexOf(a) : !1;
              a && (b = "(inline script)");
              return {
                abs_path: f,
                filename: b,
                function: c,
                lineno: e,
                colno: d,
              };
            });
          }
          function r(n) {
            return n.filter(function (p) {
              var m = p.lineno;
              return (
                "undefined" !== typeof p.filename && "undefined" !== typeof m
              );
            });
          }
          h.r(t);
          h.d(t, {
            createStackTraces: function () {
              return v;
            },
            filterInvalidFrames: function () {
              return r;
            },
          });
          z = h("../../node_modules/error-stack-parser/error-stack-parser.js");
          var q = h.n(z);
        },
        "../rum-core/dist/es/index.js": function (z, t, h) {
          function w() {
            (0, r.registerServices)();
            (0, v.registerServices)();
            return new q.ServiceFactory();
          }
          h.r(t);
          h.d(t, {
            createServiceFactory: function () {
              return w;
            },
            ServiceFactory: function () {
              return q.ServiceFactory;
            },
            patchAll: function () {
              return p.patchAll;
            },
            patchEventHandler: function () {
              return p.patchEventHandler;
            },
            isPlatformSupported: function () {
              return n.isPlatformSupported;
            },
            isBrowser: function () {
              return n.isBrowser;
            },
            getInstrumentationFlags: function () {
              return c.getInstrumentationFlags;
            },
            createTracer: function () {
              return d.createTracer;
            },
            scheduleMicroTask: function () {
              return n.scheduleMicroTask;
            },
            scheduleMacroTask: function () {
              return n.scheduleMacroTask;
            },
            afterFrame: function () {
              return f.default;
            },
            ERROR: function () {
              return k.ERROR;
            },
            PAGE_LOAD_DELAY: function () {
              return k.PAGE_LOAD_DELAY;
            },
            PAGE_LOAD: function () {
              return k.PAGE_LOAD;
            },
            CONFIG_SERVICE: function () {
              return k.CONFIG_SERVICE;
            },
            LOGGING_SERVICE: function () {
              return k.LOGGING_SERVICE;
            },
            TRANSACTION_SERVICE: function () {
              return k.TRANSACTION_SERVICE;
            },
            APM_SERVER: function () {
              return k.APM_SERVER;
            },
            PERFORMANCE_MONITORING: function () {
              return k.PERFORMANCE_MONITORING;
            },
            ERROR_LOGGING: function () {
              return k.ERROR_LOGGING;
            },
            EVENT_TARGET: function () {
              return k.EVENT_TARGET;
            },
            CLICK: function () {
              return k.CLICK;
            },
            bootstrap: function () {
              return e.bootstrap;
            },
            observePageVisibility: function () {
              return m.observePageVisibility;
            },
            observePageClicks: function () {
              return g.observePageClicks;
            },
          });
          var v = h("../rum-core/dist/es/error-logging/index.js"),
            r = h("../rum-core/dist/es/performance-monitoring/index.js"),
            q = h("../rum-core/dist/es/common/service-factory.js"),
            n = h("../rum-core/dist/es/common/utils.js"),
            p = h("../rum-core/dist/es/common/patching/index.js"),
            m = h("../rum-core/dist/es/common/observers/page-visibility.js"),
            g = h("../rum-core/dist/es/common/observers/page-clicks.js"),
            k = h("../rum-core/dist/es/common/constants.js"),
            c = h("../rum-core/dist/es/common/instrument.js"),
            f = h("../rum-core/dist/es/common/after-frame.js"),
            e = h("../rum-core/dist/es/bootstrap.js"),
            d = h("../rum-core/dist/es/opentracing/index.js");
        },
        "../rum-core/dist/es/opentracing/index.js": function (z, t, h) {
          function w(n) {
            var p = n.getService(q.PERFORMANCE_MONITORING),
              m = n.getService(q.TRANSACTION_SERVICE),
              g = n.getService(q.ERROR_LOGGING);
            n = n.getService(q.LOGGING_SERVICE);
            return new v.default(p, m, n, g);
          }
          h.r(t);
          h.d(t, {
            Span: function () {
              return r.default;
            },
            Tracer: function () {
              return v.default;
            },
            createTracer: function () {
              return w;
            },
          });
          var v = h("../rum-core/dist/es/opentracing/tracer.js"),
            r = h("../rum-core/dist/es/opentracing/span.js"),
            q = h("../rum-core/dist/es/common/constants.js");
        },
        "../rum-core/dist/es/opentracing/span.js": function (z, t, h) {
          function w(n, p) {
            n.prototype = Object.create(p.prototype);
            n.prototype.constructor = n;
            v(n, p);
          }
          function v(n, p) {
            v =
              Object.setPrototypeOf ||
              function (m, g) {
                m.__proto__ = g;
                return m;
              };
            return v(n, p);
          }
          h.r(t);
          z = h("../../node_modules/opentracing/lib/span.js");
          var r = h("../rum-core/dist/es/common/utils.js"),
            q = h("../rum-core/dist/es/performance-monitoring/transaction.js");
          h = (function (n) {
            function p(g, k) {
              var c = n.call(this) || this;
              c.__tracer = g;
              c.span = k;
              c.isTransaction = k instanceof q.default;
              c.spanContext = {
                id: k.id,
                traceId: k.traceId,
                sampled: k.sampled,
              };
              return c;
            }
            w(p, n);
            var m = p.prototype;
            m._context = function () {
              return this.spanContext;
            };
            m._tracer = function () {
              return this.__tracer;
            };
            m._setOperationName = function (g) {
              this.span.name = g;
            };
            m._addTags = function (g) {
              g = (0, r.extend)({}, g);
              g.type && ((this.span.type = g.type), delete g.type);
              if (this.isTransaction) {
                var k = g["user.id"],
                  c = g["user.username"],
                  f = g["user.email"];
                if (k || c || f)
                  this.span.addContext({
                    user: { id: k, username: c, email: f },
                  }),
                    delete g["user.id"],
                    delete g["user.username"],
                    delete g["user.email"];
              }
              this.span.addLabels(g);
            };
            m._log = function (g, k) {
              "error" === g.event &&
                (g["error.object"]
                  ? this.__tracer.errorLogging.logError(g["error.object"])
                  : g.message &&
                    this.__tracer.errorLogging.logError(g.message));
            };
            m._finish = function (g) {
              this.span.end();
              g && (this.span._end = g - (0, r.getTimeOrigin)());
            };
            return p;
          })(z.Span);
          t["default"] = h;
        },
        "../rum-core/dist/es/opentracing/tracer.js": function (z, t, h) {
          function w(g, k) {
            g.prototype = Object.create(k.prototype);
            g.prototype.constructor = g;
            v(g, k);
          }
          function v(g, k) {
            v =
              Object.setPrototypeOf ||
              function (c, f) {
                c.__proto__ = f;
                return c;
              };
            return v(g, k);
          }
          h.r(t);
          z = h("../../node_modules/opentracing/lib/tracer.js");
          var r = h("../../node_modules/opentracing/lib/constants.js"),
            q = h("../../node_modules/opentracing/lib/span.js"),
            n = h("../rum-core/dist/es/common/utils.js"),
            p = h("../rum-core/dist/es/state.js"),
            m = h("../rum-core/dist/es/opentracing/span.js");
          h = (function (g) {
            function k(f, e, d, a) {
              var b = g.call(this) || this;
              b.performanceMonitoring = f;
              b.transactionService = e;
              b.loggingService = d;
              b.errorLogging = a;
              return b;
            }
            w(k, g);
            var c = k.prototype;
            c._startSpan = function (f, e) {
              var d = { managed: !0 };
              if (e)
                if (((d.timestamp = e.startTime), e.childOf))
                  d.parentId = e.childOf.id;
                else if (e.references && 0 < e.references.length) {
                  1 < e.references.length &&
                    p.__DEV__ &&
                    this.loggingService.debug(
                      "Elastic APM OpenTracing: Unsupported number of references, only the first childOf reference will be recorded."
                    );
                  var a = (0, n.find)(e.references, function (b) {
                    return b.type() === r.REFERENCE_CHILD_OF;
                  });
                  a && (d.parentId = a.referencedContext().id);
                }
              f = this.transactionService.getCurrentTransaction()
                ? this.transactionService.startSpan(f, void 0, d)
                : this.transactionService.startTransaction(f, void 0, d);
              if (!f) return new q.Span();
              d.timestamp && (f._start = d.timestamp - (0, n.getTimeOrigin)());
              d = new m.default(this, f);
              e && e.tags && d.addTags(e.tags);
              return d;
            };
            c._inject = function (f, e, d) {
              switch (e) {
                case r.FORMAT_TEXT_MAP:
                case r.FORMAT_HTTP_HEADERS:
                  this.performanceMonitoring.injectDtHeader(f, d);
                  break;
                case r.FORMAT_BINARY:
                  p.__DEV__ &&
                    this.loggingService.debug(
                      "Elastic APM OpenTracing: binary carrier format is not supported."
                    );
              }
            };
            c._extract = function (f, e) {
              switch (f) {
                case r.FORMAT_TEXT_MAP:
                case r.FORMAT_HTTP_HEADERS:
                  var d = this.performanceMonitoring.extractDtHeader(e);
                  break;
                case r.FORMAT_BINARY:
                  p.__DEV__ &&
                    this.loggingService.debug(
                      "Elastic APM OpenTracing: binary carrier format is not supported."
                    );
              }
              d || (d = null);
              return d;
            };
            return k;
          })(z.Tracer);
          t["default"] = h;
        },
        "../rum-core/dist/es/performance-monitoring/breakdown.js": function (
          z,
          t,
          h
        ) {
          function w(g) {
            var k = g.spans,
              c = g._start,
              f = g._end;
            if (0 === k.length) return g.duration();
            k.sort(function (l, u) {
              return l._start - u._start;
            });
            g = k[0];
            var e = g._end,
              d = g._start,
              a = e;
            c = d - c;
            for (var b = 1; b < k.length; b++)
              (g = k[b]),
                (d = g._start),
                (e = g._end),
                d > a ? ((c += d - a), (a = e)) : e > a && (a = e);
            a < f && (c += f - a);
            return c;
          }
          function v(g) {
            var k = {},
              c = w(g);
            k.app = { count: 1, duration: c };
            g = g.spans;
            for (c = 0; c < g.length; c++) {
              var f = g[c],
                e = f.duration();
              if (0 !== e && null != e) {
                var d = f.subtype;
                f = f.type.replace(p.TRUNCATED_TYPE, "");
                d && (f += "." + d);
                k[f] || (k[f] = { duration: 0, count: 0 });
                k[f].count++;
                k[f].duration += e;
              }
            }
            return k;
          }
          function r(g, k) {
            var c = k.count;
            return {
              transaction: g,
              span: k.details,
              samples: {
                "span.self_time.count": { value: void 0 === c ? 1 : c },
                "span.self_time.sum.us": { value: k.duration },
              },
            };
          }
          function q(g, k) {
            void 0 === k && (k = n.PERF.timing);
            var c = [],
              f = g.duration(),
              e = g.type,
              d = g.sampled,
              a = { name: g.name, type: e };
            c.push({
              transaction: a,
              samples: {
                "transaction.duration.count": { value: 1 },
                "transaction.duration.sum.us": { value: f },
                "transaction.breakdown.count": { value: d ? 1 : 0 },
              },
            });
            if (!d) return c;
            if (e === p.PAGE_LOAD && k)
              for (g = 0; g < m.length; g++)
                (f = m[g]),
                  (e = k[f[0]]),
                  (d = k[f[1]]),
                  (e = (0, n.getDuration)(e, d)),
                  0 !== e &&
                    null != e &&
                    c.push(r(a, { details: { type: f[2] }, duration: e }));
            else {
              var b = v(g);
              Object.keys(b).forEach(function (l) {
                var u = l.split(".");
                l = b[l];
                c.push(
                  r(a, {
                    details: { type: u[0], subtype: u[1] },
                    duration: l.duration,
                    count: l.count,
                  })
                );
              });
            }
            return c;
          }
          h.r(t);
          h.d(t, {
            captureBreakdown: function () {
              return q;
            },
          });
          var n = h("../rum-core/dist/es/common/utils.js"),
            p = h("../rum-core/dist/es/common/constants.js"),
            m = [
              ["domainLookupStart", "domainLookupEnd", "DNS"],
              ["connectStart", "connectEnd", "TCP"],
              ["requestStart", "responseStart", "Request"],
              ["responseStart", "responseEnd", "Response"],
              ["domLoading", "domComplete", "Processing"],
              ["loadEventStart", "loadEventEnd", "Load"],
            ];
        },
        "../rum-core/dist/es/performance-monitoring/capture-navigation.js":
          function (z, t, h) {
            function w(b, l, u, x, y) {
              void 0 === y && (y = 0);
              return (
                "number" === typeof b &&
                "number" === typeof l &&
                b >= y &&
                l > b &&
                b - y >= u &&
                l - y <= x &&
                l - b < k.MAX_SPAN_DURATION &&
                b - y < k.MAX_SPAN_DURATION &&
                l - y < k.MAX_SPAN_DURATION
              );
            }
            function v(b, l, u, x) {
              for (var y = [], B = 0; B < e.length; B++) {
                var C = b[e[B][0]],
                  F = b[e[B][1]];
                if (w(C, F, u, x, l)) {
                  var H = new g.default(
                      e[B][2],
                      "hard-navigation.browser-timing"
                    ),
                    I = null;
                  "requestStart" === e[B][0] &&
                    ((H.pageResponse = !0), (I = { url: location.origin }));
                  H._start = C - l;
                  H.end(F - l, I);
                  y.push(H);
                }
              }
              return y;
            }
            function r(b, l, u, x) {
              for (var y = [], B = 0; B < b.length; B++) {
                var C = b[B],
                  F = C.initiatorType,
                  H = C.name,
                  I = C.startTime;
                C = C.responseEnd;
                if (
                  -1 !== k.RESOURCE_INITIATOR_TYPES.indexOf(F) &&
                  null != H &&
                  (("xmlhttprequest" !== F && "fetch" !== F) ||
                    !(
                      /intake\/v\d+\/rum\/events/.test(H) ||
                      (null != l && I > l)
                    )) &&
                  w(I, C, u, x)
                ) {
                  F = y;
                  H = F.push;
                  I = b[B];
                  C = I.name;
                  var N = I.initiatorType,
                    R = I.startTime,
                    S = I.responseEnd,
                    M = "resource";
                  N && (M += "." + N);
                  N = (0, c.stripQueryStringFromUrl)(C);
                  M = new g.default(N, M);
                  M._start = R;
                  M.end(S, { url: C, entry: I });
                  H.call(F, M);
                }
              }
              return y;
            }
            function q(b, l, u) {
              for (var x = [], y = 0; y < b.length; y++) {
                var B = b[y],
                  C = B.name,
                  F = B.startTime,
                  H = B.duration;
                B = F + H;
                H <= k.USER_TIMING_THRESHOLD ||
                  !w(F, B, l, u) ||
                  ((C = new g.default(C, "app")),
                  (C._start = F),
                  C.end(B),
                  x.push(C));
              }
              return x;
            }
            function n(b) {
              var l = b.fetchStart,
                u = b.responseStart,
                x = b.responseEnd;
              if (l >= b.navigationStart && u >= l && x >= u) {
                var y = {};
                d.forEach(function (B) {
                  var C = b[B];
                  C && C >= l && (y[B] = parseInt(C - l));
                });
                return y;
              }
              return null;
            }
            function p(b) {
              b = n(b);
              return null == b
                ? null
                : {
                    navigationTiming: b,
                    agent: {
                      timeToFirstByte: b.responseStart,
                      domInteractive: b.domInteractive,
                      domComplete: b.domComplete,
                    },
                  };
            }
            function m(b) {
              if (b.captureTimings) {
                var l = b._end;
                if (b.type === k.PAGE_LOAD) {
                  if (b.marks && b.marks.custom) {
                    var u = b.marks.custom;
                    Object.keys(u).forEach(function (B) {
                      u[B] += b._start;
                    });
                  }
                  b._start = 0;
                  var x = c.PERF.timing;
                  v(x, x.fetchStart, 0, l).forEach(function (B) {
                    B.traceId = b.traceId;
                    B.sampled = b.sampled;
                    B.pageResponse &&
                      b.options.pageLoadSpanId &&
                      (B.id = b.options.pageLoadSpanId);
                    b.spans.push(B);
                  });
                  b.addMarks(p(x));
                }
                if ((0, c.isPerfTimelineSupported)()) {
                  x = b._start;
                  var y = c.PERF.getEntriesByType(k.RESOURCE);
                  r(y, f.state.bootstrapTime, x, l).forEach(function (B) {
                    return b.spans.push(B);
                  });
                  y = c.PERF.getEntriesByType(k.MEASURE);
                  q(y, x, l).forEach(function (B) {
                    return b.spans.push(B);
                  });
                }
              }
            }
            h.r(t);
            h.d(t, {
              getPageLoadMarks: function () {
                return p;
              },
              captureNavigation: function () {
                return m;
              },
              createNavigationTimingSpans: function () {
                return v;
              },
              createResourceTimingSpans: function () {
                return r;
              },
              createUserTimingSpans: function () {
                return q;
              },
              NAVIGATION_TIMING_MARKS: function () {
                return d;
              },
              COMPRESSED_NAV_TIMING_MARKS: function () {
                return a;
              },
            });
            var g = h("../rum-core/dist/es/performance-monitoring/span.js"),
              k = h("../rum-core/dist/es/common/constants.js"),
              c = h("../rum-core/dist/es/common/utils.js"),
              f = h("../rum-core/dist/es/state.js"),
              e = [
                ["domainLookupStart", "domainLookupEnd", "Domain lookup"],
                [
                  "connectStart",
                  "connectEnd",
                  "Making a connection to the server",
                ],
                [
                  "requestStart",
                  "responseEnd",
                  "Requesting and receiving the document",
                ],
                [
                  "domLoading",
                  "domInteractive",
                  "Parsing the document, executing sync. scripts",
                ],
                [
                  "domContentLoadedEventStart",
                  "domContentLoadedEventEnd",
                  'Fire "DOMContentLoaded" event',
                ],
                ["loadEventStart", "loadEventEnd", 'Fire "load" event'],
              ],
              d =
                "fetchStart domainLookupStart domainLookupEnd connectStart connectEnd requestStart responseStart responseEnd domLoading domInteractive domContentLoadedEventStart domContentLoadedEventEnd domComplete loadEventStart loadEventEnd".split(
                  " "
                ),
              a = "fs ls le cs ce qs rs re dl di ds de dc es ee".split(" ");
          },
        "../rum-core/dist/es/performance-monitoring/index.js": function (
          z,
          t,
          h
        ) {
          function w() {
            n.serviceCreators[q.TRANSACTION_SERVICE] = function (p) {
              p = p.getService([q.LOGGING_SERVICE, q.CONFIG_SERVICE]);
              return new r.default(p[0], p[1]);
            };
            n.serviceCreators[q.PERFORMANCE_MONITORING] = function (p) {
              p = p.getService([
                q.APM_SERVER,
                q.CONFIG_SERVICE,
                q.LOGGING_SERVICE,
                q.TRANSACTION_SERVICE,
              ]);
              return new v.default(p[0], p[1], p[2], p[3]);
            };
          }
          h.r(t);
          h.d(t, {
            registerServices: function () {
              return w;
            },
          });
          var v = h(
              "../rum-core/dist/es/performance-monitoring/performance-monitoring.js"
            ),
            r = h(
              "../rum-core/dist/es/performance-monitoring/transaction-service.js"
            ),
            q = h("../rum-core/dist/es/common/constants.js"),
            n = h("../rum-core/dist/es/common/service-factory.js");
        },
        "../rum-core/dist/es/performance-monitoring/metrics.js": function (
          z,
          t,
          h
        ) {
          function w(d, a) {
            for (var b = [], l = 0; l < d.length; l++) {
              var u = d[l],
                x = u.startTime,
                y = u.duration,
                B = u.attribution,
                C = x + y;
              u = new k.default("Longtask(" + u.name + ")", m.LONG_TASK, {
                startTime: x,
              });
              a.count++;
              a.duration += y;
              a.max = Math.max(y, a.max);
              0 < B.length &&
                ((x = B[0]),
                (y = x.containerName),
                (B = x.containerId),
                (x = { attribution: x.name, type: x.containerType }),
                y && (x.name = y),
                B && (x.id = B),
                u.addContext({ custom: x }));
              u.end(C);
              b.push(u);
            }
            return b;
          }
          function v(d) {
            var a = d[0];
            if (a)
              return (
                (d = a.processingStart),
                (a = new k.default("First Input Delay", m.FIRST_INPUT, {
                  startTime: a.startTime,
                })),
                a.end(d),
                a
              );
          }
          function r(d) {
            var a = d.start;
            d = d.duration;
            var b = new k.default("Total Blocking Time", m.LONG_TASK, {
              startTime: a,
            });
            b.end(a + d);
            return b;
          }
          function q(d) {
            d.forEach(function (a) {
              var b = a.name,
                l = a.startTime;
              a = a.duration;
              l < c.fcp ||
                ("self" !== b && -1 === b.indexOf("same-origin")) ||
                ((c.tbt.start = Math.min(c.tbt.start, l)),
                (b = a - f),
                0 < b && (c.tbt.duration += b));
            });
          }
          function n(d) {
            d.forEach(function (a) {
              if (!a.hadRecentInput && a.value) {
                if (
                  5e3 < a.startTime - c.cls.firstEntryTime ||
                  1e3 < a.startTime - c.cls.prevEntryTime
                )
                  (c.cls.firstEntryTime = a.startTime),
                    (c.cls.currentSessionScore = 0);
                c.cls.prevEntryTime = a.startTime;
                c.cls.currentSessionScore += a.value;
                c.cls.score = Math.max(c.cls.score, c.cls.currentSessionScore);
              }
            });
          }
          function p(d, a) {
            var b = a.isHardNavigation,
              l = a.trStart,
              u = d.getEntriesByType(m.LONG_TASK).filter(function (y) {
                return y.startTime >= l;
              });
            a = { spans: w(u, c.longtask), marks: {} };
            if (!b) return a;
            b = d.getEntriesByType(m.LARGEST_CONTENTFUL_PAINT);
            if ((b = b[b.length - 1]))
              (b = parseInt(b.startTime)),
                (c.lcp = b),
                (a.marks.largestContentfulPaint = b);
            b = g.PERF.timing;
            b = b.fetchStart - b.navigationStart;
            var x = d.getEntriesByName(m.FIRST_CONTENTFUL_PAINT)[0];
            x &&
              ((b = parseInt(0 <= b ? x.startTime - b : x.startTime)),
              (c.fcp = b),
              (a.marks.firstContentfulPaint = b));
            b = d.getEntriesByType(m.FIRST_INPUT);
            if ((b = v(b))) (c.fid = b.duration()), a.spans.push(b);
            q(u);
            d = d.getEntriesByType(m.LAYOUT_SHIFT);
            n(d);
            return a;
          }
          h.r(t);
          h.d(t, {
            metrics: function () {
              return c;
            },
            createLongTaskSpans: function () {
              return w;
            },
            createFirstInputDelaySpan: function () {
              return v;
            },
            createTotalBlockingTimeSpan: function () {
              return r;
            },
            calculateTotalBlockingTime: function () {
              return q;
            },
            calculateCumulativeLayoutShift: function () {
              return n;
            },
            captureObserverEntries: function () {
              return p;
            },
            PerfEntryRecorder: function () {
              return e;
            },
          });
          var m = h("../rum-core/dist/es/common/constants.js"),
            g = h("../rum-core/dist/es/common/utils.js"),
            k = h("../rum-core/dist/es/performance-monitoring/span.js"),
            c = {
              fid: 0,
              fcp: 0,
              tbt: { start: Infinity, duration: 0 },
              cls: {
                score: 0,
                firstEntryTime: Number.NEGATIVE_INFINITY,
                prevEntryTime: Number.NEGATIVE_INFINITY,
                currentSessionScore: 0,
              },
              longtask: { count: 0, duration: 0, max: 0 },
            },
            f = 50,
            e = (function () {
              function d(b) {
                this.po = { observe: g.noop, disconnect: g.noop };
                window.PerformanceObserver &&
                  (this.po = new PerformanceObserver(b));
              }
              var a = d.prototype;
              a.start = function (b) {
                try {
                  this.po.observe({ type: b, buffered: !0 });
                } catch (l) {}
              };
              a.stop = function () {
                this.po.disconnect();
              };
              return d;
            })();
        },
        "../rum-core/dist/es/performance-monitoring/performance-monitoring.js":
          function (z, t, h) {
            function w(e, d, a) {
              e.sort(function (u, x) {
                return u._start - x._start;
              });
              var b = [],
                l = 1;
              e.forEach(function (u, x) {
                if (0 === b.length) b.push(u);
                else {
                  var y = b[b.length - 1],
                    B =
                      y.type === u.type &&
                      y.subtype === u.subtype &&
                      y.action === u.action &&
                      y.name === u.name &&
                      u.duration() / d < a &&
                      (u._start - y._end) / d < a;
                  x = e.length === x + 1;
                  B && (l++, (y._end = u._end));
                  1 < l && (!B || x) && ((y.name = l + "x " + y.name), (l = 1));
                  B || b.push(u);
                }
              });
              return b;
            }
            function v(e) {
              if (e.sampled) {
                var d = e.spans.filter(function (b) {
                  return (
                    0 < b.duration() && b._start >= e._start && b._end <= e._end
                  );
                });
                if (e.isManaged()) {
                  var a = e.duration();
                  d = w(d, a, c);
                  e.spans = d;
                } else e.spans = d;
              } else e.resetFields();
              return e;
            }
            h.r(t);
            h.d(t, {
              groupSmallContinuouslySimilarSpans: function () {
                return w;
              },
              adjustTransaction: function () {
                return v;
              },
              default: function () {
                return f;
              },
            });
            var r = h("../rum-core/dist/es/common/utils.js"),
              q = h("../rum-core/dist/es/common/url.js"),
              n = h("../rum-core/dist/es/common/patching/index.js"),
              p = h("../rum-core/dist/es/common/patching/patch-utils.js"),
              m = h("../rum-core/dist/es/common/constants.js"),
              g = h("../rum-core/dist/es/common/truncate.js"),
              k = h("../rum-core/dist/es/state.js"),
              c = 0.05,
              f = (function () {
                function e(a, b, l, u) {
                  this._apmServer = a;
                  this._configService = b;
                  this._logginService = l;
                  this._transactionService = u;
                }
                var d = e.prototype;
                d.init = function (a) {
                  var b = this;
                  void 0 === a && (a = {});
                  this._configService.events.observe(
                    m.TRANSACTION_END + m.AFTER_EVENT,
                    function (l) {
                      if ((l = b.createTransactionPayload(l)))
                        b._apmServer.addTransaction(l),
                          b._configService.dispatchEvent(
                            m.QUEUE_ADD_TRANSACTION
                          );
                    }
                  );
                  a[m.HISTORY] &&
                    n.patchEventHandler.observe(
                      m.HISTORY,
                      this.getHistorySub()
                    );
                  a[m.XMLHTTPREQUEST] &&
                    n.patchEventHandler.observe(
                      m.XMLHTTPREQUEST,
                      this.getXHRSub()
                    );
                  a[m.FETCH] &&
                    n.patchEventHandler.observe(m.FETCH, this.getFetchSub());
                };
                d.getHistorySub = function () {
                  var a = this._transactionService;
                  return function (b, l) {
                    l.source === m.HISTORY &&
                      b === m.INVOKE &&
                      a.startTransaction(l.data.title, "route-change", {
                        managed: !0,
                        canReuse: !0,
                      });
                  };
                };
                d.getXHRSub = function () {
                  var a = this;
                  return function (b, l) {
                    l.source !== m.XMLHTTPREQUEST ||
                      p.globalState.fetchInProgress ||
                      a.processAPICalls(b, l);
                  };
                };
                d.getFetchSub = function () {
                  var a = this;
                  return function (b, l) {
                    l.source === m.FETCH && a.processAPICalls(b, l);
                  };
                };
                d.processAPICalls = function (a, b) {
                  var l = this._configService,
                    u = this._transactionService;
                  if (b.data && b.data.url) {
                    var x = this._apmServer.getEndpoints();
                    if (
                      Object.keys(x).some(function (I) {
                        return -1 !== b.data.url.indexOf(x[I]);
                      })
                    )
                      return;
                  }
                  if (a === m.SCHEDULE && b.data) {
                    a = b.data;
                    var y = new q.Url(a.url),
                      B =
                        a.method +
                        " " +
                        (y.relative
                          ? y.path
                          : (0, r.stripQueryStringFromUrl)(y.href));
                    u.getCurrentTransaction() ||
                      u.startTransaction(B, m.HTTP_REQUEST_TYPE, {
                        managed: !0,
                      });
                    if (
                      (u = u.startSpan(B, "external.http", { blocking: !0 }))
                    ) {
                      B = l.get("distributedTracing");
                      var C = l.get("distributedTracingOrigins"),
                        F = new q.Url(window.location.href);
                      C =
                        (0, r.checkSameOrigin)(y.origin, F.origin) ||
                        (0, r.checkSameOrigin)(y.origin, C);
                      var H = a.target;
                      B && C && H
                        ? (this.injectDtHeader(u, H),
                          l.get("propagateTracestate") &&
                            this.injectTSHeader(u, H))
                        : k.__DEV__ &&
                          this._logginService.debug(
                            "Could not inject distributed tracing header to the request origin ('" +
                              y.origin +
                              "') from the current origin ('" +
                              F.origin +
                              "')"
                          );
                      a.sync && (u.sync = a.sync);
                      a.span = u;
                    }
                  } else
                    a === m.INVOKE &&
                      (l = b.data) &&
                      l.span &&
                      ((a = l.span),
                      (y = l.response),
                      (B = l.target),
                      (y = y ? y.status : B.status),
                      (y =
                        "abort" == l.status || l.aborted
                          ? m.OUTCOME_UNKNOWN
                          : 400 <= y || 0 == y
                          ? m.OUTCOME_FAILURE
                          : m.OUTCOME_SUCCESS),
                      (a.outcome = y),
                      (B = u.getCurrentTransaction()) &&
                        B.type === m.HTTP_REQUEST_TYPE &&
                        (B.outcome = y),
                      u.endSpan(a, l));
                };
                d.injectDtHeader = function (a, b) {
                  var l = this._configService.get(
                    "distributedTracingHeaderName"
                  );
                  a = (0, r.getDtHeaderValue)(a);
                  (0, r.isDtHeaderValid)(a) &&
                    a &&
                    l &&
                    (0, r.setRequestHeader)(b, l, a);
                };
                d.injectTSHeader = function (a, b) {
                  (a = (0, r.getTSHeaderValue)(a)) &&
                    (0, r.setRequestHeader)(b, "tracestate", a);
                };
                d.extractDtHeader = function (a) {
                  var b = this._configService.get(
                    "distributedTracingHeaderName"
                  );
                  if (a) return (0, r.parseDtHeaderValue)(a[b]);
                };
                d.filterTransaction = function (a) {
                  var b = a.duration();
                  if (!b)
                    return (
                      k.__DEV__ &&
                        ((a =
                          "transaction(" +
                          a.id +
                          ", " +
                          a.name +
                          ") was discarded! "),
                        this._logginService.debug(
                          0 === b
                            ? a + "Transaction duration is 0"
                            : a + "Transaction wasn't ended"
                        )),
                      !1
                    );
                  if (a.isManaged()) {
                    if (6e4 < b)
                      return (
                        k.__DEV__ &&
                          this._logginService.debug(
                            "transaction(" +
                              a.id +
                              ", " +
                              a.name +
                              ") was discarded! Transaction duration (" +
                              b +
                              ") is greater than managed transaction threshold (60000)"
                          ),
                        !1
                      );
                    if (a.sampled && 0 === a.spans.length)
                      return (
                        k.__DEV__ &&
                          this._logginService.debug(
                            "transaction(" +
                              a.id +
                              ", " +
                              a.name +
                              ") was discarded! Transaction does not have any spans"
                          ),
                        !1
                      );
                  }
                  return !0;
                };
                d.createTransactionDataModel = function (a) {
                  var b = a._start,
                    l = a.spans.map(function (u) {
                      u = {
                        id: u.id,
                        transaction_id: a.id,
                        parent_id: u.parentId || a.id,
                        trace_id: a.traceId,
                        name: u.name,
                        type: u.type,
                        subtype: u.subtype,
                        action: u.action,
                        sync: u.sync,
                        start: parseInt(u._start - b),
                        duration: u.duration(),
                        context: u.context,
                        outcome: u.outcome,
                        sample_rate: u.sampleRate,
                      };
                      return (0, g.truncateModel)(g.SPAN_MODEL, u);
                    });
                  l = {
                    id: a.id,
                    trace_id: a.traceId,
                    session: a.session,
                    name: a.name,
                    type: a.type,
                    duration: a.duration(),
                    spans: l,
                    context: a.context,
                    marks: a.marks,
                    breakdown: a.breakdownTimings,
                    span_count: { started: l.length },
                    sampled: a.sampled,
                    sample_rate: a.sampleRate,
                    experience: a.experience,
                    outcome: a.outcome,
                  };
                  return (0, g.truncateModel)(g.TRANSACTION_MODEL, l);
                };
                d.createTransactionPayload = function (a) {
                  var b = v(a);
                  if (this.filterTransaction(b))
                    return this.createTransactionDataModel(a);
                };
                return e;
              })();
          },
        "../rum-core/dist/es/performance-monitoring/span-base.js": function (
          z,
          t,
          h
        ) {
          h.r(t);
          var w = h("../rum-core/dist/es/common/utils.js"),
            v = h("../rum-core/dist/es/common/constants.js");
          z = (function () {
            function r(n, p, m) {
              void 0 === m && (m = {});
              n || (n = v.NAME_UNKNOWN);
              p || (p = v.TYPE_CUSTOM);
              this.name = n;
              this.type = p;
              this.options = m;
              this.id = m.id || (0, w.generateRandomId)(16);
              this.traceId = m.traceId;
              this.sampled = m.sampled;
              this.sampleRate = m.sampleRate;
              this.timestamp = m.timestamp;
              this._start = (0, w.getTime)(m.startTime);
              this._end = void 0;
              this.ended = !1;
              this.outcome = void 0;
              this.onEnd = m.onEnd;
            }
            var q = r.prototype;
            q.ensureContext = function () {
              this.context || (this.context = {});
            };
            q.addLabels = function (n) {
              this.ensureContext();
              var p = this.context;
              p.tags || (p.tags = {});
              Object.keys(n).forEach(function (m) {
                return (0, w.setLabel)(m, n[m], p.tags);
              });
            };
            q.addContext = function () {
              for (var n = arguments.length, p = Array(n), m = 0; m < n; m++)
                p[m] = arguments[m];
              0 !== p.length &&
                (this.ensureContext(),
                w.merge.apply(void 0, [this.context].concat(p)));
            };
            q.end = function (n) {
              this.ended ||
                ((this.ended = !0),
                (this._end = (0, w.getTime)(n)),
                this.callOnEnd());
            };
            q.callOnEnd = function () {
              if ("function" === typeof this.onEnd) this.onEnd(this);
            };
            q.duration = function () {
              return (0, w.getDuration)(this._start, this._end);
            };
            return r;
          })();
          t["default"] = z;
        },
        "../rum-core/dist/es/performance-monitoring/span.js": function (
          z,
          t,
          h
        ) {
          function w(q, n) {
            q.prototype = Object.create(n.prototype);
            q.prototype.constructor = q;
            v(q, n);
          }
          function v(q, n) {
            v =
              Object.setPrototypeOf ||
              function (p, m) {
                p.__proto__ = m;
                return p;
              };
            return v(q, n);
          }
          h.r(t);
          z = h("../rum-core/dist/es/performance-monitoring/span-base.js");
          var r = h("../rum-core/dist/es/common/context.js");
          h = (function (q) {
            function n(p, m, g) {
              p = q.call(this, p, m, g) || this;
              p.parentId = p.options.parentId;
              p.subtype = void 0;
              p.action = void 0;
              -1 !== p.type.indexOf(".") &&
                ((m = p.type.split(".", 3)),
                (p.type = m[0]),
                (p.subtype = m[1]),
                (p.action = m[2]));
              p.sync = p.options.sync;
              return p;
            }
            w(n, q);
            n.prototype.end = function (p, m) {
              q.prototype.end.call(this, p);
              (0, r.addSpanContext)(this, m);
            };
            return n;
          })(z.default);
          t["default"] = h;
        },
        "../rum-core/dist/es/performance-monitoring/transaction-service.js":
          function (z, t, h) {
            h.r(t);
            var w = h("../rum-core/dist/es/common/polyfills.js"),
              v = h(
                "../rum-core/dist/es/performance-monitoring/transaction.js"
              ),
              r = h("../rum-core/dist/es/performance-monitoring/metrics.js"),
              q = h("../rum-core/dist/es/common/utils.js"),
              n = h(
                "../rum-core/dist/es/performance-monitoring/capture-navigation.js"
              ),
              p = h("../rum-core/dist/es/common/constants.js"),
              m = h("../rum-core/dist/es/common/context.js"),
              g = h("../rum-core/dist/es/state.js"),
              k = h("../rum-core/dist/es/common/url.js");
            z = (function () {
              function c(e, d) {
                var a = this;
                this._config = d;
                this._logger = e;
                this.respIntervalId = this.currentTransaction = void 0;
                this.recorder = new r.PerfEntryRecorder(function (b) {
                  var l = a.getCurrentTransaction();
                  if (l && l.captureTimings) {
                    var u,
                      x = l.type === p.PAGE_LOAD;
                    x = (0, r.captureObserverEntries)(b, {
                      isHardNavigation: x,
                      trStart: x ? 0 : l._start,
                    });
                    b = x.spans;
                    x = x.marks;
                    (u = l.spans).push.apply(u, b);
                    l.addMarks({ agent: x });
                  }
                });
              }
              var f = c.prototype;
              f.createCurrentTransaction = function (e, d, a) {
                return (this.currentTransaction = e = new v.default(e, d, a));
              };
              f.getCurrentTransaction = function () {
                if (this.currentTransaction && !this.currentTransaction.ended)
                  return this.currentTransaction;
              };
              f.createOptions = function (e) {
                var d = this._config.config,
                  a = { transactionSampleRate: d.transactionSampleRate };
                e = (0, q.extend)(a, e);
                e.managed &&
                  (e = (0, q.extend)(
                    {
                      pageLoadTraceId: d.pageLoadTraceId,
                      pageLoadSampled: d.pageLoadSampled,
                      pageLoadSpanId: d.pageLoadSpanId,
                      pageLoadTransactionName: d.pageLoadTransactionName,
                    },
                    e
                  ));
                return e;
              };
              f.startManagedTransaction = function (e, d, a) {
                var b = this.getCurrentTransaction(),
                  l = !1;
                if (b)
                  if (b.canReuse() && a.canReuse) {
                    l = b.type;
                    var u = p.TRANSACTION_TYPE_ORDER.indexOf(b.type),
                      x = p.TRANSACTION_TYPE_ORDER.indexOf(d);
                    0 <= u && x < u && (l = d);
                    g.__DEV__ &&
                      this._logger.debug(
                        "redefining transaction(" +
                          b.id +
                          ", " +
                          b.name +
                          ", " +
                          b.type +
                          ")",
                        "to",
                        "(" + (e || b.name) + ", " + l + ")",
                        b
                      );
                    b.redefine(e, l, a);
                    l = !0;
                  } else
                    g.__DEV__ &&
                      this._logger.debug(
                        "ending previous transaction(" +
                          b.id +
                          ", " +
                          b.name +
                          ")",
                        b
                      ),
                      b.end(),
                      (b = this.createCurrentTransaction(e, d, a));
                else b = this.createCurrentTransaction(e, d, a);
                b.type === p.PAGE_LOAD &&
                  (l ||
                    (this.recorder.start(p.LARGEST_CONTENTFUL_PAINT),
                    this.recorder.start(p.PAINT),
                    this.recorder.start(p.FIRST_INPUT),
                    this.recorder.start(p.LAYOUT_SHIFT)),
                  a.pageLoadTraceId && (b.traceId = a.pageLoadTraceId),
                  a.pageLoadSampled && (b.sampled = a.pageLoadSampled),
                  b.name === p.NAME_UNKNOWN &&
                    a.pageLoadTransactionName &&
                    (b.name = a.pageLoadTransactionName));
                !l &&
                  this._config.get("monitorLongtasks") &&
                  this.recorder.start(p.LONG_TASK);
                b.sampled && (b.captureTimings = !0);
                return b;
              };
              f.startTransaction = function (e, d, a) {
                var b = this;
                a = this.createOptions(a);
                var l = !0;
                if (a.managed) {
                  var u = this.currentTransaction;
                  var x = this.startManagedTransaction(e, d, a);
                  u === x && (l = !1);
                } else x = new v.default(e, d, a);
                x.onEnd = function () {
                  return b.handleTransactionEnd(x);
                };
                l &&
                  (g.__DEV__ &&
                    this._logger.debug(
                      "startTransaction(" +
                        x.id +
                        ", " +
                        x.name +
                        ", " +
                        x.type +
                        ")"
                    ),
                  this._config.events.send(p.TRANSACTION_START, [x]));
                return x;
              };
              f.handleTransactionEnd = function (e) {
                var d = this;
                this.recorder.stop();
                var a = window.location.href;
                return w.Promise.resolve().then(
                  function () {
                    var b = e.name,
                      l = e.type;
                    if (g.state.lastHiddenStart >= e._start)
                      g.__DEV__ &&
                        d._logger.debug(
                          "transaction(" +
                            e.id +
                            ", " +
                            b +
                            ", " +
                            l +
                            ") was discarded! The page was hidden during the transaction!"
                        );
                    else if (
                      d.shouldIgnoreTransaction(b) ||
                      l === p.TEMPORARY_TYPE
                    )
                      g.__DEV__ &&
                        d._logger.debug(
                          "transaction(" +
                            e.id +
                            ", " +
                            b +
                            ", " +
                            l +
                            ") is ignored"
                        );
                    else {
                      if (l === p.PAGE_LOAD) {
                        l = d._config.get("pageLoadTransactionName");
                        b === p.NAME_UNKNOWN && l && (e.name = l);
                        if (e.captureTimings) {
                          b = r.metrics.cls;
                          l = r.metrics.fid;
                          var u = r.metrics.tbt,
                            x = r.metrics.longtask;
                          0 < u.duration &&
                            e.spans.push((0, r.createTotalBlockingTimeSpan)(u));
                          e.experience = {};
                          (0, q.isPerfTypeSupported)(p.LONG_TASK) &&
                            (e.experience.tbt = u.duration);
                          (0, q.isPerfTypeSupported)(p.LAYOUT_SHIFT) &&
                            (e.experience.cls = b.score);
                          0 < l && (e.experience.fid = l);
                          0 < x.count &&
                            (e.experience.longtask = {
                              count: x.count,
                              sum: x.duration,
                              max: x.max,
                            });
                        }
                        d.setSession(e);
                      }
                      e.name === p.NAME_UNKNOWN &&
                        (e.name = (0, k.slugifyUrl)(a));
                      (0, n.captureNavigation)(e);
                      d.adjustTransactionTime(e);
                      d._config.get("breakdownMetrics") && e.captureBreakdown();
                      b = d._config.get("context");
                      (0, m.addTransactionContext)(e, b);
                      d._config.events.send(p.TRANSACTION_END, [e]);
                      g.__DEV__ &&
                        d._logger.debug(
                          "end transaction(" +
                            e.id +
                            ", " +
                            e.name +
                            ", " +
                            e.type +
                            ")",
                          e
                        );
                    }
                  },
                  function (b) {
                    g.__DEV__ &&
                      d._logger.debug(
                        "error ending transaction(" +
                          e.id +
                          ", " +
                          e.name +
                          ")",
                        b
                      );
                  }
                );
              };
              f.setSession = function (e) {
                var d = this._config.get("session");
                d &&
                  ("boolean" == typeof d
                    ? (e.session = {
                        id: (0, q.generateRandomId)(16),
                        sequence: 1,
                      })
                    : d.timestamp &&
                      Date.now() - d.timestamp > p.SESSION_TIMEOUT
                    ? (e.session = {
                        id: (0, q.generateRandomId)(16),
                        sequence: 1,
                      })
                    : (e.session = {
                        id: d.id,
                        sequence: d.sequence ? d.sequence + 1 : 1,
                      }),
                  (e = {
                    session: {
                      id: e.session.id,
                      sequence: e.session.sequence,
                      timestamp: Date.now(),
                    },
                  }),
                  this._config.setConfig(e),
                  this._config.setLocalConfig(e, !0));
              };
              f.adjustTransactionTime = function (e) {
                var d = e.spans,
                  a = (0, q.getEarliestSpan)(d);
                a && a._start < e._start && (e._start = a._start);
                a = ((0, q.getLatestNonXHRSpan)(d) || {})._end || 0;
                if (e.type === p.PAGE_LOAD) {
                  var b = e._end - p.PAGE_LOAD_DELAY,
                    l = r.metrics.lcp || 0,
                    u = ((0, q.getLatestXHRSpan)(d) || {})._end || 0;
                  e._end = Math.max(a, u, l, b);
                } else a > e._end && (e._end = a);
                this.truncateSpans(d, e._end);
              };
              f.truncateSpans = function (e, d) {
                for (var a = 0; a < e.length; a++) {
                  var b = e[a];
                  b._end > d && ((b._end = d), (b.type += p.TRUNCATED_TYPE));
                  b._start > d && (b._start = d);
                }
              };
              f.shouldIgnoreTransaction = function (e) {
                var d = this._config.get("ignoreTransactions");
                if (d && d.length)
                  for (var a = 0; a < d.length; a++) {
                    var b = d[a];
                    if ("function" === typeof b.test) {
                      if (b.test(e)) return !0;
                    } else if (b === e) return !0;
                  }
                return !1;
              };
              f.startSpan = function (e, d, a) {
                var b = this.getCurrentTransaction();
                b ||
                  (b = this.createCurrentTransaction(
                    void 0,
                    p.TEMPORARY_TYPE,
                    this.createOptions({ canReuse: !0, managed: !0 })
                  ));
                d = b.startSpan(e, d, a);
                g.__DEV__ &&
                  this._logger.debug(
                    "startSpan(" + e + ", " + d.type + ")",
                    "on transaction(" + b.id + ", " + b.name + ")"
                  );
                return d;
              };
              f.endSpan = function (e, d) {
                if (e) {
                  if (g.__DEV__) {
                    var a = this.getCurrentTransaction();
                    a &&
                      this._logger.debug(
                        "endSpan(" + e.name + ", " + e.type + ")",
                        "on transaction(" + a.id + ", " + a.name + ")"
                      );
                  }
                  e.end(null, d);
                }
              };
              return c;
            })();
            t["default"] = z;
          },
        "../rum-core/dist/es/performance-monitoring/transaction.js": function (
          z,
          t,
          h
        ) {
          function w(m, g) {
            m.prototype = Object.create(g.prototype);
            m.prototype.constructor = m;
            v(m, g);
          }
          function v(m, g) {
            v =
              Object.setPrototypeOf ||
              function (k, c) {
                k.__proto__ = c;
                return k;
              };
            return v(m, g);
          }
          h.r(t);
          var r = h("../rum-core/dist/es/performance-monitoring/span.js");
          z = h("../rum-core/dist/es/performance-monitoring/span-base.js");
          var q = h("../rum-core/dist/es/common/utils.js"),
            n = h("../rum-core/dist/es/common/constants.js"),
            p = h("../rum-core/dist/es/performance-monitoring/breakdown.js");
          h = (function (m) {
            function g(c, f, e) {
              c = m.call(this, c, f, e) || this;
              c.traceId = (0, q.generateRandomId)();
              c.marks = void 0;
              c.spans = [];
              c._activeSpans = {};
              c._activeTasks = new Set();
              c.blocked = !1;
              c.captureTimings = !1;
              c.breakdownTimings = [];
              c.sampleRate = c.options.transactionSampleRate;
              c.sampled = Math.random() <= c.sampleRate;
              return c;
            }
            w(g, m);
            var k = g.prototype;
            k.addMarks = function (c) {
              this.marks = (0, q.merge)(this.marks || {}, c);
            };
            k.mark = function (c) {
              c = (0, q.removeInvalidChars)(c);
              var f = (0, q.now)() - this._start,
                e = {};
              e[c] = f;
              this.addMarks({ custom: e });
            };
            k.canReuse = function () {
              var c = this.options.reuseThreshold || n.REUSABILITY_THRESHOLD;
              return (
                !!this.options.canReuse &&
                !this.ended &&
                (0, q.now)() - this._start < c
              );
            };
            k.redefine = function (c, f, e) {
              c && (this.name = c);
              f && (this.type = f);
              e &&
                ((this.options.reuseThreshold = e.reuseThreshold),
                (0, q.extend)(this.options, e));
            };
            k.startSpan = function (c, f, e) {
              var d = this;
              if (!this.ended)
                return (
                  (e = (0, q.extend)({}, e)),
                  (e.onEnd = function (a) {
                    d._onSpanEnd(a);
                  }),
                  (e.traceId = this.traceId),
                  (e.sampled = this.sampled),
                  (e.sampleRate = this.sampleRate),
                  e.parentId || (e.parentId = this.id),
                  (c = new r.default(c, f, e)),
                  (this._activeSpans[c.id] = c),
                  e.blocking && this.addTask(c.id),
                  c
                );
            };
            k.isFinished = function () {
              return !this.blocked && 0 === this._activeTasks.size;
            };
            k.detectFinish = function () {
              this.isFinished() && this.end();
            };
            k.end = function (c) {
              if (!this.ended) {
                this.ended = !0;
                this._end = (0, q.getTime)(c);
                for (var f in this._activeSpans) {
                  var e = this._activeSpans[f];
                  e.type += n.TRUNCATED_TYPE;
                  e.end(c);
                }
                this.callOnEnd();
              }
            };
            k.captureBreakdown = function () {
              this.breakdownTimings = (0, p.captureBreakdown)(this);
            };
            k.block = function (c) {
              (this.blocked = c) || this.detectFinish();
            };
            k.addTask = function (c) {
              c || (c = "task-" + (0, q.generateRandomId)(16));
              this._activeTasks.add(c);
              return c;
            };
            k.removeTask = function (c) {
              this._activeTasks.delete(c) && this.detectFinish();
            };
            k.resetFields = function () {
              this.spans = [];
              this.sampleRate = 0;
            };
            k._onSpanEnd = function (c) {
              this.spans.push(c);
              delete this._activeSpans[c.id];
              this.removeTask(c.id);
            };
            k.isManaged = function () {
              return !!this.options.managed;
            };
            return g;
          })(z.default);
          t["default"] = h;
        },
        "../rum-core/dist/es/state.js": function (z, t, h) {
          h.r(t);
          h.d(t, {
            __DEV__: function () {
              return w;
            },
            state: function () {
              return v;
            },
          });
          var w = !0,
            v = {
              bootstrapTime: null,
              lastHiddenStart: Number.MIN_SAFE_INTEGER,
            };
        },
        "./src/apm-base.js": function (z, t, h) {
          h.r(t);
          h.d(t, {
            default: function () {
              return n;
            },
          });
          var w = h("../rum-core/dist/es/common/constants.js"),
            v = h("../rum-core/dist/es/common/instrument.js"),
            r = h("../rum-core/dist/es/common/observers/page-visibility.js"),
            q = h("../rum-core/dist/es/common/observers/page-clicks.js"),
            n = (function () {
              function p(g, k) {
                this._disable = k;
                this.serviceFactory = g;
                this._initialized = !1;
              }
              var m = p.prototype;
              m.isEnabled = function () {
                return !this._disable;
              };
              m.isActive = function () {
                var g = this.serviceFactory.getService(w.CONFIG_SERVICE);
                return this.isEnabled() && this._initialized && g.get("active");
              };
              m.init = function (g) {
                var k = this;
                if (this.isEnabled() && !this._initialized) {
                  this._initialized = !0;
                  var c = this.serviceFactory.getService([
                      w.CONFIG_SERVICE,
                      w.LOGGING_SERVICE,
                      w.TRANSACTION_SERVICE,
                    ]),
                    f = c[0],
                    e = c[1];
                  c = c[2];
                  f.setVersion("5.11.1");
                  this.config(g);
                  g = f.get("logLevel");
                  e.setLevel(g);
                  if (f.get("active")) {
                    this.serviceFactory.init();
                    var d = (0, v.getInstrumentationFlags)(
                      f.get("instrument"),
                      f.get("disableInstrumentations")
                    );
                    this.serviceFactory
                      .getService(w.PERFORMANCE_MONITORING)
                      .init(d);
                    d[w.ERROR] &&
                      this.serviceFactory
                        .getService(w.ERROR_LOGGING)
                        .registerListeners();
                    f.get("session") &&
                      (e = f.getLocalConfig()) &&
                      e.session &&
                      f.setConfig({ session: e.session });
                    e = function () {
                      return d[w.PAGE_LOAD] && k._sendPageLoadMetrics();
                    };
                    f.get("centralConfig")
                      ? this.fetchCentralConfig().then(e)
                      : e();
                    (0, r.observePageVisibility)(f, c);
                    d[w.EVENT_TARGET] &&
                      d[w.CLICK] &&
                      (0, q.observePageClicks)(c);
                  } else (this._disable = !0), e.warn("RUM agent is inactive");
                }
                return this;
              };
              m.fetchCentralConfig = function () {
                var g = this.serviceFactory.getService([
                    w.APM_SERVER,
                    w.LOGGING_SERVICE,
                    w.CONFIG_SERVICE,
                  ]),
                  k = g[1],
                  c = g[2];
                return g[0]
                  .fetchConfig(c.get("serviceName"), c.get("environment"))
                  .then(function (f) {
                    var e = f.transaction_sample_rate;
                    if (e) {
                      e = Number(e);
                      e = { transactionSampleRate: e };
                      var d = c.validate(e).invalid;
                      0 === d.length
                        ? c.setConfig(e)
                        : ((e = d[0]),
                          k.warn(
                            'invalid value "' +
                              e.value +
                              '" for ' +
                              e.key +
                              ". Allowed: " +
                              e.allowed +
                              "."
                          ));
                    }
                    return f;
                  })
                  .catch(function (f) {
                    k.warn("failed fetching config:", f);
                  });
              };
              m._sendPageLoadMetrics = function () {
                var g = this.startTransaction(void 0, w.PAGE_LOAD, {
                  managed: !0,
                  canReuse: !0,
                });
                if (g) {
                  g.addTask(w.PAGE_LOAD);
                  var k = function () {
                    setTimeout(function () {
                      return g.removeTask(w.PAGE_LOAD);
                    }, w.PAGE_LOAD_DELAY);
                  };
                  "complete" === document.readyState
                    ? k()
                    : window.addEventListener("load", k);
                }
              };
              m.observe = function (g, k) {
                this.serviceFactory
                  .getService(w.CONFIG_SERVICE)
                  .events.observe(g, k);
              };
              m.config = function (g) {
                var k = this.serviceFactory.getService(w.CONFIG_SERVICE),
                  c = k.validate(g),
                  f = c.missing,
                  e = c.invalid;
                if (0 === f.length && 0 === e.length) k.setConfig(g);
                else {
                  g = this.serviceFactory.getService(w.LOGGING_SERVICE);
                  var d = "RUM agent isn't correctly configured. ";
                  0 < f.length &&
                    ((d += f.join(", ") + " is missing"),
                    0 < e.length && (d += ", "));
                  e.forEach(function (a, b) {
                    d +=
                      a.key +
                      ' "' +
                      a.value +
                      '" contains invalid characters! (allowed: ' +
                      a.allowed +
                      ")" +
                      (b !== e.length - 1 ? ", " : "");
                  });
                  g.error(d);
                  k.setConfig({ active: !1 });
                }
              };
              m.setUserContext = function (g) {
                this.serviceFactory
                  .getService(w.CONFIG_SERVICE)
                  .setUserContext(g);
              };
              m.setCustomContext = function (g) {
                this.serviceFactory
                  .getService(w.CONFIG_SERVICE)
                  .setCustomContext(g);
              };
              m.addLabels = function (g) {
                this.serviceFactory.getService(w.CONFIG_SERVICE).addLabels(g);
              };
              m.setInitialPageLoadName = function (g) {
                this.serviceFactory
                  .getService(w.CONFIG_SERVICE)
                  .setConfig({ pageLoadTransactionName: g });
              };
              m.startTransaction = function (g, k, c) {
                if (this.isEnabled())
                  return this.serviceFactory
                    .getService(w.TRANSACTION_SERVICE)
                    .startTransaction(g, k, c);
              };
              m.startSpan = function (g, k, c) {
                if (this.isEnabled())
                  return this.serviceFactory
                    .getService(w.TRANSACTION_SERVICE)
                    .startSpan(g, k, c);
              };
              m.getCurrentTransaction = function () {
                if (this.isEnabled())
                  return this.serviceFactory
                    .getService(w.TRANSACTION_SERVICE)
                    .getCurrentTransaction();
              };
              m.captureError = function (g) {
                if (this.isEnabled())
                  return this.serviceFactory
                    .getService(w.ERROR_LOGGING)
                    .logError(g);
              };
              m.addFilter = function (g) {
                this.serviceFactory.getService(w.CONFIG_SERVICE).addFilter(g);
              };
              return p;
            })();
        },
        "../../node_modules/error-stack-parser/error-stack-parser.js":
          function (z, t, h) {
            var w, v, r;
            (function (q, n) {
              !((v = [h("../../node_modules/stackframe/stackframe.js")]),
              (w = n),
              (r = "function" === typeof w ? w.apply(t, v) : w),
              void 0 !== r && (z.exports = r));
            })(this, function (q) {
              function n(c, f, e) {
                if ("function" === typeof Array.prototype.map)
                  return c.map(f, e);
                for (var d = Array(c.length), a = 0; a < c.length; a++)
                  d[a] = f.call(e, c[a]);
                return d;
              }
              function p(c, f, e) {
                if ("function" === typeof Array.prototype.filter)
                  return c.filter(f, e);
                for (var d = [], a = 0; a < c.length; a++)
                  f.call(e, c[a]) && d.push(c[a]);
                return d;
              }
              var m = /(^|@)\S+:\d+/,
                g = /^\s*at .*(\S+:\d+|\(native\))/m,
                k = /^(eval@)?(\[native code\])?$/;
              return {
                parse: function (c) {
                  if (
                    "undefined" !== typeof c.stacktrace ||
                    "undefined" !== typeof c["opera#sourceloc"]
                  )
                    return this.parseOpera(c);
                  if (c.stack && c.stack.match(g)) return this.parseV8OrIE(c);
                  if (c.stack) return this.parseFFOrSafari(c);
                  throw Error("Cannot parse given Error object");
                },
                extractLocation: function (c) {
                  if (-1 === c.indexOf(":")) return [c];
                  c = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(
                    c.replace(/[\(\)]/g, "")
                  );
                  return [c[1], c[2] || void 0, c[3] || void 0];
                },
                parseV8OrIE: function (c) {
                  c = p(
                    c.stack.split("\n"),
                    function (f) {
                      return !!f.match(g);
                    },
                    this
                  );
                  return n(
                    c,
                    function (f) {
                      -1 < f.indexOf("(eval ") &&
                        (f = f
                          .replace(/eval code/g, "eval")
                          .replace(/(\(eval at [^\()]*)|(\),.*$)/g, ""));
                      var e = f
                          .replace(/^\s+/, "")
                          .replace(/\(eval code/g, "(")
                          .split(/\s+/)
                          .slice(1),
                        d = this.extractLocation(e.pop());
                      e = e.join(" ") || void 0;
                      a: {
                        var a = ["eval", "\x3canonymous\x3e"];
                        var b = d[0];
                        if ("function" === typeof Array.prototype.indexOf)
                          a = a.indexOf(b);
                        else {
                          for (var l = 0; l < a.length; l++)
                            if (a[l] === b) {
                              a = l;
                              break a;
                            }
                          a = -1;
                        }
                      }
                      return new q(
                        e,
                        void 0,
                        -1 < a ? void 0 : d[0],
                        d[1],
                        d[2],
                        f
                      );
                    },
                    this
                  );
                },
                parseFFOrSafari: function (c) {
                  c = p(
                    c.stack.split("\n"),
                    function (f) {
                      return !f.match(k);
                    },
                    this
                  );
                  return n(
                    c,
                    function (f) {
                      -1 < f.indexOf(" \x3e eval") &&
                        (f = f.replace(
                          / line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,
                          ":$1"
                        ));
                      if (-1 === f.indexOf("@") && -1 === f.indexOf(":"))
                        return new q(f);
                      var e = f.split("@"),
                        d = this.extractLocation(e.pop());
                      e = e.join("@") || void 0;
                      return new q(e, void 0, d[0], d[1], d[2], f);
                    },
                    this
                  );
                },
                parseOpera: function (c) {
                  return !c.stacktrace ||
                    (-1 < c.message.indexOf("\n") &&
                      c.message.split("\n").length >
                        c.stacktrace.split("\n").length)
                    ? this.parseOpera9(c)
                    : c.stack
                    ? this.parseOpera11(c)
                    : this.parseOpera10(c);
                },
                parseOpera9: function (c) {
                  var f = /Line (\d+).*script (?:in )?(\S+)/i;
                  c = c.message.split("\n");
                  for (var e = [], d = 2, a = c.length; d < a; d += 2) {
                    var b = f.exec(c[d]);
                    b &&
                      e.push(new q(void 0, void 0, b[2], b[1], void 0, c[d]));
                  }
                  return e;
                },
                parseOpera10: function (c) {
                  var f =
                    /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
                  c = c.stacktrace.split("\n");
                  for (var e = [], d = 0, a = c.length; d < a; d += 2) {
                    var b = f.exec(c[d]);
                    b &&
                      e.push(
                        new q(b[3] || void 0, void 0, b[2], b[1], void 0, c[d])
                      );
                  }
                  return e;
                },
                parseOpera11: function (c) {
                  c = p(
                    c.stack.split("\n"),
                    function (f) {
                      return !!f.match(m) && !f.match(/^Error created at/);
                    },
                    this
                  );
                  return n(
                    c,
                    function (f) {
                      var e = f.split("@"),
                        d = this.extractLocation(e.pop()),
                        a = e.shift() || "";
                      e =
                        a
                          .replace(/<anonymous function(: (\w+))?>/, "$2")
                          .replace(/\([^\)]*\)/g, "") || void 0;
                      var b;
                      a.match(/\(([^\)]*)\)/) &&
                        (b = a.replace(/^[^\(]+\(([^\)]*)\)$/, "$1"));
                      b =
                        void 0 === b || "[arguments not available]" === b
                          ? void 0
                          : b.split(",");
                      return new q(e, b, d[0], d[1], d[2], f);
                    },
                    this
                  );
                },
              };
            });
          },
        "../../node_modules/opentracing/lib/constants.js": function (z, t) {
          Object.defineProperty(t, "__esModule", { value: !0 });
          t.FORMAT_BINARY = "binary";
          t.FORMAT_TEXT_MAP = "text_map";
          t.FORMAT_HTTP_HEADERS = "http_headers";
          t.REFERENCE_CHILD_OF = "child_of";
          t.REFERENCE_FOLLOWS_FROM = "follows_from";
        },
        "../../node_modules/opentracing/lib/functions.js": function (z, t, h) {
          Object.defineProperty(t, "__esModule", { value: !0 });
          var w = h("../../node_modules/opentracing/lib/constants.js"),
            v = h("../../node_modules/opentracing/lib/reference.js"),
            r = h("../../node_modules/opentracing/lib/span.js");
          t.childOf = function (q) {
            q instanceof r.default && (q = q.context());
            return new v.default(w.REFERENCE_CHILD_OF, q);
          };
          t.followsFrom = function (q) {
            q instanceof r.default && (q = q.context());
            return new v.default(w.REFERENCE_FOLLOWS_FROM, q);
          };
        },
        "../../node_modules/opentracing/lib/noop.js": function (z, t, h) {
          Object.defineProperty(t, "__esModule", { value: !0 });
          var w = h("../../node_modules/opentracing/lib/span.js"),
            v = h("../../node_modules/opentracing/lib/span_context.js"),
            r = h("../../node_modules/opentracing/lib/tracer.js");
          t.tracer = null;
          t.spanContext = null;
          t.span = null;
          t.initialize = function () {
            t.tracer = new r.default();
            t.span = new w.default();
            t.spanContext = new v.default();
          };
        },
        "../../node_modules/opentracing/lib/reference.js": function (z, t, h) {
          Object.defineProperty(t, "__esModule", { value: !0 });
          var w = h("../../node_modules/opentracing/lib/span.js");
          z = (function () {
            function v(r, q) {
              this._type = r;
              this._referencedContext =
                q instanceof w.default ? q.context() : q;
            }
            v.prototype.type = function () {
              return this._type;
            };
            v.prototype.referencedContext = function () {
              return this._referencedContext;
            };
            return v;
          })();
          t.default = z;
        },
        "../../node_modules/opentracing/lib/span.js": function (z, t, h) {
          Object.defineProperty(t, "__esModule", { value: !0 });
          var w = h("../../node_modules/opentracing/lib/noop.js");
          z = (function () {
            function v() {}
            v.prototype.context = function () {
              return this._context();
            };
            v.prototype.tracer = function () {
              return this._tracer();
            };
            v.prototype.setOperationName = function (r) {
              this._setOperationName(r);
              return this;
            };
            v.prototype.setBaggageItem = function (r, q) {
              this._setBaggageItem(r, q);
              return this;
            };
            v.prototype.getBaggageItem = function (r) {
              return this._getBaggageItem(r);
            };
            v.prototype.setTag = function (r, q) {
              this._addTags(((n = {}), (n[r] = q), n));
              return this;
              var n;
            };
            v.prototype.addTags = function (r) {
              this._addTags(r);
              return this;
            };
            v.prototype.log = function (r, q) {
              this._log(r, q);
              return this;
            };
            v.prototype.logEvent = function (r, q) {
              return this._log({ event: r, payload: q });
            };
            v.prototype.finish = function (r) {
              this._finish(r);
            };
            v.prototype._context = function () {
              return w.spanContext;
            };
            v.prototype._tracer = function () {
              return w.tracer;
            };
            v.prototype._setOperationName = function (r) {};
            v.prototype._setBaggageItem = function (r, q) {};
            v.prototype._getBaggageItem = function (r) {};
            v.prototype._addTags = function (r) {};
            v.prototype._log = function (r, q) {};
            v.prototype._finish = function (r) {};
            return v;
          })();
          t.Span = z;
          t.default = z;
        },
        "../../node_modules/opentracing/lib/span_context.js": function (z, t) {
          Object.defineProperty(t, "__esModule", { value: !0 });
          z = (function () {
            return function () {};
          })();
          t.SpanContext = z;
          t.default = z;
        },
        "../../node_modules/opentracing/lib/tracer.js": function (z, t, h) {
          Object.defineProperty(t, "__esModule", { value: !0 });
          var w = h("../../node_modules/opentracing/lib/functions.js"),
            v = h("../../node_modules/opentracing/lib/noop.js"),
            r = h("../../node_modules/opentracing/lib/span.js");
          z = (function () {
            function q() {}
            q.prototype.startSpan = function (n, p) {
              void 0 === p && (p = {});
              if (p.childOf) {
                var m = w.childOf(p.childOf);
                p.references ? p.references.push(m) : (p.references = [m]);
                delete p.childOf;
              }
              return this._startSpan(n, p);
            };
            q.prototype.inject = function (n, p, m) {
              n instanceof r.default && (n = n.context());
              return this._inject(n, p, m);
            };
            q.prototype.extract = function (n, p) {
              return this._extract(n, p);
            };
            q.prototype._startSpan = function (n, p) {
              return v.span;
            };
            q.prototype._inject = function (n, p, m) {};
            q.prototype._extract = function (n, p) {
              return v.spanContext;
            };
            return q;
          })();
          t.Tracer = z;
          t.default = z;
        },
        "../../node_modules/promise-polyfill/src/finally.js": function (
          z,
          t,
          h
        ) {
          h.r(t);
          t["default"] = function (w) {
            var v = this.constructor;
            return this.then(
              function (r) {
                return v.resolve(w()).then(function () {
                  return r;
                });
              },
              function (r) {
                return v.resolve(w()).then(function () {
                  return v.reject(r);
                });
              }
            );
          };
        },
        "../../node_modules/promise-polyfill/src/index.js": function (z, t, h) {
          function w() {}
          function v(f, e) {
            return function () {
              f.apply(e, arguments);
            };
          }
          function r(f) {
            if (!(this instanceof r))
              throw new TypeError("Promises must be constructed via new");
            if ("function" !== typeof f) throw new TypeError("not a function");
            this._state = 0;
            this._handled = !1;
            this._value = void 0;
            this._deferreds = [];
            k(f, this);
          }
          function q(f, e) {
            for (; 3 === f._state; ) f = f._value;
            0 === f._state
              ? f._deferreds.push(e)
              : ((f._handled = !0),
                r._immediateFn(function () {
                  var d = 1 === f._state ? e.onFulfilled : e.onRejected;
                  if (null === d) (1 === f._state ? n : p)(e.promise, f._value);
                  else {
                    try {
                      var a = d(f._value);
                    } catch (b) {
                      p(e.promise, b);
                      return;
                    }
                    n(e.promise, a);
                  }
                }));
          }
          function n(f, e) {
            try {
              if (e === f)
                throw new TypeError(
                  "A promise cannot be resolved with itself."
                );
              if (e && ("object" === typeof e || "function" === typeof e)) {
                var d = e.then;
                if (e instanceof r) {
                  f._state = 3;
                  f._value = e;
                  m(f);
                  return;
                }
                if ("function" === typeof d) {
                  k(v(d, e), f);
                  return;
                }
              }
              f._state = 1;
              f._value = e;
              m(f);
            } catch (a) {
              p(f, a);
            }
          }
          function p(f, e) {
            f._state = 2;
            f._value = e;
            m(f);
          }
          function m(f) {
            2 === f._state &&
              0 === f._deferreds.length &&
              r._immediateFn(function () {
                f._handled || r._unhandledRejectionFn(f._value);
              });
            for (var e = 0, d = f._deferreds.length; e < d; e++)
              q(f, f._deferreds[e]);
            f._deferreds = null;
          }
          function g(f, e, d) {
            this.onFulfilled = "function" === typeof f ? f : null;
            this.onRejected = "function" === typeof e ? e : null;
            this.promise = d;
          }
          function k(f, e) {
            var d = !1;
            try {
              f(
                function (a) {
                  d || ((d = !0), n(e, a));
                },
                function (a) {
                  d || ((d = !0), p(e, a));
                }
              );
            } catch (a) {
              d || ((d = !0), p(e, a));
            }
          }
          h.r(t);
          z = h("../../node_modules/promise-polyfill/src/finally.js");
          var c = setTimeout;
          r.prototype["catch"] = function (f) {
            return this.then(null, f);
          };
          r.prototype.then = function (f, e) {
            var d = new this.constructor(w);
            q(this, new g(f, e, d));
            return d;
          };
          r.prototype["finally"] = z.default;
          r.all = function (f) {
            return new r(function (e, d) {
              function a(x, y) {
                try {
                  if (y && ("object" === typeof y || "function" === typeof y)) {
                    var B = y.then;
                    if ("function" === typeof B) {
                      B.call(
                        y,
                        function (C) {
                          a(x, C);
                        },
                        d
                      );
                      return;
                    }
                  }
                  b[x] = y;
                  0 === --l && e(b);
                } catch (C) {
                  d(C);
                }
              }
              if (!f || "undefined" === typeof f.length)
                return d(new TypeError("Promise.all accepts an array"));
              var b = Array.prototype.slice.call(f);
              if (0 === b.length) return e([]);
              for (var l = b.length, u = 0; u < b.length; u++) a(u, b[u]);
            });
          };
          r.resolve = function (f) {
            return f && "object" === typeof f && f.constructor === r
              ? f
              : new r(function (e) {
                  e(f);
                });
          };
          r.reject = function (f) {
            return new r(function (e, d) {
              d(f);
            });
          };
          r.race = function (f) {
            return new r(function (e, d) {
              if (!f || "undefined" === typeof f.length)
                return d(new TypeError("Promise.race accepts an array"));
              for (var a = 0, b = f.length; a < b; a++)
                r.resolve(f[a]).then(e, d);
            });
          };
          r._immediateFn =
            ("function" === typeof setImmediate &&
              function (f) {
                setImmediate(f);
              }) ||
            function (f) {
              c(f, 0);
            };
          r._unhandledRejectionFn = function (f) {
            "undefined" !== typeof console &&
              console &&
              console.warn("Possible Unhandled Promise Rejection:", f);
          };
          t["default"] = r;
        },
        "../../node_modules/stackframe/stackframe.js": function (z, t) {
          var h, w, v;
          (function (r, q) {
            !((w = []),
            (h = q),
            (v = "function" === typeof h ? h.apply(t, w) : h),
            void 0 !== v && (z.exports = v));
          })(this, function () {
            function r(n) {
              return !isNaN(parseFloat(n)) && isFinite(n);
            }
            function q(n, p, m, g, k, c) {
              void 0 !== n && this.setFunctionName(n);
              void 0 !== p && this.setArgs(p);
              void 0 !== m && this.setFileName(m);
              void 0 !== g && this.setLineNumber(g);
              void 0 !== k && this.setColumnNumber(k);
              void 0 !== c && this.setSource(c);
            }
            q.prototype = {
              getFunctionName: function () {
                return this.functionName;
              },
              setFunctionName: function (n) {
                this.functionName = String(n);
              },
              getArgs: function () {
                return this.args;
              },
              setArgs: function (n) {
                if ("[object Array]" !== Object.prototype.toString.call(n))
                  throw new TypeError("Args must be an Array");
                this.args = n;
              },
              getFileName: function () {
                return this.fileName;
              },
              setFileName: function (n) {
                this.fileName = String(n);
              },
              getLineNumber: function () {
                return this.lineNumber;
              },
              setLineNumber: function (n) {
                if (!r(n)) throw new TypeError("Line Number must be a Number");
                this.lineNumber = Number(n);
              },
              getColumnNumber: function () {
                return this.columnNumber;
              },
              setColumnNumber: function (n) {
                if (!r(n))
                  throw new TypeError("Column Number must be a Number");
                this.columnNumber = Number(n);
              },
              getSource: function () {
                return this.source;
              },
              setSource: function (n) {
                this.source = String(n);
              },
              toString: function () {
                var n = this.getFunctionName() || "{anonymous}",
                  p = "(" + (this.getArgs() || []).join(",") + ")",
                  m = this.getFileName() ? "@" + this.getFileName() : "",
                  g = r(this.getLineNumber()) ? ":" + this.getLineNumber() : "",
                  k = r(this.getColumnNumber())
                    ? ":" + this.getColumnNumber()
                    : "";
                return n + p + m + g + k;
              },
            };
            return q;
          });
        },
      },
      oa = {};
    !(function () {
      J.n = function (z) {
        var t =
          z && z.__esModule
            ? function () {
                return z["default"];
              }
            : function () {
                return z;
              };
        J.d(t, { a: t });
        return t;
      };
    })();
    !(function () {
      J.d = function (z, t) {
        for (var h in t)
          J.o(t, h) &&
            !J.o(z, h) &&
            Object.defineProperty(z, h, { enumerable: !0, get: t[h] });
      };
    })();
    !(function () {
      J.o = function (z, t) {
        return Object.prototype.hasOwnProperty.call(z, t);
      };
    })();
    !(function () {
      J.r = function (z) {
        "undefined" !== typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(z, Symbol.toStringTag, { value: "Module" });
        Object.defineProperty(z, "__esModule", { value: !0 });
      };
    })();
    var ba = {};
    !(function () {
      J.r(ba);
      J.d(ba, {
        init: function () {
          return r;
        },
        apmBase: function () {
          return v;
        },
        ApmBase: function () {
          return w.default;
        },
        apm: function () {
          return v;
        },
      });
      var z = J("../rum-core/dist/es/common/utils.js"),
        t = J("../rum-core/dist/es/bootstrap.js"),
        h = J("../rum-core/dist/es/index.js"),
        w = J("./src/apm-base.js"),
        v = (function () {
          if (z.isBrowser && window.elasticApm) return window.elasticApm;
          var q = (0, t.bootstrap)(),
            n = (0, h.createServiceFactory)();
          q = new w.default(n, !q);
          z.isBrowser && (window.elasticApm = q);
          return q;
        })(),
        r = v.init.bind(v);
      ba["default"] = r;
    })();
    return ba;
  })();
});
