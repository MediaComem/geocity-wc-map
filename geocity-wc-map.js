/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const hr = window, va = hr.ShadowRoot && (hr.ShadyCSS === void 0 || hr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, sc = Symbol(), Tl = /* @__PURE__ */ new WeakMap();
class ud {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== sc)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (va && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = Tl.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Tl.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const ft = (i) => new ud(typeof i == "string" ? i : i + "", void 0, sc), dd = (i, t) => {
  va ? i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const n = document.createElement("style"), s = hr.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = e.cssText, i.appendChild(n);
  });
}, bl = va ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules)
    e += n.cssText;
  return ft(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var mo;
const gr = window, Rl = gr.trustedTypes, fd = Rl ? Rl.emptyScript : "", Il = gr.reactiveElementPolyfillSupport, jo = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? fd : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, rc = (i, t) => t !== i && (t == t || i == i), _o = { attribute: !0, type: String, converter: jo, reflect: !1, hasChanged: rc };
class rn extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var e;
    this.finalize(), ((e = this.h) !== null && e !== void 0 ? e : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, n) => {
      const s = this._$Ep(n, e);
      s !== void 0 && (this._$Ev.set(s, n), t.push(s));
    }), t;
  }
  static createProperty(t, e = _o) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const n = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, n, e);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    return { get() {
      return this[e];
    }, set(s) {
      const r = this[t];
      this[e] = s, this.requestUpdate(t, r, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || _o;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, n = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const s of n)
        this.createProperty(s, e[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const s of n)
        e.unshift(bl(s));
    } else
      t !== void 0 && e.push(bl(t));
    return e;
  }
  static _$Ep(t, e) {
    const n = e.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, n;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((n = t.hostConnected) === null || n === void 0 || n.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return dd(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var n;
      return (n = e.hostConnected) === null || n === void 0 ? void 0 : n.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var n;
      return (n = e.hostDisconnected) === null || n === void 0 ? void 0 : n.call(e);
    });
  }
  attributeChangedCallback(t, e, n) {
    this._$AK(t, n);
  }
  _$EO(t, e, n = _o) {
    var s;
    const r = this.constructor._$Ep(t, n);
    if (r !== void 0 && n.reflect === !0) {
      const o = (((s = n.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? n.converter : jo).toAttribute(e, n.type);
      this._$El = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$El = null;
    }
  }
  _$AK(t, e) {
    var n;
    const s = this.constructor, r = s._$Ev.get(t);
    if (r !== void 0 && this._$El !== r) {
      const o = s.getPropertyOptions(r), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((n = o.converter) === null || n === void 0 ? void 0 : n.fromAttribute) !== void 0 ? o.converter : jo;
      this._$El = r, this[r] = a.fromAttribute(e, o.type), this._$El = null;
    }
  }
  requestUpdate(t, e, n) {
    let s = !0;
    t !== void 0 && (((n = n || this.constructor.getPropertyOptions(t)).hasChanged || rc)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), n.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, n))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, r) => this[r] = s), this._$Ei = void 0);
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var r;
        return (r = s.hostUpdate) === null || r === void 0 ? void 0 : r.call(s);
      }), this.update(n)) : this._$Ek();
    } catch (s) {
      throw e = !1, this._$Ek(), s;
    }
    e && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((n) => {
      var s;
      return (s = n.hostUpdated) === null || s === void 0 ? void 0 : s.call(n);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, n) => this._$EO(n, this[n], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
rn.finalized = !0, rn.elementProperties = /* @__PURE__ */ new Map(), rn.elementStyles = [], rn.shadowRootOptions = { mode: "open" }, Il == null || Il({ ReactiveElement: rn }), ((mo = gr.reactiveElementVersions) !== null && mo !== void 0 ? mo : gr.reactiveElementVersions = []).push("1.5.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var po;
const mr = window, Mn = mr.trustedTypes, Ll = Mn ? Mn.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, ei = `lit$${(Math.random() + "").slice(9)}$`, oc = "?" + ei, gd = `<${oc}>`, En = document, rs = (i = "") => En.createComment(i), os = (i) => i === null || typeof i != "object" && typeof i != "function", ac = Array.isArray, md = (i) => ac(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", jn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pl = /-->/g, Al = />/g, Ei = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ol = /'/g, Fl = /"/g, lc = /^(?:script|style|textarea|title)$/i, _d = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), ze = _d(1), Di = Symbol.for("lit-noChange"), mt = Symbol.for("lit-nothing"), Dl = /* @__PURE__ */ new WeakMap(), yn = En.createTreeWalker(En, 129, null, !1), pd = (i, t) => {
  const e = i.length - 1, n = [];
  let s, r = t === 2 ? "<svg>" : "", o = jn;
  for (let l = 0; l < e; l++) {
    const h = i[l];
    let c, u, d = -1, f = 0;
    for (; f < h.length && (o.lastIndex = f, u = o.exec(h), u !== null); )
      f = o.lastIndex, o === jn ? u[1] === "!--" ? o = Pl : u[1] !== void 0 ? o = Al : u[2] !== void 0 ? (lc.test(u[2]) && (s = RegExp("</" + u[2], "g")), o = Ei) : u[3] !== void 0 && (o = Ei) : o === Ei ? u[0] === ">" ? (o = s != null ? s : jn, d = -1) : u[1] === void 0 ? d = -2 : (d = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? Ei : u[3] === '"' ? Fl : Ol) : o === Fl || o === Ol ? o = Ei : o === Pl || o === Al ? o = jn : (o = Ei, s = void 0);
    const g = o === Ei && i[l + 1].startsWith("/>") ? " " : "";
    r += o === jn ? h + gd : d >= 0 ? (n.push(c), h.slice(0, d) + "$lit$" + h.slice(d) + ei + g) : h + ei + (d === -2 ? (n.push(void 0), l) : g);
  }
  const a = r + (i[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(i) || !i.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [Ll !== void 0 ? Ll.createHTML(a) : a, n];
};
class as {
  constructor({ strings: t, _$litType$: e }, n) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, l = this.parts, [h, c] = pd(t, e);
    if (this.el = as.createElement(h, n), yn.currentNode = this.el.content, e === 2) {
      const u = this.el.content, d = u.firstChild;
      d.remove(), u.append(...d.childNodes);
    }
    for (; (s = yn.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const u = [];
          for (const d of s.getAttributeNames())
            if (d.endsWith("$lit$") || d.startsWith(ei)) {
              const f = c[o++];
              if (u.push(d), f !== void 0) {
                const g = s.getAttribute(f.toLowerCase() + "$lit$").split(ei), m = /([.?@])?(.*)/.exec(f);
                l.push({ type: 1, index: r, name: m[2], strings: g, ctor: m[1] === "." ? xd : m[1] === "?" ? Cd : m[1] === "@" ? Md : Wr });
              } else
                l.push({ type: 6, index: r });
            }
          for (const d of u)
            s.removeAttribute(d);
        }
        if (lc.test(s.tagName)) {
          const u = s.textContent.split(ei), d = u.length - 1;
          if (d > 0) {
            s.textContent = Mn ? Mn.emptyScript : "";
            for (let f = 0; f < d; f++)
              s.append(u[f], rs()), yn.nextNode(), l.push({ type: 2, index: ++r });
            s.append(u[d], rs());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === oc)
          l.push({ type: 2, index: r });
        else {
          let u = -1;
          for (; (u = s.data.indexOf(ei, u + 1)) !== -1; )
            l.push({ type: 7, index: r }), u += ei.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const n = En.createElement("template");
    return n.innerHTML = t, n;
  }
}
function wn(i, t, e = i, n) {
  var s, r, o, a;
  if (t === Di)
    return t;
  let l = n !== void 0 ? (s = e._$Co) === null || s === void 0 ? void 0 : s[n] : e._$Cl;
  const h = os(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== h && ((r = l == null ? void 0 : l._$AO) === null || r === void 0 || r.call(l, !1), h === void 0 ? l = void 0 : (l = new h(i), l._$AT(i, e, n)), n !== void 0 ? ((o = (a = e)._$Co) !== null && o !== void 0 ? o : a._$Co = [])[n] = l : e._$Cl = l), l !== void 0 && (t = wn(i, l._$AS(i, t.values), l, n)), t;
}
class yd {
  constructor(t, e) {
    this.u = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t) {
    var e;
    const { el: { content: n }, parts: s } = this._$AD, r = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : En).importNode(n, !0);
    yn.currentNode = r;
    let o = yn.nextNode(), a = 0, l = 0, h = s[0];
    for (; h !== void 0; ) {
      if (a === h.index) {
        let c;
        h.type === 2 ? c = new Ms(o, o.nextSibling, this, t) : h.type === 1 ? c = new h.ctor(o, h.name, h.strings, this, t) : h.type === 6 && (c = new Ed(o, this, t)), this.u.push(c), h = s[++l];
      }
      a !== (h == null ? void 0 : h.index) && (o = yn.nextNode(), a++);
    }
    return r;
  }
  p(t) {
    let e = 0;
    for (const n of this.u)
      n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class Ms {
  constructor(t, e, n, s) {
    var r;
    this.type = 2, this._$AH = mt, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = s, this._$Cm = (r = s == null ? void 0 : s.isConnected) === null || r === void 0 || r;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cm;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = wn(this, t, e), os(t) ? t === mt || t == null || t === "" ? (this._$AH !== mt && this._$AR(), this._$AH = mt) : t !== this._$AH && t !== Di && this.g(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : md(t) ? this.k(t) : this.g(t);
  }
  O(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  g(t) {
    this._$AH !== mt && os(this._$AH) ? this._$AA.nextSibling.data = t : this.T(En.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var e;
    const { values: n, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = as.createElement(s.h, this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === r)
      this._$AH.p(n);
    else {
      const o = new yd(r, this), a = o.v(this.options);
      o.p(n), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Dl.get(t.strings);
    return e === void 0 && Dl.set(t.strings, e = new as(t)), e;
  }
  k(t) {
    ac(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, s = 0;
    for (const r of t)
      s === e.length ? e.push(n = new Ms(this.O(rs()), this.O(rs()), this, this.options)) : n = e[s], n._$AI(r), s++;
    s < e.length && (this._$AR(n && n._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var n;
    for ((n = this._$AP) === null || n === void 0 || n.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cm = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class Wr {
  constructor(t, e, n, s, r) {
    this.type = 1, this._$AH = mt, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = mt;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, n, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      t = wn(this, t, e, 0), o = !os(t) || t !== this._$AH && t !== Di, o && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        h = wn(this, a[n + l], e, l), h === Di && (h = this._$AH[l]), o || (o = !os(h) || h !== this._$AH[l]), h === mt ? t = mt : t !== mt && (t += (h != null ? h : "") + r[l + 1]), this._$AH[l] = h;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === mt ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class xd extends Wr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === mt ? void 0 : t;
  }
}
const vd = Mn ? Mn.emptyScript : "";
class Cd extends Wr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== mt ? this.element.setAttribute(this.name, vd) : this.element.removeAttribute(this.name);
  }
}
class Md extends Wr {
  constructor(t, e, n, s, r) {
    super(t, e, n, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    var n;
    if ((t = (n = wn(this, t, e, 0)) !== null && n !== void 0 ? n : mt) === Di)
      return;
    const s = this._$AH, r = t === mt && s !== mt || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== mt && (s === mt || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, n;
    typeof this._$AH == "function" ? this._$AH.call((n = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && n !== void 0 ? n : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ed {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    wn(this, t);
  }
}
const Nl = mr.litHtmlPolyfillSupport;
Nl == null || Nl(as, Ms), ((po = mr.litHtmlVersions) !== null && po !== void 0 ? po : mr.litHtmlVersions = []).push("2.5.0");
const wd = (i, t, e) => {
  var n, s;
  const r = (n = e == null ? void 0 : e.renderBefore) !== null && n !== void 0 ? n : t;
  let o = r._$litPart$;
  if (o === void 0) {
    const a = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    r._$litPart$ = o = new Ms(t.insertBefore(rs(), a), a, void 0, e != null ? e : {});
  }
  return o._$AI(i), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var yo, xo;
class Zt extends rn {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const n = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = n.firstChild), n;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = wd(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return Di;
  }
}
Zt.finalized = !0, Zt._$litElement$ = !0, (yo = globalThis.litElementHydrateSupport) === null || yo === void 0 || yo.call(globalThis, { LitElement: Zt });
const kl = globalThis.litElementPolyfillSupport;
kl == null || kl({ LitElement: Zt });
((xo = globalThis.litElementVersions) !== null && xo !== void 0 ? xo : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ve = (i) => (t) => typeof t == "function" ? ((e, n) => (customElements.define(e, n), n))(i, t) : ((e, n) => {
  const { kind: s, elements: r } = n;
  return { kind: s, elements: r, finisher(o) {
    customElements.define(e, o);
  } };
})(i, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Sd = (i, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, i);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, i);
} };
function Ee(i) {
  return (t, e) => e !== void 0 ? ((n, s, r) => {
    s.constructor.createProperty(r, n);
  })(i, t, e) : Sd(i, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function we(i) {
  return Ee({ ...i, state: !0 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Td = ({ finisher: i, descriptor: t }) => (e, n) => {
  var s;
  if (n === void 0) {
    const r = (s = e.originalKey) !== null && s !== void 0 ? s : e.key, o = t != null ? { kind: "method", placement: "prototype", key: r, descriptor: t(e.key) } : { ...e, key: r };
    return i != null && (o.finisher = function(a) {
      i(a, r);
    }), o;
  }
  {
    const r = e.constructor;
    t !== void 0 && Object.defineProperty(e, n, t(n)), i == null || i(r, n);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function bd(i, t) {
  return Td({ descriptor: (e) => {
    const n = { get() {
      var s, r;
      return (r = (s = this.renderRoot) === null || s === void 0 ? void 0 : s.querySelector(i)) !== null && r !== void 0 ? r : null;
    }, enumerable: !0, configurable: !0 };
    if (t) {
      const s = typeof e == "symbol" ? Symbol() : "__" + e;
      n.get = function() {
        var r, o;
        return this[s] === void 0 && (this[s] = (o = (r = this.renderRoot) === null || r === void 0 ? void 0 : r.querySelector(i)) !== null && o !== void 0 ? o : null), this[s];
      };
    }
    return n;
  } });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var vo;
((vo = window.HTMLSlotElement) === null || vo === void 0 ? void 0 : vo.prototype.assignedElements) != null;
class Rd {
  constructor(t) {
    this.propagationStopped, this.defaultPrevented, this.type = t, this.target = null;
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
  stopPropagation() {
    this.propagationStopped = !0;
  }
}
const ie = Rd, Sn = {
  PROPERTYCHANGE: "propertychange"
};
class Id {
  constructor() {
    this.disposed = !1;
  }
  dispose() {
    this.disposed || (this.disposed = !0, this.disposeInternal());
  }
  disposeInternal() {
  }
}
const Ca = Id;
function Ld(i, t, e) {
  let n, s;
  e = e || Ni;
  let r = 0, o = i.length, a = !1;
  for (; r < o; )
    n = r + (o - r >> 1), s = +e(i[n], t), s < 0 ? r = n + 1 : (o = n, a = !s);
  return a ? r : ~r;
}
function Ni(i, t) {
  return i > t ? 1 : i < t ? -1 : 0;
}
function Ma(i, t, e) {
  const n = i.length;
  if (i[0] <= t)
    return 0;
  if (t <= i[n - 1])
    return n - 1;
  {
    let s;
    if (e > 0) {
      for (s = 1; s < n; ++s)
        if (i[s] < t)
          return s - 1;
    } else if (e < 0) {
      for (s = 1; s < n; ++s)
        if (i[s] <= t)
          return s;
    } else
      for (s = 1; s < n; ++s) {
        if (i[s] == t)
          return s;
        if (i[s] < t)
          return typeof e == "function" ? e(t, i[s - 1], i[s]) > 0 ? s - 1 : s : i[s - 1] - t < t - i[s] ? s - 1 : s;
      }
    return n - 1;
  }
}
function Pd(i, t, e) {
  for (; t < e; ) {
    const n = i[t];
    i[t] = i[e], i[e] = n, ++t, --e;
  }
}
function ye(i, t) {
  const e = Array.isArray(t) ? t : [t], n = e.length;
  for (let s = 0; s < n; s++)
    i[i.length] = e[s];
}
function xi(i, t) {
  const e = i.length;
  if (e !== t.length)
    return !1;
  for (let n = 0; n < e; n++)
    if (i[n] !== t[n])
      return !1;
  return !0;
}
function Ad(i, t, e) {
  const n = t || Ni;
  return i.every(function(s, r) {
    if (r === 0)
      return !0;
    const o = n(i[r - 1], s);
    return !(o > 0 || e && o === 0);
  });
}
function ki() {
  return !0;
}
function Wi() {
  return !1;
}
function Gi() {
}
function Od(i) {
  let t = !1, e, n, s;
  return function() {
    const r = Array.prototype.slice.call(arguments);
    return (!t || this !== s || !xi(r, n)) && (t = !0, s = this, n = r, e = i.apply(this, arguments)), e;
  };
}
function Es(i) {
  for (const t in i)
    delete i[t];
}
function Tn(i) {
  let t;
  for (t in i)
    return !1;
  return !t;
}
class Fd extends Ca {
  constructor(t) {
    super(), this.eventTarget_ = t, this.pendingRemovals_ = null, this.dispatching_ = null, this.listeners_ = null;
  }
  addEventListener(t, e) {
    if (!t || !e)
      return;
    const n = this.listeners_ || (this.listeners_ = {}), s = n[t] || (n[t] = []);
    s.includes(e) || s.push(e);
  }
  dispatchEvent(t) {
    const e = typeof t == "string", n = e ? t : t.type, s = this.listeners_ && this.listeners_[n];
    if (!s)
      return;
    const r = e ? new ie(t) : t;
    r.target || (r.target = this.eventTarget_ || this);
    const o = this.dispatching_ || (this.dispatching_ = {}), a = this.pendingRemovals_ || (this.pendingRemovals_ = {});
    n in o || (o[n] = 0, a[n] = 0), ++o[n];
    let l;
    for (let h = 0, c = s.length; h < c; ++h)
      if ("handleEvent" in s[h] ? l = s[h].handleEvent(r) : l = s[h].call(this, r), l === !1 || r.propagationStopped) {
        l = !1;
        break;
      }
    if (--o[n] === 0) {
      let h = a[n];
      for (delete a[n]; h--; )
        this.removeEventListener(n, Gi);
      delete o[n];
    }
    return l;
  }
  disposeInternal() {
    this.listeners_ && Es(this.listeners_);
  }
  getListeners(t) {
    return this.listeners_ && this.listeners_[t] || void 0;
  }
  hasListener(t) {
    return this.listeners_ ? t ? t in this.listeners_ : Object.keys(this.listeners_).length > 0 : !1;
  }
  removeEventListener(t, e) {
    const n = this.listeners_ && this.listeners_[t];
    if (n) {
      const s = n.indexOf(e);
      s !== -1 && (this.pendingRemovals_ && t in this.pendingRemovals_ ? (n[s] = Gi, ++this.pendingRemovals_[t]) : (n.splice(s, 1), n.length === 0 && delete this.listeners_[t]));
    }
  }
}
const Ur = Fd, $ = {
  CHANGE: "change",
  ERROR: "error",
  BLUR: "blur",
  CLEAR: "clear",
  CONTEXTMENU: "contextmenu",
  CLICK: "click",
  DBLCLICK: "dblclick",
  DRAGENTER: "dragenter",
  DRAGOVER: "dragover",
  DROP: "drop",
  FOCUS: "focus",
  KEYDOWN: "keydown",
  KEYPRESS: "keypress",
  LOAD: "load",
  RESIZE: "resize",
  TOUCHMOVE: "touchmove",
  WHEEL: "wheel"
};
function W(i, t, e, n, s) {
  if (n && n !== i && (e = e.bind(n)), s) {
    const o = e;
    e = function() {
      i.removeEventListener(t, e), o.apply(this, arguments);
    };
  }
  const r = {
    target: i,
    type: t,
    listener: e
  };
  return i.addEventListener(t, e), r;
}
function _r(i, t, e, n) {
  return W(i, t, e, n, !0);
}
function it(i) {
  i && i.target && (i.target.removeEventListener(i.type, i.listener), Es(i));
}
class Zr extends Ur {
  constructor() {
    super(), this.on = this.onInternal, this.once = this.onceInternal, this.un = this.unInternal, this.revision_ = 0;
  }
  changed() {
    ++this.revision_, this.dispatchEvent($.CHANGE);
  }
  getRevision() {
    return this.revision_;
  }
  onInternal(t, e) {
    if (Array.isArray(t)) {
      const n = t.length, s = new Array(n);
      for (let r = 0; r < n; ++r)
        s[r] = W(this, t[r], e);
      return s;
    } else
      return W(this, t, e);
  }
  onceInternal(t, e) {
    let n;
    if (Array.isArray(t)) {
      const s = t.length;
      n = new Array(s);
      for (let r = 0; r < s; ++r)
        n[r] = _r(this, t[r], e);
    } else
      n = _r(this, t, e);
    return e.ol_key = n, n;
  }
  unInternal(t, e) {
    const n = e.ol_key;
    if (n)
      Dd(n);
    else if (Array.isArray(t))
      for (let s = 0, r = t.length; s < r; ++s)
        this.removeEventListener(t[s], e);
    else
      this.removeEventListener(t, e);
  }
}
Zr.prototype.on;
Zr.prototype.once;
Zr.prototype.un;
function Dd(i) {
  if (Array.isArray(i))
    for (let t = 0, e = i.length; t < e; ++t)
      it(i[t]);
  else
    it(i);
}
const hc = Zr;
function z() {
  throw new Error("Unimplemented abstract method.");
}
let Nd = 0;
function j(i) {
  return i.ol_uid || (i.ol_uid = String(++Nd));
}
class Gl extends ie {
  constructor(t, e, n) {
    super(t), this.key = e, this.oldValue = n;
  }
}
class kd extends hc {
  constructor(t) {
    super(), this.on, this.once, this.un, j(this), this.values_ = null, t !== void 0 && this.setProperties(t);
  }
  get(t) {
    let e;
    return this.values_ && this.values_.hasOwnProperty(t) && (e = this.values_[t]), e;
  }
  getKeys() {
    return this.values_ && Object.keys(this.values_) || [];
  }
  getProperties() {
    return this.values_ && Object.assign({}, this.values_) || {};
  }
  hasProperties() {
    return !!this.values_;
  }
  notify(t, e) {
    let n;
    n = `change:${t}`, this.hasListener(n) && this.dispatchEvent(new Gl(n, t, e)), n = Sn.PROPERTYCHANGE, this.hasListener(n) && this.dispatchEvent(new Gl(n, t, e));
  }
  addChangeListener(t, e) {
    this.addEventListener(`change:${t}`, e);
  }
  removeChangeListener(t, e) {
    this.removeEventListener(`change:${t}`, e);
  }
  set(t, e, n) {
    const s = this.values_ || (this.values_ = {});
    if (n)
      s[t] = e;
    else {
      const r = s[t];
      s[t] = e, r !== e && this.notify(t, r);
    }
  }
  setProperties(t, e) {
    for (const n in t)
      this.set(n, t[n], e);
  }
  applyProperties(t) {
    !t.values_ || Object.assign(this.values_ || (this.values_ = {}), t.values_);
  }
  unset(t, e) {
    if (this.values_ && t in this.values_) {
      const n = this.values_[t];
      delete this.values_[t], Tn(this.values_) && (this.values_ = null), e || this.notify(t, n);
    }
  }
}
const fe = kd, Gd = {
  1: "The view center is not defined",
  2: "The view resolution is not defined",
  3: "The view rotation is not defined",
  4: "`image` and `src` cannot be provided at the same time",
  5: "`imgSize` must be set when `image` is provided",
  7: "`format` must be set when `url` is set",
  8: "Unknown `serverType` configured",
  9: "`url` must be configured or set using `#setUrl()`",
  10: "The default `geometryFunction` can only handle `Point` geometries",
  11: "`options.featureTypes` must be an Array",
  12: "`options.geometryName` must also be provided when `options.bbox` is set",
  13: "Invalid corner",
  14: "Invalid color",
  15: "Tried to get a value for a key that does not exist in the cache",
  16: "Tried to set a value for a key that is used already",
  17: "`resolutions` must be sorted in descending order",
  18: "Either `origin` or `origins` must be configured, never both",
  19: "Number of `tileSizes` and `resolutions` must be equal",
  20: "Number of `origins` and `resolutions` must be equal",
  22: "Either `tileSize` or `tileSizes` must be configured, never both",
  24: "Invalid extent or geometry provided as `geometry`",
  25: "Cannot fit empty extent provided as `geometry`",
  26: "Features must have an id set",
  27: "Features must have an id set",
  28: '`renderMode` must be `"hybrid"` or `"vector"`',
  30: "The passed `feature` was already added to the source",
  31: "Tried to enqueue an `element` that was already added to the queue",
  32: "Transformation matrix cannot be inverted",
  33: "Invalid units",
  34: "Invalid geometry layout",
  36: "Unknown SRS type",
  37: "Unknown geometry type found",
  38: "`styleMapValue` has an unknown type",
  39: "Unknown geometry type",
  40: "Expected `feature` to have a geometry",
  41: "Expected an `ol/style/Style` or an array of `ol/style/Style.js`",
  42: "Question unknown, the answer is 42",
  43: "Expected `layers` to be an array or a `Collection`",
  47: "Expected `controls` to be an array or an `ol/Collection`",
  48: "Expected `interactions` to be an array or an `ol/Collection`",
  49: "Expected `overlays` to be an array or an `ol/Collection`",
  50: "`options.featureTypes` should be an Array",
  51: "Either `url` or `tileJSON` options must be provided",
  52: "Unknown `serverType` configured",
  53: "Unknown `tierSizeCalculation` configured",
  55: "The {-y} placeholder requires a tile grid with extent",
  56: "mapBrowserEvent must originate from a pointer event",
  57: "At least 2 conditions are required",
  59: "Invalid command found in the PBF",
  60: "Missing or invalid `size`",
  61: "Cannot determine IIIF Image API version from provided image information JSON",
  62: "A `WebGLArrayBuffer` must either be of type `ELEMENT_ARRAY_BUFFER` or `ARRAY_BUFFER`",
  64: "Layer opacity must be a number",
  66: "`forEachFeatureAtCoordinate` cannot be used on a WebGL layer if the hit detection logic has not been enabled. This is done by providing adequate shaders using the `hitVertexShader` and `hitFragmentShader` properties of `WebGLPointsLayerRenderer`",
  67: "A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both",
  68: "A VectorTile source can only be rendered if it has a projection compatible with the view projection"
};
class $d extends Error {
  constructor(t) {
    const e = Gd[t];
    super(e), this.code = t, this.name = "AssertionError", this.message = e;
  }
}
const cc = $d, Et = {
  ADD: "add",
  REMOVE: "remove"
}, $l = {
  LENGTH: "length"
};
class Ws extends ie {
  constructor(t, e, n) {
    super(t), this.element = e, this.index = n;
  }
}
class Bd extends fe {
  constructor(t, e) {
    if (super(), this.on, this.once, this.un, e = e || {}, this.unique_ = !!e.unique, this.array_ = t || [], this.unique_)
      for (let n = 0, s = this.array_.length; n < s; ++n)
        this.assertUnique_(this.array_[n], n);
    this.updateLength_();
  }
  clear() {
    for (; this.getLength() > 0; )
      this.pop();
  }
  extend(t) {
    for (let e = 0, n = t.length; e < n; ++e)
      this.push(t[e]);
    return this;
  }
  forEach(t) {
    const e = this.array_;
    for (let n = 0, s = e.length; n < s; ++n)
      t(e[n], n, e);
  }
  getArray() {
    return this.array_;
  }
  item(t) {
    return this.array_[t];
  }
  getLength() {
    return this.get($l.LENGTH);
  }
  insertAt(t, e) {
    if (t < 0 || t > this.getLength())
      throw new Error("Index out of bounds: " + t);
    this.unique_ && this.assertUnique_(e), this.array_.splice(t, 0, e), this.updateLength_(), this.dispatchEvent(
      new Ws(Et.ADD, e, t)
    );
  }
  pop() {
    return this.removeAt(this.getLength() - 1);
  }
  push(t) {
    this.unique_ && this.assertUnique_(t);
    const e = this.getLength();
    return this.insertAt(e, t), this.getLength();
  }
  remove(t) {
    const e = this.array_;
    for (let n = 0, s = e.length; n < s; ++n)
      if (e[n] === t)
        return this.removeAt(n);
  }
  removeAt(t) {
    if (t < 0 || t >= this.getLength())
      return;
    const e = this.array_[t];
    return this.array_.splice(t, 1), this.updateLength_(), this.dispatchEvent(
      new Ws(Et.REMOVE, e, t)
    ), e;
  }
  setAt(t, e) {
    const n = this.getLength();
    if (t >= n) {
      this.insertAt(t, e);
      return;
    }
    if (t < 0)
      throw new Error("Index out of bounds: " + t);
    this.unique_ && this.assertUnique_(e, t);
    const s = this.array_[t];
    this.array_[t] = e, this.dispatchEvent(
      new Ws(Et.REMOVE, s, t)
    ), this.dispatchEvent(
      new Ws(Et.ADD, e, t)
    );
  }
  updateLength_() {
    this.set($l.LENGTH, this.array_.length);
  }
  assertUnique_(t, e) {
    for (let n = 0, s = this.array_.length; n < s; ++n)
      if (this.array_[n] === t && n !== e)
        throw new cc(58);
  }
}
const te = Bd, ci = typeof navigator < "u" && typeof navigator.userAgent < "u" ? navigator.userAgent.toLowerCase() : "", zd = ci.includes("firefox"), Vd = ci.includes("safari") && !ci.includes("chrom");
Vd && (ci.includes("version/15.4") || /cpu (os|iphone os) 15_4 like mac os x/.test(ci));
const jd = ci.includes("webkit") && !ci.includes("edge"), Wd = ci.includes("macintosh"), uc = typeof devicePixelRatio < "u" ? devicePixelRatio : 1, Ea = typeof WorkerGlobalScope < "u" && typeof OffscreenCanvas < "u" && self instanceof WorkerGlobalScope, Ud = typeof Image < "u" && Image.prototype.decode, dc = function() {
  let i = !1;
  try {
    const t = Object.defineProperty({}, "passive", {
      get: function() {
        i = !0;
      }
    });
    window.addEventListener("_", null, t), window.removeEventListener("_", null, t);
  } catch {
  }
  return i;
}();
function Z(i, t) {
  if (!i)
    throw new cc(t);
}
new Array(6);
function xe() {
  return [1, 0, 0, 1, 0, 0];
}
function Zd(i, t, e, n, s, r, o) {
  return i[0] = t, i[1] = e, i[2] = n, i[3] = s, i[4] = r, i[5] = o, i;
}
function Xd(i, t) {
  return i[0] = t[0], i[1] = t[1], i[2] = t[2], i[3] = t[3], i[4] = t[4], i[5] = t[5], i;
}
function Mt(i, t) {
  const e = t[0], n = t[1];
  return t[0] = i[0] * e + i[2] * n + i[4], t[1] = i[1] * e + i[3] * n + i[5], t;
}
function Hd(i, t, e) {
  return Zd(i, t, 0, 0, e, 0, 0);
}
function ui(i, t, e, n, s, r, o, a) {
  const l = Math.sin(r), h = Math.cos(r);
  return i[0] = n * h, i[1] = s * l, i[2] = -n * l, i[3] = s * h, i[4] = o * n * h - a * n * l + t, i[5] = o * s * l + a * s * h + e, i;
}
function wa(i, t) {
  const e = Yd(t);
  Z(e !== 0, 32);
  const n = t[0], s = t[1], r = t[2], o = t[3], a = t[4], l = t[5];
  return i[0] = o / e, i[1] = -s / e, i[2] = -r / e, i[3] = n / e, i[4] = (r * l - o * a) / e, i[5] = -(n * l - s * a) / e, i;
}
function Yd(i) {
  return i[0] * i[3] - i[1] * i[2];
}
let Bl;
function fc(i) {
  const t = "matrix(" + i.join(", ") + ")";
  if (Ea)
    return t;
  const e = Bl || (Bl = document.createElement("div"));
  return e.style.transform = t, e.style.transform;
}
const Ct = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
};
function bt(i) {
  const t = Gt();
  for (let e = 0, n = i.length; e < n; ++e)
    ts(t, i[e]);
  return t;
}
function qd(i, t, e) {
  const n = Math.min.apply(null, i), s = Math.min.apply(null, t), r = Math.max.apply(null, i), o = Math.max.apply(null, t);
  return de(n, s, r, o, e);
}
function ws(i, t, e) {
  return e ? (e[0] = i[0] - t, e[1] = i[1] - t, e[2] = i[2] + t, e[3] = i[3] + t, e) : [
    i[0] - t,
    i[1] - t,
    i[2] + t,
    i[3] + t
  ];
}
function gc(i, t) {
  return t ? (t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t) : i.slice();
}
function Ui(i, t, e) {
  let n, s;
  return t < i[0] ? n = i[0] - t : i[2] < t ? n = t - i[2] : n = 0, e < i[1] ? s = i[1] - e : i[3] < e ? s = e - i[3] : s = 0, n * n + s * s;
}
function Xr(i, t) {
  return Sa(i, t[0], t[1]);
}
function bi(i, t) {
  return i[0] <= t[0] && t[2] <= i[2] && i[1] <= t[1] && t[3] <= i[3];
}
function Sa(i, t, e) {
  return i[0] <= t && t <= i[2] && i[1] <= e && e <= i[3];
}
function Wo(i, t) {
  const e = i[0], n = i[1], s = i[2], r = i[3], o = t[0], a = t[1];
  let l = Ct.UNKNOWN;
  return o < e ? l = l | Ct.LEFT : o > s && (l = l | Ct.RIGHT), a < n ? l = l | Ct.BELOW : a > r && (l = l | Ct.ABOVE), l === Ct.UNKNOWN && (l = Ct.INTERSECTING), l;
}
function Gt() {
  return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
}
function de(i, t, e, n, s) {
  return s ? (s[0] = i, s[1] = t, s[2] = e, s[3] = n, s) : [i, t, e, n];
}
function Ss(i) {
  return de(1 / 0, 1 / 0, -1 / 0, -1 / 0, i);
}
function Qn(i, t) {
  const e = i[0], n = i[1];
  return de(e, n, e, n, t);
}
function mc(i, t, e, n, s) {
  const r = Ss(s);
  return pc(r, i, t, e, n);
}
function ls(i, t) {
  return i[0] == t[0] && i[2] == t[2] && i[1] == t[1] && i[3] == t[3];
}
function _c(i, t) {
  return t[0] < i[0] && (i[0] = t[0]), t[2] > i[2] && (i[2] = t[2]), t[1] < i[1] && (i[1] = t[1]), t[3] > i[3] && (i[3] = t[3]), i;
}
function ts(i, t) {
  t[0] < i[0] && (i[0] = t[0]), t[0] > i[2] && (i[2] = t[0]), t[1] < i[1] && (i[1] = t[1]), t[1] > i[3] && (i[3] = t[1]);
}
function pc(i, t, e, n, s) {
  for (; e < n; e += s)
    Kd(i, t[e], t[e + 1]);
  return i;
}
function Kd(i, t, e) {
  i[0] = Math.min(i[0], t), i[1] = Math.min(i[1], e), i[2] = Math.max(i[2], t), i[3] = Math.max(i[3], e);
}
function Ta(i, t) {
  let e;
  return e = t(Hr(i)), e || (e = t(Yr(i)), e) || (e = t(qr(i)), e) || (e = t(Zi(i)), e) ? e : !1;
}
function Uo(i) {
  let t = 0;
  return ba(i) || (t = at(i) * Ce(i)), t;
}
function Hr(i) {
  return [i[0], i[1]];
}
function Yr(i) {
  return [i[2], i[1]];
}
function di(i) {
  return [(i[0] + i[2]) / 2, (i[1] + i[3]) / 2];
}
function Jd(i, t) {
  let e;
  return t === "bottom-left" ? e = Hr(i) : t === "bottom-right" ? e = Yr(i) : t === "top-left" ? e = Zi(i) : t === "top-right" ? e = qr(i) : Z(!1, 13), e;
}
function Zo(i, t, e, n, s) {
  const [r, o, a, l, h, c, u, d] = Xo(
    i,
    t,
    e,
    n
  );
  return de(
    Math.min(r, a, h, u),
    Math.min(o, l, c, d),
    Math.max(r, a, h, u),
    Math.max(o, l, c, d),
    s
  );
}
function Xo(i, t, e, n) {
  const s = t * n[0] / 2, r = t * n[1] / 2, o = Math.cos(e), a = Math.sin(e), l = s * o, h = s * a, c = r * o, u = r * a, d = i[0], f = i[1];
  return [
    d - l + u,
    f - h - c,
    d - l - u,
    f - h + c,
    d + l - u,
    f + h + c,
    d + l + u,
    f + h - c,
    d - l + u,
    f - h - c
  ];
}
function Ce(i) {
  return i[3] - i[1];
}
function es(i, t, e) {
  const n = e || Gt();
  return Ot(i, t) ? (i[0] > t[0] ? n[0] = i[0] : n[0] = t[0], i[1] > t[1] ? n[1] = i[1] : n[1] = t[1], i[2] < t[2] ? n[2] = i[2] : n[2] = t[2], i[3] < t[3] ? n[3] = i[3] : n[3] = t[3]) : Ss(n), n;
}
function Zi(i) {
  return [i[0], i[3]];
}
function qr(i) {
  return [i[2], i[3]];
}
function at(i) {
  return i[2] - i[0];
}
function Ot(i, t) {
  return i[0] <= t[2] && i[2] >= t[0] && i[1] <= t[3] && i[3] >= t[1];
}
function ba(i) {
  return i[2] < i[0] || i[3] < i[1];
}
function Qd(i, t) {
  return t ? (t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t) : i;
}
function tf(i, t, e) {
  let n = !1;
  const s = Wo(i, t), r = Wo(i, e);
  if (s === Ct.INTERSECTING || r === Ct.INTERSECTING)
    n = !0;
  else {
    const o = i[0], a = i[1], l = i[2], h = i[3], c = t[0], u = t[1], d = e[0], f = e[1], g = (f - u) / (d - c);
    let m, _;
    !!(r & Ct.ABOVE) && !(s & Ct.ABOVE) && (m = d - (f - h) / g, n = m >= o && m <= l), !n && !!(r & Ct.RIGHT) && !(s & Ct.RIGHT) && (_ = f - (d - l) * g, n = _ >= a && _ <= h), !n && !!(r & Ct.BELOW) && !(s & Ct.BELOW) && (m = d - (f - a) / g, n = m >= o && m <= l), !n && !!(r & Ct.LEFT) && !(s & Ct.LEFT) && (_ = f - (d - o) * g, n = _ >= a && _ <= h);
  }
  return n;
}
function ef(i, t, e, n) {
  let s = [];
  if (n > 1) {
    const a = i[2] - i[0], l = i[3] - i[1];
    for (let h = 0; h < n; ++h)
      s.push(
        i[0] + a * h / n,
        i[1],
        i[2],
        i[1] + l * h / n,
        i[2] - a * h / n,
        i[3],
        i[0],
        i[3] - l * h / n
      );
  } else
    s = [
      i[0],
      i[1],
      i[2],
      i[1],
      i[2],
      i[3],
      i[0],
      i[3]
    ];
  t(s, s, 2);
  const r = [], o = [];
  for (let a = 0, l = s.length; a < l; a += 2)
    r.push(s[a]), o.push(s[a + 1]);
  return qd(r, o, e);
}
function yc(i, t) {
  const e = t.getExtent(), n = di(i);
  if (t.canWrapX() && (n[0] < e[0] || n[0] >= e[2])) {
    const s = at(e), o = Math.floor(
      (n[0] - e[0]) / s
    ) * s;
    i[0] -= o, i[2] -= o;
  }
  return i;
}
function nf(i, t) {
  if (t.canWrapX()) {
    const e = t.getExtent();
    if (!isFinite(i[0]) || !isFinite(i[2]))
      return [[e[0], i[1], e[2], i[3]]];
    yc(i, t);
    const n = at(e);
    if (at(i) > n)
      return [[e[0], i[1], e[2], i[3]]];
    if (i[0] < e[0])
      return [
        [i[0] + n, i[1], e[2], i[3]],
        [e[0], i[1], i[2], i[3]]
      ];
    if (i[2] > e[2])
      return [
        [i[0], i[1], e[2], i[3]],
        [e[0], i[1], i[2] - n, i[3]]
      ];
  }
  return [i];
}
function gt(i, t, e) {
  return Math.min(Math.max(i, t), e);
}
function sf(i, t, e, n, s, r) {
  const o = s - e, a = r - n;
  if (o !== 0 || a !== 0) {
    const l = ((i - e) * o + (t - n) * a) / (o * o + a * a);
    l > 1 ? (e = s, n = r) : l > 0 && (e += o * l, n += a * l);
  }
  return ke(i, t, e, n);
}
function ke(i, t, e, n) {
  const s = e - i, r = n - t;
  return s * s + r * r;
}
function rf(i) {
  const t = i.length;
  for (let n = 0; n < t; n++) {
    let s = n, r = Math.abs(i[n][n]);
    for (let a = n + 1; a < t; a++) {
      const l = Math.abs(i[a][n]);
      l > r && (r = l, s = a);
    }
    if (r === 0)
      return null;
    const o = i[s];
    i[s] = i[n], i[n] = o;
    for (let a = n + 1; a < t; a++) {
      const l = -i[a][n] / i[n][n];
      for (let h = n; h < t + 1; h++)
        n == h ? i[a][h] = 0 : i[a][h] += l * i[n][h];
    }
  }
  const e = new Array(t);
  for (let n = t - 1; n >= 0; n--) {
    e[n] = i[n][t] / i[n][n];
    for (let s = n - 1; s >= 0; s--)
      i[s][t] -= i[s][n] * e[n];
  }
  return e;
}
function zl(i) {
  return i * 180 / Math.PI;
}
function Pi(i) {
  return i * Math.PI / 180;
}
function Ai(i, t) {
  const e = i % t;
  return e * t < 0 ? e + t : e;
}
function De(i, t, e) {
  return i + e * (t - i);
}
function Ra(i, t) {
  const e = Math.pow(10, t);
  return Math.round(i * e) / e;
}
function Us(i, t) {
  return Math.floor(Ra(i, t));
}
function Zs(i, t) {
  return Math.ceil(Ra(i, t));
}
const of = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i, af = /^([a-z]*)$|^hsla?\(.*\)$/i;
function xc(i) {
  return typeof i == "string" ? i : vc(i);
}
function lf(i) {
  const t = document.createElement("div");
  if (t.style.color = i, t.style.color !== "") {
    document.body.appendChild(t);
    const e = getComputedStyle(t).color;
    return document.body.removeChild(t), e;
  } else
    return "";
}
const hf = function() {
  const t = {};
  let e = 0;
  return function(n) {
    let s;
    if (t.hasOwnProperty(n))
      s = t[n];
    else {
      if (e >= 1024) {
        let r = 0;
        for (const o in t)
          (r++ & 3) === 0 && (delete t[o], --e);
      }
      s = cf(n), t[n] = s, ++e;
    }
    return s;
  };
}();
function pr(i) {
  return Array.isArray(i) ? i : hf(i);
}
function cf(i) {
  let t, e, n, s, r;
  if (af.exec(i) && (i = lf(i)), of.exec(i)) {
    const o = i.length - 1;
    let a;
    o <= 4 ? a = 1 : a = 2;
    const l = o === 4 || o === 8;
    t = parseInt(i.substr(1 + 0 * a, a), 16), e = parseInt(i.substr(1 + 1 * a, a), 16), n = parseInt(i.substr(1 + 2 * a, a), 16), l ? s = parseInt(i.substr(1 + 3 * a, a), 16) : s = 255, a == 1 && (t = (t << 4) + t, e = (e << 4) + e, n = (n << 4) + n, l && (s = (s << 4) + s)), r = [t, e, n, s / 255];
  } else
    i.startsWith("rgba(") ? (r = i.slice(5, -1).split(",").map(Number), Vl(r)) : i.startsWith("rgb(") ? (r = i.slice(4, -1).split(",").map(Number), r.push(1), Vl(r)) : Z(!1, 14);
  return r;
}
function Vl(i) {
  return i[0] = gt(i[0] + 0.5 | 0, 0, 255), i[1] = gt(i[1] + 0.5 | 0, 0, 255), i[2] = gt(i[2] + 0.5 | 0, 0, 255), i[3] = gt(i[3], 0, 1), i;
}
function vc(i) {
  let t = i[0];
  t != (t | 0) && (t = t + 0.5 | 0);
  let e = i[1];
  e != (e | 0) && (e = e + 0.5 | 0);
  let n = i[2];
  n != (n | 0) && (n = n + 0.5 | 0);
  const s = i[3] === void 0 ? 1 : Math.round(i[3] * 100) / 100;
  return "rgba(" + t + "," + e + "," + n + "," + s + ")";
}
class uf {
  constructor() {
    this.cache_ = {}, this.cacheSize_ = 0, this.maxCacheSize_ = 32;
  }
  clear() {
    this.cache_ = {}, this.cacheSize_ = 0;
  }
  canExpireCache() {
    return this.cacheSize_ > this.maxCacheSize_;
  }
  expire() {
    if (this.canExpireCache()) {
      let t = 0;
      for (const e in this.cache_) {
        const n = this.cache_[e];
        (t++ & 3) === 0 && !n.hasListener() && (delete this.cache_[e], --this.cacheSize_);
      }
    }
  }
  get(t, e, n) {
    const s = jl(t, e, n);
    return s in this.cache_ ? this.cache_[s] : null;
  }
  set(t, e, n, s) {
    const r = jl(t, e, n);
    this.cache_[r] = s, ++this.cacheSize_;
  }
  setSize(t) {
    this.maxCacheSize_ = t, this.expire();
  }
}
function jl(i, t, e) {
  const n = e ? xc(e) : "null";
  return t + ":" + i + ":" + n;
}
const yr = new uf(), tt = {
  OPACITY: "opacity",
  VISIBLE: "visible",
  EXTENT: "extent",
  Z_INDEX: "zIndex",
  MAX_RESOLUTION: "maxResolution",
  MIN_RESOLUTION: "minResolution",
  MAX_ZOOM: "maxZoom",
  MIN_ZOOM: "minZoom",
  SOURCE: "source",
  MAP: "map"
};
class df extends fe {
  constructor(t) {
    super(), this.on, this.once, this.un, this.background_ = t.background;
    const e = Object.assign({}, t);
    typeof t.properties == "object" && (delete e.properties, Object.assign(e, t.properties)), e[tt.OPACITY] = t.opacity !== void 0 ? t.opacity : 1, Z(typeof e[tt.OPACITY] == "number", 64), e[tt.VISIBLE] = t.visible !== void 0 ? t.visible : !0, e[tt.Z_INDEX] = t.zIndex, e[tt.MAX_RESOLUTION] = t.maxResolution !== void 0 ? t.maxResolution : 1 / 0, e[tt.MIN_RESOLUTION] = t.minResolution !== void 0 ? t.minResolution : 0, e[tt.MIN_ZOOM] = t.minZoom !== void 0 ? t.minZoom : -1 / 0, e[tt.MAX_ZOOM] = t.maxZoom !== void 0 ? t.maxZoom : 1 / 0, this.className_ = e.className !== void 0 ? e.className : "ol-layer", delete e.className, this.setProperties(e), this.state_ = null;
  }
  getBackground() {
    return this.background_;
  }
  getClassName() {
    return this.className_;
  }
  getLayerState(t) {
    const e = this.state_ || {
      layer: this,
      managed: t === void 0 ? !0 : t
    }, n = this.getZIndex();
    return e.opacity = gt(Math.round(this.getOpacity() * 100) / 100, 0, 1), e.visible = this.getVisible(), e.extent = this.getExtent(), e.zIndex = n === void 0 && !e.managed ? 1 / 0 : n, e.maxResolution = this.getMaxResolution(), e.minResolution = Math.max(this.getMinResolution(), 0), e.minZoom = this.getMinZoom(), e.maxZoom = this.getMaxZoom(), this.state_ = e, e;
  }
  getLayersArray(t) {
    return z();
  }
  getLayerStatesArray(t) {
    return z();
  }
  getExtent() {
    return this.get(tt.EXTENT);
  }
  getMaxResolution() {
    return this.get(tt.MAX_RESOLUTION);
  }
  getMinResolution() {
    return this.get(tt.MIN_RESOLUTION);
  }
  getMinZoom() {
    return this.get(tt.MIN_ZOOM);
  }
  getMaxZoom() {
    return this.get(tt.MAX_ZOOM);
  }
  getOpacity() {
    return this.get(tt.OPACITY);
  }
  getSourceState() {
    return z();
  }
  getVisible() {
    return this.get(tt.VISIBLE);
  }
  getZIndex() {
    return this.get(tt.Z_INDEX);
  }
  setBackground(t) {
    this.background_ = t, this.changed();
  }
  setExtent(t) {
    this.set(tt.EXTENT, t);
  }
  setMaxResolution(t) {
    this.set(tt.MAX_RESOLUTION, t);
  }
  setMinResolution(t) {
    this.set(tt.MIN_RESOLUTION, t);
  }
  setMaxZoom(t) {
    this.set(tt.MAX_ZOOM, t);
  }
  setMinZoom(t) {
    this.set(tt.MIN_ZOOM, t);
  }
  setOpacity(t) {
    Z(typeof t == "number", 64), this.set(tt.OPACITY, t);
  }
  setVisible(t) {
    this.set(tt.VISIBLE, t);
  }
  setZIndex(t) {
    this.set(tt.Z_INDEX, t);
  }
  disposeInternal() {
    this.state_ && (this.state_.layer = null, this.state_ = null), super.disposeInternal();
  }
}
const Cc = df, li = {
  PRERENDER: "prerender",
  POSTRENDER: "postrender",
  PRECOMPOSE: "precompose",
  POSTCOMPOSE: "postcompose",
  RENDERCOMPLETE: "rendercomplete"
};
class ff extends Cc {
  constructor(t) {
    const e = Object.assign({}, t);
    delete e.source, super(e), this.on, this.once, this.un, this.mapPrecomposeKey_ = null, this.mapRenderKey_ = null, this.sourceChangeKey_ = null, this.renderer_ = null, this.rendered = !1, t.render && (this.render = t.render), t.map && this.setMap(t.map), this.addChangeListener(
      tt.SOURCE,
      this.handleSourcePropertyChange_
    );
    const n = t.source ? t.source : null;
    this.setSource(n);
  }
  getLayersArray(t) {
    return t = t || [], t.push(this), t;
  }
  getLayerStatesArray(t) {
    return t = t || [], t.push(this.getLayerState()), t;
  }
  getSource() {
    return this.get(tt.SOURCE) || null;
  }
  getRenderSource() {
    return this.getSource();
  }
  getSourceState() {
    const t = this.getSource();
    return t ? t.getState() : "undefined";
  }
  handleSourceChange_() {
    this.changed();
  }
  handleSourcePropertyChange_() {
    this.sourceChangeKey_ && (it(this.sourceChangeKey_), this.sourceChangeKey_ = null);
    const t = this.getSource();
    t && (this.sourceChangeKey_ = W(
      t,
      $.CHANGE,
      this.handleSourceChange_,
      this
    )), this.changed();
  }
  getFeatures(t) {
    return this.renderer_ ? this.renderer_.getFeatures(t) : new Promise((e) => e([]));
  }
  getData(t) {
    return !this.renderer_ || !this.rendered ? null : this.renderer_.getData(t);
  }
  render(t, e) {
    const n = this.getRenderer();
    if (n.prepareFrame(t))
      return this.rendered = !0, n.renderFrame(t, e);
  }
  unrender() {
    this.rendered = !1;
  }
  setMapInternal(t) {
    t || this.unrender(), this.set(tt.MAP, t);
  }
  getMapInternal() {
    return this.get(tt.MAP);
  }
  setMap(t) {
    this.mapPrecomposeKey_ && (it(this.mapPrecomposeKey_), this.mapPrecomposeKey_ = null), t || this.changed(), this.mapRenderKey_ && (it(this.mapRenderKey_), this.mapRenderKey_ = null), t && (this.mapPrecomposeKey_ = W(
      t,
      li.PRECOMPOSE,
      function(e) {
        const s = e.frameState.layerStatesArray, r = this.getLayerState(!1);
        Z(
          !s.some(function(o) {
            return o.layer === r.layer;
          }),
          67
        ), s.push(r);
      },
      this
    ), this.mapRenderKey_ = W(this, $.CHANGE, t.render, t), this.changed());
  }
  setSource(t) {
    this.set(tt.SOURCE, t);
  }
  getRenderer() {
    return this.renderer_ || (this.renderer_ = this.createRenderer()), this.renderer_;
  }
  hasRenderer() {
    return !!this.renderer_;
  }
  createRenderer() {
    return null;
  }
  disposeInternal() {
    this.renderer_ && (this.renderer_.dispose(), delete this.renderer_), this.setSource(null), super.disposeInternal();
  }
}
function Ia(i, t) {
  if (!i.visible)
    return !1;
  const e = t.resolution;
  if (e < i.minResolution || e >= i.maxResolution)
    return !1;
  const n = t.zoom;
  return n > i.minZoom && n <= i.maxZoom;
}
const Kr = ff;
function Mc(i, t) {
  return i[0] += +t[0], i[1] += +t[1], i;
}
function gf(i, t) {
  const e = t.getRadius(), n = t.getCenter(), s = n[0], r = n[1], o = i[0], a = i[1];
  let l = o - s;
  const h = a - r;
  l === 0 && h === 0 && (l = 1);
  const c = Math.sqrt(l * l + h * h), u = s + e * l / c, d = r + e * h / c;
  return [u, d];
}
function La(i, t) {
  const e = i[0], n = i[1], s = t[0], r = t[1], o = s[0], a = s[1], l = r[0], h = r[1], c = l - o, u = h - a, d = c === 0 && u === 0 ? 0 : (c * (e - o) + u * (n - a)) / (c * c + u * u || 0);
  let f, g;
  return d <= 0 ? (f = o, g = a) : d >= 1 ? (f = l, g = h) : (f = o + d * c, g = a + d * u), [f, g];
}
function re(i, t) {
  let e = !0;
  for (let n = i.length - 1; n >= 0; --n)
    if (i[n] != t[n]) {
      e = !1;
      break;
    }
  return e;
}
function Pa(i, t) {
  const e = Math.cos(t), n = Math.sin(t), s = i[0] * e - i[1] * n, r = i[1] * e + i[0] * n;
  return i[0] = s, i[1] = r, i;
}
function Ec(i, t) {
  return i[0] *= t, i[1] *= t, i;
}
function Ge(i, t) {
  const e = i[0] - t[0], n = i[1] - t[1];
  return e * e + n * n;
}
function xr(i, t) {
  return Math.sqrt(Ge(i, t));
}
function mf(i, t) {
  return Ge(i, La(i, t));
}
function wc(i, t) {
  if (t.canWrapX()) {
    const e = at(t.getExtent()), n = _f(i, t, e);
    n && (i[0] -= n * e);
  }
  return i;
}
function _f(i, t, e) {
  const n = t.getExtent();
  let s = 0;
  return t.canWrapX() && (i[0] < n[0] || i[0] > n[2]) && (e = e || at(n), s = Math.floor(
    (i[0] - n[0]) / e
  )), s;
}
class pf extends Ca {
  constructor(t) {
    super(), this.map_ = t;
  }
  dispatchRenderEvent(t, e) {
    z();
  }
  calculateMatrices2D(t) {
    const e = t.viewState, n = t.coordinateToPixelTransform, s = t.pixelToCoordinateTransform;
    ui(
      n,
      t.size[0] / 2,
      t.size[1] / 2,
      1 / e.resolution,
      -1 / e.resolution,
      -e.rotation,
      -e.center[0],
      -e.center[1]
    ), wa(s, n);
  }
  forEachFeatureAtCoordinate(t, e, n, s, r, o, a, l) {
    let h;
    const c = e.viewState;
    function u(v, C, M, w) {
      return r.call(o, C, v ? M : null, w);
    }
    const d = c.projection, f = wc(t.slice(), d), g = [[0, 0]];
    if (d.canWrapX() && s) {
      const v = d.getExtent(), C = at(v);
      g.push([-C, 0], [C, 0]);
    }
    const m = e.layerStatesArray, _ = m.length, p = [], y = [];
    for (let v = 0; v < g.length; v++)
      for (let C = _ - 1; C >= 0; --C) {
        const M = m[C], w = M.layer;
        if (w.hasRenderer() && Ia(M, c) && a.call(l, w)) {
          const T = w.getRenderer(), P = w.getSource();
          if (T && P) {
            const F = P.getWrapX() ? f : t, G = u.bind(
              null,
              M.managed
            );
            y[0] = F[0] + g[v][0], y[1] = F[1] + g[v][1], h = T.forEachFeatureAtCoordinate(
              y,
              e,
              n,
              G,
              p
            );
          }
          if (h)
            return h;
        }
      }
    if (p.length === 0)
      return;
    const x = 1 / p.length;
    return p.forEach((v, C) => v.distanceSq += C * x), p.sort((v, C) => v.distanceSq - C.distanceSq), p.some((v) => h = v.callback(v.feature, v.layer, v.geometry)), h;
  }
  hasFeatureAtCoordinate(t, e, n, s, r, o) {
    return this.forEachFeatureAtCoordinate(
      t,
      e,
      n,
      s,
      ki,
      this,
      r,
      o
    ) !== void 0;
  }
  getMap() {
    return this.map_;
  }
  renderFrame(t) {
    z();
  }
  scheduleExpireIconCache(t) {
    yr.canExpireCache() && t.postRenderFunctions.push(yf);
  }
}
function yf(i, t) {
  yr.expire();
}
const xf = pf;
class vf extends ie {
  constructor(t, e, n, s) {
    super(t), this.inversePixelTransform = e, this.frameState = n, this.context = s;
  }
}
const Sc = vf, Xs = "ol-hidden", On = "ol-unselectable", Wl = "ol-unsupported", Jr = "ol-control", Ul = "ol-collapsed", Cf = new RegExp(
  [
    "^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)",
    "(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)",
    "(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)",
    "(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?",
    "(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))",
    "(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))",
    `?\\s*([-,\\"\\'\\sa-z]+?)\\s*$`
  ].join(""),
  "i"
), Zl = [
  "style",
  "variant",
  "weight",
  "size",
  "lineHeight",
  "family"
], Tc = function(i) {
  const t = i.match(Cf);
  if (!t)
    return null;
  const e = {
    lineHeight: "normal",
    size: "1.2em",
    style: "normal",
    weight: "normal",
    variant: "normal"
  };
  for (let n = 0, s = Zl.length; n < s; ++n) {
    const r = t[n + 1];
    r !== void 0 && (e[Zl[n]] = r);
  }
  return e.families = e.family.split(/,\s?/), e;
};
function Xt(i, t, e, n) {
  let s;
  return e && e.length ? s = e.shift() : Ea ? s = new OffscreenCanvas(i || 300, t || 300) : s = document.createElement("canvas"), i && (s.width = i), t && (s.height = t), s.getContext("2d", n);
}
function bc(i) {
  const t = i.canvas;
  t.width = 1, t.height = 1, i.clearRect(0, 0, 1, 1);
}
function vr(i, t) {
  const e = t.parentNode;
  e && e.replaceChild(i, t);
}
function Ho(i) {
  return i && i.parentNode ? i.parentNode.removeChild(i) : null;
}
function Mf(i) {
  for (; i.lastChild; )
    i.removeChild(i.lastChild);
}
function Ef(i, t) {
  const e = i.childNodes;
  for (let n = 0; ; ++n) {
    const s = e[n], r = t[n];
    if (!s && !r)
      break;
    if (s !== r) {
      if (!s) {
        i.appendChild(r);
        continue;
      }
      if (!r) {
        i.removeChild(s), --n;
        continue;
      }
      i.insertBefore(r, s);
    }
  }
}
const Rc = "10px sans-serif", $e = "#000", Cr = "round", hs = [], cs = 0, bn = "round", us = 10, ds = "#000", fs = "center", Mr = "middle", Ri = [0, 0, 0, 0], gs = 1, Oe = new fe();
let on = null, Yo;
const qo = {}, wf = function() {
  const t = "32px ", e = ["monospace", "serif"], n = e.length, s = "wmytzilWMYTZIL@#/&?$%10\uF013";
  let r, o;
  function a(h, c, u) {
    let d = !0;
    for (let f = 0; f < n; ++f) {
      const g = e[f];
      if (o = Er(
        h + " " + c + " " + t + g,
        s
      ), u != g) {
        const m = Er(
          h + " " + c + " " + t + u + "," + g,
          s
        );
        d = d && m != o;
      }
    }
    return !!d;
  }
  function l() {
    let h = !0;
    const c = Oe.getKeys();
    for (let u = 0, d = c.length; u < d; ++u) {
      const f = c[u];
      Oe.get(f) < 100 && (a.apply(this, f.split(`
`)) ? (Es(qo), on = null, Yo = void 0, Oe.set(f, 100)) : (Oe.set(f, Oe.get(f) + 1, !0), h = !1));
    }
    h && (clearInterval(r), r = void 0);
  }
  return function(h) {
    const c = Tc(h);
    if (!c)
      return;
    const u = c.families;
    for (let d = 0, f = u.length; d < f; ++d) {
      const g = u[d], m = c.style + `
` + c.weight + `
` + g;
      Oe.get(m) === void 0 && (Oe.set(m, 100, !0), a(c.style, c.weight, g) || (Oe.set(m, 0, !0), r === void 0 && (r = setInterval(l, 32))));
    }
  };
}(), Sf = function() {
  let i;
  return function(t) {
    let e = qo[t];
    if (e == null) {
      if (Ea) {
        const n = Tc(t), s = Ic(t, "\u017Dg");
        e = (isNaN(Number(n.lineHeight)) ? 1.2 : Number(n.lineHeight)) * (s.actualBoundingBoxAscent + s.actualBoundingBoxDescent);
      } else
        i || (i = document.createElement("div"), i.innerHTML = "M", i.style.minHeight = "0", i.style.maxHeight = "none", i.style.height = "auto", i.style.padding = "0", i.style.border = "none", i.style.position = "absolute", i.style.display = "block", i.style.left = "-99999px"), i.style.font = t, document.body.appendChild(i), e = i.offsetHeight, document.body.removeChild(i);
      qo[t] = e;
    }
    return e;
  };
}();
function Ic(i, t) {
  return on || (on = Xt(1, 1)), i != Yo && (on.font = i, Yo = on.font), on.measureText(t);
}
function Er(i, t) {
  return Ic(i, t).width;
}
function Xl(i, t, e) {
  if (t in e)
    return e[t];
  const n = t.split(`
`).reduce((s, r) => Math.max(s, Er(i, r)), 0);
  return e[t] = n, n;
}
function Tf(i, t) {
  const e = [], n = [], s = [];
  let r = 0, o = 0, a = 0, l = 0;
  for (let h = 0, c = t.length; h <= c; h += 2) {
    const u = t[h];
    if (u === `
` || h === c) {
      r = Math.max(r, o), s.push(o), o = 0, a += l;
      continue;
    }
    const d = t[h + 1] || i.font, f = Er(d, u);
    e.push(f), o += f;
    const g = Sf(d);
    n.push(g), l = Math.max(l, g);
  }
  return { width: r, height: a, widths: e, heights: n, lineWidths: s };
}
function bf(i, t, e, n, s, r, o, a, l, h, c) {
  i.save(), e !== 1 && (i.globalAlpha *= e), t && i.setTransform.apply(i, t), n.contextInstructions ? (i.translate(l, h), i.scale(c[0], c[1]), Rf(n, i)) : c[0] < 0 || c[1] < 0 ? (i.translate(l, h), i.scale(c[0], c[1]), i.drawImage(
    n,
    s,
    r,
    o,
    a,
    0,
    0,
    o,
    a
  )) : i.drawImage(
    n,
    s,
    r,
    o,
    a,
    l,
    h,
    o * c[0],
    a * c[1]
  ), i.restore();
}
function Rf(i, t) {
  const e = i.contextInstructions;
  for (let n = 0, s = e.length; n < s; n += 2)
    Array.isArray(e[n + 1]) ? t[e[n]].apply(
      t,
      e[n + 1]
    ) : t[e[n]] = e[n + 1];
}
class If extends xf {
  constructor(t) {
    super(t), this.fontChangeListenerKey_ = W(
      Oe,
      Sn.PROPERTYCHANGE,
      t.redrawText.bind(t)
    ), this.element_ = document.createElement("div");
    const e = this.element_.style;
    e.position = "absolute", e.width = "100%", e.height = "100%", e.zIndex = "0", this.element_.className = On + " ol-layers";
    const n = t.getViewport();
    n.insertBefore(this.element_, n.firstChild || null), this.children_ = [], this.renderedVisible_ = !0;
  }
  dispatchRenderEvent(t, e) {
    const n = this.getMap();
    if (n.hasListener(t)) {
      const s = new Sc(t, void 0, e);
      n.dispatchEvent(s);
    }
  }
  disposeInternal() {
    it(this.fontChangeListenerKey_), this.element_.parentNode.removeChild(this.element_), super.disposeInternal();
  }
  renderFrame(t) {
    if (!t) {
      this.renderedVisible_ && (this.element_.style.display = "none", this.renderedVisible_ = !1);
      return;
    }
    this.calculateMatrices2D(t), this.dispatchRenderEvent(li.PRECOMPOSE, t);
    const e = t.layerStatesArray.sort(function(o, a) {
      return o.zIndex - a.zIndex;
    }), n = t.viewState;
    this.children_.length = 0;
    const s = [];
    let r = null;
    for (let o = 0, a = e.length; o < a; ++o) {
      const l = e[o];
      t.layerIndex = o;
      const h = l.layer, c = h.getSourceState();
      if (!Ia(l, n) || c != "ready" && c != "undefined") {
        h.unrender();
        continue;
      }
      const u = h.render(t, r);
      !u || (u !== r && (this.children_.push(u), r = u), "getDeclutter" in h && s.push(
        h
      ));
    }
    for (let o = s.length - 1; o >= 0; --o)
      s[o].renderDeclutter(t);
    Ef(this.element_, this.children_), this.dispatchRenderEvent(li.POSTCOMPOSE, t), this.renderedVisible_ || (this.element_.style.display = "", this.renderedVisible_ = !0), this.scheduleExpireIconCache(t);
  }
}
const Lf = If;
class ti extends ie {
  constructor(t, e) {
    super(t), this.layer = e;
  }
}
const Co = {
  LAYERS: "layers"
};
class Aa extends Cc {
  constructor(t) {
    t = t || {};
    const e = Object.assign({}, t);
    delete e.layers;
    let n = t.layers;
    super(e), this.on, this.once, this.un, this.layersListenerKeys_ = [], this.listenerKeys_ = {}, this.addChangeListener(Co.LAYERS, this.handleLayersChanged_), n ? Array.isArray(n) ? n = new te(n.slice(), { unique: !0 }) : Z(typeof n.getArray == "function", 43) : n = new te(void 0, { unique: !0 }), this.setLayers(n);
  }
  handleLayerChange_() {
    this.changed();
  }
  handleLayersChanged_() {
    this.layersListenerKeys_.forEach(it), this.layersListenerKeys_.length = 0;
    const t = this.getLayers();
    this.layersListenerKeys_.push(
      W(t, Et.ADD, this.handleLayersAdd_, this),
      W(t, Et.REMOVE, this.handleLayersRemove_, this)
    );
    for (const n in this.listenerKeys_)
      this.listenerKeys_[n].forEach(it);
    Es(this.listenerKeys_);
    const e = t.getArray();
    for (let n = 0, s = e.length; n < s; n++) {
      const r = e[n];
      this.registerLayerListeners_(r), this.dispatchEvent(new ti("addlayer", r));
    }
    this.changed();
  }
  registerLayerListeners_(t) {
    const e = [
      W(
        t,
        Sn.PROPERTYCHANGE,
        this.handleLayerChange_,
        this
      ),
      W(t, $.CHANGE, this.handleLayerChange_, this)
    ];
    t instanceof Aa && e.push(
      W(t, "addlayer", this.handleLayerGroupAdd_, this),
      W(t, "removelayer", this.handleLayerGroupRemove_, this)
    ), this.listenerKeys_[j(t)] = e;
  }
  handleLayerGroupAdd_(t) {
    this.dispatchEvent(new ti("addlayer", t.layer));
  }
  handleLayerGroupRemove_(t) {
    this.dispatchEvent(new ti("removelayer", t.layer));
  }
  handleLayersAdd_(t) {
    const e = t.element;
    this.registerLayerListeners_(e), this.dispatchEvent(new ti("addlayer", e)), this.changed();
  }
  handleLayersRemove_(t) {
    const e = t.element, n = j(e);
    this.listenerKeys_[n].forEach(it), delete this.listenerKeys_[n], this.dispatchEvent(new ti("removelayer", e)), this.changed();
  }
  getLayers() {
    return this.get(Co.LAYERS);
  }
  setLayers(t) {
    const e = this.getLayers();
    if (e) {
      const n = e.getArray();
      for (let s = 0, r = n.length; s < r; ++s)
        this.dispatchEvent(new ti("removelayer", n[s]));
    }
    this.set(Co.LAYERS, t);
  }
  getLayersArray(t) {
    return t = t !== void 0 ? t : [], this.getLayers().forEach(function(e) {
      e.getLayersArray(t);
    }), t;
  }
  getLayerStatesArray(t) {
    const e = t !== void 0 ? t : [], n = e.length;
    this.getLayers().forEach(function(o) {
      o.getLayerStatesArray(e);
    });
    const s = this.getLayerState();
    let r = s.zIndex;
    !t && s.zIndex === void 0 && (r = 0);
    for (let o = n, a = e.length; o < a; o++) {
      const l = e[o];
      l.opacity *= s.opacity, l.visible = l.visible && s.visible, l.maxResolution = Math.min(
        l.maxResolution,
        s.maxResolution
      ), l.minResolution = Math.max(
        l.minResolution,
        s.minResolution
      ), l.minZoom = Math.max(l.minZoom, s.minZoom), l.maxZoom = Math.min(l.maxZoom, s.maxZoom), s.extent !== void 0 && (l.extent !== void 0 ? l.extent = es(
        l.extent,
        s.extent
      ) : l.extent = s.extent), l.zIndex === void 0 && (l.zIndex = r);
    }
    return e;
  }
  getSourceState() {
    return "ready";
  }
}
const Qr = Aa;
class Pf extends ie {
  constructor(t, e, n) {
    super(t), this.map = e, this.frameState = n !== void 0 ? n : null;
  }
}
const an = Pf;
class Af extends an {
  constructor(t, e, n, s, r, o) {
    super(t, e, r), this.originalEvent = n, this.pixel_ = null, this.coordinate_ = null, this.dragging = s !== void 0 ? s : !1, this.activePointers = o;
  }
  get pixel() {
    return this.pixel_ || (this.pixel_ = this.map.getEventPixel(this.originalEvent)), this.pixel_;
  }
  set pixel(t) {
    this.pixel_ = t;
  }
  get coordinate() {
    return this.coordinate_ || (this.coordinate_ = this.map.getCoordinateFromPixel(this.pixel)), this.coordinate_;
  }
  set coordinate(t) {
    this.coordinate_ = t;
  }
  preventDefault() {
    super.preventDefault(), "preventDefault" in this.originalEvent && this.originalEvent.preventDefault();
  }
  stopPropagation() {
    super.stopPropagation(), "stopPropagation" in this.originalEvent && this.originalEvent.stopPropagation();
  }
}
const Fe = Af, X = {
  SINGLECLICK: "singleclick",
  CLICK: $.CLICK,
  DBLCLICK: $.DBLCLICK,
  POINTERDRAG: "pointerdrag",
  POINTERMOVE: "pointermove",
  POINTERDOWN: "pointerdown",
  POINTERUP: "pointerup",
  POINTEROVER: "pointerover",
  POINTEROUT: "pointerout",
  POINTERENTER: "pointerenter",
  POINTERLEAVE: "pointerleave",
  POINTERCANCEL: "pointercancel"
}, Ko = {
  POINTERMOVE: "pointermove",
  POINTERDOWN: "pointerdown",
  POINTERUP: "pointerup",
  POINTEROVER: "pointerover",
  POINTEROUT: "pointerout",
  POINTERENTER: "pointerenter",
  POINTERLEAVE: "pointerleave",
  POINTERCANCEL: "pointercancel"
};
class Of extends Ur {
  constructor(t, e) {
    super(t), this.map_ = t, this.clickTimeoutId_, this.emulateClicks_ = !1, this.dragging_ = !1, this.dragListenerKeys_ = [], this.moveTolerance_ = e === void 0 ? 1 : e, this.down_ = null;
    const n = this.map_.getViewport();
    this.activePointers_ = [], this.trackedTouches_ = {}, this.element_ = n, this.pointerdownListenerKey_ = W(
      n,
      Ko.POINTERDOWN,
      this.handlePointerDown_,
      this
    ), this.originalPointerMoveEvent_, this.relayedListenerKey_ = W(
      n,
      Ko.POINTERMOVE,
      this.relayMoveEvent_,
      this
    ), this.boundHandleTouchMove_ = this.handleTouchMove_.bind(this), this.element_.addEventListener(
      $.TOUCHMOVE,
      this.boundHandleTouchMove_,
      dc ? { passive: !1 } : !1
    );
  }
  emulateClick_(t) {
    let e = new Fe(
      X.CLICK,
      this.map_,
      t
    );
    this.dispatchEvent(e), this.clickTimeoutId_ !== void 0 ? (clearTimeout(this.clickTimeoutId_), this.clickTimeoutId_ = void 0, e = new Fe(
      X.DBLCLICK,
      this.map_,
      t
    ), this.dispatchEvent(e)) : this.clickTimeoutId_ = setTimeout(
      function() {
        this.clickTimeoutId_ = void 0;
        const n = new Fe(
          X.SINGLECLICK,
          this.map_,
          t
        );
        this.dispatchEvent(n);
      }.bind(this),
      250
    );
  }
  updateActivePointers_(t) {
    const e = t, n = e.pointerId;
    if (e.type == X.POINTERUP || e.type == X.POINTERCANCEL) {
      delete this.trackedTouches_[n];
      for (const s in this.trackedTouches_)
        if (this.trackedTouches_[s].target !== e.target) {
          delete this.trackedTouches_[s];
          break;
        }
    } else
      (e.type == X.POINTERDOWN || e.type == X.POINTERMOVE) && (this.trackedTouches_[n] = e);
    this.activePointers_ = Object.values(this.trackedTouches_);
  }
  handlePointerUp_(t) {
    this.updateActivePointers_(t);
    const e = new Fe(
      X.POINTERUP,
      this.map_,
      t,
      void 0,
      void 0,
      this.activePointers_
    );
    this.dispatchEvent(e), this.emulateClicks_ && !e.defaultPrevented && !this.dragging_ && this.isMouseActionButton_(t) && this.emulateClick_(this.down_), this.activePointers_.length === 0 && (this.dragListenerKeys_.forEach(it), this.dragListenerKeys_.length = 0, this.dragging_ = !1, this.down_ = null);
  }
  isMouseActionButton_(t) {
    return t.button === 0;
  }
  handlePointerDown_(t) {
    this.emulateClicks_ = this.activePointers_.length === 0, this.updateActivePointers_(t);
    const e = new Fe(
      X.POINTERDOWN,
      this.map_,
      t,
      void 0,
      void 0,
      this.activePointers_
    );
    this.dispatchEvent(e), this.down_ = {};
    for (const n in t) {
      const s = t[n];
      this.down_[n] = typeof s == "function" ? Gi : s;
    }
    if (this.dragListenerKeys_.length === 0) {
      const n = this.map_.getOwnerDocument();
      this.dragListenerKeys_.push(
        W(
          n,
          X.POINTERMOVE,
          this.handlePointerMove_,
          this
        ),
        W(n, X.POINTERUP, this.handlePointerUp_, this),
        W(
          this.element_,
          X.POINTERCANCEL,
          this.handlePointerUp_,
          this
        )
      ), this.element_.getRootNode && this.element_.getRootNode() !== n && this.dragListenerKeys_.push(
        W(
          this.element_.getRootNode(),
          X.POINTERUP,
          this.handlePointerUp_,
          this
        )
      );
    }
  }
  handlePointerMove_(t) {
    if (this.isMoving_(t)) {
      this.updateActivePointers_(t), this.dragging_ = !0;
      const e = new Fe(
        X.POINTERDRAG,
        this.map_,
        t,
        this.dragging_,
        void 0,
        this.activePointers_
      );
      this.dispatchEvent(e);
    }
  }
  relayMoveEvent_(t) {
    this.originalPointerMoveEvent_ = t;
    const e = !!(this.down_ && this.isMoving_(t));
    this.dispatchEvent(
      new Fe(
        X.POINTERMOVE,
        this.map_,
        t,
        e
      )
    );
  }
  handleTouchMove_(t) {
    const e = this.originalPointerMoveEvent_;
    (!e || e.defaultPrevented) && (typeof t.cancelable != "boolean" || t.cancelable === !0) && t.preventDefault();
  }
  isMoving_(t) {
    return this.dragging_ || Math.abs(t.clientX - this.down_.clientX) > this.moveTolerance_ || Math.abs(t.clientY - this.down_.clientY) > this.moveTolerance_;
  }
  disposeInternal() {
    this.relayedListenerKey_ && (it(this.relayedListenerKey_), this.relayedListenerKey_ = null), this.element_.removeEventListener(
      $.TOUCHMOVE,
      this.boundHandleTouchMove_
    ), this.pointerdownListenerKey_ && (it(this.pointerdownListenerKey_), this.pointerdownListenerKey_ = null), this.dragListenerKeys_.forEach(it), this.dragListenerKeys_.length = 0, this.element_ = null, super.disposeInternal();
  }
}
const Ff = Of, Qe = {
  POSTRENDER: "postrender",
  MOVESTART: "movestart",
  MOVEEND: "moveend",
  LOADSTART: "loadstart",
  LOADEND: "loadend"
}, vt = {
  LAYERGROUP: "layergroup",
  SIZE: "size",
  TARGET: "target",
  VIEW: "view"
}, wr = 1 / 0;
class Df {
  constructor(t, e) {
    this.priorityFunction_ = t, this.keyFunction_ = e, this.elements_ = [], this.priorities_ = [], this.queuedElements_ = {};
  }
  clear() {
    this.elements_.length = 0, this.priorities_.length = 0, Es(this.queuedElements_);
  }
  dequeue() {
    const t = this.elements_, e = this.priorities_, n = t[0];
    t.length == 1 ? (t.length = 0, e.length = 0) : (t[0] = t.pop(), e[0] = e.pop(), this.siftUp_(0));
    const s = this.keyFunction_(n);
    return delete this.queuedElements_[s], n;
  }
  enqueue(t) {
    Z(!(this.keyFunction_(t) in this.queuedElements_), 31);
    const e = this.priorityFunction_(t);
    return e != wr ? (this.elements_.push(t), this.priorities_.push(e), this.queuedElements_[this.keyFunction_(t)] = !0, this.siftDown_(0, this.elements_.length - 1), !0) : !1;
  }
  getCount() {
    return this.elements_.length;
  }
  getLeftChildIndex_(t) {
    return t * 2 + 1;
  }
  getRightChildIndex_(t) {
    return t * 2 + 2;
  }
  getParentIndex_(t) {
    return t - 1 >> 1;
  }
  heapify_() {
    let t;
    for (t = (this.elements_.length >> 1) - 1; t >= 0; t--)
      this.siftUp_(t);
  }
  isEmpty() {
    return this.elements_.length === 0;
  }
  isKeyQueued(t) {
    return t in this.queuedElements_;
  }
  isQueued(t) {
    return this.isKeyQueued(this.keyFunction_(t));
  }
  siftUp_(t) {
    const e = this.elements_, n = this.priorities_, s = e.length, r = e[t], o = n[t], a = t;
    for (; t < s >> 1; ) {
      const l = this.getLeftChildIndex_(t), h = this.getRightChildIndex_(t), c = h < s && n[h] < n[l] ? h : l;
      e[t] = e[c], n[t] = n[c], t = c;
    }
    e[t] = r, n[t] = o, this.siftDown_(a, t);
  }
  siftDown_(t, e) {
    const n = this.elements_, s = this.priorities_, r = n[e], o = s[e];
    for (; e > t; ) {
      const a = this.getParentIndex_(e);
      if (s[a] > o)
        n[e] = n[a], s[e] = s[a], e = a;
      else
        break;
    }
    n[e] = r, s[e] = o;
  }
  reprioritize() {
    const t = this.priorityFunction_, e = this.elements_, n = this.priorities_;
    let s = 0;
    const r = e.length;
    let o, a, l;
    for (a = 0; a < r; ++a)
      o = e[a], l = t(o), l == wr ? delete this.queuedElements_[this.keyFunction_(o)] : (n[s] = l, e[s++] = o);
    e.length = s, n.length = s, this.heapify_();
  }
}
const Nf = Df, k = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};
class kf extends Nf {
  constructor(t, e) {
    super(
      function(n) {
        return t.apply(null, n);
      },
      function(n) {
        return n[0].getKey();
      }
    ), this.boundHandleTileChange_ = this.handleTileChange.bind(this), this.tileChangeCallback_ = e, this.tilesLoading_ = 0, this.tilesLoadingKeys_ = {};
  }
  enqueue(t) {
    const e = super.enqueue(t);
    return e && t[0].addEventListener($.CHANGE, this.boundHandleTileChange_), e;
  }
  getTilesLoading() {
    return this.tilesLoading_;
  }
  handleTileChange(t) {
    const e = t.target, n = e.getState();
    if (n === k.LOADED || n === k.ERROR || n === k.EMPTY) {
      n !== k.ERROR && e.removeEventListener($.CHANGE, this.boundHandleTileChange_);
      const s = e.getKey();
      s in this.tilesLoadingKeys_ && (delete this.tilesLoadingKeys_[s], --this.tilesLoading_), this.tileChangeCallback_();
    }
  }
  loadMoreTiles(t, e) {
    let n = 0, s, r, o;
    for (; this.tilesLoading_ < t && n < e && this.getCount() > 0; )
      r = this.dequeue()[0], o = r.getKey(), s = r.getState(), s === k.IDLE && !(o in this.tilesLoadingKeys_) && (this.tilesLoadingKeys_[o] = !0, ++this.tilesLoading_, ++n, r.load());
  }
}
const Gf = kf;
function $f(i, t, e, n, s) {
  if (!i || !(e in i.wantedTiles) || !i.wantedTiles[e][t.getKey()])
    return wr;
  const r = i.viewState.center, o = n[0] - r[0], a = n[1] - r[1];
  return 65536 * Math.log(s) + Math.sqrt(o * o + a * a) / s;
}
const Rt = {
  ANIMATING: 0,
  INTERACTING: 1
}, se = {
  CENTER: "center",
  RESOLUTION: "resolution",
  ROTATION: "rotation"
}, Bf = 42, Oa = 256, Rn = {
  radians: 6370997 / (2 * Math.PI),
  degrees: 2 * Math.PI * 6370997 / 360,
  ft: 0.3048,
  m: 1,
  "us-ft": 1200 / 3937
};
class zf {
  constructor(t) {
    this.code_ = t.code, this.units_ = t.units, this.extent_ = t.extent !== void 0 ? t.extent : null, this.worldExtent_ = t.worldExtent !== void 0 ? t.worldExtent : null, this.axisOrientation_ = t.axisOrientation !== void 0 ? t.axisOrientation : "enu", this.global_ = t.global !== void 0 ? t.global : !1, this.canWrapX_ = !!(this.global_ && this.extent_), this.getPointResolutionFunc_ = t.getPointResolution, this.defaultTileGrid_ = null, this.metersPerUnit_ = t.metersPerUnit;
  }
  canWrapX() {
    return this.canWrapX_;
  }
  getCode() {
    return this.code_;
  }
  getExtent() {
    return this.extent_;
  }
  getUnits() {
    return this.units_;
  }
  getMetersPerUnit() {
    return this.metersPerUnit_ || Rn[this.units_];
  }
  getWorldExtent() {
    return this.worldExtent_;
  }
  getAxisOrientation() {
    return this.axisOrientation_;
  }
  isGlobal() {
    return this.global_;
  }
  setGlobal(t) {
    this.global_ = t, this.canWrapX_ = !!(t && this.extent_);
  }
  getDefaultTileGrid() {
    return this.defaultTileGrid_;
  }
  setDefaultTileGrid(t) {
    this.defaultTileGrid_ = t;
  }
  setExtent(t) {
    this.extent_ = t, this.canWrapX_ = !!(this.global_ && t);
  }
  setWorldExtent(t) {
    this.worldExtent_ = t;
  }
  setGetPointResolution(t) {
    this.getPointResolutionFunc_ = t;
  }
  getPointResolutionFunc() {
    return this.getPointResolutionFunc_;
  }
}
const Lc = zf, Ts = 6378137, un = Math.PI * Ts, Vf = [-un, -un, un, un], jf = [-180, -85, 180, 85], Hs = Ts * Math.log(Math.tan(Math.PI / 2));
class tn extends Lc {
  constructor(t) {
    super({
      code: t,
      units: "m",
      extent: Vf,
      global: !0,
      worldExtent: jf,
      getPointResolution: function(e, n) {
        return e / Math.cosh(n[1] / Ts);
      }
    });
  }
}
const Hl = [
  new tn("EPSG:3857"),
  new tn("EPSG:102100"),
  new tn("EPSG:102113"),
  new tn("EPSG:900913"),
  new tn("http://www.opengis.net/def/crs/EPSG/0/3857"),
  new tn("http://www.opengis.net/gml/srs/epsg.xml#3857")
];
function Wf(i, t, e) {
  const n = i.length;
  e = e > 1 ? e : 2, t === void 0 && (e > 2 ? t = i.slice() : t = new Array(n));
  for (let s = 0; s < n; s += e) {
    t[s] = un * i[s] / 180;
    let r = Ts * Math.log(Math.tan(Math.PI * (+i[s + 1] + 90) / 360));
    r > Hs ? r = Hs : r < -Hs && (r = -Hs), t[s + 1] = r;
  }
  return t;
}
function Uf(i, t, e) {
  const n = i.length;
  e = e > 1 ? e : 2, t === void 0 && (e > 2 ? t = i.slice() : t = new Array(n));
  for (let s = 0; s < n; s += e)
    t[s] = 180 * i[s] / un, t[s + 1] = 360 * Math.atan(Math.exp(i[s + 1] / Ts)) / Math.PI - 90;
  return t;
}
const Zf = 6378137, Yl = [-180, -90, 180, 90], Xf = Math.PI * Zf / 180;
class wi extends Lc {
  constructor(t, e) {
    super({
      code: t,
      units: "degrees",
      extent: Yl,
      axisOrientation: e,
      global: !0,
      metersPerUnit: Xf,
      worldExtent: Yl
    });
  }
}
const ql = [
  new wi("CRS:84"),
  new wi("EPSG:4326", "neu"),
  new wi("urn:ogc:def:crs:OGC:1.3:CRS84"),
  new wi("urn:ogc:def:crs:OGC:2:84"),
  new wi("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
  new wi("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
  new wi("http://www.opengis.net/def/crs/EPSG/0/4326", "neu")
];
let Jo = {};
function Hf(i) {
  return Jo[i] || Jo[i.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
}
function Yf(i, t) {
  Jo[i] = t;
}
let xn = {};
function Sr(i, t, e) {
  const n = i.getCode(), s = t.getCode();
  n in xn || (xn[n] = {}), xn[n][s] = e;
}
function qf(i, t) {
  let e;
  return i in xn && t in xn[i] && (e = xn[i][t]), e;
}
const Pc = 63710088e-1;
function Kl(i, t, e) {
  e = e || Pc;
  const n = Pi(i[1]), s = Pi(t[1]), r = (s - n) / 2, o = Pi(t[0] - i[0]) / 2, a = Math.sin(r) * Math.sin(r) + Math.sin(o) * Math.sin(o) * Math.cos(n) * Math.cos(s);
  return 2 * e * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function Kf(i, t, e, n) {
  n = n || Pc;
  const s = Pi(i[1]), r = Pi(i[0]), o = t / n, a = Math.asin(
    Math.sin(s) * Math.cos(o) + Math.cos(s) * Math.sin(o) * Math.cos(e)
  ), l = r + Math.atan2(
    Math.sin(e) * Math.sin(o) * Math.cos(s),
    Math.cos(o) - Math.sin(s) * Math.sin(a)
  );
  return [zl(l), zl(a)];
}
let Qo = !0;
function Jf(i) {
  Qo = !(i === void 0 ? !0 : i);
}
function Fa(i, t, e) {
  if (t !== void 0) {
    for (let n = 0, s = i.length; n < s; ++n)
      t[n] = i[n];
    t = t;
  } else
    t = i.slice();
  return t;
}
function Da(i, t, e) {
  if (t !== void 0 && i !== t) {
    for (let n = 0, s = i.length; n < s; ++n)
      t[n] = i[n];
    i = t;
  }
  return i;
}
function Qf(i) {
  Yf(i.getCode(), i), Sr(i, i, Fa);
}
function tg(i) {
  i.forEach(Qf);
}
function rt(i) {
  return typeof i == "string" ? Hf(i) : i || null;
}
function Tr(i, t, e, n) {
  i = rt(i);
  let s;
  const r = i.getPointResolutionFunc();
  if (r) {
    if (s = r(t, e), n && n !== i.getUnits()) {
      const o = i.getMetersPerUnit();
      o && (s = s * o / Rn[n]);
    }
  } else {
    const o = i.getUnits();
    if (o == "degrees" && !n || n == "degrees")
      s = t;
    else {
      const a = to(
        i,
        rt("EPSG:4326")
      );
      if (a === Da && o !== "degrees")
        s = t * i.getMetersPerUnit();
      else {
        let h = [
          e[0] - t / 2,
          e[1],
          e[0] + t / 2,
          e[1],
          e[0],
          e[1] - t / 2,
          e[0],
          e[1] + t / 2
        ];
        h = a(h, h, 2);
        const c = Kl(h.slice(0, 2), h.slice(2, 4)), u = Kl(h.slice(4, 6), h.slice(6, 8));
        s = (c + u) / 2;
      }
      const l = n ? Rn[n] : i.getMetersPerUnit();
      l !== void 0 && (s /= l);
    }
  }
  return s;
}
function Jl(i) {
  tg(i), i.forEach(function(t) {
    i.forEach(function(e) {
      t !== e && Sr(t, e, Fa);
    });
  });
}
function eg(i, t, e, n) {
  i.forEach(function(s) {
    t.forEach(function(r) {
      Sr(s, r, e), Sr(r, s, n);
    });
  });
}
function Na(i, t) {
  return i ? typeof i == "string" ? rt(i) : i : rt(t);
}
function Ne(i, t) {
  if (i === t)
    return !0;
  const e = i.getUnits() === t.getUnits();
  return (i.getCode() === t.getCode() || to(i, t) === Fa) && e;
}
function to(i, t) {
  const e = i.getCode(), n = t.getCode();
  let s = qf(e, n);
  return s || (s = Da), s;
}
function ms(i, t) {
  const e = rt(i), n = rt(t);
  return to(e, n);
}
function ig(i, t, e) {
  return ms(t, e)(i, void 0, i.length);
}
function ng(i, t, e, n) {
  const s = ms(t, e);
  return ef(i, s, void 0, n);
}
function In(i, t) {
  return i;
}
function ot(i, t) {
  return Qo && !re(i, [0, 0]) && i[0] >= -180 && i[0] <= 180 && i[1] >= -90 && i[1] <= 90 && (Qo = !1, console.warn(
    "Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates."
  )), i;
}
function ka(i, t) {
  return i;
}
function ni(i, t) {
  return i;
}
function sg() {
  Jl(Hl), Jl(ql), eg(
    ql,
    Hl,
    Wf,
    Uf
  );
}
sg();
function Ql(i, t, e) {
  return function(n, s, r, o, a) {
    if (!n)
      return;
    if (!s && !t)
      return n;
    const l = t ? 0 : r[0] * s, h = t ? 0 : r[1] * s, c = a ? a[0] : 0, u = a ? a[1] : 0;
    let d = i[0] + l / 2 + c, f = i[2] - l / 2 + c, g = i[1] + h / 2 + u, m = i[3] - h / 2 + u;
    d > f && (d = (f + d) / 2, f = d), g > m && (g = (m + g) / 2, m = g);
    let _ = gt(n[0], d, f), p = gt(n[1], g, m);
    if (o && e && s) {
      const y = 30 * s;
      _ += -y * Math.log(1 + Math.max(0, d - n[0]) / y) + y * Math.log(1 + Math.max(0, n[0] - f) / y), p += -y * Math.log(1 + Math.max(0, g - n[1]) / y) + y * Math.log(1 + Math.max(0, n[1] - m) / y);
    }
    return [_, p];
  };
}
function rg(i) {
  return i;
}
function Ga(i, t, e, n) {
  const s = at(t) / e[0], r = Ce(t) / e[1];
  return n ? Math.min(i, Math.max(s, r)) : Math.min(i, Math.min(s, r));
}
function $a(i, t, e) {
  let n = Math.min(i, t);
  const s = 50;
  return n *= Math.log(1 + s * Math.max(0, i / t - 1)) / s + 1, e && (n = Math.max(n, e), n /= Math.log(1 + s * Math.max(0, e / i - 1)) / s + 1), gt(n, e / 2, t * 2);
}
function og(i, t, e, n) {
  return t = t !== void 0 ? t : !0, function(s, r, o, a) {
    if (s !== void 0) {
      const l = i[0], h = i[i.length - 1], c = e ? Ga(
        l,
        e,
        o,
        n
      ) : l;
      if (a)
        return t ? $a(
          s,
          c,
          h
        ) : gt(s, h, c);
      const u = Math.min(c, s), d = Math.floor(Ma(i, u, r));
      return i[d] > c && d < i.length - 1 ? i[d + 1] : i[d];
    } else
      return;
  };
}
function ag(i, t, e, n, s, r) {
  return n = n !== void 0 ? n : !0, e = e !== void 0 ? e : 0, function(o, a, l, h) {
    if (o !== void 0) {
      const c = s ? Ga(
        t,
        s,
        l,
        r
      ) : t;
      if (h)
        return n ? $a(
          o,
          c,
          e
        ) : gt(o, e, c);
      const u = 1e-9, d = Math.ceil(
        Math.log(t / c) / Math.log(i) - u
      ), f = -a * (0.5 - u) + 0.5, g = Math.min(c, o), m = Math.floor(
        Math.log(t / g) / Math.log(i) + f
      ), _ = Math.max(d, m), p = t / Math.pow(i, _);
      return gt(p, e, c);
    } else
      return;
  };
}
function th(i, t, e, n, s) {
  return e = e !== void 0 ? e : !0, function(r, o, a, l) {
    if (r !== void 0) {
      const h = n ? Ga(
        i,
        n,
        a,
        s
      ) : i;
      return !e || !l ? gt(r, t, h) : $a(
        r,
        h,
        t
      );
    } else
      return;
  };
}
function Ba(i) {
  if (i !== void 0)
    return 0;
}
function eh(i) {
  if (i !== void 0)
    return i;
}
function lg(i) {
  const t = 2 * Math.PI / i;
  return function(e, n) {
    if (n)
      return e;
    if (e !== void 0)
      return e = Math.floor(e / t + 0.5) * t, e;
  };
}
function hg(i) {
  return i = i || Pi(5), function(t, e) {
    if (e)
      return t;
    if (t !== void 0)
      return Math.abs(t) <= i ? 0 : t;
  };
}
function Ac(i) {
  return Math.pow(i, 3);
}
function Fn(i) {
  return 1 - Ac(1 - i);
}
function cg(i) {
  return 3 * i * i - 2 * i * i * i;
}
function ug(i) {
  return i;
}
function Oi(i, t, e, n, s, r) {
  r = r || [];
  let o = 0;
  for (let a = t; a < e; a += n) {
    const l = i[a], h = i[a + 1];
    r[o++] = s[0] * l + s[2] * h + s[4], r[o++] = s[1] * l + s[3] * h + s[5];
  }
  return r && r.length != o && (r.length = o), r;
}
function za(i, t, e, n, s, r, o) {
  o = o || [];
  const a = Math.cos(s), l = Math.sin(s), h = r[0], c = r[1];
  let u = 0;
  for (let d = t; d < e; d += n) {
    const f = i[d] - h, g = i[d + 1] - c;
    o[u++] = h + f * a - g * l, o[u++] = c + f * l + g * a;
    for (let m = d + 2; m < d + n; ++m)
      o[u++] = i[m];
  }
  return o && o.length != u && (o.length = u), o;
}
function dg(i, t, e, n, s, r, o, a) {
  a = a || [];
  const l = o[0], h = o[1];
  let c = 0;
  for (let u = t; u < e; u += n) {
    const d = i[u] - l, f = i[u + 1] - h;
    a[c++] = l + s * d, a[c++] = h + r * f;
    for (let g = u + 2; g < u + n; ++g)
      a[c++] = i[g];
  }
  return a && a.length != c && (a.length = c), a;
}
function Oc(i, t, e, n, s, r, o) {
  o = o || [];
  let a = 0;
  for (let l = t; l < e; l += n) {
    o[a++] = i[l] + s, o[a++] = i[l + 1] + r;
    for (let h = l + 2; h < l + n; ++h)
      o[a++] = i[h];
  }
  return o && o.length != a && (o.length = a), o;
}
const ih = xe();
class fg extends fe {
  constructor() {
    super(), this.extent_ = Gt(), this.extentRevision_ = -1, this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = 0, this.simplifyTransformedInternal = Od(function(t, e, n) {
      if (!n)
        return this.getSimplifiedGeometry(e);
      const s = this.clone();
      return s.applyTransform(n), s.getSimplifiedGeometry(e);
    });
  }
  simplifyTransformed(t, e) {
    return this.simplifyTransformedInternal(
      this.getRevision(),
      t,
      e
    );
  }
  clone() {
    return z();
  }
  closestPointXY(t, e, n, s) {
    return z();
  }
  containsXY(t, e) {
    const n = this.getClosestPoint([t, e]);
    return n[0] === t && n[1] === e;
  }
  getClosestPoint(t, e) {
    return e = e || [NaN, NaN], this.closestPointXY(t[0], t[1], e, 1 / 0), e;
  }
  intersectsCoordinate(t) {
    return this.containsXY(t[0], t[1]);
  }
  computeExtent(t) {
    return z();
  }
  getExtent(t) {
    if (this.extentRevision_ != this.getRevision()) {
      const e = this.computeExtent(this.extent_);
      (isNaN(e[0]) || isNaN(e[1])) && Ss(e), this.extentRevision_ = this.getRevision();
    }
    return Qd(this.extent_, t);
  }
  rotate(t, e) {
    z();
  }
  scale(t, e, n) {
    z();
  }
  simplify(t) {
    return this.getSimplifiedGeometry(t * t);
  }
  getSimplifiedGeometry(t) {
    return z();
  }
  getType() {
    return z();
  }
  applyTransform(t) {
    z();
  }
  intersectsExtent(t) {
    return z();
  }
  translate(t, e) {
    z();
  }
  transform(t, e) {
    const n = rt(t), s = n.getUnits() == "tile-pixels" ? function(r, o, a) {
      const l = n.getExtent(), h = n.getWorldExtent(), c = Ce(h) / Ce(l);
      return ui(
        ih,
        h[0],
        h[3],
        c,
        -c,
        0,
        0,
        0
      ), Oi(
        r,
        0,
        r.length,
        a,
        ih,
        o
      ), ms(n, e)(
        r,
        o,
        a
      );
    } : ms(n, e);
    return this.applyTransform(s), this;
  }
}
const Fc = fg;
class gg extends Fc {
  constructor() {
    super(), this.layout = "XY", this.stride = 2, this.flatCoordinates = null;
  }
  computeExtent(t) {
    return mc(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t
    );
  }
  getCoordinates() {
    return z();
  }
  getFirstCoordinate() {
    return this.flatCoordinates.slice(0, this.stride);
  }
  getFlatCoordinates() {
    return this.flatCoordinates;
  }
  getLastCoordinate() {
    return this.flatCoordinates.slice(
      this.flatCoordinates.length - this.stride
    );
  }
  getLayout() {
    return this.layout;
  }
  getSimplifiedGeometry(t) {
    if (this.simplifiedGeometryRevision !== this.getRevision() && (this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = this.getRevision()), t < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && t <= this.simplifiedGeometryMaxMinSquaredTolerance)
      return this;
    const e = this.getSimplifiedGeometryInternal(t);
    return e.getFlatCoordinates().length < this.flatCoordinates.length ? e : (this.simplifiedGeometryMaxMinSquaredTolerance = t, this);
  }
  getSimplifiedGeometryInternal(t) {
    return this;
  }
  getStride() {
    return this.stride;
  }
  setFlatCoordinates(t, e) {
    this.stride = br(t), this.layout = t, this.flatCoordinates = e;
  }
  setCoordinates(t, e) {
    z();
  }
  setLayout(t, e, n) {
    let s;
    if (t)
      s = br(t);
    else {
      for (let r = 0; r < n; ++r)
        if (e.length === 0) {
          this.layout = "XY", this.stride = 2;
          return;
        } else
          e = e[0];
      s = e.length, t = mg(s);
    }
    this.layout = t, this.stride = s;
  }
  applyTransform(t) {
    this.flatCoordinates && (t(this.flatCoordinates, this.flatCoordinates, this.stride), this.changed());
  }
  rotate(t, e) {
    const n = this.getFlatCoordinates();
    if (n) {
      const s = this.getStride();
      za(
        n,
        0,
        n.length,
        s,
        t,
        e,
        n
      ), this.changed();
    }
  }
  scale(t, e, n) {
    e === void 0 && (e = t), n || (n = di(this.getExtent()));
    const s = this.getFlatCoordinates();
    if (s) {
      const r = this.getStride();
      dg(
        s,
        0,
        s.length,
        r,
        t,
        e,
        n,
        s
      ), this.changed();
    }
  }
  translate(t, e) {
    const n = this.getFlatCoordinates();
    if (n) {
      const s = this.getStride();
      Oc(
        n,
        0,
        n.length,
        s,
        t,
        e,
        n
      ), this.changed();
    }
  }
}
function mg(i) {
  let t;
  return i == 2 ? t = "XY" : i == 3 ? t = "XYZ" : i == 4 && (t = "XYZM"), t;
}
function br(i) {
  let t;
  return i == "XY" ? t = 2 : i == "XYZ" || i == "XYM" ? t = 3 : i == "XYZM" && (t = 4), t;
}
function _g(i, t, e) {
  const n = i.getFlatCoordinates();
  if (n) {
    const s = i.getStride();
    return Oi(
      n,
      0,
      n.length,
      s,
      t,
      e
    );
  } else
    return null;
}
const vi = gg;
function nh(i, t, e, n, s, r, o) {
  const a = i[t], l = i[t + 1], h = i[e] - a, c = i[e + 1] - l;
  let u;
  if (h === 0 && c === 0)
    u = t;
  else {
    const d = ((s - a) * h + (r - l) * c) / (h * h + c * c);
    if (d > 1)
      u = e;
    else if (d > 0) {
      for (let f = 0; f < n; ++f)
        o[f] = De(
          i[t + f],
          i[e + f],
          d
        );
      o.length = n;
      return;
    } else
      u = t;
  }
  for (let d = 0; d < n; ++d)
    o[d] = i[u + d];
  o.length = n;
}
function Va(i, t, e, n, s) {
  let r = i[t], o = i[t + 1];
  for (t += n; t < e; t += n) {
    const a = i[t], l = i[t + 1], h = ke(r, o, a, l);
    h > s && (s = h), r = a, o = l;
  }
  return s;
}
function ja(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    s = Va(i, t, a, n, s), t = a;
  }
  return s;
}
function pg(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    s = ja(i, t, a, n, s), t = a[a.length - 1];
  }
  return s;
}
function Wa(i, t, e, n, s, r, o, a, l, h, c) {
  if (t == e)
    return h;
  let u, d;
  if (s === 0)
    if (d = ke(
      o,
      a,
      i[t],
      i[t + 1]
    ), d < h) {
      for (u = 0; u < n; ++u)
        l[u] = i[t + u];
      return l.length = n, d;
    } else
      return h;
  c = c || [NaN, NaN];
  let f = t + n;
  for (; f < e; )
    if (nh(
      i,
      f - n,
      f,
      n,
      o,
      a,
      c
    ), d = ke(o, a, c[0], c[1]), d < h) {
      for (h = d, u = 0; u < n; ++u)
        l[u] = c[u];
      l.length = n, f += n;
    } else
      f += n * Math.max(
        (Math.sqrt(d) - Math.sqrt(h)) / s | 0,
        1
      );
  if (r && (nh(
    i,
    e - n,
    t,
    n,
    o,
    a,
    c
  ), d = ke(o, a, c[0], c[1]), d < h)) {
    for (h = d, u = 0; u < n; ++u)
      l[u] = c[u];
    l.length = n;
  }
  return h;
}
function Ua(i, t, e, n, s, r, o, a, l, h, c) {
  c = c || [NaN, NaN];
  for (let u = 0, d = e.length; u < d; ++u) {
    const f = e[u];
    h = Wa(
      i,
      t,
      f,
      n,
      s,
      r,
      o,
      a,
      l,
      h,
      c
    ), t = f;
  }
  return h;
}
function yg(i, t, e, n, s, r, o, a, l, h, c) {
  c = c || [NaN, NaN];
  for (let u = 0, d = e.length; u < d; ++u) {
    const f = e[u];
    h = Ua(
      i,
      t,
      f,
      n,
      s,
      r,
      o,
      a,
      l,
      h,
      c
    ), t = f[f.length - 1];
  }
  return h;
}
function Dc(i, t, e, n) {
  for (let s = 0, r = e.length; s < r; ++s)
    i[t++] = e[s];
  return t;
}
function eo(i, t, e, n) {
  for (let s = 0, r = e.length; s < r; ++s) {
    const o = e[s];
    for (let a = 0; a < n; ++a)
      i[t++] = o[a];
  }
  return t;
}
function Za(i, t, e, n, s) {
  s = s || [];
  let r = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = eo(
      i,
      t,
      e[o],
      n
    );
    s[r++] = l, t = l;
  }
  return s.length = r, s;
}
function xg(i, t, e, n, s) {
  s = s || [];
  let r = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = Za(
      i,
      t,
      e[o],
      n,
      s[r]
    );
    l.length === 0 && (l[0] = t), s[r++] = l, t = l[l.length - 1];
  }
  return s.length = r, s;
}
function Xa(i, t, e, n, s, r, o) {
  const a = (e - t) / n;
  if (a < 3) {
    for (; t < e; t += n)
      r[o++] = i[t], r[o++] = i[t + 1];
    return o;
  }
  const l = new Array(a);
  l[0] = 1, l[a - 1] = 1;
  const h = [t, e - n];
  let c = 0;
  for (; h.length > 0; ) {
    const u = h.pop(), d = h.pop();
    let f = 0;
    const g = i[d], m = i[d + 1], _ = i[u], p = i[u + 1];
    for (let y = d + n; y < u; y += n) {
      const x = i[y], v = i[y + 1], C = sf(x, v, g, m, _, p);
      C > f && (c = y, f = C);
    }
    f > s && (l[(c - t) / n] = 1, d + n < c && h.push(d, c), c + n < u && h.push(c, u));
  }
  for (let u = 0; u < a; ++u)
    l[u] && (r[o++] = i[t + u * n], r[o++] = i[t + u * n + 1]);
  return o;
}
function vg(i, t, e, n, s, r, o, a) {
  for (let l = 0, h = e.length; l < h; ++l) {
    const c = e[l];
    o = Xa(
      i,
      t,
      c,
      n,
      s,
      r,
      o
    ), a.push(o), t = c;
  }
  return o;
}
function Ti(i, t) {
  return t * Math.round(i / t);
}
function Cg(i, t, e, n, s, r, o) {
  if (t == e)
    return o;
  let a = Ti(i[t], s), l = Ti(i[t + 1], s);
  t += n, r[o++] = a, r[o++] = l;
  let h, c;
  do
    if (h = Ti(i[t], s), c = Ti(i[t + 1], s), t += n, t == e)
      return r[o++] = h, r[o++] = c, o;
  while (h == a && c == l);
  for (; t < e; ) {
    const u = Ti(i[t], s), d = Ti(i[t + 1], s);
    if (t += n, u == h && d == c)
      continue;
    const f = h - a, g = c - l, m = u - a, _ = d - l;
    if (f * _ == g * m && (f < 0 && m < f || f == m || f > 0 && m > f) && (g < 0 && _ < g || g == _ || g > 0 && _ > g)) {
      h = u, c = d;
      continue;
    }
    r[o++] = h, r[o++] = c, a = h, l = c, h = u, c = d;
  }
  return r[o++] = h, r[o++] = c, o;
}
function Nc(i, t, e, n, s, r, o, a) {
  for (let l = 0, h = e.length; l < h; ++l) {
    const c = e[l];
    o = Cg(
      i,
      t,
      c,
      n,
      s,
      r,
      o
    ), a.push(o), t = c;
  }
  return o;
}
function Mg(i, t, e, n, s, r, o, a) {
  for (let l = 0, h = e.length; l < h; ++l) {
    const c = e[l], u = [];
    o = Nc(
      i,
      t,
      c,
      n,
      s,
      r,
      o,
      u
    ), a.push(u), t = c[c.length - 1];
  }
  return o;
}
function si(i, t, e, n, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = t; o < e; o += n)
    s[r++] = i.slice(o, o + n);
  return s.length = r, s;
}
function _s(i, t, e, n, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    s[r++] = si(
      i,
      t,
      l,
      n,
      s[r]
    ), t = l;
  }
  return s.length = r, s;
}
function ta(i, t, e, n, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    s[r++] = l.length === 1 && l[0] === t ? [] : _s(
      i,
      t,
      l,
      n,
      s[r]
    ), t = l[l.length - 1];
  }
  return s.length = r, s;
}
function kc(i, t, e, n) {
  let s = 0, r = i[e - n], o = i[e - n + 1];
  for (; t < e; t += n) {
    const a = i[t], l = i[t + 1];
    s += o * a - r * l, r = a, o = l;
  }
  return s / 2;
}
function Gc(i, t, e, n) {
  let s = 0;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    s += kc(i, t, a, n), t = a;
  }
  return s;
}
function Eg(i, t, e, n) {
  let s = 0;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    s += Gc(i, t, a, n), t = a[a.length - 1];
  }
  return s;
}
class Rr extends vi {
  constructor(t, e) {
    super(), this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, e !== void 0 && !Array.isArray(t[0]) ? this.setFlatCoordinates(
      e,
      t
    ) : this.setCoordinates(
      t,
      e
    );
  }
  clone() {
    return new Rr(this.flatCoordinates.slice(), this.layout);
  }
  closestPointXY(t, e, n, s) {
    return s < Ui(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      Va(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), Wa(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      this.maxDelta_,
      !0,
      t,
      e,
      n,
      s
    ));
  }
  getArea() {
    return kc(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  getCoordinates() {
    return si(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  getSimplifiedGeometryInternal(t) {
    const e = [];
    return e.length = Xa(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      e,
      0
    ), new Rr(e, "XY");
  }
  getType() {
    return "LinearRing";
  }
  intersectsExtent(t) {
    return !1;
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = eo(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
const sh = Rr;
class Ha extends vi {
  constructor(t, e) {
    super(), this.setCoordinates(t, e);
  }
  clone() {
    const t = new Ha(this.flatCoordinates.slice(), this.layout);
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, n, s) {
    const r = this.flatCoordinates, o = ke(
      t,
      e,
      r[0],
      r[1]
    );
    if (o < s) {
      const a = this.stride;
      for (let l = 0; l < a; ++l)
        n[l] = r[l];
      return n.length = a, o;
    } else
      return s;
  }
  getCoordinates() {
    return this.flatCoordinates ? this.flatCoordinates.slice() : [];
  }
  computeExtent(t) {
    return Qn(this.flatCoordinates, t);
  }
  getType() {
    return "Point";
  }
  intersectsExtent(t) {
    return Sa(t, this.flatCoordinates[0], this.flatCoordinates[1]);
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 0), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Dc(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
const he = Ha;
function wg(i, t, e, n, s) {
  return !Ta(
    s,
    function(o) {
      return !Ii(
        i,
        t,
        e,
        n,
        o[0],
        o[1]
      );
    }
  );
}
function Ii(i, t, e, n, s, r) {
  let o = 0, a = i[e - n], l = i[e - n + 1];
  for (; t < e; t += n) {
    const h = i[t], c = i[t + 1];
    l <= r ? c > r && (h - a) * (r - l) - (s - a) * (c - l) > 0 && o++ : c <= r && (h - a) * (r - l) - (s - a) * (c - l) < 0 && o--, a = h, l = c;
  }
  return o !== 0;
}
function Ya(i, t, e, n, s, r) {
  if (e.length === 0 || !Ii(i, t, e[0], n, s, r))
    return !1;
  for (let o = 1, a = e.length; o < a; ++o)
    if (Ii(i, e[o - 1], e[o], n, s, r))
      return !1;
  return !0;
}
function Sg(i, t, e, n, s, r) {
  if (e.length === 0)
    return !1;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    if (Ya(i, t, l, n, s, r))
      return !0;
    t = l[l.length - 1];
  }
  return !1;
}
function $c(i, t, e, n, s, r, o) {
  let a, l, h, c, u, d, f;
  const g = s[r + 1], m = [];
  for (let y = 0, x = e.length; y < x; ++y) {
    const v = e[y];
    for (c = i[v - n], d = i[v - n + 1], a = t; a < v; a += n)
      u = i[a], f = i[a + 1], (g <= d && f <= g || d <= g && g <= f) && (h = (g - d) / (f - d) * (u - c) + c, m.push(h)), c = u, d = f;
  }
  let _ = NaN, p = -1 / 0;
  for (m.sort(Ni), c = m[0], a = 1, l = m.length; a < l; ++a) {
    u = m[a];
    const y = Math.abs(u - c);
    y > p && (h = (c + u) / 2, Ya(i, t, e, n, h, g) && (_ = h, p = y)), c = u;
  }
  return isNaN(_) && (_ = s[r]), o ? (o.push(_, g, p), o) : [_, g, p];
}
function Tg(i, t, e, n, s) {
  let r = [];
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    r = $c(
      i,
      t,
      l,
      n,
      s,
      2 * o,
      r
    ), t = l[l.length - 1];
  }
  return r;
}
function Bc(i, t, e, n, s) {
  let r;
  for (t += n; t < e; t += n)
    if (r = s(
      i.slice(t - n, t),
      i.slice(t, t + n)
    ), r)
      return r;
  return !1;
}
function io(i, t, e, n, s) {
  const r = pc(
    Gt(),
    i,
    t,
    e,
    n
  );
  return Ot(s, r) ? bi(s, r) || r[0] >= s[0] && r[2] <= s[2] || r[1] >= s[1] && r[3] <= s[3] ? !0 : Bc(
    i,
    t,
    e,
    n,
    function(o, a) {
      return tf(s, o, a);
    }
  ) : !1;
}
function bg(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r) {
    if (io(i, t, e[r], n, s))
      return !0;
    t = e[r];
  }
  return !1;
}
function zc(i, t, e, n, s) {
  return !!(io(i, t, e, n, s) || Ii(
    i,
    t,
    e,
    n,
    s[0],
    s[1]
  ) || Ii(
    i,
    t,
    e,
    n,
    s[0],
    s[3]
  ) || Ii(
    i,
    t,
    e,
    n,
    s[2],
    s[1]
  ) || Ii(
    i,
    t,
    e,
    n,
    s[2],
    s[3]
  ));
}
function Vc(i, t, e, n, s) {
  if (!zc(i, t, e[0], n, s))
    return !1;
  if (e.length === 1)
    return !0;
  for (let r = 1, o = e.length; r < o; ++r)
    if (wg(
      i,
      e[r - 1],
      e[r],
      n,
      s
    ) && !io(
      i,
      e[r - 1],
      e[r],
      n,
      s
    ))
      return !1;
  return !0;
}
function Rg(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    if (Vc(i, t, a, n, s))
      return !0;
    t = a[a.length - 1];
  }
  return !1;
}
function Ig(i, t, e, n) {
  for (; t < e - n; ) {
    for (let s = 0; s < n; ++s) {
      const r = i[t + s];
      i[t + s] = i[e - n + s], i[e - n + s] = r;
    }
    t += n, e -= n;
  }
}
function jc(i, t, e, n) {
  let s = 0, r = i[e - n], o = i[e - n + 1];
  for (; t < e; t += n) {
    const a = i[t], l = i[t + 1];
    s += (a - r) * (l + o), r = a, o = l;
  }
  return s === 0 ? void 0 : s > 0;
}
function Wc(i, t, e, n, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r], l = jc(
      i,
      t,
      a,
      n
    );
    if (r === 0) {
      if (s && l || !s && !l)
        return !1;
    } else if (s && !l || !s && l)
      return !1;
    t = a;
  }
  return !0;
}
function Lg(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    if (!Wc(i, t, a, n, s))
      return !1;
    a.length && (t = a[a.length - 1]);
  }
  return !0;
}
function ea(i, t, e, n, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r], l = jc(
      i,
      t,
      a,
      n
    );
    (r === 0 ? s && l || !s && !l : s && !l || !s && l) && Ig(i, t, a, n), t = a;
  }
  return t;
}
function rh(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r)
    t = ea(
      i,
      t,
      e[r],
      n,
      s
    );
  return t;
}
class $i extends vi {
  constructor(t, e, n) {
    super(), this.ends_ = [], this.flatInteriorPointRevision_ = -1, this.flatInteriorPoint_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, e !== void 0 && n ? (this.setFlatCoordinates(
      e,
      t
    ), this.ends_ = n) : this.setCoordinates(
      t,
      e
    );
  }
  appendLinearRing(t) {
    this.flatCoordinates ? ye(this.flatCoordinates, t.getFlatCoordinates()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed();
  }
  clone() {
    const t = new $i(
      this.flatCoordinates.slice(),
      this.layout,
      this.ends_.slice()
    );
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, n, s) {
    return s < Ui(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      ja(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), Ua(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      this.maxDelta_,
      !0,
      t,
      e,
      n,
      s
    ));
  }
  containsXY(t, e) {
    return Ya(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      t,
      e
    );
  }
  getArea() {
    return Gc(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride
    );
  }
  getCoordinates(t) {
    let e;
    return t !== void 0 ? (e = this.getOrientedFlatCoordinates().slice(), ea(e, 0, this.ends_, this.stride, t)) : e = this.flatCoordinates, _s(e, 0, this.ends_, this.stride);
  }
  getEnds() {
    return this.ends_;
  }
  getFlatInteriorPoint() {
    if (this.flatInteriorPointRevision_ != this.getRevision()) {
      const t = di(this.getExtent());
      this.flatInteriorPoint_ = $c(
        this.getOrientedFlatCoordinates(),
        0,
        this.ends_,
        this.stride,
        t,
        0
      ), this.flatInteriorPointRevision_ = this.getRevision();
    }
    return this.flatInteriorPoint_;
  }
  getInteriorPoint() {
    return new he(this.getFlatInteriorPoint(), "XYM");
  }
  getLinearRingCount() {
    return this.ends_.length;
  }
  getLinearRing(t) {
    return t < 0 || this.ends_.length <= t ? null : new sh(
      this.flatCoordinates.slice(
        t === 0 ? 0 : this.ends_[t - 1],
        this.ends_[t]
      ),
      this.layout
    );
  }
  getLinearRings() {
    const t = this.layout, e = this.flatCoordinates, n = this.ends_, s = [];
    let r = 0;
    for (let o = 0, a = n.length; o < a; ++o) {
      const l = n[o], h = new sh(
        e.slice(r, l),
        t
      );
      s.push(h), r = l;
    }
    return s;
  }
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const t = this.flatCoordinates;
      Wc(t, 0, this.ends_, this.stride) ? this.orientedFlatCoordinates_ = t : (this.orientedFlatCoordinates_ = t.slice(), this.orientedFlatCoordinates_.length = ea(
        this.orientedFlatCoordinates_,
        0,
        this.ends_,
        this.stride
      )), this.orientedRevision_ = this.getRevision();
    }
    return this.orientedFlatCoordinates_;
  }
  getSimplifiedGeometryInternal(t) {
    const e = [], n = [];
    return e.length = Nc(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      Math.sqrt(t),
      e,
      0,
      n
    ), new $i(e, "XY", n);
  }
  getType() {
    return "Polygon";
  }
  intersectsExtent(t) {
    return Vc(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      t
    );
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 2), this.flatCoordinates || (this.flatCoordinates = []);
    const n = Za(
      this.flatCoordinates,
      0,
      t,
      this.stride,
      this.ends_
    );
    this.flatCoordinates.length = n.length === 0 ? 0 : n[n.length - 1], this.changed();
  }
}
const Bi = $i;
function Pg(i, t, e, n) {
  e = e || 32;
  const s = [];
  for (let r = 0; r < e; ++r)
    ye(
      s,
      Kf(i, t, 2 * Math.PI * r / e, n)
    );
  return s.push(s[0], s[1]), new $i(s, "XY", [s.length]);
}
function oh(i) {
  const t = i[0], e = i[1], n = i[2], s = i[3], r = [
    t,
    e,
    t,
    s,
    n,
    s,
    n,
    e,
    t,
    e
  ];
  return new $i(r, "XY", [r.length]);
}
function Ag(i, t, e) {
  t = t || 32;
  const n = i.getStride(), s = i.getLayout(), r = i.getCenter(), o = n * (t + 1), a = new Array(o);
  for (let c = 0; c < o; c += n) {
    a[c] = 0, a[c + 1] = 0;
    for (let u = 2; u < n; u++)
      a[c + u] = r[u];
  }
  const l = [a.length], h = new $i(a, s, l);
  return Og(h, r, i.getRadius(), e), h;
}
function Og(i, t, e, n) {
  const s = i.getFlatCoordinates(), r = i.getStride(), o = s.length / r - 1, a = n || 0;
  for (let l = 0; l <= o; ++l) {
    const h = l * r, c = a + Ai(l, o) * 2 * Math.PI / o;
    s[h] = t[0] + e * Math.cos(c), s[h + 1] = t[1] + e * Math.sin(c);
  }
  i.changed();
}
const Mo = 0;
class Fg extends fe {
  constructor(t) {
    super(), this.on, this.once, this.un, t = Object.assign({}, t), this.hints_ = [0, 0], this.animations_ = [], this.updateAnimationKey_, this.projection_ = Na(t.projection, "EPSG:3857"), this.viewportSize_ = [100, 100], this.targetCenter_ = null, this.targetResolution_, this.targetRotation_, this.nextCenter_ = null, this.nextResolution_, this.nextRotation_, this.cancelAnchor_ = void 0, t.projection && Jf(), t.center && (t.center = ot(t.center, this.projection_)), t.extent && (t.extent = ni(t.extent, this.projection_)), this.applyOptions_(t);
  }
  applyOptions_(t) {
    const e = Object.assign({}, t);
    for (const a in se)
      delete e[a];
    this.setProperties(e, !0);
    const n = Ng(t);
    this.maxResolution_ = n.maxResolution, this.minResolution_ = n.minResolution, this.zoomFactor_ = n.zoomFactor, this.resolutions_ = t.resolutions, this.padding_ = t.padding, this.minZoom_ = n.minZoom;
    const s = Dg(t), r = n.constraint, o = kg(t);
    this.constraints_ = {
      center: s,
      resolution: r,
      rotation: o
    }, this.setRotation(t.rotation !== void 0 ? t.rotation : 0), this.setCenterInternal(
      t.center !== void 0 ? t.center : null
    ), t.resolution !== void 0 ? this.setResolution(t.resolution) : t.zoom !== void 0 && this.setZoom(t.zoom);
  }
  get padding() {
    return this.padding_;
  }
  set padding(t) {
    let e = this.padding_;
    this.padding_ = t;
    const n = this.getCenter();
    if (n) {
      const s = t || [0, 0, 0, 0];
      e = e || [0, 0, 0, 0];
      const r = this.getResolution(), o = r / 2 * (s[3] - e[3] + e[1] - s[1]), a = r / 2 * (s[0] - e[0] + e[2] - s[2]);
      this.setCenterInternal([n[0] + o, n[1] - a]);
    }
  }
  getUpdatedOptions_(t) {
    const e = this.getProperties();
    return e.resolution !== void 0 ? e.resolution = this.getResolution() : e.zoom = this.getZoom(), e.center = this.getCenterInternal(), e.rotation = this.getRotation(), Object.assign({}, e, t);
  }
  animate(t) {
    this.isDef() && !this.getAnimating() && this.resolveConstraints(0);
    const e = new Array(arguments.length);
    for (let n = 0; n < e.length; ++n) {
      let s = arguments[n];
      s.center && (s = Object.assign({}, s), s.center = ot(
        s.center,
        this.getProjection()
      )), s.anchor && (s = Object.assign({}, s), s.anchor = ot(
        s.anchor,
        this.getProjection()
      )), e[n] = s;
    }
    this.animateInternal.apply(this, e);
  }
  animateInternal(t) {
    let e = arguments.length, n;
    e > 1 && typeof arguments[e - 1] == "function" && (n = arguments[e - 1], --e);
    let s = 0;
    for (; s < e && !this.isDef(); ++s) {
      const c = arguments[s];
      c.center && this.setCenterInternal(c.center), c.zoom !== void 0 ? this.setZoom(c.zoom) : c.resolution && this.setResolution(c.resolution), c.rotation !== void 0 && this.setRotation(c.rotation);
    }
    if (s === e) {
      n && Ys(n, !0);
      return;
    }
    let r = Date.now(), o = this.targetCenter_.slice(), a = this.targetResolution_, l = this.targetRotation_;
    const h = [];
    for (; s < e; ++s) {
      const c = arguments[s], u = {
        start: r,
        complete: !1,
        anchor: c.anchor,
        duration: c.duration !== void 0 ? c.duration : 1e3,
        easing: c.easing || cg,
        callback: n
      };
      if (c.center && (u.sourceCenter = o, u.targetCenter = c.center.slice(), o = u.targetCenter), c.zoom !== void 0 ? (u.sourceResolution = a, u.targetResolution = this.getResolutionForZoom(c.zoom), a = u.targetResolution) : c.resolution && (u.sourceResolution = a, u.targetResolution = c.resolution, a = u.targetResolution), c.rotation !== void 0) {
        u.sourceRotation = l;
        const d = Ai(c.rotation - l + Math.PI, 2 * Math.PI) - Math.PI;
        u.targetRotation = l + d, l = u.targetRotation;
      }
      Gg(u) ? u.complete = !0 : r += u.duration, h.push(u);
    }
    this.animations_.push(h), this.setHint(Rt.ANIMATING, 1), this.updateAnimations_();
  }
  getAnimating() {
    return this.hints_[Rt.ANIMATING] > 0;
  }
  getInteracting() {
    return this.hints_[Rt.INTERACTING] > 0;
  }
  cancelAnimations() {
    this.setHint(Rt.ANIMATING, -this.hints_[Rt.ANIMATING]);
    let t;
    for (let e = 0, n = this.animations_.length; e < n; ++e) {
      const s = this.animations_[e];
      if (s[0].callback && Ys(s[0].callback, !1), !t)
        for (let r = 0, o = s.length; r < o; ++r) {
          const a = s[r];
          if (!a.complete) {
            t = a.anchor;
            break;
          }
        }
    }
    this.animations_.length = 0, this.cancelAnchor_ = t, this.nextCenter_ = null, this.nextResolution_ = NaN, this.nextRotation_ = NaN;
  }
  updateAnimations_() {
    if (this.updateAnimationKey_ !== void 0 && (cancelAnimationFrame(this.updateAnimationKey_), this.updateAnimationKey_ = void 0), !this.getAnimating())
      return;
    const t = Date.now();
    let e = !1;
    for (let n = this.animations_.length - 1; n >= 0; --n) {
      const s = this.animations_[n];
      let r = !0;
      for (let o = 0, a = s.length; o < a; ++o) {
        const l = s[o];
        if (l.complete)
          continue;
        const h = t - l.start;
        let c = l.duration > 0 ? h / l.duration : 1;
        c >= 1 ? (l.complete = !0, c = 1) : r = !1;
        const u = l.easing(c);
        if (l.sourceCenter) {
          const d = l.sourceCenter[0], f = l.sourceCenter[1], g = l.targetCenter[0], m = l.targetCenter[1];
          this.nextCenter_ = l.targetCenter;
          const _ = d + u * (g - d), p = f + u * (m - f);
          this.targetCenter_ = [_, p];
        }
        if (l.sourceResolution && l.targetResolution) {
          const d = u === 1 ? l.targetResolution : l.sourceResolution + u * (l.targetResolution - l.sourceResolution);
          if (l.anchor) {
            const f = this.getViewportSize_(this.getRotation()), g = this.constraints_.resolution(
              d,
              0,
              f,
              !0
            );
            this.targetCenter_ = this.calculateCenterZoom(
              g,
              l.anchor
            );
          }
          this.nextResolution_ = l.targetResolution, this.targetResolution_ = d, this.applyTargetState_(!0);
        }
        if (l.sourceRotation !== void 0 && l.targetRotation !== void 0) {
          const d = u === 1 ? Ai(l.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : l.sourceRotation + u * (l.targetRotation - l.sourceRotation);
          if (l.anchor) {
            const f = this.constraints_.rotation(
              d,
              !0
            );
            this.targetCenter_ = this.calculateCenterRotate(
              f,
              l.anchor
            );
          }
          this.nextRotation_ = l.targetRotation, this.targetRotation_ = d;
        }
        if (this.applyTargetState_(!0), e = !0, !l.complete)
          break;
      }
      if (r) {
        this.animations_[n] = null, this.setHint(Rt.ANIMATING, -1), this.nextCenter_ = null, this.nextResolution_ = NaN, this.nextRotation_ = NaN;
        const o = s[0].callback;
        o && Ys(o, !0);
      }
    }
    this.animations_ = this.animations_.filter(Boolean), e && this.updateAnimationKey_ === void 0 && (this.updateAnimationKey_ = requestAnimationFrame(
      this.updateAnimations_.bind(this)
    ));
  }
  calculateCenterRotate(t, e) {
    let n;
    const s = this.getCenterInternal();
    return s !== void 0 && (n = [s[0] - e[0], s[1] - e[1]], Pa(n, t - this.getRotation()), Mc(n, e)), n;
  }
  calculateCenterZoom(t, e) {
    let n;
    const s = this.getCenterInternal(), r = this.getResolution();
    if (s !== void 0 && r !== void 0) {
      const o = e[0] - t * (e[0] - s[0]) / r, a = e[1] - t * (e[1] - s[1]) / r;
      n = [o, a];
    }
    return n;
  }
  getViewportSize_(t) {
    const e = this.viewportSize_;
    if (t) {
      const n = e[0], s = e[1];
      return [
        Math.abs(n * Math.cos(t)) + Math.abs(s * Math.sin(t)),
        Math.abs(n * Math.sin(t)) + Math.abs(s * Math.cos(t))
      ];
    } else
      return e;
  }
  setViewportSize(t) {
    this.viewportSize_ = Array.isArray(t) ? t.slice() : [100, 100], this.getAnimating() || this.resolveConstraints(0);
  }
  getCenter() {
    const t = this.getCenterInternal();
    return t && In(t, this.getProjection());
  }
  getCenterInternal() {
    return this.get(se.CENTER);
  }
  getConstraints() {
    return this.constraints_;
  }
  getConstrainResolution() {
    return this.get("constrainResolution");
  }
  getHints(t) {
    return t !== void 0 ? (t[0] = this.hints_[0], t[1] = this.hints_[1], t) : this.hints_.slice();
  }
  calculateExtent(t) {
    const e = this.calculateExtentInternal(t);
    return ka(e, this.getProjection());
  }
  calculateExtentInternal(t) {
    t = t || this.getViewportSizeMinusPadding_();
    const e = this.getCenterInternal();
    Z(e, 1);
    const n = this.getResolution();
    Z(n !== void 0, 2);
    const s = this.getRotation();
    return Z(s !== void 0, 3), Zo(e, n, s, t);
  }
  getMaxResolution() {
    return this.maxResolution_;
  }
  getMinResolution() {
    return this.minResolution_;
  }
  getMaxZoom() {
    return this.getZoomForResolution(this.minResolution_);
  }
  setMaxZoom(t) {
    this.applyOptions_(this.getUpdatedOptions_({ maxZoom: t }));
  }
  getMinZoom() {
    return this.getZoomForResolution(this.maxResolution_);
  }
  setMinZoom(t) {
    this.applyOptions_(this.getUpdatedOptions_({ minZoom: t }));
  }
  setConstrainResolution(t) {
    this.applyOptions_(this.getUpdatedOptions_({ constrainResolution: t }));
  }
  getProjection() {
    return this.projection_;
  }
  getResolution() {
    return this.get(se.RESOLUTION);
  }
  getResolutions() {
    return this.resolutions_;
  }
  getResolutionForExtent(t, e) {
    return this.getResolutionForExtentInternal(
      ni(t, this.getProjection()),
      e
    );
  }
  getResolutionForExtentInternal(t, e) {
    e = e || this.getViewportSizeMinusPadding_();
    const n = at(t) / e[0], s = Ce(t) / e[1];
    return Math.max(n, s);
  }
  getResolutionForValueFunction(t) {
    t = t || 2;
    const e = this.getConstrainedResolution(this.maxResolution_), n = this.minResolution_, s = Math.log(e / n) / Math.log(t);
    return function(r) {
      return e / Math.pow(t, r * s);
    };
  }
  getRotation() {
    return this.get(se.ROTATION);
  }
  getValueForResolutionFunction(t) {
    const e = Math.log(t || 2), n = this.getConstrainedResolution(this.maxResolution_), s = this.minResolution_, r = Math.log(n / s) / e;
    return function(o) {
      return Math.log(n / o) / e / r;
    };
  }
  getViewportSizeMinusPadding_(t) {
    let e = this.getViewportSize_(t);
    const n = this.padding_;
    return n && (e = [
      e[0] - n[1] - n[3],
      e[1] - n[0] - n[2]
    ]), e;
  }
  getState() {
    const t = this.getProjection(), e = this.getResolution(), n = this.getRotation();
    let s = this.getCenterInternal();
    const r = this.padding_;
    if (r) {
      const o = this.getViewportSizeMinusPadding_();
      s = Eo(
        s,
        this.getViewportSize_(),
        [o[0] / 2 + r[3], o[1] / 2 + r[0]],
        e,
        n
      );
    }
    return {
      center: s.slice(0),
      projection: t !== void 0 ? t : null,
      resolution: e,
      nextCenter: this.nextCenter_,
      nextResolution: this.nextResolution_,
      nextRotation: this.nextRotation_,
      rotation: n,
      zoom: this.getZoom()
    };
  }
  getZoom() {
    let t;
    const e = this.getResolution();
    return e !== void 0 && (t = this.getZoomForResolution(e)), t;
  }
  getZoomForResolution(t) {
    let e = this.minZoom_ || 0, n, s;
    if (this.resolutions_) {
      const r = Ma(this.resolutions_, t, 1);
      e = r, n = this.resolutions_[r], r == this.resolutions_.length - 1 ? s = 2 : s = n / this.resolutions_[r + 1];
    } else
      n = this.maxResolution_, s = this.zoomFactor_;
    return e + Math.log(n / t) / Math.log(s);
  }
  getResolutionForZoom(t) {
    if (this.resolutions_) {
      if (this.resolutions_.length <= 1)
        return 0;
      const e = gt(
        Math.floor(t),
        0,
        this.resolutions_.length - 2
      ), n = this.resolutions_[e] / this.resolutions_[e + 1];
      return this.resolutions_[e] / Math.pow(n, gt(t - e, 0, 1));
    } else
      return this.maxResolution_ / Math.pow(this.zoomFactor_, t - this.minZoom_);
  }
  fit(t, e) {
    let n;
    if (Z(
      Array.isArray(t) || typeof t.getSimplifiedGeometry == "function",
      24
    ), Array.isArray(t)) {
      Z(!ba(t), 25);
      const s = ni(t, this.getProjection());
      n = oh(s);
    } else if (t.getType() === "Circle") {
      const s = ni(
        t.getExtent(),
        this.getProjection()
      );
      n = oh(s), n.rotate(this.getRotation(), di(s));
    } else
      n = t;
    this.fitInternal(n, e);
  }
  rotatedExtentForGeometry(t) {
    const e = this.getRotation(), n = Math.cos(e), s = Math.sin(-e), r = t.getFlatCoordinates(), o = t.getStride();
    let a = 1 / 0, l = 1 / 0, h = -1 / 0, c = -1 / 0;
    for (let u = 0, d = r.length; u < d; u += o) {
      const f = r[u] * n - r[u + 1] * s, g = r[u] * s + r[u + 1] * n;
      a = Math.min(a, f), l = Math.min(l, g), h = Math.max(h, f), c = Math.max(c, g);
    }
    return [a, l, h, c];
  }
  fitInternal(t, e) {
    e = e || {};
    let n = e.size;
    n || (n = this.getViewportSizeMinusPadding_());
    const s = e.padding !== void 0 ? e.padding : [0, 0, 0, 0], r = e.nearest !== void 0 ? e.nearest : !1;
    let o;
    e.minResolution !== void 0 ? o = e.minResolution : e.maxZoom !== void 0 ? o = this.getResolutionForZoom(e.maxZoom) : o = 0;
    const a = this.rotatedExtentForGeometry(t);
    let l = this.getResolutionForExtentInternal(a, [
      n[0] - s[1] - s[3],
      n[1] - s[0] - s[2]
    ]);
    l = isNaN(l) ? o : Math.max(l, o), l = this.getConstrainedResolution(l, r ? 0 : 1);
    const h = this.getRotation(), c = Math.sin(h), u = Math.cos(h), d = di(a);
    d[0] += (s[1] - s[3]) / 2 * l, d[1] += (s[0] - s[2]) / 2 * l;
    const f = d[0] * u - d[1] * c, g = d[1] * u + d[0] * c, m = this.getConstrainedCenter([f, g], l), _ = e.callback ? e.callback : Gi;
    e.duration !== void 0 ? this.animateInternal(
      {
        resolution: l,
        center: m,
        duration: e.duration,
        easing: e.easing
      },
      _
    ) : (this.targetResolution_ = l, this.targetCenter_ = m, this.applyTargetState_(!1, !0), Ys(_, !0));
  }
  centerOn(t, e, n) {
    this.centerOnInternal(
      ot(t, this.getProjection()),
      e,
      n
    );
  }
  centerOnInternal(t, e, n) {
    this.setCenterInternal(
      Eo(
        t,
        e,
        n,
        this.getResolution(),
        this.getRotation()
      )
    );
  }
  calculateCenterShift(t, e, n, s) {
    let r;
    const o = this.padding_;
    if (o && t) {
      const a = this.getViewportSizeMinusPadding_(-n), l = Eo(
        t,
        s,
        [a[0] / 2 + o[3], a[1] / 2 + o[0]],
        e,
        n
      );
      r = [
        t[0] - l[0],
        t[1] - l[1]
      ];
    }
    return r;
  }
  isDef() {
    return !!this.getCenterInternal() && this.getResolution() !== void 0;
  }
  adjustCenter(t) {
    const e = In(this.targetCenter_, this.getProjection());
    this.setCenter([
      e[0] + t[0],
      e[1] + t[1]
    ]);
  }
  adjustCenterInternal(t) {
    const e = this.targetCenter_;
    this.setCenterInternal([
      e[0] + t[0],
      e[1] + t[1]
    ]);
  }
  adjustResolution(t, e) {
    e = e && ot(e, this.getProjection()), this.adjustResolutionInternal(t, e);
  }
  adjustResolutionInternal(t, e) {
    const n = this.getAnimating() || this.getInteracting(), s = this.getViewportSize_(this.getRotation()), r = this.constraints_.resolution(
      this.targetResolution_ * t,
      0,
      s,
      n
    );
    e && (this.targetCenter_ = this.calculateCenterZoom(r, e)), this.targetResolution_ *= t, this.applyTargetState_();
  }
  adjustZoom(t, e) {
    this.adjustResolution(Math.pow(this.zoomFactor_, -t), e);
  }
  adjustRotation(t, e) {
    e && (e = ot(e, this.getProjection())), this.adjustRotationInternal(t, e);
  }
  adjustRotationInternal(t, e) {
    const n = this.getAnimating() || this.getInteracting(), s = this.constraints_.rotation(
      this.targetRotation_ + t,
      n
    );
    e && (this.targetCenter_ = this.calculateCenterRotate(s, e)), this.targetRotation_ += t, this.applyTargetState_();
  }
  setCenter(t) {
    this.setCenterInternal(
      t && ot(t, this.getProjection())
    );
  }
  setCenterInternal(t) {
    this.targetCenter_ = t, this.applyTargetState_();
  }
  setHint(t, e) {
    return this.hints_[t] += e, this.changed(), this.hints_[t];
  }
  setResolution(t) {
    this.targetResolution_ = t, this.applyTargetState_();
  }
  setRotation(t) {
    this.targetRotation_ = t, this.applyTargetState_();
  }
  setZoom(t) {
    this.setResolution(this.getResolutionForZoom(t));
  }
  applyTargetState_(t, e) {
    const n = this.getAnimating() || this.getInteracting() || e, s = this.constraints_.rotation(
      this.targetRotation_,
      n
    ), r = this.getViewportSize_(s), o = this.constraints_.resolution(
      this.targetResolution_,
      0,
      r,
      n
    ), a = this.constraints_.center(
      this.targetCenter_,
      o,
      r,
      n,
      this.calculateCenterShift(
        this.targetCenter_,
        o,
        s,
        r
      )
    );
    this.get(se.ROTATION) !== s && this.set(se.ROTATION, s), this.get(se.RESOLUTION) !== o && (this.set(se.RESOLUTION, o), this.set("zoom", this.getZoom(), !0)), (!a || !this.get(se.CENTER) || !re(this.get(se.CENTER), a)) && this.set(se.CENTER, a), this.getAnimating() && !t && this.cancelAnimations(), this.cancelAnchor_ = void 0;
  }
  resolveConstraints(t, e, n) {
    t = t !== void 0 ? t : 200;
    const s = e || 0, r = this.constraints_.rotation(this.targetRotation_), o = this.getViewportSize_(r), a = this.constraints_.resolution(
      this.targetResolution_,
      s,
      o
    ), l = this.constraints_.center(
      this.targetCenter_,
      a,
      o,
      !1,
      this.calculateCenterShift(
        this.targetCenter_,
        a,
        r,
        o
      )
    );
    if (t === 0 && !this.cancelAnchor_) {
      this.targetResolution_ = a, this.targetRotation_ = r, this.targetCenter_ = l, this.applyTargetState_();
      return;
    }
    n = n || (t === 0 ? this.cancelAnchor_ : void 0), this.cancelAnchor_ = void 0, (this.getResolution() !== a || this.getRotation() !== r || !this.getCenterInternal() || !re(this.getCenterInternal(), l)) && (this.getAnimating() && this.cancelAnimations(), this.animateInternal({
      rotation: r,
      center: l,
      resolution: a,
      duration: t,
      easing: Fn,
      anchor: n
    }));
  }
  beginInteraction() {
    this.resolveConstraints(0), this.setHint(Rt.INTERACTING, 1);
  }
  endInteraction(t, e, n) {
    n = n && ot(n, this.getProjection()), this.endInteractionInternal(t, e, n);
  }
  endInteractionInternal(t, e, n) {
    this.setHint(Rt.INTERACTING, -1), this.resolveConstraints(t, e, n);
  }
  getConstrainedCenter(t, e) {
    const n = this.getViewportSize_(this.getRotation());
    return this.constraints_.center(
      t,
      e || this.getResolution(),
      n
    );
  }
  getConstrainedZoom(t, e) {
    const n = this.getResolutionForZoom(t);
    return this.getZoomForResolution(
      this.getConstrainedResolution(n, e)
    );
  }
  getConstrainedResolution(t, e) {
    e = e || 0;
    const n = this.getViewportSize_(this.getRotation());
    return this.constraints_.resolution(t, e, n);
  }
}
function Ys(i, t) {
  setTimeout(function() {
    i(t);
  }, 0);
}
function Dg(i) {
  if (i.extent !== void 0) {
    const e = i.smoothExtentConstraint !== void 0 ? i.smoothExtentConstraint : !0;
    return Ql(i.extent, i.constrainOnlyCenter, e);
  }
  const t = Na(i.projection, "EPSG:3857");
  if (i.multiWorld !== !0 && t.isGlobal()) {
    const e = t.getExtent().slice();
    return e[0] = -1 / 0, e[2] = 1 / 0, Ql(e, !1, !1);
  }
  return rg;
}
function Ng(i) {
  let t, e, n, o = i.minZoom !== void 0 ? i.minZoom : Mo, a = i.maxZoom !== void 0 ? i.maxZoom : 28;
  const l = i.zoomFactor !== void 0 ? i.zoomFactor : 2, h = i.multiWorld !== void 0 ? i.multiWorld : !1, c = i.smoothResolutionConstraint !== void 0 ? i.smoothResolutionConstraint : !0, u = i.showFullExtent !== void 0 ? i.showFullExtent : !1, d = Na(i.projection, "EPSG:3857"), f = d.getExtent();
  let g = i.constrainOnlyCenter, m = i.extent;
  if (!h && !m && d.isGlobal() && (g = !1, m = f), i.resolutions !== void 0) {
    const _ = i.resolutions;
    e = _[o], n = _[a] !== void 0 ? _[a] : _[_.length - 1], i.constrainResolution ? t = og(
      _,
      c,
      !g && m,
      u
    ) : t = th(
      e,
      n,
      c,
      !g && m,
      u
    );
  } else {
    const p = (f ? Math.max(at(f), Ce(f)) : 360 * Rn.degrees / d.getMetersPerUnit()) / Oa / Math.pow(2, Mo), y = p / Math.pow(2, 28 - Mo);
    e = i.maxResolution, e !== void 0 ? o = 0 : e = p / Math.pow(l, o), n = i.minResolution, n === void 0 && (i.maxZoom !== void 0 ? i.maxResolution !== void 0 ? n = e / Math.pow(l, a) : n = p / Math.pow(l, a) : n = y), a = o + Math.floor(
      Math.log(e / n) / Math.log(l)
    ), n = e / Math.pow(l, a - o), i.constrainResolution ? t = ag(
      l,
      e,
      n,
      c,
      !g && m,
      u
    ) : t = th(
      e,
      n,
      c,
      !g && m,
      u
    );
  }
  return {
    constraint: t,
    maxResolution: e,
    minResolution: n,
    minZoom: o,
    zoomFactor: l
  };
}
function kg(i) {
  if (i.enableRotation !== void 0 ? i.enableRotation : !0) {
    const e = i.constrainRotation;
    return e === void 0 || e === !0 ? hg() : e === !1 ? eh : typeof e == "number" ? lg(e) : eh;
  } else
    return Ba;
}
function Gg(i) {
  return !(i.sourceCenter && i.targetCenter && !re(i.sourceCenter, i.targetCenter) || i.sourceResolution !== i.targetResolution || i.sourceRotation !== i.targetRotation);
}
function Eo(i, t, e, n, s) {
  const r = Math.cos(-s);
  let o = Math.sin(-s), a = i[0] * r - i[1] * o, l = i[1] * r + i[0] * o;
  a += (t[0] / 2 - e[0]) * n, l += (e[1] - t[1] / 2) * n, o = -o;
  const h = a * r - l * o, c = l * r + a * o;
  return [h, c];
}
const ii = Fg;
class $g extends fe {
  constructor(t) {
    super();
    const e = t.element;
    e && !t.target && !e.style.pointerEvents && (e.style.pointerEvents = "auto"), this.element = e || null, this.target_ = null, this.map_ = null, this.listenerKeys = [], t.render && (this.render = t.render), t.target && this.setTarget(t.target);
  }
  disposeInternal() {
    Ho(this.element), super.disposeInternal();
  }
  getMap() {
    return this.map_;
  }
  setMap(t) {
    this.map_ && Ho(this.element);
    for (let e = 0, n = this.listenerKeys.length; e < n; ++e)
      it(this.listenerKeys[e]);
    this.listenerKeys.length = 0, this.map_ = t, t && ((this.target_ ? this.target_ : t.getOverlayContainerStopEvent()).appendChild(this.element), this.render !== Gi && this.listenerKeys.push(
      W(t, Qe.POSTRENDER, this.render, this)
    ), t.render());
  }
  render(t) {
  }
  setTarget(t) {
    this.target_ = typeof t == "string" ? document.getElementById(t) : t;
  }
}
const Ht = $g;
class Bg extends Ht {
  constructor(t) {
    t = t || {}, super({
      element: document.createElement("div"),
      render: t.render,
      target: t.target
    }), this.ulElement_ = document.createElement("ul"), this.collapsed_ = t.collapsed !== void 0 ? t.collapsed : !0, this.userCollapsed_ = this.collapsed_, this.overrideCollapsible_ = t.collapsible !== void 0, this.collapsible_ = t.collapsible !== void 0 ? t.collapsible : !0, this.collapsible_ || (this.collapsed_ = !1);
    const e = t.className !== void 0 ? t.className : "ol-attribution", n = t.tipLabel !== void 0 ? t.tipLabel : "Attributions", s = t.expandClassName !== void 0 ? t.expandClassName : e + "-expand", r = t.collapseLabel !== void 0 ? t.collapseLabel : "\u203A", o = t.collapseClassName !== void 0 ? t.collapseClassName : e + "-collapse";
    typeof r == "string" ? (this.collapseLabel_ = document.createElement("span"), this.collapseLabel_.textContent = r, this.collapseLabel_.className = o) : this.collapseLabel_ = r;
    const a = t.label !== void 0 ? t.label : "i";
    typeof a == "string" ? (this.label_ = document.createElement("span"), this.label_.textContent = a, this.label_.className = s) : this.label_ = a;
    const l = this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_;
    this.toggleButton_ = document.createElement("button"), this.toggleButton_.setAttribute("type", "button"), this.toggleButton_.setAttribute("aria-expanded", String(!this.collapsed_)), this.toggleButton_.title = n, this.toggleButton_.appendChild(l), this.toggleButton_.addEventListener(
      $.CLICK,
      this.handleClick_.bind(this),
      !1
    );
    const h = e + " " + On + " " + Jr + (this.collapsed_ && this.collapsible_ ? " " + Ul : "") + (this.collapsible_ ? "" : " ol-uncollapsible"), c = this.element;
    c.className = h, c.appendChild(this.toggleButton_), c.appendChild(this.ulElement_), this.renderedAttributions_ = [], this.renderedVisible_ = !0;
  }
  collectSourceAttributions_(t) {
    const e = {}, n = [];
    let s = !0;
    const r = t.layerStatesArray;
    for (let o = 0, a = r.length; o < a; ++o) {
      const l = r[o];
      if (!Ia(l, t.viewState))
        continue;
      const h = l.layer.getSource();
      if (!h)
        continue;
      const c = h.getAttributions();
      if (!c)
        continue;
      const u = c(t);
      if (!!u)
        if (s = s && h.getAttributionsCollapsible() !== !1, Array.isArray(u))
          for (let d = 0, f = u.length; d < f; ++d)
            u[d] in e || (n.push(u[d]), e[u[d]] = !0);
        else
          u in e || (n.push(u), e[u] = !0);
    }
    return this.overrideCollapsible_ || this.setCollapsible(s), n;
  }
  updateElement_(t) {
    if (!t) {
      this.renderedVisible_ && (this.element.style.display = "none", this.renderedVisible_ = !1);
      return;
    }
    const e = this.collectSourceAttributions_(t), n = e.length > 0;
    if (this.renderedVisible_ != n && (this.element.style.display = n ? "" : "none", this.renderedVisible_ = n), !xi(e, this.renderedAttributions_)) {
      Mf(this.ulElement_);
      for (let s = 0, r = e.length; s < r; ++s) {
        const o = document.createElement("li");
        o.innerHTML = e[s], this.ulElement_.appendChild(o);
      }
      this.renderedAttributions_ = e;
    }
  }
  handleClick_(t) {
    t.preventDefault(), this.handleToggle_(), this.userCollapsed_ = this.collapsed_;
  }
  handleToggle_() {
    this.element.classList.toggle(Ul), this.collapsed_ ? vr(this.collapseLabel_, this.label_) : vr(this.label_, this.collapseLabel_), this.collapsed_ = !this.collapsed_, this.toggleButton_.setAttribute("aria-expanded", String(!this.collapsed_));
  }
  getCollapsible() {
    return this.collapsible_;
  }
  setCollapsible(t) {
    this.collapsible_ !== t && (this.collapsible_ = t, this.element.classList.toggle("ol-uncollapsible"), this.userCollapsed_ && this.handleToggle_());
  }
  setCollapsed(t) {
    this.userCollapsed_ = t, !(!this.collapsible_ || this.collapsed_ === t) && this.handleToggle_();
  }
  getCollapsed() {
    return this.collapsed_;
  }
  render(t) {
    this.updateElement_(t.frameState);
  }
}
const zg = Bg;
class Vg extends Ht {
  constructor(t) {
    t = t || {}, super({
      element: document.createElement("div"),
      render: t.render,
      target: t.target
    });
    const e = t.className !== void 0 ? t.className : "ol-rotate", n = t.label !== void 0 ? t.label : "\u21E7", s = t.compassClassName !== void 0 ? t.compassClassName : "ol-compass";
    this.label_ = null, typeof n == "string" ? (this.label_ = document.createElement("span"), this.label_.className = s, this.label_.textContent = n) : (this.label_ = n, this.label_.classList.add(s));
    const r = t.tipLabel ? t.tipLabel : "Reset rotation", o = document.createElement("button");
    o.className = e + "-reset", o.setAttribute("type", "button"), o.title = r, o.appendChild(this.label_), o.addEventListener(
      $.CLICK,
      this.handleClick_.bind(this),
      !1
    );
    const a = e + " " + On + " " + Jr, l = this.element;
    l.className = a, l.appendChild(o), this.callResetNorth_ = t.resetNorth ? t.resetNorth : void 0, this.duration_ = t.duration !== void 0 ? t.duration : 250, this.autoHide_ = t.autoHide !== void 0 ? t.autoHide : !0, this.rotation_ = void 0, this.autoHide_ && this.element.classList.add(Xs);
  }
  handleClick_(t) {
    t.preventDefault(), this.callResetNorth_ !== void 0 ? this.callResetNorth_() : this.resetNorth_();
  }
  resetNorth_() {
    const e = this.getMap().getView();
    if (!e)
      return;
    const n = e.getRotation();
    n !== void 0 && (this.duration_ > 0 && n % (2 * Math.PI) !== 0 ? e.animate({
      rotation: 0,
      duration: this.duration_,
      easing: Fn
    }) : e.setRotation(0));
  }
  render(t) {
    const e = t.frameState;
    if (!e)
      return;
    const n = e.viewState.rotation;
    if (n != this.rotation_) {
      const s = "rotate(" + n + "rad)";
      if (this.autoHide_) {
        const r = this.element.classList.contains(Xs);
        !r && n === 0 ? this.element.classList.add(Xs) : r && n !== 0 && this.element.classList.remove(Xs);
      }
      this.label_.style.transform = s;
    }
    this.rotation_ = n;
  }
}
const jg = Vg;
class Wg extends Ht {
  constructor(t) {
    t = t || {}, super({
      element: document.createElement("div"),
      target: t.target
    });
    const e = t.className !== void 0 ? t.className : "ol-zoom", n = t.delta !== void 0 ? t.delta : 1, s = t.zoomInClassName !== void 0 ? t.zoomInClassName : e + "-in", r = t.zoomOutClassName !== void 0 ? t.zoomOutClassName : e + "-out", o = t.zoomInLabel !== void 0 ? t.zoomInLabel : "+", a = t.zoomOutLabel !== void 0 ? t.zoomOutLabel : "\u2013", l = t.zoomInTipLabel !== void 0 ? t.zoomInTipLabel : "Zoom in", h = t.zoomOutTipLabel !== void 0 ? t.zoomOutTipLabel : "Zoom out", c = document.createElement("button");
    c.className = s, c.setAttribute("type", "button"), c.title = l, c.appendChild(
      typeof o == "string" ? document.createTextNode(o) : o
    ), c.addEventListener(
      $.CLICK,
      this.handleClick_.bind(this, n),
      !1
    );
    const u = document.createElement("button");
    u.className = r, u.setAttribute("type", "button"), u.title = h, u.appendChild(
      typeof a == "string" ? document.createTextNode(a) : a
    ), u.addEventListener(
      $.CLICK,
      this.handleClick_.bind(this, -n),
      !1
    );
    const d = e + " " + On + " " + Jr, f = this.element;
    f.className = d, f.appendChild(c), f.appendChild(u), this.duration_ = t.duration !== void 0 ? t.duration : 250;
  }
  handleClick_(t, e) {
    e.preventDefault(), this.zoomByDelta_(t);
  }
  zoomByDelta_(t) {
    const n = this.getMap().getView();
    if (!n)
      return;
    const s = n.getZoom();
    if (s !== void 0) {
      const r = n.getConstrainedZoom(s + t);
      this.duration_ > 0 ? (n.getAnimating() && n.cancelAnimations(), n.animate({
        zoom: r,
        duration: this.duration_,
        easing: Fn
      })) : n.setZoom(r);
    }
  }
}
const Uc = Wg;
function Ug(i) {
  i = i || {};
  const t = new te();
  return (i.zoom !== void 0 ? i.zoom : !0) && t.push(new Uc(i.zoomOptions)), (i.rotate !== void 0 ? i.rotate : !0) && t.push(new jg(i.rotateOptions)), (i.attribution !== void 0 ? i.attribution : !0) && t.push(new zg(i.attributionOptions)), t;
}
const ia = {
  ACTIVE: "active"
};
class Zg extends fe {
  constructor(t) {
    super(), this.on, this.once, this.un, t && t.handleEvent && (this.handleEvent = t.handleEvent), this.map_ = null, this.setActive(!0);
  }
  getActive() {
    return this.get(ia.ACTIVE);
  }
  getMap() {
    return this.map_;
  }
  handleEvent(t) {
    return !0;
  }
  setActive(t) {
    this.set(ia.ACTIVE, t);
  }
  setMap(t) {
    this.map_ = t;
  }
}
function Xg(i, t, e) {
  const n = i.getCenterInternal();
  if (n) {
    const s = [n[0] + t[0], n[1] + t[1]];
    i.animateInternal({
      duration: e !== void 0 ? e : 250,
      easing: ug,
      center: i.getConstrainedCenter(s)
    });
  }
}
function qa(i, t, e, n) {
  const s = i.getZoom();
  if (s === void 0)
    return;
  const r = i.getConstrainedZoom(s + t), o = i.getResolutionForZoom(r);
  i.getAnimating() && i.cancelAnimations(), i.animate({
    resolution: o,
    anchor: e,
    duration: n !== void 0 ? n : 250,
    easing: Fn
  });
}
const bs = Zg;
class Hg extends bs {
  constructor(t) {
    super(), t = t || {}, this.delta_ = t.delta ? t.delta : 1, this.duration_ = t.duration !== void 0 ? t.duration : 250;
  }
  handleEvent(t) {
    let e = !1;
    if (t.type == X.DBLCLICK) {
      const n = t.originalEvent, s = t.map, r = t.coordinate, o = n.shiftKey ? -this.delta_ : this.delta_, a = s.getView();
      qa(a, o, r, this.duration_), n.preventDefault(), e = !0;
    }
    return !e;
  }
}
const Yg = Hg;
class qg extends bs {
  constructor(t) {
    t = t || {}, super(
      t
    ), t.handleDownEvent && (this.handleDownEvent = t.handleDownEvent), t.handleDragEvent && (this.handleDragEvent = t.handleDragEvent), t.handleMoveEvent && (this.handleMoveEvent = t.handleMoveEvent), t.handleUpEvent && (this.handleUpEvent = t.handleUpEvent), t.stopDown && (this.stopDown = t.stopDown), this.handlingDownUpSequence = !1, this.targetPointers = [];
  }
  getPointerCount() {
    return this.targetPointers.length;
  }
  handleDownEvent(t) {
    return !1;
  }
  handleDragEvent(t) {
  }
  handleEvent(t) {
    if (!t.originalEvent)
      return !0;
    let e = !1;
    if (this.updateTrackedPointers_(t), this.handlingDownUpSequence) {
      if (t.type == X.POINTERDRAG)
        this.handleDragEvent(t), t.originalEvent.preventDefault();
      else if (t.type == X.POINTERUP) {
        const n = this.handleUpEvent(t);
        this.handlingDownUpSequence = n && this.targetPointers.length > 0;
      }
    } else if (t.type == X.POINTERDOWN) {
      const n = this.handleDownEvent(t);
      this.handlingDownUpSequence = n, e = this.stopDown(n);
    } else
      t.type == X.POINTERMOVE && this.handleMoveEvent(t);
    return !e;
  }
  handleMoveEvent(t) {
  }
  handleUpEvent(t) {
    return !1;
  }
  stopDown(t) {
    return t;
  }
  updateTrackedPointers_(t) {
    t.activePointers && (this.targetPointers = t.activePointers);
  }
}
function Ka(i) {
  const t = i.length;
  let e = 0, n = 0;
  for (let s = 0; s < t; s++)
    e += i[s].clientX, n += i[s].clientY;
  return [e / t, n / t];
}
const Ci = qg;
function na(i) {
  const t = arguments;
  return function(e) {
    let n = !0;
    for (let s = 0, r = t.length; s < r && (n = n && t[s](e), !!n); ++s)
      ;
    return n;
  };
}
const Kg = function(i) {
  const t = i.originalEvent;
  return t.altKey && !(t.metaKey || t.ctrlKey) && !t.shiftKey;
}, Jg = function(i) {
  const t = i.originalEvent;
  return t.altKey && !(t.metaKey || t.ctrlKey) && t.shiftKey;
}, Qg = function(i) {
  const t = i.map.getTargetElement(), e = i.map.getOwnerDocument().activeElement;
  return t.contains(e);
}, Zc = function(i) {
  return i.map.getTargetElement().hasAttribute("tabindex") ? Qg(i) : !0;
}, Ir = ki, Xc = function(i) {
  const t = i.originalEvent;
  return t.button == 0 && !(jd && Wd && t.ctrlKey);
}, t0 = Wi, e0 = function(i) {
  return i.type == X.SINGLECLICK;
}, Ja = function(i) {
  const t = i.originalEvent;
  return !t.altKey && !(t.metaKey || t.ctrlKey) && !t.shiftKey;
}, Hc = function(i) {
  const t = i.originalEvent;
  return !t.altKey && !(t.metaKey || t.ctrlKey) && t.shiftKey;
}, Yc = function(i) {
  const t = i.originalEvent, e = t.target.tagName;
  return e !== "INPUT" && e !== "SELECT" && e !== "TEXTAREA" && !t.target.isContentEditable;
}, wo = function(i) {
  const t = i.originalEvent;
  return Z(t !== void 0, 56), t.pointerType == "mouse";
}, qc = function(i) {
  const t = i.originalEvent;
  return Z(t !== void 0, 56), t.isPrimary && t.button === 0;
};
class i0 extends Ci {
  constructor(t) {
    super({
      stopDown: Wi
    }), t = t || {}, this.kinetic_ = t.kinetic, this.lastCentroid = null, this.lastPointersCount_, this.panning_ = !1;
    const e = t.condition ? t.condition : na(Ja, qc);
    this.condition_ = t.onFocusOnly ? na(Zc, e) : e, this.noKinetic_ = !1;
  }
  handleDragEvent(t) {
    this.panning_ || (this.panning_ = !0, this.getMap().getView().beginInteraction());
    const e = this.targetPointers, n = Ka(e);
    if (e.length == this.lastPointersCount_) {
      if (this.kinetic_ && this.kinetic_.update(n[0], n[1]), this.lastCentroid) {
        const s = [
          this.lastCentroid[0] - n[0],
          n[1] - this.lastCentroid[1]
        ], o = t.map.getView();
        Ec(s, o.getResolution()), Pa(s, o.getRotation()), o.adjustCenterInternal(s);
      }
    } else
      this.kinetic_ && this.kinetic_.begin();
    this.lastCentroid = n, this.lastPointersCount_ = e.length, t.originalEvent.preventDefault();
  }
  handleUpEvent(t) {
    const e = t.map, n = e.getView();
    if (this.targetPointers.length === 0) {
      if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
        const s = this.kinetic_.getDistance(), r = this.kinetic_.getAngle(), o = n.getCenterInternal(), a = e.getPixelFromCoordinateInternal(o), l = e.getCoordinateFromPixelInternal([
          a[0] - s * Math.cos(r),
          a[1] - s * Math.sin(r)
        ]);
        n.animateInternal({
          center: n.getConstrainedCenter(l),
          duration: 500,
          easing: Fn
        });
      }
      return this.panning_ && (this.panning_ = !1, n.endInteraction()), !1;
    } else
      return this.kinetic_ && this.kinetic_.begin(), this.lastCentroid = null, !0;
  }
  handleDownEvent(t) {
    if (this.targetPointers.length > 0 && this.condition_(t)) {
      const n = t.map.getView();
      return this.lastCentroid = null, n.getAnimating() && n.cancelAnimations(), this.kinetic_ && this.kinetic_.begin(), this.noKinetic_ = this.targetPointers.length > 1, !0;
    } else
      return !1;
  }
}
const n0 = i0;
class s0 extends Ci {
  constructor(t) {
    t = t || {}, super({
      stopDown: Wi
    }), this.condition_ = t.condition ? t.condition : Jg, this.lastAngle_ = void 0, this.duration_ = t.duration !== void 0 ? t.duration : 250;
  }
  handleDragEvent(t) {
    if (!wo(t))
      return;
    const e = t.map, n = e.getView();
    if (n.getConstraints().rotation === Ba)
      return;
    const s = e.getSize(), r = t.pixel, o = Math.atan2(s[1] / 2 - r[1], r[0] - s[0] / 2);
    if (this.lastAngle_ !== void 0) {
      const a = o - this.lastAngle_;
      n.adjustRotationInternal(-a);
    }
    this.lastAngle_ = o;
  }
  handleUpEvent(t) {
    return wo(t) ? (t.map.getView().endInteraction(this.duration_), !1) : !0;
  }
  handleDownEvent(t) {
    return wo(t) && Xc(t) && this.condition_(t) ? (t.map.getView().beginInteraction(), this.lastAngle_ = void 0, !0) : !1;
  }
}
const r0 = s0;
class o0 extends Ca {
  constructor(t) {
    super(), this.geometry_ = null, this.element_ = document.createElement("div"), this.element_.style.position = "absolute", this.element_.style.pointerEvents = "auto", this.element_.className = "ol-box " + t, this.map_ = null, this.startPixel_ = null, this.endPixel_ = null;
  }
  disposeInternal() {
    this.setMap(null);
  }
  render_() {
    const t = this.startPixel_, e = this.endPixel_, n = "px", s = this.element_.style;
    s.left = Math.min(t[0], e[0]) + n, s.top = Math.min(t[1], e[1]) + n, s.width = Math.abs(e[0] - t[0]) + n, s.height = Math.abs(e[1] - t[1]) + n;
  }
  setMap(t) {
    if (this.map_) {
      this.map_.getOverlayContainer().removeChild(this.element_);
      const e = this.element_.style;
      e.left = "inherit", e.top = "inherit", e.width = "inherit", e.height = "inherit";
    }
    this.map_ = t, this.map_ && this.map_.getOverlayContainer().appendChild(this.element_);
  }
  setPixels(t, e) {
    this.startPixel_ = t, this.endPixel_ = e, this.createOrUpdateGeometry(), this.render_();
  }
  createOrUpdateGeometry() {
    const t = this.startPixel_, e = this.endPixel_, s = [
      t,
      [t[0], e[1]],
      e,
      [e[0], t[1]]
    ].map(
      this.map_.getCoordinateFromPixelInternal,
      this.map_
    );
    s[4] = s[0].slice(), this.geometry_ ? this.geometry_.setCoordinates([s]) : this.geometry_ = new Bi([s]);
  }
  getGeometry() {
    return this.geometry_;
  }
}
const a0 = o0, qs = {
  BOXSTART: "boxstart",
  BOXDRAG: "boxdrag",
  BOXEND: "boxend",
  BOXCANCEL: "boxcancel"
};
class So extends ie {
  constructor(t, e, n) {
    super(t), this.coordinate = e, this.mapBrowserEvent = n;
  }
}
class l0 extends Ci {
  constructor(t) {
    super(), this.on, this.once, this.un, t = t || {}, this.box_ = new a0(t.className || "ol-dragbox"), this.minArea_ = t.minArea !== void 0 ? t.minArea : 64, t.onBoxEnd && (this.onBoxEnd = t.onBoxEnd), this.startPixel_ = null, this.condition_ = t.condition ? t.condition : Xc, this.boxEndCondition_ = t.boxEndCondition ? t.boxEndCondition : this.defaultBoxEndCondition;
  }
  defaultBoxEndCondition(t, e, n) {
    const s = n[0] - e[0], r = n[1] - e[1];
    return s * s + r * r >= this.minArea_;
  }
  getGeometry() {
    return this.box_.getGeometry();
  }
  handleDragEvent(t) {
    this.box_.setPixels(this.startPixel_, t.pixel), this.dispatchEvent(
      new So(
        qs.BOXDRAG,
        t.coordinate,
        t
      )
    );
  }
  handleUpEvent(t) {
    this.box_.setMap(null);
    const e = this.boxEndCondition_(
      t,
      this.startPixel_,
      t.pixel
    );
    return e && this.onBoxEnd(t), this.dispatchEvent(
      new So(
        e ? qs.BOXEND : qs.BOXCANCEL,
        t.coordinate,
        t
      )
    ), !1;
  }
  handleDownEvent(t) {
    return this.condition_(t) ? (this.startPixel_ = t.pixel, this.box_.setMap(t.map), this.box_.setPixels(this.startPixel_, this.startPixel_), this.dispatchEvent(
      new So(
        qs.BOXSTART,
        t.coordinate,
        t
      )
    ), !0) : !1;
  }
  onBoxEnd(t) {
  }
}
const h0 = l0;
class c0 extends h0 {
  constructor(t) {
    t = t || {};
    const e = t.condition ? t.condition : Hc;
    super({
      condition: e,
      className: t.className || "ol-dragzoom",
      minArea: t.minArea
    }), this.duration_ = t.duration !== void 0 ? t.duration : 200, this.out_ = t.out !== void 0 ? t.out : !1;
  }
  onBoxEnd(t) {
    const n = this.getMap().getView();
    let s = this.getGeometry();
    if (this.out_) {
      const r = n.rotatedExtentForGeometry(s), o = n.getResolutionForExtentInternal(r), a = n.getResolution() / o;
      s = s.clone(), s.scale(a * a);
    }
    n.fitInternal(s, {
      duration: this.duration_,
      easing: Fn
    });
  }
}
const u0 = c0, Si = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};
class d0 extends bs {
  constructor(t) {
    super(), t = t || {}, this.defaultCondition_ = function(e) {
      return Ja(e) && Yc(e);
    }, this.condition_ = t.condition !== void 0 ? t.condition : this.defaultCondition_, this.duration_ = t.duration !== void 0 ? t.duration : 100, this.pixelDelta_ = t.pixelDelta !== void 0 ? t.pixelDelta : 128;
  }
  handleEvent(t) {
    let e = !1;
    if (t.type == $.KEYDOWN) {
      const n = t.originalEvent, s = n.keyCode;
      if (this.condition_(t) && (s == Si.DOWN || s == Si.LEFT || s == Si.RIGHT || s == Si.UP)) {
        const o = t.map.getView(), a = o.getResolution() * this.pixelDelta_;
        let l = 0, h = 0;
        s == Si.DOWN ? h = -a : s == Si.LEFT ? l = -a : s == Si.RIGHT ? l = a : h = a;
        const c = [l, h];
        Pa(c, o.getRotation()), Xg(o, c, this.duration_), n.preventDefault(), e = !0;
      }
    }
    return !e;
  }
}
const f0 = d0;
class g0 extends bs {
  constructor(t) {
    super(), t = t || {}, this.condition_ = t.condition ? t.condition : Yc, this.delta_ = t.delta ? t.delta : 1, this.duration_ = t.duration !== void 0 ? t.duration : 100;
  }
  handleEvent(t) {
    let e = !1;
    if (t.type == $.KEYDOWN || t.type == $.KEYPRESS) {
      const n = t.originalEvent, s = n.charCode;
      if (this.condition_(t) && (s == "+".charCodeAt(0) || s == "-".charCodeAt(0))) {
        const r = t.map, o = s == "+".charCodeAt(0) ? this.delta_ : -this.delta_, a = r.getView();
        qa(a, o, void 0, this.duration_), n.preventDefault(), e = !0;
      }
    }
    return !e;
  }
}
const m0 = g0;
class _0 {
  constructor(t, e, n) {
    this.decay_ = t, this.minVelocity_ = e, this.delay_ = n, this.points_ = [], this.angle_ = 0, this.initialVelocity_ = 0;
  }
  begin() {
    this.points_.length = 0, this.angle_ = 0, this.initialVelocity_ = 0;
  }
  update(t, e) {
    this.points_.push(t, e, Date.now());
  }
  end() {
    if (this.points_.length < 6)
      return !1;
    const t = Date.now() - this.delay_, e = this.points_.length - 3;
    if (this.points_[e + 2] < t)
      return !1;
    let n = e - 3;
    for (; n > 0 && this.points_[n + 2] > t; )
      n -= 3;
    const s = this.points_[e + 2] - this.points_[n + 2];
    if (s < 1e3 / 60)
      return !1;
    const r = this.points_[e] - this.points_[n], o = this.points_[e + 1] - this.points_[n + 1];
    return this.angle_ = Math.atan2(o, r), this.initialVelocity_ = Math.sqrt(r * r + o * o) / s, this.initialVelocity_ > this.minVelocity_;
  }
  getDistance() {
    return (this.minVelocity_ - this.initialVelocity_) / this.decay_;
  }
  getAngle() {
    return this.angle_;
  }
}
const p0 = _0;
class y0 extends bs {
  constructor(t) {
    t = t || {}, super(
      t
    ), this.totalDelta_ = 0, this.lastDelta_ = 0, this.maxDelta_ = t.maxDelta !== void 0 ? t.maxDelta : 1, this.duration_ = t.duration !== void 0 ? t.duration : 250, this.timeout_ = t.timeout !== void 0 ? t.timeout : 80, this.useAnchor_ = t.useAnchor !== void 0 ? t.useAnchor : !0, this.constrainResolution_ = t.constrainResolution !== void 0 ? t.constrainResolution : !1;
    const e = t.condition ? t.condition : Ir;
    this.condition_ = t.onFocusOnly ? na(Zc, e) : e, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_, this.mode_ = void 0, this.trackpadEventGap_ = 400, this.trackpadTimeoutId_, this.deltaPerZoom_ = 300;
  }
  endInteraction_() {
    this.trackpadTimeoutId_ = void 0;
    const t = this.getMap();
    if (!t)
      return;
    t.getView().endInteraction(
      void 0,
      this.lastDelta_ ? this.lastDelta_ > 0 ? 1 : -1 : 0,
      this.lastAnchor_
    );
  }
  handleEvent(t) {
    if (!this.condition_(t) || t.type !== $.WHEEL)
      return !0;
    const n = t.map, s = t.originalEvent;
    s.preventDefault(), this.useAnchor_ && (this.lastAnchor_ = t.coordinate);
    let r;
    if (t.type == $.WHEEL && (r = s.deltaY, zd && s.deltaMode === WheelEvent.DOM_DELTA_PIXEL && (r /= uc), s.deltaMode === WheelEvent.DOM_DELTA_LINE && (r *= 40)), r === 0)
      return !1;
    this.lastDelta_ = r;
    const o = Date.now();
    this.startTime_ === void 0 && (this.startTime_ = o), (!this.mode_ || o - this.startTime_ > this.trackpadEventGap_) && (this.mode_ = Math.abs(r) < 4 ? "trackpad" : "wheel");
    const a = n.getView();
    if (this.mode_ === "trackpad" && !(a.getConstrainResolution() || this.constrainResolution_))
      return this.trackpadTimeoutId_ ? clearTimeout(this.trackpadTimeoutId_) : (a.getAnimating() && a.cancelAnimations(), a.beginInteraction()), this.trackpadTimeoutId_ = setTimeout(
        this.endInteraction_.bind(this),
        this.timeout_
      ), a.adjustZoom(-r / this.deltaPerZoom_, this.lastAnchor_), this.startTime_ = o, !1;
    this.totalDelta_ += r;
    const l = Math.max(this.timeout_ - (o - this.startTime_), 0);
    return clearTimeout(this.timeoutId_), this.timeoutId_ = setTimeout(
      this.handleWheelZoom_.bind(this, n),
      l
    ), !1;
  }
  handleWheelZoom_(t) {
    const e = t.getView();
    e.getAnimating() && e.cancelAnimations();
    let n = -gt(
      this.totalDelta_,
      -this.maxDelta_ * this.deltaPerZoom_,
      this.maxDelta_ * this.deltaPerZoom_
    ) / this.deltaPerZoom_;
    (e.getConstrainResolution() || this.constrainResolution_) && (n = n ? n > 0 ? 1 : -1 : 0), qa(e, n, this.lastAnchor_, this.duration_), this.mode_ = void 0, this.totalDelta_ = 0, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_ = void 0;
  }
  setMouseAnchor(t) {
    this.useAnchor_ = t, t || (this.lastAnchor_ = null);
  }
}
const x0 = y0;
class v0 extends Ci {
  constructor(t) {
    t = t || {};
    const e = t;
    e.stopDown || (e.stopDown = Wi), super(e), this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.threshold_ = t.threshold !== void 0 ? t.threshold : 0.3, this.duration_ = t.duration !== void 0 ? t.duration : 250;
  }
  handleDragEvent(t) {
    let e = 0;
    const n = this.targetPointers[0], s = this.targetPointers[1], r = Math.atan2(
      s.clientY - n.clientY,
      s.clientX - n.clientX
    );
    if (this.lastAngle_ !== void 0) {
      const c = r - this.lastAngle_;
      this.rotationDelta_ += c, !this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_ && (this.rotating_ = !0), e = c;
    }
    this.lastAngle_ = r;
    const o = t.map, a = o.getView();
    if (a.getConstraints().rotation === Ba)
      return;
    const l = o.getViewport().getBoundingClientRect(), h = Ka(this.targetPointers);
    h[0] -= l.left, h[1] -= l.top, this.anchor_ = o.getCoordinateFromPixelInternal(h), this.rotating_ && (o.render(), a.adjustRotationInternal(e, this.anchor_));
  }
  handleUpEvent(t) {
    return this.targetPointers.length < 2 ? (t.map.getView().endInteraction(this.duration_), !1) : !0;
  }
  handleDownEvent(t) {
    if (this.targetPointers.length >= 2) {
      const e = t.map;
      return this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.handlingDownUpSequence || e.getView().beginInteraction(), !0;
    } else
      return !1;
  }
}
const C0 = v0;
class M0 extends Ci {
  constructor(t) {
    t = t || {};
    const e = t;
    e.stopDown || (e.stopDown = Wi), super(e), this.anchor_ = null, this.duration_ = t.duration !== void 0 ? t.duration : 400, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1;
  }
  handleDragEvent(t) {
    let e = 1;
    const n = this.targetPointers[0], s = this.targetPointers[1], r = n.clientX - s.clientX, o = n.clientY - s.clientY, a = Math.sqrt(r * r + o * o);
    this.lastDistance_ !== void 0 && (e = this.lastDistance_ / a), this.lastDistance_ = a;
    const l = t.map, h = l.getView();
    e != 1 && (this.lastScaleDelta_ = e);
    const c = l.getViewport().getBoundingClientRect(), u = Ka(this.targetPointers);
    u[0] -= c.left, u[1] -= c.top, this.anchor_ = l.getCoordinateFromPixelInternal(u), l.render(), h.adjustResolutionInternal(e, this.anchor_);
  }
  handleUpEvent(t) {
    if (this.targetPointers.length < 2) {
      const n = t.map.getView(), s = this.lastScaleDelta_ > 1 ? 1 : -1;
      return n.endInteraction(this.duration_, s), !1;
    } else
      return !0;
  }
  handleDownEvent(t) {
    if (this.targetPointers.length >= 2) {
      const e = t.map;
      return this.anchor_ = null, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1, this.handlingDownUpSequence || e.getView().beginInteraction(), !0;
    } else
      return !1;
  }
}
const E0 = M0;
function w0(i) {
  i = i || {};
  const t = new te(), e = new p0(-5e-3, 0.05, 100);
  return (i.altShiftDragRotate !== void 0 ? i.altShiftDragRotate : !0) && t.push(new r0()), (i.doubleClickZoom !== void 0 ? i.doubleClickZoom : !0) && t.push(
    new Yg({
      delta: i.zoomDelta,
      duration: i.zoomDuration
    })
  ), (i.dragPan !== void 0 ? i.dragPan : !0) && t.push(
    new n0({
      onFocusOnly: i.onFocusOnly,
      kinetic: e
    })
  ), (i.pinchRotate !== void 0 ? i.pinchRotate : !0) && t.push(new C0()), (i.pinchZoom !== void 0 ? i.pinchZoom : !0) && t.push(
    new E0({
      duration: i.zoomDuration
    })
  ), (i.keyboard !== void 0 ? i.keyboard : !0) && (t.push(new f0()), t.push(
    new m0({
      delta: i.zoomDelta,
      duration: i.zoomDuration
    })
  )), (i.mouseWheelZoom !== void 0 ? i.mouseWheelZoom : !0) && t.push(
    new x0({
      onFocusOnly: i.onFocusOnly,
      duration: i.zoomDuration
    })
  ), (i.shiftDragZoom !== void 0 ? i.shiftDragZoom : !0) && t.push(
    new u0({
      duration: i.zoomDuration
    })
  ), t;
}
function ah(i) {
  return i[0] > 0 && i[1] > 0;
}
function S0(i, t, e) {
  return e === void 0 && (e = [0, 0]), e[0] = i[0] * t + 0.5 | 0, e[1] = i[1] * t + 0.5 | 0, e;
}
function Wt(i, t) {
  return Array.isArray(i) ? i : (t === void 0 ? t = [i, i] : (t[0] = i, t[1] = i), t);
}
function Kc(i) {
  if (i instanceof Kr) {
    i.setMapInternal(null);
    return;
  }
  i instanceof Qr && i.getLayers().forEach(Kc);
}
function Jc(i, t) {
  if (i instanceof Kr) {
    i.setMapInternal(t);
    return;
  }
  if (i instanceof Qr) {
    const e = i.getLayers().getArray();
    for (let n = 0, s = e.length; n < s; ++n)
      Jc(e[n], t);
  }
}
class T0 extends fe {
  constructor(t) {
    super(), t = t || {}, this.on, this.once, this.un;
    const e = b0(t);
    this.renderComplete_, this.loaded_ = !0, this.boundHandleBrowserEvent_ = this.handleBrowserEvent.bind(this), this.maxTilesLoading_ = t.maxTilesLoading !== void 0 ? t.maxTilesLoading : 16, this.pixelRatio_ = t.pixelRatio !== void 0 ? t.pixelRatio : uc, this.postRenderTimeoutHandle_, this.animationDelayKey_, this.animationDelay_ = this.animationDelay_.bind(this), this.coordinateToPixelTransform_ = xe(), this.pixelToCoordinateTransform_ = xe(), this.frameIndex_ = 0, this.frameState_ = null, this.previousExtent_ = null, this.viewPropertyListenerKey_ = null, this.viewChangeListenerKey_ = null, this.layerGroupPropertyListenerKeys_ = null, this.viewport_ = document.createElement("div"), this.viewport_.className = "ol-viewport" + ("ontouchstart" in window ? " ol-touch" : ""), this.viewport_.style.position = "relative", this.viewport_.style.overflow = "hidden", this.viewport_.style.width = "100%", this.viewport_.style.height = "100%", this.overlayContainer_ = document.createElement("div"), this.overlayContainer_.style.position = "absolute", this.overlayContainer_.style.zIndex = "0", this.overlayContainer_.style.width = "100%", this.overlayContainer_.style.height = "100%", this.overlayContainer_.style.pointerEvents = "none", this.overlayContainer_.className = "ol-overlaycontainer", this.viewport_.appendChild(this.overlayContainer_), this.overlayContainerStopEvent_ = document.createElement("div"), this.overlayContainerStopEvent_.style.position = "absolute", this.overlayContainerStopEvent_.style.zIndex = "0", this.overlayContainerStopEvent_.style.width = "100%", this.overlayContainerStopEvent_.style.height = "100%", this.overlayContainerStopEvent_.style.pointerEvents = "none", this.overlayContainerStopEvent_.className = "ol-overlaycontainer-stopevent", this.viewport_.appendChild(this.overlayContainerStopEvent_), this.mapBrowserEventHandler_ = null, this.moveTolerance_ = t.moveTolerance, this.keyboardEventTarget_ = e.keyboardEventTarget, this.targetChangeHandlerKeys_ = null, this.controls = e.controls || Ug(), this.interactions = e.interactions || w0({
      onFocusOnly: !0
    }), this.overlays_ = e.overlays, this.overlayIdIndex_ = {}, this.renderer_ = null, this.postRenderFunctions_ = [], this.tileQueue_ = new Gf(
      this.getTilePriority.bind(this),
      this.handleTileChange_.bind(this)
    ), this.addChangeListener(
      vt.LAYERGROUP,
      this.handleLayerGroupChanged_
    ), this.addChangeListener(vt.VIEW, this.handleViewChanged_), this.addChangeListener(vt.SIZE, this.handleSizeChanged_), this.addChangeListener(vt.TARGET, this.handleTargetChanged_), this.setProperties(e.values);
    const n = this;
    t.view && !(t.view instanceof ii) && t.view.then(function(s) {
      n.setView(new ii(s));
    }), this.controls.addEventListener(
      Et.ADD,
      function(s) {
        s.element.setMap(this);
      }.bind(this)
    ), this.controls.addEventListener(
      Et.REMOVE,
      function(s) {
        s.element.setMap(null);
      }.bind(this)
    ), this.interactions.addEventListener(
      Et.ADD,
      function(s) {
        s.element.setMap(this);
      }.bind(this)
    ), this.interactions.addEventListener(
      Et.REMOVE,
      function(s) {
        s.element.setMap(null);
      }.bind(this)
    ), this.overlays_.addEventListener(
      Et.ADD,
      function(s) {
        this.addOverlayInternal_(s.element);
      }.bind(this)
    ), this.overlays_.addEventListener(
      Et.REMOVE,
      function(s) {
        const r = s.element.getId();
        r !== void 0 && delete this.overlayIdIndex_[r.toString()], s.element.setMap(null);
      }.bind(this)
    ), this.controls.forEach(
      function(s) {
        s.setMap(this);
      }.bind(this)
    ), this.interactions.forEach(
      function(s) {
        s.setMap(this);
      }.bind(this)
    ), this.overlays_.forEach(this.addOverlayInternal_.bind(this));
  }
  addControl(t) {
    this.getControls().push(t);
  }
  addInteraction(t) {
    this.getInteractions().push(t);
  }
  addLayer(t) {
    this.getLayerGroup().getLayers().push(t);
  }
  handleLayerAdd_(t) {
    Jc(t.layer, this);
  }
  addOverlay(t) {
    this.getOverlays().push(t);
  }
  addOverlayInternal_(t) {
    const e = t.getId();
    e !== void 0 && (this.overlayIdIndex_[e.toString()] = t), t.setMap(this);
  }
  disposeInternal() {
    this.controls.clear(), this.interactions.clear(), this.overlays_.clear(), this.setTarget(null), super.disposeInternal();
  }
  forEachFeatureAtPixel(t, e, n) {
    if (!this.frameState_ || !this.renderer_)
      return;
    const s = this.getCoordinateFromPixelInternal(t);
    n = n !== void 0 ? n : {};
    const r = n.hitTolerance !== void 0 ? n.hitTolerance : 0, o = n.layerFilter !== void 0 ? n.layerFilter : ki, a = n.checkWrapped !== !1;
    return this.renderer_.forEachFeatureAtCoordinate(
      s,
      this.frameState_,
      r,
      a,
      e,
      null,
      o,
      null
    );
  }
  getFeaturesAtPixel(t, e) {
    const n = [];
    return this.forEachFeatureAtPixel(
      t,
      function(s) {
        n.push(s);
      },
      e
    ), n;
  }
  getAllLayers() {
    const t = [];
    function e(n) {
      n.forEach(function(s) {
        s instanceof Qr ? e(s.getLayers()) : t.push(s);
      });
    }
    return e(this.getLayers()), t;
  }
  hasFeatureAtPixel(t, e) {
    if (!this.frameState_ || !this.renderer_)
      return !1;
    const n = this.getCoordinateFromPixelInternal(t);
    e = e !== void 0 ? e : {};
    const s = e.layerFilter !== void 0 ? e.layerFilter : ki, r = e.hitTolerance !== void 0 ? e.hitTolerance : 0, o = e.checkWrapped !== !1;
    return this.renderer_.hasFeatureAtCoordinate(
      n,
      this.frameState_,
      r,
      o,
      s,
      null
    );
  }
  getEventCoordinate(t) {
    return this.getCoordinateFromPixel(this.getEventPixel(t));
  }
  getEventCoordinateInternal(t) {
    return this.getCoordinateFromPixelInternal(this.getEventPixel(t));
  }
  getEventPixel(t) {
    const e = this.viewport_.getBoundingClientRect(), n = "changedTouches" in t ? t.changedTouches[0] : t;
    return [
      n.clientX - e.left,
      n.clientY - e.top
    ];
  }
  getTarget() {
    return this.get(vt.TARGET);
  }
  getTargetElement() {
    const t = this.getTarget();
    return t !== void 0 ? typeof t == "string" ? document.getElementById(t) : t : null;
  }
  getCoordinateFromPixel(t) {
    return In(
      this.getCoordinateFromPixelInternal(t),
      this.getView().getProjection()
    );
  }
  getCoordinateFromPixelInternal(t) {
    const e = this.frameState_;
    return e ? Mt(
      e.pixelToCoordinateTransform,
      t.slice()
    ) : null;
  }
  getControls() {
    return this.controls;
  }
  getOverlays() {
    return this.overlays_;
  }
  getOverlayById(t) {
    const e = this.overlayIdIndex_[t.toString()];
    return e !== void 0 ? e : null;
  }
  getInteractions() {
    return this.interactions;
  }
  getLayerGroup() {
    return this.get(vt.LAYERGROUP);
  }
  setLayers(t) {
    const e = this.getLayerGroup();
    if (t instanceof te) {
      e.setLayers(t);
      return;
    }
    const n = e.getLayers();
    n.clear(), n.extend(t);
  }
  getLayers() {
    return this.getLayerGroup().getLayers();
  }
  getLoadingOrNotReady() {
    const t = this.getLayerGroup().getLayerStatesArray();
    for (let e = 0, n = t.length; e < n; ++e) {
      const s = t[e];
      if (!s.visible)
        continue;
      const r = s.layer.getRenderer();
      if (r && !r.ready)
        return !0;
      const o = s.layer.getSource();
      if (o && o.loading)
        return !0;
    }
    return !1;
  }
  getPixelFromCoordinate(t) {
    const e = ot(
      t,
      this.getView().getProjection()
    );
    return this.getPixelFromCoordinateInternal(e);
  }
  getPixelFromCoordinateInternal(t) {
    const e = this.frameState_;
    return e ? Mt(
      e.coordinateToPixelTransform,
      t.slice(0, 2)
    ) : null;
  }
  getRenderer() {
    return this.renderer_;
  }
  getSize() {
    return this.get(vt.SIZE);
  }
  getView() {
    return this.get(vt.VIEW);
  }
  getViewport() {
    return this.viewport_;
  }
  getOverlayContainer() {
    return this.overlayContainer_;
  }
  getOverlayContainerStopEvent() {
    return this.overlayContainerStopEvent_;
  }
  getOwnerDocument() {
    const t = this.getTargetElement();
    return t ? t.ownerDocument : document;
  }
  getTilePriority(t, e, n, s) {
    return $f(
      this.frameState_,
      t,
      e,
      n,
      s
    );
  }
  handleBrowserEvent(t, e) {
    e = e || t.type;
    const n = new Fe(e, this, t);
    this.handleMapBrowserEvent(n);
  }
  handleMapBrowserEvent(t) {
    if (!this.frameState_)
      return;
    const e = t.originalEvent, n = e.type;
    if (n === Ko.POINTERDOWN || n === $.WHEEL || n === $.KEYDOWN) {
      const s = this.getOwnerDocument(), r = this.viewport_.getRootNode ? this.viewport_.getRootNode() : s, o = e.target;
      if (this.overlayContainerStopEvent_.contains(o) || !(r === s ? s.documentElement : r).contains(o))
        return;
    }
    if (t.frameState = this.frameState_, this.dispatchEvent(t) !== !1) {
      const s = this.getInteractions().getArray().slice();
      for (let r = s.length - 1; r >= 0; r--) {
        const o = s[r];
        if (o.getMap() !== this || !o.getActive() || !this.getTargetElement())
          continue;
        if (!o.handleEvent(t) || t.propagationStopped)
          break;
      }
    }
  }
  handlePostRender() {
    const t = this.frameState_, e = this.tileQueue_;
    if (!e.isEmpty()) {
      let s = this.maxTilesLoading_, r = s;
      if (t) {
        const o = t.viewHints;
        if (o[Rt.ANIMATING] || o[Rt.INTERACTING]) {
          const a = Date.now() - t.time > 8;
          s = a ? 0 : 8, r = a ? 0 : 2;
        }
      }
      e.getTilesLoading() < s && (e.reprioritize(), e.loadMoreTiles(s, r));
    }
    t && this.renderer_ && !t.animate && (this.renderComplete_ === !0 ? (this.hasListener(li.RENDERCOMPLETE) && this.renderer_.dispatchRenderEvent(
      li.RENDERCOMPLETE,
      t
    ), this.loaded_ === !1 && (this.loaded_ = !0, this.dispatchEvent(
      new an(Qe.LOADEND, this, t)
    ))) : this.loaded_ === !0 && (this.loaded_ = !1, this.dispatchEvent(
      new an(Qe.LOADSTART, this, t)
    )));
    const n = this.postRenderFunctions_;
    for (let s = 0, r = n.length; s < r; ++s)
      n[s](this, t);
    n.length = 0;
  }
  handleSizeChanged_() {
    this.getView() && !this.getView().getAnimating() && this.getView().resolveConstraints(0), this.render();
  }
  handleTargetChanged_() {
    if (this.mapBrowserEventHandler_) {
      for (let e = 0, n = this.targetChangeHandlerKeys_.length; e < n; ++e)
        it(this.targetChangeHandlerKeys_[e]);
      this.targetChangeHandlerKeys_ = null, this.viewport_.removeEventListener(
        $.CONTEXTMENU,
        this.boundHandleBrowserEvent_
      ), this.viewport_.removeEventListener(
        $.WHEEL,
        this.boundHandleBrowserEvent_
      ), this.mapBrowserEventHandler_.dispose(), this.mapBrowserEventHandler_ = null, Ho(this.viewport_);
    }
    const t = this.getTargetElement();
    if (!t)
      this.renderer_ && (clearTimeout(this.postRenderTimeoutHandle_), this.postRenderTimeoutHandle_ = void 0, this.postRenderFunctions_.length = 0, this.renderer_.dispose(), this.renderer_ = null), this.animationDelayKey_ && (cancelAnimationFrame(this.animationDelayKey_), this.animationDelayKey_ = void 0);
    else {
      t.appendChild(this.viewport_), this.renderer_ || (this.renderer_ = new Lf(this)), this.mapBrowserEventHandler_ = new Ff(
        this,
        this.moveTolerance_
      );
      for (const s in X)
        this.mapBrowserEventHandler_.addEventListener(
          X[s],
          this.handleMapBrowserEvent.bind(this)
        );
      this.viewport_.addEventListener(
        $.CONTEXTMENU,
        this.boundHandleBrowserEvent_,
        !1
      ), this.viewport_.addEventListener(
        $.WHEEL,
        this.boundHandleBrowserEvent_,
        dc ? { passive: !1 } : !1
      );
      const e = this.getOwnerDocument().defaultView, n = this.keyboardEventTarget_ ? this.keyboardEventTarget_ : t;
      this.targetChangeHandlerKeys_ = [
        W(
          n,
          $.KEYDOWN,
          this.handleBrowserEvent,
          this
        ),
        W(
          n,
          $.KEYPRESS,
          this.handleBrowserEvent,
          this
        ),
        W(e, $.RESIZE, this.updateSize, this)
      ];
    }
    this.updateSize();
  }
  handleTileChange_() {
    this.render();
  }
  handleViewPropertyChanged_() {
    this.render();
  }
  handleViewChanged_() {
    this.viewPropertyListenerKey_ && (it(this.viewPropertyListenerKey_), this.viewPropertyListenerKey_ = null), this.viewChangeListenerKey_ && (it(this.viewChangeListenerKey_), this.viewChangeListenerKey_ = null);
    const t = this.getView();
    t && (this.updateViewportSize_(), this.viewPropertyListenerKey_ = W(
      t,
      Sn.PROPERTYCHANGE,
      this.handleViewPropertyChanged_,
      this
    ), this.viewChangeListenerKey_ = W(
      t,
      $.CHANGE,
      this.handleViewPropertyChanged_,
      this
    ), t.resolveConstraints(0)), this.render();
  }
  handleLayerGroupChanged_() {
    this.layerGroupPropertyListenerKeys_ && (this.layerGroupPropertyListenerKeys_.forEach(it), this.layerGroupPropertyListenerKeys_ = null);
    const t = this.getLayerGroup();
    t && (this.handleLayerAdd_(new ti("addlayer", t)), this.layerGroupPropertyListenerKeys_ = [
      W(t, Sn.PROPERTYCHANGE, this.render, this),
      W(t, $.CHANGE, this.render, this),
      W(t, "addlayer", this.handleLayerAdd_, this),
      W(t, "removelayer", this.handleLayerRemove_, this)
    ]), this.render();
  }
  isRendered() {
    return !!this.frameState_;
  }
  animationDelay_() {
    this.animationDelayKey_ = void 0, this.renderFrame_(Date.now());
  }
  renderSync() {
    this.animationDelayKey_ && cancelAnimationFrame(this.animationDelayKey_), this.animationDelay_();
  }
  redrawText() {
    const t = this.getLayerGroup().getLayerStatesArray();
    for (let e = 0, n = t.length; e < n; ++e) {
      const s = t[e].layer;
      s.hasRenderer() && s.getRenderer().handleFontsChanged();
    }
  }
  render() {
    this.renderer_ && this.animationDelayKey_ === void 0 && (this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_));
  }
  removeControl(t) {
    return this.getControls().remove(t);
  }
  removeInteraction(t) {
    return this.getInteractions().remove(t);
  }
  removeLayer(t) {
    return this.getLayerGroup().getLayers().remove(t);
  }
  handleLayerRemove_(t) {
    Kc(t.layer);
  }
  removeOverlay(t) {
    return this.getOverlays().remove(t);
  }
  renderFrame_(t) {
    const e = this.getSize(), n = this.getView(), s = this.frameState_;
    let r = null;
    if (e !== void 0 && ah(e) && n && n.isDef()) {
      const o = n.getHints(
        this.frameState_ ? this.frameState_.viewHints : void 0
      ), a = n.getState();
      if (r = {
        animate: !1,
        coordinateToPixelTransform: this.coordinateToPixelTransform_,
        declutterTree: null,
        extent: Zo(
          a.center,
          a.resolution,
          a.rotation,
          e
        ),
        index: this.frameIndex_++,
        layerIndex: 0,
        layerStatesArray: this.getLayerGroup().getLayerStatesArray(),
        pixelRatio: this.pixelRatio_,
        pixelToCoordinateTransform: this.pixelToCoordinateTransform_,
        postRenderFunctions: [],
        size: e,
        tileQueue: this.tileQueue_,
        time: t,
        usedTiles: {},
        viewState: a,
        viewHints: o,
        wantedTiles: {},
        mapId: j(this),
        renderTargets: {}
      }, a.nextCenter && a.nextResolution) {
        const l = isNaN(a.nextRotation) ? a.rotation : a.nextRotation;
        r.nextExtent = Zo(
          a.nextCenter,
          a.nextResolution,
          l,
          e
        );
      }
    }
    this.frameState_ = r, this.renderer_.renderFrame(r), r && (r.animate && this.render(), Array.prototype.push.apply(
      this.postRenderFunctions_,
      r.postRenderFunctions
    ), s && (!this.previousExtent_ || !ba(this.previousExtent_) && !ls(r.extent, this.previousExtent_)) && (this.dispatchEvent(
      new an(Qe.MOVESTART, this, s)
    ), this.previousExtent_ = Ss(this.previousExtent_)), this.previousExtent_ && !r.viewHints[Rt.ANIMATING] && !r.viewHints[Rt.INTERACTING] && !ls(r.extent, this.previousExtent_) && (this.dispatchEvent(
      new an(Qe.MOVEEND, this, r)
    ), gc(r.extent, this.previousExtent_))), this.dispatchEvent(new an(Qe.POSTRENDER, this, r)), this.renderComplete_ = this.hasListener(Qe.LOADSTART) || this.hasListener(Qe.LOADEND) || this.hasListener(li.RENDERCOMPLETE) ? !this.tileQueue_.getTilesLoading() && !this.tileQueue_.getCount() && !this.getLoadingOrNotReady() : void 0, this.postRenderTimeoutHandle_ || (this.postRenderTimeoutHandle_ = setTimeout(() => {
      this.postRenderTimeoutHandle_ = void 0, this.handlePostRender();
    }, 0));
  }
  setLayerGroup(t) {
    const e = this.getLayerGroup();
    e && this.handleLayerRemove_(new ti("removelayer", e)), this.set(vt.LAYERGROUP, t);
  }
  setSize(t) {
    this.set(vt.SIZE, t);
  }
  setTarget(t) {
    this.set(vt.TARGET, t);
  }
  setView(t) {
    if (!t || t instanceof ii) {
      this.set(vt.VIEW, t);
      return;
    }
    this.set(vt.VIEW, new ii());
    const e = this;
    t.then(function(n) {
      e.setView(new ii(n));
    });
  }
  updateSize() {
    const t = this.getTargetElement();
    let e;
    if (t) {
      const n = getComputedStyle(t), s = t.offsetWidth - parseFloat(n.borderLeftWidth) - parseFloat(n.paddingLeft) - parseFloat(n.paddingRight) - parseFloat(n.borderRightWidth), r = t.offsetHeight - parseFloat(n.borderTopWidth) - parseFloat(n.paddingTop) - parseFloat(n.paddingBottom) - parseFloat(n.borderBottomWidth);
      !isNaN(s) && !isNaN(r) && (e = [s, r], !ah(e) && !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length) && console.warn(
        "No map visible because the map container's width or height are 0."
      ));
    }
    this.setSize(e), this.updateViewportSize_();
  }
  updateViewportSize_() {
    const t = this.getView();
    if (t) {
      let e;
      const n = getComputedStyle(this.viewport_);
      n.width && n.height && (e = [
        parseInt(n.width, 10),
        parseInt(n.height, 10)
      ]), t.setViewportSize(e);
    }
  }
}
function b0(i) {
  let t = null;
  i.keyboardEventTarget !== void 0 && (t = typeof i.keyboardEventTarget == "string" ? document.getElementById(i.keyboardEventTarget) : i.keyboardEventTarget);
  const e = {}, n = i.layers && typeof i.layers.getLayers == "function" ? i.layers : new Qr({
    layers: i.layers
  });
  e[vt.LAYERGROUP] = n, e[vt.TARGET] = i.target, e[vt.VIEW] = i.view instanceof ii ? i.view : new ii();
  let s;
  i.controls !== void 0 && (Array.isArray(i.controls) ? s = new te(i.controls.slice()) : (Z(
    typeof i.controls.getArray == "function",
    47
  ), s = i.controls));
  let r;
  i.interactions !== void 0 && (Array.isArray(i.interactions) ? r = new te(i.interactions.slice()) : (Z(
    typeof i.interactions.getArray == "function",
    48
  ), r = i.interactions));
  let o;
  return i.overlays !== void 0 ? Array.isArray(i.overlays) ? o = new te(i.overlays.slice()) : (Z(
    typeof i.overlays.getArray == "function",
    49
  ), o = i.overlays) : o = new te(), {
    controls: s,
    interactions: r,
    keyboardEventTarget: t,
    overlays: o,
    values: e
  };
}
const R0 = T0;
class Qa extends fe {
  constructor(t) {
    if (super(), this.on, this.once, this.un, this.id_ = void 0, this.geometryName_ = "geometry", this.style_ = null, this.styleFunction_ = void 0, this.geometryChangeKey_ = null, this.addChangeListener(this.geometryName_, this.handleGeometryChanged_), t)
      if (typeof t.getSimplifiedGeometry == "function") {
        const e = t;
        this.setGeometry(e);
      } else {
        const e = t;
        this.setProperties(e);
      }
  }
  clone() {
    const t = new Qa(this.hasProperties() ? this.getProperties() : null);
    t.setGeometryName(this.getGeometryName());
    const e = this.getGeometry();
    e && t.setGeometry(e.clone());
    const n = this.getStyle();
    return n && t.setStyle(n), t;
  }
  getGeometry() {
    return this.get(this.geometryName_);
  }
  getId() {
    return this.id_;
  }
  getGeometryName() {
    return this.geometryName_;
  }
  getStyle() {
    return this.style_;
  }
  getStyleFunction() {
    return this.styleFunction_;
  }
  handleGeometryChange_() {
    this.changed();
  }
  handleGeometryChanged_() {
    this.geometryChangeKey_ && (it(this.geometryChangeKey_), this.geometryChangeKey_ = null);
    const t = this.getGeometry();
    t && (this.geometryChangeKey_ = W(
      t,
      $.CHANGE,
      this.handleGeometryChange_,
      this
    )), this.changed();
  }
  setGeometry(t) {
    this.set(this.geometryName_, t);
  }
  setStyle(t) {
    this.style_ = t, this.styleFunction_ = t ? I0(t) : void 0, this.changed();
  }
  setId(t) {
    this.id_ = t, this.changed();
  }
  setGeometryName(t) {
    this.removeChangeListener(this.geometryName_, this.handleGeometryChanged_), this.geometryName_ = t, this.addChangeListener(this.geometryName_, this.handleGeometryChanged_), this.handleGeometryChanged_();
  }
}
function I0(i) {
  if (typeof i == "function")
    return i;
  {
    let t;
    return Array.isArray(i) ? t = i : (Z(typeof i.getZIndex == "function", 41), t = [i]), function() {
      return t;
    };
  }
}
const oe = Qa, ht = {
  ACCURACY: "accuracy",
  ACCURACY_GEOMETRY: "accuracyGeometry",
  ALTITUDE: "altitude",
  ALTITUDE_ACCURACY: "altitudeAccuracy",
  HEADING: "heading",
  POSITION: "position",
  PROJECTION: "projection",
  SPEED: "speed",
  TRACKING: "tracking",
  TRACKING_OPTIONS: "trackingOptions"
};
class L0 extends ie {
  constructor(t) {
    super($.ERROR), this.code = t.code, this.message = t.message;
  }
}
class P0 extends fe {
  constructor(t) {
    super(), this.on, this.once, this.un, t = t || {}, this.position_ = null, this.transform_ = Da, this.watchId_ = void 0, this.addChangeListener(ht.PROJECTION, this.handleProjectionChanged_), this.addChangeListener(ht.TRACKING, this.handleTrackingChanged_), t.projection !== void 0 && this.setProjection(t.projection), t.trackingOptions !== void 0 && this.setTrackingOptions(t.trackingOptions), this.setTracking(t.tracking !== void 0 ? t.tracking : !1);
  }
  disposeInternal() {
    this.setTracking(!1), super.disposeInternal();
  }
  handleProjectionChanged_() {
    const t = this.getProjection();
    t && (this.transform_ = to(
      rt("EPSG:4326"),
      t
    ), this.position_ && this.set(ht.POSITION, this.transform_(this.position_)));
  }
  handleTrackingChanged_() {
    if ("geolocation" in navigator) {
      const t = this.getTracking();
      t && this.watchId_ === void 0 ? this.watchId_ = navigator.geolocation.watchPosition(
        this.positionChange_.bind(this),
        this.positionError_.bind(this),
        this.getTrackingOptions()
      ) : !t && this.watchId_ !== void 0 && (navigator.geolocation.clearWatch(this.watchId_), this.watchId_ = void 0);
    }
  }
  positionChange_(t) {
    const e = t.coords;
    this.set(ht.ACCURACY, e.accuracy), this.set(
      ht.ALTITUDE,
      e.altitude === null ? void 0 : e.altitude
    ), this.set(
      ht.ALTITUDE_ACCURACY,
      e.altitudeAccuracy === null ? void 0 : e.altitudeAccuracy
    ), this.set(
      ht.HEADING,
      e.heading === null ? void 0 : Pi(e.heading)
    ), this.position_ ? (this.position_[0] = e.longitude, this.position_[1] = e.latitude) : this.position_ = [e.longitude, e.latitude];
    const n = this.transform_(this.position_);
    this.set(ht.POSITION, n), this.set(ht.SPEED, e.speed === null ? void 0 : e.speed);
    const s = Pg(this.position_, e.accuracy);
    s.applyTransform(this.transform_), this.set(ht.ACCURACY_GEOMETRY, s), this.changed();
  }
  positionError_(t) {
    this.dispatchEvent(new L0(t));
  }
  getAccuracy() {
    return this.get(ht.ACCURACY);
  }
  getAccuracyGeometry() {
    return this.get(ht.ACCURACY_GEOMETRY) || null;
  }
  getAltitude() {
    return this.get(ht.ALTITUDE);
  }
  getAltitudeAccuracy() {
    return this.get(ht.ALTITUDE_ACCURACY);
  }
  getHeading() {
    return this.get(ht.HEADING);
  }
  getPosition() {
    return this.get(ht.POSITION);
  }
  getProjection() {
    return this.get(ht.PROJECTION);
  }
  getSpeed() {
    return this.get(ht.SPEED);
  }
  getTracking() {
    return this.get(ht.TRACKING);
  }
  getTrackingOptions() {
    return this.get(ht.TRACKING_OPTIONS);
  }
  setProjection(t) {
    this.set(ht.PROJECTION, rt(t));
  }
  setTracking(t) {
    this.set(ht.TRACKING, t);
  }
  setTrackingOptions(t) {
    this.set(ht.TRACKING_OPTIONS, t);
  }
}
const A0 = P0;
class tl {
  constructor(t) {
    t = t || {}, this.color_ = t.color !== void 0 ? t.color : null;
  }
  clone() {
    const t = this.getColor();
    return new tl({
      color: Array.isArray(t) ? t.slice() : t || void 0
    });
  }
  getColor() {
    return this.color_;
  }
  setColor(t) {
    this.color_ = t;
  }
}
const ee = tl;
function Qc(i, t, e, n, s, r, o) {
  let a, l;
  const h = (e - t) / n;
  if (h === 1)
    a = t;
  else if (h === 2)
    a = t, l = s;
  else if (h !== 0) {
    let c = i[t], u = i[t + 1], d = 0;
    const f = [0];
    for (let _ = t + n; _ < e; _ += n) {
      const p = i[_], y = i[_ + 1];
      d += Math.sqrt((p - c) * (p - c) + (y - u) * (y - u)), f.push(d), c = p, u = y;
    }
    const g = s * d, m = Ld(f, g);
    m < 0 ? (l = (g - f[-m - 2]) / (f[-m - 1] - f[-m - 2]), a = t + (-m - 2) * n) : a = t + m * n;
  }
  o = o > 1 ? o : 2, r = r || new Array(o);
  for (let c = 0; c < o; ++c)
    r[c] = a === void 0 ? NaN : l === void 0 ? i[a + c] : De(i[a + c], i[a + n + c], l);
  return r;
}
function sa(i, t, e, n, s, r) {
  if (e == t)
    return null;
  let o;
  if (s < i[t + n - 1])
    return r ? (o = i.slice(t, t + n), o[n - 1] = s, o) : null;
  if (i[e - 1] < s)
    return r ? (o = i.slice(e - n, e), o[n - 1] = s, o) : null;
  if (s == i[t + n - 1])
    return i.slice(t, t + n);
  let a = t / n, l = e / n;
  for (; a < l; ) {
    const d = a + l >> 1;
    s < i[(d + 1) * n - 1] ? l = d : a = d + 1;
  }
  const h = i[a * n - 1];
  if (s == h)
    return i.slice((a - 1) * n, (a - 1) * n + n);
  const c = i[(a + 1) * n - 1], u = (s - h) / (c - h);
  o = [];
  for (let d = 0; d < n - 1; ++d)
    o.push(
      De(
        i[(a - 1) * n + d],
        i[a * n + d],
        u
      )
    );
  return o.push(s), o;
}
function O0(i, t, e, n, s, r, o) {
  if (o)
    return sa(
      i,
      t,
      e[e.length - 1],
      n,
      s,
      r
    );
  let a;
  if (s < i[n - 1])
    return r ? (a = i.slice(0, n), a[n - 1] = s, a) : null;
  if (i[i.length - 1] < s)
    return r ? (a = i.slice(i.length - n), a[n - 1] = s, a) : null;
  for (let l = 0, h = e.length; l < h; ++l) {
    const c = e[l];
    if (t != c) {
      if (s < i[t + n - 1])
        return null;
      if (s <= i[c - 1])
        return sa(
          i,
          t,
          c,
          n,
          s,
          !1
        );
      t = c;
    }
  }
  return null;
}
function tu(i, t, e, n) {
  let s = i[t], r = i[t + 1], o = 0;
  for (let a = t + n; a < e; a += n) {
    const l = i[a], h = i[a + 1];
    o += Math.sqrt((l - s) * (l - s) + (h - r) * (h - r)), s = l, r = h;
  }
  return o;
}
class Lr extends vi {
  constructor(t, e) {
    super(), this.flatMidpoint_ = null, this.flatMidpointRevision_ = -1, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, e !== void 0 && !Array.isArray(t[0]) ? this.setFlatCoordinates(
      e,
      t
    ) : this.setCoordinates(
      t,
      e
    );
  }
  appendCoordinate(t) {
    this.flatCoordinates ? ye(this.flatCoordinates, t) : this.flatCoordinates = t.slice(), this.changed();
  }
  clone() {
    const t = new Lr(
      this.flatCoordinates.slice(),
      this.layout
    );
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, n, s) {
    return s < Ui(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      Va(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), Wa(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      this.maxDelta_,
      !1,
      t,
      e,
      n,
      s
    ));
  }
  forEachSegment(t) {
    return Bc(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t
    );
  }
  getCoordinateAtM(t, e) {
    return this.layout != "XYM" && this.layout != "XYZM" ? null : (e = e !== void 0 ? e : !1, sa(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      e
    ));
  }
  getCoordinates() {
    return si(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  getCoordinateAt(t, e) {
    return Qc(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      e,
      this.stride
    );
  }
  getLength() {
    return tu(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  getFlatMidpoint() {
    return this.flatMidpointRevision_ != this.getRevision() && (this.flatMidpoint_ = this.getCoordinateAt(0.5, this.flatMidpoint_), this.flatMidpointRevision_ = this.getRevision()), this.flatMidpoint_;
  }
  getSimplifiedGeometryInternal(t) {
    const e = [];
    return e.length = Xa(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      e,
      0
    ), new Lr(e, "XY");
  }
  getType() {
    return "LineString";
  }
  intersectsExtent(t) {
    return io(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t
    );
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = eo(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
const Fi = Lr;
class el {
  constructor(t) {
    t = t || {}, this.color_ = t.color !== void 0 ? t.color : null, this.lineCap_ = t.lineCap, this.lineDash_ = t.lineDash !== void 0 ? t.lineDash : null, this.lineDashOffset_ = t.lineDashOffset, this.lineJoin_ = t.lineJoin, this.miterLimit_ = t.miterLimit, this.width_ = t.width;
  }
  clone() {
    const t = this.getColor();
    return new el({
      color: Array.isArray(t) ? t.slice() : t || void 0,
      lineCap: this.getLineCap(),
      lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0,
      lineDashOffset: this.getLineDashOffset(),
      lineJoin: this.getLineJoin(),
      miterLimit: this.getMiterLimit(),
      width: this.getWidth()
    });
  }
  getColor() {
    return this.color_;
  }
  getLineCap() {
    return this.lineCap_;
  }
  getLineDash() {
    return this.lineDash_;
  }
  getLineDashOffset() {
    return this.lineDashOffset_;
  }
  getLineJoin() {
    return this.lineJoin_;
  }
  getMiterLimit() {
    return this.miterLimit_;
  }
  getWidth() {
    return this.width_;
  }
  setColor(t) {
    this.color_ = t;
  }
  setLineCap(t) {
    this.lineCap_ = t;
  }
  setLineDash(t) {
    this.lineDash_ = t;
  }
  setLineDashOffset(t) {
    this.lineDashOffset_ = t;
  }
  setLineJoin(t) {
    this.lineJoin_ = t;
  }
  setMiterLimit(t) {
    this.miterLimit_ = t;
  }
  setWidth(t) {
    this.width_ = t;
  }
}
const ce = el, yt = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};
class il {
  constructor(t) {
    this.opacity_ = t.opacity, this.rotateWithView_ = t.rotateWithView, this.rotation_ = t.rotation, this.scale_ = t.scale, this.scaleArray_ = Wt(t.scale), this.displacement_ = t.displacement, this.declutterMode_ = t.declutterMode;
  }
  clone() {
    const t = this.getScale();
    return new il({
      opacity: this.getOpacity(),
      scale: Array.isArray(t) ? t.slice() : t,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
  }
  getOpacity() {
    return this.opacity_;
  }
  getRotateWithView() {
    return this.rotateWithView_;
  }
  getRotation() {
    return this.rotation_;
  }
  getScale() {
    return this.scale_;
  }
  getScaleArray() {
    return this.scaleArray_;
  }
  getDisplacement() {
    return this.displacement_;
  }
  getDeclutterMode() {
    return this.declutterMode_;
  }
  getAnchor() {
    return z();
  }
  getImage(t) {
    return z();
  }
  getHitDetectionImage() {
    return z();
  }
  getPixelRatio(t) {
    return 1;
  }
  getImageState() {
    return z();
  }
  getImageSize() {
    return z();
  }
  getOrigin() {
    return z();
  }
  getSize() {
    return z();
  }
  setDisplacement(t) {
    this.displacement_ = t;
  }
  setOpacity(t) {
    this.opacity_ = t;
  }
  setRotateWithView(t) {
    this.rotateWithView_ = t;
  }
  setRotation(t) {
    this.rotation_ = t;
  }
  setScale(t) {
    this.scale_ = t, this.scaleArray_ = Wt(t);
  }
  listenImageChange(t) {
    z();
  }
  load() {
    z();
  }
  unlistenImageChange(t) {
    z();
  }
}
const eu = il;
function _e(i) {
  return Array.isArray(i) ? vc(i) : i;
}
class nl extends eu {
  constructor(t) {
    const e = t.rotateWithView !== void 0 ? t.rotateWithView : !1;
    super({
      opacity: 1,
      rotateWithView: e,
      rotation: t.rotation !== void 0 ? t.rotation : 0,
      scale: t.scale !== void 0 ? t.scale : 1,
      displacement: t.displacement !== void 0 ? t.displacement : [0, 0],
      declutterMode: t.declutterMode
    }), this.canvas_ = void 0, this.hitDetectionCanvas_ = null, this.fill_ = t.fill !== void 0 ? t.fill : null, this.origin_ = [0, 0], this.points_ = t.points, this.radius_ = t.radius !== void 0 ? t.radius : t.radius1, this.radius2_ = t.radius2, this.angle_ = t.angle !== void 0 ? t.angle : 0, this.stroke_ = t.stroke !== void 0 ? t.stroke : null, this.size_ = null, this.renderOptions_ = null, this.render();
  }
  clone() {
    const t = this.getScale(), e = new nl({
      fill: this.getFill() ? this.getFill().clone() : void 0,
      points: this.getPoints(),
      radius: this.getRadius(),
      radius2: this.getRadius2(),
      angle: this.getAngle(),
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      scale: Array.isArray(t) ? t.slice() : t,
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
    return e.setOpacity(this.getOpacity()), e;
  }
  getAnchor() {
    const t = this.size_;
    if (!t)
      return null;
    const e = this.getDisplacement(), n = this.getScaleArray();
    return [
      t[0] / 2 - e[0] / n[0],
      t[1] / 2 + e[1] / n[1]
    ];
  }
  getAngle() {
    return this.angle_;
  }
  getFill() {
    return this.fill_;
  }
  setFill(t) {
    this.fill_ = t, this.render();
  }
  getHitDetectionImage() {
    return this.hitDetectionCanvas_ || this.createHitDetectionCanvas_(this.renderOptions_), this.hitDetectionCanvas_;
  }
  getImage(t) {
    let e = this.canvas_[t];
    if (!e) {
      const n = this.renderOptions_, s = Xt(
        n.size * t,
        n.size * t
      );
      this.draw_(n, s, t), e = s.canvas, this.canvas_[t] = e;
    }
    return e;
  }
  getPixelRatio(t) {
    return t;
  }
  getImageSize() {
    return this.size_;
  }
  getImageState() {
    return yt.LOADED;
  }
  getOrigin() {
    return this.origin_;
  }
  getPoints() {
    return this.points_;
  }
  getRadius() {
    return this.radius_;
  }
  getRadius2() {
    return this.radius2_;
  }
  getSize() {
    return this.size_;
  }
  getStroke() {
    return this.stroke_;
  }
  setStroke(t) {
    this.stroke_ = t, this.render();
  }
  listenImageChange(t) {
  }
  load() {
  }
  unlistenImageChange(t) {
  }
  calculateLineJoinSize_(t, e, n) {
    if (e === 0 || this.points_ === 1 / 0 || t !== "bevel" && t !== "miter")
      return e;
    let s = this.radius_, r = this.radius2_ === void 0 ? s : this.radius2_;
    if (s < r) {
      const M = s;
      s = r, r = M;
    }
    const o = this.radius2_ === void 0 ? this.points_ : this.points_ * 2, a = 2 * Math.PI / o, l = r * Math.sin(a), h = Math.sqrt(r * r - l * l), c = s - h, u = Math.sqrt(l * l + c * c), d = u / l;
    if (t === "miter" && d <= n)
      return d * e;
    const f = e / 2 / d, g = e / 2 * (c / u), _ = Math.sqrt((s + f) * (s + f) + g * g) - s;
    if (this.radius2_ === void 0 || t === "bevel")
      return _ * 2;
    const p = s * Math.sin(a), y = Math.sqrt(s * s - p * p), x = r - y, C = Math.sqrt(p * p + x * x) / p;
    if (C <= n) {
      const M = C * e / 2 - r - s;
      return 2 * Math.max(_, M);
    }
    return _ * 2;
  }
  createRenderOptions() {
    let t = bn, e = 0, n = null, s = 0, r, o = 0;
    this.stroke_ && (r = this.stroke_.getColor(), r === null && (r = ds), r = _e(r), o = this.stroke_.getWidth(), o === void 0 && (o = gs), n = this.stroke_.getLineDash(), s = this.stroke_.getLineDashOffset(), t = this.stroke_.getLineJoin(), t === void 0 && (t = bn), e = this.stroke_.getMiterLimit(), e === void 0 && (e = us));
    const a = this.calculateLineJoinSize_(t, o, e), l = Math.max(this.radius_, this.radius2_ || 0), h = Math.ceil(2 * l + a);
    return {
      strokeStyle: r,
      strokeWidth: o,
      size: h,
      lineDash: n,
      lineDashOffset: s,
      lineJoin: t,
      miterLimit: e
    };
  }
  render() {
    this.renderOptions_ = this.createRenderOptions();
    const t = this.renderOptions_.size;
    this.canvas_ = {}, this.size_ = [t, t];
  }
  draw_(t, e, n) {
    if (e.scale(n, n), e.translate(t.size / 2, t.size / 2), this.createPath_(e), this.fill_) {
      let s = this.fill_.getColor();
      s === null && (s = $e), e.fillStyle = _e(s), e.fill();
    }
    this.stroke_ && (e.strokeStyle = t.strokeStyle, e.lineWidth = t.strokeWidth, t.lineDash && (e.setLineDash(t.lineDash), e.lineDashOffset = t.lineDashOffset), e.lineJoin = t.lineJoin, e.miterLimit = t.miterLimit, e.stroke());
  }
  createHitDetectionCanvas_(t) {
    if (this.fill_) {
      let e = this.fill_.getColor(), n = 0;
      if (typeof e == "string" && (e = pr(e)), e === null ? n = 1 : Array.isArray(e) && (n = e.length === 4 ? e[3] : 1), n === 0) {
        const s = Xt(
          t.size,
          t.size
        );
        this.hitDetectionCanvas_ = s.canvas, this.drawHitDetectionCanvas_(t, s);
      }
    }
    this.hitDetectionCanvas_ || (this.hitDetectionCanvas_ = this.getImage(1));
  }
  createPath_(t) {
    let e = this.points_;
    const n = this.radius_;
    if (e === 1 / 0)
      t.arc(0, 0, n, 0, 2 * Math.PI);
    else {
      const s = this.radius2_ === void 0 ? n : this.radius2_;
      this.radius2_ !== void 0 && (e *= 2);
      const r = this.angle_ - Math.PI / 2, o = 2 * Math.PI / e;
      for (let a = 0; a < e; a++) {
        const l = r + a * o, h = a % 2 === 0 ? n : s;
        t.lineTo(h * Math.cos(l), h * Math.sin(l));
      }
      t.closePath();
    }
  }
  drawHitDetectionCanvas_(t, e) {
    e.translate(t.size / 2, t.size / 2), this.createPath_(e), e.fillStyle = $e, e.fill(), this.stroke_ && (e.strokeStyle = t.strokeStyle, e.lineWidth = t.strokeWidth, t.lineDash && (e.setLineDash(t.lineDash), e.lineDashOffset = t.lineDashOffset), e.lineJoin = t.lineJoin, e.miterLimit = t.miterLimit, e.stroke());
  }
}
const iu = nl;
class sl extends iu {
  constructor(t) {
    t = t || { radius: 5 }, super({
      points: 1 / 0,
      fill: t.fill,
      radius: t.radius,
      stroke: t.stroke,
      scale: t.scale !== void 0 ? t.scale : 1,
      rotation: t.rotation !== void 0 ? t.rotation : 0,
      rotateWithView: t.rotateWithView !== void 0 ? t.rotateWithView : !1,
      displacement: t.displacement !== void 0 ? t.displacement : [0, 0],
      declutterMode: t.declutterMode
    });
  }
  clone() {
    const t = this.getScale(), e = new sl({
      fill: this.getFill() ? this.getFill().clone() : void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      radius: this.getRadius(),
      scale: Array.isArray(t) ? t.slice() : t,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
    return e.setOpacity(this.getOpacity()), e;
  }
  setRadius(t) {
    this.radius_ = t, this.render();
  }
}
const fi = sl;
class ri {
  constructor(t) {
    t = t || {}, this.geometry_ = null, this.geometryFunction_ = lh, t.geometry !== void 0 && this.setGeometry(t.geometry), this.fill_ = t.fill !== void 0 ? t.fill : null, this.image_ = t.image !== void 0 ? t.image : null, this.renderer_ = t.renderer !== void 0 ? t.renderer : null, this.hitDetectionRenderer_ = t.hitDetectionRenderer !== void 0 ? t.hitDetectionRenderer : null, this.stroke_ = t.stroke !== void 0 ? t.stroke : null, this.text_ = t.text !== void 0 ? t.text : null, this.zIndex_ = t.zIndex;
  }
  clone() {
    let t = this.getGeometry();
    return t && typeof t == "object" && (t = t.clone()), new ri({
      geometry: t,
      fill: this.getFill() ? this.getFill().clone() : void 0,
      image: this.getImage() ? this.getImage().clone() : void 0,
      renderer: this.getRenderer(),
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      text: this.getText() ? this.getText().clone() : void 0,
      zIndex: this.getZIndex()
    });
  }
  getRenderer() {
    return this.renderer_;
  }
  setRenderer(t) {
    this.renderer_ = t;
  }
  setHitDetectionRenderer(t) {
    this.hitDetectionRenderer_ = t;
  }
  getHitDetectionRenderer() {
    return this.hitDetectionRenderer_;
  }
  getGeometry() {
    return this.geometry_;
  }
  getGeometryFunction() {
    return this.geometryFunction_;
  }
  getFill() {
    return this.fill_;
  }
  setFill(t) {
    this.fill_ = t;
  }
  getImage() {
    return this.image_;
  }
  setImage(t) {
    this.image_ = t;
  }
  getStroke() {
    return this.stroke_;
  }
  setStroke(t) {
    this.stroke_ = t;
  }
  getText() {
    return this.text_;
  }
  setText(t) {
    this.text_ = t;
  }
  getZIndex() {
    return this.zIndex_;
  }
  setGeometry(t) {
    typeof t == "function" ? this.geometryFunction_ = t : typeof t == "string" ? this.geometryFunction_ = function(e) {
      return e.get(t);
    } : t ? t !== void 0 && (this.geometryFunction_ = function() {
      return t;
    }) : this.geometryFunction_ = lh, this.geometry_ = t;
  }
  setZIndex(t) {
    this.zIndex_ = t;
  }
}
function F0(i) {
  let t;
  if (typeof i == "function")
    t = i;
  else {
    let e;
    Array.isArray(i) ? e = i : (Z(typeof i.getZIndex == "function", 41), e = [i]), t = function() {
      return e;
    };
  }
  return t;
}
let To = null;
function D0(i, t) {
  if (!To) {
    const e = new ee({
      color: "rgba(255,255,255,0.4)"
    }), n = new ce({
      color: "#3399CC",
      width: 1.25
    });
    To = [
      new ri({
        image: new fi({
          fill: e,
          stroke: n,
          radius: 5
        }),
        fill: e,
        stroke: n
      })
    ];
  }
  return To;
}
function nu() {
  const i = {}, t = [255, 255, 255, 1], e = [0, 153, 255, 1], n = 3;
  return i.Polygon = [
    new ri({
      fill: new ee({
        color: [255, 255, 255, 0.5]
      })
    })
  ], i.MultiPolygon = i.Polygon, i.LineString = [
    new ri({
      stroke: new ce({
        color: t,
        width: n + 2
      })
    }),
    new ri({
      stroke: new ce({
        color: e,
        width: n
      })
    })
  ], i.MultiLineString = i.LineString, i.Circle = i.Polygon.concat(i.LineString), i.Point = [
    new ri({
      image: new fi({
        radius: n * 2,
        fill: new ee({
          color: e
        }),
        stroke: new ce({
          color: t,
          width: n / 2
        })
      }),
      zIndex: 1 / 0
    })
  ], i.MultiPoint = i.Point, i.GeometryCollection = i.Polygon.concat(
    i.LineString,
    i.Point
  ), i;
}
function lh(i) {
  return i.getGeometry();
}
const le = ri, N0 = "#333";
class rl {
  constructor(t) {
    t = t || {}, this.font_ = t.font, this.rotation_ = t.rotation, this.rotateWithView_ = t.rotateWithView, this.scale_ = t.scale, this.scaleArray_ = Wt(t.scale !== void 0 ? t.scale : 1), this.text_ = t.text, this.textAlign_ = t.textAlign, this.justify_ = t.justify, this.textBaseline_ = t.textBaseline, this.fill_ = t.fill !== void 0 ? t.fill : new ee({ color: N0 }), this.maxAngle_ = t.maxAngle !== void 0 ? t.maxAngle : Math.PI / 4, this.placement_ = t.placement !== void 0 ? t.placement : "point", this.overflow_ = !!t.overflow, this.stroke_ = t.stroke !== void 0 ? t.stroke : null, this.offsetX_ = t.offsetX !== void 0 ? t.offsetX : 0, this.offsetY_ = t.offsetY !== void 0 ? t.offsetY : 0, this.backgroundFill_ = t.backgroundFill ? t.backgroundFill : null, this.backgroundStroke_ = t.backgroundStroke ? t.backgroundStroke : null, this.padding_ = t.padding === void 0 ? null : t.padding;
  }
  clone() {
    const t = this.getScale();
    return new rl({
      font: this.getFont(),
      placement: this.getPlacement(),
      maxAngle: this.getMaxAngle(),
      overflow: this.getOverflow(),
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      scale: Array.isArray(t) ? t.slice() : t,
      text: this.getText(),
      textAlign: this.getTextAlign(),
      justify: this.getJustify(),
      textBaseline: this.getTextBaseline(),
      fill: this.getFill() ? this.getFill().clone() : void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      offsetX: this.getOffsetX(),
      offsetY: this.getOffsetY(),
      backgroundFill: this.getBackgroundFill() ? this.getBackgroundFill().clone() : void 0,
      backgroundStroke: this.getBackgroundStroke() ? this.getBackgroundStroke().clone() : void 0,
      padding: this.getPadding() || void 0
    });
  }
  getOverflow() {
    return this.overflow_;
  }
  getFont() {
    return this.font_;
  }
  getMaxAngle() {
    return this.maxAngle_;
  }
  getPlacement() {
    return this.placement_;
  }
  getOffsetX() {
    return this.offsetX_;
  }
  getOffsetY() {
    return this.offsetY_;
  }
  getFill() {
    return this.fill_;
  }
  getRotateWithView() {
    return this.rotateWithView_;
  }
  getRotation() {
    return this.rotation_;
  }
  getScale() {
    return this.scale_;
  }
  getScaleArray() {
    return this.scaleArray_;
  }
  getStroke() {
    return this.stroke_;
  }
  getText() {
    return this.text_;
  }
  getTextAlign() {
    return this.textAlign_;
  }
  getJustify() {
    return this.justify_;
  }
  getTextBaseline() {
    return this.textBaseline_;
  }
  getBackgroundFill() {
    return this.backgroundFill_;
  }
  getBackgroundStroke() {
    return this.backgroundStroke_;
  }
  getPadding() {
    return this.padding_;
  }
  setOverflow(t) {
    this.overflow_ = t;
  }
  setFont(t) {
    this.font_ = t;
  }
  setMaxAngle(t) {
    this.maxAngle_ = t;
  }
  setOffsetX(t) {
    this.offsetX_ = t;
  }
  setOffsetY(t) {
    this.offsetY_ = t;
  }
  setPlacement(t) {
    this.placement_ = t;
  }
  setRotateWithView(t) {
    this.rotateWithView_ = t;
  }
  setFill(t) {
    this.fill_ = t;
  }
  setRotation(t) {
    this.rotation_ = t;
  }
  setScale(t) {
    this.scale_ = t, this.scaleArray_ = Wt(t !== void 0 ? t : 1);
  }
  setStroke(t) {
    this.stroke_ = t;
  }
  setText(t) {
    this.text_ = t;
  }
  setTextAlign(t) {
    this.textAlign_ = t;
  }
  setJustify(t) {
    this.justify_ = t;
  }
  setTextBaseline(t) {
    this.textBaseline_ = t;
  }
  setBackgroundFill(t) {
    this.backgroundFill_ = t;
  }
  setBackgroundStroke(t) {
    this.backgroundStroke_ = t;
  }
  setPadding(t) {
    this.padding_ = t;
  }
}
const ra = rl;
function k0(i, t, e, n, s) {
  su(i, t, e || 0, n || i.length - 1, s || G0);
}
function su(i, t, e, n, s) {
  for (; n > e; ) {
    if (n - e > 600) {
      var r = n - e + 1, o = t - e + 1, a = Math.log(r), l = 0.5 * Math.exp(2 * a / 3), h = 0.5 * Math.sqrt(a * l * (r - l) / r) * (o - r / 2 < 0 ? -1 : 1), c = Math.max(e, Math.floor(t - o * l / r + h)), u = Math.min(n, Math.floor(t + (r - o) * l / r + h));
      su(i, t, c, u, s);
    }
    var d = i[t], f = e, g = n;
    for (Wn(i, e, t), s(i[n], d) > 0 && Wn(i, e, n); f < g; ) {
      for (Wn(i, f, g), f++, g--; s(i[f], d) < 0; )
        f++;
      for (; s(i[g], d) > 0; )
        g--;
    }
    s(i[e], d) === 0 ? Wn(i, e, g) : (g++, Wn(i, g, n)), g <= t && (e = g + 1), t <= g && (n = g - 1);
  }
}
function Wn(i, t, e) {
  var n = i[t];
  i[t] = i[e], i[e] = n;
}
function G0(i, t) {
  return i < t ? -1 : i > t ? 1 : 0;
}
class ru {
  constructor(t = 9) {
    this._maxEntries = Math.max(4, t), this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4)), this.clear();
  }
  all() {
    return this._all(this.data, []);
  }
  search(t) {
    let e = this.data;
    const n = [];
    if (!Js(t, e))
      return n;
    const s = this.toBBox, r = [];
    for (; e; ) {
      for (let o = 0; o < e.children.length; o++) {
        const a = e.children[o], l = e.leaf ? s(a) : a;
        Js(t, l) && (e.leaf ? n.push(a) : Ro(t, l) ? this._all(a, n) : r.push(a));
      }
      e = r.pop();
    }
    return n;
  }
  collides(t) {
    let e = this.data;
    if (!Js(t, e))
      return !1;
    const n = [];
    for (; e; ) {
      for (let s = 0; s < e.children.length; s++) {
        const r = e.children[s], o = e.leaf ? this.toBBox(r) : r;
        if (Js(t, o)) {
          if (e.leaf || Ro(t, o))
            return !0;
          n.push(r);
        }
      }
      e = n.pop();
    }
    return !1;
  }
  load(t) {
    if (!(t && t.length))
      return this;
    if (t.length < this._minEntries) {
      for (let n = 0; n < t.length; n++)
        this.insert(t[n]);
      return this;
    }
    let e = this._build(t.slice(), 0, t.length - 1, 0);
    if (!this.data.children.length)
      this.data = e;
    else if (this.data.height === e.height)
      this._splitRoot(this.data, e);
    else {
      if (this.data.height < e.height) {
        const n = this.data;
        this.data = e, e = n;
      }
      this._insert(e, this.data.height - e.height - 1, !0);
    }
    return this;
  }
  insert(t) {
    return t && this._insert(t, this.data.height - 1), this;
  }
  clear() {
    return this.data = ln([]), this;
  }
  remove(t, e) {
    if (!t)
      return this;
    let n = this.data;
    const s = this.toBBox(t), r = [], o = [];
    let a, l, h;
    for (; n || r.length; ) {
      if (n || (n = r.pop(), l = r[r.length - 1], a = o.pop(), h = !0), n.leaf) {
        const c = $0(t, n.children, e);
        if (c !== -1)
          return n.children.splice(c, 1), r.push(n), this._condense(r), this;
      }
      !h && !n.leaf && Ro(n, s) ? (r.push(n), o.push(a), a = 0, l = n, n = n.children[0]) : l ? (a++, n = l.children[a], h = !1) : n = null;
    }
    return this;
  }
  toBBox(t) {
    return t;
  }
  compareMinX(t, e) {
    return t.minX - e.minX;
  }
  compareMinY(t, e) {
    return t.minY - e.minY;
  }
  toJSON() {
    return this.data;
  }
  fromJSON(t) {
    return this.data = t, this;
  }
  _all(t, e) {
    const n = [];
    for (; t; )
      t.leaf ? e.push(...t.children) : n.push(...t.children), t = n.pop();
    return e;
  }
  _build(t, e, n, s) {
    const r = n - e + 1;
    let o = this._maxEntries, a;
    if (r <= o)
      return a = ln(t.slice(e, n + 1)), en(a, this.toBBox), a;
    s || (s = Math.ceil(Math.log(r) / Math.log(o)), o = Math.ceil(r / Math.pow(o, s - 1))), a = ln([]), a.leaf = !1, a.height = s;
    const l = Math.ceil(r / o), h = l * Math.ceil(Math.sqrt(o));
    hh(t, e, n, h, this.compareMinX);
    for (let c = e; c <= n; c += h) {
      const u = Math.min(c + h - 1, n);
      hh(t, c, u, l, this.compareMinY);
      for (let d = c; d <= u; d += l) {
        const f = Math.min(d + l - 1, u);
        a.children.push(this._build(t, d, f, s - 1));
      }
    }
    return en(a, this.toBBox), a;
  }
  _chooseSubtree(t, e, n, s) {
    for (; s.push(e), !(e.leaf || s.length - 1 === n); ) {
      let r = 1 / 0, o = 1 / 0, a;
      for (let l = 0; l < e.children.length; l++) {
        const h = e.children[l], c = bo(h), u = V0(t, h) - c;
        u < o ? (o = u, r = c < r ? c : r, a = h) : u === o && c < r && (r = c, a = h);
      }
      e = a || e.children[0];
    }
    return e;
  }
  _insert(t, e, n) {
    const s = n ? t : this.toBBox(t), r = [], o = this._chooseSubtree(s, this.data, e, r);
    for (o.children.push(t), Yn(o, s); e >= 0 && r[e].children.length > this._maxEntries; )
      this._split(r, e), e--;
    this._adjustParentBBoxes(s, r, e);
  }
  _split(t, e) {
    const n = t[e], s = n.children.length, r = this._minEntries;
    this._chooseSplitAxis(n, r, s);
    const o = this._chooseSplitIndex(n, r, s), a = ln(n.children.splice(o, n.children.length - o));
    a.height = n.height, a.leaf = n.leaf, en(n, this.toBBox), en(a, this.toBBox), e ? t[e - 1].children.push(a) : this._splitRoot(n, a);
  }
  _splitRoot(t, e) {
    this.data = ln([t, e]), this.data.height = t.height + 1, this.data.leaf = !1, en(this.data, this.toBBox);
  }
  _chooseSplitIndex(t, e, n) {
    let s, r = 1 / 0, o = 1 / 0;
    for (let a = e; a <= n - e; a++) {
      const l = Hn(t, 0, a, this.toBBox), h = Hn(t, a, n, this.toBBox), c = j0(l, h), u = bo(l) + bo(h);
      c < r ? (r = c, s = a, o = u < o ? u : o) : c === r && u < o && (o = u, s = a);
    }
    return s || n - e;
  }
  _chooseSplitAxis(t, e, n) {
    const s = t.leaf ? this.compareMinX : B0, r = t.leaf ? this.compareMinY : z0, o = this._allDistMargin(t, e, n, s), a = this._allDistMargin(t, e, n, r);
    o < a && t.children.sort(s);
  }
  _allDistMargin(t, e, n, s) {
    t.children.sort(s);
    const r = this.toBBox, o = Hn(t, 0, e, r), a = Hn(t, n - e, n, r);
    let l = Ks(o) + Ks(a);
    for (let h = e; h < n - e; h++) {
      const c = t.children[h];
      Yn(o, t.leaf ? r(c) : c), l += Ks(o);
    }
    for (let h = n - e - 1; h >= e; h--) {
      const c = t.children[h];
      Yn(a, t.leaf ? r(c) : c), l += Ks(a);
    }
    return l;
  }
  _adjustParentBBoxes(t, e, n) {
    for (let s = n; s >= 0; s--)
      Yn(e[s], t);
  }
  _condense(t) {
    for (let e = t.length - 1, n; e >= 0; e--)
      t[e].children.length === 0 ? e > 0 ? (n = t[e - 1].children, n.splice(n.indexOf(t[e]), 1)) : this.clear() : en(t[e], this.toBBox);
  }
}
function $0(i, t, e) {
  if (!e)
    return t.indexOf(i);
  for (let n = 0; n < t.length; n++)
    if (e(i, t[n]))
      return n;
  return -1;
}
function en(i, t) {
  Hn(i, 0, i.children.length, t, i);
}
function Hn(i, t, e, n, s) {
  s || (s = ln(null)), s.minX = 1 / 0, s.minY = 1 / 0, s.maxX = -1 / 0, s.maxY = -1 / 0;
  for (let r = t; r < e; r++) {
    const o = i.children[r];
    Yn(s, i.leaf ? n(o) : o);
  }
  return s;
}
function Yn(i, t) {
  return i.minX = Math.min(i.minX, t.minX), i.minY = Math.min(i.minY, t.minY), i.maxX = Math.max(i.maxX, t.maxX), i.maxY = Math.max(i.maxY, t.maxY), i;
}
function B0(i, t) {
  return i.minX - t.minX;
}
function z0(i, t) {
  return i.minY - t.minY;
}
function bo(i) {
  return (i.maxX - i.minX) * (i.maxY - i.minY);
}
function Ks(i) {
  return i.maxX - i.minX + (i.maxY - i.minY);
}
function V0(i, t) {
  return (Math.max(t.maxX, i.maxX) - Math.min(t.minX, i.minX)) * (Math.max(t.maxY, i.maxY) - Math.min(t.minY, i.minY));
}
function j0(i, t) {
  const e = Math.max(i.minX, t.minX), n = Math.max(i.minY, t.minY), s = Math.min(i.maxX, t.maxX), r = Math.min(i.maxY, t.maxY);
  return Math.max(0, s - e) * Math.max(0, r - n);
}
function Ro(i, t) {
  return i.minX <= t.minX && i.minY <= t.minY && t.maxX <= i.maxX && t.maxY <= i.maxY;
}
function Js(i, t) {
  return t.minX <= i.maxX && t.minY <= i.maxY && t.maxX >= i.minX && t.maxY >= i.minY;
}
function ln(i) {
  return {
    children: i,
    height: 1,
    leaf: !0,
    minX: 1 / 0,
    minY: 1 / 0,
    maxX: -1 / 0,
    maxY: -1 / 0
  };
}
function hh(i, t, e, n, s) {
  const r = [t, e];
  for (; r.length; ) {
    if (e = r.pop(), t = r.pop(), e - t <= n)
      continue;
    const o = t + Math.ceil((e - t) / n / 2) * n;
    k0(i, o, t, e, s), r.push(t, o, o, e);
  }
}
function ou(i, t, e) {
  const n = i;
  let s = !0, r = !1, o = !1;
  const a = [
    _r(n, $.LOAD, function() {
      o = !0, r || t();
    })
  ];
  return n.src && Ud ? (r = !0, n.decode().then(function() {
    s && t();
  }).catch(function(l) {
    s && (o ? t() : e());
  })) : a.push(_r(n, $.ERROR, e)), function() {
    s = !1, a.forEach(it);
  };
}
let Un = null;
class W0 extends Ur {
  constructor(t, e, n, s, r, o) {
    super(), this.hitDetectionImage_ = null, this.image_ = t, this.crossOrigin_ = s, this.canvas_ = {}, this.color_ = o, this.unlisten_ = null, this.imageState_ = r, this.size_ = n, this.src_ = e, this.tainted_;
  }
  initializeImage_() {
    this.image_ = new Image(), this.crossOrigin_ !== null && (this.image_.crossOrigin = this.crossOrigin_);
  }
  isTainted_() {
    if (this.tainted_ === void 0 && this.imageState_ === yt.LOADED) {
      Un || (Un = Xt(1, 1)), Un.drawImage(this.image_, 0, 0);
      try {
        Un.getImageData(0, 0, 1, 1), this.tainted_ = !1;
      } catch {
        Un = null, this.tainted_ = !0;
      }
    }
    return this.tainted_ === !0;
  }
  dispatchChangeEvent_() {
    this.dispatchEvent($.CHANGE);
  }
  handleImageError_() {
    this.imageState_ = yt.ERROR, this.unlistenImage_(), this.dispatchChangeEvent_();
  }
  handleImageLoad_() {
    this.imageState_ = yt.LOADED, this.size_ ? (this.image_.width = this.size_[0], this.image_.height = this.size_[1]) : this.size_ = [this.image_.width, this.image_.height], this.unlistenImage_(), this.dispatchChangeEvent_();
  }
  getImage(t) {
    return this.image_ || this.initializeImage_(), this.replaceColor_(t), this.canvas_[t] ? this.canvas_[t] : this.image_;
  }
  getPixelRatio(t) {
    return this.replaceColor_(t), this.canvas_[t] ? t : 1;
  }
  getImageState() {
    return this.imageState_;
  }
  getHitDetectionImage() {
    if (this.image_ || this.initializeImage_(), !this.hitDetectionImage_)
      if (this.isTainted_()) {
        const t = this.size_[0], e = this.size_[1], n = Xt(t, e);
        n.fillRect(0, 0, t, e), this.hitDetectionImage_ = n.canvas;
      } else
        this.hitDetectionImage_ = this.image_;
    return this.hitDetectionImage_;
  }
  getSize() {
    return this.size_;
  }
  getSrc() {
    return this.src_;
  }
  load() {
    if (this.imageState_ === yt.IDLE) {
      this.image_ || this.initializeImage_(), this.imageState_ = yt.LOADING;
      try {
        this.image_.src = this.src_;
      } catch {
        this.handleImageError_();
      }
      this.unlisten_ = ou(
        this.image_,
        this.handleImageLoad_.bind(this),
        this.handleImageError_.bind(this)
      );
    }
  }
  replaceColor_(t) {
    if (!this.color_ || this.canvas_[t] || this.imageState_ !== yt.LOADED)
      return;
    const e = this.image_, n = document.createElement("canvas");
    n.width = Math.ceil(e.width * t), n.height = Math.ceil(e.height * t);
    const s = n.getContext("2d");
    s.scale(t, t), s.drawImage(e, 0, 0), s.globalCompositeOperation = "multiply", s.fillStyle = xc(this.color_), s.fillRect(0, 0, n.width / t, n.height / t), s.globalCompositeOperation = "destination-in", s.drawImage(e, 0, 0), this.canvas_[t] = n;
  }
  unlistenImage_() {
    this.unlisten_ && (this.unlisten_(), this.unlisten_ = null);
  }
}
function U0(i, t, e, n, s, r) {
  let o = yr.get(t, n, r);
  return o || (o = new W0(i, t, e, n, s, r), yr.set(t, n, r, o)), o;
}
class ol extends eu {
  constructor(t) {
    t = t || {};
    const e = t.opacity !== void 0 ? t.opacity : 1, n = t.rotation !== void 0 ? t.rotation : 0, s = t.scale !== void 0 ? t.scale : 1, r = t.rotateWithView !== void 0 ? t.rotateWithView : !1;
    super({
      opacity: e,
      rotation: n,
      scale: s,
      displacement: t.displacement !== void 0 ? t.displacement : [0, 0],
      rotateWithView: r,
      declutterMode: t.declutterMode
    }), this.anchor_ = t.anchor !== void 0 ? t.anchor : [0.5, 0.5], this.normalizedAnchor_ = null, this.anchorOrigin_ = t.anchorOrigin !== void 0 ? t.anchorOrigin : "top-left", this.anchorXUnits_ = t.anchorXUnits !== void 0 ? t.anchorXUnits : "fraction", this.anchorYUnits_ = t.anchorYUnits !== void 0 ? t.anchorYUnits : "fraction", this.crossOrigin_ = t.crossOrigin !== void 0 ? t.crossOrigin : null;
    const o = t.img !== void 0 ? t.img : null;
    this.imgSize_ = t.imgSize;
    let a = t.src;
    Z(!(a !== void 0 && o), 4), Z(!o || o && this.imgSize_, 5), (a === void 0 || a.length === 0) && o && (a = o.src || j(o)), Z(a !== void 0 && a.length > 0, 6);
    const l = t.src !== void 0 ? yt.IDLE : yt.LOADED;
    this.color_ = t.color !== void 0 ? pr(t.color) : null, this.iconImage_ = U0(
      o,
      a,
      this.imgSize_ !== void 0 ? this.imgSize_ : null,
      this.crossOrigin_,
      l,
      this.color_
    ), this.offset_ = t.offset !== void 0 ? t.offset : [0, 0], this.offsetOrigin_ = t.offsetOrigin !== void 0 ? t.offsetOrigin : "top-left", this.origin_ = null, this.size_ = t.size !== void 0 ? t.size : null;
  }
  clone() {
    const t = this.getScale();
    return new ol({
      anchor: this.anchor_.slice(),
      anchorOrigin: this.anchorOrigin_,
      anchorXUnits: this.anchorXUnits_,
      anchorYUnits: this.anchorYUnits_,
      color: this.color_ && this.color_.slice ? this.color_.slice() : this.color_ || void 0,
      crossOrigin: this.crossOrigin_,
      imgSize: this.imgSize_,
      offset: this.offset_.slice(),
      offsetOrigin: this.offsetOrigin_,
      opacity: this.getOpacity(),
      rotateWithView: this.getRotateWithView(),
      rotation: this.getRotation(),
      scale: Array.isArray(t) ? t.slice() : t,
      size: this.size_ !== null ? this.size_.slice() : void 0,
      src: this.getSrc(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
  }
  getAnchor() {
    let t = this.normalizedAnchor_;
    if (!t) {
      t = this.anchor_;
      const s = this.getSize();
      if (this.anchorXUnits_ == "fraction" || this.anchorYUnits_ == "fraction") {
        if (!s)
          return null;
        t = this.anchor_.slice(), this.anchorXUnits_ == "fraction" && (t[0] *= s[0]), this.anchorYUnits_ == "fraction" && (t[1] *= s[1]);
      }
      if (this.anchorOrigin_ != "top-left") {
        if (!s)
          return null;
        t === this.anchor_ && (t = this.anchor_.slice()), (this.anchorOrigin_ == "top-right" || this.anchorOrigin_ == "bottom-right") && (t[0] = -t[0] + s[0]), (this.anchorOrigin_ == "bottom-left" || this.anchorOrigin_ == "bottom-right") && (t[1] = -t[1] + s[1]);
      }
      this.normalizedAnchor_ = t;
    }
    const e = this.getDisplacement(), n = this.getScaleArray();
    return [
      t[0] - e[0] / n[0],
      t[1] + e[1] / n[1]
    ];
  }
  setAnchor(t) {
    this.anchor_ = t, this.normalizedAnchor_ = null;
  }
  getColor() {
    return this.color_;
  }
  getImage(t) {
    return this.iconImage_.getImage(t);
  }
  getPixelRatio(t) {
    return this.iconImage_.getPixelRatio(t);
  }
  getImageSize() {
    return this.iconImage_.getSize();
  }
  getImageState() {
    return this.iconImage_.getImageState();
  }
  getHitDetectionImage() {
    return this.iconImage_.getHitDetectionImage();
  }
  getOrigin() {
    if (this.origin_)
      return this.origin_;
    let t = this.offset_;
    if (this.offsetOrigin_ != "top-left") {
      const e = this.getSize(), n = this.iconImage_.getSize();
      if (!e || !n)
        return null;
      t = t.slice(), (this.offsetOrigin_ == "top-right" || this.offsetOrigin_ == "bottom-right") && (t[0] = n[0] - e[0] - t[0]), (this.offsetOrigin_ == "bottom-left" || this.offsetOrigin_ == "bottom-right") && (t[1] = n[1] - e[1] - t[1]);
    }
    return this.origin_ = t, this.origin_;
  }
  getSrc() {
    return this.iconImage_.getSrc();
  }
  getSize() {
    return this.size_ ? this.size_ : this.iconImage_.getSize();
  }
  listenImageChange(t) {
    this.iconImage_.addEventListener($.CHANGE, t);
  }
  load() {
    this.iconImage_.load();
  }
  unlistenImageChange(t) {
    this.iconImage_.removeEventListener($.CHANGE, t);
  }
}
const Pr = ol;
function ch(i) {
  return new le({
    fill: ps(i, ""),
    stroke: ys(i, ""),
    text: Z0(i),
    image: X0(i)
  });
}
function ps(i, t) {
  const e = i[t + "fill-color"];
  if (!!e)
    return new ee({ color: e });
}
function ys(i, t) {
  const e = i[t + "stroke-width"], n = i[t + "stroke-color"];
  if (!(!e && !n))
    return new ce({
      width: e,
      color: n,
      lineCap: i[t + "stroke-line-cap"],
      lineJoin: i[t + "stroke-line-join"],
      lineDash: i[t + "stroke-line-dash"],
      lineDashOffset: i[t + "stroke-line-dash-offset"],
      miterLimit: i[t + "stroke-miter-limit"]
    });
}
function Z0(i) {
  const t = i["text-value"];
  return t ? new ra({
    text: t,
    font: i["text-font"],
    maxAngle: i["text-max-angle"],
    offsetX: i["text-offset-x"],
    offsetY: i["text-offset-y"],
    overflow: i["text-overflow"],
    placement: i["text-placement"],
    scale: i["text-scale"],
    rotateWithView: i["text-rotate-with-view"],
    rotation: i["text-rotation"],
    textAlign: i["text-align"],
    justify: i["text-justify"],
    textBaseline: i["text-baseline"],
    padding: i["text-padding"],
    fill: ps(i, "text-"),
    backgroundFill: ps(i, "text-background-"),
    stroke: ys(i, "text-"),
    backgroundStroke: ys(i, "text-background-")
  }) : void 0;
}
function X0(i) {
  const t = i["icon-src"], e = i["icon-img"];
  if (t || e)
    return new Pr({
      src: t,
      img: e,
      imgSize: i["icon-img-size"],
      anchor: i["icon-anchor"],
      anchorOrigin: i["icon-anchor-origin"],
      anchorXUnits: i["icon-anchor-x-units"],
      anchorYUnits: i["icon-anchor-y-units"],
      color: i["icon-color"],
      crossOrigin: i["icon-cross-origin"],
      offset: i["icon-offset"],
      displacement: i["icon-displacement"],
      opacity: i["icon-opacity"],
      scale: i["icon-scale"],
      rotation: i["icon-rotation"],
      rotateWithView: i["icon-rotate-with-view"],
      size: i["icon-size"],
      declutterMode: i["icon-declutter-mode"]
    });
  const n = i["shape-points"];
  if (n) {
    const r = "shape-";
    return new iu({
      points: n,
      fill: ps(i, r),
      stroke: ys(i, r),
      radius: i["shape-radius"],
      radius1: i["shape-radius1"],
      radius2: i["shape-radius2"],
      angle: i["shape-angle"],
      displacement: i["shape-displacement"],
      rotation: i["shape-rotation"],
      rotateWithView: i["shape-rotate-with-view"],
      scale: i["shape-scale"],
      declutterMode: i["shape-declutter-mode"]
    });
  }
  const s = i["circle-radius"];
  if (s) {
    const r = "circle-";
    return new fi({
      radius: s,
      fill: ps(i, r),
      stroke: ys(i, r),
      displacement: i["circle-displacement"],
      scale: i["circle-scale"],
      rotation: i["circle-rotation"],
      rotateWithView: i["circle-rotate-with-view"],
      declutterMode: i["circle-declutter-mode"]
    });
  }
}
const uh = {
  RENDER_ORDER: "renderOrder"
};
class H0 extends Kr {
  constructor(t) {
    t = t || {};
    const e = Object.assign({}, t);
    delete e.style, delete e.renderBuffer, delete e.updateWhileAnimating, delete e.updateWhileInteracting, super(e), this.declutter_ = t.declutter !== void 0 ? t.declutter : !1, this.renderBuffer_ = t.renderBuffer !== void 0 ? t.renderBuffer : 100, this.style_ = null, this.styleFunction_ = void 0, this.setStyle(t.style), this.updateWhileAnimating_ = t.updateWhileAnimating !== void 0 ? t.updateWhileAnimating : !1, this.updateWhileInteracting_ = t.updateWhileInteracting !== void 0 ? t.updateWhileInteracting : !1;
  }
  getDeclutter() {
    return this.declutter_;
  }
  getFeatures(t) {
    return super.getFeatures(t);
  }
  getRenderBuffer() {
    return this.renderBuffer_;
  }
  getRenderOrder() {
    return this.get(uh.RENDER_ORDER);
  }
  getStyle() {
    return this.style_;
  }
  getStyleFunction() {
    return this.styleFunction_;
  }
  getUpdateWhileAnimating() {
    return this.updateWhileAnimating_;
  }
  getUpdateWhileInteracting() {
    return this.updateWhileInteracting_;
  }
  renderDeclutter(t) {
    t.declutterTree || (t.declutterTree = new ru(9)), this.getRenderer().renderDeclutter(t);
  }
  setRenderOrder(t) {
    this.set(uh.RENDER_ORDER, t);
  }
  setStyle(t) {
    let e;
    if (t === void 0)
      e = D0;
    else if (t === null)
      e = null;
    else if (typeof t == "function")
      e = t;
    else if (t instanceof le)
      e = t;
    else if (Array.isArray(t)) {
      const n = t.length, s = new Array(n);
      for (let r = 0; r < n; ++r) {
        const o = t[r];
        o instanceof le ? s[r] = o : s[r] = ch(o);
      }
      e = s;
    } else
      e = ch(t);
    this.style_ = e, this.styleFunction_ = t === null ? void 0 : F0(this.style_), this.changed();
  }
}
const Y0 = H0, Rs = {
  BEGIN_GEOMETRY: 0,
  BEGIN_PATH: 1,
  CIRCLE: 2,
  CLOSE_PATH: 3,
  CUSTOM: 4,
  DRAW_CHARS: 5,
  DRAW_IMAGE: 6,
  END_GEOMETRY: 7,
  FILL: 8,
  MOVE_TO_LINE_TO: 9,
  SET_FILL_STYLE: 10,
  SET_STROKE_STYLE: 11,
  STROKE: 12
}, Qs = [Rs.FILL], oi = [Rs.STROKE], Li = [Rs.BEGIN_PATH], dh = [Rs.CLOSE_PATH], B = Rs;
class q0 {
  drawCustom(t, e, n, s) {
  }
  drawGeometry(t) {
  }
  setStyle(t) {
  }
  drawCircle(t, e) {
  }
  drawFeature(t, e) {
  }
  drawGeometryCollection(t, e) {
  }
  drawLineString(t, e) {
  }
  drawMultiLineString(t, e) {
  }
  drawMultiPoint(t, e) {
  }
  drawMultiPolygon(t, e) {
  }
  drawPoint(t, e) {
  }
  drawPolygon(t, e) {
  }
  drawText(t, e) {
  }
  setFillStrokeStyle(t, e) {
  }
  setImageStyle(t, e) {
  }
  setTextStyle(t, e) {
  }
}
const au = q0;
class K0 extends au {
  constructor(t, e, n, s) {
    super(), this.tolerance = t, this.maxExtent = e, this.pixelRatio = s, this.maxLineWidth = 0, this.resolution = n, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_ = null, this.bufferedMaxExtent_ = null, this.instructions = [], this.coordinates = [], this.tmpCoordinate_ = [], this.hitDetectionInstructions = [], this.state = {};
  }
  applyPixelRatio(t) {
    const e = this.pixelRatio;
    return e == 1 ? t : t.map(function(n) {
      return n * e;
    });
  }
  appendFlatPointCoordinates(t, e) {
    const n = this.getBufferedMaxExtent(), s = this.tmpCoordinate_, r = this.coordinates;
    let o = r.length;
    for (let a = 0, l = t.length; a < l; a += e)
      s[0] = t[a], s[1] = t[a + 1], Xr(n, s) && (r[o++] = s[0], r[o++] = s[1]);
    return o;
  }
  appendFlatLineCoordinates(t, e, n, s, r, o) {
    const a = this.coordinates;
    let l = a.length;
    const h = this.getBufferedMaxExtent();
    o && (e += s);
    let c = t[e], u = t[e + 1];
    const d = this.tmpCoordinate_;
    let f = !0, g, m, _;
    for (g = e + s; g < n; g += s)
      d[0] = t[g], d[1] = t[g + 1], _ = Wo(h, d), _ !== m ? (f && (a[l++] = c, a[l++] = u, f = !1), a[l++] = d[0], a[l++] = d[1]) : _ === Ct.INTERSECTING ? (a[l++] = d[0], a[l++] = d[1], f = !1) : f = !0, c = d[0], u = d[1], m = _;
    return (r && f || g === e + s) && (a[l++] = c, a[l++] = u), l;
  }
  drawCustomCoordinates_(t, e, n, s, r) {
    for (let o = 0, a = n.length; o < a; ++o) {
      const l = n[o], h = this.appendFlatLineCoordinates(
        t,
        e,
        l,
        s,
        !1,
        !1
      );
      r.push(h), e = l;
    }
    return e;
  }
  drawCustom(t, e, n, s) {
    this.beginGeometry(t, e);
    const r = t.getType(), o = t.getStride(), a = this.coordinates.length;
    let l, h, c, u, d;
    switch (r) {
      case "MultiPolygon":
        l = t.getOrientedFlatCoordinates(), u = [];
        const f = t.getEndss();
        d = 0;
        for (let g = 0, m = f.length; g < m; ++g) {
          const _ = [];
          d = this.drawCustomCoordinates_(
            l,
            d,
            f[g],
            o,
            _
          ), u.push(_);
        }
        this.instructions.push([
          B.CUSTOM,
          a,
          u,
          t,
          n,
          ta
        ]), this.hitDetectionInstructions.push([
          B.CUSTOM,
          a,
          u,
          t,
          s || n,
          ta
        ]);
        break;
      case "Polygon":
      case "MultiLineString":
        c = [], l = r == "Polygon" ? t.getOrientedFlatCoordinates() : t.getFlatCoordinates(), d = this.drawCustomCoordinates_(
          l,
          0,
          t.getEnds(),
          o,
          c
        ), this.instructions.push([
          B.CUSTOM,
          a,
          c,
          t,
          n,
          _s
        ]), this.hitDetectionInstructions.push([
          B.CUSTOM,
          a,
          c,
          t,
          s || n,
          _s
        ]);
        break;
      case "LineString":
      case "Circle":
        l = t.getFlatCoordinates(), h = this.appendFlatLineCoordinates(
          l,
          0,
          l.length,
          o,
          !1,
          !1
        ), this.instructions.push([
          B.CUSTOM,
          a,
          h,
          t,
          n,
          si
        ]), this.hitDetectionInstructions.push([
          B.CUSTOM,
          a,
          h,
          t,
          s || n,
          si
        ]);
        break;
      case "MultiPoint":
        l = t.getFlatCoordinates(), h = this.appendFlatPointCoordinates(l, o), h > a && (this.instructions.push([
          B.CUSTOM,
          a,
          h,
          t,
          n,
          si
        ]), this.hitDetectionInstructions.push([
          B.CUSTOM,
          a,
          h,
          t,
          s || n,
          si
        ]));
        break;
      case "Point":
        l = t.getFlatCoordinates(), this.coordinates.push(l[0], l[1]), h = this.coordinates.length, this.instructions.push([
          B.CUSTOM,
          a,
          h,
          t,
          n
        ]), this.hitDetectionInstructions.push([
          B.CUSTOM,
          a,
          h,
          t,
          s || n
        ]);
        break;
    }
    this.endGeometry(e);
  }
  beginGeometry(t, e) {
    this.beginGeometryInstruction1_ = [
      B.BEGIN_GEOMETRY,
      e,
      0,
      t
    ], this.instructions.push(this.beginGeometryInstruction1_), this.beginGeometryInstruction2_ = [
      B.BEGIN_GEOMETRY,
      e,
      0,
      t
    ], this.hitDetectionInstructions.push(this.beginGeometryInstruction2_);
  }
  finish() {
    return {
      instructions: this.instructions,
      hitDetectionInstructions: this.hitDetectionInstructions,
      coordinates: this.coordinates
    };
  }
  reverseHitDetectionInstructions() {
    const t = this.hitDetectionInstructions;
    t.reverse();
    let e;
    const n = t.length;
    let s, r, o = -1;
    for (e = 0; e < n; ++e)
      s = t[e], r = s[0], r == B.END_GEOMETRY ? o = e : r == B.BEGIN_GEOMETRY && (s[2] = e, Pd(this.hitDetectionInstructions, o, e), o = -1);
  }
  setFillStrokeStyle(t, e) {
    const n = this.state;
    if (t) {
      const s = t.getColor();
      n.fillStyle = _e(
        s || $e
      );
    } else
      n.fillStyle = void 0;
    if (e) {
      const s = e.getColor();
      n.strokeStyle = _e(
        s || ds
      );
      const r = e.getLineCap();
      n.lineCap = r !== void 0 ? r : Cr;
      const o = e.getLineDash();
      n.lineDash = o ? o.slice() : hs;
      const a = e.getLineDashOffset();
      n.lineDashOffset = a || cs;
      const l = e.getLineJoin();
      n.lineJoin = l !== void 0 ? l : bn;
      const h = e.getWidth();
      n.lineWidth = h !== void 0 ? h : gs;
      const c = e.getMiterLimit();
      n.miterLimit = c !== void 0 ? c : us, n.lineWidth > this.maxLineWidth && (this.maxLineWidth = n.lineWidth, this.bufferedMaxExtent_ = null);
    } else
      n.strokeStyle = void 0, n.lineCap = void 0, n.lineDash = null, n.lineDashOffset = void 0, n.lineJoin = void 0, n.lineWidth = void 0, n.miterLimit = void 0;
  }
  createFill(t) {
    const e = t.fillStyle, n = [B.SET_FILL_STYLE, e];
    return typeof e != "string" && n.push(!0), n;
  }
  applyStroke(t) {
    this.instructions.push(this.createStroke(t));
  }
  createStroke(t) {
    return [
      B.SET_STROKE_STYLE,
      t.strokeStyle,
      t.lineWidth * this.pixelRatio,
      t.lineCap,
      t.lineJoin,
      t.miterLimit,
      this.applyPixelRatio(t.lineDash),
      t.lineDashOffset * this.pixelRatio
    ];
  }
  updateFillStyle(t, e) {
    const n = t.fillStyle;
    (typeof n != "string" || t.currentFillStyle != n) && (n !== void 0 && this.instructions.push(e.call(this, t)), t.currentFillStyle = n);
  }
  updateStrokeStyle(t, e) {
    const n = t.strokeStyle, s = t.lineCap, r = t.lineDash, o = t.lineDashOffset, a = t.lineJoin, l = t.lineWidth, h = t.miterLimit;
    (t.currentStrokeStyle != n || t.currentLineCap != s || r != t.currentLineDash && !xi(t.currentLineDash, r) || t.currentLineDashOffset != o || t.currentLineJoin != a || t.currentLineWidth != l || t.currentMiterLimit != h) && (n !== void 0 && e.call(this, t), t.currentStrokeStyle = n, t.currentLineCap = s, t.currentLineDash = r, t.currentLineDashOffset = o, t.currentLineJoin = a, t.currentLineWidth = l, t.currentMiterLimit = h);
  }
  endGeometry(t) {
    this.beginGeometryInstruction1_[2] = this.instructions.length, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length, this.beginGeometryInstruction2_ = null;
    const e = [B.END_GEOMETRY, t];
    this.instructions.push(e), this.hitDetectionInstructions.push(e);
  }
  getBufferedMaxExtent() {
    if (!this.bufferedMaxExtent_ && (this.bufferedMaxExtent_ = gc(this.maxExtent), this.maxLineWidth > 0)) {
      const t = this.resolution * (this.maxLineWidth + 1) / 2;
      ws(this.bufferedMaxExtent_, t, this.bufferedMaxExtent_);
    }
    return this.bufferedMaxExtent_;
  }
}
const Is = K0;
class J0 extends Is {
  constructor(t, e, n, s) {
    super(t, e, n, s), this.hitDetectionImage_ = null, this.image_ = null, this.imagePixelRatio_ = void 0, this.anchorX_ = void 0, this.anchorY_ = void 0, this.height_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.scale_ = void 0, this.width_ = void 0, this.declutterMode_ = void 0, this.declutterImageWithText_ = void 0;
  }
  drawPoint(t, e) {
    if (!this.image_)
      return;
    this.beginGeometry(t, e);
    const n = t.getFlatCoordinates(), s = t.getStride(), r = this.coordinates.length, o = this.appendFlatPointCoordinates(n, s);
    this.instructions.push([
      B.DRAW_IMAGE,
      r,
      o,
      this.image_,
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_ * this.imagePixelRatio_,
      this.originY_ * this.imagePixelRatio_,
      this.rotateWithView_,
      this.rotation_,
      [
        this.scale_[0] * this.pixelRatio / this.imagePixelRatio_,
        this.scale_[1] * this.pixelRatio / this.imagePixelRatio_
      ],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterMode_,
      this.declutterImageWithText_
    ]), this.hitDetectionInstructions.push([
      B.DRAW_IMAGE,
      r,
      o,
      this.hitDetectionImage_,
      this.anchorX_,
      this.anchorY_,
      this.height_,
      this.opacity_,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      this.scale_,
      this.width_,
      this.declutterMode_,
      this.declutterImageWithText_
    ]), this.endGeometry(e);
  }
  drawMultiPoint(t, e) {
    if (!this.image_)
      return;
    this.beginGeometry(t, e);
    const n = t.getFlatCoordinates(), s = t.getStride(), r = this.coordinates.length, o = this.appendFlatPointCoordinates(n, s);
    this.instructions.push([
      B.DRAW_IMAGE,
      r,
      o,
      this.image_,
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_ * this.imagePixelRatio_,
      this.originY_ * this.imagePixelRatio_,
      this.rotateWithView_,
      this.rotation_,
      [
        this.scale_[0] * this.pixelRatio / this.imagePixelRatio_,
        this.scale_[1] * this.pixelRatio / this.imagePixelRatio_
      ],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterMode_,
      this.declutterImageWithText_
    ]), this.hitDetectionInstructions.push([
      B.DRAW_IMAGE,
      r,
      o,
      this.hitDetectionImage_,
      this.anchorX_,
      this.anchorY_,
      this.height_,
      this.opacity_,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      this.scale_,
      this.width_,
      this.declutterMode_,
      this.declutterImageWithText_
    ]), this.endGeometry(e);
  }
  finish() {
    return this.reverseHitDetectionInstructions(), this.anchorX_ = void 0, this.anchorY_ = void 0, this.hitDetectionImage_ = null, this.image_ = null, this.imagePixelRatio_ = void 0, this.height_ = void 0, this.scale_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.width_ = void 0, super.finish();
  }
  setImageStyle(t, e) {
    const n = t.getAnchor(), s = t.getSize(), r = t.getOrigin();
    this.imagePixelRatio_ = t.getPixelRatio(this.pixelRatio), this.anchorX_ = n[0], this.anchorY_ = n[1], this.hitDetectionImage_ = t.getHitDetectionImage(), this.image_ = t.getImage(this.pixelRatio), this.height_ = s[1], this.opacity_ = t.getOpacity(), this.originX_ = r[0], this.originY_ = r[1], this.rotateWithView_ = t.getRotateWithView(), this.rotation_ = t.getRotation(), this.scale_ = t.getScaleArray(), this.width_ = s[0], this.declutterMode_ = t.getDeclutterMode(), this.declutterImageWithText_ = e;
  }
}
const Q0 = J0;
class t1 extends Is {
  constructor(t, e, n, s) {
    super(t, e, n, s);
  }
  drawFlatCoordinates_(t, e, n, s) {
    const r = this.coordinates.length, o = this.appendFlatLineCoordinates(
      t,
      e,
      n,
      s,
      !1,
      !1
    ), a = [
      B.MOVE_TO_LINE_TO,
      r,
      o
    ];
    return this.instructions.push(a), this.hitDetectionInstructions.push(a), n;
  }
  drawLineString(t, e) {
    const n = this.state, s = n.strokeStyle, r = n.lineWidth;
    if (s === void 0 || r === void 0)
      return;
    this.updateStrokeStyle(n, this.applyStroke), this.beginGeometry(t, e), this.hitDetectionInstructions.push(
      [
        B.SET_STROKE_STYLE,
        n.strokeStyle,
        n.lineWidth,
        n.lineCap,
        n.lineJoin,
        n.miterLimit,
        hs,
        cs
      ],
      Li
    );
    const o = t.getFlatCoordinates(), a = t.getStride();
    this.drawFlatCoordinates_(
      o,
      0,
      o.length,
      a
    ), this.hitDetectionInstructions.push(oi), this.endGeometry(e);
  }
  drawMultiLineString(t, e) {
    const n = this.state, s = n.strokeStyle, r = n.lineWidth;
    if (s === void 0 || r === void 0)
      return;
    this.updateStrokeStyle(n, this.applyStroke), this.beginGeometry(t, e), this.hitDetectionInstructions.push(
      [
        B.SET_STROKE_STYLE,
        n.strokeStyle,
        n.lineWidth,
        n.lineCap,
        n.lineJoin,
        n.miterLimit,
        n.lineDash,
        n.lineDashOffset
      ],
      Li
    );
    const o = t.getEnds(), a = t.getFlatCoordinates(), l = t.getStride();
    let h = 0;
    for (let c = 0, u = o.length; c < u; ++c)
      h = this.drawFlatCoordinates_(
        a,
        h,
        o[c],
        l
      );
    this.hitDetectionInstructions.push(oi), this.endGeometry(e);
  }
  finish() {
    const t = this.state;
    return t.lastStroke != null && t.lastStroke != this.coordinates.length && this.instructions.push(oi), this.reverseHitDetectionInstructions(), this.state = null, super.finish();
  }
  applyStroke(t) {
    t.lastStroke != null && t.lastStroke != this.coordinates.length && (this.instructions.push(oi), t.lastStroke = this.coordinates.length), t.lastStroke = 0, super.applyStroke(t), this.instructions.push(Li);
  }
}
const e1 = t1;
class i1 extends Is {
  constructor(t, e, n, s) {
    super(t, e, n, s);
  }
  drawFlatCoordinatess_(t, e, n, s) {
    const r = this.state, o = r.fillStyle !== void 0, a = r.strokeStyle !== void 0, l = n.length;
    this.instructions.push(Li), this.hitDetectionInstructions.push(Li);
    for (let h = 0; h < l; ++h) {
      const c = n[h], u = this.coordinates.length, d = this.appendFlatLineCoordinates(
        t,
        e,
        c,
        s,
        !0,
        !a
      ), f = [
        B.MOVE_TO_LINE_TO,
        u,
        d
      ];
      this.instructions.push(f), this.hitDetectionInstructions.push(f), a && (this.instructions.push(dh), this.hitDetectionInstructions.push(dh)), e = c;
    }
    return o && (this.instructions.push(Qs), this.hitDetectionInstructions.push(Qs)), a && (this.instructions.push(oi), this.hitDetectionInstructions.push(oi)), e;
  }
  drawCircle(t, e) {
    const n = this.state, s = n.fillStyle, r = n.strokeStyle;
    if (s === void 0 && r === void 0)
      return;
    this.setFillStrokeStyles_(), this.beginGeometry(t, e), n.fillStyle !== void 0 && this.hitDetectionInstructions.push([
      B.SET_FILL_STYLE,
      $e
    ]), n.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
      B.SET_STROKE_STYLE,
      n.strokeStyle,
      n.lineWidth,
      n.lineCap,
      n.lineJoin,
      n.miterLimit,
      n.lineDash,
      n.lineDashOffset
    ]);
    const o = t.getFlatCoordinates(), a = t.getStride(), l = this.coordinates.length;
    this.appendFlatLineCoordinates(
      o,
      0,
      o.length,
      a,
      !1,
      !1
    );
    const h = [B.CIRCLE, l];
    this.instructions.push(Li, h), this.hitDetectionInstructions.push(Li, h), n.fillStyle !== void 0 && (this.instructions.push(Qs), this.hitDetectionInstructions.push(Qs)), n.strokeStyle !== void 0 && (this.instructions.push(oi), this.hitDetectionInstructions.push(oi)), this.endGeometry(e);
  }
  drawPolygon(t, e) {
    const n = this.state, s = n.fillStyle, r = n.strokeStyle;
    if (s === void 0 && r === void 0)
      return;
    this.setFillStrokeStyles_(), this.beginGeometry(t, e), n.fillStyle !== void 0 && this.hitDetectionInstructions.push([
      B.SET_FILL_STYLE,
      $e
    ]), n.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
      B.SET_STROKE_STYLE,
      n.strokeStyle,
      n.lineWidth,
      n.lineCap,
      n.lineJoin,
      n.miterLimit,
      n.lineDash,
      n.lineDashOffset
    ]);
    const o = t.getEnds(), a = t.getOrientedFlatCoordinates(), l = t.getStride();
    this.drawFlatCoordinatess_(
      a,
      0,
      o,
      l
    ), this.endGeometry(e);
  }
  drawMultiPolygon(t, e) {
    const n = this.state, s = n.fillStyle, r = n.strokeStyle;
    if (s === void 0 && r === void 0)
      return;
    this.setFillStrokeStyles_(), this.beginGeometry(t, e), n.fillStyle !== void 0 && this.hitDetectionInstructions.push([
      B.SET_FILL_STYLE,
      $e
    ]), n.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
      B.SET_STROKE_STYLE,
      n.strokeStyle,
      n.lineWidth,
      n.lineCap,
      n.lineJoin,
      n.miterLimit,
      n.lineDash,
      n.lineDashOffset
    ]);
    const o = t.getEndss(), a = t.getOrientedFlatCoordinates(), l = t.getStride();
    let h = 0;
    for (let c = 0, u = o.length; c < u; ++c)
      h = this.drawFlatCoordinatess_(
        a,
        h,
        o[c],
        l
      );
    this.endGeometry(e);
  }
  finish() {
    this.reverseHitDetectionInstructions(), this.state = null;
    const t = this.tolerance;
    if (t !== 0) {
      const e = this.coordinates;
      for (let n = 0, s = e.length; n < s; ++n)
        e[n] = Ti(e[n], t);
    }
    return super.finish();
  }
  setFillStrokeStyles_() {
    const t = this.state;
    t.fillStyle !== void 0 && this.updateFillStyle(t, this.createFill), t.strokeStyle !== void 0 && this.updateStrokeStyle(t, this.applyStroke);
  }
}
const fh = i1;
function n1(i, t, e, n, s) {
  let r = e, o = e, a = 0, l = 0, h = e, c, u, d, f, g, m, _, p, y, x;
  for (u = e; u < n; u += s) {
    const v = t[u], C = t[u + 1];
    g !== void 0 && (y = v - g, x = C - m, f = Math.sqrt(y * y + x * x), _ !== void 0 && (l += d, c = Math.acos((_ * y + p * x) / (d * f)), c > i && (l > a && (a = l, r = h, o = u), l = 0, h = u - s)), d = f, _ = y, p = x), g = v, m = C;
  }
  return l += f, l > a ? [h, u] : [r, o];
}
const is = {
  left: 0,
  end: 0,
  center: 0.5,
  right: 1,
  start: 1,
  top: 0,
  middle: 0.5,
  hanging: 0.2,
  alphabetic: 0.8,
  ideographic: 0.8,
  bottom: 1
};
class s1 extends Is {
  constructor(t, e, n, s) {
    super(t, e, n, s), this.labels_ = null, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = void 0, this.textRotation_ = 0, this.textFillState_ = null, this.fillStates = {}, this.textStrokeState_ = null, this.strokeStates = {}, this.textState_ = {}, this.textStates = {}, this.textKey_ = "", this.fillKey_ = "", this.strokeKey_ = "", this.declutterImageWithText_ = void 0;
  }
  finish() {
    const t = super.finish();
    return t.textStates = this.textStates, t.fillStates = this.fillStates, t.strokeStates = this.strokeStates, t;
  }
  drawText(t, e) {
    const n = this.textFillState_, s = this.textStrokeState_, r = this.textState_;
    if (this.text_ === "" || !r || !n && !s)
      return;
    const o = this.coordinates;
    let a = o.length;
    const l = t.getType();
    let h = null, c = t.getStride();
    if (r.placement === "line" && (l == "LineString" || l == "MultiLineString" || l == "Polygon" || l == "MultiPolygon")) {
      if (!Ot(this.getBufferedMaxExtent(), t.getExtent()))
        return;
      let u;
      if (h = t.getFlatCoordinates(), l == "LineString")
        u = [h.length];
      else if (l == "MultiLineString")
        u = t.getEnds();
      else if (l == "Polygon")
        u = t.getEnds().slice(0, 1);
      else if (l == "MultiPolygon") {
        const m = t.getEndss();
        u = [];
        for (let _ = 0, p = m.length; _ < p; ++_)
          u.push(m[_][0]);
      }
      this.beginGeometry(t, e);
      const d = r.textAlign;
      let f = 0, g;
      for (let m = 0, _ = u.length; m < _; ++m) {
        if (d == null) {
          const y = n1(
            r.maxAngle,
            h,
            f,
            u[m],
            c
          );
          f = y[0], g = y[1];
        } else
          g = u[m];
        for (let y = f; y < g; y += c)
          o.push(h[y], h[y + 1]);
        const p = o.length;
        f = u[m], this.drawChars_(a, p), a = p;
      }
      this.endGeometry(e);
    } else {
      let u = r.overflow ? null : [];
      switch (l) {
        case "Point":
        case "MultiPoint":
          h = t.getFlatCoordinates();
          break;
        case "LineString":
          h = t.getFlatMidpoint();
          break;
        case "Circle":
          h = t.getCenter();
          break;
        case "MultiLineString":
          h = t.getFlatMidpoints(), c = 2;
          break;
        case "Polygon":
          h = t.getFlatInteriorPoint(), r.overflow || u.push(h[2] / this.resolution), c = 3;
          break;
        case "MultiPolygon":
          const _ = t.getFlatInteriorPoints();
          h = [];
          for (let p = 0, y = _.length; p < y; p += 3)
            r.overflow || u.push(_[p + 2] / this.resolution), h.push(_[p], _[p + 1]);
          if (h.length === 0)
            return;
          c = 2;
          break;
      }
      const d = this.appendFlatPointCoordinates(h, c);
      if (d === a)
        return;
      if (u && (d - a) / 2 !== h.length / c) {
        let _ = a / 2;
        u = u.filter((p, y) => {
          const x = o[(_ + y) * 2] === h[y * c] && o[(_ + y) * 2 + 1] === h[y * c + 1];
          return x || --_, x;
        });
      }
      this.saveTextStates_(), (r.backgroundFill || r.backgroundStroke) && (this.setFillStrokeStyle(
        r.backgroundFill,
        r.backgroundStroke
      ), r.backgroundFill && (this.updateFillStyle(this.state, this.createFill), this.hitDetectionInstructions.push(this.createFill(this.state))), r.backgroundStroke && (this.updateStrokeStyle(this.state, this.applyStroke), this.hitDetectionInstructions.push(this.createStroke(this.state)))), this.beginGeometry(t, e);
      let f = r.padding;
      if (f != Ri && (r.scale[0] < 0 || r.scale[1] < 0)) {
        let _ = r.padding[0], p = r.padding[1], y = r.padding[2], x = r.padding[3];
        r.scale[0] < 0 && (p = -p, x = -x), r.scale[1] < 0 && (_ = -_, y = -y), f = [_, p, y, x];
      }
      const g = this.pixelRatio;
      this.instructions.push([
        B.DRAW_IMAGE,
        a,
        d,
        null,
        NaN,
        NaN,
        NaN,
        1,
        0,
        0,
        this.textRotateWithView_,
        this.textRotation_,
        [1, 1],
        NaN,
        void 0,
        this.declutterImageWithText_,
        f == Ri ? Ri : f.map(function(_) {
          return _ * g;
        }),
        !!r.backgroundFill,
        !!r.backgroundStroke,
        this.text_,
        this.textKey_,
        this.strokeKey_,
        this.fillKey_,
        this.textOffsetX_,
        this.textOffsetY_,
        u
      ]);
      const m = 1 / g;
      this.hitDetectionInstructions.push([
        B.DRAW_IMAGE,
        a,
        d,
        null,
        NaN,
        NaN,
        NaN,
        1,
        0,
        0,
        this.textRotateWithView_,
        this.textRotation_,
        [m, m],
        NaN,
        void 0,
        this.declutterImageWithText_,
        f,
        !!r.backgroundFill,
        !!r.backgroundStroke,
        this.text_,
        this.textKey_,
        this.strokeKey_,
        this.fillKey_,
        this.textOffsetX_,
        this.textOffsetY_,
        u
      ]), this.endGeometry(e);
    }
  }
  saveTextStates_() {
    const t = this.textStrokeState_, e = this.textState_, n = this.textFillState_, s = this.strokeKey_;
    t && (s in this.strokeStates || (this.strokeStates[s] = {
      strokeStyle: t.strokeStyle,
      lineCap: t.lineCap,
      lineDashOffset: t.lineDashOffset,
      lineWidth: t.lineWidth,
      lineJoin: t.lineJoin,
      miterLimit: t.miterLimit,
      lineDash: t.lineDash
    }));
    const r = this.textKey_;
    r in this.textStates || (this.textStates[r] = {
      font: e.font,
      textAlign: e.textAlign || fs,
      justify: e.justify,
      textBaseline: e.textBaseline || Mr,
      scale: e.scale
    });
    const o = this.fillKey_;
    n && (o in this.fillStates || (this.fillStates[o] = {
      fillStyle: n.fillStyle
    }));
  }
  drawChars_(t, e) {
    const n = this.textStrokeState_, s = this.textState_, r = this.strokeKey_, o = this.textKey_, a = this.fillKey_;
    this.saveTextStates_();
    const l = this.pixelRatio, h = is[s.textBaseline], c = this.textOffsetY_ * l, u = this.text_, d = n ? n.lineWidth * Math.abs(s.scale[0]) / 2 : 0;
    this.instructions.push([
      B.DRAW_CHARS,
      t,
      e,
      h,
      s.overflow,
      a,
      s.maxAngle,
      l,
      c,
      r,
      d * l,
      u,
      o,
      1
    ]), this.hitDetectionInstructions.push([
      B.DRAW_CHARS,
      t,
      e,
      h,
      s.overflow,
      a,
      s.maxAngle,
      1,
      c,
      r,
      d,
      u,
      o,
      1 / l
    ]);
  }
  setTextStyle(t, e) {
    let n, s, r;
    if (!t)
      this.text_ = "";
    else {
      const o = t.getFill();
      o ? (s = this.textFillState_, s || (s = {}, this.textFillState_ = s), s.fillStyle = _e(
        o.getColor() || $e
      )) : (s = null, this.textFillState_ = s);
      const a = t.getStroke();
      if (!a)
        r = null, this.textStrokeState_ = r;
      else {
        r = this.textStrokeState_, r || (r = {}, this.textStrokeState_ = r);
        const g = a.getLineDash(), m = a.getLineDashOffset(), _ = a.getWidth(), p = a.getMiterLimit();
        r.lineCap = a.getLineCap() || Cr, r.lineDash = g ? g.slice() : hs, r.lineDashOffset = m === void 0 ? cs : m, r.lineJoin = a.getLineJoin() || bn, r.lineWidth = _ === void 0 ? gs : _, r.miterLimit = p === void 0 ? us : p, r.strokeStyle = _e(
          a.getColor() || ds
        );
      }
      n = this.textState_;
      const l = t.getFont() || Rc;
      wf(l);
      const h = t.getScaleArray();
      n.overflow = t.getOverflow(), n.font = l, n.maxAngle = t.getMaxAngle(), n.placement = t.getPlacement(), n.textAlign = t.getTextAlign(), n.justify = t.getJustify(), n.textBaseline = t.getTextBaseline() || Mr, n.backgroundFill = t.getBackgroundFill(), n.backgroundStroke = t.getBackgroundStroke(), n.padding = t.getPadding() || Ri, n.scale = h === void 0 ? [1, 1] : h;
      const c = t.getOffsetX(), u = t.getOffsetY(), d = t.getRotateWithView(), f = t.getRotation();
      this.text_ = t.getText() || "", this.textOffsetX_ = c === void 0 ? 0 : c, this.textOffsetY_ = u === void 0 ? 0 : u, this.textRotateWithView_ = d === void 0 ? !1 : d, this.textRotation_ = f === void 0 ? 0 : f, this.strokeKey_ = r ? (typeof r.strokeStyle == "string" ? r.strokeStyle : j(r.strokeStyle)) + r.lineCap + r.lineDashOffset + "|" + r.lineWidth + r.lineJoin + r.miterLimit + "[" + r.lineDash.join() + "]" : "", this.textKey_ = n.font + n.scale + (n.textAlign || "?") + (n.justify || "?") + (n.textBaseline || "?"), this.fillKey_ = s ? typeof s.fillStyle == "string" ? s.fillStyle : "|" + j(s.fillStyle) : "";
    }
    this.declutterImageWithText_ = e;
  }
}
const r1 = {
  Circle: fh,
  Default: Is,
  Image: Q0,
  LineString: e1,
  Polygon: fh,
  Text: s1
};
class o1 {
  constructor(t, e, n, s) {
    this.tolerance_ = t, this.maxExtent_ = e, this.pixelRatio_ = s, this.resolution_ = n, this.buildersByZIndex_ = {};
  }
  finish() {
    const t = {};
    for (const e in this.buildersByZIndex_) {
      t[e] = t[e] || {};
      const n = this.buildersByZIndex_[e];
      for (const s in n) {
        const r = n[s].finish();
        t[e][s] = r;
      }
    }
    return t;
  }
  getBuilder(t, e) {
    const n = t !== void 0 ? t.toString() : "0";
    let s = this.buildersByZIndex_[n];
    s === void 0 && (s = {}, this.buildersByZIndex_[n] = s);
    let r = s[e];
    if (r === void 0) {
      const o = r1[e];
      r = new o(
        this.tolerance_,
        this.maxExtent_,
        this.resolution_,
        this.pixelRatio_
      ), s[e] = r;
    }
    return r;
  }
}
const gh = o1;
class a1 extends hc {
  constructor(t) {
    super(), this.ready = !0, this.boundHandleImageChange_ = this.handleImageChange_.bind(this), this.layer_ = t, this.declutterExecutorGroup = null;
  }
  getFeatures(t) {
    return z();
  }
  getData(t) {
    return null;
  }
  prepareFrame(t) {
    return z();
  }
  renderFrame(t, e) {
    return z();
  }
  loadedTileCallback(t, e, n) {
    t[e] || (t[e] = {}), t[e][n.tileCoord.toString()] = n;
  }
  createLoadedTileFinder(t, e, n) {
    return function(s, r) {
      const o = this.loadedTileCallback.bind(this, n, s);
      return t.forEachLoadedTile(e, s, r, o);
    }.bind(this);
  }
  forEachFeatureAtCoordinate(t, e, n, s, r) {
  }
  getLayer() {
    return this.layer_;
  }
  handleFontsChanged() {
  }
  handleImageChange_(t) {
    t.target.getState() === yt.LOADED && this.renderIfReadyAndVisible();
  }
  loadImage(t) {
    let e = t.getState();
    return e != yt.LOADED && e != yt.ERROR && t.addEventListener($.CHANGE, this.boundHandleImageChange_), e == yt.IDLE && (t.load(), e = t.getState()), e == yt.LOADED;
  }
  renderIfReadyAndVisible() {
    const t = this.getLayer();
    t && t.getVisible() && t.getSourceState() === "ready" && t.changed();
  }
  disposeInternal() {
    delete this.layer_, super.disposeInternal();
  }
}
const l1 = a1, mh = [];
let hn = null;
function h1() {
  const i = document.createElement("canvas");
  i.width = 1, i.height = 1, hn = i.getContext("2d");
}
class c1 extends l1 {
  constructor(t) {
    super(t), this.container = null, this.renderedResolution, this.tempTransform = xe(), this.pixelTransform = xe(), this.inversePixelTransform = xe(), this.context = null, this.containerReused = !1, this.pixelContext_ = null, this.frameState = null;
  }
  getImageData(t, e, n) {
    hn || h1(), hn.clearRect(0, 0, 1, 1);
    let s;
    try {
      hn.drawImage(t, e, n, 1, 1, 0, 0, 1, 1), s = hn.getImageData(0, 0, 1, 1).data;
    } catch {
      return hn = null, null;
    }
    return s;
  }
  getBackground(t) {
    let n = this.getLayer().getBackground();
    return typeof n == "function" && (n = n(t.viewState.resolution)), n || void 0;
  }
  useContainer(t, e, n) {
    const s = this.getLayer().getClassName();
    let r, o;
    if (t && t.className === s && (!n || t && t.style.backgroundColor && xi(
      pr(t.style.backgroundColor),
      pr(n)
    ))) {
      const a = t.firstElementChild;
      a instanceof HTMLCanvasElement && (o = a.getContext("2d"));
    }
    if (o && o.canvas.style.transform === e ? (this.container = t, this.context = o, this.containerReused = !0) : this.containerReused && (this.container = null, this.context = null, this.containerReused = !1), !this.container) {
      r = document.createElement("div"), r.className = s;
      let a = r.style;
      a.position = "absolute", a.width = "100%", a.height = "100%", o = Xt();
      const l = o.canvas;
      r.appendChild(l), a = l.style, a.position = "absolute", a.left = "0", a.transformOrigin = "top left", this.container = r, this.context = o;
    }
    !this.containerReused && n && !this.container.style.backgroundColor && (this.container.style.backgroundColor = n);
  }
  clipUnrotated(t, e, n) {
    const s = Zi(n), r = qr(n), o = Yr(n), a = Hr(n);
    Mt(e.coordinateToPixelTransform, s), Mt(e.coordinateToPixelTransform, r), Mt(e.coordinateToPixelTransform, o), Mt(e.coordinateToPixelTransform, a);
    const l = this.inversePixelTransform;
    Mt(l, s), Mt(l, r), Mt(l, o), Mt(l, a), t.save(), t.beginPath(), t.moveTo(Math.round(s[0]), Math.round(s[1])), t.lineTo(Math.round(r[0]), Math.round(r[1])), t.lineTo(Math.round(o[0]), Math.round(o[1])), t.lineTo(Math.round(a[0]), Math.round(a[1])), t.clip();
  }
  dispatchRenderEvent_(t, e, n) {
    const s = this.getLayer();
    if (s.hasListener(t)) {
      const r = new Sc(
        t,
        this.inversePixelTransform,
        n,
        e
      );
      s.dispatchEvent(r);
    }
  }
  preRender(t, e) {
    this.frameState = e, this.dispatchRenderEvent_(li.PRERENDER, t, e);
  }
  postRender(t, e) {
    this.dispatchRenderEvent_(li.POSTRENDER, t, e);
  }
  getRenderTransform(t, e, n, s, r, o, a) {
    const l = r / 2, h = o / 2, c = s / e, u = -c, d = -t[0] + a, f = -t[1];
    return ui(
      this.tempTransform,
      l,
      h,
      c,
      u,
      -n,
      d,
      f
    );
  }
  disposeInternal() {
    delete this.frameState, super.disposeInternal();
  }
}
const lu = c1;
function u1(i, t, e, n, s, r, o, a, l, h, c, u) {
  let d = i[t], f = i[t + 1], g = 0, m = 0, _ = 0, p = 0;
  function y() {
    g = d, m = f, t += n, d = i[t], f = i[t + 1], p += _, _ = Math.sqrt((d - g) * (d - g) + (f - m) * (f - m));
  }
  do
    y();
  while (t < e - n && p + _ < r);
  let x = _ === 0 ? 0 : (r - p) / _;
  const v = De(g, d, x), C = De(m, f, x), M = t - n, w = p, T = r + a * l(h, s, c);
  for (; t < e - n && p + _ < T; )
    y();
  x = _ === 0 ? 0 : (T - p) / _;
  const P = De(g, d, x), F = De(m, f, x);
  let G;
  if (u) {
    const O = [v, C, P, F];
    za(O, 0, 4, 2, u, O, O), G = O[0] > O[2];
  } else
    G = v > P;
  const b = Math.PI, D = [], et = M + n === t;
  t = M, _ = 0, p = w, d = i[t], f = i[t + 1];
  let A;
  if (et) {
    y(), A = Math.atan2(f - m, d - g), G && (A += A > 0 ? -b : b);
    const O = (P + v) / 2, I = (F + C) / 2;
    return D[0] = [O, I, (T - r) / 2, A, s], D;
  }
  s = s.replace(/\n/g, " ");
  for (let O = 0, I = s.length; O < I; ) {
    y();
    let U = Math.atan2(f - m, d - g);
    if (G && (U += U > 0 ? -b : b), A !== void 0) {
      let q = U - A;
      if (q += q > b ? -2 * b : q < -b ? 2 * b : 0, Math.abs(q) > o)
        return null;
    }
    A = U;
    const ut = O;
    let st = 0;
    for (; O < I; ++O) {
      const q = G ? I - O - 1 : O, nt = a * l(h, s[q], c);
      if (t + n < e && p + _ < r + st + nt / 2)
        break;
      st += nt;
    }
    if (O === ut)
      continue;
    const xt = G ? s.substring(I - ut, I - O) : s.substring(ut, O);
    x = _ === 0 ? 0 : (r + st / 2 - p) / _;
    const S = De(g, d, x), zt = De(m, f, x);
    D.push([S, zt, st / 2, U, xt]), r += st;
  }
  return D;
}
const nn = Gt(), He = [], Le = [], Pe = [], Ye = [];
function _h(i) {
  return i[3].declutterBox;
}
const d1 = new RegExp(
  "[" + String.fromCharCode(1425) + "-" + String.fromCharCode(2303) + String.fromCharCode(64285) + "-" + String.fromCharCode(65023) + String.fromCharCode(65136) + "-" + String.fromCharCode(65276) + String.fromCharCode(67584) + "-" + String.fromCharCode(69631) + String.fromCharCode(124928) + "-" + String.fromCharCode(126975) + "]"
);
function ph(i, t) {
  return (t === "start" || t === "end") && !d1.test(i) && (t = t === "start" ? "left" : "right"), is[t];
}
function f1(i, t, e) {
  return e > 0 && i.push(`
`, ""), i.push(t, ""), i;
}
class g1 {
  constructor(t, e, n, s) {
    this.overlaps = n, this.pixelRatio = e, this.resolution = t, this.alignFill_, this.instructions = s.instructions, this.coordinates = s.coordinates, this.coordinateCache_ = {}, this.renderedTransform_ = xe(), this.hitDetectionInstructions = s.hitDetectionInstructions, this.pixelCoordinates_ = null, this.viewRotation_ = 0, this.fillStates = s.fillStates || {}, this.strokeStates = s.strokeStates || {}, this.textStates = s.textStates || {}, this.widths_ = {}, this.labels_ = {};
  }
  createLabel(t, e, n, s) {
    const r = t + e + n + s;
    if (this.labels_[r])
      return this.labels_[r];
    const o = s ? this.strokeStates[s] : null, a = n ? this.fillStates[n] : null, l = this.textStates[e], h = this.pixelRatio, c = [
      l.scale[0] * h,
      l.scale[1] * h
    ], u = Array.isArray(t), d = l.justify ? is[l.justify] : ph(
      Array.isArray(t) ? t[0] : t,
      l.textAlign || fs
    ), f = s && o.lineWidth ? o.lineWidth : 0, g = u ? t : t.split(`
`).reduce(f1, []), { width: m, height: _, widths: p, heights: y, lineWidths: x } = Tf(
      l,
      g
    ), v = m + f, C = [], M = (v + 2) * c[0], w = (_ + f) * c[1], T = {
      width: M < 0 ? Math.floor(M) : Math.ceil(M),
      height: w < 0 ? Math.floor(w) : Math.ceil(w),
      contextInstructions: C
    };
    (c[0] != 1 || c[1] != 1) && C.push("scale", c), s && (C.push("strokeStyle", o.strokeStyle), C.push("lineWidth", f), C.push("lineCap", o.lineCap), C.push("lineJoin", o.lineJoin), C.push("miterLimit", o.miterLimit), C.push("setLineDash", [o.lineDash]), C.push("lineDashOffset", o.lineDashOffset)), n && C.push("fillStyle", a.fillStyle), C.push("textBaseline", "middle"), C.push("textAlign", "center");
    const P = 0.5 - d;
    let F = d * v + P * f;
    const G = [], b = [];
    let D = 0, et = 0, A = 0, O = 0, I;
    for (let U = 0, ut = g.length; U < ut; U += 2) {
      const st = g[U];
      if (st === `
`) {
        et += D, D = 0, F = d * v + P * f, ++O;
        continue;
      }
      const xt = g[U + 1] || l.font;
      xt !== I && (s && G.push("font", xt), n && b.push("font", xt), I = xt), D = Math.max(D, y[A]);
      const S = [
        st,
        F + P * p[A] + d * (p[A] - x[O]),
        0.5 * (f + D) + et
      ];
      F += p[A], s && G.push("strokeText", S), n && b.push("fillText", S), ++A;
    }
    return Array.prototype.push.apply(C, G), Array.prototype.push.apply(C, b), this.labels_[r] = T, T;
  }
  replayTextBackground_(t, e, n, s, r, o, a) {
    t.beginPath(), t.moveTo.apply(t, e), t.lineTo.apply(t, n), t.lineTo.apply(t, s), t.lineTo.apply(t, r), t.lineTo.apply(t, e), o && (this.alignFill_ = o[2], this.fill_(t)), a && (this.setStrokeStyle_(
      t,
      a
    ), t.stroke());
  }
  calculateImageOrLabelDimensions_(t, e, n, s, r, o, a, l, h, c, u, d, f, g, m, _) {
    a *= d[0], l *= d[1];
    let p = n - a, y = s - l;
    const x = r + h > t ? t - h : r, v = o + c > e ? e - c : o, C = g[3] + x * d[0] + g[1], M = g[0] + v * d[1] + g[2], w = p - g[3], T = y - g[0];
    (m || u !== 0) && (He[0] = w, Ye[0] = w, He[1] = T, Le[1] = T, Le[0] = w + C, Pe[0] = Le[0], Pe[1] = T + M, Ye[1] = Pe[1]);
    let P;
    return u !== 0 ? (P = ui(
      xe(),
      n,
      s,
      1,
      1,
      u,
      -n,
      -s
    ), Mt(P, He), Mt(P, Le), Mt(P, Pe), Mt(P, Ye), de(
      Math.min(He[0], Le[0], Pe[0], Ye[0]),
      Math.min(He[1], Le[1], Pe[1], Ye[1]),
      Math.max(He[0], Le[0], Pe[0], Ye[0]),
      Math.max(He[1], Le[1], Pe[1], Ye[1]),
      nn
    )) : de(
      Math.min(w, w + C),
      Math.min(T, T + M),
      Math.max(w, w + C),
      Math.max(T, T + M),
      nn
    ), f && (p = Math.round(p), y = Math.round(y)), {
      drawImageX: p,
      drawImageY: y,
      drawImageW: x,
      drawImageH: v,
      originX: h,
      originY: c,
      declutterBox: {
        minX: nn[0],
        minY: nn[1],
        maxX: nn[2],
        maxY: nn[3],
        value: _
      },
      canvasTransform: P,
      scale: d
    };
  }
  replayImageOrLabel_(t, e, n, s, r, o, a) {
    const l = !!(o || a), h = s.declutterBox, c = t.canvas, u = a ? a[2] * s.scale[0] / 2 : 0;
    return h.minX - u <= c.width / e && h.maxX + u >= 0 && h.minY - u <= c.height / e && h.maxY + u >= 0 && (l && this.replayTextBackground_(
      t,
      He,
      Le,
      Pe,
      Ye,
      o,
      a
    ), bf(
      t,
      s.canvasTransform,
      r,
      n,
      s.originX,
      s.originY,
      s.drawImageW,
      s.drawImageH,
      s.drawImageX,
      s.drawImageY,
      s.scale
    )), !0;
  }
  fill_(t) {
    if (this.alignFill_) {
      const e = Mt(this.renderedTransform_, [0, 0]), n = 512 * this.pixelRatio;
      t.save(), t.translate(e[0] % n, e[1] % n), t.rotate(this.viewRotation_);
    }
    t.fill(), this.alignFill_ && t.restore();
  }
  setStrokeStyle_(t, e) {
    t.strokeStyle = e[1], t.lineWidth = e[2], t.lineCap = e[3], t.lineJoin = e[4], t.miterLimit = e[5], t.lineDashOffset = e[7], t.setLineDash(e[6]);
  }
  drawLabelWithPointPlacement_(t, e, n, s) {
    const r = this.textStates[e], o = this.createLabel(t, e, s, n), a = this.strokeStates[n], l = this.pixelRatio, h = ph(
      Array.isArray(t) ? t[0] : t,
      r.textAlign || fs
    ), c = is[r.textBaseline || Mr], u = a && a.lineWidth ? a.lineWidth : 0, d = o.width / l - 2 * r.scale[0], f = h * d + 2 * (0.5 - h) * u, g = c * o.height / l + 2 * (0.5 - c) * u;
    return {
      label: o,
      anchorX: f,
      anchorY: g
    };
  }
  execute_(t, e, n, s, r, o, a, l) {
    let h;
    this.pixelCoordinates_ && xi(n, this.renderedTransform_) ? h = this.pixelCoordinates_ : (this.pixelCoordinates_ || (this.pixelCoordinates_ = []), h = Oi(
      this.coordinates,
      0,
      this.coordinates.length,
      2,
      n,
      this.pixelCoordinates_
    ), Xd(this.renderedTransform_, n));
    let c = 0;
    const u = s.length;
    let d = 0, f, g, m, _, p, y, x, v, C, M, w, T, P = 0, F = 0, G = null, b = null;
    const D = this.coordinateCache_, et = this.viewRotation_, A = Math.round(Math.atan2(-n[1], n[0]) * 1e12) / 1e12, O = {
      context: t,
      pixelRatio: this.pixelRatio,
      resolution: this.resolution,
      rotation: et
    }, I = this.instructions != s || this.overlaps ? 0 : 200;
    let U, ut, st, xt;
    for (; c < u; ) {
      const S = s[c];
      switch (S[0]) {
        case B.BEGIN_GEOMETRY:
          U = S[1], xt = S[3], U.getGeometry() ? a !== void 0 && !Ot(a, xt.getExtent()) ? c = S[2] + 1 : ++c : c = S[2];
          break;
        case B.BEGIN_PATH:
          P > I && (this.fill_(t), P = 0), F > I && (t.stroke(), F = 0), !P && !F && (t.beginPath(), _ = NaN, p = NaN), ++c;
          break;
        case B.CIRCLE:
          d = S[1];
          const q = h[d], nt = h[d + 1], We = h[d + 2], ge = h[d + 3], St = We - q, Te = ge - nt, Hi = Math.sqrt(St * St + Te * Te);
          t.moveTo(q + Hi, nt), t.arc(q, nt, Hi, 0, 2 * Math.PI, !0), ++c;
          break;
        case B.CLOSE_PATH:
          t.closePath(), ++c;
          break;
        case B.CUSTOM:
          d = S[1], f = S[2];
          const Ns = S[3], Yi = S[4], ks = S.length == 6 ? S[5] : void 0;
          O.geometry = Ns, O.feature = U, c in D || (D[c] = []);
          const Ue = D[c];
          ks ? ks(h, d, f, 2, Ue) : (Ue[0] = h[d], Ue[1] = h[d + 1], Ue.length = 2), Yi(Ue, O), ++c;
          break;
        case B.DRAW_IMAGE:
          d = S[1], f = S[2], v = S[3], g = S[4], m = S[5];
          let $n = S[6];
          const Ze = S[7], Gs = S[8], $s = S[9], Bs = S[10];
          let qi = S[11];
          const co = S[12];
          let Dt = S[13];
          const Yt = S[14], ne = S[15];
          if (!v && S.length >= 20) {
            C = S[19], M = S[20], w = S[21], T = S[22];
            const Vt = this.drawLabelWithPointPlacement_(
              C,
              M,
              w,
              T
            );
            v = Vt.label, S[3] = v;
            const Qi = S[23];
            g = (Vt.anchorX - Qi) * this.pixelRatio, S[4] = g;
            const qt = S[24];
            m = (Vt.anchorY - qt) * this.pixelRatio, S[5] = m, $n = v.height, S[6] = $n, Dt = v.width, S[13] = Dt;
          }
          let be;
          S.length > 25 && (be = S[25]);
          let Ki, Mi, Xe;
          S.length > 17 ? (Ki = S[16], Mi = S[17], Xe = S[18]) : (Ki = Ri, Mi = !1, Xe = !1), Bs && A ? qi += et : !Bs && !A && (qi -= et);
          let Ji = 0;
          for (; d < f; d += 2) {
            if (be && be[Ji++] < Dt / this.pixelRatio)
              continue;
            const Vt = this.calculateImageOrLabelDimensions_(
              v.width,
              v.height,
              h[d],
              h[d + 1],
              Dt,
              $n,
              g,
              m,
              Gs,
              $s,
              qi,
              co,
              r,
              Ki,
              Mi || Xe,
              U
            ), Qi = [
              t,
              e,
              v,
              Vt,
              Ze,
              Mi ? G : null,
              Xe ? b : null
            ];
            if (l) {
              if (Yt === "none")
                continue;
              if (Yt === "obstacle") {
                l.insert(Vt.declutterBox);
                continue;
              } else {
                let qt, Re;
                if (ne) {
                  const jt = f - d;
                  if (!ne[jt]) {
                    ne[jt] = Qi;
                    continue;
                  }
                  if (qt = ne[jt], delete ne[jt], Re = _h(qt), l.collides(Re))
                    continue;
                }
                if (l.collides(Vt.declutterBox))
                  continue;
                qt && (l.insert(Re), this.replayImageOrLabel_.apply(this, qt)), l.insert(Vt.declutterBox);
              }
            }
            this.replayImageOrLabel_.apply(this, Qi);
          }
          ++c;
          break;
        case B.DRAW_CHARS:
          const zs = S[1], Lt = S[2], uo = S[3], ld = S[4];
          T = S[5];
          const hd = S[6], Cl = S[7], Ml = S[8];
          w = S[9];
          const fo = S[10];
          C = S[11], M = S[12];
          const El = [
            S[13],
            S[13]
          ], go = this.textStates[M], Bn = go.font, zn = [
            go.scale[0] * Cl,
            go.scale[1] * Cl
          ];
          let Vn;
          Bn in this.widths_ ? Vn = this.widths_[Bn] : (Vn = {}, this.widths_[Bn] = Vn);
          const wl = tu(h, zs, Lt, 2), Sl = Math.abs(zn[0]) * Xl(Bn, C, Vn);
          if (ld || Sl <= wl) {
            const Vt = this.textStates[M].textAlign, Qi = (wl - Sl) * is[Vt], qt = u1(
              h,
              zs,
              Lt,
              2,
              C,
              Qi,
              hd,
              Math.abs(zn[0]),
              Xl,
              Bn,
              Vn,
              A ? 0 : this.viewRotation_
            );
            t:
              if (qt) {
                const Re = [];
                let jt, Vs, js, Nt, Kt;
                if (w)
                  for (jt = 0, Vs = qt.length; jt < Vs; ++jt) {
                    Kt = qt[jt], js = Kt[4], Nt = this.createLabel(js, M, "", w), g = Kt[2] + (zn[0] < 0 ? -fo : fo), m = uo * Nt.height + (0.5 - uo) * 2 * fo * zn[1] / zn[0] - Ml;
                    const Ie = this.calculateImageOrLabelDimensions_(
                      Nt.width,
                      Nt.height,
                      Kt[0],
                      Kt[1],
                      Nt.width,
                      Nt.height,
                      g,
                      m,
                      0,
                      0,
                      Kt[3],
                      El,
                      !1,
                      Ri,
                      !1,
                      U
                    );
                    if (l && l.collides(Ie.declutterBox))
                      break t;
                    Re.push([
                      t,
                      e,
                      Nt,
                      Ie,
                      1,
                      null,
                      null
                    ]);
                  }
                if (T)
                  for (jt = 0, Vs = qt.length; jt < Vs; ++jt) {
                    Kt = qt[jt], js = Kt[4], Nt = this.createLabel(js, M, T, ""), g = Kt[2], m = uo * Nt.height - Ml;
                    const Ie = this.calculateImageOrLabelDimensions_(
                      Nt.width,
                      Nt.height,
                      Kt[0],
                      Kt[1],
                      Nt.width,
                      Nt.height,
                      g,
                      m,
                      0,
                      0,
                      Kt[3],
                      El,
                      !1,
                      Ri,
                      !1,
                      U
                    );
                    if (l && l.collides(Ie.declutterBox))
                      break t;
                    Re.push([
                      t,
                      e,
                      Nt,
                      Ie,
                      1,
                      null,
                      null
                    ]);
                  }
                l && l.load(Re.map(_h));
                for (let Ie = 0, cd = Re.length; Ie < cd; ++Ie)
                  this.replayImageOrLabel_.apply(this, Re[Ie]);
              }
          }
          ++c;
          break;
        case B.END_GEOMETRY:
          if (o !== void 0) {
            U = S[1];
            const Vt = o(U, xt);
            if (Vt)
              return Vt;
          }
          ++c;
          break;
        case B.FILL:
          I ? P++ : this.fill_(t), ++c;
          break;
        case B.MOVE_TO_LINE_TO:
          for (d = S[1], f = S[2], ut = h[d], st = h[d + 1], y = ut + 0.5 | 0, x = st + 0.5 | 0, (y !== _ || x !== p) && (t.moveTo(ut, st), _ = y, p = x), d += 2; d < f; d += 2)
            ut = h[d], st = h[d + 1], y = ut + 0.5 | 0, x = st + 0.5 | 0, (d == f - 2 || y !== _ || x !== p) && (t.lineTo(ut, st), _ = y, p = x);
          ++c;
          break;
        case B.SET_FILL_STYLE:
          G = S, this.alignFill_ = S[2], P && (this.fill_(t), P = 0, F && (t.stroke(), F = 0)), t.fillStyle = S[1], ++c;
          break;
        case B.SET_STROKE_STYLE:
          b = S, F && (t.stroke(), F = 0), this.setStrokeStyle_(t, S), ++c;
          break;
        case B.STROKE:
          I ? F++ : t.stroke(), ++c;
          break;
        default:
          ++c;
          break;
      }
    }
    P && this.fill_(t), F && t.stroke();
  }
  execute(t, e, n, s, r, o) {
    this.viewRotation_ = s, this.execute_(
      t,
      e,
      n,
      this.instructions,
      r,
      void 0,
      void 0,
      o
    );
  }
  executeHitDetection(t, e, n, s, r) {
    return this.viewRotation_ = n, this.execute_(
      t,
      1,
      e,
      this.hitDetectionInstructions,
      !0,
      s,
      r
    );
  }
}
const m1 = g1, Io = ["Polygon", "Circle", "LineString", "Image", "Text", "Default"];
class _1 {
  constructor(t, e, n, s, r, o) {
    this.maxExtent_ = t, this.overlaps_ = s, this.pixelRatio_ = n, this.resolution_ = e, this.renderBuffer_ = o, this.executorsByZIndex_ = {}, this.hitDetectionContext_ = null, this.hitDetectionTransform_ = xe(), this.createExecutors_(r);
  }
  clip(t, e) {
    const n = this.getClipCoords(e);
    t.beginPath(), t.moveTo(n[0], n[1]), t.lineTo(n[2], n[3]), t.lineTo(n[4], n[5]), t.lineTo(n[6], n[7]), t.clip();
  }
  createExecutors_(t) {
    for (const e in t) {
      let n = this.executorsByZIndex_[e];
      n === void 0 && (n = {}, this.executorsByZIndex_[e] = n);
      const s = t[e];
      for (const r in s) {
        const o = s[r];
        n[r] = new m1(
          this.resolution_,
          this.pixelRatio_,
          this.overlaps_,
          o
        );
      }
    }
  }
  hasExecutors(t) {
    for (const e in this.executorsByZIndex_) {
      const n = this.executorsByZIndex_[e];
      for (let s = 0, r = t.length; s < r; ++s)
        if (t[s] in n)
          return !0;
    }
    return !1;
  }
  forEachFeatureAtCoordinate(t, e, n, s, r, o) {
    s = Math.round(s);
    const a = s * 2 + 1, l = ui(
      this.hitDetectionTransform_,
      s + 0.5,
      s + 0.5,
      1 / e,
      -1 / e,
      -n,
      -t[0],
      -t[1]
    ), h = !this.hitDetectionContext_;
    h && (this.hitDetectionContext_ = Xt(
      a,
      a
    ));
    const c = this.hitDetectionContext_;
    c.canvas.width !== a || c.canvas.height !== a ? (c.canvas.width = a, c.canvas.height = a) : h || c.clearRect(0, 0, a, a);
    let u;
    this.renderBuffer_ !== void 0 && (u = Gt(), ts(u, t), ws(
      u,
      e * (this.renderBuffer_ + s),
      u
    ));
    const d = p1(s);
    let f;
    function g(C, M) {
      const w = c.getImageData(
        0,
        0,
        a,
        a
      ).data;
      for (let T = 0, P = d.length; T < P; T++)
        if (w[d[T]] > 0) {
          if (!o || f !== "Image" && f !== "Text" || o.includes(C)) {
            const F = (d[T] - 3) / 4, G = s - F % a, b = s - (F / a | 0), D = r(C, M, G * G + b * b);
            if (D)
              return D;
          }
          c.clearRect(0, 0, a, a);
          break;
        }
    }
    const m = Object.keys(this.executorsByZIndex_).map(Number);
    m.sort(Ni);
    let _, p, y, x, v;
    for (_ = m.length - 1; _ >= 0; --_) {
      const C = m[_].toString();
      for (y = this.executorsByZIndex_[C], p = Io.length - 1; p >= 0; --p)
        if (f = Io[p], x = y[f], x !== void 0 && (v = x.executeHitDetection(
          c,
          l,
          n,
          g,
          u
        ), v))
          return v;
    }
  }
  getClipCoords(t) {
    const e = this.maxExtent_;
    if (!e)
      return null;
    const n = e[0], s = e[1], r = e[2], o = e[3], a = [n, s, n, o, r, o, r, s];
    return Oi(a, 0, 8, 2, t, a), a;
  }
  isEmpty() {
    return Tn(this.executorsByZIndex_);
  }
  execute(t, e, n, s, r, o, a) {
    const l = Object.keys(this.executorsByZIndex_).map(Number);
    l.sort(Ni), this.maxExtent_ && (t.save(), this.clip(t, n)), o = o || Io;
    let h, c, u, d, f, g;
    for (a && l.reverse(), h = 0, c = l.length; h < c; ++h) {
      const m = l[h].toString();
      for (f = this.executorsByZIndex_[m], u = 0, d = o.length; u < d; ++u) {
        const _ = o[u];
        g = f[_], g !== void 0 && g.execute(
          t,
          e,
          n,
          s,
          r,
          a
        );
      }
    }
    this.maxExtent_ && t.restore();
  }
}
const Lo = {};
function p1(i) {
  if (Lo[i] !== void 0)
    return Lo[i];
  const t = i * 2 + 1, e = i * i, n = new Array(e + 1);
  for (let r = 0; r <= i; ++r)
    for (let o = 0; o <= i; ++o) {
      const a = r * r + o * o;
      if (a > e)
        break;
      let l = n[a];
      l || (l = [], n[a] = l), l.push(((i + r) * t + (i + o)) * 4 + 3), r > 0 && l.push(((i - r) * t + (i + o)) * 4 + 3), o > 0 && (l.push(((i + r) * t + (i - o)) * 4 + 3), r > 0 && l.push(((i - r) * t + (i - o)) * 4 + 3));
    }
  const s = [];
  for (let r = 0, o = n.length; r < o; ++r)
    n[r] && s.push(...n[r]);
  return Lo[i] = s, s;
}
const yh = _1;
class y1 extends au {
  constructor(t, e, n, s, r, o, a) {
    super(), this.context_ = t, this.pixelRatio_ = e, this.extent_ = n, this.transform_ = s, this.viewRotation_ = r, this.squaredTolerance_ = o, this.userTransform_ = a, this.contextFillState_ = null, this.contextStrokeState_ = null, this.contextTextState_ = null, this.fillState_ = null, this.strokeState_ = null, this.image_ = null, this.imageAnchorX_ = 0, this.imageAnchorY_ = 0, this.imageHeight_ = 0, this.imageOpacity_ = 0, this.imageOriginX_ = 0, this.imageOriginY_ = 0, this.imageRotateWithView_ = !1, this.imageRotation_ = 0, this.imageScale_ = [0, 0], this.imageWidth_ = 0, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = !1, this.textRotation_ = 0, this.textScale_ = [0, 0], this.textFillState_ = null, this.textStrokeState_ = null, this.textState_ = null, this.pixelCoordinates_ = [], this.tmpLocalTransform_ = xe();
  }
  drawImages_(t, e, n, s) {
    if (!this.image_)
      return;
    const r = Oi(
      t,
      e,
      n,
      s,
      this.transform_,
      this.pixelCoordinates_
    ), o = this.context_, a = this.tmpLocalTransform_, l = o.globalAlpha;
    this.imageOpacity_ != 1 && (o.globalAlpha = l * this.imageOpacity_);
    let h = this.imageRotation_;
    this.imageRotateWithView_ && (h += this.viewRotation_);
    for (let c = 0, u = r.length; c < u; c += 2) {
      const d = r[c] - this.imageAnchorX_, f = r[c + 1] - this.imageAnchorY_;
      if (h !== 0 || this.imageScale_[0] != 1 || this.imageScale_[1] != 1) {
        const g = d + this.imageAnchorX_, m = f + this.imageAnchorY_;
        ui(
          a,
          g,
          m,
          1,
          1,
          h,
          -g,
          -m
        ), o.setTransform.apply(o, a), o.translate(g, m), o.scale(this.imageScale_[0], this.imageScale_[1]), o.drawImage(
          this.image_,
          this.imageOriginX_,
          this.imageOriginY_,
          this.imageWidth_,
          this.imageHeight_,
          -this.imageAnchorX_,
          -this.imageAnchorY_,
          this.imageWidth_,
          this.imageHeight_
        ), o.setTransform(1, 0, 0, 1, 0, 0);
      } else
        o.drawImage(
          this.image_,
          this.imageOriginX_,
          this.imageOriginY_,
          this.imageWidth_,
          this.imageHeight_,
          d,
          f,
          this.imageWidth_,
          this.imageHeight_
        );
    }
    this.imageOpacity_ != 1 && (o.globalAlpha = l);
  }
  drawText_(t, e, n, s) {
    if (!this.textState_ || this.text_ === "")
      return;
    this.textFillState_ && this.setContextFillState_(this.textFillState_), this.textStrokeState_ && this.setContextStrokeState_(this.textStrokeState_), this.setContextTextState_(this.textState_);
    const r = Oi(
      t,
      e,
      n,
      s,
      this.transform_,
      this.pixelCoordinates_
    ), o = this.context_;
    let a = this.textRotation_;
    for (this.textRotateWithView_ && (a += this.viewRotation_); e < n; e += s) {
      const l = r[e] + this.textOffsetX_, h = r[e + 1] + this.textOffsetY_;
      a !== 0 || this.textScale_[0] != 1 || this.textScale_[1] != 1 ? (o.translate(l - this.textOffsetX_, h - this.textOffsetY_), o.rotate(a), o.translate(this.textOffsetX_, this.textOffsetY_), o.scale(this.textScale_[0], this.textScale_[1]), this.textStrokeState_ && o.strokeText(this.text_, 0, 0), this.textFillState_ && o.fillText(this.text_, 0, 0), o.setTransform(1, 0, 0, 1, 0, 0)) : (this.textStrokeState_ && o.strokeText(this.text_, l, h), this.textFillState_ && o.fillText(this.text_, l, h));
    }
  }
  moveToLineTo_(t, e, n, s, r) {
    const o = this.context_, a = Oi(
      t,
      e,
      n,
      s,
      this.transform_,
      this.pixelCoordinates_
    );
    o.moveTo(a[0], a[1]);
    let l = a.length;
    r && (l -= 2);
    for (let h = 2; h < l; h += 2)
      o.lineTo(a[h], a[h + 1]);
    return r && o.closePath(), n;
  }
  drawRings_(t, e, n, s) {
    for (let r = 0, o = n.length; r < o; ++r)
      e = this.moveToLineTo_(
        t,
        e,
        n[r],
        s,
        !0
      );
    return e;
  }
  drawCircle(t) {
    if (!!Ot(this.extent_, t.getExtent())) {
      if (this.fillState_ || this.strokeState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const e = _g(
          t,
          this.transform_,
          this.pixelCoordinates_
        ), n = e[2] - e[0], s = e[3] - e[1], r = Math.sqrt(n * n + s * s), o = this.context_;
        o.beginPath(), o.arc(
          e[0],
          e[1],
          r,
          0,
          2 * Math.PI
        ), this.fillState_ && o.fill(), this.strokeState_ && o.stroke();
      }
      this.text_ !== "" && this.drawText_(t.getCenter(), 0, 2, 2);
    }
  }
  setStyle(t) {
    this.setFillStrokeStyle(t.getFill(), t.getStroke()), this.setImageStyle(t.getImage()), this.setTextStyle(t.getText());
  }
  setTransform(t) {
    this.transform_ = t;
  }
  drawGeometry(t) {
    switch (t.getType()) {
      case "Point":
        this.drawPoint(
          t
        );
        break;
      case "LineString":
        this.drawLineString(
          t
        );
        break;
      case "Polygon":
        this.drawPolygon(
          t
        );
        break;
      case "MultiPoint":
        this.drawMultiPoint(
          t
        );
        break;
      case "MultiLineString":
        this.drawMultiLineString(
          t
        );
        break;
      case "MultiPolygon":
        this.drawMultiPolygon(
          t
        );
        break;
      case "GeometryCollection":
        this.drawGeometryCollection(
          t
        );
        break;
      case "Circle":
        this.drawCircle(
          t
        );
        break;
    }
  }
  drawFeature(t, e) {
    const n = e.getGeometryFunction()(t);
    !n || !Ot(this.extent_, n.getExtent()) || (this.setStyle(e), this.drawGeometry(n));
  }
  drawGeometryCollection(t) {
    const e = t.getGeometriesArray();
    for (let n = 0, s = e.length; n < s; ++n)
      this.drawGeometry(e[n]);
  }
  drawPoint(t) {
    this.squaredTolerance_ && (t = t.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    ));
    const e = t.getFlatCoordinates(), n = t.getStride();
    this.image_ && this.drawImages_(e, 0, e.length, n), this.text_ !== "" && this.drawText_(e, 0, e.length, n);
  }
  drawMultiPoint(t) {
    this.squaredTolerance_ && (t = t.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    ));
    const e = t.getFlatCoordinates(), n = t.getStride();
    this.image_ && this.drawImages_(e, 0, e.length, n), this.text_ !== "" && this.drawText_(e, 0, e.length, n);
  }
  drawLineString(t) {
    if (this.squaredTolerance_ && (t = t.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    )), !!Ot(this.extent_, t.getExtent())) {
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        const e = this.context_, n = t.getFlatCoordinates();
        e.beginPath(), this.moveToLineTo_(
          n,
          0,
          n.length,
          t.getStride(),
          !1
        ), e.stroke();
      }
      if (this.text_ !== "") {
        const e = t.getFlatMidpoint();
        this.drawText_(e, 0, 2, 2);
      }
    }
  }
  drawMultiLineString(t) {
    this.squaredTolerance_ && (t = t.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    ));
    const e = t.getExtent();
    if (!!Ot(this.extent_, e)) {
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        const n = this.context_, s = t.getFlatCoordinates();
        let r = 0;
        const o = t.getEnds(), a = t.getStride();
        n.beginPath();
        for (let l = 0, h = o.length; l < h; ++l)
          r = this.moveToLineTo_(
            s,
            r,
            o[l],
            a,
            !1
          );
        n.stroke();
      }
      if (this.text_ !== "") {
        const n = t.getFlatMidpoints();
        this.drawText_(n, 0, n.length, 2);
      }
    }
  }
  drawPolygon(t) {
    if (this.squaredTolerance_ && (t = t.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    )), !!Ot(this.extent_, t.getExtent())) {
      if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const e = this.context_;
        e.beginPath(), this.drawRings_(
          t.getOrientedFlatCoordinates(),
          0,
          t.getEnds(),
          t.getStride()
        ), this.fillState_ && e.fill(), this.strokeState_ && e.stroke();
      }
      if (this.text_ !== "") {
        const e = t.getFlatInteriorPoint();
        this.drawText_(e, 0, 2, 2);
      }
    }
  }
  drawMultiPolygon(t) {
    if (this.squaredTolerance_ && (t = t.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    )), !!Ot(this.extent_, t.getExtent())) {
      if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const e = this.context_, n = t.getOrientedFlatCoordinates();
        let s = 0;
        const r = t.getEndss(), o = t.getStride();
        e.beginPath();
        for (let a = 0, l = r.length; a < l; ++a) {
          const h = r[a];
          s = this.drawRings_(n, s, h, o);
        }
        this.fillState_ && e.fill(), this.strokeState_ && e.stroke();
      }
      if (this.text_ !== "") {
        const e = t.getFlatInteriorPoints();
        this.drawText_(e, 0, e.length, 2);
      }
    }
  }
  setContextFillState_(t) {
    const e = this.context_, n = this.contextFillState_;
    n ? n.fillStyle != t.fillStyle && (n.fillStyle = t.fillStyle, e.fillStyle = t.fillStyle) : (e.fillStyle = t.fillStyle, this.contextFillState_ = {
      fillStyle: t.fillStyle
    });
  }
  setContextStrokeState_(t) {
    const e = this.context_, n = this.contextStrokeState_;
    n ? (n.lineCap != t.lineCap && (n.lineCap = t.lineCap, e.lineCap = t.lineCap), xi(n.lineDash, t.lineDash) || e.setLineDash(
      n.lineDash = t.lineDash
    ), n.lineDashOffset != t.lineDashOffset && (n.lineDashOffset = t.lineDashOffset, e.lineDashOffset = t.lineDashOffset), n.lineJoin != t.lineJoin && (n.lineJoin = t.lineJoin, e.lineJoin = t.lineJoin), n.lineWidth != t.lineWidth && (n.lineWidth = t.lineWidth, e.lineWidth = t.lineWidth), n.miterLimit != t.miterLimit && (n.miterLimit = t.miterLimit, e.miterLimit = t.miterLimit), n.strokeStyle != t.strokeStyle && (n.strokeStyle = t.strokeStyle, e.strokeStyle = t.strokeStyle)) : (e.lineCap = t.lineCap, e.setLineDash(t.lineDash), e.lineDashOffset = t.lineDashOffset, e.lineJoin = t.lineJoin, e.lineWidth = t.lineWidth, e.miterLimit = t.miterLimit, e.strokeStyle = t.strokeStyle, this.contextStrokeState_ = {
      lineCap: t.lineCap,
      lineDash: t.lineDash,
      lineDashOffset: t.lineDashOffset,
      lineJoin: t.lineJoin,
      lineWidth: t.lineWidth,
      miterLimit: t.miterLimit,
      strokeStyle: t.strokeStyle
    });
  }
  setContextTextState_(t) {
    const e = this.context_, n = this.contextTextState_, s = t.textAlign ? t.textAlign : fs;
    n ? (n.font != t.font && (n.font = t.font, e.font = t.font), n.textAlign != s && (n.textAlign = s, e.textAlign = s), n.textBaseline != t.textBaseline && (n.textBaseline = t.textBaseline, e.textBaseline = t.textBaseline)) : (e.font = t.font, e.textAlign = s, e.textBaseline = t.textBaseline, this.contextTextState_ = {
      font: t.font,
      textAlign: s,
      textBaseline: t.textBaseline
    });
  }
  setFillStrokeStyle(t, e) {
    if (!t)
      this.fillState_ = null;
    else {
      const n = t.getColor();
      this.fillState_ = {
        fillStyle: _e(
          n || $e
        )
      };
    }
    if (!e)
      this.strokeState_ = null;
    else {
      const n = e.getColor(), s = e.getLineCap(), r = e.getLineDash(), o = e.getLineDashOffset(), a = e.getLineJoin(), l = e.getWidth(), h = e.getMiterLimit(), c = r || hs;
      this.strokeState_ = {
        lineCap: s !== void 0 ? s : Cr,
        lineDash: this.pixelRatio_ === 1 ? c : c.map((u) => u * this.pixelRatio_),
        lineDashOffset: (o || cs) * this.pixelRatio_,
        lineJoin: a !== void 0 ? a : bn,
        lineWidth: (l !== void 0 ? l : gs) * this.pixelRatio_,
        miterLimit: h !== void 0 ? h : us,
        strokeStyle: _e(
          n || ds
        )
      };
    }
  }
  setImageStyle(t) {
    let e;
    if (!t || !(e = t.getSize())) {
      this.image_ = null;
      return;
    }
    const n = t.getPixelRatio(this.pixelRatio_), s = t.getAnchor(), r = t.getOrigin();
    this.image_ = t.getImage(this.pixelRatio_), this.imageAnchorX_ = s[0] * n, this.imageAnchorY_ = s[1] * n, this.imageHeight_ = e[1] * n, this.imageOpacity_ = t.getOpacity(), this.imageOriginX_ = r[0], this.imageOriginY_ = r[1], this.imageRotateWithView_ = t.getRotateWithView(), this.imageRotation_ = t.getRotation();
    const o = t.getScaleArray();
    this.imageScale_ = [
      o[0] * this.pixelRatio_ / n,
      o[1] * this.pixelRatio_ / n
    ], this.imageWidth_ = e[0] * n;
  }
  setTextStyle(t) {
    if (!t)
      this.text_ = "";
    else {
      const e = t.getFill();
      if (!e)
        this.textFillState_ = null;
      else {
        const f = e.getColor();
        this.textFillState_ = {
          fillStyle: _e(
            f || $e
          )
        };
      }
      const n = t.getStroke();
      if (!n)
        this.textStrokeState_ = null;
      else {
        const f = n.getColor(), g = n.getLineCap(), m = n.getLineDash(), _ = n.getLineDashOffset(), p = n.getLineJoin(), y = n.getWidth(), x = n.getMiterLimit();
        this.textStrokeState_ = {
          lineCap: g !== void 0 ? g : Cr,
          lineDash: m || hs,
          lineDashOffset: _ || cs,
          lineJoin: p !== void 0 ? p : bn,
          lineWidth: y !== void 0 ? y : gs,
          miterLimit: x !== void 0 ? x : us,
          strokeStyle: _e(
            f || ds
          )
        };
      }
      const s = t.getFont(), r = t.getOffsetX(), o = t.getOffsetY(), a = t.getRotateWithView(), l = t.getRotation(), h = t.getScaleArray(), c = t.getText(), u = t.getTextAlign(), d = t.getTextBaseline();
      this.textState_ = {
        font: s !== void 0 ? s : Rc,
        textAlign: u !== void 0 ? u : fs,
        textBaseline: d !== void 0 ? d : Mr
      }, this.text_ = c !== void 0 ? Array.isArray(c) ? c.reduce((f, g, m) => f += m % 2 ? " " : g, "") : c : "", this.textOffsetX_ = r !== void 0 ? this.pixelRatio_ * r : 0, this.textOffsetY_ = o !== void 0 ? this.pixelRatio_ * o : 0, this.textRotateWithView_ = a !== void 0 ? a : !1, this.textRotation_ = l !== void 0 ? l : 0, this.textScale_ = [
        this.pixelRatio_ * h[0],
        this.pixelRatio_ * h[1]
      ];
    }
  }
}
const x1 = y1, me = 0.5;
function v1(i, t, e, n, s, r, o) {
  const a = i[0] * me, l = i[1] * me, h = Xt(a, l);
  h.imageSmoothingEnabled = !1;
  const c = h.canvas, u = new x1(
    h,
    me,
    s,
    null,
    o
  ), d = e.length, f = Math.floor((256 * 256 * 256 - 1) / d), g = {};
  for (let _ = 1; _ <= d; ++_) {
    const p = e[_ - 1], y = p.getStyleFunction() || n;
    if (!n)
      continue;
    let x = y(p, r);
    if (!x)
      continue;
    Array.isArray(x) || (x = [x]);
    const C = "#" + ("000000" + (_ * f).toString(16)).slice(-6);
    for (let M = 0, w = x.length; M < w; ++M) {
      const T = x[M], P = T.getGeometryFunction()(p);
      if (!P || !Ot(s, P.getExtent()))
        continue;
      const F = T.clone(), G = F.getFill();
      G && G.setColor(C);
      const b = F.getStroke();
      b && (b.setColor(C), b.setLineDash(null)), F.setText(void 0);
      const D = T.getImage();
      if (D && D.getOpacity() !== 0) {
        const O = D.getImageSize();
        if (!O)
          continue;
        const I = Xt(
          O[0],
          O[1],
          void 0,
          { alpha: !1 }
        ), U = I.canvas;
        I.fillStyle = C, I.fillRect(0, 0, U.width, U.height), F.setImage(
          new Pr({
            img: U,
            imgSize: O,
            anchor: D.getAnchor(),
            anchorXUnits: "pixels",
            anchorYUnits: "pixels",
            offset: D.getOrigin(),
            opacity: 1,
            size: D.getSize(),
            scale: D.getScale(),
            rotation: D.getRotation(),
            rotateWithView: D.getRotateWithView()
          })
        );
      }
      const et = F.getZIndex() || 0;
      let A = g[et];
      A || (A = {}, g[et] = A, A.Polygon = [], A.Circle = [], A.LineString = [], A.Point = []), A[P.getType().replace("Multi", "")].push(
        P,
        F
      );
    }
  }
  const m = Object.keys(g).map(Number).sort(Ni);
  for (let _ = 0, p = m.length; _ < p; ++_) {
    const y = g[m[_]];
    for (const x in y) {
      const v = y[x];
      for (let C = 0, M = v.length; C < M; C += 2) {
        u.setStyle(v[C + 1]);
        for (let w = 0, T = t.length; w < T; ++w)
          u.setTransform(t[w]), u.drawGeometry(v[C]);
      }
    }
  }
  return h.getImageData(0, 0, c.width, c.height);
}
function C1(i, t, e) {
  const n = [];
  if (e) {
    const s = Math.floor(Math.round(i[0]) * me), r = Math.floor(Math.round(i[1]) * me), o = (gt(s, 0, e.width - 1) + gt(r, 0, e.height - 1) * e.width) * 4, a = e.data[o], l = e.data[o + 1], c = e.data[o + 2] + 256 * (l + 256 * a), u = Math.floor((256 * 256 * 256 - 1) / t.length);
    c && c % u === 0 && n.push(t[c / u - 1]);
  }
  return n;
}
const M1 = 0.5, hu = {
  Point: P1,
  LineString: R1,
  Polygon: O1,
  MultiPoint: A1,
  MultiLineString: I1,
  MultiPolygon: L1,
  GeometryCollection: b1,
  Circle: S1
};
function E1(i, t) {
  return parseInt(j(i), 10) - parseInt(j(t), 10);
}
function w1(i, t) {
  const e = oa(i, t);
  return e * e;
}
function oa(i, t) {
  return M1 * i / t;
}
function S1(i, t, e, n, s) {
  const r = e.getFill(), o = e.getStroke();
  if (r || o) {
    const l = i.getBuilder(e.getZIndex(), "Circle");
    l.setFillStrokeStyle(r, o), l.drawCircle(t, n);
  }
  const a = e.getText();
  if (a && a.getText()) {
    const l = (s || i).getBuilder(
      e.getZIndex(),
      "Text"
    );
    l.setTextStyle(a), l.drawText(t, n);
  }
}
function xh(i, t, e, n, s, r, o) {
  let a = !1;
  const l = e.getImage();
  if (l) {
    const h = l.getImageState();
    h == yt.LOADED || h == yt.ERROR ? l.unlistenImageChange(s) : (h == yt.IDLE && l.load(), l.listenImageChange(s), a = !0);
  }
  return T1(
    i,
    t,
    e,
    n,
    r,
    o
  ), a;
}
function T1(i, t, e, n, s, r) {
  const o = e.getGeometryFunction()(t);
  if (!o)
    return;
  const a = o.simplifyTransformed(
    n,
    s
  );
  if (e.getRenderer())
    cu(i, a, e, t);
  else {
    const h = hu[a.getType()];
    h(
      i,
      a,
      e,
      t,
      r
    );
  }
}
function cu(i, t, e, n) {
  if (t.getType() == "GeometryCollection") {
    const r = t.getGeometries();
    for (let o = 0, a = r.length; o < a; ++o)
      cu(i, r[o], e, n);
    return;
  }
  i.getBuilder(e.getZIndex(), "Default").drawCustom(
    t,
    n,
    e.getRenderer(),
    e.getHitDetectionRenderer()
  );
}
function b1(i, t, e, n, s) {
  const r = t.getGeometriesArray();
  let o, a;
  for (o = 0, a = r.length; o < a; ++o) {
    const l = hu[r[o].getType()];
    l(
      i,
      r[o],
      e,
      n,
      s
    );
  }
}
function R1(i, t, e, n, s) {
  const r = e.getStroke();
  if (r) {
    const a = i.getBuilder(
      e.getZIndex(),
      "LineString"
    );
    a.setFillStrokeStyle(null, r), a.drawLineString(t, n);
  }
  const o = e.getText();
  if (o && o.getText()) {
    const a = (s || i).getBuilder(
      e.getZIndex(),
      "Text"
    );
    a.setTextStyle(o), a.drawText(t, n);
  }
}
function I1(i, t, e, n, s) {
  const r = e.getStroke();
  if (r) {
    const a = i.getBuilder(
      e.getZIndex(),
      "LineString"
    );
    a.setFillStrokeStyle(null, r), a.drawMultiLineString(t, n);
  }
  const o = e.getText();
  if (o && o.getText()) {
    const a = (s || i).getBuilder(
      e.getZIndex(),
      "Text"
    );
    a.setTextStyle(o), a.drawText(t, n);
  }
}
function L1(i, t, e, n, s) {
  const r = e.getFill(), o = e.getStroke();
  if (o || r) {
    const l = i.getBuilder(e.getZIndex(), "Polygon");
    l.setFillStrokeStyle(r, o), l.drawMultiPolygon(t, n);
  }
  const a = e.getText();
  if (a && a.getText()) {
    const l = (s || i).getBuilder(
      e.getZIndex(),
      "Text"
    );
    l.setTextStyle(a), l.drawText(t, n);
  }
}
function P1(i, t, e, n, s) {
  const r = e.getImage(), o = e.getText();
  let a;
  if (r) {
    if (r.getImageState() != yt.LOADED)
      return;
    let l = i;
    if (s) {
      const c = r.getDeclutterMode();
      if (c !== "none")
        if (l = s, c === "obstacle") {
          const u = i.getBuilder(
            e.getZIndex(),
            "Image"
          );
          u.setImageStyle(r, a), u.drawPoint(t, n);
        } else
          o && o.getText() && (a = {});
    }
    const h = l.getBuilder(
      e.getZIndex(),
      "Image"
    );
    h.setImageStyle(r, a), h.drawPoint(t, n);
  }
  if (o && o.getText()) {
    let l = i;
    s && (l = s);
    const h = l.getBuilder(e.getZIndex(), "Text");
    h.setTextStyle(o, a), h.drawText(t, n);
  }
}
function A1(i, t, e, n, s) {
  const r = e.getImage(), o = e.getText();
  let a;
  if (r) {
    if (r.getImageState() != yt.LOADED)
      return;
    let l = i;
    if (s) {
      const c = r.getDeclutterMode();
      if (c !== "none")
        if (l = s, c === "obstacle") {
          const u = i.getBuilder(
            e.getZIndex(),
            "Image"
          );
          u.setImageStyle(r, a), u.drawMultiPoint(t, n);
        } else
          o && o.getText() && (a = {});
    }
    const h = l.getBuilder(
      e.getZIndex(),
      "Image"
    );
    h.setImageStyle(r, a), h.drawMultiPoint(t, n);
  }
  if (o && o.getText()) {
    let l = i;
    s && (l = s);
    const h = l.getBuilder(e.getZIndex(), "Text");
    h.setTextStyle(o, a), h.drawText(t, n);
  }
}
function O1(i, t, e, n, s) {
  const r = e.getFill(), o = e.getStroke();
  if (r || o) {
    const l = i.getBuilder(e.getZIndex(), "Polygon");
    l.setFillStrokeStyle(r, o), l.drawPolygon(t, n);
  }
  const a = e.getText();
  if (a && a.getText()) {
    const l = (s || i).getBuilder(
      e.getZIndex(),
      "Text"
    );
    l.setTextStyle(a), l.drawText(t, n);
  }
}
class F1 extends lu {
  constructor(t) {
    super(t), this.boundHandleStyleImageChange_ = this.handleStyleImageChange_.bind(this), this.animatingOrInteracting_, this.hitDetectionImageData_ = null, this.renderedFeatures_ = null, this.renderedRevision_ = -1, this.renderedResolution_ = NaN, this.renderedExtent_ = Gt(), this.wrappedRenderedExtent_ = Gt(), this.renderedRotation_, this.renderedCenter_ = null, this.renderedProjection_ = null, this.renderedRenderOrder_ = null, this.replayGroup_ = null, this.replayGroupChanged = !0, this.declutterExecutorGroup = null, this.clipping = !0, this.compositionContext_ = null, this.opacity_ = 1;
  }
  renderWorlds(t, e, n) {
    const s = e.extent, r = e.viewState, o = r.center, a = r.resolution, l = r.projection, h = r.rotation, c = l.getExtent(), u = this.getLayer().getSource(), d = e.pixelRatio, f = e.viewHints, g = !(f[Rt.ANIMATING] || f[Rt.INTERACTING]), m = this.compositionContext_, _ = Math.round(e.size[0] * d), p = Math.round(e.size[1] * d), y = u.getWrapX() && l.canWrapX(), x = y ? at(c) : null, v = y ? Math.ceil((s[2] - c[2]) / x) + 1 : 1;
    let C = y ? Math.floor((s[0] - c[0]) / x) : 0;
    do {
      const M = this.getRenderTransform(
        o,
        a,
        h,
        d,
        _,
        p,
        C * x
      );
      t.execute(
        m,
        1,
        M,
        h,
        g,
        void 0,
        n
      );
    } while (++C < v);
  }
  setupCompositionContext_() {
    if (this.opacity_ !== 1) {
      const t = Xt(
        this.context.canvas.width,
        this.context.canvas.height,
        mh
      );
      this.compositionContext_ = t;
    } else
      this.compositionContext_ = this.context;
  }
  releaseCompositionContext_() {
    if (this.opacity_ !== 1) {
      const t = this.context.globalAlpha;
      this.context.globalAlpha = this.opacity_, this.context.drawImage(this.compositionContext_.canvas, 0, 0), this.context.globalAlpha = t, bc(this.compositionContext_), mh.push(this.compositionContext_.canvas), this.compositionContext_ = null;
    }
  }
  renderDeclutter(t) {
    this.declutterExecutorGroup && (this.setupCompositionContext_(), this.renderWorlds(
      this.declutterExecutorGroup,
      t,
      t.declutterTree
    ), this.releaseCompositionContext_());
  }
  renderFrame(t, e) {
    const n = t.pixelRatio, s = t.layerStatesArray[t.layerIndex];
    Hd(this.pixelTransform, 1 / n, 1 / n), wa(this.inversePixelTransform, this.pixelTransform);
    const r = fc(this.pixelTransform);
    this.useContainer(e, r, this.getBackground(t));
    const o = this.context, a = o.canvas, l = this.replayGroup_, h = this.declutterExecutorGroup;
    if ((!l || l.isEmpty()) && (!h || h.isEmpty()))
      return null;
    const c = Math.round(t.size[0] * n), u = Math.round(t.size[1] * n);
    a.width != c || a.height != u ? (a.width = c, a.height = u, a.style.transform !== r && (a.style.transform = r)) : this.containerReused || o.clearRect(0, 0, c, u), this.preRender(o, t);
    const d = t.viewState;
    d.projection, this.opacity_ = s.opacity, this.setupCompositionContext_();
    let f = !1, g = !0;
    if (s.extent && this.clipping) {
      const m = ni(s.extent);
      g = Ot(m, t.extent), f = g && !bi(m, t.extent), f && this.clipUnrotated(this.compositionContext_, t, m);
    }
    return g && this.renderWorlds(l, t), f && this.compositionContext_.restore(), this.releaseCompositionContext_(), this.postRender(o, t), this.renderedRotation_ !== d.rotation && (this.renderedRotation_ = d.rotation, this.hitDetectionImageData_ = null), this.container;
  }
  getFeatures(t) {
    return new Promise(
      function(e) {
        if (!this.hitDetectionImageData_ && !this.animatingOrInteracting_) {
          const n = [this.context.canvas.width, this.context.canvas.height];
          Mt(this.pixelTransform, n);
          const s = this.renderedCenter_, r = this.renderedResolution_, o = this.renderedRotation_, a = this.renderedProjection_, l = this.wrappedRenderedExtent_, h = this.getLayer(), c = [], u = n[0] * me, d = n[1] * me;
          c.push(
            this.getRenderTransform(
              s,
              r,
              o,
              me,
              u,
              d,
              0
            ).slice()
          );
          const f = h.getSource(), g = a.getExtent();
          if (f.getWrapX() && a.canWrapX() && !bi(g, l)) {
            let m = l[0];
            const _ = at(g);
            let p = 0, y;
            for (; m < g[0]; )
              --p, y = _ * p, c.push(
                this.getRenderTransform(
                  s,
                  r,
                  o,
                  me,
                  u,
                  d,
                  y
                ).slice()
              ), m += _;
            for (p = 0, m = l[2]; m > g[2]; )
              ++p, y = _ * p, c.push(
                this.getRenderTransform(
                  s,
                  r,
                  o,
                  me,
                  u,
                  d,
                  y
                ).slice()
              ), m -= _;
          }
          this.hitDetectionImageData_ = v1(
            n,
            c,
            this.renderedFeatures_,
            h.getStyleFunction(),
            l,
            r,
            o
          );
        }
        e(
          C1(t, this.renderedFeatures_, this.hitDetectionImageData_)
        );
      }.bind(this)
    );
  }
  forEachFeatureAtCoordinate(t, e, n, s, r) {
    if (!this.replayGroup_)
      return;
    const o = e.viewState.resolution, a = e.viewState.rotation, l = this.getLayer(), h = {}, c = function(f, g, m) {
      const _ = j(f), p = h[_];
      if (p) {
        if (p !== !0 && m < p.distanceSq) {
          if (m === 0)
            return h[_] = !0, r.splice(r.lastIndexOf(p), 1), s(f, l, g);
          p.geometry = g, p.distanceSq = m;
        }
      } else {
        if (m === 0)
          return h[_] = !0, s(f, l, g);
        r.push(
          h[_] = {
            feature: f,
            layer: l,
            geometry: g,
            distanceSq: m,
            callback: s
          }
        );
      }
    };
    let u;
    const d = [this.replayGroup_];
    return this.declutterExecutorGroup && d.push(this.declutterExecutorGroup), d.some((f) => u = f.forEachFeatureAtCoordinate(
      t,
      o,
      a,
      n,
      c,
      f === this.declutterExecutorGroup && e.declutterTree ? e.declutterTree.all().map((g) => g.value) : null
    )), u;
  }
  handleFontsChanged() {
    const t = this.getLayer();
    t.getVisible() && this.replayGroup_ && t.changed();
  }
  handleStyleImageChange_(t) {
    this.renderIfReadyAndVisible();
  }
  prepareFrame(t) {
    const e = this.getLayer(), n = e.getSource();
    if (!n)
      return !1;
    const s = t.viewHints[Rt.ANIMATING], r = t.viewHints[Rt.INTERACTING], o = e.getUpdateWhileAnimating(), a = e.getUpdateWhileInteracting();
    if (this.ready && !o && s || !a && r)
      return this.animatingOrInteracting_ = !0, !0;
    this.animatingOrInteracting_ = !1;
    const l = t.extent, h = t.viewState, c = h.projection, u = h.resolution, d = t.pixelRatio, f = e.getRevision(), g = e.getRenderBuffer();
    let m = e.getRenderOrder();
    m === void 0 && (m = E1);
    const _ = h.center.slice(), p = ws(
      l,
      g * u
    ), y = p.slice(), x = [p.slice()], v = c.getExtent();
    if (n.getWrapX() && c.canWrapX() && !bi(v, t.extent)) {
      const A = at(v), O = Math.max(at(p) / 2, A);
      p[0] = v[0] - O, p[2] = v[2] + O, wc(_, c);
      const I = yc(x[0], c);
      I[0] < v[0] && I[2] < v[2] ? x.push([
        I[0] + A,
        I[1],
        I[2] + A,
        I[3]
      ]) : I[0] > v[0] && I[2] > v[2] && x.push([
        I[0] - A,
        I[1],
        I[2] - A,
        I[3]
      ]);
    }
    if (this.ready && this.renderedResolution_ == u && this.renderedRevision_ == f && this.renderedRenderOrder_ == m && bi(this.wrappedRenderedExtent_, p))
      return xi(this.renderedExtent_, y) || (this.hitDetectionImageData_ = null, this.renderedExtent_ = y), this.renderedCenter_ = _, this.replayGroupChanged = !1, !0;
    this.replayGroup_ = null;
    const C = new gh(
      oa(u, d),
      p,
      u,
      d
    );
    let M;
    this.getLayer().getDeclutter() && (M = new gh(
      oa(u, d),
      p,
      u,
      d
    ));
    let w;
    for (let A = 0, O = x.length; A < O; ++A)
      n.loadFeatures(x[A], u, c);
    const T = w1(u, d);
    let P = !0;
    const F = function(A) {
      let O;
      const I = A.getStyleFunction() || e.getStyleFunction();
      if (I && (O = I(A, u)), O) {
        const U = this.renderFeature(
          A,
          T,
          O,
          C,
          w,
          M
        );
        P = P && !U;
      }
    }.bind(this), G = ka(p), b = n.getFeaturesInExtent(G);
    m && b.sort(m);
    for (let A = 0, O = b.length; A < O; ++A)
      F(b[A]);
    this.renderedFeatures_ = b, this.ready = P;
    const D = C.finish(), et = new yh(
      p,
      u,
      d,
      n.getOverlaps(),
      D,
      e.getRenderBuffer()
    );
    return M && (this.declutterExecutorGroup = new yh(
      p,
      u,
      d,
      n.getOverlaps(),
      M.finish(),
      e.getRenderBuffer()
    )), this.renderedResolution_ = u, this.renderedRevision_ = f, this.renderedRenderOrder_ = m, this.renderedExtent_ = y, this.wrappedRenderedExtent_ = p, this.renderedCenter_ = _, this.renderedProjection_ = c, this.replayGroup_ = et, this.hitDetectionImageData_ = null, this.replayGroupChanged = !0, !0;
  }
  renderFeature(t, e, n, s, r, o) {
    if (!n)
      return !1;
    let a = !1;
    if (Array.isArray(n))
      for (let l = 0, h = n.length; l < h; ++l)
        a = xh(
          s,
          t,
          n[l],
          e,
          this.boundHandleStyleImageChange_,
          r,
          o
        ) || a;
    else
      a = xh(
        s,
        t,
        n,
        e,
        this.boundHandleStyleImageChange_,
        r,
        o
      );
    return a;
  }
}
const D1 = F1;
class N1 extends Y0 {
  constructor(t) {
    super(t);
  }
  createRenderer() {
    return new D1(this);
  }
}
const gi = N1;
class k1 {
  constructor(t) {
    this.rbush_ = new ru(t), this.items_ = {};
  }
  insert(t, e) {
    const n = {
      minX: t[0],
      minY: t[1],
      maxX: t[2],
      maxY: t[3],
      value: e
    };
    this.rbush_.insert(n), this.items_[j(e)] = n;
  }
  load(t, e) {
    const n = new Array(e.length);
    for (let s = 0, r = e.length; s < r; s++) {
      const o = t[s], a = e[s], l = {
        minX: o[0],
        minY: o[1],
        maxX: o[2],
        maxY: o[3],
        value: a
      };
      n[s] = l, this.items_[j(a)] = l;
    }
    this.rbush_.load(n);
  }
  remove(t) {
    const e = j(t), n = this.items_[e];
    return delete this.items_[e], this.rbush_.remove(n) !== null;
  }
  update(t, e) {
    const n = this.items_[j(e)], s = [n.minX, n.minY, n.maxX, n.maxY];
    ls(s, t) || (this.remove(e), this.insert(t, e));
  }
  getAll() {
    return this.rbush_.all().map(function(e) {
      return e.value;
    });
  }
  getInExtent(t) {
    const e = {
      minX: t[0],
      minY: t[1],
      maxX: t[2],
      maxY: t[3]
    };
    return this.rbush_.search(e).map(function(s) {
      return s.value;
    });
  }
  forEach(t) {
    return this.forEach_(this.getAll(), t);
  }
  forEachInExtent(t, e) {
    return this.forEach_(this.getInExtent(t), e);
  }
  forEach_(t, e) {
    let n;
    for (let s = 0, r = t.length; s < r; s++)
      if (n = e(t[s]), n)
        return n;
    return n;
  }
  isEmpty() {
    return Tn(this.items_);
  }
  clear() {
    this.rbush_.clear(), this.items_ = {};
  }
  getExtent(t) {
    const e = this.rbush_.toJSON();
    return de(e.minX, e.minY, e.maxX, e.maxY, t);
  }
  concat(t) {
    this.rbush_.load(t.rbush_.all());
    for (const e in t.items_)
      this.items_[e] = t.items_[e];
  }
}
const Ar = k1;
class G1 extends fe {
  constructor(t) {
    super(), this.projection = rt(t.projection), this.attributions_ = vh(t.attributions), this.attributionsCollapsible_ = t.attributionsCollapsible !== void 0 ? t.attributionsCollapsible : !0, this.loading = !1, this.state_ = t.state !== void 0 ? t.state : "ready", this.wrapX_ = t.wrapX !== void 0 ? t.wrapX : !1, this.interpolate_ = !!t.interpolate, this.viewResolver = null, this.viewRejector = null;
    const e = this;
    this.viewPromise_ = new Promise(function(n, s) {
      e.viewResolver = n, e.viewRejector = s;
    });
  }
  getAttributions() {
    return this.attributions_;
  }
  getAttributionsCollapsible() {
    return this.attributionsCollapsible_;
  }
  getProjection() {
    return this.projection;
  }
  getResolutions() {
    return z();
  }
  getView() {
    return this.viewPromise_;
  }
  getState() {
    return this.state_;
  }
  getWrapX() {
    return this.wrapX_;
  }
  getInterpolate() {
    return this.interpolate_;
  }
  refresh() {
    this.changed();
  }
  setAttributions(t) {
    this.attributions_ = vh(t), this.changed();
  }
  setState(t) {
    this.state_ = t, this.changed();
  }
}
function vh(i) {
  return i ? Array.isArray(i) ? function(t) {
    return i;
  } : typeof i == "function" ? i : function(t) {
    return [i];
  } : null;
}
const uu = G1, Pt = {
  ADDFEATURE: "addfeature",
  CHANGEFEATURE: "changefeature",
  CLEAR: "clear",
  REMOVEFEATURE: "removefeature",
  FEATURESLOADSTART: "featuresloadstart",
  FEATURESLOADEND: "featuresloadend",
  FEATURESLOADERROR: "featuresloaderror"
};
function $1(i, t) {
  return [[-1 / 0, -1 / 0, 1 / 0, 1 / 0]];
}
let B1 = !1;
function z1(i, t, e, n, s, r, o) {
  const a = new XMLHttpRequest();
  a.open(
    "GET",
    typeof i == "function" ? i(e, n, s) : i,
    !0
  ), t.getType() == "arraybuffer" && (a.responseType = "arraybuffer"), a.withCredentials = B1, a.onload = function(l) {
    if (!a.status || a.status >= 200 && a.status < 300) {
      const h = t.getType();
      let c;
      h == "json" || h == "text" ? c = a.responseText : h == "xml" ? (c = a.responseXML, c || (c = new DOMParser().parseFromString(
        a.responseText,
        "application/xml"
      ))) : h == "arraybuffer" && (c = a.response), c ? r(
        t.readFeatures(c, {
          extent: e,
          featureProjection: s
        }),
        t.readProjection(c)
      ) : o();
    } else
      o();
  }, a.onerror = o, a.send();
}
function Ch(i, t) {
  return function(e, n, s, r, o) {
    const a = this;
    z1(
      i,
      t,
      e,
      n,
      s,
      function(l, h) {
        a.addFeatures(l), r !== void 0 && r(l);
      },
      o || Gi
    );
  };
}
class qe extends ie {
  constructor(t, e, n) {
    super(t), this.feature = e, this.features = n;
  }
}
class V1 extends uu {
  constructor(t) {
    t = t || {}, super({
      attributions: t.attributions,
      interpolate: !0,
      projection: void 0,
      state: "ready",
      wrapX: t.wrapX !== void 0 ? t.wrapX : !0
    }), this.on, this.once, this.un, this.loader_ = Gi, this.format_ = t.format, this.overlaps_ = t.overlaps === void 0 ? !0 : t.overlaps, this.url_ = t.url, t.loader !== void 0 ? this.loader_ = t.loader : this.url_ !== void 0 && (Z(this.format_, 7), this.loader_ = Ch(
      this.url_,
      this.format_
    )), this.strategy_ = t.strategy !== void 0 ? t.strategy : $1;
    const e = t.useSpatialIndex !== void 0 ? t.useSpatialIndex : !0;
    this.featuresRtree_ = e ? new Ar() : null, this.loadedExtentsRtree_ = new Ar(), this.loadingExtentsCount_ = 0, this.nullGeometryFeatures_ = {}, this.idIndex_ = {}, this.uidIndex_ = {}, this.featureChangeKeys_ = {}, this.featuresCollection_ = null;
    let n, s;
    Array.isArray(t.features) ? s = t.features : t.features && (n = t.features, s = n.getArray()), !e && n === void 0 && (n = new te(s)), s !== void 0 && this.addFeaturesInternal(s), n !== void 0 && this.bindFeaturesCollection_(n);
  }
  addFeature(t) {
    this.addFeatureInternal(t), this.changed();
  }
  addFeatureInternal(t) {
    const e = j(t);
    if (!this.addToIndex_(e, t)) {
      this.featuresCollection_ && this.featuresCollection_.remove(t);
      return;
    }
    this.setupChangeEvents_(e, t);
    const n = t.getGeometry();
    if (n) {
      const s = n.getExtent();
      this.featuresRtree_ && this.featuresRtree_.insert(s, t);
    } else
      this.nullGeometryFeatures_[e] = t;
    this.dispatchEvent(
      new qe(Pt.ADDFEATURE, t)
    );
  }
  setupChangeEvents_(t, e) {
    this.featureChangeKeys_[t] = [
      W(e, $.CHANGE, this.handleFeatureChange_, this),
      W(
        e,
        Sn.PROPERTYCHANGE,
        this.handleFeatureChange_,
        this
      )
    ];
  }
  addToIndex_(t, e) {
    let n = !0;
    const s = e.getId();
    return s !== void 0 && (s.toString() in this.idIndex_ ? n = !1 : this.idIndex_[s.toString()] = e), n && (Z(!(t in this.uidIndex_), 30), this.uidIndex_[t] = e), n;
  }
  addFeatures(t) {
    this.addFeaturesInternal(t), this.changed();
  }
  addFeaturesInternal(t) {
    const e = [], n = [], s = [];
    for (let r = 0, o = t.length; r < o; r++) {
      const a = t[r], l = j(a);
      this.addToIndex_(l, a) && n.push(a);
    }
    for (let r = 0, o = n.length; r < o; r++) {
      const a = n[r], l = j(a);
      this.setupChangeEvents_(l, a);
      const h = a.getGeometry();
      if (h) {
        const c = h.getExtent();
        e.push(c), s.push(a);
      } else
        this.nullGeometryFeatures_[l] = a;
    }
    if (this.featuresRtree_ && this.featuresRtree_.load(e, s), this.hasListener(Pt.ADDFEATURE))
      for (let r = 0, o = n.length; r < o; r++)
        this.dispatchEvent(
          new qe(Pt.ADDFEATURE, n[r])
        );
  }
  bindFeaturesCollection_(t) {
    let e = !1;
    this.addEventListener(
      Pt.ADDFEATURE,
      function(n) {
        e || (e = !0, t.push(n.feature), e = !1);
      }
    ), this.addEventListener(
      Pt.REMOVEFEATURE,
      function(n) {
        e || (e = !0, t.remove(n.feature), e = !1);
      }
    ), t.addEventListener(
      Et.ADD,
      function(n) {
        e || (e = !0, this.addFeature(n.element), e = !1);
      }.bind(this)
    ), t.addEventListener(
      Et.REMOVE,
      function(n) {
        e || (e = !0, this.removeFeature(n.element), e = !1);
      }.bind(this)
    ), this.featuresCollection_ = t;
  }
  clear(t) {
    if (t) {
      for (const n in this.featureChangeKeys_)
        this.featureChangeKeys_[n].forEach(it);
      this.featuresCollection_ || (this.featureChangeKeys_ = {}, this.idIndex_ = {}, this.uidIndex_ = {});
    } else if (this.featuresRtree_) {
      const n = function(s) {
        this.removeFeatureInternal(s);
      }.bind(this);
      this.featuresRtree_.forEach(n);
      for (const s in this.nullGeometryFeatures_)
        this.removeFeatureInternal(this.nullGeometryFeatures_[s]);
    }
    this.featuresCollection_ && this.featuresCollection_.clear(), this.featuresRtree_ && this.featuresRtree_.clear(), this.nullGeometryFeatures_ = {};
    const e = new qe(Pt.CLEAR);
    this.dispatchEvent(e), this.changed();
  }
  forEachFeature(t) {
    if (this.featuresRtree_)
      return this.featuresRtree_.forEach(t);
    this.featuresCollection_ && this.featuresCollection_.forEach(t);
  }
  forEachFeatureAtCoordinateDirect(t, e) {
    const n = [t[0], t[1], t[0], t[1]];
    return this.forEachFeatureInExtent(n, function(s) {
      if (s.getGeometry().intersectsCoordinate(t))
        return e(s);
    });
  }
  forEachFeatureInExtent(t, e) {
    if (this.featuresRtree_)
      return this.featuresRtree_.forEachInExtent(t, e);
    this.featuresCollection_ && this.featuresCollection_.forEach(e);
  }
  forEachFeatureIntersectingExtent(t, e) {
    return this.forEachFeatureInExtent(
      t,
      function(n) {
        if (n.getGeometry().intersectsExtent(t)) {
          const r = e(n);
          if (r)
            return r;
        }
      }
    );
  }
  getFeaturesCollection() {
    return this.featuresCollection_;
  }
  getFeatures() {
    let t;
    return this.featuresCollection_ ? t = this.featuresCollection_.getArray().slice(0) : this.featuresRtree_ && (t = this.featuresRtree_.getAll(), Tn(this.nullGeometryFeatures_) || ye(t, Object.values(this.nullGeometryFeatures_))), t;
  }
  getFeaturesAtCoordinate(t) {
    const e = [];
    return this.forEachFeatureAtCoordinateDirect(t, function(n) {
      e.push(n);
    }), e;
  }
  getFeaturesInExtent(t, e) {
    if (this.featuresRtree_) {
      if (!(e && e.canWrapX() && this.getWrapX()))
        return this.featuresRtree_.getInExtent(t);
      const s = nf(t, e);
      return [].concat(
        ...s.map((r) => this.featuresRtree_.getInExtent(r))
      );
    } else
      return this.featuresCollection_ ? this.featuresCollection_.getArray().slice(0) : [];
  }
  getClosestFeatureToCoordinate(t, e) {
    const n = t[0], s = t[1];
    let r = null;
    const o = [NaN, NaN];
    let a = 1 / 0;
    const l = [-1 / 0, -1 / 0, 1 / 0, 1 / 0];
    return e = e || ki, this.featuresRtree_.forEachInExtent(
      l,
      function(h) {
        if (e(h)) {
          const c = h.getGeometry(), u = a;
          if (a = c.closestPointXY(
            n,
            s,
            o,
            a
          ), a < u) {
            r = h;
            const d = Math.sqrt(a);
            l[0] = n - d, l[1] = s - d, l[2] = n + d, l[3] = s + d;
          }
        }
      }
    ), r;
  }
  getExtent(t) {
    return this.featuresRtree_.getExtent(t);
  }
  getFeatureById(t) {
    const e = this.idIndex_[t.toString()];
    return e !== void 0 ? e : null;
  }
  getFeatureByUid(t) {
    const e = this.uidIndex_[t];
    return e !== void 0 ? e : null;
  }
  getFormat() {
    return this.format_;
  }
  getOverlaps() {
    return this.overlaps_;
  }
  getUrl() {
    return this.url_;
  }
  handleFeatureChange_(t) {
    const e = t.target, n = j(e), s = e.getGeometry();
    if (!s)
      n in this.nullGeometryFeatures_ || (this.featuresRtree_ && this.featuresRtree_.remove(e), this.nullGeometryFeatures_[n] = e);
    else {
      const o = s.getExtent();
      n in this.nullGeometryFeatures_ ? (delete this.nullGeometryFeatures_[n], this.featuresRtree_ && this.featuresRtree_.insert(o, e)) : this.featuresRtree_ && this.featuresRtree_.update(o, e);
    }
    const r = e.getId();
    if (r !== void 0) {
      const o = r.toString();
      this.idIndex_[o] !== e && (this.removeFromIdIndex_(e), this.idIndex_[o] = e);
    } else
      this.removeFromIdIndex_(e), this.uidIndex_[n] = e;
    this.changed(), this.dispatchEvent(
      new qe(Pt.CHANGEFEATURE, e)
    );
  }
  hasFeature(t) {
    const e = t.getId();
    return e !== void 0 ? e in this.idIndex_ : j(t) in this.uidIndex_;
  }
  isEmpty() {
    return this.featuresRtree_ ? this.featuresRtree_.isEmpty() && Tn(this.nullGeometryFeatures_) : this.featuresCollection_ ? this.featuresCollection_.getLength() === 0 : !0;
  }
  loadFeatures(t, e, n) {
    const s = this.loadedExtentsRtree_, r = this.strategy_(t, e, n);
    for (let o = 0, a = r.length; o < a; ++o) {
      const l = r[o];
      s.forEachInExtent(
        l,
        function(c) {
          return bi(c.extent, l);
        }
      ) || (++this.loadingExtentsCount_, this.dispatchEvent(
        new qe(Pt.FEATURESLOADSTART)
      ), this.loader_.call(
        this,
        l,
        e,
        n,
        function(c) {
          --this.loadingExtentsCount_, this.dispatchEvent(
            new qe(
              Pt.FEATURESLOADEND,
              void 0,
              c
            )
          );
        }.bind(this),
        function() {
          --this.loadingExtentsCount_, this.dispatchEvent(
            new qe(Pt.FEATURESLOADERROR)
          );
        }.bind(this)
      ), s.insert(l, { extent: l.slice() }));
    }
    this.loading = this.loader_.length < 4 ? !1 : this.loadingExtentsCount_ > 0;
  }
  refresh() {
    this.clear(!0), this.loadedExtentsRtree_.clear(), super.refresh();
  }
  removeLoadedExtent(t) {
    const e = this.loadedExtentsRtree_;
    let n;
    e.forEachInExtent(t, function(s) {
      if (ls(s.extent, t))
        return n = s, !0;
    }), n && e.remove(n);
  }
  removeFeature(t) {
    if (!t)
      return;
    const e = j(t);
    e in this.nullGeometryFeatures_ ? delete this.nullGeometryFeatures_[e] : this.featuresRtree_ && this.featuresRtree_.remove(t), this.removeFeatureInternal(t) && this.changed();
  }
  removeFeatureInternal(t) {
    const e = j(t), n = this.featureChangeKeys_[e];
    if (!n)
      return;
    n.forEach(it), delete this.featureChangeKeys_[e];
    const s = t.getId();
    return s !== void 0 && delete this.idIndex_[s.toString()], delete this.uidIndex_[e], this.dispatchEvent(
      new qe(Pt.REMOVEFEATURE, t)
    ), t;
  }
  removeFromIdIndex_(t) {
    let e = !1;
    for (const n in this.idIndex_)
      if (this.idIndex_[n] === t) {
        delete this.idIndex_[n], e = !0;
        break;
      }
    return e;
  }
  setLoader(t) {
    this.loader_ = t;
  }
  setUrl(t) {
    Z(this.format_, 7), this.url_ = t, this.setLoader(Ch(t, this.format_));
  }
}
const Be = V1;
class j1 extends Ur {
  constructor(t, e, n) {
    super(), n = n || {}, this.tileCoord = t, this.state = e, this.interimTile = null, this.key = "", this.transition_ = n.transition === void 0 ? 250 : n.transition, this.transitionStarts_ = {}, this.interpolate = !!n.interpolate;
  }
  changed() {
    this.dispatchEvent($.CHANGE);
  }
  release() {
    this.state === k.ERROR && this.setState(k.EMPTY);
  }
  getKey() {
    return this.key + "/" + this.tileCoord;
  }
  getInterimTile() {
    if (!this.interimTile)
      return this;
    let t = this.interimTile;
    do {
      if (t.getState() == k.LOADED)
        return this.transition_ = 0, t;
      t = t.interimTile;
    } while (t);
    return this;
  }
  refreshInterimChain() {
    if (!this.interimTile)
      return;
    let t = this.interimTile, e = this;
    do {
      if (t.getState() == k.LOADED) {
        t.interimTile = null;
        break;
      } else
        t.getState() == k.LOADING ? e = t : t.getState() == k.IDLE ? e.interimTile = t.interimTile : e = t;
      t = e.interimTile;
    } while (t);
  }
  getTileCoord() {
    return this.tileCoord;
  }
  getState() {
    return this.state;
  }
  setState(t) {
    if (this.state !== k.ERROR && this.state > t)
      throw new Error("Tile load sequence violation");
    this.state = t, this.changed();
  }
  load() {
    z();
  }
  getAlpha(t, e) {
    if (!this.transition_)
      return 1;
    let n = this.transitionStarts_[t];
    if (!n)
      n = e, this.transitionStarts_[t] = n;
    else if (n === -1)
      return 1;
    const s = e - n + 1e3 / 60;
    return s >= this.transition_ ? 1 : Ac(s / this.transition_);
  }
  inTransition(t) {
    return this.transition_ ? this.transitionStarts_[t] !== -1 : !1;
  }
  endTransition(t) {
    this.transition_ && (this.transitionStarts_[t] = -1);
  }
}
const du = j1;
class W1 extends du {
  constructor(t, e, n, s, r, o) {
    super(t, e, o), this.crossOrigin_ = s, this.src_ = n, this.key = n, this.image_ = new Image(), s !== null && (this.image_.crossOrigin = s), this.unlisten_ = null, this.tileLoadFunction_ = r;
  }
  getImage() {
    return this.image_;
  }
  setImage(t) {
    this.image_ = t, this.state = k.LOADED, this.unlistenImage_(), this.changed();
  }
  handleImageError_() {
    this.state = k.ERROR, this.unlistenImage_(), this.image_ = U1(), this.changed();
  }
  handleImageLoad_() {
    const t = this.image_;
    t.naturalWidth && t.naturalHeight ? this.state = k.LOADED : this.state = k.EMPTY, this.unlistenImage_(), this.changed();
  }
  load() {
    this.state == k.ERROR && (this.state = k.IDLE, this.image_ = new Image(), this.crossOrigin_ !== null && (this.image_.crossOrigin = this.crossOrigin_)), this.state == k.IDLE && (this.state = k.LOADING, this.changed(), this.tileLoadFunction_(this, this.src_), this.unlisten_ = ou(
      this.image_,
      this.handleImageLoad_.bind(this),
      this.handleImageError_.bind(this)
    ));
  }
  unlistenImage_() {
    this.unlisten_ && (this.unlisten_(), this.unlisten_ = null);
  }
}
function U1() {
  const i = Xt(1, 1);
  return i.fillStyle = "rgba(0,0,0,0)", i.fillRect(0, 0, 1, 1), i.canvas;
}
const fu = W1;
class Z1 {
  constructor(t) {
    this.highWaterMark = t !== void 0 ? t : 2048, this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null;
  }
  canExpireCache() {
    return this.highWaterMark > 0 && this.getCount() > this.highWaterMark;
  }
  expireCache(t) {
    for (; this.canExpireCache(); )
      this.pop();
  }
  clear() {
    this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null;
  }
  containsKey(t) {
    return this.entries_.hasOwnProperty(t);
  }
  forEach(t) {
    let e = this.oldest_;
    for (; e; )
      t(e.value_, e.key_, this), e = e.newer;
  }
  get(t, e) {
    const n = this.entries_[t];
    return Z(n !== void 0, 15), n === this.newest_ || (n === this.oldest_ ? (this.oldest_ = this.oldest_.newer, this.oldest_.older = null) : (n.newer.older = n.older, n.older.newer = n.newer), n.newer = null, n.older = this.newest_, this.newest_.newer = n, this.newest_ = n), n.value_;
  }
  remove(t) {
    const e = this.entries_[t];
    return Z(e !== void 0, 15), e === this.newest_ ? (this.newest_ = e.older, this.newest_ && (this.newest_.newer = null)) : e === this.oldest_ ? (this.oldest_ = e.newer, this.oldest_ && (this.oldest_.older = null)) : (e.newer.older = e.older, e.older.newer = e.newer), delete this.entries_[t], --this.count_, e.value_;
  }
  getCount() {
    return this.count_;
  }
  getKeys() {
    const t = new Array(this.count_);
    let e = 0, n;
    for (n = this.newest_; n; n = n.older)
      t[e++] = n.key_;
    return t;
  }
  getValues() {
    const t = new Array(this.count_);
    let e = 0, n;
    for (n = this.newest_; n; n = n.older)
      t[e++] = n.value_;
    return t;
  }
  peekLast() {
    return this.oldest_.value_;
  }
  peekLastKey() {
    return this.oldest_.key_;
  }
  peekFirstKey() {
    return this.newest_.key_;
  }
  peek(t) {
    if (!!this.containsKey(t))
      return this.entries_[t].value_;
  }
  pop() {
    const t = this.oldest_;
    return delete this.entries_[t.key_], t.newer && (t.newer.older = null), this.oldest_ = t.newer, this.oldest_ || (this.newest_ = null), --this.count_, t.value_;
  }
  replace(t, e) {
    this.get(t), this.entries_[t].value_ = e;
  }
  set(t, e) {
    Z(!(t in this.entries_), 16);
    const n = {
      key_: t,
      newer: null,
      older: this.newest_,
      value_: e
    };
    this.newest_ ? this.newest_.newer = n : this.oldest_ = n, this.newest_ = n, this.entries_[t] = n, ++this.count_;
  }
  setSize(t) {
    this.highWaterMark = t;
  }
}
const X1 = Z1;
function Mh(i, t, e, n) {
  return n !== void 0 ? (n[0] = i, n[1] = t, n[2] = e, n) : [i, t, e];
}
function no(i, t, e) {
  return i + "/" + t + "/" + e;
}
function gu(i) {
  return no(i[0], i[1], i[2]);
}
function H1(i) {
  return i.split("/").map(Number);
}
function Y1(i) {
  return (i[1] << i[0]) + i[2];
}
function q1(i, t) {
  const e = i[0], n = i[1], s = i[2];
  if (t.getMinZoom() > e || e > t.getMaxZoom())
    return !1;
  const r = t.getFullTileRange(e);
  return r ? r.containsXY(n, s) : !0;
}
class K1 extends X1 {
  clear() {
    for (; this.getCount() > 0; )
      this.pop().release();
    super.clear();
  }
  expireCache(t) {
    for (; this.canExpireCache() && !(this.peekLast().getKey() in t); )
      this.pop().release();
  }
  pruneExceptNewestZ() {
    if (this.getCount() === 0)
      return;
    const t = this.peekFirstKey(), n = H1(t)[0];
    this.forEach(
      function(s) {
        s.tileCoord[0] !== n && (this.remove(gu(s.tileCoord)), s.release());
      }.bind(this)
    );
  }
}
const mu = K1;
class _u {
  constructor(t, e, n, s) {
    this.minX = t, this.maxX = e, this.minY = n, this.maxY = s;
  }
  contains(t) {
    return this.containsXY(t[1], t[2]);
  }
  containsTileRange(t) {
    return this.minX <= t.minX && t.maxX <= this.maxX && this.minY <= t.minY && t.maxY <= this.maxY;
  }
  containsXY(t, e) {
    return this.minX <= t && t <= this.maxX && this.minY <= e && e <= this.maxY;
  }
  equals(t) {
    return this.minX == t.minX && this.minY == t.minY && this.maxX == t.maxX && this.maxY == t.maxY;
  }
  extend(t) {
    t.minX < this.minX && (this.minX = t.minX), t.maxX > this.maxX && (this.maxX = t.maxX), t.minY < this.minY && (this.minY = t.minY), t.maxY > this.maxY && (this.maxY = t.maxY);
  }
  getHeight() {
    return this.maxY - this.minY + 1;
  }
  getSize() {
    return [this.getWidth(), this.getHeight()];
  }
  getWidth() {
    return this.maxX - this.minX + 1;
  }
  intersects(t) {
    return this.minX <= t.maxX && this.maxX >= t.minX && this.minY <= t.maxY && this.maxY >= t.minY;
  }
}
function sn(i, t, e, n, s) {
  return s !== void 0 ? (s.minX = i, s.maxX = t, s.minY = e, s.maxY = n, s) : new _u(i, t, e, n);
}
const pu = _u, Eh = [
  "fullscreenchange",
  "webkitfullscreenchange",
  "MSFullscreenChange"
], wh = {
  ENTERFULLSCREEN: "enterfullscreen",
  LEAVEFULLSCREEN: "leavefullscreen"
};
class J1 extends Ht {
  constructor(t) {
    t = t || {}, super({
      element: document.createElement("div"),
      target: t.target
    }), this.on, this.once, this.un, this.keys_ = t.keys !== void 0 ? t.keys : !1, this.source_ = t.source, this.isInFullscreen_ = !1, this.boundHandleMapTargetChange_ = this.handleMapTargetChange_.bind(this), this.cssClassName_ = t.className !== void 0 ? t.className : "ol-full-screen", this.documentListeners_ = [], this.activeClassName_ = t.activeClassName !== void 0 ? t.activeClassName.split(" ") : [this.cssClassName_ + "-true"], this.inactiveClassName_ = t.inactiveClassName !== void 0 ? t.inactiveClassName.split(" ") : [this.cssClassName_ + "-false"];
    const e = t.label !== void 0 ? t.label : "\u2922";
    this.labelNode_ = typeof e == "string" ? document.createTextNode(e) : e;
    const n = t.labelActive !== void 0 ? t.labelActive : "\xD7";
    this.labelActiveNode_ = typeof n == "string" ? document.createTextNode(n) : n;
    const s = t.tipLabel ? t.tipLabel : "Toggle full-screen";
    this.button_ = document.createElement("button"), this.button_.title = s, this.button_.setAttribute("type", "button"), this.button_.appendChild(this.labelNode_), this.button_.addEventListener(
      $.CLICK,
      this.handleClick_.bind(this),
      !1
    ), this.setClassName_(this.button_, this.isInFullscreen_), this.element.className = `${this.cssClassName_} ${On} ${Jr}`, this.element.appendChild(this.button_);
  }
  handleClick_(t) {
    t.preventDefault(), this.handleFullScreen_();
  }
  handleFullScreen_() {
    const t = this.getMap();
    if (!t)
      return;
    const e = t.getOwnerDocument();
    if (!!Sh(e))
      if (Th(e))
        tm(e);
      else {
        let n;
        this.source_ ? n = typeof this.source_ == "string" ? e.getElementById(this.source_) : this.source_ : n = t.getTargetElement(), this.keys_ ? Q1(n) : yu(n);
      }
  }
  handleFullScreenChange_() {
    const t = this.getMap();
    if (!t)
      return;
    const e = this.isInFullscreen_;
    this.isInFullscreen_ = Th(t.getOwnerDocument()), e !== this.isInFullscreen_ && (this.setClassName_(this.button_, this.isInFullscreen_), this.isInFullscreen_ ? (vr(this.labelActiveNode_, this.labelNode_), this.dispatchEvent(wh.ENTERFULLSCREEN)) : (vr(this.labelNode_, this.labelActiveNode_), this.dispatchEvent(wh.LEAVEFULLSCREEN)), t.updateSize());
  }
  setClassName_(t, e) {
    e ? (t.classList.remove(...this.inactiveClassName_), t.classList.add(...this.activeClassName_)) : (t.classList.remove(...this.activeClassName_), t.classList.add(...this.inactiveClassName_));
  }
  setMap(t) {
    const e = this.getMap();
    e && e.removeChangeListener(
      vt.TARGET,
      this.boundHandleMapTargetChange_
    ), super.setMap(t), this.handleMapTargetChange_(), t && t.addChangeListener(
      vt.TARGET,
      this.boundHandleMapTargetChange_
    );
  }
  handleMapTargetChange_() {
    const t = this.documentListeners_;
    for (let n = 0, s = t.length; n < s; ++n)
      it(t[n]);
    t.length = 0;
    const e = this.getMap();
    if (e) {
      const n = e.getOwnerDocument();
      Sh(n) ? this.element.classList.remove(Wl) : this.element.classList.add(Wl);
      for (let s = 0, r = Eh.length; s < r; ++s)
        t.push(
          W(n, Eh[s], this.handleFullScreenChange_, this)
        );
      this.handleFullScreenChange_();
    }
  }
}
function Sh(i) {
  const t = i.body;
  return !!(t.webkitRequestFullscreen || t.requestFullscreen && i.fullscreenEnabled);
}
function Th(i) {
  return !!(i.webkitIsFullScreen || i.fullscreenElement);
}
function yu(i) {
  i.requestFullscreen ? i.requestFullscreen() : i.webkitRequestFullscreen && i.webkitRequestFullscreen();
}
function Q1(i) {
  i.webkitRequestFullscreen ? i.webkitRequestFullscreen() : yu(i);
}
function tm(i) {
  i.exitFullscreen ? i.exitFullscreen() : i.webkitExitFullscreen && i.webkitExitFullscreen();
}
const em = J1, Po = "units", im = [1, 2, 5], Zn = 25.4 / 0.28;
class nm extends Ht {
  constructor(t) {
    t = t || {};
    const e = document.createElement("div");
    e.style.pointerEvents = "none", super({
      element: e,
      render: t.render,
      target: t.target
    }), this.on, this.once, this.un;
    const n = t.className !== void 0 ? t.className : t.bar ? "ol-scale-bar" : "ol-scale-line";
    this.innerElement_ = document.createElement("div"), this.innerElement_.className = n + "-inner", this.element.className = n + " " + On, this.element.appendChild(this.innerElement_), this.viewState_ = null, this.minWidth_ = t.minWidth !== void 0 ? t.minWidth : 64, this.maxWidth_ = t.maxWidth, this.renderedVisible_ = !1, this.renderedWidth_ = void 0, this.renderedHTML_ = "", this.addChangeListener(Po, this.handleUnitsChanged_), this.setUnits(t.units || "metric"), this.scaleBar_ = t.bar || !1, this.scaleBarSteps_ = t.steps || 4, this.scaleBarText_ = t.text || !1, this.dpi_ = t.dpi || void 0;
  }
  getUnits() {
    return this.get(Po);
  }
  handleUnitsChanged_() {
    this.updateElement_();
  }
  setUnits(t) {
    this.set(Po, t);
  }
  setDpi(t) {
    this.dpi_ = t;
  }
  updateElement_() {
    const t = this.viewState_;
    if (!t) {
      this.renderedVisible_ && (this.element.style.display = "none", this.renderedVisible_ = !1);
      return;
    }
    const e = t.center, n = t.projection, s = this.getUnits(), r = s == "degrees" ? "degrees" : "m";
    let o = Tr(
      n,
      t.resolution,
      e,
      r
    );
    const a = this.minWidth_ * (this.dpi_ || Zn) / Zn, l = this.maxWidth_ !== void 0 ? this.maxWidth_ * (this.dpi_ || Zn) / Zn : void 0;
    let h = a * o, c = "";
    if (s == "degrees") {
      const x = Rn.degrees;
      h *= x, h < x / 60 ? (c = "\u2033", o *= 3600) : h < x ? (c = "\u2032", o *= 60) : c = "\xB0";
    } else
      s == "imperial" ? h < 0.9144 ? (c = "in", o /= 0.0254) : h < 1609.344 ? (c = "ft", o /= 0.3048) : (c = "mi", o /= 1609.344) : s == "nautical" ? (o /= 1852, c = "NM") : s == "metric" ? h < 1e-3 ? (c = "\u03BCm", o *= 1e6) : h < 1 ? (c = "mm", o *= 1e3) : h < 1e3 ? c = "m" : (c = "km", o /= 1e3) : s == "us" ? h < 0.9144 ? (c = "in", o *= 39.37) : h < 1609.344 ? (c = "ft", o /= 0.30480061) : (c = "mi", o /= 1609.3472) : Z(!1, 33);
    let u = 3 * Math.floor(Math.log(a * o) / Math.log(10)), d, f, g, m, _, p;
    for (; ; ) {
      g = Math.floor(u / 3);
      const x = Math.pow(10, g);
      if (d = im[(u % 3 + 3) % 3] * x, f = Math.round(d / o), isNaN(f)) {
        this.element.style.display = "none", this.renderedVisible_ = !1;
        return;
      }
      if (l !== void 0 && f >= l) {
        d = m, f = _, g = p;
        break;
      } else if (f >= a)
        break;
      m = d, _ = f, p = g, ++u;
    }
    const y = this.scaleBar_ ? this.createScaleBar(f, d, c) : d.toFixed(g < 0 ? -g : 0) + " " + c;
    this.renderedHTML_ != y && (this.innerElement_.innerHTML = y, this.renderedHTML_ = y), this.renderedWidth_ != f && (this.innerElement_.style.width = f + "px", this.renderedWidth_ = f), this.renderedVisible_ || (this.element.style.display = "", this.renderedVisible_ = !0);
  }
  createScaleBar(t, e, n) {
    const s = this.getScaleForResolution(), r = s < 1 ? Math.round(1 / s).toLocaleString() + " : 1" : "1 : " + Math.round(s).toLocaleString(), o = this.scaleBarSteps_, a = t / o, l = [this.createMarker("absolute")];
    for (let c = 0; c < o; ++c) {
      const u = c % 2 === 0 ? "ol-scale-singlebar-odd" : "ol-scale-singlebar-even";
      l.push(
        `<div><div class="ol-scale-singlebar ${u}" style="width: ${a}px;"></div>` + this.createMarker("relative") + (c % 2 === 0 || o === 2 ? this.createStepText(c, t, !1, e, n) : "") + "</div>"
      );
    }
    return l.push(this.createStepText(o, t, !0, e, n)), (this.scaleBarText_ ? `<div class="ol-scale-text" style="width: ${t}px;">` + r + "</div>" : "") + l.join("");
  }
  createMarker(t) {
    return `<div class="ol-scale-step-marker" style="position: ${t}; top: ${t === "absolute" ? 3 : -10}px;"></div>`;
  }
  createStepText(t, e, n, s, r) {
    const a = (t === 0 ? 0 : Math.round(s / this.scaleBarSteps_ * t * 100) / 100) + (t === 0 ? "" : " " + r), l = t === 0 ? -3 : e / this.scaleBarSteps_ * -1, h = t === 0 ? 0 : e / this.scaleBarSteps_ * 2;
    return `<div class="ol-scale-step-text" style="margin-left: ${l}px;text-align: ${t === 0 ? "left" : "center"};min-width: ${h}px;left: ${n ? e + "px" : "unset"};">` + a + "</div>";
  }
  getScaleForResolution() {
    const t = Tr(
      this.viewState_.projection,
      this.viewState_.resolution,
      this.viewState_.center,
      "m"
    ), e = this.dpi_ || Zn, n = 1e3 / 25.4;
    return t * n * e;
  }
  render(t) {
    const e = t.frameState;
    e ? this.viewState_ = e.viewState : this.viewState_ = null, this.updateElement_();
  }
}
const sm = nm, al = `svg{margin-left:5px;margin-top:5px;width:26px;height:26px}svg>g>.icon{fill:none;stroke:var(--control-icon-color);stroke-width:2px;stroke-linejoin:round;stroke-linecap:round}
`, Xi = `.control-light{--control-background-color: rgb(30 41 59 / 75%);--control-icon-color: white}.control-dark{--control-background-color: rgb(255 255 255 / 75%);--control-icon-color: #1E293B}.notification-element-info-light{--notification-background-color: #DBEAFE;--notification-stroke-color: #1D4ED8;--notification-text-color: #1D4ED8}.notification-element-info-dark{--notification-background-color: #2563EB;--notification-stroke-color: #FFFFFF;--notification-text-color: #FFFFFF}.notification-element-warning-light{--notification-background-color: #FEF3C7;--notification-stroke-color: #B45309;--notification-text-color: #B45309}.notification-element-warning-dark{--notification-background-color: #D97706;--notification-stroke-color: #FFFFFF;--notification-text-color: #FFFFFF}.notification-element-error-light{--notification-background-color: #FEE2E2;--notification-stroke-color: #B91C1C;--notification-text-color: #B91C1C}.notification-element-error-dark{--notification-background-color: #DC2626;--notification-stroke-color: #FFFFFF;--notification-text-color: #FFFFFF}.information-box-light{--information-box-background-color: white;--information-box-title-color: #1E293B;--information-box-text-color: #334155}.information-box-dark{--information-box-background-color: #1F2937;--information-box-title-color: #F3F4F6;--information-box-text-color: #9CA3AF}
`, ll = `.ol-zoom{top:10px;left:10px}.center-control{top:92px;left:10px}.information-control{right:10px;top:10px}.rotation-control{top:138px;left:10px}.ol-full-screen{top:56px;right:10px}.ol-zoom-in,.ol-zoom-out,.ol-zoom-custom-small-in,.ol-zoom-custom-medium-in,.ol-zoom-custom-large-in,.ol-zoom-custom-small-out,.ol-zoom-custom-medium-out,.ol-zoom-custom-large-out,.information-control,.information-control-custom-small,.information-control-custom-medium,.information-control-custom-large,.center-control,.center-control-custom-small,.center-control-custom-medium,.center-control-custom-large,.rotation-control,.rotation-control-custom-small,.rotation-control-custom-medium,.rotation-control-custom-large,.ol-full-screen-true,.ol-full-screen-false,.ol-full-screen-custom-small-true,.ol-full-screen-custom-small-false,.ol-full-screen-custom-medium-true,.ol-full-screen-custom-medium-false,.ol-full-screen-custom-large-true,.ol-full-screen-custom-large-false{width:36px!important;height:36px!important;background-color:var(--control-background-color)!important;border-radius:4px}.ol-zoom-in,.ol-zoom-custom-small-in,.ol-zoom-custom-medium-in,.ol-zoom-custom-large-in{border-radius:4px 4px 0 0!important}.ol-zoom-out,.ol-zoom-custom-small-out,.ol-zoom-custom-medium-out,.ol-zoom-custom-large-out{border-radius:0 0 4px 4px!important}.ol-zoom-in>div>svg,.ol-zoom-out>div>svg,.ol-zoom-custom-small-in>div>svg,.ol-zoom-custom-medium-in>div>svg,.ol-zoom-custom-large-in>div>svg,.ol-zoom-custom-small-out>div>svg,.ol-zoom-custom-medium-out>div>svg,.ol-zoom-custom-large-out>div>svg,.ol-full-screen-true>div>svg,.ol-full-screen-false>div>svg,.ol-full-screen-custom-small-true>div>svg,.ol-full-screen-custom-small-false>div>svg,.ol-full-screen-custom-medium-true>div>svg,.ol-full-screen-custom-medium-false>div>svg,.ol-full-screen-custom-large-true>div>svg,.ol-full-screen-custom-large-false>div>svg{width:26px!important;height:26px!important}.ol-zoom-in>div>svg>g>.icon,.ol-zoom-out>div>svg>g>.icon,.ol-zoom-custom-small-in>div>svg>g>.icon,.ol-zoom-custom-medium-in>div>svg>g>.icon,.ol-zoom-custom-large-in>div>svg>g>.icon,.ol-zoom-custom-small-out>div>svg>g>.icon,.ol-zoom-custom-medium-out>div>svg>g>.icon,.ol-zoom-custom-large-out>div>svg>g>.icon,.ol-full-screen-true>div>svg>g>.icon,.ol-full-screen-false>div>svg>g>.icon,.ol-full-screen-custom-small-true>div>svg>g>.icon,.ol-full-screen-custom-small-false>div>svg>g>.icon,.ol-full-screen-custom-medium-true>div>svg>g>.icon,.ol-full-screen-custom-medium-false>div>svg>g>.icon,.ol-full-screen-custom-large-true>div>svg>g>.icon,.ol-full-screen-custom-large-false>div>svg>g>.icon{fill:none;stroke:var(--control-icon-color);stroke-width:2px;stroke-linejoin:round;stroke-linecap:round}@media only screen and (min-width: 420px){.ol-zoom-custom-small,.ol-zoom-custom-medium,.ol-zoom-custom-large{top:10px;left:10px}.ol-full-screen-custom-small,.ol-full-screen-custom-medium,.ol-full-screen-custom-large{top:56px;right:10px}.information-control-custom-small,.information-control-custom-medium,.information-control-custom-large{right:10px;top:10px}.center-control-custom-small,.center-control-custom-medium,.center-control-custom-large{top:92px;left:10px}.rotation-control-custom-small,.rotation-control-custom-medium,.rotation-control-custom-large{top:138px;left:10px}}@media only screen and (max-width: 419px){.ol-zoom-custom-small{top:69px;left:10px}.ol-zoom-custom-medium{top:84px;left:10px}.ol-zoom-custom-large{top:99px;left:10px}.ol-full-screen-custom-small{top:115px;right:10px}.ol-full-screen-custom-medium{top:130px;right:10px}.ol-full-screen-custom-large{top:145px;right:10px}.information-control-custom-small{right:10px;top:69px}.information-control-custom-medium{right:10px;top:84px}.information-control-custom-large{right:10px;top:99px}.center-control-custom-small{top:154px;left:10px}.center-control-custom-medium{top:169px;left:10px}.center-control-custom-large{top:184px;left:10px}.rotation-control-custom-small{top:200px;left:10px}.rotation-control-custom-medium{top:215px;left:10px}.rotation-control-custom-large{top:230px;left:10px}}
`;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rm = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, om = (i) => (...t) => ({ _$litDirective$: i, values: t });
class am {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, n) {
    this._$Ct = t, this._$AM = e, this._$Ci = n;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class aa extends am {
  constructor(t) {
    if (super(t), this.it = mt, t.type !== rm.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === mt || t == null)
      return this._t = void 0, this.it = t;
    if (t === Di)
      return t;
    if (typeof t != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it)
      return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
aa.directiveName = "unsafeHTML", aa.resultType = 1;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class la extends aa {
}
la.directiveName = "unsafeSVG", la.resultType = 2;
const so = om(la);
class _t {
  static zoomInLabel() {
    const t = document.createElement("div"), e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    return e.setAttributeNS(null, "width", "32"), e.setAttributeNS(null, "height", "32"), e.setAttributeNS(null, "viewBox", "0 0 32 32"), e.innerHTML = ` 
                      <g class="Plus" clip-path="url(#a)">
                        <g class="icon">
                          <path d="M5 16H27M16 5V27" class="Vector"/>
                        </g>
                      </g>
                      <defs>
                        <clipPath id="a" class="a">
                          <path fill="#fff" d="M0 0H32V32H0z"/>
                        </clipPath>
                      </defs>
                    `, t.appendChild(e), t;
  }
  static zoomOutLabel() {
    const t = document.createElement("div"), e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    return e.setAttributeNS(null, "width", "32"), e.setAttributeNS(null, "height", "32"), e.setAttributeNS(null, "viewBox", "0 0 32 32"), e.innerHTML = ` 
                      <g class="Minus" clip-path="url(#a)">
                      <g class="icon">
                        <path d="M5 16H27" class="Vector"/>
                      </g>
                    </g>
                    <defs>
                      <clipPath id="a" class="a">
                        <path fill="#fff" d="M0 0H32V32H0z"/>
                      </clipPath>
                    </defs>
                    `, t.appendChild(e), t;
  }
  static fullScreenLabel() {
    const t = document.createElement("div"), e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    return e.setAttributeNS(null, "width", "32"), e.setAttributeNS(null, "height", "32"), e.setAttributeNS(null, "viewBox", "0 0 32 32"), e.innerHTML = ` 
                      <g class="ArrowsOut" clip-path="url(#a)">
                        <g class="icon">
                          <path d="M21 6H26V11M19 13 26 6M11 26H6V21M13 19 6 26M26 21V26H21M19 19 26 26M6 11V6H11M13 13 6 6" class="Vector"/>
                        </g>
                      </g>
                      <defs>
                        <clipPath id="a" class="a">
                          <path fill="#fff" d="M0 0H32V32H0z"/>
                        </clipPath>
                      </defs>
                    `, t.appendChild(e), t;
  }
  static fullScreenLabelActive() {
    const t = document.createElement("div"), e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    return e.setAttributeNS(null, "width", "32"), e.setAttributeNS(null, "height", "32"), e.setAttributeNS(null, "viewBox", "0 0 32 32"), e.innerHTML = ` 
                        <g class="ArrowsIn" clip-path="url(#a)">
                        <g class="icon">
                          <path d="M24 13H19V8M26 6 19 13M8 19H13V24M6 26 13 19M19 24V19H24M26 26 19 19M13 8V13H8M6 6 13 13" class="Vector"/>
                        </g>
                      </g>
                      <defs>
                        <clipPath id="a" class="a">
                          <path fill="#fff" d="M0 0H32V32H0z"/>
                        </clipPath>
                      </defs>
                    `, t.appendChild(e), t;
  }
}
_t.info = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <g class="Info" clip-path="url(#a)">
            <g class="icon">
            <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" class="Vector"/>
            <path d="M15 15H16V22H17M16 10V11" class="Vector"/>
            </g>
        </g>
        <defs>
            <clipPath id="a" class="a">
            <path fill="#fff" d="M0 0H32V32H0z"/>
            </clipPath>
        </defs>
    </svg>
  `;
_t.warning = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <g class="Warning" clip-path="url(#a)">
    <g class="icon">
      <path d="M16 13V18M14.275 5 3.275 24C3.1 24.304 3.007 24.648 3.007 24.998 3.007 25.349 3.099 25.693 3.273 25.997 3.448 26.301 3.699 26.553 4.003 26.729 4.306 26.906 4.65 26.999 5 27H27C27.351 26.999 27.695 26.906 27.998 26.729 28.301 26.553 28.552 26.301 28.727 25.997 28.902 25.693 28.993 25.349 28.993 24.998 28.993 24.648 28.9 24.304 28.725 24L17.725 5C17.551 4.696 17.3 4.444 16.997 4.268 16.694 4.092 16.35 4 16 4 15.65 4 15.306 4.092 15.003 4.268 14.7 4.444 14.449 4.696 14.275 5V5ZM16 22V23" class="Vector"/>
    </g>
  </g>
  <defs>
    <clipPath id="a" class="a">
      <path fill="#fff" d="M0 0H32V32H0z"/>
    </clipPath>
  </defs>
</svg>

  `;
_t.error = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <g class="WarningOctagon" clip-path="url(#a)">
            <g class="icon">
            <path d="M16 10V17" class="Vector"/>
            <path d="M20.9706 4L28 11.0294V20.9706L20.9706 28H11.0294L4 20.9706L4 11.0294L11.0294 4L20.9706 4Z" class="Path"/>
            <path d="M16 21V22" class="Vector"/>
            </g>
        </g>
        <defs>
            <clipPath id="a" class="a">
            <path fill="#fff" d="M0 0H32V32H0z"/>
            </clipPath>
        </defs>
    </svg>
  `;
_t.mapPin = `
    <svg width="42" height="54" viewBox="0 0 42 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_429_5158)">
        <mask id="path-1-outside-1_429_5158" maskUnits="userSpaceOnUse" x="6.21655" y="7" width="30" height="42" fill="black">
          <rect fill="white" x="6.21655" y="7" width="30" height="42"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M34.8599 21.8217C34.8599 21.8712 34.8596 21.9207 34.8591 21.9701C34.7547 37.2486 21.0953 47.9552 21.0382 47.9998V48L21.0381 47.9999L21.038 48V47.9998C20.9809 47.9551 7.27987 37.2159 7.21677 21.9002L7.21655 21.8217L7.21656 21.8099L7.21655 21.7941H7.21658C7.23145 14.1733 13.4139 8 21.0382 8C28.6717 8 34.8599 14.1882 34.8599 21.8217ZM25.5579 21.8218C25.5579 24.3179 23.5344 26.3415 21.0382 26.3415C18.5421 26.3415 16.5185 24.3179 16.5185 21.8218C16.5185 19.3256 18.5421 17.3021 21.0382 17.3021C23.5344 17.3021 25.5579 19.3256 25.5579 21.8218Z"/>
        </mask>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M34.8599 21.8217C34.8599 21.8712 34.8596 21.9207 34.8591 21.9701C34.7547 37.2486 21.0953 47.9552 21.0382 47.9998V48L21.0381 47.9999L21.038 48V47.9998C20.9809 47.9551 7.27987 37.2159 7.21677 21.9002L7.21655 21.8217L7.21656 21.8099L7.21655 21.7941H7.21658C7.23145 14.1733 13.4139 8 21.0382 8C28.6717 8 34.8599 14.1882 34.8599 21.8217ZM25.5579 21.8218C25.5579 24.3179 23.5344 26.3415 21.0382 26.3415C18.5421 26.3415 16.5185 24.3179 16.5185 21.8218C16.5185 19.3256 18.5421 17.3021 21.0382 17.3021C23.5344 17.3021 25.5579 19.3256 25.5579 21.8218Z" fill="#008C6F"/>
        <path d="M34.8591 21.9701L33.8591 21.9596L33.8591 21.9632L34.8591 21.9701ZM21.0382 47.9998L20.4219 47.2124C20.1797 47.4019 20.0382 47.6923 20.0382 47.9998H21.0382ZM21.0382 48L20.426 48.7907C20.7277 49.0243 21.136 49.0658 21.4786 48.8978C21.8211 48.7298 22.0382 48.3815 22.0382 48H21.0382ZM21.0381 47.9999L21.6503 47.2092C21.2929 46.9325 20.7943 46.9299 20.4341 47.2029L21.0381 47.9999ZM21.038 48H20.038C20.038 48.3797 20.253 48.7266 20.5931 48.8955C20.9331 49.0645 21.3395 49.0263 21.642 48.797L21.038 48ZM21.038 47.9998H22.038C22.038 47.6923 21.8965 47.4019 21.6544 47.2124L21.038 47.9998ZM7.21677 21.9002L6.21677 21.903L6.21678 21.9043L7.21677 21.9002ZM7.21655 21.8217L6.21655 21.8212L6.21656 21.8244L7.21655 21.8217ZM7.21656 21.8099L8.21656 21.8104L8.21656 21.8096L7.21656 21.8099ZM7.21655 21.7941V20.7941C6.95128 20.7941 6.69688 20.8995 6.50934 21.0871C6.32179 21.2747 6.21647 21.5291 6.21655 21.7944L7.21655 21.7941ZM7.21658 21.7941V22.7941C7.7681 22.7941 8.2155 22.3476 8.21658 21.7961L7.21658 21.7941ZM35.859 21.9806C35.8596 21.9277 35.8599 21.8747 35.8599 21.8217H33.8599C33.8599 21.8677 33.8596 21.9136 33.8591 21.9596L35.859 21.9806ZM21.6546 48.7873C21.7208 48.7355 25.224 45.9857 28.7317 41.2966C32.2342 36.6144 35.8049 29.9124 35.8591 21.9769L33.8591 21.9632C33.809 29.3062 30.4978 35.5968 27.1302 40.0986C23.7677 44.5937 20.4127 47.2195 20.4219 47.2124L21.6546 48.7873ZM22.0382 48V47.9998H20.0382V48H22.0382ZM20.4259 48.7906L20.426 48.7907L21.6504 47.2093L21.6503 47.2092L20.4259 48.7906ZM21.642 48.797L21.6421 48.7969L20.4341 47.2029L20.434 47.203L21.642 48.797ZM20.038 47.9998V48H22.038V47.9998H20.038ZM6.21678 21.9043C6.24955 29.8595 9.82063 36.5798 13.3285 41.2752C16.8415 45.9774 20.3554 48.7354 20.4217 48.7873L21.6544 47.2124C21.6635 47.2195 18.2983 44.5856 14.9307 40.0781C11.5581 35.5638 8.24709 29.2566 8.21676 21.8961L6.21678 21.9043ZM6.21656 21.8244L6.21678 21.903L8.21677 21.8974L8.21655 21.8189L6.21656 21.8244ZM6.21656 21.8095L6.21655 21.8212L8.21655 21.8221L8.21656 21.8104L6.21656 21.8095ZM6.21655 21.7944L6.21656 21.8102L8.21656 21.8096L8.21655 21.7938L6.21655 21.7944ZM7.21658 20.7941H7.21655V22.7941H7.21658V20.7941ZM21.0382 7C12.8623 7 6.23252 13.6199 6.21658 21.7922L8.21658 21.7961C8.23037 14.7266 13.9655 9 21.0382 9V7ZM35.8599 21.8217C35.8599 13.6359 29.224 7 21.0382 7V9C28.1194 9 33.8599 14.7405 33.8599 21.8217H35.8599ZM21.0382 27.3415C24.0866 27.3415 26.5579 24.8702 26.5579 21.8218H24.5579C24.5579 23.7656 22.9821 25.3415 21.0382 25.3415V27.3415ZM15.5185 21.8218C15.5185 24.8702 17.9898 27.3415 21.0382 27.3415V25.3415C19.0943 25.3415 17.5185 23.7656 17.5185 21.8218H15.5185ZM21.0382 16.3021C17.9898 16.3021 15.5185 18.7733 15.5185 21.8218H17.5185C17.5185 19.8779 19.0943 18.3021 21.0382 18.3021V16.3021ZM26.5579 21.8218C26.5579 18.7733 24.0866 16.3021 21.0382 16.3021V18.3021C22.9821 18.3021 24.5579 19.8779 24.5579 21.8218H26.5579Z" fill="white" mask="url(#path-1-outside-1_429_5158)"/>
      </g>
      <mask id="path-3-inside-2_429_5158" fill="white">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M34.8599 21.8217C34.8599 21.8712 34.8596 21.9207 34.8591 21.9701C34.7547 37.2486 21.0953 47.9552 21.0382 47.9998V48L21.0381 47.9999L21.038 48V47.9998C20.9809 47.9551 7.27987 37.2159 7.21677 21.9002L7.21655 21.8217L7.21656 21.8099L7.21655 21.7941H7.21658C7.23145 14.1733 13.4139 8 21.0382 8C28.6717 8 34.8599 14.1882 34.8599 21.8217ZM25.5579 21.8218C25.5579 24.3179 23.5344 26.3415 21.0382 26.3415C18.5421 26.3415 16.5185 24.3179 16.5185 21.8218C16.5185 19.3256 18.5421 17.3021 21.0382 17.3021C23.5344 17.3021 25.5579 19.3256 25.5579 21.8218Z"/>
      </mask>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M34.8599 21.8217C34.8599 21.8712 34.8596 21.9207 34.8591 21.9701C34.7547 37.2486 21.0953 47.9552 21.0382 47.9998V48L21.0381 47.9999L21.038 48V47.9998C20.9809 47.9551 7.27987 37.2159 7.21677 21.9002L7.21655 21.8217L7.21656 21.8099L7.21655 21.7941H7.21658C7.23145 14.1733 13.4139 8 21.0382 8C28.6717 8 34.8599 14.1882 34.8599 21.8217ZM25.5579 21.8218C25.5579 24.3179 23.5344 26.3415 21.0382 26.3415C18.5421 26.3415 16.5185 24.3179 16.5185 21.8218C16.5185 19.3256 18.5421 17.3021 21.0382 17.3021C23.5344 17.3021 25.5579 19.3256 25.5579 21.8218Z" fill="#008C6F"/>
      <path d="M34.8591 21.9701L32.8592 21.9491L32.8591 21.9564L34.8591 21.9701ZM21.0382 47.9998L19.8055 46.4249L19.0382 47.0254V47.9998H21.0382ZM21.0382 48L19.8139 49.5814L23.0382 52.0777V48H21.0382ZM21.0381 47.9999L22.2625 46.4185L21.0511 45.4806L19.8301 46.406L21.0381 47.9999ZM21.038 48H19.038V52.0253L22.2461 49.5939L21.038 48ZM21.038 47.9998H23.038V47.0254L22.2707 46.4249L21.038 47.9998ZM7.21677 21.9002L5.21678 21.9058L5.21679 21.9085L7.21677 21.9002ZM7.21655 21.8217L5.21654 21.8208L5.21656 21.8272L7.21655 21.8217ZM7.21656 21.8099L9.21656 21.8108L9.21656 21.8093L7.21656 21.8099ZM7.21655 21.7941V19.7941H5.21594L5.21655 21.7947L7.21655 21.7941ZM7.21658 21.7941V23.7941H9.21268L9.21658 21.798L7.21658 21.7941ZM36.859 21.9911C36.8596 21.9347 36.8599 21.8782 36.8599 21.8217H32.8599C32.8599 21.8642 32.8596 21.9066 32.8592 21.9491L36.859 21.9911ZM22.2709 49.5748C22.3748 49.4935 25.9522 46.6818 29.5324 41.8956C33.1024 37.1232 36.8028 30.2156 36.859 21.9837L32.8591 21.9564C32.811 29.003 29.6296 35.0879 26.3294 39.4996C23.0395 43.8976 19.7587 46.4616 19.8055 46.4249L22.2709 49.5748ZM23.0382 48V47.9998H19.0382V48H23.0382ZM19.8138 49.5814L19.8139 49.5814L22.2626 46.4185L22.2625 46.4185L19.8138 49.5814ZM22.2461 49.5939L22.2462 49.5939L19.8301 46.406L19.83 46.406L22.2461 49.5939ZM19.038 47.9998V48H23.038V47.9998H19.038ZM5.21679 21.9085C5.25079 30.161 8.95191 37.0878 12.5274 41.8737C16.1131 46.6732 19.7013 49.4934 19.8053 49.5748L22.2707 46.4249C22.3176 46.4616 19.0267 43.8898 15.7319 39.4796C12.4268 35.0557 9.24585 28.9552 9.21675 21.892L5.21679 21.9085ZM5.21656 21.8272L5.21678 21.9058L9.21676 21.8947L9.21654 21.8161L5.21656 21.8272ZM5.21656 21.8091L5.21655 21.8208L9.21655 21.8225L9.21656 21.8108L5.21656 21.8091ZM5.21655 21.7947L5.21656 21.8106L9.21656 21.8093L9.21655 21.7935L5.21655 21.7947ZM7.21658 19.7941H7.21655V23.7941H7.21658V19.7941ZM21.0382 6C12.3106 6 5.2336 13.0666 5.21658 21.7902L9.21658 21.798C9.22929 15.28 14.5172 10 21.0382 10V6ZM36.8599 21.8217C36.8599 13.0836 29.7763 6 21.0382 6V10C27.5671 10 32.8599 15.2927 32.8599 21.8217H36.8599ZM21.0382 28.3415C24.6389 28.3415 27.5579 25.4225 27.5579 21.8218H23.5579C23.5579 23.2134 22.4298 24.3415 21.0382 24.3415V28.3415ZM14.5185 21.8218C14.5185 25.4225 17.4375 28.3415 21.0382 28.3415V24.3415C19.6466 24.3415 18.5185 23.2134 18.5185 21.8218H14.5185ZM21.0382 15.3021C17.4375 15.3021 14.5185 18.2211 14.5185 21.8218H18.5185C18.5185 20.4302 19.6466 19.3021 21.0382 19.3021V15.3021ZM27.5579 21.8218C27.5579 18.2211 24.6389 15.3021 21.0382 15.3021V19.3021C22.4298 19.3021 23.5579 20.4302 23.5579 21.8218H27.5579Z" fill="#01755D" mask="url(#path-3-inside-2_429_5158)"/>
      <path d="M21.2166 33C27.2917 33 32.2166 28.0751 32.2166 22C32.2166 15.9249 27.2917 11 21.2166 11C15.1414 11 10.2166 15.9249 10.2166 22C10.2166 28.0751 15.1414 33 21.2166 33Z" fill="#008C6F"/>
      <path d="M21.2166 14C19.6343 14 18.0876 14.4692 16.772 15.3482C15.4564 16.2273 14.431 17.4767 13.8255 18.9385C13.22 20.4003 13.0616 22.0089 13.3703 23.5607C13.679 25.1126 14.4409 26.538 15.5597 27.6569C16.6785 28.7757 18.104 29.5376 19.6558 29.8463C21.2077 30.155 22.8162 29.9965 24.278 29.391C25.7398 28.7855 26.9893 27.7602 27.8683 26.4446C28.7474 25.129 29.2166 23.5822 29.2166 22C29.2125 19.8795 28.3683 17.847 26.8689 16.3476C25.3695 14.8482 23.337 14.0041 21.2166 14V14ZM25.0242 20.6L20.5166 24.9077C20.4 25.0173 20.2458 25.0779 20.0858 25.0769C20.0076 25.078 19.9299 25.0637 19.8573 25.0346C19.7847 25.0056 19.7186 24.9624 19.6627 24.9077L17.4089 22.7538C17.3463 22.6993 17.2955 22.6327 17.2594 22.558C17.2233 22.4833 17.2027 22.4021 17.1987 22.3192C17.1948 22.2363 17.2077 22.1535 17.2366 22.0758C17.2655 21.998 17.3098 21.9269 17.3669 21.8667C17.424 21.8065 17.4926 21.7585 17.5688 21.7255C17.6449 21.6925 17.7269 21.6752 17.8099 21.6748C17.8928 21.6743 17.975 21.6906 18.0515 21.7227C18.128 21.7548 18.1972 21.802 18.255 21.8615L20.0858 23.6077L24.1781 19.7077C24.2977 19.6033 24.4531 19.5492 24.6117 19.5567C24.7704 19.5642 24.9199 19.6327 25.0292 19.748C25.1385 19.8632 25.199 20.0162 25.198 20.175C25.1971 20.3338 25.1348 20.4861 25.0242 20.6Z" fill="white"/>
      <circle cx="21.2166" cy="22" r="8" fill="white"/>
      <g clip-path="url(#clip0_429_5158)">
      <path d="M24.6541 19.8125L20.2791 24.1875L18.0916 22" stroke="#01755D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
        <filter id="filter0_d_429_5158" x="0.216553" y="0" width="41.6433" height="54" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="-1"/>
          <feGaussianBlur stdDeviation="3"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_429_5158"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_429_5158" result="shape"/>
        </filter>
        <clipPath id="clip0_429_5158">
        <rect width="10" height="10" fill="white" transform="translate(16.2166 17)"/>
        </clipPath>
      </defs>
    </svg>
  `;
_t.mapPinSelect = `
  <svg width="44" height="56" viewBox="0 0 44 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_429_5817)">
<mask id="path-1-outside-1_429_5817" maskUnits="userSpaceOnUse" x="6" y="7" width="32" height="44" fill="black">
<rect fill="white" x="6" y="7" width="32" height="44"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M35.6433 22.8217C35.6433 22.8712 35.6431 22.9207 35.6425 22.9701C35.5382 38.2486 21.8787 48.9552 21.8217 48.9998V49L21.8216 48.9999L21.8215 49V48.9998C21.7643 48.9551 8.06331 38.2159 8.00022 22.9002L8 22.8217L8 22.8099L8 22.7941H8.00003C8.01489 15.1733 14.1974 9 21.8217 9C29.4551 9 35.6433 15.1882 35.6433 22.8217ZM26.3413 22.8218C26.3413 25.3179 24.3178 27.3415 21.8217 27.3415C19.3255 27.3415 17.302 25.3179 17.302 22.8218C17.302 20.3256 19.3255 18.3021 21.8217 18.3021C24.3178 18.3021 26.3413 20.3256 26.3413 22.8218Z"/>
</mask>
<path fill-rule="evenodd" clip-rule="evenodd" d="M35.6433 22.8217C35.6433 22.8712 35.6431 22.9207 35.6425 22.9701C35.5382 38.2486 21.8787 48.9552 21.8217 48.9998V49L21.8216 48.9999L21.8215 49V48.9998C21.7643 48.9551 8.06331 38.2159 8.00022 22.9002L8 22.8217L8 22.8099L8 22.7941H8.00003C8.01489 15.1733 14.1974 9 21.8217 9C29.4551 9 35.6433 15.1882 35.6433 22.8217ZM26.3413 22.8218C26.3413 25.3179 24.3178 27.3415 21.8217 27.3415C19.3255 27.3415 17.302 25.3179 17.302 22.8218C17.302 20.3256 19.3255 18.3021 21.8217 18.3021C24.3178 18.3021 26.3413 20.3256 26.3413 22.8218Z" fill="#F59E0B"/>
<path d="M35.6425 22.9701L33.6426 22.9491L33.6426 22.9564L35.6425 22.9701ZM21.8217 48.9998L20.589 47.4249C20.1046 47.804 19.8217 48.3848 19.8217 48.9998H21.8217ZM21.8217 49L20.5973 50.5814C21.2007 51.0486 22.0173 51.1316 22.7024 50.7956C23.3875 50.4596 23.8217 49.763 23.8217 49H21.8217ZM21.8216 48.9999L23.0459 47.4185C22.3311 46.8651 21.334 46.86 20.6135 47.406L21.8216 48.9999ZM21.8215 49H19.8215C19.8215 49.7593 20.2515 50.4532 20.9316 50.7911C21.6116 51.129 22.4243 51.0526 23.0295 50.5939L21.8215 49ZM21.8215 48.9998H23.8215C23.8215 48.3848 23.5385 47.804 23.0542 47.4249L21.8215 48.9998ZM8.00022 22.9002L6.00022 22.9058L6.00024 22.9085L8.00022 22.9002ZM8 22.8217L5.99999 22.8208L6.00001 22.8272L8 22.8217ZM8 22.8099L10 22.8108L10 22.8093L8 22.8099ZM8 22.7941V20.7941C7.46946 20.7941 6.96066 21.0049 6.58557 21.3801C6.21048 21.7553 5.99984 22.2642 6 22.7947L8 22.7941ZM8.00003 22.7941V24.7941C9.10307 24.7941 9.99787 23.9011 10 22.798L8.00003 22.7941ZM37.6424 22.9911C37.643 22.9347 37.6433 22.8782 37.6433 22.8217H33.6433C33.6433 22.8642 33.6431 22.9066 33.6426 22.9491L37.6424 22.9911ZM23.0543 50.5748C23.1583 50.4935 26.7356 47.6818 30.3159 42.8956C33.8858 38.1232 37.5863 31.2156 37.6425 22.9837L33.6426 22.9564C33.5945 30.003 30.413 36.0879 27.1129 40.4996C23.823 44.8976 20.5421 47.4616 20.589 47.4249L23.0543 50.5748ZM23.8217 49V48.9998H19.8217V49H23.8217ZM20.5972 50.5814L20.5973 50.5814L23.046 47.4185L23.0459 47.4185L20.5972 50.5814ZM23.0295 50.5939L23.0296 50.5939L20.6135 47.406L20.6134 47.406L23.0295 50.5939ZM19.8215 48.9998V49H23.8215V48.9998H19.8215ZM6.00024 22.9085C6.03423 31.161 9.73536 38.0878 13.3109 42.8737C16.8966 47.6732 20.4848 50.4934 20.5888 50.5748L23.0542 47.4249C23.101 47.4616 19.8101 44.8898 16.5153 40.4796C13.2102 36.0557 10.0293 29.9552 10.0002 22.892L6.00024 22.9085ZM6.00001 22.8272L6.00023 22.9058L10.0002 22.8947L9.99999 22.8161L6.00001 22.8272ZM6.00001 22.8091L6 22.8208L10 22.8225L10 22.8108L6.00001 22.8091ZM6 22.7947L6.00001 22.8105L10 22.8093L10 22.7935L6 22.7947ZM8.00003 20.7941H8V24.7941H8.00003V20.7941ZM21.8217 7C13.0941 7 6.01705 14.0666 6.00003 22.7902L10 22.798C10.0127 16.28 15.3006 11 21.8217 11V7ZM37.6433 22.8217C37.6433 14.0836 30.5597 7 21.8217 7V11C28.3506 11 33.6433 16.2927 33.6433 22.8217H37.6433ZM21.8217 29.3415C25.4224 29.3415 28.3413 26.4225 28.3413 22.8218H24.3413C24.3413 24.2134 23.2132 25.3415 21.8217 25.3415V29.3415ZM15.302 22.8218C15.302 26.4225 18.2209 29.3415 21.8217 29.3415V25.3415C20.4301 25.3415 19.302 24.2134 19.302 22.8218H15.302ZM21.8217 16.3021C18.2209 16.3021 15.302 19.2211 15.302 22.8218H19.302C19.302 21.4302 20.4301 20.3021 21.8217 20.3021V16.3021ZM28.3413 22.8218C28.3413 19.2211 25.4224 16.3021 21.8217 16.3021V20.3021C23.2132 20.3021 24.3413 21.4302 24.3413 22.8218H28.3413Z" fill="white" mask="url(#path-1-outside-1_429_5817)"/>
</g>
<mask id="path-3-inside-2_429_5817" fill="white">
<path fill-rule="evenodd" clip-rule="evenodd" d="M35.6433 22.8217C35.6433 22.8712 35.6431 22.9207 35.6425 22.9701C35.5382 38.2486 21.8787 48.9552 21.8217 48.9998V49L21.8216 48.9999L21.8215 49V48.9998C21.7643 48.9551 8.06331 38.2159 8.00022 22.9002L8 22.8217L8 22.8099L8 22.7941H8.00003C8.01489 15.1733 14.1974 9 21.8217 9C29.4551 9 35.6433 15.1882 35.6433 22.8217ZM26.3413 22.8218C26.3413 25.3179 24.3178 27.3415 21.8217 27.3415C19.3255 27.3415 17.302 25.3179 17.302 22.8218C17.302 20.3256 19.3255 18.3021 21.8217 18.3021C24.3178 18.3021 26.3413 20.3256 26.3413 22.8218Z"/>
</mask>
<path fill-rule="evenodd" clip-rule="evenodd" d="M35.6433 22.8217C35.6433 22.8712 35.6431 22.9207 35.6425 22.9701C35.5382 38.2486 21.8787 48.9552 21.8217 48.9998V49L21.8216 48.9999L21.8215 49V48.9998C21.7643 48.9551 8.06331 38.2159 8.00022 22.9002L8 22.8217L8 22.8099L8 22.7941H8.00003C8.01489 15.1733 14.1974 9 21.8217 9C29.4551 9 35.6433 15.1882 35.6433 22.8217ZM26.3413 22.8218C26.3413 25.3179 24.3178 27.3415 21.8217 27.3415C19.3255 27.3415 17.302 25.3179 17.302 22.8218C17.302 20.3256 19.3255 18.3021 21.8217 18.3021C24.3178 18.3021 26.3413 20.3256 26.3413 22.8218Z" fill="#EF4444"/>
<path d="M35.6425 22.9701L33.6426 22.9491L33.6426 22.9564L35.6425 22.9701ZM21.8217 48.9998L20.589 47.4249L19.8217 48.0255V48.9998H21.8217ZM21.8217 49L20.5973 50.5814L23.8217 53.0777V49H21.8217ZM21.8216 48.9999L23.0459 47.4185L21.8345 46.4806L20.6135 47.406L21.8216 48.9999ZM21.8215 49H19.8215V53.0253L23.0295 50.5939L21.8215 49ZM21.8215 48.9998H23.8215V48.0255L23.0542 47.4249L21.8215 48.9998ZM8.00022 22.9002L6.00022 22.9058L6.00024 22.9085L8.00022 22.9002ZM8 22.8217L5.99999 22.8208L6.00001 22.8272L8 22.8217ZM8 22.8099L10 22.8108L10 22.8093L8 22.8099ZM8 22.7941V20.7941H5.99939L6 22.7947L8 22.7941ZM8.00003 22.7941V24.7941H9.99613L10 22.798L8.00003 22.7941ZM37.6424 22.9911C37.643 22.9347 37.6433 22.8782 37.6433 22.8217H33.6433C33.6433 22.8642 33.6431 22.9066 33.6426 22.9491L37.6424 22.9911ZM23.0543 50.5748C23.1583 50.4935 26.7356 47.6818 30.3159 42.8956C33.8858 38.1232 37.5863 31.2156 37.6425 22.9837L33.6426 22.9564C33.5945 30.003 30.413 36.0879 27.1129 40.4996C23.823 44.8976 20.5421 47.4616 20.589 47.4249L23.0543 50.5748ZM23.8217 49V48.9998H19.8217V49H23.8217ZM20.5972 50.5814L20.5973 50.5814L23.046 47.4185L23.0459 47.4185L20.5972 50.5814ZM23.0295 50.5939L23.0296 50.5939L20.6135 47.406L20.6134 47.406L23.0295 50.5939ZM19.8215 48.9998V49H23.8215V48.9998H19.8215ZM6.00024 22.9085C6.03423 31.161 9.73536 38.0878 13.3109 42.8737C16.8966 47.6732 20.4848 50.4934 20.5888 50.5748L23.0542 47.4249C23.101 47.4616 19.8101 44.8898 16.5153 40.4796C13.2102 36.0557 10.0293 29.9552 10.0002 22.892L6.00024 22.9085ZM6.00001 22.8272L6.00023 22.9058L10.0002 22.8947L9.99999 22.8161L6.00001 22.8272ZM6.00001 22.8091L6 22.8208L10 22.8225L10 22.8108L6.00001 22.8091ZM6 22.7947L6.00001 22.8105L10 22.8093L10 22.7935L6 22.7947ZM8.00003 20.7941H8V24.7941H8.00003V20.7941ZM21.8217 7C13.0941 7 6.01705 14.0666 6.00003 22.7902L10 22.798C10.0127 16.28 15.3006 11 21.8217 11V7ZM37.6433 22.8217C37.6433 14.0836 30.5597 7 21.8217 7V11C28.3506 11 33.6433 16.2927 33.6433 22.8217H37.6433ZM21.8217 29.3415C25.4224 29.3415 28.3413 26.4225 28.3413 22.8218H24.3413C24.3413 24.2134 23.2132 25.3415 21.8217 25.3415V29.3415ZM15.302 22.8218C15.302 26.4225 18.2209 29.3415 21.8217 29.3415V25.3415C20.4301 25.3415 19.302 24.2134 19.302 22.8218H15.302ZM21.8217 16.3021C18.2209 16.3021 15.302 19.2211 15.302 22.8218H19.302C19.302 21.4302 20.4301 20.3021 21.8217 20.3021V16.3021ZM28.3413 22.8218C28.3413 19.2211 25.4224 16.3021 21.8217 16.3021V20.3021C23.2132 20.3021 24.3413 21.4302 24.3413 22.8218H28.3413Z" fill="#DC2626" mask="url(#path-3-inside-2_429_5817)"/>
<defs>
<filter id="filter0_d_429_5817" x="0" y="0" width="43.6433" height="56" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-1"/>
<feGaussianBlur stdDeviation="3"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_429_5817"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_429_5817" result="shape"/>
</filter>
</defs>
</svg>
`;
_t.information = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="dfasdfs">
      <g class="Info" clip-path="url(#a)">
        <g class="icon">
          <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" class="Vector"/>
          <path d="M15 15H16V22H17M16 10V11" class="Vector"/>
        </g>
      </g>
      <defs>
        <clipPath id="a" class="a">
          <path fill="#fff" d="M0 0H32V32H0z"/>
        </clipPath>
      </defs>
    </svg>
  `;
_t.geolocation = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <g class="CrosshairSimple" clip-path="url(#a)">
        <g class="icon">
          <path d="M16 27.5C22.351 27.5 27.5 22.351 27.5 16 27.5 9.649 22.351 4.5 16 4.5 9.649 4.5 4.5 9.649 4.5 16 4.5 22.351 9.649 27.5 16 27.5ZM16 4.5V9.5M4.5 16H9.5M16 27.5V22.5M27.5 16H22.5" class="Vector"/>
        </g>
      </g>
      <defs>
        <clipPath id="a" class="a">
          <path fill="#fff" d="M0 0H32V32H0z"/>
        </clipPath>
      </defs>
    </svg>
  `;
_t.rotation = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <g class="North">
        <g class="icon">
          <path d="M12 27.2375L16.2375 23L20.475 27.2375" class="Vector"/>
          <path d="M12 18V7L20.5 18V7" class="Vector 3"/>
        </g>
      </g>
    </svg>
  `;
let xu = "", vu = !1, Cu = "";
function lm(i) {
  xu = i;
}
function hm() {
  return xu;
}
function cm(i) {
  vu = i;
}
function um() {
  return vu;
}
function dm(i) {
  Cu = i;
}
function fm() {
  return Cu;
}
function Y() {
  return {
    setTheme: lm,
    getTheme: hm,
    setCustomDisplay: cm,
    isCustomDisplay: um,
    setTargetBoxSize: dm,
    getTargetBoxSize: fm
  };
}
var gm = Object.defineProperty, mm = Object.getOwnPropertyDescriptor, Mu = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? mm(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(t, e, s) : o(s)) || s);
  return n && s && gm(t, e, s), s;
};
let Or = class extends Zt {
  constructor() {
    super(), this.className = Y().isCustomDisplay() ? `center-control-custom-${Y().getTargetBoxSize()}` : "information-control";
  }
  render() {
    return ze`<div class="ol-unselectable ol-control ${this.className}" style="position: absolute">
                  <div>
                    <div class="control-${Y().getTheme()}">
                      ${so(_t.geolocation)}
                    </div>
                  </div>
                </div>
    `;
  }
};
Or.styles = [ft(al), ft(Xi), ft(ll)];
Mu([
  we()
], Or.prototype, "className", 2);
Or = Mu([
  Ve("geolocation-control-button")
], Or);
class _m extends Ht {
  constructor(t) {
    const e = document.createElement("geolocation-control-button");
    super({
      element: e
    }), this.geolocaliseElement = t, e.addEventListener("click", this.centerMap.bind(this), !1);
  }
  centerMap() {
    if (this.geolocaliseElement) {
      const t = this.geolocaliseElement.getPosition(), e = this.getMap();
      if (e) {
        const n = e.getSize(), s = e.getView();
        t && n && s.centerOn(t, n, [570, 500]);
      }
    }
  }
}
class ro extends vi {
  constructor(t, e, n) {
    super(), n !== void 0 && e === void 0 ? this.setFlatCoordinates(n, t) : (e = e || 0, this.setCenterAndRadius(t, e, n));
  }
  clone() {
    const t = new ro(
      this.flatCoordinates.slice(),
      void 0,
      this.layout
    );
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, n, s) {
    const r = this.flatCoordinates, o = t - r[0], a = e - r[1], l = o * o + a * a;
    if (l < s) {
      if (l === 0)
        for (let h = 0; h < this.stride; ++h)
          n[h] = r[h];
      else {
        const h = this.getRadius() / Math.sqrt(l);
        n[0] = r[0] + h * o, n[1] = r[1] + h * a;
        for (let c = 2; c < this.stride; ++c)
          n[c] = r[c];
      }
      return n.length = this.stride, l;
    } else
      return s;
  }
  containsXY(t, e) {
    const n = this.flatCoordinates, s = t - n[0], r = e - n[1];
    return s * s + r * r <= this.getRadiusSquared_();
  }
  getCenter() {
    return this.flatCoordinates.slice(0, this.stride);
  }
  computeExtent(t) {
    const e = this.flatCoordinates, n = e[this.stride] - e[0];
    return de(
      e[0] - n,
      e[1] - n,
      e[0] + n,
      e[1] + n,
      t
    );
  }
  getRadius() {
    return Math.sqrt(this.getRadiusSquared_());
  }
  getRadiusSquared_() {
    const t = this.flatCoordinates[this.stride] - this.flatCoordinates[0], e = this.flatCoordinates[this.stride + 1] - this.flatCoordinates[1];
    return t * t + e * e;
  }
  getType() {
    return "Circle";
  }
  intersectsExtent(t) {
    const e = this.getExtent();
    if (Ot(t, e)) {
      const n = this.getCenter();
      return t[0] <= n[0] && t[2] >= n[0] || t[1] <= n[1] && t[3] >= n[1] ? !0 : Ta(t, this.intersectsCoordinate.bind(this));
    }
    return !1;
  }
  setCenter(t) {
    const e = this.stride, n = this.flatCoordinates[e] - this.flatCoordinates[0], s = t.slice();
    s[e] = s[0] + n;
    for (let r = 1; r < e; ++r)
      s[e + r] = t[r];
    this.setFlatCoordinates(this.layout, s), this.changed();
  }
  setCenterAndRadius(t, e, n) {
    this.setLayout(n, t, 0), this.flatCoordinates || (this.flatCoordinates = []);
    const s = this.flatCoordinates;
    let r = Dc(s, 0, t, this.stride);
    s[r++] = s[0] + e;
    for (let o = 1, a = this.stride; o < a; ++o)
      s[r++] = s[o];
    s.length = r, this.changed();
  }
  getCoordinates() {
    return null;
  }
  setCoordinates(t, e) {
  }
  setRadius(t) {
    this.flatCoordinates[this.stride] = this.flatCoordinates[0] + t, this.changed();
  }
  rotate(t, e) {
    const n = this.getCenter(), s = this.getStride();
    this.setCenter(
      za(n, 0, n.length, s, t, e, n)
    ), this.changed();
  }
  translate(t, e) {
    const n = this.getCenter(), s = this.getStride();
    this.setCenter(
      Oc(n, 0, n.length, s, t, e, n)
    ), this.changed();
  }
}
ro.prototype.transform;
const Eu = ro;
class Fr extends Fc {
  constructor(t) {
    super(), this.geometries_ = t || null, this.changeEventsKeys_ = [], this.listenGeometriesChange_();
  }
  unlistenGeometriesChange_() {
    this.changeEventsKeys_.forEach(it), this.changeEventsKeys_.length = 0;
  }
  listenGeometriesChange_() {
    if (!!this.geometries_)
      for (let t = 0, e = this.geometries_.length; t < e; ++t)
        this.changeEventsKeys_.push(
          W(this.geometries_[t], $.CHANGE, this.changed, this)
        );
  }
  clone() {
    const t = new Fr(null);
    return t.setGeometries(this.geometries_), t.applyProperties(this), t;
  }
  closestPointXY(t, e, n, s) {
    if (s < Ui(this.getExtent(), t, e))
      return s;
    const r = this.geometries_;
    for (let o = 0, a = r.length; o < a; ++o)
      s = r[o].closestPointXY(
        t,
        e,
        n,
        s
      );
    return s;
  }
  containsXY(t, e) {
    const n = this.geometries_;
    for (let s = 0, r = n.length; s < r; ++s)
      if (n[s].containsXY(t, e))
        return !0;
    return !1;
  }
  computeExtent(t) {
    Ss(t);
    const e = this.geometries_;
    for (let n = 0, s = e.length; n < s; ++n)
      _c(t, e[n].getExtent());
    return t;
  }
  getGeometries() {
    return bh(this.geometries_);
  }
  getGeometriesArray() {
    return this.geometries_;
  }
  getGeometriesArrayRecursive() {
    let t = [];
    const e = this.geometries_;
    for (let n = 0, s = e.length; n < s; ++n)
      e[n].getType() === this.getType() ? t = t.concat(
        e[n].getGeometriesArrayRecursive()
      ) : t.push(e[n]);
    return t;
  }
  getSimplifiedGeometry(t) {
    if (this.simplifiedGeometryRevision !== this.getRevision() && (this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = this.getRevision()), t < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && t < this.simplifiedGeometryMaxMinSquaredTolerance)
      return this;
    const e = [], n = this.geometries_;
    let s = !1;
    for (let r = 0, o = n.length; r < o; ++r) {
      const a = n[r], l = a.getSimplifiedGeometry(t);
      e.push(l), l !== a && (s = !0);
    }
    if (s) {
      const r = new Fr(null);
      return r.setGeometriesArray(e), r;
    } else
      return this.simplifiedGeometryMaxMinSquaredTolerance = t, this;
  }
  getType() {
    return "GeometryCollection";
  }
  intersectsExtent(t) {
    const e = this.geometries_;
    for (let n = 0, s = e.length; n < s; ++n)
      if (e[n].intersectsExtent(t))
        return !0;
    return !1;
  }
  isEmpty() {
    return this.geometries_.length === 0;
  }
  rotate(t, e) {
    const n = this.geometries_;
    for (let s = 0, r = n.length; s < r; ++s)
      n[s].rotate(t, e);
    this.changed();
  }
  scale(t, e, n) {
    n || (n = di(this.getExtent()));
    const s = this.geometries_;
    for (let r = 0, o = s.length; r < o; ++r)
      s[r].scale(t, e, n);
    this.changed();
  }
  setGeometries(t) {
    this.setGeometriesArray(bh(t));
  }
  setGeometriesArray(t) {
    this.unlistenGeometriesChange_(), this.geometries_ = t, this.listenGeometriesChange_(), this.changed();
  }
  applyTransform(t) {
    const e = this.geometries_;
    for (let n = 0, s = e.length; n < s; ++n)
      e[n].applyTransform(t);
    this.changed();
  }
  translate(t, e) {
    const n = this.geometries_;
    for (let s = 0, r = n.length; s < r; ++s)
      n[s].translate(t, e);
    this.changed();
  }
  disposeInternal() {
    this.unlistenGeometriesChange_(), super.disposeInternal();
  }
}
function bh(i) {
  const t = [];
  for (let e = 0, n = i.length; e < n; ++e)
    t.push(i[e].clone());
  return t;
}
const wu = Fr;
class Dr extends vi {
  constructor(t, e, n) {
    if (super(), this.ends_ = [], this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, Array.isArray(t[0]))
      this.setCoordinates(
        t,
        e
      );
    else if (e !== void 0 && n)
      this.setFlatCoordinates(
        e,
        t
      ), this.ends_ = n;
    else {
      let s = this.getLayout();
      const r = t, o = [], a = [];
      for (let l = 0, h = r.length; l < h; ++l) {
        const c = r[l];
        l === 0 && (s = c.getLayout()), ye(o, c.getFlatCoordinates()), a.push(o.length);
      }
      this.setFlatCoordinates(s, o), this.ends_ = a;
    }
  }
  appendLineString(t) {
    this.flatCoordinates ? ye(this.flatCoordinates, t.getFlatCoordinates().slice()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed();
  }
  clone() {
    const t = new Dr(
      this.flatCoordinates.slice(),
      this.layout,
      this.ends_.slice()
    );
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, n, s) {
    return s < Ui(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      ja(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), Ua(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      this.maxDelta_,
      !1,
      t,
      e,
      n,
      s
    ));
  }
  getCoordinateAtM(t, e, n) {
    return this.layout != "XYM" && this.layout != "XYZM" || this.flatCoordinates.length === 0 ? null : (e = e !== void 0 ? e : !1, n = n !== void 0 ? n : !1, O0(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      t,
      e,
      n
    ));
  }
  getCoordinates() {
    return _s(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride
    );
  }
  getEnds() {
    return this.ends_;
  }
  getLineString(t) {
    return t < 0 || this.ends_.length <= t ? null : new Fi(
      this.flatCoordinates.slice(
        t === 0 ? 0 : this.ends_[t - 1],
        this.ends_[t]
      ),
      this.layout
    );
  }
  getLineStrings() {
    const t = this.flatCoordinates, e = this.ends_, n = this.layout, s = [];
    let r = 0;
    for (let o = 0, a = e.length; o < a; ++o) {
      const l = e[o], h = new Fi(
        t.slice(r, l),
        n
      );
      s.push(h), r = l;
    }
    return s;
  }
  getFlatMidpoints() {
    const t = [], e = this.flatCoordinates;
    let n = 0;
    const s = this.ends_, r = this.stride;
    for (let o = 0, a = s.length; o < a; ++o) {
      const l = s[o], h = Qc(
        e,
        n,
        l,
        r,
        0.5
      );
      ye(t, h), n = l;
    }
    return t;
  }
  getSimplifiedGeometryInternal(t) {
    const e = [], n = [];
    return e.length = vg(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      t,
      e,
      0,
      n
    ), new Dr(e, "XY", n);
  }
  getType() {
    return "MultiLineString";
  }
  intersectsExtent(t) {
    return bg(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      t
    );
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 2), this.flatCoordinates || (this.flatCoordinates = []);
    const n = Za(
      this.flatCoordinates,
      0,
      t,
      this.stride,
      this.ends_
    );
    this.flatCoordinates.length = n.length === 0 ? 0 : n[n.length - 1], this.changed();
  }
}
const hl = Dr;
class cl extends vi {
  constructor(t, e) {
    super(), e && !Array.isArray(t[0]) ? this.setFlatCoordinates(
      e,
      t
    ) : this.setCoordinates(
      t,
      e
    );
  }
  appendPoint(t) {
    this.flatCoordinates ? ye(this.flatCoordinates, t.getFlatCoordinates()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.changed();
  }
  clone() {
    const t = new cl(
      this.flatCoordinates.slice(),
      this.layout
    );
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, n, s) {
    if (s < Ui(this.getExtent(), t, e))
      return s;
    const r = this.flatCoordinates, o = this.stride;
    for (let a = 0, l = r.length; a < l; a += o) {
      const h = ke(
        t,
        e,
        r[a],
        r[a + 1]
      );
      if (h < s) {
        s = h;
        for (let c = 0; c < o; ++c)
          n[c] = r[a + c];
        n.length = o;
      }
    }
    return s;
  }
  getCoordinates() {
    return si(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  getPoint(t) {
    const e = this.flatCoordinates ? this.flatCoordinates.length / this.stride : 0;
    return t < 0 || e <= t ? null : new he(
      this.flatCoordinates.slice(
        t * this.stride,
        (t + 1) * this.stride
      ),
      this.layout
    );
  }
  getPoints() {
    const t = this.flatCoordinates, e = this.layout, n = this.stride, s = [];
    for (let r = 0, o = t.length; r < o; r += n) {
      const a = new he(t.slice(r, r + n), e);
      s.push(a);
    }
    return s;
  }
  getType() {
    return "MultiPoint";
  }
  intersectsExtent(t) {
    const e = this.flatCoordinates, n = this.stride;
    for (let s = 0, r = e.length; s < r; s += n) {
      const o = e[s], a = e[s + 1];
      if (Sa(t, o, a))
        return !0;
    }
    return !1;
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = eo(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
const ul = cl;
function pm(i, t, e, n) {
  const s = [];
  let r = Gt();
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    r = mc(
      i,
      t,
      l[0],
      n
    ), s.push((r[0] + r[2]) / 2, (r[1] + r[3]) / 2), t = l[l.length - 1];
  }
  return s;
}
class Nr extends vi {
  constructor(t, e, n) {
    if (super(), this.endss_ = [], this.flatInteriorPointsRevision_ = -1, this.flatInteriorPoints_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, !n && !Array.isArray(t[0])) {
      let s = this.getLayout();
      const r = t, o = [], a = [];
      for (let l = 0, h = r.length; l < h; ++l) {
        const c = r[l];
        l === 0 && (s = c.getLayout());
        const u = o.length, d = c.getEnds();
        for (let f = 0, g = d.length; f < g; ++f)
          d[f] += u;
        ye(o, c.getFlatCoordinates()), a.push(d);
      }
      e = s, t = o, n = a;
    }
    e !== void 0 && n ? (this.setFlatCoordinates(
      e,
      t
    ), this.endss_ = n) : this.setCoordinates(
      t,
      e
    );
  }
  appendPolygon(t) {
    let e;
    if (!this.flatCoordinates)
      this.flatCoordinates = t.getFlatCoordinates().slice(), e = t.getEnds().slice(), this.endss_.push();
    else {
      const n = this.flatCoordinates.length;
      ye(this.flatCoordinates, t.getFlatCoordinates()), e = t.getEnds().slice();
      for (let s = 0, r = e.length; s < r; ++s)
        e[s] += n;
    }
    this.endss_.push(e), this.changed();
  }
  clone() {
    const t = this.endss_.length, e = new Array(t);
    for (let s = 0; s < t; ++s)
      e[s] = this.endss_[s].slice();
    const n = new Nr(
      this.flatCoordinates.slice(),
      this.layout,
      e
    );
    return n.applyProperties(this), n;
  }
  closestPointXY(t, e, n, s) {
    return s < Ui(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      pg(
        this.flatCoordinates,
        0,
        this.endss_,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), yg(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride,
      this.maxDelta_,
      !0,
      t,
      e,
      n,
      s
    ));
  }
  containsXY(t, e) {
    return Sg(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride,
      t,
      e
    );
  }
  getArea() {
    return Eg(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride
    );
  }
  getCoordinates(t) {
    let e;
    return t !== void 0 ? (e = this.getOrientedFlatCoordinates().slice(), rh(
      e,
      0,
      this.endss_,
      this.stride,
      t
    )) : e = this.flatCoordinates, ta(
      e,
      0,
      this.endss_,
      this.stride
    );
  }
  getEndss() {
    return this.endss_;
  }
  getFlatInteriorPoints() {
    if (this.flatInteriorPointsRevision_ != this.getRevision()) {
      const t = pm(
        this.flatCoordinates,
        0,
        this.endss_,
        this.stride
      );
      this.flatInteriorPoints_ = Tg(
        this.getOrientedFlatCoordinates(),
        0,
        this.endss_,
        this.stride,
        t
      ), this.flatInteriorPointsRevision_ = this.getRevision();
    }
    return this.flatInteriorPoints_;
  }
  getInteriorPoints() {
    return new ul(this.getFlatInteriorPoints().slice(), "XYM");
  }
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const t = this.flatCoordinates;
      Lg(t, 0, this.endss_, this.stride) ? this.orientedFlatCoordinates_ = t : (this.orientedFlatCoordinates_ = t.slice(), this.orientedFlatCoordinates_.length = rh(
        this.orientedFlatCoordinates_,
        0,
        this.endss_,
        this.stride
      )), this.orientedRevision_ = this.getRevision();
    }
    return this.orientedFlatCoordinates_;
  }
  getSimplifiedGeometryInternal(t) {
    const e = [], n = [];
    return e.length = Mg(
      this.flatCoordinates,
      0,
      this.endss_,
      this.stride,
      Math.sqrt(t),
      e,
      0,
      n
    ), new Nr(e, "XY", n);
  }
  getPolygon(t) {
    if (t < 0 || this.endss_.length <= t)
      return null;
    let e;
    if (t === 0)
      e = 0;
    else {
      const r = this.endss_[t - 1];
      e = r[r.length - 1];
    }
    const n = this.endss_[t].slice(), s = n[n.length - 1];
    if (e !== 0)
      for (let r = 0, o = n.length; r < o; ++r)
        n[r] -= e;
    return new Bi(
      this.flatCoordinates.slice(e, s),
      this.layout,
      n
    );
  }
  getPolygons() {
    const t = this.layout, e = this.flatCoordinates, n = this.endss_, s = [];
    let r = 0;
    for (let o = 0, a = n.length; o < a; ++o) {
      const l = n[o].slice(), h = l[l.length - 1];
      if (r !== 0)
        for (let u = 0, d = l.length; u < d; ++u)
          l[u] -= r;
      const c = new Bi(
        e.slice(r, h),
        t,
        l
      );
      s.push(c), r = h;
    }
    return s;
  }
  getType() {
    return "MultiPolygon";
  }
  intersectsExtent(t) {
    return Rg(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride,
      t
    );
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 3), this.flatCoordinates || (this.flatCoordinates = []);
    const n = xg(
      this.flatCoordinates,
      0,
      t,
      this.stride,
      this.endss_
    );
    if (n.length === 0)
      this.flatCoordinates.length = 0;
    else {
      const s = n[n.length - 1];
      this.flatCoordinates.length = s.length === 0 ? 0 : s[s.length - 1];
    }
    this.changed();
  }
}
const oo = Nr, tr = {
  DRAWSTART: "drawstart",
  DRAWEND: "drawend",
  DRAWABORT: "drawabort"
};
class er extends ie {
  constructor(t, e) {
    super(t), this.feature = e;
  }
}
function ym(i, t) {
  const e = [];
  for (let n = 0; n < t.length; ++n) {
    const r = t[n].getGeometry();
    Su(i, r, e);
  }
  return e;
}
function ir(i, t) {
  return ke(i[0], i[1], t[0], t[1]);
}
function dn(i, t) {
  const e = i.length;
  return t < 0 ? i[t + e] : t >= e ? i[t - e] : i[t];
}
function nr(i, t, e) {
  let n, s;
  t < e ? (n = t, s = e) : (n = e, s = t);
  const r = Math.ceil(n), o = Math.floor(s);
  if (r > o) {
    const l = fn(i, n), h = fn(i, s);
    return ir(l, h);
  }
  let a = 0;
  if (n < r) {
    const l = fn(i, n), h = dn(i, r);
    a += ir(l, h);
  }
  if (o < s) {
    const l = dn(i, o), h = fn(i, s);
    a += ir(l, h);
  }
  for (let l = r; l < o - 1; ++l) {
    const h = dn(i, l), c = dn(i, l + 1);
    a += ir(h, c);
  }
  return a;
}
function Su(i, t, e) {
  if (t instanceof Fi) {
    sr(i, t.getCoordinates(), !1, e);
    return;
  }
  if (t instanceof hl) {
    const n = t.getCoordinates();
    for (let s = 0, r = n.length; s < r; ++s)
      sr(i, n[s], !1, e);
    return;
  }
  if (t instanceof Bi) {
    const n = t.getCoordinates();
    for (let s = 0, r = n.length; s < r; ++s)
      sr(i, n[s], !0, e);
    return;
  }
  if (t instanceof oo) {
    const n = t.getCoordinates();
    for (let s = 0, r = n.length; s < r; ++s) {
      const o = n[s];
      for (let a = 0, l = o.length; a < l; ++a)
        sr(i, o[a], !0, e);
    }
    return;
  }
  if (t instanceof wu) {
    const n = t.getGeometries();
    for (let s = 0; s < n.length; ++s)
      Su(i, n[s], e);
    return;
  }
}
const Ao = { index: -1, endIndex: NaN };
function xm(i, t, e, n) {
  const s = i[0], r = i[1];
  let o = 1 / 0, a = -1, l = NaN;
  for (let u = 0; u < t.targets.length; ++u) {
    const d = t.targets[u], f = d.coordinates;
    let g = 1 / 0, m;
    for (let _ = 0; _ < f.length - 1; ++_) {
      const p = f[_], y = f[_ + 1], x = Tu(s, r, p, y);
      x.squaredDistance < g && (g = x.squaredDistance, m = _ + x.along);
    }
    g < o && (o = g, d.ring && t.targetIndex === u && (d.endIndex > d.startIndex ? m < d.startIndex && (m += f.length) : d.endIndex < d.startIndex && m > d.startIndex && (m -= f.length)), l = m, a = u);
  }
  const h = t.targets[a];
  let c = h.ring;
  if (t.targetIndex === a && c) {
    const u = fn(
      h.coordinates,
      l
    ), d = e.getPixelFromCoordinate(u);
    xr(d, t.startPx) > n && (c = !1);
  }
  if (c) {
    const u = h.coordinates, d = u.length, f = h.startIndex, g = l;
    if (f < g) {
      const m = nr(
        u,
        f,
        g
      );
      nr(
        u,
        f,
        g - d
      ) < m && (l -= d);
    } else {
      const m = nr(
        u,
        f,
        g
      );
      nr(
        u,
        f,
        g + d
      ) < m && (l += d);
    }
  }
  return Ao.index = a, Ao.endIndex = l, Ao;
}
function sr(i, t, e, n) {
  const s = i[0], r = i[1];
  for (let o = 0, a = t.length - 1; o < a; ++o) {
    const l = t[o], h = t[o + 1], c = Tu(s, r, l, h);
    if (c.squaredDistance === 0) {
      const u = o + c.along;
      n.push({
        coordinates: t,
        ring: e,
        startIndex: u,
        endIndex: u
      });
      return;
    }
  }
}
const Oo = { along: 0, squaredDistance: 0 };
function Tu(i, t, e, n) {
  const s = e[0], r = e[1], o = n[0], a = n[1], l = o - s, h = a - r;
  let c = 0, u = s, d = r;
  return (l !== 0 || h !== 0) && (c = gt(((i - s) * l + (t - r) * h) / (l * l + h * h), 0, 1), u += l * c, d += h * c), Oo.along = c, Oo.squaredDistance = Ra(ke(i, t, u, d), 10), Oo;
}
function fn(i, t) {
  const e = i.length;
  let n = Math.floor(t);
  const s = t - n;
  n >= e ? n -= e : n < 0 && (n += e);
  let r = n + 1;
  r >= e && (r -= e);
  const o = i[n], a = o[0], l = o[1], h = i[r], c = h[0] - a, u = h[1] - l;
  return [a + c * s, l + u * s];
}
class vm extends Ci {
  constructor(t) {
    const e = t;
    e.stopDown || (e.stopDown = Wi), super(e), this.on, this.once, this.un, this.shouldHandle_ = !1, this.downPx_ = null, this.downTimeout_, this.lastDragTime_, this.pointerType_, this.freehand_ = !1, this.source_ = t.source ? t.source : null, this.features_ = t.features ? t.features : null, this.snapTolerance_ = t.snapTolerance ? t.snapTolerance : 12, this.type_ = t.type, this.mode_ = Mm(this.type_), this.stopClick_ = !!t.stopClick, this.minPoints_ = t.minPoints ? t.minPoints : this.mode_ === "Polygon" ? 3 : 2, this.maxPoints_ = this.mode_ === "Circle" ? 2 : t.maxPoints ? t.maxPoints : 1 / 0, this.finishCondition_ = t.finishCondition ? t.finishCondition : ki, this.geometryLayout_ = t.geometryLayout ? t.geometryLayout : "XY";
    let n = t.geometryFunction;
    if (!n) {
      const s = this.mode_;
      if (s === "Circle")
        n = function(r, o, a) {
          const l = o || new Eu([NaN, NaN]), h = ot(r[0]), c = Ge(
            h,
            ot(r[r.length - 1])
          );
          return l.setCenterAndRadius(
            h,
            Math.sqrt(c),
            this.geometryLayout_
          ), l;
        };
      else {
        let r;
        s === "Point" ? r = he : s === "LineString" ? r = Fi : s === "Polygon" && (r = Bi), n = function(o, a, l) {
          return a ? s === "Polygon" ? o[0].length ? a.setCoordinates(
            [o[0].concat([o[0][0]])],
            this.geometryLayout_
          ) : a.setCoordinates([], this.geometryLayout_) : a.setCoordinates(o, this.geometryLayout_) : a = new r(o, this.geometryLayout_), a;
        };
      }
    }
    this.geometryFunction_ = n, this.dragVertexDelay_ = t.dragVertexDelay !== void 0 ? t.dragVertexDelay : 500, this.finishCoordinate_ = null, this.sketchFeature_ = null, this.sketchPoint_ = null, this.sketchCoords_ = null, this.sketchLine_ = null, this.sketchLineCoords_ = null, this.squaredClickTolerance_ = t.clickTolerance ? t.clickTolerance * t.clickTolerance : 36, this.overlay_ = new gi({
      source: new Be({
        useSpatialIndex: !1,
        wrapX: t.wrapX ? t.wrapX : !1
      }),
      style: t.style ? t.style : Cm(),
      updateWhileInteracting: !0
    }), this.geometryName_ = t.geometryName, this.condition_ = t.condition ? t.condition : Ja, this.freehandCondition_, t.freehand ? this.freehandCondition_ = Ir : this.freehandCondition_ = t.freehandCondition ? t.freehandCondition : Hc, this.traceCondition_, this.setTrace(t.trace || !1), this.traceState_ = { active: !1 }, this.traceSource_ = t.traceSource || t.source || null, this.addChangeListener(ia.ACTIVE, this.updateState_);
  }
  setTrace(t) {
    let e;
    t ? t === !0 ? e = Ir : e = t : e = t0, this.traceCondition_ = e;
  }
  setMap(t) {
    super.setMap(t), this.updateState_();
  }
  getOverlay() {
    return this.overlay_;
  }
  handleEvent(t) {
    t.originalEvent.type === $.CONTEXTMENU && t.originalEvent.preventDefault(), this.freehand_ = this.mode_ !== "Point" && this.freehandCondition_(t);
    let e = t.type === X.POINTERMOVE, n = !0;
    return !this.freehand_ && this.lastDragTime_ && t.type === X.POINTERDRAG && (Date.now() - this.lastDragTime_ >= this.dragVertexDelay_ ? (this.downPx_ = t.pixel, this.shouldHandle_ = !this.freehand_, e = !0) : this.lastDragTime_ = void 0, this.shouldHandle_ && this.downTimeout_ !== void 0 && (clearTimeout(this.downTimeout_), this.downTimeout_ = void 0)), this.freehand_ && t.type === X.POINTERDRAG && this.sketchFeature_ !== null ? (this.addToDrawing_(t.coordinate), n = !1) : this.freehand_ && t.type === X.POINTERDOWN ? n = !1 : e && this.getPointerCount() < 2 ? (n = t.type === X.POINTERMOVE, n && this.freehand_ ? (this.handlePointerMove_(t), this.shouldHandle_ && t.originalEvent.preventDefault()) : (t.originalEvent.pointerType === "mouse" || t.type === X.POINTERDRAG && this.downTimeout_ === void 0) && this.handlePointerMove_(t)) : t.type === X.DBLCLICK && (n = !1), super.handleEvent(t) && n;
  }
  handleDownEvent(t) {
    return this.shouldHandle_ = !this.freehand_, this.freehand_ ? (this.downPx_ = t.pixel, this.finishCoordinate_ || this.startDrawing_(t.coordinate), !0) : this.condition_(t) ? (this.lastDragTime_ = Date.now(), this.downTimeout_ = setTimeout(
      function() {
        this.handlePointerMove_(
          new Fe(
            X.POINTERMOVE,
            t.map,
            t.originalEvent,
            !1,
            t.frameState
          )
        );
      }.bind(this),
      this.dragVertexDelay_
    ), this.downPx_ = t.pixel, !0) : (this.lastDragTime_ = void 0, !1);
  }
  deactivateTrace_() {
    this.traceState_ = { active: !1 };
  }
  toggleTraceState_(t) {
    if (!this.traceSource_ || !this.traceCondition_(t))
      return;
    if (this.traceState_.active) {
      this.deactivateTrace_();
      return;
    }
    const e = this.getMap(), n = e.getCoordinateFromPixel([
      t.pixel[0] - this.snapTolerance_,
      t.pixel[1] + this.snapTolerance_
    ]), s = e.getCoordinateFromPixel([
      t.pixel[0] + this.snapTolerance_,
      t.pixel[1] - this.snapTolerance_
    ]), r = bt([n, s]), o = this.traceSource_.getFeaturesInExtent(r);
    if (o.length === 0)
      return;
    const a = ym(t.coordinate, o);
    a.length && (this.traceState_ = {
      active: !0,
      startPx: t.pixel.slice(),
      targets: a,
      targetIndex: -1
    });
  }
  addOrRemoveTracedCoordinates_(t, e) {
    const n = t.startIndex <= t.endIndex, s = t.startIndex <= e;
    n === s ? n && e > t.endIndex || !n && e < t.endIndex ? this.addTracedCoordinates_(t, t.endIndex, e) : (n && e < t.endIndex || !n && e > t.endIndex) && this.removeTracedCoordinates_(e, t.endIndex) : (this.removeTracedCoordinates_(t.startIndex, t.endIndex), this.addTracedCoordinates_(t, t.startIndex, e));
  }
  removeTracedCoordinates_(t, e) {
    if (t === e)
      return;
    let n = 0;
    if (t < e) {
      const s = Math.ceil(t);
      let r = Math.floor(e);
      r === e && (r -= 1), n = r - s + 1;
    } else {
      const s = Math.floor(t);
      let r = Math.ceil(e);
      r === e && (r += 1), n = s - r + 1;
    }
    n > 0 && this.removeLastPoints_(n);
  }
  addTracedCoordinates_(t, e, n) {
    if (e === n)
      return;
    const s = [];
    if (e < n) {
      const r = Math.ceil(e);
      let o = Math.floor(n);
      o === n && (o -= 1);
      for (let a = r; a <= o; ++a)
        s.push(dn(t.coordinates, a));
    } else {
      const r = Math.floor(e);
      let o = Math.ceil(n);
      o === n && (o += 1);
      for (let a = r; a >= o; --a)
        s.push(dn(t.coordinates, a));
    }
    s.length && this.appendCoordinates(s);
  }
  updateTrace_(t) {
    const e = this.traceState_;
    if (!e.active || e.targetIndex === -1 && xr(e.startPx, t.pixel) < this.snapTolerance_)
      return;
    const n = xm(
      t.coordinate,
      e,
      this.getMap(),
      this.snapTolerance_
    );
    if (e.targetIndex !== n.index) {
      if (e.targetIndex !== -1) {
        const l = e.targets[e.targetIndex];
        this.removeTracedCoordinates_(l.startIndex, l.endIndex);
      }
      const a = e.targets[n.index];
      this.addTracedCoordinates_(
        a,
        a.startIndex,
        n.endIndex
      );
    } else {
      const a = e.targets[e.targetIndex];
      this.addOrRemoveTracedCoordinates_(a, n.endIndex);
    }
    e.targetIndex = n.index;
    const s = e.targets[e.targetIndex];
    s.endIndex = n.endIndex;
    const r = fn(
      s.coordinates,
      s.endIndex
    ), o = this.getMap().getPixelFromCoordinate(r);
    t.coordinate = r, t.pixel = [Math.round(o[0]), Math.round(o[1])];
  }
  handleUpEvent(t) {
    let e = !0;
    if (this.getPointerCount() === 0) {
      this.downTimeout_ && (clearTimeout(this.downTimeout_), this.downTimeout_ = void 0), this.handlePointerMove_(t);
      const n = this.traceState_.active;
      if (this.toggleTraceState_(t), this.shouldHandle_) {
        const s = !this.finishCoordinate_;
        s && this.startDrawing_(t.coordinate), !s && this.freehand_ ? this.finishDrawing() : !this.freehand_ && (!s || this.mode_ === "Point") && (this.atFinish_(t.pixel, n) ? this.finishCondition_(t) && this.finishDrawing() : this.addToDrawing_(t.coordinate)), e = !1;
      } else
        this.freehand_ && this.abortDrawing();
    }
    return !e && this.stopClick_ && t.preventDefault(), e;
  }
  handlePointerMove_(t) {
    if (this.pointerType_ = t.originalEvent.pointerType, this.downPx_ && (!this.freehand_ && this.shouldHandle_ || this.freehand_ && !this.shouldHandle_)) {
      const e = this.downPx_, n = t.pixel, s = e[0] - n[0], r = e[1] - n[1], o = s * s + r * r;
      if (this.shouldHandle_ = this.freehand_ ? o > this.squaredClickTolerance_ : o <= this.squaredClickTolerance_, !this.shouldHandle_)
        return;
    }
    if (!this.finishCoordinate_) {
      this.createOrUpdateSketchPoint_(t.coordinate.slice());
      return;
    }
    this.updateTrace_(t), this.modifyDrawing_(t.coordinate);
  }
  atFinish_(t, e) {
    let n = !1;
    if (this.sketchFeature_) {
      let s = !1, r = [this.finishCoordinate_];
      const o = this.mode_;
      if (o === "Point")
        n = !0;
      else if (o === "Circle")
        n = this.sketchCoords_.length === 2;
      else if (o === "LineString")
        s = !e && this.sketchCoords_.length > this.minPoints_;
      else if (o === "Polygon") {
        const a = this.sketchCoords_;
        s = a[0].length > this.minPoints_, r = [
          a[0][0],
          a[0][a[0].length - 2]
        ], e ? r = [a[0][0]] : r = [
          a[0][0],
          a[0][a[0].length - 2]
        ];
      }
      if (s) {
        const a = this.getMap();
        for (let l = 0, h = r.length; l < h; l++) {
          const c = r[l], u = a.getPixelFromCoordinate(c), d = t[0] - u[0], f = t[1] - u[1], g = this.freehand_ ? 1 : this.snapTolerance_;
          if (n = Math.sqrt(d * d + f * f) <= g, n) {
            this.finishCoordinate_ = c;
            break;
          }
        }
      }
    }
    return n;
  }
  createOrUpdateSketchPoint_(t) {
    this.sketchPoint_ ? this.sketchPoint_.getGeometry().setCoordinates(t) : (this.sketchPoint_ = new oe(new he(t)), this.updateSketchFeatures_());
  }
  createOrUpdateCustomSketchLine_(t) {
    this.sketchLine_ || (this.sketchLine_ = new oe());
    const e = t.getLinearRing(0);
    let n = this.sketchLine_.getGeometry();
    n ? (n.setFlatCoordinates(
      e.getLayout(),
      e.getFlatCoordinates()
    ), n.changed()) : (n = new Fi(
      e.getFlatCoordinates(),
      e.getLayout()
    ), this.sketchLine_.setGeometry(n));
  }
  startDrawing_(t) {
    const e = this.getMap().getView().getProjection(), n = br(this.geometryLayout_);
    for (; t.length < n; )
      t.push(0);
    this.finishCoordinate_ = t, this.mode_ === "Point" ? this.sketchCoords_ = t.slice() : this.mode_ === "Polygon" ? (this.sketchCoords_ = [[t.slice(), t.slice()]], this.sketchLineCoords_ = this.sketchCoords_[0]) : this.sketchCoords_ = [t.slice(), t.slice()], this.sketchLineCoords_ && (this.sketchLine_ = new oe(new Fi(this.sketchLineCoords_)));
    const s = this.geometryFunction_(
      this.sketchCoords_,
      void 0,
      e
    );
    this.sketchFeature_ = new oe(), this.geometryName_ && this.sketchFeature_.setGeometryName(this.geometryName_), this.sketchFeature_.setGeometry(s), this.updateSketchFeatures_(), this.dispatchEvent(
      new er(tr.DRAWSTART, this.sketchFeature_)
    );
  }
  modifyDrawing_(t) {
    const e = this.getMap(), n = this.sketchFeature_.getGeometry(), s = e.getView().getProjection(), r = br(this.geometryLayout_);
    let o, a;
    for (; t.length < r; )
      t.push(0);
    this.mode_ === "Point" ? a = this.sketchCoords_ : this.mode_ === "Polygon" ? (o = this.sketchCoords_[0], a = o[o.length - 1], this.atFinish_(e.getPixelFromCoordinate(t)) && (t = this.finishCoordinate_.slice())) : (o = this.sketchCoords_, a = o[o.length - 1]), a[0] = t[0], a[1] = t[1], this.geometryFunction_(
      this.sketchCoords_,
      n,
      s
    ), this.sketchPoint_ && this.sketchPoint_.getGeometry().setCoordinates(t), n.getType() === "Polygon" && this.mode_ !== "Polygon" ? this.createOrUpdateCustomSketchLine_(n) : this.sketchLineCoords_ && this.sketchLine_.getGeometry().setCoordinates(this.sketchLineCoords_), this.updateSketchFeatures_();
  }
  addToDrawing_(t) {
    const e = this.sketchFeature_.getGeometry(), n = this.getMap().getView().getProjection();
    let s, r;
    const o = this.mode_;
    o === "LineString" || o === "Circle" ? (this.finishCoordinate_ = t.slice(), r = this.sketchCoords_, r.length >= this.maxPoints_ && (this.freehand_ ? r.pop() : s = !0), r.push(t.slice()), this.geometryFunction_(r, e, n)) : o === "Polygon" && (r = this.sketchCoords_[0], r.length >= this.maxPoints_ && (this.freehand_ ? r.pop() : s = !0), r.push(t.slice()), s && (this.finishCoordinate_ = r[0]), this.geometryFunction_(this.sketchCoords_, e, n)), this.createOrUpdateSketchPoint_(t.slice()), this.updateSketchFeatures_(), s && this.finishDrawing();
  }
  removeLastPoints_(t) {
    if (!this.sketchFeature_)
      return;
    const e = this.sketchFeature_.getGeometry(), n = this.getMap().getView().getProjection(), s = this.mode_;
    for (let r = 0; r < t; ++r) {
      let o;
      if (s === "LineString" || s === "Circle") {
        if (o = this.sketchCoords_, o.splice(-2, 1), o.length >= 2) {
          this.finishCoordinate_ = o[o.length - 2].slice();
          const a = this.finishCoordinate_.slice();
          o[o.length - 1] = a, this.createOrUpdateSketchPoint_(a);
        }
        this.geometryFunction_(o, e, n), e.getType() === "Polygon" && this.sketchLine_ && this.createOrUpdateCustomSketchLine_(
          e
        );
      } else if (s === "Polygon") {
        o = this.sketchCoords_[0], o.splice(-2, 1);
        const a = this.sketchLine_.getGeometry();
        if (o.length >= 2) {
          const l = o[o.length - 2].slice();
          o[o.length - 1] = l, this.createOrUpdateSketchPoint_(l);
        }
        a.setCoordinates(o), this.geometryFunction_(this.sketchCoords_, e, n);
      }
      if (o.length === 1) {
        this.abortDrawing();
        break;
      }
    }
    this.updateSketchFeatures_();
  }
  removeLastPoint() {
    this.removeLastPoints_(1);
  }
  finishDrawing() {
    const t = this.abortDrawing_();
    if (!t)
      return;
    let e = this.sketchCoords_;
    const n = t.getGeometry(), s = this.getMap().getView().getProjection();
    this.mode_ === "LineString" ? (e.pop(), this.geometryFunction_(e, n, s)) : this.mode_ === "Polygon" && (e[0].pop(), this.geometryFunction_(e, n, s), e = n.getCoordinates()), this.type_ === "MultiPoint" ? t.setGeometry(
      new ul([e])
    ) : this.type_ === "MultiLineString" ? t.setGeometry(
      new hl([e])
    ) : this.type_ === "MultiPolygon" && t.setGeometry(
      new oo([e])
    ), this.dispatchEvent(new er(tr.DRAWEND, t)), this.features_ && this.features_.push(t), this.source_ && this.source_.addFeature(t);
  }
  abortDrawing_() {
    this.finishCoordinate_ = null;
    const t = this.sketchFeature_;
    return this.sketchFeature_ = null, this.sketchPoint_ = null, this.sketchLine_ = null, this.overlay_.getSource().clear(!0), this.deactivateTrace_(), t;
  }
  abortDrawing() {
    const t = this.abortDrawing_();
    t && this.dispatchEvent(new er(tr.DRAWABORT, t));
  }
  appendCoordinates(t) {
    const e = this.mode_, n = !this.sketchFeature_;
    n && this.startDrawing_(t[0]);
    let s;
    if (e === "LineString" || e === "Circle")
      s = this.sketchCoords_;
    else if (e === "Polygon")
      s = this.sketchCoords_ && this.sketchCoords_.length ? this.sketchCoords_[0] : [];
    else
      return;
    n && s.shift(), s.pop();
    for (let o = 0; o < t.length; o++)
      this.addToDrawing_(t[o]);
    const r = t[t.length - 1];
    this.addToDrawing_(r), this.modifyDrawing_(r);
  }
  extend(t) {
    const n = t.getGeometry();
    this.sketchFeature_ = t, this.sketchCoords_ = n.getCoordinates();
    const s = this.sketchCoords_[this.sketchCoords_.length - 1];
    this.finishCoordinate_ = s.slice(), this.sketchCoords_.push(s.slice()), this.sketchPoint_ = new oe(new he(s)), this.updateSketchFeatures_(), this.dispatchEvent(
      new er(tr.DRAWSTART, this.sketchFeature_)
    );
  }
  updateSketchFeatures_() {
    const t = [];
    this.sketchFeature_ && t.push(this.sketchFeature_), this.sketchLine_ && t.push(this.sketchLine_), this.sketchPoint_ && t.push(this.sketchPoint_);
    const e = this.overlay_.getSource();
    e.clear(!0), e.addFeatures(t);
  }
  updateState_() {
    const t = this.getMap(), e = this.getActive();
    (!t || !e) && this.abortDrawing(), this.overlay_.setMap(e ? t : null);
  }
}
function Cm() {
  const i = nu();
  return function(t, e) {
    return i[t.getGeometry().getType()];
  };
}
function Mm(i) {
  switch (i) {
    case "Point":
    case "MultiPoint":
      return "Point";
    case "LineString":
    case "MultiLineString":
      return "LineString";
    case "Polygon":
    case "MultiPolygon":
      return "Polygon";
    case "Circle":
      return "Circle";
    default:
      throw new Error("Invalid type: " + i);
  }
}
const Em = vm, Rh = 0, ns = 1, Ih = [0, 0, 0, 0], vn = [], Fo = {
  MODIFYSTART: "modifystart",
  MODIFYEND: "modifyend"
};
class Do extends ie {
  constructor(t, e, n) {
    super(t), this.features = e, this.mapBrowserEvent = n;
  }
}
class wm extends Ci {
  constructor(t) {
    super(t), this.on, this.once, this.un, this.boundHandleFeatureChange_ = this.handleFeatureChange_.bind(this), this.condition_ = t.condition ? t.condition : qc, this.defaultDeleteCondition_ = function(n) {
      return Kg(n) && e0(n);
    }, this.deleteCondition_ = t.deleteCondition ? t.deleteCondition : this.defaultDeleteCondition_, this.insertVertexCondition_ = t.insertVertexCondition ? t.insertVertexCondition : Ir, this.vertexFeature_ = null, this.vertexSegments_ = null, this.lastPixel_ = [0, 0], this.ignoreNextSingleClick_ = !1, this.featuresBeingModified_ = null, this.rBush_ = new Ar(), this.pixelTolerance_ = t.pixelTolerance !== void 0 ? t.pixelTolerance : 10, this.snappedToVertex_ = !1, this.changingFeature_ = !1, this.dragSegments_ = [], this.overlay_ = new gi({
      source: new Be({
        useSpatialIndex: !1,
        wrapX: !!t.wrapX
      }),
      style: t.style ? t.style : Tm(),
      updateWhileAnimating: !0,
      updateWhileInteracting: !0
    }), this.SEGMENT_WRITERS_ = {
      Point: this.writePointGeometry_.bind(this),
      LineString: this.writeLineStringGeometry_.bind(this),
      LinearRing: this.writeLineStringGeometry_.bind(this),
      Polygon: this.writePolygonGeometry_.bind(this),
      MultiPoint: this.writeMultiPointGeometry_.bind(this),
      MultiLineString: this.writeMultiLineStringGeometry_.bind(this),
      MultiPolygon: this.writeMultiPolygonGeometry_.bind(this),
      Circle: this.writeCircleGeometry_.bind(this),
      GeometryCollection: this.writeGeometryCollectionGeometry_.bind(this)
    }, this.source_ = null, this.hitDetection_ = null;
    let e;
    if (t.features ? e = t.features : t.source && (this.source_ = t.source, e = new te(this.source_.getFeatures()), this.source_.addEventListener(
      Pt.ADDFEATURE,
      this.handleSourceAdd_.bind(this)
    ), this.source_.addEventListener(
      Pt.REMOVEFEATURE,
      this.handleSourceRemove_.bind(this)
    )), !e)
      throw new Error(
        "The modify interaction requires features, a source or a layer"
      );
    t.hitDetection && (this.hitDetection_ = t.hitDetection), this.features_ = e, this.features_.forEach(this.addFeature_.bind(this)), this.features_.addEventListener(
      Et.ADD,
      this.handleFeatureAdd_.bind(this)
    ), this.features_.addEventListener(
      Et.REMOVE,
      this.handleFeatureRemove_.bind(this)
    ), this.lastPointerEvent_ = null, this.delta_ = [0, 0], this.snapToPointer_ = t.snapToPointer === void 0 ? !this.hitDetection_ : t.snapToPointer;
  }
  addFeature_(t) {
    const e = t.getGeometry();
    if (e) {
      const s = this.SEGMENT_WRITERS_[e.getType()];
      s && s(t, e);
    }
    const n = this.getMap();
    n && n.isRendered() && this.getActive() && this.handlePointerAtPixel_(this.lastPixel_, n), t.addEventListener($.CHANGE, this.boundHandleFeatureChange_);
  }
  willModifyFeatures_(t, e) {
    if (!this.featuresBeingModified_) {
      this.featuresBeingModified_ = new te();
      const n = this.featuresBeingModified_.getArray();
      for (let s = 0, r = e.length; s < r; ++s) {
        const o = e[s];
        for (let a = 0, l = o.length; a < l; ++a) {
          const h = o[a].feature;
          h && !n.includes(h) && this.featuresBeingModified_.push(h);
        }
      }
      this.featuresBeingModified_.getLength() === 0 ? this.featuresBeingModified_ = null : this.dispatchEvent(
        new Do(
          Fo.MODIFYSTART,
          this.featuresBeingModified_,
          t
        )
      );
    }
  }
  removeFeature_(t) {
    this.removeFeatureSegmentData_(t), this.vertexFeature_ && this.features_.getLength() === 0 && (this.overlay_.getSource().removeFeature(this.vertexFeature_), this.vertexFeature_ = null), t.removeEventListener(
      $.CHANGE,
      this.boundHandleFeatureChange_
    );
  }
  removeFeatureSegmentData_(t) {
    const e = this.rBush_, n = [];
    e.forEach(
      function(s) {
        t === s.feature && n.push(s);
      }
    );
    for (let s = n.length - 1; s >= 0; --s) {
      const r = n[s];
      for (let o = this.dragSegments_.length - 1; o >= 0; --o)
        this.dragSegments_[o][0] === r && this.dragSegments_.splice(o, 1);
      e.remove(r);
    }
  }
  setActive(t) {
    this.vertexFeature_ && !t && (this.overlay_.getSource().removeFeature(this.vertexFeature_), this.vertexFeature_ = null), super.setActive(t);
  }
  setMap(t) {
    this.overlay_.setMap(t), super.setMap(t);
  }
  getOverlay() {
    return this.overlay_;
  }
  handleSourceAdd_(t) {
    t.feature && this.features_.push(t.feature);
  }
  handleSourceRemove_(t) {
    t.feature && this.features_.remove(t.feature);
  }
  handleFeatureAdd_(t) {
    this.addFeature_(t.element);
  }
  handleFeatureChange_(t) {
    if (!this.changingFeature_) {
      const e = t.target;
      this.removeFeature_(e), this.addFeature_(e);
    }
  }
  handleFeatureRemove_(t) {
    this.removeFeature_(t.element);
  }
  writePointGeometry_(t, e) {
    const n = e.getCoordinates(), s = {
      feature: t,
      geometry: e,
      segment: [n, n]
    };
    this.rBush_.insert(e.getExtent(), s);
  }
  writeMultiPointGeometry_(t, e) {
    const n = e.getCoordinates();
    for (let s = 0, r = n.length; s < r; ++s) {
      const o = n[s], a = {
        feature: t,
        geometry: e,
        depth: [s],
        index: s,
        segment: [o, o]
      };
      this.rBush_.insert(e.getExtent(), a);
    }
  }
  writeLineStringGeometry_(t, e) {
    const n = e.getCoordinates();
    for (let s = 0, r = n.length - 1; s < r; ++s) {
      const o = n.slice(s, s + 2), a = {
        feature: t,
        geometry: e,
        index: s,
        segment: o
      };
      this.rBush_.insert(bt(o), a);
    }
  }
  writeMultiLineStringGeometry_(t, e) {
    const n = e.getCoordinates();
    for (let s = 0, r = n.length; s < r; ++s) {
      const o = n[s];
      for (let a = 0, l = o.length - 1; a < l; ++a) {
        const h = o.slice(a, a + 2), c = {
          feature: t,
          geometry: e,
          depth: [s],
          index: a,
          segment: h
        };
        this.rBush_.insert(bt(h), c);
      }
    }
  }
  writePolygonGeometry_(t, e) {
    const n = e.getCoordinates();
    for (let s = 0, r = n.length; s < r; ++s) {
      const o = n[s];
      for (let a = 0, l = o.length - 1; a < l; ++a) {
        const h = o.slice(a, a + 2), c = {
          feature: t,
          geometry: e,
          depth: [s],
          index: a,
          segment: h
        };
        this.rBush_.insert(bt(h), c);
      }
    }
  }
  writeMultiPolygonGeometry_(t, e) {
    const n = e.getCoordinates();
    for (let s = 0, r = n.length; s < r; ++s) {
      const o = n[s];
      for (let a = 0, l = o.length; a < l; ++a) {
        const h = o[a];
        for (let c = 0, u = h.length - 1; c < u; ++c) {
          const d = h.slice(c, c + 2), f = {
            feature: t,
            geometry: e,
            depth: [a, s],
            index: c,
            segment: d
          };
          this.rBush_.insert(bt(d), f);
        }
      }
    }
  }
  writeCircleGeometry_(t, e) {
    const n = e.getCenter(), s = {
      feature: t,
      geometry: e,
      index: Rh,
      segment: [n, n]
    }, r = {
      feature: t,
      geometry: e,
      index: ns,
      segment: [n, n]
    }, o = [s, r];
    s.featureSegments = o, r.featureSegments = o, this.rBush_.insert(Qn(n), s);
    let a = e;
    this.rBush_.insert(a.getExtent(), r);
  }
  writeGeometryCollectionGeometry_(t, e) {
    const n = e.getGeometriesArray();
    for (let s = 0; s < n.length; ++s) {
      const r = n[s], o = this.SEGMENT_WRITERS_[r.getType()];
      o(t, r);
    }
  }
  createOrUpdateVertexFeature_(t, e, n) {
    let s = this.vertexFeature_;
    return s ? s.getGeometry().setCoordinates(t) : (s = new oe(new he(t)), this.vertexFeature_ = s, this.overlay_.getSource().addFeature(s)), s.set("features", e), s.set("geometries", n), s;
  }
  handleEvent(t) {
    if (!t.originalEvent)
      return !0;
    this.lastPointerEvent_ = t;
    let e;
    return !t.map.getView().getInteracting() && t.type == X.POINTERMOVE && !this.handlingDownUpSequence && this.handlePointerMove_(t), this.vertexFeature_ && this.deleteCondition_(t) && (t.type != X.SINGLECLICK || !this.ignoreNextSingleClick_ ? e = this.removePoint() : e = !0), t.type == X.SINGLECLICK && (this.ignoreNextSingleClick_ = !1), super.handleEvent(t) && !e;
  }
  handleDragEvent(t) {
    this.ignoreNextSingleClick_ = !1, this.willModifyFeatures_(t, this.dragSegments_);
    const e = [
      t.coordinate[0] + this.delta_[0],
      t.coordinate[1] + this.delta_[1]
    ], n = [], s = [];
    for (let r = 0, o = this.dragSegments_.length; r < o; ++r) {
      const a = this.dragSegments_[r], l = a[0], h = l.feature;
      n.includes(h) || n.push(h);
      const c = l.geometry;
      s.includes(c) || s.push(c);
      const u = l.depth;
      let d;
      const f = l.segment, g = a[1];
      for (; e.length < c.getStride(); )
        e.push(f[g][e.length]);
      switch (c.getType()) {
        case "Point":
          d = e, f[0] = e, f[1] = e;
          break;
        case "MultiPoint":
          d = c.getCoordinates(), d[l.index] = e, f[0] = e, f[1] = e;
          break;
        case "LineString":
          d = c.getCoordinates(), d[l.index + g] = e, f[g] = e;
          break;
        case "MultiLineString":
          d = c.getCoordinates(), d[u[0]][l.index + g] = e, f[g] = e;
          break;
        case "Polygon":
          d = c.getCoordinates(), d[u[0]][l.index + g] = e, f[g] = e;
          break;
        case "MultiPolygon":
          d = c.getCoordinates(), d[u[1]][u[0]][l.index + g] = e, f[g] = e;
          break;
        case "Circle":
          if (f[0] = e, f[1] = e, l.index === Rh)
            this.changingFeature_ = !0, c.setCenter(e), this.changingFeature_ = !1;
          else {
            this.changingFeature_ = !0, t.map.getView().getProjection();
            let m = xr(
              ot(c.getCenter()),
              ot(e)
            );
            c.setRadius(m), this.changingFeature_ = !1;
          }
          break;
      }
      d && this.setGeometryCoordinates_(c, d);
    }
    this.createOrUpdateVertexFeature_(e, n, s);
  }
  handleDownEvent(t) {
    if (!this.condition_(t))
      return !1;
    const e = t.coordinate;
    this.handlePointerAtPixel_(t.pixel, t.map, e), this.dragSegments_.length = 0, this.featuresBeingModified_ = null;
    const n = this.vertexFeature_;
    if (n) {
      t.map.getView().getProjection();
      const s = [], r = n.getGeometry().getCoordinates(), o = bt([r]), a = this.rBush_.getInExtent(o), l = {};
      a.sort(Sm);
      for (let h = 0, c = a.length; h < c; ++h) {
        const u = a[h], d = u.segment;
        let f = j(u.geometry);
        const g = u.depth;
        if (g && (f += "-" + g.join("-")), l[f] || (l[f] = new Array(2)), u.geometry.getType() === "Circle" && u.index === ns) {
          const m = Ph(
            e,
            u
          );
          re(m, r) && !l[f][0] && (this.dragSegments_.push([u, 0]), l[f][0] = u);
          continue;
        }
        if (re(d[0], r) && !l[f][0]) {
          this.dragSegments_.push([u, 0]), l[f][0] = u;
          continue;
        }
        if (re(d[1], r) && !l[f][1]) {
          if (l[f][0] && l[f][0].index === 0) {
            let m = u.geometry.getCoordinates();
            switch (u.geometry.getType()) {
              case "LineString":
              case "MultiLineString":
                continue;
              case "MultiPolygon":
                m = m[g[1]];
              case "Polygon":
                if (u.index !== m[g[0]].length - 2)
                  continue;
                break;
            }
          }
          this.dragSegments_.push([u, 1]), l[f][1] = u;
          continue;
        }
        j(d) in this.vertexSegments_ && !l[f][0] && !l[f][1] && this.insertVertexCondition_(t) && s.push(u);
      }
      s.length && this.willModifyFeatures_(t, [s]);
      for (let h = s.length - 1; h >= 0; --h)
        this.insertVertex_(s[h], r);
    }
    return !!this.vertexFeature_;
  }
  handleUpEvent(t) {
    for (let e = this.dragSegments_.length - 1; e >= 0; --e) {
      const n = this.dragSegments_[e][0], s = n.geometry;
      if (s.getType() === "Circle") {
        const r = s.getCenter(), o = n.featureSegments[0], a = n.featureSegments[1];
        o.segment[0] = r, o.segment[1] = r, a.segment[0] = r, a.segment[1] = r, this.rBush_.update(Qn(r), o);
        let l = s;
        this.rBush_.update(
          l.getExtent(),
          a
        );
      } else
        this.rBush_.update(bt(n.segment), n);
    }
    return this.featuresBeingModified_ && (this.dispatchEvent(
      new Do(
        Fo.MODIFYEND,
        this.featuresBeingModified_,
        t
      )
    ), this.featuresBeingModified_ = null), !1;
  }
  handlePointerMove_(t) {
    this.lastPixel_ = t.pixel, this.handlePointerAtPixel_(t.pixel, t.map, t.coordinate);
  }
  handlePointerAtPixel_(t, e, n) {
    const s = n || e.getCoordinateFromPixel(t);
    e.getView().getProjection();
    const r = function(l, h) {
      return Lh(s, l) - Lh(s, h);
    };
    let o, a;
    if (this.hitDetection_) {
      const l = typeof this.hitDetection_ == "object" ? (h) => h === this.hitDetection_ : void 0;
      e.forEachFeatureAtPixel(
        t,
        (h, c, u) => {
          if (u = u || h.getGeometry(), u.getType() === "Point" && this.features_.getArray().includes(h)) {
            a = u;
            const d = u.getFlatCoordinates().slice(0, 2);
            o = [
              {
                feature: h,
                geometry: u,
                segment: [d, d]
              }
            ];
          }
          return !0;
        },
        { layerFilter: l }
      );
    }
    if (!o) {
      const l = ni(
        Qn(s, Ih)
      ), h = e.getView().getResolution() * this.pixelTolerance_, c = ka(
        ws(l, h, Ih)
      );
      o = this.rBush_.getInExtent(c);
    }
    if (o && o.length > 0) {
      const l = o.sort(r)[0], h = l.segment;
      let c = Ph(s, l);
      const u = e.getPixelFromCoordinate(c);
      let d = xr(t, u);
      if (a || d <= this.pixelTolerance_) {
        const f = {};
        if (f[j(h)] = !0, this.snapToPointer_ || (this.delta_[0] = c[0] - s[0], this.delta_[1] = c[1] - s[1]), l.geometry.getType() === "Circle" && l.index === ns)
          this.snappedToVertex_ = !0, this.createOrUpdateVertexFeature_(
            c,
            [l.feature],
            [l.geometry]
          );
        else {
          const g = e.getPixelFromCoordinate(h[0]), m = e.getPixelFromCoordinate(h[1]), _ = Ge(u, g), p = Ge(u, m);
          d = Math.sqrt(Math.min(_, p)), this.snappedToVertex_ = d <= this.pixelTolerance_, this.snappedToVertex_ && (c = _ > p ? h[1] : h[0]), this.createOrUpdateVertexFeature_(
            c,
            [l.feature],
            [l.geometry]
          );
          const y = {};
          y[j(l.geometry)] = !0;
          for (let x = 1, v = o.length; x < v; ++x) {
            const C = o[x].segment;
            if (re(h[0], C[0]) && re(h[1], C[1]) || re(h[0], C[1]) && re(h[1], C[0])) {
              const M = j(o[x].geometry);
              M in y || (y[M] = !0, f[j(C)] = !0);
            } else
              break;
          }
        }
        this.vertexSegments_ = f;
        return;
      }
    }
    this.vertexFeature_ && (this.overlay_.getSource().removeFeature(this.vertexFeature_), this.vertexFeature_ = null);
  }
  insertVertex_(t, e) {
    const n = t.segment, s = t.feature, r = t.geometry, o = t.depth, a = t.index;
    let l;
    for (; e.length < r.getStride(); )
      e.push(0);
    switch (r.getType()) {
      case "MultiLineString":
        l = r.getCoordinates(), l[o[0]].splice(a + 1, 0, e);
        break;
      case "Polygon":
        l = r.getCoordinates(), l[o[0]].splice(a + 1, 0, e);
        break;
      case "MultiPolygon":
        l = r.getCoordinates(), l[o[1]][o[0]].splice(a + 1, 0, e);
        break;
      case "LineString":
        l = r.getCoordinates(), l.splice(a + 1, 0, e);
        break;
      default:
        return;
    }
    this.setGeometryCoordinates_(r, l);
    const h = this.rBush_;
    h.remove(t), this.updateSegmentIndices_(r, a, o, 1);
    const c = {
      segment: [n[0], e],
      feature: s,
      geometry: r,
      depth: o,
      index: a
    };
    h.insert(bt(c.segment), c), this.dragSegments_.push([c, 1]);
    const u = {
      segment: [e, n[1]],
      feature: s,
      geometry: r,
      depth: o,
      index: a + 1
    };
    h.insert(bt(u.segment), u), this.dragSegments_.push([u, 0]), this.ignoreNextSingleClick_ = !0;
  }
  removePoint() {
    if (this.lastPointerEvent_ && this.lastPointerEvent_.type != X.POINTERDRAG) {
      const t = this.lastPointerEvent_;
      this.willModifyFeatures_(t, this.dragSegments_);
      const e = this.removeVertex_();
      return this.featuresBeingModified_ && this.dispatchEvent(
        new Do(
          Fo.MODIFYEND,
          this.featuresBeingModified_,
          t
        )
      ), this.featuresBeingModified_ = null, e;
    }
    return !1;
  }
  removeVertex_() {
    const t = this.dragSegments_, e = {};
    let n = !1, s, r, o, a, l, h, c, u, d, f, g;
    for (l = t.length - 1; l >= 0; --l)
      o = t[l], f = o[0], g = j(f.feature), f.depth && (g += "-" + f.depth.join("-")), g in e || (e[g] = {}), o[1] === 0 ? (e[g].right = f, e[g].index = f.index) : o[1] == 1 && (e[g].left = f, e[g].index = f.index + 1);
    for (g in e) {
      switch (d = e[g].right, c = e[g].left, h = e[g].index, u = h - 1, c !== void 0 ? f = c : f = d, u < 0 && (u = 0), a = f.geometry, r = a.getCoordinates(), s = r, n = !1, a.getType()) {
        case "MultiLineString":
          r[f.depth[0]].length > 2 && (r[f.depth[0]].splice(h, 1), n = !0);
          break;
        case "LineString":
          r.length > 2 && (r.splice(h, 1), n = !0);
          break;
        case "MultiPolygon":
          s = s[f.depth[1]];
        case "Polygon":
          s = s[f.depth[0]], s.length > 4 && (h == s.length - 1 && (h = 0), s.splice(h, 1), n = !0, h === 0 && (s.pop(), s.push(s[0]), u = s.length - 1));
          break;
      }
      if (n) {
        this.setGeometryCoordinates_(a, r);
        const m = [];
        if (c !== void 0 && (this.rBush_.remove(c), m.push(c.segment[0])), d !== void 0 && (this.rBush_.remove(d), m.push(d.segment[1])), c !== void 0 && d !== void 0) {
          const _ = {
            depth: f.depth,
            feature: f.feature,
            geometry: f.geometry,
            index: u,
            segment: m
          };
          this.rBush_.insert(
            bt(_.segment),
            _
          );
        }
        this.updateSegmentIndices_(a, h, f.depth, -1), this.vertexFeature_ && (this.overlay_.getSource().removeFeature(this.vertexFeature_), this.vertexFeature_ = null), t.length = 0;
      }
    }
    return n;
  }
  setGeometryCoordinates_(t, e) {
    this.changingFeature_ = !0, t.setCoordinates(e), this.changingFeature_ = !1;
  }
  updateSegmentIndices_(t, e, n, s) {
    this.rBush_.forEachInExtent(
      t.getExtent(),
      function(r) {
        r.geometry === t && (n === void 0 || r.depth === void 0 || xi(r.depth, n)) && r.index > e && (r.index += s);
      }
    );
  }
}
function Sm(i, t) {
  return i.index - t.index;
}
function Lh(i, t, e) {
  const n = t.geometry;
  if (n.getType() === "Circle") {
    let r = n;
    if (t.index === ns) {
      const o = Ge(
        r.getCenter(),
        ot(i)
      ), a = Math.sqrt(o) - r.getRadius();
      return a * a;
    }
  }
  const s = ot(i);
  return vn[0] = ot(t.segment[0]), vn[1] = ot(t.segment[1]), mf(s, vn);
}
function Ph(i, t, e) {
  const n = t.geometry;
  if (n.getType() === "Circle" && t.index === ns)
    return In(
      n.getClosestPoint(
        ot(i)
      )
    );
  const s = ot(i);
  return vn[0] = ot(t.segment[0]), vn[1] = ot(t.segment[1]), In(
    La(s, vn)
  );
}
function Tm() {
  const i = nu();
  return function(t, e) {
    return i.Point;
  };
}
const bm = wm;
function Ah(i) {
  if (i.feature)
    return i.feature;
  if (i.element)
    return i.element;
}
const No = [];
class Rm extends Ci {
  constructor(t) {
    t = t || {};
    const e = t;
    e.handleDownEvent || (e.handleDownEvent = ki), e.stopDown || (e.stopDown = Wi), super(e), this.source_ = t.source ? t.source : null, this.vertex_ = t.vertex !== void 0 ? t.vertex : !0, this.edge_ = t.edge !== void 0 ? t.edge : !0, this.features_ = t.features ? t.features : null, this.featuresListenerKeys_ = [], this.featureChangeListenerKeys_ = {}, this.indexedFeaturesExtents_ = {}, this.pendingFeatures_ = {}, this.pixelTolerance_ = t.pixelTolerance !== void 0 ? t.pixelTolerance : 10, this.rBush_ = new Ar(), this.GEOMETRY_SEGMENTERS_ = {
      Point: this.segmentPointGeometry_.bind(this),
      LineString: this.segmentLineStringGeometry_.bind(this),
      LinearRing: this.segmentLineStringGeometry_.bind(this),
      Polygon: this.segmentPolygonGeometry_.bind(this),
      MultiPoint: this.segmentMultiPointGeometry_.bind(this),
      MultiLineString: this.segmentMultiLineStringGeometry_.bind(this),
      MultiPolygon: this.segmentMultiPolygonGeometry_.bind(this),
      GeometryCollection: this.segmentGeometryCollectionGeometry_.bind(this),
      Circle: this.segmentCircleGeometry_.bind(this)
    };
  }
  addFeature(t, e) {
    e = e !== void 0 ? e : !0;
    const n = j(t), s = t.getGeometry();
    if (s) {
      const r = this.GEOMETRY_SEGMENTERS_[s.getType()];
      if (r) {
        this.indexedFeaturesExtents_[n] = s.getExtent(
          Gt()
        );
        const o = [];
        if (r(o, s), o.length === 1)
          this.rBush_.insert(bt(o[0]), {
            feature: t,
            segment: o[0]
          });
        else if (o.length > 1) {
          const a = o.map((h) => bt(h)), l = o.map((h) => ({
            feature: t,
            segment: h
          }));
          this.rBush_.load(a, l);
        }
      }
    }
    e && (this.featureChangeListenerKeys_[n] = W(
      t,
      $.CHANGE,
      this.handleFeatureChange_,
      this
    ));
  }
  forEachFeatureAdd_(t) {
    this.addFeature(t);
  }
  forEachFeatureRemove_(t) {
    this.removeFeature(t);
  }
  getFeatures_() {
    let t;
    return this.features_ ? t = this.features_ : this.source_ && (t = this.source_.getFeatures()), t;
  }
  handleEvent(t) {
    const e = this.snapTo(t.pixel, t.coordinate, t.map);
    return e && (t.coordinate = e.vertex.slice(0, 2), t.pixel = e.vertexPixel), super.handleEvent(t);
  }
  handleFeatureAdd_(t) {
    const e = Ah(t);
    this.addFeature(e);
  }
  handleFeatureRemove_(t) {
    const e = Ah(t);
    this.removeFeature(e);
  }
  handleFeatureChange_(t) {
    const e = t.target;
    if (this.handlingDownUpSequence) {
      const n = j(e);
      n in this.pendingFeatures_ || (this.pendingFeatures_[n] = e);
    } else
      this.updateFeature_(e);
  }
  handleUpEvent(t) {
    const e = Object.values(this.pendingFeatures_);
    return e.length && (e.forEach(this.updateFeature_.bind(this)), this.pendingFeatures_ = {}), !1;
  }
  removeFeature(t, e) {
    const n = e !== void 0 ? e : !0, s = j(t), r = this.indexedFeaturesExtents_[s];
    if (r) {
      const o = this.rBush_, a = [];
      o.forEachInExtent(r, function(l) {
        t === l.feature && a.push(l);
      });
      for (let l = a.length - 1; l >= 0; --l)
        o.remove(a[l]);
    }
    n && (it(this.featureChangeListenerKeys_[s]), delete this.featureChangeListenerKeys_[s]);
  }
  setMap(t) {
    const e = this.getMap(), n = this.featuresListenerKeys_, s = this.getFeatures_();
    e && (n.forEach(it), n.length = 0, s.forEach(this.forEachFeatureRemove_.bind(this))), super.setMap(t), t && (this.features_ ? n.push(
      W(
        this.features_,
        Et.ADD,
        this.handleFeatureAdd_,
        this
      ),
      W(
        this.features_,
        Et.REMOVE,
        this.handleFeatureRemove_,
        this
      )
    ) : this.source_ && n.push(
      W(
        this.source_,
        Pt.ADDFEATURE,
        this.handleFeatureAdd_,
        this
      ),
      W(
        this.source_,
        Pt.REMOVEFEATURE,
        this.handleFeatureRemove_,
        this
      )
    ), s.forEach(this.forEachFeatureAdd_.bind(this)));
  }
  snapTo(t, e, n) {
    const s = n.getCoordinateFromPixel([
      t[0] - this.pixelTolerance_,
      t[1] + this.pixelTolerance_
    ]), r = n.getCoordinateFromPixel([
      t[0] + this.pixelTolerance_,
      t[1] - this.pixelTolerance_
    ]), o = bt([s, r]), a = this.rBush_.getInExtent(o), l = a.length;
    if (l === 0)
      return null;
    n.getView().getProjection();
    const h = ot(e);
    let c, u = 1 / 0;
    const d = this.pixelTolerance_ * this.pixelTolerance_, f = () => {
      if (c) {
        const g = n.getPixelFromCoordinate(c);
        if (Ge(t, g) <= d)
          return {
            vertex: c,
            vertexPixel: [
              Math.round(g[0]),
              Math.round(g[1])
            ]
          };
      }
      return null;
    };
    if (this.vertex_) {
      for (let m = 0; m < l; ++m) {
        const _ = a[m];
        _.feature.getGeometry().getType() !== "Circle" && _.segment.forEach((p) => {
          const y = ot(p), x = Ge(h, y);
          x < u && (c = p, u = x);
        });
      }
      const g = f();
      if (g)
        return g;
    }
    if (this.edge_) {
      for (let m = 0; m < l; ++m) {
        let _ = null;
        const p = a[m];
        if (p.feature.getGeometry().getType() === "Circle") {
          let y = p.feature.getGeometry();
          _ = In(
            gf(
              h,
              y
            )
          );
        } else {
          const [y, x] = p.segment;
          x && (No[0] = ot(y), No[1] = ot(x), _ = La(h, No));
        }
        if (_) {
          const y = Ge(h, _);
          y < u && (c = _, u = y);
        }
      }
      const g = f();
      if (g)
        return g;
    }
    return null;
  }
  updateFeature_(t) {
    this.removeFeature(t, !1), this.addFeature(t, !1);
  }
  segmentCircleGeometry_(t, e) {
    this.getMap().getView().getProjection();
    const r = Ag(e).getCoordinates()[0];
    for (let o = 0, a = r.length - 1; o < a; ++o)
      t.push(r.slice(o, o + 2));
  }
  segmentGeometryCollectionGeometry_(t, e) {
    const n = e.getGeometriesArray();
    for (let s = 0; s < n.length; ++s) {
      const r = this.GEOMETRY_SEGMENTERS_[n[s].getType()];
      r && r(t, n[s]);
    }
  }
  segmentLineStringGeometry_(t, e) {
    const n = e.getCoordinates();
    for (let s = 0, r = n.length - 1; s < r; ++s)
      t.push(n.slice(s, s + 2));
  }
  segmentMultiLineStringGeometry_(t, e) {
    const n = e.getCoordinates();
    for (let s = 0, r = n.length; s < r; ++s) {
      const o = n[s];
      for (let a = 0, l = o.length - 1; a < l; ++a)
        t.push(o.slice(a, a + 2));
    }
  }
  segmentMultiPointGeometry_(t, e) {
    e.getCoordinates().forEach((n) => {
      t.push([n]);
    });
  }
  segmentMultiPolygonGeometry_(t, e) {
    const n = e.getCoordinates();
    for (let s = 0, r = n.length; s < r; ++s) {
      const o = n[s];
      for (let a = 0, l = o.length; a < l; ++a) {
        const h = o[a];
        for (let c = 0, u = h.length - 1; c < u; ++c)
          t.push(h.slice(c, c + 2));
      }
    }
  }
  segmentPointGeometry_(t, e) {
    t.push([e.getCoordinates()]);
  }
  segmentPolygonGeometry_(t, e) {
    const n = e.getCoordinates();
    for (let s = 0, r = n.length; s < r; ++s) {
      const o = n[s];
      for (let a = 0, l = o.length - 1; a < l; ++a)
        t.push(o.slice(a, a + 2));
    }
  }
}
const Im = Rm, Lm = 0.5, Pm = 10, Oh = 0.25;
class Am {
  constructor(t, e, n, s, r, o) {
    this.sourceProj_ = t, this.targetProj_ = e;
    let a = {};
    const l = ms(this.targetProj_, this.sourceProj_);
    this.transformInv_ = function(y) {
      const x = y[0] + "/" + y[1];
      return a[x] || (a[x] = l(y)), a[x];
    }, this.maxSourceExtent_ = s, this.errorThresholdSquared_ = r * r, this.triangles_ = [], this.wrapsXInSource_ = !1, this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!s && !!this.sourceProj_.getExtent() && at(s) == at(this.sourceProj_.getExtent()), this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? at(this.sourceProj_.getExtent()) : null, this.targetWorldWidth_ = this.targetProj_.getExtent() ? at(this.targetProj_.getExtent()) : null;
    const h = Zi(n), c = qr(n), u = Yr(n), d = Hr(n), f = this.transformInv_(h), g = this.transformInv_(c), m = this.transformInv_(u), _ = this.transformInv_(d), p = Pm + (o ? Math.max(
      0,
      Math.ceil(
        Math.log2(
          Uo(n) / (o * o * 256 * 256)
        )
      )
    ) : 0);
    if (this.addQuad_(
      h,
      c,
      u,
      d,
      f,
      g,
      m,
      _,
      p
    ), this.wrapsXInSource_) {
      let y = 1 / 0;
      this.triangles_.forEach(function(x, v, C) {
        y = Math.min(
          y,
          x.source[0][0],
          x.source[1][0],
          x.source[2][0]
        );
      }), this.triangles_.forEach(
        function(x) {
          if (Math.max(
            x.source[0][0],
            x.source[1][0],
            x.source[2][0]
          ) - y > this.sourceWorldWidth_ / 2) {
            const v = [
              [x.source[0][0], x.source[0][1]],
              [x.source[1][0], x.source[1][1]],
              [x.source[2][0], x.source[2][1]]
            ];
            v[0][0] - y > this.sourceWorldWidth_ / 2 && (v[0][0] -= this.sourceWorldWidth_), v[1][0] - y > this.sourceWorldWidth_ / 2 && (v[1][0] -= this.sourceWorldWidth_), v[2][0] - y > this.sourceWorldWidth_ / 2 && (v[2][0] -= this.sourceWorldWidth_);
            const C = Math.min(
              v[0][0],
              v[1][0],
              v[2][0]
            );
            Math.max(
              v[0][0],
              v[1][0],
              v[2][0]
            ) - C < this.sourceWorldWidth_ / 2 && (x.source = v);
          }
        }.bind(this)
      );
    }
    a = {};
  }
  addTriangle_(t, e, n, s, r, o) {
    this.triangles_.push({
      source: [s, r, o],
      target: [t, e, n]
    });
  }
  addQuad_(t, e, n, s, r, o, a, l, h) {
    const c = bt([r, o, a, l]), u = this.sourceWorldWidth_ ? at(c) / this.sourceWorldWidth_ : null, d = this.sourceWorldWidth_, f = this.sourceProj_.canWrapX() && u > 0.5 && u < 1;
    let g = !1;
    if (h > 0) {
      if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
        const _ = bt([t, e, n, s]);
        g = at(_) / this.targetWorldWidth_ > Oh || g;
      }
      !f && this.sourceProj_.isGlobal() && u && (g = u > Oh || g);
    }
    if (!g && this.maxSourceExtent_ && isFinite(c[0]) && isFinite(c[1]) && isFinite(c[2]) && isFinite(c[3]) && !Ot(c, this.maxSourceExtent_))
      return;
    let m = 0;
    if (!g && (!isFinite(r[0]) || !isFinite(r[1]) || !isFinite(o[0]) || !isFinite(o[1]) || !isFinite(a[0]) || !isFinite(a[1]) || !isFinite(l[0]) || !isFinite(l[1]))) {
      if (h > 0)
        g = !0;
      else if (m = (!isFinite(r[0]) || !isFinite(r[1]) ? 8 : 0) + (!isFinite(o[0]) || !isFinite(o[1]) ? 4 : 0) + (!isFinite(a[0]) || !isFinite(a[1]) ? 2 : 0) + (!isFinite(l[0]) || !isFinite(l[1]) ? 1 : 0), m != 1 && m != 2 && m != 4 && m != 8)
        return;
    }
    if (h > 0) {
      if (!g) {
        const _ = [(t[0] + n[0]) / 2, (t[1] + n[1]) / 2], p = this.transformInv_(_);
        let y;
        f ? y = (Ai(r[0], d) + Ai(a[0], d)) / 2 - Ai(p[0], d) : y = (r[0] + a[0]) / 2 - p[0];
        const x = (r[1] + a[1]) / 2 - p[1];
        g = y * y + x * x > this.errorThresholdSquared_;
      }
      if (g) {
        if (Math.abs(t[0] - n[0]) <= Math.abs(t[1] - n[1])) {
          const _ = [(e[0] + n[0]) / 2, (e[1] + n[1]) / 2], p = this.transformInv_(_), y = [(s[0] + t[0]) / 2, (s[1] + t[1]) / 2], x = this.transformInv_(y);
          this.addQuad_(
            t,
            e,
            _,
            y,
            r,
            o,
            p,
            x,
            h - 1
          ), this.addQuad_(
            y,
            _,
            n,
            s,
            x,
            p,
            a,
            l,
            h - 1
          );
        } else {
          const _ = [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2], p = this.transformInv_(_), y = [(n[0] + s[0]) / 2, (n[1] + s[1]) / 2], x = this.transformInv_(y);
          this.addQuad_(
            t,
            _,
            y,
            s,
            r,
            p,
            x,
            l,
            h - 1
          ), this.addQuad_(
            _,
            e,
            n,
            y,
            p,
            o,
            a,
            x,
            h - 1
          );
        }
        return;
      }
    }
    if (f) {
      if (!this.canWrapXInSource_)
        return;
      this.wrapsXInSource_ = !0;
    }
    (m & 11) == 0 && this.addTriangle_(t, n, s, r, a, l), (m & 14) == 0 && this.addTriangle_(t, n, e, r, a, o), m && ((m & 13) == 0 && this.addTriangle_(e, s, t, o, l, r), (m & 7) == 0 && this.addTriangle_(e, s, n, o, l, a));
  }
  calculateSourceExtent() {
    const t = Gt();
    return this.triangles_.forEach(function(e, n, s) {
      const r = e.source;
      ts(t, r[0]), ts(t, r[1]), ts(t, r[2]);
    }), t;
  }
  getTriangles() {
    return this.triangles_;
  }
}
const Om = Am;
let ko;
const bu = [];
function Fh(i, t, e, n, s) {
  i.beginPath(), i.moveTo(0, 0), i.lineTo(t, e), i.lineTo(n, s), i.closePath(), i.save(), i.clip(), i.fillRect(0, 0, Math.max(t, n) + 1, Math.max(e, s)), i.restore();
}
function Go(i, t) {
  return Math.abs(i[t * 4] - 210) > 2 || Math.abs(i[t * 4 + 3] - 0.75 * 255) > 2;
}
function Fm() {
  if (ko === void 0) {
    const i = document.createElement("canvas").getContext("2d");
    i.globalCompositeOperation = "lighter", i.fillStyle = "rgba(210, 0, 0, 0.75)", Fh(i, 4, 5, 4, 0), Fh(i, 4, 5, 0, 5);
    const t = i.getImageData(0, 0, 3, 3).data;
    ko = Go(t, 0) || Go(t, 4) || Go(t, 8);
  }
  return ko;
}
function Dh(i, t, e, n) {
  const s = ig(e, t, i);
  let r = Tr(
    t,
    n,
    e
  );
  const o = t.getMetersPerUnit();
  o !== void 0 && (r *= o);
  const a = i.getMetersPerUnit();
  a !== void 0 && (r /= a);
  const l = i.getExtent();
  if (!l || Xr(l, s)) {
    const h = Tr(i, r, s) / r;
    isFinite(h) && h > 0 && (r /= h);
  }
  return r;
}
function Dm(i, t, e, n) {
  const s = di(e);
  let r = Dh(
    i,
    t,
    s,
    n
  );
  return (!isFinite(r) || r <= 0) && Ta(e, function(o) {
    return r = Dh(
      i,
      t,
      o,
      n
    ), isFinite(r) && r > 0;
  }), r;
}
function Nm(i, t, e, n, s, r, o, a, l, h, c, u) {
  const d = Xt(
    Math.round(e * i),
    Math.round(e * t),
    bu
  );
  if (u || (d.imageSmoothingEnabled = !1), l.length === 0)
    return d.canvas;
  d.scale(e, e);
  function f(v) {
    return Math.round(v * e) / e;
  }
  d.globalCompositeOperation = "lighter";
  const g = Gt();
  l.forEach(function(v, C, M) {
    _c(g, v.extent);
  });
  const m = at(g), _ = Ce(g), p = Xt(
    Math.round(e * m / n),
    Math.round(e * _ / n)
  );
  u || (p.imageSmoothingEnabled = !1);
  const y = e / n;
  l.forEach(function(v, C, M) {
    const w = v.extent[0] - g[0], T = -(v.extent[3] - g[3]), P = at(v.extent), F = Ce(v.extent);
    v.image.width > 0 && v.image.height > 0 && p.drawImage(
      v.image,
      h,
      h,
      v.image.width - 2 * h,
      v.image.height - 2 * h,
      w * y,
      T * y,
      P * y,
      F * y
    );
  });
  const x = Zi(o);
  return a.getTriangles().forEach(function(v, C, M) {
    const w = v.source, T = v.target;
    let P = w[0][0], F = w[0][1], G = w[1][0], b = w[1][1], D = w[2][0], et = w[2][1];
    const A = f((T[0][0] - x[0]) / r), O = f(
      -(T[0][1] - x[1]) / r
    ), I = f((T[1][0] - x[0]) / r), U = f(
      -(T[1][1] - x[1]) / r
    ), ut = f((T[2][0] - x[0]) / r), st = f(
      -(T[2][1] - x[1]) / r
    ), xt = P, S = F;
    P = 0, F = 0, G -= xt, b -= S, D -= xt, et -= S;
    const zt = [
      [G, b, 0, 0, I - A],
      [D, et, 0, 0, ut - A],
      [0, 0, G, b, U - O],
      [0, 0, D, et, st - O]
    ], q = rf(zt);
    if (!!q) {
      if (d.save(), d.beginPath(), Fm() || !u) {
        d.moveTo(I, U);
        const nt = 4, We = A - I, ge = O - U;
        for (let St = 0; St < nt; St++)
          d.lineTo(
            I + f((St + 1) * We / nt),
            U + f(St * ge / (nt - 1))
          ), St != nt - 1 && d.lineTo(
            I + f((St + 1) * We / nt),
            U + f((St + 1) * ge / (nt - 1))
          );
        d.lineTo(ut, st);
      } else
        d.moveTo(I, U), d.lineTo(A, O), d.lineTo(ut, st);
      d.clip(), d.transform(
        q[0],
        q[2],
        q[1],
        q[3],
        A,
        O
      ), d.translate(
        g[0] - xt,
        g[3] - S
      ), d.scale(
        n / e,
        -n / e
      ), d.drawImage(p.canvas, 0, 0), d.restore();
    }
  }), c && (d.save(), d.globalCompositeOperation = "source-over", d.strokeStyle = "black", d.lineWidth = 1, a.getTriangles().forEach(function(v, C, M) {
    const w = v.target, T = (w[0][0] - x[0]) / r, P = -(w[0][1] - x[1]) / r, F = (w[1][0] - x[0]) / r, G = -(w[1][1] - x[1]) / r, b = (w[2][0] - x[0]) / r, D = -(w[2][1] - x[1]) / r;
    d.beginPath(), d.moveTo(F, G), d.lineTo(T, P), d.lineTo(b, D), d.closePath(), d.stroke();
  }), d.restore()), d.canvas;
}
class km extends du {
  constructor(t, e, n, s, r, o, a, l, h, c, u, d) {
    super(r, k.IDLE, { interpolate: !!d }), this.renderEdges_ = u !== void 0 ? u : !1, this.pixelRatio_ = a, this.gutter_ = l, this.canvas_ = null, this.sourceTileGrid_ = e, this.targetTileGrid_ = s, this.wrappedTileCoord_ = o || r, this.sourceTiles_ = [], this.sourcesListenerKeys_ = null, this.sourceZ_ = 0;
    const f = s.getTileCoordExtent(
      this.wrappedTileCoord_
    ), g = this.targetTileGrid_.getExtent();
    let m = this.sourceTileGrid_.getExtent();
    const _ = g ? es(f, g) : f;
    if (Uo(_) === 0) {
      this.state = k.EMPTY;
      return;
    }
    const p = t.getExtent();
    p && (m ? m = es(m, p) : m = p);
    const y = s.getResolution(
      this.wrappedTileCoord_[0]
    ), x = Dm(
      t,
      n,
      _,
      y
    );
    if (!isFinite(x) || x <= 0) {
      this.state = k.EMPTY;
      return;
    }
    const v = c !== void 0 ? c : Lm;
    if (this.triangulation_ = new Om(
      t,
      n,
      _,
      m,
      x * v,
      y
    ), this.triangulation_.getTriangles().length === 0) {
      this.state = k.EMPTY;
      return;
    }
    this.sourceZ_ = e.getZForResolution(x);
    let C = this.triangulation_.calculateSourceExtent();
    if (m && (t.canWrapX() ? (C[1] = gt(
      C[1],
      m[1],
      m[3]
    ), C[3] = gt(
      C[3],
      m[1],
      m[3]
    )) : C = es(C, m)), !Uo(C))
      this.state = k.EMPTY;
    else {
      const M = e.getTileRangeForExtentAndZ(
        C,
        this.sourceZ_
      );
      for (let w = M.minX; w <= M.maxX; w++)
        for (let T = M.minY; T <= M.maxY; T++) {
          const P = h(this.sourceZ_, w, T, a);
          P && this.sourceTiles_.push(P);
        }
      this.sourceTiles_.length === 0 && (this.state = k.EMPTY);
    }
  }
  getImage() {
    return this.canvas_;
  }
  reproject_() {
    const t = [];
    if (this.sourceTiles_.forEach(
      function(e, n, s) {
        e && e.getState() == k.LOADED && t.push({
          extent: this.sourceTileGrid_.getTileCoordExtent(e.tileCoord),
          image: e.getImage()
        });
      }.bind(this)
    ), this.sourceTiles_.length = 0, t.length === 0)
      this.state = k.ERROR;
    else {
      const e = this.wrappedTileCoord_[0], n = this.targetTileGrid_.getTileSize(e), s = typeof n == "number" ? n : n[0], r = typeof n == "number" ? n : n[1], o = this.targetTileGrid_.getResolution(e), a = this.sourceTileGrid_.getResolution(
        this.sourceZ_
      ), l = this.targetTileGrid_.getTileCoordExtent(
        this.wrappedTileCoord_
      );
      this.canvas_ = Nm(
        s,
        r,
        this.pixelRatio_,
        a,
        this.sourceTileGrid_.getExtent(),
        o,
        l,
        this.triangulation_,
        t,
        this.gutter_,
        this.renderEdges_,
        this.interpolate
      ), this.state = k.LOADED;
    }
    this.changed();
  }
  load() {
    if (this.state == k.IDLE) {
      this.state = k.LOADING, this.changed();
      let t = 0;
      this.sourcesListenerKeys_ = [], this.sourceTiles_.forEach(
        function(e, n, s) {
          const r = e.getState();
          if (r == k.IDLE || r == k.LOADING) {
            t++;
            const o = W(
              e,
              $.CHANGE,
              function(a) {
                const l = e.getState();
                (l == k.LOADED || l == k.ERROR || l == k.EMPTY) && (it(o), t--, t === 0 && (this.unlistenSources_(), this.reproject_()));
              },
              this
            );
            this.sourcesListenerKeys_.push(o);
          }
        }.bind(this)
      ), t === 0 ? setTimeout(this.reproject_.bind(this), 0) : this.sourceTiles_.forEach(function(e, n, s) {
        e.getState() == k.IDLE && e.load();
      });
    }
  }
  unlistenSources_() {
    this.sourcesListenerKeys_.forEach(it), this.sourcesListenerKeys_ = null;
  }
  release() {
    this.canvas_ && (bc(this.canvas_.getContext("2d")), bu.push(this.canvas_), this.canvas_ = null), super.release();
  }
}
const ha = km, $o = {
  TILELOADSTART: "tileloadstart",
  TILELOADEND: "tileloadend",
  TILELOADERROR: "tileloaderror"
}, Gm = [0, 0, 0], Ke = 5;
class $m {
  constructor(t) {
    this.minZoom = t.minZoom !== void 0 ? t.minZoom : 0, this.resolutions_ = t.resolutions, Z(
      Ad(
        this.resolutions_,
        function(s, r) {
          return r - s;
        },
        !0
      ),
      17
    );
    let e;
    if (!t.origins) {
      for (let s = 0, r = this.resolutions_.length - 1; s < r; ++s)
        if (!e)
          e = this.resolutions_[s] / this.resolutions_[s + 1];
        else if (this.resolutions_[s] / this.resolutions_[s + 1] !== e) {
          e = void 0;
          break;
        }
    }
    this.zoomFactor_ = e, this.maxZoom = this.resolutions_.length - 1, this.origin_ = t.origin !== void 0 ? t.origin : null, this.origins_ = null, t.origins !== void 0 && (this.origins_ = t.origins, Z(this.origins_.length == this.resolutions_.length, 20));
    const n = t.extent;
    n !== void 0 && !this.origin_ && !this.origins_ && (this.origin_ = Zi(n)), Z(
      !this.origin_ && this.origins_ || this.origin_ && !this.origins_,
      18
    ), this.tileSizes_ = null, t.tileSizes !== void 0 && (this.tileSizes_ = t.tileSizes, Z(this.tileSizes_.length == this.resolutions_.length, 19)), this.tileSize_ = t.tileSize !== void 0 ? t.tileSize : this.tileSizes_ ? null : Oa, Z(
      !this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_,
      22
    ), this.extent_ = n !== void 0 ? n : null, this.fullTileRanges_ = null, this.tmpSize_ = [0, 0], this.tmpExtent_ = [0, 0, 0, 0], t.sizes !== void 0 ? this.fullTileRanges_ = t.sizes.map(function(s, r) {
      const o = new pu(
        Math.min(0, s[0]),
        Math.max(s[0] - 1, -1),
        Math.min(0, s[1]),
        Math.max(s[1] - 1, -1)
      );
      if (n) {
        const a = this.getTileRangeForExtentAndZ(n, r);
        o.minX = Math.max(a.minX, o.minX), o.maxX = Math.min(a.maxX, o.maxX), o.minY = Math.max(a.minY, o.minY), o.maxY = Math.min(a.maxY, o.maxY);
      }
      return o;
    }, this) : n && this.calculateTileRanges_(n);
  }
  forEachTileCoord(t, e, n) {
    const s = this.getTileRangeForExtentAndZ(t, e);
    for (let r = s.minX, o = s.maxX; r <= o; ++r)
      for (let a = s.minY, l = s.maxY; a <= l; ++a)
        n([e, r, a]);
  }
  forEachTileCoordParentTileRange(t, e, n, s) {
    let r, o, a, l = null, h = t[0] - 1;
    for (this.zoomFactor_ === 2 ? (o = t[1], a = t[2]) : l = this.getTileCoordExtent(t, s); h >= this.minZoom; ) {
      if (this.zoomFactor_ === 2 ? (o = Math.floor(o / 2), a = Math.floor(a / 2), r = sn(o, o, a, a, n)) : r = this.getTileRangeForExtentAndZ(
        l,
        h,
        n
      ), e(h, r))
        return !0;
      --h;
    }
    return !1;
  }
  getExtent() {
    return this.extent_;
  }
  getMaxZoom() {
    return this.maxZoom;
  }
  getMinZoom() {
    return this.minZoom;
  }
  getOrigin(t) {
    return this.origin_ ? this.origin_ : this.origins_[t];
  }
  getResolution(t) {
    return this.resolutions_[t];
  }
  getResolutions() {
    return this.resolutions_;
  }
  getTileCoordChildTileRange(t, e, n) {
    if (t[0] < this.maxZoom) {
      if (this.zoomFactor_ === 2) {
        const r = t[1] * 2, o = t[2] * 2;
        return sn(
          r,
          r + 1,
          o,
          o + 1,
          e
        );
      }
      const s = this.getTileCoordExtent(
        t,
        n || this.tmpExtent_
      );
      return this.getTileRangeForExtentAndZ(
        s,
        t[0] + 1,
        e
      );
    }
    return null;
  }
  getTileRangeForTileCoordAndZ(t, e, n) {
    if (e > this.maxZoom || e < this.minZoom)
      return null;
    const s = t[0], r = t[1], o = t[2];
    if (e === s)
      return sn(
        r,
        o,
        r,
        o,
        n
      );
    if (this.zoomFactor_) {
      const l = Math.pow(this.zoomFactor_, e - s), h = Math.floor(r * l), c = Math.floor(o * l);
      if (e < s)
        return sn(h, h, c, c, n);
      const u = Math.floor(l * (r + 1)) - 1, d = Math.floor(l * (o + 1)) - 1;
      return sn(h, u, c, d, n);
    }
    const a = this.getTileCoordExtent(t, this.tmpExtent_);
    return this.getTileRangeForExtentAndZ(a, e, n);
  }
  getTileRangeExtent(t, e, n) {
    const s = this.getOrigin(t), r = this.getResolution(t), o = Wt(this.getTileSize(t), this.tmpSize_), a = s[0] + e.minX * o[0] * r, l = s[0] + (e.maxX + 1) * o[0] * r, h = s[1] + e.minY * o[1] * r, c = s[1] + (e.maxY + 1) * o[1] * r;
    return de(a, h, l, c, n);
  }
  getTileRangeForExtentAndZ(t, e, n) {
    const s = Gm;
    this.getTileCoordForXYAndZ_(t[0], t[3], e, !1, s);
    const r = s[1], o = s[2];
    return this.getTileCoordForXYAndZ_(t[2], t[1], e, !0, s), sn(
      r,
      s[1],
      o,
      s[2],
      n
    );
  }
  getTileCoordCenter(t) {
    const e = this.getOrigin(t[0]), n = this.getResolution(t[0]), s = Wt(this.getTileSize(t[0]), this.tmpSize_);
    return [
      e[0] + (t[1] + 0.5) * s[0] * n,
      e[1] - (t[2] + 0.5) * s[1] * n
    ];
  }
  getTileCoordExtent(t, e) {
    const n = this.getOrigin(t[0]), s = this.getResolution(t[0]), r = Wt(this.getTileSize(t[0]), this.tmpSize_), o = n[0] + t[1] * r[0] * s, a = n[1] - (t[2] + 1) * r[1] * s, l = o + r[0] * s, h = a + r[1] * s;
    return de(o, a, l, h, e);
  }
  getTileCoordForCoordAndResolution(t, e, n) {
    return this.getTileCoordForXYAndResolution_(
      t[0],
      t[1],
      e,
      !1,
      n
    );
  }
  getTileCoordForXYAndResolution_(t, e, n, s, r) {
    const o = this.getZForResolution(n), a = n / this.getResolution(o), l = this.getOrigin(o), h = Wt(this.getTileSize(o), this.tmpSize_);
    let c = a * (t - l[0]) / n / h[0], u = a * (l[1] - e) / n / h[1];
    return s ? (c = Zs(c, Ke) - 1, u = Zs(u, Ke) - 1) : (c = Us(c, Ke), u = Us(u, Ke)), Mh(o, c, u, r);
  }
  getTileCoordForXYAndZ_(t, e, n, s, r) {
    const o = this.getOrigin(n), a = this.getResolution(n), l = Wt(this.getTileSize(n), this.tmpSize_);
    let h = (t - o[0]) / a / l[0], c = (o[1] - e) / a / l[1];
    return s ? (h = Zs(h, Ke) - 1, c = Zs(c, Ke) - 1) : (h = Us(h, Ke), c = Us(c, Ke)), Mh(n, h, c, r);
  }
  getTileCoordForCoordAndZ(t, e, n) {
    return this.getTileCoordForXYAndZ_(
      t[0],
      t[1],
      e,
      !1,
      n
    );
  }
  getTileCoordResolution(t) {
    return this.resolutions_[t[0]];
  }
  getTileSize(t) {
    return this.tileSize_ ? this.tileSize_ : this.tileSizes_[t];
  }
  getFullTileRange(t) {
    return this.fullTileRanges_ ? this.fullTileRanges_[t] : this.extent_ ? this.getTileRangeForExtentAndZ(this.extent_, t) : null;
  }
  getZForResolution(t, e) {
    const n = Ma(
      this.resolutions_,
      t,
      e || 0
    );
    return gt(n, this.minZoom, this.maxZoom);
  }
  tileCoordIntersectsViewport(t, e) {
    return zc(
      e,
      0,
      e.length,
      2,
      this.getTileCoordExtent(t)
    );
  }
  calculateTileRanges_(t) {
    const e = this.resolutions_.length, n = new Array(e);
    for (let s = this.minZoom; s < e; ++s)
      n[s] = this.getTileRangeForExtentAndZ(t, s);
    this.fullTileRanges_ = n;
  }
}
const Ru = $m;
function Iu(i) {
  let t = i.getDefaultTileGrid();
  return t || (t = jm(i), i.setDefaultTileGrid(t)), t;
}
function Bm(i, t, e) {
  const n = t[0], s = i.getTileCoordCenter(t), r = Lu(e);
  if (Xr(r, s))
    return t;
  {
    const o = at(r), a = Math.ceil(
      (r[0] - s[0]) / o
    );
    return s[0] += o * a, i.getTileCoordForCoordAndZ(s, n);
  }
}
function zm(i, t, e, n) {
  n = n !== void 0 ? n : "top-left";
  const s = Vm(i, t, e);
  return new Ru({
    extent: i,
    origin: Jd(i, n),
    resolutions: s,
    tileSize: e
  });
}
function Vm(i, t, e, n) {
  t = t !== void 0 ? t : Bf, e = Wt(e !== void 0 ? e : Oa);
  const s = Ce(i), r = at(i);
  n = n > 0 ? n : Math.max(r / e[0], s / e[1]);
  const o = t + 1, a = new Array(o);
  for (let l = 0; l < o; ++l)
    a[l] = n / Math.pow(2, l);
  return a;
}
function jm(i, t, e, n) {
  const s = Lu(i);
  return zm(s, t, e, n);
}
function Lu(i) {
  i = rt(i);
  let t = i.getExtent();
  if (!t) {
    const e = 180 * Rn.degrees / i.getMetersPerUnit();
    t = de(-e, -e, e, e);
  }
  return t;
}
class Wm extends uu {
  constructor(t) {
    super({
      attributions: t.attributions,
      attributionsCollapsible: t.attributionsCollapsible,
      projection: t.projection,
      state: t.state,
      wrapX: t.wrapX,
      interpolate: t.interpolate
    }), this.on, this.once, this.un, this.opaque_ = t.opaque !== void 0 ? t.opaque : !1, this.tilePixelRatio_ = t.tilePixelRatio !== void 0 ? t.tilePixelRatio : 1, this.tileGrid = t.tileGrid !== void 0 ? t.tileGrid : null;
    const e = [256, 256];
    this.tileGrid && Wt(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()), e), this.tileCache = new mu(t.cacheSize || 0), this.tmpSize = [0, 0], this.key_ = t.key || "", this.tileOptions = {
      transition: t.transition,
      interpolate: t.interpolate
    }, this.zDirection = t.zDirection ? t.zDirection : 0;
  }
  canExpireCache() {
    return this.tileCache.canExpireCache();
  }
  expireCache(t, e) {
    const n = this.getTileCacheForProjection(t);
    n && n.expireCache(e);
  }
  forEachLoadedTile(t, e, n, s) {
    const r = this.getTileCacheForProjection(t);
    if (!r)
      return !1;
    let o = !0, a, l, h;
    for (let c = n.minX; c <= n.maxX; ++c)
      for (let u = n.minY; u <= n.maxY; ++u)
        l = no(e, c, u), h = !1, r.containsKey(l) && (a = r.get(l), h = a.getState() === k.LOADED, h && (h = s(a) !== !1)), h || (o = !1);
    return o;
  }
  getGutterForProjection(t) {
    return 0;
  }
  getKey() {
    return this.key_;
  }
  setKey(t) {
    this.key_ !== t && (this.key_ = t, this.changed());
  }
  getOpaque(t) {
    return this.opaque_;
  }
  getResolutions() {
    return this.tileGrid ? this.tileGrid.getResolutions() : null;
  }
  getTile(t, e, n, s, r) {
    return z();
  }
  getTileGrid() {
    return this.tileGrid;
  }
  getTileGridForProjection(t) {
    return this.tileGrid ? this.tileGrid : Iu(t);
  }
  getTileCacheForProjection(t) {
    const e = this.getProjection();
    return Z(
      e === null || Ne(e, t),
      68
    ), this.tileCache;
  }
  getTilePixelRatio(t) {
    return this.tilePixelRatio_;
  }
  getTilePixelSize(t, e, n) {
    const s = this.getTileGridForProjection(n), r = this.getTilePixelRatio(e), o = Wt(s.getTileSize(t), this.tmpSize);
    return r == 1 ? o : S0(o, r, this.tmpSize);
  }
  getTileCoordForTileUrlFunction(t, e) {
    e = e !== void 0 ? e : this.getProjection();
    const n = this.getTileGridForProjection(e);
    return this.getWrapX() && e.isGlobal() && (t = Bm(n, t, e)), q1(t, n) ? t : null;
  }
  clear() {
    this.tileCache.clear();
  }
  refresh() {
    this.clear(), super.refresh();
  }
  updateCacheSize(t, e) {
    const n = this.getTileCacheForProjection(e);
    t > n.highWaterMark && (n.highWaterMark = t);
  }
  useTile(t, e, n, s) {
  }
}
class Um extends ie {
  constructor(t, e) {
    super(t), this.tile = e;
  }
}
const Zm = Wm;
function Xm(i, t) {
  const e = /\{z\}/g, n = /\{x\}/g, s = /\{y\}/g, r = /\{-y\}/g;
  return function(o, a, l) {
    if (o)
      return i.replace(e, o[0].toString()).replace(n, o[1].toString()).replace(s, o[2].toString()).replace(r, function() {
        const h = o[0], c = t.getFullTileRange(h);
        return Z(c, 55), (c.getHeight() - o[2] - 1).toString();
      });
  };
}
function Hm(i, t) {
  const e = i.length, n = new Array(e);
  for (let s = 0; s < e; ++s)
    n[s] = Xm(i[s], t);
  return ca(n);
}
function ca(i) {
  return i.length === 1 ? i[0] : function(t, e, n) {
    if (t) {
      const s = Y1(t), r = Ai(s, i.length);
      return i[r](t, e, n);
    } else
      return;
  };
}
function Pu(i) {
  const t = [];
  let e = /\{([a-z])-([a-z])\}/.exec(i);
  if (e) {
    const n = e[1].charCodeAt(0), s = e[2].charCodeAt(0);
    let r;
    for (r = n; r <= s; ++r)
      t.push(i.replace(e[0], String.fromCharCode(r)));
    return t;
  }
  if (e = /\{(\d+)-(\d+)\}/.exec(i), e) {
    const n = parseInt(e[2], 10);
    for (let s = parseInt(e[1], 10); s <= n; s++)
      t.push(i.replace(e[0], s.toString()));
    return t;
  }
  return t.push(i), t;
}
class dl extends Zm {
  constructor(t) {
    super({
      attributions: t.attributions,
      cacheSize: t.cacheSize,
      opaque: t.opaque,
      projection: t.projection,
      state: t.state,
      tileGrid: t.tileGrid,
      tilePixelRatio: t.tilePixelRatio,
      wrapX: t.wrapX,
      transition: t.transition,
      interpolate: t.interpolate,
      key: t.key,
      attributionsCollapsible: t.attributionsCollapsible,
      zDirection: t.zDirection
    }), this.generateTileUrlFunction_ = this.tileUrlFunction === dl.prototype.tileUrlFunction, this.tileLoadFunction = t.tileLoadFunction, t.tileUrlFunction && (this.tileUrlFunction = t.tileUrlFunction), this.urls = null, t.urls ? this.setUrls(t.urls) : t.url && this.setUrl(t.url), this.tileLoadingKeys_ = {};
  }
  getTileLoadFunction() {
    return this.tileLoadFunction;
  }
  getTileUrlFunction() {
    return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction ? this.tileUrlFunction.bind(this) : this.tileUrlFunction;
  }
  getUrls() {
    return this.urls;
  }
  handleTileChange(t) {
    const e = t.target, n = j(e), s = e.getState();
    let r;
    s == k.LOADING ? (this.tileLoadingKeys_[n] = !0, r = $o.TILELOADSTART) : n in this.tileLoadingKeys_ && (delete this.tileLoadingKeys_[n], r = s == k.ERROR ? $o.TILELOADERROR : s == k.LOADED ? $o.TILELOADEND : void 0), r != null && this.dispatchEvent(new Um(r, e));
  }
  setTileLoadFunction(t) {
    this.tileCache.clear(), this.tileLoadFunction = t, this.changed();
  }
  setTileUrlFunction(t, e) {
    this.tileUrlFunction = t, this.tileCache.pruneExceptNewestZ(), typeof e < "u" ? this.setKey(e) : this.changed();
  }
  setUrl(t) {
    const e = Pu(t);
    this.urls = e, this.setUrls(e);
  }
  setUrls(t) {
    this.urls = t;
    const e = t.join(`
`);
    this.generateTileUrlFunction_ ? this.setTileUrlFunction(Hm(t, this.tileGrid), e) : this.setKey(e);
  }
  tileUrlFunction(t, e, n) {
  }
  useTile(t, e, n) {
    const s = no(t, e, n);
    this.tileCache.containsKey(s) && this.tileCache.get(s);
  }
}
const Ym = dl;
class qm extends Ym {
  constructor(t) {
    super({
      attributions: t.attributions,
      cacheSize: t.cacheSize,
      opaque: t.opaque,
      projection: t.projection,
      state: t.state,
      tileGrid: t.tileGrid,
      tileLoadFunction: t.tileLoadFunction ? t.tileLoadFunction : Km,
      tilePixelRatio: t.tilePixelRatio,
      tileUrlFunction: t.tileUrlFunction,
      url: t.url,
      urls: t.urls,
      wrapX: t.wrapX,
      transition: t.transition,
      interpolate: t.interpolate !== void 0 ? t.interpolate : !0,
      key: t.key,
      attributionsCollapsible: t.attributionsCollapsible,
      zDirection: t.zDirection
    }), this.crossOrigin = t.crossOrigin !== void 0 ? t.crossOrigin : null, this.tileClass = t.tileClass !== void 0 ? t.tileClass : fu, this.tileCacheForProjection = {}, this.tileGridForProjection = {}, this.reprojectionErrorThreshold_ = t.reprojectionErrorThreshold, this.renderReprojectionEdges_ = !1;
  }
  canExpireCache() {
    if (this.tileCache.canExpireCache())
      return !0;
    for (const t in this.tileCacheForProjection)
      if (this.tileCacheForProjection[t].canExpireCache())
        return !0;
    return !1;
  }
  expireCache(t, e) {
    const n = this.getTileCacheForProjection(t);
    this.tileCache.expireCache(
      this.tileCache == n ? e : {}
    );
    for (const s in this.tileCacheForProjection) {
      const r = this.tileCacheForProjection[s];
      r.expireCache(r == n ? e : {});
    }
  }
  getGutterForProjection(t) {
    return this.getProjection() && t && !Ne(this.getProjection(), t) ? 0 : this.getGutter();
  }
  getGutter() {
    return 0;
  }
  getKey() {
    let t = super.getKey();
    return this.getInterpolate() || (t += ":disable-interpolation"), t;
  }
  getOpaque(t) {
    return this.getProjection() && t && !Ne(this.getProjection(), t) ? !1 : super.getOpaque(t);
  }
  getTileGridForProjection(t) {
    const e = this.getProjection();
    if (this.tileGrid && (!e || Ne(e, t)))
      return this.tileGrid;
    {
      const n = j(t);
      return n in this.tileGridForProjection || (this.tileGridForProjection[n] = Iu(t)), this.tileGridForProjection[n];
    }
  }
  getTileCacheForProjection(t) {
    const e = this.getProjection();
    if (!e || Ne(e, t))
      return this.tileCache;
    {
      const n = j(t);
      return n in this.tileCacheForProjection || (this.tileCacheForProjection[n] = new mu(
        this.tileCache.highWaterMark
      )), this.tileCacheForProjection[n];
    }
  }
  createTile_(t, e, n, s, r, o) {
    const a = [t, e, n], l = this.getTileCoordForTileUrlFunction(
      a,
      r
    ), h = l ? this.tileUrlFunction(l, s, r) : void 0, c = new this.tileClass(
      a,
      h !== void 0 ? k.IDLE : k.EMPTY,
      h !== void 0 ? h : "",
      this.crossOrigin,
      this.tileLoadFunction,
      this.tileOptions
    );
    return c.key = o, c.addEventListener($.CHANGE, this.handleTileChange.bind(this)), c;
  }
  getTile(t, e, n, s, r) {
    const o = this.getProjection();
    if (!o || !r || Ne(o, r))
      return this.getTileInternal(
        t,
        e,
        n,
        s,
        o || r
      );
    {
      const a = this.getTileCacheForProjection(r), l = [t, e, n];
      let h;
      const c = gu(l);
      a.containsKey(c) && (h = a.get(c));
      const u = this.getKey();
      if (h && h.key == u)
        return h;
      {
        const d = this.getTileGridForProjection(o), f = this.getTileGridForProjection(r), g = this.getTileCoordForTileUrlFunction(
          l,
          r
        ), m = new ha(
          o,
          d,
          r,
          f,
          l,
          g,
          this.getTilePixelRatio(s),
          this.getGutter(),
          function(_, p, y, x) {
            return this.getTileInternal(_, p, y, x, o);
          }.bind(this),
          this.reprojectionErrorThreshold_,
          this.renderReprojectionEdges_,
          this.getInterpolate()
        );
        return m.key = u, h ? (m.interimTile = h, m.refreshInterimChain(), a.replace(c, m)) : a.set(c, m), m;
      }
    }
  }
  getTileInternal(t, e, n, s, r) {
    let o = null;
    const a = no(t, e, n), l = this.getKey();
    if (!this.tileCache.containsKey(a))
      o = this.createTile_(t, e, n, s, r, l), this.tileCache.set(a, o);
    else if (o = this.tileCache.get(a), o.key != l) {
      const h = o;
      o = this.createTile_(t, e, n, s, r, l), h.getState() == k.IDLE ? o.interimTile = h.interimTile : o.interimTile = h, o.refreshInterimChain(), this.tileCache.replace(a, o);
    }
    return o;
  }
  setRenderReprojectionEdges(t) {
    if (this.renderReprojectionEdges_ != t) {
      this.renderReprojectionEdges_ = t;
      for (const e in this.tileCacheForProjection)
        this.tileCacheForProjection[e].clear();
      this.changed();
    }
  }
  setTileGridForProjection(t, e) {
    const n = rt(t);
    if (n) {
      const s = j(n);
      s in this.tileGridForProjection || (this.tileGridForProjection[s] = e);
    }
  }
  clear() {
    super.clear();
    for (const t in this.tileCacheForProjection)
      this.tileCacheForProjection[t].clear();
  }
}
function Km(i, t) {
  i.getImage().src = t;
}
const Jm = qm;
class Qm extends Be {
  constructor(t) {
    super({
      attributions: t.attributions,
      wrapX: t.wrapX
    }), this.resolution = void 0, this.distance = t.distance !== void 0 ? t.distance : 20, this.minDistance = t.minDistance || 0, this.interpolationRatio = 0, this.features = [], this.geometryFunction = t.geometryFunction || function(e) {
      const n = e.getGeometry();
      return Z(n.getType() == "Point", 10), n;
    }, this.createCustomCluster_ = t.createCluster, this.source = null, this.boundRefresh_ = this.refresh.bind(this), this.updateDistance(this.distance, this.minDistance), this.setSource(t.source || null);
  }
  clear(t) {
    this.features.length = 0, super.clear(t);
  }
  getDistance() {
    return this.distance;
  }
  getSource() {
    return this.source;
  }
  loadFeatures(t, e, n) {
    this.source.loadFeatures(t, e, n), e !== this.resolution && (this.resolution = e, this.refresh());
  }
  setDistance(t) {
    this.updateDistance(t, this.minDistance);
  }
  setMinDistance(t) {
    this.updateDistance(this.distance, t);
  }
  getMinDistance() {
    return this.minDistance;
  }
  setSource(t) {
    this.source && this.source.removeEventListener($.CHANGE, this.boundRefresh_), this.source = t, t && t.addEventListener($.CHANGE, this.boundRefresh_), this.refresh();
  }
  refresh() {
    this.clear(), this.cluster(), this.addFeatures(this.features);
  }
  updateDistance(t, e) {
    const n = t === 0 ? 0 : Math.min(e, t) / t, s = t !== this.distance || this.interpolationRatio !== n;
    this.distance = t, this.minDistance = e, this.interpolationRatio = n, s && this.refresh();
  }
  cluster() {
    if (this.resolution === void 0 || !this.source)
      return;
    const t = Gt(), e = this.distance * this.resolution, n = this.source.getFeatures(), s = {};
    for (let r = 0, o = n.length; r < o; r++) {
      const a = n[r];
      if (!(j(a) in s)) {
        const l = this.geometryFunction(a);
        if (l) {
          const h = l.getCoordinates();
          Qn(h, t), ws(t, e, t);
          const c = this.source.getFeaturesInExtent(t).filter(function(u) {
            const d = j(u);
            return d in s ? !1 : (s[d] = !0, !0);
          });
          this.features.push(this.createCluster(c, t));
        }
      }
    }
  }
  createCluster(t, e) {
    const n = [0, 0];
    for (let a = t.length - 1; a >= 0; --a) {
      const l = this.geometryFunction(t[a]);
      l ? Mc(n, l.getCoordinates()) : t.splice(a, 1);
    }
    Ec(n, 1 / t.length);
    const s = di(e), r = this.interpolationRatio, o = new he([
      n[0] * (1 - r) + s[0] * r,
      n[1] * (1 - r) + s[1] * r
    ]);
    return this.createCustomCluster_ ? this.createCustomCluster_(o, t) : new oe({
      geometry: o,
      features: t
    });
  }
}
const t_ = Qm;
function Nh(i, t) {
  const e = [];
  Object.keys(t).forEach(function(s) {
    t[s] !== null && t[s] !== void 0 && e.push(s + "=" + encodeURIComponent(t[s]));
  });
  const n = e.join("&");
  return i = i.replace(/[?&]$/, ""), i += i.includes("?") ? "&" : "?", i + n;
}
const rr = {
  PRELOAD: "preload",
  USE_INTERIM_TILES_ON_ERROR: "useInterimTilesOnError"
};
class e_ extends Kr {
  constructor(t) {
    t = t || {};
    const e = Object.assign({}, t);
    delete e.preload, delete e.useInterimTilesOnError, super(e), this.on, this.once, this.un, this.setPreload(t.preload !== void 0 ? t.preload : 0), this.setUseInterimTilesOnError(
      t.useInterimTilesOnError !== void 0 ? t.useInterimTilesOnError : !0
    );
  }
  getPreload() {
    return this.get(rr.PRELOAD);
  }
  setPreload(t) {
    this.set(rr.PRELOAD, t);
  }
  getUseInterimTilesOnError() {
    return this.get(rr.USE_INTERIM_TILES_ON_ERROR);
  }
  setUseInterimTilesOnError(t) {
    this.set(rr.USE_INTERIM_TILES_ON_ERROR, t);
  }
  getData(t) {
    return super.getData(t);
  }
}
const i_ = e_;
class n_ extends lu {
  constructor(t) {
    super(t), this.extentChanged = !0, this.renderedExtent_ = null, this.renderedPixelRatio, this.renderedProjection = null, this.renderedRevision, this.renderedTiles = [], this.newTiles_ = !1, this.tmpExtent = Gt(), this.tmpTileRange_ = new pu(0, 0, 0, 0);
  }
  isDrawableTile(t) {
    const e = this.getLayer(), n = t.getState(), s = e.getUseInterimTilesOnError();
    return n == k.LOADED || n == k.EMPTY || n == k.ERROR && !s;
  }
  getTile(t, e, n, s) {
    const r = s.pixelRatio, o = s.viewState.projection, a = this.getLayer();
    let h = a.getSource().getTile(t, e, n, r, o);
    return h.getState() == k.ERROR && a.getUseInterimTilesOnError() && a.getPreload() > 0 && (this.newTiles_ = !0), this.isDrawableTile(h) || (h = h.getInterimTile()), h;
  }
  getData(t) {
    const e = this.frameState;
    if (!e)
      return null;
    const n = this.getLayer(), s = Mt(
      e.pixelToCoordinateTransform,
      t.slice()
    ), r = n.getExtent();
    if (r && !Xr(r, s))
      return null;
    const o = e.pixelRatio, a = e.viewState.projection, l = e.viewState, h = n.getRenderSource(), c = h.getTileGridForProjection(l.projection), u = h.getTilePixelRatio(e.pixelRatio);
    for (let d = c.getZForResolution(l.resolution); d >= c.getMinZoom(); --d) {
      const f = c.getTileCoordForCoordAndZ(s, d), g = h.getTile(
        d,
        f[1],
        f[2],
        o,
        a
      );
      if (!(g instanceof fu || g instanceof ha) || g instanceof ha && g.getState() === k.EMPTY)
        return null;
      if (g.getState() !== k.LOADED)
        continue;
      const m = c.getOrigin(d), _ = Wt(c.getTileSize(d)), p = c.getResolution(d), y = Math.floor(
        u * ((s[0] - m[0]) / p - f[1] * _[0])
      ), x = Math.floor(
        u * ((m[1] - s[1]) / p - f[2] * _[1])
      ), v = Math.round(
        u * h.getGutterForProjection(l.projection)
      );
      return this.getImageData(g.getImage(), y + v, x + v);
    }
    return null;
  }
  loadedTileCallback(t, e, n) {
    return this.isDrawableTile(n) ? super.loadedTileCallback(t, e, n) : !1;
  }
  prepareFrame(t) {
    return !!this.getLayer().getSource();
  }
  renderFrame(t, e) {
    const n = t.layerStatesArray[t.layerIndex], s = t.viewState, r = s.projection, o = s.resolution, a = s.center, l = s.rotation, h = t.pixelRatio, c = this.getLayer(), u = c.getSource(), d = u.getRevision(), f = u.getTileGridForProjection(r), g = f.getZForResolution(o, u.zDirection), m = f.getResolution(g);
    let _ = t.extent;
    const p = t.viewState.resolution, y = u.getTilePixelRatio(h), x = Math.round(at(_) / p * h), v = Math.round(Ce(_) / p * h), C = n.extent && ni(n.extent);
    C && (_ = es(
      _,
      ni(n.extent)
    ));
    const M = m * x / 2 / y, w = m * v / 2 / y, T = [
      a[0] - M,
      a[1] - w,
      a[0] + M,
      a[1] + w
    ], P = f.getTileRangeForExtentAndZ(_, g), F = {};
    F[g] = {};
    const G = this.createLoadedTileFinder(
      u,
      r,
      F
    ), b = this.tmpExtent, D = this.tmpTileRange_;
    this.newTiles_ = !1;
    const et = l ? Xo(
      s.center,
      p,
      l,
      t.size
    ) : void 0;
    for (let zt = P.minX; zt <= P.maxX; ++zt)
      for (let q = P.minY; q <= P.maxY; ++q) {
        if (l && !f.tileCoordIntersectsViewport([g, zt, q], et))
          continue;
        const nt = this.getTile(g, zt, q, t);
        if (this.isDrawableTile(nt)) {
          const St = j(this);
          if (nt.getState() == k.LOADED) {
            F[g][nt.tileCoord.toString()] = nt;
            let Te = nt.inTransition(St);
            Te && n.opacity !== 1 && (nt.endTransition(St), Te = !1), !this.newTiles_ && (Te || !this.renderedTiles.includes(nt)) && (this.newTiles_ = !0);
          }
          if (nt.getAlpha(St, t.time) === 1)
            continue;
        }
        const We = f.getTileCoordChildTileRange(
          nt.tileCoord,
          D,
          b
        );
        let ge = !1;
        We && (ge = G(g + 1, We)), ge || f.forEachTileCoordParentTileRange(
          nt.tileCoord,
          G,
          D,
          b
        );
      }
    const A = m / o * h / y;
    ui(
      this.pixelTransform,
      t.size[0] / 2,
      t.size[1] / 2,
      1 / h,
      1 / h,
      l,
      -x / 2,
      -v / 2
    );
    const O = fc(this.pixelTransform);
    this.useContainer(e, O, this.getBackground(t));
    const I = this.context, U = I.canvas;
    wa(this.inversePixelTransform, this.pixelTransform), ui(
      this.tempTransform,
      x / 2,
      v / 2,
      A,
      A,
      0,
      -x / 2,
      -v / 2
    ), U.width != x || U.height != v ? (U.width = x, U.height = v) : this.containerReused || I.clearRect(0, 0, x, v), C && this.clipUnrotated(I, t, C), u.getInterpolate() || (I.imageSmoothingEnabled = !1), this.preRender(I, t), this.renderedTiles.length = 0;
    let ut = Object.keys(F).map(Number);
    ut.sort(Ni);
    let st, xt, S;
    n.opacity === 1 && (!this.containerReused || u.getOpaque(t.viewState.projection)) ? ut = ut.reverse() : (st = [], xt = []);
    for (let zt = ut.length - 1; zt >= 0; --zt) {
      const q = ut[zt], nt = u.getTilePixelSize(
        q,
        h,
        r
      ), ge = f.getResolution(q) / m, St = nt[0] * ge * A, Te = nt[1] * ge * A, Hi = f.getTileCoordForCoordAndZ(
        Zi(T),
        q
      ), Ns = f.getTileCoordExtent(Hi), Yi = Mt(this.tempTransform, [
        y * (Ns[0] - T[0]) / m,
        y * (T[3] - Ns[3]) / m
      ]), ks = y * u.getGutterForProjection(r), Ue = F[q];
      for (const $n in Ue) {
        const Ze = Ue[$n], Gs = Ze.tileCoord, $s = Hi[1] - Gs[1], Bs = Math.round(Yi[0] - ($s - 1) * St), qi = Hi[2] - Gs[2], co = Math.round(Yi[1] - (qi - 1) * Te), Dt = Math.round(Yi[0] - $s * St), Yt = Math.round(Yi[1] - qi * Te), ne = Bs - Dt, be = co - Yt, Ki = g === q, Mi = Ki && Ze.getAlpha(j(this), t.time) !== 1;
        let Xe = !1;
        if (!Mi)
          if (st) {
            S = [Dt, Yt, Dt + ne, Yt, Dt + ne, Yt + be, Dt, Yt + be];
            for (let Ji = 0, zs = st.length; Ji < zs; ++Ji)
              if (g !== q && q < xt[Ji]) {
                const Lt = st[Ji];
                Ot(
                  [Dt, Yt, Dt + ne, Yt + be],
                  [Lt[0], Lt[3], Lt[4], Lt[7]]
                ) && (Xe || (I.save(), Xe = !0), I.beginPath(), I.moveTo(S[0], S[1]), I.lineTo(S[2], S[3]), I.lineTo(S[4], S[5]), I.lineTo(S[6], S[7]), I.moveTo(Lt[6], Lt[7]), I.lineTo(Lt[4], Lt[5]), I.lineTo(Lt[2], Lt[3]), I.lineTo(Lt[0], Lt[1]), I.clip());
              }
            st.push(S), xt.push(q);
          } else
            I.clearRect(Dt, Yt, ne, be);
        this.drawTileImage(
          Ze,
          t,
          Dt,
          Yt,
          ne,
          be,
          ks,
          Ki
        ), st && !Mi ? (Xe && I.restore(), this.renderedTiles.unshift(Ze)) : this.renderedTiles.push(Ze), this.updateUsedTiles(t.usedTiles, u, Ze);
      }
    }
    return this.renderedRevision = d, this.renderedResolution = m, this.extentChanged = !this.renderedExtent_ || !ls(this.renderedExtent_, T), this.renderedExtent_ = T, this.renderedPixelRatio = h, this.renderedProjection = r, this.manageTilePyramid(
      t,
      u,
      f,
      h,
      r,
      _,
      g,
      c.getPreload()
    ), this.scheduleExpireCache(t, u), this.postRender(I, t), n.extent && I.restore(), I.imageSmoothingEnabled = !0, O !== U.style.transform && (U.style.transform = O), this.container;
  }
  drawTileImage(t, e, n, s, r, o, a, l) {
    const h = this.getTileImage(t);
    if (!h)
      return;
    const c = j(this), u = e.layerStatesArray[e.layerIndex], d = u.opacity * (l ? t.getAlpha(c, e.time) : 1), f = d !== this.context.globalAlpha;
    f && (this.context.save(), this.context.globalAlpha = d), this.context.drawImage(
      h,
      a,
      a,
      h.width - 2 * a,
      h.height - 2 * a,
      n,
      s,
      r,
      o
    ), f && this.context.restore(), d !== u.opacity ? e.animate = !0 : l && t.endTransition(c);
  }
  getImage() {
    const t = this.context;
    return t ? t.canvas : null;
  }
  getTileImage(t) {
    return t.getImage();
  }
  scheduleExpireCache(t, e) {
    if (e.canExpireCache()) {
      const n = function(s, r, o) {
        const a = j(s);
        a in o.usedTiles && s.expireCache(
          o.viewState.projection,
          o.usedTiles[a]
        );
      }.bind(null, e);
      t.postRenderFunctions.push(
        n
      );
    }
  }
  updateUsedTiles(t, e, n) {
    const s = j(e);
    s in t || (t[s] = {}), t[s][n.getKey()] = !0;
  }
  manageTilePyramid(t, e, n, s, r, o, a, l, h) {
    const c = j(e);
    c in t.wantedTiles || (t.wantedTiles[c] = {});
    const u = t.wantedTiles[c], d = t.tileQueue, f = n.getMinZoom(), g = t.viewState.rotation, m = g ? Xo(
      t.viewState.center,
      t.viewState.resolution,
      g,
      t.size
    ) : void 0;
    let _ = 0, p, y, x, v, C, M;
    for (M = f; M <= a; ++M)
      for (y = n.getTileRangeForExtentAndZ(o, M, y), x = n.getResolution(M), v = y.minX; v <= y.maxX; ++v)
        for (C = y.minY; C <= y.maxY; ++C)
          g && !n.tileCoordIntersectsViewport([M, v, C], m) || (a - M <= l ? (++_, p = e.getTile(M, v, C, s, r), p.getState() == k.IDLE && (u[p.getKey()] = !0, d.isKeyQueued(p.getKey()) || d.enqueue([
            p,
            c,
            n.getTileCoordCenter(p.tileCoord),
            x
          ])), h !== void 0 && h(p)) : e.useTile(M, v, C, r));
    e.updateCacheSize(_, r);
  }
}
const s_ = n_;
class r_ extends i_ {
  constructor(t) {
    super(t);
  }
  createRenderer() {
    return new s_(this);
  }
}
const o_ = r_;
class a_ extends Ru {
  constructor(t) {
    super({
      extent: t.extent,
      origin: t.origin,
      origins: t.origins,
      resolutions: t.resolutions,
      tileSize: t.tileSize,
      tileSizes: t.tileSizes,
      sizes: t.sizes
    }), this.matrixIds_ = t.matrixIds;
  }
  getMatrixId(t) {
    return this.matrixIds_[t];
  }
  getMatrixIds() {
    return this.matrixIds_;
  }
}
function l_(i, t, e) {
  const n = [], s = [], r = [], o = [], a = [];
  e = e !== void 0 ? e : [];
  const l = "SupportedCRS", h = "TileMatrix", c = "Identifier", u = "ScaleDenominator", d = "TopLeftCorner", f = "TileWidth", g = "TileHeight", m = i[l], _ = rt(m), p = _.getMetersPerUnit(), y = _.getAxisOrientation().substr(0, 2) == "ne";
  return i[h].sort(function(x, v) {
    return v[u] - x[u];
  }), i[h].forEach(function(x) {
    let v;
    if (e.length > 0 ? v = e.find(function(C) {
      return x[c] == C[h] ? !0 : x[c].includes(":") ? !1 : i[c] + ":" + x[c] === C[h];
    }) : v = !0, v) {
      s.push(x[c]);
      const C = x[u] * 28e-5 / p, M = x[f], w = x[g];
      y ? r.push([
        x[d][1],
        x[d][0]
      ]) : r.push(x[d]), n.push(C), o.push(
        M == w ? M : [M, w]
      ), a.push([x.MatrixWidth, x.MatrixHeight]);
    }
  }), new a_({
    extent: t,
    origins: r,
    resolutions: n,
    matrixIds: s,
    tileSizes: o,
    sizes: a
  });
}
class h_ extends Jm {
  constructor(t) {
    const e = t.requestEncoding !== void 0 ? t.requestEncoding : "KVP", n = t.tileGrid;
    let s = t.urls;
    s === void 0 && t.url !== void 0 && (s = Pu(t.url)), super({
      attributions: t.attributions,
      attributionsCollapsible: t.attributionsCollapsible,
      cacheSize: t.cacheSize,
      crossOrigin: t.crossOrigin,
      interpolate: t.interpolate,
      projection: t.projection,
      reprojectionErrorThreshold: t.reprojectionErrorThreshold,
      tileClass: t.tileClass,
      tileGrid: n,
      tileLoadFunction: t.tileLoadFunction,
      tilePixelRatio: t.tilePixelRatio,
      urls: s,
      wrapX: t.wrapX !== void 0 ? t.wrapX : !1,
      transition: t.transition,
      zDirection: t.zDirection
    }), this.version_ = t.version !== void 0 ? t.version : "1.0.0", this.format_ = t.format !== void 0 ? t.format : "image/jpeg", this.dimensions_ = t.dimensions !== void 0 ? t.dimensions : {}, this.layer_ = t.layer, this.matrixSet_ = t.matrixSet, this.style_ = t.style, this.requestEncoding_ = e, this.setKey(this.getKeyForDimensions_()), s && s.length > 0 && (this.tileUrlFunction = ca(
      s.map(this.createFromWMTSTemplate.bind(this))
    ));
  }
  setUrls(t) {
    this.urls = t;
    const e = t.join(`
`);
    this.setTileUrlFunction(
      ca(
        t.map(this.createFromWMTSTemplate.bind(this))
      ),
      e
    );
  }
  getDimensions() {
    return this.dimensions_;
  }
  getFormat() {
    return this.format_;
  }
  getLayer() {
    return this.layer_;
  }
  getMatrixSet() {
    return this.matrixSet_;
  }
  getRequestEncoding() {
    return this.requestEncoding_;
  }
  getStyle() {
    return this.style_;
  }
  getVersion() {
    return this.version_;
  }
  getKeyForDimensions_() {
    let t = 0;
    const e = [];
    for (const n in this.dimensions_)
      e[t++] = n + "-" + this.dimensions_[n];
    return e.join("/");
  }
  updateDimensions(t) {
    Object.assign(this.dimensions_, t), this.setKey(this.getKeyForDimensions_());
  }
  createFromWMTSTemplate(t) {
    const e = this.requestEncoding_, n = {
      layer: this.layer_,
      style: this.style_,
      tilematrixset: this.matrixSet_
    };
    e == "KVP" && Object.assign(n, {
      Service: "WMTS",
      Request: "GetTile",
      Version: this.version_,
      Format: this.format_
    }), t = e == "KVP" ? Nh(t, n) : t.replace(/\{(\w+?)\}/g, function(o, a) {
      return a.toLowerCase() in n ? n[a.toLowerCase()] : o;
    });
    const s = this.tileGrid, r = this.dimensions_;
    return function(o, a, l) {
      if (o) {
        const h = {
          TileMatrix: s.getMatrixId(o[0]),
          TileCol: o[1],
          TileRow: o[2]
        };
        Object.assign(h, r);
        let c = t;
        return e == "KVP" ? c = Nh(c, h) : c = c.replace(/\{(\w+?)\}/g, function(u, d) {
          return h[d];
        }), c;
      } else
        return;
    };
  }
}
const c_ = h_;
function u_(i, t) {
  const n = i.Contents.Layer.find(function(b) {
    return b.Identifier == t.layer;
  });
  if (!n)
    return null;
  const s = i.Contents.TileMatrixSet;
  let r;
  n.TileMatrixSetLink.length > 1 ? "projection" in t ? r = n.TileMatrixSetLink.findIndex(function(b) {
    const et = s.find(function(I) {
      return I.Identifier == b.TileMatrixSet;
    }).SupportedCRS, A = rt(et), O = rt(t.projection);
    return A && O ? Ne(A, O) : et == t.projection;
  }) : r = n.TileMatrixSetLink.findIndex(function(b) {
    return b.TileMatrixSet == t.matrixSet;
  }) : r = 0, r < 0 && (r = 0);
  const o = n.TileMatrixSetLink[r].TileMatrixSet, a = n.TileMatrixSetLink[r].TileMatrixSetLimits;
  let l = n.Format[0];
  "format" in t && (l = t.format), r = n.Style.findIndex(function(b) {
    return "style" in t ? b.Title == t.style : b.isDefault;
  }), r < 0 && (r = 0);
  const h = n.Style[r].Identifier, c = {};
  "Dimension" in n && n.Dimension.forEach(function(b, D, et) {
    const A = b.Identifier;
    let O = b.Default;
    O === void 0 && (O = b.Value[0]), c[A] = O;
  });
  const d = i.Contents.TileMatrixSet.find(function(b) {
    return b.Identifier == o;
  });
  let f;
  const g = d.SupportedCRS;
  if (g && (f = rt(g)), "projection" in t) {
    const b = rt(t.projection);
    b && (!f || Ne(b, f)) && (f = b);
  }
  let m = !1;
  const _ = f.getAxisOrientation().substr(0, 2) == "ne";
  let p = d.TileMatrix[0], y = {
    MinTileCol: 0,
    MinTileRow: 0,
    MaxTileCol: p.MatrixWidth - 1,
    MaxTileRow: p.MatrixHeight - 1
  };
  if (a) {
    y = a[a.length - 1];
    const b = d.TileMatrix.find(
      (D) => D.Identifier === y.TileMatrix || d.Identifier + ":" + D.Identifier === y.TileMatrix
    );
    b && (p = b);
  }
  const x = p.ScaleDenominator * 28e-5 / f.getMetersPerUnit(), v = _ ? [p.TopLeftCorner[1], p.TopLeftCorner[0]] : p.TopLeftCorner, C = p.TileWidth * x, M = p.TileHeight * x;
  let w = d.BoundingBox;
  w && _ && (w = [
    w[1],
    w[0],
    w[3],
    w[2]
  ]);
  let T = [
    v[0] + C * y.MinTileCol,
    v[1] - M * (1 + y.MaxTileRow),
    v[0] + C * (1 + y.MaxTileCol),
    v[1] - M * y.MinTileRow
  ];
  if (w !== void 0 && !bi(w, T)) {
    const b = n.WGS84BoundingBox, D = rt("EPSG:4326").getExtent();
    if (T = w, b)
      m = b[0] === D[0] && b[2] === D[2];
    else {
      const et = ng(
        w,
        d.SupportedCRS,
        "EPSG:4326"
      );
      m = et[0] - 1e-10 <= D[0] && et[2] + 1e-10 >= D[2];
    }
  }
  const P = l_(
    d,
    T,
    a
  ), F = [];
  let G = t.requestEncoding;
  if (G = G !== void 0 ? G : "", "OperationsMetadata" in i && "GetTile" in i.OperationsMetadata) {
    const b = i.OperationsMetadata.GetTile.DCP.HTTP.Get;
    for (let D = 0, et = b.length; D < et; ++D)
      if (b[D].Constraint) {
        const O = b[D].Constraint.find(function(I) {
          return I.name == "GetEncoding";
        }).AllowedValues.Value;
        if (G === "" && (G = O[0]), G === "KVP")
          O.includes("KVP") && F.push(b[D].href);
        else
          break;
      } else
        b[D].href && (G = "KVP", F.push(b[D].href));
  }
  return F.length === 0 && (G = "REST", n.ResourceURL.forEach(function(b) {
    b.resourceType === "tile" && (l = b.format, F.push(b.template));
  })), {
    urls: F,
    layer: t.layer,
    matrixSet: o,
    format: l,
    projection: f,
    requestEncoding: G,
    tileGrid: P,
    style: h,
    dimensions: c,
    wrapX: m,
    crossOrigin: t.crossOrigin
  };
}
class d_ {
  constructor() {
    this.dataProjection = void 0, this.defaultFeatureProjection = void 0, this.supportedMediaTypes = null;
  }
  getReadOptions(t, e) {
    if (e) {
      let n = e.dataProjection ? rt(e.dataProjection) : this.readProjection(t);
      e.extent && n && n.getUnits() === "tile-pixels" && (n = rt(n), n.setWorldExtent(e.extent)), e = {
        dataProjection: n,
        featureProjection: e.featureProjection
      };
    }
    return this.adaptOptions(e);
  }
  adaptOptions(t) {
    return Object.assign(
      {
        dataProjection: this.dataProjection,
        featureProjection: this.defaultFeatureProjection
      },
      t
    );
  }
  getType() {
    return z();
  }
  readFeature(t, e) {
    return z();
  }
  readFeatures(t, e) {
    return z();
  }
  readGeometry(t, e) {
    return z();
  }
  readProjection(t) {
    return z();
  }
  writeFeature(t, e) {
    return z();
  }
  writeFeatures(t, e) {
    return z();
  }
  writeGeometry(t, e) {
    return z();
  }
}
function Au(i, t, e) {
  const n = e ? rt(e.featureProjection) : null, s = e ? rt(e.dataProjection) : null;
  let r;
  if (n && s && !Ne(n, s) ? r = (t ? i.clone() : i).transform(
    t ? n : s,
    t ? s : n
  ) : r = i, t && e && e.decimals !== void 0) {
    const o = Math.pow(10, e.decimals), a = function(l) {
      for (let h = 0, c = l.length; h < c; ++h)
        l[h] = Math.round(l[h] * o) / o;
      return l;
    };
    r === i && (r = i.clone()), r.applyTransform(a);
  }
  return r;
}
class f_ extends d_ {
  constructor() {
    super();
  }
  getType() {
    return "json";
  }
  readFeature(t, e) {
    return this.readFeatureFromObject(
      or(t),
      this.getReadOptions(t, e)
    );
  }
  readFeatures(t, e) {
    return this.readFeaturesFromObject(
      or(t),
      this.getReadOptions(t, e)
    );
  }
  readFeatureFromObject(t, e) {
    return z();
  }
  readFeaturesFromObject(t, e) {
    return z();
  }
  readGeometry(t, e) {
    return this.readGeometryFromObject(
      or(t),
      this.getReadOptions(t, e)
    );
  }
  readGeometryFromObject(t, e) {
    return z();
  }
  readProjection(t) {
    return this.readProjectionFromObject(or(t));
  }
  readProjectionFromObject(t) {
    return z();
  }
  writeFeature(t, e) {
    return JSON.stringify(this.writeFeatureObject(t, e));
  }
  writeFeatureObject(t, e) {
    return z();
  }
  writeFeatures(t, e) {
    return JSON.stringify(this.writeFeaturesObject(t, e));
  }
  writeFeaturesObject(t, e) {
    return z();
  }
  writeGeometry(t, e) {
    return JSON.stringify(this.writeGeometryObject(t, e));
  }
  writeGeometryObject(t, e) {
    return z();
  }
}
function or(i) {
  if (typeof i == "string") {
    const t = JSON.parse(i);
    return t || null;
  } else
    return i !== null ? i : null;
}
const g_ = f_;
class m_ extends g_ {
  constructor(t) {
    t = t || {}, super(), this.dataProjection = rt(
      t.dataProjection ? t.dataProjection : "EPSG:4326"
    ), t.featureProjection && (this.defaultFeatureProjection = rt(t.featureProjection)), this.geometryName_ = t.geometryName, this.extractGeometryName_ = t.extractGeometryName, this.supportedMediaTypes = [
      "application/geo+json",
      "application/vnd.geo+json"
    ];
  }
  readFeatureFromObject(t, e) {
    let n = null;
    t.type === "Feature" ? n = t : n = {
      type: "Feature",
      geometry: t,
      properties: null
    };
    const s = ua(n.geometry, e), r = new oe();
    return this.geometryName_ ? r.setGeometryName(this.geometryName_) : this.extractGeometryName_ && "geometry_name" in n !== void 0 && r.setGeometryName(n.geometry_name), r.setGeometry(s), "id" in n && r.setId(n.id), n.properties && r.setProperties(n.properties, !0), r;
  }
  readFeaturesFromObject(t, e) {
    const n = t;
    let s = null;
    if (n.type === "FeatureCollection") {
      const r = t;
      s = [];
      const o = r.features;
      for (let a = 0, l = o.length; a < l; ++a)
        s.push(this.readFeatureFromObject(o[a], e));
    } else
      s = [this.readFeatureFromObject(t, e)];
    return s;
  }
  readGeometryFromObject(t, e) {
    return ua(t, e);
  }
  readProjectionFromObject(t) {
    const e = t.crs;
    let n;
    return e ? e.type == "name" ? n = rt(e.properties.name) : e.type === "EPSG" ? n = rt("EPSG:" + e.properties.code) : Z(!1, 36) : n = this.dataProjection, n;
  }
  writeFeatureObject(t, e) {
    e = this.adaptOptions(e);
    const n = {
      type: "Feature",
      geometry: null,
      properties: null
    }, s = t.getId();
    if (s !== void 0 && (n.id = s), !t.hasProperties())
      return n;
    const r = t.getProperties(), o = t.getGeometry();
    return o && (n.geometry = da(o, e), delete r[t.getGeometryName()]), Tn(r) || (n.properties = r), n;
  }
  writeFeaturesObject(t, e) {
    e = this.adaptOptions(e);
    const n = [];
    for (let s = 0, r = t.length; s < r; ++s)
      n.push(this.writeFeatureObject(t[s], e));
    return {
      type: "FeatureCollection",
      features: n
    };
  }
  writeGeometryObject(t, e) {
    return da(t, this.adaptOptions(e));
  }
}
function ua(i, t) {
  if (!i)
    return null;
  let e;
  switch (i.type) {
    case "Point": {
      e = p_(i);
      break;
    }
    case "LineString": {
      e = y_(
        i
      );
      break;
    }
    case "Polygon": {
      e = M_(i);
      break;
    }
    case "MultiPoint": {
      e = v_(
        i
      );
      break;
    }
    case "MultiLineString": {
      e = x_(
        i
      );
      break;
    }
    case "MultiPolygon": {
      e = C_(
        i
      );
      break;
    }
    case "GeometryCollection": {
      e = __(
        i
      );
      break;
    }
    default:
      throw new Error("Unsupported GeoJSON type: " + i.type);
  }
  return Au(e, !1, t);
}
function __(i, t) {
  const e = i.geometries.map(
    function(n) {
      return ua(n, t);
    }
  );
  return new wu(e);
}
function p_(i) {
  return new he(i.coordinates);
}
function y_(i) {
  return new Fi(i.coordinates);
}
function x_(i) {
  return new hl(i.coordinates);
}
function v_(i) {
  return new ul(i.coordinates);
}
function C_(i) {
  return new oo(i.coordinates);
}
function M_(i) {
  return new Bi(i.coordinates);
}
function da(i, t) {
  i = Au(i, !0, t);
  const e = i.getType();
  let n;
  switch (e) {
    case "Point": {
      n = R_(i);
      break;
    }
    case "LineString": {
      n = w_(
        i
      );
      break;
    }
    case "Polygon": {
      n = I_(
        i,
        t
      );
      break;
    }
    case "MultiPoint": {
      n = T_(
        i
      );
      break;
    }
    case "MultiLineString": {
      n = S_(
        i
      );
      break;
    }
    case "MultiPolygon": {
      n = b_(
        i,
        t
      );
      break;
    }
    case "GeometryCollection": {
      n = E_(
        i,
        t
      );
      break;
    }
    case "Circle": {
      n = {
        type: "GeometryCollection",
        geometries: []
      };
      break;
    }
    default:
      throw new Error("Unsupported geometry type: " + e);
  }
  return n;
}
function E_(i, t) {
  return t = Object.assign({}, t), delete t.featureProjection, {
    type: "GeometryCollection",
    geometries: i.getGeometriesArray().map(function(n) {
      return da(n, t);
    })
  };
}
function w_(i, t) {
  return {
    type: "LineString",
    coordinates: i.getCoordinates()
  };
}
function S_(i, t) {
  return {
    type: "MultiLineString",
    coordinates: i.getCoordinates()
  };
}
function T_(i, t) {
  return {
    type: "MultiPoint",
    coordinates: i.getCoordinates()
  };
}
function b_(i, t) {
  let e;
  return t && (e = t.rightHanded), {
    type: "MultiPolygon",
    coordinates: i.getCoordinates(e)
  };
}
function R_(i, t) {
  return {
    type: "Point",
    coordinates: i.getCoordinates()
  };
}
function I_(i, t) {
  let e;
  return t && (e = t.rightHanded), {
    type: "Polygon",
    coordinates: i.getCoordinates(e)
  };
}
const L_ = m_;
class P_ {
  constructor(t, e, n) {
    this.nbDraw = 0, this.maxNbDrwa = -1, this.map = t, this.drawElement = e, this.maxNbDrwa = n, this.source = new Be(), this.vector = new gi({
      source: this.source,
      style: new le({
        fill: new ee({
          color: "rgba(255, 255, 255, 0.2)"
        }),
        stroke: new ce({
          color: "#ffcc33",
          width: 2
        }),
        image: new fi({
          radius: 7,
          fill: new ee({
            color: "#ffcc33"
          })
        })
      })
    }), this.map.addLayer(this.vector), this.modify = new bm({ source: this.source }), this.map.addInteraction(this.modify), this.addInteraction();
  }
  removeInteraction() {
    this.draw && this.map.removeInteraction(this.draw), this.snap && this.map.removeInteraction(this.snap);
  }
  couldContinueToDraw() {
    this.maxNbDrwa != -1 && (this.nbDraw += 1, this.nbDraw >= this.maxNbDrwa && this.draw && this.draw.addEventListener("drawend", this.removeInteraction.bind(this)));
  }
  addInteraction() {
    this.draw = new Em({
      source: this.source,
      type: this.drawElement
    }), this.map.addInteraction(this.draw), this.snap = new Im({ source: this.source }), this.map.addInteraction(this.snap), this.draw.addEventListener("drawstart", this.couldContinueToDraw.bind(this));
  }
}
class A_ {
  constructor(t, e) {
    this.data = {}, this.vectorSource = new Be(), this.vectorLayer = new gi(), this.map = t, fetch(e).then((n) => n.json()).then((n) => {
      this.vectorSource = new Be({
        features: new L_().readFeatures(n)
      }), this.vectorLayer = new gi({
        source: this.vectorSource,
        style: this.styleFunction
      }), this.map.addLayer(this.vectorLayer);
    });
  }
  styleFunction() {
    return new le({
      image: new fi({
        radius: 5,
        fill: void 0,
        stroke: new ce({ color: "red", width: 1 })
      })
    });
  }
}
function fl(i, t) {
  return Ou(i, t, []).join("");
}
function Ou(i, t, e) {
  if (i.nodeType == Node.CDATA_SECTION_NODE || i.nodeType == Node.TEXT_NODE)
    t ? e.push(String(i.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : e.push(i.nodeValue);
  else {
    let n;
    for (n = i.firstChild; n; n = n.nextSibling)
      Ou(n, t, e);
  }
  return e;
}
function O_(i) {
  return "documentElement" in i;
}
function gl(i) {
  return new DOMParser().parseFromString(i, "application/xml");
}
function fa(i, t) {
  return function(e, n) {
    const s = i.call(
      t !== void 0 ? t : this,
      e,
      n
    );
    s !== void 0 && n[n.length - 1].push(s);
  };
}
function Ut(i, t, e) {
  return function(n, s) {
    const r = i.call(
      e !== void 0 ? e : this,
      n,
      s
    );
    if (r !== void 0) {
      const o = s[s.length - 1], a = t !== void 0 ? t : n.localName;
      let l;
      a in o ? l = o[a] : (l = [], o[a] = l), l.push(r);
    }
  };
}
function N(i, t, e) {
  return function(n, s) {
    const r = i.call(
      e !== void 0 ? e : this,
      n,
      s
    );
    if (r !== void 0) {
      const o = s[s.length - 1], a = t !== void 0 ? t : n.localName;
      o[a] = r;
    }
  };
}
function Q(i, t, e) {
  e = e !== void 0 ? e : {};
  let n, s;
  for (n = 0, s = i.length; n < s; ++n)
    e[i[n]] = t;
  return e;
}
function F_(i, t, e, n) {
  let s;
  for (s = t.firstElementChild; s; s = s.nextElementSibling) {
    const r = i[s.namespaceURI];
    if (r !== void 0) {
      const o = r[s.localName];
      o !== void 0 && o.call(n, s, e);
    }
  }
}
function lt(i, t, e, n, s) {
  return n.push(i), F_(t, e, n, s), n.pop();
}
function D_(i) {
  i("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"), i("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees"), i("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"), i.WGS84 = i["EPSG:4326"], i["EPSG:3785"] = i["EPSG:3857"], i.GOOGLE = i["EPSG:3857"], i["EPSG:900913"] = i["EPSG:3857"], i["EPSG:102113"] = i["EPSG:3857"];
}
var zi = 1, Vi = 2, cr = 3, N_ = 4, ga = 5, kh = 6378137, k_ = 6356752314e-3, Gh = 0.0066943799901413165, ss = 484813681109536e-20, E = Math.PI / 2, G_ = 0.16666666666666666, $_ = 0.04722222222222222, B_ = 0.022156084656084655, R = 1e-10, Tt = 0.017453292519943295, pe = 57.29577951308232, K = Math.PI / 4, xs = Math.PI * 2, dt = 3.14159265359, $t = {};
$t.greenwich = 0;
$t.lisbon = -9.131906111111;
$t.paris = 2.337229166667;
$t.bogota = -74.080916666667;
$t.madrid = -3.687938888889;
$t.rome = 12.452333333333;
$t.bern = 7.439583333333;
$t.jakarta = 106.807719444444;
$t.ferro = -17.666666666667;
$t.brussels = 4.367975;
$t.stockholm = 18.058277777778;
$t.athens = 23.7163375;
$t.oslo = 10.722916666667;
const z_ = {
  ft: { to_meter: 0.3048 },
  "us-ft": { to_meter: 1200 / 3937 }
};
var $h = /[\s_\-\/\(\)]/g;
function mi(i, t) {
  if (i[t])
    return i[t];
  for (var e = Object.keys(i), n = t.toLowerCase().replace($h, ""), s = -1, r, o; ++s < e.length; )
    if (r = e[s], o = r.toLowerCase().replace($h, ""), o === n)
      return i[r];
}
function ma(i) {
  var t = {}, e = i.split("+").map(function(a) {
    return a.trim();
  }).filter(function(a) {
    return a;
  }).reduce(function(a, l) {
    var h = l.split("=");
    return h.push(!0), a[h[0].toLowerCase()] = h[1], a;
  }, {}), n, s, r, o = {
    proj: "projName",
    datum: "datumCode",
    rf: function(a) {
      t.rf = parseFloat(a);
    },
    lat_0: function(a) {
      t.lat0 = a * Tt;
    },
    lat_1: function(a) {
      t.lat1 = a * Tt;
    },
    lat_2: function(a) {
      t.lat2 = a * Tt;
    },
    lat_ts: function(a) {
      t.lat_ts = a * Tt;
    },
    lon_0: function(a) {
      t.long0 = a * Tt;
    },
    lon_1: function(a) {
      t.long1 = a * Tt;
    },
    lon_2: function(a) {
      t.long2 = a * Tt;
    },
    alpha: function(a) {
      t.alpha = parseFloat(a) * Tt;
    },
    gamma: function(a) {
      t.rectified_grid_angle = parseFloat(a);
    },
    lonc: function(a) {
      t.longc = a * Tt;
    },
    x_0: function(a) {
      t.x0 = parseFloat(a);
    },
    y_0: function(a) {
      t.y0 = parseFloat(a);
    },
    k_0: function(a) {
      t.k0 = parseFloat(a);
    },
    k: function(a) {
      t.k0 = parseFloat(a);
    },
    a: function(a) {
      t.a = parseFloat(a);
    },
    b: function(a) {
      t.b = parseFloat(a);
    },
    r_a: function() {
      t.R_A = !0;
    },
    zone: function(a) {
      t.zone = parseInt(a, 10);
    },
    south: function() {
      t.utmSouth = !0;
    },
    towgs84: function(a) {
      t.datum_params = a.split(",").map(function(l) {
        return parseFloat(l);
      });
    },
    to_meter: function(a) {
      t.to_meter = parseFloat(a);
    },
    units: function(a) {
      t.units = a;
      var l = mi(z_, a);
      l && (t.to_meter = l.to_meter);
    },
    from_greenwich: function(a) {
      t.from_greenwich = a * Tt;
    },
    pm: function(a) {
      var l = mi($t, a);
      t.from_greenwich = (l || parseFloat(a)) * Tt;
    },
    nadgrids: function(a) {
      a === "@null" ? t.datumCode = "none" : t.nadgrids = a;
    },
    axis: function(a) {
      var l = "ewnsud";
      a.length === 3 && l.indexOf(a.substr(0, 1)) !== -1 && l.indexOf(a.substr(1, 1)) !== -1 && l.indexOf(a.substr(2, 1)) !== -1 && (t.axis = a);
    },
    approx: function() {
      t.approx = !0;
    }
  };
  for (n in e)
    s = e[n], n in o ? (r = o[n], typeof r == "function" ? r(s) : t[r] = s) : t[n] = s;
  return typeof t.datumCode == "string" && t.datumCode !== "WGS84" && (t.datumCode = t.datumCode.toLowerCase()), t;
}
var vs = 1, Fu = 2, Du = 3, kr = 4, Nu = 5, ml = -1, V_ = /\s/, j_ = /[A-Za-z]/, W_ = /[A-Za-z84_]/, ao = /[,\]]/, ku = /[\d\.E\-\+]/;
function je(i) {
  if (typeof i != "string")
    throw new Error("not a string");
  this.text = i.trim(), this.level = 0, this.place = 0, this.root = null, this.stack = [], this.currentObject = null, this.state = vs;
}
je.prototype.readCharicter = function() {
  var i = this.text[this.place++];
  if (this.state !== kr)
    for (; V_.test(i); ) {
      if (this.place >= this.text.length)
        return;
      i = this.text[this.place++];
    }
  switch (this.state) {
    case vs:
      return this.neutral(i);
    case Fu:
      return this.keyword(i);
    case kr:
      return this.quoted(i);
    case Nu:
      return this.afterquote(i);
    case Du:
      return this.number(i);
    case ml:
      return;
  }
};
je.prototype.afterquote = function(i) {
  if (i === '"') {
    this.word += '"', this.state = kr;
    return;
  }
  if (ao.test(i)) {
    this.word = this.word.trim(), this.afterItem(i);
    return;
  }
  throw new Error(`havn't handled "` + i + '" in afterquote yet, index ' + this.place);
};
je.prototype.afterItem = function(i) {
  if (i === ",") {
    this.word !== null && this.currentObject.push(this.word), this.word = null, this.state = vs;
    return;
  }
  if (i === "]") {
    this.level--, this.word !== null && (this.currentObject.push(this.word), this.word = null), this.state = vs, this.currentObject = this.stack.pop(), this.currentObject || (this.state = ml);
    return;
  }
};
je.prototype.number = function(i) {
  if (ku.test(i)) {
    this.word += i;
    return;
  }
  if (ao.test(i)) {
    this.word = parseFloat(this.word), this.afterItem(i);
    return;
  }
  throw new Error(`havn't handled "` + i + '" in number yet, index ' + this.place);
};
je.prototype.quoted = function(i) {
  if (i === '"') {
    this.state = Nu;
    return;
  }
  this.word += i;
};
je.prototype.keyword = function(i) {
  if (W_.test(i)) {
    this.word += i;
    return;
  }
  if (i === "[") {
    var t = [];
    t.push(this.word), this.level++, this.root === null ? this.root = t : this.currentObject.push(t), this.stack.push(this.currentObject), this.currentObject = t, this.state = vs;
    return;
  }
  if (ao.test(i)) {
    this.afterItem(i);
    return;
  }
  throw new Error(`havn't handled "` + i + '" in keyword yet, index ' + this.place);
};
je.prototype.neutral = function(i) {
  if (j_.test(i)) {
    this.word = i, this.state = Fu;
    return;
  }
  if (i === '"') {
    this.word = "", this.state = kr;
    return;
  }
  if (ku.test(i)) {
    this.word = i, this.state = Du;
    return;
  }
  if (ao.test(i)) {
    this.afterItem(i);
    return;
  }
  throw new Error(`havn't handled "` + i + '" in neutral yet, index ' + this.place);
};
je.prototype.output = function() {
  for (; this.place < this.text.length; )
    this.readCharicter();
  if (this.state === ml)
    return this.root;
  throw new Error('unable to parse string "' + this.text + '". State is ' + this.state);
};
function U_(i) {
  var t = new je(i);
  return t.output();
}
function Bh(i, t, e) {
  Array.isArray(t) && (e.unshift(t), t = null);
  var n = t ? {} : i, s = e.reduce(function(r, o) {
    return gn(o, r), r;
  }, n);
  t && (i[t] = s);
}
function gn(i, t) {
  if (!Array.isArray(i)) {
    t[i] = !0;
    return;
  }
  var e = i.shift();
  if (e === "PARAMETER" && (e = i.shift()), i.length === 1) {
    if (Array.isArray(i[0])) {
      t[e] = {}, gn(i[0], t[e]);
      return;
    }
    t[e] = i[0];
    return;
  }
  if (!i.length) {
    t[e] = !0;
    return;
  }
  if (e === "TOWGS84") {
    t[e] = i;
    return;
  }
  if (e === "AXIS") {
    e in t || (t[e] = []), t[e].push(i);
    return;
  }
  Array.isArray(e) || (t[e] = {});
  var n;
  switch (e) {
    case "UNIT":
    case "PRIMEM":
    case "VERT_DATUM":
      t[e] = {
        name: i[0].toLowerCase(),
        convert: i[1]
      }, i.length === 3 && gn(i[2], t[e]);
      return;
    case "SPHEROID":
    case "ELLIPSOID":
      t[e] = {
        name: i[0],
        a: i[1],
        rf: i[2]
      }, i.length === 4 && gn(i[3], t[e]);
      return;
    case "PROJECTEDCRS":
    case "PROJCRS":
    case "GEOGCS":
    case "GEOCCS":
    case "PROJCS":
    case "LOCAL_CS":
    case "GEODCRS":
    case "GEODETICCRS":
    case "GEODETICDATUM":
    case "EDATUM":
    case "ENGINEERINGDATUM":
    case "VERT_CS":
    case "VERTCRS":
    case "VERTICALCRS":
    case "COMPD_CS":
    case "COMPOUNDCRS":
    case "ENGINEERINGCRS":
    case "ENGCRS":
    case "FITTED_CS":
    case "LOCAL_DATUM":
    case "DATUM":
      i[0] = ["name", i[0]], Bh(t, e, i);
      return;
    default:
      for (n = -1; ++n < i.length; )
        if (!Array.isArray(i[n]))
          return gn(i, t[e]);
      return Bh(t, e, i);
  }
}
var Z_ = 0.017453292519943295;
function X_(i, t) {
  var e = t[0], n = t[1];
  !(e in i) && n in i && (i[e] = i[n], t.length === 3 && (i[e] = t[2](i[e])));
}
function Ae(i) {
  return i * Z_;
}
function H_(i) {
  if (i.type === "GEOGCS" ? i.projName = "longlat" : i.type === "LOCAL_CS" ? (i.projName = "identity", i.local = !0) : typeof i.PROJECTION == "object" ? i.projName = Object.keys(i.PROJECTION)[0] : i.projName = i.PROJECTION, i.AXIS) {
    for (var t = "", e = 0, n = i.AXIS.length; e < n; ++e) {
      var s = [i.AXIS[e][0].toLowerCase(), i.AXIS[e][1].toLowerCase()];
      s[0].indexOf("north") !== -1 || (s[0] === "y" || s[0] === "lat") && s[1] === "north" ? t += "n" : s[0].indexOf("south") !== -1 || (s[0] === "y" || s[0] === "lat") && s[1] === "south" ? t += "s" : s[0].indexOf("east") !== -1 || (s[0] === "x" || s[0] === "lon") && s[1] === "east" ? t += "e" : (s[0].indexOf("west") !== -1 || (s[0] === "x" || s[0] === "lon") && s[1] === "west") && (t += "w");
    }
    t.length === 2 && (t += "u"), t.length === 3 && (i.axis = t);
  }
  i.UNIT && (i.units = i.UNIT.name.toLowerCase(), i.units === "metre" && (i.units = "meter"), i.UNIT.convert && (i.type === "GEOGCS" ? i.DATUM && i.DATUM.SPHEROID && (i.to_meter = i.UNIT.convert * i.DATUM.SPHEROID.a) : i.to_meter = i.UNIT.convert));
  var r = i.GEOGCS;
  i.type === "GEOGCS" && (r = i), r && (r.DATUM ? i.datumCode = r.DATUM.name.toLowerCase() : i.datumCode = r.name.toLowerCase(), i.datumCode.slice(0, 2) === "d_" && (i.datumCode = i.datumCode.slice(2)), (i.datumCode === "new_zealand_geodetic_datum_1949" || i.datumCode === "new_zealand_1949") && (i.datumCode = "nzgd49"), (i.datumCode === "wgs_1984" || i.datumCode === "world_geodetic_system_1984") && (i.PROJECTION === "Mercator_Auxiliary_Sphere" && (i.sphere = !0), i.datumCode = "wgs84"), i.datumCode.slice(-6) === "_ferro" && (i.datumCode = i.datumCode.slice(0, -6)), i.datumCode.slice(-8) === "_jakarta" && (i.datumCode = i.datumCode.slice(0, -8)), ~i.datumCode.indexOf("belge") && (i.datumCode = "rnb72"), r.DATUM && r.DATUM.SPHEROID && (i.ellps = r.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk"), i.ellps.toLowerCase().slice(0, 13) === "international" && (i.ellps = "intl"), i.a = r.DATUM.SPHEROID.a, i.rf = parseFloat(r.DATUM.SPHEROID.rf, 10)), r.DATUM && r.DATUM.TOWGS84 && (i.datum_params = r.DATUM.TOWGS84), ~i.datumCode.indexOf("osgb_1936") && (i.datumCode = "osgb36"), ~i.datumCode.indexOf("osni_1952") && (i.datumCode = "osni52"), (~i.datumCode.indexOf("tm65") || ~i.datumCode.indexOf("geodetic_datum_of_1965")) && (i.datumCode = "ire65"), i.datumCode === "ch1903+" && (i.datumCode = "ch1903"), ~i.datumCode.indexOf("israel") && (i.datumCode = "isr93")), i.b && !isFinite(i.b) && (i.b = i.a);
  function o(h) {
    var c = i.to_meter || 1;
    return h * c;
  }
  var a = function(h) {
    return X_(i, h);
  }, l = [
    ["standard_parallel_1", "Standard_Parallel_1"],
    ["standard_parallel_1", "Latitude of 1st standard parallel"],
    ["standard_parallel_2", "Standard_Parallel_2"],
    ["standard_parallel_2", "Latitude of 2nd standard parallel"],
    ["false_easting", "False_Easting"],
    ["false_easting", "False easting"],
    ["false-easting", "Easting at false origin"],
    ["false_northing", "False_Northing"],
    ["false_northing", "False northing"],
    ["false_northing", "Northing at false origin"],
    ["central_meridian", "Central_Meridian"],
    ["central_meridian", "Longitude of natural origin"],
    ["central_meridian", "Longitude of false origin"],
    ["latitude_of_origin", "Latitude_Of_Origin"],
    ["latitude_of_origin", "Central_Parallel"],
    ["latitude_of_origin", "Latitude of natural origin"],
    ["latitude_of_origin", "Latitude of false origin"],
    ["scale_factor", "Scale_Factor"],
    ["k0", "scale_factor"],
    ["latitude_of_center", "Latitude_Of_Center"],
    ["latitude_of_center", "Latitude_of_center"],
    ["lat0", "latitude_of_center", Ae],
    ["longitude_of_center", "Longitude_Of_Center"],
    ["longitude_of_center", "Longitude_of_center"],
    ["longc", "longitude_of_center", Ae],
    ["x0", "false_easting", o],
    ["y0", "false_northing", o],
    ["long0", "central_meridian", Ae],
    ["lat0", "latitude_of_origin", Ae],
    ["lat0", "standard_parallel_1", Ae],
    ["lat1", "standard_parallel_1", Ae],
    ["lat2", "standard_parallel_2", Ae],
    ["azimuth", "Azimuth"],
    ["alpha", "azimuth", Ae],
    ["srsCode", "name"]
  ];
  l.forEach(a), !i.long0 && i.longc && (i.projName === "Albers_Conic_Equal_Area" || i.projName === "Lambert_Azimuthal_Equal_Area") && (i.long0 = i.longc), !i.lat_ts && i.lat1 && (i.projName === "Stereographic_South_Pole" || i.projName === "Polar Stereographic (variant B)") && (i.lat0 = Ae(i.lat1 > 0 ? 90 : -90), i.lat_ts = i.lat1);
}
function Gu(i) {
  var t = U_(i), e = t.shift(), n = t.shift();
  t.unshift(["name", n]), t.unshift(["type", e]);
  var s = {};
  return gn(t, s), H_(s), s;
}
function At(i) {
  var t = this;
  if (arguments.length === 2) {
    var e = arguments[1];
    typeof e == "string" ? e.charAt(0) === "+" ? At[i] = ma(arguments[1]) : At[i] = Gu(arguments[1]) : At[i] = e;
  } else if (arguments.length === 1) {
    if (Array.isArray(i))
      return i.map(function(n) {
        Array.isArray(n) ? At.apply(t, n) : At(n);
      });
    if (typeof i == "string") {
      if (i in At)
        return At[i];
    } else
      "EPSG" in i ? At["EPSG:" + i.EPSG] = i : "ESRI" in i ? At["ESRI:" + i.ESRI] = i : "IAU2000" in i ? At["IAU2000:" + i.IAU2000] = i : console.log(i);
    return;
  }
}
D_(At);
function Y_(i) {
  return typeof i == "string";
}
function q_(i) {
  return i in At;
}
var K_ = ["PROJECTEDCRS", "PROJCRS", "GEOGCS", "GEOCCS", "PROJCS", "LOCAL_CS", "GEODCRS", "GEODETICCRS", "GEODETICDATUM", "ENGCRS", "ENGINEERINGCRS"];
function J_(i) {
  return K_.some(function(t) {
    return i.indexOf(t) > -1;
  });
}
var Q_ = ["3857", "900913", "3785", "102113"];
function t2(i) {
  var t = mi(i, "authority");
  if (!!t) {
    var e = mi(t, "epsg");
    return e && Q_.indexOf(e) > -1;
  }
}
function e2(i) {
  var t = mi(i, "extension");
  if (!!t)
    return mi(t, "proj4");
}
function i2(i) {
  return i[0] === "+";
}
function n2(i) {
  if (Y_(i)) {
    if (q_(i))
      return At[i];
    if (J_(i)) {
      var t = Gu(i);
      if (t2(t))
        return At["EPSG:3857"];
      var e = e2(t);
      return e ? ma(e) : t;
    }
    if (i2(i))
      return ma(i);
  } else
    return i;
}
function zh(i, t) {
  i = i || {};
  var e, n;
  if (!t)
    return i;
  for (n in t)
    e = t[n], e !== void 0 && (i[n] = e);
  return i;
}
function Me(i, t, e) {
  var n = i * t;
  return e / Math.sqrt(1 - n * n);
}
function Ls(i) {
  return i < 0 ? -1 : 1;
}
function L(i) {
  return Math.abs(i) <= dt ? i : i - Ls(i) * xs;
}
function ue(i, t, e) {
  var n = i * e, s = 0.5 * i;
  return n = Math.pow((1 - n) / (1 + n), s), Math.tan(0.5 * (E - t)) / n;
}
function Cs(i, t) {
  for (var e = 0.5 * i, n, s, r = E - 2 * Math.atan(t), o = 0; o <= 15; o++)
    if (n = i * Math.sin(r), s = E - 2 * Math.atan(t * Math.pow((1 - n) / (1 + n), e)) - r, r += s, Math.abs(s) <= 1e-10)
      return r;
  return -9999;
}
function s2() {
  var i = this.b / this.a;
  this.es = 1 - i * i, "x0" in this || (this.x0 = 0), "y0" in this || (this.y0 = 0), this.e = Math.sqrt(this.es), this.lat_ts ? this.sphere ? this.k0 = Math.cos(this.lat_ts) : this.k0 = Me(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) : this.k0 || (this.k ? this.k0 = this.k : this.k0 = 1);
}
function r2(i) {
  var t = i.x, e = i.y;
  if (e * pe > 90 && e * pe < -90 && t * pe > 180 && t * pe < -180)
    return null;
  var n, s;
  if (Math.abs(Math.abs(e) - E) <= R)
    return null;
  if (this.sphere)
    n = this.x0 + this.a * this.k0 * L(t - this.long0), s = this.y0 + this.a * this.k0 * Math.log(Math.tan(K + 0.5 * e));
  else {
    var r = Math.sin(e), o = ue(this.e, e, r);
    n = this.x0 + this.a * this.k0 * L(t - this.long0), s = this.y0 - this.a * this.k0 * Math.log(o);
  }
  return i.x = n, i.y = s, i;
}
function o2(i) {
  var t = i.x - this.x0, e = i.y - this.y0, n, s;
  if (this.sphere)
    s = E - 2 * Math.atan(Math.exp(-e / (this.a * this.k0)));
  else {
    var r = Math.exp(-e / (this.a * this.k0));
    if (s = Cs(this.e, r), s === -9999)
      return null;
  }
  return n = L(this.long0 + t / (this.a * this.k0)), i.x = n, i.y = s, i;
}
var a2 = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"];
const l2 = {
  init: s2,
  forward: r2,
  inverse: o2,
  names: a2
};
function h2() {
}
function Vh(i) {
  return i;
}
var c2 = ["longlat", "identity"];
const u2 = {
  init: h2,
  forward: Vh,
  inverse: Vh,
  names: c2
};
var d2 = [l2, u2], ur = {}, Gr = [];
function $u(i, t) {
  var e = Gr.length;
  return i.names ? (Gr[e] = i, i.names.forEach(function(n) {
    ur[n.toLowerCase()] = e;
  }), this) : (console.log(t), !0);
}
function f2(i) {
  if (!i)
    return !1;
  var t = i.toLowerCase();
  if (typeof ur[t] < "u" && Gr[ur[t]])
    return Gr[ur[t]];
}
function g2() {
  d2.forEach($u);
}
const m2 = {
  start: g2,
  add: $u,
  get: f2
};
var V = {};
V.MERIT = {
  a: 6378137,
  rf: 298.257,
  ellipseName: "MERIT 1983"
};
V.SGS85 = {
  a: 6378136,
  rf: 298.257,
  ellipseName: "Soviet Geodetic System 85"
};
V.GRS80 = {
  a: 6378137,
  rf: 298.257222101,
  ellipseName: "GRS 1980(IUGG, 1980)"
};
V.IAU76 = {
  a: 6378140,
  rf: 298.257,
  ellipseName: "IAU 1976"
};
V.airy = {
  a: 6377563396e-3,
  b: 635625691e-2,
  ellipseName: "Airy 1830"
};
V.APL4 = {
  a: 6378137,
  rf: 298.25,
  ellipseName: "Appl. Physics. 1965"
};
V.NWL9D = {
  a: 6378145,
  rf: 298.25,
  ellipseName: "Naval Weapons Lab., 1965"
};
V.mod_airy = {
  a: 6377340189e-3,
  b: 6356034446e-3,
  ellipseName: "Modified Airy"
};
V.andrae = {
  a: 637710443e-2,
  rf: 300,
  ellipseName: "Andrae 1876 (Den., Iclnd.)"
};
V.aust_SA = {
  a: 6378160,
  rf: 298.25,
  ellipseName: "Australian Natl & S. Amer. 1969"
};
V.GRS67 = {
  a: 6378160,
  rf: 298.247167427,
  ellipseName: "GRS 67(IUGG 1967)"
};
V.bessel = {
  a: 6377397155e-3,
  rf: 299.1528128,
  ellipseName: "Bessel 1841"
};
V.bess_nam = {
  a: 6377483865e-3,
  rf: 299.1528128,
  ellipseName: "Bessel 1841 (Namibia)"
};
V.clrk66 = {
  a: 63782064e-1,
  b: 63565838e-1,
  ellipseName: "Clarke 1866"
};
V.clrk80 = {
  a: 6378249145e-3,
  rf: 293.4663,
  ellipseName: "Clarke 1880 mod."
};
V.clrk58 = {
  a: 6378293645208759e-9,
  rf: 294.2606763692654,
  ellipseName: "Clarke 1858"
};
V.CPM = {
  a: 63757387e-1,
  rf: 334.29,
  ellipseName: "Comm. des Poids et Mesures 1799"
};
V.delmbr = {
  a: 6376428,
  rf: 311.5,
  ellipseName: "Delambre 1810 (Belgium)"
};
V.engelis = {
  a: 637813605e-2,
  rf: 298.2566,
  ellipseName: "Engelis 1985"
};
V.evrst30 = {
  a: 6377276345e-3,
  rf: 300.8017,
  ellipseName: "Everest 1830"
};
V.evrst48 = {
  a: 6377304063e-3,
  rf: 300.8017,
  ellipseName: "Everest 1948"
};
V.evrst56 = {
  a: 6377301243e-3,
  rf: 300.8017,
  ellipseName: "Everest 1956"
};
V.evrst69 = {
  a: 6377295664e-3,
  rf: 300.8017,
  ellipseName: "Everest 1969"
};
V.evrstSS = {
  a: 6377298556e-3,
  rf: 300.8017,
  ellipseName: "Everest (Sabah & Sarawak)"
};
V.fschr60 = {
  a: 6378166,
  rf: 298.3,
  ellipseName: "Fischer (Mercury Datum) 1960"
};
V.fschr60m = {
  a: 6378155,
  rf: 298.3,
  ellipseName: "Fischer 1960"
};
V.fschr68 = {
  a: 6378150,
  rf: 298.3,
  ellipseName: "Fischer 1968"
};
V.helmert = {
  a: 6378200,
  rf: 298.3,
  ellipseName: "Helmert 1906"
};
V.hough = {
  a: 6378270,
  rf: 297,
  ellipseName: "Hough"
};
V.intl = {
  a: 6378388,
  rf: 297,
  ellipseName: "International 1909 (Hayford)"
};
V.kaula = {
  a: 6378163,
  rf: 298.24,
  ellipseName: "Kaula 1961"
};
V.lerch = {
  a: 6378139,
  rf: 298.257,
  ellipseName: "Lerch 1979"
};
V.mprts = {
  a: 6397300,
  rf: 191,
  ellipseName: "Maupertius 1738"
};
V.new_intl = {
  a: 63781575e-1,
  b: 63567722e-1,
  ellipseName: "New International 1967"
};
V.plessis = {
  a: 6376523,
  rf: 6355863,
  ellipseName: "Plessis 1817 (France)"
};
V.krass = {
  a: 6378245,
  rf: 298.3,
  ellipseName: "Krassovsky, 1942"
};
V.SEasia = {
  a: 6378155,
  b: 63567733205e-4,
  ellipseName: "Southeast Asia"
};
V.walbeck = {
  a: 6376896,
  b: 63558348467e-4,
  ellipseName: "Walbeck"
};
V.WGS60 = {
  a: 6378165,
  rf: 298.3,
  ellipseName: "WGS 60"
};
V.WGS66 = {
  a: 6378145,
  rf: 298.25,
  ellipseName: "WGS 66"
};
V.WGS7 = {
  a: 6378135,
  rf: 298.26,
  ellipseName: "WGS 72"
};
var _2 = V.WGS84 = {
  a: 6378137,
  rf: 298.257223563,
  ellipseName: "WGS 84"
};
V.sphere = {
  a: 6370997,
  b: 6370997,
  ellipseName: "Normal Sphere (r=6370997)"
};
function p2(i, t, e, n) {
  var s = i * i, r = t * t, o = (s - r) / s, a = 0;
  n ? (i *= 1 - o * (G_ + o * ($_ + o * B_)), s = i * i, o = 0) : a = Math.sqrt(o);
  var l = (s - r) / r;
  return {
    es: o,
    e: a,
    ep2: l
  };
}
function y2(i, t, e, n, s) {
  if (!i) {
    var r = mi(V, n);
    r || (r = _2), i = r.a, t = r.b, e = r.rf;
  }
  return e && !t && (t = (1 - 1 / e) * i), (e === 0 || Math.abs(i - t) < R) && (s = !0, t = i), {
    a: i,
    b: t,
    rf: e,
    sphere: s
  };
}
var wt = {};
wt.wgs84 = {
  towgs84: "0,0,0",
  ellipse: "WGS84",
  datumName: "WGS84"
};
wt.ch1903 = {
  towgs84: "674.374,15.056,405.346",
  ellipse: "bessel",
  datumName: "swiss"
};
wt.ggrs87 = {
  towgs84: "-199.87,74.79,246.62",
  ellipse: "GRS80",
  datumName: "Greek_Geodetic_Reference_System_1987"
};
wt.nad83 = {
  towgs84: "0,0,0",
  ellipse: "GRS80",
  datumName: "North_American_Datum_1983"
};
wt.nad27 = {
  nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
  ellipse: "clrk66",
  datumName: "North_American_Datum_1927"
};
wt.potsdam = {
  towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7",
  ellipse: "bessel",
  datumName: "Potsdam Rauenberg 1950 DHDN"
};
wt.carthage = {
  towgs84: "-263.0,6.0,431.0",
  ellipse: "clark80",
  datumName: "Carthage 1934 Tunisia"
};
wt.hermannskogel = {
  towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
  ellipse: "bessel",
  datumName: "Hermannskogel"
};
wt.osni52 = {
  towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
  ellipse: "airy",
  datumName: "Irish National"
};
wt.ire65 = {
  towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
  ellipse: "mod_airy",
  datumName: "Ireland 1965"
};
wt.rassadiran = {
  towgs84: "-133.63,-157.5,-158.62",
  ellipse: "intl",
  datumName: "Rassadiran"
};
wt.nzgd49 = {
  towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
  ellipse: "intl",
  datumName: "New Zealand Geodetic Datum 1949"
};
wt.osgb36 = {
  towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
  ellipse: "airy",
  datumName: "Airy 1830"
};
wt.s_jtsk = {
  towgs84: "589,76,480",
  ellipse: "bessel",
  datumName: "S-JTSK (Ferro)"
};
wt.beduaram = {
  towgs84: "-106,-87,188",
  ellipse: "clrk80",
  datumName: "Beduaram"
};
wt.gunung_segara = {
  towgs84: "-403,684,41",
  ellipse: "bessel",
  datumName: "Gunung Segara Jakarta"
};
wt.rnb72 = {
  towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
  ellipse: "intl",
  datumName: "Reseau National Belge 1972"
};
function x2(i, t, e, n, s, r, o) {
  var a = {};
  return i === void 0 || i === "none" ? a.datum_type = ga : a.datum_type = N_, t && (a.datum_params = t.map(parseFloat), (a.datum_params[0] !== 0 || a.datum_params[1] !== 0 || a.datum_params[2] !== 0) && (a.datum_type = zi), a.datum_params.length > 3 && (a.datum_params[3] !== 0 || a.datum_params[4] !== 0 || a.datum_params[5] !== 0 || a.datum_params[6] !== 0) && (a.datum_type = Vi, a.datum_params[3] *= ss, a.datum_params[4] *= ss, a.datum_params[5] *= ss, a.datum_params[6] = a.datum_params[6] / 1e6 + 1)), o && (a.datum_type = cr, a.grids = o), a.a = e, a.b = n, a.es = s, a.ep2 = r, a;
}
var Bu = {};
function v2(i, t) {
  var e = new DataView(t), n = E2(e), s = w2(e, n);
  s.nSubgrids > 1 && console.log("Only single NTv2 subgrids are currently supported, subsequent sub grids are ignored");
  var r = S2(e, s, n), o = { header: s, subgrids: r };
  return Bu[i] = o, o;
}
function C2(i) {
  if (i === void 0)
    return null;
  var t = i.split(",");
  return t.map(M2);
}
function M2(i) {
  if (i.length === 0)
    return null;
  var t = i[0] === "@";
  return t && (i = i.slice(1)), i === "null" ? { name: "null", mandatory: !t, grid: null, isNull: !0 } : {
    name: i,
    mandatory: !t,
    grid: Bu[i] || null,
    isNull: !1
  };
}
function mn(i) {
  return i / 3600 * Math.PI / 180;
}
function E2(i) {
  var t = i.getInt32(8, !1);
  return t === 11 ? !1 : (t = i.getInt32(8, !0), t !== 11 && console.warn("Failed to detect nadgrid endian-ness, defaulting to little-endian"), !0);
}
function w2(i, t) {
  return {
    nFields: i.getInt32(8, t),
    nSubgridFields: i.getInt32(24, t),
    nSubgrids: i.getInt32(40, t),
    shiftType: _a(i, 56, 56 + 8).trim(),
    fromSemiMajorAxis: i.getFloat64(120, t),
    fromSemiMinorAxis: i.getFloat64(136, t),
    toSemiMajorAxis: i.getFloat64(152, t),
    toSemiMinorAxis: i.getFloat64(168, t)
  };
}
function _a(i, t, e) {
  return String.fromCharCode.apply(null, new Uint8Array(i.buffer.slice(t, e)));
}
function S2(i, t, e) {
  for (var n = 176, s = [], r = 0; r < t.nSubgrids; r++) {
    var o = b2(i, n, e), a = R2(i, n, o, e), l = Math.round(
      1 + (o.upperLongitude - o.lowerLongitude) / o.longitudeInterval
    ), h = Math.round(
      1 + (o.upperLatitude - o.lowerLatitude) / o.latitudeInterval
    );
    s.push({
      ll: [mn(o.lowerLongitude), mn(o.lowerLatitude)],
      del: [mn(o.longitudeInterval), mn(o.latitudeInterval)],
      lim: [l, h],
      count: o.gridNodeCount,
      cvs: T2(a)
    });
  }
  return s;
}
function T2(i) {
  return i.map(function(t) {
    return [mn(t.longitudeShift), mn(t.latitudeShift)];
  });
}
function b2(i, t, e) {
  return {
    name: _a(i, t + 8, t + 16).trim(),
    parent: _a(i, t + 24, t + 24 + 8).trim(),
    lowerLatitude: i.getFloat64(t + 72, e),
    upperLatitude: i.getFloat64(t + 88, e),
    lowerLongitude: i.getFloat64(t + 104, e),
    upperLongitude: i.getFloat64(t + 120, e),
    latitudeInterval: i.getFloat64(t + 136, e),
    longitudeInterval: i.getFloat64(t + 152, e),
    gridNodeCount: i.getInt32(t + 168, e)
  };
}
function R2(i, t, e, n) {
  for (var s = t + 176, r = 16, o = [], a = 0; a < e.gridNodeCount; a++) {
    var l = {
      latitudeShift: i.getFloat32(s + a * r, n),
      longitudeShift: i.getFloat32(s + a * r + 4, n),
      latitudeAccuracy: i.getFloat32(s + a * r + 8, n),
      longitudeAccuracy: i.getFloat32(s + a * r + 12, n)
    };
    o.push(l);
  }
  return o;
}
function ve(i, t) {
  if (!(this instanceof ve))
    return new ve(i);
  t = t || function(h) {
    if (h)
      throw h;
  };
  var e = n2(i);
  if (typeof e != "object") {
    t(i);
    return;
  }
  var n = ve.projections.get(e.projName);
  if (!n) {
    t(i);
    return;
  }
  if (e.datumCode && e.datumCode !== "none") {
    var s = mi(wt, e.datumCode);
    s && (e.datum_params = e.datum_params || (s.towgs84 ? s.towgs84.split(",") : null), e.ellps = s.ellipse, e.datumName = s.datumName ? s.datumName : e.datumCode);
  }
  e.k0 = e.k0 || 1, e.axis = e.axis || "enu", e.ellps = e.ellps || "wgs84", e.lat1 = e.lat1 || e.lat0;
  var r = y2(e.a, e.b, e.rf, e.ellps, e.sphere), o = p2(r.a, r.b, r.rf, e.R_A), a = C2(e.nadgrids), l = e.datum || x2(
    e.datumCode,
    e.datum_params,
    r.a,
    r.b,
    o.es,
    o.ep2,
    a
  );
  zh(this, e), zh(this, n), this.a = r.a, this.b = r.b, this.rf = r.rf, this.sphere = r.sphere, this.es = o.es, this.e = o.e, this.ep2 = o.ep2, this.datum = l, this.init(), t(null, this);
}
ve.projections = m2;
ve.projections.start();
function I2(i, t) {
  return i.datum_type !== t.datum_type || i.a !== t.a || Math.abs(i.es - t.es) > 5e-11 ? !1 : i.datum_type === zi ? i.datum_params[0] === t.datum_params[0] && i.datum_params[1] === t.datum_params[1] && i.datum_params[2] === t.datum_params[2] : i.datum_type === Vi ? i.datum_params[0] === t.datum_params[0] && i.datum_params[1] === t.datum_params[1] && i.datum_params[2] === t.datum_params[2] && i.datum_params[3] === t.datum_params[3] && i.datum_params[4] === t.datum_params[4] && i.datum_params[5] === t.datum_params[5] && i.datum_params[6] === t.datum_params[6] : !0;
}
function zu(i, t, e) {
  var n = i.x, s = i.y, r = i.z ? i.z : 0, o, a, l, h;
  if (s < -E && s > -1.001 * E)
    s = -E;
  else if (s > E && s < 1.001 * E)
    s = E;
  else {
    if (s < -E)
      return { x: -1 / 0, y: -1 / 0, z: i.z };
    if (s > E)
      return { x: 1 / 0, y: 1 / 0, z: i.z };
  }
  return n > Math.PI && (n -= 2 * Math.PI), a = Math.sin(s), h = Math.cos(s), l = a * a, o = e / Math.sqrt(1 - t * l), {
    x: (o + r) * h * Math.cos(n),
    y: (o + r) * h * Math.sin(n),
    z: (o * (1 - t) + r) * a
  };
}
function Vu(i, t, e, n) {
  var s = 1e-12, r = s * s, o = 30, a, l, h, c, u, d, f, g, m, _, p, y, x, v = i.x, C = i.y, M = i.z ? i.z : 0, w, T, P;
  if (a = Math.sqrt(v * v + C * C), l = Math.sqrt(v * v + C * C + M * M), a / e < s) {
    if (w = 0, l / e < s)
      return T = E, P = -n, {
        x: i.x,
        y: i.y,
        z: i.z
      };
  } else
    w = Math.atan2(C, v);
  h = M / l, c = a / l, u = 1 / Math.sqrt(1 - t * (2 - t) * c * c), g = c * (1 - t) * u, m = h * u, x = 0;
  do
    x++, f = e / Math.sqrt(1 - t * m * m), P = a * g + M * m - f * (1 - t * m * m), d = t * f / (f + P), u = 1 / Math.sqrt(1 - d * (2 - d) * c * c), _ = c * (1 - d) * u, p = h * u, y = p * g - _ * m, g = _, m = p;
  while (y * y > r && x < o);
  return T = Math.atan(p / Math.abs(_)), {
    x: w,
    y: T,
    z: P
  };
}
function L2(i, t, e) {
  if (t === zi)
    return {
      x: i.x + e[0],
      y: i.y + e[1],
      z: i.z + e[2]
    };
  if (t === Vi) {
    var n = e[0], s = e[1], r = e[2], o = e[3], a = e[4], l = e[5], h = e[6];
    return {
      x: h * (i.x - l * i.y + a * i.z) + n,
      y: h * (l * i.x + i.y - o * i.z) + s,
      z: h * (-a * i.x + o * i.y + i.z) + r
    };
  }
}
function P2(i, t, e) {
  if (t === zi)
    return {
      x: i.x - e[0],
      y: i.y - e[1],
      z: i.z - e[2]
    };
  if (t === Vi) {
    var n = e[0], s = e[1], r = e[2], o = e[3], a = e[4], l = e[5], h = e[6], c = (i.x - n) / h, u = (i.y - s) / h, d = (i.z - r) / h;
    return {
      x: c + l * u - a * d,
      y: -l * c + u + o * d,
      z: a * c - o * u + d
    };
  }
}
function ar(i) {
  return i === zi || i === Vi;
}
function A2(i, t, e) {
  if (I2(i, t) || i.datum_type === ga || t.datum_type === ga)
    return e;
  var n = i.a, s = i.es;
  if (i.datum_type === cr) {
    var r = jh(i, !1, e);
    if (r !== 0)
      return;
    n = kh, s = Gh;
  }
  var o = t.a, a = t.b, l = t.es;
  if (t.datum_type === cr && (o = kh, a = k_, l = Gh), s === l && n === o && !ar(i.datum_type) && !ar(t.datum_type))
    return e;
  if (e = zu(e, s, n), ar(i.datum_type) && (e = L2(e, i.datum_type, i.datum_params)), ar(t.datum_type) && (e = P2(e, t.datum_type, t.datum_params)), e = Vu(e, l, o, a), t.datum_type === cr) {
    var h = jh(t, !0, e);
    if (h !== 0)
      return;
  }
  return e;
}
function jh(i, t, e) {
  if (i.grids === null || i.grids.length === 0)
    return console.log("Grid shift grids not found"), -1;
  for (var n = { x: -e.x, y: e.y }, s = { x: Number.NaN, y: Number.NaN }, r = [], o = 0; o < i.grids.length; o++) {
    var a = i.grids[o];
    if (r.push(a.name), a.isNull) {
      s = n;
      break;
    }
    if (a.mandatory, a.grid === null) {
      if (a.mandatory)
        return console.log("Unable to find mandatory grid '" + a.name + "'"), -1;
      continue;
    }
    var l = a.grid.subgrids[0], h = (Math.abs(l.del[1]) + Math.abs(l.del[0])) / 1e4, c = l.ll[0] - h, u = l.ll[1] - h, d = l.ll[0] + (l.lim[0] - 1) * l.del[0] + h, f = l.ll[1] + (l.lim[1] - 1) * l.del[1] + h;
    if (!(u > n.y || c > n.x || f < n.y || d < n.x) && (s = O2(n, t, l), !isNaN(s.x)))
      break;
  }
  return isNaN(s.x) ? (console.log("Failed to find a grid shift table for location '" + -n.x * pe + " " + n.y * pe + " tried: '" + r + "'"), -1) : (e.x = -s.x, e.y = s.y, 0);
}
function O2(i, t, e) {
  var n = { x: Number.NaN, y: Number.NaN };
  if (isNaN(i.x))
    return n;
  var s = { x: i.x, y: i.y };
  s.x -= e.ll[0], s.y -= e.ll[1], s.x = L(s.x - Math.PI) + Math.PI;
  var r = Wh(s, e);
  if (t) {
    if (isNaN(r.x))
      return n;
    r.x = s.x - r.x, r.y = s.y - r.y;
    var o = 9, a = 1e-12, l, h;
    do {
      if (h = Wh(r, e), isNaN(h.x)) {
        console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
        break;
      }
      l = { x: s.x - (h.x + r.x), y: s.y - (h.y + r.y) }, r.x += l.x, r.y += l.y;
    } while (o-- && Math.abs(l.x) > a && Math.abs(l.y) > a);
    if (o < 0)
      return console.log("Inverse grid shift iterator failed to converge."), n;
    n.x = L(r.x + e.ll[0]), n.y = r.y + e.ll[1];
  } else
    isNaN(r.x) || (n.x = i.x + r.x, n.y = i.y + r.y);
  return n;
}
function Wh(i, t) {
  var e = { x: i.x / t.del[0], y: i.y / t.del[1] }, n = { x: Math.floor(e.x), y: Math.floor(e.y) }, s = { x: e.x - 1 * n.x, y: e.y - 1 * n.y }, r = { x: Number.NaN, y: Number.NaN }, o;
  if (n.x < 0 || n.x >= t.lim[0] || n.y < 0 || n.y >= t.lim[1])
    return r;
  o = n.y * t.lim[0] + n.x;
  var a = { x: t.cvs[o][0], y: t.cvs[o][1] };
  o++;
  var l = { x: t.cvs[o][0], y: t.cvs[o][1] };
  o += t.lim[0];
  var h = { x: t.cvs[o][0], y: t.cvs[o][1] };
  o--;
  var c = { x: t.cvs[o][0], y: t.cvs[o][1] }, u = s.x * s.y, d = s.x * (1 - s.y), f = (1 - s.x) * (1 - s.y), g = (1 - s.x) * s.y;
  return r.x = f * a.x + d * l.x + g * c.x + u * h.x, r.y = f * a.y + d * l.y + g * c.y + u * h.y, r;
}
function Uh(i, t, e) {
  var n = e.x, s = e.y, r = e.z || 0, o, a, l, h = {};
  for (l = 0; l < 3; l++)
    if (!(t && l === 2 && e.z === void 0))
      switch (l === 0 ? (o = n, "ew".indexOf(i.axis[l]) !== -1 ? a = "x" : a = "y") : l === 1 ? (o = s, "ns".indexOf(i.axis[l]) !== -1 ? a = "y" : a = "x") : (o = r, a = "z"), i.axis[l]) {
        case "e":
          h[a] = o;
          break;
        case "w":
          h[a] = -o;
          break;
        case "n":
          h[a] = o;
          break;
        case "s":
          h[a] = -o;
          break;
        case "u":
          e[a] !== void 0 && (h.z = o);
          break;
        case "d":
          e[a] !== void 0 && (h.z = -o);
          break;
        default:
          return null;
      }
  return h;
}
function ju(i) {
  var t = {
    x: i[0],
    y: i[1]
  };
  return i.length > 2 && (t.z = i[2]), i.length > 3 && (t.m = i[3]), t;
}
function F2(i) {
  Zh(i.x), Zh(i.y);
}
function Zh(i) {
  if (typeof Number.isFinite == "function") {
    if (Number.isFinite(i))
      return;
    throw new TypeError("coordinates must be finite numbers");
  }
  if (typeof i != "number" || i !== i || !isFinite(i))
    throw new TypeError("coordinates must be finite numbers");
}
function D2(i, t) {
  return (i.datum.datum_type === zi || i.datum.datum_type === Vi) && t.datumCode !== "WGS84" || (t.datum.datum_type === zi || t.datum.datum_type === Vi) && i.datumCode !== "WGS84";
}
function $r(i, t, e, n) {
  var s;
  if (Array.isArray(e) && (e = ju(e)), F2(e), i.datum && t.datum && D2(i, t) && (s = new ve("WGS84"), e = $r(i, s, e, n), i = s), n && i.axis !== "enu" && (e = Uh(i, !1, e)), i.projName === "longlat")
    e = {
      x: e.x * Tt,
      y: e.y * Tt,
      z: e.z || 0
    };
  else if (i.to_meter && (e = {
    x: e.x * i.to_meter,
    y: e.y * i.to_meter,
    z: e.z || 0
  }), e = i.inverse(e), !e)
    return;
  if (i.from_greenwich && (e.x += i.from_greenwich), e = A2(i.datum, t.datum, e), !!e)
    return t.from_greenwich && (e = {
      x: e.x - t.from_greenwich,
      y: e.y,
      z: e.z || 0
    }), t.projName === "longlat" ? e = {
      x: e.x * pe,
      y: e.y * pe,
      z: e.z || 0
    } : (e = t.forward(e), t.to_meter && (e = {
      x: e.x / t.to_meter,
      y: e.y / t.to_meter,
      z: e.z || 0
    })), n && t.axis !== "enu" ? Uh(t, !0, e) : e;
}
var Xh = ve("WGS84");
function Bo(i, t, e, n) {
  var s, r, o;
  return Array.isArray(e) ? (s = $r(i, t, e, n) || { x: NaN, y: NaN }, e.length > 2 ? typeof i.name < "u" && i.name === "geocent" || typeof t.name < "u" && t.name === "geocent" ? typeof s.z == "number" ? [s.x, s.y, s.z].concat(e.splice(3)) : [s.x, s.y, e[2]].concat(e.splice(3)) : [s.x, s.y].concat(e.splice(2)) : [s.x, s.y]) : (r = $r(i, t, e, n), o = Object.keys(e), o.length === 2 || o.forEach(function(a) {
    if (typeof i.name < "u" && i.name === "geocent" || typeof t.name < "u" && t.name === "geocent") {
      if (a === "x" || a === "y" || a === "z")
        return;
    } else if (a === "x" || a === "y")
      return;
    r[a] = e[a];
  }), r);
}
function Hh(i) {
  return i instanceof ve ? i : i.oProj ? i.oProj : ve(i);
}
function pt(i, t, e) {
  i = Hh(i);
  var n = !1, s;
  return typeof t > "u" ? (t = i, i = Xh, n = !0) : (typeof t.x < "u" || Array.isArray(t)) && (e = t, t = i, i = Xh, n = !0), t = Hh(t), e ? Bo(i, t, e) : (s = {
    forward: function(r, o) {
      return Bo(i, t, r, o);
    },
    inverse: function(r, o) {
      return Bo(t, i, r, o);
    }
  }, n && (s.oProj = t), s);
}
var Yh = 6, Wu = "AJSAJS", Uu = "AFAFAF", _n = 65, kt = 73, Jt = 79, qn = 86, Kn = 90;
const N2 = {
  forward: Zu,
  inverse: k2,
  toPoint: Xu
};
function Zu(i, t) {
  return t = t || 5, B2(G2({
    lat: i[1],
    lon: i[0]
  }), t);
}
function k2(i) {
  var t = _l(Yu(i.toUpperCase()));
  return t.lat && t.lon ? [t.lon, t.lat, t.lon, t.lat] : [t.left, t.bottom, t.right, t.top];
}
function Xu(i) {
  var t = _l(Yu(i.toUpperCase()));
  return t.lat && t.lon ? [t.lon, t.lat] : [(t.left + t.right) / 2, (t.top + t.bottom) / 2];
}
function zo(i) {
  return i * (Math.PI / 180);
}
function qh(i) {
  return 180 * (i / Math.PI);
}
function G2(i) {
  var t = i.lat, e = i.lon, n = 6378137, s = 669438e-8, r = 0.9996, o, a, l, h, c, u, d, f = zo(t), g = zo(e), m, _;
  _ = Math.floor((e + 180) / 6) + 1, e === 180 && (_ = 60), t >= 56 && t < 64 && e >= 3 && e < 12 && (_ = 32), t >= 72 && t < 84 && (e >= 0 && e < 9 ? _ = 31 : e >= 9 && e < 21 ? _ = 33 : e >= 21 && e < 33 ? _ = 35 : e >= 33 && e < 42 && (_ = 37)), o = (_ - 1) * 6 - 180 + 3, m = zo(o), a = s / (1 - s), l = n / Math.sqrt(1 - s * Math.sin(f) * Math.sin(f)), h = Math.tan(f) * Math.tan(f), c = a * Math.cos(f) * Math.cos(f), u = Math.cos(f) * (g - m), d = n * ((1 - s / 4 - 3 * s * s / 64 - 5 * s * s * s / 256) * f - (3 * s / 8 + 3 * s * s / 32 + 45 * s * s * s / 1024) * Math.sin(2 * f) + (15 * s * s / 256 + 45 * s * s * s / 1024) * Math.sin(4 * f) - 35 * s * s * s / 3072 * Math.sin(6 * f));
  var p = r * l * (u + (1 - h + c) * u * u * u / 6 + (5 - 18 * h + h * h + 72 * c - 58 * a) * u * u * u * u * u / 120) + 5e5, y = r * (d + l * Math.tan(f) * (u * u / 2 + (5 - h + 9 * c + 4 * c * c) * u * u * u * u / 24 + (61 - 58 * h + h * h + 600 * c - 330 * a) * u * u * u * u * u * u / 720));
  return t < 0 && (y += 1e7), {
    northing: Math.round(y),
    easting: Math.round(p),
    zoneNumber: _,
    zoneLetter: $2(t)
  };
}
function _l(i) {
  var t = i.northing, e = i.easting, n = i.zoneLetter, s = i.zoneNumber;
  if (s < 0 || s > 60)
    return null;
  var r = 0.9996, o = 6378137, a = 669438e-8, l, h = (1 - Math.sqrt(1 - a)) / (1 + Math.sqrt(1 - a)), c, u, d, f, g, m, _, p, y, x = e - 5e5, v = t;
  n < "N" && (v -= 1e7), _ = (s - 1) * 6 - 180 + 3, l = a / (1 - a), m = v / r, p = m / (o * (1 - a / 4 - 3 * a * a / 64 - 5 * a * a * a / 256)), y = p + (3 * h / 2 - 27 * h * h * h / 32) * Math.sin(2 * p) + (21 * h * h / 16 - 55 * h * h * h * h / 32) * Math.sin(4 * p) + 151 * h * h * h / 96 * Math.sin(6 * p), c = o / Math.sqrt(1 - a * Math.sin(y) * Math.sin(y)), u = Math.tan(y) * Math.tan(y), d = l * Math.cos(y) * Math.cos(y), f = o * (1 - a) / Math.pow(1 - a * Math.sin(y) * Math.sin(y), 1.5), g = x / (c * r);
  var C = y - c * Math.tan(y) / f * (g * g / 2 - (5 + 3 * u + 10 * d - 4 * d * d - 9 * l) * g * g * g * g / 24 + (61 + 90 * u + 298 * d + 45 * u * u - 252 * l - 3 * d * d) * g * g * g * g * g * g / 720);
  C = qh(C);
  var M = (g - (1 + 2 * u + d) * g * g * g / 6 + (5 - 2 * d + 28 * u - 3 * d * d + 8 * l + 24 * u * u) * g * g * g * g * g / 120) / Math.cos(y);
  M = _ + qh(M);
  var w;
  if (i.accuracy) {
    var T = _l({
      northing: i.northing + i.accuracy,
      easting: i.easting + i.accuracy,
      zoneLetter: i.zoneLetter,
      zoneNumber: i.zoneNumber
    });
    w = {
      top: T.lat,
      right: T.lon,
      bottom: C,
      left: M
    };
  } else
    w = {
      lat: C,
      lon: M
    };
  return w;
}
function $2(i) {
  var t = "Z";
  return 84 >= i && i >= 72 ? t = "X" : 72 > i && i >= 64 ? t = "W" : 64 > i && i >= 56 ? t = "V" : 56 > i && i >= 48 ? t = "U" : 48 > i && i >= 40 ? t = "T" : 40 > i && i >= 32 ? t = "S" : 32 > i && i >= 24 ? t = "R" : 24 > i && i >= 16 ? t = "Q" : 16 > i && i >= 8 ? t = "P" : 8 > i && i >= 0 ? t = "N" : 0 > i && i >= -8 ? t = "M" : -8 > i && i >= -16 ? t = "L" : -16 > i && i >= -24 ? t = "K" : -24 > i && i >= -32 ? t = "J" : -32 > i && i >= -40 ? t = "H" : -40 > i && i >= -48 ? t = "G" : -48 > i && i >= -56 ? t = "F" : -56 > i && i >= -64 ? t = "E" : -64 > i && i >= -72 ? t = "D" : -72 > i && i >= -80 && (t = "C"), t;
}
function B2(i, t) {
  var e = "00000" + i.easting, n = "00000" + i.northing;
  return i.zoneNumber + i.zoneLetter + z2(i.easting, i.northing, i.zoneNumber) + e.substr(e.length - 5, t) + n.substr(n.length - 5, t);
}
function z2(i, t, e) {
  var n = Hu(e), s = Math.floor(i / 1e5), r = Math.floor(t / 1e5) % 20;
  return V2(s, r, n);
}
function Hu(i) {
  var t = i % Yh;
  return t === 0 && (t = Yh), t;
}
function V2(i, t, e) {
  var n = e - 1, s = Wu.charCodeAt(n), r = Uu.charCodeAt(n), o = s + i - 1, a = r + t, l = !1;
  o > Kn && (o = o - Kn + _n - 1, l = !0), (o === kt || s < kt && o > kt || (o > kt || s < kt) && l) && o++, (o === Jt || s < Jt && o > Jt || (o > Jt || s < Jt) && l) && (o++, o === kt && o++), o > Kn && (o = o - Kn + _n - 1), a > qn ? (a = a - qn + _n - 1, l = !0) : l = !1, (a === kt || r < kt && a > kt || (a > kt || r < kt) && l) && a++, (a === Jt || r < Jt && a > Jt || (a > Jt || r < Jt) && l) && (a++, a === kt && a++), a > qn && (a = a - qn + _n - 1);
  var h = String.fromCharCode(o) + String.fromCharCode(a);
  return h;
}
function Yu(i) {
  if (i && i.length === 0)
    throw "MGRSPoint coverting from nothing";
  for (var t = i.length, e = null, n = "", s, r = 0; !/[A-Z]/.test(s = i.charAt(r)); ) {
    if (r >= 2)
      throw "MGRSPoint bad conversion from: " + i;
    n += s, r++;
  }
  var o = parseInt(n, 10);
  if (r === 0 || r + 3 > t)
    throw "MGRSPoint bad conversion from: " + i;
  var a = i.charAt(r++);
  if (a <= "A" || a === "B" || a === "Y" || a >= "Z" || a === "I" || a === "O")
    throw "MGRSPoint zone letter " + a + " not handled: " + i;
  e = i.substring(r, r += 2);
  for (var l = Hu(o), h = j2(e.charAt(0), l), c = W2(e.charAt(1), l); c < U2(a); )
    c += 2e6;
  var u = t - r;
  if (u % 2 !== 0)
    throw `MGRSPoint has to have an even number 
of digits after the zone letter and two 100km letters - front 
half for easting meters, second half for 
northing meters` + i;
  var d = u / 2, f = 0, g = 0, m, _, p, y, x;
  return d > 0 && (m = 1e5 / Math.pow(10, d), _ = i.substring(r, r + d), f = parseFloat(_) * m, p = i.substring(r + d), g = parseFloat(p) * m), y = f + h, x = g + c, {
    easting: y,
    northing: x,
    zoneLetter: a,
    zoneNumber: o,
    accuracy: m
  };
}
function j2(i, t) {
  for (var e = Wu.charCodeAt(t - 1), n = 1e5, s = !1; e !== i.charCodeAt(0); ) {
    if (e++, e === kt && e++, e === Jt && e++, e > Kn) {
      if (s)
        throw "Bad character: " + i;
      e = _n, s = !0;
    }
    n += 1e5;
  }
  return n;
}
function W2(i, t) {
  if (i > "V")
    throw "MGRSPoint given invalid Northing " + i;
  for (var e = Uu.charCodeAt(t - 1), n = 0, s = !1; e !== i.charCodeAt(0); ) {
    if (e++, e === kt && e++, e === Jt && e++, e > qn) {
      if (s)
        throw "Bad character: " + i;
      e = _n, s = !0;
    }
    n += 1e5;
  }
  return n;
}
function U2(i) {
  var t;
  switch (i) {
    case "C":
      t = 11e5;
      break;
    case "D":
      t = 2e6;
      break;
    case "E":
      t = 28e5;
      break;
    case "F":
      t = 37e5;
      break;
    case "G":
      t = 46e5;
      break;
    case "H":
      t = 55e5;
      break;
    case "J":
      t = 64e5;
      break;
    case "K":
      t = 73e5;
      break;
    case "L":
      t = 82e5;
      break;
    case "M":
      t = 91e5;
      break;
    case "N":
      t = 0;
      break;
    case "P":
      t = 8e5;
      break;
    case "Q":
      t = 17e5;
      break;
    case "R":
      t = 26e5;
      break;
    case "S":
      t = 35e5;
      break;
    case "T":
      t = 44e5;
      break;
    case "U":
      t = 53e5;
      break;
    case "V":
      t = 62e5;
      break;
    case "W":
      t = 7e6;
      break;
    case "X":
      t = 79e5;
      break;
    default:
      t = -1;
  }
  if (t >= 0)
    return t;
  throw "Invalid zone letter: " + i;
}
function Ln(i, t, e) {
  if (!(this instanceof Ln))
    return new Ln(i, t, e);
  if (Array.isArray(i))
    this.x = i[0], this.y = i[1], this.z = i[2] || 0;
  else if (typeof i == "object")
    this.x = i.x, this.y = i.y, this.z = i.z || 0;
  else if (typeof i == "string" && typeof t > "u") {
    var n = i.split(",");
    this.x = parseFloat(n[0], 10), this.y = parseFloat(n[1], 10), this.z = parseFloat(n[2], 10) || 0;
  } else
    this.x = i, this.y = t, this.z = e || 0;
  console.warn("proj4.Point will be removed in version 3, use proj4.toPoint");
}
Ln.fromMGRS = function(i) {
  return new Ln(Xu(i));
};
Ln.prototype.toMGRS = function(i) {
  return Zu([this.x, this.y], i);
};
var Z2 = 1, X2 = 0.25, Kh = 0.046875, Jh = 0.01953125, Qh = 0.01068115234375, H2 = 0.75, Y2 = 0.46875, q2 = 0.013020833333333334, K2 = 0.007120768229166667, J2 = 0.3645833333333333, Q2 = 0.005696614583333333, tp = 0.3076171875;
function qu(i) {
  var t = [];
  t[0] = Z2 - i * (X2 + i * (Kh + i * (Jh + i * Qh))), t[1] = i * (H2 - i * (Kh + i * (Jh + i * Qh)));
  var e = i * i;
  return t[2] = e * (Y2 - i * (q2 + i * K2)), e *= i, t[3] = e * (J2 - i * Q2), t[4] = e * i * tp, t;
}
function lo(i, t, e, n) {
  return e *= t, t *= t, n[0] * i - e * (n[1] + t * (n[2] + t * (n[3] + t * n[4])));
}
var ep = 20;
function Ku(i, t, e) {
  for (var n = 1 / (1 - t), s = i, r = ep; r; --r) {
    var o = Math.sin(s), a = 1 - t * o * o;
    if (a = (lo(s, o, Math.cos(s), e) - i) * (a * Math.sqrt(a)) * n, s -= a, Math.abs(a) < R)
      return s;
  }
  return s;
}
function ip() {
  this.x0 = this.x0 !== void 0 ? this.x0 : 0, this.y0 = this.y0 !== void 0 ? this.y0 : 0, this.long0 = this.long0 !== void 0 ? this.long0 : 0, this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0, this.es && (this.en = qu(this.es), this.ml0 = lo(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en));
}
function np(i) {
  var t = i.x, e = i.y, n = L(t - this.long0), s, r, o, a = Math.sin(e), l = Math.cos(e);
  if (this.es) {
    var c = l * n, u = Math.pow(c, 2), d = this.ep2 * Math.pow(l, 2), f = Math.pow(d, 2), g = Math.abs(l) > R ? Math.tan(e) : 0, m = Math.pow(g, 2), _ = Math.pow(m, 2);
    s = 1 - this.es * Math.pow(a, 2), c = c / Math.sqrt(s);
    var p = lo(e, a, l, this.en);
    r = this.a * (this.k0 * c * (1 + u / 6 * (1 - m + d + u / 20 * (5 - 18 * m + _ + 14 * d - 58 * m * d + u / 42 * (61 + 179 * _ - _ * m - 479 * m))))) + this.x0, o = this.a * (this.k0 * (p - this.ml0 + a * n * c / 2 * (1 + u / 12 * (5 - m + 9 * d + 4 * f + u / 30 * (61 + _ - 58 * m + 270 * d - 330 * m * d + u / 56 * (1385 + 543 * _ - _ * m - 3111 * m)))))) + this.y0;
  } else {
    var h = l * Math.sin(n);
    if (Math.abs(Math.abs(h) - 1) < R)
      return 93;
    if (r = 0.5 * this.a * this.k0 * Math.log((1 + h) / (1 - h)) + this.x0, o = l * Math.cos(n) / Math.sqrt(1 - Math.pow(h, 2)), h = Math.abs(o), h >= 1) {
      if (h - 1 > R)
        return 93;
      o = 0;
    } else
      o = Math.acos(o);
    e < 0 && (o = -o), o = this.a * this.k0 * (o - this.lat0) + this.y0;
  }
  return i.x = r, i.y = o, i;
}
function sp(i) {
  var t, e, n, s, r = (i.x - this.x0) * (1 / this.a), o = (i.y - this.y0) * (1 / this.a);
  if (this.es)
    if (t = this.ml0 + o / this.k0, e = Ku(t, this.es, this.en), Math.abs(e) < E) {
      var u = Math.sin(e), d = Math.cos(e), f = Math.abs(d) > R ? Math.tan(e) : 0, g = this.ep2 * Math.pow(d, 2), m = Math.pow(g, 2), _ = Math.pow(f, 2), p = Math.pow(_, 2);
      t = 1 - this.es * Math.pow(u, 2);
      var y = r * Math.sqrt(t) / this.k0, x = Math.pow(y, 2);
      t = t * f, n = e - t * x / (1 - this.es) * 0.5 * (1 - x / 12 * (5 + 3 * _ - 9 * g * _ + g - 4 * m - x / 30 * (61 + 90 * _ - 252 * g * _ + 45 * p + 46 * g - x / 56 * (1385 + 3633 * _ + 4095 * p + 1574 * p * _)))), s = L(this.long0 + y * (1 - x / 6 * (1 + 2 * _ + g - x / 20 * (5 + 28 * _ + 24 * p + 8 * g * _ + 6 * g - x / 42 * (61 + 662 * _ + 1320 * p + 720 * p * _)))) / d);
    } else
      n = E * Ls(o), s = 0;
  else {
    var a = Math.exp(r / this.k0), l = 0.5 * (a - 1 / a), h = this.lat0 + o / this.k0, c = Math.cos(h);
    t = Math.sqrt((1 - Math.pow(c, 2)) / (1 + Math.pow(l, 2))), n = Math.asin(t), o < 0 && (n = -n), l === 0 && c === 0 ? s = 0 : s = L(Math.atan2(l, c) + this.long0);
  }
  return i.x = s, i.y = n, i;
}
var rp = ["Fast_Transverse_Mercator", "Fast Transverse Mercator"];
const dr = {
  init: ip,
  forward: np,
  inverse: sp,
  names: rp
};
function Ju(i) {
  var t = Math.exp(i);
  return t = (t - 1 / t) / 2, t;
}
function ae(i, t) {
  i = Math.abs(i), t = Math.abs(t);
  var e = Math.max(i, t), n = Math.min(i, t) / (e || 1);
  return e * Math.sqrt(1 + Math.pow(n, 2));
}
function op(i) {
  var t = 1 + i, e = t - 1;
  return e === 0 ? i : i * Math.log(t) / e;
}
function ap(i) {
  var t = Math.abs(i);
  return t = op(t * (1 + t / (ae(1, t) + 1))), i < 0 ? -t : t;
}
function pl(i, t) {
  for (var e = 2 * Math.cos(2 * t), n = i.length - 1, s = i[n], r = 0, o; --n >= 0; )
    o = -r + e * s + i[n], r = s, s = o;
  return t + o * Math.sin(2 * t);
}
function lp(i, t) {
  for (var e = 2 * Math.cos(t), n = i.length - 1, s = i[n], r = 0, o; --n >= 0; )
    o = -r + e * s + i[n], r = s, s = o;
  return Math.sin(t) * o;
}
function hp(i) {
  var t = Math.exp(i);
  return t = (t + 1 / t) / 2, t;
}
function Qu(i, t, e) {
  for (var n = Math.sin(t), s = Math.cos(t), r = Ju(e), o = hp(e), a = 2 * s * o, l = -2 * n * r, h = i.length - 1, c = i[h], u = 0, d = 0, f = 0, g, m; --h >= 0; )
    g = d, m = u, d = c, u = f, c = -g + a * d - l * u + i[h], f = -m + l * d + a * u;
  return a = n * o, l = s * r, [a * c - l * f, a * f + l * c];
}
function cp() {
  if (!this.approx && (isNaN(this.es) || this.es <= 0))
    throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');
  this.approx && (dr.init.apply(this), this.forward = dr.forward, this.inverse = dr.inverse), this.x0 = this.x0 !== void 0 ? this.x0 : 0, this.y0 = this.y0 !== void 0 ? this.y0 : 0, this.long0 = this.long0 !== void 0 ? this.long0 : 0, this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0, this.cgb = [], this.cbg = [], this.utg = [], this.gtu = [];
  var i = this.es / (1 + Math.sqrt(1 - this.es)), t = i / (2 - i), e = t;
  this.cgb[0] = t * (2 + t * (-2 / 3 + t * (-2 + t * (116 / 45 + t * (26 / 45 + t * (-2854 / 675)))))), this.cbg[0] = t * (-2 + t * (2 / 3 + t * (4 / 3 + t * (-82 / 45 + t * (32 / 45 + t * (4642 / 4725)))))), e = e * t, this.cgb[1] = e * (7 / 3 + t * (-8 / 5 + t * (-227 / 45 + t * (2704 / 315 + t * (2323 / 945))))), this.cbg[1] = e * (5 / 3 + t * (-16 / 15 + t * (-13 / 9 + t * (904 / 315 + t * (-1522 / 945))))), e = e * t, this.cgb[2] = e * (56 / 15 + t * (-136 / 35 + t * (-1262 / 105 + t * (73814 / 2835)))), this.cbg[2] = e * (-26 / 15 + t * (34 / 21 + t * (8 / 5 + t * (-12686 / 2835)))), e = e * t, this.cgb[3] = e * (4279 / 630 + t * (-332 / 35 + t * (-399572 / 14175))), this.cbg[3] = e * (1237 / 630 + t * (-12 / 5 + t * (-24832 / 14175))), e = e * t, this.cgb[4] = e * (4174 / 315 + t * (-144838 / 6237)), this.cbg[4] = e * (-734 / 315 + t * (109598 / 31185)), e = e * t, this.cgb[5] = e * (601676 / 22275), this.cbg[5] = e * (444337 / 155925), e = Math.pow(t, 2), this.Qn = this.k0 / (1 + t) * (1 + e * (1 / 4 + e * (1 / 64 + e / 256))), this.utg[0] = t * (-0.5 + t * (2 / 3 + t * (-37 / 96 + t * (1 / 360 + t * (81 / 512 + t * (-96199 / 604800)))))), this.gtu[0] = t * (0.5 + t * (-2 / 3 + t * (5 / 16 + t * (41 / 180 + t * (-127 / 288 + t * (7891 / 37800)))))), this.utg[1] = e * (-1 / 48 + t * (-1 / 15 + t * (437 / 1440 + t * (-46 / 105 + t * (1118711 / 3870720))))), this.gtu[1] = e * (13 / 48 + t * (-3 / 5 + t * (557 / 1440 + t * (281 / 630 + t * (-1983433 / 1935360))))), e = e * t, this.utg[2] = e * (-17 / 480 + t * (37 / 840 + t * (209 / 4480 + t * (-5569 / 90720)))), this.gtu[2] = e * (61 / 240 + t * (-103 / 140 + t * (15061 / 26880 + t * (167603 / 181440)))), e = e * t, this.utg[3] = e * (-4397 / 161280 + t * (11 / 504 + t * (830251 / 7257600))), this.gtu[3] = e * (49561 / 161280 + t * (-179 / 168 + t * (6601661 / 7257600))), e = e * t, this.utg[4] = e * (-4583 / 161280 + t * (108847 / 3991680)), this.gtu[4] = e * (34729 / 80640 + t * (-3418889 / 1995840)), e = e * t, this.utg[5] = e * (-20648693 / 638668800), this.gtu[5] = e * (212378941 / 319334400);
  var n = pl(this.cbg, this.lat0);
  this.Zb = -this.Qn * (n + lp(this.gtu, 2 * n));
}
function up(i) {
  var t = L(i.x - this.long0), e = i.y;
  e = pl(this.cbg, e);
  var n = Math.sin(e), s = Math.cos(e), r = Math.sin(t), o = Math.cos(t);
  e = Math.atan2(n, o * s), t = Math.atan2(r * s, ae(n, s * o)), t = ap(Math.tan(t));
  var a = Qu(this.gtu, 2 * e, 2 * t);
  e = e + a[0], t = t + a[1];
  var l, h;
  return Math.abs(t) <= 2.623395162778 ? (l = this.a * (this.Qn * t) + this.x0, h = this.a * (this.Qn * e + this.Zb) + this.y0) : (l = 1 / 0, h = 1 / 0), i.x = l, i.y = h, i;
}
function dp(i) {
  var t = (i.x - this.x0) * (1 / this.a), e = (i.y - this.y0) * (1 / this.a);
  e = (e - this.Zb) / this.Qn, t = t / this.Qn;
  var n, s;
  if (Math.abs(t) <= 2.623395162778) {
    var r = Qu(this.utg, 2 * e, 2 * t);
    e = e + r[0], t = t + r[1], t = Math.atan(Ju(t));
    var o = Math.sin(e), a = Math.cos(e), l = Math.sin(t), h = Math.cos(t);
    e = Math.atan2(o * h, ae(l, h * a)), t = Math.atan2(l, h * a), n = L(t + this.long0), s = pl(this.cgb, e);
  } else
    n = 1 / 0, s = 1 / 0;
  return i.x = n, i.y = s, i;
}
var fp = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc", "Transverse_Mercator", "Transverse Mercator", "tmerc"];
const fr = {
  init: cp,
  forward: up,
  inverse: dp,
  names: fp
};
function gp(i, t) {
  if (i === void 0) {
    if (i = Math.floor((L(t) + Math.PI) * 30 / Math.PI) + 1, i < 0)
      return 0;
    if (i > 60)
      return 60;
  }
  return i;
}
var mp = "etmerc";
function _p() {
  var i = gp(this.zone, this.long0);
  if (i === void 0)
    throw new Error("unknown utm zone");
  this.lat0 = 0, this.long0 = (6 * Math.abs(i) - 183) * Tt, this.x0 = 5e5, this.y0 = this.utmSouth ? 1e7 : 0, this.k0 = 0.9996, fr.init.apply(this), this.forward = fr.forward, this.inverse = fr.inverse;
}
var pp = ["Universal Transverse Mercator System", "utm"];
const yp = {
  init: _p,
  names: pp,
  dependsOn: mp
};
function yl(i, t) {
  return Math.pow((1 - i) / (1 + i), t);
}
var xp = 20;
function vp() {
  var i = Math.sin(this.lat0), t = Math.cos(this.lat0);
  t *= t, this.rc = Math.sqrt(1 - this.es) / (1 - this.es * i * i), this.C = Math.sqrt(1 + this.es * t * t / (1 - this.es)), this.phic0 = Math.asin(i / this.C), this.ratexp = 0.5 * this.C * this.e, this.K = Math.tan(0.5 * this.phic0 + K) / (Math.pow(Math.tan(0.5 * this.lat0 + K), this.C) * yl(this.e * i, this.ratexp));
}
function Cp(i) {
  var t = i.x, e = i.y;
  return i.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * e + K), this.C) * yl(this.e * Math.sin(e), this.ratexp)) - E, i.x = this.C * t, i;
}
function Mp(i) {
  for (var t = 1e-14, e = i.x / this.C, n = i.y, s = Math.pow(Math.tan(0.5 * n + K) / this.K, 1 / this.C), r = xp; r > 0 && (n = 2 * Math.atan(s * yl(this.e * Math.sin(i.y), -0.5 * this.e)) - E, !(Math.abs(n - i.y) < t)); --r)
    i.y = n;
  return r ? (i.x = e, i.y = n, i) : null;
}
var Ep = ["gauss"];
const xl = {
  init: vp,
  forward: Cp,
  inverse: Mp,
  names: Ep
};
function wp() {
  xl.init.apply(this), this.rc && (this.sinc0 = Math.sin(this.phic0), this.cosc0 = Math.cos(this.phic0), this.R2 = 2 * this.rc, this.title || (this.title = "Oblique Stereographic Alternative"));
}
function Sp(i) {
  var t, e, n, s;
  return i.x = L(i.x - this.long0), xl.forward.apply(this, [i]), t = Math.sin(i.y), e = Math.cos(i.y), n = Math.cos(i.x), s = this.k0 * this.R2 / (1 + this.sinc0 * t + this.cosc0 * e * n), i.x = s * e * Math.sin(i.x), i.y = s * (this.cosc0 * t - this.sinc0 * e * n), i.x = this.a * i.x + this.x0, i.y = this.a * i.y + this.y0, i;
}
function Tp(i) {
  var t, e, n, s, r;
  if (i.x = (i.x - this.x0) / this.a, i.y = (i.y - this.y0) / this.a, i.x /= this.k0, i.y /= this.k0, r = Math.sqrt(i.x * i.x + i.y * i.y)) {
    var o = 2 * Math.atan2(r, this.R2);
    t = Math.sin(o), e = Math.cos(o), s = Math.asin(e * this.sinc0 + i.y * t * this.cosc0 / r), n = Math.atan2(i.x * t, r * this.cosc0 * e - i.y * this.sinc0 * t);
  } else
    s = this.phic0, n = 0;
  return i.x = n, i.y = s, xl.inverse.apply(this, [i]), i.x = L(i.x + this.long0), i;
}
var bp = ["Stereographic_North_Pole", "Oblique_Stereographic", "Polar_Stereographic", "sterea", "Oblique Stereographic Alternative", "Double_Stereographic"];
const Rp = {
  init: wp,
  forward: Sp,
  inverse: Tp,
  names: bp
};
function Ip(i, t, e) {
  return t *= e, Math.tan(0.5 * (E + i)) * Math.pow((1 - t) / (1 + t), 0.5 * e);
}
function Lp() {
  this.coslat0 = Math.cos(this.lat0), this.sinlat0 = Math.sin(this.lat0), this.sphere ? this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= R && (this.k0 = 0.5 * (1 + Ls(this.lat0) * Math.sin(this.lat_ts))) : (Math.abs(this.coslat0) <= R && (this.lat0 > 0 ? this.con = 1 : this.con = -1), this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e)), this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= R && (this.k0 = 0.5 * this.cons * Me(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / ue(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts))), this.ms1 = Me(this.e, this.sinlat0, this.coslat0), this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - E, this.cosX0 = Math.cos(this.X0), this.sinX0 = Math.sin(this.X0));
}
function Pp(i) {
  var t = i.x, e = i.y, n = Math.sin(e), s = Math.cos(e), r, o, a, l, h, c, u = L(t - this.long0);
  return Math.abs(Math.abs(t - this.long0) - Math.PI) <= R && Math.abs(e + this.lat0) <= R ? (i.x = NaN, i.y = NaN, i) : this.sphere ? (r = 2 * this.k0 / (1 + this.sinlat0 * n + this.coslat0 * s * Math.cos(u)), i.x = this.a * r * s * Math.sin(u) + this.x0, i.y = this.a * r * (this.coslat0 * n - this.sinlat0 * s * Math.cos(u)) + this.y0, i) : (o = 2 * Math.atan(this.ssfn_(e, n, this.e)) - E, l = Math.cos(o), a = Math.sin(o), Math.abs(this.coslat0) <= R ? (h = ue(this.e, e * this.con, this.con * n), c = 2 * this.a * this.k0 * h / this.cons, i.x = this.x0 + c * Math.sin(t - this.long0), i.y = this.y0 - this.con * c * Math.cos(t - this.long0), i) : (Math.abs(this.sinlat0) < R ? (r = 2 * this.a * this.k0 / (1 + l * Math.cos(u)), i.y = r * a) : (r = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * a + this.cosX0 * l * Math.cos(u))), i.y = r * (this.cosX0 * a - this.sinX0 * l * Math.cos(u)) + this.y0), i.x = r * l * Math.sin(u) + this.x0, i));
}
function Ap(i) {
  i.x -= this.x0, i.y -= this.y0;
  var t, e, n, s, r, o = Math.sqrt(i.x * i.x + i.y * i.y);
  if (this.sphere) {
    var a = 2 * Math.atan(o / (2 * this.a * this.k0));
    return t = this.long0, e = this.lat0, o <= R ? (i.x = t, i.y = e, i) : (e = Math.asin(Math.cos(a) * this.sinlat0 + i.y * Math.sin(a) * this.coslat0 / o), Math.abs(this.coslat0) < R ? this.lat0 > 0 ? t = L(this.long0 + Math.atan2(i.x, -1 * i.y)) : t = L(this.long0 + Math.atan2(i.x, i.y)) : t = L(this.long0 + Math.atan2(i.x * Math.sin(a), o * this.coslat0 * Math.cos(a) - i.y * this.sinlat0 * Math.sin(a))), i.x = t, i.y = e, i);
  } else if (Math.abs(this.coslat0) <= R) {
    if (o <= R)
      return e = this.lat0, t = this.long0, i.x = t, i.y = e, i;
    i.x *= this.con, i.y *= this.con, n = o * this.cons / (2 * this.a * this.k0), e = this.con * Cs(this.e, n), t = this.con * L(this.con * this.long0 + Math.atan2(i.x, -1 * i.y));
  } else
    s = 2 * Math.atan(o * this.cosX0 / (2 * this.a * this.k0 * this.ms1)), t = this.long0, o <= R ? r = this.X0 : (r = Math.asin(Math.cos(s) * this.sinX0 + i.y * Math.sin(s) * this.cosX0 / o), t = L(this.long0 + Math.atan2(i.x * Math.sin(s), o * this.cosX0 * Math.cos(s) - i.y * this.sinX0 * Math.sin(s)))), e = -1 * Cs(this.e, Math.tan(0.5 * (E + r)));
  return i.x = t, i.y = e, i;
}
var Op = ["stere", "Stereographic_South_Pole", "Polar Stereographic (variant B)"];
const Fp = {
  init: Lp,
  forward: Pp,
  inverse: Ap,
  names: Op,
  ssfn_: Ip
};
function Dp() {
  var i = this.lat0;
  this.lambda0 = this.long0;
  var t = Math.sin(i), e = this.a, n = this.rf, s = 1 / n, r = 2 * s - Math.pow(s, 2), o = this.e = Math.sqrt(r);
  this.R = this.k0 * e * Math.sqrt(1 - r) / (1 - r * Math.pow(t, 2)), this.alpha = Math.sqrt(1 + r / (1 - r) * Math.pow(Math.cos(i), 4)), this.b0 = Math.asin(t / this.alpha);
  var a = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2)), l = Math.log(Math.tan(Math.PI / 4 + i / 2)), h = Math.log((1 + o * t) / (1 - o * t));
  this.K = a - this.alpha * l + this.alpha * o / 2 * h;
}
function Np(i) {
  var t = Math.log(Math.tan(Math.PI / 4 - i.y / 2)), e = this.e / 2 * Math.log((1 + this.e * Math.sin(i.y)) / (1 - this.e * Math.sin(i.y))), n = -this.alpha * (t + e) + this.K, s = 2 * (Math.atan(Math.exp(n)) - Math.PI / 4), r = this.alpha * (i.x - this.lambda0), o = Math.atan(Math.sin(r) / (Math.sin(this.b0) * Math.tan(s) + Math.cos(this.b0) * Math.cos(r))), a = Math.asin(Math.cos(this.b0) * Math.sin(s) - Math.sin(this.b0) * Math.cos(s) * Math.cos(r));
  return i.y = this.R / 2 * Math.log((1 + Math.sin(a)) / (1 - Math.sin(a))) + this.y0, i.x = this.R * o + this.x0, i;
}
function kp(i) {
  for (var t = i.x - this.x0, e = i.y - this.y0, n = t / this.R, s = 2 * (Math.atan(Math.exp(e / this.R)) - Math.PI / 4), r = Math.asin(Math.cos(this.b0) * Math.sin(s) + Math.sin(this.b0) * Math.cos(s) * Math.cos(n)), o = Math.atan(Math.sin(n) / (Math.cos(this.b0) * Math.cos(n) - Math.sin(this.b0) * Math.tan(s))), a = this.lambda0 + o / this.alpha, l = 0, h = r, c = -1e3, u = 0; Math.abs(h - c) > 1e-7; ) {
    if (++u > 20)
      return;
    l = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + r / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(h)) / 2)), c = h, h = 2 * Math.atan(Math.exp(l)) - Math.PI / 2;
  }
  return i.x = a, i.y = h, i;
}
var Gp = ["somerc"];
const $p = {
  init: Dp,
  forward: Np,
  inverse: kp,
  names: Gp
};
var cn = 1e-7;
function Bp(i) {
  var t = ["Hotine_Oblique_Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin"], e = typeof i.PROJECTION == "object" ? Object.keys(i.PROJECTION)[0] : i.PROJECTION;
  return "no_uoff" in i || "no_off" in i || t.indexOf(e) !== -1;
}
function zp() {
  var i, t, e, n, s, r, o, a, l, h, c = 0, u, d = 0, f = 0, g = 0, m = 0, _ = 0, p = 0;
  this.no_off = Bp(this), this.no_rot = "no_rot" in this;
  var y = !1;
  "alpha" in this && (y = !0);
  var x = !1;
  if ("rectified_grid_angle" in this && (x = !0), y && (p = this.alpha), x && (c = this.rectified_grid_angle * Tt), y || x)
    d = this.longc;
  else if (f = this.long1, m = this.lat1, g = this.long2, _ = this.lat2, Math.abs(m - _) <= cn || (i = Math.abs(m)) <= cn || Math.abs(i - E) <= cn || Math.abs(Math.abs(this.lat0) - E) <= cn || Math.abs(Math.abs(_) - E) <= cn)
    throw new Error();
  var v = 1 - this.es;
  t = Math.sqrt(v), Math.abs(this.lat0) > R ? (a = Math.sin(this.lat0), e = Math.cos(this.lat0), i = 1 - this.es * a * a, this.B = e * e, this.B = Math.sqrt(1 + this.es * this.B * this.B / v), this.A = this.B * this.k0 * t / i, n = this.B * t / (e * Math.sqrt(i)), s = n * n - 1, s <= 0 ? s = 0 : (s = Math.sqrt(s), this.lat0 < 0 && (s = -s)), this.E = s += n, this.E *= Math.pow(ue(this.e, this.lat0, a), this.B)) : (this.B = 1 / t, this.A = this.k0, this.E = n = s = 1), y || x ? (y ? (u = Math.asin(Math.sin(p) / n), x || (c = p)) : (u = c, p = Math.asin(n * Math.sin(u))), this.lam0 = d - Math.asin(0.5 * (s - 1 / s) * Math.tan(u)) / this.B) : (r = Math.pow(ue(this.e, m, Math.sin(m)), this.B), o = Math.pow(ue(this.e, _, Math.sin(_)), this.B), s = this.E / r, l = (o - r) / (o + r), h = this.E * this.E, h = (h - o * r) / (h + o * r), i = f - g, i < -Math.pi ? g -= xs : i > Math.pi && (g += xs), this.lam0 = L(0.5 * (f + g) - Math.atan(h * Math.tan(0.5 * this.B * (f - g)) / l) / this.B), u = Math.atan(2 * Math.sin(this.B * L(f - this.lam0)) / (s - 1 / s)), c = p = Math.asin(n * Math.sin(u))), this.singam = Math.sin(u), this.cosgam = Math.cos(u), this.sinrot = Math.sin(c), this.cosrot = Math.cos(c), this.rB = 1 / this.B, this.ArB = this.A * this.rB, this.BrA = 1 / this.ArB, this.A * this.B, this.no_off ? this.u_0 = 0 : (this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(n * n - 1) / Math.cos(p))), this.lat0 < 0 && (this.u_0 = -this.u_0)), s = 0.5 * u, this.v_pole_n = this.ArB * Math.log(Math.tan(K - s)), this.v_pole_s = this.ArB * Math.log(Math.tan(K + s));
}
function Vp(i) {
  var t = {}, e, n, s, r, o, a, l, h;
  if (i.x = i.x - this.lam0, Math.abs(Math.abs(i.y) - E) > R) {
    if (o = this.E / Math.pow(ue(this.e, i.y, Math.sin(i.y)), this.B), a = 1 / o, e = 0.5 * (o - a), n = 0.5 * (o + a), r = Math.sin(this.B * i.x), s = (e * this.singam - r * this.cosgam) / n, Math.abs(Math.abs(s) - 1) < R)
      throw new Error();
    h = 0.5 * this.ArB * Math.log((1 - s) / (1 + s)), a = Math.cos(this.B * i.x), Math.abs(a) < cn ? l = this.A * i.x : l = this.ArB * Math.atan2(e * this.cosgam + r * this.singam, a);
  } else
    h = i.y > 0 ? this.v_pole_n : this.v_pole_s, l = this.ArB * i.y;
  return this.no_rot ? (t.x = l, t.y = h) : (l -= this.u_0, t.x = h * this.cosrot + l * this.sinrot, t.y = l * this.cosrot - h * this.sinrot), t.x = this.a * t.x + this.x0, t.y = this.a * t.y + this.y0, t;
}
function jp(i) {
  var t, e, n, s, r, o, a, l = {};
  if (i.x = (i.x - this.x0) * (1 / this.a), i.y = (i.y - this.y0) * (1 / this.a), this.no_rot ? (e = i.y, t = i.x) : (e = i.x * this.cosrot - i.y * this.sinrot, t = i.y * this.cosrot + i.x * this.sinrot + this.u_0), n = Math.exp(-this.BrA * e), s = 0.5 * (n - 1 / n), r = 0.5 * (n + 1 / n), o = Math.sin(this.BrA * t), a = (o * this.cosgam + s * this.singam) / r, Math.abs(Math.abs(a) - 1) < R)
    l.x = 0, l.y = a < 0 ? -E : E;
  else {
    if (l.y = this.E / Math.sqrt((1 + a) / (1 - a)), l.y = Cs(this.e, Math.pow(l.y, 1 / this.B)), l.y === 1 / 0)
      throw new Error();
    l.x = -this.rB * Math.atan2(s * this.cosgam - o * this.singam, Math.cos(this.BrA * t));
  }
  return l.x += this.lam0, l;
}
var Wp = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Two_Point_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "Oblique_Mercator", "omerc"];
const Up = {
  init: zp,
  forward: Vp,
  inverse: jp,
  names: Wp
};
function Zp() {
  if (this.lat2 || (this.lat2 = this.lat1), this.k0 || (this.k0 = 1), this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, !(Math.abs(this.lat1 + this.lat2) < R)) {
    var i = this.b / this.a;
    this.e = Math.sqrt(1 - i * i);
    var t = Math.sin(this.lat1), e = Math.cos(this.lat1), n = Me(this.e, t, e), s = ue(this.e, this.lat1, t), r = Math.sin(this.lat2), o = Math.cos(this.lat2), a = Me(this.e, r, o), l = ue(this.e, this.lat2, r), h = ue(this.e, this.lat0, Math.sin(this.lat0));
    Math.abs(this.lat1 - this.lat2) > R ? this.ns = Math.log(n / a) / Math.log(s / l) : this.ns = t, isNaN(this.ns) && (this.ns = t), this.f0 = n / (this.ns * Math.pow(s, this.ns)), this.rh = this.a * this.f0 * Math.pow(h, this.ns), this.title || (this.title = "Lambert Conformal Conic");
  }
}
function Xp(i) {
  var t = i.x, e = i.y;
  Math.abs(2 * Math.abs(e) - Math.PI) <= R && (e = Ls(e) * (E - 2 * R));
  var n = Math.abs(Math.abs(e) - E), s, r;
  if (n > R)
    s = ue(this.e, e, Math.sin(e)), r = this.a * this.f0 * Math.pow(s, this.ns);
  else {
    if (n = e * this.ns, n <= 0)
      return null;
    r = 0;
  }
  var o = this.ns * L(t - this.long0);
  return i.x = this.k0 * (r * Math.sin(o)) + this.x0, i.y = this.k0 * (this.rh - r * Math.cos(o)) + this.y0, i;
}
function Hp(i) {
  var t, e, n, s, r, o = (i.x - this.x0) / this.k0, a = this.rh - (i.y - this.y0) / this.k0;
  this.ns > 0 ? (t = Math.sqrt(o * o + a * a), e = 1) : (t = -Math.sqrt(o * o + a * a), e = -1);
  var l = 0;
  if (t !== 0 && (l = Math.atan2(e * o, e * a)), t !== 0 || this.ns > 0) {
    if (e = 1 / this.ns, n = Math.pow(t / (this.a * this.f0), e), s = Cs(this.e, n), s === -9999)
      return null;
  } else
    s = -E;
  return r = L(l / this.ns + this.long0), i.x = r, i.y = s, i;
}
var Yp = [
  "Lambert Tangential Conformal Conic Projection",
  "Lambert_Conformal_Conic",
  "Lambert_Conformal_Conic_1SP",
  "Lambert_Conformal_Conic_2SP",
  "lcc",
  "Lambert Conic Conformal (1SP)",
  "Lambert Conic Conformal (2SP)"
];
const qp = {
  init: Zp,
  forward: Xp,
  inverse: Hp,
  names: Yp
};
function Kp() {
  this.a = 6377397155e-3, this.es = 0.006674372230614, this.e = Math.sqrt(this.es), this.lat0 || (this.lat0 = 0.863937979737193), this.long0 || (this.long0 = 0.7417649320975901 - 0.308341501185665), this.k0 || (this.k0 = 0.9999), this.s45 = 0.785398163397448, this.s90 = 2 * this.s45, this.fi0 = this.lat0, this.e2 = this.es, this.e = Math.sqrt(this.e2), this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2)), this.uq = 1.04216856380474, this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa), this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2), this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g, this.k1 = this.k0, this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2)), this.s0 = 1.37008346281555, this.n = Math.sin(this.s0), this.ro0 = this.k1 * this.n0 / Math.tan(this.s0), this.ad = this.s90 - this.uq;
}
function Jp(i) {
  var t, e, n, s, r, o, a, l = i.x, h = i.y, c = L(l - this.long0);
  return t = Math.pow((1 + this.e * Math.sin(h)) / (1 - this.e * Math.sin(h)), this.alfa * this.e / 2), e = 2 * (Math.atan(this.k * Math.pow(Math.tan(h / 2 + this.s45), this.alfa) / t) - this.s45), n = -c * this.alfa, s = Math.asin(Math.cos(this.ad) * Math.sin(e) + Math.sin(this.ad) * Math.cos(e) * Math.cos(n)), r = Math.asin(Math.cos(e) * Math.sin(n) / Math.cos(s)), o = this.n * r, a = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n), i.y = a * Math.cos(o) / 1, i.x = a * Math.sin(o) / 1, this.czech || (i.y *= -1, i.x *= -1), i;
}
function Qp(i) {
  var t, e, n, s, r, o, a, l, h = i.x;
  i.x = i.y, i.y = h, this.czech || (i.y *= -1, i.x *= -1), o = Math.sqrt(i.x * i.x + i.y * i.y), r = Math.atan2(i.y, i.x), s = r / Math.sin(this.s0), n = 2 * (Math.atan(Math.pow(this.ro0 / o, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45), t = Math.asin(Math.cos(this.ad) * Math.sin(n) - Math.sin(this.ad) * Math.cos(n) * Math.cos(s)), e = Math.asin(Math.cos(n) * Math.sin(s) / Math.cos(t)), i.x = this.long0 - e / this.alfa, a = t, l = 0;
  var c = 0;
  do
    i.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(t / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(a)) / (1 - this.e * Math.sin(a)), this.e / 2)) - this.s45), Math.abs(a - i.y) < 1e-10 && (l = 1), a = i.y, c += 1;
  while (l === 0 && c < 15);
  return c >= 15 ? null : i;
}
var ty = ["Krovak", "krovak"];
const ey = {
  init: Kp,
  forward: Jp,
  inverse: Qp,
  names: ty
};
function Ft(i, t, e, n, s) {
  return i * s - t * Math.sin(2 * s) + e * Math.sin(4 * s) - n * Math.sin(6 * s);
}
function Ps(i) {
  return 1 - 0.25 * i * (1 + i / 16 * (3 + 1.25 * i));
}
function As(i) {
  return 0.375 * i * (1 + 0.25 * i * (1 + 0.46875 * i));
}
function Os(i) {
  return 0.05859375 * i * i * (1 + 0.75 * i);
}
function Fs(i) {
  return i * i * i * (35 / 3072);
}
function Pn(i, t, e) {
  var n = t * e;
  return i / Math.sqrt(1 - n * n);
}
function Dn(i) {
  return Math.abs(i) < E ? i : i - Ls(i) * Math.PI;
}
function Br(i, t, e, n, s) {
  var r, o;
  r = i / t;
  for (var a = 0; a < 15; a++)
    if (o = (i - (t * r - e * Math.sin(2 * r) + n * Math.sin(4 * r) - s * Math.sin(6 * r))) / (t - 2 * e * Math.cos(2 * r) + 4 * n * Math.cos(4 * r) - 6 * s * Math.cos(6 * r)), r += o, Math.abs(o) <= 1e-10)
      return r;
  return NaN;
}
function iy() {
  this.sphere || (this.e0 = Ps(this.es), this.e1 = As(this.es), this.e2 = Os(this.es), this.e3 = Fs(this.es), this.ml0 = this.a * Ft(this.e0, this.e1, this.e2, this.e3, this.lat0));
}
function ny(i) {
  var t, e, n = i.x, s = i.y;
  if (n = L(n - this.long0), this.sphere)
    t = this.a * Math.asin(Math.cos(s) * Math.sin(n)), e = this.a * (Math.atan2(Math.tan(s), Math.cos(n)) - this.lat0);
  else {
    var r = Math.sin(s), o = Math.cos(s), a = Pn(this.a, this.e, r), l = Math.tan(s) * Math.tan(s), h = n * Math.cos(s), c = h * h, u = this.es * o * o / (1 - this.es), d = this.a * Ft(this.e0, this.e1, this.e2, this.e3, s);
    t = a * h * (1 - c * l * (1 / 6 - (8 - l + 8 * u) * c / 120)), e = d - this.ml0 + a * r / o * c * (0.5 + (5 - l + 6 * u) * c / 24);
  }
  return i.x = t + this.x0, i.y = e + this.y0, i;
}
function sy(i) {
  i.x -= this.x0, i.y -= this.y0;
  var t = i.x / this.a, e = i.y / this.a, n, s;
  if (this.sphere) {
    var r = e + this.lat0;
    n = Math.asin(Math.sin(r) * Math.cos(t)), s = Math.atan2(Math.tan(t), Math.cos(r));
  } else {
    var o = this.ml0 / this.a + e, a = Br(o, this.e0, this.e1, this.e2, this.e3);
    if (Math.abs(Math.abs(a) - E) <= R)
      return i.x = this.long0, i.y = E, e < 0 && (i.y *= -1), i;
    var l = Pn(this.a, this.e, Math.sin(a)), h = l * l * l / this.a / this.a * (1 - this.es), c = Math.pow(Math.tan(a), 2), u = t * this.a / l, d = u * u;
    n = a - l * Math.tan(a) / h * u * u * (0.5 - (1 + 3 * c) * u * u / 24), s = u * (1 - d * (c / 3 + (1 + 3 * c) * c * d / 15)) / Math.cos(a);
  }
  return i.x = L(s + this.long0), i.y = Dn(n), i;
}
var ry = ["Cassini", "Cassini_Soldner", "cass"];
const oy = {
  init: iy,
  forward: ny,
  inverse: sy,
  names: ry
};
function hi(i, t) {
  var e;
  return i > 1e-7 ? (e = i * t, (1 - i * i) * (t / (1 - e * e) - 0.5 / i * Math.log((1 - e) / (1 + e)))) : 2 * t;
}
var ay = 1, ly = 2, hy = 3, cy = 4;
function uy() {
  var i = Math.abs(this.lat0);
  if (Math.abs(i - E) < R ? this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE : Math.abs(i) < R ? this.mode = this.EQUIT : this.mode = this.OBLIQ, this.es > 0) {
    var t;
    switch (this.qp = hi(this.e, 1), this.mmf = 0.5 / (1 - this.es), this.apa = vy(this.es), this.mode) {
      case this.N_POLE:
        this.dd = 1;
        break;
      case this.S_POLE:
        this.dd = 1;
        break;
      case this.EQUIT:
        this.rq = Math.sqrt(0.5 * this.qp), this.dd = 1 / this.rq, this.xmf = 1, this.ymf = 0.5 * this.qp;
        break;
      case this.OBLIQ:
        this.rq = Math.sqrt(0.5 * this.qp), t = Math.sin(this.lat0), this.sinb1 = hi(this.e, t) / this.qp, this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1), this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * t * t) * this.rq * this.cosb1), this.ymf = (this.xmf = this.rq) / this.dd, this.xmf *= this.dd;
        break;
    }
  } else
    this.mode === this.OBLIQ && (this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0));
}
function dy(i) {
  var t, e, n, s, r, o, a, l, h, c, u = i.x, d = i.y;
  if (u = L(u - this.long0), this.sphere) {
    if (r = Math.sin(d), c = Math.cos(d), n = Math.cos(u), this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      if (e = this.mode === this.EQUIT ? 1 + c * n : 1 + this.sinph0 * r + this.cosph0 * c * n, e <= R)
        return null;
      e = Math.sqrt(2 / e), t = e * c * Math.sin(u), e *= this.mode === this.EQUIT ? r : this.cosph0 * r - this.sinph0 * c * n;
    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE && (n = -n), Math.abs(d + this.lat0) < R)
        return null;
      e = K - d * 0.5, e = 2 * (this.mode === this.S_POLE ? Math.cos(e) : Math.sin(e)), t = e * Math.sin(u), e *= n;
    }
  } else {
    switch (a = 0, l = 0, h = 0, n = Math.cos(u), s = Math.sin(u), r = Math.sin(d), o = hi(this.e, r), (this.mode === this.OBLIQ || this.mode === this.EQUIT) && (a = o / this.qp, l = Math.sqrt(1 - a * a)), this.mode) {
      case this.OBLIQ:
        h = 1 + this.sinb1 * a + this.cosb1 * l * n;
        break;
      case this.EQUIT:
        h = 1 + l * n;
        break;
      case this.N_POLE:
        h = E + d, o = this.qp - o;
        break;
      case this.S_POLE:
        h = d - E, o = this.qp + o;
        break;
    }
    if (Math.abs(h) < R)
      return null;
    switch (this.mode) {
      case this.OBLIQ:
      case this.EQUIT:
        h = Math.sqrt(2 / h), this.mode === this.OBLIQ ? e = this.ymf * h * (this.cosb1 * a - this.sinb1 * l * n) : e = (h = Math.sqrt(2 / (1 + l * n))) * a * this.ymf, t = this.xmf * h * l * s;
        break;
      case this.N_POLE:
      case this.S_POLE:
        o >= 0 ? (t = (h = Math.sqrt(o)) * s, e = n * (this.mode === this.S_POLE ? h : -h)) : t = e = 0;
        break;
    }
  }
  return i.x = this.a * t + this.x0, i.y = this.a * e + this.y0, i;
}
function fy(i) {
  i.x -= this.x0, i.y -= this.y0;
  var t = i.x / this.a, e = i.y / this.a, n, s, r, o, a, l, h;
  if (this.sphere) {
    var c = 0, u, d = 0;
    if (u = Math.sqrt(t * t + e * e), s = u * 0.5, s > 1)
      return null;
    switch (s = 2 * Math.asin(s), (this.mode === this.OBLIQ || this.mode === this.EQUIT) && (d = Math.sin(s), c = Math.cos(s)), this.mode) {
      case this.EQUIT:
        s = Math.abs(u) <= R ? 0 : Math.asin(e * d / u), t *= d, e = c * u;
        break;
      case this.OBLIQ:
        s = Math.abs(u) <= R ? this.lat0 : Math.asin(c * this.sinph0 + e * d * this.cosph0 / u), t *= d * this.cosph0, e = (c - Math.sin(s) * this.sinph0) * u;
        break;
      case this.N_POLE:
        e = -e, s = E - s;
        break;
      case this.S_POLE:
        s -= E;
        break;
    }
    n = e === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ) ? 0 : Math.atan2(t, e);
  } else {
    if (h = 0, this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      if (t /= this.dd, e *= this.dd, l = Math.sqrt(t * t + e * e), l < R)
        return i.x = this.long0, i.y = this.lat0, i;
      o = 2 * Math.asin(0.5 * l / this.rq), r = Math.cos(o), t *= o = Math.sin(o), this.mode === this.OBLIQ ? (h = r * this.sinb1 + e * o * this.cosb1 / l, a = this.qp * h, e = l * this.cosb1 * r - e * this.sinb1 * o) : (h = e * o / l, a = this.qp * h, e = l * r);
    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE && (e = -e), a = t * t + e * e, !a)
        return i.x = this.long0, i.y = this.lat0, i;
      h = 1 - a / this.qp, this.mode === this.S_POLE && (h = -h);
    }
    n = Math.atan2(t, e), s = Cy(Math.asin(h), this.apa);
  }
  return i.x = L(this.long0 + n), i.y = s, i;
}
var gy = 0.3333333333333333, my = 0.17222222222222222, _y = 0.10257936507936508, py = 0.06388888888888888, yy = 0.0664021164021164, xy = 0.016415012942191543;
function vy(i) {
  var t, e = [];
  return e[0] = i * gy, t = i * i, e[0] += t * my, e[1] = t * py, t *= i, e[0] += t * _y, e[1] += t * yy, e[2] = t * xy, e;
}
function Cy(i, t) {
  var e = i + i;
  return i + t[0] * Math.sin(e) + t[1] * Math.sin(e + e) + t[2] * Math.sin(e + e + e);
}
var My = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"];
const Ey = {
  init: uy,
  forward: dy,
  inverse: fy,
  names: My,
  S_POLE: ay,
  N_POLE: ly,
  EQUIT: hy,
  OBLIQ: cy
};
function _i(i) {
  return Math.abs(i) > 1 && (i = i > 1 ? 1 : -1), Math.asin(i);
}
function wy() {
  Math.abs(this.lat1 + this.lat2) < R || (this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e3 = Math.sqrt(this.es), this.sin_po = Math.sin(this.lat1), this.cos_po = Math.cos(this.lat1), this.t1 = this.sin_po, this.con = this.sin_po, this.ms1 = Me(this.e3, this.sin_po, this.cos_po), this.qs1 = hi(this.e3, this.sin_po, this.cos_po), this.sin_po = Math.sin(this.lat2), this.cos_po = Math.cos(this.lat2), this.t2 = this.sin_po, this.ms2 = Me(this.e3, this.sin_po, this.cos_po), this.qs2 = hi(this.e3, this.sin_po, this.cos_po), this.sin_po = Math.sin(this.lat0), this.cos_po = Math.cos(this.lat0), this.t3 = this.sin_po, this.qs0 = hi(this.e3, this.sin_po, this.cos_po), Math.abs(this.lat1 - this.lat2) > R ? this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1) : this.ns0 = this.con, this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1, this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0);
}
function Sy(i) {
  var t = i.x, e = i.y;
  this.sin_phi = Math.sin(e), this.cos_phi = Math.cos(e);
  var n = hi(this.e3, this.sin_phi, this.cos_phi), s = this.a * Math.sqrt(this.c - this.ns0 * n) / this.ns0, r = this.ns0 * L(t - this.long0), o = s * Math.sin(r) + this.x0, a = this.rh - s * Math.cos(r) + this.y0;
  return i.x = o, i.y = a, i;
}
function Ty(i) {
  var t, e, n, s, r, o;
  return i.x -= this.x0, i.y = this.rh - i.y + this.y0, this.ns0 >= 0 ? (t = Math.sqrt(i.x * i.x + i.y * i.y), n = 1) : (t = -Math.sqrt(i.x * i.x + i.y * i.y), n = -1), s = 0, t !== 0 && (s = Math.atan2(n * i.x, n * i.y)), n = t * this.ns0 / this.a, this.sphere ? o = Math.asin((this.c - n * n) / (2 * this.ns0)) : (e = (this.c - n * n) / this.ns0, o = this.phi1z(this.e3, e)), r = L(s / this.ns0 + this.long0), i.x = r, i.y = o, i;
}
function by(i, t) {
  var e, n, s, r, o, a = _i(0.5 * t);
  if (i < R)
    return a;
  for (var l = i * i, h = 1; h <= 25; h++)
    if (e = Math.sin(a), n = Math.cos(a), s = i * e, r = 1 - s * s, o = 0.5 * r * r / n * (t / (1 - l) - e / r + 0.5 / i * Math.log((1 - s) / (1 + s))), a = a + o, Math.abs(o) <= 1e-7)
      return a;
  return null;
}
var Ry = ["Albers_Conic_Equal_Area", "Albers", "aea"];
const Iy = {
  init: wy,
  forward: Sy,
  inverse: Ty,
  names: Ry,
  phi1z: by
};
function Ly() {
  this.sin_p14 = Math.sin(this.lat0), this.cos_p14 = Math.cos(this.lat0), this.infinity_dist = 1e3 * this.a, this.rc = 1;
}
function Py(i) {
  var t, e, n, s, r, o, a, l, h = i.x, c = i.y;
  return n = L(h - this.long0), t = Math.sin(c), e = Math.cos(c), s = Math.cos(n), o = this.sin_p14 * t + this.cos_p14 * e * s, r = 1, o > 0 || Math.abs(o) <= R ? (a = this.x0 + this.a * r * e * Math.sin(n) / o, l = this.y0 + this.a * r * (this.cos_p14 * t - this.sin_p14 * e * s) / o) : (a = this.x0 + this.infinity_dist * e * Math.sin(n), l = this.y0 + this.infinity_dist * (this.cos_p14 * t - this.sin_p14 * e * s)), i.x = a, i.y = l, i;
}
function Ay(i) {
  var t, e, n, s, r, o;
  return i.x = (i.x - this.x0) / this.a, i.y = (i.y - this.y0) / this.a, i.x /= this.k0, i.y /= this.k0, (t = Math.sqrt(i.x * i.x + i.y * i.y)) ? (s = Math.atan2(t, this.rc), e = Math.sin(s), n = Math.cos(s), o = _i(n * this.sin_p14 + i.y * e * this.cos_p14 / t), r = Math.atan2(i.x * e, t * this.cos_p14 * n - i.y * this.sin_p14 * e), r = L(this.long0 + r)) : (o = this.phic0, r = 0), i.x = r, i.y = o, i;
}
var Oy = ["gnom"];
const Fy = {
  init: Ly,
  forward: Py,
  inverse: Ay,
  names: Oy
};
function Dy(i, t) {
  var e = 1 - (1 - i * i) / (2 * i) * Math.log((1 - i) / (1 + i));
  if (Math.abs(Math.abs(t) - e) < 1e-6)
    return t < 0 ? -1 * E : E;
  for (var n = Math.asin(0.5 * t), s, r, o, a, l = 0; l < 30; l++)
    if (r = Math.sin(n), o = Math.cos(n), a = i * r, s = Math.pow(1 - a * a, 2) / (2 * o) * (t / (1 - i * i) - r / (1 - a * a) + 0.5 / i * Math.log((1 - a) / (1 + a))), n += s, Math.abs(s) <= 1e-10)
      return n;
  return NaN;
}
function Ny() {
  this.sphere || (this.k0 = Me(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)));
}
function ky(i) {
  var t = i.x, e = i.y, n, s, r = L(t - this.long0);
  if (this.sphere)
    n = this.x0 + this.a * r * Math.cos(this.lat_ts), s = this.y0 + this.a * Math.sin(e) / Math.cos(this.lat_ts);
  else {
    var o = hi(this.e, Math.sin(e));
    n = this.x0 + this.a * this.k0 * r, s = this.y0 + this.a * o * 0.5 / this.k0;
  }
  return i.x = n, i.y = s, i;
}
function Gy(i) {
  i.x -= this.x0, i.y -= this.y0;
  var t, e;
  return this.sphere ? (t = L(this.long0 + i.x / this.a / Math.cos(this.lat_ts)), e = Math.asin(i.y / this.a * Math.cos(this.lat_ts))) : (e = Dy(this.e, 2 * i.y * this.k0 / this.a), t = L(this.long0 + i.x / (this.a * this.k0))), i.x = t, i.y = e, i;
}
var $y = ["cea"];
const By = {
  init: Ny,
  forward: ky,
  inverse: Gy,
  names: $y
};
function zy() {
  this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Equidistant Cylindrical (Plate Carre)", this.rc = Math.cos(this.lat_ts);
}
function Vy(i) {
  var t = i.x, e = i.y, n = L(t - this.long0), s = Dn(e - this.lat0);
  return i.x = this.x0 + this.a * n * this.rc, i.y = this.y0 + this.a * s, i;
}
function jy(i) {
  var t = i.x, e = i.y;
  return i.x = L(this.long0 + (t - this.x0) / (this.a * this.rc)), i.y = Dn(this.lat0 + (e - this.y0) / this.a), i;
}
var Wy = ["Equirectangular", "Equidistant_Cylindrical", "eqc"];
const Uy = {
  init: zy,
  forward: Vy,
  inverse: jy,
  names: Wy
};
var tc = 20;
function Zy() {
  this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = Ps(this.es), this.e1 = As(this.es), this.e2 = Os(this.es), this.e3 = Fs(this.es), this.ml0 = this.a * Ft(this.e0, this.e1, this.e2, this.e3, this.lat0);
}
function Xy(i) {
  var t = i.x, e = i.y, n, s, r, o = L(t - this.long0);
  if (r = o * Math.sin(e), this.sphere)
    Math.abs(e) <= R ? (n = this.a * o, s = -1 * this.a * this.lat0) : (n = this.a * Math.sin(r) / Math.tan(e), s = this.a * (Dn(e - this.lat0) + (1 - Math.cos(r)) / Math.tan(e)));
  else if (Math.abs(e) <= R)
    n = this.a * o, s = -1 * this.ml0;
  else {
    var a = Pn(this.a, this.e, Math.sin(e)) / Math.tan(e);
    n = a * Math.sin(r), s = this.a * Ft(this.e0, this.e1, this.e2, this.e3, e) - this.ml0 + a * (1 - Math.cos(r));
  }
  return i.x = n + this.x0, i.y = s + this.y0, i;
}
function Hy(i) {
  var t, e, n, s, r, o, a, l, h;
  if (n = i.x - this.x0, s = i.y - this.y0, this.sphere)
    if (Math.abs(s + this.a * this.lat0) <= R)
      t = L(n / this.a + this.long0), e = 0;
    else {
      o = this.lat0 + s / this.a, a = n * n / this.a / this.a + o * o, l = o;
      var c;
      for (r = tc; r; --r)
        if (c = Math.tan(l), h = -1 * (o * (l * c + 1) - l - 0.5 * (l * l + a) * c) / ((l - o) / c - 1), l += h, Math.abs(h) <= R) {
          e = l;
          break;
        }
      t = L(this.long0 + Math.asin(n * Math.tan(l) / this.a) / Math.sin(e));
    }
  else if (Math.abs(s + this.ml0) <= R)
    e = 0, t = L(this.long0 + n / this.a);
  else {
    o = (this.ml0 + s) / this.a, a = n * n / this.a / this.a + o * o, l = o;
    var u, d, f, g, m;
    for (r = tc; r; --r)
      if (m = this.e * Math.sin(l), u = Math.sqrt(1 - m * m) * Math.tan(l), d = this.a * Ft(this.e0, this.e1, this.e2, this.e3, l), f = this.e0 - 2 * this.e1 * Math.cos(2 * l) + 4 * this.e2 * Math.cos(4 * l) - 6 * this.e3 * Math.cos(6 * l), g = d / this.a, h = (o * (u * g + 1) - g - 0.5 * u * (g * g + a)) / (this.es * Math.sin(2 * l) * (g * g + a - 2 * o * g) / (4 * u) + (o - g) * (u * f - 2 / Math.sin(2 * l)) - f), l -= h, Math.abs(h) <= R) {
        e = l;
        break;
      }
    u = Math.sqrt(1 - this.es * Math.pow(Math.sin(e), 2)) * Math.tan(e), t = L(this.long0 + Math.asin(n * u / this.a) / Math.sin(e));
  }
  return i.x = t, i.y = e, i;
}
var Yy = ["Polyconic", "poly"];
const qy = {
  init: Zy,
  forward: Xy,
  inverse: Hy,
  names: Yy
};
function Ky() {
  this.A = [], this.A[1] = 0.6399175073, this.A[2] = -0.1358797613, this.A[3] = 0.063294409, this.A[4] = -0.02526853, this.A[5] = 0.0117879, this.A[6] = -55161e-7, this.A[7] = 26906e-7, this.A[8] = -1333e-6, this.A[9] = 67e-5, this.A[10] = -34e-5, this.B_re = [], this.B_im = [], this.B_re[1] = 0.7557853228, this.B_im[1] = 0, this.B_re[2] = 0.249204646, this.B_im[2] = 3371507e-9, this.B_re[3] = -1541739e-9, this.B_im[3] = 0.04105856, this.B_re[4] = -0.10162907, this.B_im[4] = 0.01727609, this.B_re[5] = -0.26623489, this.B_im[5] = -0.36249218, this.B_re[6] = -0.6870983, this.B_im[6] = -1.1651967, this.C_re = [], this.C_im = [], this.C_re[1] = 1.3231270439, this.C_im[1] = 0, this.C_re[2] = -0.577245789, this.C_im[2] = -7809598e-9, this.C_re[3] = 0.508307513, this.C_im[3] = -0.112208952, this.C_re[4] = -0.15094762, this.C_im[4] = 0.18200602, this.C_re[5] = 1.01418179, this.C_im[5] = 1.64497696, this.C_re[6] = 1.9660549, this.C_im[6] = 2.5127645, this.D = [], this.D[1] = 1.5627014243, this.D[2] = 0.5185406398, this.D[3] = -0.03333098, this.D[4] = -0.1052906, this.D[5] = -0.0368594, this.D[6] = 7317e-6, this.D[7] = 0.0122, this.D[8] = 394e-5, this.D[9] = -13e-4;
}
function Jy(i) {
  var t, e = i.x, n = i.y, s = n - this.lat0, r = e - this.long0, o = s / ss * 1e-5, a = r, l = 1, h = 0;
  for (t = 1; t <= 10; t++)
    l = l * o, h = h + this.A[t] * l;
  var c = h, u = a, d = 1, f = 0, g, m, _ = 0, p = 0;
  for (t = 1; t <= 6; t++)
    g = d * c - f * u, m = f * c + d * u, d = g, f = m, _ = _ + this.B_re[t] * d - this.B_im[t] * f, p = p + this.B_im[t] * d + this.B_re[t] * f;
  return i.x = p * this.a + this.x0, i.y = _ * this.a + this.y0, i;
}
function Qy(i) {
  var t, e = i.x, n = i.y, s = e - this.x0, r = n - this.y0, o = r / this.a, a = s / this.a, l = 1, h = 0, c, u, d = 0, f = 0;
  for (t = 1; t <= 6; t++)
    c = l * o - h * a, u = h * o + l * a, l = c, h = u, d = d + this.C_re[t] * l - this.C_im[t] * h, f = f + this.C_im[t] * l + this.C_re[t] * h;
  for (var g = 0; g < this.iterations; g++) {
    var m = d, _ = f, p, y, x = o, v = a;
    for (t = 2; t <= 6; t++)
      p = m * d - _ * f, y = _ * d + m * f, m = p, _ = y, x = x + (t - 1) * (this.B_re[t] * m - this.B_im[t] * _), v = v + (t - 1) * (this.B_im[t] * m + this.B_re[t] * _);
    m = 1, _ = 0;
    var C = this.B_re[1], M = this.B_im[1];
    for (t = 2; t <= 6; t++)
      p = m * d - _ * f, y = _ * d + m * f, m = p, _ = y, C = C + t * (this.B_re[t] * m - this.B_im[t] * _), M = M + t * (this.B_im[t] * m + this.B_re[t] * _);
    var w = C * C + M * M;
    d = (x * C + v * M) / w, f = (v * C - x * M) / w;
  }
  var T = d, P = f, F = 1, G = 0;
  for (t = 1; t <= 9; t++)
    F = F * T, G = G + this.D[t] * F;
  var b = this.lat0 + G * ss * 1e5, D = this.long0 + P;
  return i.x = D, i.y = b, i;
}
var tx = ["New_Zealand_Map_Grid", "nzmg"];
const ex = {
  init: Ky,
  forward: Jy,
  inverse: Qy,
  names: tx
};
function ix() {
}
function nx(i) {
  var t = i.x, e = i.y, n = L(t - this.long0), s = this.x0 + this.a * n, r = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + e / 2.5)) * 1.25;
  return i.x = s, i.y = r, i;
}
function sx(i) {
  i.x -= this.x0, i.y -= this.y0;
  var t = L(this.long0 + i.x / this.a), e = 2.5 * (Math.atan(Math.exp(0.8 * i.y / this.a)) - Math.PI / 4);
  return i.x = t, i.y = e, i;
}
var rx = ["Miller_Cylindrical", "mill"];
const ox = {
  init: ix,
  forward: nx,
  inverse: sx,
  names: rx
};
var ax = 20;
function lx() {
  this.sphere ? (this.n = 1, this.m = 0, this.es = 0, this.C_y = Math.sqrt((this.m + 1) / this.n), this.C_x = this.C_y / (this.m + 1)) : this.en = qu(this.es);
}
function hx(i) {
  var t, e, n = i.x, s = i.y;
  if (n = L(n - this.long0), this.sphere) {
    if (!this.m)
      s = this.n !== 1 ? Math.asin(this.n * Math.sin(s)) : s;
    else
      for (var r = this.n * Math.sin(s), o = ax; o; --o) {
        var a = (this.m * s + Math.sin(s) - r) / (this.m + Math.cos(s));
        if (s -= a, Math.abs(a) < R)
          break;
      }
    t = this.a * this.C_x * n * (this.m + Math.cos(s)), e = this.a * this.C_y * s;
  } else {
    var l = Math.sin(s), h = Math.cos(s);
    e = this.a * lo(s, l, h, this.en), t = this.a * n * h / Math.sqrt(1 - this.es * l * l);
  }
  return i.x = t, i.y = e, i;
}
function cx(i) {
  var t, e, n, s;
  return i.x -= this.x0, n = i.x / this.a, i.y -= this.y0, t = i.y / this.a, this.sphere ? (t /= this.C_y, n = n / (this.C_x * (this.m + Math.cos(t))), this.m ? t = _i((this.m * t + Math.sin(t)) / this.n) : this.n !== 1 && (t = _i(Math.sin(t) / this.n)), n = L(n + this.long0), t = Dn(t)) : (t = Ku(i.y / this.a, this.es, this.en), s = Math.abs(t), s < E ? (s = Math.sin(t), e = this.long0 + i.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(t)), n = L(e)) : s - R < E && (n = this.long0)), i.x = n, i.y = t, i;
}
var ux = ["Sinusoidal", "sinu"];
const dx = {
  init: lx,
  forward: hx,
  inverse: cx,
  names: ux
};
function fx() {
}
function gx(i) {
  for (var t = i.x, e = i.y, n = L(t - this.long0), s = e, r = Math.PI * Math.sin(e); ; ) {
    var o = -(s + Math.sin(s) - r) / (1 + Math.cos(s));
    if (s += o, Math.abs(o) < R)
      break;
  }
  s /= 2, Math.PI / 2 - Math.abs(e) < R && (n = 0);
  var a = 0.900316316158 * this.a * n * Math.cos(s) + this.x0, l = 1.4142135623731 * this.a * Math.sin(s) + this.y0;
  return i.x = a, i.y = l, i;
}
function mx(i) {
  var t, e;
  i.x -= this.x0, i.y -= this.y0, e = i.y / (1.4142135623731 * this.a), Math.abs(e) > 0.999999999999 && (e = 0.999999999999), t = Math.asin(e);
  var n = L(this.long0 + i.x / (0.900316316158 * this.a * Math.cos(t)));
  n < -Math.PI && (n = -Math.PI), n > Math.PI && (n = Math.PI), e = (2 * t + Math.sin(2 * t)) / Math.PI, Math.abs(e) > 1 && (e = 1);
  var s = Math.asin(e);
  return i.x = n, i.y = s, i;
}
var _x = ["Mollweide", "moll"];
const px = {
  init: fx,
  forward: gx,
  inverse: mx,
  names: _x
};
function yx() {
  Math.abs(this.lat1 + this.lat2) < R || (this.lat2 = this.lat2 || this.lat1, this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = Ps(this.es), this.e1 = As(this.es), this.e2 = Os(this.es), this.e3 = Fs(this.es), this.sinphi = Math.sin(this.lat1), this.cosphi = Math.cos(this.lat1), this.ms1 = Me(this.e, this.sinphi, this.cosphi), this.ml1 = Ft(this.e0, this.e1, this.e2, this.e3, this.lat1), Math.abs(this.lat1 - this.lat2) < R ? this.ns = this.sinphi : (this.sinphi = Math.sin(this.lat2), this.cosphi = Math.cos(this.lat2), this.ms2 = Me(this.e, this.sinphi, this.cosphi), this.ml2 = Ft(this.e0, this.e1, this.e2, this.e3, this.lat2), this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1)), this.g = this.ml1 + this.ms1 / this.ns, this.ml0 = Ft(this.e0, this.e1, this.e2, this.e3, this.lat0), this.rh = this.a * (this.g - this.ml0));
}
function xx(i) {
  var t = i.x, e = i.y, n;
  if (this.sphere)
    n = this.a * (this.g - e);
  else {
    var s = Ft(this.e0, this.e1, this.e2, this.e3, e);
    n = this.a * (this.g - s);
  }
  var r = this.ns * L(t - this.long0), o = this.x0 + n * Math.sin(r), a = this.y0 + this.rh - n * Math.cos(r);
  return i.x = o, i.y = a, i;
}
function vx(i) {
  i.x -= this.x0, i.y = this.rh - i.y + this.y0;
  var t, e, n, s;
  this.ns >= 0 ? (e = Math.sqrt(i.x * i.x + i.y * i.y), t = 1) : (e = -Math.sqrt(i.x * i.x + i.y * i.y), t = -1);
  var r = 0;
  if (e !== 0 && (r = Math.atan2(t * i.x, t * i.y)), this.sphere)
    return s = L(this.long0 + r / this.ns), n = Dn(this.g - e / this.a), i.x = s, i.y = n, i;
  var o = this.g - e / this.a;
  return n = Br(o, this.e0, this.e1, this.e2, this.e3), s = L(this.long0 + r / this.ns), i.x = s, i.y = n, i;
}
var Cx = ["Equidistant_Conic", "eqdc"];
const Mx = {
  init: yx,
  forward: xx,
  inverse: vx,
  names: Cx
};
function Ex() {
  this.R = this.a;
}
function wx(i) {
  var t = i.x, e = i.y, n = L(t - this.long0), s, r;
  Math.abs(e) <= R && (s = this.x0 + this.R * n, r = this.y0);
  var o = _i(2 * Math.abs(e / Math.PI));
  (Math.abs(n) <= R || Math.abs(Math.abs(e) - E) <= R) && (s = this.x0, e >= 0 ? r = this.y0 + Math.PI * this.R * Math.tan(0.5 * o) : r = this.y0 + Math.PI * this.R * -Math.tan(0.5 * o));
  var a = 0.5 * Math.abs(Math.PI / n - n / Math.PI), l = a * a, h = Math.sin(o), c = Math.cos(o), u = c / (h + c - 1), d = u * u, f = u * (2 / h - 1), g = f * f, m = Math.PI * this.R * (a * (u - g) + Math.sqrt(l * (u - g) * (u - g) - (g + l) * (d - g))) / (g + l);
  n < 0 && (m = -m), s = this.x0 + m;
  var _ = l + u;
  return m = Math.PI * this.R * (f * _ - a * Math.sqrt((g + l) * (l + 1) - _ * _)) / (g + l), e >= 0 ? r = this.y0 + m : r = this.y0 - m, i.x = s, i.y = r, i;
}
function Sx(i) {
  var t, e, n, s, r, o, a, l, h, c, u, d, f;
  return i.x -= this.x0, i.y -= this.y0, u = Math.PI * this.R, n = i.x / u, s = i.y / u, r = n * n + s * s, o = -Math.abs(s) * (1 + r), a = o - 2 * s * s + n * n, l = -2 * o + 1 + 2 * s * s + r * r, f = s * s / l + (2 * a * a * a / l / l / l - 9 * o * a / l / l) / 27, h = (o - a * a / 3 / l) / l, c = 2 * Math.sqrt(-h / 3), u = 3 * f / h / c, Math.abs(u) > 1 && (u >= 0 ? u = 1 : u = -1), d = Math.acos(u) / 3, i.y >= 0 ? e = (-c * Math.cos(d + Math.PI / 3) - a / 3 / l) * Math.PI : e = -(-c * Math.cos(d + Math.PI / 3) - a / 3 / l) * Math.PI, Math.abs(n) < R ? t = this.long0 : t = L(this.long0 + Math.PI * (r - 1 + Math.sqrt(1 + 2 * (n * n - s * s) + r * r)) / 2 / n), i.x = t, i.y = e, i;
}
var Tx = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"];
const bx = {
  init: Ex,
  forward: wx,
  inverse: Sx,
  names: Tx
};
function Rx() {
  this.sin_p12 = Math.sin(this.lat0), this.cos_p12 = Math.cos(this.lat0);
}
function Ix(i) {
  var t = i.x, e = i.y, n = Math.sin(i.y), s = Math.cos(i.y), r = L(t - this.long0), o, a, l, h, c, u, d, f, g, m, _, p, y, x, v, C, M, w, T, P, F, G, b;
  return this.sphere ? Math.abs(this.sin_p12 - 1) <= R ? (i.x = this.x0 + this.a * (E - e) * Math.sin(r), i.y = this.y0 - this.a * (E - e) * Math.cos(r), i) : Math.abs(this.sin_p12 + 1) <= R ? (i.x = this.x0 + this.a * (E + e) * Math.sin(r), i.y = this.y0 + this.a * (E + e) * Math.cos(r), i) : (w = this.sin_p12 * n + this.cos_p12 * s * Math.cos(r), C = Math.acos(w), M = C ? C / Math.sin(C) : 1, i.x = this.x0 + this.a * M * s * Math.sin(r), i.y = this.y0 + this.a * M * (this.cos_p12 * n - this.sin_p12 * s * Math.cos(r)), i) : (o = Ps(this.es), a = As(this.es), l = Os(this.es), h = Fs(this.es), Math.abs(this.sin_p12 - 1) <= R ? (c = this.a * Ft(o, a, l, h, E), u = this.a * Ft(o, a, l, h, e), i.x = this.x0 + (c - u) * Math.sin(r), i.y = this.y0 - (c - u) * Math.cos(r), i) : Math.abs(this.sin_p12 + 1) <= R ? (c = this.a * Ft(o, a, l, h, E), u = this.a * Ft(o, a, l, h, e), i.x = this.x0 + (c + u) * Math.sin(r), i.y = this.y0 + (c + u) * Math.cos(r), i) : (d = n / s, f = Pn(this.a, this.e, this.sin_p12), g = Pn(this.a, this.e, n), m = Math.atan((1 - this.es) * d + this.es * f * this.sin_p12 / (g * s)), _ = Math.atan2(Math.sin(r), this.cos_p12 * Math.tan(m) - this.sin_p12 * Math.cos(r)), _ === 0 ? T = Math.asin(this.cos_p12 * Math.sin(m) - this.sin_p12 * Math.cos(m)) : Math.abs(Math.abs(_) - Math.PI) <= R ? T = -Math.asin(this.cos_p12 * Math.sin(m) - this.sin_p12 * Math.cos(m)) : T = Math.asin(Math.sin(r) * Math.cos(m) / Math.sin(_)), p = this.e * this.sin_p12 / Math.sqrt(1 - this.es), y = this.e * this.cos_p12 * Math.cos(_) / Math.sqrt(1 - this.es), x = p * y, v = y * y, P = T * T, F = P * T, G = F * T, b = G * T, C = f * T * (1 - P * v * (1 - v) / 6 + F / 8 * x * (1 - 2 * v) + G / 120 * (v * (4 - 7 * v) - 3 * p * p * (1 - 7 * v)) - b / 48 * x), i.x = this.x0 + C * Math.sin(_), i.y = this.y0 + C * Math.cos(_), i));
}
function Lx(i) {
  i.x -= this.x0, i.y -= this.y0;
  var t, e, n, s, r, o, a, l, h, c, u, d, f, g, m, _, p, y, x, v, C, M, w, T;
  return this.sphere ? (t = Math.sqrt(i.x * i.x + i.y * i.y), t > 2 * E * this.a ? void 0 : (e = t / this.a, n = Math.sin(e), s = Math.cos(e), r = this.long0, Math.abs(t) <= R ? o = this.lat0 : (o = _i(s * this.sin_p12 + i.y * n * this.cos_p12 / t), a = Math.abs(this.lat0) - E, Math.abs(a) <= R ? this.lat0 >= 0 ? r = L(this.long0 + Math.atan2(i.x, -i.y)) : r = L(this.long0 - Math.atan2(-i.x, i.y)) : r = L(this.long0 + Math.atan2(i.x * n, t * this.cos_p12 * s - i.y * this.sin_p12 * n))), i.x = r, i.y = o, i)) : (l = Ps(this.es), h = As(this.es), c = Os(this.es), u = Fs(this.es), Math.abs(this.sin_p12 - 1) <= R ? (d = this.a * Ft(l, h, c, u, E), t = Math.sqrt(i.x * i.x + i.y * i.y), f = d - t, o = Br(f / this.a, l, h, c, u), r = L(this.long0 + Math.atan2(i.x, -1 * i.y)), i.x = r, i.y = o, i) : Math.abs(this.sin_p12 + 1) <= R ? (d = this.a * Ft(l, h, c, u, E), t = Math.sqrt(i.x * i.x + i.y * i.y), f = t - d, o = Br(f / this.a, l, h, c, u), r = L(this.long0 + Math.atan2(i.x, i.y)), i.x = r, i.y = o, i) : (t = Math.sqrt(i.x * i.x + i.y * i.y), _ = Math.atan2(i.x, i.y), g = Pn(this.a, this.e, this.sin_p12), p = Math.cos(_), y = this.e * this.cos_p12 * p, x = -y * y / (1 - this.es), v = 3 * this.es * (1 - x) * this.sin_p12 * this.cos_p12 * p / (1 - this.es), C = t / g, M = C - x * (1 + x) * Math.pow(C, 3) / 6 - v * (1 + 3 * x) * Math.pow(C, 4) / 24, w = 1 - x * M * M / 2 - C * M * M * M / 6, m = Math.asin(this.sin_p12 * Math.cos(M) + this.cos_p12 * Math.sin(M) * p), r = L(this.long0 + Math.asin(Math.sin(_) * Math.sin(M) / Math.cos(m))), T = Math.sin(m), o = Math.atan2((T - this.es * w * this.sin_p12) * Math.tan(m), T * (1 - this.es)), i.x = r, i.y = o, i));
}
var Px = ["Azimuthal_Equidistant", "aeqd"];
const Ax = {
  init: Rx,
  forward: Ix,
  inverse: Lx,
  names: Px
};
function Ox() {
  this.sin_p14 = Math.sin(this.lat0), this.cos_p14 = Math.cos(this.lat0);
}
function Fx(i) {
  var t, e, n, s, r, o, a, l, h = i.x, c = i.y;
  return n = L(h - this.long0), t = Math.sin(c), e = Math.cos(c), s = Math.cos(n), o = this.sin_p14 * t + this.cos_p14 * e * s, r = 1, (o > 0 || Math.abs(o) <= R) && (a = this.a * r * e * Math.sin(n), l = this.y0 + this.a * r * (this.cos_p14 * t - this.sin_p14 * e * s)), i.x = a, i.y = l, i;
}
function Dx(i) {
  var t, e, n, s, r, o, a;
  return i.x -= this.x0, i.y -= this.y0, t = Math.sqrt(i.x * i.x + i.y * i.y), e = _i(t / this.a), n = Math.sin(e), s = Math.cos(e), o = this.long0, Math.abs(t) <= R ? (a = this.lat0, i.x = o, i.y = a, i) : (a = _i(s * this.sin_p14 + i.y * n * this.cos_p14 / t), r = Math.abs(this.lat0) - E, Math.abs(r) <= R ? (this.lat0 >= 0 ? o = L(this.long0 + Math.atan2(i.x, -i.y)) : o = L(this.long0 - Math.atan2(-i.x, i.y)), i.x = o, i.y = a, i) : (o = L(this.long0 + Math.atan2(i.x * n, t * this.cos_p14 * s - i.y * this.sin_p14 * n)), i.x = o, i.y = a, i));
}
var Nx = ["ortho"];
const kx = {
  init: Ox,
  forward: Fx,
  inverse: Dx,
  names: Nx
};
var ct = {
  FRONT: 1,
  RIGHT: 2,
  BACK: 3,
  LEFT: 4,
  TOP: 5,
  BOTTOM: 6
}, J = {
  AREA_0: 1,
  AREA_1: 2,
  AREA_2: 3,
  AREA_3: 4
};
function Gx() {
  this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Quadrilateralized Spherical Cube", this.lat0 >= E - K / 2 ? this.face = ct.TOP : this.lat0 <= -(E - K / 2) ? this.face = ct.BOTTOM : Math.abs(this.long0) <= K ? this.face = ct.FRONT : Math.abs(this.long0) <= E + K ? this.face = this.long0 > 0 ? ct.RIGHT : ct.LEFT : this.face = ct.BACK, this.es !== 0 && (this.one_minus_f = 1 - (this.a - this.b) / this.a, this.one_minus_f_squared = this.one_minus_f * this.one_minus_f);
}
function $x(i) {
  var t = { x: 0, y: 0 }, e, n, s, r, o, a, l = { value: 0 };
  if (i.x -= this.long0, this.es !== 0 ? e = Math.atan(this.one_minus_f_squared * Math.tan(i.y)) : e = i.y, n = i.x, this.face === ct.TOP)
    r = E - e, n >= K && n <= E + K ? (l.value = J.AREA_0, s = n - E) : n > E + K || n <= -(E + K) ? (l.value = J.AREA_1, s = n > 0 ? n - dt : n + dt) : n > -(E + K) && n <= -K ? (l.value = J.AREA_2, s = n + E) : (l.value = J.AREA_3, s = n);
  else if (this.face === ct.BOTTOM)
    r = E + e, n >= K && n <= E + K ? (l.value = J.AREA_0, s = -n + E) : n < K && n >= -K ? (l.value = J.AREA_1, s = -n) : n < -K && n >= -(E + K) ? (l.value = J.AREA_2, s = -n - E) : (l.value = J.AREA_3, s = n > 0 ? -n + dt : -n - dt);
  else {
    var h, c, u, d, f, g, m;
    this.face === ct.RIGHT ? n = Cn(n, +E) : this.face === ct.BACK ? n = Cn(n, +dt) : this.face === ct.LEFT && (n = Cn(n, -E)), d = Math.sin(e), f = Math.cos(e), g = Math.sin(n), m = Math.cos(n), h = f * m, c = f * g, u = d, this.face === ct.FRONT ? (r = Math.acos(h), s = lr(r, u, c, l)) : this.face === ct.RIGHT ? (r = Math.acos(c), s = lr(r, u, -h, l)) : this.face === ct.BACK ? (r = Math.acos(-h), s = lr(r, u, -c, l)) : this.face === ct.LEFT ? (r = Math.acos(-c), s = lr(r, u, h, l)) : (r = s = 0, l.value = J.AREA_0);
  }
  return a = Math.atan(12 / dt * (s + Math.acos(Math.sin(s) * Math.cos(K)) - E)), o = Math.sqrt((1 - Math.cos(r)) / (Math.cos(a) * Math.cos(a)) / (1 - Math.cos(Math.atan(1 / Math.cos(s))))), l.value === J.AREA_1 ? a += E : l.value === J.AREA_2 ? a += dt : l.value === J.AREA_3 && (a += 1.5 * dt), t.x = o * Math.cos(a), t.y = o * Math.sin(a), t.x = t.x * this.a + this.x0, t.y = t.y * this.a + this.y0, i.x = t.x, i.y = t.y, i;
}
function Bx(i) {
  var t = { lam: 0, phi: 0 }, e, n, s, r, o, a, l, h, c, u = { value: 0 };
  if (i.x = (i.x - this.x0) / this.a, i.y = (i.y - this.y0) / this.a, n = Math.atan(Math.sqrt(i.x * i.x + i.y * i.y)), e = Math.atan2(i.y, i.x), i.x >= 0 && i.x >= Math.abs(i.y) ? u.value = J.AREA_0 : i.y >= 0 && i.y >= Math.abs(i.x) ? (u.value = J.AREA_1, e -= E) : i.x < 0 && -i.x >= Math.abs(i.y) ? (u.value = J.AREA_2, e = e < 0 ? e + dt : e - dt) : (u.value = J.AREA_3, e += E), c = dt / 12 * Math.tan(e), o = Math.sin(c) / (Math.cos(c) - 1 / Math.sqrt(2)), a = Math.atan(o), s = Math.cos(e), r = Math.tan(n), l = 1 - s * s * r * r * (1 - Math.cos(Math.atan(1 / Math.cos(a)))), l < -1 ? l = -1 : l > 1 && (l = 1), this.face === ct.TOP)
    h = Math.acos(l), t.phi = E - h, u.value === J.AREA_0 ? t.lam = a + E : u.value === J.AREA_1 ? t.lam = a < 0 ? a + dt : a - dt : u.value === J.AREA_2 ? t.lam = a - E : t.lam = a;
  else if (this.face === ct.BOTTOM)
    h = Math.acos(l), t.phi = h - E, u.value === J.AREA_0 ? t.lam = -a + E : u.value === J.AREA_1 ? t.lam = -a : u.value === J.AREA_2 ? t.lam = -a - E : t.lam = a < 0 ? -a - dt : -a + dt;
  else {
    var d, f, g;
    d = l, c = d * d, c >= 1 ? g = 0 : g = Math.sqrt(1 - c) * Math.sin(a), c += g * g, c >= 1 ? f = 0 : f = Math.sqrt(1 - c), u.value === J.AREA_1 ? (c = f, f = -g, g = c) : u.value === J.AREA_2 ? (f = -f, g = -g) : u.value === J.AREA_3 && (c = f, f = g, g = -c), this.face === ct.RIGHT ? (c = d, d = -f, f = c) : this.face === ct.BACK ? (d = -d, f = -f) : this.face === ct.LEFT && (c = d, d = f, f = -c), t.phi = Math.acos(-g) - E, t.lam = Math.atan2(f, d), this.face === ct.RIGHT ? t.lam = Cn(t.lam, -E) : this.face === ct.BACK ? t.lam = Cn(t.lam, -dt) : this.face === ct.LEFT && (t.lam = Cn(t.lam, +E));
  }
  if (this.es !== 0) {
    var m, _, p;
    m = t.phi < 0 ? 1 : 0, _ = Math.tan(t.phi), p = this.b / Math.sqrt(_ * _ + this.one_minus_f_squared), t.phi = Math.atan(Math.sqrt(this.a * this.a - p * p) / (this.one_minus_f * p)), m && (t.phi = -t.phi);
  }
  return t.lam += this.long0, i.x = t.lam, i.y = t.phi, i;
}
function lr(i, t, e, n) {
  var s;
  return i < R ? (n.value = J.AREA_0, s = 0) : (s = Math.atan2(t, e), Math.abs(s) <= K ? n.value = J.AREA_0 : s > K && s <= E + K ? (n.value = J.AREA_1, s -= E) : s > E + K || s <= -(E + K) ? (n.value = J.AREA_2, s = s >= 0 ? s - dt : s + dt) : (n.value = J.AREA_3, s += E)), s;
}
function Cn(i, t) {
  var e = i + t;
  return e < -dt ? e += xs : e > +dt && (e -= xs), e;
}
var zx = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"];
const Vx = {
  init: Gx,
  forward: $x,
  inverse: Bx,
  names: zx
};
var pa = [
  [1, 22199e-21, -715515e-10, 31103e-10],
  [0.9986, -482243e-9, -24897e-9, -13309e-10],
  [0.9954, -83103e-8, -448605e-10, -986701e-12],
  [0.99, -135364e-8, -59661e-9, 36777e-10],
  [0.9822, -167442e-8, -449547e-11, -572411e-11],
  [0.973, -214868e-8, -903571e-10, 18736e-12],
  [0.96, -305085e-8, -900761e-10, 164917e-11],
  [0.9427, -382792e-8, -653386e-10, -26154e-10],
  [0.9216, -467746e-8, -10457e-8, 481243e-11],
  [0.8962, -536223e-8, -323831e-10, -543432e-11],
  [0.8679, -609363e-8, -113898e-9, 332484e-11],
  [0.835, -698325e-8, -640253e-10, 934959e-12],
  [0.7986, -755338e-8, -500009e-10, 935324e-12],
  [0.7597, -798324e-8, -35971e-9, -227626e-11],
  [0.7186, -851367e-8, -701149e-10, -86303e-10],
  [0.6732, -986209e-8, -199569e-9, 191974e-10],
  [0.6213, -0.010418, 883923e-10, 624051e-11],
  [0.5722, -906601e-8, 182e-6, 624051e-11],
  [0.5322, -677797e-8, 275608e-9, 624051e-11]
], Jn = [
  [-520417e-23, 0.0124, 121431e-23, -845284e-16],
  [0.062, 0.0124, -126793e-14, 422642e-15],
  [0.124, 0.0124, 507171e-14, -160604e-14],
  [0.186, 0.0123999, -190189e-13, 600152e-14],
  [0.248, 0.0124002, 710039e-13, -224e-10],
  [0.31, 0.0123992, -264997e-12, 835986e-13],
  [0.372, 0.0124029, 988983e-12, -311994e-12],
  [0.434, 0.0123893, -369093e-11, -435621e-12],
  [0.4958, 0.0123198, -102252e-10, -345523e-12],
  [0.5571, 0.0121916, -154081e-10, -582288e-12],
  [0.6176, 0.0119938, -241424e-10, -525327e-12],
  [0.6769, 0.011713, -320223e-10, -516405e-12],
  [0.7346, 0.0113541, -397684e-10, -609052e-12],
  [0.7903, 0.0109107, -489042e-10, -104739e-11],
  [0.8435, 0.0103431, -64615e-9, -140374e-14],
  [0.8936, 969686e-8, -64636e-9, -8547e-9],
  [0.9394, 840947e-8, -192841e-9, -42106e-10],
  [0.9761, 616527e-8, -256e-6, -42106e-10],
  [1, 328947e-8, -319159e-9, -42106e-10]
], td = 0.8487, ed = 1.3523, id = pe / 5, jx = 1 / id, pn = 18, zr = function(i, t) {
  return i[0] + t * (i[1] + t * (i[2] + t * i[3]));
}, Wx = function(i, t) {
  return i[1] + t * (2 * i[2] + t * 3 * i[3]);
};
function Ux(i, t, e, n) {
  for (var s = t; n; --n) {
    var r = i(s);
    if (s -= r, Math.abs(r) < e)
      break;
  }
  return s;
}
function Zx() {
  this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.long0 = this.long0 || 0, this.es = 0, this.title = this.title || "Robinson";
}
function Xx(i) {
  var t = L(i.x - this.long0), e = Math.abs(i.y), n = Math.floor(e * id);
  n < 0 ? n = 0 : n >= pn && (n = pn - 1), e = pe * (e - jx * n);
  var s = {
    x: zr(pa[n], e) * t,
    y: zr(Jn[n], e)
  };
  return i.y < 0 && (s.y = -s.y), s.x = s.x * this.a * td + this.x0, s.y = s.y * this.a * ed + this.y0, s;
}
function Hx(i) {
  var t = {
    x: (i.x - this.x0) / (this.a * td),
    y: Math.abs(i.y - this.y0) / (this.a * ed)
  };
  if (t.y >= 1)
    t.x /= pa[pn][0], t.y = i.y < 0 ? -E : E;
  else {
    var e = Math.floor(t.y * pn);
    for (e < 0 ? e = 0 : e >= pn && (e = pn - 1); ; )
      if (Jn[e][0] > t.y)
        --e;
      else if (Jn[e + 1][0] <= t.y)
        ++e;
      else
        break;
    var n = Jn[e], s = 5 * (t.y - n[0]) / (Jn[e + 1][0] - n[0]);
    s = Ux(function(r) {
      return (zr(n, r) - t.y) / Wx(n, r);
    }, s, R, 100), t.x /= zr(pa[e], s), t.y = (5 * e + s) * Tt, i.y < 0 && (t.y = -t.y);
  }
  return t.x = L(t.x + this.long0), t;
}
var Yx = ["Robinson", "robin"];
const qx = {
  init: Zx,
  forward: Xx,
  inverse: Hx,
  names: Yx
};
function Kx() {
  this.name = "geocent";
}
function Jx(i) {
  var t = zu(i, this.es, this.a);
  return t;
}
function Qx(i) {
  var t = Vu(i, this.es, this.a, this.b);
  return t;
}
var tv = ["Geocentric", "geocentric", "geocent", "Geocent"];
const ev = {
  init: Kx,
  forward: Jx,
  inverse: Qx,
  names: tv
};
var It = {
  N_POLE: 0,
  S_POLE: 1,
  EQUIT: 2,
  OBLIQ: 3
}, Xn = {
  h: { def: 1e5, num: !0 },
  azi: { def: 0, num: !0, degrees: !0 },
  tilt: { def: 0, num: !0, degrees: !0 },
  long0: { def: 0, num: !0 },
  lat0: { def: 0, num: !0 }
};
function iv() {
  if (Object.keys(Xn).forEach(function(e) {
    if (typeof this[e] > "u")
      this[e] = Xn[e].def;
    else {
      if (Xn[e].num && isNaN(this[e]))
        throw new Error("Invalid parameter value, must be numeric " + e + " = " + this[e]);
      Xn[e].num && (this[e] = parseFloat(this[e]));
    }
    Xn[e].degrees && (this[e] = this[e] * Tt);
  }.bind(this)), Math.abs(Math.abs(this.lat0) - E) < R ? this.mode = this.lat0 < 0 ? It.S_POLE : It.N_POLE : Math.abs(this.lat0) < R ? this.mode = It.EQUIT : (this.mode = It.OBLIQ, this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0)), this.pn1 = this.h / this.a, this.pn1 <= 0 || this.pn1 > 1e10)
    throw new Error("Invalid height");
  this.p = 1 + this.pn1, this.rp = 1 / this.p, this.h1 = 1 / this.pn1, this.pfact = (this.p + 1) * this.h1, this.es = 0;
  var i = this.tilt, t = this.azi;
  this.cg = Math.cos(t), this.sg = Math.sin(t), this.cw = Math.cos(i), this.sw = Math.sin(i);
}
function nv(i) {
  i.x -= this.long0;
  var t = Math.sin(i.y), e = Math.cos(i.y), n = Math.cos(i.x), s, r;
  switch (this.mode) {
    case It.OBLIQ:
      r = this.sinph0 * t + this.cosph0 * e * n;
      break;
    case It.EQUIT:
      r = e * n;
      break;
    case It.S_POLE:
      r = -t;
      break;
    case It.N_POLE:
      r = t;
      break;
  }
  switch (r = this.pn1 / (this.p - r), s = r * e * Math.sin(i.x), this.mode) {
    case It.OBLIQ:
      r *= this.cosph0 * t - this.sinph0 * e * n;
      break;
    case It.EQUIT:
      r *= t;
      break;
    case It.N_POLE:
      r *= -(e * n);
      break;
    case It.S_POLE:
      r *= e * n;
      break;
  }
  var o, a;
  return o = r * this.cg + s * this.sg, a = 1 / (o * this.sw * this.h1 + this.cw), s = (s * this.cg - r * this.sg) * this.cw * a, r = o * a, i.x = s * this.a, i.y = r * this.a, i;
}
function sv(i) {
  i.x /= this.a, i.y /= this.a;
  var t = { x: i.x, y: i.y }, e, n, s;
  s = 1 / (this.pn1 - i.y * this.sw), e = this.pn1 * i.x * s, n = this.pn1 * i.y * this.cw * s, i.x = e * this.cg + n * this.sg, i.y = n * this.cg - e * this.sg;
  var r = ae(i.x, i.y);
  if (Math.abs(r) < R)
    t.x = 0, t.y = i.y;
  else {
    var o, a;
    switch (a = 1 - r * r * this.pfact, a = (this.p - Math.sqrt(a)) / (this.pn1 / r + r / this.pn1), o = Math.sqrt(1 - a * a), this.mode) {
      case It.OBLIQ:
        t.y = Math.asin(o * this.sinph0 + i.y * a * this.cosph0 / r), i.y = (o - this.sinph0 * Math.sin(t.y)) * r, i.x *= a * this.cosph0;
        break;
      case It.EQUIT:
        t.y = Math.asin(i.y * a / r), i.y = o * r, i.x *= a;
        break;
      case It.N_POLE:
        t.y = Math.asin(o), i.y = -i.y;
        break;
      case It.S_POLE:
        t.y = -Math.asin(o);
        break;
    }
    t.x = Math.atan2(i.x, i.y);
  }
  return i.x = t.x + this.long0, i.y = t.y, i;
}
var rv = ["Tilted_Perspective", "tpers"];
const ov = {
  init: iv,
  forward: nv,
  inverse: sv,
  names: rv
};
function av() {
  if (this.flip_axis = this.sweep === "x" ? 1 : 0, this.h = Number(this.h), this.radius_g_1 = this.h / this.a, this.radius_g_1 <= 0 || this.radius_g_1 > 1e10)
    throw new Error();
  if (this.radius_g = 1 + this.radius_g_1, this.C = this.radius_g * this.radius_g - 1, this.es !== 0) {
    var i = 1 - this.es, t = 1 / i;
    this.radius_p = Math.sqrt(i), this.radius_p2 = i, this.radius_p_inv2 = t, this.shape = "ellipse";
  } else
    this.radius_p = 1, this.radius_p2 = 1, this.radius_p_inv2 = 1, this.shape = "sphere";
  this.title || (this.title = "Geostationary Satellite View");
}
function lv(i) {
  var t = i.x, e = i.y, n, s, r, o;
  if (t = t - this.long0, this.shape === "ellipse") {
    e = Math.atan(this.radius_p2 * Math.tan(e));
    var a = this.radius_p / ae(this.radius_p * Math.cos(e), Math.sin(e));
    if (s = a * Math.cos(t) * Math.cos(e), r = a * Math.sin(t) * Math.cos(e), o = a * Math.sin(e), (this.radius_g - s) * s - r * r - o * o * this.radius_p_inv2 < 0)
      return i.x = Number.NaN, i.y = Number.NaN, i;
    n = this.radius_g - s, this.flip_axis ? (i.x = this.radius_g_1 * Math.atan(r / ae(o, n)), i.y = this.radius_g_1 * Math.atan(o / n)) : (i.x = this.radius_g_1 * Math.atan(r / n), i.y = this.radius_g_1 * Math.atan(o / ae(r, n)));
  } else
    this.shape === "sphere" && (n = Math.cos(e), s = Math.cos(t) * n, r = Math.sin(t) * n, o = Math.sin(e), n = this.radius_g - s, this.flip_axis ? (i.x = this.radius_g_1 * Math.atan(r / ae(o, n)), i.y = this.radius_g_1 * Math.atan(o / n)) : (i.x = this.radius_g_1 * Math.atan(r / n), i.y = this.radius_g_1 * Math.atan(o / ae(r, n))));
  return i.x = i.x * this.a, i.y = i.y * this.a, i;
}
function hv(i) {
  var t = -1, e = 0, n = 0, s, r, o, a;
  if (i.x = i.x / this.a, i.y = i.y / this.a, this.shape === "ellipse") {
    this.flip_axis ? (n = Math.tan(i.y / this.radius_g_1), e = Math.tan(i.x / this.radius_g_1) * ae(1, n)) : (e = Math.tan(i.x / this.radius_g_1), n = Math.tan(i.y / this.radius_g_1) * ae(1, e));
    var l = n / this.radius_p;
    if (s = e * e + l * l + t * t, r = 2 * this.radius_g * t, o = r * r - 4 * s * this.C, o < 0)
      return i.x = Number.NaN, i.y = Number.NaN, i;
    a = (-r - Math.sqrt(o)) / (2 * s), t = this.radius_g + a * t, e *= a, n *= a, i.x = Math.atan2(e, t), i.y = Math.atan(n * Math.cos(i.x) / t), i.y = Math.atan(this.radius_p_inv2 * Math.tan(i.y));
  } else if (this.shape === "sphere") {
    if (this.flip_axis ? (n = Math.tan(i.y / this.radius_g_1), e = Math.tan(i.x / this.radius_g_1) * Math.sqrt(1 + n * n)) : (e = Math.tan(i.x / this.radius_g_1), n = Math.tan(i.y / this.radius_g_1) * Math.sqrt(1 + e * e)), s = e * e + n * n + t * t, r = 2 * this.radius_g * t, o = r * r - 4 * s * this.C, o < 0)
      return i.x = Number.NaN, i.y = Number.NaN, i;
    a = (-r - Math.sqrt(o)) / (2 * s), t = this.radius_g + a * t, e *= a, n *= a, i.x = Math.atan2(e, t), i.y = Math.atan(n * Math.cos(i.x) / t);
  }
  return i.x = i.x + this.long0, i;
}
var cv = ["Geostationary Satellite View", "Geostationary_Satellite", "geos"];
const uv = {
  init: av,
  forward: lv,
  inverse: hv,
  names: cv
};
function dv(i) {
  i.Proj.projections.add(dr), i.Proj.projections.add(fr), i.Proj.projections.add(yp), i.Proj.projections.add(Rp), i.Proj.projections.add(Fp), i.Proj.projections.add($p), i.Proj.projections.add(Up), i.Proj.projections.add(qp), i.Proj.projections.add(ey), i.Proj.projections.add(oy), i.Proj.projections.add(Ey), i.Proj.projections.add(Iy), i.Proj.projections.add(Fy), i.Proj.projections.add(By), i.Proj.projections.add(Uy), i.Proj.projections.add(qy), i.Proj.projections.add(ex), i.Proj.projections.add(ox), i.Proj.projections.add(dx), i.Proj.projections.add(px), i.Proj.projections.add(Mx), i.Proj.projections.add(bx), i.Proj.projections.add(Ax), i.Proj.projections.add(kx), i.Proj.projections.add(Vx), i.Proj.projections.add(qx), i.Proj.projections.add(ev), i.Proj.projections.add(ov), i.Proj.projections.add(uv);
}
pt.defaultDatum = "WGS84";
pt.Proj = ve;
pt.WGS84 = new pt.Proj("WGS84");
pt.Point = Ln;
pt.toPoint = ju;
pt.defs = At;
pt.nadgrid = v2;
pt.transform = $r;
pt.mgrs = N2;
pt.version = "__VERSION__";
dv(pt);
class Qt {
  static sendEvent(t, e) {
    dispatchEvent(new CustomEvent(t, { detail: e }));
  }
}
const fv = `.box-element{left:calc(50% - 172px);font-family:sans-serif;display:flex}.box-element{position:absolute;top:5px;background-color:var(--information-box-background-color);box-shadow:0 1px 4px #0003;padding:15px;border-radius:10px;border:1px solid var(--information-box-background-color);margin-left:5px;margin-right:5px;max-width:302px;width:100%}.box-text-container{width:70%}.box-element-title{display:flex}.box-element-title-text{width:900%;font-weight:600;font-size:14px;line-height:17px;color:var(--information-box-title-color)}.box-element-content{font-weight:400;font-size:12px;line-height:15px;color:var(--information-box-text-color);width:90%}
`;
var gv = Object.defineProperty, mv = Object.getOwnPropertyDescriptor, nd = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? mv(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(t, e, s) : o(s)) || s);
  return n && s && gv(t, e, s), s;
};
let Vr = class extends Zt {
  constructor() {
    super(), this.currentPosition = [0, 0];
  }
  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    return ze`
      <div class="information-box-${Y().getTheme()} box-element">
        <div class="box-text-container">
            <div class="box-element-title">
            <div class="box-element-title-text">Éclairage signalé</div>
            </div>
            <div class="box-element-content">${this.currentPosition[0].toFixed(6)}, ${this.currentPosition[1].toFixed(6)}</div>
        </div>
      </div>
    `;
  }
};
Vr.styles = [ft(fv), ft(Xi)];
nd([
  Ee()
], Vr.prototype, "currentPosition", 2);
Vr = nd([
  Ve("select-information-box-element")
], Vr);
class Vo extends Ht {
  constructor(t) {
    const e = document.createElement("select-information-box-element");
    e.currentPosition = t, super({ element: e });
  }
}
class _v {
  constructor(t, e, n, s, r, o) {
    this.map = t;
    const a = new gi(), l = new Be();
    pt.defs(
      "EPSG:3857",
      "+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs"
    ), pt.defs("SR-ORG:6864", "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"), pt.defs(n, s), fetch(e).then((h) => h.text()).then((h) => {
      const d = gl(h).getElementsByTagName(
        "wfs:FeatureCollection"
      )[0].getElementsByTagName("wfs:member");
      for (let g = 0; g < d.length; g++) {
        const y = d[g].getElementsByTagName("ms:geom")[0].getElementsByTagName("gml:Point")[0].getElementsByTagName("gml:pos")[0].innerHTML.split(" "), x = pt("EPSG:2056", "SR-ORG:6864", [Number(y[0]), Number(y[1])]), v = new he(x), C = new oe({
          geometry: v,
          name: g,
          myCustomeValue: d[g],
          isClick: !1
        });
        l == null || l.addFeature(C);
      }
      const f = new t_({
        distance: r.distance,
        minDistance: r.minDistance,
        source: l
      });
      a.setSource(f), a.setStyle(function(g) {
        const m = g.get("features").length;
        let _;
        return m === 1 && g.get("features")[0].get("isClick") ? _ = new le({
          zIndex: 1,
          image: new Pr({
            src: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(_t.mapPinSelect),
            anchor: [0.5, 54],
            anchorXUnits: "fraction",
            anchorYUnits: "pixels"
          })
        }) : m === 1 && !g.get("features")[0].get("isClick") ? _ = new le({
          zIndex: 1,
          image: new Pr({
            src: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(_t.mapPin),
            anchor: [0.5, 54],
            anchorXUnits: "fraction",
            anchorYUnits: "pixels"
          })
        }) : g.get("features").find((p) => p.get("isClick")) ? _ = new le({
          image: new fi({
            radius: 15,
            stroke: new ce({
              color: "#fff"
            }),
            fill: new ee({
              color: "#EF4444"
            })
          }),
          text: new ra({
            text: m.toString(),
            font: "14px sans-serif",
            fill: new ee({
              color: "#fff"
            })
          })
        }) : _ = new le({
          image: new fi({
            radius: 15,
            stroke: new ce({
              color: "#fff"
            }),
            fill: new ee({
              color: "#334155"
            })
          }),
          text: new ra({
            text: m.toString(),
            font: "14px sans-serif",
            fill: new ee({
              color: "#fff"
            })
          })
        }), _;
      }), this.map.addLayer(a), o.type === "select" && (this.map.on("click", function(g) {
        t.forEachFeatureAtPixel(g.pixel, function(m) {
          var _;
          m && ((_ = m.getGeometry()) == null ? void 0 : _.getType()) === "Point" && m.getProperties().features.length === 1 && Qt.sendEvent("icon-clicked", m.getProperties().features[0]);
        });
      }), window.addEventListener("valid-clicked", (g) => {
        var _;
        g.detail.get("isClick") ? (g.detail.set("isClick", !1), this.map.getControls().forEach((p) => {
          p instanceof Vo && this.map.removeControl(p);
        })) : ((_ = a.getSource()) == null || _.getFeatures().forEach((p) => p.get("features").forEach((y) => {
          y.set("isClick", !1), this.map.getControls().forEach((x) => {
            x instanceof Vo && this.map.removeControl(x);
          });
        })), g.detail.set("isClick", !0), t.addControl(new Vo(g.detail.get("geometry").getCoordinates())));
      }));
    }), window.addEventListener("current-center-position", (h) => {
      var d;
      const c = l.getClosestFeatureToCoordinate(h.detail), u = new Eu(h.detail, o.radius);
      if (((d = c.getGeometry()) == null ? void 0 : d.getType()) === "Point") {
        const f = (c == null ? void 0 : c.getGeometry()).getCoordinates();
        u.intersectsCoordinate(f) && Qt.sendEvent("nearest-poi-position", f);
      }
    });
  }
}
class pv {
  constructor(t, e) {
    var s;
    this.vectorLayer = new gi(), this.vectorSource = new Be(), this.map = t, this.geolocation = e;
    const n = new oe();
    n.setStyle(
      new le({
        image: new fi({
          radius: 6,
          fill: new ee({
            color: "#3399CC"
          }),
          stroke: new ce({
            color: "#fff",
            width: 2
          })
        })
      })
    ), e.on("change:position", function() {
      const r = e.getPosition();
      n.setGeometry(r ? new he(r) : void 0);
    }), (s = this.vectorSource) == null || s.addFeature(n), this.vectorLayer.setSource(this.vectorSource), this.map.addLayer(this.vectorLayer);
  }
}
var yv = Object.defineProperty, xv = Object.getOwnPropertyDescriptor, vv = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? xv(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(t, e, s) : o(s)) || s);
  return n && s && yv(t, e, s), s;
};
let ya = class extends Zt {
  render() {
    return ze`<div class="control-${Y().getTheme()}">${so(_t.rotation)}</div>`;
  }
};
ya.styles = [ft(al), ft(Xi)];
ya = vv([
  Ve("rotation-control-button")
], ya);
class ec extends Ht {
  constructor() {
    const t = document.createElement("div"), e = document.createElement("rotation-control-button");
    t.appendChild(e);
    const n = document.createElement("div");
    n.className = Y().isCustomDisplay() ? `rotation-control-custom-${Y().getTargetBoxSize()} ol-unselectable ol-control` : "rotation-control ol-unselectable ol-control", n.appendChild(t), super({
      element: n
    }), t.addEventListener("click", this.resetRotation.bind(this), !1);
  }
  resetRotation() {
    var t;
    (t = this.getMap()) == null || t.getView().setRotation(0);
  }
}
class Cv {
  read(t) {
    if (t)
      if (typeof t == "string") {
        const e = gl(t);
        return this.readFromDocument(e);
      } else
        return O_(t) ? this.readFromDocument(t) : this.readFromNode(t);
    else
      return null;
  }
  readFromDocument(t) {
    for (let e = t.firstChild; e; e = e.nextSibling)
      if (e.nodeType == Node.ELEMENT_NODE)
        return this.readFromNode(e);
    return null;
  }
  readFromNode(t) {
  }
}
const sd = Cv, Mv = "http://www.w3.org/1999/xlink";
function vl(i) {
  return i.getAttributeNS(Mv, "href");
}
function Ev(i) {
  const t = fl(i, !1);
  return wv(t);
}
function wv(i) {
  const t = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(i);
  if (t)
    return parseFloat(t[1]);
}
function ai(i) {
  const t = fl(i, !1);
  return Sv(t);
}
function Sv(i) {
  const t = /^\s*(\d+)\s*$/.exec(i);
  if (t)
    return parseInt(t[1], 10);
}
function H(i) {
  return fl(i, !1).trim();
}
const Bt = [null, "http://www.opengis.net/ows/1.1"], Tv = Q(Bt, {
  ServiceIdentification: N(Kv),
  ServiceProvider: N(Qv),
  OperationsMetadata: N(Yv)
});
class bv extends sd {
  constructor() {
    super();
  }
  readFromNode(t) {
    const e = lt({}, Tv, t, []);
    return e || null;
  }
}
const Rv = Q(Bt, {
  DeliveryPoint: N(H),
  City: N(H),
  AdministrativeArea: N(H),
  PostalCode: N(H),
  Country: N(H),
  ElectronicMailAddress: N(H)
}), Iv = Q(Bt, {
  Value: Ut(tC)
}), Lv = Q(Bt, {
  AllowedValues: N(Vv)
}), Pv = Q(Bt, {
  Phone: N(qv),
  Address: N(zv)
}), Av = Q(Bt, {
  HTTP: N(Xv)
}), Ov = Q(Bt, {
  Get: Ut(Zv),
  Post: void 0
}), Fv = Q(Bt, {
  DCP: N(Uv)
}), Dv = Q(Bt, {
  Operation: Hv
}), Nv = Q(Bt, {
  Voice: N(H),
  Facsimile: N(H)
}), kv = Q(Bt, {
  Constraint: Ut(jv)
}), Gv = Q(Bt, {
  IndividualName: N(H),
  PositionName: N(H),
  ContactInfo: N(Wv)
}), $v = Q(Bt, {
  Abstract: N(H),
  AccessConstraints: N(H),
  Fees: N(H),
  Title: N(H),
  ServiceTypeVersion: N(H),
  ServiceType: N(H)
}), Bv = Q(Bt, {
  ProviderName: N(H),
  ProviderSite: N(vl),
  ServiceContact: N(Jv)
});
function zv(i, t) {
  return lt({}, Rv, i, t);
}
function Vv(i, t) {
  return lt({}, Iv, i, t);
}
function jv(i, t) {
  const e = i.getAttribute("name");
  if (!!e)
    return lt({ name: e }, Lv, i, t);
}
function Wv(i, t) {
  return lt({}, Pv, i, t);
}
function Uv(i, t) {
  return lt({}, Av, i, t);
}
function Zv(i, t) {
  const e = vl(i);
  if (!!e)
    return lt(
      { href: e },
      kv,
      i,
      t
    );
}
function Xv(i, t) {
  return lt({}, Ov, i, t);
}
function Hv(i, t) {
  const e = i.getAttribute("name"), n = lt({}, Fv, i, t);
  if (!n)
    return;
  const s = t[t.length - 1];
  s[e] = n;
}
function Yv(i, t) {
  return lt({}, Dv, i, t);
}
function qv(i, t) {
  return lt({}, Nv, i, t);
}
function Kv(i, t) {
  return lt({}, $v, i, t);
}
function Jv(i, t) {
  return lt({}, Gv, i, t);
}
function Qv(i, t) {
  return lt({}, Bv, i, t);
}
function tC(i, t) {
  return H(i);
}
const eC = bv, Se = [null, "http://www.opengis.net/wmts/1.0"], Nn = [null, "http://www.opengis.net/ows/1.1"], iC = Q(Se, {
  Contents: N(gC)
});
class nC extends sd {
  constructor() {
    super(), this.owsParser_ = new eC();
  }
  readFromNode(t) {
    let e = t.getAttribute("version");
    e && (e = e.trim());
    let n = this.owsParser_.readFromNode(t);
    return n ? (n.version = e, n = lt(
      n,
      iC,
      t,
      []
    ), n || null) : null;
  }
}
const sC = Q(Se, {
  Layer: Ut(mC),
  TileMatrixSet: Ut(_C)
}), rC = Q(
  Se,
  {
    Style: Ut(pC),
    Format: Ut(H),
    TileMatrixSetLink: Ut(yC),
    Dimension: Ut(xC),
    ResourceURL: Ut(vC)
  },
  Q(Nn, {
    Title: N(H),
    Abstract: N(H),
    WGS84BoundingBox: N(rd),
    Identifier: N(H)
  })
), oC = Q(
  Se,
  {
    LegendURL: Ut(CC)
  },
  Q(Nn, {
    Title: N(H),
    Identifier: N(H)
  })
), aC = Q(Se, {
  TileMatrixSet: N(H),
  TileMatrixSetLimits: N(EC)
}), lC = Q(Se, {
  TileMatrixLimits: fa(wC)
}), hC = Q(Se, {
  TileMatrix: N(H),
  MinTileRow: N(ai),
  MaxTileRow: N(ai),
  MinTileCol: N(ai),
  MaxTileCol: N(ai)
}), cC = Q(
  Se,
  {
    Default: N(H),
    Value: Ut(H)
  },
  Q(Nn, {
    Identifier: N(H)
  })
), uC = Q(Nn, {
  LowerCorner: fa(xa),
  UpperCorner: fa(xa)
}), dC = Q(
  Se,
  {
    WellKnownScaleSet: N(H),
    TileMatrix: Ut(MC)
  },
  Q(Nn, {
    SupportedCRS: N(H),
    Identifier: N(H),
    BoundingBox: N(rd)
  })
), fC = Q(
  Se,
  {
    TopLeftCorner: N(xa),
    ScaleDenominator: N(Ev),
    TileWidth: N(ai),
    TileHeight: N(ai),
    MatrixWidth: N(ai),
    MatrixHeight: N(ai)
  },
  Q(Nn, {
    Identifier: N(H)
  })
);
function gC(i, t) {
  return lt({}, sC, i, t);
}
function mC(i, t) {
  return lt({}, rC, i, t);
}
function _C(i, t) {
  return lt({}, dC, i, t);
}
function pC(i, t) {
  const e = lt({}, oC, i, t);
  if (!e)
    return;
  const n = i.getAttribute("isDefault") === "true";
  return e.isDefault = n, e;
}
function yC(i, t) {
  return lt({}, aC, i, t);
}
function xC(i, t) {
  return lt({}, cC, i, t);
}
function vC(i, t) {
  const e = i.getAttribute("format"), n = i.getAttribute("template"), s = i.getAttribute("resourceType"), r = {};
  return e && (r.format = e), n && (r.template = n), s && (r.resourceType = s), r;
}
function rd(i, t) {
  const e = lt(
    [],
    uC,
    i,
    t
  );
  if (e.length == 2)
    return bt(e);
}
function CC(i, t) {
  const e = {};
  return e.format = i.getAttribute("format"), e.href = vl(i), e;
}
function xa(i, t) {
  const e = H(i).split(/\s+/);
  if (!e || e.length != 2)
    return;
  const n = +e[0], s = +e[1];
  if (!(isNaN(n) || isNaN(s)))
    return [n, s];
}
function MC(i, t) {
  return lt({}, fC, i, t);
}
function EC(i, t) {
  return lt([], lC, i, t);
}
function wC(i, t) {
  return lt({}, hC, i, t);
}
const SC = nC;
class TC {
  constructor(t, e) {
    const n = new SC();
    fetch(e.capability).then(function(s) {
      return s.text();
    }).then(function(s) {
      const r = n.read(s), o = u_(r, {
        layer: e.layer,
        matrixSet: e.projection
      });
      if (o) {
        const a = new o_({
          opacity: 1,
          source: new c_(o)
        });
        t.getLayers().insertAt(0, a);
      }
    });
  }
}
const bC = `@media only screen and (min-width: 420px){.custom-popup-element{right:calc(.5em + 40px)}}@media only screen and (max-width: 419px){.custom-popup-element{left:calc(50% - 172px)}}.custom-popup-element{font-family:sans-serif;position:absolute;top:5px;background-color:var(--information-box-background-color);box-shadow:0 1px 4px #0003;padding:15px;border-radius:4px;border:1px solid var(--information-box-background-color);z-index:10;margin-left:5px;margin-right:5px;max-width:302px;width:100%}.custom-popup-element:after{content:"";width:var(--progress-width);height:4px;background:#008C6F;position:absolute;bottom:-1px;left:0;border-bottom-left-radius:4px;border-bottom-right-radius:var(--border-radius-right)}.custom-popup-title{display:flex}.custom-popup-title-text{width:90%;font-weight:600;font-size:14px;line-height:17px;color:var(--information-box-title-color)}.custom-popup-title-svg{width:10%;justify-content:flex-end;display:flex;fill:none;stroke:var(--information-box-title-color);stroke-width:2px;stroke-linejoin:round;stroke-linecap:round}.custom-popup-content{font-weight:400;font-size:12px;line-height:15px;color:var(--information-box-text-color)}
`;
var RC = Object.defineProperty, IC = Object.getOwnPropertyDescriptor, ho = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? IC(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(t, e, s) : o(s)) || s);
  return n && s && RC(t, e, s), s;
};
let An = class extends Zt {
  constructor() {
    super(), this.information = { duration: 0, title: "", content: "" }, this._width = 100, this._borderRadiusRight = 0, window.addEventListener("clear-information-box-interval", this.clear.bind(this), !0);
  }
  firstUpdated() {
    const i = this.information.duration / 100;
    this.interval = setInterval(() => {
      this._width > 0 ? (this._width < 100 && (this._borderRadiusRight = 0), this._width--) : this.closeBox();
    }, i);
  }
  render() {
    return ze`
      <div class="information-box-${Y().getTheme()} custom-popup-element" style="--progress-width: ${this._width}%; --border-radius-right: ${this._borderRadiusRight}px">
        <div class="custom-popup-title">
          <div class="custom-popup-title-text">${this.information.title}</div>
          <svg _width="20" height="20" viewBox="0 0 20 20" class="custom-popup-title-svg" @click="${this.closeBox}">
            <path d="M15.4 4.59998L4.60004 15.4"></path>
            <path d="M15.4 15.4L4.60004 4.59998"></path>
          </svg>
        </div>
        <div class="custom-popup-content">${this.information.content}</div>
        <div class="custom-progress-element"></div>
      </div>`;
  }
  clear() {
    clearInterval(this.interval);
  }
  closeBox() {
    clearInterval(this.interval), Qt.sendEvent("close-information-box", {});
  }
};
An.styles = [ft(bC), ft(Xi)];
ho([
  Ee()
], An.prototype, "information", 2);
ho([
  we()
], An.prototype, "_width", 2);
ho([
  we()
], An.prototype, "_borderRadiusRight", 2);
An = ho([
  Ve("information-box")
], An);
class ic extends Ht {
  constructor(t) {
    const e = document.createElement("information-box");
    e.information = t, super({ element: e });
  }
}
var LC = Object.defineProperty, PC = Object.getOwnPropertyDescriptor, od = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? PC(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(t, e, s) : o(s)) || s);
  return n && s && LC(t, e, s), s;
};
let jr = class extends Zt {
  constructor() {
    super(), this.className = Y().isCustomDisplay() ? `information-control-custom-${Y().getTargetBoxSize()}` : "information-control";
  }
  render() {
    return ze`<div class="ol-unselectable ol-control ${this.className}" style="position: absolute">
                  <div>
                    <div class="control-${Y().getTheme()}">
                      ${so(_t.information)}
                    </div>
                  </div>
                </div>
    `;
  }
};
jr.styles = [ft(al), ft(ll)];
od([
  we()
], jr.prototype, "className", 2);
jr = od([
  Ve("information-control-button")
], jr);
class AC extends Ht {
  constructor(t, e) {
    const n = document.createElement("information-control-button");
    super({
      element: n
    }), this.informationIsOpen = !0, this.map = t, this.information = e, n.addEventListener("click", this.toogleInformationBox.bind(this), !1), window.addEventListener("close-information-box", this.closeInformationBox.bind(this), !1), this.openInformationBox();
  }
  closeInformationBox() {
    Qt.sendEvent("clear-information-box-interval", {}), this.map.getControls().forEach((t) => {
      t instanceof ic && this.map.removeControl(t);
    }), this.informationIsOpen = !1;
  }
  openInformationBox() {
    this.map.addControl(new ic(this.information)), this.informationIsOpen = !0;
  }
  toogleInformationBox() {
    this.informationIsOpen ? this.closeInformationBox() : this.openInformationBox();
  }
}
const OC = `:root,:host{--ol-background-color: white;--ol-accent-background-color: #F5F5F5;--ol-subtle-background-color: rgba(128, 128, 128, .25);--ol-partial-background-color: rgba(255, 255, 255, .75);--ol-foreground-color: #333333;--ol-subtle-foreground-color: #666666;--ol-brand-color: #00AAFF}.ol-box{box-sizing:border-box;border-radius:2px;border:1.5px solid var(--ol-background-color);background-color:var(--ol-partial-background-color)}.ol-mouse-position{top:8px;right:8px;position:absolute}.ol-scale-line{background:var(--ol-partial-background-color);border-radius:4px;bottom:8px;left:8px;padding:2px;position:absolute}.ol-scale-line-inner{border:1px solid var(--ol-subtle-foreground-color);border-top:none;color:var(--ol-foreground-color);font-size:10px;text-align:center;margin:1px;will-change:contents,width;transition:all .25s}.ol-scale-bar{position:absolute;bottom:8px;left:8px}.ol-scale-bar-inner{display:flex}.ol-scale-step-marker{width:1px;height:15px;background-color:var(--ol-foreground-color);float:right;z-index:10}.ol-scale-step-text{position:absolute;bottom:-5px;font-size:10px;z-index:11;color:var(--ol-foreground-color);text-shadow:-1.5px 0 var(--ol-partial-background-color),0 1.5px var(--ol-partial-background-color),1.5px 0 var(--ol-partial-background-color),0 -1.5px var(--ol-partial-background-color)}.ol-scale-text{position:absolute;font-size:12px;text-align:center;bottom:25px;color:var(--ol-foreground-color);text-shadow:-1.5px 0 var(--ol-partial-background-color),0 1.5px var(--ol-partial-background-color),1.5px 0 var(--ol-partial-background-color),0 -1.5px var(--ol-partial-background-color)}.ol-scale-singlebar{position:relative;height:10px;z-index:9;box-sizing:border-box;border:1px solid var(--ol-foreground-color)}.ol-scale-singlebar-even{background-color:var(--ol-subtle-foreground-color)}.ol-scale-singlebar-odd{background-color:var(--ol-background-color)}.ol-unsupported{display:none}.ol-viewport,.ol-unselectable{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.ol-viewport canvas{all:unset}.ol-selectable{-webkit-touch-callout:default;-webkit-user-select:text;-moz-user-select:text;user-select:text}.ol-grabbing{cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.ol-grab{cursor:move;cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.ol-control{position:absolute;background-color:var(--ol-subtle-background-color);border-radius:4px}.ol-zoom{top:.5em;left:.5em}.ol-rotate{top:.5em;right:.5em;transition:opacity .25s linear,visibility 0s linear}.ol-rotate.ol-hidden{opacity:0;visibility:hidden;transition:opacity .25s linear,visibility 0s linear .25s}.ol-zoom-extent{top:4.643em;left:.5em}.ol-full-screen{right:.5em;top:.5em}.ol-control button{display:block;margin:1px;padding:0;color:var(--ol-subtle-foreground-color);font-weight:700;text-decoration:none;font-size:inherit;text-align:center;height:1.375em;width:1.375em;line-height:.4em;background-color:var(--ol-background-color);border:none;border-radius:2px}.ol-control button::-moz-focus-inner{border:none;padding:0}.ol-zoom-extent button{line-height:1.4em}.ol-compass{display:block;font-weight:400;will-change:transform}.ol-touch .ol-control button{font-size:1.5em}.ol-touch .ol-zoom-extent{top:5.5em}.ol-control button:hover,.ol-control button:focus{text-decoration:none;outline:1px solid var(--ol-subtle-foreground-color);color:var(--ol-foreground-color)}.ol-zoom .ol-zoom-in{border-radius:2px 2px 0 0}.ol-zoom .ol-zoom-out{border-radius:0 0 2px 2px}.ol-attribution{text-align:right;bottom:.5em;right:.5em;max-width:calc(100% - 1.3em);display:flex;flex-flow:row-reverse;align-items:center}.ol-attribution a{color:var(--ol-subtle-foreground-color);text-decoration:none}.ol-attribution ul{margin:0;padding:1px .5em;color:var(--ol-foreground-color);text-shadow:0 0 2px var(--ol-background-color);font-size:12px}.ol-attribution li{display:inline;list-style:none}.ol-attribution li:not(:last-child):after{content:" "}.ol-attribution img{max-height:2em;max-width:inherit;vertical-align:middle}.ol-attribution button{flex-shrink:0}.ol-attribution.ol-collapsed ul{display:none}.ol-attribution:not(.ol-collapsed){background:var(--ol-partial-background-color)}.ol-attribution.ol-uncollapsible{bottom:0;right:0;border-radius:4px 0 0}.ol-attribution.ol-uncollapsible img{margin-top:-.2em;max-height:1.6em}.ol-attribution.ol-uncollapsible button{display:none}.ol-zoomslider{top:4.5em;left:.5em;height:200px}.ol-zoomslider button{position:relative;height:10px}.ol-touch .ol-zoomslider{top:5.5em}.ol-overviewmap{left:.5em;bottom:.5em}.ol-overviewmap.ol-uncollapsible{bottom:0;left:0;border-radius:0 4px 0 0}.ol-overviewmap .ol-overviewmap-map,.ol-overviewmap button{display:block}.ol-overviewmap .ol-overviewmap-map{border:1px solid var(--ol-subtle-foreground-color);height:150px;width:150px}.ol-overviewmap:not(.ol-collapsed) button{bottom:0;left:0;position:absolute}.ol-overviewmap.ol-collapsed .ol-overviewmap-map,.ol-overviewmap.ol-uncollapsible button{display:none}.ol-overviewmap:not(.ol-collapsed){background:var(--ol-subtle-background-color)}.ol-overviewmap-box{border:1.5px dotted var(--ol-subtle-foreground-color)}.ol-overviewmap .ol-overviewmap-box:hover{cursor:move}
`, FC = `#map{width:100%;height:100%}
`, ad = `.notification-element{font-family:sans-serif;--icon-size: 32px;position:absolute;bottom:5%;background-color:var(--notification-background-color);box-shadow:0 1px 4px #0003;padding:15px;border-radius:10px;z-index:10;margin-left:5px;margin-right:5px;max-width:302px;width:100%;left:calc((100% - 334px)/2)}.notification-title>svg{width:var(--icon-size);height:var(--icon-size);padding-right:10px}.notification-title>svg>g>.icon{fill:none;stroke:var(--notification-stroke-color);stroke-width:2px;stroke-linejoin:round;stroke-linecap:round}.notification-title{display:flex}.notification-title-text{font-weight:400;font-size:12px;line-height:15px;color:var(--notification-text-color)}
`;
var DC = Object.defineProperty, NC = Object.getOwnPropertyDescriptor, kn = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? NC(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(t, e, s) : o(s)) || s);
  return n && s && DC(t, e, s), s;
};
let pi = class extends Zt {
  constructor() {
    super(), this.type = "info", this.message = "", this.layerPosition = 0, this.icon = "", this.theme = "";
  }
  firstUpdated() {
    switch (this.type) {
      case "info":
        this.icon = _t.info, this.theme = `notification-element-info-${Y().getTheme()}`;
        break;
      case "warning":
        this.icon = _t.warning, this.theme = `notification-element-warning-${Y().getTheme()}`;
        break;
      case "error":
        this.icon = _t.error, this.theme = `notification-element-error-${Y().getTheme()}`;
        break;
    }
  }
  render() {
    return ze`
      <div class="notification-element ${this.theme}" style="z-index: ${this.layerPosition}">
        <div class="notification-title">
          ${so(this.icon)}
          <div class="notification-title-text">${this.message}</div>
        </div>  
      </div>
    `;
  }
};
pi.styles = [ft(Xi), ft(ad)];
kn([
  Ee()
], pi.prototype, "type", 2);
kn([
  Ee()
], pi.prototype, "message", 2);
kn([
  Ee()
], pi.prototype, "layerPosition", 2);
kn([
  we()
], pi.prototype, "icon", 2);
kn([
  we()
], pi.prototype, "theme", 2);
pi = kn([
  Ve("notification-box")
], pi);
class Je extends Ht {
  constructor(t, e) {
    const n = document.createElement(
      "notification-box"
    );
    n.type = t.type, n.message = t.message, n.layerPosition = e, super({ element: n }), this.ruleType = t.rule.type;
  }
}
class kC {
  constructor(t, e, n) {
    this.validZoomConstraint = !0, this.validAreaConstraint = !0, this.map = t, n === "target" && window.addEventListener("current-center-position", (s) => {
      this.validZoomConstraint && this.validAreaConstraint && Qt.sendEvent("position-selected", s.detail);
    }), n === "select" && window.addEventListener("icon-clicked", (s) => {
      this.validZoomConstraint && (s.detail.get("isClick") ? Qt.sendEvent("position-selected", void 0) : Qt.sendEvent("position-selected", s.detail.get("geometry").getCoordinates()), Qt.sendEvent("valid-clicked", s.detail));
    }), this.setup(e);
  }
  setup(t) {
    t.forEach((e) => {
      e.rule.type === "ZOOM_CONSTRAINT" && this.setupZoomContraint(e), e.rule.type === "AREA_CONSTRAINT" && this.setupInclusionAreaConstraint(e), e.type === "info" && this.map.addControl(new Je(e, 1));
    });
  }
  setupZoomContraint(t) {
    this.hasValidZoom(t) && (this.map.addControl(new Je(t, 3)), this.validZoomConstraint = !1), this.map.getView().on("change:resolution", () => {
      this.checkZoomConstraint(t);
    });
  }
  setupInclusionAreaConstraint(t) {
    window.addEventListener("inclusion-area-included", (e) => {
      this.checkInclusionAreaConstraint(t, e.detail);
    });
  }
  hasValidZoom(t) {
    const e = this.map.getView().getZoom();
    return e && t.rule.minZoom && e < t.rule.minZoom;
  }
  checkZoomConstraint(t) {
    this.hasValidZoom(t) ? this.map.getControls().getArray().find((e) => e instanceof Je && e.ruleType === "ZOOM_CONSTRAINT") === void 0 && (this.map.addControl(new Je(t, 3)), this.validZoomConstraint = !1, Qt.sendEvent("position-selected", void 0)) : this.map.getControls().forEach((e) => {
      e instanceof Je && e.ruleType === "ZOOM_CONSTRAINT" && (this.map.removeControl(e), this.validZoomConstraint = !0);
    });
  }
  checkInclusionAreaConstraint(t, e) {
    e ? this.map.getControls().forEach((n) => {
      n instanceof Je && n.ruleType === "AREA_CONSTRAINT" && (this.map.removeControl(n), this.validAreaConstraint = !0);
    }) : this.map.getControls().getArray().find((n) => n instanceof Je && n.ruleType === "AREA_CONSTRAINT") === void 0 && (this.map.addControl(new Je(t, 2)), this.validAreaConstraint = !1, Qt.sendEvent("position-selected", void 0));
  }
}
var GC = Object.defineProperty, $C = Object.getOwnPropertyDescriptor, BC = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? $C(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(t, e, s) : o(s)) || s);
  return n && s && GC(t, e, s), s;
};
class zC {
  constructor(t) {
    t.getView().on("change:center", (e) => {
      Qt.sendEvent("current-center-position", e.target.getCenter());
    });
  }
}
let nc = class extends Zt {
  constructor() {
    super();
  }
  render() {
    return ze`
        <div style="position: relative; top: calc(50% - 64px); left: calc(50% - 64px); width: 128px">
            <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_244_6943)">
                    <mask id="path-1-outside-1_244_6943" maskUnits="userSpaceOnUse" x="16" y="16" width="96" height="96" fill="black">
                        <rect fill="white" x="16" y="16" width="96" height="96"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M64 19C39.1472 19 19 39.1472 19 64C19 88.8528 39.1472 109 64 109C88.8528 109 109 88.8528 109 64C109 39.1472 88.8528 19 64 19ZM17 64C17 38.0426 38.0426 17 64 17C89.9574 17 111 38.0426 111 64C111 89.9574 89.9574 111 64 111C38.0426 111 17 89.9574 17 64Z"/>
                    </mask>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M64 19C39.1472 19 19 39.1472 19 64C19 88.8528 39.1472 109 64 109C88.8528 109 109 88.8528 109 64C109 39.1472 88.8528 19 64 19ZM17 64C17 38.0426 38.0426 17 64 17C89.9574 17 111 38.0426 111 64C111 89.9574 89.9574 111 64 111C38.0426 111 17 89.9574 17 64Z" fill="#EF4444"/>
                    <path d="M20 64C20 39.6995 39.6995 20 64 20V18C38.5949 18 18 38.5949 18 64H20ZM64 108C39.6995 108 20 88.3005 20 64H18C18 89.4051 38.5949 110 64 110V108ZM108 64C108 88.3005 88.3005 108 64 108V110C89.4051 110 110 89.4051 110 64H108ZM64 20C88.3005 20 108 39.6995 108 64H110C110 38.5949 89.4051 18 64 18V20ZM64 16C37.4903 16 16 37.4903 16 64H18C18 38.5949 38.5949 18 64 18V16ZM112 64C112 37.4903 90.5097 16 64 16V18C89.4051 18 110 38.5949 110 64H112ZM64 112C90.5097 112 112 90.5097 112 64H110C110 89.4051 89.4051 110 64 110V112ZM16 64C16 90.5097 37.4903 112 64 112V110C38.5949 110 18 89.4051 18 64H16Z" fill="white" mask="url(#path-1-outside-1_244_6943)"/>
                    <circle cx="64" cy="64" r="2.5" fill="#EF4444" stroke="white"/>
                </g>
                <defs>
                    <filter id="filter0_d_244_6943" x="10" y="10" width="108" height="108" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset/>
                        <feGaussianBlur stdDeviation="3"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.75 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_244_6943"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_244_6943" result="shape"/>
                    </filter>
                </defs>
            </svg>        
        </div>
        `;
  }
};
nc = BC([
  Ve("target-element")
], nc);
class VC extends Ht {
  constructor(t) {
    const e = document.createElement("target-element");
    super({ element: e }), new zC(t);
  }
}
const jC = `.box-element{left:calc(50% - 172px);font-family:sans-serif}.box-element{position:absolute;top:5px;background-color:var(--information-box-background-color);box-shadow:0 1px 4px #0003;padding:15px;border-radius:10px;border:1px solid var(--information-box-background-color);margin-left:5px;margin-right:5px;max-width:302px;width:100%}.box-element-title{display:flex}.box-element-title-text{width:90%;font-weight:600;font-size:14px;line-height:17px;color:var(--information-box-title-color)}.box-element-content{font-weight:400;font-size:12px;line-height:15px;color:var(--information-box-text-color)}
`;
var WC = Object.defineProperty, UC = Object.getOwnPropertyDescriptor, Gn = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? UC(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(t, e, s) : o(s)) || s);
  return n && s && WC(t, e, s), s;
};
let yi = class extends Zt {
  constructor() {
    super(), this.targetBoxMessage = "", this.defaultPosition = [0, 0], this.geolocationInformation = { displayBox: !0, reverseLocation: !0, currentLocation: !0 }, this._currentPosition = "", this._reversePosition = "", window.addEventListener("current-center-position", (i) => {
      this._reversePosition = i.detail, this._currentPosition = i.detail;
    });
  }
  connectedCallback() {
    super.connectedCallback();
  }
  firstUpdated() {
    this._reversePosition = this.geolocationInformation.reverseLocation ? `${this.defaultPosition[0]}, ${this.defaultPosition[1]}` : "", this._currentPosition = this.geolocationInformation.currentLocation ? `${this.defaultPosition[0]}, ${this.defaultPosition[1]}` : "", console.log(this.targetBoxMessage);
  }
  render() {
    return ze`
      <div class="information-box-${Y().getTheme()} box-element">
        <div class="box-element-title">
          <div class="box-element-title-text">${this.targetBoxMessage}</div>
        </div>
        <div class="box-element-content">${this._reversePosition}</div>
        <div class="box-element-content">${this._currentPosition}</div>
      </div>
    `;
  }
};
yi.styles = [ft(jC), ft(Xi)];
Gn([
  Ee()
], yi.prototype, "targetBoxMessage", 2);
Gn([
  Ee()
], yi.prototype, "defaultPosition", 2);
Gn([
  Ee()
], yi.prototype, "geolocationInformation", 2);
Gn([
  we()
], yi.prototype, "_currentPosition", 2);
Gn([
  we()
], yi.prototype, "_reversePosition", 2);
yi = Gn([
  Ve("target-information-box-element")
], yi);
class ZC extends Ht {
  constructor(t, e, n) {
    console.log(n);
    const s = document.createElement("target-information-box-element");
    s.defaultPosition = t, s.geolocationInformation = e, s.targetBoxMessage = n, super({ element: s });
  }
}
class XC {
  static getOptions(t) {
    const e = {
      zoom: 15,
      minZoom: 1,
      maxZoom: 20,
      displayZoom: !0,
      displayScaleLine: !1,
      fullscreen: !0,
      defaultCenter: [739867.251358, 5905800079386e-6],
      enableGeolocation: !1,
      enableCenterButton: !0,
      enableDraw: !0,
      maxNbDraw: 0,
      drawElement: "Point",
      onlyOneDraw: !1,
      enableRotation: !0,
      information: {
        duration: 5e3,
        title: "This is a title",
        content: "This is a content"
      },
      mode: {
        type: "",
        radius: 40
      },
      cluster: {
        distance: 40,
        minDistance: 30
      },
      geojson: {
        url: ""
      },
      geolocationInformation: {
        displayBox: !0,
        reverseLocation: !0,
        currentLocation: !0
      },
      notifications: [],
      wfs: {
        url: "",
        projection: "EPSG:2056",
        projectionDefinition: "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs"
      },
      wmts: {
        capability: "https://wmts.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml",
        layer: "ch.swisstopo.swissimage",
        projection: "EPSG:3857"
      },
      inclusionArea: !1,
      targetBoxMessage: ""
    };
    return t.zoom !== void 0 && (e.zoom = t.zoom), t.minZoom !== void 0 && (e.minZoom = t.minZoom), t.maxZoom !== void 0 && (e.maxZoom = t.maxZoom), t.displayZoom !== void 0 && (e.displayZoom = t.displayZoom), t.displayScaleLine !== void 0 && (e.displayScaleLine = t.displayScaleLine), t.fullscreen !== void 0 && (e.fullscreen = t.fullscreen), t.defaultCenter !== void 0 && (e.defaultCenter = t.defaultCenter), t.enableGeolocation !== void 0 && (e.enableGeolocation = t.enableGeolocation), t.enableCenterButton !== void 0 && (e.enableCenterButton = t.enableCenterButton), t.enableDraw !== void 0 && (e.enableDraw = t.enableDraw), t.maxNbDraw !== void 0 && (e.maxNbDraw = t.maxNbDraw), t.drawElement !== void 0 && (e.drawElement = t.drawElement), t.onlyOneDraw !== void 0 && (e.onlyOneDraw = t.onlyOneDraw), t.enableRotation !== void 0 && (e.enableRotation = t.enableRotation), t.information !== void 0 && (e.information = t.information), t.notifications !== void 0 && t.notifications.length > 0 && (e.notifications = t.notifications), t.mode !== void 0 && (e.mode = t.mode), t.cluster !== void 0 && (e.cluster = t.cluster), t.geojson !== void 0 && (e.geojson = t.geojson), t.geolocationInformation !== void 0 && (e.geolocationInformation = t.geolocationInformation), t.wfs !== void 0 && (e.wfs = t.wfs), t.wmts !== void 0 && (e.wmts = t.wmts), t.inclusionArea !== void 0 && (e.inclusionArea = t.inclusionArea), t.targetBoxMessage !== void 0 && (e.targetBoxMessage = t.targetBoxMessage), e;
  }
}
class HC {
  constructor(t, e, n, s) {
    pt.defs(
      "EPSG:3857",
      "+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs"
    ), pt.defs(
      "SR-ORG:6864",
      "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
    ), pt.defs(n, s), fetch(e).then((r) => r.text()).then((r) => {
      const l = gl(r).getElementsByTagName(
        "wfs:FeatureCollection"
      )[0].getElementsByTagName("wfs:member"), h = new Be(), c = [];
      for (let f = 0; f < l.length; f++) {
        const g = l[f].getElementsByTagName(
          "ms:MO_bf_bien_fonds"
        )[0];
        if ((g.getElementsByTagName("ms:genre")[0].innerHTML === "Domaine public communal" || g.getElementsByTagName("ms:genre")[0].innerHTML === "Domaine public cantonal") && g.getElementsByTagName("ms:commune")[0].innerHTML === "Yverdon-les-Bains") {
          const v = g.getElementsByTagName("ms:geom")[0].getElementsByTagName("gml:Polygon")[0].getElementsByTagName("gml:exterior")[0].getElementsByTagName("gml:LinearRing")[0].getElementsByTagName("gml:posList")[0].innerHTML.split(" "), C = [];
          for (let M = 0; M < v.length; M++)
            M % 2 === 1 && C.push(
              pt(n, "SR-ORG:6864", [
                Number(v[M - 1]),
                Number(v[M])
              ])
            );
          c.push(new Bi([C]));
        }
      }
      const u = new oe({
        geometry: new oo(c)
      });
      h.addFeature(u);
      const d = new gi({
        source: h,
        visible: !0,
        style: new le({
          stroke: new ce({
            color: "red",
            width: 1
          })
        })
      });
      t.getLayers().insertAt(1, d), window.addEventListener("current-center-position", (f) => {
        var m;
        const g = h.getClosestFeatureToCoordinate(
          f.detail
        );
        if (((m = g.getGeometry()) == null ? void 0 : m.getType()) === "MultiPolygon") {
          const _ = g.getGeometry();
          Qt.sendEvent("inclusion-area-included", _ == null ? void 0 : _.intersectsCoordinate(f.detail));
        }
      });
    });
  }
}
var YC = Object.defineProperty, qC = Object.getOwnPropertyDescriptor, Ds = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? qC(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(t, e, s) : o(s)) || s);
  return n && s && YC(t, e, s), s;
};
let ji = class extends Zt {
  constructor() {
    super(), this.options = {};
  }
  connectedCallback() {
    super.connectedCallback();
  }
  setupTheme(i) {
    i.darkMode ? Y().setTheme("dark") : i.lightMode || window.matchMedia("(prefers-color-scheme: light)").matches ? Y().setTheme("light") : window.matchMedia("(prefers-color-scheme: dark)").matches ? Y().setTheme("dark") : Y().setTheme("light");
  }
  setupCustomDisplay(i) {
    i.mode.type === "target" ? (Y().setCustomDisplay(i.geolocationInformation.displayBox), this.setupTargetBoxSize(i.geolocationInformation)) : i.mode.type === "select" ? (Y().setCustomDisplay(!0), this.setupSelectBoxSize()) : Y().setCustomDisplay(!1);
  }
  setupSelectBoxSize() {
    Y().setTargetBoxSize("medium");
  }
  setupTargetBoxSize(i) {
    i.currentLocation && i.reverseLocation ? Y().setTargetBoxSize("large") : i.currentLocation || i.reverseLocation ? Y().setTargetBoxSize("medium") : Y().setTargetBoxSize("small");
  }
  firstUpdated() {
    const i = XC.getOptions(this.options);
    this.setupTheme(i), this.setupCustomDisplay(i), this.view = new ii({
      center: i.defaultCenter,
      zoom: i.zoom,
      minZoom: i.minZoom,
      maxZoom: i.maxZoom,
      enableRotation: i.enableRotation
    });
    const t = new R0({
      target: this.mapElement,
      controls: [],
      layers: [],
      view: this.view
    });
    i.enableGeolocation && (this.geolocation = new A0({
      trackingOptions: {
        enableHighAccuracy: !0
      },
      projection: this.view.getProjection()
    }), this.geolocation.setTracking(!0), new pv(t, this.geolocation));
    const e = [];
    i.mode.type === "target" && (e.push(new VC(t)), i.geolocationInformation.displayBox && e.push(new ZC(i.defaultCenter, i.geolocationInformation, i.targetBoxMessage))), i.wmts.capability != "" && new TC(t, i.wmts), i.displayZoom && e.push(new Uc({
      zoomInLabel: _t.zoomInLabel(),
      zoomOutLabel: _t.zoomOutLabel(),
      className: Y().isCustomDisplay() ? `ol-zoom-custom-${Y().getTargetBoxSize()}` : "ol-zoom"
    })), i.enableCenterButton && e.push(new _m(this.geolocation)), i.enableRotation && this.view.on("change:rotation", (n) => {
      t.getControls().forEach((s) => {
        s instanceof ec && t.removeControl(s);
      }), n.target.getRotation() !== 0 && t.addControl(new ec());
    }), e.push(new AC(t, i.information)), new kC(t, i.notifications, i.mode.type), e.forEach((n) => t.addControl(n)), i.displayScaleLine && t.addControl(new sm({ units: "metric" })), i.fullscreen && t.addControl(new em({
      label: _t.fullScreenLabel(),
      labelActive: _t.fullScreenLabelActive(),
      className: Y().isCustomDisplay() ? `ol-full-screen-custom-${Y().getTargetBoxSize()}` : "ol-full-screen"
    })), i.geojson.url != "" && new A_(t, i.geojson.url), i.wfs.url != "" && new _v(t, i.wfs.url, i.wfs.projection, i.wfs.projectionDefinition, i.cluster, i.mode), i.enableDraw && new P_(t, i.drawElement, i.maxNbDraw), i.inclusionArea && new HC(t, "https://mapnv.ch/mapserv_proxy?ogcserver=source+for+image%2Fpng&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&typeName=MO_bf_bien_fonds&FILTER=<Filter><And><PropertyIsEqualTo><ValueReference>commune</ValueReference><Literal>Yverdon-les-Bains</Literal></PropertyIsEqualTo><PropertyIsNotEqualTo><ValueReference>genre</ValueReference><Literal>Parcelle priv\xE9e</Literal></PropertyIsNotEqualTo></And></Filter>", i.wfs.projection, i.wfs.projectionDefinition);
  }
  render() {
    return ze`
    <div id="map" class="control-${Y().getTheme()}">
    </div>   
    `;
  }
};
ji.styles = [ft(OC), ft(FC), ft(ll), ft(ad), ft(Xi)];
Ds([
  bd("#map")
], ji.prototype, "mapElement", 2);
Ds([
  we()
], ji.prototype, "view", 2);
Ds([
  we()
], ji.prototype, "geolocation", 2);
Ds([
  Ee({ type: Object, attribute: "options" })
], ji.prototype, "options", 2);
ji = Ds([
  Ve("openlayers-element")
], ji);
export {
  ji as OpenLayersElement
};
