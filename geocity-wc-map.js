/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qs = window, Ko = qs.ShadowRoot && (qs.ShadyCSS === void 0 || qs.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ol = Symbol(), nh = /* @__PURE__ */ new WeakMap();
class Fu {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== Ol)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ko && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = nh.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && nh.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const Ki = (i) => new Fu(typeof i == "string" ? i : i + "", void 0, Ol), Du = (i, t) => {
  Ko ? i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const n = document.createElement("style"), s = qs.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = e.cssText, i.appendChild(n);
  });
}, sh = Ko ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules)
    e += n.cssText;
  return Ki(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var qr;
const tr = window, rh = tr.trustedTypes, Nu = rh ? rh.emptyScript : "", oh = tr.reactiveElementPolyfillSupport, Co = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Nu : null;
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
} }, Fl = (i, t) => t !== i && (t == t || i == i), Kr = { attribute: !0, type: String, converter: Co, reflect: !1, hasChanged: Fl };
class ji extends HTMLElement {
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
  static createProperty(t, e = Kr) {
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
    return this.elementProperties.get(t) || Kr;
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
        e.unshift(sh(s));
    } else
      t !== void 0 && e.push(sh(t));
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
    return Du(e, this.constructor.elementStyles), e;
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
  _$EO(t, e, n = Kr) {
    var s;
    const r = this.constructor._$Ep(t, n);
    if (r !== void 0 && n.reflect === !0) {
      const o = (((s = n.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? n.converter : Co).toAttribute(e, n.type);
      this._$El = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$El = null;
    }
  }
  _$AK(t, e) {
    var n;
    const s = this.constructor, r = s._$Ev.get(t);
    if (r !== void 0 && this._$El !== r) {
      const o = s.getPropertyOptions(r), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((n = o.converter) === null || n === void 0 ? void 0 : n.fromAttribute) !== void 0 ? o.converter : Co;
      this._$El = r, this[r] = a.fromAttribute(e, o.type), this._$El = null;
    }
  }
  requestUpdate(t, e, n) {
    let s = !0;
    t !== void 0 && (((n = n || this.constructor.getPropertyOptions(t)).hasChanged || Fl)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), n.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, n))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
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
ji.finalized = !0, ji.elementProperties = /* @__PURE__ */ new Map(), ji.elementStyles = [], ji.shadowRootOptions = { mode: "open" }, oh == null || oh({ ReactiveElement: ji }), ((qr = tr.reactiveElementVersions) !== null && qr !== void 0 ? qr : tr.reactiveElementVersions = []).push("1.5.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Hr;
const er = window, ln = er.trustedTypes, ah = ln ? ln.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, We = `lit$${(Math.random() + "").slice(9)}$`, Dl = "?" + We, ku = `<${Dl}>`, cn = document, Un = (i = "") => cn.createComment(i), Xn = (i) => i === null || typeof i != "object" && typeof i != "function", Nl = Array.isArray, Gu = (i) => Nl(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", In = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, hh = /-->/g, lh = />/g, oi = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ch = /'/g, uh = /"/g, kl = /^(?:script|style|textarea|title)$/i, $u = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), Gl = $u(1), un = Symbol.for("lit-noChange"), pt = Symbol.for("lit-nothing"), dh = /* @__PURE__ */ new WeakMap(), sn = cn.createTreeWalker(cn, 129, null, !1), zu = (i, t) => {
  const e = i.length - 1, n = [];
  let s, r = t === 2 ? "<svg>" : "", o = In;
  for (let h = 0; h < e; h++) {
    const l = i[h];
    let c, u, d = -1, f = 0;
    for (; f < l.length && (o.lastIndex = f, u = o.exec(l), u !== null); )
      f = o.lastIndex, o === In ? u[1] === "!--" ? o = hh : u[1] !== void 0 ? o = lh : u[2] !== void 0 ? (kl.test(u[2]) && (s = RegExp("</" + u[2], "g")), o = oi) : u[3] !== void 0 && (o = oi) : o === oi ? u[0] === ">" ? (o = s != null ? s : In, d = -1) : u[1] === void 0 ? d = -2 : (d = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? oi : u[3] === '"' ? uh : ch) : o === uh || o === ch ? o = oi : o === hh || o === lh ? o = In : (o = oi, s = void 0);
    const g = o === oi && i[h + 1].startsWith("/>") ? " " : "";
    r += o === In ? l + ku : d >= 0 ? (n.push(c), l.slice(0, d) + "$lit$" + l.slice(d) + We + g) : l + We + (d === -2 ? (n.push(void 0), h) : g);
  }
  const a = r + (i[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(i) || !i.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [ah !== void 0 ? ah.createHTML(a) : a, n];
};
class Yn {
  constructor({ strings: t, _$litType$: e }, n) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, h = this.parts, [l, c] = zu(t, e);
    if (this.el = Yn.createElement(l, n), sn.currentNode = this.el.content, e === 2) {
      const u = this.el.content, d = u.firstChild;
      d.remove(), u.append(...d.childNodes);
    }
    for (; (s = sn.nextNode()) !== null && h.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const u = [];
          for (const d of s.getAttributeNames())
            if (d.endsWith("$lit$") || d.startsWith(We)) {
              const f = c[o++];
              if (u.push(d), f !== void 0) {
                const g = s.getAttribute(f.toLowerCase() + "$lit$").split(We), _ = /([.?@])?(.*)/.exec(f);
                h.push({ type: 1, index: r, name: _[2], strings: g, ctor: _[1] === "." ? Wu : _[1] === "?" ? Uu : _[1] === "@" ? Xu : wr });
              } else
                h.push({ type: 6, index: r });
            }
          for (const d of u)
            s.removeAttribute(d);
        }
        if (kl.test(s.tagName)) {
          const u = s.textContent.split(We), d = u.length - 1;
          if (d > 0) {
            s.textContent = ln ? ln.emptyScript : "";
            for (let f = 0; f < d; f++)
              s.append(u[f], Un()), sn.nextNode(), h.push({ type: 2, index: ++r });
            s.append(u[d], Un());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === Dl)
          h.push({ type: 2, index: r });
        else {
          let u = -1;
          for (; (u = s.data.indexOf(We, u + 1)) !== -1; )
            h.push({ type: 7, index: r }), u += We.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const n = cn.createElement("template");
    return n.innerHTML = t, n;
  }
}
function dn(i, t, e = i, n) {
  var s, r, o, a;
  if (t === un)
    return t;
  let h = n !== void 0 ? (s = e._$Co) === null || s === void 0 ? void 0 : s[n] : e._$Cl;
  const l = Xn(t) ? void 0 : t._$litDirective$;
  return (h == null ? void 0 : h.constructor) !== l && ((r = h == null ? void 0 : h._$AO) === null || r === void 0 || r.call(h, !1), l === void 0 ? h = void 0 : (h = new l(i), h._$AT(i, e, n)), n !== void 0 ? ((o = (a = e)._$Co) !== null && o !== void 0 ? o : a._$Co = [])[n] = h : e._$Cl = h), h !== void 0 && (t = dn(i, h._$AS(i, t.values), h, n)), t;
}
class Bu {
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
    const { el: { content: n }, parts: s } = this._$AD, r = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : cn).importNode(n, !0);
    sn.currentNode = r;
    let o = sn.nextNode(), a = 0, h = 0, l = s[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new hs(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new Yu(o, this, t)), this.u.push(c), l = s[++h];
      }
      a !== (l == null ? void 0 : l.index) && (o = sn.nextNode(), a++);
    }
    return r;
  }
  p(t) {
    let e = 0;
    for (const n of this.u)
      n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class hs {
  constructor(t, e, n, s) {
    var r;
    this.type = 2, this._$AH = pt, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = s, this._$Cm = (r = s == null ? void 0 : s.isConnected) === null || r === void 0 || r;
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
    t = dn(this, t, e), Xn(t) ? t === pt || t == null || t === "" ? (this._$AH !== pt && this._$AR(), this._$AH = pt) : t !== this._$AH && t !== un && this.g(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Gu(t) ? this.k(t) : this.g(t);
  }
  O(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  g(t) {
    this._$AH !== pt && Xn(this._$AH) ? this._$AA.nextSibling.data = t : this.T(cn.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var e;
    const { values: n, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Yn.createElement(s.h, this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === r)
      this._$AH.p(n);
    else {
      const o = new Bu(r, this), a = o.v(this.options);
      o.p(n), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = dh.get(t.strings);
    return e === void 0 && dh.set(t.strings, e = new Yn(t)), e;
  }
  k(t) {
    Nl(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, s = 0;
    for (const r of t)
      s === e.length ? e.push(n = new hs(this.O(Un()), this.O(Un()), this, this.options)) : n = e[s], n._$AI(r), s++;
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
class wr {
  constructor(t, e, n, s, r) {
    this.type = 1, this._$AH = pt, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = pt;
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
      t = dn(this, t, e, 0), o = !Xn(t) || t !== this._$AH && t !== un, o && (this._$AH = t);
    else {
      const a = t;
      let h, l;
      for (t = r[0], h = 0; h < r.length - 1; h++)
        l = dn(this, a[n + h], e, h), l === un && (l = this._$AH[h]), o || (o = !Xn(l) || l !== this._$AH[h]), l === pt ? t = pt : t !== pt && (t += (l != null ? l : "") + r[h + 1]), this._$AH[h] = l;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === pt ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Wu extends wr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === pt ? void 0 : t;
  }
}
const ju = ln ? ln.emptyScript : "";
class Uu extends wr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== pt ? this.element.setAttribute(this.name, ju) : this.element.removeAttribute(this.name);
  }
}
class Xu extends wr {
  constructor(t, e, n, s, r) {
    super(t, e, n, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    var n;
    if ((t = (n = dn(this, t, e, 0)) !== null && n !== void 0 ? n : pt) === un)
      return;
    const s = this._$AH, r = t === pt && s !== pt || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== pt && (s === pt || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, n;
    typeof this._$AH == "function" ? this._$AH.call((n = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && n !== void 0 ? n : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Yu {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    dn(this, t);
  }
}
const fh = er.litHtmlPolyfillSupport;
fh == null || fh(Yn, hs), ((Hr = er.litHtmlVersions) !== null && Hr !== void 0 ? Hr : er.litHtmlVersions = []).push("2.5.0");
const Vu = (i, t, e) => {
  var n, s;
  const r = (n = e == null ? void 0 : e.renderBefore) !== null && n !== void 0 ? n : t;
  let o = r._$litPart$;
  if (o === void 0) {
    const a = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    r._$litPart$ = o = new hs(t.insertBefore(Un(), a), a, void 0, e != null ? e : {});
  }
  return o._$AI(i), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Zr, Jr;
class rn extends ji {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Vu(e, this.renderRoot, this.renderOptions);
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
    return un;
  }
}
rn.finalized = !0, rn._$litElement$ = !0, (Zr = globalThis.litElementHydrateSupport) === null || Zr === void 0 || Zr.call(globalThis, { LitElement: rn });
const gh = globalThis.litElementPolyfillSupport;
gh == null || gh({ LitElement: rn });
((Jr = globalThis.litElementVersions) !== null && Jr !== void 0 ? Jr : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $l = (i) => (t) => typeof t == "function" ? ((e, n) => (customElements.define(e, n), n))(i, t) : ((e, n) => {
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
const qu = (i, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, i);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, i);
} };
function Ho(i) {
  return (t, e) => e !== void 0 ? ((n, s, r) => {
    s.constructor.createProperty(r, n);
  })(i, t, e) : qu(i, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Zo(i) {
  return Ho({ ...i, state: !0 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ku = ({ finisher: i, descriptor: t }) => (e, n) => {
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
function Hu(i, t) {
  return Ku({ descriptor: (e) => {
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
var Qr;
((Qr = window.HTMLSlotElement) === null || Qr === void 0 ? void 0 : Qr.prototype.assignedElements) != null;
class Zu {
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
const Kt = Zu, fn = {
  PROPERTYCHANGE: "propertychange"
};
class Ju {
  constructor() {
    this.disposed = !1;
  }
  dispose() {
    this.disposed || (this.disposed = !0, this.disposeInternal());
  }
  disposeInternal() {
  }
}
const Jo = Ju;
function Qu(i, t, e) {
  let n, s;
  e = e || pi;
  let r = 0, o = i.length, a = !1;
  for (; r < o; )
    n = r + (o - r >> 1), s = +e(i[n], t), s < 0 ? r = n + 1 : (o = n, a = !s);
  return a ? r : ~r;
}
function pi(i, t) {
  return i > t ? 1 : i < t ? -1 : 0;
}
function Qo(i, t, e) {
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
function td(i, t, e) {
  for (; t < e; ) {
    const n = i[t];
    i[t] = i[e], i[e] = n, ++t, --e;
  }
}
function ae(i, t) {
  const e = Array.isArray(t) ? t : [t], n = e.length;
  for (let s = 0; s < n; s++)
    i[i.length] = e[s];
}
function ii(i, t) {
  const e = i.length;
  if (e !== t.length)
    return !1;
  for (let n = 0; n < e; n++)
    if (i[n] !== t[n])
      return !1;
  return !0;
}
function ed(i, t, e) {
  const n = t || pi;
  return i.every(function(s, r) {
    if (r === 0)
      return !0;
    const o = n(i[r - 1], s);
    return !(o > 0 || e && o === 0);
  });
}
function xi() {
  return !0;
}
function Ii() {
  return !1;
}
function vi() {
}
function id(i) {
  let t = !1, e, n, s;
  return function() {
    const r = Array.prototype.slice.call(arguments);
    return (!t || this !== s || !ii(r, n)) && (t = !0, s = this, n = r, e = i.apply(this, arguments)), e;
  };
}
function ls(i) {
  for (const t in i)
    delete i[t];
}
function gn(i) {
  let t;
  for (t in i)
    return !1;
  return !t;
}
class nd extends Jo {
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
    const r = e ? new Kt(t) : t;
    r.target || (r.target = this.eventTarget_ || this);
    const o = this.dispatching_ || (this.dispatching_ = {}), a = this.pendingRemovals_ || (this.pendingRemovals_ = {});
    n in o || (o[n] = 0, a[n] = 0), ++o[n];
    let h;
    for (let l = 0, c = s.length; l < c; ++l)
      if ("handleEvent" in s[l] ? h = s[l].handleEvent(r) : h = s[l].call(this, r), h === !1 || r.propagationStopped) {
        h = !1;
        break;
      }
    if (--o[n] === 0) {
      let l = a[n];
      for (delete a[n]; l--; )
        this.removeEventListener(n, vi);
      delete o[n];
    }
    return h;
  }
  disposeInternal() {
    this.listeners_ && ls(this.listeners_);
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
      s !== -1 && (this.pendingRemovals_ && t in this.pendingRemovals_ ? (n[s] = vi, ++this.pendingRemovals_[t]) : (n.splice(s, 1), n.length === 0 && delete this.listeners_[t]));
    }
  }
}
const Rr = nd, z = {
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
function U(i, t, e, n, s) {
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
function ir(i, t, e, n) {
  return U(i, t, e, n, !0);
}
function et(i) {
  i && i.target && (i.target.removeEventListener(i.type, i.listener), ls(i));
}
class br extends Rr {
  constructor() {
    super(), this.on = this.onInternal, this.once = this.onceInternal, this.un = this.unInternal, this.revision_ = 0;
  }
  changed() {
    ++this.revision_, this.dispatchEvent(z.CHANGE);
  }
  getRevision() {
    return this.revision_;
  }
  onInternal(t, e) {
    if (Array.isArray(t)) {
      const n = t.length, s = new Array(n);
      for (let r = 0; r < n; ++r)
        s[r] = U(this, t[r], e);
      return s;
    } else
      return U(this, t, e);
  }
  onceInternal(t, e) {
    let n;
    if (Array.isArray(t)) {
      const s = t.length;
      n = new Array(s);
      for (let r = 0; r < s; ++r)
        n[r] = ir(this, t[r], e);
    } else
      n = ir(this, t, e);
    return e.ol_key = n, n;
  }
  unInternal(t, e) {
    const n = e.ol_key;
    if (n)
      sd(n);
    else if (Array.isArray(t))
      for (let s = 0, r = t.length; s < r; ++s)
        this.removeEventListener(t[s], e);
    else
      this.removeEventListener(t, e);
  }
}
br.prototype.on;
br.prototype.once;
br.prototype.un;
function sd(i) {
  if (Array.isArray(i))
    for (let t = 0, e = i.length; t < e; ++t)
      et(i[t]);
  else
    et(i);
}
const zl = br;
function B() {
  throw new Error("Unimplemented abstract method.");
}
let rd = 0;
function j(i) {
  return i.ol_uid || (i.ol_uid = String(++rd));
}
class _h extends Kt {
  constructor(t, e, n) {
    super(t), this.key = e, this.oldValue = n;
  }
}
class od extends zl {
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
    n = `change:${t}`, this.hasListener(n) && this.dispatchEvent(new _h(n, t, e)), n = fn.PROPERTYCHANGE, this.hasListener(n) && this.dispatchEvent(new _h(n, t, e));
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
      delete this.values_[t], gn(this.values_) && (this.values_ = null), e || this.notify(t, n);
    }
  }
}
const ie = od, ad = {
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
class hd extends Error {
  constructor(t) {
    const e = ad[t];
    super(e), this.code = t, this.name = "AssertionError", this.message = e;
  }
}
const Bl = hd, xt = {
  ADD: "add",
  REMOVE: "remove"
}, mh = {
  LENGTH: "length"
};
class Is extends Kt {
  constructor(t, e, n) {
    super(t), this.element = e, this.index = n;
  }
}
class ld extends ie {
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
    return this.get(mh.LENGTH);
  }
  insertAt(t, e) {
    if (t < 0 || t > this.getLength())
      throw new Error("Index out of bounds: " + t);
    this.unique_ && this.assertUnique_(e), this.array_.splice(t, 0, e), this.updateLength_(), this.dispatchEvent(
      new Is(xt.ADD, e, t)
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
      new Is(xt.REMOVE, e, t)
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
      new Is(xt.REMOVE, s, t)
    ), this.dispatchEvent(
      new Is(xt.ADD, e, t)
    );
  }
  updateLength_() {
    this.set(mh.LENGTH, this.array_.length);
  }
  assertUnique_(t, e) {
    for (let n = 0, s = this.array_.length; n < s; ++n)
      if (this.array_[n] === t && n !== e)
        throw new Bl(58);
  }
}
const qt = ld, Ze = typeof navigator < "u" && typeof navigator.userAgent < "u" ? navigator.userAgent.toLowerCase() : "", cd = Ze.includes("firefox"), ud = Ze.includes("safari") && !Ze.includes("chrom");
ud && (Ze.includes("version/15.4") || /cpu (os|iphone os) 15_4 like mac os x/.test(Ze));
const dd = Ze.includes("webkit") && !Ze.includes("edge"), fd = Ze.includes("macintosh"), Wl = typeof devicePixelRatio < "u" ? devicePixelRatio : 1, ta = typeof WorkerGlobalScope < "u" && typeof OffscreenCanvas < "u" && self instanceof WorkerGlobalScope, gd = typeof Image < "u" && Image.prototype.decode, jl = function() {
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
function Y(i, t) {
  if (!i)
    throw new Bl(t);
}
new Array(6);
function he() {
  return [1, 0, 0, 1, 0, 0];
}
function _d(i, t, e, n, s, r, o) {
  return i[0] = t, i[1] = e, i[2] = n, i[3] = s, i[4] = r, i[5] = o, i;
}
function md(i, t) {
  return i[0] = t[0], i[1] = t[1], i[2] = t[2], i[3] = t[3], i[4] = t[4], i[5] = t[5], i;
}
function yt(i, t) {
  const e = t[0], n = t[1];
  return t[0] = i[0] * e + i[2] * n + i[4], t[1] = i[1] * e + i[3] * n + i[5], t;
}
function yd(i, t, e) {
  return _d(i, t, 0, 0, e, 0, 0);
}
function Je(i, t, e, n, s, r, o, a) {
  const h = Math.sin(r), l = Math.cos(r);
  return i[0] = n * l, i[1] = s * h, i[2] = -n * h, i[3] = s * l, i[4] = o * n * l - a * n * h + t, i[5] = o * s * h + a * s * l + e, i;
}
function ea(i, t) {
  const e = pd(t);
  Y(e !== 0, 32);
  const n = t[0], s = t[1], r = t[2], o = t[3], a = t[4], h = t[5];
  return i[0] = o / e, i[1] = -s / e, i[2] = -r / e, i[3] = n / e, i[4] = (r * h - o * a) / e, i[5] = -(n * h - s * a) / e, i;
}
function pd(i) {
  return i[0] * i[3] - i[1] * i[2];
}
let yh;
function Ul(i) {
  const t = "matrix(" + i.join(", ") + ")";
  if (ta)
    return t;
  const e = yh || (yh = document.createElement("div"));
  return e.style.transform = t, e.style.transform;
}
const mt = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
};
function Et(i) {
  const t = Wt();
  for (let e = 0, n = i.length; e < n; ++e)
    $n(t, i[e]);
  return t;
}
function xd(i, t, e) {
  const n = Math.min.apply(null, i), s = Math.min.apply(null, t), r = Math.max.apply(null, i), o = Math.max.apply(null, t);
  return ee(n, s, r, o, e);
}
function Ir(i, t, e) {
  return e ? (e[0] = i[0] - t, e[1] = i[1] - t, e[2] = i[2] + t, e[3] = i[3] + t, e) : [
    i[0] - t,
    i[1] - t,
    i[2] + t,
    i[3] + t
  ];
}
function Xl(i, t) {
  return t ? (t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t) : i.slice();
}
function Ai(i, t, e) {
  let n, s;
  return t < i[0] ? n = i[0] - t : i[2] < t ? n = t - i[2] : n = 0, e < i[1] ? s = i[1] - e : i[3] < e ? s = e - i[3] : s = 0, n * n + s * s;
}
function Ar(i, t) {
  return ia(i, t[0], t[1]);
}
function ci(i, t) {
  return i[0] <= t[0] && t[2] <= i[2] && i[1] <= t[1] && t[3] <= i[3];
}
function ia(i, t, e) {
  return i[0] <= t && t <= i[2] && i[1] <= e && e <= i[3];
}
function Eo(i, t) {
  const e = i[0], n = i[1], s = i[2], r = i[3], o = t[0], a = t[1];
  let h = mt.UNKNOWN;
  return o < e ? h = h | mt.LEFT : o > s && (h = h | mt.RIGHT), a < n ? h = h | mt.BELOW : a > r && (h = h | mt.ABOVE), h === mt.UNKNOWN && (h = mt.INTERSECTING), h;
}
function Wt() {
  return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
}
function ee(i, t, e, n, s) {
  return s ? (s[0] = i, s[1] = t, s[2] = e, s[3] = n, s) : [i, t, e, n];
}
function cs(i) {
  return ee(1 / 0, 1 / 0, -1 / 0, -1 / 0, i);
}
function Ks(i, t) {
  const e = i[0], n = i[1];
  return ee(e, n, e, n, t);
}
function Yl(i, t, e, n, s) {
  const r = cs(s);
  return ql(r, i, t, e, n);
}
function Vn(i, t) {
  return i[0] == t[0] && i[2] == t[2] && i[1] == t[1] && i[3] == t[3];
}
function Vl(i, t) {
  return t[0] < i[0] && (i[0] = t[0]), t[2] > i[2] && (i[2] = t[2]), t[1] < i[1] && (i[1] = t[1]), t[3] > i[3] && (i[3] = t[3]), i;
}
function $n(i, t) {
  t[0] < i[0] && (i[0] = t[0]), t[0] > i[2] && (i[2] = t[0]), t[1] < i[1] && (i[1] = t[1]), t[1] > i[3] && (i[3] = t[1]);
}
function ql(i, t, e, n, s) {
  for (; e < n; e += s)
    vd(i, t[e], t[e + 1]);
  return i;
}
function vd(i, t, e) {
  i[0] = Math.min(i[0], t), i[1] = Math.min(i[1], e), i[2] = Math.max(i[2], t), i[3] = Math.max(i[3], e);
}
function na(i, t) {
  let e;
  return e = t(Pr(i)), e || (e = t(Lr(i)), e) || (e = t(Or(i)), e) || (e = t(Pi(i)), e) ? e : !1;
}
function So(i) {
  let t = 0;
  return sa(i) || (t = ot(i) * ue(i)), t;
}
function Pr(i) {
  return [i[0], i[1]];
}
function Lr(i) {
  return [i[2], i[1]];
}
function Mi(i) {
  return [(i[0] + i[2]) / 2, (i[1] + i[3]) / 2];
}
function Md(i, t) {
  let e;
  return t === "bottom-left" ? e = Pr(i) : t === "bottom-right" ? e = Lr(i) : t === "top-left" ? e = Pi(i) : t === "top-right" ? e = Or(i) : Y(!1, 13), e;
}
function To(i, t, e, n, s) {
  const [r, o, a, h, l, c, u, d] = wo(
    i,
    t,
    e,
    n
  );
  return ee(
    Math.min(r, a, l, u),
    Math.min(o, h, c, d),
    Math.max(r, a, l, u),
    Math.max(o, h, c, d),
    s
  );
}
function wo(i, t, e, n) {
  const s = t * n[0] / 2, r = t * n[1] / 2, o = Math.cos(e), a = Math.sin(e), h = s * o, l = s * a, c = r * o, u = r * a, d = i[0], f = i[1];
  return [
    d - h + u,
    f - l - c,
    d - h - u,
    f - l + c,
    d + h - u,
    f + l + c,
    d + h + u,
    f + l - c,
    d - h + u,
    f - l - c
  ];
}
function ue(i) {
  return i[3] - i[1];
}
function zn(i, t, e) {
  const n = e || Wt();
  return At(i, t) ? (i[0] > t[0] ? n[0] = i[0] : n[0] = t[0], i[1] > t[1] ? n[1] = i[1] : n[1] = t[1], i[2] < t[2] ? n[2] = i[2] : n[2] = t[2], i[3] < t[3] ? n[3] = i[3] : n[3] = t[3]) : cs(n), n;
}
function Pi(i) {
  return [i[0], i[3]];
}
function Or(i) {
  return [i[2], i[3]];
}
function ot(i) {
  return i[2] - i[0];
}
function At(i, t) {
  return i[0] <= t[2] && i[2] >= t[0] && i[1] <= t[3] && i[3] >= t[1];
}
function sa(i) {
  return i[2] < i[0] || i[3] < i[1];
}
function Cd(i, t) {
  return t ? (t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t) : i;
}
function Ed(i, t, e) {
  let n = !1;
  const s = Eo(i, t), r = Eo(i, e);
  if (s === mt.INTERSECTING || r === mt.INTERSECTING)
    n = !0;
  else {
    const o = i[0], a = i[1], h = i[2], l = i[3], c = t[0], u = t[1], d = e[0], f = e[1], g = (f - u) / (d - c);
    let _, m;
    !!(r & mt.ABOVE) && !(s & mt.ABOVE) && (_ = d - (f - l) / g, n = _ >= o && _ <= h), !n && !!(r & mt.RIGHT) && !(s & mt.RIGHT) && (m = f - (d - h) * g, n = m >= a && m <= l), !n && !!(r & mt.BELOW) && !(s & mt.BELOW) && (_ = d - (f - a) / g, n = _ >= o && _ <= h), !n && !!(r & mt.LEFT) && !(s & mt.LEFT) && (m = f - (d - o) * g, n = m >= a && m <= l);
  }
  return n;
}
function Sd(i, t, e, n) {
  let s = [];
  if (n > 1) {
    const a = i[2] - i[0], h = i[3] - i[1];
    for (let l = 0; l < n; ++l)
      s.push(
        i[0] + a * l / n,
        i[1],
        i[2],
        i[1] + h * l / n,
        i[2] - a * l / n,
        i[3],
        i[0],
        i[3] - h * l / n
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
  for (let a = 0, h = s.length; a < h; a += 2)
    r.push(s[a]), o.push(s[a + 1]);
  return xd(r, o, e);
}
function Kl(i, t) {
  const e = t.getExtent(), n = Mi(i);
  if (t.canWrapX() && (n[0] < e[0] || n[0] >= e[2])) {
    const s = ot(e), o = Math.floor(
      (n[0] - e[0]) / s
    ) * s;
    i[0] -= o, i[2] -= o;
  }
  return i;
}
function Td(i, t) {
  if (t.canWrapX()) {
    const e = t.getExtent();
    if (!isFinite(i[0]) || !isFinite(i[2]))
      return [[e[0], i[1], e[2], i[3]]];
    Kl(i, t);
    const n = ot(e);
    if (ot(i) > n)
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
function dt(i, t, e) {
  return Math.min(Math.max(i, t), e);
}
function wd(i, t, e, n, s, r) {
  const o = s - e, a = r - n;
  if (o !== 0 || a !== 0) {
    const h = ((i - e) * o + (t - n) * a) / (o * o + a * a);
    h > 1 ? (e = s, n = r) : h > 0 && (e += o * h, n += a * h);
  }
  return we(i, t, e, n);
}
function we(i, t, e, n) {
  const s = e - i, r = n - t;
  return s * s + r * r;
}
function Rd(i) {
  const t = i.length;
  for (let n = 0; n < t; n++) {
    let s = n, r = Math.abs(i[n][n]);
    for (let a = n + 1; a < t; a++) {
      const h = Math.abs(i[a][n]);
      h > r && (r = h, s = a);
    }
    if (r === 0)
      return null;
    const o = i[s];
    i[s] = i[n], i[n] = o;
    for (let a = n + 1; a < t; a++) {
      const h = -i[a][n] / i[n][n];
      for (let l = n; l < t + 1; l++)
        n == l ? i[a][l] = 0 : i[a][l] += h * i[n][l];
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
function ph(i) {
  return i * 180 / Math.PI;
}
function gi(i) {
  return i * Math.PI / 180;
}
function _i(i, t) {
  const e = i % t;
  return e * t < 0 ? e + t : e;
}
function Ee(i, t, e) {
  return i + e * (t - i);
}
function ra(i, t) {
  const e = Math.pow(10, t);
  return Math.round(i * e) / e;
}
function As(i, t) {
  return Math.floor(ra(i, t));
}
function Ps(i, t) {
  return Math.ceil(ra(i, t));
}
const bd = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i, Id = /^([a-z]*)$|^hsla?\(.*\)$/i;
function Hl(i) {
  return typeof i == "string" ? i : Zl(i);
}
function Ad(i) {
  const t = document.createElement("div");
  if (t.style.color = i, t.style.color !== "") {
    document.body.appendChild(t);
    const e = getComputedStyle(t).color;
    return document.body.removeChild(t), e;
  } else
    return "";
}
const Pd = function() {
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
      s = Ld(n), t[n] = s, ++e;
    }
    return s;
  };
}();
function nr(i) {
  return Array.isArray(i) ? i : Pd(i);
}
function Ld(i) {
  let t, e, n, s, r;
  if (Id.exec(i) && (i = Ad(i)), bd.exec(i)) {
    const o = i.length - 1;
    let a;
    o <= 4 ? a = 1 : a = 2;
    const h = o === 4 || o === 8;
    t = parseInt(i.substr(1 + 0 * a, a), 16), e = parseInt(i.substr(1 + 1 * a, a), 16), n = parseInt(i.substr(1 + 2 * a, a), 16), h ? s = parseInt(i.substr(1 + 3 * a, a), 16) : s = 255, a == 1 && (t = (t << 4) + t, e = (e << 4) + e, n = (n << 4) + n, h && (s = (s << 4) + s)), r = [t, e, n, s / 255];
  } else
    i.startsWith("rgba(") ? (r = i.slice(5, -1).split(",").map(Number), xh(r)) : i.startsWith("rgb(") ? (r = i.slice(4, -1).split(",").map(Number), r.push(1), xh(r)) : Y(!1, 14);
  return r;
}
function xh(i) {
  return i[0] = dt(i[0] + 0.5 | 0, 0, 255), i[1] = dt(i[1] + 0.5 | 0, 0, 255), i[2] = dt(i[2] + 0.5 | 0, 0, 255), i[3] = dt(i[3], 0, 1), i;
}
function Zl(i) {
  let t = i[0];
  t != (t | 0) && (t = t + 0.5 | 0);
  let e = i[1];
  e != (e | 0) && (e = e + 0.5 | 0);
  let n = i[2];
  n != (n | 0) && (n = n + 0.5 | 0);
  const s = i[3] === void 0 ? 1 : Math.round(i[3] * 100) / 100;
  return "rgba(" + t + "," + e + "," + n + "," + s + ")";
}
class Od {
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
    const s = vh(t, e, n);
    return s in this.cache_ ? this.cache_[s] : null;
  }
  set(t, e, n, s) {
    const r = vh(t, e, n);
    this.cache_[r] = s, ++this.cacheSize_;
  }
  setSize(t) {
    this.maxCacheSize_ = t, this.expire();
  }
}
function vh(i, t, e) {
  const n = e ? Hl(e) : "null";
  return t + ":" + i + ":" + n;
}
const sr = new Od(), Q = {
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
class Fd extends ie {
  constructor(t) {
    super(), this.on, this.once, this.un, this.background_ = t.background;
    const e = Object.assign({}, t);
    typeof t.properties == "object" && (delete e.properties, Object.assign(e, t.properties)), e[Q.OPACITY] = t.opacity !== void 0 ? t.opacity : 1, Y(typeof e[Q.OPACITY] == "number", 64), e[Q.VISIBLE] = t.visible !== void 0 ? t.visible : !0, e[Q.Z_INDEX] = t.zIndex, e[Q.MAX_RESOLUTION] = t.maxResolution !== void 0 ? t.maxResolution : 1 / 0, e[Q.MIN_RESOLUTION] = t.minResolution !== void 0 ? t.minResolution : 0, e[Q.MIN_ZOOM] = t.minZoom !== void 0 ? t.minZoom : -1 / 0, e[Q.MAX_ZOOM] = t.maxZoom !== void 0 ? t.maxZoom : 1 / 0, this.className_ = e.className !== void 0 ? e.className : "ol-layer", delete e.className, this.setProperties(e), this.state_ = null;
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
    return e.opacity = dt(Math.round(this.getOpacity() * 100) / 100, 0, 1), e.visible = this.getVisible(), e.extent = this.getExtent(), e.zIndex = n === void 0 && !e.managed ? 1 / 0 : n, e.maxResolution = this.getMaxResolution(), e.minResolution = Math.max(this.getMinResolution(), 0), e.minZoom = this.getMinZoom(), e.maxZoom = this.getMaxZoom(), this.state_ = e, e;
  }
  getLayersArray(t) {
    return B();
  }
  getLayerStatesArray(t) {
    return B();
  }
  getExtent() {
    return this.get(Q.EXTENT);
  }
  getMaxResolution() {
    return this.get(Q.MAX_RESOLUTION);
  }
  getMinResolution() {
    return this.get(Q.MIN_RESOLUTION);
  }
  getMinZoom() {
    return this.get(Q.MIN_ZOOM);
  }
  getMaxZoom() {
    return this.get(Q.MAX_ZOOM);
  }
  getOpacity() {
    return this.get(Q.OPACITY);
  }
  getSourceState() {
    return B();
  }
  getVisible() {
    return this.get(Q.VISIBLE);
  }
  getZIndex() {
    return this.get(Q.Z_INDEX);
  }
  setBackground(t) {
    this.background_ = t, this.changed();
  }
  setExtent(t) {
    this.set(Q.EXTENT, t);
  }
  setMaxResolution(t) {
    this.set(Q.MAX_RESOLUTION, t);
  }
  setMinResolution(t) {
    this.set(Q.MIN_RESOLUTION, t);
  }
  setMaxZoom(t) {
    this.set(Q.MAX_ZOOM, t);
  }
  setMinZoom(t) {
    this.set(Q.MIN_ZOOM, t);
  }
  setOpacity(t) {
    Y(typeof t == "number", 64), this.set(Q.OPACITY, t);
  }
  setVisible(t) {
    this.set(Q.VISIBLE, t);
  }
  setZIndex(t) {
    this.set(Q.Z_INDEX, t);
  }
  disposeInternal() {
    this.state_ && (this.state_.layer = null, this.state_ = null), super.disposeInternal();
  }
}
const Jl = Fd, Ke = {
  PRERENDER: "prerender",
  POSTRENDER: "postrender",
  PRECOMPOSE: "precompose",
  POSTCOMPOSE: "postcompose",
  RENDERCOMPLETE: "rendercomplete"
};
class Dd extends Jl {
  constructor(t) {
    const e = Object.assign({}, t);
    delete e.source, super(e), this.on, this.once, this.un, this.mapPrecomposeKey_ = null, this.mapRenderKey_ = null, this.sourceChangeKey_ = null, this.renderer_ = null, this.rendered = !1, t.render && (this.render = t.render), t.map && this.setMap(t.map), this.addChangeListener(
      Q.SOURCE,
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
    return this.get(Q.SOURCE) || null;
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
    this.sourceChangeKey_ && (et(this.sourceChangeKey_), this.sourceChangeKey_ = null);
    const t = this.getSource();
    t && (this.sourceChangeKey_ = U(
      t,
      z.CHANGE,
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
    t || this.unrender(), this.set(Q.MAP, t);
  }
  getMapInternal() {
    return this.get(Q.MAP);
  }
  setMap(t) {
    this.mapPrecomposeKey_ && (et(this.mapPrecomposeKey_), this.mapPrecomposeKey_ = null), t || this.changed(), this.mapRenderKey_ && (et(this.mapRenderKey_), this.mapRenderKey_ = null), t && (this.mapPrecomposeKey_ = U(
      t,
      Ke.PRECOMPOSE,
      function(e) {
        const s = e.frameState.layerStatesArray, r = this.getLayerState(!1);
        Y(
          !s.some(function(o) {
            return o.layer === r.layer;
          }),
          67
        ), s.push(r);
      },
      this
    ), this.mapRenderKey_ = U(this, z.CHANGE, t.render, t), this.changed());
  }
  setSource(t) {
    this.set(Q.SOURCE, t);
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
function oa(i, t) {
  if (!i.visible)
    return !1;
  const e = t.resolution;
  if (e < i.minResolution || e >= i.maxResolution)
    return !1;
  const n = t.zoom;
  return n > i.minZoom && n <= i.maxZoom;
}
const Fr = Dd;
function Nd(i, t) {
  return i[0] += +t[0], i[1] += +t[1], i;
}
function kd(i, t) {
  const e = t.getRadius(), n = t.getCenter(), s = n[0], r = n[1], o = i[0], a = i[1];
  let h = o - s;
  const l = a - r;
  h === 0 && l === 0 && (h = 1);
  const c = Math.sqrt(h * h + l * l), u = s + e * h / c, d = r + e * l / c;
  return [u, d];
}
function aa(i, t) {
  const e = i[0], n = i[1], s = t[0], r = t[1], o = s[0], a = s[1], h = r[0], l = r[1], c = h - o, u = l - a, d = c === 0 && u === 0 ? 0 : (c * (e - o) + u * (n - a)) / (c * c + u * u || 0);
  let f, g;
  return d <= 0 ? (f = o, g = a) : d >= 1 ? (f = h, g = l) : (f = o + d * c, g = a + d * u), [f, g];
}
function Jt(i, t) {
  let e = !0;
  for (let n = i.length - 1; n >= 0; --n)
    if (i[n] != t[n]) {
      e = !1;
      break;
    }
  return e;
}
function ha(i, t) {
  const e = Math.cos(t), n = Math.sin(t), s = i[0] * e - i[1] * n, r = i[1] * e + i[0] * n;
  return i[0] = s, i[1] = r, i;
}
function Gd(i, t) {
  return i[0] *= t, i[1] *= t, i;
}
function Re(i, t) {
  const e = i[0] - t[0], n = i[1] - t[1];
  return e * e + n * n;
}
function rr(i, t) {
  return Math.sqrt(Re(i, t));
}
function $d(i, t) {
  return Re(i, aa(i, t));
}
function Ql(i, t) {
  if (t.canWrapX()) {
    const e = ot(t.getExtent()), n = zd(i, t, e);
    n && (i[0] -= n * e);
  }
  return i;
}
function zd(i, t, e) {
  const n = t.getExtent();
  let s = 0;
  return t.canWrapX() && (i[0] < n[0] || i[0] > n[2]) && (e = e || ot(n), s = Math.floor(
    (i[0] - n[0]) / e
  )), s;
}
class Bd extends Jo {
  constructor(t) {
    super(), this.map_ = t;
  }
  dispatchRenderEvent(t, e) {
    B();
  }
  calculateMatrices2D(t) {
    const e = t.viewState, n = t.coordinateToPixelTransform, s = t.pixelToCoordinateTransform;
    Je(
      n,
      t.size[0] / 2,
      t.size[1] / 2,
      1 / e.resolution,
      -1 / e.resolution,
      -e.rotation,
      -e.center[0],
      -e.center[1]
    ), ea(s, n);
  }
  forEachFeatureAtCoordinate(t, e, n, s, r, o, a, h) {
    let l;
    const c = e.viewState;
    function u(v, M, C, S) {
      return r.call(o, M, v ? C : null, S);
    }
    const d = c.projection, f = Ql(t.slice(), d), g = [[0, 0]];
    if (d.canWrapX() && s) {
      const v = d.getExtent(), M = ot(v);
      g.push([-M, 0], [M, 0]);
    }
    const _ = e.layerStatesArray, m = _.length, y = [], p = [];
    for (let v = 0; v < g.length; v++)
      for (let M = m - 1; M >= 0; --M) {
        const C = _[M], S = C.layer;
        if (S.hasRenderer() && oa(C, c) && a.call(h, S)) {
          const w = S.getRenderer(), P = S.getSource();
          if (w && P) {
            const F = P.getWrapX() ? f : t, G = u.bind(
              null,
              C.managed
            );
            p[0] = F[0] + g[v][0], p[1] = F[1] + g[v][1], l = w.forEachFeatureAtCoordinate(
              p,
              e,
              n,
              G,
              y
            );
          }
          if (l)
            return l;
        }
      }
    if (y.length === 0)
      return;
    const x = 1 / y.length;
    return y.forEach((v, M) => v.distanceSq += M * x), y.sort((v, M) => v.distanceSq - M.distanceSq), y.some((v) => l = v.callback(v.feature, v.layer, v.geometry)), l;
  }
  hasFeatureAtCoordinate(t, e, n, s, r, o) {
    return this.forEachFeatureAtCoordinate(
      t,
      e,
      n,
      s,
      xi,
      this,
      r,
      o
    ) !== void 0;
  }
  getMap() {
    return this.map_;
  }
  renderFrame(t) {
    B();
  }
  scheduleExpireIconCache(t) {
    sr.canExpireCache() && t.postRenderFunctions.push(Wd);
  }
}
function Wd(i, t) {
  sr.expire();
}
const jd = Bd;
class Ud extends Kt {
  constructor(t, e, n, s) {
    super(t), this.inversePixelTransform = e, this.frameState = n, this.context = s;
  }
}
const tc = Ud, Ls = "ol-hidden", Mn = "ol-unselectable", Mh = "ol-unsupported", Dr = "ol-control", Ch = "ol-collapsed", Xd = new RegExp(
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
), Eh = [
  "style",
  "variant",
  "weight",
  "size",
  "lineHeight",
  "family"
], ec = function(i) {
  const t = i.match(Xd);
  if (!t)
    return null;
  const e = {
    lineHeight: "normal",
    size: "1.2em",
    style: "normal",
    weight: "normal",
    variant: "normal"
  };
  for (let n = 0, s = Eh.length; n < s; ++n) {
    const r = t[n + 1];
    r !== void 0 && (e[Eh[n]] = r);
  }
  return e.families = e.family.split(/,\s?/), e;
};
function jt(i, t, e, n) {
  let s;
  return e && e.length ? s = e.shift() : ta ? s = new OffscreenCanvas(i || 300, t || 300) : s = document.createElement("canvas"), i && (s.width = i), t && (s.height = t), s.getContext("2d", n);
}
function ic(i) {
  const t = i.canvas;
  t.width = 1, t.height = 1, i.clearRect(0, 0, 1, 1);
}
function or(i, t) {
  const e = t.parentNode;
  e && e.replaceChild(i, t);
}
function Ro(i) {
  return i && i.parentNode ? i.parentNode.removeChild(i) : null;
}
function Yd(i) {
  for (; i.lastChild; )
    i.removeChild(i.lastChild);
}
function Vd(i, t) {
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
const nc = "10px sans-serif", be = "#000", ar = "round", qn = [], Kn = 0, _n = "round", Hn = 10, Zn = "#000", Jn = "center", hr = "middle", ui = [0, 0, 0, 0], Qn = 1, Me = new ie();
let Ui = null, bo;
const Io = {}, qd = function() {
  const t = "32px ", e = ["monospace", "serif"], n = e.length, s = "wmytzilWMYTZIL@#/&?$%10\uF013";
  let r, o;
  function a(l, c, u) {
    let d = !0;
    for (let f = 0; f < n; ++f) {
      const g = e[f];
      if (o = lr(
        l + " " + c + " " + t + g,
        s
      ), u != g) {
        const _ = lr(
          l + " " + c + " " + t + u + "," + g,
          s
        );
        d = d && _ != o;
      }
    }
    return !!d;
  }
  function h() {
    let l = !0;
    const c = Me.getKeys();
    for (let u = 0, d = c.length; u < d; ++u) {
      const f = c[u];
      Me.get(f) < 100 && (a.apply(this, f.split(`
`)) ? (ls(Io), Ui = null, bo = void 0, Me.set(f, 100)) : (Me.set(f, Me.get(f) + 1, !0), l = !1));
    }
    l && (clearInterval(r), r = void 0);
  }
  return function(l) {
    const c = ec(l);
    if (!c)
      return;
    const u = c.families;
    for (let d = 0, f = u.length; d < f; ++d) {
      const g = u[d], _ = c.style + `
` + c.weight + `
` + g;
      Me.get(_) === void 0 && (Me.set(_, 100, !0), a(c.style, c.weight, g) || (Me.set(_, 0, !0), r === void 0 && (r = setInterval(h, 32))));
    }
  };
}(), Kd = function() {
  let i;
  return function(t) {
    let e = Io[t];
    if (e == null) {
      if (ta) {
        const n = ec(t), s = sc(t, "\u017Dg");
        e = (isNaN(Number(n.lineHeight)) ? 1.2 : Number(n.lineHeight)) * (s.actualBoundingBoxAscent + s.actualBoundingBoxDescent);
      } else
        i || (i = document.createElement("div"), i.innerHTML = "M", i.style.minHeight = "0", i.style.maxHeight = "none", i.style.height = "auto", i.style.padding = "0", i.style.border = "none", i.style.position = "absolute", i.style.display = "block", i.style.left = "-99999px"), i.style.font = t, document.body.appendChild(i), e = i.offsetHeight, document.body.removeChild(i);
      Io[t] = e;
    }
    return e;
  };
}();
function sc(i, t) {
  return Ui || (Ui = jt(1, 1)), i != bo && (Ui.font = i, bo = Ui.font), Ui.measureText(t);
}
function lr(i, t) {
  return sc(i, t).width;
}
function Sh(i, t, e) {
  if (t in e)
    return e[t];
  const n = t.split(`
`).reduce((s, r) => Math.max(s, lr(i, r)), 0);
  return e[t] = n, n;
}
function Hd(i, t) {
  const e = [], n = [], s = [];
  let r = 0, o = 0, a = 0, h = 0;
  for (let l = 0, c = t.length; l <= c; l += 2) {
    const u = t[l];
    if (u === `
` || l === c) {
      r = Math.max(r, o), s.push(o), o = 0, a += h;
      continue;
    }
    const d = t[l + 1] || i.font, f = lr(d, u);
    e.push(f), o += f;
    const g = Kd(d);
    n.push(g), h = Math.max(h, g);
  }
  return { width: r, height: a, widths: e, heights: n, lineWidths: s };
}
function Zd(i, t, e, n, s, r, o, a, h, l, c) {
  i.save(), e !== 1 && (i.globalAlpha *= e), t && i.setTransform.apply(i, t), n.contextInstructions ? (i.translate(h, l), i.scale(c[0], c[1]), Jd(n, i)) : c[0] < 0 || c[1] < 0 ? (i.translate(h, l), i.scale(c[0], c[1]), i.drawImage(
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
    h,
    l,
    o * c[0],
    a * c[1]
  ), i.restore();
}
function Jd(i, t) {
  const e = i.contextInstructions;
  for (let n = 0, s = e.length; n < s; n += 2)
    Array.isArray(e[n + 1]) ? t[e[n]].apply(
      t,
      e[n + 1]
    ) : t[e[n]] = e[n + 1];
}
class Qd extends jd {
  constructor(t) {
    super(t), this.fontChangeListenerKey_ = U(
      Me,
      fn.PROPERTYCHANGE,
      t.redrawText.bind(t)
    ), this.element_ = document.createElement("div");
    const e = this.element_.style;
    e.position = "absolute", e.width = "100%", e.height = "100%", e.zIndex = "0", this.element_.className = Mn + " ol-layers";
    const n = t.getViewport();
    n.insertBefore(this.element_, n.firstChild || null), this.children_ = [], this.renderedVisible_ = !0;
  }
  dispatchRenderEvent(t, e) {
    const n = this.getMap();
    if (n.hasListener(t)) {
      const s = new tc(t, void 0, e);
      n.dispatchEvent(s);
    }
  }
  disposeInternal() {
    et(this.fontChangeListenerKey_), this.element_.parentNode.removeChild(this.element_), super.disposeInternal();
  }
  renderFrame(t) {
    if (!t) {
      this.renderedVisible_ && (this.element_.style.display = "none", this.renderedVisible_ = !1);
      return;
    }
    this.calculateMatrices2D(t), this.dispatchRenderEvent(Ke.PRECOMPOSE, t);
    const e = t.layerStatesArray.sort(function(o, a) {
      return o.zIndex - a.zIndex;
    }), n = t.viewState;
    this.children_.length = 0;
    const s = [];
    let r = null;
    for (let o = 0, a = e.length; o < a; ++o) {
      const h = e[o];
      t.layerIndex = o;
      const l = h.layer, c = l.getSourceState();
      if (!oa(h, n) || c != "ready" && c != "undefined") {
        l.unrender();
        continue;
      }
      const u = l.render(t, r);
      !u || (u !== r && (this.children_.push(u), r = u), "getDeclutter" in l && s.push(
        l
      ));
    }
    for (let o = s.length - 1; o >= 0; --o)
      s[o].renderDeclutter(t);
    Vd(this.element_, this.children_), this.dispatchRenderEvent(Ke.POSTCOMPOSE, t), this.renderedVisible_ || (this.element_.style.display = "", this.renderedVisible_ = !0), this.scheduleExpireIconCache(t);
  }
}
const tf = Qd;
class Be extends Kt {
  constructor(t, e) {
    super(t), this.layer = e;
  }
}
const to = {
  LAYERS: "layers"
};
class la extends Jl {
  constructor(t) {
    t = t || {};
    const e = Object.assign({}, t);
    delete e.layers;
    let n = t.layers;
    super(e), this.on, this.once, this.un, this.layersListenerKeys_ = [], this.listenerKeys_ = {}, this.addChangeListener(to.LAYERS, this.handleLayersChanged_), n ? Array.isArray(n) ? n = new qt(n.slice(), { unique: !0 }) : Y(typeof n.getArray == "function", 43) : n = new qt(void 0, { unique: !0 }), this.setLayers(n);
  }
  handleLayerChange_() {
    this.changed();
  }
  handleLayersChanged_() {
    this.layersListenerKeys_.forEach(et), this.layersListenerKeys_.length = 0;
    const t = this.getLayers();
    this.layersListenerKeys_.push(
      U(t, xt.ADD, this.handleLayersAdd_, this),
      U(t, xt.REMOVE, this.handleLayersRemove_, this)
    );
    for (const n in this.listenerKeys_)
      this.listenerKeys_[n].forEach(et);
    ls(this.listenerKeys_);
    const e = t.getArray();
    for (let n = 0, s = e.length; n < s; n++) {
      const r = e[n];
      this.registerLayerListeners_(r), this.dispatchEvent(new Be("addlayer", r));
    }
    this.changed();
  }
  registerLayerListeners_(t) {
    const e = [
      U(
        t,
        fn.PROPERTYCHANGE,
        this.handleLayerChange_,
        this
      ),
      U(t, z.CHANGE, this.handleLayerChange_, this)
    ];
    t instanceof la && e.push(
      U(t, "addlayer", this.handleLayerGroupAdd_, this),
      U(t, "removelayer", this.handleLayerGroupRemove_, this)
    ), this.listenerKeys_[j(t)] = e;
  }
  handleLayerGroupAdd_(t) {
    this.dispatchEvent(new Be("addlayer", t.layer));
  }
  handleLayerGroupRemove_(t) {
    this.dispatchEvent(new Be("removelayer", t.layer));
  }
  handleLayersAdd_(t) {
    const e = t.element;
    this.registerLayerListeners_(e), this.dispatchEvent(new Be("addlayer", e)), this.changed();
  }
  handleLayersRemove_(t) {
    const e = t.element, n = j(e);
    this.listenerKeys_[n].forEach(et), delete this.listenerKeys_[n], this.dispatchEvent(new Be("removelayer", e)), this.changed();
  }
  getLayers() {
    return this.get(to.LAYERS);
  }
  setLayers(t) {
    const e = this.getLayers();
    if (e) {
      const n = e.getArray();
      for (let s = 0, r = n.length; s < r; ++s)
        this.dispatchEvent(new Be("removelayer", n[s]));
    }
    this.set(to.LAYERS, t);
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
      const h = e[o];
      h.opacity *= s.opacity, h.visible = h.visible && s.visible, h.maxResolution = Math.min(
        h.maxResolution,
        s.maxResolution
      ), h.minResolution = Math.max(
        h.minResolution,
        s.minResolution
      ), h.minZoom = Math.max(h.minZoom, s.minZoom), h.maxZoom = Math.min(h.maxZoom, s.maxZoom), s.extent !== void 0 && (h.extent !== void 0 ? h.extent = zn(
        h.extent,
        s.extent
      ) : h.extent = s.extent), h.zIndex === void 0 && (h.zIndex = r);
    }
    return e;
  }
  getSourceState() {
    return "ready";
  }
}
const Nr = la;
class ef extends Kt {
  constructor(t, e, n) {
    super(t), this.map = e, this.frameState = n !== void 0 ? n : null;
  }
}
const Xi = ef;
class nf extends Xi {
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
const Ce = nf, V = {
  SINGLECLICK: "singleclick",
  CLICK: z.CLICK,
  DBLCLICK: z.DBLCLICK,
  POINTERDRAG: "pointerdrag",
  POINTERMOVE: "pointermove",
  POINTERDOWN: "pointerdown",
  POINTERUP: "pointerup",
  POINTEROVER: "pointerover",
  POINTEROUT: "pointerout",
  POINTERENTER: "pointerenter",
  POINTERLEAVE: "pointerleave",
  POINTERCANCEL: "pointercancel"
}, Ao = {
  POINTERMOVE: "pointermove",
  POINTERDOWN: "pointerdown",
  POINTERUP: "pointerup",
  POINTEROVER: "pointerover",
  POINTEROUT: "pointerout",
  POINTERENTER: "pointerenter",
  POINTERLEAVE: "pointerleave",
  POINTERCANCEL: "pointercancel"
};
class sf extends Rr {
  constructor(t, e) {
    super(t), this.map_ = t, this.clickTimeoutId_, this.emulateClicks_ = !1, this.dragging_ = !1, this.dragListenerKeys_ = [], this.moveTolerance_ = e === void 0 ? 1 : e, this.down_ = null;
    const n = this.map_.getViewport();
    this.activePointers_ = [], this.trackedTouches_ = {}, this.element_ = n, this.pointerdownListenerKey_ = U(
      n,
      Ao.POINTERDOWN,
      this.handlePointerDown_,
      this
    ), this.originalPointerMoveEvent_, this.relayedListenerKey_ = U(
      n,
      Ao.POINTERMOVE,
      this.relayMoveEvent_,
      this
    ), this.boundHandleTouchMove_ = this.handleTouchMove_.bind(this), this.element_.addEventListener(
      z.TOUCHMOVE,
      this.boundHandleTouchMove_,
      jl ? { passive: !1 } : !1
    );
  }
  emulateClick_(t) {
    let e = new Ce(
      V.CLICK,
      this.map_,
      t
    );
    this.dispatchEvent(e), this.clickTimeoutId_ !== void 0 ? (clearTimeout(this.clickTimeoutId_), this.clickTimeoutId_ = void 0, e = new Ce(
      V.DBLCLICK,
      this.map_,
      t
    ), this.dispatchEvent(e)) : this.clickTimeoutId_ = setTimeout(
      function() {
        this.clickTimeoutId_ = void 0;
        const n = new Ce(
          V.SINGLECLICK,
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
    if (e.type == V.POINTERUP || e.type == V.POINTERCANCEL) {
      delete this.trackedTouches_[n];
      for (const s in this.trackedTouches_)
        if (this.trackedTouches_[s].target !== e.target) {
          delete this.trackedTouches_[s];
          break;
        }
    } else
      (e.type == V.POINTERDOWN || e.type == V.POINTERMOVE) && (this.trackedTouches_[n] = e);
    this.activePointers_ = Object.values(this.trackedTouches_);
  }
  handlePointerUp_(t) {
    this.updateActivePointers_(t);
    const e = new Ce(
      V.POINTERUP,
      this.map_,
      t,
      void 0,
      void 0,
      this.activePointers_
    );
    this.dispatchEvent(e), this.emulateClicks_ && !e.defaultPrevented && !this.dragging_ && this.isMouseActionButton_(t) && this.emulateClick_(this.down_), this.activePointers_.length === 0 && (this.dragListenerKeys_.forEach(et), this.dragListenerKeys_.length = 0, this.dragging_ = !1, this.down_ = null);
  }
  isMouseActionButton_(t) {
    return t.button === 0;
  }
  handlePointerDown_(t) {
    this.emulateClicks_ = this.activePointers_.length === 0, this.updateActivePointers_(t);
    const e = new Ce(
      V.POINTERDOWN,
      this.map_,
      t,
      void 0,
      void 0,
      this.activePointers_
    );
    this.dispatchEvent(e), this.down_ = {};
    for (const n in t) {
      const s = t[n];
      this.down_[n] = typeof s == "function" ? vi : s;
    }
    if (this.dragListenerKeys_.length === 0) {
      const n = this.map_.getOwnerDocument();
      this.dragListenerKeys_.push(
        U(
          n,
          V.POINTERMOVE,
          this.handlePointerMove_,
          this
        ),
        U(n, V.POINTERUP, this.handlePointerUp_, this),
        U(
          this.element_,
          V.POINTERCANCEL,
          this.handlePointerUp_,
          this
        )
      ), this.element_.getRootNode && this.element_.getRootNode() !== n && this.dragListenerKeys_.push(
        U(
          this.element_.getRootNode(),
          V.POINTERUP,
          this.handlePointerUp_,
          this
        )
      );
    }
  }
  handlePointerMove_(t) {
    if (this.isMoving_(t)) {
      this.updateActivePointers_(t), this.dragging_ = !0;
      const e = new Ce(
        V.POINTERDRAG,
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
      new Ce(
        V.POINTERMOVE,
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
    this.relayedListenerKey_ && (et(this.relayedListenerKey_), this.relayedListenerKey_ = null), this.element_.removeEventListener(
      z.TOUCHMOVE,
      this.boundHandleTouchMove_
    ), this.pointerdownListenerKey_ && (et(this.pointerdownListenerKey_), this.pointerdownListenerKey_ = null), this.dragListenerKeys_.forEach(et), this.dragListenerKeys_.length = 0, this.element_ = null, super.disposeInternal();
  }
}
const rf = sf, ze = {
  POSTRENDER: "postrender",
  MOVESTART: "movestart",
  MOVEEND: "moveend",
  LOADSTART: "loadstart",
  LOADEND: "loadend"
}, _t = {
  LAYERGROUP: "layergroup",
  SIZE: "size",
  TARGET: "target",
  VIEW: "view"
}, cr = 1 / 0;
class of {
  constructor(t, e) {
    this.priorityFunction_ = t, this.keyFunction_ = e, this.elements_ = [], this.priorities_ = [], this.queuedElements_ = {};
  }
  clear() {
    this.elements_.length = 0, this.priorities_.length = 0, ls(this.queuedElements_);
  }
  dequeue() {
    const t = this.elements_, e = this.priorities_, n = t[0];
    t.length == 1 ? (t.length = 0, e.length = 0) : (t[0] = t.pop(), e[0] = e.pop(), this.siftUp_(0));
    const s = this.keyFunction_(n);
    return delete this.queuedElements_[s], n;
  }
  enqueue(t) {
    Y(!(this.keyFunction_(t) in this.queuedElements_), 31);
    const e = this.priorityFunction_(t);
    return e != cr ? (this.elements_.push(t), this.priorities_.push(e), this.queuedElements_[this.keyFunction_(t)] = !0, this.siftDown_(0, this.elements_.length - 1), !0) : !1;
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
      const h = this.getLeftChildIndex_(t), l = this.getRightChildIndex_(t), c = l < s && n[l] < n[h] ? l : h;
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
    let o, a, h;
    for (a = 0; a < r; ++a)
      o = e[a], h = t(o), h == cr ? delete this.queuedElements_[this.keyFunction_(o)] : (n[s] = h, e[s++] = o);
    e.length = s, n.length = s, this.heapify_();
  }
}
const af = of, k = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};
class hf extends af {
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
    return e && t[0].addEventListener(z.CHANGE, this.boundHandleTileChange_), e;
  }
  getTilesLoading() {
    return this.tilesLoading_;
  }
  handleTileChange(t) {
    const e = t.target, n = e.getState();
    if (n === k.LOADED || n === k.ERROR || n === k.EMPTY) {
      n !== k.ERROR && e.removeEventListener(z.CHANGE, this.boundHandleTileChange_);
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
const lf = hf;
function cf(i, t, e, n, s) {
  if (!i || !(e in i.wantedTiles) || !i.wantedTiles[e][t.getKey()])
    return cr;
  const r = i.viewState.center, o = n[0] - r[0], a = n[1] - r[1];
  return 65536 * Math.log(s) + Math.sqrt(o * o + a * a) / s;
}
const St = {
  ANIMATING: 0,
  INTERACTING: 1
}, Zt = {
  CENTER: "center",
  RESOLUTION: "resolution",
  ROTATION: "rotation"
}, uf = 42, ca = 256, mn = {
  radians: 6370997 / (2 * Math.PI),
  degrees: 2 * Math.PI * 6370997 / 360,
  ft: 0.3048,
  m: 1,
  "us-ft": 1200 / 3937
};
class df {
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
    return this.metersPerUnit_ || mn[this.units_];
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
const rc = df, us = 6378137, Hi = Math.PI * us, ff = [-Hi, -Hi, Hi, Hi], gf = [-180, -85, 180, 85], Os = us * Math.log(Math.tan(Math.PI / 2));
class $i extends rc {
  constructor(t) {
    super({
      code: t,
      units: "m",
      extent: ff,
      global: !0,
      worldExtent: gf,
      getPointResolution: function(e, n) {
        return e / Math.cosh(n[1] / us);
      }
    });
  }
}
const Th = [
  new $i("EPSG:3857"),
  new $i("EPSG:102100"),
  new $i("EPSG:102113"),
  new $i("EPSG:900913"),
  new $i("http://www.opengis.net/def/crs/EPSG/0/3857"),
  new $i("http://www.opengis.net/gml/srs/epsg.xml#3857")
];
function _f(i, t, e) {
  const n = i.length;
  e = e > 1 ? e : 2, t === void 0 && (e > 2 ? t = i.slice() : t = new Array(n));
  for (let s = 0; s < n; s += e) {
    t[s] = Hi * i[s] / 180;
    let r = us * Math.log(Math.tan(Math.PI * (+i[s + 1] + 90) / 360));
    r > Os ? r = Os : r < -Os && (r = -Os), t[s + 1] = r;
  }
  return t;
}
function mf(i, t, e) {
  const n = i.length;
  e = e > 1 ? e : 2, t === void 0 && (e > 2 ? t = i.slice() : t = new Array(n));
  for (let s = 0; s < n; s += e)
    t[s] = 180 * i[s] / Hi, t[s + 1] = 360 * Math.atan(Math.exp(i[s + 1] / us)) / Math.PI - 90;
  return t;
}
const yf = 6378137, wh = [-180, -90, 180, 90], pf = Math.PI * yf / 180;
class ai extends rc {
  constructor(t, e) {
    super({
      code: t,
      units: "degrees",
      extent: wh,
      axisOrientation: e,
      global: !0,
      metersPerUnit: pf,
      worldExtent: wh
    });
  }
}
const Rh = [
  new ai("CRS:84"),
  new ai("EPSG:4326", "neu"),
  new ai("urn:ogc:def:crs:OGC:1.3:CRS84"),
  new ai("urn:ogc:def:crs:OGC:2:84"),
  new ai("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
  new ai("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
  new ai("http://www.opengis.net/def/crs/EPSG/0/4326", "neu")
];
let Po = {};
function xf(i) {
  return Po[i] || Po[i.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
}
function vf(i, t) {
  Po[i] = t;
}
let on = {};
function ur(i, t, e) {
  const n = i.getCode(), s = t.getCode();
  n in on || (on[n] = {}), on[n][s] = e;
}
function Mf(i, t) {
  let e;
  return i in on && t in on[i] && (e = on[i][t]), e;
}
const oc = 63710088e-1;
function bh(i, t, e) {
  e = e || oc;
  const n = gi(i[1]), s = gi(t[1]), r = (s - n) / 2, o = gi(t[0] - i[0]) / 2, a = Math.sin(r) * Math.sin(r) + Math.sin(o) * Math.sin(o) * Math.cos(n) * Math.cos(s);
  return 2 * e * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function Cf(i, t, e, n) {
  n = n || oc;
  const s = gi(i[1]), r = gi(i[0]), o = t / n, a = Math.asin(
    Math.sin(s) * Math.cos(o) + Math.cos(s) * Math.sin(o) * Math.cos(e)
  ), h = r + Math.atan2(
    Math.sin(e) * Math.sin(o) * Math.cos(s),
    Math.cos(o) - Math.sin(s) * Math.sin(a)
  );
  return [ph(h), ph(a)];
}
let Lo = !0;
function Ef(i) {
  Lo = !(i === void 0 ? !0 : i);
}
function ua(i, t, e) {
  if (t !== void 0) {
    for (let n = 0, s = i.length; n < s; ++n)
      t[n] = i[n];
    t = t;
  } else
    t = i.slice();
  return t;
}
function da(i, t, e) {
  if (t !== void 0 && i !== t) {
    for (let n = 0, s = i.length; n < s; ++n)
      t[n] = i[n];
    i = t;
  }
  return i;
}
function Sf(i) {
  vf(i.getCode(), i), ur(i, i, ua);
}
function Tf(i) {
  i.forEach(Sf);
}
function st(i) {
  return typeof i == "string" ? xf(i) : i || null;
}
function dr(i, t, e, n) {
  i = st(i);
  let s;
  const r = i.getPointResolutionFunc();
  if (r) {
    if (s = r(t, e), n && n !== i.getUnits()) {
      const o = i.getMetersPerUnit();
      o && (s = s * o / mn[n]);
    }
  } else {
    const o = i.getUnits();
    if (o == "degrees" && !n || n == "degrees")
      s = t;
    else {
      const a = kr(
        i,
        st("EPSG:4326")
      );
      if (a === da && o !== "degrees")
        s = t * i.getMetersPerUnit();
      else {
        let l = [
          e[0] - t / 2,
          e[1],
          e[0] + t / 2,
          e[1],
          e[0],
          e[1] - t / 2,
          e[0],
          e[1] + t / 2
        ];
        l = a(l, l, 2);
        const c = bh(l.slice(0, 2), l.slice(2, 4)), u = bh(l.slice(4, 6), l.slice(6, 8));
        s = (c + u) / 2;
      }
      const h = n ? mn[n] : i.getMetersPerUnit();
      h !== void 0 && (s /= h);
    }
  }
  return s;
}
function Ih(i) {
  Tf(i), i.forEach(function(t) {
    i.forEach(function(e) {
      t !== e && ur(t, e, ua);
    });
  });
}
function wf(i, t, e, n) {
  i.forEach(function(s) {
    t.forEach(function(r) {
      ur(s, r, e), ur(r, s, n);
    });
  });
}
function fa(i, t) {
  return i ? typeof i == "string" ? st(i) : i : st(t);
}
function Se(i, t) {
  if (i === t)
    return !0;
  const e = i.getUnits() === t.getUnits();
  return (i.getCode() === t.getCode() || kr(i, t) === ua) && e;
}
function kr(i, t) {
  const e = i.getCode(), n = t.getCode();
  let s = Mf(e, n);
  return s || (s = da), s;
}
function ts(i, t) {
  const e = st(i), n = st(t);
  return kr(e, n);
}
function Rf(i, t, e) {
  return ts(t, e)(i, void 0, i.length);
}
function bf(i, t, e, n) {
  const s = ts(t, e);
  return Sd(i, s, void 0, n);
}
function yn(i, t) {
  return i;
}
function rt(i, t) {
  return Lo && !Jt(i, [0, 0]) && i[0] >= -180 && i[0] <= 180 && i[1] >= -90 && i[1] <= 90 && (Lo = !1, console.warn(
    "Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates."
  )), i;
}
function ga(i, t) {
  return i;
}
function Ue(i, t) {
  return i;
}
function If() {
  Ih(Th), Ih(Rh), wf(
    Rh,
    Th,
    _f,
    mf
  );
}
If();
function Ah(i, t, e) {
  return function(n, s, r, o, a) {
    if (!n)
      return;
    if (!s && !t)
      return n;
    const h = t ? 0 : r[0] * s, l = t ? 0 : r[1] * s, c = a ? a[0] : 0, u = a ? a[1] : 0;
    let d = i[0] + h / 2 + c, f = i[2] - h / 2 + c, g = i[1] + l / 2 + u, _ = i[3] - l / 2 + u;
    d > f && (d = (f + d) / 2, f = d), g > _ && (g = (_ + g) / 2, _ = g);
    let m = dt(n[0], d, f), y = dt(n[1], g, _);
    if (o && e && s) {
      const p = 30 * s;
      m += -p * Math.log(1 + Math.max(0, d - n[0]) / p) + p * Math.log(1 + Math.max(0, n[0] - f) / p), y += -p * Math.log(1 + Math.max(0, g - n[1]) / p) + p * Math.log(1 + Math.max(0, n[1] - _) / p);
    }
    return [m, y];
  };
}
function Af(i) {
  return i;
}
function _a(i, t, e, n) {
  const s = ot(t) / e[0], r = ue(t) / e[1];
  return n ? Math.min(i, Math.max(s, r)) : Math.min(i, Math.min(s, r));
}
function ma(i, t, e) {
  let n = Math.min(i, t);
  const s = 50;
  return n *= Math.log(1 + s * Math.max(0, i / t - 1)) / s + 1, e && (n = Math.max(n, e), n /= Math.log(1 + s * Math.max(0, e / i - 1)) / s + 1), dt(n, e / 2, t * 2);
}
function Pf(i, t, e, n) {
  return t = t !== void 0 ? t : !0, function(s, r, o, a) {
    if (s !== void 0) {
      const h = i[0], l = i[i.length - 1], c = e ? _a(
        h,
        e,
        o,
        n
      ) : h;
      if (a)
        return t ? ma(
          s,
          c,
          l
        ) : dt(s, l, c);
      const u = Math.min(c, s), d = Math.floor(Qo(i, u, r));
      return i[d] > c && d < i.length - 1 ? i[d + 1] : i[d];
    } else
      return;
  };
}
function Lf(i, t, e, n, s, r) {
  return n = n !== void 0 ? n : !0, e = e !== void 0 ? e : 0, function(o, a, h, l) {
    if (o !== void 0) {
      const c = s ? _a(
        t,
        s,
        h,
        r
      ) : t;
      if (l)
        return n ? ma(
          o,
          c,
          e
        ) : dt(o, e, c);
      const u = 1e-9, d = Math.ceil(
        Math.log(t / c) / Math.log(i) - u
      ), f = -a * (0.5 - u) + 0.5, g = Math.min(c, o), _ = Math.floor(
        Math.log(t / g) / Math.log(i) + f
      ), m = Math.max(d, _), y = t / Math.pow(i, m);
      return dt(y, e, c);
    } else
      return;
  };
}
function Ph(i, t, e, n, s) {
  return e = e !== void 0 ? e : !0, function(r, o, a, h) {
    if (r !== void 0) {
      const l = n ? _a(
        i,
        n,
        a,
        s
      ) : i;
      return !e || !h ? dt(r, t, l) : ma(
        r,
        l,
        t
      );
    } else
      return;
  };
}
function ya(i) {
  if (i !== void 0)
    return 0;
}
function Lh(i) {
  if (i !== void 0)
    return i;
}
function Of(i) {
  const t = 2 * Math.PI / i;
  return function(e, n) {
    if (n)
      return e;
    if (e !== void 0)
      return e = Math.floor(e / t + 0.5) * t, e;
  };
}
function Ff(i) {
  return i = i || gi(5), function(t, e) {
    if (e)
      return t;
    if (t !== void 0)
      return Math.abs(t) <= i ? 0 : t;
  };
}
function ac(i) {
  return Math.pow(i, 3);
}
function Cn(i) {
  return 1 - ac(1 - i);
}
function Df(i) {
  return 3 * i * i - 2 * i * i * i;
}
function Nf(i) {
  return i;
}
function mi(i, t, e, n, s, r) {
  r = r || [];
  let o = 0;
  for (let a = t; a < e; a += n) {
    const h = i[a], l = i[a + 1];
    r[o++] = s[0] * h + s[2] * l + s[4], r[o++] = s[1] * h + s[3] * l + s[5];
  }
  return r && r.length != o && (r.length = o), r;
}
function pa(i, t, e, n, s, r, o) {
  o = o || [];
  const a = Math.cos(s), h = Math.sin(s), l = r[0], c = r[1];
  let u = 0;
  for (let d = t; d < e; d += n) {
    const f = i[d] - l, g = i[d + 1] - c;
    o[u++] = l + f * a - g * h, o[u++] = c + f * h + g * a;
    for (let _ = d + 2; _ < d + n; ++_)
      o[u++] = i[_];
  }
  return o && o.length != u && (o.length = u), o;
}
function kf(i, t, e, n, s, r, o, a) {
  a = a || [];
  const h = o[0], l = o[1];
  let c = 0;
  for (let u = t; u < e; u += n) {
    const d = i[u] - h, f = i[u + 1] - l;
    a[c++] = h + s * d, a[c++] = l + r * f;
    for (let g = u + 2; g < u + n; ++g)
      a[c++] = i[g];
  }
  return a && a.length != c && (a.length = c), a;
}
function hc(i, t, e, n, s, r, o) {
  o = o || [];
  let a = 0;
  for (let h = t; h < e; h += n) {
    o[a++] = i[h] + s, o[a++] = i[h + 1] + r;
    for (let l = h + 2; l < h + n; ++l)
      o[a++] = i[l];
  }
  return o && o.length != a && (o.length = a), o;
}
const Oh = he();
class Gf extends ie {
  constructor() {
    super(), this.extent_ = Wt(), this.extentRevision_ = -1, this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = 0, this.simplifyTransformedInternal = id(function(t, e, n) {
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
    return B();
  }
  closestPointXY(t, e, n, s) {
    return B();
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
    return B();
  }
  getExtent(t) {
    if (this.extentRevision_ != this.getRevision()) {
      const e = this.computeExtent(this.extent_);
      (isNaN(e[0]) || isNaN(e[1])) && cs(e), this.extentRevision_ = this.getRevision();
    }
    return Cd(this.extent_, t);
  }
  rotate(t, e) {
    B();
  }
  scale(t, e, n) {
    B();
  }
  simplify(t) {
    return this.getSimplifiedGeometry(t * t);
  }
  getSimplifiedGeometry(t) {
    return B();
  }
  getType() {
    return B();
  }
  applyTransform(t) {
    B();
  }
  intersectsExtent(t) {
    return B();
  }
  translate(t, e) {
    B();
  }
  transform(t, e) {
    const n = st(t), s = n.getUnits() == "tile-pixels" ? function(r, o, a) {
      const h = n.getExtent(), l = n.getWorldExtent(), c = ue(l) / ue(h);
      return Je(
        Oh,
        l[0],
        l[3],
        c,
        -c,
        0,
        0,
        0
      ), mi(
        r,
        0,
        r.length,
        a,
        Oh,
        o
      ), ts(n, e)(
        r,
        o,
        a
      );
    } : ts(n, e);
    return this.applyTransform(s), this;
  }
}
const lc = Gf;
class $f extends lc {
  constructor() {
    super(), this.layout = "XY", this.stride = 2, this.flatCoordinates = null;
  }
  computeExtent(t) {
    return Yl(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t
    );
  }
  getCoordinates() {
    return B();
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
    this.stride = fr(t), this.layout = t, this.flatCoordinates = e;
  }
  setCoordinates(t, e) {
    B();
  }
  setLayout(t, e, n) {
    let s;
    if (t)
      s = fr(t);
    else {
      for (let r = 0; r < n; ++r)
        if (e.length === 0) {
          this.layout = "XY", this.stride = 2;
          return;
        } else
          e = e[0];
      s = e.length, t = zf(s);
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
      pa(
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
    e === void 0 && (e = t), n || (n = Mi(this.getExtent()));
    const s = this.getFlatCoordinates();
    if (s) {
      const r = this.getStride();
      kf(
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
      hc(
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
function zf(i) {
  let t;
  return i == 2 ? t = "XY" : i == 3 ? t = "XYZ" : i == 4 && (t = "XYZM"), t;
}
function fr(i) {
  let t;
  return i == "XY" ? t = 2 : i == "XYZ" || i == "XYM" ? t = 3 : i == "XYZM" && (t = 4), t;
}
function Bf(i, t, e) {
  const n = i.getFlatCoordinates();
  if (n) {
    const s = i.getStride();
    return mi(
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
const ni = $f;
function Fh(i, t, e, n, s, r, o) {
  const a = i[t], h = i[t + 1], l = i[e] - a, c = i[e + 1] - h;
  let u;
  if (l === 0 && c === 0)
    u = t;
  else {
    const d = ((s - a) * l + (r - h) * c) / (l * l + c * c);
    if (d > 1)
      u = e;
    else if (d > 0) {
      for (let f = 0; f < n; ++f)
        o[f] = Ee(
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
function xa(i, t, e, n, s) {
  let r = i[t], o = i[t + 1];
  for (t += n; t < e; t += n) {
    const a = i[t], h = i[t + 1], l = we(r, o, a, h);
    l > s && (s = l), r = a, o = h;
  }
  return s;
}
function va(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    s = xa(i, t, a, n, s), t = a;
  }
  return s;
}
function Wf(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    s = va(i, t, a, n, s), t = a[a.length - 1];
  }
  return s;
}
function Ma(i, t, e, n, s, r, o, a, h, l, c) {
  if (t == e)
    return l;
  let u, d;
  if (s === 0)
    if (d = we(
      o,
      a,
      i[t],
      i[t + 1]
    ), d < l) {
      for (u = 0; u < n; ++u)
        h[u] = i[t + u];
      return h.length = n, d;
    } else
      return l;
  c = c || [NaN, NaN];
  let f = t + n;
  for (; f < e; )
    if (Fh(
      i,
      f - n,
      f,
      n,
      o,
      a,
      c
    ), d = we(o, a, c[0], c[1]), d < l) {
      for (l = d, u = 0; u < n; ++u)
        h[u] = c[u];
      h.length = n, f += n;
    } else
      f += n * Math.max(
        (Math.sqrt(d) - Math.sqrt(l)) / s | 0,
        1
      );
  if (r && (Fh(
    i,
    e - n,
    t,
    n,
    o,
    a,
    c
  ), d = we(o, a, c[0], c[1]), d < l)) {
    for (l = d, u = 0; u < n; ++u)
      h[u] = c[u];
    h.length = n;
  }
  return l;
}
function Ca(i, t, e, n, s, r, o, a, h, l, c) {
  c = c || [NaN, NaN];
  for (let u = 0, d = e.length; u < d; ++u) {
    const f = e[u];
    l = Ma(
      i,
      t,
      f,
      n,
      s,
      r,
      o,
      a,
      h,
      l,
      c
    ), t = f;
  }
  return l;
}
function jf(i, t, e, n, s, r, o, a, h, l, c) {
  c = c || [NaN, NaN];
  for (let u = 0, d = e.length; u < d; ++u) {
    const f = e[u];
    l = Ca(
      i,
      t,
      f,
      n,
      s,
      r,
      o,
      a,
      h,
      l,
      c
    ), t = f[f.length - 1];
  }
  return l;
}
function cc(i, t, e, n) {
  for (let s = 0, r = e.length; s < r; ++s)
    i[t++] = e[s];
  return t;
}
function Gr(i, t, e, n) {
  for (let s = 0, r = e.length; s < r; ++s) {
    const o = e[s];
    for (let a = 0; a < n; ++a)
      i[t++] = o[a];
  }
  return t;
}
function Ea(i, t, e, n, s) {
  s = s || [];
  let r = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const h = Gr(
      i,
      t,
      e[o],
      n
    );
    s[r++] = h, t = h;
  }
  return s.length = r, s;
}
function Uf(i, t, e, n, s) {
  s = s || [];
  let r = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const h = Ea(
      i,
      t,
      e[o],
      n,
      s[r]
    );
    h.length === 0 && (h[0] = t), s[r++] = h, t = h[h.length - 1];
  }
  return s.length = r, s;
}
function Sa(i, t, e, n, s, r, o) {
  const a = (e - t) / n;
  if (a < 3) {
    for (; t < e; t += n)
      r[o++] = i[t], r[o++] = i[t + 1];
    return o;
  }
  const h = new Array(a);
  h[0] = 1, h[a - 1] = 1;
  const l = [t, e - n];
  let c = 0;
  for (; l.length > 0; ) {
    const u = l.pop(), d = l.pop();
    let f = 0;
    const g = i[d], _ = i[d + 1], m = i[u], y = i[u + 1];
    for (let p = d + n; p < u; p += n) {
      const x = i[p], v = i[p + 1], M = wd(x, v, g, _, m, y);
      M > f && (c = p, f = M);
    }
    f > s && (h[(c - t) / n] = 1, d + n < c && l.push(d, c), c + n < u && l.push(c, u));
  }
  for (let u = 0; u < a; ++u)
    h[u] && (r[o++] = i[t + u * n], r[o++] = i[t + u * n + 1]);
  return o;
}
function Xf(i, t, e, n, s, r, o, a) {
  for (let h = 0, l = e.length; h < l; ++h) {
    const c = e[h];
    o = Sa(
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
function li(i, t) {
  return t * Math.round(i / t);
}
function Yf(i, t, e, n, s, r, o) {
  if (t == e)
    return o;
  let a = li(i[t], s), h = li(i[t + 1], s);
  t += n, r[o++] = a, r[o++] = h;
  let l, c;
  do
    if (l = li(i[t], s), c = li(i[t + 1], s), t += n, t == e)
      return r[o++] = l, r[o++] = c, o;
  while (l == a && c == h);
  for (; t < e; ) {
    const u = li(i[t], s), d = li(i[t + 1], s);
    if (t += n, u == l && d == c)
      continue;
    const f = l - a, g = c - h, _ = u - a, m = d - h;
    if (f * m == g * _ && (f < 0 && _ < f || f == _ || f > 0 && _ > f) && (g < 0 && m < g || g == m || g > 0 && m > g)) {
      l = u, c = d;
      continue;
    }
    r[o++] = l, r[o++] = c, a = l, h = c, l = u, c = d;
  }
  return r[o++] = l, r[o++] = c, o;
}
function uc(i, t, e, n, s, r, o, a) {
  for (let h = 0, l = e.length; h < l; ++h) {
    const c = e[h];
    o = Yf(
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
function Vf(i, t, e, n, s, r, o, a) {
  for (let h = 0, l = e.length; h < l; ++h) {
    const c = e[h], u = [];
    o = uc(
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
function Xe(i, t, e, n, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = t; o < e; o += n)
    s[r++] = i.slice(o, o + n);
  return s.length = r, s;
}
function es(i, t, e, n, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const h = e[o];
    s[r++] = Xe(
      i,
      t,
      h,
      n,
      s[r]
    ), t = h;
  }
  return s.length = r, s;
}
function Oo(i, t, e, n, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const h = e[o];
    s[r++] = h.length === 1 && h[0] === t ? [] : es(
      i,
      t,
      h,
      n,
      s[r]
    ), t = h[h.length - 1];
  }
  return s.length = r, s;
}
function dc(i, t, e, n) {
  let s = 0, r = i[e - n], o = i[e - n + 1];
  for (; t < e; t += n) {
    const a = i[t], h = i[t + 1];
    s += o * a - r * h, r = a, o = h;
  }
  return s / 2;
}
function fc(i, t, e, n) {
  let s = 0;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    s += dc(i, t, a, n), t = a;
  }
  return s;
}
function qf(i, t, e, n) {
  let s = 0;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    s += fc(i, t, a, n), t = a[a.length - 1];
  }
  return s;
}
class gr extends ni {
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
    return new gr(this.flatCoordinates.slice(), this.layout);
  }
  closestPointXY(t, e, n, s) {
    return s < Ai(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      xa(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), Ma(
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
    return dc(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  getCoordinates() {
    return Xe(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  getSimplifiedGeometryInternal(t) {
    const e = [];
    return e.length = Sa(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      e,
      0
    ), new gr(e, "XY");
  }
  getType() {
    return "LinearRing";
  }
  intersectsExtent(t) {
    return !1;
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Gr(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
const Dh = gr;
class Ta extends ni {
  constructor(t, e) {
    super(), this.setCoordinates(t, e);
  }
  clone() {
    const t = new Ta(this.flatCoordinates.slice(), this.layout);
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, n, s) {
    const r = this.flatCoordinates, o = we(
      t,
      e,
      r[0],
      r[1]
    );
    if (o < s) {
      const a = this.stride;
      for (let h = 0; h < a; ++h)
        n[h] = r[h];
      return n.length = a, o;
    } else
      return s;
  }
  getCoordinates() {
    return this.flatCoordinates ? this.flatCoordinates.slice() : [];
  }
  computeExtent(t) {
    return Ks(this.flatCoordinates, t);
  }
  getType() {
    return "Point";
  }
  intersectsExtent(t) {
    return ia(t, this.flatCoordinates[0], this.flatCoordinates[1]);
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 0), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = cc(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
const le = Ta;
function Kf(i, t, e, n, s) {
  return !na(
    s,
    function(o) {
      return !di(
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
function di(i, t, e, n, s, r) {
  let o = 0, a = i[e - n], h = i[e - n + 1];
  for (; t < e; t += n) {
    const l = i[t], c = i[t + 1];
    h <= r ? c > r && (l - a) * (r - h) - (s - a) * (c - h) > 0 && o++ : c <= r && (l - a) * (r - h) - (s - a) * (c - h) < 0 && o--, a = l, h = c;
  }
  return o !== 0;
}
function wa(i, t, e, n, s, r) {
  if (e.length === 0 || !di(i, t, e[0], n, s, r))
    return !1;
  for (let o = 1, a = e.length; o < a; ++o)
    if (di(i, e[o - 1], e[o], n, s, r))
      return !1;
  return !0;
}
function Hf(i, t, e, n, s, r) {
  if (e.length === 0)
    return !1;
  for (let o = 0, a = e.length; o < a; ++o) {
    const h = e[o];
    if (wa(i, t, h, n, s, r))
      return !0;
    t = h[h.length - 1];
  }
  return !1;
}
function gc(i, t, e, n, s, r, o) {
  let a, h, l, c, u, d, f;
  const g = s[r + 1], _ = [];
  for (let p = 0, x = e.length; p < x; ++p) {
    const v = e[p];
    for (c = i[v - n], d = i[v - n + 1], a = t; a < v; a += n)
      u = i[a], f = i[a + 1], (g <= d && f <= g || d <= g && g <= f) && (l = (g - d) / (f - d) * (u - c) + c, _.push(l)), c = u, d = f;
  }
  let m = NaN, y = -1 / 0;
  for (_.sort(pi), c = _[0], a = 1, h = _.length; a < h; ++a) {
    u = _[a];
    const p = Math.abs(u - c);
    p > y && (l = (c + u) / 2, wa(i, t, e, n, l, g) && (m = l, y = p)), c = u;
  }
  return isNaN(m) && (m = s[r]), o ? (o.push(m, g, y), o) : [m, g, y];
}
function Zf(i, t, e, n, s) {
  let r = [];
  for (let o = 0, a = e.length; o < a; ++o) {
    const h = e[o];
    r = gc(
      i,
      t,
      h,
      n,
      s,
      2 * o,
      r
    ), t = h[h.length - 1];
  }
  return r;
}
function _c(i, t, e, n, s) {
  let r;
  for (t += n; t < e; t += n)
    if (r = s(
      i.slice(t - n, t),
      i.slice(t, t + n)
    ), r)
      return r;
  return !1;
}
function $r(i, t, e, n, s) {
  const r = ql(
    Wt(),
    i,
    t,
    e,
    n
  );
  return At(s, r) ? ci(s, r) || r[0] >= s[0] && r[2] <= s[2] || r[1] >= s[1] && r[3] <= s[3] ? !0 : _c(
    i,
    t,
    e,
    n,
    function(o, a) {
      return Ed(s, o, a);
    }
  ) : !1;
}
function Jf(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r) {
    if ($r(i, t, e[r], n, s))
      return !0;
    t = e[r];
  }
  return !1;
}
function mc(i, t, e, n, s) {
  return !!($r(i, t, e, n, s) || di(
    i,
    t,
    e,
    n,
    s[0],
    s[1]
  ) || di(
    i,
    t,
    e,
    n,
    s[0],
    s[3]
  ) || di(
    i,
    t,
    e,
    n,
    s[2],
    s[1]
  ) || di(
    i,
    t,
    e,
    n,
    s[2],
    s[3]
  ));
}
function yc(i, t, e, n, s) {
  if (!mc(i, t, e[0], n, s))
    return !1;
  if (e.length === 1)
    return !0;
  for (let r = 1, o = e.length; r < o; ++r)
    if (Kf(
      i,
      e[r - 1],
      e[r],
      n,
      s
    ) && !$r(
      i,
      e[r - 1],
      e[r],
      n,
      s
    ))
      return !1;
  return !0;
}
function Qf(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    if (yc(i, t, a, n, s))
      return !0;
    t = a[a.length - 1];
  }
  return !1;
}
function tg(i, t, e, n) {
  for (; t < e - n; ) {
    for (let s = 0; s < n; ++s) {
      const r = i[t + s];
      i[t + s] = i[e - n + s], i[e - n + s] = r;
    }
    t += n, e -= n;
  }
}
function pc(i, t, e, n) {
  let s = 0, r = i[e - n], o = i[e - n + 1];
  for (; t < e; t += n) {
    const a = i[t], h = i[t + 1];
    s += (a - r) * (h + o), r = a, o = h;
  }
  return s === 0 ? void 0 : s > 0;
}
function xc(i, t, e, n, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r], h = pc(
      i,
      t,
      a,
      n
    );
    if (r === 0) {
      if (s && h || !s && !h)
        return !1;
    } else if (s && !h || !s && h)
      return !1;
    t = a;
  }
  return !0;
}
function eg(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    if (!xc(i, t, a, n, s))
      return !1;
    a.length && (t = a[a.length - 1]);
  }
  return !0;
}
function Fo(i, t, e, n, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r], h = pc(
      i,
      t,
      a,
      n
    );
    (r === 0 ? s && h || !s && !h : s && !h || !s && h) && tg(i, t, a, n), t = a;
  }
  return t;
}
function Nh(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r)
    t = Fo(
      i,
      t,
      e[r],
      n,
      s
    );
  return t;
}
class Ci extends ni {
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
    this.flatCoordinates ? ae(this.flatCoordinates, t.getFlatCoordinates()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed();
  }
  clone() {
    const t = new Ci(
      this.flatCoordinates.slice(),
      this.layout,
      this.ends_.slice()
    );
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, n, s) {
    return s < Ai(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      va(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), Ca(
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
    return wa(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      t,
      e
    );
  }
  getArea() {
    return fc(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride
    );
  }
  getCoordinates(t) {
    let e;
    return t !== void 0 ? (e = this.getOrientedFlatCoordinates().slice(), Fo(e, 0, this.ends_, this.stride, t)) : e = this.flatCoordinates, es(e, 0, this.ends_, this.stride);
  }
  getEnds() {
    return this.ends_;
  }
  getFlatInteriorPoint() {
    if (this.flatInteriorPointRevision_ != this.getRevision()) {
      const t = Mi(this.getExtent());
      this.flatInteriorPoint_ = gc(
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
    return new le(this.getFlatInteriorPoint(), "XYM");
  }
  getLinearRingCount() {
    return this.ends_.length;
  }
  getLinearRing(t) {
    return t < 0 || this.ends_.length <= t ? null : new Dh(
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
      const h = n[o], l = new Dh(
        e.slice(r, h),
        t
      );
      s.push(l), r = h;
    }
    return s;
  }
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const t = this.flatCoordinates;
      xc(t, 0, this.ends_, this.stride) ? this.orientedFlatCoordinates_ = t : (this.orientedFlatCoordinates_ = t.slice(), this.orientedFlatCoordinates_.length = Fo(
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
    return e.length = uc(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      Math.sqrt(t),
      e,
      0,
      n
    ), new Ci(e, "XY", n);
  }
  getType() {
    return "Polygon";
  }
  intersectsExtent(t) {
    return yc(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      t
    );
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 2), this.flatCoordinates || (this.flatCoordinates = []);
    const n = Ea(
      this.flatCoordinates,
      0,
      t,
      this.stride,
      this.ends_
    );
    this.flatCoordinates.length = n.length === 0 ? 0 : n[n.length - 1], this.changed();
  }
}
const pn = Ci;
function ig(i, t, e, n) {
  e = e || 32;
  const s = [];
  for (let r = 0; r < e; ++r)
    ae(
      s,
      Cf(i, t, 2 * Math.PI * r / e, n)
    );
  return s.push(s[0], s[1]), new Ci(s, "XY", [s.length]);
}
function kh(i) {
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
  return new Ci(r, "XY", [r.length]);
}
function ng(i, t, e) {
  t = t || 32;
  const n = i.getStride(), s = i.getLayout(), r = i.getCenter(), o = n * (t + 1), a = new Array(o);
  for (let c = 0; c < o; c += n) {
    a[c] = 0, a[c + 1] = 0;
    for (let u = 2; u < n; u++)
      a[c + u] = r[u];
  }
  const h = [a.length], l = new Ci(a, s, h);
  return sg(l, r, i.getRadius(), e), l;
}
function sg(i, t, e, n) {
  const s = i.getFlatCoordinates(), r = i.getStride(), o = s.length / r - 1, a = n || 0;
  for (let h = 0; h <= o; ++h) {
    const l = h * r, c = a + _i(h, o) * 2 * Math.PI / o;
    s[l] = t[0] + e * Math.cos(c), s[l + 1] = t[1] + e * Math.sin(c);
  }
  i.changed();
}
const eo = 0;
class rg extends ie {
  constructor(t) {
    super(), this.on, this.once, this.un, t = Object.assign({}, t), this.hints_ = [0, 0], this.animations_ = [], this.updateAnimationKey_, this.projection_ = fa(t.projection, "EPSG:3857"), this.viewportSize_ = [100, 100], this.targetCenter_ = null, this.targetResolution_, this.targetRotation_, this.nextCenter_ = null, this.nextResolution_, this.nextRotation_, this.cancelAnchor_ = void 0, t.projection && Ef(), t.center && (t.center = rt(t.center, this.projection_)), t.extent && (t.extent = Ue(t.extent, this.projection_)), this.applyOptions_(t);
  }
  applyOptions_(t) {
    const e = Object.assign({}, t);
    for (const a in Zt)
      delete e[a];
    this.setProperties(e, !0);
    const n = ag(t);
    this.maxResolution_ = n.maxResolution, this.minResolution_ = n.minResolution, this.zoomFactor_ = n.zoomFactor, this.resolutions_ = t.resolutions, this.padding_ = t.padding, this.minZoom_ = n.minZoom;
    const s = og(t), r = n.constraint, o = hg(t);
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
      s.center && (s = Object.assign({}, s), s.center = rt(
        s.center,
        this.getProjection()
      )), s.anchor && (s = Object.assign({}, s), s.anchor = rt(
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
      n && Fs(n, !0);
      return;
    }
    let r = Date.now(), o = this.targetCenter_.slice(), a = this.targetResolution_, h = this.targetRotation_;
    const l = [];
    for (; s < e; ++s) {
      const c = arguments[s], u = {
        start: r,
        complete: !1,
        anchor: c.anchor,
        duration: c.duration !== void 0 ? c.duration : 1e3,
        easing: c.easing || Df,
        callback: n
      };
      if (c.center && (u.sourceCenter = o, u.targetCenter = c.center.slice(), o = u.targetCenter), c.zoom !== void 0 ? (u.sourceResolution = a, u.targetResolution = this.getResolutionForZoom(c.zoom), a = u.targetResolution) : c.resolution && (u.sourceResolution = a, u.targetResolution = c.resolution, a = u.targetResolution), c.rotation !== void 0) {
        u.sourceRotation = h;
        const d = _i(c.rotation - h + Math.PI, 2 * Math.PI) - Math.PI;
        u.targetRotation = h + d, h = u.targetRotation;
      }
      lg(u) ? u.complete = !0 : r += u.duration, l.push(u);
    }
    this.animations_.push(l), this.setHint(St.ANIMATING, 1), this.updateAnimations_();
  }
  getAnimating() {
    return this.hints_[St.ANIMATING] > 0;
  }
  getInteracting() {
    return this.hints_[St.INTERACTING] > 0;
  }
  cancelAnimations() {
    this.setHint(St.ANIMATING, -this.hints_[St.ANIMATING]);
    let t;
    for (let e = 0, n = this.animations_.length; e < n; ++e) {
      const s = this.animations_[e];
      if (s[0].callback && Fs(s[0].callback, !1), !t)
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
        const h = s[o];
        if (h.complete)
          continue;
        const l = t - h.start;
        let c = h.duration > 0 ? l / h.duration : 1;
        c >= 1 ? (h.complete = !0, c = 1) : r = !1;
        const u = h.easing(c);
        if (h.sourceCenter) {
          const d = h.sourceCenter[0], f = h.sourceCenter[1], g = h.targetCenter[0], _ = h.targetCenter[1];
          this.nextCenter_ = h.targetCenter;
          const m = d + u * (g - d), y = f + u * (_ - f);
          this.targetCenter_ = [m, y];
        }
        if (h.sourceResolution && h.targetResolution) {
          const d = u === 1 ? h.targetResolution : h.sourceResolution + u * (h.targetResolution - h.sourceResolution);
          if (h.anchor) {
            const f = this.getViewportSize_(this.getRotation()), g = this.constraints_.resolution(
              d,
              0,
              f,
              !0
            );
            this.targetCenter_ = this.calculateCenterZoom(
              g,
              h.anchor
            );
          }
          this.nextResolution_ = h.targetResolution, this.targetResolution_ = d, this.applyTargetState_(!0);
        }
        if (h.sourceRotation !== void 0 && h.targetRotation !== void 0) {
          const d = u === 1 ? _i(h.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : h.sourceRotation + u * (h.targetRotation - h.sourceRotation);
          if (h.anchor) {
            const f = this.constraints_.rotation(
              d,
              !0
            );
            this.targetCenter_ = this.calculateCenterRotate(
              f,
              h.anchor
            );
          }
          this.nextRotation_ = h.targetRotation, this.targetRotation_ = d;
        }
        if (this.applyTargetState_(!0), e = !0, !h.complete)
          break;
      }
      if (r) {
        this.animations_[n] = null, this.setHint(St.ANIMATING, -1), this.nextCenter_ = null, this.nextResolution_ = NaN, this.nextRotation_ = NaN;
        const o = s[0].callback;
        o && Fs(o, !0);
      }
    }
    this.animations_ = this.animations_.filter(Boolean), e && this.updateAnimationKey_ === void 0 && (this.updateAnimationKey_ = requestAnimationFrame(
      this.updateAnimations_.bind(this)
    ));
  }
  calculateCenterRotate(t, e) {
    let n;
    const s = this.getCenterInternal();
    return s !== void 0 && (n = [s[0] - e[0], s[1] - e[1]], ha(n, t - this.getRotation()), Nd(n, e)), n;
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
    return t && yn(t, this.getProjection());
  }
  getCenterInternal() {
    return this.get(Zt.CENTER);
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
    return ga(e, this.getProjection());
  }
  calculateExtentInternal(t) {
    t = t || this.getViewportSizeMinusPadding_();
    const e = this.getCenterInternal();
    Y(e, 1);
    const n = this.getResolution();
    Y(n !== void 0, 2);
    const s = this.getRotation();
    return Y(s !== void 0, 3), To(e, n, s, t);
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
    return this.get(Zt.RESOLUTION);
  }
  getResolutions() {
    return this.resolutions_;
  }
  getResolutionForExtent(t, e) {
    return this.getResolutionForExtentInternal(
      Ue(t, this.getProjection()),
      e
    );
  }
  getResolutionForExtentInternal(t, e) {
    e = e || this.getViewportSizeMinusPadding_();
    const n = ot(t) / e[0], s = ue(t) / e[1];
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
    return this.get(Zt.ROTATION);
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
      s = io(
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
      const r = Qo(this.resolutions_, t, 1);
      e = r, n = this.resolutions_[r], r == this.resolutions_.length - 1 ? s = 2 : s = n / this.resolutions_[r + 1];
    } else
      n = this.maxResolution_, s = this.zoomFactor_;
    return e + Math.log(n / t) / Math.log(s);
  }
  getResolutionForZoom(t) {
    if (this.resolutions_) {
      if (this.resolutions_.length <= 1)
        return 0;
      const e = dt(
        Math.floor(t),
        0,
        this.resolutions_.length - 2
      ), n = this.resolutions_[e] / this.resolutions_[e + 1];
      return this.resolutions_[e] / Math.pow(n, dt(t - e, 0, 1));
    } else
      return this.maxResolution_ / Math.pow(this.zoomFactor_, t - this.minZoom_);
  }
  fit(t, e) {
    let n;
    if (Y(
      Array.isArray(t) || typeof t.getSimplifiedGeometry == "function",
      24
    ), Array.isArray(t)) {
      Y(!sa(t), 25);
      const s = Ue(t, this.getProjection());
      n = kh(s);
    } else if (t.getType() === "Circle") {
      const s = Ue(
        t.getExtent(),
        this.getProjection()
      );
      n = kh(s), n.rotate(this.getRotation(), Mi(s));
    } else
      n = t;
    this.fitInternal(n, e);
  }
  rotatedExtentForGeometry(t) {
    const e = this.getRotation(), n = Math.cos(e), s = Math.sin(-e), r = t.getFlatCoordinates(), o = t.getStride();
    let a = 1 / 0, h = 1 / 0, l = -1 / 0, c = -1 / 0;
    for (let u = 0, d = r.length; u < d; u += o) {
      const f = r[u] * n - r[u + 1] * s, g = r[u] * s + r[u + 1] * n;
      a = Math.min(a, f), h = Math.min(h, g), l = Math.max(l, f), c = Math.max(c, g);
    }
    return [a, h, l, c];
  }
  fitInternal(t, e) {
    e = e || {};
    let n = e.size;
    n || (n = this.getViewportSizeMinusPadding_());
    const s = e.padding !== void 0 ? e.padding : [0, 0, 0, 0], r = e.nearest !== void 0 ? e.nearest : !1;
    let o;
    e.minResolution !== void 0 ? o = e.minResolution : e.maxZoom !== void 0 ? o = this.getResolutionForZoom(e.maxZoom) : o = 0;
    const a = this.rotatedExtentForGeometry(t);
    let h = this.getResolutionForExtentInternal(a, [
      n[0] - s[1] - s[3],
      n[1] - s[0] - s[2]
    ]);
    h = isNaN(h) ? o : Math.max(h, o), h = this.getConstrainedResolution(h, r ? 0 : 1);
    const l = this.getRotation(), c = Math.sin(l), u = Math.cos(l), d = Mi(a);
    d[0] += (s[1] - s[3]) / 2 * h, d[1] += (s[0] - s[2]) / 2 * h;
    const f = d[0] * u - d[1] * c, g = d[1] * u + d[0] * c, _ = this.getConstrainedCenter([f, g], h), m = e.callback ? e.callback : vi;
    e.duration !== void 0 ? this.animateInternal(
      {
        resolution: h,
        center: _,
        duration: e.duration,
        easing: e.easing
      },
      m
    ) : (this.targetResolution_ = h, this.targetCenter_ = _, this.applyTargetState_(!1, !0), Fs(m, !0));
  }
  centerOn(t, e, n) {
    this.centerOnInternal(
      rt(t, this.getProjection()),
      e,
      n
    );
  }
  centerOnInternal(t, e, n) {
    this.setCenterInternal(
      io(
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
      const a = this.getViewportSizeMinusPadding_(-n), h = io(
        t,
        s,
        [a[0] / 2 + o[3], a[1] / 2 + o[0]],
        e,
        n
      );
      r = [
        t[0] - h[0],
        t[1] - h[1]
      ];
    }
    return r;
  }
  isDef() {
    return !!this.getCenterInternal() && this.getResolution() !== void 0;
  }
  adjustCenter(t) {
    const e = yn(this.targetCenter_, this.getProjection());
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
    e = e && rt(e, this.getProjection()), this.adjustResolutionInternal(t, e);
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
    e && (e = rt(e, this.getProjection())), this.adjustRotationInternal(t, e);
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
      t && rt(t, this.getProjection())
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
    this.get(Zt.ROTATION) !== s && this.set(Zt.ROTATION, s), this.get(Zt.RESOLUTION) !== o && (this.set(Zt.RESOLUTION, o), this.set("zoom", this.getZoom(), !0)), (!a || !this.get(Zt.CENTER) || !Jt(this.get(Zt.CENTER), a)) && this.set(Zt.CENTER, a), this.getAnimating() && !t && this.cancelAnimations(), this.cancelAnchor_ = void 0;
  }
  resolveConstraints(t, e, n) {
    t = t !== void 0 ? t : 200;
    const s = e || 0, r = this.constraints_.rotation(this.targetRotation_), o = this.getViewportSize_(r), a = this.constraints_.resolution(
      this.targetResolution_,
      s,
      o
    ), h = this.constraints_.center(
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
      this.targetResolution_ = a, this.targetRotation_ = r, this.targetCenter_ = h, this.applyTargetState_();
      return;
    }
    n = n || (t === 0 ? this.cancelAnchor_ : void 0), this.cancelAnchor_ = void 0, (this.getResolution() !== a || this.getRotation() !== r || !this.getCenterInternal() || !Jt(this.getCenterInternal(), h)) && (this.getAnimating() && this.cancelAnimations(), this.animateInternal({
      rotation: r,
      center: h,
      resolution: a,
      duration: t,
      easing: Cn,
      anchor: n
    }));
  }
  beginInteraction() {
    this.resolveConstraints(0), this.setHint(St.INTERACTING, 1);
  }
  endInteraction(t, e, n) {
    n = n && rt(n, this.getProjection()), this.endInteractionInternal(t, e, n);
  }
  endInteractionInternal(t, e, n) {
    this.setHint(St.INTERACTING, -1), this.resolveConstraints(t, e, n);
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
function Fs(i, t) {
  setTimeout(function() {
    i(t);
  }, 0);
}
function og(i) {
  if (i.extent !== void 0) {
    const e = i.smoothExtentConstraint !== void 0 ? i.smoothExtentConstraint : !0;
    return Ah(i.extent, i.constrainOnlyCenter, e);
  }
  const t = fa(i.projection, "EPSG:3857");
  if (i.multiWorld !== !0 && t.isGlobal()) {
    const e = t.getExtent().slice();
    return e[0] = -1 / 0, e[2] = 1 / 0, Ah(e, !1, !1);
  }
  return Af;
}
function ag(i) {
  let t, e, n, o = i.minZoom !== void 0 ? i.minZoom : eo, a = i.maxZoom !== void 0 ? i.maxZoom : 28;
  const h = i.zoomFactor !== void 0 ? i.zoomFactor : 2, l = i.multiWorld !== void 0 ? i.multiWorld : !1, c = i.smoothResolutionConstraint !== void 0 ? i.smoothResolutionConstraint : !0, u = i.showFullExtent !== void 0 ? i.showFullExtent : !1, d = fa(i.projection, "EPSG:3857"), f = d.getExtent();
  let g = i.constrainOnlyCenter, _ = i.extent;
  if (!l && !_ && d.isGlobal() && (g = !1, _ = f), i.resolutions !== void 0) {
    const m = i.resolutions;
    e = m[o], n = m[a] !== void 0 ? m[a] : m[m.length - 1], i.constrainResolution ? t = Pf(
      m,
      c,
      !g && _,
      u
    ) : t = Ph(
      e,
      n,
      c,
      !g && _,
      u
    );
  } else {
    const y = (f ? Math.max(ot(f), ue(f)) : 360 * mn.degrees / d.getMetersPerUnit()) / ca / Math.pow(2, eo), p = y / Math.pow(2, 28 - eo);
    e = i.maxResolution, e !== void 0 ? o = 0 : e = y / Math.pow(h, o), n = i.minResolution, n === void 0 && (i.maxZoom !== void 0 ? i.maxResolution !== void 0 ? n = e / Math.pow(h, a) : n = y / Math.pow(h, a) : n = p), a = o + Math.floor(
      Math.log(e / n) / Math.log(h)
    ), n = e / Math.pow(h, a - o), i.constrainResolution ? t = Lf(
      h,
      e,
      n,
      c,
      !g && _,
      u
    ) : t = Ph(
      e,
      n,
      c,
      !g && _,
      u
    );
  }
  return {
    constraint: t,
    maxResolution: e,
    minResolution: n,
    minZoom: o,
    zoomFactor: h
  };
}
function hg(i) {
  if (i.enableRotation !== void 0 ? i.enableRotation : !0) {
    const e = i.constrainRotation;
    return e === void 0 || e === !0 ? Ff() : e === !1 ? Lh : typeof e == "number" ? Of(e) : Lh;
  } else
    return ya;
}
function lg(i) {
  return !(i.sourceCenter && i.targetCenter && !Jt(i.sourceCenter, i.targetCenter) || i.sourceResolution !== i.targetResolution || i.sourceRotation !== i.targetRotation);
}
function io(i, t, e, n, s) {
  const r = Math.cos(-s);
  let o = Math.sin(-s), a = i[0] * r - i[1] * o, h = i[1] * r + i[0] * o;
  a += (t[0] / 2 - e[0]) * n, h += (e[1] - t[1] / 2) * n, o = -o;
  const l = a * r - h * o, c = h * r + a * o;
  return [l, c];
}
const je = rg;
class cg extends ie {
  constructor(t) {
    super();
    const e = t.element;
    e && !t.target && !e.style.pointerEvents && (e.style.pointerEvents = "auto"), this.element = e || null, this.target_ = null, this.map_ = null, this.listenerKeys = [], t.render && (this.render = t.render), t.target && this.setTarget(t.target);
  }
  disposeInternal() {
    Ro(this.element), super.disposeInternal();
  }
  getMap() {
    return this.map_;
  }
  setMap(t) {
    this.map_ && Ro(this.element);
    for (let e = 0, n = this.listenerKeys.length; e < n; ++e)
      et(this.listenerKeys[e]);
    this.listenerKeys.length = 0, this.map_ = t, t && ((this.target_ ? this.target_ : t.getOverlayContainerStopEvent()).appendChild(this.element), this.render !== vi && this.listenerKeys.push(
      U(t, ze.POSTRENDER, this.render, this)
    ), t.render());
  }
  render(t) {
  }
  setTarget(t) {
    this.target_ = typeof t == "string" ? document.getElementById(t) : t;
  }
}
const Ae = cg;
class ug extends Ae {
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
    const h = this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_;
    this.toggleButton_ = document.createElement("button"), this.toggleButton_.setAttribute("type", "button"), this.toggleButton_.setAttribute("aria-expanded", String(!this.collapsed_)), this.toggleButton_.title = n, this.toggleButton_.appendChild(h), this.toggleButton_.addEventListener(
      z.CLICK,
      this.handleClick_.bind(this),
      !1
    );
    const l = e + " " + Mn + " " + Dr + (this.collapsed_ && this.collapsible_ ? " " + Ch : "") + (this.collapsible_ ? "" : " ol-uncollapsible"), c = this.element;
    c.className = l, c.appendChild(this.toggleButton_), c.appendChild(this.ulElement_), this.renderedAttributions_ = [], this.renderedVisible_ = !0;
  }
  collectSourceAttributions_(t) {
    const e = {}, n = [];
    let s = !0;
    const r = t.layerStatesArray;
    for (let o = 0, a = r.length; o < a; ++o) {
      const h = r[o];
      if (!oa(h, t.viewState))
        continue;
      const l = h.layer.getSource();
      if (!l)
        continue;
      const c = l.getAttributions();
      if (!c)
        continue;
      const u = c(t);
      if (!!u)
        if (s = s && l.getAttributionsCollapsible() !== !1, Array.isArray(u))
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
    if (this.renderedVisible_ != n && (this.element.style.display = n ? "" : "none", this.renderedVisible_ = n), !ii(e, this.renderedAttributions_)) {
      Yd(this.ulElement_);
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
    this.element.classList.toggle(Ch), this.collapsed_ ? or(this.collapseLabel_, this.label_) : or(this.label_, this.collapseLabel_), this.collapsed_ = !this.collapsed_, this.toggleButton_.setAttribute("aria-expanded", String(!this.collapsed_));
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
const dg = ug;
class fg extends Ae {
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
      z.CLICK,
      this.handleClick_.bind(this),
      !1
    );
    const a = e + " " + Mn + " " + Dr, h = this.element;
    h.className = a, h.appendChild(o), this.callResetNorth_ = t.resetNorth ? t.resetNorth : void 0, this.duration_ = t.duration !== void 0 ? t.duration : 250, this.autoHide_ = t.autoHide !== void 0 ? t.autoHide : !0, this.rotation_ = void 0, this.autoHide_ && this.element.classList.add(Ls);
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
      easing: Cn
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
        const r = this.element.classList.contains(Ls);
        !r && n === 0 ? this.element.classList.add(Ls) : r && n !== 0 && this.element.classList.remove(Ls);
      }
      this.label_.style.transform = s;
    }
    this.rotation_ = n;
  }
}
const gg = fg;
class _g extends Ae {
  constructor(t) {
    t = t || {}, super({
      element: document.createElement("div"),
      target: t.target
    });
    const e = t.className !== void 0 ? t.className : "ol-zoom", n = t.delta !== void 0 ? t.delta : 1, s = t.zoomInClassName !== void 0 ? t.zoomInClassName : e + "-in", r = t.zoomOutClassName !== void 0 ? t.zoomOutClassName : e + "-out", o = t.zoomInLabel !== void 0 ? t.zoomInLabel : "+", a = t.zoomOutLabel !== void 0 ? t.zoomOutLabel : "\u2013", h = t.zoomInTipLabel !== void 0 ? t.zoomInTipLabel : "Zoom in", l = t.zoomOutTipLabel !== void 0 ? t.zoomOutTipLabel : "Zoom out", c = document.createElement("button");
    c.className = s, c.setAttribute("type", "button"), c.title = h, c.appendChild(
      typeof o == "string" ? document.createTextNode(o) : o
    ), c.addEventListener(
      z.CLICK,
      this.handleClick_.bind(this, n),
      !1
    );
    const u = document.createElement("button");
    u.className = r, u.setAttribute("type", "button"), u.title = l, u.appendChild(
      typeof a == "string" ? document.createTextNode(a) : a
    ), u.addEventListener(
      z.CLICK,
      this.handleClick_.bind(this, -n),
      !1
    );
    const d = e + " " + Mn + " " + Dr, f = this.element;
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
        easing: Cn
      })) : n.setZoom(r);
    }
  }
}
const vc = _g;
function mg(i) {
  i = i || {};
  const t = new qt();
  return (i.zoom !== void 0 ? i.zoom : !0) && t.push(new vc(i.zoomOptions)), (i.rotate !== void 0 ? i.rotate : !0) && t.push(new gg(i.rotateOptions)), (i.attribution !== void 0 ? i.attribution : !0) && t.push(new dg(i.attributionOptions)), t;
}
const Do = {
  ACTIVE: "active"
};
class yg extends ie {
  constructor(t) {
    super(), this.on, this.once, this.un, t && t.handleEvent && (this.handleEvent = t.handleEvent), this.map_ = null, this.setActive(!0);
  }
  getActive() {
    return this.get(Do.ACTIVE);
  }
  getMap() {
    return this.map_;
  }
  handleEvent(t) {
    return !0;
  }
  setActive(t) {
    this.set(Do.ACTIVE, t);
  }
  setMap(t) {
    this.map_ = t;
  }
}
function pg(i, t, e) {
  const n = i.getCenterInternal();
  if (n) {
    const s = [n[0] + t[0], n[1] + t[1]];
    i.animateInternal({
      duration: e !== void 0 ? e : 250,
      easing: Nf,
      center: i.getConstrainedCenter(s)
    });
  }
}
function Ra(i, t, e, n) {
  const s = i.getZoom();
  if (s === void 0)
    return;
  const r = i.getConstrainedZoom(s + t), o = i.getResolutionForZoom(r);
  i.getAnimating() && i.cancelAnimations(), i.animate({
    resolution: o,
    anchor: e,
    duration: n !== void 0 ? n : 250,
    easing: Cn
  });
}
const ds = yg;
class xg extends ds {
  constructor(t) {
    super(), t = t || {}, this.delta_ = t.delta ? t.delta : 1, this.duration_ = t.duration !== void 0 ? t.duration : 250;
  }
  handleEvent(t) {
    let e = !1;
    if (t.type == V.DBLCLICK) {
      const n = t.originalEvent, s = t.map, r = t.coordinate, o = n.shiftKey ? -this.delta_ : this.delta_, a = s.getView();
      Ra(a, o, r, this.duration_), n.preventDefault(), e = !0;
    }
    return !e;
  }
}
const vg = xg;
class Mg extends ds {
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
      if (t.type == V.POINTERDRAG)
        this.handleDragEvent(t), t.originalEvent.preventDefault();
      else if (t.type == V.POINTERUP) {
        const n = this.handleUpEvent(t);
        this.handlingDownUpSequence = n && this.targetPointers.length > 0;
      }
    } else if (t.type == V.POINTERDOWN) {
      const n = this.handleDownEvent(t);
      this.handlingDownUpSequence = n, e = this.stopDown(n);
    } else
      t.type == V.POINTERMOVE && this.handleMoveEvent(t);
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
function ba(i) {
  const t = i.length;
  let e = 0, n = 0;
  for (let s = 0; s < t; s++)
    e += i[s].clientX, n += i[s].clientY;
  return [e / t, n / t];
}
const si = Mg;
function No(i) {
  const t = arguments;
  return function(e) {
    let n = !0;
    for (let s = 0, r = t.length; s < r && (n = n && t[s](e), !!n); ++s)
      ;
    return n;
  };
}
const Cg = function(i) {
  const t = i.originalEvent;
  return t.altKey && !(t.metaKey || t.ctrlKey) && !t.shiftKey;
}, Eg = function(i) {
  const t = i.originalEvent;
  return t.altKey && !(t.metaKey || t.ctrlKey) && t.shiftKey;
}, Sg = function(i) {
  const t = i.map.getTargetElement(), e = i.map.getOwnerDocument().activeElement;
  return t.contains(e);
}, Mc = function(i) {
  return i.map.getTargetElement().hasAttribute("tabindex") ? Sg(i) : !0;
}, _r = xi, Cc = function(i) {
  const t = i.originalEvent;
  return t.button == 0 && !(dd && fd && t.ctrlKey);
}, Tg = Ii, wg = function(i) {
  return i.type == V.SINGLECLICK;
}, Ia = function(i) {
  const t = i.originalEvent;
  return !t.altKey && !(t.metaKey || t.ctrlKey) && !t.shiftKey;
}, Ec = function(i) {
  const t = i.originalEvent;
  return !t.altKey && !(t.metaKey || t.ctrlKey) && t.shiftKey;
}, Sc = function(i) {
  const t = i.originalEvent, e = t.target.tagName;
  return e !== "INPUT" && e !== "SELECT" && e !== "TEXTAREA" && !t.target.isContentEditable;
}, no = function(i) {
  const t = i.originalEvent;
  return Y(t !== void 0, 56), t.pointerType == "mouse";
}, Tc = function(i) {
  const t = i.originalEvent;
  return Y(t !== void 0, 56), t.isPrimary && t.button === 0;
};
class Rg extends si {
  constructor(t) {
    super({
      stopDown: Ii
    }), t = t || {}, this.kinetic_ = t.kinetic, this.lastCentroid = null, this.lastPointersCount_, this.panning_ = !1;
    const e = t.condition ? t.condition : No(Ia, Tc);
    this.condition_ = t.onFocusOnly ? No(Mc, e) : e, this.noKinetic_ = !1;
  }
  handleDragEvent(t) {
    this.panning_ || (this.panning_ = !0, this.getMap().getView().beginInteraction());
    const e = this.targetPointers, n = ba(e);
    if (e.length == this.lastPointersCount_) {
      if (this.kinetic_ && this.kinetic_.update(n[0], n[1]), this.lastCentroid) {
        const s = [
          this.lastCentroid[0] - n[0],
          n[1] - this.lastCentroid[1]
        ], o = t.map.getView();
        Gd(s, o.getResolution()), ha(s, o.getRotation()), o.adjustCenterInternal(s);
      }
    } else
      this.kinetic_ && this.kinetic_.begin();
    this.lastCentroid = n, this.lastPointersCount_ = e.length, t.originalEvent.preventDefault();
  }
  handleUpEvent(t) {
    const e = t.map, n = e.getView();
    if (this.targetPointers.length === 0) {
      if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
        const s = this.kinetic_.getDistance(), r = this.kinetic_.getAngle(), o = n.getCenterInternal(), a = e.getPixelFromCoordinateInternal(o), h = e.getCoordinateFromPixelInternal([
          a[0] - s * Math.cos(r),
          a[1] - s * Math.sin(r)
        ]);
        n.animateInternal({
          center: n.getConstrainedCenter(h),
          duration: 500,
          easing: Cn
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
const bg = Rg;
class Ig extends si {
  constructor(t) {
    t = t || {}, super({
      stopDown: Ii
    }), this.condition_ = t.condition ? t.condition : Eg, this.lastAngle_ = void 0, this.duration_ = t.duration !== void 0 ? t.duration : 250;
  }
  handleDragEvent(t) {
    if (!no(t))
      return;
    const e = t.map, n = e.getView();
    if (n.getConstraints().rotation === ya)
      return;
    const s = e.getSize(), r = t.pixel, o = Math.atan2(s[1] / 2 - r[1], r[0] - s[0] / 2);
    if (this.lastAngle_ !== void 0) {
      const a = o - this.lastAngle_;
      n.adjustRotationInternal(-a);
    }
    this.lastAngle_ = o;
  }
  handleUpEvent(t) {
    return no(t) ? (t.map.getView().endInteraction(this.duration_), !1) : !0;
  }
  handleDownEvent(t) {
    return no(t) && Cc(t) && this.condition_(t) ? (t.map.getView().beginInteraction(), this.lastAngle_ = void 0, !0) : !1;
  }
}
const Ag = Ig;
class Pg extends Jo {
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
    s[4] = s[0].slice(), this.geometry_ ? this.geometry_.setCoordinates([s]) : this.geometry_ = new pn([s]);
  }
  getGeometry() {
    return this.geometry_;
  }
}
const Lg = Pg, Ds = {
  BOXSTART: "boxstart",
  BOXDRAG: "boxdrag",
  BOXEND: "boxend",
  BOXCANCEL: "boxcancel"
};
class so extends Kt {
  constructor(t, e, n) {
    super(t), this.coordinate = e, this.mapBrowserEvent = n;
  }
}
class Og extends si {
  constructor(t) {
    super(), this.on, this.once, this.un, t = t || {}, this.box_ = new Lg(t.className || "ol-dragbox"), this.minArea_ = t.minArea !== void 0 ? t.minArea : 64, t.onBoxEnd && (this.onBoxEnd = t.onBoxEnd), this.startPixel_ = null, this.condition_ = t.condition ? t.condition : Cc, this.boxEndCondition_ = t.boxEndCondition ? t.boxEndCondition : this.defaultBoxEndCondition;
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
      new so(
        Ds.BOXDRAG,
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
      new so(
        e ? Ds.BOXEND : Ds.BOXCANCEL,
        t.coordinate,
        t
      )
    ), !1;
  }
  handleDownEvent(t) {
    return this.condition_(t) ? (this.startPixel_ = t.pixel, this.box_.setMap(t.map), this.box_.setPixels(this.startPixel_, this.startPixel_), this.dispatchEvent(
      new so(
        Ds.BOXSTART,
        t.coordinate,
        t
      )
    ), !0) : !1;
  }
  onBoxEnd(t) {
  }
}
const Fg = Og;
class Dg extends Fg {
  constructor(t) {
    t = t || {};
    const e = t.condition ? t.condition : Ec;
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
      easing: Cn
    });
  }
}
const Ng = Dg, hi = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};
class kg extends ds {
  constructor(t) {
    super(), t = t || {}, this.defaultCondition_ = function(e) {
      return Ia(e) && Sc(e);
    }, this.condition_ = t.condition !== void 0 ? t.condition : this.defaultCondition_, this.duration_ = t.duration !== void 0 ? t.duration : 100, this.pixelDelta_ = t.pixelDelta !== void 0 ? t.pixelDelta : 128;
  }
  handleEvent(t) {
    let e = !1;
    if (t.type == z.KEYDOWN) {
      const n = t.originalEvent, s = n.keyCode;
      if (this.condition_(t) && (s == hi.DOWN || s == hi.LEFT || s == hi.RIGHT || s == hi.UP)) {
        const o = t.map.getView(), a = o.getResolution() * this.pixelDelta_;
        let h = 0, l = 0;
        s == hi.DOWN ? l = -a : s == hi.LEFT ? h = -a : s == hi.RIGHT ? h = a : l = a;
        const c = [h, l];
        ha(c, o.getRotation()), pg(o, c, this.duration_), n.preventDefault(), e = !0;
      }
    }
    return !e;
  }
}
const Gg = kg;
class $g extends ds {
  constructor(t) {
    super(), t = t || {}, this.condition_ = t.condition ? t.condition : Sc, this.delta_ = t.delta ? t.delta : 1, this.duration_ = t.duration !== void 0 ? t.duration : 100;
  }
  handleEvent(t) {
    let e = !1;
    if (t.type == z.KEYDOWN || t.type == z.KEYPRESS) {
      const n = t.originalEvent, s = n.charCode;
      if (this.condition_(t) && (s == "+".charCodeAt(0) || s == "-".charCodeAt(0))) {
        const r = t.map, o = s == "+".charCodeAt(0) ? this.delta_ : -this.delta_, a = r.getView();
        Ra(a, o, void 0, this.duration_), n.preventDefault(), e = !0;
      }
    }
    return !e;
  }
}
const zg = $g;
class Bg {
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
const Wg = Bg;
class jg extends ds {
  constructor(t) {
    t = t || {}, super(
      t
    ), this.totalDelta_ = 0, this.lastDelta_ = 0, this.maxDelta_ = t.maxDelta !== void 0 ? t.maxDelta : 1, this.duration_ = t.duration !== void 0 ? t.duration : 250, this.timeout_ = t.timeout !== void 0 ? t.timeout : 80, this.useAnchor_ = t.useAnchor !== void 0 ? t.useAnchor : !0, this.constrainResolution_ = t.constrainResolution !== void 0 ? t.constrainResolution : !1;
    const e = t.condition ? t.condition : _r;
    this.condition_ = t.onFocusOnly ? No(Mc, e) : e, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_, this.mode_ = void 0, this.trackpadEventGap_ = 400, this.trackpadTimeoutId_, this.deltaPerZoom_ = 300;
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
    if (!this.condition_(t) || t.type !== z.WHEEL)
      return !0;
    const n = t.map, s = t.originalEvent;
    s.preventDefault(), this.useAnchor_ && (this.lastAnchor_ = t.coordinate);
    let r;
    if (t.type == z.WHEEL && (r = s.deltaY, cd && s.deltaMode === WheelEvent.DOM_DELTA_PIXEL && (r /= Wl), s.deltaMode === WheelEvent.DOM_DELTA_LINE && (r *= 40)), r === 0)
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
    const h = Math.max(this.timeout_ - (o - this.startTime_), 0);
    return clearTimeout(this.timeoutId_), this.timeoutId_ = setTimeout(
      this.handleWheelZoom_.bind(this, n),
      h
    ), !1;
  }
  handleWheelZoom_(t) {
    const e = t.getView();
    e.getAnimating() && e.cancelAnimations();
    let n = -dt(
      this.totalDelta_,
      -this.maxDelta_ * this.deltaPerZoom_,
      this.maxDelta_ * this.deltaPerZoom_
    ) / this.deltaPerZoom_;
    (e.getConstrainResolution() || this.constrainResolution_) && (n = n ? n > 0 ? 1 : -1 : 0), Ra(e, n, this.lastAnchor_, this.duration_), this.mode_ = void 0, this.totalDelta_ = 0, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_ = void 0;
  }
  setMouseAnchor(t) {
    this.useAnchor_ = t, t || (this.lastAnchor_ = null);
  }
}
const Ug = jg;
class Xg extends si {
  constructor(t) {
    t = t || {};
    const e = t;
    e.stopDown || (e.stopDown = Ii), super(e), this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.threshold_ = t.threshold !== void 0 ? t.threshold : 0.3, this.duration_ = t.duration !== void 0 ? t.duration : 250;
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
    if (a.getConstraints().rotation === ya)
      return;
    const h = o.getViewport().getBoundingClientRect(), l = ba(this.targetPointers);
    l[0] -= h.left, l[1] -= h.top, this.anchor_ = o.getCoordinateFromPixelInternal(l), this.rotating_ && (o.render(), a.adjustRotationInternal(e, this.anchor_));
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
const Yg = Xg;
class Vg extends si {
  constructor(t) {
    t = t || {};
    const e = t;
    e.stopDown || (e.stopDown = Ii), super(e), this.anchor_ = null, this.duration_ = t.duration !== void 0 ? t.duration : 400, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1;
  }
  handleDragEvent(t) {
    let e = 1;
    const n = this.targetPointers[0], s = this.targetPointers[1], r = n.clientX - s.clientX, o = n.clientY - s.clientY, a = Math.sqrt(r * r + o * o);
    this.lastDistance_ !== void 0 && (e = this.lastDistance_ / a), this.lastDistance_ = a;
    const h = t.map, l = h.getView();
    e != 1 && (this.lastScaleDelta_ = e);
    const c = h.getViewport().getBoundingClientRect(), u = ba(this.targetPointers);
    u[0] -= c.left, u[1] -= c.top, this.anchor_ = h.getCoordinateFromPixelInternal(u), h.render(), l.adjustResolutionInternal(e, this.anchor_);
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
const qg = Vg;
function Kg(i) {
  i = i || {};
  const t = new qt(), e = new Wg(-5e-3, 0.05, 100);
  return (i.altShiftDragRotate !== void 0 ? i.altShiftDragRotate : !0) && t.push(new Ag()), (i.doubleClickZoom !== void 0 ? i.doubleClickZoom : !0) && t.push(
    new vg({
      delta: i.zoomDelta,
      duration: i.zoomDuration
    })
  ), (i.dragPan !== void 0 ? i.dragPan : !0) && t.push(
    new bg({
      onFocusOnly: i.onFocusOnly,
      kinetic: e
    })
  ), (i.pinchRotate !== void 0 ? i.pinchRotate : !0) && t.push(new Yg()), (i.pinchZoom !== void 0 ? i.pinchZoom : !0) && t.push(
    new qg({
      duration: i.zoomDuration
    })
  ), (i.keyboard !== void 0 ? i.keyboard : !0) && (t.push(new Gg()), t.push(
    new zg({
      delta: i.zoomDelta,
      duration: i.zoomDuration
    })
  )), (i.mouseWheelZoom !== void 0 ? i.mouseWheelZoom : !0) && t.push(
    new Ug({
      onFocusOnly: i.onFocusOnly,
      duration: i.zoomDuration
    })
  ), (i.shiftDragZoom !== void 0 ? i.shiftDragZoom : !0) && t.push(
    new Ng({
      duration: i.zoomDuration
    })
  ), t;
}
function Gh(i) {
  return i[0] > 0 && i[1] > 0;
}
function Hg(i, t, e) {
  return e === void 0 && (e = [0, 0]), e[0] = i[0] * t + 0.5 | 0, e[1] = i[1] * t + 0.5 | 0, e;
}
function zt(i, t) {
  return Array.isArray(i) ? i : (t === void 0 ? t = [i, i] : (t[0] = i, t[1] = i), t);
}
function wc(i) {
  if (i instanceof Fr) {
    i.setMapInternal(null);
    return;
  }
  i instanceof Nr && i.getLayers().forEach(wc);
}
function Rc(i, t) {
  if (i instanceof Fr) {
    i.setMapInternal(t);
    return;
  }
  if (i instanceof Nr) {
    const e = i.getLayers().getArray();
    for (let n = 0, s = e.length; n < s; ++n)
      Rc(e[n], t);
  }
}
class Zg extends ie {
  constructor(t) {
    super(), t = t || {}, this.on, this.once, this.un;
    const e = Jg(t);
    this.renderComplete_, this.loaded_ = !0, this.boundHandleBrowserEvent_ = this.handleBrowserEvent.bind(this), this.maxTilesLoading_ = t.maxTilesLoading !== void 0 ? t.maxTilesLoading : 16, this.pixelRatio_ = t.pixelRatio !== void 0 ? t.pixelRatio : Wl, this.postRenderTimeoutHandle_, this.animationDelayKey_, this.animationDelay_ = this.animationDelay_.bind(this), this.coordinateToPixelTransform_ = he(), this.pixelToCoordinateTransform_ = he(), this.frameIndex_ = 0, this.frameState_ = null, this.previousExtent_ = null, this.viewPropertyListenerKey_ = null, this.viewChangeListenerKey_ = null, this.layerGroupPropertyListenerKeys_ = null, this.viewport_ = document.createElement("div"), this.viewport_.className = "ol-viewport" + ("ontouchstart" in window ? " ol-touch" : ""), this.viewport_.style.position = "relative", this.viewport_.style.overflow = "hidden", this.viewport_.style.width = "100%", this.viewport_.style.height = "100%", this.overlayContainer_ = document.createElement("div"), this.overlayContainer_.style.position = "absolute", this.overlayContainer_.style.zIndex = "0", this.overlayContainer_.style.width = "100%", this.overlayContainer_.style.height = "100%", this.overlayContainer_.style.pointerEvents = "none", this.overlayContainer_.className = "ol-overlaycontainer", this.viewport_.appendChild(this.overlayContainer_), this.overlayContainerStopEvent_ = document.createElement("div"), this.overlayContainerStopEvent_.style.position = "absolute", this.overlayContainerStopEvent_.style.zIndex = "0", this.overlayContainerStopEvent_.style.width = "100%", this.overlayContainerStopEvent_.style.height = "100%", this.overlayContainerStopEvent_.style.pointerEvents = "none", this.overlayContainerStopEvent_.className = "ol-overlaycontainer-stopevent", this.viewport_.appendChild(this.overlayContainerStopEvent_), this.mapBrowserEventHandler_ = null, this.moveTolerance_ = t.moveTolerance, this.keyboardEventTarget_ = e.keyboardEventTarget, this.targetChangeHandlerKeys_ = null, this.controls = e.controls || mg(), this.interactions = e.interactions || Kg({
      onFocusOnly: !0
    }), this.overlays_ = e.overlays, this.overlayIdIndex_ = {}, this.renderer_ = null, this.postRenderFunctions_ = [], this.tileQueue_ = new lf(
      this.getTilePriority.bind(this),
      this.handleTileChange_.bind(this)
    ), this.addChangeListener(
      _t.LAYERGROUP,
      this.handleLayerGroupChanged_
    ), this.addChangeListener(_t.VIEW, this.handleViewChanged_), this.addChangeListener(_t.SIZE, this.handleSizeChanged_), this.addChangeListener(_t.TARGET, this.handleTargetChanged_), this.setProperties(e.values);
    const n = this;
    t.view && !(t.view instanceof je) && t.view.then(function(s) {
      n.setView(new je(s));
    }), this.controls.addEventListener(
      xt.ADD,
      function(s) {
        s.element.setMap(this);
      }.bind(this)
    ), this.controls.addEventListener(
      xt.REMOVE,
      function(s) {
        s.element.setMap(null);
      }.bind(this)
    ), this.interactions.addEventListener(
      xt.ADD,
      function(s) {
        s.element.setMap(this);
      }.bind(this)
    ), this.interactions.addEventListener(
      xt.REMOVE,
      function(s) {
        s.element.setMap(null);
      }.bind(this)
    ), this.overlays_.addEventListener(
      xt.ADD,
      function(s) {
        this.addOverlayInternal_(s.element);
      }.bind(this)
    ), this.overlays_.addEventListener(
      xt.REMOVE,
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
    Rc(t.layer, this);
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
    const r = n.hitTolerance !== void 0 ? n.hitTolerance : 0, o = n.layerFilter !== void 0 ? n.layerFilter : xi, a = n.checkWrapped !== !1;
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
        s instanceof Nr ? e(s.getLayers()) : t.push(s);
      });
    }
    return e(this.getLayers()), t;
  }
  hasFeatureAtPixel(t, e) {
    if (!this.frameState_ || !this.renderer_)
      return !1;
    const n = this.getCoordinateFromPixelInternal(t);
    e = e !== void 0 ? e : {};
    const s = e.layerFilter !== void 0 ? e.layerFilter : xi, r = e.hitTolerance !== void 0 ? e.hitTolerance : 0, o = e.checkWrapped !== !1;
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
    return this.get(_t.TARGET);
  }
  getTargetElement() {
    const t = this.getTarget();
    return t !== void 0 ? typeof t == "string" ? document.getElementById(t) : t : null;
  }
  getCoordinateFromPixel(t) {
    return yn(
      this.getCoordinateFromPixelInternal(t),
      this.getView().getProjection()
    );
  }
  getCoordinateFromPixelInternal(t) {
    const e = this.frameState_;
    return e ? yt(
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
    return this.get(_t.LAYERGROUP);
  }
  setLayers(t) {
    const e = this.getLayerGroup();
    if (t instanceof qt) {
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
    const e = rt(
      t,
      this.getView().getProjection()
    );
    return this.getPixelFromCoordinateInternal(e);
  }
  getPixelFromCoordinateInternal(t) {
    const e = this.frameState_;
    return e ? yt(
      e.coordinateToPixelTransform,
      t.slice(0, 2)
    ) : null;
  }
  getRenderer() {
    return this.renderer_;
  }
  getSize() {
    return this.get(_t.SIZE);
  }
  getView() {
    return this.get(_t.VIEW);
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
    return cf(
      this.frameState_,
      t,
      e,
      n,
      s
    );
  }
  handleBrowserEvent(t, e) {
    e = e || t.type;
    const n = new Ce(e, this, t);
    this.handleMapBrowserEvent(n);
  }
  handleMapBrowserEvent(t) {
    if (!this.frameState_)
      return;
    const e = t.originalEvent, n = e.type;
    if (n === Ao.POINTERDOWN || n === z.WHEEL || n === z.KEYDOWN) {
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
        if (o[St.ANIMATING] || o[St.INTERACTING]) {
          const a = Date.now() - t.time > 8;
          s = a ? 0 : 8, r = a ? 0 : 2;
        }
      }
      e.getTilesLoading() < s && (e.reprioritize(), e.loadMoreTiles(s, r));
    }
    t && this.renderer_ && !t.animate && (this.renderComplete_ === !0 ? (this.hasListener(Ke.RENDERCOMPLETE) && this.renderer_.dispatchRenderEvent(
      Ke.RENDERCOMPLETE,
      t
    ), this.loaded_ === !1 && (this.loaded_ = !0, this.dispatchEvent(
      new Xi(ze.LOADEND, this, t)
    ))) : this.loaded_ === !0 && (this.loaded_ = !1, this.dispatchEvent(
      new Xi(ze.LOADSTART, this, t)
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
        et(this.targetChangeHandlerKeys_[e]);
      this.targetChangeHandlerKeys_ = null, this.viewport_.removeEventListener(
        z.CONTEXTMENU,
        this.boundHandleBrowserEvent_
      ), this.viewport_.removeEventListener(
        z.WHEEL,
        this.boundHandleBrowserEvent_
      ), this.mapBrowserEventHandler_.dispose(), this.mapBrowserEventHandler_ = null, Ro(this.viewport_);
    }
    const t = this.getTargetElement();
    if (!t)
      this.renderer_ && (clearTimeout(this.postRenderTimeoutHandle_), this.postRenderTimeoutHandle_ = void 0, this.postRenderFunctions_.length = 0, this.renderer_.dispose(), this.renderer_ = null), this.animationDelayKey_ && (cancelAnimationFrame(this.animationDelayKey_), this.animationDelayKey_ = void 0);
    else {
      t.appendChild(this.viewport_), this.renderer_ || (this.renderer_ = new tf(this)), this.mapBrowserEventHandler_ = new rf(
        this,
        this.moveTolerance_
      );
      for (const s in V)
        this.mapBrowserEventHandler_.addEventListener(
          V[s],
          this.handleMapBrowserEvent.bind(this)
        );
      this.viewport_.addEventListener(
        z.CONTEXTMENU,
        this.boundHandleBrowserEvent_,
        !1
      ), this.viewport_.addEventListener(
        z.WHEEL,
        this.boundHandleBrowserEvent_,
        jl ? { passive: !1 } : !1
      );
      const e = this.getOwnerDocument().defaultView, n = this.keyboardEventTarget_ ? this.keyboardEventTarget_ : t;
      this.targetChangeHandlerKeys_ = [
        U(
          n,
          z.KEYDOWN,
          this.handleBrowserEvent,
          this
        ),
        U(
          n,
          z.KEYPRESS,
          this.handleBrowserEvent,
          this
        ),
        U(e, z.RESIZE, this.updateSize, this)
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
    this.viewPropertyListenerKey_ && (et(this.viewPropertyListenerKey_), this.viewPropertyListenerKey_ = null), this.viewChangeListenerKey_ && (et(this.viewChangeListenerKey_), this.viewChangeListenerKey_ = null);
    const t = this.getView();
    t && (this.updateViewportSize_(), this.viewPropertyListenerKey_ = U(
      t,
      fn.PROPERTYCHANGE,
      this.handleViewPropertyChanged_,
      this
    ), this.viewChangeListenerKey_ = U(
      t,
      z.CHANGE,
      this.handleViewPropertyChanged_,
      this
    ), t.resolveConstraints(0)), this.render();
  }
  handleLayerGroupChanged_() {
    this.layerGroupPropertyListenerKeys_ && (this.layerGroupPropertyListenerKeys_.forEach(et), this.layerGroupPropertyListenerKeys_ = null);
    const t = this.getLayerGroup();
    t && (this.handleLayerAdd_(new Be("addlayer", t)), this.layerGroupPropertyListenerKeys_ = [
      U(t, fn.PROPERTYCHANGE, this.render, this),
      U(t, z.CHANGE, this.render, this),
      U(t, "addlayer", this.handleLayerAdd_, this),
      U(t, "removelayer", this.handleLayerRemove_, this)
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
    wc(t.layer);
  }
  removeOverlay(t) {
    return this.getOverlays().remove(t);
  }
  renderFrame_(t) {
    const e = this.getSize(), n = this.getView(), s = this.frameState_;
    let r = null;
    if (e !== void 0 && Gh(e) && n && n.isDef()) {
      const o = n.getHints(
        this.frameState_ ? this.frameState_.viewHints : void 0
      ), a = n.getState();
      if (r = {
        animate: !1,
        coordinateToPixelTransform: this.coordinateToPixelTransform_,
        declutterTree: null,
        extent: To(
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
        const h = isNaN(a.nextRotation) ? a.rotation : a.nextRotation;
        r.nextExtent = To(
          a.nextCenter,
          a.nextResolution,
          h,
          e
        );
      }
    }
    this.frameState_ = r, this.renderer_.renderFrame(r), r && (r.animate && this.render(), Array.prototype.push.apply(
      this.postRenderFunctions_,
      r.postRenderFunctions
    ), s && (!this.previousExtent_ || !sa(this.previousExtent_) && !Vn(r.extent, this.previousExtent_)) && (this.dispatchEvent(
      new Xi(ze.MOVESTART, this, s)
    ), this.previousExtent_ = cs(this.previousExtent_)), this.previousExtent_ && !r.viewHints[St.ANIMATING] && !r.viewHints[St.INTERACTING] && !Vn(r.extent, this.previousExtent_) && (this.dispatchEvent(
      new Xi(ze.MOVEEND, this, r)
    ), Xl(r.extent, this.previousExtent_))), this.dispatchEvent(new Xi(ze.POSTRENDER, this, r)), this.renderComplete_ = this.hasListener(ze.LOADSTART) || this.hasListener(ze.LOADEND) || this.hasListener(Ke.RENDERCOMPLETE) ? !this.tileQueue_.getTilesLoading() && !this.tileQueue_.getCount() && !this.getLoadingOrNotReady() : void 0, this.postRenderTimeoutHandle_ || (this.postRenderTimeoutHandle_ = setTimeout(() => {
      this.postRenderTimeoutHandle_ = void 0, this.handlePostRender();
    }, 0));
  }
  setLayerGroup(t) {
    const e = this.getLayerGroup();
    e && this.handleLayerRemove_(new Be("removelayer", e)), this.set(_t.LAYERGROUP, t);
  }
  setSize(t) {
    this.set(_t.SIZE, t);
  }
  setTarget(t) {
    this.set(_t.TARGET, t);
  }
  setView(t) {
    if (!t || t instanceof je) {
      this.set(_t.VIEW, t);
      return;
    }
    this.set(_t.VIEW, new je());
    const e = this;
    t.then(function(n) {
      e.setView(new je(n));
    });
  }
  updateSize() {
    const t = this.getTargetElement();
    let e;
    if (t) {
      const n = getComputedStyle(t), s = t.offsetWidth - parseFloat(n.borderLeftWidth) - parseFloat(n.paddingLeft) - parseFloat(n.paddingRight) - parseFloat(n.borderRightWidth), r = t.offsetHeight - parseFloat(n.borderTopWidth) - parseFloat(n.paddingTop) - parseFloat(n.paddingBottom) - parseFloat(n.borderBottomWidth);
      !isNaN(s) && !isNaN(r) && (e = [s, r], !Gh(e) && !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length) && console.warn(
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
function Jg(i) {
  let t = null;
  i.keyboardEventTarget !== void 0 && (t = typeof i.keyboardEventTarget == "string" ? document.getElementById(i.keyboardEventTarget) : i.keyboardEventTarget);
  const e = {}, n = i.layers && typeof i.layers.getLayers == "function" ? i.layers : new Nr({
    layers: i.layers
  });
  e[_t.LAYERGROUP] = n, e[_t.TARGET] = i.target, e[_t.VIEW] = i.view instanceof je ? i.view : new je();
  let s;
  i.controls !== void 0 && (Array.isArray(i.controls) ? s = new qt(i.controls.slice()) : (Y(
    typeof i.controls.getArray == "function",
    47
  ), s = i.controls));
  let r;
  i.interactions !== void 0 && (Array.isArray(i.interactions) ? r = new qt(i.interactions.slice()) : (Y(
    typeof i.interactions.getArray == "function",
    48
  ), r = i.interactions));
  let o;
  return i.overlays !== void 0 ? Array.isArray(i.overlays) ? o = new qt(i.overlays.slice()) : (Y(
    typeof i.overlays.getArray == "function",
    49
  ), o = i.overlays) : o = new qt(), {
    controls: s,
    interactions: r,
    keyboardEventTarget: t,
    overlays: o,
    values: e
  };
}
const Qg = Zg;
class Aa extends ie {
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
    const t = new Aa(this.hasProperties() ? this.getProperties() : null);
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
    this.geometryChangeKey_ && (et(this.geometryChangeKey_), this.geometryChangeKey_ = null);
    const t = this.getGeometry();
    t && (this.geometryChangeKey_ = U(
      t,
      z.CHANGE,
      this.handleGeometryChange_,
      this
    )), this.changed();
  }
  setGeometry(t) {
    this.set(this.geometryName_, t);
  }
  setStyle(t) {
    this.style_ = t, this.styleFunction_ = t ? t_(t) : void 0, this.changed();
  }
  setId(t) {
    this.id_ = t, this.changed();
  }
  setGeometryName(t) {
    this.removeChangeListener(this.geometryName_, this.handleGeometryChanged_), this.geometryName_ = t, this.addChangeListener(this.geometryName_, this.handleGeometryChanged_), this.handleGeometryChanged_();
  }
}
function t_(i) {
  if (typeof i == "function")
    return i;
  {
    let t;
    return Array.isArray(i) ? t = i : (Y(typeof i.getZIndex == "function", 41), t = [i]), function() {
      return t;
    };
  }
}
const Te = Aa, ht = {
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
class e_ extends Kt {
  constructor(t) {
    super(z.ERROR), this.code = t.code, this.message = t.message;
  }
}
class i_ extends ie {
  constructor(t) {
    super(), this.on, this.once, this.un, t = t || {}, this.position_ = null, this.transform_ = da, this.watchId_ = void 0, this.addChangeListener(ht.PROJECTION, this.handleProjectionChanged_), this.addChangeListener(ht.TRACKING, this.handleTrackingChanged_), t.projection !== void 0 && this.setProjection(t.projection), t.trackingOptions !== void 0 && this.setTrackingOptions(t.trackingOptions), this.setTracking(t.tracking !== void 0 ? t.tracking : !1);
  }
  disposeInternal() {
    this.setTracking(!1), super.disposeInternal();
  }
  handleProjectionChanged_() {
    const t = this.getProjection();
    t && (this.transform_ = kr(
      st("EPSG:4326"),
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
      e.heading === null ? void 0 : gi(e.heading)
    ), this.position_ ? (this.position_[0] = e.longitude, this.position_[1] = e.latitude) : this.position_ = [e.longitude, e.latitude];
    const n = this.transform_(this.position_);
    this.set(ht.POSITION, n), this.set(ht.SPEED, e.speed === null ? void 0 : e.speed);
    const s = ig(this.position_, e.accuracy);
    s.applyTransform(this.transform_), this.set(ht.ACCURACY_GEOMETRY, s), this.changed();
  }
  positionError_(t) {
    this.dispatchEvent(new e_(t));
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
    this.set(ht.PROJECTION, st(t));
  }
  setTracking(t) {
    this.set(ht.TRACKING, t);
  }
  setTrackingOptions(t) {
    this.set(ht.TRACKING_OPTIONS, t);
  }
}
const n_ = i_;
class Pa {
  constructor(t) {
    t = t || {}, this.color_ = t.color !== void 0 ? t.color : null;
  }
  clone() {
    const t = this.getColor();
    return new Pa({
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
const Qe = Pa;
function bc(i, t, e, n, s, r, o) {
  let a, h;
  const l = (e - t) / n;
  if (l === 1)
    a = t;
  else if (l === 2)
    a = t, h = s;
  else if (l !== 0) {
    let c = i[t], u = i[t + 1], d = 0;
    const f = [0];
    for (let m = t + n; m < e; m += n) {
      const y = i[m], p = i[m + 1];
      d += Math.sqrt((y - c) * (y - c) + (p - u) * (p - u)), f.push(d), c = y, u = p;
    }
    const g = s * d, _ = Qu(f, g);
    _ < 0 ? (h = (g - f[-_ - 2]) / (f[-_ - 1] - f[-_ - 2]), a = t + (-_ - 2) * n) : a = t + _ * n;
  }
  o = o > 1 ? o : 2, r = r || new Array(o);
  for (let c = 0; c < o; ++c)
    r[c] = a === void 0 ? NaN : h === void 0 ? i[a + c] : Ee(i[a + c], i[a + n + c], h);
  return r;
}
function ko(i, t, e, n, s, r) {
  if (e == t)
    return null;
  let o;
  if (s < i[t + n - 1])
    return r ? (o = i.slice(t, t + n), o[n - 1] = s, o) : null;
  if (i[e - 1] < s)
    return r ? (o = i.slice(e - n, e), o[n - 1] = s, o) : null;
  if (s == i[t + n - 1])
    return i.slice(t, t + n);
  let a = t / n, h = e / n;
  for (; a < h; ) {
    const d = a + h >> 1;
    s < i[(d + 1) * n - 1] ? h = d : a = d + 1;
  }
  const l = i[a * n - 1];
  if (s == l)
    return i.slice((a - 1) * n, (a - 1) * n + n);
  const c = i[(a + 1) * n - 1], u = (s - l) / (c - l);
  o = [];
  for (let d = 0; d < n - 1; ++d)
    o.push(
      Ee(
        i[(a - 1) * n + d],
        i[a * n + d],
        u
      )
    );
  return o.push(s), o;
}
function s_(i, t, e, n, s, r, o) {
  if (o)
    return ko(
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
  for (let h = 0, l = e.length; h < l; ++h) {
    const c = e[h];
    if (t != c) {
      if (s < i[t + n - 1])
        return null;
      if (s <= i[c - 1])
        return ko(
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
function Ic(i, t, e, n) {
  let s = i[t], r = i[t + 1], o = 0;
  for (let a = t + n; a < e; a += n) {
    const h = i[a], l = i[a + 1];
    o += Math.sqrt((h - s) * (h - s) + (l - r) * (l - r)), s = h, r = l;
  }
  return o;
}
class mr extends ni {
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
    this.flatCoordinates ? ae(this.flatCoordinates, t) : this.flatCoordinates = t.slice(), this.changed();
  }
  clone() {
    const t = new mr(
      this.flatCoordinates.slice(),
      this.layout
    );
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, n, s) {
    return s < Ai(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      xa(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), Ma(
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
    return _c(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t
    );
  }
  getCoordinateAtM(t, e) {
    return this.layout != "XYM" && this.layout != "XYZM" ? null : (e = e !== void 0 ? e : !1, ko(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      e
    ));
  }
  getCoordinates() {
    return Xe(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  getCoordinateAt(t, e) {
    return bc(
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
    return Ic(
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
    return e.length = Sa(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      e,
      0
    ), new mr(e, "XY");
  }
  getType() {
    return "LineString";
  }
  intersectsExtent(t) {
    return $r(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t
    );
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Gr(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
const yi = mr;
class La {
  constructor(t) {
    t = t || {}, this.color_ = t.color !== void 0 ? t.color : null, this.lineCap_ = t.lineCap, this.lineDash_ = t.lineDash !== void 0 ? t.lineDash : null, this.lineDashOffset_ = t.lineDashOffset, this.lineJoin_ = t.lineJoin, this.miterLimit_ = t.miterLimit, this.width_ = t.width;
  }
  clone() {
    const t = this.getColor();
    return new La({
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
const Ie = La, ft = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};
class Oa {
  constructor(t) {
    this.opacity_ = t.opacity, this.rotateWithView_ = t.rotateWithView, this.rotation_ = t.rotation, this.scale_ = t.scale, this.scaleArray_ = zt(t.scale), this.displacement_ = t.displacement, this.declutterMode_ = t.declutterMode;
  }
  clone() {
    const t = this.getScale();
    return new Oa({
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
    return B();
  }
  getImage(t) {
    return B();
  }
  getHitDetectionImage() {
    return B();
  }
  getPixelRatio(t) {
    return 1;
  }
  getImageState() {
    return B();
  }
  getImageSize() {
    return B();
  }
  getOrigin() {
    return B();
  }
  getSize() {
    return B();
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
    this.scale_ = t, this.scaleArray_ = zt(t);
  }
  listenImageChange(t) {
    B();
  }
  load() {
    B();
  }
  unlistenImageChange(t) {
    B();
  }
}
const Ac = Oa;
function re(i) {
  return Array.isArray(i) ? Zl(i) : i;
}
class Fa extends Ac {
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
    const t = this.getScale(), e = new Fa({
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
      const n = this.renderOptions_, s = jt(
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
    return ft.LOADED;
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
      const C = s;
      s = r, r = C;
    }
    const o = this.radius2_ === void 0 ? this.points_ : this.points_ * 2, a = 2 * Math.PI / o, h = r * Math.sin(a), l = Math.sqrt(r * r - h * h), c = s - l, u = Math.sqrt(h * h + c * c), d = u / h;
    if (t === "miter" && d <= n)
      return d * e;
    const f = e / 2 / d, g = e / 2 * (c / u), m = Math.sqrt((s + f) * (s + f) + g * g) - s;
    if (this.radius2_ === void 0 || t === "bevel")
      return m * 2;
    const y = s * Math.sin(a), p = Math.sqrt(s * s - y * y), x = r - p, M = Math.sqrt(y * y + x * x) / y;
    if (M <= n) {
      const C = M * e / 2 - r - s;
      return 2 * Math.max(m, C);
    }
    return m * 2;
  }
  createRenderOptions() {
    let t = _n, e = 0, n = null, s = 0, r, o = 0;
    this.stroke_ && (r = this.stroke_.getColor(), r === null && (r = Zn), r = re(r), o = this.stroke_.getWidth(), o === void 0 && (o = Qn), n = this.stroke_.getLineDash(), s = this.stroke_.getLineDashOffset(), t = this.stroke_.getLineJoin(), t === void 0 && (t = _n), e = this.stroke_.getMiterLimit(), e === void 0 && (e = Hn));
    const a = this.calculateLineJoinSize_(t, o, e), h = Math.max(this.radius_, this.radius2_ || 0), l = Math.ceil(2 * h + a);
    return {
      strokeStyle: r,
      strokeWidth: o,
      size: l,
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
      s === null && (s = be), e.fillStyle = re(s), e.fill();
    }
    this.stroke_ && (e.strokeStyle = t.strokeStyle, e.lineWidth = t.strokeWidth, t.lineDash && (e.setLineDash(t.lineDash), e.lineDashOffset = t.lineDashOffset), e.lineJoin = t.lineJoin, e.miterLimit = t.miterLimit, e.stroke());
  }
  createHitDetectionCanvas_(t) {
    if (this.fill_) {
      let e = this.fill_.getColor(), n = 0;
      if (typeof e == "string" && (e = nr(e)), e === null ? n = 1 : Array.isArray(e) && (n = e.length === 4 ? e[3] : 1), n === 0) {
        const s = jt(
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
        const h = r + a * o, l = a % 2 === 0 ? n : s;
        t.lineTo(l * Math.cos(h), l * Math.sin(h));
      }
      t.closePath();
    }
  }
  drawHitDetectionCanvas_(t, e) {
    e.translate(t.size / 2, t.size / 2), this.createPath_(e), e.fillStyle = be, e.fill(), this.stroke_ && (e.strokeStyle = t.strokeStyle, e.lineWidth = t.strokeWidth, t.lineDash && (e.setLineDash(t.lineDash), e.lineDashOffset = t.lineDashOffset), e.lineJoin = t.lineJoin, e.miterLimit = t.miterLimit, e.stroke());
  }
}
const Pc = Fa;
class Da extends Pc {
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
    const t = this.getScale(), e = new Da({
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
const Li = Da;
class Ye {
  constructor(t) {
    t = t || {}, this.geometry_ = null, this.geometryFunction_ = $h, t.geometry !== void 0 && this.setGeometry(t.geometry), this.fill_ = t.fill !== void 0 ? t.fill : null, this.image_ = t.image !== void 0 ? t.image : null, this.renderer_ = t.renderer !== void 0 ? t.renderer : null, this.hitDetectionRenderer_ = t.hitDetectionRenderer !== void 0 ? t.hitDetectionRenderer : null, this.stroke_ = t.stroke !== void 0 ? t.stroke : null, this.text_ = t.text !== void 0 ? t.text : null, this.zIndex_ = t.zIndex;
  }
  clone() {
    let t = this.getGeometry();
    return t && typeof t == "object" && (t = t.clone()), new Ye({
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
    }) : this.geometryFunction_ = $h, this.geometry_ = t;
  }
  setZIndex(t) {
    this.zIndex_ = t;
  }
}
function r_(i) {
  let t;
  if (typeof i == "function")
    t = i;
  else {
    let e;
    Array.isArray(i) ? e = i : (Y(typeof i.getZIndex == "function", 41), e = [i]), t = function() {
      return e;
    };
  }
  return t;
}
let ro = null;
function o_(i, t) {
  if (!ro) {
    const e = new Qe({
      color: "rgba(255,255,255,0.4)"
    }), n = new Ie({
      color: "#3399CC",
      width: 1.25
    });
    ro = [
      new Ye({
        image: new Li({
          fill: e,
          stroke: n,
          radius: 5
        }),
        fill: e,
        stroke: n
      })
    ];
  }
  return ro;
}
function Lc() {
  const i = {}, t = [255, 255, 255, 1], e = [0, 153, 255, 1], n = 3;
  return i.Polygon = [
    new Ye({
      fill: new Qe({
        color: [255, 255, 255, 0.5]
      })
    })
  ], i.MultiPolygon = i.Polygon, i.LineString = [
    new Ye({
      stroke: new Ie({
        color: t,
        width: n + 2
      })
    }),
    new Ye({
      stroke: new Ie({
        color: e,
        width: n
      })
    })
  ], i.MultiLineString = i.LineString, i.Circle = i.Polygon.concat(i.LineString), i.Point = [
    new Ye({
      image: new Li({
        radius: n * 2,
        fill: new Qe({
          color: e
        }),
        stroke: new Ie({
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
function $h(i) {
  return i.getGeometry();
}
const Ei = Ye, a_ = "#333";
class Na {
  constructor(t) {
    t = t || {}, this.font_ = t.font, this.rotation_ = t.rotation, this.rotateWithView_ = t.rotateWithView, this.scale_ = t.scale, this.scaleArray_ = zt(t.scale !== void 0 ? t.scale : 1), this.text_ = t.text, this.textAlign_ = t.textAlign, this.justify_ = t.justify, this.textBaseline_ = t.textBaseline, this.fill_ = t.fill !== void 0 ? t.fill : new Qe({ color: a_ }), this.maxAngle_ = t.maxAngle !== void 0 ? t.maxAngle : Math.PI / 4, this.placement_ = t.placement !== void 0 ? t.placement : "point", this.overflow_ = !!t.overflow, this.stroke_ = t.stroke !== void 0 ? t.stroke : null, this.offsetX_ = t.offsetX !== void 0 ? t.offsetX : 0, this.offsetY_ = t.offsetY !== void 0 ? t.offsetY : 0, this.backgroundFill_ = t.backgroundFill ? t.backgroundFill : null, this.backgroundStroke_ = t.backgroundStroke ? t.backgroundStroke : null, this.padding_ = t.padding === void 0 ? null : t.padding;
  }
  clone() {
    const t = this.getScale();
    return new Na({
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
    this.scale_ = t, this.scaleArray_ = zt(t !== void 0 ? t : 1);
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
const h_ = Na;
function l_(i, t, e, n, s) {
  Oc(i, t, e || 0, n || i.length - 1, s || c_);
}
function Oc(i, t, e, n, s) {
  for (; n > e; ) {
    if (n - e > 600) {
      var r = n - e + 1, o = t - e + 1, a = Math.log(r), h = 0.5 * Math.exp(2 * a / 3), l = 0.5 * Math.sqrt(a * h * (r - h) / r) * (o - r / 2 < 0 ? -1 : 1), c = Math.max(e, Math.floor(t - o * h / r + l)), u = Math.min(n, Math.floor(t + (r - o) * h / r + l));
      Oc(i, t, c, u, s);
    }
    var d = i[t], f = e, g = n;
    for (An(i, e, t), s(i[n], d) > 0 && An(i, e, n); f < g; ) {
      for (An(i, f, g), f++, g--; s(i[f], d) < 0; )
        f++;
      for (; s(i[g], d) > 0; )
        g--;
    }
    s(i[e], d) === 0 ? An(i, e, g) : (g++, An(i, g, n)), g <= t && (e = g + 1), t <= g && (n = g - 1);
  }
}
function An(i, t, e) {
  var n = i[t];
  i[t] = i[e], i[e] = n;
}
function c_(i, t) {
  return i < t ? -1 : i > t ? 1 : 0;
}
class Fc {
  constructor(t = 9) {
    this._maxEntries = Math.max(4, t), this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4)), this.clear();
  }
  all() {
    return this._all(this.data, []);
  }
  search(t) {
    let e = this.data;
    const n = [];
    if (!ks(t, e))
      return n;
    const s = this.toBBox, r = [];
    for (; e; ) {
      for (let o = 0; o < e.children.length; o++) {
        const a = e.children[o], h = e.leaf ? s(a) : a;
        ks(t, h) && (e.leaf ? n.push(a) : ao(t, h) ? this._all(a, n) : r.push(a));
      }
      e = r.pop();
    }
    return n;
  }
  collides(t) {
    let e = this.data;
    if (!ks(t, e))
      return !1;
    const n = [];
    for (; e; ) {
      for (let s = 0; s < e.children.length; s++) {
        const r = e.children[s], o = e.leaf ? this.toBBox(r) : r;
        if (ks(t, o)) {
          if (e.leaf || ao(t, o))
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
    return this.data = Yi([]), this;
  }
  remove(t, e) {
    if (!t)
      return this;
    let n = this.data;
    const s = this.toBBox(t), r = [], o = [];
    let a, h, l;
    for (; n || r.length; ) {
      if (n || (n = r.pop(), h = r[r.length - 1], a = o.pop(), l = !0), n.leaf) {
        const c = u_(t, n.children, e);
        if (c !== -1)
          return n.children.splice(c, 1), r.push(n), this._condense(r), this;
      }
      !l && !n.leaf && ao(n, s) ? (r.push(n), o.push(a), a = 0, h = n, n = n.children[0]) : h ? (a++, n = h.children[a], l = !1) : n = null;
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
      return a = Yi(t.slice(e, n + 1)), zi(a, this.toBBox), a;
    s || (s = Math.ceil(Math.log(r) / Math.log(o)), o = Math.ceil(r / Math.pow(o, s - 1))), a = Yi([]), a.leaf = !1, a.height = s;
    const h = Math.ceil(r / o), l = h * Math.ceil(Math.sqrt(o));
    zh(t, e, n, l, this.compareMinX);
    for (let c = e; c <= n; c += l) {
      const u = Math.min(c + l - 1, n);
      zh(t, c, u, h, this.compareMinY);
      for (let d = c; d <= u; d += h) {
        const f = Math.min(d + h - 1, u);
        a.children.push(this._build(t, d, f, s - 1));
      }
    }
    return zi(a, this.toBBox), a;
  }
  _chooseSubtree(t, e, n, s) {
    for (; s.push(e), !(e.leaf || s.length - 1 === n); ) {
      let r = 1 / 0, o = 1 / 0, a;
      for (let h = 0; h < e.children.length; h++) {
        const l = e.children[h], c = oo(l), u = g_(t, l) - c;
        u < o ? (o = u, r = c < r ? c : r, a = l) : u === o && c < r && (r = c, a = l);
      }
      e = a || e.children[0];
    }
    return e;
  }
  _insert(t, e, n) {
    const s = n ? t : this.toBBox(t), r = [], o = this._chooseSubtree(s, this.data, e, r);
    for (o.children.push(t), Dn(o, s); e >= 0 && r[e].children.length > this._maxEntries; )
      this._split(r, e), e--;
    this._adjustParentBBoxes(s, r, e);
  }
  _split(t, e) {
    const n = t[e], s = n.children.length, r = this._minEntries;
    this._chooseSplitAxis(n, r, s);
    const o = this._chooseSplitIndex(n, r, s), a = Yi(n.children.splice(o, n.children.length - o));
    a.height = n.height, a.leaf = n.leaf, zi(n, this.toBBox), zi(a, this.toBBox), e ? t[e - 1].children.push(a) : this._splitRoot(n, a);
  }
  _splitRoot(t, e) {
    this.data = Yi([t, e]), this.data.height = t.height + 1, this.data.leaf = !1, zi(this.data, this.toBBox);
  }
  _chooseSplitIndex(t, e, n) {
    let s, r = 1 / 0, o = 1 / 0;
    for (let a = e; a <= n - e; a++) {
      const h = Fn(t, 0, a, this.toBBox), l = Fn(t, a, n, this.toBBox), c = __(h, l), u = oo(h) + oo(l);
      c < r ? (r = c, s = a, o = u < o ? u : o) : c === r && u < o && (o = u, s = a);
    }
    return s || n - e;
  }
  _chooseSplitAxis(t, e, n) {
    const s = t.leaf ? this.compareMinX : d_, r = t.leaf ? this.compareMinY : f_, o = this._allDistMargin(t, e, n, s), a = this._allDistMargin(t, e, n, r);
    o < a && t.children.sort(s);
  }
  _allDistMargin(t, e, n, s) {
    t.children.sort(s);
    const r = this.toBBox, o = Fn(t, 0, e, r), a = Fn(t, n - e, n, r);
    let h = Ns(o) + Ns(a);
    for (let l = e; l < n - e; l++) {
      const c = t.children[l];
      Dn(o, t.leaf ? r(c) : c), h += Ns(o);
    }
    for (let l = n - e - 1; l >= e; l--) {
      const c = t.children[l];
      Dn(a, t.leaf ? r(c) : c), h += Ns(a);
    }
    return h;
  }
  _adjustParentBBoxes(t, e, n) {
    for (let s = n; s >= 0; s--)
      Dn(e[s], t);
  }
  _condense(t) {
    for (let e = t.length - 1, n; e >= 0; e--)
      t[e].children.length === 0 ? e > 0 ? (n = t[e - 1].children, n.splice(n.indexOf(t[e]), 1)) : this.clear() : zi(t[e], this.toBBox);
  }
}
function u_(i, t, e) {
  if (!e)
    return t.indexOf(i);
  for (let n = 0; n < t.length; n++)
    if (e(i, t[n]))
      return n;
  return -1;
}
function zi(i, t) {
  Fn(i, 0, i.children.length, t, i);
}
function Fn(i, t, e, n, s) {
  s || (s = Yi(null)), s.minX = 1 / 0, s.minY = 1 / 0, s.maxX = -1 / 0, s.maxY = -1 / 0;
  for (let r = t; r < e; r++) {
    const o = i.children[r];
    Dn(s, i.leaf ? n(o) : o);
  }
  return s;
}
function Dn(i, t) {
  return i.minX = Math.min(i.minX, t.minX), i.minY = Math.min(i.minY, t.minY), i.maxX = Math.max(i.maxX, t.maxX), i.maxY = Math.max(i.maxY, t.maxY), i;
}
function d_(i, t) {
  return i.minX - t.minX;
}
function f_(i, t) {
  return i.minY - t.minY;
}
function oo(i) {
  return (i.maxX - i.minX) * (i.maxY - i.minY);
}
function Ns(i) {
  return i.maxX - i.minX + (i.maxY - i.minY);
}
function g_(i, t) {
  return (Math.max(t.maxX, i.maxX) - Math.min(t.minX, i.minX)) * (Math.max(t.maxY, i.maxY) - Math.min(t.minY, i.minY));
}
function __(i, t) {
  const e = Math.max(i.minX, t.minX), n = Math.max(i.minY, t.minY), s = Math.min(i.maxX, t.maxX), r = Math.min(i.maxY, t.maxY);
  return Math.max(0, s - e) * Math.max(0, r - n);
}
function ao(i, t) {
  return i.minX <= t.minX && i.minY <= t.minY && t.maxX <= i.maxX && t.maxY <= i.maxY;
}
function ks(i, t) {
  return t.minX <= i.maxX && t.minY <= i.maxY && t.maxX >= i.minX && t.maxY >= i.minY;
}
function Yi(i) {
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
function zh(i, t, e, n, s) {
  const r = [t, e];
  for (; r.length; ) {
    if (e = r.pop(), t = r.pop(), e - t <= n)
      continue;
    const o = t + Math.ceil((e - t) / n / 2) * n;
    l_(i, o, t, e, s), r.push(t, o, o, e);
  }
}
function Dc(i, t, e) {
  const n = i;
  let s = !0, r = !1, o = !1;
  const a = [
    ir(n, z.LOAD, function() {
      o = !0, r || t();
    })
  ];
  return n.src && gd ? (r = !0, n.decode().then(function() {
    s && t();
  }).catch(function(h) {
    s && (o ? t() : e());
  })) : a.push(ir(n, z.ERROR, e)), function() {
    s = !1, a.forEach(et);
  };
}
let Pn = null;
class m_ extends Rr {
  constructor(t, e, n, s, r, o) {
    super(), this.hitDetectionImage_ = null, this.image_ = t, this.crossOrigin_ = s, this.canvas_ = {}, this.color_ = o, this.unlisten_ = null, this.imageState_ = r, this.size_ = n, this.src_ = e, this.tainted_;
  }
  initializeImage_() {
    this.image_ = new Image(), this.crossOrigin_ !== null && (this.image_.crossOrigin = this.crossOrigin_);
  }
  isTainted_() {
    if (this.tainted_ === void 0 && this.imageState_ === ft.LOADED) {
      Pn || (Pn = jt(1, 1)), Pn.drawImage(this.image_, 0, 0);
      try {
        Pn.getImageData(0, 0, 1, 1), this.tainted_ = !1;
      } catch {
        Pn = null, this.tainted_ = !0;
      }
    }
    return this.tainted_ === !0;
  }
  dispatchChangeEvent_() {
    this.dispatchEvent(z.CHANGE);
  }
  handleImageError_() {
    this.imageState_ = ft.ERROR, this.unlistenImage_(), this.dispatchChangeEvent_();
  }
  handleImageLoad_() {
    this.imageState_ = ft.LOADED, this.size_ ? (this.image_.width = this.size_[0], this.image_.height = this.size_[1]) : this.size_ = [this.image_.width, this.image_.height], this.unlistenImage_(), this.dispatchChangeEvent_();
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
        const t = this.size_[0], e = this.size_[1], n = jt(t, e);
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
    if (this.imageState_ === ft.IDLE) {
      this.image_ || this.initializeImage_(), this.imageState_ = ft.LOADING;
      try {
        this.image_.src = this.src_;
      } catch {
        this.handleImageError_();
      }
      this.unlisten_ = Dc(
        this.image_,
        this.handleImageLoad_.bind(this),
        this.handleImageError_.bind(this)
      );
    }
  }
  replaceColor_(t) {
    if (!this.color_ || this.canvas_[t] || this.imageState_ !== ft.LOADED)
      return;
    const e = this.image_, n = document.createElement("canvas");
    n.width = Math.ceil(e.width * t), n.height = Math.ceil(e.height * t);
    const s = n.getContext("2d");
    s.scale(t, t), s.drawImage(e, 0, 0), s.globalCompositeOperation = "multiply", s.fillStyle = Hl(this.color_), s.fillRect(0, 0, n.width / t, n.height / t), s.globalCompositeOperation = "destination-in", s.drawImage(e, 0, 0), this.canvas_[t] = n;
  }
  unlistenImage_() {
    this.unlisten_ && (this.unlisten_(), this.unlisten_ = null);
  }
}
function y_(i, t, e, n, s, r) {
  let o = sr.get(t, n, r);
  return o || (o = new m_(i, t, e, n, s, r), sr.set(t, n, r, o)), o;
}
class ka extends Ac {
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
    Y(!(a !== void 0 && o), 4), Y(!o || o && this.imgSize_, 5), (a === void 0 || a.length === 0) && o && (a = o.src || j(o)), Y(a !== void 0 && a.length > 0, 6);
    const h = t.src !== void 0 ? ft.IDLE : ft.LOADED;
    this.color_ = t.color !== void 0 ? nr(t.color) : null, this.iconImage_ = y_(
      o,
      a,
      this.imgSize_ !== void 0 ? this.imgSize_ : null,
      this.crossOrigin_,
      h,
      this.color_
    ), this.offset_ = t.offset !== void 0 ? t.offset : [0, 0], this.offsetOrigin_ = t.offsetOrigin !== void 0 ? t.offsetOrigin : "top-left", this.origin_ = null, this.size_ = t.size !== void 0 ? t.size : null;
  }
  clone() {
    const t = this.getScale();
    return new ka({
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
    this.iconImage_.addEventListener(z.CHANGE, t);
  }
  load() {
    this.iconImage_.load();
  }
  unlistenImageChange(t) {
    this.iconImage_.removeEventListener(z.CHANGE, t);
  }
}
const Nc = ka;
function Bh(i) {
  return new Ei({
    fill: is(i, ""),
    stroke: ns(i, ""),
    text: p_(i),
    image: x_(i)
  });
}
function is(i, t) {
  const e = i[t + "fill-color"];
  if (!!e)
    return new Qe({ color: e });
}
function ns(i, t) {
  const e = i[t + "stroke-width"], n = i[t + "stroke-color"];
  if (!(!e && !n))
    return new Ie({
      width: e,
      color: n,
      lineCap: i[t + "stroke-line-cap"],
      lineJoin: i[t + "stroke-line-join"],
      lineDash: i[t + "stroke-line-dash"],
      lineDashOffset: i[t + "stroke-line-dash-offset"],
      miterLimit: i[t + "stroke-miter-limit"]
    });
}
function p_(i) {
  const t = i["text-value"];
  return t ? new h_({
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
    fill: is(i, "text-"),
    backgroundFill: is(i, "text-background-"),
    stroke: ns(i, "text-"),
    backgroundStroke: ns(i, "text-background-")
  }) : void 0;
}
function x_(i) {
  const t = i["icon-src"], e = i["icon-img"];
  if (t || e)
    return new Nc({
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
    return new Pc({
      points: n,
      fill: is(i, r),
      stroke: ns(i, r),
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
    return new Li({
      radius: s,
      fill: is(i, r),
      stroke: ns(i, r),
      displacement: i["circle-displacement"],
      scale: i["circle-scale"],
      rotation: i["circle-rotation"],
      rotateWithView: i["circle-rotate-with-view"],
      declutterMode: i["circle-declutter-mode"]
    });
  }
}
const Wh = {
  RENDER_ORDER: "renderOrder"
};
class v_ extends Fr {
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
    return this.get(Wh.RENDER_ORDER);
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
    t.declutterTree || (t.declutterTree = new Fc(9)), this.getRenderer().renderDeclutter(t);
  }
  setRenderOrder(t) {
    this.set(Wh.RENDER_ORDER, t);
  }
  setStyle(t) {
    let e;
    if (t === void 0)
      e = o_;
    else if (t === null)
      e = null;
    else if (typeof t == "function")
      e = t;
    else if (t instanceof Ei)
      e = t;
    else if (Array.isArray(t)) {
      const n = t.length, s = new Array(n);
      for (let r = 0; r < n; ++r) {
        const o = t[r];
        o instanceof Ei ? s[r] = o : s[r] = Bh(o);
      }
      e = s;
    } else
      e = Bh(t);
    this.style_ = e, this.styleFunction_ = t === null ? void 0 : r_(this.style_), this.changed();
  }
}
const M_ = v_, fs = {
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
}, Gs = [fs.FILL], Ve = [fs.STROKE], fi = [fs.BEGIN_PATH], jh = [fs.CLOSE_PATH], $ = fs;
class C_ {
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
const kc = C_;
class E_ extends kc {
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
    for (let a = 0, h = t.length; a < h; a += e)
      s[0] = t[a], s[1] = t[a + 1], Ar(n, s) && (r[o++] = s[0], r[o++] = s[1]);
    return o;
  }
  appendFlatLineCoordinates(t, e, n, s, r, o) {
    const a = this.coordinates;
    let h = a.length;
    const l = this.getBufferedMaxExtent();
    o && (e += s);
    let c = t[e], u = t[e + 1];
    const d = this.tmpCoordinate_;
    let f = !0, g, _, m;
    for (g = e + s; g < n; g += s)
      d[0] = t[g], d[1] = t[g + 1], m = Eo(l, d), m !== _ ? (f && (a[h++] = c, a[h++] = u, f = !1), a[h++] = d[0], a[h++] = d[1]) : m === mt.INTERSECTING ? (a[h++] = d[0], a[h++] = d[1], f = !1) : f = !0, c = d[0], u = d[1], _ = m;
    return (r && f || g === e + s) && (a[h++] = c, a[h++] = u), h;
  }
  drawCustomCoordinates_(t, e, n, s, r) {
    for (let o = 0, a = n.length; o < a; ++o) {
      const h = n[o], l = this.appendFlatLineCoordinates(
        t,
        e,
        h,
        s,
        !1,
        !1
      );
      r.push(l), e = h;
    }
    return e;
  }
  drawCustom(t, e, n, s) {
    this.beginGeometry(t, e);
    const r = t.getType(), o = t.getStride(), a = this.coordinates.length;
    let h, l, c, u, d;
    switch (r) {
      case "MultiPolygon":
        h = t.getOrientedFlatCoordinates(), u = [];
        const f = t.getEndss();
        d = 0;
        for (let g = 0, _ = f.length; g < _; ++g) {
          const m = [];
          d = this.drawCustomCoordinates_(
            h,
            d,
            f[g],
            o,
            m
          ), u.push(m);
        }
        this.instructions.push([
          $.CUSTOM,
          a,
          u,
          t,
          n,
          Oo
        ]), this.hitDetectionInstructions.push([
          $.CUSTOM,
          a,
          u,
          t,
          s || n,
          Oo
        ]);
        break;
      case "Polygon":
      case "MultiLineString":
        c = [], h = r == "Polygon" ? t.getOrientedFlatCoordinates() : t.getFlatCoordinates(), d = this.drawCustomCoordinates_(
          h,
          0,
          t.getEnds(),
          o,
          c
        ), this.instructions.push([
          $.CUSTOM,
          a,
          c,
          t,
          n,
          es
        ]), this.hitDetectionInstructions.push([
          $.CUSTOM,
          a,
          c,
          t,
          s || n,
          es
        ]);
        break;
      case "LineString":
      case "Circle":
        h = t.getFlatCoordinates(), l = this.appendFlatLineCoordinates(
          h,
          0,
          h.length,
          o,
          !1,
          !1
        ), this.instructions.push([
          $.CUSTOM,
          a,
          l,
          t,
          n,
          Xe
        ]), this.hitDetectionInstructions.push([
          $.CUSTOM,
          a,
          l,
          t,
          s || n,
          Xe
        ]);
        break;
      case "MultiPoint":
        h = t.getFlatCoordinates(), l = this.appendFlatPointCoordinates(h, o), l > a && (this.instructions.push([
          $.CUSTOM,
          a,
          l,
          t,
          n,
          Xe
        ]), this.hitDetectionInstructions.push([
          $.CUSTOM,
          a,
          l,
          t,
          s || n,
          Xe
        ]));
        break;
      case "Point":
        h = t.getFlatCoordinates(), this.coordinates.push(h[0], h[1]), l = this.coordinates.length, this.instructions.push([
          $.CUSTOM,
          a,
          l,
          t,
          n
        ]), this.hitDetectionInstructions.push([
          $.CUSTOM,
          a,
          l,
          t,
          s || n
        ]);
        break;
    }
    this.endGeometry(e);
  }
  beginGeometry(t, e) {
    this.beginGeometryInstruction1_ = [
      $.BEGIN_GEOMETRY,
      e,
      0,
      t
    ], this.instructions.push(this.beginGeometryInstruction1_), this.beginGeometryInstruction2_ = [
      $.BEGIN_GEOMETRY,
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
      s = t[e], r = s[0], r == $.END_GEOMETRY ? o = e : r == $.BEGIN_GEOMETRY && (s[2] = e, td(this.hitDetectionInstructions, o, e), o = -1);
  }
  setFillStrokeStyle(t, e) {
    const n = this.state;
    if (t) {
      const s = t.getColor();
      n.fillStyle = re(
        s || be
      );
    } else
      n.fillStyle = void 0;
    if (e) {
      const s = e.getColor();
      n.strokeStyle = re(
        s || Zn
      );
      const r = e.getLineCap();
      n.lineCap = r !== void 0 ? r : ar;
      const o = e.getLineDash();
      n.lineDash = o ? o.slice() : qn;
      const a = e.getLineDashOffset();
      n.lineDashOffset = a || Kn;
      const h = e.getLineJoin();
      n.lineJoin = h !== void 0 ? h : _n;
      const l = e.getWidth();
      n.lineWidth = l !== void 0 ? l : Qn;
      const c = e.getMiterLimit();
      n.miterLimit = c !== void 0 ? c : Hn, n.lineWidth > this.maxLineWidth && (this.maxLineWidth = n.lineWidth, this.bufferedMaxExtent_ = null);
    } else
      n.strokeStyle = void 0, n.lineCap = void 0, n.lineDash = null, n.lineDashOffset = void 0, n.lineJoin = void 0, n.lineWidth = void 0, n.miterLimit = void 0;
  }
  createFill(t) {
    const e = t.fillStyle, n = [$.SET_FILL_STYLE, e];
    return typeof e != "string" && n.push(!0), n;
  }
  applyStroke(t) {
    this.instructions.push(this.createStroke(t));
  }
  createStroke(t) {
    return [
      $.SET_STROKE_STYLE,
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
    const n = t.strokeStyle, s = t.lineCap, r = t.lineDash, o = t.lineDashOffset, a = t.lineJoin, h = t.lineWidth, l = t.miterLimit;
    (t.currentStrokeStyle != n || t.currentLineCap != s || r != t.currentLineDash && !ii(t.currentLineDash, r) || t.currentLineDashOffset != o || t.currentLineJoin != a || t.currentLineWidth != h || t.currentMiterLimit != l) && (n !== void 0 && e.call(this, t), t.currentStrokeStyle = n, t.currentLineCap = s, t.currentLineDash = r, t.currentLineDashOffset = o, t.currentLineJoin = a, t.currentLineWidth = h, t.currentMiterLimit = l);
  }
  endGeometry(t) {
    this.beginGeometryInstruction1_[2] = this.instructions.length, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length, this.beginGeometryInstruction2_ = null;
    const e = [$.END_GEOMETRY, t];
    this.instructions.push(e), this.hitDetectionInstructions.push(e);
  }
  getBufferedMaxExtent() {
    if (!this.bufferedMaxExtent_ && (this.bufferedMaxExtent_ = Xl(this.maxExtent), this.maxLineWidth > 0)) {
      const t = this.resolution * (this.maxLineWidth + 1) / 2;
      Ir(this.bufferedMaxExtent_, t, this.bufferedMaxExtent_);
    }
    return this.bufferedMaxExtent_;
  }
}
const gs = E_;
class S_ extends gs {
  constructor(t, e, n, s) {
    super(t, e, n, s), this.hitDetectionImage_ = null, this.image_ = null, this.imagePixelRatio_ = void 0, this.anchorX_ = void 0, this.anchorY_ = void 0, this.height_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.scale_ = void 0, this.width_ = void 0, this.declutterMode_ = void 0, this.declutterImageWithText_ = void 0;
  }
  drawPoint(t, e) {
    if (!this.image_)
      return;
    this.beginGeometry(t, e);
    const n = t.getFlatCoordinates(), s = t.getStride(), r = this.coordinates.length, o = this.appendFlatPointCoordinates(n, s);
    this.instructions.push([
      $.DRAW_IMAGE,
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
      $.DRAW_IMAGE,
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
      $.DRAW_IMAGE,
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
      $.DRAW_IMAGE,
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
const T_ = S_;
class w_ extends gs {
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
      $.MOVE_TO_LINE_TO,
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
        $.SET_STROKE_STYLE,
        n.strokeStyle,
        n.lineWidth,
        n.lineCap,
        n.lineJoin,
        n.miterLimit,
        qn,
        Kn
      ],
      fi
    );
    const o = t.getFlatCoordinates(), a = t.getStride();
    this.drawFlatCoordinates_(
      o,
      0,
      o.length,
      a
    ), this.hitDetectionInstructions.push(Ve), this.endGeometry(e);
  }
  drawMultiLineString(t, e) {
    const n = this.state, s = n.strokeStyle, r = n.lineWidth;
    if (s === void 0 || r === void 0)
      return;
    this.updateStrokeStyle(n, this.applyStroke), this.beginGeometry(t, e), this.hitDetectionInstructions.push(
      [
        $.SET_STROKE_STYLE,
        n.strokeStyle,
        n.lineWidth,
        n.lineCap,
        n.lineJoin,
        n.miterLimit,
        n.lineDash,
        n.lineDashOffset
      ],
      fi
    );
    const o = t.getEnds(), a = t.getFlatCoordinates(), h = t.getStride();
    let l = 0;
    for (let c = 0, u = o.length; c < u; ++c)
      l = this.drawFlatCoordinates_(
        a,
        l,
        o[c],
        h
      );
    this.hitDetectionInstructions.push(Ve), this.endGeometry(e);
  }
  finish() {
    const t = this.state;
    return t.lastStroke != null && t.lastStroke != this.coordinates.length && this.instructions.push(Ve), this.reverseHitDetectionInstructions(), this.state = null, super.finish();
  }
  applyStroke(t) {
    t.lastStroke != null && t.lastStroke != this.coordinates.length && (this.instructions.push(Ve), t.lastStroke = this.coordinates.length), t.lastStroke = 0, super.applyStroke(t), this.instructions.push(fi);
  }
}
const R_ = w_;
class b_ extends gs {
  constructor(t, e, n, s) {
    super(t, e, n, s);
  }
  drawFlatCoordinatess_(t, e, n, s) {
    const r = this.state, o = r.fillStyle !== void 0, a = r.strokeStyle !== void 0, h = n.length;
    this.instructions.push(fi), this.hitDetectionInstructions.push(fi);
    for (let l = 0; l < h; ++l) {
      const c = n[l], u = this.coordinates.length, d = this.appendFlatLineCoordinates(
        t,
        e,
        c,
        s,
        !0,
        !a
      ), f = [
        $.MOVE_TO_LINE_TO,
        u,
        d
      ];
      this.instructions.push(f), this.hitDetectionInstructions.push(f), a && (this.instructions.push(jh), this.hitDetectionInstructions.push(jh)), e = c;
    }
    return o && (this.instructions.push(Gs), this.hitDetectionInstructions.push(Gs)), a && (this.instructions.push(Ve), this.hitDetectionInstructions.push(Ve)), e;
  }
  drawCircle(t, e) {
    const n = this.state, s = n.fillStyle, r = n.strokeStyle;
    if (s === void 0 && r === void 0)
      return;
    this.setFillStrokeStyles_(), this.beginGeometry(t, e), n.fillStyle !== void 0 && this.hitDetectionInstructions.push([
      $.SET_FILL_STYLE,
      be
    ]), n.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
      $.SET_STROKE_STYLE,
      n.strokeStyle,
      n.lineWidth,
      n.lineCap,
      n.lineJoin,
      n.miterLimit,
      n.lineDash,
      n.lineDashOffset
    ]);
    const o = t.getFlatCoordinates(), a = t.getStride(), h = this.coordinates.length;
    this.appendFlatLineCoordinates(
      o,
      0,
      o.length,
      a,
      !1,
      !1
    );
    const l = [$.CIRCLE, h];
    this.instructions.push(fi, l), this.hitDetectionInstructions.push(fi, l), n.fillStyle !== void 0 && (this.instructions.push(Gs), this.hitDetectionInstructions.push(Gs)), n.strokeStyle !== void 0 && (this.instructions.push(Ve), this.hitDetectionInstructions.push(Ve)), this.endGeometry(e);
  }
  drawPolygon(t, e) {
    const n = this.state, s = n.fillStyle, r = n.strokeStyle;
    if (s === void 0 && r === void 0)
      return;
    this.setFillStrokeStyles_(), this.beginGeometry(t, e), n.fillStyle !== void 0 && this.hitDetectionInstructions.push([
      $.SET_FILL_STYLE,
      be
    ]), n.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
      $.SET_STROKE_STYLE,
      n.strokeStyle,
      n.lineWidth,
      n.lineCap,
      n.lineJoin,
      n.miterLimit,
      n.lineDash,
      n.lineDashOffset
    ]);
    const o = t.getEnds(), a = t.getOrientedFlatCoordinates(), h = t.getStride();
    this.drawFlatCoordinatess_(
      a,
      0,
      o,
      h
    ), this.endGeometry(e);
  }
  drawMultiPolygon(t, e) {
    const n = this.state, s = n.fillStyle, r = n.strokeStyle;
    if (s === void 0 && r === void 0)
      return;
    this.setFillStrokeStyles_(), this.beginGeometry(t, e), n.fillStyle !== void 0 && this.hitDetectionInstructions.push([
      $.SET_FILL_STYLE,
      be
    ]), n.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
      $.SET_STROKE_STYLE,
      n.strokeStyle,
      n.lineWidth,
      n.lineCap,
      n.lineJoin,
      n.miterLimit,
      n.lineDash,
      n.lineDashOffset
    ]);
    const o = t.getEndss(), a = t.getOrientedFlatCoordinates(), h = t.getStride();
    let l = 0;
    for (let c = 0, u = o.length; c < u; ++c)
      l = this.drawFlatCoordinatess_(
        a,
        l,
        o[c],
        h
      );
    this.endGeometry(e);
  }
  finish() {
    this.reverseHitDetectionInstructions(), this.state = null;
    const t = this.tolerance;
    if (t !== 0) {
      const e = this.coordinates;
      for (let n = 0, s = e.length; n < s; ++n)
        e[n] = li(e[n], t);
    }
    return super.finish();
  }
  setFillStrokeStyles_() {
    const t = this.state;
    t.fillStyle !== void 0 && this.updateFillStyle(t, this.createFill), t.strokeStyle !== void 0 && this.updateStrokeStyle(t, this.applyStroke);
  }
}
const Uh = b_;
function I_(i, t, e, n, s) {
  let r = e, o = e, a = 0, h = 0, l = e, c, u, d, f, g, _, m, y, p, x;
  for (u = e; u < n; u += s) {
    const v = t[u], M = t[u + 1];
    g !== void 0 && (p = v - g, x = M - _, f = Math.sqrt(p * p + x * x), m !== void 0 && (h += d, c = Math.acos((m * p + y * x) / (d * f)), c > i && (h > a && (a = h, r = l, o = u), h = 0, l = u - s)), d = f, m = p, y = x), g = v, _ = M;
  }
  return h += f, h > a ? [l, u] : [r, o];
}
const Bn = {
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
class A_ extends gs {
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
    const h = t.getType();
    let l = null, c = t.getStride();
    if (r.placement === "line" && (h == "LineString" || h == "MultiLineString" || h == "Polygon" || h == "MultiPolygon")) {
      if (!At(this.getBufferedMaxExtent(), t.getExtent()))
        return;
      let u;
      if (l = t.getFlatCoordinates(), h == "LineString")
        u = [l.length];
      else if (h == "MultiLineString")
        u = t.getEnds();
      else if (h == "Polygon")
        u = t.getEnds().slice(0, 1);
      else if (h == "MultiPolygon") {
        const _ = t.getEndss();
        u = [];
        for (let m = 0, y = _.length; m < y; ++m)
          u.push(_[m][0]);
      }
      this.beginGeometry(t, e);
      const d = r.textAlign;
      let f = 0, g;
      for (let _ = 0, m = u.length; _ < m; ++_) {
        if (d == null) {
          const p = I_(
            r.maxAngle,
            l,
            f,
            u[_],
            c
          );
          f = p[0], g = p[1];
        } else
          g = u[_];
        for (let p = f; p < g; p += c)
          o.push(l[p], l[p + 1]);
        const y = o.length;
        f = u[_], this.drawChars_(a, y), a = y;
      }
      this.endGeometry(e);
    } else {
      let u = r.overflow ? null : [];
      switch (h) {
        case "Point":
        case "MultiPoint":
          l = t.getFlatCoordinates();
          break;
        case "LineString":
          l = t.getFlatMidpoint();
          break;
        case "Circle":
          l = t.getCenter();
          break;
        case "MultiLineString":
          l = t.getFlatMidpoints(), c = 2;
          break;
        case "Polygon":
          l = t.getFlatInteriorPoint(), r.overflow || u.push(l[2] / this.resolution), c = 3;
          break;
        case "MultiPolygon":
          const m = t.getFlatInteriorPoints();
          l = [];
          for (let y = 0, p = m.length; y < p; y += 3)
            r.overflow || u.push(m[y + 2] / this.resolution), l.push(m[y], m[y + 1]);
          if (l.length === 0)
            return;
          c = 2;
          break;
      }
      const d = this.appendFlatPointCoordinates(l, c);
      if (d === a)
        return;
      if (u && (d - a) / 2 !== l.length / c) {
        let m = a / 2;
        u = u.filter((y, p) => {
          const x = o[(m + p) * 2] === l[p * c] && o[(m + p) * 2 + 1] === l[p * c + 1];
          return x || --m, x;
        });
      }
      this.saveTextStates_(), (r.backgroundFill || r.backgroundStroke) && (this.setFillStrokeStyle(
        r.backgroundFill,
        r.backgroundStroke
      ), r.backgroundFill && (this.updateFillStyle(this.state, this.createFill), this.hitDetectionInstructions.push(this.createFill(this.state))), r.backgroundStroke && (this.updateStrokeStyle(this.state, this.applyStroke), this.hitDetectionInstructions.push(this.createStroke(this.state)))), this.beginGeometry(t, e);
      let f = r.padding;
      if (f != ui && (r.scale[0] < 0 || r.scale[1] < 0)) {
        let m = r.padding[0], y = r.padding[1], p = r.padding[2], x = r.padding[3];
        r.scale[0] < 0 && (y = -y, x = -x), r.scale[1] < 0 && (m = -m, p = -p), f = [m, y, p, x];
      }
      const g = this.pixelRatio;
      this.instructions.push([
        $.DRAW_IMAGE,
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
        f == ui ? ui : f.map(function(m) {
          return m * g;
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
      const _ = 1 / g;
      this.hitDetectionInstructions.push([
        $.DRAW_IMAGE,
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
        [_, _],
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
      textAlign: e.textAlign || Jn,
      justify: e.justify,
      textBaseline: e.textBaseline || hr,
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
    const h = this.pixelRatio, l = Bn[s.textBaseline], c = this.textOffsetY_ * h, u = this.text_, d = n ? n.lineWidth * Math.abs(s.scale[0]) / 2 : 0;
    this.instructions.push([
      $.DRAW_CHARS,
      t,
      e,
      l,
      s.overflow,
      a,
      s.maxAngle,
      h,
      c,
      r,
      d * h,
      u,
      o,
      1
    ]), this.hitDetectionInstructions.push([
      $.DRAW_CHARS,
      t,
      e,
      l,
      s.overflow,
      a,
      s.maxAngle,
      1,
      c,
      r,
      d,
      u,
      o,
      1 / h
    ]);
  }
  setTextStyle(t, e) {
    let n, s, r;
    if (!t)
      this.text_ = "";
    else {
      const o = t.getFill();
      o ? (s = this.textFillState_, s || (s = {}, this.textFillState_ = s), s.fillStyle = re(
        o.getColor() || be
      )) : (s = null, this.textFillState_ = s);
      const a = t.getStroke();
      if (!a)
        r = null, this.textStrokeState_ = r;
      else {
        r = this.textStrokeState_, r || (r = {}, this.textStrokeState_ = r);
        const g = a.getLineDash(), _ = a.getLineDashOffset(), m = a.getWidth(), y = a.getMiterLimit();
        r.lineCap = a.getLineCap() || ar, r.lineDash = g ? g.slice() : qn, r.lineDashOffset = _ === void 0 ? Kn : _, r.lineJoin = a.getLineJoin() || _n, r.lineWidth = m === void 0 ? Qn : m, r.miterLimit = y === void 0 ? Hn : y, r.strokeStyle = re(
          a.getColor() || Zn
        );
      }
      n = this.textState_;
      const h = t.getFont() || nc;
      qd(h);
      const l = t.getScaleArray();
      n.overflow = t.getOverflow(), n.font = h, n.maxAngle = t.getMaxAngle(), n.placement = t.getPlacement(), n.textAlign = t.getTextAlign(), n.justify = t.getJustify(), n.textBaseline = t.getTextBaseline() || hr, n.backgroundFill = t.getBackgroundFill(), n.backgroundStroke = t.getBackgroundStroke(), n.padding = t.getPadding() || ui, n.scale = l === void 0 ? [1, 1] : l;
      const c = t.getOffsetX(), u = t.getOffsetY(), d = t.getRotateWithView(), f = t.getRotation();
      this.text_ = t.getText() || "", this.textOffsetX_ = c === void 0 ? 0 : c, this.textOffsetY_ = u === void 0 ? 0 : u, this.textRotateWithView_ = d === void 0 ? !1 : d, this.textRotation_ = f === void 0 ? 0 : f, this.strokeKey_ = r ? (typeof r.strokeStyle == "string" ? r.strokeStyle : j(r.strokeStyle)) + r.lineCap + r.lineDashOffset + "|" + r.lineWidth + r.lineJoin + r.miterLimit + "[" + r.lineDash.join() + "]" : "", this.textKey_ = n.font + n.scale + (n.textAlign || "?") + (n.justify || "?") + (n.textBaseline || "?"), this.fillKey_ = s ? typeof s.fillStyle == "string" ? s.fillStyle : "|" + j(s.fillStyle) : "";
    }
    this.declutterImageWithText_ = e;
  }
}
const P_ = {
  Circle: Uh,
  Default: gs,
  Image: T_,
  LineString: R_,
  Polygon: Uh,
  Text: A_
};
class L_ {
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
      const o = P_[e];
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
const Xh = L_;
class O_ extends zl {
  constructor(t) {
    super(), this.ready = !0, this.boundHandleImageChange_ = this.handleImageChange_.bind(this), this.layer_ = t, this.declutterExecutorGroup = null;
  }
  getFeatures(t) {
    return B();
  }
  getData(t) {
    return null;
  }
  prepareFrame(t) {
    return B();
  }
  renderFrame(t, e) {
    return B();
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
    t.target.getState() === ft.LOADED && this.renderIfReadyAndVisible();
  }
  loadImage(t) {
    let e = t.getState();
    return e != ft.LOADED && e != ft.ERROR && t.addEventListener(z.CHANGE, this.boundHandleImageChange_), e == ft.IDLE && (t.load(), e = t.getState()), e == ft.LOADED;
  }
  renderIfReadyAndVisible() {
    const t = this.getLayer();
    t && t.getVisible() && t.getSourceState() === "ready" && t.changed();
  }
  disposeInternal() {
    delete this.layer_, super.disposeInternal();
  }
}
const F_ = O_, Yh = [];
let Vi = null;
function D_() {
  const i = document.createElement("canvas");
  i.width = 1, i.height = 1, Vi = i.getContext("2d");
}
class N_ extends F_ {
  constructor(t) {
    super(t), this.container = null, this.renderedResolution, this.tempTransform = he(), this.pixelTransform = he(), this.inversePixelTransform = he(), this.context = null, this.containerReused = !1, this.pixelContext_ = null, this.frameState = null;
  }
  getImageData(t, e, n) {
    Vi || D_(), Vi.clearRect(0, 0, 1, 1);
    let s;
    try {
      Vi.drawImage(t, e, n, 1, 1, 0, 0, 1, 1), s = Vi.getImageData(0, 0, 1, 1).data;
    } catch {
      return Vi = null, null;
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
    if (t && t.className === s && (!n || t && t.style.backgroundColor && ii(
      nr(t.style.backgroundColor),
      nr(n)
    ))) {
      const a = t.firstElementChild;
      a instanceof HTMLCanvasElement && (o = a.getContext("2d"));
    }
    if (o && o.canvas.style.transform === e ? (this.container = t, this.context = o, this.containerReused = !0) : this.containerReused && (this.container = null, this.context = null, this.containerReused = !1), !this.container) {
      r = document.createElement("div"), r.className = s;
      let a = r.style;
      a.position = "absolute", a.width = "100%", a.height = "100%", o = jt();
      const h = o.canvas;
      r.appendChild(h), a = h.style, a.position = "absolute", a.left = "0", a.transformOrigin = "top left", this.container = r, this.context = o;
    }
    !this.containerReused && n && !this.container.style.backgroundColor && (this.container.style.backgroundColor = n);
  }
  clipUnrotated(t, e, n) {
    const s = Pi(n), r = Or(n), o = Lr(n), a = Pr(n);
    yt(e.coordinateToPixelTransform, s), yt(e.coordinateToPixelTransform, r), yt(e.coordinateToPixelTransform, o), yt(e.coordinateToPixelTransform, a);
    const h = this.inversePixelTransform;
    yt(h, s), yt(h, r), yt(h, o), yt(h, a), t.save(), t.beginPath(), t.moveTo(Math.round(s[0]), Math.round(s[1])), t.lineTo(Math.round(r[0]), Math.round(r[1])), t.lineTo(Math.round(o[0]), Math.round(o[1])), t.lineTo(Math.round(a[0]), Math.round(a[1])), t.clip();
  }
  dispatchRenderEvent_(t, e, n) {
    const s = this.getLayer();
    if (s.hasListener(t)) {
      const r = new tc(
        t,
        this.inversePixelTransform,
        n,
        e
      );
      s.dispatchEvent(r);
    }
  }
  preRender(t, e) {
    this.frameState = e, this.dispatchRenderEvent_(Ke.PRERENDER, t, e);
  }
  postRender(t, e) {
    this.dispatchRenderEvent_(Ke.POSTRENDER, t, e);
  }
  getRenderTransform(t, e, n, s, r, o, a) {
    const h = r / 2, l = o / 2, c = s / e, u = -c, d = -t[0] + a, f = -t[1];
    return Je(
      this.tempTransform,
      h,
      l,
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
const Gc = N_;
function k_(i, t, e, n, s, r, o, a, h, l, c, u) {
  let d = i[t], f = i[t + 1], g = 0, _ = 0, m = 0, y = 0;
  function p() {
    g = d, _ = f, t += n, d = i[t], f = i[t + 1], y += m, m = Math.sqrt((d - g) * (d - g) + (f - _) * (f - _));
  }
  do
    p();
  while (t < e - n && y + m < r);
  let x = m === 0 ? 0 : (r - y) / m;
  const v = Ee(g, d, x), M = Ee(_, f, x), C = t - n, S = y, w = r + a * h(l, s, c);
  for (; t < e - n && y + m < w; )
    p();
  x = m === 0 ? 0 : (w - y) / m;
  const P = Ee(g, d, x), F = Ee(_, f, x);
  let G;
  if (u) {
    const O = [v, M, P, F];
    pa(O, 0, 4, 2, u, O, O), G = O[0] > O[2];
  } else
    G = v > P;
  const R = Math.PI, D = [], tt = C + n === t;
  t = C, m = 0, y = S, d = i[t], f = i[t + 1];
  let L;
  if (tt) {
    p(), L = Math.atan2(f - _, d - g), G && (L += L > 0 ? -R : R);
    const O = (P + v) / 2, I = (F + M) / 2;
    return D[0] = [O, I, (w - r) / 2, L, s], D;
  }
  s = s.replace(/\n/g, " ");
  for (let O = 0, I = s.length; O < I; ) {
    p();
    let X = Math.atan2(f - _, d - g);
    if (G && (X += X > 0 ? -R : R), L !== void 0) {
      let K = X - L;
      if (K += K > R ? -2 * R : K < -R ? 2 * R : 0, Math.abs(K) > o)
        return null;
    }
    L = X;
    const ct = O;
    let nt = 0;
    for (; O < I; ++O) {
      const K = G ? I - O - 1 : O, it = a * h(l, s[K], c);
      if (t + n < e && y + m < r + nt + it / 2)
        break;
      nt += it;
    }
    if (O === ct)
      continue;
    const gt = G ? s.substring(I - ct, I - O) : s.substring(ct, O);
    x = m === 0 ? 0 : (r + nt / 2 - y) / m;
    const T = Ee(g, d, x), kt = Ee(_, f, x);
    D.push([T, kt, nt / 2, X, gt]), r += nt;
  }
  return D;
}
const Bi = Wt(), Ne = [], pe = [], xe = [], ke = [];
function Vh(i) {
  return i[3].declutterBox;
}
const G_ = new RegExp(
  "[" + String.fromCharCode(1425) + "-" + String.fromCharCode(2303) + String.fromCharCode(64285) + "-" + String.fromCharCode(65023) + String.fromCharCode(65136) + "-" + String.fromCharCode(65276) + String.fromCharCode(67584) + "-" + String.fromCharCode(69631) + String.fromCharCode(124928) + "-" + String.fromCharCode(126975) + "]"
);
function qh(i, t) {
  return (t === "start" || t === "end") && !G_.test(i) && (t = t === "start" ? "left" : "right"), Bn[t];
}
function $_(i, t, e) {
  return e > 0 && i.push(`
`, ""), i.push(t, ""), i;
}
class z_ {
  constructor(t, e, n, s) {
    this.overlaps = n, this.pixelRatio = e, this.resolution = t, this.alignFill_, this.instructions = s.instructions, this.coordinates = s.coordinates, this.coordinateCache_ = {}, this.renderedTransform_ = he(), this.hitDetectionInstructions = s.hitDetectionInstructions, this.pixelCoordinates_ = null, this.viewRotation_ = 0, this.fillStates = s.fillStates || {}, this.strokeStates = s.strokeStates || {}, this.textStates = s.textStates || {}, this.widths_ = {}, this.labels_ = {};
  }
  createLabel(t, e, n, s) {
    const r = t + e + n + s;
    if (this.labels_[r])
      return this.labels_[r];
    const o = s ? this.strokeStates[s] : null, a = n ? this.fillStates[n] : null, h = this.textStates[e], l = this.pixelRatio, c = [
      h.scale[0] * l,
      h.scale[1] * l
    ], u = Array.isArray(t), d = h.justify ? Bn[h.justify] : qh(
      Array.isArray(t) ? t[0] : t,
      h.textAlign || Jn
    ), f = s && o.lineWidth ? o.lineWidth : 0, g = u ? t : t.split(`
`).reduce($_, []), { width: _, height: m, widths: y, heights: p, lineWidths: x } = Hd(
      h,
      g
    ), v = _ + f, M = [], C = (v + 2) * c[0], S = (m + f) * c[1], w = {
      width: C < 0 ? Math.floor(C) : Math.ceil(C),
      height: S < 0 ? Math.floor(S) : Math.ceil(S),
      contextInstructions: M
    };
    (c[0] != 1 || c[1] != 1) && M.push("scale", c), s && (M.push("strokeStyle", o.strokeStyle), M.push("lineWidth", f), M.push("lineCap", o.lineCap), M.push("lineJoin", o.lineJoin), M.push("miterLimit", o.miterLimit), M.push("setLineDash", [o.lineDash]), M.push("lineDashOffset", o.lineDashOffset)), n && M.push("fillStyle", a.fillStyle), M.push("textBaseline", "middle"), M.push("textAlign", "center");
    const P = 0.5 - d;
    let F = d * v + P * f;
    const G = [], R = [];
    let D = 0, tt = 0, L = 0, O = 0, I;
    for (let X = 0, ct = g.length; X < ct; X += 2) {
      const nt = g[X];
      if (nt === `
`) {
        tt += D, D = 0, F = d * v + P * f, ++O;
        continue;
      }
      const gt = g[X + 1] || h.font;
      gt !== I && (s && G.push("font", gt), n && R.push("font", gt), I = gt), D = Math.max(D, p[L]);
      const T = [
        nt,
        F + P * y[L] + d * (y[L] - x[O]),
        0.5 * (f + D) + tt
      ];
      F += y[L], s && G.push("strokeText", T), n && R.push("fillText", T), ++L;
    }
    return Array.prototype.push.apply(M, G), Array.prototype.push.apply(M, R), this.labels_[r] = w, w;
  }
  replayTextBackground_(t, e, n, s, r, o, a) {
    t.beginPath(), t.moveTo.apply(t, e), t.lineTo.apply(t, n), t.lineTo.apply(t, s), t.lineTo.apply(t, r), t.lineTo.apply(t, e), o && (this.alignFill_ = o[2], this.fill_(t)), a && (this.setStrokeStyle_(
      t,
      a
    ), t.stroke());
  }
  calculateImageOrLabelDimensions_(t, e, n, s, r, o, a, h, l, c, u, d, f, g, _, m) {
    a *= d[0], h *= d[1];
    let y = n - a, p = s - h;
    const x = r + l > t ? t - l : r, v = o + c > e ? e - c : o, M = g[3] + x * d[0] + g[1], C = g[0] + v * d[1] + g[2], S = y - g[3], w = p - g[0];
    (_ || u !== 0) && (Ne[0] = S, ke[0] = S, Ne[1] = w, pe[1] = w, pe[0] = S + M, xe[0] = pe[0], xe[1] = w + C, ke[1] = xe[1]);
    let P;
    return u !== 0 ? (P = Je(
      he(),
      n,
      s,
      1,
      1,
      u,
      -n,
      -s
    ), yt(P, Ne), yt(P, pe), yt(P, xe), yt(P, ke), ee(
      Math.min(Ne[0], pe[0], xe[0], ke[0]),
      Math.min(Ne[1], pe[1], xe[1], ke[1]),
      Math.max(Ne[0], pe[0], xe[0], ke[0]),
      Math.max(Ne[1], pe[1], xe[1], ke[1]),
      Bi
    )) : ee(
      Math.min(S, S + M),
      Math.min(w, w + C),
      Math.max(S, S + M),
      Math.max(w, w + C),
      Bi
    ), f && (y = Math.round(y), p = Math.round(p)), {
      drawImageX: y,
      drawImageY: p,
      drawImageW: x,
      drawImageH: v,
      originX: l,
      originY: c,
      declutterBox: {
        minX: Bi[0],
        minY: Bi[1],
        maxX: Bi[2],
        maxY: Bi[3],
        value: m
      },
      canvasTransform: P,
      scale: d
    };
  }
  replayImageOrLabel_(t, e, n, s, r, o, a) {
    const h = !!(o || a), l = s.declutterBox, c = t.canvas, u = a ? a[2] * s.scale[0] / 2 : 0;
    return l.minX - u <= c.width / e && l.maxX + u >= 0 && l.minY - u <= c.height / e && l.maxY + u >= 0 && (h && this.replayTextBackground_(
      t,
      Ne,
      pe,
      xe,
      ke,
      o,
      a
    ), Zd(
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
      const e = yt(this.renderedTransform_, [0, 0]), n = 512 * this.pixelRatio;
      t.save(), t.translate(e[0] % n, e[1] % n), t.rotate(this.viewRotation_);
    }
    t.fill(), this.alignFill_ && t.restore();
  }
  setStrokeStyle_(t, e) {
    t.strokeStyle = e[1], t.lineWidth = e[2], t.lineCap = e[3], t.lineJoin = e[4], t.miterLimit = e[5], t.lineDashOffset = e[7], t.setLineDash(e[6]);
  }
  drawLabelWithPointPlacement_(t, e, n, s) {
    const r = this.textStates[e], o = this.createLabel(t, e, s, n), a = this.strokeStates[n], h = this.pixelRatio, l = qh(
      Array.isArray(t) ? t[0] : t,
      r.textAlign || Jn
    ), c = Bn[r.textBaseline || hr], u = a && a.lineWidth ? a.lineWidth : 0, d = o.width / h - 2 * r.scale[0], f = l * d + 2 * (0.5 - l) * u, g = c * o.height / h + 2 * (0.5 - c) * u;
    return {
      label: o,
      anchorX: f,
      anchorY: g
    };
  }
  execute_(t, e, n, s, r, o, a, h) {
    let l;
    this.pixelCoordinates_ && ii(n, this.renderedTransform_) ? l = this.pixelCoordinates_ : (this.pixelCoordinates_ || (this.pixelCoordinates_ = []), l = mi(
      this.coordinates,
      0,
      this.coordinates.length,
      2,
      n,
      this.pixelCoordinates_
    ), md(this.renderedTransform_, n));
    let c = 0;
    const u = s.length;
    let d = 0, f, g, _, m, y, p, x, v, M, C, S, w, P = 0, F = 0, G = null, R = null;
    const D = this.coordinateCache_, tt = this.viewRotation_, L = Math.round(Math.atan2(-n[1], n[0]) * 1e12) / 1e12, O = {
      context: t,
      pixelRatio: this.pixelRatio,
      resolution: this.resolution,
      rotation: tt
    }, I = this.instructions != s || this.overlaps ? 0 : 200;
    let X, ct, nt, gt;
    for (; c < u; ) {
      const T = s[c];
      switch (T[0]) {
        case $.BEGIN_GEOMETRY:
          X = T[1], gt = T[3], X.getGeometry() ? a !== void 0 && !At(a, gt.getExtent()) ? c = T[2] + 1 : ++c : c = T[2];
          break;
        case $.BEGIN_PATH:
          P > I && (this.fill_(t), P = 0), F > I && (t.stroke(), F = 0), !P && !F && (t.beginPath(), m = NaN, y = NaN), ++c;
          break;
        case $.CIRCLE:
          d = T[1];
          const K = l[d], it = l[d + 1], Le = l[d + 2], ne = l[d + 3], Mt = Le - K, ge = ne - it, Oi = Math.sqrt(Mt * Mt + ge * ge);
          t.moveTo(K + Oi, it), t.arc(K, it, Oi, 0, 2 * Math.PI, !0), ++c;
          break;
        case $.CLOSE_PATH:
          t.closePath(), ++c;
          break;
        case $.CUSTOM:
          d = T[1], f = T[2];
          const Ms = T[3], Fi = T[4], Cs = T.length == 6 ? T[5] : void 0;
          O.geometry = Ms, O.feature = X, c in D || (D[c] = []);
          const Oe = D[c];
          Cs ? Cs(l, d, f, 2, Oe) : (Oe[0] = l[d], Oe[1] = l[d + 1], Oe.length = 2), Fi(Oe, O), ++c;
          break;
        case $.DRAW_IMAGE:
          d = T[1], f = T[2], v = T[3], g = T[4], _ = T[5];
          let Tn = T[6];
          const Fe = T[7], Es = T[8], Ss = T[9], Ts = T[10];
          let Di = T[11];
          const Ur = T[12];
          let Lt = T[13];
          const Ut = T[14], Ht = T[15];
          if (!v && T.length >= 20) {
            M = T[19], C = T[20], S = T[21], w = T[22];
            const Gt = this.drawLabelWithPointPlacement_(
              M,
              C,
              S,
              w
            );
            v = Gt.label, T[3] = v;
            const Gi = T[23];
            g = (Gt.anchorX - Gi) * this.pixelRatio, T[4] = g;
            const Xt = T[24];
            _ = (Gt.anchorY - Xt) * this.pixelRatio, T[5] = _, Tn = v.height, T[6] = Tn, Lt = v.width, T[13] = Lt;
          }
          let _e;
          T.length > 25 && (_e = T[25]);
          let Ni, ri, De;
          T.length > 17 ? (Ni = T[16], ri = T[17], De = T[18]) : (Ni = ui, ri = !1, De = !1), Ts && L ? Di += tt : !Ts && !L && (Di -= tt);
          let ki = 0;
          for (; d < f; d += 2) {
            if (_e && _e[ki++] < Lt / this.pixelRatio)
              continue;
            const Gt = this.calculateImageOrLabelDimensions_(
              v.width,
              v.height,
              l[d],
              l[d + 1],
              Lt,
              Tn,
              g,
              _,
              Es,
              Ss,
              Di,
              Ur,
              r,
              Ni,
              ri || De,
              X
            ), Gi = [
              t,
              e,
              v,
              Gt,
              Fe,
              ri ? G : null,
              De ? R : null
            ];
            if (h) {
              if (Ut === "none")
                continue;
              if (Ut === "obstacle") {
                h.insert(Gt.declutterBox);
                continue;
              } else {
                let Xt, me;
                if (Ht) {
                  const $t = f - d;
                  if (!Ht[$t]) {
                    Ht[$t] = Gi;
                    continue;
                  }
                  if (Xt = Ht[$t], delete Ht[$t], me = Vh(Xt), h.collides(me))
                    continue;
                }
                if (h.collides(Gt.declutterBox))
                  continue;
                Xt && (h.insert(me), this.replayImageOrLabel_.apply(this, Xt)), h.insert(Gt.declutterBox);
              }
            }
            this.replayImageOrLabel_.apply(this, Gi);
          }
          ++c;
          break;
        case $.DRAW_CHARS:
          const ws = T[1], Rt = T[2], Xr = T[3], Pu = T[4];
          w = T[5];
          const Lu = T[6], Ja = T[7], Qa = T[8];
          S = T[9];
          const Yr = T[10];
          M = T[11], C = T[12];
          const th = [
            T[13],
            T[13]
          ], Vr = this.textStates[C], wn = Vr.font, Rn = [
            Vr.scale[0] * Ja,
            Vr.scale[1] * Ja
          ];
          let bn;
          wn in this.widths_ ? bn = this.widths_[wn] : (bn = {}, this.widths_[wn] = bn);
          const eh = Ic(l, ws, Rt, 2), ih = Math.abs(Rn[0]) * Sh(wn, M, bn);
          if (Pu || ih <= eh) {
            const Gt = this.textStates[C].textAlign, Gi = (eh - ih) * Bn[Gt], Xt = k_(
              l,
              ws,
              Rt,
              2,
              M,
              Gi,
              Lu,
              Math.abs(Rn[0]),
              Sh,
              wn,
              bn,
              L ? 0 : this.viewRotation_
            );
            t:
              if (Xt) {
                const me = [];
                let $t, Rs, bs, Ot, Yt;
                if (S)
                  for ($t = 0, Rs = Xt.length; $t < Rs; ++$t) {
                    Yt = Xt[$t], bs = Yt[4], Ot = this.createLabel(bs, C, "", S), g = Yt[2] + (Rn[0] < 0 ? -Yr : Yr), _ = Xr * Ot.height + (0.5 - Xr) * 2 * Yr * Rn[1] / Rn[0] - Qa;
                    const ye = this.calculateImageOrLabelDimensions_(
                      Ot.width,
                      Ot.height,
                      Yt[0],
                      Yt[1],
                      Ot.width,
                      Ot.height,
                      g,
                      _,
                      0,
                      0,
                      Yt[3],
                      th,
                      !1,
                      ui,
                      !1,
                      X
                    );
                    if (h && h.collides(ye.declutterBox))
                      break t;
                    me.push([
                      t,
                      e,
                      Ot,
                      ye,
                      1,
                      null,
                      null
                    ]);
                  }
                if (w)
                  for ($t = 0, Rs = Xt.length; $t < Rs; ++$t) {
                    Yt = Xt[$t], bs = Yt[4], Ot = this.createLabel(bs, C, w, ""), g = Yt[2], _ = Xr * Ot.height - Qa;
                    const ye = this.calculateImageOrLabelDimensions_(
                      Ot.width,
                      Ot.height,
                      Yt[0],
                      Yt[1],
                      Ot.width,
                      Ot.height,
                      g,
                      _,
                      0,
                      0,
                      Yt[3],
                      th,
                      !1,
                      ui,
                      !1,
                      X
                    );
                    if (h && h.collides(ye.declutterBox))
                      break t;
                    me.push([
                      t,
                      e,
                      Ot,
                      ye,
                      1,
                      null,
                      null
                    ]);
                  }
                h && h.load(me.map(Vh));
                for (let ye = 0, Ou = me.length; ye < Ou; ++ye)
                  this.replayImageOrLabel_.apply(this, me[ye]);
              }
          }
          ++c;
          break;
        case $.END_GEOMETRY:
          if (o !== void 0) {
            X = T[1];
            const Gt = o(X, gt);
            if (Gt)
              return Gt;
          }
          ++c;
          break;
        case $.FILL:
          I ? P++ : this.fill_(t), ++c;
          break;
        case $.MOVE_TO_LINE_TO:
          for (d = T[1], f = T[2], ct = l[d], nt = l[d + 1], p = ct + 0.5 | 0, x = nt + 0.5 | 0, (p !== m || x !== y) && (t.moveTo(ct, nt), m = p, y = x), d += 2; d < f; d += 2)
            ct = l[d], nt = l[d + 1], p = ct + 0.5 | 0, x = nt + 0.5 | 0, (d == f - 2 || p !== m || x !== y) && (t.lineTo(ct, nt), m = p, y = x);
          ++c;
          break;
        case $.SET_FILL_STYLE:
          G = T, this.alignFill_ = T[2], P && (this.fill_(t), P = 0, F && (t.stroke(), F = 0)), t.fillStyle = T[1], ++c;
          break;
        case $.SET_STROKE_STYLE:
          R = T, F && (t.stroke(), F = 0), this.setStrokeStyle_(t, T), ++c;
          break;
        case $.STROKE:
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
const B_ = z_, ho = ["Polygon", "Circle", "LineString", "Image", "Text", "Default"];
class W_ {
  constructor(t, e, n, s, r, o) {
    this.maxExtent_ = t, this.overlaps_ = s, this.pixelRatio_ = n, this.resolution_ = e, this.renderBuffer_ = o, this.executorsByZIndex_ = {}, this.hitDetectionContext_ = null, this.hitDetectionTransform_ = he(), this.createExecutors_(r);
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
        n[r] = new B_(
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
    const a = s * 2 + 1, h = Je(
      this.hitDetectionTransform_,
      s + 0.5,
      s + 0.5,
      1 / e,
      -1 / e,
      -n,
      -t[0],
      -t[1]
    ), l = !this.hitDetectionContext_;
    l && (this.hitDetectionContext_ = jt(
      a,
      a
    ));
    const c = this.hitDetectionContext_;
    c.canvas.width !== a || c.canvas.height !== a ? (c.canvas.width = a, c.canvas.height = a) : l || c.clearRect(0, 0, a, a);
    let u;
    this.renderBuffer_ !== void 0 && (u = Wt(), $n(u, t), Ir(
      u,
      e * (this.renderBuffer_ + s),
      u
    ));
    const d = j_(s);
    let f;
    function g(M, C) {
      const S = c.getImageData(
        0,
        0,
        a,
        a
      ).data;
      for (let w = 0, P = d.length; w < P; w++)
        if (S[d[w]] > 0) {
          if (!o || f !== "Image" && f !== "Text" || o.includes(M)) {
            const F = (d[w] - 3) / 4, G = s - F % a, R = s - (F / a | 0), D = r(M, C, G * G + R * R);
            if (D)
              return D;
          }
          c.clearRect(0, 0, a, a);
          break;
        }
    }
    const _ = Object.keys(this.executorsByZIndex_).map(Number);
    _.sort(pi);
    let m, y, p, x, v;
    for (m = _.length - 1; m >= 0; --m) {
      const M = _[m].toString();
      for (p = this.executorsByZIndex_[M], y = ho.length - 1; y >= 0; --y)
        if (f = ho[y], x = p[f], x !== void 0 && (v = x.executeHitDetection(
          c,
          h,
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
    return mi(a, 0, 8, 2, t, a), a;
  }
  isEmpty() {
    return gn(this.executorsByZIndex_);
  }
  execute(t, e, n, s, r, o, a) {
    const h = Object.keys(this.executorsByZIndex_).map(Number);
    h.sort(pi), this.maxExtent_ && (t.save(), this.clip(t, n)), o = o || ho;
    let l, c, u, d, f, g;
    for (a && h.reverse(), l = 0, c = h.length; l < c; ++l) {
      const _ = h[l].toString();
      for (f = this.executorsByZIndex_[_], u = 0, d = o.length; u < d; ++u) {
        const m = o[u];
        g = f[m], g !== void 0 && g.execute(
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
const lo = {};
function j_(i) {
  if (lo[i] !== void 0)
    return lo[i];
  const t = i * 2 + 1, e = i * i, n = new Array(e + 1);
  for (let r = 0; r <= i; ++r)
    for (let o = 0; o <= i; ++o) {
      const a = r * r + o * o;
      if (a > e)
        break;
      let h = n[a];
      h || (h = [], n[a] = h), h.push(((i + r) * t + (i + o)) * 4 + 3), r > 0 && h.push(((i - r) * t + (i + o)) * 4 + 3), o > 0 && (h.push(((i + r) * t + (i - o)) * 4 + 3), r > 0 && h.push(((i - r) * t + (i - o)) * 4 + 3));
    }
  const s = [];
  for (let r = 0, o = n.length; r < o; ++r)
    n[r] && s.push(...n[r]);
  return lo[i] = s, s;
}
const Kh = W_;
class U_ extends kc {
  constructor(t, e, n, s, r, o, a) {
    super(), this.context_ = t, this.pixelRatio_ = e, this.extent_ = n, this.transform_ = s, this.viewRotation_ = r, this.squaredTolerance_ = o, this.userTransform_ = a, this.contextFillState_ = null, this.contextStrokeState_ = null, this.contextTextState_ = null, this.fillState_ = null, this.strokeState_ = null, this.image_ = null, this.imageAnchorX_ = 0, this.imageAnchorY_ = 0, this.imageHeight_ = 0, this.imageOpacity_ = 0, this.imageOriginX_ = 0, this.imageOriginY_ = 0, this.imageRotateWithView_ = !1, this.imageRotation_ = 0, this.imageScale_ = [0, 0], this.imageWidth_ = 0, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = !1, this.textRotation_ = 0, this.textScale_ = [0, 0], this.textFillState_ = null, this.textStrokeState_ = null, this.textState_ = null, this.pixelCoordinates_ = [], this.tmpLocalTransform_ = he();
  }
  drawImages_(t, e, n, s) {
    if (!this.image_)
      return;
    const r = mi(
      t,
      e,
      n,
      s,
      this.transform_,
      this.pixelCoordinates_
    ), o = this.context_, a = this.tmpLocalTransform_, h = o.globalAlpha;
    this.imageOpacity_ != 1 && (o.globalAlpha = h * this.imageOpacity_);
    let l = this.imageRotation_;
    this.imageRotateWithView_ && (l += this.viewRotation_);
    for (let c = 0, u = r.length; c < u; c += 2) {
      const d = r[c] - this.imageAnchorX_, f = r[c + 1] - this.imageAnchorY_;
      if (l !== 0 || this.imageScale_[0] != 1 || this.imageScale_[1] != 1) {
        const g = d + this.imageAnchorX_, _ = f + this.imageAnchorY_;
        Je(
          a,
          g,
          _,
          1,
          1,
          l,
          -g,
          -_
        ), o.setTransform.apply(o, a), o.translate(g, _), o.scale(this.imageScale_[0], this.imageScale_[1]), o.drawImage(
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
    this.imageOpacity_ != 1 && (o.globalAlpha = h);
  }
  drawText_(t, e, n, s) {
    if (!this.textState_ || this.text_ === "")
      return;
    this.textFillState_ && this.setContextFillState_(this.textFillState_), this.textStrokeState_ && this.setContextStrokeState_(this.textStrokeState_), this.setContextTextState_(this.textState_);
    const r = mi(
      t,
      e,
      n,
      s,
      this.transform_,
      this.pixelCoordinates_
    ), o = this.context_;
    let a = this.textRotation_;
    for (this.textRotateWithView_ && (a += this.viewRotation_); e < n; e += s) {
      const h = r[e] + this.textOffsetX_, l = r[e + 1] + this.textOffsetY_;
      a !== 0 || this.textScale_[0] != 1 || this.textScale_[1] != 1 ? (o.translate(h - this.textOffsetX_, l - this.textOffsetY_), o.rotate(a), o.translate(this.textOffsetX_, this.textOffsetY_), o.scale(this.textScale_[0], this.textScale_[1]), this.textStrokeState_ && o.strokeText(this.text_, 0, 0), this.textFillState_ && o.fillText(this.text_, 0, 0), o.setTransform(1, 0, 0, 1, 0, 0)) : (this.textStrokeState_ && o.strokeText(this.text_, h, l), this.textFillState_ && o.fillText(this.text_, h, l));
    }
  }
  moveToLineTo_(t, e, n, s, r) {
    const o = this.context_, a = mi(
      t,
      e,
      n,
      s,
      this.transform_,
      this.pixelCoordinates_
    );
    o.moveTo(a[0], a[1]);
    let h = a.length;
    r && (h -= 2);
    for (let l = 2; l < h; l += 2)
      o.lineTo(a[l], a[l + 1]);
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
    if (!!At(this.extent_, t.getExtent())) {
      if (this.fillState_ || this.strokeState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const e = Bf(
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
    !n || !At(this.extent_, n.getExtent()) || (this.setStyle(e), this.drawGeometry(n));
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
    )), !!At(this.extent_, t.getExtent())) {
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
    if (!!At(this.extent_, e)) {
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        const n = this.context_, s = t.getFlatCoordinates();
        let r = 0;
        const o = t.getEnds(), a = t.getStride();
        n.beginPath();
        for (let h = 0, l = o.length; h < l; ++h)
          r = this.moveToLineTo_(
            s,
            r,
            o[h],
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
    )), !!At(this.extent_, t.getExtent())) {
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
    )), !!At(this.extent_, t.getExtent())) {
      if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const e = this.context_, n = t.getOrientedFlatCoordinates();
        let s = 0;
        const r = t.getEndss(), o = t.getStride();
        e.beginPath();
        for (let a = 0, h = r.length; a < h; ++a) {
          const l = r[a];
          s = this.drawRings_(n, s, l, o);
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
    n ? (n.lineCap != t.lineCap && (n.lineCap = t.lineCap, e.lineCap = t.lineCap), ii(n.lineDash, t.lineDash) || e.setLineDash(
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
    const e = this.context_, n = this.contextTextState_, s = t.textAlign ? t.textAlign : Jn;
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
        fillStyle: re(
          n || be
        )
      };
    }
    if (!e)
      this.strokeState_ = null;
    else {
      const n = e.getColor(), s = e.getLineCap(), r = e.getLineDash(), o = e.getLineDashOffset(), a = e.getLineJoin(), h = e.getWidth(), l = e.getMiterLimit(), c = r || qn;
      this.strokeState_ = {
        lineCap: s !== void 0 ? s : ar,
        lineDash: this.pixelRatio_ === 1 ? c : c.map((u) => u * this.pixelRatio_),
        lineDashOffset: (o || Kn) * this.pixelRatio_,
        lineJoin: a !== void 0 ? a : _n,
        lineWidth: (h !== void 0 ? h : Qn) * this.pixelRatio_,
        miterLimit: l !== void 0 ? l : Hn,
        strokeStyle: re(
          n || Zn
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
          fillStyle: re(
            f || be
          )
        };
      }
      const n = t.getStroke();
      if (!n)
        this.textStrokeState_ = null;
      else {
        const f = n.getColor(), g = n.getLineCap(), _ = n.getLineDash(), m = n.getLineDashOffset(), y = n.getLineJoin(), p = n.getWidth(), x = n.getMiterLimit();
        this.textStrokeState_ = {
          lineCap: g !== void 0 ? g : ar,
          lineDash: _ || qn,
          lineDashOffset: m || Kn,
          lineJoin: y !== void 0 ? y : _n,
          lineWidth: p !== void 0 ? p : Qn,
          miterLimit: x !== void 0 ? x : Hn,
          strokeStyle: re(
            f || Zn
          )
        };
      }
      const s = t.getFont(), r = t.getOffsetX(), o = t.getOffsetY(), a = t.getRotateWithView(), h = t.getRotation(), l = t.getScaleArray(), c = t.getText(), u = t.getTextAlign(), d = t.getTextBaseline();
      this.textState_ = {
        font: s !== void 0 ? s : nc,
        textAlign: u !== void 0 ? u : Jn,
        textBaseline: d !== void 0 ? d : hr
      }, this.text_ = c !== void 0 ? Array.isArray(c) ? c.reduce((f, g, _) => f += _ % 2 ? " " : g, "") : c : "", this.textOffsetX_ = r !== void 0 ? this.pixelRatio_ * r : 0, this.textOffsetY_ = o !== void 0 ? this.pixelRatio_ * o : 0, this.textRotateWithView_ = a !== void 0 ? a : !1, this.textRotation_ = h !== void 0 ? h : 0, this.textScale_ = [
        this.pixelRatio_ * l[0],
        this.pixelRatio_ * l[1]
      ];
    }
  }
}
const X_ = U_, se = 0.5;
function Y_(i, t, e, n, s, r, o) {
  const a = i[0] * se, h = i[1] * se, l = jt(a, h);
  l.imageSmoothingEnabled = !1;
  const c = l.canvas, u = new X_(
    l,
    se,
    s,
    null,
    o
  ), d = e.length, f = Math.floor((256 * 256 * 256 - 1) / d), g = {};
  for (let m = 1; m <= d; ++m) {
    const y = e[m - 1], p = y.getStyleFunction() || n;
    if (!n)
      continue;
    let x = p(y, r);
    if (!x)
      continue;
    Array.isArray(x) || (x = [x]);
    const M = "#" + ("000000" + (m * f).toString(16)).slice(-6);
    for (let C = 0, S = x.length; C < S; ++C) {
      const w = x[C], P = w.getGeometryFunction()(y);
      if (!P || !At(s, P.getExtent()))
        continue;
      const F = w.clone(), G = F.getFill();
      G && G.setColor(M);
      const R = F.getStroke();
      R && (R.setColor(M), R.setLineDash(null)), F.setText(void 0);
      const D = w.getImage();
      if (D && D.getOpacity() !== 0) {
        const O = D.getImageSize();
        if (!O)
          continue;
        const I = jt(
          O[0],
          O[1],
          void 0,
          { alpha: !1 }
        ), X = I.canvas;
        I.fillStyle = M, I.fillRect(0, 0, X.width, X.height), F.setImage(
          new Nc({
            img: X,
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
      const tt = F.getZIndex() || 0;
      let L = g[tt];
      L || (L = {}, g[tt] = L, L.Polygon = [], L.Circle = [], L.LineString = [], L.Point = []), L[P.getType().replace("Multi", "")].push(
        P,
        F
      );
    }
  }
  const _ = Object.keys(g).map(Number).sort(pi);
  for (let m = 0, y = _.length; m < y; ++m) {
    const p = g[_[m]];
    for (const x in p) {
      const v = p[x];
      for (let M = 0, C = v.length; M < C; M += 2) {
        u.setStyle(v[M + 1]);
        for (let S = 0, w = t.length; S < w; ++S)
          u.setTransform(t[S]), u.drawGeometry(v[M]);
      }
    }
  }
  return l.getImageData(0, 0, c.width, c.height);
}
function V_(i, t, e) {
  const n = [];
  if (e) {
    const s = Math.floor(Math.round(i[0]) * se), r = Math.floor(Math.round(i[1]) * se), o = (dt(s, 0, e.width - 1) + dt(r, 0, e.height - 1) * e.width) * 4, a = e.data[o], h = e.data[o + 1], c = e.data[o + 2] + 256 * (h + 256 * a), u = Math.floor((256 * 256 * 256 - 1) / t.length);
    c && c % u === 0 && n.push(t[c / u - 1]);
  }
  return n;
}
const q_ = 0.5, $c = {
  Point: n0,
  LineString: t0,
  Polygon: r0,
  MultiPoint: s0,
  MultiLineString: e0,
  MultiPolygon: i0,
  GeometryCollection: Q_,
  Circle: Z_
};
function K_(i, t) {
  return parseInt(j(i), 10) - parseInt(j(t), 10);
}
function H_(i, t) {
  const e = Go(i, t);
  return e * e;
}
function Go(i, t) {
  return q_ * i / t;
}
function Z_(i, t, e, n, s) {
  const r = e.getFill(), o = e.getStroke();
  if (r || o) {
    const h = i.getBuilder(e.getZIndex(), "Circle");
    h.setFillStrokeStyle(r, o), h.drawCircle(t, n);
  }
  const a = e.getText();
  if (a && a.getText()) {
    const h = (s || i).getBuilder(
      e.getZIndex(),
      "Text"
    );
    h.setTextStyle(a), h.drawText(t, n);
  }
}
function Hh(i, t, e, n, s, r, o) {
  let a = !1;
  const h = e.getImage();
  if (h) {
    const l = h.getImageState();
    l == ft.LOADED || l == ft.ERROR ? h.unlistenImageChange(s) : (l == ft.IDLE && h.load(), h.listenImageChange(s), a = !0);
  }
  return J_(
    i,
    t,
    e,
    n,
    r,
    o
  ), a;
}
function J_(i, t, e, n, s, r) {
  const o = e.getGeometryFunction()(t);
  if (!o)
    return;
  const a = o.simplifyTransformed(
    n,
    s
  );
  if (e.getRenderer())
    zc(i, a, e, t);
  else {
    const l = $c[a.getType()];
    l(
      i,
      a,
      e,
      t,
      r
    );
  }
}
function zc(i, t, e, n) {
  if (t.getType() == "GeometryCollection") {
    const r = t.getGeometries();
    for (let o = 0, a = r.length; o < a; ++o)
      zc(i, r[o], e, n);
    return;
  }
  i.getBuilder(e.getZIndex(), "Default").drawCustom(
    t,
    n,
    e.getRenderer(),
    e.getHitDetectionRenderer()
  );
}
function Q_(i, t, e, n, s) {
  const r = t.getGeometriesArray();
  let o, a;
  for (o = 0, a = r.length; o < a; ++o) {
    const h = $c[r[o].getType()];
    h(
      i,
      r[o],
      e,
      n,
      s
    );
  }
}
function t0(i, t, e, n, s) {
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
function e0(i, t, e, n, s) {
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
function i0(i, t, e, n, s) {
  const r = e.getFill(), o = e.getStroke();
  if (o || r) {
    const h = i.getBuilder(e.getZIndex(), "Polygon");
    h.setFillStrokeStyle(r, o), h.drawMultiPolygon(t, n);
  }
  const a = e.getText();
  if (a && a.getText()) {
    const h = (s || i).getBuilder(
      e.getZIndex(),
      "Text"
    );
    h.setTextStyle(a), h.drawText(t, n);
  }
}
function n0(i, t, e, n, s) {
  const r = e.getImage(), o = e.getText();
  let a;
  if (r) {
    if (r.getImageState() != ft.LOADED)
      return;
    let h = i;
    if (s) {
      const c = r.getDeclutterMode();
      if (c !== "none")
        if (h = s, c === "obstacle") {
          const u = i.getBuilder(
            e.getZIndex(),
            "Image"
          );
          u.setImageStyle(r, a), u.drawPoint(t, n);
        } else
          o && o.getText() && (a = {});
    }
    const l = h.getBuilder(
      e.getZIndex(),
      "Image"
    );
    l.setImageStyle(r, a), l.drawPoint(t, n);
  }
  if (o && o.getText()) {
    let h = i;
    s && (h = s);
    const l = h.getBuilder(e.getZIndex(), "Text");
    l.setTextStyle(o, a), l.drawText(t, n);
  }
}
function s0(i, t, e, n, s) {
  const r = e.getImage(), o = e.getText();
  let a;
  if (r) {
    if (r.getImageState() != ft.LOADED)
      return;
    let h = i;
    if (s) {
      const c = r.getDeclutterMode();
      if (c !== "none")
        if (h = s, c === "obstacle") {
          const u = i.getBuilder(
            e.getZIndex(),
            "Image"
          );
          u.setImageStyle(r, a), u.drawMultiPoint(t, n);
        } else
          o && o.getText() && (a = {});
    }
    const l = h.getBuilder(
      e.getZIndex(),
      "Image"
    );
    l.setImageStyle(r, a), l.drawMultiPoint(t, n);
  }
  if (o && o.getText()) {
    let h = i;
    s && (h = s);
    const l = h.getBuilder(e.getZIndex(), "Text");
    l.setTextStyle(o, a), l.drawText(t, n);
  }
}
function r0(i, t, e, n, s) {
  const r = e.getFill(), o = e.getStroke();
  if (r || o) {
    const h = i.getBuilder(e.getZIndex(), "Polygon");
    h.setFillStrokeStyle(r, o), h.drawPolygon(t, n);
  }
  const a = e.getText();
  if (a && a.getText()) {
    const h = (s || i).getBuilder(
      e.getZIndex(),
      "Text"
    );
    h.setTextStyle(a), h.drawText(t, n);
  }
}
class o0 extends Gc {
  constructor(t) {
    super(t), this.boundHandleStyleImageChange_ = this.handleStyleImageChange_.bind(this), this.animatingOrInteracting_, this.hitDetectionImageData_ = null, this.renderedFeatures_ = null, this.renderedRevision_ = -1, this.renderedResolution_ = NaN, this.renderedExtent_ = Wt(), this.wrappedRenderedExtent_ = Wt(), this.renderedRotation_, this.renderedCenter_ = null, this.renderedProjection_ = null, this.renderedRenderOrder_ = null, this.replayGroup_ = null, this.replayGroupChanged = !0, this.declutterExecutorGroup = null, this.clipping = !0, this.compositionContext_ = null, this.opacity_ = 1;
  }
  renderWorlds(t, e, n) {
    const s = e.extent, r = e.viewState, o = r.center, a = r.resolution, h = r.projection, l = r.rotation, c = h.getExtent(), u = this.getLayer().getSource(), d = e.pixelRatio, f = e.viewHints, g = !(f[St.ANIMATING] || f[St.INTERACTING]), _ = this.compositionContext_, m = Math.round(e.size[0] * d), y = Math.round(e.size[1] * d), p = u.getWrapX() && h.canWrapX(), x = p ? ot(c) : null, v = p ? Math.ceil((s[2] - c[2]) / x) + 1 : 1;
    let M = p ? Math.floor((s[0] - c[0]) / x) : 0;
    do {
      const C = this.getRenderTransform(
        o,
        a,
        l,
        d,
        m,
        y,
        M * x
      );
      t.execute(
        _,
        1,
        C,
        l,
        g,
        void 0,
        n
      );
    } while (++M < v);
  }
  setupCompositionContext_() {
    if (this.opacity_ !== 1) {
      const t = jt(
        this.context.canvas.width,
        this.context.canvas.height,
        Yh
      );
      this.compositionContext_ = t;
    } else
      this.compositionContext_ = this.context;
  }
  releaseCompositionContext_() {
    if (this.opacity_ !== 1) {
      const t = this.context.globalAlpha;
      this.context.globalAlpha = this.opacity_, this.context.drawImage(this.compositionContext_.canvas, 0, 0), this.context.globalAlpha = t, ic(this.compositionContext_), Yh.push(this.compositionContext_.canvas), this.compositionContext_ = null;
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
    yd(this.pixelTransform, 1 / n, 1 / n), ea(this.inversePixelTransform, this.pixelTransform);
    const r = Ul(this.pixelTransform);
    this.useContainer(e, r, this.getBackground(t));
    const o = this.context, a = o.canvas, h = this.replayGroup_, l = this.declutterExecutorGroup;
    if ((!h || h.isEmpty()) && (!l || l.isEmpty()))
      return null;
    const c = Math.round(t.size[0] * n), u = Math.round(t.size[1] * n);
    a.width != c || a.height != u ? (a.width = c, a.height = u, a.style.transform !== r && (a.style.transform = r)) : this.containerReused || o.clearRect(0, 0, c, u), this.preRender(o, t);
    const d = t.viewState;
    d.projection, this.opacity_ = s.opacity, this.setupCompositionContext_();
    let f = !1, g = !0;
    if (s.extent && this.clipping) {
      const _ = Ue(s.extent);
      g = At(_, t.extent), f = g && !ci(_, t.extent), f && this.clipUnrotated(this.compositionContext_, t, _);
    }
    return g && this.renderWorlds(h, t), f && this.compositionContext_.restore(), this.releaseCompositionContext_(), this.postRender(o, t), this.renderedRotation_ !== d.rotation && (this.renderedRotation_ = d.rotation, this.hitDetectionImageData_ = null), this.container;
  }
  getFeatures(t) {
    return new Promise(
      function(e) {
        if (!this.hitDetectionImageData_ && !this.animatingOrInteracting_) {
          const n = [this.context.canvas.width, this.context.canvas.height];
          yt(this.pixelTransform, n);
          const s = this.renderedCenter_, r = this.renderedResolution_, o = this.renderedRotation_, a = this.renderedProjection_, h = this.wrappedRenderedExtent_, l = this.getLayer(), c = [], u = n[0] * se, d = n[1] * se;
          c.push(
            this.getRenderTransform(
              s,
              r,
              o,
              se,
              u,
              d,
              0
            ).slice()
          );
          const f = l.getSource(), g = a.getExtent();
          if (f.getWrapX() && a.canWrapX() && !ci(g, h)) {
            let _ = h[0];
            const m = ot(g);
            let y = 0, p;
            for (; _ < g[0]; )
              --y, p = m * y, c.push(
                this.getRenderTransform(
                  s,
                  r,
                  o,
                  se,
                  u,
                  d,
                  p
                ).slice()
              ), _ += m;
            for (y = 0, _ = h[2]; _ > g[2]; )
              ++y, p = m * y, c.push(
                this.getRenderTransform(
                  s,
                  r,
                  o,
                  se,
                  u,
                  d,
                  p
                ).slice()
              ), _ -= m;
          }
          this.hitDetectionImageData_ = Y_(
            n,
            c,
            this.renderedFeatures_,
            l.getStyleFunction(),
            h,
            r,
            o
          );
        }
        e(
          V_(t, this.renderedFeatures_, this.hitDetectionImageData_)
        );
      }.bind(this)
    );
  }
  forEachFeatureAtCoordinate(t, e, n, s, r) {
    if (!this.replayGroup_)
      return;
    const o = e.viewState.resolution, a = e.viewState.rotation, h = this.getLayer(), l = {}, c = function(f, g, _) {
      const m = j(f), y = l[m];
      if (y) {
        if (y !== !0 && _ < y.distanceSq) {
          if (_ === 0)
            return l[m] = !0, r.splice(r.lastIndexOf(y), 1), s(f, h, g);
          y.geometry = g, y.distanceSq = _;
        }
      } else {
        if (_ === 0)
          return l[m] = !0, s(f, h, g);
        r.push(
          l[m] = {
            feature: f,
            layer: h,
            geometry: g,
            distanceSq: _,
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
    const s = t.viewHints[St.ANIMATING], r = t.viewHints[St.INTERACTING], o = e.getUpdateWhileAnimating(), a = e.getUpdateWhileInteracting();
    if (this.ready && !o && s || !a && r)
      return this.animatingOrInteracting_ = !0, !0;
    this.animatingOrInteracting_ = !1;
    const h = t.extent, l = t.viewState, c = l.projection, u = l.resolution, d = t.pixelRatio, f = e.getRevision(), g = e.getRenderBuffer();
    let _ = e.getRenderOrder();
    _ === void 0 && (_ = K_);
    const m = l.center.slice(), y = Ir(
      h,
      g * u
    ), p = y.slice(), x = [y.slice()], v = c.getExtent();
    if (n.getWrapX() && c.canWrapX() && !ci(v, t.extent)) {
      const L = ot(v), O = Math.max(ot(y) / 2, L);
      y[0] = v[0] - O, y[2] = v[2] + O, Ql(m, c);
      const I = Kl(x[0], c);
      I[0] < v[0] && I[2] < v[2] ? x.push([
        I[0] + L,
        I[1],
        I[2] + L,
        I[3]
      ]) : I[0] > v[0] && I[2] > v[2] && x.push([
        I[0] - L,
        I[1],
        I[2] - L,
        I[3]
      ]);
    }
    if (this.ready && this.renderedResolution_ == u && this.renderedRevision_ == f && this.renderedRenderOrder_ == _ && ci(this.wrappedRenderedExtent_, y))
      return ii(this.renderedExtent_, p) || (this.hitDetectionImageData_ = null, this.renderedExtent_ = p), this.renderedCenter_ = m, this.replayGroupChanged = !1, !0;
    this.replayGroup_ = null;
    const M = new Xh(
      Go(u, d),
      y,
      u,
      d
    );
    let C;
    this.getLayer().getDeclutter() && (C = new Xh(
      Go(u, d),
      y,
      u,
      d
    ));
    let S;
    for (let L = 0, O = x.length; L < O; ++L)
      n.loadFeatures(x[L], u, c);
    const w = H_(u, d);
    let P = !0;
    const F = function(L) {
      let O;
      const I = L.getStyleFunction() || e.getStyleFunction();
      if (I && (O = I(L, u)), O) {
        const X = this.renderFeature(
          L,
          w,
          O,
          M,
          S,
          C
        );
        P = P && !X;
      }
    }.bind(this), G = ga(y), R = n.getFeaturesInExtent(G);
    _ && R.sort(_);
    for (let L = 0, O = R.length; L < O; ++L)
      F(R[L]);
    this.renderedFeatures_ = R, this.ready = P;
    const D = M.finish(), tt = new Kh(
      y,
      u,
      d,
      n.getOverlaps(),
      D,
      e.getRenderBuffer()
    );
    return C && (this.declutterExecutorGroup = new Kh(
      y,
      u,
      d,
      n.getOverlaps(),
      C.finish(),
      e.getRenderBuffer()
    )), this.renderedResolution_ = u, this.renderedRevision_ = f, this.renderedRenderOrder_ = _, this.renderedExtent_ = p, this.wrappedRenderedExtent_ = y, this.renderedCenter_ = m, this.renderedProjection_ = c, this.replayGroup_ = tt, this.hitDetectionImageData_ = null, this.replayGroupChanged = !0, !0;
  }
  renderFeature(t, e, n, s, r, o) {
    if (!n)
      return !1;
    let a = !1;
    if (Array.isArray(n))
      for (let h = 0, l = n.length; h < l; ++h)
        a = Hh(
          s,
          t,
          n[h],
          e,
          this.boundHandleStyleImageChange_,
          r,
          o
        ) || a;
    else
      a = Hh(
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
const a0 = o0;
class h0 extends M_ {
  constructor(t) {
    super(t);
  }
  createRenderer() {
    return new a0(this);
  }
}
const Si = h0;
class l0 {
  constructor(t) {
    this.rbush_ = new Fc(t), this.items_ = {};
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
      const o = t[s], a = e[s], h = {
        minX: o[0],
        minY: o[1],
        maxX: o[2],
        maxY: o[3],
        value: a
      };
      n[s] = h, this.items_[j(a)] = h;
    }
    this.rbush_.load(n);
  }
  remove(t) {
    const e = j(t), n = this.items_[e];
    return delete this.items_[e], this.rbush_.remove(n) !== null;
  }
  update(t, e) {
    const n = this.items_[j(e)], s = [n.minX, n.minY, n.maxX, n.maxY];
    Vn(s, t) || (this.remove(e), this.insert(t, e));
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
    return gn(this.items_);
  }
  clear() {
    this.rbush_.clear(), this.items_ = {};
  }
  getExtent(t) {
    const e = this.rbush_.toJSON();
    return ee(e.minX, e.minY, e.maxX, e.maxY, t);
  }
  concat(t) {
    this.rbush_.load(t.rbush_.all());
    for (const e in t.items_)
      this.items_[e] = t.items_[e];
  }
}
const yr = l0;
class c0 extends ie {
  constructor(t) {
    super(), this.projection = st(t.projection), this.attributions_ = Zh(t.attributions), this.attributionsCollapsible_ = t.attributionsCollapsible !== void 0 ? t.attributionsCollapsible : !0, this.loading = !1, this.state_ = t.state !== void 0 ? t.state : "ready", this.wrapX_ = t.wrapX !== void 0 ? t.wrapX : !1, this.interpolate_ = !!t.interpolate, this.viewResolver = null, this.viewRejector = null;
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
    return B();
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
    this.attributions_ = Zh(t), this.changed();
  }
  setState(t) {
    this.state_ = t, this.changed();
  }
}
function Zh(i) {
  return i ? Array.isArray(i) ? function(t) {
    return i;
  } : typeof i == "function" ? i : function(t) {
    return [i];
  } : null;
}
const Bc = c0, bt = {
  ADDFEATURE: "addfeature",
  CHANGEFEATURE: "changefeature",
  CLEAR: "clear",
  REMOVEFEATURE: "removefeature",
  FEATURESLOADSTART: "featuresloadstart",
  FEATURESLOADEND: "featuresloadend",
  FEATURESLOADERROR: "featuresloaderror"
};
function u0(i, t) {
  return [[-1 / 0, -1 / 0, 1 / 0, 1 / 0]];
}
let d0 = !1;
function f0(i, t, e, n, s, r, o) {
  const a = new XMLHttpRequest();
  a.open(
    "GET",
    typeof i == "function" ? i(e, n, s) : i,
    !0
  ), t.getType() == "arraybuffer" && (a.responseType = "arraybuffer"), a.withCredentials = d0, a.onload = function(h) {
    if (!a.status || a.status >= 200 && a.status < 300) {
      const l = t.getType();
      let c;
      l == "json" || l == "text" ? c = a.responseText : l == "xml" ? (c = a.responseXML, c || (c = new DOMParser().parseFromString(
        a.responseText,
        "application/xml"
      ))) : l == "arraybuffer" && (c = a.response), c ? r(
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
function Jh(i, t) {
  return function(e, n, s, r, o) {
    const a = this;
    f0(
      i,
      t,
      e,
      n,
      s,
      function(h, l) {
        a.addFeatures(h), r !== void 0 && r(h);
      },
      o || vi
    );
  };
}
class Ge extends Kt {
  constructor(t, e, n) {
    super(t), this.feature = e, this.features = n;
  }
}
class g0 extends Bc {
  constructor(t) {
    t = t || {}, super({
      attributions: t.attributions,
      interpolate: !0,
      projection: void 0,
      state: "ready",
      wrapX: t.wrapX !== void 0 ? t.wrapX : !0
    }), this.on, this.once, this.un, this.loader_ = vi, this.format_ = t.format, this.overlaps_ = t.overlaps === void 0 ? !0 : t.overlaps, this.url_ = t.url, t.loader !== void 0 ? this.loader_ = t.loader : this.url_ !== void 0 && (Y(this.format_, 7), this.loader_ = Jh(
      this.url_,
      this.format_
    )), this.strategy_ = t.strategy !== void 0 ? t.strategy : u0;
    const e = t.useSpatialIndex !== void 0 ? t.useSpatialIndex : !0;
    this.featuresRtree_ = e ? new yr() : null, this.loadedExtentsRtree_ = new yr(), this.loadingExtentsCount_ = 0, this.nullGeometryFeatures_ = {}, this.idIndex_ = {}, this.uidIndex_ = {}, this.featureChangeKeys_ = {}, this.featuresCollection_ = null;
    let n, s;
    Array.isArray(t.features) ? s = t.features : t.features && (n = t.features, s = n.getArray()), !e && n === void 0 && (n = new qt(s)), s !== void 0 && this.addFeaturesInternal(s), n !== void 0 && this.bindFeaturesCollection_(n);
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
      new Ge(bt.ADDFEATURE, t)
    );
  }
  setupChangeEvents_(t, e) {
    this.featureChangeKeys_[t] = [
      U(e, z.CHANGE, this.handleFeatureChange_, this),
      U(
        e,
        fn.PROPERTYCHANGE,
        this.handleFeatureChange_,
        this
      )
    ];
  }
  addToIndex_(t, e) {
    let n = !0;
    const s = e.getId();
    return s !== void 0 && (s.toString() in this.idIndex_ ? n = !1 : this.idIndex_[s.toString()] = e), n && (Y(!(t in this.uidIndex_), 30), this.uidIndex_[t] = e), n;
  }
  addFeatures(t) {
    this.addFeaturesInternal(t), this.changed();
  }
  addFeaturesInternal(t) {
    const e = [], n = [], s = [];
    for (let r = 0, o = t.length; r < o; r++) {
      const a = t[r], h = j(a);
      this.addToIndex_(h, a) && n.push(a);
    }
    for (let r = 0, o = n.length; r < o; r++) {
      const a = n[r], h = j(a);
      this.setupChangeEvents_(h, a);
      const l = a.getGeometry();
      if (l) {
        const c = l.getExtent();
        e.push(c), s.push(a);
      } else
        this.nullGeometryFeatures_[h] = a;
    }
    if (this.featuresRtree_ && this.featuresRtree_.load(e, s), this.hasListener(bt.ADDFEATURE))
      for (let r = 0, o = n.length; r < o; r++)
        this.dispatchEvent(
          new Ge(bt.ADDFEATURE, n[r])
        );
  }
  bindFeaturesCollection_(t) {
    let e = !1;
    this.addEventListener(
      bt.ADDFEATURE,
      function(n) {
        e || (e = !0, t.push(n.feature), e = !1);
      }
    ), this.addEventListener(
      bt.REMOVEFEATURE,
      function(n) {
        e || (e = !0, t.remove(n.feature), e = !1);
      }
    ), t.addEventListener(
      xt.ADD,
      function(n) {
        e || (e = !0, this.addFeature(n.element), e = !1);
      }.bind(this)
    ), t.addEventListener(
      xt.REMOVE,
      function(n) {
        e || (e = !0, this.removeFeature(n.element), e = !1);
      }.bind(this)
    ), this.featuresCollection_ = t;
  }
  clear(t) {
    if (t) {
      for (const n in this.featureChangeKeys_)
        this.featureChangeKeys_[n].forEach(et);
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
    const e = new Ge(bt.CLEAR);
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
    return this.featuresCollection_ ? t = this.featuresCollection_.getArray().slice(0) : this.featuresRtree_ && (t = this.featuresRtree_.getAll(), gn(this.nullGeometryFeatures_) || ae(t, Object.values(this.nullGeometryFeatures_))), t;
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
      const s = Td(t, e);
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
    const h = [-1 / 0, -1 / 0, 1 / 0, 1 / 0];
    return e = e || xi, this.featuresRtree_.forEachInExtent(
      h,
      function(l) {
        if (e(l)) {
          const c = l.getGeometry(), u = a;
          if (a = c.closestPointXY(
            n,
            s,
            o,
            a
          ), a < u) {
            r = l;
            const d = Math.sqrt(a);
            h[0] = n - d, h[1] = s - d, h[2] = n + d, h[3] = s + d;
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
      new Ge(bt.CHANGEFEATURE, e)
    );
  }
  hasFeature(t) {
    const e = t.getId();
    return e !== void 0 ? e in this.idIndex_ : j(t) in this.uidIndex_;
  }
  isEmpty() {
    return this.featuresRtree_ ? this.featuresRtree_.isEmpty() && gn(this.nullGeometryFeatures_) : this.featuresCollection_ ? this.featuresCollection_.getLength() === 0 : !0;
  }
  loadFeatures(t, e, n) {
    const s = this.loadedExtentsRtree_, r = this.strategy_(t, e, n);
    for (let o = 0, a = r.length; o < a; ++o) {
      const h = r[o];
      s.forEachInExtent(
        h,
        function(c) {
          return ci(c.extent, h);
        }
      ) || (++this.loadingExtentsCount_, this.dispatchEvent(
        new Ge(bt.FEATURESLOADSTART)
      ), this.loader_.call(
        this,
        h,
        e,
        n,
        function(c) {
          --this.loadingExtentsCount_, this.dispatchEvent(
            new Ge(
              bt.FEATURESLOADEND,
              void 0,
              c
            )
          );
        }.bind(this),
        function() {
          --this.loadingExtentsCount_, this.dispatchEvent(
            new Ge(bt.FEATURESLOADERROR)
          );
        }.bind(this)
      ), s.insert(h, { extent: h.slice() }));
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
      if (Vn(s.extent, t))
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
    n.forEach(et), delete this.featureChangeKeys_[e];
    const s = t.getId();
    return s !== void 0 && delete this.idIndex_[s.toString()], delete this.uidIndex_[e], this.dispatchEvent(
      new Ge(bt.REMOVEFEATURE, t)
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
    Y(this.format_, 7), this.url_ = t, this.setLoader(Jh(t, this.format_));
  }
}
const Ti = g0;
class _0 extends Rr {
  constructor(t, e, n) {
    super(), n = n || {}, this.tileCoord = t, this.state = e, this.interimTile = null, this.key = "", this.transition_ = n.transition === void 0 ? 250 : n.transition, this.transitionStarts_ = {}, this.interpolate = !!n.interpolate;
  }
  changed() {
    this.dispatchEvent(z.CHANGE);
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
    B();
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
    return s >= this.transition_ ? 1 : ac(s / this.transition_);
  }
  inTransition(t) {
    return this.transition_ ? this.transitionStarts_[t] !== -1 : !1;
  }
  endTransition(t) {
    this.transition_ && (this.transitionStarts_[t] = -1);
  }
}
const Wc = _0;
class m0 extends Wc {
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
    this.state = k.ERROR, this.unlistenImage_(), this.image_ = y0(), this.changed();
  }
  handleImageLoad_() {
    const t = this.image_;
    t.naturalWidth && t.naturalHeight ? this.state = k.LOADED : this.state = k.EMPTY, this.unlistenImage_(), this.changed();
  }
  load() {
    this.state == k.ERROR && (this.state = k.IDLE, this.image_ = new Image(), this.crossOrigin_ !== null && (this.image_.crossOrigin = this.crossOrigin_)), this.state == k.IDLE && (this.state = k.LOADING, this.changed(), this.tileLoadFunction_(this, this.src_), this.unlisten_ = Dc(
      this.image_,
      this.handleImageLoad_.bind(this),
      this.handleImageError_.bind(this)
    ));
  }
  unlistenImage_() {
    this.unlisten_ && (this.unlisten_(), this.unlisten_ = null);
  }
}
function y0() {
  const i = jt(1, 1);
  return i.fillStyle = "rgba(0,0,0,0)", i.fillRect(0, 0, 1, 1), i.canvas;
}
const jc = m0;
class p0 {
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
    return Y(n !== void 0, 15), n === this.newest_ || (n === this.oldest_ ? (this.oldest_ = this.oldest_.newer, this.oldest_.older = null) : (n.newer.older = n.older, n.older.newer = n.newer), n.newer = null, n.older = this.newest_, this.newest_.newer = n, this.newest_ = n), n.value_;
  }
  remove(t) {
    const e = this.entries_[t];
    return Y(e !== void 0, 15), e === this.newest_ ? (this.newest_ = e.older, this.newest_ && (this.newest_.newer = null)) : e === this.oldest_ ? (this.oldest_ = e.newer, this.oldest_ && (this.oldest_.older = null)) : (e.newer.older = e.older, e.older.newer = e.newer), delete this.entries_[t], --this.count_, e.value_;
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
    Y(!(t in this.entries_), 16);
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
const x0 = p0;
function Qh(i, t, e, n) {
  return n !== void 0 ? (n[0] = i, n[1] = t, n[2] = e, n) : [i, t, e];
}
function zr(i, t, e) {
  return i + "/" + t + "/" + e;
}
function Uc(i) {
  return zr(i[0], i[1], i[2]);
}
function v0(i) {
  return i.split("/").map(Number);
}
function M0(i) {
  return (i[1] << i[0]) + i[2];
}
function C0(i, t) {
  const e = i[0], n = i[1], s = i[2];
  if (t.getMinZoom() > e || e > t.getMaxZoom())
    return !1;
  const r = t.getFullTileRange(e);
  return r ? r.containsXY(n, s) : !0;
}
class E0 extends x0 {
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
    const t = this.peekFirstKey(), n = v0(t)[0];
    this.forEach(
      function(s) {
        s.tileCoord[0] !== n && (this.remove(Uc(s.tileCoord)), s.release());
      }.bind(this)
    );
  }
}
const Xc = E0;
class Yc {
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
function Wi(i, t, e, n, s) {
  return s !== void 0 ? (s.minX = i, s.maxX = t, s.minY = e, s.maxY = n, s) : new Yc(i, t, e, n);
}
const Vc = Yc, tl = [
  "fullscreenchange",
  "webkitfullscreenchange",
  "MSFullscreenChange"
], el = {
  ENTERFULLSCREEN: "enterfullscreen",
  LEAVEFULLSCREEN: "leavefullscreen"
};
class S0 extends Ae {
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
      z.CLICK,
      this.handleClick_.bind(this),
      !1
    ), this.setClassName_(this.button_, this.isInFullscreen_), this.element.className = `${this.cssClassName_} ${Mn} ${Dr}`, this.element.appendChild(this.button_);
  }
  handleClick_(t) {
    t.preventDefault(), this.handleFullScreen_();
  }
  handleFullScreen_() {
    const t = this.getMap();
    if (!t)
      return;
    const e = t.getOwnerDocument();
    if (!!il(e))
      if (nl(e))
        w0(e);
      else {
        let n;
        this.source_ ? n = typeof this.source_ == "string" ? e.getElementById(this.source_) : this.source_ : n = t.getTargetElement(), this.keys_ ? T0(n) : qc(n);
      }
  }
  handleFullScreenChange_() {
    const t = this.getMap();
    if (!t)
      return;
    const e = this.isInFullscreen_;
    this.isInFullscreen_ = nl(t.getOwnerDocument()), e !== this.isInFullscreen_ && (this.setClassName_(this.button_, this.isInFullscreen_), this.isInFullscreen_ ? (or(this.labelActiveNode_, this.labelNode_), this.dispatchEvent(el.ENTERFULLSCREEN)) : (or(this.labelNode_, this.labelActiveNode_), this.dispatchEvent(el.LEAVEFULLSCREEN)), t.updateSize());
  }
  setClassName_(t, e) {
    e ? (t.classList.remove(...this.inactiveClassName_), t.classList.add(...this.activeClassName_)) : (t.classList.remove(...this.activeClassName_), t.classList.add(...this.inactiveClassName_));
  }
  setMap(t) {
    const e = this.getMap();
    e && e.removeChangeListener(
      _t.TARGET,
      this.boundHandleMapTargetChange_
    ), super.setMap(t), this.handleMapTargetChange_(), t && t.addChangeListener(
      _t.TARGET,
      this.boundHandleMapTargetChange_
    );
  }
  handleMapTargetChange_() {
    const t = this.documentListeners_;
    for (let n = 0, s = t.length; n < s; ++n)
      et(t[n]);
    t.length = 0;
    const e = this.getMap();
    if (e) {
      const n = e.getOwnerDocument();
      il(n) ? this.element.classList.remove(Mh) : this.element.classList.add(Mh);
      for (let s = 0, r = tl.length; s < r; ++s)
        t.push(
          U(n, tl[s], this.handleFullScreenChange_, this)
        );
      this.handleFullScreenChange_();
    }
  }
}
function il(i) {
  const t = i.body;
  return !!(t.webkitRequestFullscreen || t.requestFullscreen && i.fullscreenEnabled);
}
function nl(i) {
  return !!(i.webkitIsFullScreen || i.fullscreenElement);
}
function qc(i) {
  i.requestFullscreen ? i.requestFullscreen() : i.webkitRequestFullscreen && i.webkitRequestFullscreen();
}
function T0(i) {
  i.webkitRequestFullscreen ? i.webkitRequestFullscreen() : qc(i);
}
function w0(i) {
  i.exitFullscreen ? i.exitFullscreen() : i.webkitExitFullscreen && i.webkitExitFullscreen();
}
const R0 = S0, co = "units", b0 = [1, 2, 5], Ln = 25.4 / 0.28;
class I0 extends Ae {
  constructor(t) {
    t = t || {};
    const e = document.createElement("div");
    e.style.pointerEvents = "none", super({
      element: e,
      render: t.render,
      target: t.target
    }), this.on, this.once, this.un;
    const n = t.className !== void 0 ? t.className : t.bar ? "ol-scale-bar" : "ol-scale-line";
    this.innerElement_ = document.createElement("div"), this.innerElement_.className = n + "-inner", this.element.className = n + " " + Mn, this.element.appendChild(this.innerElement_), this.viewState_ = null, this.minWidth_ = t.minWidth !== void 0 ? t.minWidth : 64, this.maxWidth_ = t.maxWidth, this.renderedVisible_ = !1, this.renderedWidth_ = void 0, this.renderedHTML_ = "", this.addChangeListener(co, this.handleUnitsChanged_), this.setUnits(t.units || "metric"), this.scaleBar_ = t.bar || !1, this.scaleBarSteps_ = t.steps || 4, this.scaleBarText_ = t.text || !1, this.dpi_ = t.dpi || void 0;
  }
  getUnits() {
    return this.get(co);
  }
  handleUnitsChanged_() {
    this.updateElement_();
  }
  setUnits(t) {
    this.set(co, t);
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
    let o = dr(
      n,
      t.resolution,
      e,
      r
    );
    const a = this.minWidth_ * (this.dpi_ || Ln) / Ln, h = this.maxWidth_ !== void 0 ? this.maxWidth_ * (this.dpi_ || Ln) / Ln : void 0;
    let l = a * o, c = "";
    if (s == "degrees") {
      const x = mn.degrees;
      l *= x, l < x / 60 ? (c = "\u2033", o *= 3600) : l < x ? (c = "\u2032", o *= 60) : c = "\xB0";
    } else
      s == "imperial" ? l < 0.9144 ? (c = "in", o /= 0.0254) : l < 1609.344 ? (c = "ft", o /= 0.3048) : (c = "mi", o /= 1609.344) : s == "nautical" ? (o /= 1852, c = "NM") : s == "metric" ? l < 1e-3 ? (c = "\u03BCm", o *= 1e6) : l < 1 ? (c = "mm", o *= 1e3) : l < 1e3 ? c = "m" : (c = "km", o /= 1e3) : s == "us" ? l < 0.9144 ? (c = "in", o *= 39.37) : l < 1609.344 ? (c = "ft", o /= 0.30480061) : (c = "mi", o /= 1609.3472) : Y(!1, 33);
    let u = 3 * Math.floor(Math.log(a * o) / Math.log(10)), d, f, g, _, m, y;
    for (; ; ) {
      g = Math.floor(u / 3);
      const x = Math.pow(10, g);
      if (d = b0[(u % 3 + 3) % 3] * x, f = Math.round(d / o), isNaN(f)) {
        this.element.style.display = "none", this.renderedVisible_ = !1;
        return;
      }
      if (h !== void 0 && f >= h) {
        d = _, f = m, g = y;
        break;
      } else if (f >= a)
        break;
      _ = d, m = f, y = g, ++u;
    }
    const p = this.scaleBar_ ? this.createScaleBar(f, d, c) : d.toFixed(g < 0 ? -g : 0) + " " + c;
    this.renderedHTML_ != p && (this.innerElement_.innerHTML = p, this.renderedHTML_ = p), this.renderedWidth_ != f && (this.innerElement_.style.width = f + "px", this.renderedWidth_ = f), this.renderedVisible_ || (this.element.style.display = "", this.renderedVisible_ = !0);
  }
  createScaleBar(t, e, n) {
    const s = this.getScaleForResolution(), r = s < 1 ? Math.round(1 / s).toLocaleString() + " : 1" : "1 : " + Math.round(s).toLocaleString(), o = this.scaleBarSteps_, a = t / o, h = [this.createMarker("absolute")];
    for (let c = 0; c < o; ++c) {
      const u = c % 2 === 0 ? "ol-scale-singlebar-odd" : "ol-scale-singlebar-even";
      h.push(
        `<div><div class="ol-scale-singlebar ${u}" style="width: ${a}px;"></div>` + this.createMarker("relative") + (c % 2 === 0 || o === 2 ? this.createStepText(c, t, !1, e, n) : "") + "</div>"
      );
    }
    return h.push(this.createStepText(o, t, !0, e, n)), (this.scaleBarText_ ? `<div class="ol-scale-text" style="width: ${t}px;">` + r + "</div>" : "") + h.join("");
  }
  createMarker(t) {
    return `<div class="ol-scale-step-marker" style="position: ${t}; top: ${t === "absolute" ? 3 : -10}px;"></div>`;
  }
  createStepText(t, e, n, s, r) {
    const a = (t === 0 ? 0 : Math.round(s / this.scaleBarSteps_ * t * 100) / 100) + (t === 0 ? "" : " " + r), h = t === 0 ? -3 : e / this.scaleBarSteps_ * -1, l = t === 0 ? 0 : e / this.scaleBarSteps_ * 2;
    return `<div class="ol-scale-step-text" style="margin-left: ${h}px;text-align: ${t === 0 ? "left" : "center"};min-width: ${l}px;left: ${n ? e + "px" : "unset"};">` + a + "</div>";
  }
  getScaleForResolution() {
    const t = dr(
      this.viewState_.projection,
      this.viewState_.resolution,
      this.viewState_.center,
      "m"
    ), e = this.dpi_ || Ln, n = 1e3 / 25.4;
    return t * n * e;
  }
  render(t) {
    const e = t.frameState;
    e ? this.viewState_ = e.viewState : this.viewState_ = null, this.updateElement_();
  }
}
const A0 = I0;
class P0 extends Ae {
  constructor(t) {
    const e = document.createElement("button");
    e.innerHTML = "C";
    const n = document.createElement("div");
    n.className = "center-control ol-unselectable ol-control", n.appendChild(e), super({
      element: n
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
class Br extends ni {
  constructor(t, e, n) {
    super(), n !== void 0 && e === void 0 ? this.setFlatCoordinates(n, t) : (e = e || 0, this.setCenterAndRadius(t, e, n));
  }
  clone() {
    const t = new Br(
      this.flatCoordinates.slice(),
      void 0,
      this.layout
    );
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, n, s) {
    const r = this.flatCoordinates, o = t - r[0], a = e - r[1], h = o * o + a * a;
    if (h < s) {
      if (h === 0)
        for (let l = 0; l < this.stride; ++l)
          n[l] = r[l];
      else {
        const l = this.getRadius() / Math.sqrt(h);
        n[0] = r[0] + l * o, n[1] = r[1] + l * a;
        for (let c = 2; c < this.stride; ++c)
          n[c] = r[c];
      }
      return n.length = this.stride, h;
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
    return ee(
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
    if (At(t, e)) {
      const n = this.getCenter();
      return t[0] <= n[0] && t[2] >= n[0] || t[1] <= n[1] && t[3] >= n[1] ? !0 : na(t, this.intersectsCoordinate.bind(this));
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
    let r = cc(s, 0, t, this.stride);
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
      pa(n, 0, n.length, s, t, e, n)
    ), this.changed();
  }
  translate(t, e) {
    const n = this.getCenter(), s = this.getStride();
    this.setCenter(
      hc(n, 0, n.length, s, t, e, n)
    ), this.changed();
  }
}
Br.prototype.transform;
const L0 = Br;
class pr extends lc {
  constructor(t) {
    super(), this.geometries_ = t || null, this.changeEventsKeys_ = [], this.listenGeometriesChange_();
  }
  unlistenGeometriesChange_() {
    this.changeEventsKeys_.forEach(et), this.changeEventsKeys_.length = 0;
  }
  listenGeometriesChange_() {
    if (!!this.geometries_)
      for (let t = 0, e = this.geometries_.length; t < e; ++t)
        this.changeEventsKeys_.push(
          U(this.geometries_[t], z.CHANGE, this.changed, this)
        );
  }
  clone() {
    const t = new pr(null);
    return t.setGeometries(this.geometries_), t.applyProperties(this), t;
  }
  closestPointXY(t, e, n, s) {
    if (s < Ai(this.getExtent(), t, e))
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
    cs(t);
    const e = this.geometries_;
    for (let n = 0, s = e.length; n < s; ++n)
      Vl(t, e[n].getExtent());
    return t;
  }
  getGeometries() {
    return sl(this.geometries_);
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
      const a = n[r], h = a.getSimplifiedGeometry(t);
      e.push(h), h !== a && (s = !0);
    }
    if (s) {
      const r = new pr(null);
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
    n || (n = Mi(this.getExtent()));
    const s = this.geometries_;
    for (let r = 0, o = s.length; r < o; ++r)
      s[r].scale(t, e, n);
    this.changed();
  }
  setGeometries(t) {
    this.setGeometriesArray(sl(t));
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
function sl(i) {
  const t = [];
  for (let e = 0, n = i.length; e < n; ++e)
    t.push(i[e].clone());
  return t;
}
const Kc = pr;
class xr extends ni {
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
      for (let h = 0, l = r.length; h < l; ++h) {
        const c = r[h];
        h === 0 && (s = c.getLayout()), ae(o, c.getFlatCoordinates()), a.push(o.length);
      }
      this.setFlatCoordinates(s, o), this.ends_ = a;
    }
  }
  appendLineString(t) {
    this.flatCoordinates ? ae(this.flatCoordinates, t.getFlatCoordinates().slice()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed();
  }
  clone() {
    const t = new xr(
      this.flatCoordinates.slice(),
      this.layout,
      this.ends_.slice()
    );
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, n, s) {
    return s < Ai(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      va(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), Ca(
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
    return this.layout != "XYM" && this.layout != "XYZM" || this.flatCoordinates.length === 0 ? null : (e = e !== void 0 ? e : !1, n = n !== void 0 ? n : !1, s_(
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
    return es(
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
    return t < 0 || this.ends_.length <= t ? null : new yi(
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
      const h = e[o], l = new yi(
        t.slice(r, h),
        n
      );
      s.push(l), r = h;
    }
    return s;
  }
  getFlatMidpoints() {
    const t = [], e = this.flatCoordinates;
    let n = 0;
    const s = this.ends_, r = this.stride;
    for (let o = 0, a = s.length; o < a; ++o) {
      const h = s[o], l = bc(
        e,
        n,
        h,
        r,
        0.5
      );
      ae(t, l), n = h;
    }
    return t;
  }
  getSimplifiedGeometryInternal(t) {
    const e = [], n = [];
    return e.length = Xf(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      t,
      e,
      0,
      n
    ), new xr(e, "XY", n);
  }
  getType() {
    return "MultiLineString";
  }
  intersectsExtent(t) {
    return Jf(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      t
    );
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 2), this.flatCoordinates || (this.flatCoordinates = []);
    const n = Ea(
      this.flatCoordinates,
      0,
      t,
      this.stride,
      this.ends_
    );
    this.flatCoordinates.length = n.length === 0 ? 0 : n[n.length - 1], this.changed();
  }
}
const Ga = xr;
class $a extends ni {
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
    this.flatCoordinates ? ae(this.flatCoordinates, t.getFlatCoordinates()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.changed();
  }
  clone() {
    const t = new $a(
      this.flatCoordinates.slice(),
      this.layout
    );
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, n, s) {
    if (s < Ai(this.getExtent(), t, e))
      return s;
    const r = this.flatCoordinates, o = this.stride;
    for (let a = 0, h = r.length; a < h; a += o) {
      const l = we(
        t,
        e,
        r[a],
        r[a + 1]
      );
      if (l < s) {
        s = l;
        for (let c = 0; c < o; ++c)
          n[c] = r[a + c];
        n.length = o;
      }
    }
    return s;
  }
  getCoordinates() {
    return Xe(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  getPoint(t) {
    const e = this.flatCoordinates ? this.flatCoordinates.length / this.stride : 0;
    return t < 0 || e <= t ? null : new le(
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
      const a = new le(t.slice(r, r + n), e);
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
      if (ia(t, o, a))
        return !0;
    }
    return !1;
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Gr(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
const za = $a;
function O0(i, t, e, n) {
  const s = [];
  let r = Wt();
  for (let o = 0, a = e.length; o < a; ++o) {
    const h = e[o];
    r = Yl(
      i,
      t,
      h[0],
      n
    ), s.push((r[0] + r[2]) / 2, (r[1] + r[3]) / 2), t = h[h.length - 1];
  }
  return s;
}
class vr extends ni {
  constructor(t, e, n) {
    if (super(), this.endss_ = [], this.flatInteriorPointsRevision_ = -1, this.flatInteriorPoints_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, !n && !Array.isArray(t[0])) {
      let s = this.getLayout();
      const r = t, o = [], a = [];
      for (let h = 0, l = r.length; h < l; ++h) {
        const c = r[h];
        h === 0 && (s = c.getLayout());
        const u = o.length, d = c.getEnds();
        for (let f = 0, g = d.length; f < g; ++f)
          d[f] += u;
        ae(o, c.getFlatCoordinates()), a.push(d);
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
      ae(this.flatCoordinates, t.getFlatCoordinates()), e = t.getEnds().slice();
      for (let s = 0, r = e.length; s < r; ++s)
        e[s] += n;
    }
    this.endss_.push(e), this.changed();
  }
  clone() {
    const t = this.endss_.length, e = new Array(t);
    for (let s = 0; s < t; ++s)
      e[s] = this.endss_[s].slice();
    const n = new vr(
      this.flatCoordinates.slice(),
      this.layout,
      e
    );
    return n.applyProperties(this), n;
  }
  closestPointXY(t, e, n, s) {
    return s < Ai(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      Wf(
        this.flatCoordinates,
        0,
        this.endss_,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), jf(
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
    return Hf(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride,
      t,
      e
    );
  }
  getArea() {
    return qf(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride
    );
  }
  getCoordinates(t) {
    let e;
    return t !== void 0 ? (e = this.getOrientedFlatCoordinates().slice(), Nh(
      e,
      0,
      this.endss_,
      this.stride,
      t
    )) : e = this.flatCoordinates, Oo(
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
      const t = O0(
        this.flatCoordinates,
        0,
        this.endss_,
        this.stride
      );
      this.flatInteriorPoints_ = Zf(
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
    return new za(this.getFlatInteriorPoints().slice(), "XYM");
  }
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const t = this.flatCoordinates;
      eg(t, 0, this.endss_, this.stride) ? this.orientedFlatCoordinates_ = t : (this.orientedFlatCoordinates_ = t.slice(), this.orientedFlatCoordinates_.length = Nh(
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
    return e.length = Vf(
      this.flatCoordinates,
      0,
      this.endss_,
      this.stride,
      Math.sqrt(t),
      e,
      0,
      n
    ), new vr(e, "XY", n);
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
    return new pn(
      this.flatCoordinates.slice(e, s),
      this.layout,
      n
    );
  }
  getPolygons() {
    const t = this.layout, e = this.flatCoordinates, n = this.endss_, s = [];
    let r = 0;
    for (let o = 0, a = n.length; o < a; ++o) {
      const h = n[o].slice(), l = h[h.length - 1];
      if (r !== 0)
        for (let u = 0, d = h.length; u < d; ++u)
          h[u] -= r;
      const c = new pn(
        e.slice(r, l),
        t,
        h
      );
      s.push(c), r = l;
    }
    return s;
  }
  getType() {
    return "MultiPolygon";
  }
  intersectsExtent(t) {
    return Qf(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride,
      t
    );
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 3), this.flatCoordinates || (this.flatCoordinates = []);
    const n = Uf(
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
const Ba = vr, $s = {
  DRAWSTART: "drawstart",
  DRAWEND: "drawend",
  DRAWABORT: "drawabort"
};
class zs extends Kt {
  constructor(t, e) {
    super(t), this.feature = e;
  }
}
function F0(i, t) {
  const e = [];
  for (let n = 0; n < t.length; ++n) {
    const r = t[n].getGeometry();
    Hc(i, r, e);
  }
  return e;
}
function Bs(i, t) {
  return we(i[0], i[1], t[0], t[1]);
}
function Zi(i, t) {
  const e = i.length;
  return t < 0 ? i[t + e] : t >= e ? i[t - e] : i[t];
}
function Ws(i, t, e) {
  let n, s;
  t < e ? (n = t, s = e) : (n = e, s = t);
  const r = Math.ceil(n), o = Math.floor(s);
  if (r > o) {
    const h = Ji(i, n), l = Ji(i, s);
    return Bs(h, l);
  }
  let a = 0;
  if (n < r) {
    const h = Ji(i, n), l = Zi(i, r);
    a += Bs(h, l);
  }
  if (o < s) {
    const h = Zi(i, o), l = Ji(i, s);
    a += Bs(h, l);
  }
  for (let h = r; h < o - 1; ++h) {
    const l = Zi(i, h), c = Zi(i, h + 1);
    a += Bs(l, c);
  }
  return a;
}
function Hc(i, t, e) {
  if (t instanceof yi) {
    js(i, t.getCoordinates(), !1, e);
    return;
  }
  if (t instanceof Ga) {
    const n = t.getCoordinates();
    for (let s = 0, r = n.length; s < r; ++s)
      js(i, n[s], !1, e);
    return;
  }
  if (t instanceof pn) {
    const n = t.getCoordinates();
    for (let s = 0, r = n.length; s < r; ++s)
      js(i, n[s], !0, e);
    return;
  }
  if (t instanceof Ba) {
    const n = t.getCoordinates();
    for (let s = 0, r = n.length; s < r; ++s) {
      const o = n[s];
      for (let a = 0, h = o.length; a < h; ++a)
        js(i, o[a], !0, e);
    }
    return;
  }
  if (t instanceof Kc) {
    const n = t.getGeometries();
    for (let s = 0; s < n.length; ++s)
      Hc(i, n[s], e);
    return;
  }
}
const uo = { index: -1, endIndex: NaN };
function D0(i, t, e, n) {
  const s = i[0], r = i[1];
  let o = 1 / 0, a = -1, h = NaN;
  for (let u = 0; u < t.targets.length; ++u) {
    const d = t.targets[u], f = d.coordinates;
    let g = 1 / 0, _;
    for (let m = 0; m < f.length - 1; ++m) {
      const y = f[m], p = f[m + 1], x = Zc(s, r, y, p);
      x.squaredDistance < g && (g = x.squaredDistance, _ = m + x.along);
    }
    g < o && (o = g, d.ring && t.targetIndex === u && (d.endIndex > d.startIndex ? _ < d.startIndex && (_ += f.length) : d.endIndex < d.startIndex && _ > d.startIndex && (_ -= f.length)), h = _, a = u);
  }
  const l = t.targets[a];
  let c = l.ring;
  if (t.targetIndex === a && c) {
    const u = Ji(
      l.coordinates,
      h
    ), d = e.getPixelFromCoordinate(u);
    rr(d, t.startPx) > n && (c = !1);
  }
  if (c) {
    const u = l.coordinates, d = u.length, f = l.startIndex, g = h;
    if (f < g) {
      const _ = Ws(
        u,
        f,
        g
      );
      Ws(
        u,
        f,
        g - d
      ) < _ && (h -= d);
    } else {
      const _ = Ws(
        u,
        f,
        g
      );
      Ws(
        u,
        f,
        g + d
      ) < _ && (h += d);
    }
  }
  return uo.index = a, uo.endIndex = h, uo;
}
function js(i, t, e, n) {
  const s = i[0], r = i[1];
  for (let o = 0, a = t.length - 1; o < a; ++o) {
    const h = t[o], l = t[o + 1], c = Zc(s, r, h, l);
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
const fo = { along: 0, squaredDistance: 0 };
function Zc(i, t, e, n) {
  const s = e[0], r = e[1], o = n[0], a = n[1], h = o - s, l = a - r;
  let c = 0, u = s, d = r;
  return (h !== 0 || l !== 0) && (c = dt(((i - s) * h + (t - r) * l) / (h * h + l * l), 0, 1), u += h * c, d += l * c), fo.along = c, fo.squaredDistance = ra(we(i, t, u, d), 10), fo;
}
function Ji(i, t) {
  const e = i.length;
  let n = Math.floor(t);
  const s = t - n;
  n >= e ? n -= e : n < 0 && (n += e);
  let r = n + 1;
  r >= e && (r -= e);
  const o = i[n], a = o[0], h = o[1], l = i[r], c = l[0] - a, u = l[1] - h;
  return [a + c * s, h + u * s];
}
class N0 extends si {
  constructor(t) {
    const e = t;
    e.stopDown || (e.stopDown = Ii), super(e), this.on, this.once, this.un, this.shouldHandle_ = !1, this.downPx_ = null, this.downTimeout_, this.lastDragTime_, this.pointerType_, this.freehand_ = !1, this.source_ = t.source ? t.source : null, this.features_ = t.features ? t.features : null, this.snapTolerance_ = t.snapTolerance ? t.snapTolerance : 12, this.type_ = t.type, this.mode_ = G0(this.type_), this.stopClick_ = !!t.stopClick, this.minPoints_ = t.minPoints ? t.minPoints : this.mode_ === "Polygon" ? 3 : 2, this.maxPoints_ = this.mode_ === "Circle" ? 2 : t.maxPoints ? t.maxPoints : 1 / 0, this.finishCondition_ = t.finishCondition ? t.finishCondition : xi, this.geometryLayout_ = t.geometryLayout ? t.geometryLayout : "XY";
    let n = t.geometryFunction;
    if (!n) {
      const s = this.mode_;
      if (s === "Circle")
        n = function(r, o, a) {
          const h = o || new L0([NaN, NaN]), l = rt(r[0]), c = Re(
            l,
            rt(r[r.length - 1])
          );
          return h.setCenterAndRadius(
            l,
            Math.sqrt(c),
            this.geometryLayout_
          ), h;
        };
      else {
        let r;
        s === "Point" ? r = le : s === "LineString" ? r = yi : s === "Polygon" && (r = pn), n = function(o, a, h) {
          return a ? s === "Polygon" ? o[0].length ? a.setCoordinates(
            [o[0].concat([o[0][0]])],
            this.geometryLayout_
          ) : a.setCoordinates([], this.geometryLayout_) : a.setCoordinates(o, this.geometryLayout_) : a = new r(o, this.geometryLayout_), a;
        };
      }
    }
    this.geometryFunction_ = n, this.dragVertexDelay_ = t.dragVertexDelay !== void 0 ? t.dragVertexDelay : 500, this.finishCoordinate_ = null, this.sketchFeature_ = null, this.sketchPoint_ = null, this.sketchCoords_ = null, this.sketchLine_ = null, this.sketchLineCoords_ = null, this.squaredClickTolerance_ = t.clickTolerance ? t.clickTolerance * t.clickTolerance : 36, this.overlay_ = new Si({
      source: new Ti({
        useSpatialIndex: !1,
        wrapX: t.wrapX ? t.wrapX : !1
      }),
      style: t.style ? t.style : k0(),
      updateWhileInteracting: !0
    }), this.geometryName_ = t.geometryName, this.condition_ = t.condition ? t.condition : Ia, this.freehandCondition_, t.freehand ? this.freehandCondition_ = _r : this.freehandCondition_ = t.freehandCondition ? t.freehandCondition : Ec, this.traceCondition_, this.setTrace(t.trace || !1), this.traceState_ = { active: !1 }, this.traceSource_ = t.traceSource || t.source || null, this.addChangeListener(Do.ACTIVE, this.updateState_);
  }
  setTrace(t) {
    let e;
    t ? t === !0 ? e = _r : e = t : e = Tg, this.traceCondition_ = e;
  }
  setMap(t) {
    super.setMap(t), this.updateState_();
  }
  getOverlay() {
    return this.overlay_;
  }
  handleEvent(t) {
    t.originalEvent.type === z.CONTEXTMENU && t.originalEvent.preventDefault(), this.freehand_ = this.mode_ !== "Point" && this.freehandCondition_(t);
    let e = t.type === V.POINTERMOVE, n = !0;
    return !this.freehand_ && this.lastDragTime_ && t.type === V.POINTERDRAG && (Date.now() - this.lastDragTime_ >= this.dragVertexDelay_ ? (this.downPx_ = t.pixel, this.shouldHandle_ = !this.freehand_, e = !0) : this.lastDragTime_ = void 0, this.shouldHandle_ && this.downTimeout_ !== void 0 && (clearTimeout(this.downTimeout_), this.downTimeout_ = void 0)), this.freehand_ && t.type === V.POINTERDRAG && this.sketchFeature_ !== null ? (this.addToDrawing_(t.coordinate), n = !1) : this.freehand_ && t.type === V.POINTERDOWN ? n = !1 : e && this.getPointerCount() < 2 ? (n = t.type === V.POINTERMOVE, n && this.freehand_ ? (this.handlePointerMove_(t), this.shouldHandle_ && t.originalEvent.preventDefault()) : (t.originalEvent.pointerType === "mouse" || t.type === V.POINTERDRAG && this.downTimeout_ === void 0) && this.handlePointerMove_(t)) : t.type === V.DBLCLICK && (n = !1), super.handleEvent(t) && n;
  }
  handleDownEvent(t) {
    return this.shouldHandle_ = !this.freehand_, this.freehand_ ? (this.downPx_ = t.pixel, this.finishCoordinate_ || this.startDrawing_(t.coordinate), !0) : this.condition_(t) ? (this.lastDragTime_ = Date.now(), this.downTimeout_ = setTimeout(
      function() {
        this.handlePointerMove_(
          new Ce(
            V.POINTERMOVE,
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
    ]), r = Et([n, s]), o = this.traceSource_.getFeaturesInExtent(r);
    if (o.length === 0)
      return;
    const a = F0(t.coordinate, o);
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
        s.push(Zi(t.coordinates, a));
    } else {
      const r = Math.floor(e);
      let o = Math.ceil(n);
      o === n && (o += 1);
      for (let a = r; a >= o; --a)
        s.push(Zi(t.coordinates, a));
    }
    s.length && this.appendCoordinates(s);
  }
  updateTrace_(t) {
    const e = this.traceState_;
    if (!e.active || e.targetIndex === -1 && rr(e.startPx, t.pixel) < this.snapTolerance_)
      return;
    const n = D0(
      t.coordinate,
      e,
      this.getMap(),
      this.snapTolerance_
    );
    if (e.targetIndex !== n.index) {
      if (e.targetIndex !== -1) {
        const h = e.targets[e.targetIndex];
        this.removeTracedCoordinates_(h.startIndex, h.endIndex);
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
    const r = Ji(
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
        for (let h = 0, l = r.length; h < l; h++) {
          const c = r[h], u = a.getPixelFromCoordinate(c), d = t[0] - u[0], f = t[1] - u[1], g = this.freehand_ ? 1 : this.snapTolerance_;
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
    this.sketchPoint_ ? this.sketchPoint_.getGeometry().setCoordinates(t) : (this.sketchPoint_ = new Te(new le(t)), this.updateSketchFeatures_());
  }
  createOrUpdateCustomSketchLine_(t) {
    this.sketchLine_ || (this.sketchLine_ = new Te());
    const e = t.getLinearRing(0);
    let n = this.sketchLine_.getGeometry();
    n ? (n.setFlatCoordinates(
      e.getLayout(),
      e.getFlatCoordinates()
    ), n.changed()) : (n = new yi(
      e.getFlatCoordinates(),
      e.getLayout()
    ), this.sketchLine_.setGeometry(n));
  }
  startDrawing_(t) {
    const e = this.getMap().getView().getProjection(), n = fr(this.geometryLayout_);
    for (; t.length < n; )
      t.push(0);
    this.finishCoordinate_ = t, this.mode_ === "Point" ? this.sketchCoords_ = t.slice() : this.mode_ === "Polygon" ? (this.sketchCoords_ = [[t.slice(), t.slice()]], this.sketchLineCoords_ = this.sketchCoords_[0]) : this.sketchCoords_ = [t.slice(), t.slice()], this.sketchLineCoords_ && (this.sketchLine_ = new Te(new yi(this.sketchLineCoords_)));
    const s = this.geometryFunction_(
      this.sketchCoords_,
      void 0,
      e
    );
    this.sketchFeature_ = new Te(), this.geometryName_ && this.sketchFeature_.setGeometryName(this.geometryName_), this.sketchFeature_.setGeometry(s), this.updateSketchFeatures_(), this.dispatchEvent(
      new zs($s.DRAWSTART, this.sketchFeature_)
    );
  }
  modifyDrawing_(t) {
    const e = this.getMap(), n = this.sketchFeature_.getGeometry(), s = e.getView().getProjection(), r = fr(this.geometryLayout_);
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
          const h = o[o.length - 2].slice();
          o[o.length - 1] = h, this.createOrUpdateSketchPoint_(h);
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
      new za([e])
    ) : this.type_ === "MultiLineString" ? t.setGeometry(
      new Ga([e])
    ) : this.type_ === "MultiPolygon" && t.setGeometry(
      new Ba([e])
    ), this.dispatchEvent(new zs($s.DRAWEND, t)), this.features_ && this.features_.push(t), this.source_ && this.source_.addFeature(t);
  }
  abortDrawing_() {
    this.finishCoordinate_ = null;
    const t = this.sketchFeature_;
    return this.sketchFeature_ = null, this.sketchPoint_ = null, this.sketchLine_ = null, this.overlay_.getSource().clear(!0), this.deactivateTrace_(), t;
  }
  abortDrawing() {
    const t = this.abortDrawing_();
    t && this.dispatchEvent(new zs($s.DRAWABORT, t));
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
    this.finishCoordinate_ = s.slice(), this.sketchCoords_.push(s.slice()), this.sketchPoint_ = new Te(new le(s)), this.updateSketchFeatures_(), this.dispatchEvent(
      new zs($s.DRAWSTART, this.sketchFeature_)
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
function k0() {
  const i = Lc();
  return function(t, e) {
    return i[t.getGeometry().getType()];
  };
}
function G0(i) {
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
const $0 = N0, rl = 0, Wn = 1, ol = [0, 0, 0, 0], an = [], go = {
  MODIFYSTART: "modifystart",
  MODIFYEND: "modifyend"
};
class _o extends Kt {
  constructor(t, e, n) {
    super(t), this.features = e, this.mapBrowserEvent = n;
  }
}
class z0 extends si {
  constructor(t) {
    super(t), this.on, this.once, this.un, this.boundHandleFeatureChange_ = this.handleFeatureChange_.bind(this), this.condition_ = t.condition ? t.condition : Tc, this.defaultDeleteCondition_ = function(n) {
      return Cg(n) && wg(n);
    }, this.deleteCondition_ = t.deleteCondition ? t.deleteCondition : this.defaultDeleteCondition_, this.insertVertexCondition_ = t.insertVertexCondition ? t.insertVertexCondition : _r, this.vertexFeature_ = null, this.vertexSegments_ = null, this.lastPixel_ = [0, 0], this.ignoreNextSingleClick_ = !1, this.featuresBeingModified_ = null, this.rBush_ = new yr(), this.pixelTolerance_ = t.pixelTolerance !== void 0 ? t.pixelTolerance : 10, this.snappedToVertex_ = !1, this.changingFeature_ = !1, this.dragSegments_ = [], this.overlay_ = new Si({
      source: new Ti({
        useSpatialIndex: !1,
        wrapX: !!t.wrapX
      }),
      style: t.style ? t.style : W0(),
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
    if (t.features ? e = t.features : t.source && (this.source_ = t.source, e = new qt(this.source_.getFeatures()), this.source_.addEventListener(
      bt.ADDFEATURE,
      this.handleSourceAdd_.bind(this)
    ), this.source_.addEventListener(
      bt.REMOVEFEATURE,
      this.handleSourceRemove_.bind(this)
    )), !e)
      throw new Error(
        "The modify interaction requires features, a source or a layer"
      );
    t.hitDetection && (this.hitDetection_ = t.hitDetection), this.features_ = e, this.features_.forEach(this.addFeature_.bind(this)), this.features_.addEventListener(
      xt.ADD,
      this.handleFeatureAdd_.bind(this)
    ), this.features_.addEventListener(
      xt.REMOVE,
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
    n && n.isRendered() && this.getActive() && this.handlePointerAtPixel_(this.lastPixel_, n), t.addEventListener(z.CHANGE, this.boundHandleFeatureChange_);
  }
  willModifyFeatures_(t, e) {
    if (!this.featuresBeingModified_) {
      this.featuresBeingModified_ = new qt();
      const n = this.featuresBeingModified_.getArray();
      for (let s = 0, r = e.length; s < r; ++s) {
        const o = e[s];
        for (let a = 0, h = o.length; a < h; ++a) {
          const l = o[a].feature;
          l && !n.includes(l) && this.featuresBeingModified_.push(l);
        }
      }
      this.featuresBeingModified_.getLength() === 0 ? this.featuresBeingModified_ = null : this.dispatchEvent(
        new _o(
          go.MODIFYSTART,
          this.featuresBeingModified_,
          t
        )
      );
    }
  }
  removeFeature_(t) {
    this.removeFeatureSegmentData_(t), this.vertexFeature_ && this.features_.getLength() === 0 && (this.overlay_.getSource().removeFeature(this.vertexFeature_), this.vertexFeature_ = null), t.removeEventListener(
      z.CHANGE,
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
      this.rBush_.insert(Et(o), a);
    }
  }
  writeMultiLineStringGeometry_(t, e) {
    const n = e.getCoordinates();
    for (let s = 0, r = n.length; s < r; ++s) {
      const o = n[s];
      for (let a = 0, h = o.length - 1; a < h; ++a) {
        const l = o.slice(a, a + 2), c = {
          feature: t,
          geometry: e,
          depth: [s],
          index: a,
          segment: l
        };
        this.rBush_.insert(Et(l), c);
      }
    }
  }
  writePolygonGeometry_(t, e) {
    const n = e.getCoordinates();
    for (let s = 0, r = n.length; s < r; ++s) {
      const o = n[s];
      for (let a = 0, h = o.length - 1; a < h; ++a) {
        const l = o.slice(a, a + 2), c = {
          feature: t,
          geometry: e,
          depth: [s],
          index: a,
          segment: l
        };
        this.rBush_.insert(Et(l), c);
      }
    }
  }
  writeMultiPolygonGeometry_(t, e) {
    const n = e.getCoordinates();
    for (let s = 0, r = n.length; s < r; ++s) {
      const o = n[s];
      for (let a = 0, h = o.length; a < h; ++a) {
        const l = o[a];
        for (let c = 0, u = l.length - 1; c < u; ++c) {
          const d = l.slice(c, c + 2), f = {
            feature: t,
            geometry: e,
            depth: [a, s],
            index: c,
            segment: d
          };
          this.rBush_.insert(Et(d), f);
        }
      }
    }
  }
  writeCircleGeometry_(t, e) {
    const n = e.getCenter(), s = {
      feature: t,
      geometry: e,
      index: rl,
      segment: [n, n]
    }, r = {
      feature: t,
      geometry: e,
      index: Wn,
      segment: [n, n]
    }, o = [s, r];
    s.featureSegments = o, r.featureSegments = o, this.rBush_.insert(Ks(n), s);
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
    return s ? s.getGeometry().setCoordinates(t) : (s = new Te(new le(t)), this.vertexFeature_ = s, this.overlay_.getSource().addFeature(s)), s.set("features", e), s.set("geometries", n), s;
  }
  handleEvent(t) {
    if (!t.originalEvent)
      return !0;
    this.lastPointerEvent_ = t;
    let e;
    return !t.map.getView().getInteracting() && t.type == V.POINTERMOVE && !this.handlingDownUpSequence && this.handlePointerMove_(t), this.vertexFeature_ && this.deleteCondition_(t) && (t.type != V.SINGLECLICK || !this.ignoreNextSingleClick_ ? e = this.removePoint() : e = !0), t.type == V.SINGLECLICK && (this.ignoreNextSingleClick_ = !1), super.handleEvent(t) && !e;
  }
  handleDragEvent(t) {
    this.ignoreNextSingleClick_ = !1, this.willModifyFeatures_(t, this.dragSegments_);
    const e = [
      t.coordinate[0] + this.delta_[0],
      t.coordinate[1] + this.delta_[1]
    ], n = [], s = [];
    for (let r = 0, o = this.dragSegments_.length; r < o; ++r) {
      const a = this.dragSegments_[r], h = a[0], l = h.feature;
      n.includes(l) || n.push(l);
      const c = h.geometry;
      s.includes(c) || s.push(c);
      const u = h.depth;
      let d;
      const f = h.segment, g = a[1];
      for (; e.length < c.getStride(); )
        e.push(f[g][e.length]);
      switch (c.getType()) {
        case "Point":
          d = e, f[0] = e, f[1] = e;
          break;
        case "MultiPoint":
          d = c.getCoordinates(), d[h.index] = e, f[0] = e, f[1] = e;
          break;
        case "LineString":
          d = c.getCoordinates(), d[h.index + g] = e, f[g] = e;
          break;
        case "MultiLineString":
          d = c.getCoordinates(), d[u[0]][h.index + g] = e, f[g] = e;
          break;
        case "Polygon":
          d = c.getCoordinates(), d[u[0]][h.index + g] = e, f[g] = e;
          break;
        case "MultiPolygon":
          d = c.getCoordinates(), d[u[1]][u[0]][h.index + g] = e, f[g] = e;
          break;
        case "Circle":
          if (f[0] = e, f[1] = e, h.index === rl)
            this.changingFeature_ = !0, c.setCenter(e), this.changingFeature_ = !1;
          else {
            this.changingFeature_ = !0, t.map.getView().getProjection();
            let _ = rr(
              rt(c.getCenter()),
              rt(e)
            );
            c.setRadius(_), this.changingFeature_ = !1;
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
      const s = [], r = n.getGeometry().getCoordinates(), o = Et([r]), a = this.rBush_.getInExtent(o), h = {};
      a.sort(B0);
      for (let l = 0, c = a.length; l < c; ++l) {
        const u = a[l], d = u.segment;
        let f = j(u.geometry);
        const g = u.depth;
        if (g && (f += "-" + g.join("-")), h[f] || (h[f] = new Array(2)), u.geometry.getType() === "Circle" && u.index === Wn) {
          const _ = hl(
            e,
            u
          );
          Jt(_, r) && !h[f][0] && (this.dragSegments_.push([u, 0]), h[f][0] = u);
          continue;
        }
        if (Jt(d[0], r) && !h[f][0]) {
          this.dragSegments_.push([u, 0]), h[f][0] = u;
          continue;
        }
        if (Jt(d[1], r) && !h[f][1]) {
          if (h[f][0] && h[f][0].index === 0) {
            let _ = u.geometry.getCoordinates();
            switch (u.geometry.getType()) {
              case "LineString":
              case "MultiLineString":
                continue;
              case "MultiPolygon":
                _ = _[g[1]];
              case "Polygon":
                if (u.index !== _[g[0]].length - 2)
                  continue;
                break;
            }
          }
          this.dragSegments_.push([u, 1]), h[f][1] = u;
          continue;
        }
        j(d) in this.vertexSegments_ && !h[f][0] && !h[f][1] && this.insertVertexCondition_(t) && s.push(u);
      }
      s.length && this.willModifyFeatures_(t, [s]);
      for (let l = s.length - 1; l >= 0; --l)
        this.insertVertex_(s[l], r);
    }
    return !!this.vertexFeature_;
  }
  handleUpEvent(t) {
    for (let e = this.dragSegments_.length - 1; e >= 0; --e) {
      const n = this.dragSegments_[e][0], s = n.geometry;
      if (s.getType() === "Circle") {
        const r = s.getCenter(), o = n.featureSegments[0], a = n.featureSegments[1];
        o.segment[0] = r, o.segment[1] = r, a.segment[0] = r, a.segment[1] = r, this.rBush_.update(Ks(r), o);
        let h = s;
        this.rBush_.update(
          h.getExtent(),
          a
        );
      } else
        this.rBush_.update(Et(n.segment), n);
    }
    return this.featuresBeingModified_ && (this.dispatchEvent(
      new _o(
        go.MODIFYEND,
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
    const r = function(h, l) {
      return al(s, h) - al(s, l);
    };
    let o, a;
    if (this.hitDetection_) {
      const h = typeof this.hitDetection_ == "object" ? (l) => l === this.hitDetection_ : void 0;
      e.forEachFeatureAtPixel(
        t,
        (l, c, u) => {
          if (u = u || l.getGeometry(), u.getType() === "Point" && this.features_.getArray().includes(l)) {
            a = u;
            const d = u.getFlatCoordinates().slice(0, 2);
            o = [
              {
                feature: l,
                geometry: u,
                segment: [d, d]
              }
            ];
          }
          return !0;
        },
        { layerFilter: h }
      );
    }
    if (!o) {
      const h = Ue(
        Ks(s, ol)
      ), l = e.getView().getResolution() * this.pixelTolerance_, c = ga(
        Ir(h, l, ol)
      );
      o = this.rBush_.getInExtent(c);
    }
    if (o && o.length > 0) {
      const h = o.sort(r)[0], l = h.segment;
      let c = hl(s, h);
      const u = e.getPixelFromCoordinate(c);
      let d = rr(t, u);
      if (a || d <= this.pixelTolerance_) {
        const f = {};
        if (f[j(l)] = !0, this.snapToPointer_ || (this.delta_[0] = c[0] - s[0], this.delta_[1] = c[1] - s[1]), h.geometry.getType() === "Circle" && h.index === Wn)
          this.snappedToVertex_ = !0, this.createOrUpdateVertexFeature_(
            c,
            [h.feature],
            [h.geometry]
          );
        else {
          const g = e.getPixelFromCoordinate(l[0]), _ = e.getPixelFromCoordinate(l[1]), m = Re(u, g), y = Re(u, _);
          d = Math.sqrt(Math.min(m, y)), this.snappedToVertex_ = d <= this.pixelTolerance_, this.snappedToVertex_ && (c = m > y ? l[1] : l[0]), this.createOrUpdateVertexFeature_(
            c,
            [h.feature],
            [h.geometry]
          );
          const p = {};
          p[j(h.geometry)] = !0;
          for (let x = 1, v = o.length; x < v; ++x) {
            const M = o[x].segment;
            if (Jt(l[0], M[0]) && Jt(l[1], M[1]) || Jt(l[0], M[1]) && Jt(l[1], M[0])) {
              const C = j(o[x].geometry);
              C in p || (p[C] = !0, f[j(M)] = !0);
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
    let h;
    for (; e.length < r.getStride(); )
      e.push(0);
    switch (r.getType()) {
      case "MultiLineString":
        h = r.getCoordinates(), h[o[0]].splice(a + 1, 0, e);
        break;
      case "Polygon":
        h = r.getCoordinates(), h[o[0]].splice(a + 1, 0, e);
        break;
      case "MultiPolygon":
        h = r.getCoordinates(), h[o[1]][o[0]].splice(a + 1, 0, e);
        break;
      case "LineString":
        h = r.getCoordinates(), h.splice(a + 1, 0, e);
        break;
      default:
        return;
    }
    this.setGeometryCoordinates_(r, h);
    const l = this.rBush_;
    l.remove(t), this.updateSegmentIndices_(r, a, o, 1);
    const c = {
      segment: [n[0], e],
      feature: s,
      geometry: r,
      depth: o,
      index: a
    };
    l.insert(Et(c.segment), c), this.dragSegments_.push([c, 1]);
    const u = {
      segment: [e, n[1]],
      feature: s,
      geometry: r,
      depth: o,
      index: a + 1
    };
    l.insert(Et(u.segment), u), this.dragSegments_.push([u, 0]), this.ignoreNextSingleClick_ = !0;
  }
  removePoint() {
    if (this.lastPointerEvent_ && this.lastPointerEvent_.type != V.POINTERDRAG) {
      const t = this.lastPointerEvent_;
      this.willModifyFeatures_(t, this.dragSegments_);
      const e = this.removeVertex_();
      return this.featuresBeingModified_ && this.dispatchEvent(
        new _o(
          go.MODIFYEND,
          this.featuresBeingModified_,
          t
        )
      ), this.featuresBeingModified_ = null, e;
    }
    return !1;
  }
  removeVertex_() {
    const t = this.dragSegments_, e = {};
    let n = !1, s, r, o, a, h, l, c, u, d, f, g;
    for (h = t.length - 1; h >= 0; --h)
      o = t[h], f = o[0], g = j(f.feature), f.depth && (g += "-" + f.depth.join("-")), g in e || (e[g] = {}), o[1] === 0 ? (e[g].right = f, e[g].index = f.index) : o[1] == 1 && (e[g].left = f, e[g].index = f.index + 1);
    for (g in e) {
      switch (d = e[g].right, c = e[g].left, l = e[g].index, u = l - 1, c !== void 0 ? f = c : f = d, u < 0 && (u = 0), a = f.geometry, r = a.getCoordinates(), s = r, n = !1, a.getType()) {
        case "MultiLineString":
          r[f.depth[0]].length > 2 && (r[f.depth[0]].splice(l, 1), n = !0);
          break;
        case "LineString":
          r.length > 2 && (r.splice(l, 1), n = !0);
          break;
        case "MultiPolygon":
          s = s[f.depth[1]];
        case "Polygon":
          s = s[f.depth[0]], s.length > 4 && (l == s.length - 1 && (l = 0), s.splice(l, 1), n = !0, l === 0 && (s.pop(), s.push(s[0]), u = s.length - 1));
          break;
      }
      if (n) {
        this.setGeometryCoordinates_(a, r);
        const _ = [];
        if (c !== void 0 && (this.rBush_.remove(c), _.push(c.segment[0])), d !== void 0 && (this.rBush_.remove(d), _.push(d.segment[1])), c !== void 0 && d !== void 0) {
          const m = {
            depth: f.depth,
            feature: f.feature,
            geometry: f.geometry,
            index: u,
            segment: _
          };
          this.rBush_.insert(
            Et(m.segment),
            m
          );
        }
        this.updateSegmentIndices_(a, l, f.depth, -1), this.vertexFeature_ && (this.overlay_.getSource().removeFeature(this.vertexFeature_), this.vertexFeature_ = null), t.length = 0;
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
        r.geometry === t && (n === void 0 || r.depth === void 0 || ii(r.depth, n)) && r.index > e && (r.index += s);
      }
    );
  }
}
function B0(i, t) {
  return i.index - t.index;
}
function al(i, t, e) {
  const n = t.geometry;
  if (n.getType() === "Circle") {
    let r = n;
    if (t.index === Wn) {
      const o = Re(
        r.getCenter(),
        rt(i)
      ), a = Math.sqrt(o) - r.getRadius();
      return a * a;
    }
  }
  const s = rt(i);
  return an[0] = rt(t.segment[0]), an[1] = rt(t.segment[1]), $d(s, an);
}
function hl(i, t, e) {
  const n = t.geometry;
  if (n.getType() === "Circle" && t.index === Wn)
    return yn(
      n.getClosestPoint(
        rt(i)
      )
    );
  const s = rt(i);
  return an[0] = rt(t.segment[0]), an[1] = rt(t.segment[1]), yn(
    aa(s, an)
  );
}
function W0() {
  const i = Lc();
  return function(t, e) {
    return i.Point;
  };
}
const j0 = z0;
function ll(i) {
  if (i.feature)
    return i.feature;
  if (i.element)
    return i.element;
}
const mo = [];
class U0 extends si {
  constructor(t) {
    t = t || {};
    const e = t;
    e.handleDownEvent || (e.handleDownEvent = xi), e.stopDown || (e.stopDown = Ii), super(e), this.source_ = t.source ? t.source : null, this.vertex_ = t.vertex !== void 0 ? t.vertex : !0, this.edge_ = t.edge !== void 0 ? t.edge : !0, this.features_ = t.features ? t.features : null, this.featuresListenerKeys_ = [], this.featureChangeListenerKeys_ = {}, this.indexedFeaturesExtents_ = {}, this.pendingFeatures_ = {}, this.pixelTolerance_ = t.pixelTolerance !== void 0 ? t.pixelTolerance : 10, this.rBush_ = new yr(), this.GEOMETRY_SEGMENTERS_ = {
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
          Wt()
        );
        const o = [];
        if (r(o, s), o.length === 1)
          this.rBush_.insert(Et(o[0]), {
            feature: t,
            segment: o[0]
          });
        else if (o.length > 1) {
          const a = o.map((l) => Et(l)), h = o.map((l) => ({
            feature: t,
            segment: l
          }));
          this.rBush_.load(a, h);
        }
      }
    }
    e && (this.featureChangeListenerKeys_[n] = U(
      t,
      z.CHANGE,
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
    const e = ll(t);
    this.addFeature(e);
  }
  handleFeatureRemove_(t) {
    const e = ll(t);
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
      o.forEachInExtent(r, function(h) {
        t === h.feature && a.push(h);
      });
      for (let h = a.length - 1; h >= 0; --h)
        o.remove(a[h]);
    }
    n && (et(this.featureChangeListenerKeys_[s]), delete this.featureChangeListenerKeys_[s]);
  }
  setMap(t) {
    const e = this.getMap(), n = this.featuresListenerKeys_, s = this.getFeatures_();
    e && (n.forEach(et), n.length = 0, s.forEach(this.forEachFeatureRemove_.bind(this))), super.setMap(t), t && (this.features_ ? n.push(
      U(
        this.features_,
        xt.ADD,
        this.handleFeatureAdd_,
        this
      ),
      U(
        this.features_,
        xt.REMOVE,
        this.handleFeatureRemove_,
        this
      )
    ) : this.source_ && n.push(
      U(
        this.source_,
        bt.ADDFEATURE,
        this.handleFeatureAdd_,
        this
      ),
      U(
        this.source_,
        bt.REMOVEFEATURE,
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
    ]), o = Et([s, r]), a = this.rBush_.getInExtent(o), h = a.length;
    if (h === 0)
      return null;
    n.getView().getProjection();
    const l = rt(e);
    let c, u = 1 / 0;
    const d = this.pixelTolerance_ * this.pixelTolerance_, f = () => {
      if (c) {
        const g = n.getPixelFromCoordinate(c);
        if (Re(t, g) <= d)
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
      for (let _ = 0; _ < h; ++_) {
        const m = a[_];
        m.feature.getGeometry().getType() !== "Circle" && m.segment.forEach((y) => {
          const p = rt(y), x = Re(l, p);
          x < u && (c = y, u = x);
        });
      }
      const g = f();
      if (g)
        return g;
    }
    if (this.edge_) {
      for (let _ = 0; _ < h; ++_) {
        let m = null;
        const y = a[_];
        if (y.feature.getGeometry().getType() === "Circle") {
          let p = y.feature.getGeometry();
          m = yn(
            kd(
              l,
              p
            )
          );
        } else {
          const [p, x] = y.segment;
          x && (mo[0] = rt(p), mo[1] = rt(x), m = aa(l, mo));
        }
        if (m) {
          const p = Re(l, m);
          p < u && (c = m, u = p);
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
    const r = ng(e).getCoordinates()[0];
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
      for (let a = 0, h = o.length - 1; a < h; ++a)
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
      for (let a = 0, h = o.length; a < h; ++a) {
        const l = o[a];
        for (let c = 0, u = l.length - 1; c < u; ++c)
          t.push(l.slice(c, c + 2));
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
      for (let a = 0, h = o.length - 1; a < h; ++a)
        t.push(o.slice(a, a + 2));
    }
  }
}
const X0 = U0, Y0 = 0.5, V0 = 10, cl = 0.25;
class q0 {
  constructor(t, e, n, s, r, o) {
    this.sourceProj_ = t, this.targetProj_ = e;
    let a = {};
    const h = ts(this.targetProj_, this.sourceProj_);
    this.transformInv_ = function(p) {
      const x = p[0] + "/" + p[1];
      return a[x] || (a[x] = h(p)), a[x];
    }, this.maxSourceExtent_ = s, this.errorThresholdSquared_ = r * r, this.triangles_ = [], this.wrapsXInSource_ = !1, this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!s && !!this.sourceProj_.getExtent() && ot(s) == ot(this.sourceProj_.getExtent()), this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? ot(this.sourceProj_.getExtent()) : null, this.targetWorldWidth_ = this.targetProj_.getExtent() ? ot(this.targetProj_.getExtent()) : null;
    const l = Pi(n), c = Or(n), u = Lr(n), d = Pr(n), f = this.transformInv_(l), g = this.transformInv_(c), _ = this.transformInv_(u), m = this.transformInv_(d), y = V0 + (o ? Math.max(
      0,
      Math.ceil(
        Math.log2(
          So(n) / (o * o * 256 * 256)
        )
      )
    ) : 0);
    if (this.addQuad_(
      l,
      c,
      u,
      d,
      f,
      g,
      _,
      m,
      y
    ), this.wrapsXInSource_) {
      let p = 1 / 0;
      this.triangles_.forEach(function(x, v, M) {
        p = Math.min(
          p,
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
          ) - p > this.sourceWorldWidth_ / 2) {
            const v = [
              [x.source[0][0], x.source[0][1]],
              [x.source[1][0], x.source[1][1]],
              [x.source[2][0], x.source[2][1]]
            ];
            v[0][0] - p > this.sourceWorldWidth_ / 2 && (v[0][0] -= this.sourceWorldWidth_), v[1][0] - p > this.sourceWorldWidth_ / 2 && (v[1][0] -= this.sourceWorldWidth_), v[2][0] - p > this.sourceWorldWidth_ / 2 && (v[2][0] -= this.sourceWorldWidth_);
            const M = Math.min(
              v[0][0],
              v[1][0],
              v[2][0]
            );
            Math.max(
              v[0][0],
              v[1][0],
              v[2][0]
            ) - M < this.sourceWorldWidth_ / 2 && (x.source = v);
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
  addQuad_(t, e, n, s, r, o, a, h, l) {
    const c = Et([r, o, a, h]), u = this.sourceWorldWidth_ ? ot(c) / this.sourceWorldWidth_ : null, d = this.sourceWorldWidth_, f = this.sourceProj_.canWrapX() && u > 0.5 && u < 1;
    let g = !1;
    if (l > 0) {
      if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
        const m = Et([t, e, n, s]);
        g = ot(m) / this.targetWorldWidth_ > cl || g;
      }
      !f && this.sourceProj_.isGlobal() && u && (g = u > cl || g);
    }
    if (!g && this.maxSourceExtent_ && isFinite(c[0]) && isFinite(c[1]) && isFinite(c[2]) && isFinite(c[3]) && !At(c, this.maxSourceExtent_))
      return;
    let _ = 0;
    if (!g && (!isFinite(r[0]) || !isFinite(r[1]) || !isFinite(o[0]) || !isFinite(o[1]) || !isFinite(a[0]) || !isFinite(a[1]) || !isFinite(h[0]) || !isFinite(h[1]))) {
      if (l > 0)
        g = !0;
      else if (_ = (!isFinite(r[0]) || !isFinite(r[1]) ? 8 : 0) + (!isFinite(o[0]) || !isFinite(o[1]) ? 4 : 0) + (!isFinite(a[0]) || !isFinite(a[1]) ? 2 : 0) + (!isFinite(h[0]) || !isFinite(h[1]) ? 1 : 0), _ != 1 && _ != 2 && _ != 4 && _ != 8)
        return;
    }
    if (l > 0) {
      if (!g) {
        const m = [(t[0] + n[0]) / 2, (t[1] + n[1]) / 2], y = this.transformInv_(m);
        let p;
        f ? p = (_i(r[0], d) + _i(a[0], d)) / 2 - _i(y[0], d) : p = (r[0] + a[0]) / 2 - y[0];
        const x = (r[1] + a[1]) / 2 - y[1];
        g = p * p + x * x > this.errorThresholdSquared_;
      }
      if (g) {
        if (Math.abs(t[0] - n[0]) <= Math.abs(t[1] - n[1])) {
          const m = [(e[0] + n[0]) / 2, (e[1] + n[1]) / 2], y = this.transformInv_(m), p = [(s[0] + t[0]) / 2, (s[1] + t[1]) / 2], x = this.transformInv_(p);
          this.addQuad_(
            t,
            e,
            m,
            p,
            r,
            o,
            y,
            x,
            l - 1
          ), this.addQuad_(
            p,
            m,
            n,
            s,
            x,
            y,
            a,
            h,
            l - 1
          );
        } else {
          const m = [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2], y = this.transformInv_(m), p = [(n[0] + s[0]) / 2, (n[1] + s[1]) / 2], x = this.transformInv_(p);
          this.addQuad_(
            t,
            m,
            p,
            s,
            r,
            y,
            x,
            h,
            l - 1
          ), this.addQuad_(
            m,
            e,
            n,
            p,
            y,
            o,
            a,
            x,
            l - 1
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
    (_ & 11) == 0 && this.addTriangle_(t, n, s, r, a, h), (_ & 14) == 0 && this.addTriangle_(t, n, e, r, a, o), _ && ((_ & 13) == 0 && this.addTriangle_(e, s, t, o, h, r), (_ & 7) == 0 && this.addTriangle_(e, s, n, o, h, a));
  }
  calculateSourceExtent() {
    const t = Wt();
    return this.triangles_.forEach(function(e, n, s) {
      const r = e.source;
      $n(t, r[0]), $n(t, r[1]), $n(t, r[2]);
    }), t;
  }
  getTriangles() {
    return this.triangles_;
  }
}
const K0 = q0;
let yo;
const Jc = [];
function ul(i, t, e, n, s) {
  i.beginPath(), i.moveTo(0, 0), i.lineTo(t, e), i.lineTo(n, s), i.closePath(), i.save(), i.clip(), i.fillRect(0, 0, Math.max(t, n) + 1, Math.max(e, s)), i.restore();
}
function po(i, t) {
  return Math.abs(i[t * 4] - 210) > 2 || Math.abs(i[t * 4 + 3] - 0.75 * 255) > 2;
}
function H0() {
  if (yo === void 0) {
    const i = document.createElement("canvas").getContext("2d");
    i.globalCompositeOperation = "lighter", i.fillStyle = "rgba(210, 0, 0, 0.75)", ul(i, 4, 5, 4, 0), ul(i, 4, 5, 0, 5);
    const t = i.getImageData(0, 0, 3, 3).data;
    yo = po(t, 0) || po(t, 4) || po(t, 8);
  }
  return yo;
}
function dl(i, t, e, n) {
  const s = Rf(e, t, i);
  let r = dr(
    t,
    n,
    e
  );
  const o = t.getMetersPerUnit();
  o !== void 0 && (r *= o);
  const a = i.getMetersPerUnit();
  a !== void 0 && (r /= a);
  const h = i.getExtent();
  if (!h || Ar(h, s)) {
    const l = dr(i, r, s) / r;
    isFinite(l) && l > 0 && (r /= l);
  }
  return r;
}
function Z0(i, t, e, n) {
  const s = Mi(e);
  let r = dl(
    i,
    t,
    s,
    n
  );
  return (!isFinite(r) || r <= 0) && na(e, function(o) {
    return r = dl(
      i,
      t,
      o,
      n
    ), isFinite(r) && r > 0;
  }), r;
}
function J0(i, t, e, n, s, r, o, a, h, l, c, u) {
  const d = jt(
    Math.round(e * i),
    Math.round(e * t),
    Jc
  );
  if (u || (d.imageSmoothingEnabled = !1), h.length === 0)
    return d.canvas;
  d.scale(e, e);
  function f(v) {
    return Math.round(v * e) / e;
  }
  d.globalCompositeOperation = "lighter";
  const g = Wt();
  h.forEach(function(v, M, C) {
    Vl(g, v.extent);
  });
  const _ = ot(g), m = ue(g), y = jt(
    Math.round(e * _ / n),
    Math.round(e * m / n)
  );
  u || (y.imageSmoothingEnabled = !1);
  const p = e / n;
  h.forEach(function(v, M, C) {
    const S = v.extent[0] - g[0], w = -(v.extent[3] - g[3]), P = ot(v.extent), F = ue(v.extent);
    v.image.width > 0 && v.image.height > 0 && y.drawImage(
      v.image,
      l,
      l,
      v.image.width - 2 * l,
      v.image.height - 2 * l,
      S * p,
      w * p,
      P * p,
      F * p
    );
  });
  const x = Pi(o);
  return a.getTriangles().forEach(function(v, M, C) {
    const S = v.source, w = v.target;
    let P = S[0][0], F = S[0][1], G = S[1][0], R = S[1][1], D = S[2][0], tt = S[2][1];
    const L = f((w[0][0] - x[0]) / r), O = f(
      -(w[0][1] - x[1]) / r
    ), I = f((w[1][0] - x[0]) / r), X = f(
      -(w[1][1] - x[1]) / r
    ), ct = f((w[2][0] - x[0]) / r), nt = f(
      -(w[2][1] - x[1]) / r
    ), gt = P, T = F;
    P = 0, F = 0, G -= gt, R -= T, D -= gt, tt -= T;
    const kt = [
      [G, R, 0, 0, I - L],
      [D, tt, 0, 0, ct - L],
      [0, 0, G, R, X - O],
      [0, 0, D, tt, nt - O]
    ], K = Rd(kt);
    if (!!K) {
      if (d.save(), d.beginPath(), H0() || !u) {
        d.moveTo(I, X);
        const it = 4, Le = L - I, ne = O - X;
        for (let Mt = 0; Mt < it; Mt++)
          d.lineTo(
            I + f((Mt + 1) * Le / it),
            X + f(Mt * ne / (it - 1))
          ), Mt != it - 1 && d.lineTo(
            I + f((Mt + 1) * Le / it),
            X + f((Mt + 1) * ne / (it - 1))
          );
        d.lineTo(ct, nt);
      } else
        d.moveTo(I, X), d.lineTo(L, O), d.lineTo(ct, nt);
      d.clip(), d.transform(
        K[0],
        K[2],
        K[1],
        K[3],
        L,
        O
      ), d.translate(
        g[0] - gt,
        g[3] - T
      ), d.scale(
        n / e,
        -n / e
      ), d.drawImage(y.canvas, 0, 0), d.restore();
    }
  }), c && (d.save(), d.globalCompositeOperation = "source-over", d.strokeStyle = "black", d.lineWidth = 1, a.getTriangles().forEach(function(v, M, C) {
    const S = v.target, w = (S[0][0] - x[0]) / r, P = -(S[0][1] - x[1]) / r, F = (S[1][0] - x[0]) / r, G = -(S[1][1] - x[1]) / r, R = (S[2][0] - x[0]) / r, D = -(S[2][1] - x[1]) / r;
    d.beginPath(), d.moveTo(F, G), d.lineTo(w, P), d.lineTo(R, D), d.closePath(), d.stroke();
  }), d.restore()), d.canvas;
}
class Q0 extends Wc {
  constructor(t, e, n, s, r, o, a, h, l, c, u, d) {
    super(r, k.IDLE, { interpolate: !!d }), this.renderEdges_ = u !== void 0 ? u : !1, this.pixelRatio_ = a, this.gutter_ = h, this.canvas_ = null, this.sourceTileGrid_ = e, this.targetTileGrid_ = s, this.wrappedTileCoord_ = o || r, this.sourceTiles_ = [], this.sourcesListenerKeys_ = null, this.sourceZ_ = 0;
    const f = s.getTileCoordExtent(
      this.wrappedTileCoord_
    ), g = this.targetTileGrid_.getExtent();
    let _ = this.sourceTileGrid_.getExtent();
    const m = g ? zn(f, g) : f;
    if (So(m) === 0) {
      this.state = k.EMPTY;
      return;
    }
    const y = t.getExtent();
    y && (_ ? _ = zn(_, y) : _ = y);
    const p = s.getResolution(
      this.wrappedTileCoord_[0]
    ), x = Z0(
      t,
      n,
      m,
      p
    );
    if (!isFinite(x) || x <= 0) {
      this.state = k.EMPTY;
      return;
    }
    const v = c !== void 0 ? c : Y0;
    if (this.triangulation_ = new K0(
      t,
      n,
      m,
      _,
      x * v,
      p
    ), this.triangulation_.getTriangles().length === 0) {
      this.state = k.EMPTY;
      return;
    }
    this.sourceZ_ = e.getZForResolution(x);
    let M = this.triangulation_.calculateSourceExtent();
    if (_ && (t.canWrapX() ? (M[1] = dt(
      M[1],
      _[1],
      _[3]
    ), M[3] = dt(
      M[3],
      _[1],
      _[3]
    )) : M = zn(M, _)), !So(M))
      this.state = k.EMPTY;
    else {
      const C = e.getTileRangeForExtentAndZ(
        M,
        this.sourceZ_
      );
      for (let S = C.minX; S <= C.maxX; S++)
        for (let w = C.minY; w <= C.maxY; w++) {
          const P = l(this.sourceZ_, S, w, a);
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
      ), h = this.targetTileGrid_.getTileCoordExtent(
        this.wrappedTileCoord_
      );
      this.canvas_ = J0(
        s,
        r,
        this.pixelRatio_,
        a,
        this.sourceTileGrid_.getExtent(),
        o,
        h,
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
            const o = U(
              e,
              z.CHANGE,
              function(a) {
                const h = e.getState();
                (h == k.LOADED || h == k.ERROR || h == k.EMPTY) && (et(o), t--, t === 0 && (this.unlistenSources_(), this.reproject_()));
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
    this.sourcesListenerKeys_.forEach(et), this.sourcesListenerKeys_ = null;
  }
  release() {
    this.canvas_ && (ic(this.canvas_.getContext("2d")), Jc.push(this.canvas_), this.canvas_ = null), super.release();
  }
}
const $o = Q0, xo = {
  TILELOADSTART: "tileloadstart",
  TILELOADEND: "tileloadend",
  TILELOADERROR: "tileloaderror"
}, tm = [0, 0, 0], $e = 5;
class em {
  constructor(t) {
    this.minZoom = t.minZoom !== void 0 ? t.minZoom : 0, this.resolutions_ = t.resolutions, Y(
      ed(
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
    this.zoomFactor_ = e, this.maxZoom = this.resolutions_.length - 1, this.origin_ = t.origin !== void 0 ? t.origin : null, this.origins_ = null, t.origins !== void 0 && (this.origins_ = t.origins, Y(this.origins_.length == this.resolutions_.length, 20));
    const n = t.extent;
    n !== void 0 && !this.origin_ && !this.origins_ && (this.origin_ = Pi(n)), Y(
      !this.origin_ && this.origins_ || this.origin_ && !this.origins_,
      18
    ), this.tileSizes_ = null, t.tileSizes !== void 0 && (this.tileSizes_ = t.tileSizes, Y(this.tileSizes_.length == this.resolutions_.length, 19)), this.tileSize_ = t.tileSize !== void 0 ? t.tileSize : this.tileSizes_ ? null : ca, Y(
      !this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_,
      22
    ), this.extent_ = n !== void 0 ? n : null, this.fullTileRanges_ = null, this.tmpSize_ = [0, 0], this.tmpExtent_ = [0, 0, 0, 0], t.sizes !== void 0 ? this.fullTileRanges_ = t.sizes.map(function(s, r) {
      const o = new Vc(
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
      for (let a = s.minY, h = s.maxY; a <= h; ++a)
        n([e, r, a]);
  }
  forEachTileCoordParentTileRange(t, e, n, s) {
    let r, o, a, h = null, l = t[0] - 1;
    for (this.zoomFactor_ === 2 ? (o = t[1], a = t[2]) : h = this.getTileCoordExtent(t, s); l >= this.minZoom; ) {
      if (this.zoomFactor_ === 2 ? (o = Math.floor(o / 2), a = Math.floor(a / 2), r = Wi(o, o, a, a, n)) : r = this.getTileRangeForExtentAndZ(
        h,
        l,
        n
      ), e(l, r))
        return !0;
      --l;
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
        return Wi(
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
      return Wi(
        r,
        o,
        r,
        o,
        n
      );
    if (this.zoomFactor_) {
      const h = Math.pow(this.zoomFactor_, e - s), l = Math.floor(r * h), c = Math.floor(o * h);
      if (e < s)
        return Wi(l, l, c, c, n);
      const u = Math.floor(h * (r + 1)) - 1, d = Math.floor(h * (o + 1)) - 1;
      return Wi(l, u, c, d, n);
    }
    const a = this.getTileCoordExtent(t, this.tmpExtent_);
    return this.getTileRangeForExtentAndZ(a, e, n);
  }
  getTileRangeExtent(t, e, n) {
    const s = this.getOrigin(t), r = this.getResolution(t), o = zt(this.getTileSize(t), this.tmpSize_), a = s[0] + e.minX * o[0] * r, h = s[0] + (e.maxX + 1) * o[0] * r, l = s[1] + e.minY * o[1] * r, c = s[1] + (e.maxY + 1) * o[1] * r;
    return ee(a, l, h, c, n);
  }
  getTileRangeForExtentAndZ(t, e, n) {
    const s = tm;
    this.getTileCoordForXYAndZ_(t[0], t[3], e, !1, s);
    const r = s[1], o = s[2];
    return this.getTileCoordForXYAndZ_(t[2], t[1], e, !0, s), Wi(
      r,
      s[1],
      o,
      s[2],
      n
    );
  }
  getTileCoordCenter(t) {
    const e = this.getOrigin(t[0]), n = this.getResolution(t[0]), s = zt(this.getTileSize(t[0]), this.tmpSize_);
    return [
      e[0] + (t[1] + 0.5) * s[0] * n,
      e[1] - (t[2] + 0.5) * s[1] * n
    ];
  }
  getTileCoordExtent(t, e) {
    const n = this.getOrigin(t[0]), s = this.getResolution(t[0]), r = zt(this.getTileSize(t[0]), this.tmpSize_), o = n[0] + t[1] * r[0] * s, a = n[1] - (t[2] + 1) * r[1] * s, h = o + r[0] * s, l = a + r[1] * s;
    return ee(o, a, h, l, e);
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
    const o = this.getZForResolution(n), a = n / this.getResolution(o), h = this.getOrigin(o), l = zt(this.getTileSize(o), this.tmpSize_);
    let c = a * (t - h[0]) / n / l[0], u = a * (h[1] - e) / n / l[1];
    return s ? (c = Ps(c, $e) - 1, u = Ps(u, $e) - 1) : (c = As(c, $e), u = As(u, $e)), Qh(o, c, u, r);
  }
  getTileCoordForXYAndZ_(t, e, n, s, r) {
    const o = this.getOrigin(n), a = this.getResolution(n), h = zt(this.getTileSize(n), this.tmpSize_);
    let l = (t - o[0]) / a / h[0], c = (o[1] - e) / a / h[1];
    return s ? (l = Ps(l, $e) - 1, c = Ps(c, $e) - 1) : (l = As(l, $e), c = As(c, $e)), Qh(n, l, c, r);
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
    const n = Qo(
      this.resolutions_,
      t,
      e || 0
    );
    return dt(n, this.minZoom, this.maxZoom);
  }
  tileCoordIntersectsViewport(t, e) {
    return mc(
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
const Qc = em;
function tu(i) {
  let t = i.getDefaultTileGrid();
  return t || (t = rm(i), i.setDefaultTileGrid(t)), t;
}
function im(i, t, e) {
  const n = t[0], s = i.getTileCoordCenter(t), r = eu(e);
  if (Ar(r, s))
    return t;
  {
    const o = ot(r), a = Math.ceil(
      (r[0] - s[0]) / o
    );
    return s[0] += o * a, i.getTileCoordForCoordAndZ(s, n);
  }
}
function nm(i, t, e, n) {
  n = n !== void 0 ? n : "top-left";
  const s = sm(i, t, e);
  return new Qc({
    extent: i,
    origin: Md(i, n),
    resolutions: s,
    tileSize: e
  });
}
function sm(i, t, e, n) {
  t = t !== void 0 ? t : uf, e = zt(e !== void 0 ? e : ca);
  const s = ue(i), r = ot(i);
  n = n > 0 ? n : Math.max(r / e[0], s / e[1]);
  const o = t + 1, a = new Array(o);
  for (let h = 0; h < o; ++h)
    a[h] = n / Math.pow(2, h);
  return a;
}
function rm(i, t, e, n) {
  const s = eu(i);
  return nm(s, t, e, n);
}
function eu(i) {
  i = st(i);
  let t = i.getExtent();
  if (!t) {
    const e = 180 * mn.degrees / i.getMetersPerUnit();
    t = ee(-e, -e, e, e);
  }
  return t;
}
class om extends Bc {
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
    this.tileGrid && zt(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()), e), this.tileCache = new Xc(t.cacheSize || 0), this.tmpSize = [0, 0], this.key_ = t.key || "", this.tileOptions = {
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
    let o = !0, a, h, l;
    for (let c = n.minX; c <= n.maxX; ++c)
      for (let u = n.minY; u <= n.maxY; ++u)
        h = zr(e, c, u), l = !1, r.containsKey(h) && (a = r.get(h), l = a.getState() === k.LOADED, l && (l = s(a) !== !1)), l || (o = !1);
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
    return B();
  }
  getTileGrid() {
    return this.tileGrid;
  }
  getTileGridForProjection(t) {
    return this.tileGrid ? this.tileGrid : tu(t);
  }
  getTileCacheForProjection(t) {
    const e = this.getProjection();
    return Y(
      e === null || Se(e, t),
      68
    ), this.tileCache;
  }
  getTilePixelRatio(t) {
    return this.tilePixelRatio_;
  }
  getTilePixelSize(t, e, n) {
    const s = this.getTileGridForProjection(n), r = this.getTilePixelRatio(e), o = zt(s.getTileSize(t), this.tmpSize);
    return r == 1 ? o : Hg(o, r, this.tmpSize);
  }
  getTileCoordForTileUrlFunction(t, e) {
    e = e !== void 0 ? e : this.getProjection();
    const n = this.getTileGridForProjection(e);
    return this.getWrapX() && e.isGlobal() && (t = im(n, t, e)), C0(t, n) ? t : null;
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
class am extends Kt {
  constructor(t, e) {
    super(t), this.tile = e;
  }
}
const hm = om;
function lm(i, t) {
  const e = /\{z\}/g, n = /\{x\}/g, s = /\{y\}/g, r = /\{-y\}/g;
  return function(o, a, h) {
    if (o)
      return i.replace(e, o[0].toString()).replace(n, o[1].toString()).replace(s, o[2].toString()).replace(r, function() {
        const l = o[0], c = t.getFullTileRange(l);
        return Y(c, 55), (c.getHeight() - o[2] - 1).toString();
      });
  };
}
function cm(i, t) {
  const e = i.length, n = new Array(e);
  for (let s = 0; s < e; ++s)
    n[s] = lm(i[s], t);
  return zo(n);
}
function zo(i) {
  return i.length === 1 ? i[0] : function(t, e, n) {
    if (t) {
      const s = M0(t), r = _i(s, i.length);
      return i[r](t, e, n);
    } else
      return;
  };
}
function iu(i) {
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
class Wa extends hm {
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
    }), this.generateTileUrlFunction_ = this.tileUrlFunction === Wa.prototype.tileUrlFunction, this.tileLoadFunction = t.tileLoadFunction, t.tileUrlFunction && (this.tileUrlFunction = t.tileUrlFunction), this.urls = null, t.urls ? this.setUrls(t.urls) : t.url && this.setUrl(t.url), this.tileLoadingKeys_ = {};
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
    s == k.LOADING ? (this.tileLoadingKeys_[n] = !0, r = xo.TILELOADSTART) : n in this.tileLoadingKeys_ && (delete this.tileLoadingKeys_[n], r = s == k.ERROR ? xo.TILELOADERROR : s == k.LOADED ? xo.TILELOADEND : void 0), r != null && this.dispatchEvent(new am(r, e));
  }
  setTileLoadFunction(t) {
    this.tileCache.clear(), this.tileLoadFunction = t, this.changed();
  }
  setTileUrlFunction(t, e) {
    this.tileUrlFunction = t, this.tileCache.pruneExceptNewestZ(), typeof e < "u" ? this.setKey(e) : this.changed();
  }
  setUrl(t) {
    const e = iu(t);
    this.urls = e, this.setUrls(e);
  }
  setUrls(t) {
    this.urls = t;
    const e = t.join(`
`);
    this.generateTileUrlFunction_ ? this.setTileUrlFunction(cm(t, this.tileGrid), e) : this.setKey(e);
  }
  tileUrlFunction(t, e, n) {
  }
  useTile(t, e, n) {
    const s = zr(t, e, n);
    this.tileCache.containsKey(s) && this.tileCache.get(s);
  }
}
const um = Wa;
class dm extends um {
  constructor(t) {
    super({
      attributions: t.attributions,
      cacheSize: t.cacheSize,
      opaque: t.opaque,
      projection: t.projection,
      state: t.state,
      tileGrid: t.tileGrid,
      tileLoadFunction: t.tileLoadFunction ? t.tileLoadFunction : fm,
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
    }), this.crossOrigin = t.crossOrigin !== void 0 ? t.crossOrigin : null, this.tileClass = t.tileClass !== void 0 ? t.tileClass : jc, this.tileCacheForProjection = {}, this.tileGridForProjection = {}, this.reprojectionErrorThreshold_ = t.reprojectionErrorThreshold, this.renderReprojectionEdges_ = !1;
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
    return this.getProjection() && t && !Se(this.getProjection(), t) ? 0 : this.getGutter();
  }
  getGutter() {
    return 0;
  }
  getKey() {
    let t = super.getKey();
    return this.getInterpolate() || (t += ":disable-interpolation"), t;
  }
  getOpaque(t) {
    return this.getProjection() && t && !Se(this.getProjection(), t) ? !1 : super.getOpaque(t);
  }
  getTileGridForProjection(t) {
    const e = this.getProjection();
    if (this.tileGrid && (!e || Se(e, t)))
      return this.tileGrid;
    {
      const n = j(t);
      return n in this.tileGridForProjection || (this.tileGridForProjection[n] = tu(t)), this.tileGridForProjection[n];
    }
  }
  getTileCacheForProjection(t) {
    const e = this.getProjection();
    if (!e || Se(e, t))
      return this.tileCache;
    {
      const n = j(t);
      return n in this.tileCacheForProjection || (this.tileCacheForProjection[n] = new Xc(
        this.tileCache.highWaterMark
      )), this.tileCacheForProjection[n];
    }
  }
  createTile_(t, e, n, s, r, o) {
    const a = [t, e, n], h = this.getTileCoordForTileUrlFunction(
      a,
      r
    ), l = h ? this.tileUrlFunction(h, s, r) : void 0, c = new this.tileClass(
      a,
      l !== void 0 ? k.IDLE : k.EMPTY,
      l !== void 0 ? l : "",
      this.crossOrigin,
      this.tileLoadFunction,
      this.tileOptions
    );
    return c.key = o, c.addEventListener(z.CHANGE, this.handleTileChange.bind(this)), c;
  }
  getTile(t, e, n, s, r) {
    const o = this.getProjection();
    if (!o || !r || Se(o, r))
      return this.getTileInternal(
        t,
        e,
        n,
        s,
        o || r
      );
    {
      const a = this.getTileCacheForProjection(r), h = [t, e, n];
      let l;
      const c = Uc(h);
      a.containsKey(c) && (l = a.get(c));
      const u = this.getKey();
      if (l && l.key == u)
        return l;
      {
        const d = this.getTileGridForProjection(o), f = this.getTileGridForProjection(r), g = this.getTileCoordForTileUrlFunction(
          h,
          r
        ), _ = new $o(
          o,
          d,
          r,
          f,
          h,
          g,
          this.getTilePixelRatio(s),
          this.getGutter(),
          function(m, y, p, x) {
            return this.getTileInternal(m, y, p, x, o);
          }.bind(this),
          this.reprojectionErrorThreshold_,
          this.renderReprojectionEdges_,
          this.getInterpolate()
        );
        return _.key = u, l ? (_.interimTile = l, _.refreshInterimChain(), a.replace(c, _)) : a.set(c, _), _;
      }
    }
  }
  getTileInternal(t, e, n, s, r) {
    let o = null;
    const a = zr(t, e, n), h = this.getKey();
    if (!this.tileCache.containsKey(a))
      o = this.createTile_(t, e, n, s, r, h), this.tileCache.set(a, o);
    else if (o = this.tileCache.get(a), o.key != h) {
      const l = o;
      o = this.createTile_(t, e, n, s, r, h), l.getState() == k.IDLE ? o.interimTile = l.interimTile : o.interimTile = l, o.refreshInterimChain(), this.tileCache.replace(a, o);
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
    const n = st(t);
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
function fm(i, t) {
  i.getImage().src = t;
}
const gm = dm;
function fl(i, t) {
  const e = [];
  Object.keys(t).forEach(function(s) {
    t[s] !== null && t[s] !== void 0 && e.push(s + "=" + encodeURIComponent(t[s]));
  });
  const n = e.join("&");
  return i = i.replace(/[?&]$/, ""), i += i.includes("?") ? "&" : "?", i + n;
}
const Us = {
  PRELOAD: "preload",
  USE_INTERIM_TILES_ON_ERROR: "useInterimTilesOnError"
};
class _m extends Fr {
  constructor(t) {
    t = t || {};
    const e = Object.assign({}, t);
    delete e.preload, delete e.useInterimTilesOnError, super(e), this.on, this.once, this.un, this.setPreload(t.preload !== void 0 ? t.preload : 0), this.setUseInterimTilesOnError(
      t.useInterimTilesOnError !== void 0 ? t.useInterimTilesOnError : !0
    );
  }
  getPreload() {
    return this.get(Us.PRELOAD);
  }
  setPreload(t) {
    this.set(Us.PRELOAD, t);
  }
  getUseInterimTilesOnError() {
    return this.get(Us.USE_INTERIM_TILES_ON_ERROR);
  }
  setUseInterimTilesOnError(t) {
    this.set(Us.USE_INTERIM_TILES_ON_ERROR, t);
  }
  getData(t) {
    return super.getData(t);
  }
}
const mm = _m;
class ym extends Gc {
  constructor(t) {
    super(t), this.extentChanged = !0, this.renderedExtent_ = null, this.renderedPixelRatio, this.renderedProjection = null, this.renderedRevision, this.renderedTiles = [], this.newTiles_ = !1, this.tmpExtent = Wt(), this.tmpTileRange_ = new Vc(0, 0, 0, 0);
  }
  isDrawableTile(t) {
    const e = this.getLayer(), n = t.getState(), s = e.getUseInterimTilesOnError();
    return n == k.LOADED || n == k.EMPTY || n == k.ERROR && !s;
  }
  getTile(t, e, n, s) {
    const r = s.pixelRatio, o = s.viewState.projection, a = this.getLayer();
    let l = a.getSource().getTile(t, e, n, r, o);
    return l.getState() == k.ERROR && a.getUseInterimTilesOnError() && a.getPreload() > 0 && (this.newTiles_ = !0), this.isDrawableTile(l) || (l = l.getInterimTile()), l;
  }
  getData(t) {
    const e = this.frameState;
    if (!e)
      return null;
    const n = this.getLayer(), s = yt(
      e.pixelToCoordinateTransform,
      t.slice()
    ), r = n.getExtent();
    if (r && !Ar(r, s))
      return null;
    const o = e.pixelRatio, a = e.viewState.projection, h = e.viewState, l = n.getRenderSource(), c = l.getTileGridForProjection(h.projection), u = l.getTilePixelRatio(e.pixelRatio);
    for (let d = c.getZForResolution(h.resolution); d >= c.getMinZoom(); --d) {
      const f = c.getTileCoordForCoordAndZ(s, d), g = l.getTile(
        d,
        f[1],
        f[2],
        o,
        a
      );
      if (!(g instanceof jc || g instanceof $o) || g instanceof $o && g.getState() === k.EMPTY)
        return null;
      if (g.getState() !== k.LOADED)
        continue;
      const _ = c.getOrigin(d), m = zt(c.getTileSize(d)), y = c.getResolution(d), p = Math.floor(
        u * ((s[0] - _[0]) / y - f[1] * m[0])
      ), x = Math.floor(
        u * ((_[1] - s[1]) / y - f[2] * m[1])
      ), v = Math.round(
        u * l.getGutterForProjection(h.projection)
      );
      return this.getImageData(g.getImage(), p + v, x + v);
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
    const n = t.layerStatesArray[t.layerIndex], s = t.viewState, r = s.projection, o = s.resolution, a = s.center, h = s.rotation, l = t.pixelRatio, c = this.getLayer(), u = c.getSource(), d = u.getRevision(), f = u.getTileGridForProjection(r), g = f.getZForResolution(o, u.zDirection), _ = f.getResolution(g);
    let m = t.extent;
    const y = t.viewState.resolution, p = u.getTilePixelRatio(l), x = Math.round(ot(m) / y * l), v = Math.round(ue(m) / y * l), M = n.extent && Ue(n.extent);
    M && (m = zn(
      m,
      Ue(n.extent)
    ));
    const C = _ * x / 2 / p, S = _ * v / 2 / p, w = [
      a[0] - C,
      a[1] - S,
      a[0] + C,
      a[1] + S
    ], P = f.getTileRangeForExtentAndZ(m, g), F = {};
    F[g] = {};
    const G = this.createLoadedTileFinder(
      u,
      r,
      F
    ), R = this.tmpExtent, D = this.tmpTileRange_;
    this.newTiles_ = !1;
    const tt = h ? wo(
      s.center,
      y,
      h,
      t.size
    ) : void 0;
    for (let kt = P.minX; kt <= P.maxX; ++kt)
      for (let K = P.minY; K <= P.maxY; ++K) {
        if (h && !f.tileCoordIntersectsViewport([g, kt, K], tt))
          continue;
        const it = this.getTile(g, kt, K, t);
        if (this.isDrawableTile(it)) {
          const Mt = j(this);
          if (it.getState() == k.LOADED) {
            F[g][it.tileCoord.toString()] = it;
            let ge = it.inTransition(Mt);
            ge && n.opacity !== 1 && (it.endTransition(Mt), ge = !1), !this.newTiles_ && (ge || !this.renderedTiles.includes(it)) && (this.newTiles_ = !0);
          }
          if (it.getAlpha(Mt, t.time) === 1)
            continue;
        }
        const Le = f.getTileCoordChildTileRange(
          it.tileCoord,
          D,
          R
        );
        let ne = !1;
        Le && (ne = G(g + 1, Le)), ne || f.forEachTileCoordParentTileRange(
          it.tileCoord,
          G,
          D,
          R
        );
      }
    const L = _ / o * l / p;
    Je(
      this.pixelTransform,
      t.size[0] / 2,
      t.size[1] / 2,
      1 / l,
      1 / l,
      h,
      -x / 2,
      -v / 2
    );
    const O = Ul(this.pixelTransform);
    this.useContainer(e, O, this.getBackground(t));
    const I = this.context, X = I.canvas;
    ea(this.inversePixelTransform, this.pixelTransform), Je(
      this.tempTransform,
      x / 2,
      v / 2,
      L,
      L,
      0,
      -x / 2,
      -v / 2
    ), X.width != x || X.height != v ? (X.width = x, X.height = v) : this.containerReused || I.clearRect(0, 0, x, v), M && this.clipUnrotated(I, t, M), u.getInterpolate() || (I.imageSmoothingEnabled = !1), this.preRender(I, t), this.renderedTiles.length = 0;
    let ct = Object.keys(F).map(Number);
    ct.sort(pi);
    let nt, gt, T;
    n.opacity === 1 && (!this.containerReused || u.getOpaque(t.viewState.projection)) ? ct = ct.reverse() : (nt = [], gt = []);
    for (let kt = ct.length - 1; kt >= 0; --kt) {
      const K = ct[kt], it = u.getTilePixelSize(
        K,
        l,
        r
      ), ne = f.getResolution(K) / _, Mt = it[0] * ne * L, ge = it[1] * ne * L, Oi = f.getTileCoordForCoordAndZ(
        Pi(w),
        K
      ), Ms = f.getTileCoordExtent(Oi), Fi = yt(this.tempTransform, [
        p * (Ms[0] - w[0]) / _,
        p * (w[3] - Ms[3]) / _
      ]), Cs = p * u.getGutterForProjection(r), Oe = F[K];
      for (const Tn in Oe) {
        const Fe = Oe[Tn], Es = Fe.tileCoord, Ss = Oi[1] - Es[1], Ts = Math.round(Fi[0] - (Ss - 1) * Mt), Di = Oi[2] - Es[2], Ur = Math.round(Fi[1] - (Di - 1) * ge), Lt = Math.round(Fi[0] - Ss * Mt), Ut = Math.round(Fi[1] - Di * ge), Ht = Ts - Lt, _e = Ur - Ut, Ni = g === K, ri = Ni && Fe.getAlpha(j(this), t.time) !== 1;
        let De = !1;
        if (!ri)
          if (nt) {
            T = [Lt, Ut, Lt + Ht, Ut, Lt + Ht, Ut + _e, Lt, Ut + _e];
            for (let ki = 0, ws = nt.length; ki < ws; ++ki)
              if (g !== K && K < gt[ki]) {
                const Rt = nt[ki];
                At(
                  [Lt, Ut, Lt + Ht, Ut + _e],
                  [Rt[0], Rt[3], Rt[4], Rt[7]]
                ) && (De || (I.save(), De = !0), I.beginPath(), I.moveTo(T[0], T[1]), I.lineTo(T[2], T[3]), I.lineTo(T[4], T[5]), I.lineTo(T[6], T[7]), I.moveTo(Rt[6], Rt[7]), I.lineTo(Rt[4], Rt[5]), I.lineTo(Rt[2], Rt[3]), I.lineTo(Rt[0], Rt[1]), I.clip());
              }
            nt.push(T), gt.push(K);
          } else
            I.clearRect(Lt, Ut, Ht, _e);
        this.drawTileImage(
          Fe,
          t,
          Lt,
          Ut,
          Ht,
          _e,
          Cs,
          Ni
        ), nt && !ri ? (De && I.restore(), this.renderedTiles.unshift(Fe)) : this.renderedTiles.push(Fe), this.updateUsedTiles(t.usedTiles, u, Fe);
      }
    }
    return this.renderedRevision = d, this.renderedResolution = _, this.extentChanged = !this.renderedExtent_ || !Vn(this.renderedExtent_, w), this.renderedExtent_ = w, this.renderedPixelRatio = l, this.renderedProjection = r, this.manageTilePyramid(
      t,
      u,
      f,
      l,
      r,
      m,
      g,
      c.getPreload()
    ), this.scheduleExpireCache(t, u), this.postRender(I, t), n.extent && I.restore(), I.imageSmoothingEnabled = !0, O !== X.style.transform && (X.style.transform = O), this.container;
  }
  drawTileImage(t, e, n, s, r, o, a, h) {
    const l = this.getTileImage(t);
    if (!l)
      return;
    const c = j(this), u = e.layerStatesArray[e.layerIndex], d = u.opacity * (h ? t.getAlpha(c, e.time) : 1), f = d !== this.context.globalAlpha;
    f && (this.context.save(), this.context.globalAlpha = d), this.context.drawImage(
      l,
      a,
      a,
      l.width - 2 * a,
      l.height - 2 * a,
      n,
      s,
      r,
      o
    ), f && this.context.restore(), d !== u.opacity ? e.animate = !0 : h && t.endTransition(c);
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
  manageTilePyramid(t, e, n, s, r, o, a, h, l) {
    const c = j(e);
    c in t.wantedTiles || (t.wantedTiles[c] = {});
    const u = t.wantedTiles[c], d = t.tileQueue, f = n.getMinZoom(), g = t.viewState.rotation, _ = g ? wo(
      t.viewState.center,
      t.viewState.resolution,
      g,
      t.size
    ) : void 0;
    let m = 0, y, p, x, v, M, C;
    for (C = f; C <= a; ++C)
      for (p = n.getTileRangeForExtentAndZ(o, C, p), x = n.getResolution(C), v = p.minX; v <= p.maxX; ++v)
        for (M = p.minY; M <= p.maxY; ++M)
          g && !n.tileCoordIntersectsViewport([C, v, M], _) || (a - C <= h ? (++m, y = e.getTile(C, v, M, s, r), y.getState() == k.IDLE && (u[y.getKey()] = !0, d.isKeyQueued(y.getKey()) || d.enqueue([
            y,
            c,
            n.getTileCoordCenter(y.tileCoord),
            x
          ])), l !== void 0 && l(y)) : e.useTile(C, v, M, r));
    e.updateCacheSize(m, r);
  }
}
const pm = ym;
class xm extends mm {
  constructor(t) {
    super(t);
  }
  createRenderer() {
    return new pm(this);
  }
}
const vm = xm;
class Mm extends Qc {
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
function Cm(i, t, e) {
  const n = [], s = [], r = [], o = [], a = [];
  e = e !== void 0 ? e : [];
  const h = "SupportedCRS", l = "TileMatrix", c = "Identifier", u = "ScaleDenominator", d = "TopLeftCorner", f = "TileWidth", g = "TileHeight", _ = i[h], m = st(_), y = m.getMetersPerUnit(), p = m.getAxisOrientation().substr(0, 2) == "ne";
  return i[l].sort(function(x, v) {
    return v[u] - x[u];
  }), i[l].forEach(function(x) {
    let v;
    if (e.length > 0 ? v = e.find(function(M) {
      return x[c] == M[l] ? !0 : x[c].includes(":") ? !1 : i[c] + ":" + x[c] === M[l];
    }) : v = !0, v) {
      s.push(x[c]);
      const M = x[u] * 28e-5 / y, C = x[f], S = x[g];
      p ? r.push([
        x[d][1],
        x[d][0]
      ]) : r.push(x[d]), n.push(M), o.push(
        C == S ? C : [C, S]
      ), a.push([x.MatrixWidth, x.MatrixHeight]);
    }
  }), new Mm({
    extent: t,
    origins: r,
    resolutions: n,
    matrixIds: s,
    tileSizes: o,
    sizes: a
  });
}
class Em extends gm {
  constructor(t) {
    const e = t.requestEncoding !== void 0 ? t.requestEncoding : "KVP", n = t.tileGrid;
    let s = t.urls;
    s === void 0 && t.url !== void 0 && (s = iu(t.url)), super({
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
    }), this.version_ = t.version !== void 0 ? t.version : "1.0.0", this.format_ = t.format !== void 0 ? t.format : "image/jpeg", this.dimensions_ = t.dimensions !== void 0 ? t.dimensions : {}, this.layer_ = t.layer, this.matrixSet_ = t.matrixSet, this.style_ = t.style, this.requestEncoding_ = e, this.setKey(this.getKeyForDimensions_()), s && s.length > 0 && (this.tileUrlFunction = zo(
      s.map(this.createFromWMTSTemplate.bind(this))
    ));
  }
  setUrls(t) {
    this.urls = t;
    const e = t.join(`
`);
    this.setTileUrlFunction(
      zo(
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
    }), t = e == "KVP" ? fl(t, n) : t.replace(/\{(\w+?)\}/g, function(o, a) {
      return a.toLowerCase() in n ? n[a.toLowerCase()] : o;
    });
    const s = this.tileGrid, r = this.dimensions_;
    return function(o, a, h) {
      if (o) {
        const l = {
          TileMatrix: s.getMatrixId(o[0]),
          TileCol: o[1],
          TileRow: o[2]
        };
        Object.assign(l, r);
        let c = t;
        return e == "KVP" ? c = fl(c, l) : c = c.replace(/\{(\w+?)\}/g, function(u, d) {
          return l[d];
        }), c;
      } else
        return;
    };
  }
}
const Sm = Em;
function Tm(i, t) {
  const n = i.Contents.Layer.find(function(R) {
    return R.Identifier == t.layer;
  });
  if (!n)
    return null;
  const s = i.Contents.TileMatrixSet;
  let r;
  n.TileMatrixSetLink.length > 1 ? "projection" in t ? r = n.TileMatrixSetLink.findIndex(function(R) {
    const tt = s.find(function(I) {
      return I.Identifier == R.TileMatrixSet;
    }).SupportedCRS, L = st(tt), O = st(t.projection);
    return L && O ? Se(L, O) : tt == t.projection;
  }) : r = n.TileMatrixSetLink.findIndex(function(R) {
    return R.TileMatrixSet == t.matrixSet;
  }) : r = 0, r < 0 && (r = 0);
  const o = n.TileMatrixSetLink[r].TileMatrixSet, a = n.TileMatrixSetLink[r].TileMatrixSetLimits;
  let h = n.Format[0];
  "format" in t && (h = t.format), r = n.Style.findIndex(function(R) {
    return "style" in t ? R.Title == t.style : R.isDefault;
  }), r < 0 && (r = 0);
  const l = n.Style[r].Identifier, c = {};
  "Dimension" in n && n.Dimension.forEach(function(R, D, tt) {
    const L = R.Identifier;
    let O = R.Default;
    O === void 0 && (O = R.Value[0]), c[L] = O;
  });
  const d = i.Contents.TileMatrixSet.find(function(R) {
    return R.Identifier == o;
  });
  let f;
  const g = d.SupportedCRS;
  if (g && (f = st(g)), "projection" in t) {
    const R = st(t.projection);
    R && (!f || Se(R, f)) && (f = R);
  }
  let _ = !1;
  const m = f.getAxisOrientation().substr(0, 2) == "ne";
  let y = d.TileMatrix[0], p = {
    MinTileCol: 0,
    MinTileRow: 0,
    MaxTileCol: y.MatrixWidth - 1,
    MaxTileRow: y.MatrixHeight - 1
  };
  if (a) {
    p = a[a.length - 1];
    const R = d.TileMatrix.find(
      (D) => D.Identifier === p.TileMatrix || d.Identifier + ":" + D.Identifier === p.TileMatrix
    );
    R && (y = R);
  }
  const x = y.ScaleDenominator * 28e-5 / f.getMetersPerUnit(), v = m ? [y.TopLeftCorner[1], y.TopLeftCorner[0]] : y.TopLeftCorner, M = y.TileWidth * x, C = y.TileHeight * x;
  let S = d.BoundingBox;
  S && m && (S = [
    S[1],
    S[0],
    S[3],
    S[2]
  ]);
  let w = [
    v[0] + M * p.MinTileCol,
    v[1] - C * (1 + p.MaxTileRow),
    v[0] + M * (1 + p.MaxTileCol),
    v[1] - C * p.MinTileRow
  ];
  if (S !== void 0 && !ci(S, w)) {
    const R = n.WGS84BoundingBox, D = st("EPSG:4326").getExtent();
    if (w = S, R)
      _ = R[0] === D[0] && R[2] === D[2];
    else {
      const tt = bf(
        S,
        d.SupportedCRS,
        "EPSG:4326"
      );
      _ = tt[0] - 1e-10 <= D[0] && tt[2] + 1e-10 >= D[2];
    }
  }
  const P = Cm(
    d,
    w,
    a
  ), F = [];
  let G = t.requestEncoding;
  if (G = G !== void 0 ? G : "", "OperationsMetadata" in i && "GetTile" in i.OperationsMetadata) {
    const R = i.OperationsMetadata.GetTile.DCP.HTTP.Get;
    for (let D = 0, tt = R.length; D < tt; ++D)
      if (R[D].Constraint) {
        const O = R[D].Constraint.find(function(I) {
          return I.name == "GetEncoding";
        }).AllowedValues.Value;
        if (G === "" && (G = O[0]), G === "KVP")
          O.includes("KVP") && F.push(R[D].href);
        else
          break;
      } else
        R[D].href && (G = "KVP", F.push(R[D].href));
  }
  return F.length === 0 && (G = "REST", n.ResourceURL.forEach(function(R) {
    R.resourceType === "tile" && (h = R.format, F.push(R.template));
  })), {
    urls: F,
    layer: t.layer,
    matrixSet: o,
    format: h,
    projection: f,
    requestEncoding: G,
    tileGrid: P,
    style: l,
    dimensions: c,
    wrapX: _,
    crossOrigin: t.crossOrigin
  };
}
class wm {
  constructor() {
    this.dataProjection = void 0, this.defaultFeatureProjection = void 0, this.supportedMediaTypes = null;
  }
  getReadOptions(t, e) {
    if (e) {
      let n = e.dataProjection ? st(e.dataProjection) : this.readProjection(t);
      e.extent && n && n.getUnits() === "tile-pixels" && (n = st(n), n.setWorldExtent(e.extent)), e = {
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
    return B();
  }
  readFeature(t, e) {
    return B();
  }
  readFeatures(t, e) {
    return B();
  }
  readGeometry(t, e) {
    return B();
  }
  readProjection(t) {
    return B();
  }
  writeFeature(t, e) {
    return B();
  }
  writeFeatures(t, e) {
    return B();
  }
  writeGeometry(t, e) {
    return B();
  }
}
function nu(i, t, e) {
  const n = e ? st(e.featureProjection) : null, s = e ? st(e.dataProjection) : null;
  let r;
  if (n && s && !Se(n, s) ? r = (t ? i.clone() : i).transform(
    t ? n : s,
    t ? s : n
  ) : r = i, t && e && e.decimals !== void 0) {
    const o = Math.pow(10, e.decimals), a = function(h) {
      for (let l = 0, c = h.length; l < c; ++l)
        h[l] = Math.round(h[l] * o) / o;
      return h;
    };
    r === i && (r = i.clone()), r.applyTransform(a);
  }
  return r;
}
class Rm extends wm {
  constructor() {
    super();
  }
  getType() {
    return "json";
  }
  readFeature(t, e) {
    return this.readFeatureFromObject(
      Xs(t),
      this.getReadOptions(t, e)
    );
  }
  readFeatures(t, e) {
    return this.readFeaturesFromObject(
      Xs(t),
      this.getReadOptions(t, e)
    );
  }
  readFeatureFromObject(t, e) {
    return B();
  }
  readFeaturesFromObject(t, e) {
    return B();
  }
  readGeometry(t, e) {
    return this.readGeometryFromObject(
      Xs(t),
      this.getReadOptions(t, e)
    );
  }
  readGeometryFromObject(t, e) {
    return B();
  }
  readProjection(t) {
    return this.readProjectionFromObject(Xs(t));
  }
  readProjectionFromObject(t) {
    return B();
  }
  writeFeature(t, e) {
    return JSON.stringify(this.writeFeatureObject(t, e));
  }
  writeFeatureObject(t, e) {
    return B();
  }
  writeFeatures(t, e) {
    return JSON.stringify(this.writeFeaturesObject(t, e));
  }
  writeFeaturesObject(t, e) {
    return B();
  }
  writeGeometry(t, e) {
    return JSON.stringify(this.writeGeometryObject(t, e));
  }
  writeGeometryObject(t, e) {
    return B();
  }
}
function Xs(i) {
  if (typeof i == "string") {
    const t = JSON.parse(i);
    return t || null;
  } else
    return i !== null ? i : null;
}
const bm = Rm;
class Im extends bm {
  constructor(t) {
    t = t || {}, super(), this.dataProjection = st(
      t.dataProjection ? t.dataProjection : "EPSG:4326"
    ), t.featureProjection && (this.defaultFeatureProjection = st(t.featureProjection)), this.geometryName_ = t.geometryName, this.extractGeometryName_ = t.extractGeometryName, this.supportedMediaTypes = [
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
    const s = Bo(n.geometry, e), r = new Te();
    return this.geometryName_ ? r.setGeometryName(this.geometryName_) : this.extractGeometryName_ && "geometry_name" in n !== void 0 && r.setGeometryName(n.geometry_name), r.setGeometry(s), "id" in n && r.setId(n.id), n.properties && r.setProperties(n.properties, !0), r;
  }
  readFeaturesFromObject(t, e) {
    const n = t;
    let s = null;
    if (n.type === "FeatureCollection") {
      const r = t;
      s = [];
      const o = r.features;
      for (let a = 0, h = o.length; a < h; ++a)
        s.push(this.readFeatureFromObject(o[a], e));
    } else
      s = [this.readFeatureFromObject(t, e)];
    return s;
  }
  readGeometryFromObject(t, e) {
    return Bo(t, e);
  }
  readProjectionFromObject(t) {
    const e = t.crs;
    let n;
    return e ? e.type == "name" ? n = st(e.properties.name) : e.type === "EPSG" ? n = st("EPSG:" + e.properties.code) : Y(!1, 36) : n = this.dataProjection, n;
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
    return o && (n.geometry = Wo(o, e), delete r[t.getGeometryName()]), gn(r) || (n.properties = r), n;
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
    return Wo(t, this.adaptOptions(e));
  }
}
function Bo(i, t) {
  if (!i)
    return null;
  let e;
  switch (i.type) {
    case "Point": {
      e = Pm(i);
      break;
    }
    case "LineString": {
      e = Lm(
        i
      );
      break;
    }
    case "Polygon": {
      e = Nm(i);
      break;
    }
    case "MultiPoint": {
      e = Fm(
        i
      );
      break;
    }
    case "MultiLineString": {
      e = Om(
        i
      );
      break;
    }
    case "MultiPolygon": {
      e = Dm(
        i
      );
      break;
    }
    case "GeometryCollection": {
      e = Am(
        i
      );
      break;
    }
    default:
      throw new Error("Unsupported GeoJSON type: " + i.type);
  }
  return nu(e, !1, t);
}
function Am(i, t) {
  const e = i.geometries.map(
    function(n) {
      return Bo(n, t);
    }
  );
  return new Kc(e);
}
function Pm(i) {
  return new le(i.coordinates);
}
function Lm(i) {
  return new yi(i.coordinates);
}
function Om(i) {
  return new Ga(i.coordinates);
}
function Fm(i) {
  return new za(i.coordinates);
}
function Dm(i) {
  return new Ba(i.coordinates);
}
function Nm(i) {
  return new pn(i.coordinates);
}
function Wo(i, t) {
  i = nu(i, !0, t);
  const e = i.getType();
  let n;
  switch (e) {
    case "Point": {
      n = Wm(i);
      break;
    }
    case "LineString": {
      n = Gm(
        i
      );
      break;
    }
    case "Polygon": {
      n = jm(
        i,
        t
      );
      break;
    }
    case "MultiPoint": {
      n = zm(
        i
      );
      break;
    }
    case "MultiLineString": {
      n = $m(
        i
      );
      break;
    }
    case "MultiPolygon": {
      n = Bm(
        i,
        t
      );
      break;
    }
    case "GeometryCollection": {
      n = km(
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
function km(i, t) {
  return t = Object.assign({}, t), delete t.featureProjection, {
    type: "GeometryCollection",
    geometries: i.getGeometriesArray().map(function(n) {
      return Wo(n, t);
    })
  };
}
function Gm(i, t) {
  return {
    type: "LineString",
    coordinates: i.getCoordinates()
  };
}
function $m(i, t) {
  return {
    type: "MultiLineString",
    coordinates: i.getCoordinates()
  };
}
function zm(i, t) {
  return {
    type: "MultiPoint",
    coordinates: i.getCoordinates()
  };
}
function Bm(i, t) {
  let e;
  return t && (e = t.rightHanded), {
    type: "MultiPolygon",
    coordinates: i.getCoordinates(e)
  };
}
function Wm(i, t) {
  return {
    type: "Point",
    coordinates: i.getCoordinates()
  };
}
function jm(i, t) {
  let e;
  return t && (e = t.rightHanded), {
    type: "Polygon",
    coordinates: i.getCoordinates(e)
  };
}
const Um = Im;
class Xm {
  constructor(t, e, n) {
    this.nbDraw = 0, this.maxNbDrwa = -1, this.map = t, this.drawElement = e, this.maxNbDrwa = n, this.source = new Ti(), this.vector = new Si({
      source: this.source,
      style: new Ei({
        fill: new Qe({
          color: "rgba(255, 255, 255, 0.2)"
        }),
        stroke: new Ie({
          color: "#ffcc33",
          width: 2
        }),
        image: new Li({
          radius: 7,
          fill: new Qe({
            color: "#ffcc33"
          })
        })
      })
    }), this.map.addLayer(this.vector), this.modify = new j0({ source: this.source }), this.map.addInteraction(this.modify), this.addInteraction();
  }
  removeInteraction() {
    this.draw && this.map.removeInteraction(this.draw), this.snap && this.map.removeInteraction(this.snap);
  }
  couldContinueToDraw() {
    this.maxNbDrwa != -1 && (this.nbDraw += 1, this.nbDraw >= this.maxNbDrwa && this.draw && this.draw.addEventListener("drawend", this.removeInteraction.bind(this)));
  }
  addInteraction() {
    this.draw = new $0({
      source: this.source,
      type: this.drawElement
    }), this.map.addInteraction(this.draw), this.snap = new X0({ source: this.source }), this.map.addInteraction(this.snap), this.draw.addEventListener("drawstart", this.couldContinueToDraw.bind(this));
  }
}
class Ym {
  constructor(t, e) {
    this.data = {}, this.vectorSource = new Ti(), this.vectorLayer = new Si(), this.map = t, fetch(e).then((n) => n.json()).then((n) => {
      this.vectorSource = new Ti({
        features: new Um().readFeatures(n)
      }), this.vectorLayer = new Si({
        source: this.vectorSource,
        style: this.styleFunction
      }), this.map.addLayer(this.vectorLayer);
    });
  }
  styleFunction() {
    return new Ei({
      image: new Li({
        radius: 5,
        fill: void 0,
        stroke: new Ie({ color: "red", width: 1 })
      })
    });
  }
}
function ja(i, t) {
  return su(i, t, []).join("");
}
function su(i, t, e) {
  if (i.nodeType == Node.CDATA_SECTION_NODE || i.nodeType == Node.TEXT_NODE)
    t ? e.push(String(i.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : e.push(i.nodeValue);
  else {
    let n;
    for (n = i.firstChild; n; n = n.nextSibling)
      su(n, t, e);
  }
  return e;
}
function Vm(i) {
  return "documentElement" in i;
}
function ru(i) {
  return new DOMParser().parseFromString(i, "application/xml");
}
function jo(i, t) {
  return function(e, n) {
    const s = i.call(
      t !== void 0 ? t : this,
      e,
      n
    );
    s !== void 0 && n[n.length - 1].push(s);
  };
}
function Bt(i, t, e) {
  return function(n, s) {
    const r = i.call(
      e !== void 0 ? e : this,
      n,
      s
    );
    if (r !== void 0) {
      const o = s[s.length - 1], a = t !== void 0 ? t : n.localName;
      let h;
      a in o ? h = o[a] : (h = [], o[a] = h), h.push(r);
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
function J(i, t, e) {
  e = e !== void 0 ? e : {};
  let n, s;
  for (n = 0, s = i.length; n < s; ++n)
    e[i[n]] = t;
  return e;
}
function qm(i, t, e, n) {
  let s;
  for (s = t.firstElementChild; s; s = s.nextElementSibling) {
    const r = i[s.namespaceURI];
    if (r !== void 0) {
      const o = r[s.localName];
      o !== void 0 && o.call(n, s, e);
    }
  }
}
function at(i, t, e, n, s) {
  return n.push(i), qm(t, e, n, s), n.pop();
}
function Km(i) {
  i("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"), i("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees"), i("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"), i.WGS84 = i["EPSG:4326"], i["EPSG:3785"] = i["EPSG:3857"], i.GOOGLE = i["EPSG:3857"], i["EPSG:900913"] = i["EPSG:3857"], i["EPSG:102113"] = i["EPSG:3857"];
}
var wi = 1, Ri = 2, Hs = 3, Hm = 4, Uo = 5, gl = 6378137, Zm = 6356752314e-3, _l = 0.0066943799901413165, jn = 484813681109536e-20, E = Math.PI / 2, Jm = 0.16666666666666666, Qm = 0.04722222222222222, ty = 0.022156084656084655, b = 1e-10, Ct = 0.017453292519943295, oe = 57.29577951308232, H = Math.PI / 4, ss = Math.PI * 2, ut = 3.14159265359, Dt = {};
Dt.greenwich = 0;
Dt.lisbon = -9.131906111111;
Dt.paris = 2.337229166667;
Dt.bogota = -74.080916666667;
Dt.madrid = -3.687938888889;
Dt.rome = 12.452333333333;
Dt.bern = 7.439583333333;
Dt.jakarta = 106.807719444444;
Dt.ferro = -17.666666666667;
Dt.brussels = 4.367975;
Dt.stockholm = 18.058277777778;
Dt.athens = 23.7163375;
Dt.oslo = 10.722916666667;
const ey = {
  ft: { to_meter: 0.3048 },
  "us-ft": { to_meter: 1200 / 3937 }
};
var ml = /[\s_\-\/\(\)]/g;
function ti(i, t) {
  if (i[t])
    return i[t];
  for (var e = Object.keys(i), n = t.toLowerCase().replace(ml, ""), s = -1, r, o; ++s < e.length; )
    if (r = e[s], o = r.toLowerCase().replace(ml, ""), o === n)
      return i[r];
}
function Xo(i) {
  var t = {}, e = i.split("+").map(function(a) {
    return a.trim();
  }).filter(function(a) {
    return a;
  }).reduce(function(a, h) {
    var l = h.split("=");
    return l.push(!0), a[l[0].toLowerCase()] = l[1], a;
  }, {}), n, s, r, o = {
    proj: "projName",
    datum: "datumCode",
    rf: function(a) {
      t.rf = parseFloat(a);
    },
    lat_0: function(a) {
      t.lat0 = a * Ct;
    },
    lat_1: function(a) {
      t.lat1 = a * Ct;
    },
    lat_2: function(a) {
      t.lat2 = a * Ct;
    },
    lat_ts: function(a) {
      t.lat_ts = a * Ct;
    },
    lon_0: function(a) {
      t.long0 = a * Ct;
    },
    lon_1: function(a) {
      t.long1 = a * Ct;
    },
    lon_2: function(a) {
      t.long2 = a * Ct;
    },
    alpha: function(a) {
      t.alpha = parseFloat(a) * Ct;
    },
    gamma: function(a) {
      t.rectified_grid_angle = parseFloat(a);
    },
    lonc: function(a) {
      t.longc = a * Ct;
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
      t.datum_params = a.split(",").map(function(h) {
        return parseFloat(h);
      });
    },
    to_meter: function(a) {
      t.to_meter = parseFloat(a);
    },
    units: function(a) {
      t.units = a;
      var h = ti(ey, a);
      h && (t.to_meter = h.to_meter);
    },
    from_greenwich: function(a) {
      t.from_greenwich = a * Ct;
    },
    pm: function(a) {
      var h = ti(Dt, a);
      t.from_greenwich = (h || parseFloat(a)) * Ct;
    },
    nadgrids: function(a) {
      a === "@null" ? t.datumCode = "none" : t.nadgrids = a;
    },
    axis: function(a) {
      var h = "ewnsud";
      a.length === 3 && h.indexOf(a.substr(0, 1)) !== -1 && h.indexOf(a.substr(1, 1)) !== -1 && h.indexOf(a.substr(2, 1)) !== -1 && (t.axis = a);
    },
    approx: function() {
      t.approx = !0;
    }
  };
  for (n in e)
    s = e[n], n in o ? (r = o[n], typeof r == "function" ? r(s) : t[r] = s) : t[n] = s;
  return typeof t.datumCode == "string" && t.datumCode !== "WGS84" && (t.datumCode = t.datumCode.toLowerCase()), t;
}
var rs = 1, ou = 2, au = 3, Mr = 4, hu = 5, Ua = -1, iy = /\s/, ny = /[A-Za-z]/, sy = /[A-Za-z84_]/, Wr = /[,\]]/, lu = /[\d\.E\-\+]/;
function Pe(i) {
  if (typeof i != "string")
    throw new Error("not a string");
  this.text = i.trim(), this.level = 0, this.place = 0, this.root = null, this.stack = [], this.currentObject = null, this.state = rs;
}
Pe.prototype.readCharicter = function() {
  var i = this.text[this.place++];
  if (this.state !== Mr)
    for (; iy.test(i); ) {
      if (this.place >= this.text.length)
        return;
      i = this.text[this.place++];
    }
  switch (this.state) {
    case rs:
      return this.neutral(i);
    case ou:
      return this.keyword(i);
    case Mr:
      return this.quoted(i);
    case hu:
      return this.afterquote(i);
    case au:
      return this.number(i);
    case Ua:
      return;
  }
};
Pe.prototype.afterquote = function(i) {
  if (i === '"') {
    this.word += '"', this.state = Mr;
    return;
  }
  if (Wr.test(i)) {
    this.word = this.word.trim(), this.afterItem(i);
    return;
  }
  throw new Error(`havn't handled "` + i + '" in afterquote yet, index ' + this.place);
};
Pe.prototype.afterItem = function(i) {
  if (i === ",") {
    this.word !== null && this.currentObject.push(this.word), this.word = null, this.state = rs;
    return;
  }
  if (i === "]") {
    this.level--, this.word !== null && (this.currentObject.push(this.word), this.word = null), this.state = rs, this.currentObject = this.stack.pop(), this.currentObject || (this.state = Ua);
    return;
  }
};
Pe.prototype.number = function(i) {
  if (lu.test(i)) {
    this.word += i;
    return;
  }
  if (Wr.test(i)) {
    this.word = parseFloat(this.word), this.afterItem(i);
    return;
  }
  throw new Error(`havn't handled "` + i + '" in number yet, index ' + this.place);
};
Pe.prototype.quoted = function(i) {
  if (i === '"') {
    this.state = hu;
    return;
  }
  this.word += i;
};
Pe.prototype.keyword = function(i) {
  if (sy.test(i)) {
    this.word += i;
    return;
  }
  if (i === "[") {
    var t = [];
    t.push(this.word), this.level++, this.root === null ? this.root = t : this.currentObject.push(t), this.stack.push(this.currentObject), this.currentObject = t, this.state = rs;
    return;
  }
  if (Wr.test(i)) {
    this.afterItem(i);
    return;
  }
  throw new Error(`havn't handled "` + i + '" in keyword yet, index ' + this.place);
};
Pe.prototype.neutral = function(i) {
  if (ny.test(i)) {
    this.word = i, this.state = ou;
    return;
  }
  if (i === '"') {
    this.word = "", this.state = Mr;
    return;
  }
  if (lu.test(i)) {
    this.word = i, this.state = au;
    return;
  }
  if (Wr.test(i)) {
    this.afterItem(i);
    return;
  }
  throw new Error(`havn't handled "` + i + '" in neutral yet, index ' + this.place);
};
Pe.prototype.output = function() {
  for (; this.place < this.text.length; )
    this.readCharicter();
  if (this.state === Ua)
    return this.root;
  throw new Error('unable to parse string "' + this.text + '". State is ' + this.state);
};
function ry(i) {
  var t = new Pe(i);
  return t.output();
}
function yl(i, t, e) {
  Array.isArray(t) && (e.unshift(t), t = null);
  var n = t ? {} : i, s = e.reduce(function(r, o) {
    return Qi(o, r), r;
  }, n);
  t && (i[t] = s);
}
function Qi(i, t) {
  if (!Array.isArray(i)) {
    t[i] = !0;
    return;
  }
  var e = i.shift();
  if (e === "PARAMETER" && (e = i.shift()), i.length === 1) {
    if (Array.isArray(i[0])) {
      t[e] = {}, Qi(i[0], t[e]);
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
      }, i.length === 3 && Qi(i[2], t[e]);
      return;
    case "SPHEROID":
    case "ELLIPSOID":
      t[e] = {
        name: i[0],
        a: i[1],
        rf: i[2]
      }, i.length === 4 && Qi(i[3], t[e]);
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
      i[0] = ["name", i[0]], yl(t, e, i);
      return;
    default:
      for (n = -1; ++n < i.length; )
        if (!Array.isArray(i[n]))
          return Qi(i, t[e]);
      return yl(t, e, i);
  }
}
var oy = 0.017453292519943295;
function ay(i, t) {
  var e = t[0], n = t[1];
  !(e in i) && n in i && (i[e] = i[n], t.length === 3 && (i[e] = t[2](i[e])));
}
function ve(i) {
  return i * oy;
}
function hy(i) {
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
  function o(l) {
    var c = i.to_meter || 1;
    return l * c;
  }
  var a = function(l) {
    return ay(i, l);
  }, h = [
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
    ["lat0", "latitude_of_center", ve],
    ["longitude_of_center", "Longitude_Of_Center"],
    ["longitude_of_center", "Longitude_of_center"],
    ["longc", "longitude_of_center", ve],
    ["x0", "false_easting", o],
    ["y0", "false_northing", o],
    ["long0", "central_meridian", ve],
    ["lat0", "latitude_of_origin", ve],
    ["lat0", "standard_parallel_1", ve],
    ["lat1", "standard_parallel_1", ve],
    ["lat2", "standard_parallel_2", ve],
    ["azimuth", "Azimuth"],
    ["alpha", "azimuth", ve],
    ["srsCode", "name"]
  ];
  h.forEach(a), !i.long0 && i.longc && (i.projName === "Albers_Conic_Equal_Area" || i.projName === "Lambert_Azimuthal_Equal_Area") && (i.long0 = i.longc), !i.lat_ts && i.lat1 && (i.projName === "Stereographic_South_Pole" || i.projName === "Polar Stereographic (variant B)") && (i.lat0 = ve(i.lat1 > 0 ? 90 : -90), i.lat_ts = i.lat1);
}
function cu(i) {
  var t = ry(i), e = t.shift(), n = t.shift();
  t.unshift(["name", n]), t.unshift(["type", e]);
  var s = {};
  return Qi(t, s), hy(s), s;
}
function It(i) {
  var t = this;
  if (arguments.length === 2) {
    var e = arguments[1];
    typeof e == "string" ? e.charAt(0) === "+" ? It[i] = Xo(arguments[1]) : It[i] = cu(arguments[1]) : It[i] = e;
  } else if (arguments.length === 1) {
    if (Array.isArray(i))
      return i.map(function(n) {
        Array.isArray(n) ? It.apply(t, n) : It(n);
      });
    if (typeof i == "string") {
      if (i in It)
        return It[i];
    } else
      "EPSG" in i ? It["EPSG:" + i.EPSG] = i : "ESRI" in i ? It["ESRI:" + i.ESRI] = i : "IAU2000" in i ? It["IAU2000:" + i.IAU2000] = i : console.log(i);
    return;
  }
}
Km(It);
function ly(i) {
  return typeof i == "string";
}
function cy(i) {
  return i in It;
}
var uy = ["PROJECTEDCRS", "PROJCRS", "GEOGCS", "GEOCCS", "PROJCS", "LOCAL_CS", "GEODCRS", "GEODETICCRS", "GEODETICDATUM", "ENGCRS", "ENGINEERINGCRS"];
function dy(i) {
  return uy.some(function(t) {
    return i.indexOf(t) > -1;
  });
}
var fy = ["3857", "900913", "3785", "102113"];
function gy(i) {
  var t = ti(i, "authority");
  if (!!t) {
    var e = ti(t, "epsg");
    return e && fy.indexOf(e) > -1;
  }
}
function _y(i) {
  var t = ti(i, "extension");
  if (!!t)
    return ti(t, "proj4");
}
function my(i) {
  return i[0] === "+";
}
function yy(i) {
  if (ly(i)) {
    if (cy(i))
      return It[i];
    if (dy(i)) {
      var t = cu(i);
      if (gy(t))
        return It["EPSG:3857"];
      var e = _y(t);
      return e ? Xo(e) : t;
    }
    if (my(i))
      return Xo(i);
  } else
    return i;
}
function pl(i, t) {
  i = i || {};
  var e, n;
  if (!t)
    return i;
  for (n in t)
    e = t[n], e !== void 0 && (i[n] = e);
  return i;
}
function de(i, t, e) {
  var n = i * t;
  return e / Math.sqrt(1 - n * n);
}
function _s(i) {
  return i < 0 ? -1 : 1;
}
function A(i) {
  return Math.abs(i) <= ut ? i : i - _s(i) * ss;
}
function te(i, t, e) {
  var n = i * e, s = 0.5 * i;
  return n = Math.pow((1 - n) / (1 + n), s), Math.tan(0.5 * (E - t)) / n;
}
function os(i, t) {
  for (var e = 0.5 * i, n, s, r = E - 2 * Math.atan(t), o = 0; o <= 15; o++)
    if (n = i * Math.sin(r), s = E - 2 * Math.atan(t * Math.pow((1 - n) / (1 + n), e)) - r, r += s, Math.abs(s) <= 1e-10)
      return r;
  return -9999;
}
function py() {
  var i = this.b / this.a;
  this.es = 1 - i * i, "x0" in this || (this.x0 = 0), "y0" in this || (this.y0 = 0), this.e = Math.sqrt(this.es), this.lat_ts ? this.sphere ? this.k0 = Math.cos(this.lat_ts) : this.k0 = de(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) : this.k0 || (this.k ? this.k0 = this.k : this.k0 = 1);
}
function xy(i) {
  var t = i.x, e = i.y;
  if (e * oe > 90 && e * oe < -90 && t * oe > 180 && t * oe < -180)
    return null;
  var n, s;
  if (Math.abs(Math.abs(e) - E) <= b)
    return null;
  if (this.sphere)
    n = this.x0 + this.a * this.k0 * A(t - this.long0), s = this.y0 + this.a * this.k0 * Math.log(Math.tan(H + 0.5 * e));
  else {
    var r = Math.sin(e), o = te(this.e, e, r);
    n = this.x0 + this.a * this.k0 * A(t - this.long0), s = this.y0 - this.a * this.k0 * Math.log(o);
  }
  return i.x = n, i.y = s, i;
}
function vy(i) {
  var t = i.x - this.x0, e = i.y - this.y0, n, s;
  if (this.sphere)
    s = E - 2 * Math.atan(Math.exp(-e / (this.a * this.k0)));
  else {
    var r = Math.exp(-e / (this.a * this.k0));
    if (s = os(this.e, r), s === -9999)
      return null;
  }
  return n = A(this.long0 + t / (this.a * this.k0)), i.x = n, i.y = s, i;
}
var My = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"];
const Cy = {
  init: py,
  forward: xy,
  inverse: vy,
  names: My
};
function Ey() {
}
function xl(i) {
  return i;
}
var Sy = ["longlat", "identity"];
const Ty = {
  init: Ey,
  forward: xl,
  inverse: xl,
  names: Sy
};
var wy = [Cy, Ty], Zs = {}, Cr = [];
function uu(i, t) {
  var e = Cr.length;
  return i.names ? (Cr[e] = i, i.names.forEach(function(n) {
    Zs[n.toLowerCase()] = e;
  }), this) : (console.log(t), !0);
}
function Ry(i) {
  if (!i)
    return !1;
  var t = i.toLowerCase();
  if (typeof Zs[t] < "u" && Cr[Zs[t]])
    return Cr[Zs[t]];
}
function by() {
  wy.forEach(uu);
}
const Iy = {
  start: by,
  add: uu,
  get: Ry
};
var W = {};
W.MERIT = {
  a: 6378137,
  rf: 298.257,
  ellipseName: "MERIT 1983"
};
W.SGS85 = {
  a: 6378136,
  rf: 298.257,
  ellipseName: "Soviet Geodetic System 85"
};
W.GRS80 = {
  a: 6378137,
  rf: 298.257222101,
  ellipseName: "GRS 1980(IUGG, 1980)"
};
W.IAU76 = {
  a: 6378140,
  rf: 298.257,
  ellipseName: "IAU 1976"
};
W.airy = {
  a: 6377563396e-3,
  b: 635625691e-2,
  ellipseName: "Airy 1830"
};
W.APL4 = {
  a: 6378137,
  rf: 298.25,
  ellipseName: "Appl. Physics. 1965"
};
W.NWL9D = {
  a: 6378145,
  rf: 298.25,
  ellipseName: "Naval Weapons Lab., 1965"
};
W.mod_airy = {
  a: 6377340189e-3,
  b: 6356034446e-3,
  ellipseName: "Modified Airy"
};
W.andrae = {
  a: 637710443e-2,
  rf: 300,
  ellipseName: "Andrae 1876 (Den., Iclnd.)"
};
W.aust_SA = {
  a: 6378160,
  rf: 298.25,
  ellipseName: "Australian Natl & S. Amer. 1969"
};
W.GRS67 = {
  a: 6378160,
  rf: 298.247167427,
  ellipseName: "GRS 67(IUGG 1967)"
};
W.bessel = {
  a: 6377397155e-3,
  rf: 299.1528128,
  ellipseName: "Bessel 1841"
};
W.bess_nam = {
  a: 6377483865e-3,
  rf: 299.1528128,
  ellipseName: "Bessel 1841 (Namibia)"
};
W.clrk66 = {
  a: 63782064e-1,
  b: 63565838e-1,
  ellipseName: "Clarke 1866"
};
W.clrk80 = {
  a: 6378249145e-3,
  rf: 293.4663,
  ellipseName: "Clarke 1880 mod."
};
W.clrk58 = {
  a: 6378293645208759e-9,
  rf: 294.2606763692654,
  ellipseName: "Clarke 1858"
};
W.CPM = {
  a: 63757387e-1,
  rf: 334.29,
  ellipseName: "Comm. des Poids et Mesures 1799"
};
W.delmbr = {
  a: 6376428,
  rf: 311.5,
  ellipseName: "Delambre 1810 (Belgium)"
};
W.engelis = {
  a: 637813605e-2,
  rf: 298.2566,
  ellipseName: "Engelis 1985"
};
W.evrst30 = {
  a: 6377276345e-3,
  rf: 300.8017,
  ellipseName: "Everest 1830"
};
W.evrst48 = {
  a: 6377304063e-3,
  rf: 300.8017,
  ellipseName: "Everest 1948"
};
W.evrst56 = {
  a: 6377301243e-3,
  rf: 300.8017,
  ellipseName: "Everest 1956"
};
W.evrst69 = {
  a: 6377295664e-3,
  rf: 300.8017,
  ellipseName: "Everest 1969"
};
W.evrstSS = {
  a: 6377298556e-3,
  rf: 300.8017,
  ellipseName: "Everest (Sabah & Sarawak)"
};
W.fschr60 = {
  a: 6378166,
  rf: 298.3,
  ellipseName: "Fischer (Mercury Datum) 1960"
};
W.fschr60m = {
  a: 6378155,
  rf: 298.3,
  ellipseName: "Fischer 1960"
};
W.fschr68 = {
  a: 6378150,
  rf: 298.3,
  ellipseName: "Fischer 1968"
};
W.helmert = {
  a: 6378200,
  rf: 298.3,
  ellipseName: "Helmert 1906"
};
W.hough = {
  a: 6378270,
  rf: 297,
  ellipseName: "Hough"
};
W.intl = {
  a: 6378388,
  rf: 297,
  ellipseName: "International 1909 (Hayford)"
};
W.kaula = {
  a: 6378163,
  rf: 298.24,
  ellipseName: "Kaula 1961"
};
W.lerch = {
  a: 6378139,
  rf: 298.257,
  ellipseName: "Lerch 1979"
};
W.mprts = {
  a: 6397300,
  rf: 191,
  ellipseName: "Maupertius 1738"
};
W.new_intl = {
  a: 63781575e-1,
  b: 63567722e-1,
  ellipseName: "New International 1967"
};
W.plessis = {
  a: 6376523,
  rf: 6355863,
  ellipseName: "Plessis 1817 (France)"
};
W.krass = {
  a: 6378245,
  rf: 298.3,
  ellipseName: "Krassovsky, 1942"
};
W.SEasia = {
  a: 6378155,
  b: 63567733205e-4,
  ellipseName: "Southeast Asia"
};
W.walbeck = {
  a: 6376896,
  b: 63558348467e-4,
  ellipseName: "Walbeck"
};
W.WGS60 = {
  a: 6378165,
  rf: 298.3,
  ellipseName: "WGS 60"
};
W.WGS66 = {
  a: 6378145,
  rf: 298.25,
  ellipseName: "WGS 66"
};
W.WGS7 = {
  a: 6378135,
  rf: 298.26,
  ellipseName: "WGS 72"
};
var Ay = W.WGS84 = {
  a: 6378137,
  rf: 298.257223563,
  ellipseName: "WGS 84"
};
W.sphere = {
  a: 6370997,
  b: 6370997,
  ellipseName: "Normal Sphere (r=6370997)"
};
function Py(i, t, e, n) {
  var s = i * i, r = t * t, o = (s - r) / s, a = 0;
  n ? (i *= 1 - o * (Jm + o * (Qm + o * ty)), s = i * i, o = 0) : a = Math.sqrt(o);
  var h = (s - r) / r;
  return {
    es: o,
    e: a,
    ep2: h
  };
}
function Ly(i, t, e, n, s) {
  if (!i) {
    var r = ti(W, n);
    r || (r = Ay), i = r.a, t = r.b, e = r.rf;
  }
  return e && !t && (t = (1 - 1 / e) * i), (e === 0 || Math.abs(i - t) < b) && (s = !0, t = i), {
    a: i,
    b: t,
    rf: e,
    sphere: s
  };
}
var vt = {};
vt.wgs84 = {
  towgs84: "0,0,0",
  ellipse: "WGS84",
  datumName: "WGS84"
};
vt.ch1903 = {
  towgs84: "674.374,15.056,405.346",
  ellipse: "bessel",
  datumName: "swiss"
};
vt.ggrs87 = {
  towgs84: "-199.87,74.79,246.62",
  ellipse: "GRS80",
  datumName: "Greek_Geodetic_Reference_System_1987"
};
vt.nad83 = {
  towgs84: "0,0,0",
  ellipse: "GRS80",
  datumName: "North_American_Datum_1983"
};
vt.nad27 = {
  nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
  ellipse: "clrk66",
  datumName: "North_American_Datum_1927"
};
vt.potsdam = {
  towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7",
  ellipse: "bessel",
  datumName: "Potsdam Rauenberg 1950 DHDN"
};
vt.carthage = {
  towgs84: "-263.0,6.0,431.0",
  ellipse: "clark80",
  datumName: "Carthage 1934 Tunisia"
};
vt.hermannskogel = {
  towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
  ellipse: "bessel",
  datumName: "Hermannskogel"
};
vt.osni52 = {
  towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
  ellipse: "airy",
  datumName: "Irish National"
};
vt.ire65 = {
  towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
  ellipse: "mod_airy",
  datumName: "Ireland 1965"
};
vt.rassadiran = {
  towgs84: "-133.63,-157.5,-158.62",
  ellipse: "intl",
  datumName: "Rassadiran"
};
vt.nzgd49 = {
  towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
  ellipse: "intl",
  datumName: "New Zealand Geodetic Datum 1949"
};
vt.osgb36 = {
  towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
  ellipse: "airy",
  datumName: "Airy 1830"
};
vt.s_jtsk = {
  towgs84: "589,76,480",
  ellipse: "bessel",
  datumName: "S-JTSK (Ferro)"
};
vt.beduaram = {
  towgs84: "-106,-87,188",
  ellipse: "clrk80",
  datumName: "Beduaram"
};
vt.gunung_segara = {
  towgs84: "-403,684,41",
  ellipse: "bessel",
  datumName: "Gunung Segara Jakarta"
};
vt.rnb72 = {
  towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
  ellipse: "intl",
  datumName: "Reseau National Belge 1972"
};
function Oy(i, t, e, n, s, r, o) {
  var a = {};
  return i === void 0 || i === "none" ? a.datum_type = Uo : a.datum_type = Hm, t && (a.datum_params = t.map(parseFloat), (a.datum_params[0] !== 0 || a.datum_params[1] !== 0 || a.datum_params[2] !== 0) && (a.datum_type = wi), a.datum_params.length > 3 && (a.datum_params[3] !== 0 || a.datum_params[4] !== 0 || a.datum_params[5] !== 0 || a.datum_params[6] !== 0) && (a.datum_type = Ri, a.datum_params[3] *= jn, a.datum_params[4] *= jn, a.datum_params[5] *= jn, a.datum_params[6] = a.datum_params[6] / 1e6 + 1)), o && (a.datum_type = Hs, a.grids = o), a.a = e, a.b = n, a.es = s, a.ep2 = r, a;
}
var du = {};
function Fy(i, t) {
  var e = new DataView(t), n = ky(e), s = Gy(e, n);
  s.nSubgrids > 1 && console.log("Only single NTv2 subgrids are currently supported, subsequent sub grids are ignored");
  var r = $y(e, s, n), o = { header: s, subgrids: r };
  return du[i] = o, o;
}
function Dy(i) {
  if (i === void 0)
    return null;
  var t = i.split(",");
  return t.map(Ny);
}
function Ny(i) {
  if (i.length === 0)
    return null;
  var t = i[0] === "@";
  return t && (i = i.slice(1)), i === "null" ? { name: "null", mandatory: !t, grid: null, isNull: !0 } : {
    name: i,
    mandatory: !t,
    grid: du[i] || null,
    isNull: !1
  };
}
function tn(i) {
  return i / 3600 * Math.PI / 180;
}
function ky(i) {
  var t = i.getInt32(8, !1);
  return t === 11 ? !1 : (t = i.getInt32(8, !0), t !== 11 && console.warn("Failed to detect nadgrid endian-ness, defaulting to little-endian"), !0);
}
function Gy(i, t) {
  return {
    nFields: i.getInt32(8, t),
    nSubgridFields: i.getInt32(24, t),
    nSubgrids: i.getInt32(40, t),
    shiftType: Yo(i, 56, 56 + 8).trim(),
    fromSemiMajorAxis: i.getFloat64(120, t),
    fromSemiMinorAxis: i.getFloat64(136, t),
    toSemiMajorAxis: i.getFloat64(152, t),
    toSemiMinorAxis: i.getFloat64(168, t)
  };
}
function Yo(i, t, e) {
  return String.fromCharCode.apply(null, new Uint8Array(i.buffer.slice(t, e)));
}
function $y(i, t, e) {
  for (var n = 176, s = [], r = 0; r < t.nSubgrids; r++) {
    var o = By(i, n, e), a = Wy(i, n, o, e), h = Math.round(
      1 + (o.upperLongitude - o.lowerLongitude) / o.longitudeInterval
    ), l = Math.round(
      1 + (o.upperLatitude - o.lowerLatitude) / o.latitudeInterval
    );
    s.push({
      ll: [tn(o.lowerLongitude), tn(o.lowerLatitude)],
      del: [tn(o.longitudeInterval), tn(o.latitudeInterval)],
      lim: [h, l],
      count: o.gridNodeCount,
      cvs: zy(a)
    });
  }
  return s;
}
function zy(i) {
  return i.map(function(t) {
    return [tn(t.longitudeShift), tn(t.latitudeShift)];
  });
}
function By(i, t, e) {
  return {
    name: Yo(i, t + 8, t + 16).trim(),
    parent: Yo(i, t + 24, t + 24 + 8).trim(),
    lowerLatitude: i.getFloat64(t + 72, e),
    upperLatitude: i.getFloat64(t + 88, e),
    lowerLongitude: i.getFloat64(t + 104, e),
    upperLongitude: i.getFloat64(t + 120, e),
    latitudeInterval: i.getFloat64(t + 136, e),
    longitudeInterval: i.getFloat64(t + 152, e),
    gridNodeCount: i.getInt32(t + 168, e)
  };
}
function Wy(i, t, e, n) {
  for (var s = t + 176, r = 16, o = [], a = 0; a < e.gridNodeCount; a++) {
    var h = {
      latitudeShift: i.getFloat32(s + a * r, n),
      longitudeShift: i.getFloat32(s + a * r + 4, n),
      latitudeAccuracy: i.getFloat32(s + a * r + 8, n),
      longitudeAccuracy: i.getFloat32(s + a * r + 12, n)
    };
    o.push(h);
  }
  return o;
}
function ce(i, t) {
  if (!(this instanceof ce))
    return new ce(i);
  t = t || function(l) {
    if (l)
      throw l;
  };
  var e = yy(i);
  if (typeof e != "object") {
    t(i);
    return;
  }
  var n = ce.projections.get(e.projName);
  if (!n) {
    t(i);
    return;
  }
  if (e.datumCode && e.datumCode !== "none") {
    var s = ti(vt, e.datumCode);
    s && (e.datum_params = e.datum_params || (s.towgs84 ? s.towgs84.split(",") : null), e.ellps = s.ellipse, e.datumName = s.datumName ? s.datumName : e.datumCode);
  }
  e.k0 = e.k0 || 1, e.axis = e.axis || "enu", e.ellps = e.ellps || "wgs84", e.lat1 = e.lat1 || e.lat0;
  var r = Ly(e.a, e.b, e.rf, e.ellps, e.sphere), o = Py(r.a, r.b, r.rf, e.R_A), a = Dy(e.nadgrids), h = e.datum || Oy(
    e.datumCode,
    e.datum_params,
    r.a,
    r.b,
    o.es,
    o.ep2,
    a
  );
  pl(this, e), pl(this, n), this.a = r.a, this.b = r.b, this.rf = r.rf, this.sphere = r.sphere, this.es = o.es, this.e = o.e, this.ep2 = o.ep2, this.datum = h, this.init(), t(null, this);
}
ce.projections = Iy;
ce.projections.start();
function jy(i, t) {
  return i.datum_type !== t.datum_type || i.a !== t.a || Math.abs(i.es - t.es) > 5e-11 ? !1 : i.datum_type === wi ? i.datum_params[0] === t.datum_params[0] && i.datum_params[1] === t.datum_params[1] && i.datum_params[2] === t.datum_params[2] : i.datum_type === Ri ? i.datum_params[0] === t.datum_params[0] && i.datum_params[1] === t.datum_params[1] && i.datum_params[2] === t.datum_params[2] && i.datum_params[3] === t.datum_params[3] && i.datum_params[4] === t.datum_params[4] && i.datum_params[5] === t.datum_params[5] && i.datum_params[6] === t.datum_params[6] : !0;
}
function fu(i, t, e) {
  var n = i.x, s = i.y, r = i.z ? i.z : 0, o, a, h, l;
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
  return n > Math.PI && (n -= 2 * Math.PI), a = Math.sin(s), l = Math.cos(s), h = a * a, o = e / Math.sqrt(1 - t * h), {
    x: (o + r) * l * Math.cos(n),
    y: (o + r) * l * Math.sin(n),
    z: (o * (1 - t) + r) * a
  };
}
function gu(i, t, e, n) {
  var s = 1e-12, r = s * s, o = 30, a, h, l, c, u, d, f, g, _, m, y, p, x, v = i.x, M = i.y, C = i.z ? i.z : 0, S, w, P;
  if (a = Math.sqrt(v * v + M * M), h = Math.sqrt(v * v + M * M + C * C), a / e < s) {
    if (S = 0, h / e < s)
      return w = E, P = -n, {
        x: i.x,
        y: i.y,
        z: i.z
      };
  } else
    S = Math.atan2(M, v);
  l = C / h, c = a / h, u = 1 / Math.sqrt(1 - t * (2 - t) * c * c), g = c * (1 - t) * u, _ = l * u, x = 0;
  do
    x++, f = e / Math.sqrt(1 - t * _ * _), P = a * g + C * _ - f * (1 - t * _ * _), d = t * f / (f + P), u = 1 / Math.sqrt(1 - d * (2 - d) * c * c), m = c * (1 - d) * u, y = l * u, p = y * g - m * _, g = m, _ = y;
  while (p * p > r && x < o);
  return w = Math.atan(y / Math.abs(m)), {
    x: S,
    y: w,
    z: P
  };
}
function Uy(i, t, e) {
  if (t === wi)
    return {
      x: i.x + e[0],
      y: i.y + e[1],
      z: i.z + e[2]
    };
  if (t === Ri) {
    var n = e[0], s = e[1], r = e[2], o = e[3], a = e[4], h = e[5], l = e[6];
    return {
      x: l * (i.x - h * i.y + a * i.z) + n,
      y: l * (h * i.x + i.y - o * i.z) + s,
      z: l * (-a * i.x + o * i.y + i.z) + r
    };
  }
}
function Xy(i, t, e) {
  if (t === wi)
    return {
      x: i.x - e[0],
      y: i.y - e[1],
      z: i.z - e[2]
    };
  if (t === Ri) {
    var n = e[0], s = e[1], r = e[2], o = e[3], a = e[4], h = e[5], l = e[6], c = (i.x - n) / l, u = (i.y - s) / l, d = (i.z - r) / l;
    return {
      x: c + h * u - a * d,
      y: -h * c + u + o * d,
      z: a * c - o * u + d
    };
  }
}
function Ys(i) {
  return i === wi || i === Ri;
}
function Yy(i, t, e) {
  if (jy(i, t) || i.datum_type === Uo || t.datum_type === Uo)
    return e;
  var n = i.a, s = i.es;
  if (i.datum_type === Hs) {
    var r = vl(i, !1, e);
    if (r !== 0)
      return;
    n = gl, s = _l;
  }
  var o = t.a, a = t.b, h = t.es;
  if (t.datum_type === Hs && (o = gl, a = Zm, h = _l), s === h && n === o && !Ys(i.datum_type) && !Ys(t.datum_type))
    return e;
  if (e = fu(e, s, n), Ys(i.datum_type) && (e = Uy(e, i.datum_type, i.datum_params)), Ys(t.datum_type) && (e = Xy(e, t.datum_type, t.datum_params)), e = gu(e, h, o, a), t.datum_type === Hs) {
    var l = vl(t, !0, e);
    if (l !== 0)
      return;
  }
  return e;
}
function vl(i, t, e) {
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
    var h = a.grid.subgrids[0], l = (Math.abs(h.del[1]) + Math.abs(h.del[0])) / 1e4, c = h.ll[0] - l, u = h.ll[1] - l, d = h.ll[0] + (h.lim[0] - 1) * h.del[0] + l, f = h.ll[1] + (h.lim[1] - 1) * h.del[1] + l;
    if (!(u > n.y || c > n.x || f < n.y || d < n.x) && (s = Vy(n, t, h), !isNaN(s.x)))
      break;
  }
  return isNaN(s.x) ? (console.log("Failed to find a grid shift table for location '" + -n.x * oe + " " + n.y * oe + " tried: '" + r + "'"), -1) : (e.x = -s.x, e.y = s.y, 0);
}
function Vy(i, t, e) {
  var n = { x: Number.NaN, y: Number.NaN };
  if (isNaN(i.x))
    return n;
  var s = { x: i.x, y: i.y };
  s.x -= e.ll[0], s.y -= e.ll[1], s.x = A(s.x - Math.PI) + Math.PI;
  var r = Ml(s, e);
  if (t) {
    if (isNaN(r.x))
      return n;
    r.x = s.x - r.x, r.y = s.y - r.y;
    var o = 9, a = 1e-12, h, l;
    do {
      if (l = Ml(r, e), isNaN(l.x)) {
        console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
        break;
      }
      h = { x: s.x - (l.x + r.x), y: s.y - (l.y + r.y) }, r.x += h.x, r.y += h.y;
    } while (o-- && Math.abs(h.x) > a && Math.abs(h.y) > a);
    if (o < 0)
      return console.log("Inverse grid shift iterator failed to converge."), n;
    n.x = A(r.x + e.ll[0]), n.y = r.y + e.ll[1];
  } else
    isNaN(r.x) || (n.x = i.x + r.x, n.y = i.y + r.y);
  return n;
}
function Ml(i, t) {
  var e = { x: i.x / t.del[0], y: i.y / t.del[1] }, n = { x: Math.floor(e.x), y: Math.floor(e.y) }, s = { x: e.x - 1 * n.x, y: e.y - 1 * n.y }, r = { x: Number.NaN, y: Number.NaN }, o;
  if (n.x < 0 || n.x >= t.lim[0] || n.y < 0 || n.y >= t.lim[1])
    return r;
  o = n.y * t.lim[0] + n.x;
  var a = { x: t.cvs[o][0], y: t.cvs[o][1] };
  o++;
  var h = { x: t.cvs[o][0], y: t.cvs[o][1] };
  o += t.lim[0];
  var l = { x: t.cvs[o][0], y: t.cvs[o][1] };
  o--;
  var c = { x: t.cvs[o][0], y: t.cvs[o][1] }, u = s.x * s.y, d = s.x * (1 - s.y), f = (1 - s.x) * (1 - s.y), g = (1 - s.x) * s.y;
  return r.x = f * a.x + d * h.x + g * c.x + u * l.x, r.y = f * a.y + d * h.y + g * c.y + u * l.y, r;
}
function Cl(i, t, e) {
  var n = e.x, s = e.y, r = e.z || 0, o, a, h, l = {};
  for (h = 0; h < 3; h++)
    if (!(t && h === 2 && e.z === void 0))
      switch (h === 0 ? (o = n, "ew".indexOf(i.axis[h]) !== -1 ? a = "x" : a = "y") : h === 1 ? (o = s, "ns".indexOf(i.axis[h]) !== -1 ? a = "y" : a = "x") : (o = r, a = "z"), i.axis[h]) {
        case "e":
          l[a] = o;
          break;
        case "w":
          l[a] = -o;
          break;
        case "n":
          l[a] = o;
          break;
        case "s":
          l[a] = -o;
          break;
        case "u":
          e[a] !== void 0 && (l.z = o);
          break;
        case "d":
          e[a] !== void 0 && (l.z = -o);
          break;
        default:
          return null;
      }
  return l;
}
function _u(i) {
  var t = {
    x: i[0],
    y: i[1]
  };
  return i.length > 2 && (t.z = i[2]), i.length > 3 && (t.m = i[3]), t;
}
function qy(i) {
  El(i.x), El(i.y);
}
function El(i) {
  if (typeof Number.isFinite == "function") {
    if (Number.isFinite(i))
      return;
    throw new TypeError("coordinates must be finite numbers");
  }
  if (typeof i != "number" || i !== i || !isFinite(i))
    throw new TypeError("coordinates must be finite numbers");
}
function Ky(i, t) {
  return (i.datum.datum_type === wi || i.datum.datum_type === Ri) && t.datumCode !== "WGS84" || (t.datum.datum_type === wi || t.datum.datum_type === Ri) && i.datumCode !== "WGS84";
}
function Er(i, t, e, n) {
  var s;
  if (Array.isArray(e) && (e = _u(e)), qy(e), i.datum && t.datum && Ky(i, t) && (s = new ce("WGS84"), e = Er(i, s, e, n), i = s), n && i.axis !== "enu" && (e = Cl(i, !1, e)), i.projName === "longlat")
    e = {
      x: e.x * Ct,
      y: e.y * Ct,
      z: e.z || 0
    };
  else if (i.to_meter && (e = {
    x: e.x * i.to_meter,
    y: e.y * i.to_meter,
    z: e.z || 0
  }), e = i.inverse(e), !e)
    return;
  if (i.from_greenwich && (e.x += i.from_greenwich), e = Yy(i.datum, t.datum, e), !!e)
    return t.from_greenwich && (e = {
      x: e.x - t.from_greenwich,
      y: e.y,
      z: e.z || 0
    }), t.projName === "longlat" ? e = {
      x: e.x * oe,
      y: e.y * oe,
      z: e.z || 0
    } : (e = t.forward(e), t.to_meter && (e = {
      x: e.x / t.to_meter,
      y: e.y / t.to_meter,
      z: e.z || 0
    })), n && t.axis !== "enu" ? Cl(t, !0, e) : e;
}
var Sl = ce("WGS84");
function vo(i, t, e, n) {
  var s, r, o;
  return Array.isArray(e) ? (s = Er(i, t, e, n) || { x: NaN, y: NaN }, e.length > 2 ? typeof i.name < "u" && i.name === "geocent" || typeof t.name < "u" && t.name === "geocent" ? typeof s.z == "number" ? [s.x, s.y, s.z].concat(e.splice(3)) : [s.x, s.y, e[2]].concat(e.splice(3)) : [s.x, s.y].concat(e.splice(2)) : [s.x, s.y]) : (r = Er(i, t, e, n), o = Object.keys(e), o.length === 2 || o.forEach(function(a) {
    if (typeof i.name < "u" && i.name === "geocent" || typeof t.name < "u" && t.name === "geocent") {
      if (a === "x" || a === "y" || a === "z")
        return;
    } else if (a === "x" || a === "y")
      return;
    r[a] = e[a];
  }), r);
}
function Tl(i) {
  return i instanceof ce ? i : i.oProj ? i.oProj : ce(i);
}
function wt(i, t, e) {
  i = Tl(i);
  var n = !1, s;
  return typeof t > "u" ? (t = i, i = Sl, n = !0) : (typeof t.x < "u" || Array.isArray(t)) && (e = t, t = i, i = Sl, n = !0), t = Tl(t), e ? vo(i, t, e) : (s = {
    forward: function(r, o) {
      return vo(i, t, r, o);
    },
    inverse: function(r, o) {
      return vo(t, i, r, o);
    }
  }, n && (s.oProj = t), s);
}
var wl = 6, mu = "AJSAJS", yu = "AFAFAF", en = 65, Ft = 73, Vt = 79, Nn = 86, kn = 90;
const Hy = {
  forward: pu,
  inverse: Zy,
  toPoint: xu
};
function pu(i, t) {
  return t = t || 5, tp(Jy({
    lat: i[1],
    lon: i[0]
  }), t);
}
function Zy(i) {
  var t = Xa(Mu(i.toUpperCase()));
  return t.lat && t.lon ? [t.lon, t.lat, t.lon, t.lat] : [t.left, t.bottom, t.right, t.top];
}
function xu(i) {
  var t = Xa(Mu(i.toUpperCase()));
  return t.lat && t.lon ? [t.lon, t.lat] : [(t.left + t.right) / 2, (t.top + t.bottom) / 2];
}
function Mo(i) {
  return i * (Math.PI / 180);
}
function Rl(i) {
  return 180 * (i / Math.PI);
}
function Jy(i) {
  var t = i.lat, e = i.lon, n = 6378137, s = 669438e-8, r = 0.9996, o, a, h, l, c, u, d, f = Mo(t), g = Mo(e), _, m;
  m = Math.floor((e + 180) / 6) + 1, e === 180 && (m = 60), t >= 56 && t < 64 && e >= 3 && e < 12 && (m = 32), t >= 72 && t < 84 && (e >= 0 && e < 9 ? m = 31 : e >= 9 && e < 21 ? m = 33 : e >= 21 && e < 33 ? m = 35 : e >= 33 && e < 42 && (m = 37)), o = (m - 1) * 6 - 180 + 3, _ = Mo(o), a = s / (1 - s), h = n / Math.sqrt(1 - s * Math.sin(f) * Math.sin(f)), l = Math.tan(f) * Math.tan(f), c = a * Math.cos(f) * Math.cos(f), u = Math.cos(f) * (g - _), d = n * ((1 - s / 4 - 3 * s * s / 64 - 5 * s * s * s / 256) * f - (3 * s / 8 + 3 * s * s / 32 + 45 * s * s * s / 1024) * Math.sin(2 * f) + (15 * s * s / 256 + 45 * s * s * s / 1024) * Math.sin(4 * f) - 35 * s * s * s / 3072 * Math.sin(6 * f));
  var y = r * h * (u + (1 - l + c) * u * u * u / 6 + (5 - 18 * l + l * l + 72 * c - 58 * a) * u * u * u * u * u / 120) + 5e5, p = r * (d + h * Math.tan(f) * (u * u / 2 + (5 - l + 9 * c + 4 * c * c) * u * u * u * u / 24 + (61 - 58 * l + l * l + 600 * c - 330 * a) * u * u * u * u * u * u / 720));
  return t < 0 && (p += 1e7), {
    northing: Math.round(p),
    easting: Math.round(y),
    zoneNumber: m,
    zoneLetter: Qy(t)
  };
}
function Xa(i) {
  var t = i.northing, e = i.easting, n = i.zoneLetter, s = i.zoneNumber;
  if (s < 0 || s > 60)
    return null;
  var r = 0.9996, o = 6378137, a = 669438e-8, h, l = (1 - Math.sqrt(1 - a)) / (1 + Math.sqrt(1 - a)), c, u, d, f, g, _, m, y, p, x = e - 5e5, v = t;
  n < "N" && (v -= 1e7), m = (s - 1) * 6 - 180 + 3, h = a / (1 - a), _ = v / r, y = _ / (o * (1 - a / 4 - 3 * a * a / 64 - 5 * a * a * a / 256)), p = y + (3 * l / 2 - 27 * l * l * l / 32) * Math.sin(2 * y) + (21 * l * l / 16 - 55 * l * l * l * l / 32) * Math.sin(4 * y) + 151 * l * l * l / 96 * Math.sin(6 * y), c = o / Math.sqrt(1 - a * Math.sin(p) * Math.sin(p)), u = Math.tan(p) * Math.tan(p), d = h * Math.cos(p) * Math.cos(p), f = o * (1 - a) / Math.pow(1 - a * Math.sin(p) * Math.sin(p), 1.5), g = x / (c * r);
  var M = p - c * Math.tan(p) / f * (g * g / 2 - (5 + 3 * u + 10 * d - 4 * d * d - 9 * h) * g * g * g * g / 24 + (61 + 90 * u + 298 * d + 45 * u * u - 252 * h - 3 * d * d) * g * g * g * g * g * g / 720);
  M = Rl(M);
  var C = (g - (1 + 2 * u + d) * g * g * g / 6 + (5 - 2 * d + 28 * u - 3 * d * d + 8 * h + 24 * u * u) * g * g * g * g * g / 120) / Math.cos(p);
  C = m + Rl(C);
  var S;
  if (i.accuracy) {
    var w = Xa({
      northing: i.northing + i.accuracy,
      easting: i.easting + i.accuracy,
      zoneLetter: i.zoneLetter,
      zoneNumber: i.zoneNumber
    });
    S = {
      top: w.lat,
      right: w.lon,
      bottom: M,
      left: C
    };
  } else
    S = {
      lat: M,
      lon: C
    };
  return S;
}
function Qy(i) {
  var t = "Z";
  return 84 >= i && i >= 72 ? t = "X" : 72 > i && i >= 64 ? t = "W" : 64 > i && i >= 56 ? t = "V" : 56 > i && i >= 48 ? t = "U" : 48 > i && i >= 40 ? t = "T" : 40 > i && i >= 32 ? t = "S" : 32 > i && i >= 24 ? t = "R" : 24 > i && i >= 16 ? t = "Q" : 16 > i && i >= 8 ? t = "P" : 8 > i && i >= 0 ? t = "N" : 0 > i && i >= -8 ? t = "M" : -8 > i && i >= -16 ? t = "L" : -16 > i && i >= -24 ? t = "K" : -24 > i && i >= -32 ? t = "J" : -32 > i && i >= -40 ? t = "H" : -40 > i && i >= -48 ? t = "G" : -48 > i && i >= -56 ? t = "F" : -56 > i && i >= -64 ? t = "E" : -64 > i && i >= -72 ? t = "D" : -72 > i && i >= -80 && (t = "C"), t;
}
function tp(i, t) {
  var e = "00000" + i.easting, n = "00000" + i.northing;
  return i.zoneNumber + i.zoneLetter + ep(i.easting, i.northing, i.zoneNumber) + e.substr(e.length - 5, t) + n.substr(n.length - 5, t);
}
function ep(i, t, e) {
  var n = vu(e), s = Math.floor(i / 1e5), r = Math.floor(t / 1e5) % 20;
  return ip(s, r, n);
}
function vu(i) {
  var t = i % wl;
  return t === 0 && (t = wl), t;
}
function ip(i, t, e) {
  var n = e - 1, s = mu.charCodeAt(n), r = yu.charCodeAt(n), o = s + i - 1, a = r + t, h = !1;
  o > kn && (o = o - kn + en - 1, h = !0), (o === Ft || s < Ft && o > Ft || (o > Ft || s < Ft) && h) && o++, (o === Vt || s < Vt && o > Vt || (o > Vt || s < Vt) && h) && (o++, o === Ft && o++), o > kn && (o = o - kn + en - 1), a > Nn ? (a = a - Nn + en - 1, h = !0) : h = !1, (a === Ft || r < Ft && a > Ft || (a > Ft || r < Ft) && h) && a++, (a === Vt || r < Vt && a > Vt || (a > Vt || r < Vt) && h) && (a++, a === Ft && a++), a > Nn && (a = a - Nn + en - 1);
  var l = String.fromCharCode(o) + String.fromCharCode(a);
  return l;
}
function Mu(i) {
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
  for (var h = vu(o), l = np(e.charAt(0), h), c = sp(e.charAt(1), h); c < rp(a); )
    c += 2e6;
  var u = t - r;
  if (u % 2 !== 0)
    throw `MGRSPoint has to have an even number 
of digits after the zone letter and two 100km letters - front 
half for easting meters, second half for 
northing meters` + i;
  var d = u / 2, f = 0, g = 0, _, m, y, p, x;
  return d > 0 && (_ = 1e5 / Math.pow(10, d), m = i.substring(r, r + d), f = parseFloat(m) * _, y = i.substring(r + d), g = parseFloat(y) * _), p = f + l, x = g + c, {
    easting: p,
    northing: x,
    zoneLetter: a,
    zoneNumber: o,
    accuracy: _
  };
}
function np(i, t) {
  for (var e = mu.charCodeAt(t - 1), n = 1e5, s = !1; e !== i.charCodeAt(0); ) {
    if (e++, e === Ft && e++, e === Vt && e++, e > kn) {
      if (s)
        throw "Bad character: " + i;
      e = en, s = !0;
    }
    n += 1e5;
  }
  return n;
}
function sp(i, t) {
  if (i > "V")
    throw "MGRSPoint given invalid Northing " + i;
  for (var e = yu.charCodeAt(t - 1), n = 0, s = !1; e !== i.charCodeAt(0); ) {
    if (e++, e === Ft && e++, e === Vt && e++, e > Nn) {
      if (s)
        throw "Bad character: " + i;
      e = en, s = !0;
    }
    n += 1e5;
  }
  return n;
}
function rp(i) {
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
function xn(i, t, e) {
  if (!(this instanceof xn))
    return new xn(i, t, e);
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
xn.fromMGRS = function(i) {
  return new xn(xu(i));
};
xn.prototype.toMGRS = function(i) {
  return pu([this.x, this.y], i);
};
var op = 1, ap = 0.25, bl = 0.046875, Il = 0.01953125, Al = 0.01068115234375, hp = 0.75, lp = 0.46875, cp = 0.013020833333333334, up = 0.007120768229166667, dp = 0.3645833333333333, fp = 0.005696614583333333, gp = 0.3076171875;
function Cu(i) {
  var t = [];
  t[0] = op - i * (ap + i * (bl + i * (Il + i * Al))), t[1] = i * (hp - i * (bl + i * (Il + i * Al)));
  var e = i * i;
  return t[2] = e * (lp - i * (cp + i * up)), e *= i, t[3] = e * (dp - i * fp), t[4] = e * i * gp, t;
}
function jr(i, t, e, n) {
  return e *= t, t *= t, n[0] * i - e * (n[1] + t * (n[2] + t * (n[3] + t * n[4])));
}
var _p = 20;
function Eu(i, t, e) {
  for (var n = 1 / (1 - t), s = i, r = _p; r; --r) {
    var o = Math.sin(s), a = 1 - t * o * o;
    if (a = (jr(s, o, Math.cos(s), e) - i) * (a * Math.sqrt(a)) * n, s -= a, Math.abs(a) < b)
      return s;
  }
  return s;
}
function mp() {
  this.x0 = this.x0 !== void 0 ? this.x0 : 0, this.y0 = this.y0 !== void 0 ? this.y0 : 0, this.long0 = this.long0 !== void 0 ? this.long0 : 0, this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0, this.es && (this.en = Cu(this.es), this.ml0 = jr(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en));
}
function yp(i) {
  var t = i.x, e = i.y, n = A(t - this.long0), s, r, o, a = Math.sin(e), h = Math.cos(e);
  if (this.es) {
    var c = h * n, u = Math.pow(c, 2), d = this.ep2 * Math.pow(h, 2), f = Math.pow(d, 2), g = Math.abs(h) > b ? Math.tan(e) : 0, _ = Math.pow(g, 2), m = Math.pow(_, 2);
    s = 1 - this.es * Math.pow(a, 2), c = c / Math.sqrt(s);
    var y = jr(e, a, h, this.en);
    r = this.a * (this.k0 * c * (1 + u / 6 * (1 - _ + d + u / 20 * (5 - 18 * _ + m + 14 * d - 58 * _ * d + u / 42 * (61 + 179 * m - m * _ - 479 * _))))) + this.x0, o = this.a * (this.k0 * (y - this.ml0 + a * n * c / 2 * (1 + u / 12 * (5 - _ + 9 * d + 4 * f + u / 30 * (61 + m - 58 * _ + 270 * d - 330 * _ * d + u / 56 * (1385 + 543 * m - m * _ - 3111 * _)))))) + this.y0;
  } else {
    var l = h * Math.sin(n);
    if (Math.abs(Math.abs(l) - 1) < b)
      return 93;
    if (r = 0.5 * this.a * this.k0 * Math.log((1 + l) / (1 - l)) + this.x0, o = h * Math.cos(n) / Math.sqrt(1 - Math.pow(l, 2)), l = Math.abs(o), l >= 1) {
      if (l - 1 > b)
        return 93;
      o = 0;
    } else
      o = Math.acos(o);
    e < 0 && (o = -o), o = this.a * this.k0 * (o - this.lat0) + this.y0;
  }
  return i.x = r, i.y = o, i;
}
function pp(i) {
  var t, e, n, s, r = (i.x - this.x0) * (1 / this.a), o = (i.y - this.y0) * (1 / this.a);
  if (this.es)
    if (t = this.ml0 + o / this.k0, e = Eu(t, this.es, this.en), Math.abs(e) < E) {
      var u = Math.sin(e), d = Math.cos(e), f = Math.abs(d) > b ? Math.tan(e) : 0, g = this.ep2 * Math.pow(d, 2), _ = Math.pow(g, 2), m = Math.pow(f, 2), y = Math.pow(m, 2);
      t = 1 - this.es * Math.pow(u, 2);
      var p = r * Math.sqrt(t) / this.k0, x = Math.pow(p, 2);
      t = t * f, n = e - t * x / (1 - this.es) * 0.5 * (1 - x / 12 * (5 + 3 * m - 9 * g * m + g - 4 * _ - x / 30 * (61 + 90 * m - 252 * g * m + 45 * y + 46 * g - x / 56 * (1385 + 3633 * m + 4095 * y + 1574 * y * m)))), s = A(this.long0 + p * (1 - x / 6 * (1 + 2 * m + g - x / 20 * (5 + 28 * m + 24 * y + 8 * g * m + 6 * g - x / 42 * (61 + 662 * m + 1320 * y + 720 * y * m)))) / d);
    } else
      n = E * _s(o), s = 0;
  else {
    var a = Math.exp(r / this.k0), h = 0.5 * (a - 1 / a), l = this.lat0 + o / this.k0, c = Math.cos(l);
    t = Math.sqrt((1 - Math.pow(c, 2)) / (1 + Math.pow(h, 2))), n = Math.asin(t), o < 0 && (n = -n), h === 0 && c === 0 ? s = 0 : s = A(Math.atan2(h, c) + this.long0);
  }
  return i.x = s, i.y = n, i;
}
var xp = ["Fast_Transverse_Mercator", "Fast Transverse Mercator"];
const Js = {
  init: mp,
  forward: yp,
  inverse: pp,
  names: xp
};
function Su(i) {
  var t = Math.exp(i);
  return t = (t - 1 / t) / 2, t;
}
function Qt(i, t) {
  i = Math.abs(i), t = Math.abs(t);
  var e = Math.max(i, t), n = Math.min(i, t) / (e || 1);
  return e * Math.sqrt(1 + Math.pow(n, 2));
}
function vp(i) {
  var t = 1 + i, e = t - 1;
  return e === 0 ? i : i * Math.log(t) / e;
}
function Mp(i) {
  var t = Math.abs(i);
  return t = vp(t * (1 + t / (Qt(1, t) + 1))), i < 0 ? -t : t;
}
function Ya(i, t) {
  for (var e = 2 * Math.cos(2 * t), n = i.length - 1, s = i[n], r = 0, o; --n >= 0; )
    o = -r + e * s + i[n], r = s, s = o;
  return t + o * Math.sin(2 * t);
}
function Cp(i, t) {
  for (var e = 2 * Math.cos(t), n = i.length - 1, s = i[n], r = 0, o; --n >= 0; )
    o = -r + e * s + i[n], r = s, s = o;
  return Math.sin(t) * o;
}
function Ep(i) {
  var t = Math.exp(i);
  return t = (t + 1 / t) / 2, t;
}
function Tu(i, t, e) {
  for (var n = Math.sin(t), s = Math.cos(t), r = Su(e), o = Ep(e), a = 2 * s * o, h = -2 * n * r, l = i.length - 1, c = i[l], u = 0, d = 0, f = 0, g, _; --l >= 0; )
    g = d, _ = u, d = c, u = f, c = -g + a * d - h * u + i[l], f = -_ + h * d + a * u;
  return a = n * o, h = s * r, [a * c - h * f, a * f + h * c];
}
function Sp() {
  if (!this.approx && (isNaN(this.es) || this.es <= 0))
    throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');
  this.approx && (Js.init.apply(this), this.forward = Js.forward, this.inverse = Js.inverse), this.x0 = this.x0 !== void 0 ? this.x0 : 0, this.y0 = this.y0 !== void 0 ? this.y0 : 0, this.long0 = this.long0 !== void 0 ? this.long0 : 0, this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0, this.cgb = [], this.cbg = [], this.utg = [], this.gtu = [];
  var i = this.es / (1 + Math.sqrt(1 - this.es)), t = i / (2 - i), e = t;
  this.cgb[0] = t * (2 + t * (-2 / 3 + t * (-2 + t * (116 / 45 + t * (26 / 45 + t * (-2854 / 675)))))), this.cbg[0] = t * (-2 + t * (2 / 3 + t * (4 / 3 + t * (-82 / 45 + t * (32 / 45 + t * (4642 / 4725)))))), e = e * t, this.cgb[1] = e * (7 / 3 + t * (-8 / 5 + t * (-227 / 45 + t * (2704 / 315 + t * (2323 / 945))))), this.cbg[1] = e * (5 / 3 + t * (-16 / 15 + t * (-13 / 9 + t * (904 / 315 + t * (-1522 / 945))))), e = e * t, this.cgb[2] = e * (56 / 15 + t * (-136 / 35 + t * (-1262 / 105 + t * (73814 / 2835)))), this.cbg[2] = e * (-26 / 15 + t * (34 / 21 + t * (8 / 5 + t * (-12686 / 2835)))), e = e * t, this.cgb[3] = e * (4279 / 630 + t * (-332 / 35 + t * (-399572 / 14175))), this.cbg[3] = e * (1237 / 630 + t * (-12 / 5 + t * (-24832 / 14175))), e = e * t, this.cgb[4] = e * (4174 / 315 + t * (-144838 / 6237)), this.cbg[4] = e * (-734 / 315 + t * (109598 / 31185)), e = e * t, this.cgb[5] = e * (601676 / 22275), this.cbg[5] = e * (444337 / 155925), e = Math.pow(t, 2), this.Qn = this.k0 / (1 + t) * (1 + e * (1 / 4 + e * (1 / 64 + e / 256))), this.utg[0] = t * (-0.5 + t * (2 / 3 + t * (-37 / 96 + t * (1 / 360 + t * (81 / 512 + t * (-96199 / 604800)))))), this.gtu[0] = t * (0.5 + t * (-2 / 3 + t * (5 / 16 + t * (41 / 180 + t * (-127 / 288 + t * (7891 / 37800)))))), this.utg[1] = e * (-1 / 48 + t * (-1 / 15 + t * (437 / 1440 + t * (-46 / 105 + t * (1118711 / 3870720))))), this.gtu[1] = e * (13 / 48 + t * (-3 / 5 + t * (557 / 1440 + t * (281 / 630 + t * (-1983433 / 1935360))))), e = e * t, this.utg[2] = e * (-17 / 480 + t * (37 / 840 + t * (209 / 4480 + t * (-5569 / 90720)))), this.gtu[2] = e * (61 / 240 + t * (-103 / 140 + t * (15061 / 26880 + t * (167603 / 181440)))), e = e * t, this.utg[3] = e * (-4397 / 161280 + t * (11 / 504 + t * (830251 / 7257600))), this.gtu[3] = e * (49561 / 161280 + t * (-179 / 168 + t * (6601661 / 7257600))), e = e * t, this.utg[4] = e * (-4583 / 161280 + t * (108847 / 3991680)), this.gtu[4] = e * (34729 / 80640 + t * (-3418889 / 1995840)), e = e * t, this.utg[5] = e * (-20648693 / 638668800), this.gtu[5] = e * (212378941 / 319334400);
  var n = Ya(this.cbg, this.lat0);
  this.Zb = -this.Qn * (n + Cp(this.gtu, 2 * n));
}
function Tp(i) {
  var t = A(i.x - this.long0), e = i.y;
  e = Ya(this.cbg, e);
  var n = Math.sin(e), s = Math.cos(e), r = Math.sin(t), o = Math.cos(t);
  e = Math.atan2(n, o * s), t = Math.atan2(r * s, Qt(n, s * o)), t = Mp(Math.tan(t));
  var a = Tu(this.gtu, 2 * e, 2 * t);
  e = e + a[0], t = t + a[1];
  var h, l;
  return Math.abs(t) <= 2.623395162778 ? (h = this.a * (this.Qn * t) + this.x0, l = this.a * (this.Qn * e + this.Zb) + this.y0) : (h = 1 / 0, l = 1 / 0), i.x = h, i.y = l, i;
}
function wp(i) {
  var t = (i.x - this.x0) * (1 / this.a), e = (i.y - this.y0) * (1 / this.a);
  e = (e - this.Zb) / this.Qn, t = t / this.Qn;
  var n, s;
  if (Math.abs(t) <= 2.623395162778) {
    var r = Tu(this.utg, 2 * e, 2 * t);
    e = e + r[0], t = t + r[1], t = Math.atan(Su(t));
    var o = Math.sin(e), a = Math.cos(e), h = Math.sin(t), l = Math.cos(t);
    e = Math.atan2(o * l, Qt(h, l * a)), t = Math.atan2(h, l * a), n = A(t + this.long0), s = Ya(this.cgb, e);
  } else
    n = 1 / 0, s = 1 / 0;
  return i.x = n, i.y = s, i;
}
var Rp = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc", "Transverse_Mercator", "Transverse Mercator", "tmerc"];
const Qs = {
  init: Sp,
  forward: Tp,
  inverse: wp,
  names: Rp
};
function bp(i, t) {
  if (i === void 0) {
    if (i = Math.floor((A(t) + Math.PI) * 30 / Math.PI) + 1, i < 0)
      return 0;
    if (i > 60)
      return 60;
  }
  return i;
}
var Ip = "etmerc";
function Ap() {
  var i = bp(this.zone, this.long0);
  if (i === void 0)
    throw new Error("unknown utm zone");
  this.lat0 = 0, this.long0 = (6 * Math.abs(i) - 183) * Ct, this.x0 = 5e5, this.y0 = this.utmSouth ? 1e7 : 0, this.k0 = 0.9996, Qs.init.apply(this), this.forward = Qs.forward, this.inverse = Qs.inverse;
}
var Pp = ["Universal Transverse Mercator System", "utm"];
const Lp = {
  init: Ap,
  names: Pp,
  dependsOn: Ip
};
function Va(i, t) {
  return Math.pow((1 - i) / (1 + i), t);
}
var Op = 20;
function Fp() {
  var i = Math.sin(this.lat0), t = Math.cos(this.lat0);
  t *= t, this.rc = Math.sqrt(1 - this.es) / (1 - this.es * i * i), this.C = Math.sqrt(1 + this.es * t * t / (1 - this.es)), this.phic0 = Math.asin(i / this.C), this.ratexp = 0.5 * this.C * this.e, this.K = Math.tan(0.5 * this.phic0 + H) / (Math.pow(Math.tan(0.5 * this.lat0 + H), this.C) * Va(this.e * i, this.ratexp));
}
function Dp(i) {
  var t = i.x, e = i.y;
  return i.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * e + H), this.C) * Va(this.e * Math.sin(e), this.ratexp)) - E, i.x = this.C * t, i;
}
function Np(i) {
  for (var t = 1e-14, e = i.x / this.C, n = i.y, s = Math.pow(Math.tan(0.5 * n + H) / this.K, 1 / this.C), r = Op; r > 0 && (n = 2 * Math.atan(s * Va(this.e * Math.sin(i.y), -0.5 * this.e)) - E, !(Math.abs(n - i.y) < t)); --r)
    i.y = n;
  return r ? (i.x = e, i.y = n, i) : null;
}
var kp = ["gauss"];
const qa = {
  init: Fp,
  forward: Dp,
  inverse: Np,
  names: kp
};
function Gp() {
  qa.init.apply(this), this.rc && (this.sinc0 = Math.sin(this.phic0), this.cosc0 = Math.cos(this.phic0), this.R2 = 2 * this.rc, this.title || (this.title = "Oblique Stereographic Alternative"));
}
function $p(i) {
  var t, e, n, s;
  return i.x = A(i.x - this.long0), qa.forward.apply(this, [i]), t = Math.sin(i.y), e = Math.cos(i.y), n = Math.cos(i.x), s = this.k0 * this.R2 / (1 + this.sinc0 * t + this.cosc0 * e * n), i.x = s * e * Math.sin(i.x), i.y = s * (this.cosc0 * t - this.sinc0 * e * n), i.x = this.a * i.x + this.x0, i.y = this.a * i.y + this.y0, i;
}
function zp(i) {
  var t, e, n, s, r;
  if (i.x = (i.x - this.x0) / this.a, i.y = (i.y - this.y0) / this.a, i.x /= this.k0, i.y /= this.k0, r = Math.sqrt(i.x * i.x + i.y * i.y)) {
    var o = 2 * Math.atan2(r, this.R2);
    t = Math.sin(o), e = Math.cos(o), s = Math.asin(e * this.sinc0 + i.y * t * this.cosc0 / r), n = Math.atan2(i.x * t, r * this.cosc0 * e - i.y * this.sinc0 * t);
  } else
    s = this.phic0, n = 0;
  return i.x = n, i.y = s, qa.inverse.apply(this, [i]), i.x = A(i.x + this.long0), i;
}
var Bp = ["Stereographic_North_Pole", "Oblique_Stereographic", "Polar_Stereographic", "sterea", "Oblique Stereographic Alternative", "Double_Stereographic"];
const Wp = {
  init: Gp,
  forward: $p,
  inverse: zp,
  names: Bp
};
function jp(i, t, e) {
  return t *= e, Math.tan(0.5 * (E + i)) * Math.pow((1 - t) / (1 + t), 0.5 * e);
}
function Up() {
  this.coslat0 = Math.cos(this.lat0), this.sinlat0 = Math.sin(this.lat0), this.sphere ? this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= b && (this.k0 = 0.5 * (1 + _s(this.lat0) * Math.sin(this.lat_ts))) : (Math.abs(this.coslat0) <= b && (this.lat0 > 0 ? this.con = 1 : this.con = -1), this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e)), this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= b && (this.k0 = 0.5 * this.cons * de(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / te(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts))), this.ms1 = de(this.e, this.sinlat0, this.coslat0), this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - E, this.cosX0 = Math.cos(this.X0), this.sinX0 = Math.sin(this.X0));
}
function Xp(i) {
  var t = i.x, e = i.y, n = Math.sin(e), s = Math.cos(e), r, o, a, h, l, c, u = A(t - this.long0);
  return Math.abs(Math.abs(t - this.long0) - Math.PI) <= b && Math.abs(e + this.lat0) <= b ? (i.x = NaN, i.y = NaN, i) : this.sphere ? (r = 2 * this.k0 / (1 + this.sinlat0 * n + this.coslat0 * s * Math.cos(u)), i.x = this.a * r * s * Math.sin(u) + this.x0, i.y = this.a * r * (this.coslat0 * n - this.sinlat0 * s * Math.cos(u)) + this.y0, i) : (o = 2 * Math.atan(this.ssfn_(e, n, this.e)) - E, h = Math.cos(o), a = Math.sin(o), Math.abs(this.coslat0) <= b ? (l = te(this.e, e * this.con, this.con * n), c = 2 * this.a * this.k0 * l / this.cons, i.x = this.x0 + c * Math.sin(t - this.long0), i.y = this.y0 - this.con * c * Math.cos(t - this.long0), i) : (Math.abs(this.sinlat0) < b ? (r = 2 * this.a * this.k0 / (1 + h * Math.cos(u)), i.y = r * a) : (r = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * a + this.cosX0 * h * Math.cos(u))), i.y = r * (this.cosX0 * a - this.sinX0 * h * Math.cos(u)) + this.y0), i.x = r * h * Math.sin(u) + this.x0, i));
}
function Yp(i) {
  i.x -= this.x0, i.y -= this.y0;
  var t, e, n, s, r, o = Math.sqrt(i.x * i.x + i.y * i.y);
  if (this.sphere) {
    var a = 2 * Math.atan(o / (2 * this.a * this.k0));
    return t = this.long0, e = this.lat0, o <= b ? (i.x = t, i.y = e, i) : (e = Math.asin(Math.cos(a) * this.sinlat0 + i.y * Math.sin(a) * this.coslat0 / o), Math.abs(this.coslat0) < b ? this.lat0 > 0 ? t = A(this.long0 + Math.atan2(i.x, -1 * i.y)) : t = A(this.long0 + Math.atan2(i.x, i.y)) : t = A(this.long0 + Math.atan2(i.x * Math.sin(a), o * this.coslat0 * Math.cos(a) - i.y * this.sinlat0 * Math.sin(a))), i.x = t, i.y = e, i);
  } else if (Math.abs(this.coslat0) <= b) {
    if (o <= b)
      return e = this.lat0, t = this.long0, i.x = t, i.y = e, i;
    i.x *= this.con, i.y *= this.con, n = o * this.cons / (2 * this.a * this.k0), e = this.con * os(this.e, n), t = this.con * A(this.con * this.long0 + Math.atan2(i.x, -1 * i.y));
  } else
    s = 2 * Math.atan(o * this.cosX0 / (2 * this.a * this.k0 * this.ms1)), t = this.long0, o <= b ? r = this.X0 : (r = Math.asin(Math.cos(s) * this.sinX0 + i.y * Math.sin(s) * this.cosX0 / o), t = A(this.long0 + Math.atan2(i.x * Math.sin(s), o * this.cosX0 * Math.cos(s) - i.y * this.sinX0 * Math.sin(s)))), e = -1 * os(this.e, Math.tan(0.5 * (E + r)));
  return i.x = t, i.y = e, i;
}
var Vp = ["stere", "Stereographic_South_Pole", "Polar Stereographic (variant B)"];
const qp = {
  init: Up,
  forward: Xp,
  inverse: Yp,
  names: Vp,
  ssfn_: jp
};
function Kp() {
  var i = this.lat0;
  this.lambda0 = this.long0;
  var t = Math.sin(i), e = this.a, n = this.rf, s = 1 / n, r = 2 * s - Math.pow(s, 2), o = this.e = Math.sqrt(r);
  this.R = this.k0 * e * Math.sqrt(1 - r) / (1 - r * Math.pow(t, 2)), this.alpha = Math.sqrt(1 + r / (1 - r) * Math.pow(Math.cos(i), 4)), this.b0 = Math.asin(t / this.alpha);
  var a = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2)), h = Math.log(Math.tan(Math.PI / 4 + i / 2)), l = Math.log((1 + o * t) / (1 - o * t));
  this.K = a - this.alpha * h + this.alpha * o / 2 * l;
}
function Hp(i) {
  var t = Math.log(Math.tan(Math.PI / 4 - i.y / 2)), e = this.e / 2 * Math.log((1 + this.e * Math.sin(i.y)) / (1 - this.e * Math.sin(i.y))), n = -this.alpha * (t + e) + this.K, s = 2 * (Math.atan(Math.exp(n)) - Math.PI / 4), r = this.alpha * (i.x - this.lambda0), o = Math.atan(Math.sin(r) / (Math.sin(this.b0) * Math.tan(s) + Math.cos(this.b0) * Math.cos(r))), a = Math.asin(Math.cos(this.b0) * Math.sin(s) - Math.sin(this.b0) * Math.cos(s) * Math.cos(r));
  return i.y = this.R / 2 * Math.log((1 + Math.sin(a)) / (1 - Math.sin(a))) + this.y0, i.x = this.R * o + this.x0, i;
}
function Zp(i) {
  for (var t = i.x - this.x0, e = i.y - this.y0, n = t / this.R, s = 2 * (Math.atan(Math.exp(e / this.R)) - Math.PI / 4), r = Math.asin(Math.cos(this.b0) * Math.sin(s) + Math.sin(this.b0) * Math.cos(s) * Math.cos(n)), o = Math.atan(Math.sin(n) / (Math.cos(this.b0) * Math.cos(n) - Math.sin(this.b0) * Math.tan(s))), a = this.lambda0 + o / this.alpha, h = 0, l = r, c = -1e3, u = 0; Math.abs(l - c) > 1e-7; ) {
    if (++u > 20)
      return;
    h = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + r / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(l)) / 2)), c = l, l = 2 * Math.atan(Math.exp(h)) - Math.PI / 2;
  }
  return i.x = a, i.y = l, i;
}
var Jp = ["somerc"];
const Qp = {
  init: Kp,
  forward: Hp,
  inverse: Zp,
  names: Jp
};
var qi = 1e-7;
function t1(i) {
  var t = ["Hotine_Oblique_Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin"], e = typeof i.PROJECTION == "object" ? Object.keys(i.PROJECTION)[0] : i.PROJECTION;
  return "no_uoff" in i || "no_off" in i || t.indexOf(e) !== -1;
}
function e1() {
  var i, t, e, n, s, r, o, a, h, l, c = 0, u, d = 0, f = 0, g = 0, _ = 0, m = 0, y = 0;
  this.no_off = t1(this), this.no_rot = "no_rot" in this;
  var p = !1;
  "alpha" in this && (p = !0);
  var x = !1;
  if ("rectified_grid_angle" in this && (x = !0), p && (y = this.alpha), x && (c = this.rectified_grid_angle * Ct), p || x)
    d = this.longc;
  else if (f = this.long1, _ = this.lat1, g = this.long2, m = this.lat2, Math.abs(_ - m) <= qi || (i = Math.abs(_)) <= qi || Math.abs(i - E) <= qi || Math.abs(Math.abs(this.lat0) - E) <= qi || Math.abs(Math.abs(m) - E) <= qi)
    throw new Error();
  var v = 1 - this.es;
  t = Math.sqrt(v), Math.abs(this.lat0) > b ? (a = Math.sin(this.lat0), e = Math.cos(this.lat0), i = 1 - this.es * a * a, this.B = e * e, this.B = Math.sqrt(1 + this.es * this.B * this.B / v), this.A = this.B * this.k0 * t / i, n = this.B * t / (e * Math.sqrt(i)), s = n * n - 1, s <= 0 ? s = 0 : (s = Math.sqrt(s), this.lat0 < 0 && (s = -s)), this.E = s += n, this.E *= Math.pow(te(this.e, this.lat0, a), this.B)) : (this.B = 1 / t, this.A = this.k0, this.E = n = s = 1), p || x ? (p ? (u = Math.asin(Math.sin(y) / n), x || (c = y)) : (u = c, y = Math.asin(n * Math.sin(u))), this.lam0 = d - Math.asin(0.5 * (s - 1 / s) * Math.tan(u)) / this.B) : (r = Math.pow(te(this.e, _, Math.sin(_)), this.B), o = Math.pow(te(this.e, m, Math.sin(m)), this.B), s = this.E / r, h = (o - r) / (o + r), l = this.E * this.E, l = (l - o * r) / (l + o * r), i = f - g, i < -Math.pi ? g -= ss : i > Math.pi && (g += ss), this.lam0 = A(0.5 * (f + g) - Math.atan(l * Math.tan(0.5 * this.B * (f - g)) / h) / this.B), u = Math.atan(2 * Math.sin(this.B * A(f - this.lam0)) / (s - 1 / s)), c = y = Math.asin(n * Math.sin(u))), this.singam = Math.sin(u), this.cosgam = Math.cos(u), this.sinrot = Math.sin(c), this.cosrot = Math.cos(c), this.rB = 1 / this.B, this.ArB = this.A * this.rB, this.BrA = 1 / this.ArB, this.A * this.B, this.no_off ? this.u_0 = 0 : (this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(n * n - 1) / Math.cos(y))), this.lat0 < 0 && (this.u_0 = -this.u_0)), s = 0.5 * u, this.v_pole_n = this.ArB * Math.log(Math.tan(H - s)), this.v_pole_s = this.ArB * Math.log(Math.tan(H + s));
}
function i1(i) {
  var t = {}, e, n, s, r, o, a, h, l;
  if (i.x = i.x - this.lam0, Math.abs(Math.abs(i.y) - E) > b) {
    if (o = this.E / Math.pow(te(this.e, i.y, Math.sin(i.y)), this.B), a = 1 / o, e = 0.5 * (o - a), n = 0.5 * (o + a), r = Math.sin(this.B * i.x), s = (e * this.singam - r * this.cosgam) / n, Math.abs(Math.abs(s) - 1) < b)
      throw new Error();
    l = 0.5 * this.ArB * Math.log((1 - s) / (1 + s)), a = Math.cos(this.B * i.x), Math.abs(a) < qi ? h = this.A * i.x : h = this.ArB * Math.atan2(e * this.cosgam + r * this.singam, a);
  } else
    l = i.y > 0 ? this.v_pole_n : this.v_pole_s, h = this.ArB * i.y;
  return this.no_rot ? (t.x = h, t.y = l) : (h -= this.u_0, t.x = l * this.cosrot + h * this.sinrot, t.y = h * this.cosrot - l * this.sinrot), t.x = this.a * t.x + this.x0, t.y = this.a * t.y + this.y0, t;
}
function n1(i) {
  var t, e, n, s, r, o, a, h = {};
  if (i.x = (i.x - this.x0) * (1 / this.a), i.y = (i.y - this.y0) * (1 / this.a), this.no_rot ? (e = i.y, t = i.x) : (e = i.x * this.cosrot - i.y * this.sinrot, t = i.y * this.cosrot + i.x * this.sinrot + this.u_0), n = Math.exp(-this.BrA * e), s = 0.5 * (n - 1 / n), r = 0.5 * (n + 1 / n), o = Math.sin(this.BrA * t), a = (o * this.cosgam + s * this.singam) / r, Math.abs(Math.abs(a) - 1) < b)
    h.x = 0, h.y = a < 0 ? -E : E;
  else {
    if (h.y = this.E / Math.sqrt((1 + a) / (1 - a)), h.y = os(this.e, Math.pow(h.y, 1 / this.B)), h.y === 1 / 0)
      throw new Error();
    h.x = -this.rB * Math.atan2(s * this.cosgam - o * this.singam, Math.cos(this.BrA * t));
  }
  return h.x += this.lam0, h;
}
var s1 = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Two_Point_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "Oblique_Mercator", "omerc"];
const r1 = {
  init: e1,
  forward: i1,
  inverse: n1,
  names: s1
};
function o1() {
  if (this.lat2 || (this.lat2 = this.lat1), this.k0 || (this.k0 = 1), this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, !(Math.abs(this.lat1 + this.lat2) < b)) {
    var i = this.b / this.a;
    this.e = Math.sqrt(1 - i * i);
    var t = Math.sin(this.lat1), e = Math.cos(this.lat1), n = de(this.e, t, e), s = te(this.e, this.lat1, t), r = Math.sin(this.lat2), o = Math.cos(this.lat2), a = de(this.e, r, o), h = te(this.e, this.lat2, r), l = te(this.e, this.lat0, Math.sin(this.lat0));
    Math.abs(this.lat1 - this.lat2) > b ? this.ns = Math.log(n / a) / Math.log(s / h) : this.ns = t, isNaN(this.ns) && (this.ns = t), this.f0 = n / (this.ns * Math.pow(s, this.ns)), this.rh = this.a * this.f0 * Math.pow(l, this.ns), this.title || (this.title = "Lambert Conformal Conic");
  }
}
function a1(i) {
  var t = i.x, e = i.y;
  Math.abs(2 * Math.abs(e) - Math.PI) <= b && (e = _s(e) * (E - 2 * b));
  var n = Math.abs(Math.abs(e) - E), s, r;
  if (n > b)
    s = te(this.e, e, Math.sin(e)), r = this.a * this.f0 * Math.pow(s, this.ns);
  else {
    if (n = e * this.ns, n <= 0)
      return null;
    r = 0;
  }
  var o = this.ns * A(t - this.long0);
  return i.x = this.k0 * (r * Math.sin(o)) + this.x0, i.y = this.k0 * (this.rh - r * Math.cos(o)) + this.y0, i;
}
function h1(i) {
  var t, e, n, s, r, o = (i.x - this.x0) / this.k0, a = this.rh - (i.y - this.y0) / this.k0;
  this.ns > 0 ? (t = Math.sqrt(o * o + a * a), e = 1) : (t = -Math.sqrt(o * o + a * a), e = -1);
  var h = 0;
  if (t !== 0 && (h = Math.atan2(e * o, e * a)), t !== 0 || this.ns > 0) {
    if (e = 1 / this.ns, n = Math.pow(t / (this.a * this.f0), e), s = os(this.e, n), s === -9999)
      return null;
  } else
    s = -E;
  return r = A(h / this.ns + this.long0), i.x = r, i.y = s, i;
}
var l1 = [
  "Lambert Tangential Conformal Conic Projection",
  "Lambert_Conformal_Conic",
  "Lambert_Conformal_Conic_1SP",
  "Lambert_Conformal_Conic_2SP",
  "lcc",
  "Lambert Conic Conformal (1SP)",
  "Lambert Conic Conformal (2SP)"
];
const c1 = {
  init: o1,
  forward: a1,
  inverse: h1,
  names: l1
};
function u1() {
  this.a = 6377397155e-3, this.es = 0.006674372230614, this.e = Math.sqrt(this.es), this.lat0 || (this.lat0 = 0.863937979737193), this.long0 || (this.long0 = 0.7417649320975901 - 0.308341501185665), this.k0 || (this.k0 = 0.9999), this.s45 = 0.785398163397448, this.s90 = 2 * this.s45, this.fi0 = this.lat0, this.e2 = this.es, this.e = Math.sqrt(this.e2), this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2)), this.uq = 1.04216856380474, this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa), this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2), this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g, this.k1 = this.k0, this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2)), this.s0 = 1.37008346281555, this.n = Math.sin(this.s0), this.ro0 = this.k1 * this.n0 / Math.tan(this.s0), this.ad = this.s90 - this.uq;
}
function d1(i) {
  var t, e, n, s, r, o, a, h = i.x, l = i.y, c = A(h - this.long0);
  return t = Math.pow((1 + this.e * Math.sin(l)) / (1 - this.e * Math.sin(l)), this.alfa * this.e / 2), e = 2 * (Math.atan(this.k * Math.pow(Math.tan(l / 2 + this.s45), this.alfa) / t) - this.s45), n = -c * this.alfa, s = Math.asin(Math.cos(this.ad) * Math.sin(e) + Math.sin(this.ad) * Math.cos(e) * Math.cos(n)), r = Math.asin(Math.cos(e) * Math.sin(n) / Math.cos(s)), o = this.n * r, a = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n), i.y = a * Math.cos(o) / 1, i.x = a * Math.sin(o) / 1, this.czech || (i.y *= -1, i.x *= -1), i;
}
function f1(i) {
  var t, e, n, s, r, o, a, h, l = i.x;
  i.x = i.y, i.y = l, this.czech || (i.y *= -1, i.x *= -1), o = Math.sqrt(i.x * i.x + i.y * i.y), r = Math.atan2(i.y, i.x), s = r / Math.sin(this.s0), n = 2 * (Math.atan(Math.pow(this.ro0 / o, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45), t = Math.asin(Math.cos(this.ad) * Math.sin(n) - Math.sin(this.ad) * Math.cos(n) * Math.cos(s)), e = Math.asin(Math.cos(n) * Math.sin(s) / Math.cos(t)), i.x = this.long0 - e / this.alfa, a = t, h = 0;
  var c = 0;
  do
    i.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(t / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(a)) / (1 - this.e * Math.sin(a)), this.e / 2)) - this.s45), Math.abs(a - i.y) < 1e-10 && (h = 1), a = i.y, c += 1;
  while (h === 0 && c < 15);
  return c >= 15 ? null : i;
}
var g1 = ["Krovak", "krovak"];
const _1 = {
  init: u1,
  forward: d1,
  inverse: f1,
  names: g1
};
function Pt(i, t, e, n, s) {
  return i * s - t * Math.sin(2 * s) + e * Math.sin(4 * s) - n * Math.sin(6 * s);
}
function ms(i) {
  return 1 - 0.25 * i * (1 + i / 16 * (3 + 1.25 * i));
}
function ys(i) {
  return 0.375 * i * (1 + 0.25 * i * (1 + 0.46875 * i));
}
function ps(i) {
  return 0.05859375 * i * i * (1 + 0.75 * i);
}
function xs(i) {
  return i * i * i * (35 / 3072);
}
function vn(i, t, e) {
  var n = t * e;
  return i / Math.sqrt(1 - n * n);
}
function En(i) {
  return Math.abs(i) < E ? i : i - _s(i) * Math.PI;
}
function Sr(i, t, e, n, s) {
  var r, o;
  r = i / t;
  for (var a = 0; a < 15; a++)
    if (o = (i - (t * r - e * Math.sin(2 * r) + n * Math.sin(4 * r) - s * Math.sin(6 * r))) / (t - 2 * e * Math.cos(2 * r) + 4 * n * Math.cos(4 * r) - 6 * s * Math.cos(6 * r)), r += o, Math.abs(o) <= 1e-10)
      return r;
  return NaN;
}
function m1() {
  this.sphere || (this.e0 = ms(this.es), this.e1 = ys(this.es), this.e2 = ps(this.es), this.e3 = xs(this.es), this.ml0 = this.a * Pt(this.e0, this.e1, this.e2, this.e3, this.lat0));
}
function y1(i) {
  var t, e, n = i.x, s = i.y;
  if (n = A(n - this.long0), this.sphere)
    t = this.a * Math.asin(Math.cos(s) * Math.sin(n)), e = this.a * (Math.atan2(Math.tan(s), Math.cos(n)) - this.lat0);
  else {
    var r = Math.sin(s), o = Math.cos(s), a = vn(this.a, this.e, r), h = Math.tan(s) * Math.tan(s), l = n * Math.cos(s), c = l * l, u = this.es * o * o / (1 - this.es), d = this.a * Pt(this.e0, this.e1, this.e2, this.e3, s);
    t = a * l * (1 - c * h * (1 / 6 - (8 - h + 8 * u) * c / 120)), e = d - this.ml0 + a * r / o * c * (0.5 + (5 - h + 6 * u) * c / 24);
  }
  return i.x = t + this.x0, i.y = e + this.y0, i;
}
function p1(i) {
  i.x -= this.x0, i.y -= this.y0;
  var t = i.x / this.a, e = i.y / this.a, n, s;
  if (this.sphere) {
    var r = e + this.lat0;
    n = Math.asin(Math.sin(r) * Math.cos(t)), s = Math.atan2(Math.tan(t), Math.cos(r));
  } else {
    var o = this.ml0 / this.a + e, a = Sr(o, this.e0, this.e1, this.e2, this.e3);
    if (Math.abs(Math.abs(a) - E) <= b)
      return i.x = this.long0, i.y = E, e < 0 && (i.y *= -1), i;
    var h = vn(this.a, this.e, Math.sin(a)), l = h * h * h / this.a / this.a * (1 - this.es), c = Math.pow(Math.tan(a), 2), u = t * this.a / h, d = u * u;
    n = a - h * Math.tan(a) / l * u * u * (0.5 - (1 + 3 * c) * u * u / 24), s = u * (1 - d * (c / 3 + (1 + 3 * c) * c * d / 15)) / Math.cos(a);
  }
  return i.x = A(s + this.long0), i.y = En(n), i;
}
var x1 = ["Cassini", "Cassini_Soldner", "cass"];
const v1 = {
  init: m1,
  forward: y1,
  inverse: p1,
  names: x1
};
function He(i, t) {
  var e;
  return i > 1e-7 ? (e = i * t, (1 - i * i) * (t / (1 - e * e) - 0.5 / i * Math.log((1 - e) / (1 + e)))) : 2 * t;
}
var M1 = 1, C1 = 2, E1 = 3, S1 = 4;
function T1() {
  var i = Math.abs(this.lat0);
  if (Math.abs(i - E) < b ? this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE : Math.abs(i) < b ? this.mode = this.EQUIT : this.mode = this.OBLIQ, this.es > 0) {
    var t;
    switch (this.qp = He(this.e, 1), this.mmf = 0.5 / (1 - this.es), this.apa = F1(this.es), this.mode) {
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
        this.rq = Math.sqrt(0.5 * this.qp), t = Math.sin(this.lat0), this.sinb1 = He(this.e, t) / this.qp, this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1), this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * t * t) * this.rq * this.cosb1), this.ymf = (this.xmf = this.rq) / this.dd, this.xmf *= this.dd;
        break;
    }
  } else
    this.mode === this.OBLIQ && (this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0));
}
function w1(i) {
  var t, e, n, s, r, o, a, h, l, c, u = i.x, d = i.y;
  if (u = A(u - this.long0), this.sphere) {
    if (r = Math.sin(d), c = Math.cos(d), n = Math.cos(u), this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      if (e = this.mode === this.EQUIT ? 1 + c * n : 1 + this.sinph0 * r + this.cosph0 * c * n, e <= b)
        return null;
      e = Math.sqrt(2 / e), t = e * c * Math.sin(u), e *= this.mode === this.EQUIT ? r : this.cosph0 * r - this.sinph0 * c * n;
    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE && (n = -n), Math.abs(d + this.lat0) < b)
        return null;
      e = H - d * 0.5, e = 2 * (this.mode === this.S_POLE ? Math.cos(e) : Math.sin(e)), t = e * Math.sin(u), e *= n;
    }
  } else {
    switch (a = 0, h = 0, l = 0, n = Math.cos(u), s = Math.sin(u), r = Math.sin(d), o = He(this.e, r), (this.mode === this.OBLIQ || this.mode === this.EQUIT) && (a = o / this.qp, h = Math.sqrt(1 - a * a)), this.mode) {
      case this.OBLIQ:
        l = 1 + this.sinb1 * a + this.cosb1 * h * n;
        break;
      case this.EQUIT:
        l = 1 + h * n;
        break;
      case this.N_POLE:
        l = E + d, o = this.qp - o;
        break;
      case this.S_POLE:
        l = d - E, o = this.qp + o;
        break;
    }
    if (Math.abs(l) < b)
      return null;
    switch (this.mode) {
      case this.OBLIQ:
      case this.EQUIT:
        l = Math.sqrt(2 / l), this.mode === this.OBLIQ ? e = this.ymf * l * (this.cosb1 * a - this.sinb1 * h * n) : e = (l = Math.sqrt(2 / (1 + h * n))) * a * this.ymf, t = this.xmf * l * h * s;
        break;
      case this.N_POLE:
      case this.S_POLE:
        o >= 0 ? (t = (l = Math.sqrt(o)) * s, e = n * (this.mode === this.S_POLE ? l : -l)) : t = e = 0;
        break;
    }
  }
  return i.x = this.a * t + this.x0, i.y = this.a * e + this.y0, i;
}
function R1(i) {
  i.x -= this.x0, i.y -= this.y0;
  var t = i.x / this.a, e = i.y / this.a, n, s, r, o, a, h, l;
  if (this.sphere) {
    var c = 0, u, d = 0;
    if (u = Math.sqrt(t * t + e * e), s = u * 0.5, s > 1)
      return null;
    switch (s = 2 * Math.asin(s), (this.mode === this.OBLIQ || this.mode === this.EQUIT) && (d = Math.sin(s), c = Math.cos(s)), this.mode) {
      case this.EQUIT:
        s = Math.abs(u) <= b ? 0 : Math.asin(e * d / u), t *= d, e = c * u;
        break;
      case this.OBLIQ:
        s = Math.abs(u) <= b ? this.lat0 : Math.asin(c * this.sinph0 + e * d * this.cosph0 / u), t *= d * this.cosph0, e = (c - Math.sin(s) * this.sinph0) * u;
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
    if (l = 0, this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      if (t /= this.dd, e *= this.dd, h = Math.sqrt(t * t + e * e), h < b)
        return i.x = this.long0, i.y = this.lat0, i;
      o = 2 * Math.asin(0.5 * h / this.rq), r = Math.cos(o), t *= o = Math.sin(o), this.mode === this.OBLIQ ? (l = r * this.sinb1 + e * o * this.cosb1 / h, a = this.qp * l, e = h * this.cosb1 * r - e * this.sinb1 * o) : (l = e * o / h, a = this.qp * l, e = h * r);
    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE && (e = -e), a = t * t + e * e, !a)
        return i.x = this.long0, i.y = this.lat0, i;
      l = 1 - a / this.qp, this.mode === this.S_POLE && (l = -l);
    }
    n = Math.atan2(t, e), s = D1(Math.asin(l), this.apa);
  }
  return i.x = A(this.long0 + n), i.y = s, i;
}
var b1 = 0.3333333333333333, I1 = 0.17222222222222222, A1 = 0.10257936507936508, P1 = 0.06388888888888888, L1 = 0.0664021164021164, O1 = 0.016415012942191543;
function F1(i) {
  var t, e = [];
  return e[0] = i * b1, t = i * i, e[0] += t * I1, e[1] = t * P1, t *= i, e[0] += t * A1, e[1] += t * L1, e[2] = t * O1, e;
}
function D1(i, t) {
  var e = i + i;
  return i + t[0] * Math.sin(e) + t[1] * Math.sin(e + e) + t[2] * Math.sin(e + e + e);
}
var N1 = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"];
const k1 = {
  init: T1,
  forward: w1,
  inverse: R1,
  names: N1,
  S_POLE: M1,
  N_POLE: C1,
  EQUIT: E1,
  OBLIQ: S1
};
function ei(i) {
  return Math.abs(i) > 1 && (i = i > 1 ? 1 : -1), Math.asin(i);
}
function G1() {
  Math.abs(this.lat1 + this.lat2) < b || (this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e3 = Math.sqrt(this.es), this.sin_po = Math.sin(this.lat1), this.cos_po = Math.cos(this.lat1), this.t1 = this.sin_po, this.con = this.sin_po, this.ms1 = de(this.e3, this.sin_po, this.cos_po), this.qs1 = He(this.e3, this.sin_po, this.cos_po), this.sin_po = Math.sin(this.lat2), this.cos_po = Math.cos(this.lat2), this.t2 = this.sin_po, this.ms2 = de(this.e3, this.sin_po, this.cos_po), this.qs2 = He(this.e3, this.sin_po, this.cos_po), this.sin_po = Math.sin(this.lat0), this.cos_po = Math.cos(this.lat0), this.t3 = this.sin_po, this.qs0 = He(this.e3, this.sin_po, this.cos_po), Math.abs(this.lat1 - this.lat2) > b ? this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1) : this.ns0 = this.con, this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1, this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0);
}
function $1(i) {
  var t = i.x, e = i.y;
  this.sin_phi = Math.sin(e), this.cos_phi = Math.cos(e);
  var n = He(this.e3, this.sin_phi, this.cos_phi), s = this.a * Math.sqrt(this.c - this.ns0 * n) / this.ns0, r = this.ns0 * A(t - this.long0), o = s * Math.sin(r) + this.x0, a = this.rh - s * Math.cos(r) + this.y0;
  return i.x = o, i.y = a, i;
}
function z1(i) {
  var t, e, n, s, r, o;
  return i.x -= this.x0, i.y = this.rh - i.y + this.y0, this.ns0 >= 0 ? (t = Math.sqrt(i.x * i.x + i.y * i.y), n = 1) : (t = -Math.sqrt(i.x * i.x + i.y * i.y), n = -1), s = 0, t !== 0 && (s = Math.atan2(n * i.x, n * i.y)), n = t * this.ns0 / this.a, this.sphere ? o = Math.asin((this.c - n * n) / (2 * this.ns0)) : (e = (this.c - n * n) / this.ns0, o = this.phi1z(this.e3, e)), r = A(s / this.ns0 + this.long0), i.x = r, i.y = o, i;
}
function B1(i, t) {
  var e, n, s, r, o, a = ei(0.5 * t);
  if (i < b)
    return a;
  for (var h = i * i, l = 1; l <= 25; l++)
    if (e = Math.sin(a), n = Math.cos(a), s = i * e, r = 1 - s * s, o = 0.5 * r * r / n * (t / (1 - h) - e / r + 0.5 / i * Math.log((1 - s) / (1 + s))), a = a + o, Math.abs(o) <= 1e-7)
      return a;
  return null;
}
var W1 = ["Albers_Conic_Equal_Area", "Albers", "aea"];
const j1 = {
  init: G1,
  forward: $1,
  inverse: z1,
  names: W1,
  phi1z: B1
};
function U1() {
  this.sin_p14 = Math.sin(this.lat0), this.cos_p14 = Math.cos(this.lat0), this.infinity_dist = 1e3 * this.a, this.rc = 1;
}
function X1(i) {
  var t, e, n, s, r, o, a, h, l = i.x, c = i.y;
  return n = A(l - this.long0), t = Math.sin(c), e = Math.cos(c), s = Math.cos(n), o = this.sin_p14 * t + this.cos_p14 * e * s, r = 1, o > 0 || Math.abs(o) <= b ? (a = this.x0 + this.a * r * e * Math.sin(n) / o, h = this.y0 + this.a * r * (this.cos_p14 * t - this.sin_p14 * e * s) / o) : (a = this.x0 + this.infinity_dist * e * Math.sin(n), h = this.y0 + this.infinity_dist * (this.cos_p14 * t - this.sin_p14 * e * s)), i.x = a, i.y = h, i;
}
function Y1(i) {
  var t, e, n, s, r, o;
  return i.x = (i.x - this.x0) / this.a, i.y = (i.y - this.y0) / this.a, i.x /= this.k0, i.y /= this.k0, (t = Math.sqrt(i.x * i.x + i.y * i.y)) ? (s = Math.atan2(t, this.rc), e = Math.sin(s), n = Math.cos(s), o = ei(n * this.sin_p14 + i.y * e * this.cos_p14 / t), r = Math.atan2(i.x * e, t * this.cos_p14 * n - i.y * this.sin_p14 * e), r = A(this.long0 + r)) : (o = this.phic0, r = 0), i.x = r, i.y = o, i;
}
var V1 = ["gnom"];
const q1 = {
  init: U1,
  forward: X1,
  inverse: Y1,
  names: V1
};
function K1(i, t) {
  var e = 1 - (1 - i * i) / (2 * i) * Math.log((1 - i) / (1 + i));
  if (Math.abs(Math.abs(t) - e) < 1e-6)
    return t < 0 ? -1 * E : E;
  for (var n = Math.asin(0.5 * t), s, r, o, a, h = 0; h < 30; h++)
    if (r = Math.sin(n), o = Math.cos(n), a = i * r, s = Math.pow(1 - a * a, 2) / (2 * o) * (t / (1 - i * i) - r / (1 - a * a) + 0.5 / i * Math.log((1 - a) / (1 + a))), n += s, Math.abs(s) <= 1e-10)
      return n;
  return NaN;
}
function H1() {
  this.sphere || (this.k0 = de(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)));
}
function Z1(i) {
  var t = i.x, e = i.y, n, s, r = A(t - this.long0);
  if (this.sphere)
    n = this.x0 + this.a * r * Math.cos(this.lat_ts), s = this.y0 + this.a * Math.sin(e) / Math.cos(this.lat_ts);
  else {
    var o = He(this.e, Math.sin(e));
    n = this.x0 + this.a * this.k0 * r, s = this.y0 + this.a * o * 0.5 / this.k0;
  }
  return i.x = n, i.y = s, i;
}
function J1(i) {
  i.x -= this.x0, i.y -= this.y0;
  var t, e;
  return this.sphere ? (t = A(this.long0 + i.x / this.a / Math.cos(this.lat_ts)), e = Math.asin(i.y / this.a * Math.cos(this.lat_ts))) : (e = K1(this.e, 2 * i.y * this.k0 / this.a), t = A(this.long0 + i.x / (this.a * this.k0))), i.x = t, i.y = e, i;
}
var Q1 = ["cea"];
const tx = {
  init: H1,
  forward: Z1,
  inverse: J1,
  names: Q1
};
function ex() {
  this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Equidistant Cylindrical (Plate Carre)", this.rc = Math.cos(this.lat_ts);
}
function ix(i) {
  var t = i.x, e = i.y, n = A(t - this.long0), s = En(e - this.lat0);
  return i.x = this.x0 + this.a * n * this.rc, i.y = this.y0 + this.a * s, i;
}
function nx(i) {
  var t = i.x, e = i.y;
  return i.x = A(this.long0 + (t - this.x0) / (this.a * this.rc)), i.y = En(this.lat0 + (e - this.y0) / this.a), i;
}
var sx = ["Equirectangular", "Equidistant_Cylindrical", "eqc"];
const rx = {
  init: ex,
  forward: ix,
  inverse: nx,
  names: sx
};
var Pl = 20;
function ox() {
  this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = ms(this.es), this.e1 = ys(this.es), this.e2 = ps(this.es), this.e3 = xs(this.es), this.ml0 = this.a * Pt(this.e0, this.e1, this.e2, this.e3, this.lat0);
}
function ax(i) {
  var t = i.x, e = i.y, n, s, r, o = A(t - this.long0);
  if (r = o * Math.sin(e), this.sphere)
    Math.abs(e) <= b ? (n = this.a * o, s = -1 * this.a * this.lat0) : (n = this.a * Math.sin(r) / Math.tan(e), s = this.a * (En(e - this.lat0) + (1 - Math.cos(r)) / Math.tan(e)));
  else if (Math.abs(e) <= b)
    n = this.a * o, s = -1 * this.ml0;
  else {
    var a = vn(this.a, this.e, Math.sin(e)) / Math.tan(e);
    n = a * Math.sin(r), s = this.a * Pt(this.e0, this.e1, this.e2, this.e3, e) - this.ml0 + a * (1 - Math.cos(r));
  }
  return i.x = n + this.x0, i.y = s + this.y0, i;
}
function hx(i) {
  var t, e, n, s, r, o, a, h, l;
  if (n = i.x - this.x0, s = i.y - this.y0, this.sphere)
    if (Math.abs(s + this.a * this.lat0) <= b)
      t = A(n / this.a + this.long0), e = 0;
    else {
      o = this.lat0 + s / this.a, a = n * n / this.a / this.a + o * o, h = o;
      var c;
      for (r = Pl; r; --r)
        if (c = Math.tan(h), l = -1 * (o * (h * c + 1) - h - 0.5 * (h * h + a) * c) / ((h - o) / c - 1), h += l, Math.abs(l) <= b) {
          e = h;
          break;
        }
      t = A(this.long0 + Math.asin(n * Math.tan(h) / this.a) / Math.sin(e));
    }
  else if (Math.abs(s + this.ml0) <= b)
    e = 0, t = A(this.long0 + n / this.a);
  else {
    o = (this.ml0 + s) / this.a, a = n * n / this.a / this.a + o * o, h = o;
    var u, d, f, g, _;
    for (r = Pl; r; --r)
      if (_ = this.e * Math.sin(h), u = Math.sqrt(1 - _ * _) * Math.tan(h), d = this.a * Pt(this.e0, this.e1, this.e2, this.e3, h), f = this.e0 - 2 * this.e1 * Math.cos(2 * h) + 4 * this.e2 * Math.cos(4 * h) - 6 * this.e3 * Math.cos(6 * h), g = d / this.a, l = (o * (u * g + 1) - g - 0.5 * u * (g * g + a)) / (this.es * Math.sin(2 * h) * (g * g + a - 2 * o * g) / (4 * u) + (o - g) * (u * f - 2 / Math.sin(2 * h)) - f), h -= l, Math.abs(l) <= b) {
        e = h;
        break;
      }
    u = Math.sqrt(1 - this.es * Math.pow(Math.sin(e), 2)) * Math.tan(e), t = A(this.long0 + Math.asin(n * u / this.a) / Math.sin(e));
  }
  return i.x = t, i.y = e, i;
}
var lx = ["Polyconic", "poly"];
const cx = {
  init: ox,
  forward: ax,
  inverse: hx,
  names: lx
};
function ux() {
  this.A = [], this.A[1] = 0.6399175073, this.A[2] = -0.1358797613, this.A[3] = 0.063294409, this.A[4] = -0.02526853, this.A[5] = 0.0117879, this.A[6] = -55161e-7, this.A[7] = 26906e-7, this.A[8] = -1333e-6, this.A[9] = 67e-5, this.A[10] = -34e-5, this.B_re = [], this.B_im = [], this.B_re[1] = 0.7557853228, this.B_im[1] = 0, this.B_re[2] = 0.249204646, this.B_im[2] = 3371507e-9, this.B_re[3] = -1541739e-9, this.B_im[3] = 0.04105856, this.B_re[4] = -0.10162907, this.B_im[4] = 0.01727609, this.B_re[5] = -0.26623489, this.B_im[5] = -0.36249218, this.B_re[6] = -0.6870983, this.B_im[6] = -1.1651967, this.C_re = [], this.C_im = [], this.C_re[1] = 1.3231270439, this.C_im[1] = 0, this.C_re[2] = -0.577245789, this.C_im[2] = -7809598e-9, this.C_re[3] = 0.508307513, this.C_im[3] = -0.112208952, this.C_re[4] = -0.15094762, this.C_im[4] = 0.18200602, this.C_re[5] = 1.01418179, this.C_im[5] = 1.64497696, this.C_re[6] = 1.9660549, this.C_im[6] = 2.5127645, this.D = [], this.D[1] = 1.5627014243, this.D[2] = 0.5185406398, this.D[3] = -0.03333098, this.D[4] = -0.1052906, this.D[5] = -0.0368594, this.D[6] = 7317e-6, this.D[7] = 0.0122, this.D[8] = 394e-5, this.D[9] = -13e-4;
}
function dx(i) {
  var t, e = i.x, n = i.y, s = n - this.lat0, r = e - this.long0, o = s / jn * 1e-5, a = r, h = 1, l = 0;
  for (t = 1; t <= 10; t++)
    h = h * o, l = l + this.A[t] * h;
  var c = l, u = a, d = 1, f = 0, g, _, m = 0, y = 0;
  for (t = 1; t <= 6; t++)
    g = d * c - f * u, _ = f * c + d * u, d = g, f = _, m = m + this.B_re[t] * d - this.B_im[t] * f, y = y + this.B_im[t] * d + this.B_re[t] * f;
  return i.x = y * this.a + this.x0, i.y = m * this.a + this.y0, i;
}
function fx(i) {
  var t, e = i.x, n = i.y, s = e - this.x0, r = n - this.y0, o = r / this.a, a = s / this.a, h = 1, l = 0, c, u, d = 0, f = 0;
  for (t = 1; t <= 6; t++)
    c = h * o - l * a, u = l * o + h * a, h = c, l = u, d = d + this.C_re[t] * h - this.C_im[t] * l, f = f + this.C_im[t] * h + this.C_re[t] * l;
  for (var g = 0; g < this.iterations; g++) {
    var _ = d, m = f, y, p, x = o, v = a;
    for (t = 2; t <= 6; t++)
      y = _ * d - m * f, p = m * d + _ * f, _ = y, m = p, x = x + (t - 1) * (this.B_re[t] * _ - this.B_im[t] * m), v = v + (t - 1) * (this.B_im[t] * _ + this.B_re[t] * m);
    _ = 1, m = 0;
    var M = this.B_re[1], C = this.B_im[1];
    for (t = 2; t <= 6; t++)
      y = _ * d - m * f, p = m * d + _ * f, _ = y, m = p, M = M + t * (this.B_re[t] * _ - this.B_im[t] * m), C = C + t * (this.B_im[t] * _ + this.B_re[t] * m);
    var S = M * M + C * C;
    d = (x * M + v * C) / S, f = (v * M - x * C) / S;
  }
  var w = d, P = f, F = 1, G = 0;
  for (t = 1; t <= 9; t++)
    F = F * w, G = G + this.D[t] * F;
  var R = this.lat0 + G * jn * 1e5, D = this.long0 + P;
  return i.x = D, i.y = R, i;
}
var gx = ["New_Zealand_Map_Grid", "nzmg"];
const _x = {
  init: ux,
  forward: dx,
  inverse: fx,
  names: gx
};
function mx() {
}
function yx(i) {
  var t = i.x, e = i.y, n = A(t - this.long0), s = this.x0 + this.a * n, r = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + e / 2.5)) * 1.25;
  return i.x = s, i.y = r, i;
}
function px(i) {
  i.x -= this.x0, i.y -= this.y0;
  var t = A(this.long0 + i.x / this.a), e = 2.5 * (Math.atan(Math.exp(0.8 * i.y / this.a)) - Math.PI / 4);
  return i.x = t, i.y = e, i;
}
var xx = ["Miller_Cylindrical", "mill"];
const vx = {
  init: mx,
  forward: yx,
  inverse: px,
  names: xx
};
var Mx = 20;
function Cx() {
  this.sphere ? (this.n = 1, this.m = 0, this.es = 0, this.C_y = Math.sqrt((this.m + 1) / this.n), this.C_x = this.C_y / (this.m + 1)) : this.en = Cu(this.es);
}
function Ex(i) {
  var t, e, n = i.x, s = i.y;
  if (n = A(n - this.long0), this.sphere) {
    if (!this.m)
      s = this.n !== 1 ? Math.asin(this.n * Math.sin(s)) : s;
    else
      for (var r = this.n * Math.sin(s), o = Mx; o; --o) {
        var a = (this.m * s + Math.sin(s) - r) / (this.m + Math.cos(s));
        if (s -= a, Math.abs(a) < b)
          break;
      }
    t = this.a * this.C_x * n * (this.m + Math.cos(s)), e = this.a * this.C_y * s;
  } else {
    var h = Math.sin(s), l = Math.cos(s);
    e = this.a * jr(s, h, l, this.en), t = this.a * n * l / Math.sqrt(1 - this.es * h * h);
  }
  return i.x = t, i.y = e, i;
}
function Sx(i) {
  var t, e, n, s;
  return i.x -= this.x0, n = i.x / this.a, i.y -= this.y0, t = i.y / this.a, this.sphere ? (t /= this.C_y, n = n / (this.C_x * (this.m + Math.cos(t))), this.m ? t = ei((this.m * t + Math.sin(t)) / this.n) : this.n !== 1 && (t = ei(Math.sin(t) / this.n)), n = A(n + this.long0), t = En(t)) : (t = Eu(i.y / this.a, this.es, this.en), s = Math.abs(t), s < E ? (s = Math.sin(t), e = this.long0 + i.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(t)), n = A(e)) : s - b < E && (n = this.long0)), i.x = n, i.y = t, i;
}
var Tx = ["Sinusoidal", "sinu"];
const wx = {
  init: Cx,
  forward: Ex,
  inverse: Sx,
  names: Tx
};
function Rx() {
}
function bx(i) {
  for (var t = i.x, e = i.y, n = A(t - this.long0), s = e, r = Math.PI * Math.sin(e); ; ) {
    var o = -(s + Math.sin(s) - r) / (1 + Math.cos(s));
    if (s += o, Math.abs(o) < b)
      break;
  }
  s /= 2, Math.PI / 2 - Math.abs(e) < b && (n = 0);
  var a = 0.900316316158 * this.a * n * Math.cos(s) + this.x0, h = 1.4142135623731 * this.a * Math.sin(s) + this.y0;
  return i.x = a, i.y = h, i;
}
function Ix(i) {
  var t, e;
  i.x -= this.x0, i.y -= this.y0, e = i.y / (1.4142135623731 * this.a), Math.abs(e) > 0.999999999999 && (e = 0.999999999999), t = Math.asin(e);
  var n = A(this.long0 + i.x / (0.900316316158 * this.a * Math.cos(t)));
  n < -Math.PI && (n = -Math.PI), n > Math.PI && (n = Math.PI), e = (2 * t + Math.sin(2 * t)) / Math.PI, Math.abs(e) > 1 && (e = 1);
  var s = Math.asin(e);
  return i.x = n, i.y = s, i;
}
var Ax = ["Mollweide", "moll"];
const Px = {
  init: Rx,
  forward: bx,
  inverse: Ix,
  names: Ax
};
function Lx() {
  Math.abs(this.lat1 + this.lat2) < b || (this.lat2 = this.lat2 || this.lat1, this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = ms(this.es), this.e1 = ys(this.es), this.e2 = ps(this.es), this.e3 = xs(this.es), this.sinphi = Math.sin(this.lat1), this.cosphi = Math.cos(this.lat1), this.ms1 = de(this.e, this.sinphi, this.cosphi), this.ml1 = Pt(this.e0, this.e1, this.e2, this.e3, this.lat1), Math.abs(this.lat1 - this.lat2) < b ? this.ns = this.sinphi : (this.sinphi = Math.sin(this.lat2), this.cosphi = Math.cos(this.lat2), this.ms2 = de(this.e, this.sinphi, this.cosphi), this.ml2 = Pt(this.e0, this.e1, this.e2, this.e3, this.lat2), this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1)), this.g = this.ml1 + this.ms1 / this.ns, this.ml0 = Pt(this.e0, this.e1, this.e2, this.e3, this.lat0), this.rh = this.a * (this.g - this.ml0));
}
function Ox(i) {
  var t = i.x, e = i.y, n;
  if (this.sphere)
    n = this.a * (this.g - e);
  else {
    var s = Pt(this.e0, this.e1, this.e2, this.e3, e);
    n = this.a * (this.g - s);
  }
  var r = this.ns * A(t - this.long0), o = this.x0 + n * Math.sin(r), a = this.y0 + this.rh - n * Math.cos(r);
  return i.x = o, i.y = a, i;
}
function Fx(i) {
  i.x -= this.x0, i.y = this.rh - i.y + this.y0;
  var t, e, n, s;
  this.ns >= 0 ? (e = Math.sqrt(i.x * i.x + i.y * i.y), t = 1) : (e = -Math.sqrt(i.x * i.x + i.y * i.y), t = -1);
  var r = 0;
  if (e !== 0 && (r = Math.atan2(t * i.x, t * i.y)), this.sphere)
    return s = A(this.long0 + r / this.ns), n = En(this.g - e / this.a), i.x = s, i.y = n, i;
  var o = this.g - e / this.a;
  return n = Sr(o, this.e0, this.e1, this.e2, this.e3), s = A(this.long0 + r / this.ns), i.x = s, i.y = n, i;
}
var Dx = ["Equidistant_Conic", "eqdc"];
const Nx = {
  init: Lx,
  forward: Ox,
  inverse: Fx,
  names: Dx
};
function kx() {
  this.R = this.a;
}
function Gx(i) {
  var t = i.x, e = i.y, n = A(t - this.long0), s, r;
  Math.abs(e) <= b && (s = this.x0 + this.R * n, r = this.y0);
  var o = ei(2 * Math.abs(e / Math.PI));
  (Math.abs(n) <= b || Math.abs(Math.abs(e) - E) <= b) && (s = this.x0, e >= 0 ? r = this.y0 + Math.PI * this.R * Math.tan(0.5 * o) : r = this.y0 + Math.PI * this.R * -Math.tan(0.5 * o));
  var a = 0.5 * Math.abs(Math.PI / n - n / Math.PI), h = a * a, l = Math.sin(o), c = Math.cos(o), u = c / (l + c - 1), d = u * u, f = u * (2 / l - 1), g = f * f, _ = Math.PI * this.R * (a * (u - g) + Math.sqrt(h * (u - g) * (u - g) - (g + h) * (d - g))) / (g + h);
  n < 0 && (_ = -_), s = this.x0 + _;
  var m = h + u;
  return _ = Math.PI * this.R * (f * m - a * Math.sqrt((g + h) * (h + 1) - m * m)) / (g + h), e >= 0 ? r = this.y0 + _ : r = this.y0 - _, i.x = s, i.y = r, i;
}
function $x(i) {
  var t, e, n, s, r, o, a, h, l, c, u, d, f;
  return i.x -= this.x0, i.y -= this.y0, u = Math.PI * this.R, n = i.x / u, s = i.y / u, r = n * n + s * s, o = -Math.abs(s) * (1 + r), a = o - 2 * s * s + n * n, h = -2 * o + 1 + 2 * s * s + r * r, f = s * s / h + (2 * a * a * a / h / h / h - 9 * o * a / h / h) / 27, l = (o - a * a / 3 / h) / h, c = 2 * Math.sqrt(-l / 3), u = 3 * f / l / c, Math.abs(u) > 1 && (u >= 0 ? u = 1 : u = -1), d = Math.acos(u) / 3, i.y >= 0 ? e = (-c * Math.cos(d + Math.PI / 3) - a / 3 / h) * Math.PI : e = -(-c * Math.cos(d + Math.PI / 3) - a / 3 / h) * Math.PI, Math.abs(n) < b ? t = this.long0 : t = A(this.long0 + Math.PI * (r - 1 + Math.sqrt(1 + 2 * (n * n - s * s) + r * r)) / 2 / n), i.x = t, i.y = e, i;
}
var zx = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"];
const Bx = {
  init: kx,
  forward: Gx,
  inverse: $x,
  names: zx
};
function Wx() {
  this.sin_p12 = Math.sin(this.lat0), this.cos_p12 = Math.cos(this.lat0);
}
function jx(i) {
  var t = i.x, e = i.y, n = Math.sin(i.y), s = Math.cos(i.y), r = A(t - this.long0), o, a, h, l, c, u, d, f, g, _, m, y, p, x, v, M, C, S, w, P, F, G, R;
  return this.sphere ? Math.abs(this.sin_p12 - 1) <= b ? (i.x = this.x0 + this.a * (E - e) * Math.sin(r), i.y = this.y0 - this.a * (E - e) * Math.cos(r), i) : Math.abs(this.sin_p12 + 1) <= b ? (i.x = this.x0 + this.a * (E + e) * Math.sin(r), i.y = this.y0 + this.a * (E + e) * Math.cos(r), i) : (S = this.sin_p12 * n + this.cos_p12 * s * Math.cos(r), M = Math.acos(S), C = M ? M / Math.sin(M) : 1, i.x = this.x0 + this.a * C * s * Math.sin(r), i.y = this.y0 + this.a * C * (this.cos_p12 * n - this.sin_p12 * s * Math.cos(r)), i) : (o = ms(this.es), a = ys(this.es), h = ps(this.es), l = xs(this.es), Math.abs(this.sin_p12 - 1) <= b ? (c = this.a * Pt(o, a, h, l, E), u = this.a * Pt(o, a, h, l, e), i.x = this.x0 + (c - u) * Math.sin(r), i.y = this.y0 - (c - u) * Math.cos(r), i) : Math.abs(this.sin_p12 + 1) <= b ? (c = this.a * Pt(o, a, h, l, E), u = this.a * Pt(o, a, h, l, e), i.x = this.x0 + (c + u) * Math.sin(r), i.y = this.y0 + (c + u) * Math.cos(r), i) : (d = n / s, f = vn(this.a, this.e, this.sin_p12), g = vn(this.a, this.e, n), _ = Math.atan((1 - this.es) * d + this.es * f * this.sin_p12 / (g * s)), m = Math.atan2(Math.sin(r), this.cos_p12 * Math.tan(_) - this.sin_p12 * Math.cos(r)), m === 0 ? w = Math.asin(this.cos_p12 * Math.sin(_) - this.sin_p12 * Math.cos(_)) : Math.abs(Math.abs(m) - Math.PI) <= b ? w = -Math.asin(this.cos_p12 * Math.sin(_) - this.sin_p12 * Math.cos(_)) : w = Math.asin(Math.sin(r) * Math.cos(_) / Math.sin(m)), y = this.e * this.sin_p12 / Math.sqrt(1 - this.es), p = this.e * this.cos_p12 * Math.cos(m) / Math.sqrt(1 - this.es), x = y * p, v = p * p, P = w * w, F = P * w, G = F * w, R = G * w, M = f * w * (1 - P * v * (1 - v) / 6 + F / 8 * x * (1 - 2 * v) + G / 120 * (v * (4 - 7 * v) - 3 * y * y * (1 - 7 * v)) - R / 48 * x), i.x = this.x0 + M * Math.sin(m), i.y = this.y0 + M * Math.cos(m), i));
}
function Ux(i) {
  i.x -= this.x0, i.y -= this.y0;
  var t, e, n, s, r, o, a, h, l, c, u, d, f, g, _, m, y, p, x, v, M, C, S, w;
  return this.sphere ? (t = Math.sqrt(i.x * i.x + i.y * i.y), t > 2 * E * this.a ? void 0 : (e = t / this.a, n = Math.sin(e), s = Math.cos(e), r = this.long0, Math.abs(t) <= b ? o = this.lat0 : (o = ei(s * this.sin_p12 + i.y * n * this.cos_p12 / t), a = Math.abs(this.lat0) - E, Math.abs(a) <= b ? this.lat0 >= 0 ? r = A(this.long0 + Math.atan2(i.x, -i.y)) : r = A(this.long0 - Math.atan2(-i.x, i.y)) : r = A(this.long0 + Math.atan2(i.x * n, t * this.cos_p12 * s - i.y * this.sin_p12 * n))), i.x = r, i.y = o, i)) : (h = ms(this.es), l = ys(this.es), c = ps(this.es), u = xs(this.es), Math.abs(this.sin_p12 - 1) <= b ? (d = this.a * Pt(h, l, c, u, E), t = Math.sqrt(i.x * i.x + i.y * i.y), f = d - t, o = Sr(f / this.a, h, l, c, u), r = A(this.long0 + Math.atan2(i.x, -1 * i.y)), i.x = r, i.y = o, i) : Math.abs(this.sin_p12 + 1) <= b ? (d = this.a * Pt(h, l, c, u, E), t = Math.sqrt(i.x * i.x + i.y * i.y), f = t - d, o = Sr(f / this.a, h, l, c, u), r = A(this.long0 + Math.atan2(i.x, i.y)), i.x = r, i.y = o, i) : (t = Math.sqrt(i.x * i.x + i.y * i.y), m = Math.atan2(i.x, i.y), g = vn(this.a, this.e, this.sin_p12), y = Math.cos(m), p = this.e * this.cos_p12 * y, x = -p * p / (1 - this.es), v = 3 * this.es * (1 - x) * this.sin_p12 * this.cos_p12 * y / (1 - this.es), M = t / g, C = M - x * (1 + x) * Math.pow(M, 3) / 6 - v * (1 + 3 * x) * Math.pow(M, 4) / 24, S = 1 - x * C * C / 2 - M * C * C * C / 6, _ = Math.asin(this.sin_p12 * Math.cos(C) + this.cos_p12 * Math.sin(C) * y), r = A(this.long0 + Math.asin(Math.sin(m) * Math.sin(C) / Math.cos(_))), w = Math.sin(_), o = Math.atan2((w - this.es * S * this.sin_p12) * Math.tan(_), w * (1 - this.es)), i.x = r, i.y = o, i));
}
var Xx = ["Azimuthal_Equidistant", "aeqd"];
const Yx = {
  init: Wx,
  forward: jx,
  inverse: Ux,
  names: Xx
};
function Vx() {
  this.sin_p14 = Math.sin(this.lat0), this.cos_p14 = Math.cos(this.lat0);
}
function qx(i) {
  var t, e, n, s, r, o, a, h, l = i.x, c = i.y;
  return n = A(l - this.long0), t = Math.sin(c), e = Math.cos(c), s = Math.cos(n), o = this.sin_p14 * t + this.cos_p14 * e * s, r = 1, (o > 0 || Math.abs(o) <= b) && (a = this.a * r * e * Math.sin(n), h = this.y0 + this.a * r * (this.cos_p14 * t - this.sin_p14 * e * s)), i.x = a, i.y = h, i;
}
function Kx(i) {
  var t, e, n, s, r, o, a;
  return i.x -= this.x0, i.y -= this.y0, t = Math.sqrt(i.x * i.x + i.y * i.y), e = ei(t / this.a), n = Math.sin(e), s = Math.cos(e), o = this.long0, Math.abs(t) <= b ? (a = this.lat0, i.x = o, i.y = a, i) : (a = ei(s * this.sin_p14 + i.y * n * this.cos_p14 / t), r = Math.abs(this.lat0) - E, Math.abs(r) <= b ? (this.lat0 >= 0 ? o = A(this.long0 + Math.atan2(i.x, -i.y)) : o = A(this.long0 - Math.atan2(-i.x, i.y)), i.x = o, i.y = a, i) : (o = A(this.long0 + Math.atan2(i.x * n, t * this.cos_p14 * s - i.y * this.sin_p14 * n)), i.x = o, i.y = a, i));
}
var Hx = ["ortho"];
const Zx = {
  init: Vx,
  forward: qx,
  inverse: Kx,
  names: Hx
};
var lt = {
  FRONT: 1,
  RIGHT: 2,
  BACK: 3,
  LEFT: 4,
  TOP: 5,
  BOTTOM: 6
}, Z = {
  AREA_0: 1,
  AREA_1: 2,
  AREA_2: 3,
  AREA_3: 4
};
function Jx() {
  this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Quadrilateralized Spherical Cube", this.lat0 >= E - H / 2 ? this.face = lt.TOP : this.lat0 <= -(E - H / 2) ? this.face = lt.BOTTOM : Math.abs(this.long0) <= H ? this.face = lt.FRONT : Math.abs(this.long0) <= E + H ? this.face = this.long0 > 0 ? lt.RIGHT : lt.LEFT : this.face = lt.BACK, this.es !== 0 && (this.one_minus_f = 1 - (this.a - this.b) / this.a, this.one_minus_f_squared = this.one_minus_f * this.one_minus_f);
}
function Qx(i) {
  var t = { x: 0, y: 0 }, e, n, s, r, o, a, h = { value: 0 };
  if (i.x -= this.long0, this.es !== 0 ? e = Math.atan(this.one_minus_f_squared * Math.tan(i.y)) : e = i.y, n = i.x, this.face === lt.TOP)
    r = E - e, n >= H && n <= E + H ? (h.value = Z.AREA_0, s = n - E) : n > E + H || n <= -(E + H) ? (h.value = Z.AREA_1, s = n > 0 ? n - ut : n + ut) : n > -(E + H) && n <= -H ? (h.value = Z.AREA_2, s = n + E) : (h.value = Z.AREA_3, s = n);
  else if (this.face === lt.BOTTOM)
    r = E + e, n >= H && n <= E + H ? (h.value = Z.AREA_0, s = -n + E) : n < H && n >= -H ? (h.value = Z.AREA_1, s = -n) : n < -H && n >= -(E + H) ? (h.value = Z.AREA_2, s = -n - E) : (h.value = Z.AREA_3, s = n > 0 ? -n + ut : -n - ut);
  else {
    var l, c, u, d, f, g, _;
    this.face === lt.RIGHT ? n = hn(n, +E) : this.face === lt.BACK ? n = hn(n, +ut) : this.face === lt.LEFT && (n = hn(n, -E)), d = Math.sin(e), f = Math.cos(e), g = Math.sin(n), _ = Math.cos(n), l = f * _, c = f * g, u = d, this.face === lt.FRONT ? (r = Math.acos(l), s = Vs(r, u, c, h)) : this.face === lt.RIGHT ? (r = Math.acos(c), s = Vs(r, u, -l, h)) : this.face === lt.BACK ? (r = Math.acos(-l), s = Vs(r, u, -c, h)) : this.face === lt.LEFT ? (r = Math.acos(-c), s = Vs(r, u, l, h)) : (r = s = 0, h.value = Z.AREA_0);
  }
  return a = Math.atan(12 / ut * (s + Math.acos(Math.sin(s) * Math.cos(H)) - E)), o = Math.sqrt((1 - Math.cos(r)) / (Math.cos(a) * Math.cos(a)) / (1 - Math.cos(Math.atan(1 / Math.cos(s))))), h.value === Z.AREA_1 ? a += E : h.value === Z.AREA_2 ? a += ut : h.value === Z.AREA_3 && (a += 1.5 * ut), t.x = o * Math.cos(a), t.y = o * Math.sin(a), t.x = t.x * this.a + this.x0, t.y = t.y * this.a + this.y0, i.x = t.x, i.y = t.y, i;
}
function tv(i) {
  var t = { lam: 0, phi: 0 }, e, n, s, r, o, a, h, l, c, u = { value: 0 };
  if (i.x = (i.x - this.x0) / this.a, i.y = (i.y - this.y0) / this.a, n = Math.atan(Math.sqrt(i.x * i.x + i.y * i.y)), e = Math.atan2(i.y, i.x), i.x >= 0 && i.x >= Math.abs(i.y) ? u.value = Z.AREA_0 : i.y >= 0 && i.y >= Math.abs(i.x) ? (u.value = Z.AREA_1, e -= E) : i.x < 0 && -i.x >= Math.abs(i.y) ? (u.value = Z.AREA_2, e = e < 0 ? e + ut : e - ut) : (u.value = Z.AREA_3, e += E), c = ut / 12 * Math.tan(e), o = Math.sin(c) / (Math.cos(c) - 1 / Math.sqrt(2)), a = Math.atan(o), s = Math.cos(e), r = Math.tan(n), h = 1 - s * s * r * r * (1 - Math.cos(Math.atan(1 / Math.cos(a)))), h < -1 ? h = -1 : h > 1 && (h = 1), this.face === lt.TOP)
    l = Math.acos(h), t.phi = E - l, u.value === Z.AREA_0 ? t.lam = a + E : u.value === Z.AREA_1 ? t.lam = a < 0 ? a + ut : a - ut : u.value === Z.AREA_2 ? t.lam = a - E : t.lam = a;
  else if (this.face === lt.BOTTOM)
    l = Math.acos(h), t.phi = l - E, u.value === Z.AREA_0 ? t.lam = -a + E : u.value === Z.AREA_1 ? t.lam = -a : u.value === Z.AREA_2 ? t.lam = -a - E : t.lam = a < 0 ? -a - ut : -a + ut;
  else {
    var d, f, g;
    d = h, c = d * d, c >= 1 ? g = 0 : g = Math.sqrt(1 - c) * Math.sin(a), c += g * g, c >= 1 ? f = 0 : f = Math.sqrt(1 - c), u.value === Z.AREA_1 ? (c = f, f = -g, g = c) : u.value === Z.AREA_2 ? (f = -f, g = -g) : u.value === Z.AREA_3 && (c = f, f = g, g = -c), this.face === lt.RIGHT ? (c = d, d = -f, f = c) : this.face === lt.BACK ? (d = -d, f = -f) : this.face === lt.LEFT && (c = d, d = f, f = -c), t.phi = Math.acos(-g) - E, t.lam = Math.atan2(f, d), this.face === lt.RIGHT ? t.lam = hn(t.lam, -E) : this.face === lt.BACK ? t.lam = hn(t.lam, -ut) : this.face === lt.LEFT && (t.lam = hn(t.lam, +E));
  }
  if (this.es !== 0) {
    var _, m, y;
    _ = t.phi < 0 ? 1 : 0, m = Math.tan(t.phi), y = this.b / Math.sqrt(m * m + this.one_minus_f_squared), t.phi = Math.atan(Math.sqrt(this.a * this.a - y * y) / (this.one_minus_f * y)), _ && (t.phi = -t.phi);
  }
  return t.lam += this.long0, i.x = t.lam, i.y = t.phi, i;
}
function Vs(i, t, e, n) {
  var s;
  return i < b ? (n.value = Z.AREA_0, s = 0) : (s = Math.atan2(t, e), Math.abs(s) <= H ? n.value = Z.AREA_0 : s > H && s <= E + H ? (n.value = Z.AREA_1, s -= E) : s > E + H || s <= -(E + H) ? (n.value = Z.AREA_2, s = s >= 0 ? s - ut : s + ut) : (n.value = Z.AREA_3, s += E)), s;
}
function hn(i, t) {
  var e = i + t;
  return e < -ut ? e += ss : e > +ut && (e -= ss), e;
}
var ev = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"];
const iv = {
  init: Jx,
  forward: Qx,
  inverse: tv,
  names: ev
};
var Vo = [
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
], Gn = [
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
], wu = 0.8487, Ru = 1.3523, bu = oe / 5, nv = 1 / bu, nn = 18, Tr = function(i, t) {
  return i[0] + t * (i[1] + t * (i[2] + t * i[3]));
}, sv = function(i, t) {
  return i[1] + t * (2 * i[2] + t * 3 * i[3]);
};
function rv(i, t, e, n) {
  for (var s = t; n; --n) {
    var r = i(s);
    if (s -= r, Math.abs(r) < e)
      break;
  }
  return s;
}
function ov() {
  this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.long0 = this.long0 || 0, this.es = 0, this.title = this.title || "Robinson";
}
function av(i) {
  var t = A(i.x - this.long0), e = Math.abs(i.y), n = Math.floor(e * bu);
  n < 0 ? n = 0 : n >= nn && (n = nn - 1), e = oe * (e - nv * n);
  var s = {
    x: Tr(Vo[n], e) * t,
    y: Tr(Gn[n], e)
  };
  return i.y < 0 && (s.y = -s.y), s.x = s.x * this.a * wu + this.x0, s.y = s.y * this.a * Ru + this.y0, s;
}
function hv(i) {
  var t = {
    x: (i.x - this.x0) / (this.a * wu),
    y: Math.abs(i.y - this.y0) / (this.a * Ru)
  };
  if (t.y >= 1)
    t.x /= Vo[nn][0], t.y = i.y < 0 ? -E : E;
  else {
    var e = Math.floor(t.y * nn);
    for (e < 0 ? e = 0 : e >= nn && (e = nn - 1); ; )
      if (Gn[e][0] > t.y)
        --e;
      else if (Gn[e + 1][0] <= t.y)
        ++e;
      else
        break;
    var n = Gn[e], s = 5 * (t.y - n[0]) / (Gn[e + 1][0] - n[0]);
    s = rv(function(r) {
      return (Tr(n, r) - t.y) / sv(n, r);
    }, s, b, 100), t.x /= Tr(Vo[e], s), t.y = (5 * e + s) * Ct, i.y < 0 && (t.y = -t.y);
  }
  return t.x = A(t.x + this.long0), t;
}
var lv = ["Robinson", "robin"];
const cv = {
  init: ov,
  forward: av,
  inverse: hv,
  names: lv
};
function uv() {
  this.name = "geocent";
}
function dv(i) {
  var t = fu(i, this.es, this.a);
  return t;
}
function fv(i) {
  var t = gu(i, this.es, this.a, this.b);
  return t;
}
var gv = ["Geocentric", "geocentric", "geocent", "Geocent"];
const _v = {
  init: uv,
  forward: dv,
  inverse: fv,
  names: gv
};
var Tt = {
  N_POLE: 0,
  S_POLE: 1,
  EQUIT: 2,
  OBLIQ: 3
}, On = {
  h: { def: 1e5, num: !0 },
  azi: { def: 0, num: !0, degrees: !0 },
  tilt: { def: 0, num: !0, degrees: !0 },
  long0: { def: 0, num: !0 },
  lat0: { def: 0, num: !0 }
};
function mv() {
  if (Object.keys(On).forEach(function(e) {
    if (typeof this[e] > "u")
      this[e] = On[e].def;
    else {
      if (On[e].num && isNaN(this[e]))
        throw new Error("Invalid parameter value, must be numeric " + e + " = " + this[e]);
      On[e].num && (this[e] = parseFloat(this[e]));
    }
    On[e].degrees && (this[e] = this[e] * Ct);
  }.bind(this)), Math.abs(Math.abs(this.lat0) - E) < b ? this.mode = this.lat0 < 0 ? Tt.S_POLE : Tt.N_POLE : Math.abs(this.lat0) < b ? this.mode = Tt.EQUIT : (this.mode = Tt.OBLIQ, this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0)), this.pn1 = this.h / this.a, this.pn1 <= 0 || this.pn1 > 1e10)
    throw new Error("Invalid height");
  this.p = 1 + this.pn1, this.rp = 1 / this.p, this.h1 = 1 / this.pn1, this.pfact = (this.p + 1) * this.h1, this.es = 0;
  var i = this.tilt, t = this.azi;
  this.cg = Math.cos(t), this.sg = Math.sin(t), this.cw = Math.cos(i), this.sw = Math.sin(i);
}
function yv(i) {
  i.x -= this.long0;
  var t = Math.sin(i.y), e = Math.cos(i.y), n = Math.cos(i.x), s, r;
  switch (this.mode) {
    case Tt.OBLIQ:
      r = this.sinph0 * t + this.cosph0 * e * n;
      break;
    case Tt.EQUIT:
      r = e * n;
      break;
    case Tt.S_POLE:
      r = -t;
      break;
    case Tt.N_POLE:
      r = t;
      break;
  }
  switch (r = this.pn1 / (this.p - r), s = r * e * Math.sin(i.x), this.mode) {
    case Tt.OBLIQ:
      r *= this.cosph0 * t - this.sinph0 * e * n;
      break;
    case Tt.EQUIT:
      r *= t;
      break;
    case Tt.N_POLE:
      r *= -(e * n);
      break;
    case Tt.S_POLE:
      r *= e * n;
      break;
  }
  var o, a;
  return o = r * this.cg + s * this.sg, a = 1 / (o * this.sw * this.h1 + this.cw), s = (s * this.cg - r * this.sg) * this.cw * a, r = o * a, i.x = s * this.a, i.y = r * this.a, i;
}
function pv(i) {
  i.x /= this.a, i.y /= this.a;
  var t = { x: i.x, y: i.y }, e, n, s;
  s = 1 / (this.pn1 - i.y * this.sw), e = this.pn1 * i.x * s, n = this.pn1 * i.y * this.cw * s, i.x = e * this.cg + n * this.sg, i.y = n * this.cg - e * this.sg;
  var r = Qt(i.x, i.y);
  if (Math.abs(r) < b)
    t.x = 0, t.y = i.y;
  else {
    var o, a;
    switch (a = 1 - r * r * this.pfact, a = (this.p - Math.sqrt(a)) / (this.pn1 / r + r / this.pn1), o = Math.sqrt(1 - a * a), this.mode) {
      case Tt.OBLIQ:
        t.y = Math.asin(o * this.sinph0 + i.y * a * this.cosph0 / r), i.y = (o - this.sinph0 * Math.sin(t.y)) * r, i.x *= a * this.cosph0;
        break;
      case Tt.EQUIT:
        t.y = Math.asin(i.y * a / r), i.y = o * r, i.x *= a;
        break;
      case Tt.N_POLE:
        t.y = Math.asin(o), i.y = -i.y;
        break;
      case Tt.S_POLE:
        t.y = -Math.asin(o);
        break;
    }
    t.x = Math.atan2(i.x, i.y);
  }
  return i.x = t.x + this.long0, i.y = t.y, i;
}
var xv = ["Tilted_Perspective", "tpers"];
const vv = {
  init: mv,
  forward: yv,
  inverse: pv,
  names: xv
};
function Mv() {
  if (this.flip_axis = this.sweep === "x" ? 1 : 0, this.h = Number(this.h), this.radius_g_1 = this.h / this.a, this.radius_g_1 <= 0 || this.radius_g_1 > 1e10)
    throw new Error();
  if (this.radius_g = 1 + this.radius_g_1, this.C = this.radius_g * this.radius_g - 1, this.es !== 0) {
    var i = 1 - this.es, t = 1 / i;
    this.radius_p = Math.sqrt(i), this.radius_p2 = i, this.radius_p_inv2 = t, this.shape = "ellipse";
  } else
    this.radius_p = 1, this.radius_p2 = 1, this.radius_p_inv2 = 1, this.shape = "sphere";
  this.title || (this.title = "Geostationary Satellite View");
}
function Cv(i) {
  var t = i.x, e = i.y, n, s, r, o;
  if (t = t - this.long0, this.shape === "ellipse") {
    e = Math.atan(this.radius_p2 * Math.tan(e));
    var a = this.radius_p / Qt(this.radius_p * Math.cos(e), Math.sin(e));
    if (s = a * Math.cos(t) * Math.cos(e), r = a * Math.sin(t) * Math.cos(e), o = a * Math.sin(e), (this.radius_g - s) * s - r * r - o * o * this.radius_p_inv2 < 0)
      return i.x = Number.NaN, i.y = Number.NaN, i;
    n = this.radius_g - s, this.flip_axis ? (i.x = this.radius_g_1 * Math.atan(r / Qt(o, n)), i.y = this.radius_g_1 * Math.atan(o / n)) : (i.x = this.radius_g_1 * Math.atan(r / n), i.y = this.radius_g_1 * Math.atan(o / Qt(r, n)));
  } else
    this.shape === "sphere" && (n = Math.cos(e), s = Math.cos(t) * n, r = Math.sin(t) * n, o = Math.sin(e), n = this.radius_g - s, this.flip_axis ? (i.x = this.radius_g_1 * Math.atan(r / Qt(o, n)), i.y = this.radius_g_1 * Math.atan(o / n)) : (i.x = this.radius_g_1 * Math.atan(r / n), i.y = this.radius_g_1 * Math.atan(o / Qt(r, n))));
  return i.x = i.x * this.a, i.y = i.y * this.a, i;
}
function Ev(i) {
  var t = -1, e = 0, n = 0, s, r, o, a;
  if (i.x = i.x / this.a, i.y = i.y / this.a, this.shape === "ellipse") {
    this.flip_axis ? (n = Math.tan(i.y / this.radius_g_1), e = Math.tan(i.x / this.radius_g_1) * Qt(1, n)) : (e = Math.tan(i.x / this.radius_g_1), n = Math.tan(i.y / this.radius_g_1) * Qt(1, e));
    var h = n / this.radius_p;
    if (s = e * e + h * h + t * t, r = 2 * this.radius_g * t, o = r * r - 4 * s * this.C, o < 0)
      return i.x = Number.NaN, i.y = Number.NaN, i;
    a = (-r - Math.sqrt(o)) / (2 * s), t = this.radius_g + a * t, e *= a, n *= a, i.x = Math.atan2(e, t), i.y = Math.atan(n * Math.cos(i.x) / t), i.y = Math.atan(this.radius_p_inv2 * Math.tan(i.y));
  } else if (this.shape === "sphere") {
    if (this.flip_axis ? (n = Math.tan(i.y / this.radius_g_1), e = Math.tan(i.x / this.radius_g_1) * Math.sqrt(1 + n * n)) : (e = Math.tan(i.x / this.radius_g_1), n = Math.tan(i.y / this.radius_g_1) * Math.sqrt(1 + e * e)), s = e * e + n * n + t * t, r = 2 * this.radius_g * t, o = r * r - 4 * s * this.C, o < 0)
      return i.x = Number.NaN, i.y = Number.NaN, i;
    a = (-r - Math.sqrt(o)) / (2 * s), t = this.radius_g + a * t, e *= a, n *= a, i.x = Math.atan2(e, t), i.y = Math.atan(n * Math.cos(i.x) / t);
  }
  return i.x = i.x + this.long0, i;
}
var Sv = ["Geostationary Satellite View", "Geostationary_Satellite", "geos"];
const Tv = {
  init: Mv,
  forward: Cv,
  inverse: Ev,
  names: Sv
};
function wv(i) {
  i.Proj.projections.add(Js), i.Proj.projections.add(Qs), i.Proj.projections.add(Lp), i.Proj.projections.add(Wp), i.Proj.projections.add(qp), i.Proj.projections.add(Qp), i.Proj.projections.add(r1), i.Proj.projections.add(c1), i.Proj.projections.add(_1), i.Proj.projections.add(v1), i.Proj.projections.add(k1), i.Proj.projections.add(j1), i.Proj.projections.add(q1), i.Proj.projections.add(tx), i.Proj.projections.add(rx), i.Proj.projections.add(cx), i.Proj.projections.add(_x), i.Proj.projections.add(vx), i.Proj.projections.add(wx), i.Proj.projections.add(Px), i.Proj.projections.add(Nx), i.Proj.projections.add(Bx), i.Proj.projections.add(Yx), i.Proj.projections.add(Zx), i.Proj.projections.add(iv), i.Proj.projections.add(cv), i.Proj.projections.add(_v), i.Proj.projections.add(vv), i.Proj.projections.add(Tv);
}
wt.defaultDatum = "WGS84";
wt.Proj = ce;
wt.WGS84 = new wt.Proj("WGS84");
wt.Point = xn;
wt.toPoint = _u;
wt.defs = It;
wt.nadgrid = Fy;
wt.transform = Er;
wt.mgrs = Hy;
wt.version = "__VERSION__";
wv(wt);
class Ka {
  static sendEvent(t, e) {
    dispatchEvent(new CustomEvent(t, { detail: e }));
  }
}
class Rv {
  constructor(t, e, n, s) {
    this.map = t;
    const r = new Si(), o = new Ti();
    wt.defs(
      "EPSG:3857",
      "+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs"
    ), wt.defs("SR-ORG:6864", "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"), wt.defs(n, s), fetch(e).then((a) => a.text()).then((a) => {
      const c = ru(a).getElementsByTagName(
        "wfs:FeatureCollection"
      )[0].getElementsByTagName("wfs:member");
      for (let u = 0; u < c.length; u++) {
        const _ = c[u].getElementsByTagName("ms:geom")[0].getElementsByTagName("gml:Point")[0].getElementsByTagName("gml:pos")[0].innerHTML.split(" "), m = wt("EPSG:2056", "SR-ORG:6864", [Number(_[0]), Number(_[1])]), y = new le(m), p = new Te({
          geometry: y,
          name: u,
          myCustomeValue: c[u]
        });
        p.setStyle(
          new Ei({
            image: new Li({
              radius: 5,
              fill: void 0,
              stroke: new Ie({ color: "green", width: 1 })
            })
          })
        ), o == null || o.addFeature(p);
      }
      r.setSource(o), this.map.addLayer(r), this.map.on("click", function(u) {
        const d = t.forEachFeatureAtPixel(u.pixel, function(f) {
          return f;
        });
        !d || Ka.sendEvent("geocity-wfs-event", d);
      });
    });
  }
}
class bv {
  constructor(t, e) {
    var s;
    this.vectorLayer = new Si(), this.vectorSource = new Ti(), this.map = t, this.geolocation = e;
    const n = new Te();
    n.setStyle(
      new Ei({
        image: new Li({
          radius: 6,
          fill: new Qe({
            color: "#3399CC"
          }),
          stroke: new Ie({
            color: "#fff",
            width: 2
          })
        })
      })
    ), e.on("change:position", function() {
      const r = e.getPosition();
      n.setGeometry(r ? new le(r) : void 0);
    }), (s = this.vectorSource) == null || s.addFeature(n), this.vectorLayer.setSource(this.vectorSource), this.map.addLayer(this.vectorLayer);
  }
}
class Iv extends Ae {
  constructor(t, e) {
    const n = document.createElement("button");
    n.innerHTML = "R";
    const s = document.createElement("div");
    s.className = "center-control ol-unselectable ol-control", s.appendChild(n), super({
      element: s
    }), this.map = t, this.view = e, n.addEventListener("click", this.resetRotation.bind(this), !1);
  }
  resetRotation() {
    this.view.setRotation(0);
  }
}
class Av {
  read(t) {
    if (t)
      if (typeof t == "string") {
        const e = ru(t);
        return this.readFromDocument(e);
      } else
        return Vm(t) ? this.readFromDocument(t) : this.readFromNode(t);
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
const Iu = Av, Pv = "http://www.w3.org/1999/xlink";
function Ha(i) {
  return i.getAttributeNS(Pv, "href");
}
function Lv(i) {
  const t = ja(i, !1);
  return Ov(t);
}
function Ov(i) {
  const t = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(i);
  if (t)
    return parseFloat(t[1]);
}
function qe(i) {
  const t = ja(i, !1);
  return Fv(t);
}
function Fv(i) {
  const t = /^\s*(\d+)\s*$/.exec(i);
  if (t)
    return parseInt(t[1], 10);
}
function q(i) {
  return ja(i, !1).trim();
}
const Nt = [null, "http://www.opengis.net/ows/1.1"], Dv = J(Nt, {
  ServiceIdentification: N(oM),
  ServiceProvider: N(hM),
  OperationsMetadata: N(sM)
});
class Nv extends Iu {
  constructor() {
    super();
  }
  readFromNode(t) {
    const e = at({}, Dv, t, []);
    return e || null;
  }
}
const kv = J(Nt, {
  DeliveryPoint: N(q),
  City: N(q),
  AdministrativeArea: N(q),
  PostalCode: N(q),
  Country: N(q),
  ElectronicMailAddress: N(q)
}), Gv = J(Nt, {
  Value: Bt(lM)
}), $v = J(Nt, {
  AllowedValues: N(Zv)
}), zv = J(Nt, {
  Phone: N(rM),
  Address: N(Hv)
}), Bv = J(Nt, {
  HTTP: N(iM)
}), Wv = J(Nt, {
  Get: Bt(eM),
  Post: void 0
}), jv = J(Nt, {
  DCP: N(tM)
}), Uv = J(Nt, {
  Operation: nM
}), Xv = J(Nt, {
  Voice: N(q),
  Facsimile: N(q)
}), Yv = J(Nt, {
  Constraint: Bt(Jv)
}), Vv = J(Nt, {
  IndividualName: N(q),
  PositionName: N(q),
  ContactInfo: N(Qv)
}), qv = J(Nt, {
  Abstract: N(q),
  AccessConstraints: N(q),
  Fees: N(q),
  Title: N(q),
  ServiceTypeVersion: N(q),
  ServiceType: N(q)
}), Kv = J(Nt, {
  ProviderName: N(q),
  ProviderSite: N(Ha),
  ServiceContact: N(aM)
});
function Hv(i, t) {
  return at({}, kv, i, t);
}
function Zv(i, t) {
  return at({}, Gv, i, t);
}
function Jv(i, t) {
  const e = i.getAttribute("name");
  if (!!e)
    return at({ name: e }, $v, i, t);
}
function Qv(i, t) {
  return at({}, zv, i, t);
}
function tM(i, t) {
  return at({}, Bv, i, t);
}
function eM(i, t) {
  const e = Ha(i);
  if (!!e)
    return at(
      { href: e },
      Yv,
      i,
      t
    );
}
function iM(i, t) {
  return at({}, Wv, i, t);
}
function nM(i, t) {
  const e = i.getAttribute("name"), n = at({}, jv, i, t);
  if (!n)
    return;
  const s = t[t.length - 1];
  s[e] = n;
}
function sM(i, t) {
  return at({}, Uv, i, t);
}
function rM(i, t) {
  return at({}, Xv, i, t);
}
function oM(i, t) {
  return at({}, qv, i, t);
}
function aM(i, t) {
  return at({}, Vv, i, t);
}
function hM(i, t) {
  return at({}, Kv, i, t);
}
function lM(i, t) {
  return q(i);
}
const cM = Nv, fe = [null, "http://www.opengis.net/wmts/1.0"], Sn = [null, "http://www.opengis.net/ows/1.1"], uM = J(fe, {
  Contents: N(EM)
});
class dM extends Iu {
  constructor() {
    super(), this.owsParser_ = new cM();
  }
  readFromNode(t) {
    let e = t.getAttribute("version");
    e && (e = e.trim());
    let n = this.owsParser_.readFromNode(t);
    return n ? (n.version = e, n = at(
      n,
      uM,
      t,
      []
    ), n || null) : null;
  }
}
const fM = J(fe, {
  Layer: Bt(SM),
  TileMatrixSet: Bt(TM)
}), gM = J(
  fe,
  {
    Style: Bt(wM),
    Format: Bt(q),
    TileMatrixSetLink: Bt(RM),
    Dimension: Bt(bM),
    ResourceURL: Bt(IM)
  },
  J(Sn, {
    Title: N(q),
    Abstract: N(q),
    WGS84BoundingBox: N(Au),
    Identifier: N(q)
  })
), _M = J(
  fe,
  {
    LegendURL: Bt(AM)
  },
  J(Sn, {
    Title: N(q),
    Identifier: N(q)
  })
), mM = J(fe, {
  TileMatrixSet: N(q),
  TileMatrixSetLimits: N(LM)
}), yM = J(fe, {
  TileMatrixLimits: jo(OM)
}), pM = J(fe, {
  TileMatrix: N(q),
  MinTileRow: N(qe),
  MaxTileRow: N(qe),
  MinTileCol: N(qe),
  MaxTileCol: N(qe)
}), xM = J(
  fe,
  {
    Default: N(q),
    Value: Bt(q)
  },
  J(Sn, {
    Identifier: N(q)
  })
), vM = J(Sn, {
  LowerCorner: jo(qo),
  UpperCorner: jo(qo)
}), MM = J(
  fe,
  {
    WellKnownScaleSet: N(q),
    TileMatrix: Bt(PM)
  },
  J(Sn, {
    SupportedCRS: N(q),
    Identifier: N(q),
    BoundingBox: N(Au)
  })
), CM = J(
  fe,
  {
    TopLeftCorner: N(qo),
    ScaleDenominator: N(Lv),
    TileWidth: N(qe),
    TileHeight: N(qe),
    MatrixWidth: N(qe),
    MatrixHeight: N(qe)
  },
  J(Sn, {
    Identifier: N(q)
  })
);
function EM(i, t) {
  return at({}, fM, i, t);
}
function SM(i, t) {
  return at({}, gM, i, t);
}
function TM(i, t) {
  return at({}, MM, i, t);
}
function wM(i, t) {
  const e = at({}, _M, i, t);
  if (!e)
    return;
  const n = i.getAttribute("isDefault") === "true";
  return e.isDefault = n, e;
}
function RM(i, t) {
  return at({}, mM, i, t);
}
function bM(i, t) {
  return at({}, xM, i, t);
}
function IM(i, t) {
  const e = i.getAttribute("format"), n = i.getAttribute("template"), s = i.getAttribute("resourceType"), r = {};
  return e && (r.format = e), n && (r.template = n), s && (r.resourceType = s), r;
}
function Au(i, t) {
  const e = at(
    [],
    vM,
    i,
    t
  );
  if (e.length == 2)
    return Et(e);
}
function AM(i, t) {
  const e = {};
  return e.format = i.getAttribute("format"), e.href = Ha(i), e;
}
function qo(i, t) {
  const e = q(i).split(/\s+/);
  if (!e || e.length != 2)
    return;
  const n = +e[0], s = +e[1];
  if (!(isNaN(n) || isNaN(s)))
    return [n, s];
}
function PM(i, t) {
  return at({}, CM, i, t);
}
function LM(i, t) {
  return at([], yM, i, t);
}
function OM(i, t) {
  return at({}, pM, i, t);
}
const FM = dM;
class DM {
  constructor(t, e) {
    const n = new FM();
    fetch(e.capability).then(function(s) {
      return s.text();
    }).then(function(s) {
      const r = n.read(s), o = Tm(r, {
        layer: e.layer,
        matrixSet: e.projection
      });
      if (o) {
        const a = new vm({
          opacity: 1,
          source: new Sm(o)
        });
        t.getLayers().insertAt(0, a);
      }
    });
  }
}
const NM = `.custom-popup-element{position:absolute;top:5px;background-color:#fff;box-shadow:0 1px 4px #0003;padding:15px;border-radius:10px;border:1px solid #cccccc;z-index:10;margin-left:5px;margin-right:5px;max-width:302px;width:100%}.custom-popup-element:after{content:"";width:var(--progress-width);height:4px;background:green;position:absolute;bottom:-1px;left:0;border-bottom-left-radius:10px;border-bottom-right-radius:10px}.custom-popup-title{display:flex}.custom-popup-title-text{width:90%;font-weight:600;font-size:14px;line-height:17px}.custom-popup-title-svg{width:10%;justify-content:flex-end;display:flex}.custom-popup-content{font-weight:400;font-size:12px;line-height:15px}
`;
var kM = Object.defineProperty, GM = Object.getOwnPropertyDescriptor, Za = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? GM(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(t, e, s) : o(s)) || s);
  return n && s && kM(t, e, s), s;
};
let as = class extends rn {
  constructor() {
    super(), this.information = { duration: 0, title: "", content: "" }, this._width = 100, window.addEventListener("clear-information-box-interval", this.clear.bind(this), !0);
  }
  firstUpdated() {
    const i = this.information.duration / 100;
    this._width = 100, this.interval = setInterval(() => {
      this._width > 0 ? this._width-- : this.closeBox();
    }, i * 1e3);
  }
  render() {
    return Gl`
      <div class="custom-popup-element" style="--progress-width: ${this._width}%">
        <div class="custom-popup-title">
          <div class="custom-popup-title-text">${this.information.title}</div>
          <svg _width="20" height="20" fill="none" viewBox="0 0 20 20" class="custom-popup-title-svg" @click="${this.closeBox}">
            <path d="M15.4 4.59998L4.60004 15.4" stroke="#1E293B" stroke-_width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M15.4 15.4L4.60004 4.59998" stroke="#1E293B" stroke-_width="2" stroke-linecap="round" stroke-linejoin="round"></path>
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
    clearInterval(this.interval), Ka.sendEvent("close-information-box", {});
  }
};
as.styles = [Ki(NM)];
Za([
  Ho()
], as.prototype, "information", 2);
Za([
  Zo()
], as.prototype, "_width", 2);
as = Za([
  $l("information-box")
], as);
class Ll extends Ae {
  constructor(t) {
    const e = document.createElement("information-box");
    e.information = t, super({ element: e });
  }
}
class $M extends Ae {
  constructor(t, e) {
    const n = document.createElement("button");
    n.innerHTML = "i";
    const s = document.createElement("div");
    s.className = "information-control ol-unselectable ol-control", s.appendChild(n), super({
      element: s
    }), this.informationIsOpen = !0, this.map = t, this.information = e, n.addEventListener("click", this.toogleInformationBox.bind(this), !1), window.addEventListener("close-information-box", this.closeInformationBox.bind(this), !1), this.openInformationBox();
  }
  closeInformationBox() {
    Ka.sendEvent("clear-information-box-interval", {}), this.map.getControls().forEach((t) => {
      t instanceof Ll && this.map.removeControl(t);
    }), this.informationIsOpen = !1;
  }
  openInformationBox() {
    this.map.addControl(new Ll(this.information)), this.informationIsOpen = !0;
  }
  toogleInformationBox() {
    this.informationIsOpen ? this.closeInformationBox() : this.openInformationBox();
  }
}
const zM = `:root,:host{--ol-background-color: white;--ol-accent-background-color: #F5F5F5;--ol-subtle-background-color: rgba(128, 128, 128, .25);--ol-partial-background-color: rgba(255, 255, 255, .75);--ol-foreground-color: #333333;--ol-subtle-foreground-color: #666666;--ol-brand-color: #00AAFF}.ol-box{box-sizing:border-box;border-radius:2px;border:1.5px solid var(--ol-background-color);background-color:var(--ol-partial-background-color)}.ol-mouse-position{top:8px;right:8px;position:absolute}.ol-scale-line{background:var(--ol-partial-background-color);border-radius:4px;bottom:8px;left:8px;padding:2px;position:absolute}.ol-scale-line-inner{border:1px solid var(--ol-subtle-foreground-color);border-top:none;color:var(--ol-foreground-color);font-size:10px;text-align:center;margin:1px;will-change:contents,width;transition:all .25s}.ol-scale-bar{position:absolute;bottom:8px;left:8px}.ol-scale-bar-inner{display:flex}.ol-scale-step-marker{width:1px;height:15px;background-color:var(--ol-foreground-color);float:right;z-index:10}.ol-scale-step-text{position:absolute;bottom:-5px;font-size:10px;z-index:11;color:var(--ol-foreground-color);text-shadow:-1.5px 0 var(--ol-partial-background-color),0 1.5px var(--ol-partial-background-color),1.5px 0 var(--ol-partial-background-color),0 -1.5px var(--ol-partial-background-color)}.ol-scale-text{position:absolute;font-size:12px;text-align:center;bottom:25px;color:var(--ol-foreground-color);text-shadow:-1.5px 0 var(--ol-partial-background-color),0 1.5px var(--ol-partial-background-color),1.5px 0 var(--ol-partial-background-color),0 -1.5px var(--ol-partial-background-color)}.ol-scale-singlebar{position:relative;height:10px;z-index:9;box-sizing:border-box;border:1px solid var(--ol-foreground-color)}.ol-scale-singlebar-even{background-color:var(--ol-subtle-foreground-color)}.ol-scale-singlebar-odd{background-color:var(--ol-background-color)}.ol-unsupported{display:none}.ol-viewport,.ol-unselectable{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.ol-viewport canvas{all:unset}.ol-selectable{-webkit-touch-callout:default;-webkit-user-select:text;-moz-user-select:text;user-select:text}.ol-grabbing{cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.ol-grab{cursor:move;cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.ol-control{position:absolute;background-color:var(--ol-subtle-background-color);border-radius:4px}.ol-zoom{top:.5em;left:.5em}.ol-rotate{top:.5em;right:.5em;transition:opacity .25s linear,visibility 0s linear}.ol-rotate.ol-hidden{opacity:0;visibility:hidden;transition:opacity .25s linear,visibility 0s linear .25s}.ol-zoom-extent{top:4.643em;left:.5em}.ol-full-screen{right:.5em;top:.5em}.ol-control button{display:block;margin:1px;padding:0;color:var(--ol-subtle-foreground-color);font-weight:700;text-decoration:none;font-size:inherit;text-align:center;height:1.375em;width:1.375em;line-height:.4em;background-color:var(--ol-background-color);border:none;border-radius:2px}.ol-control button::-moz-focus-inner{border:none;padding:0}.ol-zoom-extent button{line-height:1.4em}.ol-compass{display:block;font-weight:400;will-change:transform}.ol-touch .ol-control button{font-size:1.5em}.ol-touch .ol-zoom-extent{top:5.5em}.ol-control button:hover,.ol-control button:focus{text-decoration:none;outline:1px solid var(--ol-subtle-foreground-color);color:var(--ol-foreground-color)}.ol-zoom .ol-zoom-in{border-radius:2px 2px 0 0}.ol-zoom .ol-zoom-out{border-radius:0 0 2px 2px}.ol-attribution{text-align:right;bottom:.5em;right:.5em;max-width:calc(100% - 1.3em);display:flex;flex-flow:row-reverse;align-items:center}.ol-attribution a{color:var(--ol-subtle-foreground-color);text-decoration:none}.ol-attribution ul{margin:0;padding:1px .5em;color:var(--ol-foreground-color);text-shadow:0 0 2px var(--ol-background-color);font-size:12px}.ol-attribution li{display:inline;list-style:none}.ol-attribution li:not(:last-child):after{content:" "}.ol-attribution img{max-height:2em;max-width:inherit;vertical-align:middle}.ol-attribution button{flex-shrink:0}.ol-attribution.ol-collapsed ul{display:none}.ol-attribution:not(.ol-collapsed){background:var(--ol-partial-background-color)}.ol-attribution.ol-uncollapsible{bottom:0;right:0;border-radius:4px 0 0}.ol-attribution.ol-uncollapsible img{margin-top:-.2em;max-height:1.6em}.ol-attribution.ol-uncollapsible button{display:none}.ol-zoomslider{top:4.5em;left:.5em;height:200px}.ol-zoomslider button{position:relative;height:10px}.ol-touch .ol-zoomslider{top:5.5em}.ol-overviewmap{left:.5em;bottom:.5em}.ol-overviewmap.ol-uncollapsible{bottom:0;left:0;border-radius:0 4px 0 0}.ol-overviewmap .ol-overviewmap-map,.ol-overviewmap button{display:block}.ol-overviewmap .ol-overviewmap-map{border:1px solid var(--ol-subtle-foreground-color);height:150px;width:150px}.ol-overviewmap:not(.ol-collapsed) button{bottom:0;left:0;position:absolute}.ol-overviewmap.ol-collapsed .ol-overviewmap-map,.ol-overviewmap.ol-uncollapsible button{display:none}.ol-overviewmap:not(.ol-collapsed){background:var(--ol-subtle-background-color)}.ol-overviewmap-box{border:1.5px dotted var(--ol-subtle-foreground-color)}.ol-overviewmap .ol-overviewmap-box:hover{cursor:move}
`, BM = `#map{width:100%;height:100%}
`, WM = `.information-control{right:.5em;top:2.5em}.center-control{top:95%;left:.5em}
`, jM = `.notification-element{position:absolute;bottom:5%;background-color:var(--notification-background-color);box-shadow:0 1px 4px #0003;padding:15px;border-radius:10px;border:1px solid #cccccc;z-index:10;margin-left:5px;margin-right:5px;max-width:302px;width:100%}.notification-title{display:flex}.notification-title-text{font-weight:400;font-size:12px;line-height:15px;color:var(--notification-text-color)}.notification-title-svg{margin-right:10px}
`;
var UM = Object.defineProperty, XM = Object.getOwnPropertyDescriptor, vs = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? XM(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(t, e, s) : o(s)) || s);
  return n && s && UM(t, e, s), s;
};
let bi = class extends rn {
  constructor() {
    super(), this.options = {
      zoom: 15,
      minZoom: 1,
      maxZoom: 18,
      displayZoom: !0,
      displayScaleLine: !1,
      fullscreen: !0,
      defaultCenter: [739867.251358, 5905800079386e-6],
      enableGeolocation: !1,
      enableCenterButton: !1,
      enableDraw: !0,
      drawElement: "Point",
      maxNbDraw: 3,
      enableRotation: !0,
      information: {
        duration: 5,
        title: "This is a title",
        content: "This is a content"
      },
      info: {
        configuration: {
          textColor: "#1D4ED8",
          backgroundColor: "#DBEAFE"
        },
        message: "Veuillez zoomer davantage avant de pouvoir pointer l'emplacement"
      },
      warning: {
        configuration: {
          textColor: "#B45309",
          backgroundColor: "#FEF3C7"
        },
        message: "Veuillez zoomer davantage avant de pouvoir pointer l'emplacement"
      },
      error: {
        configuration: {
          textColor: "#B91C1C",
          backgroundColor: "#FEE2E2"
        },
        message: "Une erreur est survenue lors du chargement de votre positiont"
      },
      geojson: {
        url: ""
      },
      wfs: {
        url: "https://mapnv.ch/mapserv_proxy?ogcserver=source+for+image%2Fpng&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=mf_ste_equipements_publics_poubelle",
        projection: "EPSG:2056",
        projectionDefinition: "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs"
      },
      wmts: {
        capability: "https://wmts.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml",
        layer: "ch.swisstopo.swissimage",
        projection: "EPSG:3857"
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
  }
  firstUpdated() {
    this.view = new je({
      center: this.options.defaultCenter,
      zoom: this.options.zoom,
      minZoom: this.options.minZoom,
      maxZoom: this.options.maxZoom,
      enableRotation: this.options.enableRotation
    });
    const i = new Qg({
      target: this.mapElement,
      controls: [],
      layers: [],
      view: this.view
    });
    this.options.enableGeolocation && (this.geolocation = new n_({
      trackingOptions: {
        enableHighAccuracy: !0
      },
      projection: this.view.getProjection()
    }), this.geolocation.setTracking(!0), new bv(i, this.geolocation));
    const t = [];
    this.options.wmts.capability != "" && new DM(i, this.options.wmts), this.options.displayZoom && t.push(new vc()), this.options.enableCenterButton && t.push(new P0(this.geolocation)), this.options.enableRotation && t.push(new Iv(i, this.view)), t.push(new $M(i, this.options.information)), t.forEach((e) => i.addControl(e)), this.options.displayScaleLine && i.addControl(new A0({ units: "metric" })), this.options.fullscreen && i.addControl(new R0()), this.options.geojson.url != "" && new Ym(i, this.options.geojson.url), this.options.wfs.url != "" && new Rv(i, this.options.wfs.url, this.options.wfs.projection, this.options.wfs.projectionDefinition), this.options.enableDraw && new Xm(i, this.options.drawElement, this.options.maxNbDraw);
  }
  render() {
    return Gl`
    <div id="map">
    </div>   
    `;
  }
};
bi.styles = [Ki(zM), Ki(BM), Ki(WM), Ki(jM)];
vs([
  Hu("#map")
], bi.prototype, "mapElement", 2);
vs([
  Zo()
], bi.prototype, "view", 2);
vs([
  Zo()
], bi.prototype, "geolocation", 2);
vs([
  Ho({ type: Object, attribute: "options" })
], bi.prototype, "options", 2);
bi = vs([
  $l("openlayers-element")
], bi);
export {
  bi as OpenLayersElement
};
