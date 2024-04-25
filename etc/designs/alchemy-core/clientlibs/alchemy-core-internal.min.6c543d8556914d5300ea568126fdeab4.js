define(function () {
  if (!window.dust) {
    return;
  }
  window.dust.helpers = dust.helpers || {};
  window.dust.helpers.i18n = function (f, b, a, c) {
    var h = dust.helpers.tap(c.key, f, b),
      g = dust.helpers.tap(c.locale, f, b),
      e = dust.helpers.tap(c.placeholders, f, b) || "",
      d = CQ.I18n.getLocale(),
      i;
    if (g && g !== d) {
      CQ.I18n.setLocale(g);
      i = true;
    }
    var j = CQ.I18n.getMessage(h, e.split(","));
    if (i) {
      CQ.I18n.setLocale(d);
    }
    return f.write(j);
  };
  window.dust.helpers.tap = function (b, c, d) {
    if (typeof b !== "function") {
      return b;
    }
    var a = "",
      e = c
        .tap(function (f) {
          a += f;
          return "";
        })
        .render(b, d);
    c.untap();
    if (e.constructor !== c.constructor) {
      return e;
    }
    if (!a.length) {
      return;
    }
    return a;
  };
});
define("jquery-plugins", ["media", "constants"], function (a, k) {
  var b = $("html");
  function e(l) {
    if (typeof l !== "undefined" && l !== null) {
      if (typeof l.then === "function") {
        return String(l.then) === String($.Deferred().then);
      }
    }
    return false;
  }
  var h = (function () {
    var m = new FontFaceObserver("Source Sans Pro"),
      n = [],
      l;
    function o() {
      l = true;
      n.forEach(function (p) {
        p();
      });
      $("body").addClass("fonts-loaded");
    }
    m.load(null, 20000).then(o, function () {
      console.error(
        "It takes too long to load the font. Some functionality can be dropped due to the timeout."
      );
    });
    return function (p) {
      if (l) {
        p();
      } else {
        n.push(p);
      }
    };
  })();
  function j(m) {
    if (!(m && m.length)) {
      return false;
    }
    var l = m.map(function (n) {
      return $(n).offset().top;
    });
    return l.reduce(function (o, n) {
      return o === n;
    });
  }
  function d(o) {
    var l = o || {},
      m = l.duration || 100;
    if (!this.length) {
      return;
    }
    var n = l.reservedSpace
      ? this.offset().top - l.reservedSpace
      : this.offset().top;
    $("html, body").animate({ scrollTop: n }, m);
  }
  function f() {
    var p = $(window),
      o = p.scrollTop(),
      m = o + p.height(),
      l = this.offset().top,
      n = l + this.outerHeight();
    return l <= m && n >= o;
  }
  function i(n, l) {
    var F = 65;
    var s = this.data("is-always-pinned-on-responsive");
    var m = $(".recruiting-search__form");
    var M = this,
      B = $(window),
      H = $("body"),
      w = this.find(".pinned-filter"),
      D = w.data("extra-height"),
      p = this.find(".pinned-filter__button"),
      J = this.find(".pinned-filter__container"),
      C = this.find(".pinned-filter__spacer");
    var q = "pinned-filter--fixed",
      v = "pinned-filter--bottom",
      r = k.Classes.pinnedFilter,
      u = "filter--slide-open";
    var o = { top: true, bottom: false };
    B.scroll(E);
    p.on("click", t);
    !a.currentMode().lessThan(a.modes.Desktop) && p.attr("tabindex", -1);
    function z() {
      return a.currentMode().lessThan(a.modes.Desktop);
    }
    function y() {
      return (z() && m.outerHeight(true)) || 0;
    }
    function G() {
      if (s && z()) {
        return false;
      }
      return (
        b.hasClass(k.Classes.noscroll) || !w.length || (!n && !M.isOnScreen())
      );
    }
    function E() {
      if (G()) {
        I();
        return;
      }
      var O = w.outerHeight(true),
        P = {
          pinBottom: function () {
            A(o.bottom);
            C.height(O);
          },
          pinTop: function () {
            O = (l && l.getSpacerHeight()) || O;
            C.height(O);
            A(o.top);
            i.currentlyPinned = M;
          },
          unpin: function () {
            H.removeClass(r);
            I();
          },
        };
      var N = L(O);
      N && P[N]();
    }
    function I() {
      w.removeClass(q + " " + v);
      w.removeAttr("style");
      C.height(0);
    }
    function A(N) {
      w.toggleClass(q, N).toggleClass(v, !N);
      H.toggleClass(r, N);
      if (D) {
        w.css("transform", "translateY(" + D + "px)");
      }
    }
    function K() {
      return M.offset().top - ((l && l.value) || 0);
    }
    function L(Q) {
      var P = B.scrollTop();
      var O = (l && l.getPanelTopOffset && l.getPanelTopOffset()) || K();
      var N = M.outerHeight(true);
      if (O === -1) {
        return;
      }
      if (s && z()) {
        return "pinTop";
      }
      if (!n && P > O + N - Q) {
        return "pinBottom";
      }
      if (P + 1 > O - F + y()) {
        return "pinTop";
      }
      if (i.currentlyPinned === M) {
        return "unpin";
      }
    }
    function t() {
      if (a.currentMode().lessThan(a.modes.Desktop)) {
        var N = p.attr("aria-expanded");
        p.attr("aria-expanded", N === "false");
        M.toggleClass(u);
        J.slideToggle(u, x);
      }
    }
    function x() {
      if (H.hasClass(r)) {
        var N = w.outerHeight(true);
        C.height(N);
      }
    }
  }
  function c(l, m) {
    return this.filter(function () {
      return $(this).attr(l) === m;
    });
  }
  function g(l) {
    return this.filter(function () {
      if (typeof l === "number") {
        return +$(this).val() === l;
      }
      return $(this).val() === l;
    });
  }
  $.extend({ isPromise: e, isOffsetEqual: j, onFontLoad: h });
  $.fn.extend({
    findByAttr: c,
    findByValue: g,
    scrollToSelector: d,
    pinFilterTop: i,
    isOnScreen: f,
  });
});
define("analytics", [], function () {
  function b(e) {
    window.dataLayer && e && dataLayer.push(e);
  }
  function a(e) {
    var g = e.data("gtmCategory");
    var h = e.data("gtmAction");
    if (!g || !h) {
      return;
    }
    var i = e.data("gtmCustomDimensions"),
      f = {
        event: "googleAnalyticsEvent",
        eventCategory: g,
        eventAction: h,
        eventLabel: e.data("gtmLabel"),
      };
    return $.extend(f, i);
  }
  function c(e) {
    var f = a(e);
    return function () {
      return b(f);
    };
  }
  function d() {
    $(
      ".button-ui, .cta-button-ui, .timeline-slider__switcher-button, .referral-block__button"
    ).each(function () {
      var e = $(this);
      e.on("click", c(e));
    });
  }
  return { push: b, getEvent: a, initGoogleTagManager: d };
});
define("constants", ["media"], function (a) {
  var d = {
    ALPHABETIC_SHORT_MONTH_SHORT_DAY: "MMM D",
    ALPHABETIC_SHORT_MONTH_FIRST_WITHOUT_YEAR: "MMM DD",
    ALPHABETIC_LONG_DAY_FIRST_WITHOUT_YEAR: "DD MMMM",
  };
  var f = {
    items: 1,
    margin: 20,
    nav: true,
    responsiveRefreshRate: 0,
    responsive: {},
  };
  f.responsive[a.modes.Broad.start] = { items: 4 };
  f.responsive[a.modes.Desktop.start] = { items: 3 };
  f.responsive[a.modes.Tablet.start] = { items: 2 };
  var g = {
    menuOpen: "menu.open",
    menuClose: "menu.close",
    overlayShow: "overlay.show",
    overlayHide: "overlay.hide",
    transitionStart:
      "webkitTransitionStart otransitionstart oTransitionStart msTransitionStart transitionstart",
    transitionEnd:
      "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
    showVacancyForm: "vacancyForm.show",
    searchOpen: "continuum.search.open",
    initConsent: "experience.checkbox.added",
    autocompleteSelected: "autocomplete.select.selected",
    featureGridAddedNewItems: "feature.grid.added.new.items",
    locationSelectCityUpdate: "location.select.city.update",
    locationSelectRegionUpdate: "location.select.region.update",
    locationSelectZipCodeUpdate: "location.select.zipCode.update",
    multiSelectUpdate: "multiselect.filter.items.update",
    multiSelectFirstUpdate: "first.multiselect.filter.items.update",
    multiSelectShouldUpdate: "should.multiselect.filter.items.update",
    multiSelectBeforeUpdate: "should.multiselect.filter.before.update",
    multiSelectErrorUpdate: "error.multiselect.filter.update",
    gatedFormExpanded: "gated.form.expanded",
    gatedFormCollapse: "collapse.gated.form",
    themeSwitch: "theme.switched",
    tabChange: "tab.change",
    tabChanged: "tab.changed",
  };
  var i = {
    hidden: "hidden",
    noscroll: "noscroll",
    overlay: "overlay",
    overlayCoverHeader: "overlay__cover-header",
    preloader: "preloader",
    pinnedFilter: "has-pinned",
  };
  var b = {
    arrowUp: "ArrowUp",
    arrowDown: "ArrowDown",
    arrowLeft: "ArrowLeft",
    arrowRight: "ArrowRight",
    home: "Home",
    end: "End",
    tab: "Tab",
    esc: "Escape",
    enter: "Enter",
    space: " ",
  };
  var c = {
    utmParameters: "utmParameters",
    skillsUpdate: "should-skills-update",
    themeSwitcher: "theme-mode",
  };
  var e = { filter: "filter", careers_blog: "careers-blog" };
  var h = {
    dark: "dark-mode",
    light: "light-mode",
    ec: "dark-mode ec-mode",
    animation: "theme-animation",
    animationDuration: 500,
    labelText: { "dark-mode": "Dark Mode", "light-mode": "Light Mode" },
  };
  return {
    DateFormats: d,
    CarouselDefaultConfig: f,
    Events: g,
    Classes: i,
    Keys: b,
    StorageKey: c,
    FilterTypes: e,
    Themes: h,
  };
});
define("form", [
  "utils-browser",
  "linkedinModule",
  "utils-env",
  "utils",
  "analytics",
  "media",
  "constants",
  "ReCaptcha",
  "SolutionsHubReferrer",
  "jquery-plugins",
], function (D, s, A, B, i, h, H, l, p) {
  var c = {
    CLEAN_UP: "FORM_FIELD_CLEANUP",
    VALIDATION: "FIELD_VALIDATION_RESULT",
    DISPLAY_VALUE: "DISPLAY_VALUE",
    FORM_INITIALIZED: "FORM_INITIALIZED",
    AJAX_START: "AJAX_START",
    ACTIVATE_FORM: "ACTIVATE_FORM",
    FORM_START: "Form start",
    SUBMIT_WITH_LINKEDIN_AUTOFILL: "Submit with LinkedIn AutoFill",
  };
  var C = { buttonErrorValidation: "button-error-validation" };
  var u = "This field is required",
    j = "Field is not valid",
    m = "validator";
  var t = [
    "applicantFirstName",
    "applicantLastName",
    "applicantEmail",
    "applicantCountry",
    "resume",
    "applicantMessage",
    "gdprConsent",
    "subscriptions",
    "captcha",
    "firstName",
    "lastName",
    "email",
    "company",
    "comments",
  ];
  function x() {
    if (h.currentMode().lessThan(h.modes.Tablet)) {
      return "mobile";
    }
    if (h.currentMode().lessThan(h.modes.Desktop)) {
      return "tablet";
    }
    return "desktop";
  }
  function E(I) {
    if (!I || !I.form) {
      return;
    }
    var J = I.form.data(m);
    if (J) {
      return z(J, I);
    }
    I.form.on(c.FORM_INITIALIZED, function (K, L) {
      z(L.formValidator, I);
    });
  }
  function z(M, J) {
    if ($.isFunction(J.cleanField)) {
      J.form.on(c.CLEAN_UP, function (O, N) {
        if (!N || !N.mandatoryOnly || J.mandatoryCleanUp) {
          J.cleanField();
        }
      });
    }
    if (J.field) {
      var L = $.isFunction(J.validator),
        K = J.form.find('[name="' + J.field + '"]'),
        I;
      if ($.isFunction(J.displayValue)) {
        J.form.on(c.DISPLAY_VALUE + ":" + J.field, J.displayValue);
      }
      if (L) {
        M.validators[J.field] = J.validator;
      }
      if (J.validationEvent && L) {
        I = b(J.form, J.field, J.validator);
        K.on(J.validationEvent, I);
      }
      if ($.isFunction(J.displayError)) {
        J.form.on(c.VALIDATION + ":" + J.field, function (N, O) {
          O.checkFields && J.form.trigger(c.VALIDATION);
          if ($.isFunction(J.cleanError)) {
            J.cleanError();
            O.self &&
              O.self.continuumStyle &&
              O.self.submitButton.removeClass(C.buttonErrorValidation);
          }
          if (O && O.errors && O.errors.length) {
            J.displayError(O.errors[0]);
            O.self &&
              O.self.continuumStyle &&
              O.self.submitButton.addClass(C.buttonErrorValidation);
          }
        });
      }
      return I;
    }
  }
  function o(J, I) {
    return function () {
      return r(J, I.isRequired, I.requiredMsg);
    };
  }
  function w(J, I) {
    return function () {
      var K = r(J, I.isRequired, I.requiredMsg);
      if (!K.length && q(J, I.constraintRegex)) {
        K.push(I.constraintMsg);
      }
      return K;
    };
  }
  function G(I) {
    if (!I.is(":checkbox") || I.is(":visible")) {
      return true;
    }
  }
  function r(L, M, J) {
    var I = [];
    if (M && (cq5forms_isEmpty(n(L)) || (L.is("select") && !L.val())) && G(L)) {
      var K =
        L.attr("name") === "applicantYearsOfExperience" ||
        L.attr("name") === "applicantNoticePeriod";
      J = K
        ? CQ.I18n.getMessage("component.dropdown.experience.required-message")
        : J;
      I.push(J);
    }
    return I;
  }
  function n(I) {
    return I.length > 1 ? I.toArray() : I.get(0);
  }
  function q(I, J) {
    return (
      !cq5forms_isEmpty(I.get(0)) &&
      !new RegExp(J.substring(1, J.length - 1)).test(I.val())
    );
  }
  function b(J, K, I) {
    return function (M, N) {
      if (N && N.withoutValidation) {
        return;
      }
      var L = I();
      if ($.isArray(L)) {
        f(J, K, L);
      } else {
        if ($.isPromise(L)) {
          $.when(L).then(function (O) {
            f(J, K, O);
          });
        }
      }
      return L;
    };
  }
  function f(J, K, I) {
    J.trigger(c.VALIDATION + ":" + K, { errors: I, checkFields: true });
  }
  function e(I) {
    return {
      isRequired: I.data("required"),
      requiredMsg: I.data("required-msg") || u,
      constraintRegex: I.data("regex"),
      constraintMsg: I.data("constraint-msg") || j,
    };
  }
  function d() {
    var J = require("Checkbox");
    var I = this.form.find(".checkbox-ui");
    $.each(I, function (K, L) {
      new J($(L));
    });
  }
  function y(J) {
    var I = this;
    I.form = J;
    I.validators = {};
    I.validate = function (M, P, N) {
      var O = [],
        L = [];
      $.each(this.validators, function (S, R) {
        var Q = R();
        L.push(S);
        O.push(K(Q));
      });
      if (!O.length) {
        M([]);
        return;
      }
      $.when.apply($, O).then(function () {
        if (!N) {
          $.each(arguments, function (Q, R) {
            I.form.trigger(c.VALIDATION + ":" + L[Q], { errors: R });
          });
        }
        M(arguments);
      }, P);
    };
    function K(L) {
      if ($.isArray(L)) {
        var M = $.Deferred();
        M.resolve(L);
        return M.promise();
      }
      if ($.isPromise(L)) {
        return L;
      }
      throw "Validation function should return either promise or array";
    }
  }
  var g = [
      ":formid",
      ":formstart",
      "_charset_",
      ":userDeviceType",
      ":isTouchDevice",
      "userAgent",
      ":cq_csrf_token",
      ":testingMode",
      "formType",
    ],
    k = "has-error",
    v = "show-success",
    a = "show-error";
  function F(S, Q) {
    var W = this;
    W.continuumStyle = Q;
    function V() {
      var Z = S.find(".recaptcha-ui");
      W.element = S;
      W.form = W.element.find("form");
      W.actionUrl = W.form.attr("action");
      W.errorMessageContainer = S.find(".form-component__error");
      W.errorMessage = W.errorMessageContainer.find(
        ".form-component__error-message"
      );
      if (
        $(document.body).hasClass("dark-mode") ||
        $(document.body).hasClass("light-mode") ||
        $(document.body).hasClass("ec-mode")
      ) {
        W.errorSubmitAgain = S.find(
          ".form-component__error .submit-again-redesign"
        );
        W.successSubmitAgain = S.find(
          ".form-component__success .submit-again-redesign"
        );
      } else {
        W.errorSubmitAgain = S.find(".form-component__error .submit-again");
        W.successSubmitAgain = S.find(".form-component__success .submit-again");
      }
      W.successMessageContainer = S.find(".form-component__success");
      W.submitButton = S.find("div.button-submit button");
      W.fieldNames = [];
      W.formValidator = new y(W.form);
      W.gtmEventData = i.getEvent(W.element);
      W.isAuthor = A.isAuthor();
      W.form.data(m, W.formValidator);
      W.form.trigger(c.FORM_INITIALIZED, { formValidator: W.formValidator });
      var Y = W.form.find(".captcha-ui");
      W.hasRecaptcha =
        (Z.length && !Y.length) ||
        (Z.length && !!Y.length && Y.data("recaptcha-enabled"));
      if (W.hasRecaptcha) {
        var X = S.find(".recaptcha-ui");
        X.data("recaptcha-enabled", "true");
        W.recaptcha = new l(X, W);
      }
      W.element.on(H.Events.gatedFormExpanded, function () {
        U("open");
      });
      W.element.on(H.Events.gatedFormCollapse, function () {
        U("close");
      });
    }
    var P = !!document.querySelector("script[data-mode='BUTTON_DATA']");
    var K = !!S.find(".linkedin-autofill")[0];
    var J = S.find('[name="widget-holder"]');
    var I = J.attr("data-gtm-action-linkedin");
    var L = false;
    function M(X) {
      X.one("input select2:select", function () {
        O();
      });
    }
    function N(X) {
      var Y = i.getEvent(W.element);
      Y = Y && $.extend({}, Y, { eventAction: X });
      if (Y) {
        i.push(Y);
      }
    }
    function O() {
      if (!L) {
        L = true;
        N(c.FORM_START);
      }
    }
    function U(Y) {
      if (Y === "close") {
        W.element.addClass("hide-autofill-button");
        return;
      }
      if (Y === "open") {
        W.element.removeClass("hide-autofill-button");
        return;
      }
      var X = parseFloat(W.form.css("max-height"));
      if (X === 0) {
        W.element.addClass("hide-autofill-button");
      } else {
        W.element.removeClass("hide-autofill-button");
      }
    }
    this.scrollToMessage = function () {
      W.element.scrollToSelector({ reservedSpace: 100 });
    };
    this.scrollToError = function () {
      var X = W.element.find(".validation-field").first();
      W.beforeScrollToError && W.beforeScrollToError(X);
      X.find(".validation-focus-target").last().focus();
      X.length && X.first().scrollToSelector({ reservedSpace: 100 });
    };
    this.initialize = function () {
      V();
      if (P) {
        s.addForm(W.element);
        s.addCallbackForStartForm(O);
      }
      M(W.form);
      W.hasRecaptcha && W.recaptcha.render();
      $(window).on("pageshow", function () {
        W.activateForm({ firstRun: true });
      });
      W.form.on("submit", function (Y, X) {
        Y.preventDefault();
        p.setReferrerHiddenField(W.form[0]);
        !W.hasRecaptcha && W.disableForm();
        if (!X || !X.validated) {
          W.form.data(m).validate(R, W.activateForm, false);
          return false;
        }
        W.hasRecaptcha && W.recaptcha.execute();
        if (!W.hasRecaptcha) {
          return W.submitForm();
        }
      });
      W.continuumStyle &&
        W.form.on(c.VALIDATION, function () {
          W.form.data(m).validate(
            function (Z) {
              var Y = [].slice.call(Z, 0),
                X = Y.some(function (aa) {
                  return aa.length;
                });
              if (!X) {
                W.continuumStyle &&
                  W.submitButton.removeClass(C.buttonErrorValidation);
              }
            },
            function () {},
            true
          );
        });
      W.successSubmitAgain.on("click", function () {
        W.activateForm();
        W.element.removeClass(v);
        W.firstElement.focus();
        if (P) {
          if (s.getLinkedInConfigByType("CONVERSION")) {
            s.changeLinkedinMode("CONVERSION", "BUTTON_DATA");
          }
          s.triggerLinkedInScript();
          s.resetApplyWithLinkedin();
        }
        L = false;
        return false;
      });
      W.errorSubmitAgain.on("click", function (X) {
        X.preventDefault();
        if (P) {
          s.showLinkedinWidget();
          s.showLinkedinWidgetV3();
          s.resetApplyWithLinkedin();
        }
        W.activateForm({ type: "pageshow" });
        W.element.removeClass(a);
        W.firstElement.focus();
        L = false;
      });
      W.form.on("trigger.form.validation", function () {
        W.form.data(m).validate(R, W.activateForm, false);
      });
      W.form.find('[name=":userDeviceType"]').attr("value", x());
      W.form.find('[name=":isTouchDevice"]').attr("value", B.hasTouchEvents());
      W.form
        .find('[name="userAgent"]')
        .attr("value", navigator.userAgent || "browser");
      W.form.find('[name="userReferrer"]').attr("value", document.referrer);
      W.form.on("form.scrollToError", W.scrollToError);
      W.form.on(H.Events.initConsent, d.bind(this));
      W.element.on("form.showMessage", W.scrollToMessage);
    };
    function R(Z) {
      var Y = [].slice.call(Z, 0),
        X = Y.some(function (aa) {
          return aa.length;
        });
      if (!X) {
        W.continuumStyle && W.submitButton.removeClass(C.buttonErrorValidation);
        W.form.trigger("submit", { validated: true });
        return;
      }
      W.element.addClass(k);
      W.continuumStyle && W.submitButton.addClass(C.buttonErrorValidation);
      W.form.trigger("form.scrollToError");
      W.activateForm();
    }
    this.activateForm = function (Y) {
      var X = Y && Y.firstRun ? null : "open";
      U(X);
      T(true, Y && Y.type);
    };
    this.disableForm = function () {
      T(false);
    };
    function T(Y, X) {
      W.submitButton.prop("disabled", !Y);
      W.form.toggleClass("freeze", !Y);
      if (Y) {
        W.firstElement = W.form
          .find('a, button, input:visible, div[tabindex="0"]')
          .first();
        W.hasRecaptcha && W.recaptcha.reset();
        W.form.trigger(c.ACTIVATE_FORM, [X]);
      }
    }
    this.extractAdditionalData = function () {
      W.fieldNames = [];
      W.form.find("[name]:not([name=''])").each(function () {
        if (W.fieldNames.indexOf(this.name) < 0 && g.indexOf(this.name) < 0) {
          W.fieldNames.push(this.name);
        }
      });
      return { fieldNames: W.fieldNames.join(",") };
    };
    this.onSuccessfulSubmit = function (X) {};
    this.displaySuccessMessage = function () {
      W.element.addClass(v);
      W.element.trigger("form.showMessage");
    };
    this.cleanForm = function () {
      W.form.trigger(c.CLEAN_UP);
    };
    this.processServerResponse = function (X) {
      if (X.isSuccessful) {
        i.push(W.gtmEventData);
        O();
        if (P) {
          N(I);
        }
        if (K) {
          N(c.SUBMIT_WITH_LINKEDIN_AUTOFILL);
        }
        W.displaySuccessMessage();
        W.onSuccessfulSubmit(X);
        W.cleanForm();
        return;
      }
      W.activateForm();
      $.each(W.fieldNames, function (Y, Z) {
        W.form.trigger(c.VALIDATION + ":" + Z, {
          errors: X.messages[Z],
          self: W,
        });
      });
    };
    this.processAuthorErrorResponse = function (Z) {
      var X = Z.responseJSON;
      var Y;
      var aa = X && X.messages;
      if (aa && aa.missingRequiredFields && aa.missingRequiredFields.length) {
        Y = CQ.I18n.getMessage(
          "component.form-constructor.required-field-missing.message",
          [X.messages.missingRequiredFields.join(", ")]
        );
      } else {
        if (aa && aa.errorMessages && aa.errorMessages.length) {
          Y = X.messages.errorMessages.join("\n");
        } else {
          Y = W.errorMessage.data("default-message");
        }
      }
      W.errorMessage.text(Y);
    };
    this.submitForm = function () {
      W.form.trigger(c.AJAX_START);
      var X = W.extractAdditionalData();
      W.form.ajaxSubmit({
        url: W.actionUrl,
        type: "POST",
        data: X,
        iframe: D.isInternetExplorer(),
        clearForm: false,
        dataType: "json",
        beforeSend: function () {
          U("close");
        },
        success: function (Y) {
          W.processServerResponse(Y);
          W.successMessageContainer.one(H.Events.transitionEnd, function () {
            W.successSubmitAgain.focus();
          });
          if (Y.isSuccessful) {
            if (P) {
              s.hideLinkedinWidget();
              s.hideLinkedinWidgetV3();
            }
          }
          if (P && !s.isTwoStepsForm()) {
            if (!s.isSecondStep()) {
              s.initLinkedin("BUTTON_DATA", "CONVERSION");
            } else {
              s.initLinkedin("CONVERSION", "CONVERSION");
            }
            s.resetApplyWithLinkedin();
            L = false;
          }
        },
        error: function (Y) {
          if (P) {
            s.hideLinkedinWidget();
            s.hideLinkedinWidgetV3();
          }
          W.isAuthor && W.processAuthorErrorResponse(Y);
          W.element.addClass(a);
          W.element.trigger("form.showMessage");
          W.cleanForm();
          W.errorMessageContainer.one(H.Events.transitionEnd, function () {
            W.errorSubmitAgain.focus();
          });
          if (P) {
            s.resetApplyWithLinkedin();
          }
          L = false;
        },
      });
      return false;
    };
  }
  return {
    events: c,
    registerField: E,
    requiredValidator: o,
    constraintValidator: w,
    validationCallback: b,
    extractValidationContext: e,
    DEFAULT_REQUIRED_MSG: u,
    DEFAULT_CONSTRAINT_MSG: j,
    FormComponent: F,
  };
});
define("geolocation", [], function () {
  var c = window.ContextHub,
    b = c && c.getStore && c.getStore("geolocation");
  function e(f) {
    var g = a();
    return function () {
      return (g && g[f]) || "";
    };
  }
  function a() {
    try {
      return b && b.getItem("location");
    } catch (f) {
      console.warn("ReferenceError: ContextHub is not defined", f);
      return { error: f };
    }
  }
  function d(g) {
    var f = a();
    if (f && f.error) {
      return;
    }
    if (f) {
      setTimeout(function () {
        g(f);
      }, 0);
      return;
    }
    b.onUpdate(null, function () {
      g(a());
    });
  }
  return {
    getData: a,
    getContinent: e("continent"),
    getContinentCode: e("continentCode"),
    getCountry: e("country"),
    getCountryCode: e("countryCode"),
    getRegion: e("region"),
    getRegionCode: e("regionCode"),
    getCity: e("city"),
    getPostalCode: e("postalCode"),
    getLatitude: e("latitude"),
    getLongitude: e("longitude"),
    onGeolocationUpdate: d,
  };
});
define("HistoryUtil", [], function () {
  function b(e) {
    var d = history.state;
    if (!d || !d[e]) {
      return {};
    }
    return d[e];
  }
  function c(e, f) {
    var d = {};
    d[e] = $.extend({}, b(e), f);
    return d;
  }
  function a(e, f, d) {
    history.pushState(
      $.extend({}, history.state, c(e, f)),
      document.title,
      d || location.href.slice(0, -location.hash.length) || location.href
    );
  }
  return { push: a, getStateByKey: b };
});
define("media", ["utils"], function (j) {
  var d = { landscape: "tablet", portrait: "mobile", none: "none" },
    e = {
      Mobile: new k("mobile", 0, 575),
      WideMobile: new k("wideMobile", 576, 767),
      Tablet: new k("tablet", 768, 991),
      Desktop: new k("desktop", 992, 1129),
      WideDesktop: new k("wideDesktop", 1130, 1339),
      Broad: new k("broad", 1340, Infinity),
    },
    b = Object.keys(e);
  function k(m, n, l) {
    this.name = m;
    this.start = n;
    this.end = l;
  }
  k.prototype.is = function (l) {
    if (l instanceof k) {
      return this.name === l.name;
    }
    if (typeof l === "number") {
      return this.start <= l && l <= this.end;
    }
    return this.name === l;
  };
  k.prototype.isNot = function (l) {
    return !this.is(l);
  };
  k.prototype.isIn = function (l) {
    return l.some(this.is.bind(this));
  };
  k.prototype.lessThan = function (l) {
    if (l instanceof k) {
      return this.start < l.start;
    }
    if (typeof l === "string" && e[l]) {
      return this.start < e[l].start;
    }
  };
  k.prototype.greaterThan = function (l) {
    if (l instanceof k) {
      return this.start > l.start;
    }
    if (typeof l === "string" && e[l]) {
      return this.start > e[l].start;
    }
  };
  function h() {
    var m = a();
    for (var l = 0; l < b.length; l++) {
      var n = e[b[l]];
      if (n.is(m)) {
        return n;
      }
    }
  }
  function c() {
    if (i()) {
      return d.landscape;
    }
    if (g()) {
      return d.portrait;
    }
    return d.none;
  }
  function i() {
    return j.mq(d.landscape);
  }
  function g() {
    return j.mq(d.portrait);
  }
  function a() {
    return Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
  }
  function f() {
    return Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
  }
  return {
    MediaMode: k,
    modes: e,
    orientation: d,
    currentMode: h,
    getLandscape: c,
    isPortrait: g,
    isLandscape: i,
    getViewportWidth: a,
    getViewportHeight: f,
  };
});
define("utils", ["utils-browser"], function (b) {
  var J = $(window);
  function f(R, Q) {
    var P;
    return function () {
      if (P) {
        return;
      }
      R.apply(this, arguments);
      P = true;
      setTimeout(function () {
        P = false;
      }, Q);
    };
  }
  function L(Q, S, P) {
    var R;
    return function () {
      var W = this;
      var V = arguments;
      var U = function () {
        R = null;
        if (!P) {
          Q.apply(W, V);
        }
      };
      var T = P && !R;
      clearTimeout(R);
      R = setTimeout(U, S);
      if (T) {
        Q.apply(W, V);
      }
    };
  }
  function u(Q, T) {
    var R = Q.getBoundingClientRect();
    var S = R.top;
    var P = R.bottom;
    if (T) {
      S = R.top + T;
      P = R.bottom + T;
    }
    return (
      (S <= 0 && P >= 0) ||
      (P >= (window.innerHeight || document.documentElement.clientHeight) &&
        S <= (window.innerHeight || document.documentElement.clientHeight)) ||
      (S >= 0 &&
        P <= (window.innerHeight || document.documentElement.clientHeight))
    );
  }
  function s(S) {
    var U = "?",
      W = "&",
      P = "=";
    var T = {};
    if (S) {
      var R = S.indexOf(U);
      if (R >= 0) {
        var V = S.substr(R + 1),
          Q = V.split(W);
        $.each(Q, function (Y, ab) {
          var aa = ab.split(P),
            X = aa[0],
            Z = aa[1];
          T[X] = Z ? decodeURIComponent(Z.replace(/\+/g, " ")) : Z;
        });
      }
    }
    return T;
  }
  function M(Q, P) {
    return function (V) {
      var S = parseInt(Q.css("transform").split(",")[4]),
        T = P.width(),
        R = V - T,
        U = -S > R;
      U && Q.css("transform", "translateX(-" + R + "px)");
    };
  }
  function t(R, Q) {
    function P() {
      var T = null;
      function S(U, V) {
        if (!T) {
          T = V;
          return;
        }
        $(V).toggleClass(Q, !$.isOffsetEqual([T, V]));
        T = V;
      }
      R.each(S);
    }
    J.on("resize", P);
    $.onFontLoad(P);
  }
  function y(T) {
    var R = b.isAndroid(),
      Q = b.isIOS(),
      P = b.isWindows(),
      U = T.find("a[data-extension]"),
      S;
    if (!P && !R && !Q) {
      return;
    }
    if (P || R) {
      S = ";ext=";
    }
    if (Q) {
      S = ",%23%,";
    }
    U.each(function () {
      var W = $(this),
        V = W.attr("href") + S + W.data("extension");
      W.attr("href", V);
    });
  }
  function G(P) {
    return bodymovin.loadAnimation({
      container: P.container,
      renderer: "svg",
      loop: P.loop,
      autoplay: P.autoplay,
      path: P.path,
      rendererSettings: P.rendererSettings,
    });
  }
  function x(P) {
    var Q = document.createElement("div");
    Q.style.backgroundColor = P;
    Q.classList.add("image-shadow-block");
    return Q;
  }
  function z(S, U, P) {
    var T = "rgba(0,0,0," + S / 100 + ")";
    for (var R = 0; R < U.length; R++) {
      var Q = x(T);
      if (P) {
        Q.classList.add("parallax-scale");
      }
      U[R].after(Q);
    }
  }
  function w(Q, T, P) {
    var R = Q.data("shadow-opacity");
    if (R > 0) {
      var S = $(T[0]).find(".image-shadow-block").length === 0;
      if (S) {
        z(R, T, P);
      }
    }
  }
  function B() {
    $('a[href*="#"]:not([href="#"]):not([href*="="])').click(function () {
      var P = $(this).hasClass("a11y-skip");
      if (P) {
        return;
      }
      if (
        location.pathname.replace(/^\//, "") ===
          this.pathname.replace(/^\//, "") &&
        location.hostname === this.hostname
      ) {
        var Q = $(this.hash);
        Q = Q.length ? Q : $("[name=" + this.hash.slice(1) + "]");
        if (Q.length) {
          $("html, body").animate({ scrollTop: Q.offset().top }, 0);
          return false;
        }
      }
    });
  }
  function q(P) {
    var Q = $(P).find(".bold-underlined-hover");
    for (var R = 0; R < Q.length; R++) {
      var S = $(Q[R]);
      if (S.hasClass("add-arrow") && !S.has(".arrow").length) {
        var T = document.createElement("span");
        T.classList.add("arrow");
        Q[R].append(T);
      }
    }
  }
  function O() {
    var P = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var Q = document.createElementNS("http://www.w3.org/2000/svg", "use");
    P.classList.add("arrow");
    Q.setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "xlink:href",
      "/etc/designs/epam-core/images/sprites/sprite-redesign_21.svg#link-arrow"
    );
    P.appendChild(Q);
    return P;
  }
  function E(P) {
    var Q = $(P).find(".bold-underlined-hover");
    for (var R = 0; R < Q.length; R++) {
      var S = $(Q[R]);
      if (S.hasClass("add-arrow") && !S.has(".arrow").length) {
        var U = S.has("span").length ? S.find("span").slice(-1) : Q[R];
        var T = O();
        U.append(T);
      }
    }
  }
  function C(P) {
    var Q = O();
    P.append(Q);
  }
  function p(Y, T, Z, P) {
    var Q = false,
      aa = false;
    Z = Z || 100;
    P = P || 2.5;
    function U() {
      return Y.context.offsetWidth < Y.context.scrollWidth;
    }
    function S(ab) {
      if (Q && ab.wheelDeltaY) {
        ab.preventDefault();
        ab.stopPropagation();
        return false;
      }
    }
    function X(ad) {
      if (Q) {
        var ab = ad.originalEvent;
        var ac = Math.abs(ab.deltaY);
        var af = ac >= Z ? ac / P : ac;
        var ag = Math.sign(ab.deltaY || 0);
        var ae = af * ag;
        var ah = Y.scrollLeft();
        Y.scrollLeft(ah + ae);
      }
    }
    function V() {
      if (U()) {
        Q = true;
        document.body.addEventListener("wheel", S, { passive: false });
        aa = true;
      }
    }
    function R() {
      Q = false;
      if (aa) {
        document.body.removeEventListener("wheel", S, { passive: false });
        aa = false;
      }
    }
    function W() {
      T.mouseenter(V);
      T.mouseleave(R);
      Y.mousewheel(X);
    }
    W();
  }
  function c(P) {
    return P.text()
      .trim()
      .replace(/[^\x20-\x7E]/g, "");
  }
  function d(P, Q) {
    if (Q.length <= 2) {
      $(P).each(function () {
        $(this).addClass("text-gradient-s");
      });
      return;
    }
    if (Q.length === 3) {
      $(P).each(function () {
        $(this).addClass("text-gradient-m");
      });
      return;
    }
  }
  function K(P, Q) {
    $(P).each(function () {
      $(this).css("background-image", Q);
      $(this).addClass("gradient-text");
    });
  }
  function I(R) {
    var P = R.width;
    var Q = R.rightRatio;
    var S = R.middleRatio;
    return (
      "linear-gradient(to left, var(--gradient-color-right) " +
      P * Q +
      "px,  var(--gradient-color-middle) " +
      P * S +
      "px, var(--gradient-color-left) 100%)"
    );
  }
  function g(Q) {
    if (!(Q instanceof Element)) {
      throw new Error("provide DOM node");
    }
    var R = window.getComputedStyle(Q);
    var P = R.cssText;
    if (!P) {
      P = Array.from(R).reduce(function (U, T) {
        return U + T + ":" + R.getPropertyValue(T) + ";";
      }, "");
    }
    P = P + " visibility: hidden; z-index: -99999; display: inline;";
    var S = Q.cloneNode(true);
    document.querySelector("body").append(S);
    S.style.cssText = P;
    return S;
  }
  function A(Q, R) {
    var S = g(Q[0]);
    S.textContent = R.slice(-2);
    var P = S.offsetWidth;
    S.remove();
    return P;
  }
  function l(P) {
    P.each(function () {
      $(this).removeClass("text-gradient-s text-gradient-m");
      $(this).removeAttr("style");
      l($(this).children());
    });
  }
  var e = {
    TRANSPARENT: "transparent",
    RTE_TEXT_GRADIENT: "rte-text-gradient",
  };
  var F = 0.5;
  var j = 1.4;
  var N = {};
  function h(P) {
    H();
    P.find("." + e.RTE_TEXT_GRADIENT).each(function () {
      a($(this));
    });
  }
  function H() {
    var P = document.createElement("span");
    document.querySelector("body").appendChild(P);
    var Q = new RegExp(
      "(?<left>rgb\\([0-9, ]+\\)).+?(?<middle>rgb\\([0-9, ]+\\)).+?(?<right>rgb\\([0-9, ]+\\))"
    );
    P.classList.add(e.RTE_TEXT_GRADIENT);
    N = Q.exec(getComputedStyle(P).backgroundImage).groups;
    P.remove();
  }
  function m(U) {
    var Q = U.width;
    var T = U.rightRatio;
    var V = U.middleRatio;
    var P = U.leftColor;
    var S = U.middleColor;
    var R = U.rightColor;
    return (
      "linear-gradient(to left, " +
      R +
      " " +
      Q * T +
      "px, " +
      S +
      " " +
      Q * V +
      "px, " +
      P +
      " 100%)"
    );
  }
  function r(Q) {
    var P = Q;
    while (P.children().length) {
      P = P.children();
    }
    return P;
  }
  function a(Q) {
    var U = r(Q);
    var T = c(U);
    if (T.length <= 3) {
      d(Q, T);
    } else {
      var P = A(U, T);
      var S = {
        width: P,
        rightRatio: F,
        middleRatio: j,
        leftColor: N.left,
        middleColor: N.middle,
        rightColor: N.right,
      };
      var R = m(S);
      K([U], R);
    }
    Q.removeClass(e.transparent);
  }
  function D(S) {
    if (!S) {
      return;
    }
    S.style.display = "inline";
    var T = S.getBoundingClientRect().y;
    var U = getComputedStyle(S).getPropertyValue("--form-submit-gradient");
    var P = S.getClientRects();
    var R = "";
    for (var Q = 0; Q < P.length; Q++) {
      R +=
        U +
        " 0 " +
        Math.floor(P[Q].y - T) +
        "px / " +
        P[Q].width +
        "px " +
        Math.ceil(P[Q].height) +
        "px no-repeat, ";
    }
    S.style.display = "inline-block";
    S.style.background = R.slice(0, -2);
    S.style.backgroundClip = "text";
    S.style.webkitBackgroundClip = "text";
  }
  function o(W) {
    if (
      !W ||
      !W.parentNode ||
      !W.allNodesSelector ||
      !W.overridenNodesSelector
    ) {
      return {};
    }
    var P = W.parentNode;
    var Q = W.allNodesSelector;
    var V = W.overridenNodesSelector;
    var T = Array.from(P.querySelectorAll(Q));
    var S = Array.from(document.querySelectorAll(V));
    var R = T.filter(function (X) {
      return S.includes(X);
    });
    var U = T.filter(function (X) {
      return !R.includes(X);
    });
    return { normalNodes: U, overridenNodes: R };
  }
  function v(Q) {
    var W = 0.5;
    var V = 1.4;
    var P = o({
      parentNode: this.$el[0],
      allNodesSelector: Q.allNodesSelector,
      overridenNodesSelector: Q.overridenNodesSelector,
    });
    var S = P.normalNodes;
    if (document.body.dataset.modeSwitcher === "true") {
      var R = Array.from(document.querySelectorAll(Q.alwaysDarkNodesSelector));
      var U = S.filter(function (X) {
        return R.includes(X);
      });
      var T = [];
      U = U.filter(function (Z) {
        var X = Z.closest(".single-slide-ui");
        var Y = X.querySelectorAll("video");
        if (Y.length > 1) {
          if (!Y[0].dataset.srcLightVideo) {
            return true;
          } else {
            if (!Y[0].dataset.srcDarkVideo) {
              T.push(Z);
              return false;
            } else {
              if (Y[0].dataset.srcDarkVideo !== Y[0].dataset.srcLightVideo) {
                return false;
              }
            }
          }
        }
        return true;
      });
      S = S.filter(function (X) {
        return !U.includes(X) && !T.includes(X);
      });
      if (T.length) {
        Q.alwaysLightGradientText.init(T, {
          rte: true,
          modeOverride: Q.lightMode,
          rightRatio: W,
          middleRatio: V,
        });
      }
      if (U.length) {
        Q.alwaysDarkGradientText.init(U, {
          rte: true,
          modeOverride: Q.darkMode,
          rightRatio: W,
          middleRatio: V,
        });
      }
    }
    Q.gradientText.init(S, { rte: true, rightRatio: W, middleRatio: V });
    Q.ecModeGradientText.init(P.overridenNodes, {
      rte: true,
      modeOverride: Q.ecMode,
      rightRatio: W,
      middleRatio: V,
    });
  }
  function n() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }
  function i(Q) {
    if (!Q || typeof Q !== "string") {
      throw new Error("Invalid media query. Please provide a valid string.");
    }
    var P = window.matchMedia(Q);
    return P.matches;
  }
  function k() {
    var P = $("body");
    return P.hasClass("dark-mode") || P.hasClass("light-mode");
  }
  return {
    mq: i,
    hasTouchEvents: n,
    checkDividers: t,
    debounce: f,
    getQueryParameters: s,
    updateStagePosition: M,
    addExtensionToPhoneNumber: y,
    debounceExtend: L,
    isElementInViewport: u,
    loadLottieFile: G,
    applyShadowOnImage: w,
    redirectToPageAnchor: B,
    insertArrowForLinks: q,
    insertArrowPictureForLinks: E,
    setHorizontalScrolling: p,
    insertArrowPicture: C,
    getNodeText: c,
    applySimpleGradient: d,
    applyDynamicGradient: K,
    createGradient: I,
    getLast2CharsWidth: A,
    clearGradients: l,
    createCloneWithStyles: g,
    createRTEGradient: m,
    initRTEGradients: h,
    applyTextGradients: v,
    applyMultiLineGradient: D,
    selectNormalAndOverriden: o,
    isRedesign23: k,
  };
});
define("utils-share", [], function () {
  var f = { image: "", text: "" };
  var a = {
    fb: "Facebook.com",
    tw: "Twitter.com",
    li: "LinkedIn.com",
    vk: "vk.com",
  };
  function j(l, k) {
    return (
      "utm_source=" +
      l +
      "&utm_medium=shared_job_post&utm_campaign=share_job_post&utm_content=" +
      k
    );
  }
  function e(k) {
    if (!this[k.type]) {
      return;
    }
    this.openPopup(this.getLink(k));
  }
  function h(l) {
    var k = $.extend(
      {},
      f,
      {
        url: location.href,
        count_url: location.href,
        share_title: document.title,
      },
      l
    );
    if (k.utmContent) {
      k.url =
        k.url +
        (k.url.indexOf("?") > -1 ? "&" : "?") +
        j(a[k.type], k.utmContent);
    }
    return this[k.type](k);
  }
  function c(k) {
    return (
      "http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(k.url)
    );
  }
  function g(k) {
    return (
      "http://twitter.com/share?text=" +
      encodeURIComponent(k.share_title) +
      "&url=" +
      encodeURIComponent(k.url) +
      "&counturl=" +
      encodeURIComponent(k.count_url)
    );
  }
  function i(k) {
    return (
      "http://www.linkedin.com/shareArticle?url=" +
      encodeURIComponent(k.url) +
      "&title=" +
      encodeURIComponent(k.share_title) +
      "&summary=" +
      encodeURIComponent(k.text)
    );
  }
  function d(k) {
    return (
      "http://vk.com/share.php?url=" +
      encodeURIComponent(k.url) +
      "&title=" +
      encodeURIComponent(k.share_title) +
      "&description=" +
      encodeURIComponent(k.text) +
      "&image=" +
      encodeURIComponent(k.image)
    );
  }
  function b(l) {
    var k = window.open(
      "",
      "",
      "toolbar=0,status=0,scrollbars=1,width=626,height=436"
    );
    if (!k) {
      location.href = l;
    } else {
      k.document.location = l;
    }
  }
  return { go: e, getLink: h, openPopup: b, fb: c, tw: g, li: i, vk: d };
});
define("utils-dust", [], function () {
  function b(e, d, f) {
    window.dust.render(e, d, function (h, g) {
      if (h) {
        console.error(h);
        return;
      }
      f(g);
    });
  }
  function a(e, d, f) {
    b(e, d, function (g) {
      f.append(g);
    });
  }
  function c(f, e, d, g) {
    b(f, e, function (h) {
      g.call(d, h);
    });
  }
  return { render: b, append: a, jQueryFunc: c };
});
define("utils-browser", [], function () {
  var h = (function () {
    var j;
    function i(n) {
      var l = n.indexOf("MSIE ");
      if (l > 0) {
        return parseInt(n.substring(l + 5, n.indexOf(".", l)), 10);
      }
      var k = n.indexOf("Trident/");
      if (k > 0) {
        var o = n.indexOf("rv:");
        return parseInt(n.substring(o + 3, n.indexOf(".", o)), 10);
      }
      var m = n.indexOf("Edge/");
      if (m > 0) {
        return parseInt(n.substring(m + 5, n.indexOf(".", m)), 10);
      }
      return false;
    }
    return function () {
      if (typeof j === "undefined") {
        var k = window.navigator.userAgent;
        j = i(k);
      }
      return j;
    };
  })();
  var e = (function () {
    var i;
    return function () {
      if (typeof i === "undefined") {
        i = window.navigator.userAgent.toLowerCase().indexOf("android") >= 0;
      }
      return i;
    };
  })();
  var b = (function () {
    var i;
    return function () {
      if (typeof i === "undefined") {
        i = !!window.navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
      }
      return i;
    };
  })();
  var g = (function () {
    var i;
    return function () {
      if (typeof i === "undefined") {
        i = navigator.userAgent.match(/iPad/i) !== null;
      }
      return i;
    };
  })();
  var a = (function () {
    var i;
    return function () {
      if (typeof i === "undefined") {
        i = navigator.platform.indexOf("Win") > -1;
      }
      return i;
    };
  })();
  var c = (function () {
    var i;
    return function () {
      if (typeof i === "undefined") {
        i = "ontouchstart" in window || navigator.msMaxTouchPoints;
      }
      return i;
    };
  })();
  function d() {
    var i = navigator.userAgent;
    return !(i.indexOf("Chrome") > -1) && i.indexOf("Safari") > -1;
  }
  function f() {
    return (
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  }
  return {
    isInternetExplorer: h,
    isAndroid: e,
    isIOS: b,
    isWindows: a,
    isIPad: g,
    detectIOSDevice: f,
    isSafari: d,
    isTouchDevice: c,
  };
});
define("utils-env", ["utils"], function (c) {
  function d() {
    return !!ALCHEMY.authorRunMode;
  }
  function e() {
    return (
      this.isAuthor() &&
      !b() &&
      !!Granite.author &&
      $.cookie("wcmmode") === "edit"
    );
  }
  function a() {
    return (
      this.isAuthor() &&
      !b() &&
      !!Granite.author &&
      $.cookie("wcmmode") === "preview"
    );
  }
  function b() {
    return c.getQueryParameters(location.href).wcmmode === "disabled";
  }
  return { isAuthor: d, isEditMode: e, isPreviewMode: a, isDisabledMode: b };
});
define("utils-a11y", ["constants"], function (a) {
  function b(f) {
    var c = "input, textarea, select, a, button",
      e = f
        .find(c)
        .filter(":visible")
        .filter(function () {
          return $(this).attr("tabindex")
            ? $(this).attr("tabindex") >= 0
            : $(this);
        }),
      d = e.first(),
      g = e.last();
    e.off("keydown");
    d.focus();
    g.on("keydown", function (h) {
      if (h.key === a.Keys.tab && !h.shiftKey) {
        h.preventDefault();
        d.focus();
      }
    });
    d.on("keydown", function (h) {
      if (h.key === a.Keys.tab && h.shiftKey) {
        h.preventDefault();
        g.focus();
      }
    });
  }
  return { handlePopupFocus: b };
});
define("utm-utils", ["constants", "utils"], function (f, c) {
  var g = ["utmTerm", "utmSource", "utmMedium", "utmCampaign", "utmContent"];
  function e(i) {
    var h = document.createElement("a");
    h.setAttribute("href", i);
    return h.hostname;
  }
  function b(h) {
    var i = false;
    g.forEach(function (j) {
      if (h.hasOwnProperty(j)) {
        i = true;
      }
    });
    return i;
  }
  function a() {
    var i,
      h,
      j = sessionStorage.getItem(f.StorageKey.utmParameters);
    if (j) {
      j = JSON.parse(j);
      i = new Date();
      h = new Date(j.timestamp);
      h.setMinutes(h.getMinutes() + 30);
      if (i.getTime() > h.getTime()) {
        return true;
      }
    }
    return false;
  }
  function d(h) {
    var k = sessionStorage.getItem(f.StorageKey.utmParameters),
      m = h;
    var j = e(window.location.href);
    Object.keys(c.getQueryParameters(h)).length === 0 ? (m += "?") : (m += "&");
    if (!k) {
      return m + "utm_medium=" + j + "&utm_term=" + j + "&utm_source=" + j;
    }
    k = JSON.parse(k);
    var l = b(k),
      i = e(k.userReferrer);
    if (l) {
      m +=
        "utm_medium=" +
        j +
        (k.hasOwnProperty("utmTerm") ? "&utm_term=" + k.utmTerm : "") +
        (k.hasOwnProperty("utmSource") ? "&utm_source=" + k.utmSource : "") +
        (k.hasOwnProperty("utmCampaign")
          ? "&utm_campaign=" + k.utmCampaign
          : "") +
        (k.hasOwnProperty("utmContent") ? "&utm_content=" + k.utmContent : "");
    } else {
      if (!l && k.startPageIsVacancy) {
        m +=
          "utm_medium=" +
          j +
          "&utm_term=" +
          j +
          (i ? "&utm_source=" + i : "") +
          (i ? "&utm_content=referrer_" + i : "");
      } else {
        if (!l && !k.startPageIsVacancy) {
          m +=
            "utm_medium=" +
            j +
            "&utm_term=" +
            j +
            "&utm_source=" +
            j +
            (i ? "&utm_content=referrer_" + i : "");
        }
      }
    }
    return m;
  }
  return {
    isSessionOutdated: a,
    buildAnywhereUrl: d,
    getFullDomain: e,
    isSessionHasUtmParameters: b,
  };
});
define("utm", ["utils", "constants", "utm-utils"], function (e, h, i) {
  var a = [
    "utm_term",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
  ];
  var c = { applyForm: ".form-apply-for-job", vacancyPage: ".vacancy-page" };
  var b = "ALCHEMYLandingPage";
  var f;
  var d = i.getFullDomain(window.location.href);
  function g() {
    if (f) {
      return f;
    }
    f = this;
    this.referrer = document.referrer;
    this.hasExternalReferrer =
      this.referrer.length > 0 &&
      this.referrer.split("/")[2].indexOf("alchemy") === -1;
    this.queryParameters = e.getQueryParameters(window.location.href);
    this.utmParameters = {};
    this.shouldSessionUpdate = false;
    this.$applyForm = $(c.applyForm);
    this.isMarketingLandingPage = $('#main[data-marketing="true"]').length;
    this.initComponent();
  }
  g.prototype.initComponent = function () {
    if (i.isSessionOutdated()) {
      this.removeSession();
    }
    if (this.queryParameters) {
      this.getUtmParameters();
    }
    if (this.shouldSessionUpdate) {
      this.createSession();
    }
    this.$applyForm &&
      this.$applyForm.on(
        "AJAX_START",
        function () {
          this.updateHiddenFields();
        }.bind(this)
      );
  };
  g.prototype.getUtmParameters = function () {
    a.forEach(
      function (m) {
        if (this.queryParameters.hasOwnProperty(m)) {
          var k = m.split("_"),
            l = k[0] + k[1][0].toUpperCase() + k[1].slice(1);
          this.utmParameters[l] = this.queryParameters[m];
        }
      }.bind(this)
    );
    var j =
      this.isMarketingLandingPage &&
      !Object.keys(this.utmParameters).length &&
      (this.hasExternalReferrer || !this.referrer);
    if (j) {
      this.utmParameters.utmSource = b;
    } else {
      if (this.hasExternalReferrer) {
        this.utmParameters.userReferrer = this.referrer;
        this.utmParameters.startPageIsVacancy = !!$(c.vacancyPage).length;
      }
    }
    this.shouldSessionUpdate = Object.keys(this.utmParameters).length > 0;
  };
  g.prototype.createSession = function () {
    this.utmParameters.timestamp = new Date();
    sessionStorage.setItem(
      h.StorageKey.utmParameters,
      JSON.stringify(this.utmParameters)
    );
  };
  g.prototype.removeSession = function () {
    sessionStorage.removeItem(h.StorageKey.utmParameters);
  };
  g.prototype.updateHiddenFields = function () {
    var m = JSON.parse(sessionStorage.getItem(h.StorageKey.utmParameters));
    var l = this.$applyForm.find('input[type="hidden"]');
    var j = { utmSource: d, utmMedium: d, utmTerm: d };
    function n(o) {
      if (o.name === "utmCampaign") {
        o.value = null;
        return;
      }
      if (j[o.name]) {
        o.value = j[o.name];
      }
    }
    if (!m) {
      l.each(function (p, o) {
        if (o.name === "utmContent") {
          o.value = null;
          return;
        }
        n(o);
      });
      return;
    }
    var k = i.isSessionHasUtmParameters(m);
    j.utmContent = "referrer_" + i.getFullDomain(m.userReferrer);
    if (!k && m.startPageIsVacancy) {
      j.utmSource = i.getFullDomain(m.userReferrer);
      l.each(function (p, o) {
        n(o);
      });
    } else {
      if (!k && !m.startPageIsVacancy) {
        l.each(function (p, o) {
          n(o);
        });
      } else {
        if (k) {
          l.each(function (p, o) {
            if (o.name === "utmMedium") {
              m[o.name] ? (o.value = m[o.name]) : (o.value = d);
              return;
            }
            if (m[o.name]) {
              o.value = m[o.name];
            }
          });
        }
      }
    }
  };
  g.moduleName = "utm";
  return g;
});
define("animations", ["utils-env"], function (b) {
  function c(g) {
    var j = g[0];
    var e = g[g.length - 1];
    var h = j.getBoundingClientRect();
    var i = h.y + h.height / 2;
    var f = e.getBoundingClientRect();
    var k = f.y + f.height / 2;
    var l = window.innerHeight;
    if (i <= l && k >= 0) {
      return true;
    }
    return false;
  }
  function d(e, i) {
    var h = 150;
    if (!e || !i) {
      throw new Error("addAppearanceAnimation is missing required params");
    }
    function g() {
      if (c(e)) {
        f(e, i);
        window.removeEventListener("scroll", g);
      }
    }
    function f() {
      function l(m) {
        m.classList.add(i);
      }
      for (var j = 0; j < e.length; j++) {
        var k = h * j;
        setTimeout(l, k, e[j]);
      }
    }
    window.removeEventListener("scroll", g);
    if (c(e)) {
      f(e, i);
    } else {
      window.addEventListener("scroll", g);
    }
  }
  function a(e, f) {
    if (b.isEditMode()) {
      e.forEach(function (g) {
        g.classList.add(f);
      });
    }
  }
  return { addAppearanceAnimation: d, disableAnimationInEditMode: a };
});
define("gradients", ["constants", "utils"], function (u, r) {
  var s = {
    GRADIENT_TEXT: "gradient-text",
    TRANSPARENT: "transparent",
    RTE_TEXT_GRADIENT: "rte-text-gradient",
  };
  var f = {
    DARK: "--alchemy-rte-text-gradient-dark",
    LIGHT: "--alchemy-rte-text-gradient-light",
    EC: "--alchemy-rte-text-gradient-ec",
  };
  var a = { DARK: "DARK", LIGHT: "LIGHT", EC: "EC" };
  var t = { rightRatio: 0.1, middleRatio: 1.2, rte: false };
  var m = 300;
  var e = 10;
  var j = { DARK: "dark-mode", LIGHT: "light-mode", EC: "ec-mode" };
  var k = 2;
  var b = 3;
  var q = {
    DARK: { SMALL: [15, 50, 90], MEDIUM: [15, 60, 95] },
    LIGHT: { SMALL: [15, 50, 90], MEDIUM: [15, 60, 95] },
    EC: { SMALL: [15, 85, 100], MEDIUM: [15, 95, 100] },
  };
  function c() {
    this.startTimestamp = null;
    this.currentStep = 1;
    this.timeDelta = m / e;
    this.domNodesList = [];
    this.params = {};
    this.currentGradientChannels = null;
    this.targetGradientChannels = null;
    this.gradientParams = [];
    this.currentTheme = "";
    this.debouncedBindedApplyGradientImmediately = null;
    this.bindedApplyGradientAnimated = null;
    this.hexGradientColors = null;
  }
  c.prototype.init = function (w, z) {
    if (!w) {
      console.error("applyGradient: Provide nodes list");
      return;
    }
    this.domNodesList = w;
    this.params = Object.assign({}, t, z);
    if (this.params.modeOverride) {
      this.currentTheme = this.params.modeOverride;
    } else {
      this.getCurrentTheme();
    }
    this.getGradientColors();
    this.currentGradientChannels = o(this.hexGradientColors[this.currentTheme]);
    if (z.rte) {
      var v = [];
      for (var y = 0; y < this.domNodesList.length; y++) {
        v[y] = l(this.domNodesList[y]);
      }
      this.domNodesList = v;
    }
    this.applyGradientImmediately();
    var x = this.applyGradientImmediately.bind(this);
    this.debouncedBindedApplyGradientImmediately = r.debounceExtend(x, 300);
    window.addEventListener(
      "resize",
      this.debouncedBindedApplyGradientImmediately
    );
    if (!this.params.modeOverride) {
      this.bindedApplyGradientAnimated = this.applyGradientAnimated.bind(this);
      document.body.addEventListener(
        u.Events.themeSwitch,
        this.bindedApplyGradientAnimated
      );
    }
  };
  c.prototype.applyGradientImmediately = function () {
    for (var v = 0; v < this.domNodesList.length; v++) {
      var w = this.domNodesList[v];
      var y = h(w);
      this.gradientParams[v] = {
        width: d(w, y),
        rightRatio: this.params.rightRatio,
        middleRatio: this.params.middleRatio,
        textLength: y.length,
      };
      var x = this.createGradient({
        nodeIndex: v,
        gradientChannels: this.currentGradientChannels,
      });
      g(w, x);
      w.classList.remove(s.TRANSPARENT);
    }
  };
  c.prototype.applyGradientAnimated = function () {
    this.currentStep = 1;
    this.startTimestamp = null;
    this.getCurrentTheme();
    this.targetGradientChannels = o(this.hexGradientColors[this.currentTheme]);
    window.requestAnimationFrame(this.render.bind(this));
  };
  c.prototype.render = function (z) {
    if (!this.startTimestamp) {
      this.startTimestamp = z;
    }
    if (z - this.startTimestamp < this.currentStep * this.timeDelta) {
      window.requestAnimationFrame(this.render.bind(this));
      return;
    }
    var w = this.currentStep / e;
    var y = n({
      current: this.currentGradientChannels,
      target: this.targetGradientChannels,
      progress: w,
    });
    for (var x = 0; x < this.domNodesList.length; x++) {
      var v = this.createGradient({ nodeIndex: x, gradientChannels: y });
      g(this.domNodesList[x], v);
    }
    if (this.currentStep < e) {
      this.currentStep++;
      window.requestAnimationFrame(this.render.bind(this));
    } else {
      this.currentGradientChannels = this.targetGradientChannels;
    }
  };
  c.prototype.createGradient = function (v) {
    var C = v.nodeIndex;
    var A = v.gradientChannels;
    var w = this.gradientParams[C].textLength;
    if (w <= b) {
      var y = w <= k ? q[this.currentTheme].SMALL : q[this.currentTheme].MEDIUM;
      return (
        "linear-gradient(to right, " +
        p(A.left) +
        " " +
        y[0] +
        "%, " +
        p(A.middle) +
        " " +
        y[1] +
        "%, " +
        p(A.right) +
        " " +
        y[2] +
        "%)"
      );
    }
    var x = this.gradientParams[C].width;
    var z = this.gradientParams[C].rightRatio;
    var B = this.gradientParams[C].middleRatio;
    return (
      "linear-gradient(to left, " +
      p(A.right) +
      " " +
      x * z +
      "px, " +
      p(A.middle) +
      " " +
      x * B +
      "px, " +
      p(A.left) +
      " 100%)"
    );
  };
  c.prototype.stop = function () {
    window.removeEventListener(
      "resize",
      this.debouncedBindedApplyGradientImmediately
    );
    document.body.removeEventListener(
      u.Events.themeSwitch,
      this.bindedApplyGradientAnimated
    );
    this.clearGradients();
  };
  c.prototype.clearGradients = function () {
    for (var v = 0; v < this.domNodesList.length; v++) {
      this.domNodesList[v].classList.remove(s.GRADIENT_TEXT);
      this.domNodesList[v].style.removeProperty("background-image");
    }
  };
  c.prototype.getCurrentTheme = function () {
    Object.keys(j).forEach(
      function (v) {
        if (document.body.classList.contains(j[v])) {
          this.currentTheme = v;
        }
      }.bind(this)
    );
  };
  c.prototype.getGradientColors = function () {
    var w = {};
    var v = document.createElement("span");
    document.querySelector("body").appendChild(v);
    var x = new RegExp("#(?<left>\\w+).+#(?<middle>\\w+).+#(?<right>\\w+)");
    Object.keys(f).forEach(function (A) {
      var z = getComputedStyle(v).getPropertyValue(f[A]);
      var y = x.exec(z).groups;
      w[A] = y;
    });
    this.hexGradientColors = w;
    v.remove();
  };
  function h(w) {
    if (!w.children.length) {
      return w.textContent.trim().replace(/[^\x20-\x7E]/g, "");
    }
    var z = false;
    for (var v = 0; v < w.childNodes.length; v++) {
      if (w.childNodes[v].tagName === "BR") {
        z = true;
      }
    }
    if (z) {
      return w.innerHTML
        .replace(/<br\s*[\/]?>/gi, " ")
        .trim()
        .replace(/[^\x20-\x7E]/g, "");
    } else {
      var x = "";
      for (var A = 0; A < w.children.length; A++) {
        x += h(w.children[A]) + " ";
      }
      x = x.slice(0, -1);
      return x;
    }
  }
  function g(v, w) {
    v.style.backgroundImage = w;
    v.classList.add(s.GRADIENT_TEXT);
  }
  function i(w) {
    if (!(w instanceof Element)) {
      throw new Error("provide DOM node");
    }
    var x = window.getComputedStyle(w);
    var v = x.cssText;
    if (!v) {
      v = Array.from(x).reduce(function (A, z) {
        return A + z + ":" + x.getPropertyValue(z) + ";";
      }, "");
    }
    v = v + " visibility: hidden; z-index: -99999; display: inline;";
    var y = w.cloneNode(true);
    document.querySelector("body").append(y);
    y.style.cssText = v;
    return y;
  }
  function d(w, x) {
    var y = i(w);
    y.textContent = x.slice(-2);
    var v = y.offsetWidth;
    y.remove();
    return v;
  }
  function o(w) {
    var v = {};
    w &&
      Object.keys(w).forEach(function (x) {
        var A = parseInt(w[x].slice(0, 2), 16);
        var z = parseInt(w[x].slice(2, 4), 16);
        var y = parseInt(w[x].slice(4, 6), 16);
        v[x] = { c1: A, c2: z, c3: y };
      });
    return v;
  }
  function p(v) {
    return "rgb(" + v.c1 + "," + v.c2 + "," + v.c3 + ")";
  }
  function n(w) {
    var z = w.current;
    var y = w.target;
    var v = w.progress;
    var x = {};
    Object.keys(z).forEach(function (A) {
      x[A] = {};
      Object.keys(z[A]).forEach(function (B) {
        var C = (y[A][B] - z[A][B]) * v;
        x[A][B] = Math.round(z[A][B] + C);
      });
    });
    return x;
  }
  function l(v) {
    var w = v;
    while (w.children.length && w.children[0].nodeName !== "BR") {
      w = w.children[0];
    }
    return w;
  }
  return { GradientText: c, modes: a, classes: s };
});
(function () {
  var b = $(window);
  if (!Array.prototype.find) {
    Array.prototype.find = function (c) {
      if (this === null) {
        throw new TypeError("Array.prototype.find called on null or undefined");
      }
      if (typeof c !== "function") {
        throw new TypeError("predicate must be a function");
      }
      var h = Object(this),
        f = h.length >>> 0,
        d = arguments[1],
        g;
      for (var e = 0; e < f; e++) {
        g = h[e];
        if (c.call(d, g, e, h)) {
          return g;
        }
      }
    };
  }
  if (!b.onbeforeprint) {
    var a = window.matchMedia("print");
    a.addListener(function (c) {
      if (c.matches) {
        b.trigger("beforeprint");
      }
    });
  }
})();
define("imager", [], function () {
  var e = [],
    a = "imager-ready";
  var b = {
    cssBackground: false,
    availableWidths: [300, 320, 400, 480, 600, 640, 768, 960, 990, 1248, 1920],
    widthInterpolator: function (f) {
      return "resize_w_" + f;
    },
  };
  function c(f, h) {
    var g = $.extend({}, b, h);
    g.className = g.className ? g.className + " " + a : a;
    e.push(new window.Imager(f, g));
    return e[e.length - 1];
  }
  function d() {
    c(".delayed-image-load-section-background", {
      cssBackground: true,
      availableWidths: [990, 1248, 1920],
    });
  }
  $(document).ready(d);
  return {
    create: c,
    instances: e,
    classes: { placeholder: "imager-placeholder", ready: a },
  };
});
define([
  "require",
  "utils-browser",
  "constants",
  "utm",
  "jquery-plugins",
], function (f, l, p, h) {
  var i = $("html"),
    m = [];
  function g() {
    var r = window.ALCHEMY.mods;
    if (!(r && r.length)) {
      throw "Active modules list is undefined.";
    }
    return r;
  }
  function q(s, r) {
    return function () {
      var t = new r($(this));
      r.moduleName && console.log("Component: " + r.moduleName);
      m[s].push(t);
    };
  }
  function b(s, r) {
    if (!r) {
      throw 'Component "' + s + '" is undefined.';
    }
    if (!m[s]) {
      m[s] = [];
    }
  }
  function e(s) {
    var r = f(s);
    b(s, r);
    $(r.selector).each(q(s, r));
  }
  function k(t, s) {
    var r = s.data.map(function (u) {
      return u.key;
    });
    r.forEach(function (u) {
      $("#" + u + " [data-component]").each(function () {
        var v = $(this).data("component"),
          w = f(v);
        b(v, w);
        q(v, w).call(this);
      });
    });
    o();
  }
  function j() {
    var r = window.ContextHub;
    g().forEach(e);
    define("ALCHEMY.components", [], function () {
      return m;
    });
    r && r.eventing && r.eventing.on("segment-engine:teaser-loaded", k);
    o();
  }
  function o() {
    svg4everybody();
  }
  $(j);
  var d = l.isInternetExplorer();
  var a = $("form");
  i.toggleClass("iOS", l.isIOS())
    .toggleClass("iPad", l.isIPad())
    .toggleClass("ie", d && d < 12)
    .toggleClass("edge", d && d >= 12);
  function c() {
    var t = "no-focus";
    var s = "key-used";
    var r = function (u) {
      if (a.length) {
        if (u) {
          a.removeClass(t);
        } else {
          a.addClass(t);
        }
      }
    };
    r();
    i.on("mousedown", function () {
      r();
      i.removeClass(s);
    });
    i.on("keydown", function (u) {
      if (u.key === p.Keys.tab) {
        r(true);
        i.addClass(s);
      }
    });
  }
  c();
  var n = new h();
  n.initComponent();
  return { initModule: e, afterInit: o };
});
