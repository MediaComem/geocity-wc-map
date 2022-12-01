import { css as cs, LitElement as us, html as ds } from "lit";
import { query as gs, customElement as fs } from "lit/decorators.js";
class _s {
  constructor(e) {
    this.propagationStopped, this.defaultPrevented, this.type = e, this.target = null;
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
  stopPropagation() {
    this.propagationStopped = !0;
  }
}
const Te = _s, qe = {
  PROPERTYCHANGE: "propertychange"
};
class ms {
  constructor() {
    this.disposed = !1;
  }
  dispose() {
    this.disposed || (this.disposed = !0, this.disposeInternal());
  }
  disposeInternal() {
  }
}
const rn = ms;
function on(i, e) {
  return i > e ? 1 : i < e ? -1 : 0;
}
function an(i, e, t) {
  const n = i.length;
  if (i[0] <= e)
    return 0;
  if (e <= i[n - 1])
    return n - 1;
  {
    let s;
    if (t > 0) {
      for (s = 1; s < n; ++s)
        if (i[s] < e)
          return s - 1;
    } else if (t < 0) {
      for (s = 1; s < n; ++s)
        if (i[s] <= e)
          return s;
    } else
      for (s = 1; s < n; ++s) {
        if (i[s] == e)
          return s;
        if (i[s] < e)
          return typeof t == "function" ? t(e, i[s - 1], i[s]) > 0 ? s - 1 : s : i[s - 1] - e < e - i[s] ? s - 1 : s;
      }
    return n - 1;
  }
}
function ys(i, e) {
  const t = Array.isArray(e) ? e : [e], n = t.length;
  for (let s = 0; s < n; s++)
    i[i.length] = t[s];
}
function ln(i, e) {
  const t = i.length;
  if (t !== e.length)
    return !1;
  for (let n = 0; n < t; n++)
    if (i[n] !== e[n])
      return !1;
  return !0;
}
function ps(i, e, t) {
  const n = e || on;
  return i.every(function(s, r) {
    if (r === 0)
      return !0;
    const o = n(i[r - 1], s);
    return !(o > 0 || t && o === 0);
  });
}
function yt() {
  return !0;
}
function It() {
  return !1;
}
function Be() {
}
function Es(i) {
  let e = !1, t, n, s;
  return function() {
    const r = Array.prototype.slice.call(arguments);
    return (!e || this !== s || !ln(r, n)) && (e = !0, s = this, n = r, t = i.apply(this, arguments)), t;
  };
}
function Pt(i) {
  for (const e in i)
    delete i[e];
}
function Cs(i) {
  let e;
  for (e in i)
    return !1;
  return !e;
}
class Ts extends rn {
  constructor(e) {
    super(), this.eventTarget_ = e, this.pendingRemovals_ = null, this.dispatching_ = null, this.listeners_ = null;
  }
  addEventListener(e, t) {
    if (!e || !t)
      return;
    const n = this.listeners_ || (this.listeners_ = {}), s = n[e] || (n[e] = []);
    s.includes(t) || s.push(t);
  }
  dispatchEvent(e) {
    const t = typeof e == "string", n = t ? e : e.type, s = this.listeners_ && this.listeners_[n];
    if (!s)
      return;
    const r = t ? new Te(e) : e;
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
        this.removeEventListener(n, Be);
      delete o[n];
    }
    return l;
  }
  disposeInternal() {
    this.listeners_ && Pt(this.listeners_);
  }
  getListeners(e) {
    return this.listeners_ && this.listeners_[e] || void 0;
  }
  hasListener(e) {
    return this.listeners_ ? e ? e in this.listeners_ : Object.keys(this.listeners_).length > 0 : !1;
  }
  removeEventListener(e, t) {
    const n = this.listeners_ && this.listeners_[e];
    if (n) {
      const s = n.indexOf(t);
      s !== -1 && (this.pendingRemovals_ && e in this.pendingRemovals_ ? (n[s] = Be, ++this.pendingRemovals_[e]) : (n.splice(s, 1), n.length === 0 && delete this.listeners_[e]));
    }
  }
}
const hn = Ts, v = {
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
function x(i, e, t, n, s) {
  if (n && n !== i && (t = t.bind(n)), s) {
    const o = t;
    t = function() {
      i.removeEventListener(e, t), o.apply(this, arguments);
    };
  }
  const r = {
    target: i,
    type: e,
    listener: t
  };
  return i.addEventListener(e, t), r;
}
function pt(i, e, t, n) {
  return x(i, e, t, n, !0);
}
function O(i) {
  i && i.target && (i.target.removeEventListener(i.type, i.listener), Pt(i));
}
class Lt extends hn {
  constructor() {
    super(), this.on = this.onInternal, this.once = this.onceInternal, this.un = this.unInternal, this.revision_ = 0;
  }
  changed() {
    ++this.revision_, this.dispatchEvent(v.CHANGE);
  }
  getRevision() {
    return this.revision_;
  }
  onInternal(e, t) {
    if (Array.isArray(e)) {
      const n = e.length, s = new Array(n);
      for (let r = 0; r < n; ++r)
        s[r] = x(this, e[r], t);
      return s;
    } else
      return x(this, e, t);
  }
  onceInternal(e, t) {
    let n;
    if (Array.isArray(e)) {
      const s = e.length;
      n = new Array(s);
      for (let r = 0; r < s; ++r)
        n[r] = pt(this, e[r], t);
    } else
      n = pt(this, e, t);
    return t.ol_key = n, n;
  }
  unInternal(e, t) {
    const n = t.ol_key;
    if (n)
      Rs(n);
    else if (Array.isArray(e))
      for (let s = 0, r = e.length; s < r; ++s)
        this.removeEventListener(e[s], t);
    else
      this.removeEventListener(e, t);
  }
}
Lt.prototype.on;
Lt.prototype.once;
Lt.prototype.un;
function Rs(i) {
  if (Array.isArray(i))
    for (let e = 0, t = i.length; e < t; ++e)
      O(i[e]);
  else
    O(i);
}
const mi = Lt;
function M() {
  throw new Error("Unimplemented abstract method.");
}
let vs = 0;
function j(i) {
  return i.ol_uid || (i.ol_uid = String(++vs));
}
class zn extends Te {
  constructor(e, t, n) {
    super(e), this.key = t, this.oldValue = n;
  }
}
class xs extends mi {
  constructor(e) {
    super(), this.on, this.once, this.un, j(this), this.values_ = null, e !== void 0 && this.setProperties(e);
  }
  get(e) {
    let t;
    return this.values_ && this.values_.hasOwnProperty(e) && (t = this.values_[e]), t;
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
  notify(e, t) {
    let n;
    n = `change:${e}`, this.hasListener(n) && this.dispatchEvent(new zn(n, e, t)), n = qe.PROPERTYCHANGE, this.hasListener(n) && this.dispatchEvent(new zn(n, e, t));
  }
  addChangeListener(e, t) {
    this.addEventListener(`change:${e}`, t);
  }
  removeChangeListener(e, t) {
    this.removeEventListener(`change:${e}`, t);
  }
  set(e, t, n) {
    const s = this.values_ || (this.values_ = {});
    if (n)
      s[e] = t;
    else {
      const r = s[e];
      s[e] = t, r !== t && this.notify(e, r);
    }
  }
  setProperties(e, t) {
    for (const n in e)
      this.set(n, e[n], t);
  }
  applyProperties(e) {
    !e.values_ || Object.assign(this.values_ || (this.values_ = {}), e.values_);
  }
  unset(e, t) {
    if (this.values_ && e in this.values_) {
      const n = this.values_[e];
      delete this.values_[e], Cs(this.values_) && (this.values_ = null), t || this.notify(e, n);
    }
  }
}
const ce = xs, ws = {
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
class Is extends Error {
  constructor(e) {
    const t = ws[e];
    super(t), this.code = e, this.name = "AssertionError", this.message = t;
  }
}
const yi = Is, $ = {
  ADD: "add",
  REMOVE: "remove"
}, Zn = {
  LENGTH: "length"
};
class at extends Te {
  constructor(e, t, n) {
    super(e), this.element = t, this.index = n;
  }
}
class Ps extends ce {
  constructor(e, t) {
    if (super(), this.on, this.once, this.un, t = t || {}, this.unique_ = !!t.unique, this.array_ = e || [], this.unique_)
      for (let n = 0, s = this.array_.length; n < s; ++n)
        this.assertUnique_(this.array_[n], n);
    this.updateLength_();
  }
  clear() {
    for (; this.getLength() > 0; )
      this.pop();
  }
  extend(e) {
    for (let t = 0, n = e.length; t < n; ++t)
      this.push(e[t]);
    return this;
  }
  forEach(e) {
    const t = this.array_;
    for (let n = 0, s = t.length; n < s; ++n)
      e(t[n], n, t);
  }
  getArray() {
    return this.array_;
  }
  item(e) {
    return this.array_[e];
  }
  getLength() {
    return this.get(Zn.LENGTH);
  }
  insertAt(e, t) {
    if (e < 0 || e > this.getLength())
      throw new Error("Index out of bounds: " + e);
    this.unique_ && this.assertUnique_(t), this.array_.splice(e, 0, t), this.updateLength_(), this.dispatchEvent(
      new at($.ADD, t, e)
    );
  }
  pop() {
    return this.removeAt(this.getLength() - 1);
  }
  push(e) {
    this.unique_ && this.assertUnique_(e);
    const t = this.getLength();
    return this.insertAt(t, e), this.getLength();
  }
  remove(e) {
    const t = this.array_;
    for (let n = 0, s = t.length; n < s; ++n)
      if (t[n] === e)
        return this.removeAt(n);
  }
  removeAt(e) {
    if (e < 0 || e >= this.getLength())
      return;
    const t = this.array_[e];
    return this.array_.splice(e, 1), this.updateLength_(), this.dispatchEvent(
      new at($.REMOVE, t, e)
    ), t;
  }
  setAt(e, t) {
    const n = this.getLength();
    if (e >= n) {
      this.insertAt(e, t);
      return;
    }
    if (e < 0)
      throw new Error("Index out of bounds: " + e);
    this.unique_ && this.assertUnique_(t, e);
    const s = this.array_[e];
    this.array_[e] = t, this.dispatchEvent(
      new at($.REMOVE, s, e)
    ), this.dispatchEvent(
      new at($.ADD, t, e)
    );
  }
  updateLength_() {
    this.set(Zn.LENGTH, this.array_.length);
  }
  assertUnique_(e, t) {
    for (let n = 0, s = this.array_.length; n < s; ++n)
      if (this.array_[n] === e && n !== t)
        throw new yi(58);
  }
}
const he = Ps, Ce = typeof navigator < "u" && typeof navigator.userAgent < "u" ? navigator.userAgent.toLowerCase() : "", Ls = Ce.includes("firefox"), As = Ce.includes("safari") && !Ce.includes("chrom");
As && (Ce.includes("version/15.4") || /cpu (os|iphone os) 15_4 like mac os x/.test(Ce));
const bs = Ce.includes("webkit") && !Ce.includes("edge"), Ms = Ce.includes("macintosh"), pi = typeof devicePixelRatio < "u" ? devicePixelRatio : 1, Ei = typeof WorkerGlobalScope < "u" && typeof OffscreenCanvas < "u" && self instanceof WorkerGlobalScope, Ss = typeof Image < "u" && Image.prototype.decode, Ci = function() {
  let i = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get: function() {
        i = !0;
      }
    });
    window.addEventListener("_", null, e), window.removeEventListener("_", null, e);
  } catch {
  }
  return i;
}();
function A(i, e) {
  if (!i)
    throw new yi(e);
}
new Array(6);
function Ze() {
  return [1, 0, 0, 1, 0, 0];
}
function W(i, e) {
  const t = e[0], n = e[1];
  return e[0] = i[0] * t + i[2] * n + i[4], e[1] = i[1] * t + i[3] * n + i[5], e;
}
function Qe(i, e, t, n, s, r, o, a) {
  const l = Math.sin(r), h = Math.cos(r);
  return i[0] = n * h, i[1] = s * l, i[2] = -n * l, i[3] = s * h, i[4] = o * n * h - a * n * l + e, i[5] = o * s * l + a * s * h + t, i;
}
function Ti(i, e) {
  const t = Os(e);
  A(t !== 0, 32);
  const n = e[0], s = e[1], r = e[2], o = e[3], a = e[4], l = e[5];
  return i[0] = o / t, i[1] = -s / t, i[2] = -r / t, i[3] = n / t, i[4] = (r * l - o * a) / t, i[5] = -(n * l - s * a) / t, i;
}
function Os(i) {
  return i[0] * i[3] - i[1] * i[2];
}
let Xn;
function Ds(i) {
  const e = "matrix(" + i.join(", ") + ")";
  if (Ei)
    return e;
  const t = Xn || (Xn = document.createElement("div"));
  return t.style.transform = e, t.style.transform;
}
const Z = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
};
function Kn(i) {
  const e = Ie();
  for (let t = 0, n = i.length; t < n; ++t)
    _t(e, i[t]);
  return e;
}
function Fs(i, e) {
  return e ? (e[0] = i[0], e[1] = i[1], e[2] = i[2], e[3] = i[3], e) : i.slice();
}
function Ri(i, e, t) {
  let n, s;
  return e < i[0] ? n = i[0] - e : i[2] < e ? n = e - i[2] : n = 0, t < i[1] ? s = i[1] - t : i[3] < t ? s = t - i[3] : s = 0, n * n + s * s;
}
function cn(i, e) {
  return vi(i, e[0], e[1]);
}
function Ns(i, e) {
  return i[0] <= e[0] && e[2] <= i[2] && i[1] <= e[1] && e[3] <= i[3];
}
function vi(i, e, t) {
  return i[0] <= e && e <= i[2] && i[1] <= t && t <= i[3];
}
function kn(i, e) {
  const t = i[0], n = i[1], s = i[2], r = i[3], o = e[0], a = e[1];
  let l = Z.UNKNOWN;
  return o < t ? l = l | Z.LEFT : o > s && (l = l | Z.RIGHT), a < n ? l = l | Z.BELOW : a > r && (l = l | Z.ABOVE), l === Z.UNKNOWN && (l = Z.INTERSECTING), l;
}
function Ie() {
  return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
}
function Ue(i, e, t, n, s) {
  return s ? (s[0] = i, s[1] = e, s[2] = t, s[3] = n, s) : [i, e, t, n];
}
function At(i) {
  return Ue(1 / 0, 1 / 0, -1 / 0, -1 / 0, i);
}
function Gs(i, e) {
  const t = i[0], n = i[1];
  return Ue(t, n, t, n, e);
}
function zs(i, e, t, n, s) {
  const r = At(s);
  return xi(r, i, e, t, n);
}
function Wt(i, e) {
  return i[0] == e[0] && i[2] == e[2] && i[1] == e[1] && i[3] == e[3];
}
function Zs(i, e) {
  return e[0] < i[0] && (i[0] = e[0]), e[2] > i[2] && (i[2] = e[2]), e[1] < i[1] && (i[1] = e[1]), e[3] > i[3] && (i[3] = e[3]), i;
}
function _t(i, e) {
  e[0] < i[0] && (i[0] = e[0]), e[0] > i[2] && (i[2] = e[0]), e[1] < i[1] && (i[1] = e[1]), e[1] > i[3] && (i[3] = e[1]);
}
function xi(i, e, t, n, s) {
  for (; t < n; t += s)
    Xs(i, e[t], e[t + 1]);
  return i;
}
function Xs(i, e, t) {
  i[0] = Math.min(i[0], e), i[1] = Math.min(i[1], t), i[2] = Math.max(i[2], e), i[3] = Math.max(i[3], t);
}
function wi(i, e) {
  let t;
  return t = e(bt(i)), t || (t = e(Mt(i)), t) || (t = e(St(i)), t) || (t = e(Pe(i)), t) ? t : !1;
}
function Ht(i) {
  let e = 0;
  return un(i) || (e = N(i) * ne(i)), e;
}
function bt(i) {
  return [i[0], i[1]];
}
function Mt(i) {
  return [i[2], i[1]];
}
function Je(i) {
  return [(i[0] + i[2]) / 2, (i[1] + i[3]) / 2];
}
function Ks(i, e) {
  let t;
  return e === "bottom-left" ? t = bt(i) : e === "bottom-right" ? t = Mt(i) : e === "top-left" ? t = Pe(i) : e === "top-right" ? t = St(i) : A(!1, 13), t;
}
function $t(i, e, t, n, s) {
  const [r, o, a, l, h, c, u, d] = qt(
    i,
    e,
    t,
    n
  );
  return Ue(
    Math.min(r, a, h, u),
    Math.min(o, l, c, d),
    Math.max(r, a, h, u),
    Math.max(o, l, c, d),
    s
  );
}
function qt(i, e, t, n) {
  const s = e * n[0] / 2, r = e * n[1] / 2, o = Math.cos(t), a = Math.sin(t), l = s * o, h = s * a, c = r * o, u = r * a, d = i[0], g = i[1];
  return [
    d - l + u,
    g - h - c,
    d - l - u,
    g - h + c,
    d + l - u,
    g + h + c,
    d + l + u,
    g + h - c,
    d - l + u,
    g - h - c
  ];
}
function ne(i) {
  return i[3] - i[1];
}
function $e(i, e, t) {
  const n = t || Ie();
  return Ot(i, e) ? (i[0] > e[0] ? n[0] = i[0] : n[0] = e[0], i[1] > e[1] ? n[1] = i[1] : n[1] = e[1], i[2] < e[2] ? n[2] = i[2] : n[2] = e[2], i[3] < e[3] ? n[3] = i[3] : n[3] = e[3]) : At(n), n;
}
function Pe(i) {
  return [i[0], i[3]];
}
function St(i) {
  return [i[2], i[3]];
}
function N(i) {
  return i[2] - i[0];
}
function Ot(i, e) {
  return i[0] <= e[2] && i[2] >= e[0] && i[1] <= e[3] && i[3] >= e[1];
}
function un(i) {
  return i[2] < i[0] || i[3] < i[1];
}
function ks(i, e) {
  return e ? (e[0] = i[0], e[1] = i[1], e[2] = i[2], e[3] = i[3], e) : i;
}
function Us(i, e, t) {
  let n = !1;
  const s = kn(i, e), r = kn(i, t);
  if (s === Z.INTERSECTING || r === Z.INTERSECTING)
    n = !0;
  else {
    const o = i[0], a = i[1], l = i[2], h = i[3], c = e[0], u = e[1], d = t[0], g = t[1], f = (g - u) / (d - c);
    let _, p;
    !!(r & Z.ABOVE) && !(s & Z.ABOVE) && (_ = d - (g - h) / f, n = _ >= o && _ <= l), !n && !!(r & Z.RIGHT) && !(s & Z.RIGHT) && (p = g - (d - l) * f, n = p >= a && p <= h), !n && !!(r & Z.BELOW) && !(s & Z.BELOW) && (_ = d - (g - a) / f, n = _ >= o && _ <= l), !n && !!(r & Z.LEFT) && !(s & Z.LEFT) && (p = g - (d - o) * f, n = p >= a && p <= h);
  }
  return n;
}
function G(i, e, t) {
  return Math.min(Math.max(i, e), t);
}
function js(i, e, t, n, s, r) {
  const o = s - t, a = r - n;
  if (o !== 0 || a !== 0) {
    const l = ((i - t) * o + (e - n) * a) / (o * o + a * a);
    l > 1 ? (t = s, n = r) : l > 0 && (t += o * l, n += a * l);
  }
  return Xe(i, e, t, n);
}
function Xe(i, e, t, n) {
  const s = t - i, r = n - e;
  return s * s + r * r;
}
function Ys(i) {
  const e = i.length;
  for (let n = 0; n < e; n++) {
    let s = n, r = Math.abs(i[n][n]);
    for (let a = n + 1; a < e; a++) {
      const l = Math.abs(i[a][n]);
      l > r && (r = l, s = a);
    }
    if (r === 0)
      return null;
    const o = i[s];
    i[s] = i[n], i[n] = o;
    for (let a = n + 1; a < e; a++) {
      const l = -i[a][n] / i[n][n];
      for (let h = n; h < e + 1; h++)
        n == h ? i[a][h] = 0 : i[a][h] += l * i[n][h];
    }
  }
  const t = new Array(e);
  for (let n = e - 1; n >= 0; n--) {
    t[n] = i[n][e] / i[n][n];
    for (let s = n - 1; s >= 0; s--)
      i[s][e] -= i[s][n] * t[n];
  }
  return t;
}
function mt(i) {
  return i * Math.PI / 180;
}
function Ke(i, e) {
  const t = i % e;
  return t * e < 0 ? t + e : t;
}
function Vs(i, e, t) {
  return i + t * (e - i);
}
function Ii(i, e) {
  const t = Math.pow(10, e);
  return Math.round(i * t) / t;
}
function lt(i, e) {
  return Math.floor(Ii(i, e));
}
function ht(i, e) {
  return Math.ceil(Ii(i, e));
}
const Ws = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i, Hs = /^([a-z]*)$|^hsla?\(.*\)$/i;
function $s(i) {
  return typeof i == "string" ? i : Js(i);
}
function qs(i) {
  const e = document.createElement("div");
  if (e.style.color = i, e.style.color !== "") {
    document.body.appendChild(e);
    const t = getComputedStyle(e).color;
    return document.body.removeChild(e), t;
  } else
    return "";
}
const Bs = function() {
  const e = {};
  let t = 0;
  return function(n) {
    let s;
    if (e.hasOwnProperty(n))
      s = e[n];
    else {
      if (t >= 1024) {
        let r = 0;
        for (const o in e)
          (r++ & 3) === 0 && (delete e[o], --t);
      }
      s = Qs(n), e[n] = s, ++t;
    }
    return s;
  };
}();
function Un(i) {
  return Array.isArray(i) ? i : Bs(i);
}
function Qs(i) {
  let e, t, n, s, r;
  if (Hs.exec(i) && (i = qs(i)), Ws.exec(i)) {
    const o = i.length - 1;
    let a;
    o <= 4 ? a = 1 : a = 2;
    const l = o === 4 || o === 8;
    e = parseInt(i.substr(1 + 0 * a, a), 16), t = parseInt(i.substr(1 + 1 * a, a), 16), n = parseInt(i.substr(1 + 2 * a, a), 16), l ? s = parseInt(i.substr(1 + 3 * a, a), 16) : s = 255, a == 1 && (e = (e << 4) + e, t = (t << 4) + t, n = (n << 4) + n, l && (s = (s << 4) + s)), r = [e, t, n, s / 255];
  } else
    i.startsWith("rgba(") ? (r = i.slice(5, -1).split(",").map(Number), jn(r)) : i.startsWith("rgb(") ? (r = i.slice(4, -1).split(",").map(Number), r.push(1), jn(r)) : A(!1, 14);
  return r;
}
function jn(i) {
  return i[0] = G(i[0] + 0.5 | 0, 0, 255), i[1] = G(i[1] + 0.5 | 0, 0, 255), i[2] = G(i[2] + 0.5 | 0, 0, 255), i[3] = G(i[3], 0, 1), i;
}
function Js(i) {
  let e = i[0];
  e != (e | 0) && (e = e + 0.5 | 0);
  let t = i[1];
  t != (t | 0) && (t = t + 0.5 | 0);
  let n = i[2];
  n != (n | 0) && (n = n + 0.5 | 0);
  const s = i[3] === void 0 ? 1 : Math.round(i[3] * 100) / 100;
  return "rgba(" + e + "," + t + "," + n + "," + s + ")";
}
class er {
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
      let e = 0;
      for (const t in this.cache_) {
        const n = this.cache_[t];
        (e++ & 3) === 0 && !n.hasListener() && (delete this.cache_[t], --this.cacheSize_);
      }
    }
  }
  get(e, t, n) {
    const s = Yn(e, t, n);
    return s in this.cache_ ? this.cache_[s] : null;
  }
  set(e, t, n, s) {
    const r = Yn(e, t, n);
    this.cache_[r] = s, ++this.cacheSize_;
  }
  setSize(e) {
    this.maxCacheSize_ = e, this.expire();
  }
}
function Yn(i, e, t) {
  const n = t ? $s(t) : "null";
  return e + ":" + i + ":" + n;
}
const Pi = new er(), I = {
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
class tr extends ce {
  constructor(e) {
    super(), this.on, this.once, this.un, this.background_ = e.background;
    const t = Object.assign({}, e);
    typeof e.properties == "object" && (delete t.properties, Object.assign(t, e.properties)), t[I.OPACITY] = e.opacity !== void 0 ? e.opacity : 1, A(typeof t[I.OPACITY] == "number", 64), t[I.VISIBLE] = e.visible !== void 0 ? e.visible : !0, t[I.Z_INDEX] = e.zIndex, t[I.MAX_RESOLUTION] = e.maxResolution !== void 0 ? e.maxResolution : 1 / 0, t[I.MIN_RESOLUTION] = e.minResolution !== void 0 ? e.minResolution : 0, t[I.MIN_ZOOM] = e.minZoom !== void 0 ? e.minZoom : -1 / 0, t[I.MAX_ZOOM] = e.maxZoom !== void 0 ? e.maxZoom : 1 / 0, this.className_ = t.className !== void 0 ? t.className : "ol-layer", delete t.className, this.setProperties(t), this.state_ = null;
  }
  getBackground() {
    return this.background_;
  }
  getClassName() {
    return this.className_;
  }
  getLayerState(e) {
    const t = this.state_ || {
      layer: this,
      managed: e === void 0 ? !0 : e
    }, n = this.getZIndex();
    return t.opacity = G(Math.round(this.getOpacity() * 100) / 100, 0, 1), t.visible = this.getVisible(), t.extent = this.getExtent(), t.zIndex = n === void 0 && !t.managed ? 1 / 0 : n, t.maxResolution = this.getMaxResolution(), t.minResolution = Math.max(this.getMinResolution(), 0), t.minZoom = this.getMinZoom(), t.maxZoom = this.getMaxZoom(), this.state_ = t, t;
  }
  getLayersArray(e) {
    return M();
  }
  getLayerStatesArray(e) {
    return M();
  }
  getExtent() {
    return this.get(I.EXTENT);
  }
  getMaxResolution() {
    return this.get(I.MAX_RESOLUTION);
  }
  getMinResolution() {
    return this.get(I.MIN_RESOLUTION);
  }
  getMinZoom() {
    return this.get(I.MIN_ZOOM);
  }
  getMaxZoom() {
    return this.get(I.MAX_ZOOM);
  }
  getOpacity() {
    return this.get(I.OPACITY);
  }
  getSourceState() {
    return M();
  }
  getVisible() {
    return this.get(I.VISIBLE);
  }
  getZIndex() {
    return this.get(I.Z_INDEX);
  }
  setBackground(e) {
    this.background_ = e, this.changed();
  }
  setExtent(e) {
    this.set(I.EXTENT, e);
  }
  setMaxResolution(e) {
    this.set(I.MAX_RESOLUTION, e);
  }
  setMinResolution(e) {
    this.set(I.MIN_RESOLUTION, e);
  }
  setMaxZoom(e) {
    this.set(I.MAX_ZOOM, e);
  }
  setMinZoom(e) {
    this.set(I.MIN_ZOOM, e);
  }
  setOpacity(e) {
    A(typeof e == "number", 64), this.set(I.OPACITY, e);
  }
  setVisible(e) {
    this.set(I.VISIBLE, e);
  }
  setZIndex(e) {
    this.set(I.Z_INDEX, e);
  }
  disposeInternal() {
    this.state_ && (this.state_.layer = null, this.state_ = null), super.disposeInternal();
  }
}
const Li = tr, Ee = {
  PRERENDER: "prerender",
  POSTRENDER: "postrender",
  PRECOMPOSE: "precompose",
  POSTCOMPOSE: "postcompose",
  RENDERCOMPLETE: "rendercomplete"
};
class nr extends Li {
  constructor(e) {
    const t = Object.assign({}, e);
    delete t.source, super(t), this.on, this.once, this.un, this.mapPrecomposeKey_ = null, this.mapRenderKey_ = null, this.sourceChangeKey_ = null, this.renderer_ = null, this.rendered = !1, e.render && (this.render = e.render), e.map && this.setMap(e.map), this.addChangeListener(
      I.SOURCE,
      this.handleSourcePropertyChange_
    );
    const n = e.source ? e.source : null;
    this.setSource(n);
  }
  getLayersArray(e) {
    return e = e || [], e.push(this), e;
  }
  getLayerStatesArray(e) {
    return e = e || [], e.push(this.getLayerState()), e;
  }
  getSource() {
    return this.get(I.SOURCE) || null;
  }
  getRenderSource() {
    return this.getSource();
  }
  getSourceState() {
    const e = this.getSource();
    return e ? e.getState() : "undefined";
  }
  handleSourceChange_() {
    this.changed();
  }
  handleSourcePropertyChange_() {
    this.sourceChangeKey_ && (O(this.sourceChangeKey_), this.sourceChangeKey_ = null);
    const e = this.getSource();
    e && (this.sourceChangeKey_ = x(
      e,
      v.CHANGE,
      this.handleSourceChange_,
      this
    )), this.changed();
  }
  getFeatures(e) {
    return this.renderer_ ? this.renderer_.getFeatures(e) : new Promise((t) => t([]));
  }
  getData(e) {
    return !this.renderer_ || !this.rendered ? null : this.renderer_.getData(e);
  }
  render(e, t) {
    const n = this.getRenderer();
    if (n.prepareFrame(e))
      return this.rendered = !0, n.renderFrame(e, t);
  }
  unrender() {
    this.rendered = !1;
  }
  setMapInternal(e) {
    e || this.unrender(), this.set(I.MAP, e);
  }
  getMapInternal() {
    return this.get(I.MAP);
  }
  setMap(e) {
    this.mapPrecomposeKey_ && (O(this.mapPrecomposeKey_), this.mapPrecomposeKey_ = null), e || this.changed(), this.mapRenderKey_ && (O(this.mapRenderKey_), this.mapRenderKey_ = null), e && (this.mapPrecomposeKey_ = x(
      e,
      Ee.PRECOMPOSE,
      function(t) {
        const s = t.frameState.layerStatesArray, r = this.getLayerState(!1);
        A(
          !s.some(function(o) {
            return o.layer === r.layer;
          }),
          67
        ), s.push(r);
      },
      this
    ), this.mapRenderKey_ = x(this, v.CHANGE, e.render, e), this.changed());
  }
  setSource(e) {
    this.set(I.SOURCE, e);
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
function dn(i, e) {
  if (!i.visible)
    return !1;
  const t = e.resolution;
  if (t < i.minResolution || t >= i.maxResolution)
    return !1;
  const n = e.zoom;
  return n > i.minZoom && n <= i.maxZoom;
}
const gn = nr;
function ir(i, e) {
  return i[0] += +e[0], i[1] += +e[1], i;
}
function Et(i, e) {
  let t = !0;
  for (let n = i.length - 1; n >= 0; --n)
    if (i[n] != e[n]) {
      t = !1;
      break;
    }
  return t;
}
function fn(i, e) {
  const t = Math.cos(e), n = Math.sin(e), s = i[0] * t - i[1] * n, r = i[1] * t + i[0] * n;
  return i[0] = s, i[1] = r, i;
}
function sr(i, e) {
  return i[0] *= e, i[1] *= e, i;
}
function rr(i, e) {
  if (e.canWrapX()) {
    const t = N(e.getExtent()), n = or(i, e, t);
    n && (i[0] -= n * t);
  }
  return i;
}
function or(i, e, t) {
  const n = e.getExtent();
  let s = 0;
  return e.canWrapX() && (i[0] < n[0] || i[0] > n[2]) && (t = t || N(n), s = Math.floor(
    (i[0] - n[0]) / t
  )), s;
}
class ar extends rn {
  constructor(e) {
    super(), this.map_ = e;
  }
  dispatchRenderEvent(e, t) {
    M();
  }
  calculateMatrices2D(e) {
    const t = e.viewState, n = e.coordinateToPixelTransform, s = e.pixelToCoordinateTransform;
    Qe(
      n,
      e.size[0] / 2,
      e.size[1] / 2,
      1 / t.resolution,
      -1 / t.resolution,
      -t.rotation,
      -t.center[0],
      -t.center[1]
    ), Ti(s, n);
  }
  forEachFeatureAtCoordinate(e, t, n, s, r, o, a, l) {
    let h;
    const c = t.viewState;
    function u(m, R, P, w) {
      return r.call(o, R, m ? P : null, w);
    }
    const d = c.projection, g = rr(e.slice(), d), f = [[0, 0]];
    if (d.canWrapX() && s) {
      const m = d.getExtent(), R = N(m);
      f.push([-R, 0], [R, 0]);
    }
    const _ = t.layerStatesArray, p = _.length, C = [], y = [];
    for (let m = 0; m < f.length; m++)
      for (let R = p - 1; R >= 0; --R) {
        const P = _[R], w = P.layer;
        if (w.hasRenderer() && dn(P, c) && a.call(l, w)) {
          const b = w.getRenderer(), z = w.getSource();
          if (b && z) {
            const K = z.getWrapX() ? g : e, Q = u.bind(
              null,
              P.managed
            );
            y[0] = K[0] + f[m][0], y[1] = K[1] + f[m][1], h = b.forEachFeatureAtCoordinate(
              y,
              t,
              n,
              Q,
              C
            );
          }
          if (h)
            return h;
        }
      }
    if (C.length === 0)
      return;
    const E = 1 / C.length;
    return C.forEach((m, R) => m.distanceSq += R * E), C.sort((m, R) => m.distanceSq - R.distanceSq), C.some((m) => h = m.callback(m.feature, m.layer, m.geometry)), h;
  }
  hasFeatureAtCoordinate(e, t, n, s, r, o) {
    return this.forEachFeatureAtCoordinate(
      e,
      t,
      n,
      s,
      yt,
      this,
      r,
      o
    ) !== void 0;
  }
  getMap() {
    return this.map_;
  }
  renderFrame(e) {
    M();
  }
  scheduleExpireIconCache(e) {
    Pi.canExpireCache() && e.postRenderFunctions.push(lr);
  }
}
function lr(i, e) {
  Pi.expire();
}
const hr = ar;
class cr extends Te {
  constructor(e, t, n, s) {
    super(e), this.inversePixelTransform = t, this.frameState = n, this.context = s;
  }
}
const Ai = cr, ct = "ol-hidden", Dt = "ol-unselectable", _n = "ol-control", Vn = "ol-collapsed";
function Ct(i, e, t, n) {
  let s;
  return t && t.length ? s = t.shift() : Ei ? s = new OffscreenCanvas(i || 300, e || 300) : s = document.createElement("canvas"), i && (s.width = i), e && (s.height = e), s.getContext("2d", n);
}
function ur(i) {
  const e = i.canvas;
  e.width = 1, e.height = 1, i.clearRect(0, 0, 1, 1);
}
function Wn(i, e) {
  const t = e.parentNode;
  t && t.replaceChild(i, e);
}
function Bt(i) {
  return i && i.parentNode ? i.parentNode.removeChild(i) : null;
}
function dr(i) {
  for (; i.lastChild; )
    i.removeChild(i.lastChild);
}
function gr(i, e) {
  const t = i.childNodes;
  for (let n = 0; ; ++n) {
    const s = t[n], r = e[n];
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
const fr = new ce();
class _r extends hr {
  constructor(e) {
    super(e), this.fontChangeListenerKey_ = x(
      fr,
      qe.PROPERTYCHANGE,
      e.redrawText.bind(e)
    ), this.element_ = document.createElement("div");
    const t = this.element_.style;
    t.position = "absolute", t.width = "100%", t.height = "100%", t.zIndex = "0", this.element_.className = Dt + " ol-layers";
    const n = e.getViewport();
    n.insertBefore(this.element_, n.firstChild || null), this.children_ = [], this.renderedVisible_ = !0;
  }
  dispatchRenderEvent(e, t) {
    const n = this.getMap();
    if (n.hasListener(e)) {
      const s = new Ai(e, void 0, t);
      n.dispatchEvent(s);
    }
  }
  disposeInternal() {
    O(this.fontChangeListenerKey_), this.element_.parentNode.removeChild(this.element_), super.disposeInternal();
  }
  renderFrame(e) {
    if (!e) {
      this.renderedVisible_ && (this.element_.style.display = "none", this.renderedVisible_ = !1);
      return;
    }
    this.calculateMatrices2D(e), this.dispatchRenderEvent(Ee.PRECOMPOSE, e);
    const t = e.layerStatesArray.sort(function(o, a) {
      return o.zIndex - a.zIndex;
    }), n = e.viewState;
    this.children_.length = 0;
    const s = [];
    let r = null;
    for (let o = 0, a = t.length; o < a; ++o) {
      const l = t[o];
      e.layerIndex = o;
      const h = l.layer, c = h.getSourceState();
      if (!dn(l, n) || c != "ready" && c != "undefined") {
        h.unrender();
        continue;
      }
      const u = h.render(e, r);
      !u || (u !== r && (this.children_.push(u), r = u), "getDeclutter" in h && s.push(
        h
      ));
    }
    for (let o = s.length - 1; o >= 0; --o)
      s[o].renderDeclutter(e);
    gr(this.element_, this.children_), this.dispatchRenderEvent(Ee.POSTCOMPOSE, e), this.renderedVisible_ || (this.element_.style.display = "", this.renderedVisible_ = !0), this.scheduleExpireIconCache(e);
  }
}
const mr = _r;
class ye extends Te {
  constructor(e, t) {
    super(e), this.layer = t;
  }
}
const Zt = {
  LAYERS: "layers"
};
class mn extends Li {
  constructor(e) {
    e = e || {};
    const t = Object.assign({}, e);
    delete t.layers;
    let n = e.layers;
    super(t), this.on, this.once, this.un, this.layersListenerKeys_ = [], this.listenerKeys_ = {}, this.addChangeListener(Zt.LAYERS, this.handleLayersChanged_), n ? Array.isArray(n) ? n = new he(n.slice(), { unique: !0 }) : A(typeof n.getArray == "function", 43) : n = new he(void 0, { unique: !0 }), this.setLayers(n);
  }
  handleLayerChange_() {
    this.changed();
  }
  handleLayersChanged_() {
    this.layersListenerKeys_.forEach(O), this.layersListenerKeys_.length = 0;
    const e = this.getLayers();
    this.layersListenerKeys_.push(
      x(e, $.ADD, this.handleLayersAdd_, this),
      x(e, $.REMOVE, this.handleLayersRemove_, this)
    );
    for (const n in this.listenerKeys_)
      this.listenerKeys_[n].forEach(O);
    Pt(this.listenerKeys_);
    const t = e.getArray();
    for (let n = 0, s = t.length; n < s; n++) {
      const r = t[n];
      this.registerLayerListeners_(r), this.dispatchEvent(new ye("addlayer", r));
    }
    this.changed();
  }
  registerLayerListeners_(e) {
    const t = [
      x(
        e,
        qe.PROPERTYCHANGE,
        this.handleLayerChange_,
        this
      ),
      x(e, v.CHANGE, this.handleLayerChange_, this)
    ];
    e instanceof mn && t.push(
      x(e, "addlayer", this.handleLayerGroupAdd_, this),
      x(e, "removelayer", this.handleLayerGroupRemove_, this)
    ), this.listenerKeys_[j(e)] = t;
  }
  handleLayerGroupAdd_(e) {
    this.dispatchEvent(new ye("addlayer", e.layer));
  }
  handleLayerGroupRemove_(e) {
    this.dispatchEvent(new ye("removelayer", e.layer));
  }
  handleLayersAdd_(e) {
    const t = e.element;
    this.registerLayerListeners_(t), this.dispatchEvent(new ye("addlayer", t)), this.changed();
  }
  handleLayersRemove_(e) {
    const t = e.element, n = j(t);
    this.listenerKeys_[n].forEach(O), delete this.listenerKeys_[n], this.dispatchEvent(new ye("removelayer", t)), this.changed();
  }
  getLayers() {
    return this.get(Zt.LAYERS);
  }
  setLayers(e) {
    const t = this.getLayers();
    if (t) {
      const n = t.getArray();
      for (let s = 0, r = n.length; s < r; ++s)
        this.dispatchEvent(new ye("removelayer", n[s]));
    }
    this.set(Zt.LAYERS, e);
  }
  getLayersArray(e) {
    return e = e !== void 0 ? e : [], this.getLayers().forEach(function(t) {
      t.getLayersArray(e);
    }), e;
  }
  getLayerStatesArray(e) {
    const t = e !== void 0 ? e : [], n = t.length;
    this.getLayers().forEach(function(o) {
      o.getLayerStatesArray(t);
    });
    const s = this.getLayerState();
    let r = s.zIndex;
    !e && s.zIndex === void 0 && (r = 0);
    for (let o = n, a = t.length; o < a; o++) {
      const l = t[o];
      l.opacity *= s.opacity, l.visible = l.visible && s.visible, l.maxResolution = Math.min(
        l.maxResolution,
        s.maxResolution
      ), l.minResolution = Math.max(
        l.minResolution,
        s.minResolution
      ), l.minZoom = Math.max(l.minZoom, s.minZoom), l.maxZoom = Math.min(l.maxZoom, s.maxZoom), s.extent !== void 0 && (l.extent !== void 0 ? l.extent = $e(
        l.extent,
        s.extent
      ) : l.extent = s.extent), l.zIndex === void 0 && (l.zIndex = r);
    }
    return t;
  }
  getSourceState() {
    return "ready";
  }
}
const Ft = mn;
class yr extends Te {
  constructor(e, t, n) {
    super(e), this.map = t, this.frameState = n !== void 0 ? n : null;
  }
}
const De = yr;
class pr extends De {
  constructor(e, t, n, s, r, o) {
    super(e, t, r), this.originalEvent = n, this.pixel_ = null, this.coordinate_ = null, this.dragging = s !== void 0 ? s : !1, this.activePointers = o;
  }
  get pixel() {
    return this.pixel_ || (this.pixel_ = this.map.getEventPixel(this.originalEvent)), this.pixel_;
  }
  set pixel(e) {
    this.pixel_ = e;
  }
  get coordinate() {
    return this.coordinate_ || (this.coordinate_ = this.map.getCoordinateFromPixel(this.pixel)), this.coordinate_;
  }
  set coordinate(e) {
    this.coordinate_ = e;
  }
  preventDefault() {
    super.preventDefault(), "preventDefault" in this.originalEvent && this.originalEvent.preventDefault();
  }
  stopPropagation() {
    super.stopPropagation(), "stopPropagation" in this.originalEvent && this.originalEvent.stopPropagation();
  }
}
const _e = pr, S = {
  SINGLECLICK: "singleclick",
  CLICK: v.CLICK,
  DBLCLICK: v.DBLCLICK,
  POINTERDRAG: "pointerdrag",
  POINTERMOVE: "pointermove",
  POINTERDOWN: "pointerdown",
  POINTERUP: "pointerup",
  POINTEROVER: "pointerover",
  POINTEROUT: "pointerout",
  POINTERENTER: "pointerenter",
  POINTERLEAVE: "pointerleave",
  POINTERCANCEL: "pointercancel"
}, Qt = {
  POINTERMOVE: "pointermove",
  POINTERDOWN: "pointerdown",
  POINTERUP: "pointerup",
  POINTEROVER: "pointerover",
  POINTEROUT: "pointerout",
  POINTERENTER: "pointerenter",
  POINTERLEAVE: "pointerleave",
  POINTERCANCEL: "pointercancel"
};
class Er extends hn {
  constructor(e, t) {
    super(e), this.map_ = e, this.clickTimeoutId_, this.emulateClicks_ = !1, this.dragging_ = !1, this.dragListenerKeys_ = [], this.moveTolerance_ = t === void 0 ? 1 : t, this.down_ = null;
    const n = this.map_.getViewport();
    this.activePointers_ = [], this.trackedTouches_ = {}, this.element_ = n, this.pointerdownListenerKey_ = x(
      n,
      Qt.POINTERDOWN,
      this.handlePointerDown_,
      this
    ), this.originalPointerMoveEvent_, this.relayedListenerKey_ = x(
      n,
      Qt.POINTERMOVE,
      this.relayMoveEvent_,
      this
    ), this.boundHandleTouchMove_ = this.handleTouchMove_.bind(this), this.element_.addEventListener(
      v.TOUCHMOVE,
      this.boundHandleTouchMove_,
      Ci ? { passive: !1 } : !1
    );
  }
  emulateClick_(e) {
    let t = new _e(
      S.CLICK,
      this.map_,
      e
    );
    this.dispatchEvent(t), this.clickTimeoutId_ !== void 0 ? (clearTimeout(this.clickTimeoutId_), this.clickTimeoutId_ = void 0, t = new _e(
      S.DBLCLICK,
      this.map_,
      e
    ), this.dispatchEvent(t)) : this.clickTimeoutId_ = setTimeout(
      function() {
        this.clickTimeoutId_ = void 0;
        const n = new _e(
          S.SINGLECLICK,
          this.map_,
          e
        );
        this.dispatchEvent(n);
      }.bind(this),
      250
    );
  }
  updateActivePointers_(e) {
    const t = e, n = t.pointerId;
    if (t.type == S.POINTERUP || t.type == S.POINTERCANCEL) {
      delete this.trackedTouches_[n];
      for (const s in this.trackedTouches_)
        if (this.trackedTouches_[s].target !== t.target) {
          delete this.trackedTouches_[s];
          break;
        }
    } else
      (t.type == S.POINTERDOWN || t.type == S.POINTERMOVE) && (this.trackedTouches_[n] = t);
    this.activePointers_ = Object.values(this.trackedTouches_);
  }
  handlePointerUp_(e) {
    this.updateActivePointers_(e);
    const t = new _e(
      S.POINTERUP,
      this.map_,
      e,
      void 0,
      void 0,
      this.activePointers_
    );
    this.dispatchEvent(t), this.emulateClicks_ && !t.defaultPrevented && !this.dragging_ && this.isMouseActionButton_(e) && this.emulateClick_(this.down_), this.activePointers_.length === 0 && (this.dragListenerKeys_.forEach(O), this.dragListenerKeys_.length = 0, this.dragging_ = !1, this.down_ = null);
  }
  isMouseActionButton_(e) {
    return e.button === 0;
  }
  handlePointerDown_(e) {
    this.emulateClicks_ = this.activePointers_.length === 0, this.updateActivePointers_(e);
    const t = new _e(
      S.POINTERDOWN,
      this.map_,
      e,
      void 0,
      void 0,
      this.activePointers_
    );
    this.dispatchEvent(t), this.down_ = {};
    for (const n in e) {
      const s = e[n];
      this.down_[n] = typeof s == "function" ? Be : s;
    }
    if (this.dragListenerKeys_.length === 0) {
      const n = this.map_.getOwnerDocument();
      this.dragListenerKeys_.push(
        x(
          n,
          S.POINTERMOVE,
          this.handlePointerMove_,
          this
        ),
        x(n, S.POINTERUP, this.handlePointerUp_, this),
        x(
          this.element_,
          S.POINTERCANCEL,
          this.handlePointerUp_,
          this
        )
      ), this.element_.getRootNode && this.element_.getRootNode() !== n && this.dragListenerKeys_.push(
        x(
          this.element_.getRootNode(),
          S.POINTERUP,
          this.handlePointerUp_,
          this
        )
      );
    }
  }
  handlePointerMove_(e) {
    if (this.isMoving_(e)) {
      this.updateActivePointers_(e), this.dragging_ = !0;
      const t = new _e(
        S.POINTERDRAG,
        this.map_,
        e,
        this.dragging_,
        void 0,
        this.activePointers_
      );
      this.dispatchEvent(t);
    }
  }
  relayMoveEvent_(e) {
    this.originalPointerMoveEvent_ = e;
    const t = !!(this.down_ && this.isMoving_(e));
    this.dispatchEvent(
      new _e(
        S.POINTERMOVE,
        this.map_,
        e,
        t
      )
    );
  }
  handleTouchMove_(e) {
    const t = this.originalPointerMoveEvent_;
    (!t || t.defaultPrevented) && (typeof e.cancelable != "boolean" || e.cancelable === !0) && e.preventDefault();
  }
  isMoving_(e) {
    return this.dragging_ || Math.abs(e.clientX - this.down_.clientX) > this.moveTolerance_ || Math.abs(e.clientY - this.down_.clientY) > this.moveTolerance_;
  }
  disposeInternal() {
    this.relayedListenerKey_ && (O(this.relayedListenerKey_), this.relayedListenerKey_ = null), this.element_.removeEventListener(
      v.TOUCHMOVE,
      this.boundHandleTouchMove_
    ), this.pointerdownListenerKey_ && (O(this.pointerdownListenerKey_), this.pointerdownListenerKey_ = null), this.dragListenerKeys_.forEach(O), this.dragListenerKeys_.length = 0, this.element_ = null, super.disposeInternal();
  }
}
const Cr = Er, me = {
  POSTRENDER: "postrender",
  MOVESTART: "movestart",
  MOVEEND: "moveend",
  LOADSTART: "loadstart",
  LOADEND: "loadend"
}, X = {
  LAYERGROUP: "layergroup",
  SIZE: "size",
  TARGET: "target",
  VIEW: "view"
}, Tt = 1 / 0;
class Tr {
  constructor(e, t) {
    this.priorityFunction_ = e, this.keyFunction_ = t, this.elements_ = [], this.priorities_ = [], this.queuedElements_ = {};
  }
  clear() {
    this.elements_.length = 0, this.priorities_.length = 0, Pt(this.queuedElements_);
  }
  dequeue() {
    const e = this.elements_, t = this.priorities_, n = e[0];
    e.length == 1 ? (e.length = 0, t.length = 0) : (e[0] = e.pop(), t[0] = t.pop(), this.siftUp_(0));
    const s = this.keyFunction_(n);
    return delete this.queuedElements_[s], n;
  }
  enqueue(e) {
    A(!(this.keyFunction_(e) in this.queuedElements_), 31);
    const t = this.priorityFunction_(e);
    return t != Tt ? (this.elements_.push(e), this.priorities_.push(t), this.queuedElements_[this.keyFunction_(e)] = !0, this.siftDown_(0, this.elements_.length - 1), !0) : !1;
  }
  getCount() {
    return this.elements_.length;
  }
  getLeftChildIndex_(e) {
    return e * 2 + 1;
  }
  getRightChildIndex_(e) {
    return e * 2 + 2;
  }
  getParentIndex_(e) {
    return e - 1 >> 1;
  }
  heapify_() {
    let e;
    for (e = (this.elements_.length >> 1) - 1; e >= 0; e--)
      this.siftUp_(e);
  }
  isEmpty() {
    return this.elements_.length === 0;
  }
  isKeyQueued(e) {
    return e in this.queuedElements_;
  }
  isQueued(e) {
    return this.isKeyQueued(this.keyFunction_(e));
  }
  siftUp_(e) {
    const t = this.elements_, n = this.priorities_, s = t.length, r = t[e], o = n[e], a = e;
    for (; e < s >> 1; ) {
      const l = this.getLeftChildIndex_(e), h = this.getRightChildIndex_(e), c = h < s && n[h] < n[l] ? h : l;
      t[e] = t[c], n[e] = n[c], e = c;
    }
    t[e] = r, n[e] = o, this.siftDown_(a, e);
  }
  siftDown_(e, t) {
    const n = this.elements_, s = this.priorities_, r = n[t], o = s[t];
    for (; t > e; ) {
      const a = this.getParentIndex_(t);
      if (s[a] > o)
        n[t] = n[a], s[t] = s[a], t = a;
      else
        break;
    }
    n[t] = r, s[t] = o;
  }
  reprioritize() {
    const e = this.priorityFunction_, t = this.elements_, n = this.priorities_;
    let s = 0;
    const r = t.length;
    let o, a, l;
    for (a = 0; a < r; ++a)
      o = t[a], l = e(o), l == Tt ? delete this.queuedElements_[this.keyFunction_(o)] : (n[s] = l, t[s++] = o);
    t.length = s, n.length = s, this.heapify_();
  }
}
const Rr = Tr, T = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};
class vr extends Rr {
  constructor(e, t) {
    super(
      function(n) {
        return e.apply(null, n);
      },
      function(n) {
        return n[0].getKey();
      }
    ), this.boundHandleTileChange_ = this.handleTileChange.bind(this), this.tileChangeCallback_ = t, this.tilesLoading_ = 0, this.tilesLoadingKeys_ = {};
  }
  enqueue(e) {
    const t = super.enqueue(e);
    return t && e[0].addEventListener(v.CHANGE, this.boundHandleTileChange_), t;
  }
  getTilesLoading() {
    return this.tilesLoading_;
  }
  handleTileChange(e) {
    const t = e.target, n = t.getState();
    if (n === T.LOADED || n === T.ERROR || n === T.EMPTY) {
      n !== T.ERROR && t.removeEventListener(v.CHANGE, this.boundHandleTileChange_);
      const s = t.getKey();
      s in this.tilesLoadingKeys_ && (delete this.tilesLoadingKeys_[s], --this.tilesLoading_), this.tileChangeCallback_();
    }
  }
  loadMoreTiles(e, t) {
    let n = 0, s, r, o;
    for (; this.tilesLoading_ < e && n < t && this.getCount() > 0; )
      r = this.dequeue()[0], o = r.getKey(), s = r.getState(), s === T.IDLE && !(o in this.tilesLoadingKeys_) && (this.tilesLoadingKeys_[o] = !0, ++this.tilesLoading_, ++n, r.load());
  }
}
const xr = vr;
function wr(i, e, t, n, s) {
  if (!i || !(t in i.wantedTiles) || !i.wantedTiles[t][e.getKey()])
    return Tt;
  const r = i.viewState.center, o = n[0] - r[0], a = n[1] - r[1];
  return 65536 * Math.log(s) + Math.sqrt(o * o + a * a) / s;
}
const H = {
  ANIMATING: 0,
  INTERACTING: 1
}, q = {
  CENTER: "center",
  RESOLUTION: "resolution",
  ROTATION: "rotation"
}, Ir = 42, yn = 256, et = {
  radians: 6370997 / (2 * Math.PI),
  degrees: 2 * Math.PI * 6370997 / 360,
  ft: 0.3048,
  m: 1,
  "us-ft": 1200 / 3937
};
class Pr {
  constructor(e) {
    this.code_ = e.code, this.units_ = e.units, this.extent_ = e.extent !== void 0 ? e.extent : null, this.worldExtent_ = e.worldExtent !== void 0 ? e.worldExtent : null, this.axisOrientation_ = e.axisOrientation !== void 0 ? e.axisOrientation : "enu", this.global_ = e.global !== void 0 ? e.global : !1, this.canWrapX_ = !!(this.global_ && this.extent_), this.getPointResolutionFunc_ = e.getPointResolution, this.defaultTileGrid_ = null, this.metersPerUnit_ = e.metersPerUnit;
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
    return this.metersPerUnit_ || et[this.units_];
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
  setGlobal(e) {
    this.global_ = e, this.canWrapX_ = !!(e && this.extent_);
  }
  getDefaultTileGrid() {
    return this.defaultTileGrid_;
  }
  setDefaultTileGrid(e) {
    this.defaultTileGrid_ = e;
  }
  setExtent(e) {
    this.extent_ = e, this.canWrapX_ = !!(this.global_ && e);
  }
  setWorldExtent(e) {
    this.worldExtent_ = e;
  }
  setGetPointResolution(e) {
    this.getPointResolutionFunc_ = e;
  }
  getPointResolutionFunc() {
    return this.getPointResolutionFunc_;
  }
}
const bi = Pr, nt = 6378137, Ge = Math.PI * nt, Lr = [-Ge, -Ge, Ge, Ge], Ar = [-180, -85, 180, 85], ut = nt * Math.log(Math.tan(Math.PI / 2));
class Me extends bi {
  constructor(e) {
    super({
      code: e,
      units: "m",
      extent: Lr,
      global: !0,
      worldExtent: Ar,
      getPointResolution: function(t, n) {
        return t / Math.cosh(n[1] / nt);
      }
    });
  }
}
const Hn = [
  new Me("EPSG:3857"),
  new Me("EPSG:102100"),
  new Me("EPSG:102113"),
  new Me("EPSG:900913"),
  new Me("http://www.opengis.net/def/crs/EPSG/0/3857"),
  new Me("http://www.opengis.net/gml/srs/epsg.xml#3857")
];
function br(i, e, t) {
  const n = i.length;
  t = t > 1 ? t : 2, e === void 0 && (t > 2 ? e = i.slice() : e = new Array(n));
  for (let s = 0; s < n; s += t) {
    e[s] = Ge * i[s] / 180;
    let r = nt * Math.log(Math.tan(Math.PI * (+i[s + 1] + 90) / 360));
    r > ut ? r = ut : r < -ut && (r = -ut), e[s + 1] = r;
  }
  return e;
}
function Mr(i, e, t) {
  const n = i.length;
  t = t > 1 ? t : 2, e === void 0 && (t > 2 ? e = i.slice() : e = new Array(n));
  for (let s = 0; s < n; s += t)
    e[s] = 180 * i[s] / Ge, e[s + 1] = 360 * Math.atan(Math.exp(i[s + 1] / nt)) / Math.PI - 90;
  return e;
}
const Sr = 6378137, $n = [-180, -90, 180, 90], Or = Math.PI * Sr / 180;
class ve extends bi {
  constructor(e, t) {
    super({
      code: e,
      units: "degrees",
      extent: $n,
      axisOrientation: t,
      global: !0,
      metersPerUnit: Or,
      worldExtent: $n
    });
  }
}
const qn = [
  new ve("CRS:84"),
  new ve("EPSG:4326", "neu"),
  new ve("urn:ogc:def:crs:OGC:1.3:CRS84"),
  new ve("urn:ogc:def:crs:OGC:2:84"),
  new ve("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
  new ve("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
  new ve("http://www.opengis.net/def/crs/EPSG/0/4326", "neu")
];
let Jt = {};
function Dr(i) {
  return Jt[i] || Jt[i.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
}
function Fr(i, e) {
  Jt[i] = e;
}
let ke = {};
function Rt(i, e, t) {
  const n = i.getCode(), s = e.getCode();
  n in ke || (ke[n] = {}), ke[n][s] = t;
}
function Nr(i, e) {
  let t;
  return i in ke && e in ke[i] && (t = ke[i][e]), t;
}
const Gr = 63710088e-1;
function Bn(i, e, t) {
  t = t || Gr;
  const n = mt(i[1]), s = mt(e[1]), r = (s - n) / 2, o = mt(e[0] - i[0]) / 2, a = Math.sin(r) * Math.sin(r) + Math.sin(o) * Math.sin(o) * Math.cos(n) * Math.cos(s);
  return 2 * t * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
let en = !0;
function zr(i) {
  en = !(i === void 0 ? !0 : i);
}
function pn(i, e, t) {
  if (e !== void 0) {
    for (let n = 0, s = i.length; n < s; ++n)
      e[n] = i[n];
    e = e;
  } else
    e = i.slice();
  return e;
}
function Mi(i, e, t) {
  if (e !== void 0 && i !== e) {
    for (let n = 0, s = i.length; n < s; ++n)
      e[n] = i[n];
    i = e;
  }
  return i;
}
function Zr(i) {
  Fr(i.getCode(), i), Rt(i, i, pn);
}
function Xr(i) {
  i.forEach(Zr);
}
function B(i) {
  return typeof i == "string" ? Dr(i) : i || null;
}
function Qn(i, e, t, n) {
  i = B(i);
  let s;
  const r = i.getPointResolutionFunc();
  if (r) {
    if (s = r(e, t), n && n !== i.getUnits()) {
      const o = i.getMetersPerUnit();
      o && (s = s * o / et[n]);
    }
  } else {
    const o = i.getUnits();
    if (o == "degrees" && !n || n == "degrees")
      s = e;
    else {
      const a = Cn(
        i,
        B("EPSG:4326")
      );
      if (a === Mi && o !== "degrees")
        s = e * i.getMetersPerUnit();
      else {
        let h = [
          t[0] - e / 2,
          t[1],
          t[0] + e / 2,
          t[1],
          t[0],
          t[1] - e / 2,
          t[0],
          t[1] + e / 2
        ];
        h = a(h, h, 2);
        const c = Bn(h.slice(0, 2), h.slice(2, 4)), u = Bn(h.slice(4, 6), h.slice(6, 8));
        s = (c + u) / 2;
      }
      const l = n ? et[n] : i.getMetersPerUnit();
      l !== void 0 && (s /= l);
    }
  }
  return s;
}
function Jn(i) {
  Xr(i), i.forEach(function(e) {
    i.forEach(function(t) {
      e !== t && Rt(e, t, pn);
    });
  });
}
function Kr(i, e, t, n) {
  i.forEach(function(s) {
    e.forEach(function(r) {
      Rt(s, r, t), Rt(r, s, n);
    });
  });
}
function En(i, e) {
  return i ? typeof i == "string" ? B(i) : i : B(e);
}
function Fe(i, e) {
  if (i === e)
    return !0;
  const t = i.getUnits() === e.getUnits();
  return (i.getCode() === e.getCode() || Cn(i, e) === pn) && t;
}
function Cn(i, e) {
  const t = i.getCode(), n = e.getCode();
  let s = Nr(t, n);
  return s || (s = Mi), s;
}
function vt(i, e) {
  const t = B(i), n = B(e);
  return Cn(t, n);
}
function kr(i, e, t) {
  return vt(e, t)(i, void 0, i.length);
}
function tn(i, e) {
  return i;
}
function ae(i, e) {
  return en && !Et(i, [0, 0]) && i[0] >= -180 && i[0] <= 180 && i[1] >= -90 && i[1] <= 90 && (en = !1, console.warn(
    "Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates."
  )), i;
}
function Ur(i, e) {
  return i;
}
function ze(i, e) {
  return i;
}
function jr() {
  Jn(Hn), Jn(qn), Kr(
    qn,
    Hn,
    br,
    Mr
  );
}
jr();
function ei(i, e, t) {
  return function(n, s, r, o, a) {
    if (!n)
      return;
    if (!s && !e)
      return n;
    const l = e ? 0 : r[0] * s, h = e ? 0 : r[1] * s, c = a ? a[0] : 0, u = a ? a[1] : 0;
    let d = i[0] + l / 2 + c, g = i[2] - l / 2 + c, f = i[1] + h / 2 + u, _ = i[3] - h / 2 + u;
    d > g && (d = (g + d) / 2, g = d), f > _ && (f = (_ + f) / 2, _ = f);
    let p = G(n[0], d, g), C = G(n[1], f, _);
    if (o && t && s) {
      const y = 30 * s;
      p += -y * Math.log(1 + Math.max(0, d - n[0]) / y) + y * Math.log(1 + Math.max(0, n[0] - g) / y), C += -y * Math.log(1 + Math.max(0, f - n[1]) / y) + y * Math.log(1 + Math.max(0, n[1] - _) / y);
    }
    return [p, C];
  };
}
function Yr(i) {
  return i;
}
function Tn(i, e, t, n) {
  const s = N(e) / t[0], r = ne(e) / t[1];
  return n ? Math.min(i, Math.max(s, r)) : Math.min(i, Math.min(s, r));
}
function Rn(i, e, t) {
  let n = Math.min(i, e);
  const s = 50;
  return n *= Math.log(1 + s * Math.max(0, i / e - 1)) / s + 1, t && (n = Math.max(n, t), n /= Math.log(1 + s * Math.max(0, t / i - 1)) / s + 1), G(n, t / 2, e * 2);
}
function Vr(i, e, t, n) {
  return e = e !== void 0 ? e : !0, function(s, r, o, a) {
    if (s !== void 0) {
      const l = i[0], h = i[i.length - 1], c = t ? Tn(
        l,
        t,
        o,
        n
      ) : l;
      if (a)
        return e ? Rn(
          s,
          c,
          h
        ) : G(s, h, c);
      const u = Math.min(c, s), d = Math.floor(an(i, u, r));
      return i[d] > c && d < i.length - 1 ? i[d + 1] : i[d];
    } else
      return;
  };
}
function Wr(i, e, t, n, s, r) {
  return n = n !== void 0 ? n : !0, t = t !== void 0 ? t : 0, function(o, a, l, h) {
    if (o !== void 0) {
      const c = s ? Tn(
        e,
        s,
        l,
        r
      ) : e;
      if (h)
        return n ? Rn(
          o,
          c,
          t
        ) : G(o, t, c);
      const u = 1e-9, d = Math.ceil(
        Math.log(e / c) / Math.log(i) - u
      ), g = -a * (0.5 - u) + 0.5, f = Math.min(c, o), _ = Math.floor(
        Math.log(e / f) / Math.log(i) + g
      ), p = Math.max(d, _), C = e / Math.pow(i, p);
      return G(C, t, c);
    } else
      return;
  };
}
function ti(i, e, t, n, s) {
  return t = t !== void 0 ? t : !0, function(r, o, a, l) {
    if (r !== void 0) {
      const h = n ? Tn(
        i,
        n,
        a,
        s
      ) : i;
      return !t || !l ? G(r, e, h) : Rn(
        r,
        h,
        e
      );
    } else
      return;
  };
}
function vn(i) {
  if (i !== void 0)
    return 0;
}
function ni(i) {
  if (i !== void 0)
    return i;
}
function Hr(i) {
  const e = 2 * Math.PI / i;
  return function(t, n) {
    if (n)
      return t;
    if (t !== void 0)
      return t = Math.floor(t / e + 0.5) * e, t;
  };
}
function $r(i) {
  return i = i || mt(5), function(e, t) {
    if (t)
      return e;
    if (e !== void 0)
      return Math.abs(e) <= i ? 0 : e;
  };
}
function Si(i) {
  return Math.pow(i, 3);
}
function je(i) {
  return 1 - Si(1 - i);
}
function qr(i) {
  return 3 * i * i - 2 * i * i * i;
}
function Br(i) {
  return i;
}
function Qr(i, e, t, n, s, r) {
  r = r || [];
  let o = 0;
  for (let a = e; a < t; a += n) {
    const l = i[a], h = i[a + 1];
    r[o++] = s[0] * l + s[2] * h + s[4], r[o++] = s[1] * l + s[3] * h + s[5];
  }
  return r && r.length != o && (r.length = o), r;
}
function Jr(i, e, t, n, s, r, o) {
  o = o || [];
  const a = Math.cos(s), l = Math.sin(s), h = r[0], c = r[1];
  let u = 0;
  for (let d = e; d < t; d += n) {
    const g = i[d] - h, f = i[d + 1] - c;
    o[u++] = h + g * a - f * l, o[u++] = c + g * l + f * a;
    for (let _ = d + 2; _ < d + n; ++_)
      o[u++] = i[_];
  }
  return o && o.length != u && (o.length = u), o;
}
function eo(i, e, t, n, s, r, o, a) {
  a = a || [];
  const l = o[0], h = o[1];
  let c = 0;
  for (let u = e; u < t; u += n) {
    const d = i[u] - l, g = i[u + 1] - h;
    a[c++] = l + s * d, a[c++] = h + r * g;
    for (let f = u + 2; f < u + n; ++f)
      a[c++] = i[f];
  }
  return a && a.length != c && (a.length = c), a;
}
function to(i, e, t, n, s, r, o) {
  o = o || [];
  let a = 0;
  for (let l = e; l < t; l += n) {
    o[a++] = i[l] + s, o[a++] = i[l + 1] + r;
    for (let h = l + 2; h < l + n; ++h)
      o[a++] = i[h];
  }
  return o && o.length != a && (o.length = a), o;
}
const ii = Ze();
class no extends ce {
  constructor() {
    super(), this.extent_ = Ie(), this.extentRevision_ = -1, this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = 0, this.simplifyTransformedInternal = Es(function(e, t, n) {
      if (!n)
        return this.getSimplifiedGeometry(t);
      const s = this.clone();
      return s.applyTransform(n), s.getSimplifiedGeometry(t);
    });
  }
  simplifyTransformed(e, t) {
    return this.simplifyTransformedInternal(
      this.getRevision(),
      e,
      t
    );
  }
  clone() {
    return M();
  }
  closestPointXY(e, t, n, s) {
    return M();
  }
  containsXY(e, t) {
    const n = this.getClosestPoint([e, t]);
    return n[0] === e && n[1] === t;
  }
  getClosestPoint(e, t) {
    return t = t || [NaN, NaN], this.closestPointXY(e[0], e[1], t, 1 / 0), t;
  }
  intersectsCoordinate(e) {
    return this.containsXY(e[0], e[1]);
  }
  computeExtent(e) {
    return M();
  }
  getExtent(e) {
    if (this.extentRevision_ != this.getRevision()) {
      const t = this.computeExtent(this.extent_);
      (isNaN(t[0]) || isNaN(t[1])) && At(t), this.extentRevision_ = this.getRevision();
    }
    return ks(this.extent_, e);
  }
  rotate(e, t) {
    M();
  }
  scale(e, t, n) {
    M();
  }
  simplify(e) {
    return this.getSimplifiedGeometry(e * e);
  }
  getSimplifiedGeometry(e) {
    return M();
  }
  getType() {
    return M();
  }
  applyTransform(e) {
    M();
  }
  intersectsExtent(e) {
    return M();
  }
  translate(e, t) {
    M();
  }
  transform(e, t) {
    const n = B(e), s = n.getUnits() == "tile-pixels" ? function(r, o, a) {
      const l = n.getExtent(), h = n.getWorldExtent(), c = ne(h) / ne(l);
      return Qe(
        ii,
        h[0],
        h[3],
        c,
        -c,
        0,
        0,
        0
      ), Qr(
        r,
        0,
        r.length,
        a,
        ii,
        o
      ), vt(n, t)(
        r,
        o,
        a
      );
    } : vt(n, t);
    return this.applyTransform(s), this;
  }
}
const io = no;
class so extends io {
  constructor() {
    super(), this.layout = "XY", this.stride = 2, this.flatCoordinates = null;
  }
  computeExtent(e) {
    return zs(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      e
    );
  }
  getCoordinates() {
    return M();
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
  getSimplifiedGeometry(e) {
    if (this.simplifiedGeometryRevision !== this.getRevision() && (this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = this.getRevision()), e < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && e <= this.simplifiedGeometryMaxMinSquaredTolerance)
      return this;
    const t = this.getSimplifiedGeometryInternal(e);
    return t.getFlatCoordinates().length < this.flatCoordinates.length ? t : (this.simplifiedGeometryMaxMinSquaredTolerance = e, this);
  }
  getSimplifiedGeometryInternal(e) {
    return this;
  }
  getStride() {
    return this.stride;
  }
  setFlatCoordinates(e, t) {
    this.stride = si(e), this.layout = e, this.flatCoordinates = t;
  }
  setCoordinates(e, t) {
    M();
  }
  setLayout(e, t, n) {
    let s;
    if (e)
      s = si(e);
    else {
      for (let r = 0; r < n; ++r)
        if (t.length === 0) {
          this.layout = "XY", this.stride = 2;
          return;
        } else
          t = t[0];
      s = t.length, e = ro(s);
    }
    this.layout = e, this.stride = s;
  }
  applyTransform(e) {
    this.flatCoordinates && (e(this.flatCoordinates, this.flatCoordinates, this.stride), this.changed());
  }
  rotate(e, t) {
    const n = this.getFlatCoordinates();
    if (n) {
      const s = this.getStride();
      Jr(
        n,
        0,
        n.length,
        s,
        e,
        t,
        n
      ), this.changed();
    }
  }
  scale(e, t, n) {
    t === void 0 && (t = e), n || (n = Je(this.getExtent()));
    const s = this.getFlatCoordinates();
    if (s) {
      const r = this.getStride();
      eo(
        s,
        0,
        s.length,
        r,
        e,
        t,
        n,
        s
      ), this.changed();
    }
  }
  translate(e, t) {
    const n = this.getFlatCoordinates();
    if (n) {
      const s = this.getStride();
      to(
        n,
        0,
        n.length,
        s,
        e,
        t,
        n
      ), this.changed();
    }
  }
}
function ro(i) {
  let e;
  return i == 2 ? e = "XY" : i == 3 ? e = "XYZ" : i == 4 && (e = "XYZM"), e;
}
function si(i) {
  let e;
  return i == "XY" ? e = 2 : i == "XYZ" || i == "XYM" ? e = 3 : i == "XYZM" && (e = 4), e;
}
const xn = so;
function ri(i, e, t, n, s, r, o) {
  const a = i[e], l = i[e + 1], h = i[t] - a, c = i[t + 1] - l;
  let u;
  if (h === 0 && c === 0)
    u = e;
  else {
    const d = ((s - a) * h + (r - l) * c) / (h * h + c * c);
    if (d > 1)
      u = t;
    else if (d > 0) {
      for (let g = 0; g < n; ++g)
        o[g] = Vs(
          i[e + g],
          i[t + g],
          d
        );
      o.length = n;
      return;
    } else
      u = e;
  }
  for (let d = 0; d < n; ++d)
    o[d] = i[u + d];
  o.length = n;
}
function Oi(i, e, t, n, s) {
  let r = i[e], o = i[e + 1];
  for (e += n; e < t; e += n) {
    const a = i[e], l = i[e + 1], h = Xe(r, o, a, l);
    h > s && (s = h), r = a, o = l;
  }
  return s;
}
function oo(i, e, t, n, s) {
  for (let r = 0, o = t.length; r < o; ++r) {
    const a = t[r];
    s = Oi(i, e, a, n, s), e = a;
  }
  return s;
}
function Di(i, e, t, n, s, r, o, a, l, h, c) {
  if (e == t)
    return h;
  let u, d;
  if (s === 0)
    if (d = Xe(
      o,
      a,
      i[e],
      i[e + 1]
    ), d < h) {
      for (u = 0; u < n; ++u)
        l[u] = i[e + u];
      return l.length = n, d;
    } else
      return h;
  c = c || [NaN, NaN];
  let g = e + n;
  for (; g < t; )
    if (ri(
      i,
      g - n,
      g,
      n,
      o,
      a,
      c
    ), d = Xe(o, a, c[0], c[1]), d < h) {
      for (h = d, u = 0; u < n; ++u)
        l[u] = c[u];
      l.length = n, g += n;
    } else
      g += n * Math.max(
        (Math.sqrt(d) - Math.sqrt(h)) / s | 0,
        1
      );
  if (r && (ri(
    i,
    t - n,
    e,
    n,
    o,
    a,
    c
  ), d = Xe(o, a, c[0], c[1]), d < h)) {
    for (h = d, u = 0; u < n; ++u)
      l[u] = c[u];
    l.length = n;
  }
  return h;
}
function ao(i, e, t, n, s, r, o, a, l, h, c) {
  c = c || [NaN, NaN];
  for (let u = 0, d = t.length; u < d; ++u) {
    const g = t[u];
    h = Di(
      i,
      e,
      g,
      n,
      s,
      r,
      o,
      a,
      l,
      h,
      c
    ), e = g;
  }
  return h;
}
function lo(i, e, t, n) {
  for (let s = 0, r = t.length; s < r; ++s)
    i[e++] = t[s];
  return e;
}
function Fi(i, e, t, n) {
  for (let s = 0, r = t.length; s < r; ++s) {
    const o = t[s];
    for (let a = 0; a < n; ++a)
      i[e++] = o[a];
  }
  return e;
}
function ho(i, e, t, n, s) {
  s = s || [];
  let r = 0;
  for (let o = 0, a = t.length; o < a; ++o) {
    const l = Fi(
      i,
      e,
      t[o],
      n
    );
    s[r++] = l, e = l;
  }
  return s.length = r, s;
}
function co(i, e, t, n, s, r, o) {
  const a = (t - e) / n;
  if (a < 3) {
    for (; e < t; e += n)
      r[o++] = i[e], r[o++] = i[e + 1];
    return o;
  }
  const l = new Array(a);
  l[0] = 1, l[a - 1] = 1;
  const h = [e, t - n];
  let c = 0;
  for (; h.length > 0; ) {
    const u = h.pop(), d = h.pop();
    let g = 0;
    const f = i[d], _ = i[d + 1], p = i[u], C = i[u + 1];
    for (let y = d + n; y < u; y += n) {
      const E = i[y], m = i[y + 1], R = js(E, m, f, _, p, C);
      R > g && (c = y, g = R);
    }
    g > s && (l[(c - e) / n] = 1, d + n < c && h.push(d, c), c + n < u && h.push(c, u));
  }
  for (let u = 0; u < a; ++u)
    l[u] && (r[o++] = i[e + u * n], r[o++] = i[e + u * n + 1]);
  return o;
}
function Se(i, e) {
  return e * Math.round(i / e);
}
function uo(i, e, t, n, s, r, o) {
  if (e == t)
    return o;
  let a = Se(i[e], s), l = Se(i[e + 1], s);
  e += n, r[o++] = a, r[o++] = l;
  let h, c;
  do
    if (h = Se(i[e], s), c = Se(i[e + 1], s), e += n, e == t)
      return r[o++] = h, r[o++] = c, o;
  while (h == a && c == l);
  for (; e < t; ) {
    const u = Se(i[e], s), d = Se(i[e + 1], s);
    if (e += n, u == h && d == c)
      continue;
    const g = h - a, f = c - l, _ = u - a, p = d - l;
    if (g * p == f * _ && (g < 0 && _ < g || g == _ || g > 0 && _ > g) && (f < 0 && p < f || f == p || f > 0 && p > f)) {
      h = u, c = d;
      continue;
    }
    r[o++] = h, r[o++] = c, a = h, l = c, h = u, c = d;
  }
  return r[o++] = h, r[o++] = c, o;
}
function go(i, e, t, n, s, r, o, a) {
  for (let l = 0, h = t.length; l < h; ++l) {
    const c = t[l];
    o = uo(
      i,
      e,
      c,
      n,
      s,
      r,
      o
    ), a.push(o), e = c;
  }
  return o;
}
function Ni(i, e, t, n, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = e; o < t; o += n)
    s[r++] = i.slice(o, o + n);
  return s.length = r, s;
}
function fo(i, e, t, n, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = 0, a = t.length; o < a; ++o) {
    const l = t[o];
    s[r++] = Ni(
      i,
      e,
      l,
      n,
      s[r]
    ), e = l;
  }
  return s.length = r, s;
}
function Gi(i, e, t, n) {
  let s = 0, r = i[t - n], o = i[t - n + 1];
  for (; e < t; e += n) {
    const a = i[e], l = i[e + 1];
    s += o * a - r * l, r = a, o = l;
  }
  return s / 2;
}
function _o(i, e, t, n) {
  let s = 0;
  for (let r = 0, o = t.length; r < o; ++r) {
    const a = t[r];
    s += Gi(i, e, a, n), e = a;
  }
  return s;
}
class xt extends xn {
  constructor(e, t) {
    super(), this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, t !== void 0 && !Array.isArray(e[0]) ? this.setFlatCoordinates(
      t,
      e
    ) : this.setCoordinates(
      e,
      t
    );
  }
  clone() {
    return new xt(this.flatCoordinates.slice(), this.layout);
  }
  closestPointXY(e, t, n, s) {
    return s < Ri(this.getExtent(), e, t) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      Oi(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), Di(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      this.maxDelta_,
      !0,
      e,
      t,
      n,
      s
    ));
  }
  getArea() {
    return Gi(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  getCoordinates() {
    return Ni(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  getSimplifiedGeometryInternal(e) {
    const t = [];
    return t.length = co(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      e,
      t,
      0
    ), new xt(t, "XY");
  }
  getType() {
    return "LinearRing";
  }
  intersectsExtent(e) {
    return !1;
  }
  setCoordinates(e, t) {
    this.setLayout(t, e, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Fi(
      this.flatCoordinates,
      0,
      e,
      this.stride
    ), this.changed();
  }
}
const oi = xt;
class wn extends xn {
  constructor(e, t) {
    super(), this.setCoordinates(e, t);
  }
  clone() {
    const e = new wn(this.flatCoordinates.slice(), this.layout);
    return e.applyProperties(this), e;
  }
  closestPointXY(e, t, n, s) {
    const r = this.flatCoordinates, o = Xe(
      e,
      t,
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
  computeExtent(e) {
    return Gs(this.flatCoordinates, e);
  }
  getType() {
    return "Point";
  }
  intersectsExtent(e) {
    return vi(e, this.flatCoordinates[0], this.flatCoordinates[1]);
  }
  setCoordinates(e, t) {
    this.setLayout(t, e, 0), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = lo(
      this.flatCoordinates,
      0,
      e,
      this.stride
    ), this.changed();
  }
}
const mo = wn;
function yo(i, e, t, n, s) {
  return !wi(
    s,
    function(o) {
      return !we(
        i,
        e,
        t,
        n,
        o[0],
        o[1]
      );
    }
  );
}
function we(i, e, t, n, s, r) {
  let o = 0, a = i[t - n], l = i[t - n + 1];
  for (; e < t; e += n) {
    const h = i[e], c = i[e + 1];
    l <= r ? c > r && (h - a) * (r - l) - (s - a) * (c - l) > 0 && o++ : c <= r && (h - a) * (r - l) - (s - a) * (c - l) < 0 && o--, a = h, l = c;
  }
  return o !== 0;
}
function zi(i, e, t, n, s, r) {
  if (t.length === 0 || !we(i, e, t[0], n, s, r))
    return !1;
  for (let o = 1, a = t.length; o < a; ++o)
    if (we(i, t[o - 1], t[o], n, s, r))
      return !1;
  return !0;
}
function po(i, e, t, n, s, r, o) {
  let a, l, h, c, u, d, g;
  const f = s[r + 1], _ = [];
  for (let y = 0, E = t.length; y < E; ++y) {
    const m = t[y];
    for (c = i[m - n], d = i[m - n + 1], a = e; a < m; a += n)
      u = i[a], g = i[a + 1], (f <= d && g <= f || d <= f && f <= g) && (h = (f - d) / (g - d) * (u - c) + c, _.push(h)), c = u, d = g;
  }
  let p = NaN, C = -1 / 0;
  for (_.sort(on), c = _[0], a = 1, l = _.length; a < l; ++a) {
    u = _[a];
    const y = Math.abs(u - c);
    y > C && (h = (c + u) / 2, zi(i, e, t, n, h, f) && (p = h, C = y)), c = u;
  }
  return isNaN(p) && (p = s[r]), o ? (o.push(p, f, C), o) : [p, f, C];
}
function Eo(i, e, t, n, s) {
  let r;
  for (e += n; e < t; e += n)
    if (r = s(
      i.slice(e - n, e),
      i.slice(e, e + n)
    ), r)
      return r;
  return !1;
}
function Zi(i, e, t, n, s) {
  const r = xi(
    Ie(),
    i,
    e,
    t,
    n
  );
  return Ot(s, r) ? Ns(s, r) || r[0] >= s[0] && r[2] <= s[2] || r[1] >= s[1] && r[3] <= s[3] ? !0 : Eo(
    i,
    e,
    t,
    n,
    function(o, a) {
      return Us(s, o, a);
    }
  ) : !1;
}
function Xi(i, e, t, n, s) {
  return !!(Zi(i, e, t, n, s) || we(
    i,
    e,
    t,
    n,
    s[0],
    s[1]
  ) || we(
    i,
    e,
    t,
    n,
    s[0],
    s[3]
  ) || we(
    i,
    e,
    t,
    n,
    s[2],
    s[1]
  ) || we(
    i,
    e,
    t,
    n,
    s[2],
    s[3]
  ));
}
function Co(i, e, t, n, s) {
  if (!Xi(i, e, t[0], n, s))
    return !1;
  if (t.length === 1)
    return !0;
  for (let r = 1, o = t.length; r < o; ++r)
    if (yo(
      i,
      t[r - 1],
      t[r],
      n,
      s
    ) && !Zi(
      i,
      t[r - 1],
      t[r],
      n,
      s
    ))
      return !1;
  return !0;
}
function To(i, e, t, n) {
  for (; e < t - n; ) {
    for (let s = 0; s < n; ++s) {
      const r = i[e + s];
      i[e + s] = i[t - n + s], i[t - n + s] = r;
    }
    e += n, t -= n;
  }
}
function Ki(i, e, t, n) {
  let s = 0, r = i[t - n], o = i[t - n + 1];
  for (; e < t; e += n) {
    const a = i[e], l = i[e + 1];
    s += (a - r) * (l + o), r = a, o = l;
  }
  return s === 0 ? void 0 : s > 0;
}
function Ro(i, e, t, n, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = t.length; r < o; ++r) {
    const a = t[r], l = Ki(
      i,
      e,
      a,
      n
    );
    if (r === 0) {
      if (s && l || !s && !l)
        return !1;
    } else if (s && !l || !s && l)
      return !1;
    e = a;
  }
  return !0;
}
function ai(i, e, t, n, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = t.length; r < o; ++r) {
    const a = t[r], l = Ki(
      i,
      e,
      a,
      n
    );
    (r === 0 ? s && l || !s && !l : s && !l || !s && l) && To(i, e, a, n), e = a;
  }
  return e;
}
class tt extends xn {
  constructor(e, t, n) {
    super(), this.ends_ = [], this.flatInteriorPointRevision_ = -1, this.flatInteriorPoint_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, t !== void 0 && n ? (this.setFlatCoordinates(
      t,
      e
    ), this.ends_ = n) : this.setCoordinates(
      e,
      t
    );
  }
  appendLinearRing(e) {
    this.flatCoordinates ? ys(this.flatCoordinates, e.getFlatCoordinates()) : this.flatCoordinates = e.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed();
  }
  clone() {
    const e = new tt(
      this.flatCoordinates.slice(),
      this.layout,
      this.ends_.slice()
    );
    return e.applyProperties(this), e;
  }
  closestPointXY(e, t, n, s) {
    return s < Ri(this.getExtent(), e, t) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      oo(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), ao(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      this.maxDelta_,
      !0,
      e,
      t,
      n,
      s
    ));
  }
  containsXY(e, t) {
    return zi(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      e,
      t
    );
  }
  getArea() {
    return _o(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride
    );
  }
  getCoordinates(e) {
    let t;
    return e !== void 0 ? (t = this.getOrientedFlatCoordinates().slice(), ai(t, 0, this.ends_, this.stride, e)) : t = this.flatCoordinates, fo(t, 0, this.ends_, this.stride);
  }
  getEnds() {
    return this.ends_;
  }
  getFlatInteriorPoint() {
    if (this.flatInteriorPointRevision_ != this.getRevision()) {
      const e = Je(this.getExtent());
      this.flatInteriorPoint_ = po(
        this.getOrientedFlatCoordinates(),
        0,
        this.ends_,
        this.stride,
        e,
        0
      ), this.flatInteriorPointRevision_ = this.getRevision();
    }
    return this.flatInteriorPoint_;
  }
  getInteriorPoint() {
    return new mo(this.getFlatInteriorPoint(), "XYM");
  }
  getLinearRingCount() {
    return this.ends_.length;
  }
  getLinearRing(e) {
    return e < 0 || this.ends_.length <= e ? null : new oi(
      this.flatCoordinates.slice(
        e === 0 ? 0 : this.ends_[e - 1],
        this.ends_[e]
      ),
      this.layout
    );
  }
  getLinearRings() {
    const e = this.layout, t = this.flatCoordinates, n = this.ends_, s = [];
    let r = 0;
    for (let o = 0, a = n.length; o < a; ++o) {
      const l = n[o], h = new oi(
        t.slice(r, l),
        e
      );
      s.push(h), r = l;
    }
    return s;
  }
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const e = this.flatCoordinates;
      Ro(e, 0, this.ends_, this.stride) ? this.orientedFlatCoordinates_ = e : (this.orientedFlatCoordinates_ = e.slice(), this.orientedFlatCoordinates_.length = ai(
        this.orientedFlatCoordinates_,
        0,
        this.ends_,
        this.stride
      )), this.orientedRevision_ = this.getRevision();
    }
    return this.orientedFlatCoordinates_;
  }
  getSimplifiedGeometryInternal(e) {
    const t = [], n = [];
    return t.length = go(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      Math.sqrt(e),
      t,
      0,
      n
    ), new tt(t, "XY", n);
  }
  getType() {
    return "Polygon";
  }
  intersectsExtent(e) {
    return Co(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      e
    );
  }
  setCoordinates(e, t) {
    this.setLayout(t, e, 2), this.flatCoordinates || (this.flatCoordinates = []);
    const n = ho(
      this.flatCoordinates,
      0,
      e,
      this.stride,
      this.ends_
    );
    this.flatCoordinates.length = n.length === 0 ? 0 : n[n.length - 1], this.changed();
  }
}
function li(i) {
  const e = i[0], t = i[1], n = i[2], s = i[3], r = [
    e,
    t,
    e,
    s,
    n,
    s,
    n,
    t,
    e,
    t
  ];
  return new tt(r, "XY", [r.length]);
}
const Xt = 0;
class vo extends ce {
  constructor(e) {
    super(), this.on, this.once, this.un, e = Object.assign({}, e), this.hints_ = [0, 0], this.animations_ = [], this.updateAnimationKey_, this.projection_ = En(e.projection, "EPSG:3857"), this.viewportSize_ = [100, 100], this.targetCenter_ = null, this.targetResolution_, this.targetRotation_, this.nextCenter_ = null, this.nextResolution_, this.nextRotation_, this.cancelAnchor_ = void 0, e.projection && zr(), e.center && (e.center = ae(e.center, this.projection_)), e.extent && (e.extent = ze(e.extent, this.projection_)), this.applyOptions_(e);
  }
  applyOptions_(e) {
    const t = Object.assign({}, e);
    for (const a in q)
      delete t[a];
    this.setProperties(t, !0);
    const n = wo(e);
    this.maxResolution_ = n.maxResolution, this.minResolution_ = n.minResolution, this.zoomFactor_ = n.zoomFactor, this.resolutions_ = e.resolutions, this.padding_ = e.padding, this.minZoom_ = n.minZoom;
    const s = xo(e), r = n.constraint, o = Io(e);
    this.constraints_ = {
      center: s,
      resolution: r,
      rotation: o
    }, this.setRotation(e.rotation !== void 0 ? e.rotation : 0), this.setCenterInternal(
      e.center !== void 0 ? e.center : null
    ), e.resolution !== void 0 ? this.setResolution(e.resolution) : e.zoom !== void 0 && this.setZoom(e.zoom);
  }
  get padding() {
    return this.padding_;
  }
  set padding(e) {
    let t = this.padding_;
    this.padding_ = e;
    const n = this.getCenter();
    if (n) {
      const s = e || [0, 0, 0, 0];
      t = t || [0, 0, 0, 0];
      const r = this.getResolution(), o = r / 2 * (s[3] - t[3] + t[1] - s[1]), a = r / 2 * (s[0] - t[0] + t[2] - s[2]);
      this.setCenterInternal([n[0] + o, n[1] - a]);
    }
  }
  getUpdatedOptions_(e) {
    const t = this.getProperties();
    return t.resolution !== void 0 ? t.resolution = this.getResolution() : t.zoom = this.getZoom(), t.center = this.getCenterInternal(), t.rotation = this.getRotation(), Object.assign({}, t, e);
  }
  animate(e) {
    this.isDef() && !this.getAnimating() && this.resolveConstraints(0);
    const t = new Array(arguments.length);
    for (let n = 0; n < t.length; ++n) {
      let s = arguments[n];
      s.center && (s = Object.assign({}, s), s.center = ae(
        s.center,
        this.getProjection()
      )), s.anchor && (s = Object.assign({}, s), s.anchor = ae(
        s.anchor,
        this.getProjection()
      )), t[n] = s;
    }
    this.animateInternal.apply(this, t);
  }
  animateInternal(e) {
    let t = arguments.length, n;
    t > 1 && typeof arguments[t - 1] == "function" && (n = arguments[t - 1], --t);
    let s = 0;
    for (; s < t && !this.isDef(); ++s) {
      const c = arguments[s];
      c.center && this.setCenterInternal(c.center), c.zoom !== void 0 ? this.setZoom(c.zoom) : c.resolution && this.setResolution(c.resolution), c.rotation !== void 0 && this.setRotation(c.rotation);
    }
    if (s === t) {
      n && dt(n, !0);
      return;
    }
    let r = Date.now(), o = this.targetCenter_.slice(), a = this.targetResolution_, l = this.targetRotation_;
    const h = [];
    for (; s < t; ++s) {
      const c = arguments[s], u = {
        start: r,
        complete: !1,
        anchor: c.anchor,
        duration: c.duration !== void 0 ? c.duration : 1e3,
        easing: c.easing || qr,
        callback: n
      };
      if (c.center && (u.sourceCenter = o, u.targetCenter = c.center.slice(), o = u.targetCenter), c.zoom !== void 0 ? (u.sourceResolution = a, u.targetResolution = this.getResolutionForZoom(c.zoom), a = u.targetResolution) : c.resolution && (u.sourceResolution = a, u.targetResolution = c.resolution, a = u.targetResolution), c.rotation !== void 0) {
        u.sourceRotation = l;
        const d = Ke(c.rotation - l + Math.PI, 2 * Math.PI) - Math.PI;
        u.targetRotation = l + d, l = u.targetRotation;
      }
      Po(u) ? u.complete = !0 : r += u.duration, h.push(u);
    }
    this.animations_.push(h), this.setHint(H.ANIMATING, 1), this.updateAnimations_();
  }
  getAnimating() {
    return this.hints_[H.ANIMATING] > 0;
  }
  getInteracting() {
    return this.hints_[H.INTERACTING] > 0;
  }
  cancelAnimations() {
    this.setHint(H.ANIMATING, -this.hints_[H.ANIMATING]);
    let e;
    for (let t = 0, n = this.animations_.length; t < n; ++t) {
      const s = this.animations_[t];
      if (s[0].callback && dt(s[0].callback, !1), !e)
        for (let r = 0, o = s.length; r < o; ++r) {
          const a = s[r];
          if (!a.complete) {
            e = a.anchor;
            break;
          }
        }
    }
    this.animations_.length = 0, this.cancelAnchor_ = e, this.nextCenter_ = null, this.nextResolution_ = NaN, this.nextRotation_ = NaN;
  }
  updateAnimations_() {
    if (this.updateAnimationKey_ !== void 0 && (cancelAnimationFrame(this.updateAnimationKey_), this.updateAnimationKey_ = void 0), !this.getAnimating())
      return;
    const e = Date.now();
    let t = !1;
    for (let n = this.animations_.length - 1; n >= 0; --n) {
      const s = this.animations_[n];
      let r = !0;
      for (let o = 0, a = s.length; o < a; ++o) {
        const l = s[o];
        if (l.complete)
          continue;
        const h = e - l.start;
        let c = l.duration > 0 ? h / l.duration : 1;
        c >= 1 ? (l.complete = !0, c = 1) : r = !1;
        const u = l.easing(c);
        if (l.sourceCenter) {
          const d = l.sourceCenter[0], g = l.sourceCenter[1], f = l.targetCenter[0], _ = l.targetCenter[1];
          this.nextCenter_ = l.targetCenter;
          const p = d + u * (f - d), C = g + u * (_ - g);
          this.targetCenter_ = [p, C];
        }
        if (l.sourceResolution && l.targetResolution) {
          const d = u === 1 ? l.targetResolution : l.sourceResolution + u * (l.targetResolution - l.sourceResolution);
          if (l.anchor) {
            const g = this.getViewportSize_(this.getRotation()), f = this.constraints_.resolution(
              d,
              0,
              g,
              !0
            );
            this.targetCenter_ = this.calculateCenterZoom(
              f,
              l.anchor
            );
          }
          this.nextResolution_ = l.targetResolution, this.targetResolution_ = d, this.applyTargetState_(!0);
        }
        if (l.sourceRotation !== void 0 && l.targetRotation !== void 0) {
          const d = u === 1 ? Ke(l.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : l.sourceRotation + u * (l.targetRotation - l.sourceRotation);
          if (l.anchor) {
            const g = this.constraints_.rotation(
              d,
              !0
            );
            this.targetCenter_ = this.calculateCenterRotate(
              g,
              l.anchor
            );
          }
          this.nextRotation_ = l.targetRotation, this.targetRotation_ = d;
        }
        if (this.applyTargetState_(!0), t = !0, !l.complete)
          break;
      }
      if (r) {
        this.animations_[n] = null, this.setHint(H.ANIMATING, -1), this.nextCenter_ = null, this.nextResolution_ = NaN, this.nextRotation_ = NaN;
        const o = s[0].callback;
        o && dt(o, !0);
      }
    }
    this.animations_ = this.animations_.filter(Boolean), t && this.updateAnimationKey_ === void 0 && (this.updateAnimationKey_ = requestAnimationFrame(
      this.updateAnimations_.bind(this)
    ));
  }
  calculateCenterRotate(e, t) {
    let n;
    const s = this.getCenterInternal();
    return s !== void 0 && (n = [s[0] - t[0], s[1] - t[1]], fn(n, e - this.getRotation()), ir(n, t)), n;
  }
  calculateCenterZoom(e, t) {
    let n;
    const s = this.getCenterInternal(), r = this.getResolution();
    if (s !== void 0 && r !== void 0) {
      const o = t[0] - e * (t[0] - s[0]) / r, a = t[1] - e * (t[1] - s[1]) / r;
      n = [o, a];
    }
    return n;
  }
  getViewportSize_(e) {
    const t = this.viewportSize_;
    if (e) {
      const n = t[0], s = t[1];
      return [
        Math.abs(n * Math.cos(e)) + Math.abs(s * Math.sin(e)),
        Math.abs(n * Math.sin(e)) + Math.abs(s * Math.cos(e))
      ];
    } else
      return t;
  }
  setViewportSize(e) {
    this.viewportSize_ = Array.isArray(e) ? e.slice() : [100, 100], this.getAnimating() || this.resolveConstraints(0);
  }
  getCenter() {
    const e = this.getCenterInternal();
    return e && tn(e, this.getProjection());
  }
  getCenterInternal() {
    return this.get(q.CENTER);
  }
  getConstraints() {
    return this.constraints_;
  }
  getConstrainResolution() {
    return this.get("constrainResolution");
  }
  getHints(e) {
    return e !== void 0 ? (e[0] = this.hints_[0], e[1] = this.hints_[1], e) : this.hints_.slice();
  }
  calculateExtent(e) {
    const t = this.calculateExtentInternal(e);
    return Ur(t, this.getProjection());
  }
  calculateExtentInternal(e) {
    e = e || this.getViewportSizeMinusPadding_();
    const t = this.getCenterInternal();
    A(t, 1);
    const n = this.getResolution();
    A(n !== void 0, 2);
    const s = this.getRotation();
    return A(s !== void 0, 3), $t(t, n, s, e);
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
  setMaxZoom(e) {
    this.applyOptions_(this.getUpdatedOptions_({ maxZoom: e }));
  }
  getMinZoom() {
    return this.getZoomForResolution(this.maxResolution_);
  }
  setMinZoom(e) {
    this.applyOptions_(this.getUpdatedOptions_({ minZoom: e }));
  }
  setConstrainResolution(e) {
    this.applyOptions_(this.getUpdatedOptions_({ constrainResolution: e }));
  }
  getProjection() {
    return this.projection_;
  }
  getResolution() {
    return this.get(q.RESOLUTION);
  }
  getResolutions() {
    return this.resolutions_;
  }
  getResolutionForExtent(e, t) {
    return this.getResolutionForExtentInternal(
      ze(e, this.getProjection()),
      t
    );
  }
  getResolutionForExtentInternal(e, t) {
    t = t || this.getViewportSizeMinusPadding_();
    const n = N(e) / t[0], s = ne(e) / t[1];
    return Math.max(n, s);
  }
  getResolutionForValueFunction(e) {
    e = e || 2;
    const t = this.getConstrainedResolution(this.maxResolution_), n = this.minResolution_, s = Math.log(t / n) / Math.log(e);
    return function(r) {
      return t / Math.pow(e, r * s);
    };
  }
  getRotation() {
    return this.get(q.ROTATION);
  }
  getValueForResolutionFunction(e) {
    const t = Math.log(e || 2), n = this.getConstrainedResolution(this.maxResolution_), s = this.minResolution_, r = Math.log(n / s) / t;
    return function(o) {
      return Math.log(n / o) / t / r;
    };
  }
  getViewportSizeMinusPadding_(e) {
    let t = this.getViewportSize_(e);
    const n = this.padding_;
    return n && (t = [
      t[0] - n[1] - n[3],
      t[1] - n[0] - n[2]
    ]), t;
  }
  getState() {
    const e = this.getProjection(), t = this.getResolution(), n = this.getRotation();
    let s = this.getCenterInternal();
    const r = this.padding_;
    if (r) {
      const o = this.getViewportSizeMinusPadding_();
      s = Kt(
        s,
        this.getViewportSize_(),
        [o[0] / 2 + r[3], o[1] / 2 + r[0]],
        t,
        n
      );
    }
    return {
      center: s.slice(0),
      projection: e !== void 0 ? e : null,
      resolution: t,
      nextCenter: this.nextCenter_,
      nextResolution: this.nextResolution_,
      nextRotation: this.nextRotation_,
      rotation: n,
      zoom: this.getZoom()
    };
  }
  getZoom() {
    let e;
    const t = this.getResolution();
    return t !== void 0 && (e = this.getZoomForResolution(t)), e;
  }
  getZoomForResolution(e) {
    let t = this.minZoom_ || 0, n, s;
    if (this.resolutions_) {
      const r = an(this.resolutions_, e, 1);
      t = r, n = this.resolutions_[r], r == this.resolutions_.length - 1 ? s = 2 : s = n / this.resolutions_[r + 1];
    } else
      n = this.maxResolution_, s = this.zoomFactor_;
    return t + Math.log(n / e) / Math.log(s);
  }
  getResolutionForZoom(e) {
    if (this.resolutions_) {
      if (this.resolutions_.length <= 1)
        return 0;
      const t = G(
        Math.floor(e),
        0,
        this.resolutions_.length - 2
      ), n = this.resolutions_[t] / this.resolutions_[t + 1];
      return this.resolutions_[t] / Math.pow(n, G(e - t, 0, 1));
    } else
      return this.maxResolution_ / Math.pow(this.zoomFactor_, e - this.minZoom_);
  }
  fit(e, t) {
    let n;
    if (A(
      Array.isArray(e) || typeof e.getSimplifiedGeometry == "function",
      24
    ), Array.isArray(e)) {
      A(!un(e), 25);
      const s = ze(e, this.getProjection());
      n = li(s);
    } else if (e.getType() === "Circle") {
      const s = ze(
        e.getExtent(),
        this.getProjection()
      );
      n = li(s), n.rotate(this.getRotation(), Je(s));
    } else
      n = e;
    this.fitInternal(n, t);
  }
  rotatedExtentForGeometry(e) {
    const t = this.getRotation(), n = Math.cos(t), s = Math.sin(-t), r = e.getFlatCoordinates(), o = e.getStride();
    let a = 1 / 0, l = 1 / 0, h = -1 / 0, c = -1 / 0;
    for (let u = 0, d = r.length; u < d; u += o) {
      const g = r[u] * n - r[u + 1] * s, f = r[u] * s + r[u + 1] * n;
      a = Math.min(a, g), l = Math.min(l, f), h = Math.max(h, g), c = Math.max(c, f);
    }
    return [a, l, h, c];
  }
  fitInternal(e, t) {
    t = t || {};
    let n = t.size;
    n || (n = this.getViewportSizeMinusPadding_());
    const s = t.padding !== void 0 ? t.padding : [0, 0, 0, 0], r = t.nearest !== void 0 ? t.nearest : !1;
    let o;
    t.minResolution !== void 0 ? o = t.minResolution : t.maxZoom !== void 0 ? o = this.getResolutionForZoom(t.maxZoom) : o = 0;
    const a = this.rotatedExtentForGeometry(e);
    let l = this.getResolutionForExtentInternal(a, [
      n[0] - s[1] - s[3],
      n[1] - s[0] - s[2]
    ]);
    l = isNaN(l) ? o : Math.max(l, o), l = this.getConstrainedResolution(l, r ? 0 : 1);
    const h = this.getRotation(), c = Math.sin(h), u = Math.cos(h), d = Je(a);
    d[0] += (s[1] - s[3]) / 2 * l, d[1] += (s[0] - s[2]) / 2 * l;
    const g = d[0] * u - d[1] * c, f = d[1] * u + d[0] * c, _ = this.getConstrainedCenter([g, f], l), p = t.callback ? t.callback : Be;
    t.duration !== void 0 ? this.animateInternal(
      {
        resolution: l,
        center: _,
        duration: t.duration,
        easing: t.easing
      },
      p
    ) : (this.targetResolution_ = l, this.targetCenter_ = _, this.applyTargetState_(!1, !0), dt(p, !0));
  }
  centerOn(e, t, n) {
    this.centerOnInternal(
      ae(e, this.getProjection()),
      t,
      n
    );
  }
  centerOnInternal(e, t, n) {
    this.setCenterInternal(
      Kt(
        e,
        t,
        n,
        this.getResolution(),
        this.getRotation()
      )
    );
  }
  calculateCenterShift(e, t, n, s) {
    let r;
    const o = this.padding_;
    if (o && e) {
      const a = this.getViewportSizeMinusPadding_(-n), l = Kt(
        e,
        s,
        [a[0] / 2 + o[3], a[1] / 2 + o[0]],
        t,
        n
      );
      r = [
        e[0] - l[0],
        e[1] - l[1]
      ];
    }
    return r;
  }
  isDef() {
    return !!this.getCenterInternal() && this.getResolution() !== void 0;
  }
  adjustCenter(e) {
    const t = tn(this.targetCenter_, this.getProjection());
    this.setCenter([
      t[0] + e[0],
      t[1] + e[1]
    ]);
  }
  adjustCenterInternal(e) {
    const t = this.targetCenter_;
    this.setCenterInternal([
      t[0] + e[0],
      t[1] + e[1]
    ]);
  }
  adjustResolution(e, t) {
    t = t && ae(t, this.getProjection()), this.adjustResolutionInternal(e, t);
  }
  adjustResolutionInternal(e, t) {
    const n = this.getAnimating() || this.getInteracting(), s = this.getViewportSize_(this.getRotation()), r = this.constraints_.resolution(
      this.targetResolution_ * e,
      0,
      s,
      n
    );
    t && (this.targetCenter_ = this.calculateCenterZoom(r, t)), this.targetResolution_ *= e, this.applyTargetState_();
  }
  adjustZoom(e, t) {
    this.adjustResolution(Math.pow(this.zoomFactor_, -e), t);
  }
  adjustRotation(e, t) {
    t && (t = ae(t, this.getProjection())), this.adjustRotationInternal(e, t);
  }
  adjustRotationInternal(e, t) {
    const n = this.getAnimating() || this.getInteracting(), s = this.constraints_.rotation(
      this.targetRotation_ + e,
      n
    );
    t && (this.targetCenter_ = this.calculateCenterRotate(s, t)), this.targetRotation_ += e, this.applyTargetState_();
  }
  setCenter(e) {
    this.setCenterInternal(
      e && ae(e, this.getProjection())
    );
  }
  setCenterInternal(e) {
    this.targetCenter_ = e, this.applyTargetState_();
  }
  setHint(e, t) {
    return this.hints_[e] += t, this.changed(), this.hints_[e];
  }
  setResolution(e) {
    this.targetResolution_ = e, this.applyTargetState_();
  }
  setRotation(e) {
    this.targetRotation_ = e, this.applyTargetState_();
  }
  setZoom(e) {
    this.setResolution(this.getResolutionForZoom(e));
  }
  applyTargetState_(e, t) {
    const n = this.getAnimating() || this.getInteracting() || t, s = this.constraints_.rotation(
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
    this.get(q.ROTATION) !== s && this.set(q.ROTATION, s), this.get(q.RESOLUTION) !== o && (this.set(q.RESOLUTION, o), this.set("zoom", this.getZoom(), !0)), (!a || !this.get(q.CENTER) || !Et(this.get(q.CENTER), a)) && this.set(q.CENTER, a), this.getAnimating() && !e && this.cancelAnimations(), this.cancelAnchor_ = void 0;
  }
  resolveConstraints(e, t, n) {
    e = e !== void 0 ? e : 200;
    const s = t || 0, r = this.constraints_.rotation(this.targetRotation_), o = this.getViewportSize_(r), a = this.constraints_.resolution(
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
    if (e === 0 && !this.cancelAnchor_) {
      this.targetResolution_ = a, this.targetRotation_ = r, this.targetCenter_ = l, this.applyTargetState_();
      return;
    }
    n = n || (e === 0 ? this.cancelAnchor_ : void 0), this.cancelAnchor_ = void 0, (this.getResolution() !== a || this.getRotation() !== r || !this.getCenterInternal() || !Et(this.getCenterInternal(), l)) && (this.getAnimating() && this.cancelAnimations(), this.animateInternal({
      rotation: r,
      center: l,
      resolution: a,
      duration: e,
      easing: je,
      anchor: n
    }));
  }
  beginInteraction() {
    this.resolveConstraints(0), this.setHint(H.INTERACTING, 1);
  }
  endInteraction(e, t, n) {
    n = n && ae(n, this.getProjection()), this.endInteractionInternal(e, t, n);
  }
  endInteractionInternal(e, t, n) {
    this.setHint(H.INTERACTING, -1), this.resolveConstraints(e, t, n);
  }
  getConstrainedCenter(e, t) {
    const n = this.getViewportSize_(this.getRotation());
    return this.constraints_.center(
      e,
      t || this.getResolution(),
      n
    );
  }
  getConstrainedZoom(e, t) {
    const n = this.getResolutionForZoom(e);
    return this.getZoomForResolution(
      this.getConstrainedResolution(n, t)
    );
  }
  getConstrainedResolution(e, t) {
    t = t || 0;
    const n = this.getViewportSize_(this.getRotation());
    return this.constraints_.resolution(e, t, n);
  }
}
function dt(i, e) {
  setTimeout(function() {
    i(e);
  }, 0);
}
function xo(i) {
  if (i.extent !== void 0) {
    const t = i.smoothExtentConstraint !== void 0 ? i.smoothExtentConstraint : !0;
    return ei(i.extent, i.constrainOnlyCenter, t);
  }
  const e = En(i.projection, "EPSG:3857");
  if (i.multiWorld !== !0 && e.isGlobal()) {
    const t = e.getExtent().slice();
    return t[0] = -1 / 0, t[2] = 1 / 0, ei(t, !1, !1);
  }
  return Yr;
}
function wo(i) {
  let e, t, n, o = i.minZoom !== void 0 ? i.minZoom : Xt, a = i.maxZoom !== void 0 ? i.maxZoom : 28;
  const l = i.zoomFactor !== void 0 ? i.zoomFactor : 2, h = i.multiWorld !== void 0 ? i.multiWorld : !1, c = i.smoothResolutionConstraint !== void 0 ? i.smoothResolutionConstraint : !0, u = i.showFullExtent !== void 0 ? i.showFullExtent : !1, d = En(i.projection, "EPSG:3857"), g = d.getExtent();
  let f = i.constrainOnlyCenter, _ = i.extent;
  if (!h && !_ && d.isGlobal() && (f = !1, _ = g), i.resolutions !== void 0) {
    const p = i.resolutions;
    t = p[o], n = p[a] !== void 0 ? p[a] : p[p.length - 1], i.constrainResolution ? e = Vr(
      p,
      c,
      !f && _,
      u
    ) : e = ti(
      t,
      n,
      c,
      !f && _,
      u
    );
  } else {
    const C = (g ? Math.max(N(g), ne(g)) : 360 * et.degrees / d.getMetersPerUnit()) / yn / Math.pow(2, Xt), y = C / Math.pow(2, 28 - Xt);
    t = i.maxResolution, t !== void 0 ? o = 0 : t = C / Math.pow(l, o), n = i.minResolution, n === void 0 && (i.maxZoom !== void 0 ? i.maxResolution !== void 0 ? n = t / Math.pow(l, a) : n = C / Math.pow(l, a) : n = y), a = o + Math.floor(
      Math.log(t / n) / Math.log(l)
    ), n = t / Math.pow(l, a - o), i.constrainResolution ? e = Wr(
      l,
      t,
      n,
      c,
      !f && _,
      u
    ) : e = ti(
      t,
      n,
      c,
      !f && _,
      u
    );
  }
  return {
    constraint: e,
    maxResolution: t,
    minResolution: n,
    minZoom: o,
    zoomFactor: l
  };
}
function Io(i) {
  if (i.enableRotation !== void 0 ? i.enableRotation : !0) {
    const t = i.constrainRotation;
    return t === void 0 || t === !0 ? $r() : t === !1 ? ni : typeof t == "number" ? Hr(t) : ni;
  } else
    return vn;
}
function Po(i) {
  return !(i.sourceCenter && i.targetCenter && !Et(i.sourceCenter, i.targetCenter) || i.sourceResolution !== i.targetResolution || i.sourceRotation !== i.targetRotation);
}
function Kt(i, e, t, n, s) {
  const r = Math.cos(-s);
  let o = Math.sin(-s), a = i[0] * r - i[1] * o, l = i[1] * r + i[0] * o;
  a += (e[0] / 2 - t[0]) * n, l += (t[1] - e[1] / 2) * n, o = -o;
  const h = a * r - l * o, c = l * r + a * o;
  return [h, c];
}
const pe = vo;
class Lo extends ce {
  constructor(e) {
    super();
    const t = e.element;
    t && !e.target && !t.style.pointerEvents && (t.style.pointerEvents = "auto"), this.element = t || null, this.target_ = null, this.map_ = null, this.listenerKeys = [], e.render && (this.render = e.render), e.target && this.setTarget(e.target);
  }
  disposeInternal() {
    Bt(this.element), super.disposeInternal();
  }
  getMap() {
    return this.map_;
  }
  setMap(e) {
    this.map_ && Bt(this.element);
    for (let t = 0, n = this.listenerKeys.length; t < n; ++t)
      O(this.listenerKeys[t]);
    this.listenerKeys.length = 0, this.map_ = e, e && ((this.target_ ? this.target_ : e.getOverlayContainerStopEvent()).appendChild(this.element), this.render !== Be && this.listenerKeys.push(
      x(e, me.POSTRENDER, this.render, this)
    ), e.render());
  }
  render(e) {
  }
  setTarget(e) {
    this.target_ = typeof e == "string" ? document.getElementById(e) : e;
  }
}
const In = Lo;
class Ao extends In {
  constructor(e) {
    e = e || {}, super({
      element: document.createElement("div"),
      render: e.render,
      target: e.target
    }), this.ulElement_ = document.createElement("ul"), this.collapsed_ = e.collapsed !== void 0 ? e.collapsed : !0, this.userCollapsed_ = this.collapsed_, this.overrideCollapsible_ = e.collapsible !== void 0, this.collapsible_ = e.collapsible !== void 0 ? e.collapsible : !0, this.collapsible_ || (this.collapsed_ = !1);
    const t = e.className !== void 0 ? e.className : "ol-attribution", n = e.tipLabel !== void 0 ? e.tipLabel : "Attributions", s = e.expandClassName !== void 0 ? e.expandClassName : t + "-expand", r = e.collapseLabel !== void 0 ? e.collapseLabel : "\u203A", o = e.collapseClassName !== void 0 ? e.collapseClassName : t + "-collapse";
    typeof r == "string" ? (this.collapseLabel_ = document.createElement("span"), this.collapseLabel_.textContent = r, this.collapseLabel_.className = o) : this.collapseLabel_ = r;
    const a = e.label !== void 0 ? e.label : "i";
    typeof a == "string" ? (this.label_ = document.createElement("span"), this.label_.textContent = a, this.label_.className = s) : this.label_ = a;
    const l = this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_;
    this.toggleButton_ = document.createElement("button"), this.toggleButton_.setAttribute("type", "button"), this.toggleButton_.setAttribute("aria-expanded", String(!this.collapsed_)), this.toggleButton_.title = n, this.toggleButton_.appendChild(l), this.toggleButton_.addEventListener(
      v.CLICK,
      this.handleClick_.bind(this),
      !1
    );
    const h = t + " " + Dt + " " + _n + (this.collapsed_ && this.collapsible_ ? " " + Vn : "") + (this.collapsible_ ? "" : " ol-uncollapsible"), c = this.element;
    c.className = h, c.appendChild(this.toggleButton_), c.appendChild(this.ulElement_), this.renderedAttributions_ = [], this.renderedVisible_ = !0;
  }
  collectSourceAttributions_(e) {
    const t = {}, n = [];
    let s = !0;
    const r = e.layerStatesArray;
    for (let o = 0, a = r.length; o < a; ++o) {
      const l = r[o];
      if (!dn(l, e.viewState))
        continue;
      const h = l.layer.getSource();
      if (!h)
        continue;
      const c = h.getAttributions();
      if (!c)
        continue;
      const u = c(e);
      if (!!u)
        if (s = s && h.getAttributionsCollapsible() !== !1, Array.isArray(u))
          for (let d = 0, g = u.length; d < g; ++d)
            u[d] in t || (n.push(u[d]), t[u[d]] = !0);
        else
          u in t || (n.push(u), t[u] = !0);
    }
    return this.overrideCollapsible_ || this.setCollapsible(s), n;
  }
  updateElement_(e) {
    if (!e) {
      this.renderedVisible_ && (this.element.style.display = "none", this.renderedVisible_ = !1);
      return;
    }
    const t = this.collectSourceAttributions_(e), n = t.length > 0;
    if (this.renderedVisible_ != n && (this.element.style.display = n ? "" : "none", this.renderedVisible_ = n), !ln(t, this.renderedAttributions_)) {
      dr(this.ulElement_);
      for (let s = 0, r = t.length; s < r; ++s) {
        const o = document.createElement("li");
        o.innerHTML = t[s], this.ulElement_.appendChild(o);
      }
      this.renderedAttributions_ = t;
    }
  }
  handleClick_(e) {
    e.preventDefault(), this.handleToggle_(), this.userCollapsed_ = this.collapsed_;
  }
  handleToggle_() {
    this.element.classList.toggle(Vn), this.collapsed_ ? Wn(this.collapseLabel_, this.label_) : Wn(this.label_, this.collapseLabel_), this.collapsed_ = !this.collapsed_, this.toggleButton_.setAttribute("aria-expanded", String(!this.collapsed_));
  }
  getCollapsible() {
    return this.collapsible_;
  }
  setCollapsible(e) {
    this.collapsible_ !== e && (this.collapsible_ = e, this.element.classList.toggle("ol-uncollapsible"), this.userCollapsed_ && this.handleToggle_());
  }
  setCollapsed(e) {
    this.userCollapsed_ = e, !(!this.collapsible_ || this.collapsed_ === e) && this.handleToggle_();
  }
  getCollapsed() {
    return this.collapsed_;
  }
  render(e) {
    this.updateElement_(e.frameState);
  }
}
const bo = Ao;
class Mo extends In {
  constructor(e) {
    e = e || {}, super({
      element: document.createElement("div"),
      render: e.render,
      target: e.target
    });
    const t = e.className !== void 0 ? e.className : "ol-rotate", n = e.label !== void 0 ? e.label : "\u21E7", s = e.compassClassName !== void 0 ? e.compassClassName : "ol-compass";
    this.label_ = null, typeof n == "string" ? (this.label_ = document.createElement("span"), this.label_.className = s, this.label_.textContent = n) : (this.label_ = n, this.label_.classList.add(s));
    const r = e.tipLabel ? e.tipLabel : "Reset rotation", o = document.createElement("button");
    o.className = t + "-reset", o.setAttribute("type", "button"), o.title = r, o.appendChild(this.label_), o.addEventListener(
      v.CLICK,
      this.handleClick_.bind(this),
      !1
    );
    const a = t + " " + Dt + " " + _n, l = this.element;
    l.className = a, l.appendChild(o), this.callResetNorth_ = e.resetNorth ? e.resetNorth : void 0, this.duration_ = e.duration !== void 0 ? e.duration : 250, this.autoHide_ = e.autoHide !== void 0 ? e.autoHide : !0, this.rotation_ = void 0, this.autoHide_ && this.element.classList.add(ct);
  }
  handleClick_(e) {
    e.preventDefault(), this.callResetNorth_ !== void 0 ? this.callResetNorth_() : this.resetNorth_();
  }
  resetNorth_() {
    const t = this.getMap().getView();
    if (!t)
      return;
    const n = t.getRotation();
    n !== void 0 && (this.duration_ > 0 && n % (2 * Math.PI) !== 0 ? t.animate({
      rotation: 0,
      duration: this.duration_,
      easing: je
    }) : t.setRotation(0));
  }
  render(e) {
    const t = e.frameState;
    if (!t)
      return;
    const n = t.viewState.rotation;
    if (n != this.rotation_) {
      const s = "rotate(" + n + "rad)";
      if (this.autoHide_) {
        const r = this.element.classList.contains(ct);
        !r && n === 0 ? this.element.classList.add(ct) : r && n !== 0 && this.element.classList.remove(ct);
      }
      this.label_.style.transform = s;
    }
    this.rotation_ = n;
  }
}
const So = Mo;
class Oo extends In {
  constructor(e) {
    e = e || {}, super({
      element: document.createElement("div"),
      target: e.target
    });
    const t = e.className !== void 0 ? e.className : "ol-zoom", n = e.delta !== void 0 ? e.delta : 1, s = e.zoomInClassName !== void 0 ? e.zoomInClassName : t + "-in", r = e.zoomOutClassName !== void 0 ? e.zoomOutClassName : t + "-out", o = e.zoomInLabel !== void 0 ? e.zoomInLabel : "+", a = e.zoomOutLabel !== void 0 ? e.zoomOutLabel : "\u2013", l = e.zoomInTipLabel !== void 0 ? e.zoomInTipLabel : "Zoom in", h = e.zoomOutTipLabel !== void 0 ? e.zoomOutTipLabel : "Zoom out", c = document.createElement("button");
    c.className = s, c.setAttribute("type", "button"), c.title = l, c.appendChild(
      typeof o == "string" ? document.createTextNode(o) : o
    ), c.addEventListener(
      v.CLICK,
      this.handleClick_.bind(this, n),
      !1
    );
    const u = document.createElement("button");
    u.className = r, u.setAttribute("type", "button"), u.title = h, u.appendChild(
      typeof a == "string" ? document.createTextNode(a) : a
    ), u.addEventListener(
      v.CLICK,
      this.handleClick_.bind(this, -n),
      !1
    );
    const d = t + " " + Dt + " " + _n, g = this.element;
    g.className = d, g.appendChild(c), g.appendChild(u), this.duration_ = e.duration !== void 0 ? e.duration : 250;
  }
  handleClick_(e, t) {
    t.preventDefault(), this.zoomByDelta_(e);
  }
  zoomByDelta_(e) {
    const n = this.getMap().getView();
    if (!n)
      return;
    const s = n.getZoom();
    if (s !== void 0) {
      const r = n.getConstrainedZoom(s + e);
      this.duration_ > 0 ? (n.getAnimating() && n.cancelAnimations(), n.animate({
        zoom: r,
        duration: this.duration_,
        easing: je
      })) : n.setZoom(r);
    }
  }
}
const Do = Oo;
function Fo(i) {
  i = i || {};
  const e = new he();
  return (i.zoom !== void 0 ? i.zoom : !0) && e.push(new Do(i.zoomOptions)), (i.rotate !== void 0 ? i.rotate : !0) && e.push(new So(i.rotateOptions)), (i.attribution !== void 0 ? i.attribution : !0) && e.push(new bo(i.attributionOptions)), e;
}
const hi = {
  ACTIVE: "active"
};
class No extends ce {
  constructor(e) {
    super(), this.on, this.once, this.un, e && e.handleEvent && (this.handleEvent = e.handleEvent), this.map_ = null, this.setActive(!0);
  }
  getActive() {
    return this.get(hi.ACTIVE);
  }
  getMap() {
    return this.map_;
  }
  handleEvent(e) {
    return !0;
  }
  setActive(e) {
    this.set(hi.ACTIVE, e);
  }
  setMap(e) {
    this.map_ = e;
  }
}
function Go(i, e, t) {
  const n = i.getCenterInternal();
  if (n) {
    const s = [n[0] + e[0], n[1] + e[1]];
    i.animateInternal({
      duration: t !== void 0 ? t : 250,
      easing: Br,
      center: i.getConstrainedCenter(s)
    });
  }
}
function Pn(i, e, t, n) {
  const s = i.getZoom();
  if (s === void 0)
    return;
  const r = i.getConstrainedZoom(s + e), o = i.getResolutionForZoom(r);
  i.getAnimating() && i.cancelAnimations(), i.animate({
    resolution: o,
    anchor: t,
    duration: n !== void 0 ? n : 250,
    easing: je
  });
}
const it = No;
class zo extends it {
  constructor(e) {
    super(), e = e || {}, this.delta_ = e.delta ? e.delta : 1, this.duration_ = e.duration !== void 0 ? e.duration : 250;
  }
  handleEvent(e) {
    let t = !1;
    if (e.type == S.DBLCLICK) {
      const n = e.originalEvent, s = e.map, r = e.coordinate, o = n.shiftKey ? -this.delta_ : this.delta_, a = s.getView();
      Pn(a, o, r, this.duration_), n.preventDefault(), t = !0;
    }
    return !t;
  }
}
const Zo = zo;
class Xo extends it {
  constructor(e) {
    e = e || {}, super(
      e
    ), e.handleDownEvent && (this.handleDownEvent = e.handleDownEvent), e.handleDragEvent && (this.handleDragEvent = e.handleDragEvent), e.handleMoveEvent && (this.handleMoveEvent = e.handleMoveEvent), e.handleUpEvent && (this.handleUpEvent = e.handleUpEvent), e.stopDown && (this.stopDown = e.stopDown), this.handlingDownUpSequence = !1, this.targetPointers = [];
  }
  getPointerCount() {
    return this.targetPointers.length;
  }
  handleDownEvent(e) {
    return !1;
  }
  handleDragEvent(e) {
  }
  handleEvent(e) {
    if (!e.originalEvent)
      return !0;
    let t = !1;
    if (this.updateTrackedPointers_(e), this.handlingDownUpSequence) {
      if (e.type == S.POINTERDRAG)
        this.handleDragEvent(e), e.originalEvent.preventDefault();
      else if (e.type == S.POINTERUP) {
        const n = this.handleUpEvent(e);
        this.handlingDownUpSequence = n && this.targetPointers.length > 0;
      }
    } else if (e.type == S.POINTERDOWN) {
      const n = this.handleDownEvent(e);
      this.handlingDownUpSequence = n, t = this.stopDown(n);
    } else
      e.type == S.POINTERMOVE && this.handleMoveEvent(e);
    return !t;
  }
  handleMoveEvent(e) {
  }
  handleUpEvent(e) {
    return !1;
  }
  stopDown(e) {
    return e;
  }
  updateTrackedPointers_(e) {
    e.activePointers && (this.targetPointers = e.activePointers);
  }
}
function Ln(i) {
  const e = i.length;
  let t = 0, n = 0;
  for (let s = 0; s < e; s++)
    t += i[s].clientX, n += i[s].clientY;
  return [t / e, n / e];
}
const st = Xo;
function nn(i) {
  const e = arguments;
  return function(t) {
    let n = !0;
    for (let s = 0, r = e.length; s < r && (n = n && e[s](t), !!n); ++s)
      ;
    return n;
  };
}
const Ko = function(i) {
  const e = i.originalEvent;
  return e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey;
}, ko = function(i) {
  const e = i.map.getTargetElement(), t = i.map.getOwnerDocument().activeElement;
  return e.contains(t);
}, ki = function(i) {
  return i.map.getTargetElement().hasAttribute("tabindex") ? ko(i) : !0;
}, Uo = yt, Ui = function(i) {
  const e = i.originalEvent;
  return e.button == 0 && !(bs && Ms && e.ctrlKey);
}, ji = function(i) {
  const e = i.originalEvent;
  return !e.altKey && !(e.metaKey || e.ctrlKey) && !e.shiftKey;
}, jo = function(i) {
  const e = i.originalEvent;
  return !e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey;
}, Yi = function(i) {
  const e = i.originalEvent, t = e.target.tagName;
  return t !== "INPUT" && t !== "SELECT" && t !== "TEXTAREA" && !e.target.isContentEditable;
}, kt = function(i) {
  const e = i.originalEvent;
  return A(e !== void 0, 56), e.pointerType == "mouse";
}, Yo = function(i) {
  const e = i.originalEvent;
  return A(e !== void 0, 56), e.isPrimary && e.button === 0;
};
class Vo extends st {
  constructor(e) {
    super({
      stopDown: It
    }), e = e || {}, this.kinetic_ = e.kinetic, this.lastCentroid = null, this.lastPointersCount_, this.panning_ = !1;
    const t = e.condition ? e.condition : nn(ji, Yo);
    this.condition_ = e.onFocusOnly ? nn(ki, t) : t, this.noKinetic_ = !1;
  }
  handleDragEvent(e) {
    this.panning_ || (this.panning_ = !0, this.getMap().getView().beginInteraction());
    const t = this.targetPointers, n = Ln(t);
    if (t.length == this.lastPointersCount_) {
      if (this.kinetic_ && this.kinetic_.update(n[0], n[1]), this.lastCentroid) {
        const s = [
          this.lastCentroid[0] - n[0],
          n[1] - this.lastCentroid[1]
        ], o = e.map.getView();
        sr(s, o.getResolution()), fn(s, o.getRotation()), o.adjustCenterInternal(s);
      }
    } else
      this.kinetic_ && this.kinetic_.begin();
    this.lastCentroid = n, this.lastPointersCount_ = t.length, e.originalEvent.preventDefault();
  }
  handleUpEvent(e) {
    const t = e.map, n = t.getView();
    if (this.targetPointers.length === 0) {
      if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
        const s = this.kinetic_.getDistance(), r = this.kinetic_.getAngle(), o = n.getCenterInternal(), a = t.getPixelFromCoordinateInternal(o), l = t.getCoordinateFromPixelInternal([
          a[0] - s * Math.cos(r),
          a[1] - s * Math.sin(r)
        ]);
        n.animateInternal({
          center: n.getConstrainedCenter(l),
          duration: 500,
          easing: je
        });
      }
      return this.panning_ && (this.panning_ = !1, n.endInteraction()), !1;
    } else
      return this.kinetic_ && this.kinetic_.begin(), this.lastCentroid = null, !0;
  }
  handleDownEvent(e) {
    if (this.targetPointers.length > 0 && this.condition_(e)) {
      const n = e.map.getView();
      return this.lastCentroid = null, n.getAnimating() && n.cancelAnimations(), this.kinetic_ && this.kinetic_.begin(), this.noKinetic_ = this.targetPointers.length > 1, !0;
    } else
      return !1;
  }
}
const Wo = Vo;
class Ho extends st {
  constructor(e) {
    e = e || {}, super({
      stopDown: It
    }), this.condition_ = e.condition ? e.condition : Ko, this.lastAngle_ = void 0, this.duration_ = e.duration !== void 0 ? e.duration : 250;
  }
  handleDragEvent(e) {
    if (!kt(e))
      return;
    const t = e.map, n = t.getView();
    if (n.getConstraints().rotation === vn)
      return;
    const s = t.getSize(), r = e.pixel, o = Math.atan2(s[1] / 2 - r[1], r[0] - s[0] / 2);
    if (this.lastAngle_ !== void 0) {
      const a = o - this.lastAngle_;
      n.adjustRotationInternal(-a);
    }
    this.lastAngle_ = o;
  }
  handleUpEvent(e) {
    return kt(e) ? (e.map.getView().endInteraction(this.duration_), !1) : !0;
  }
  handleDownEvent(e) {
    return kt(e) && Ui(e) && this.condition_(e) ? (e.map.getView().beginInteraction(), this.lastAngle_ = void 0, !0) : !1;
  }
}
const $o = Ho;
class qo extends rn {
  constructor(e) {
    super(), this.geometry_ = null, this.element_ = document.createElement("div"), this.element_.style.position = "absolute", this.element_.style.pointerEvents = "auto", this.element_.className = "ol-box " + e, this.map_ = null, this.startPixel_ = null, this.endPixel_ = null;
  }
  disposeInternal() {
    this.setMap(null);
  }
  render_() {
    const e = this.startPixel_, t = this.endPixel_, n = "px", s = this.element_.style;
    s.left = Math.min(e[0], t[0]) + n, s.top = Math.min(e[1], t[1]) + n, s.width = Math.abs(t[0] - e[0]) + n, s.height = Math.abs(t[1] - e[1]) + n;
  }
  setMap(e) {
    if (this.map_) {
      this.map_.getOverlayContainer().removeChild(this.element_);
      const t = this.element_.style;
      t.left = "inherit", t.top = "inherit", t.width = "inherit", t.height = "inherit";
    }
    this.map_ = e, this.map_ && this.map_.getOverlayContainer().appendChild(this.element_);
  }
  setPixels(e, t) {
    this.startPixel_ = e, this.endPixel_ = t, this.createOrUpdateGeometry(), this.render_();
  }
  createOrUpdateGeometry() {
    const e = this.startPixel_, t = this.endPixel_, s = [
      e,
      [e[0], t[1]],
      t,
      [t[0], e[1]]
    ].map(
      this.map_.getCoordinateFromPixelInternal,
      this.map_
    );
    s[4] = s[0].slice(), this.geometry_ ? this.geometry_.setCoordinates([s]) : this.geometry_ = new tt([s]);
  }
  getGeometry() {
    return this.geometry_;
  }
}
const Bo = qo, gt = {
  BOXSTART: "boxstart",
  BOXDRAG: "boxdrag",
  BOXEND: "boxend",
  BOXCANCEL: "boxcancel"
};
class Ut extends Te {
  constructor(e, t, n) {
    super(e), this.coordinate = t, this.mapBrowserEvent = n;
  }
}
class Qo extends st {
  constructor(e) {
    super(), this.on, this.once, this.un, e = e || {}, this.box_ = new Bo(e.className || "ol-dragbox"), this.minArea_ = e.minArea !== void 0 ? e.minArea : 64, e.onBoxEnd && (this.onBoxEnd = e.onBoxEnd), this.startPixel_ = null, this.condition_ = e.condition ? e.condition : Ui, this.boxEndCondition_ = e.boxEndCondition ? e.boxEndCondition : this.defaultBoxEndCondition;
  }
  defaultBoxEndCondition(e, t, n) {
    const s = n[0] - t[0], r = n[1] - t[1];
    return s * s + r * r >= this.minArea_;
  }
  getGeometry() {
    return this.box_.getGeometry();
  }
  handleDragEvent(e) {
    this.box_.setPixels(this.startPixel_, e.pixel), this.dispatchEvent(
      new Ut(
        gt.BOXDRAG,
        e.coordinate,
        e
      )
    );
  }
  handleUpEvent(e) {
    this.box_.setMap(null);
    const t = this.boxEndCondition_(
      e,
      this.startPixel_,
      e.pixel
    );
    return t && this.onBoxEnd(e), this.dispatchEvent(
      new Ut(
        t ? gt.BOXEND : gt.BOXCANCEL,
        e.coordinate,
        e
      )
    ), !1;
  }
  handleDownEvent(e) {
    return this.condition_(e) ? (this.startPixel_ = e.pixel, this.box_.setMap(e.map), this.box_.setPixels(this.startPixel_, this.startPixel_), this.dispatchEvent(
      new Ut(
        gt.BOXSTART,
        e.coordinate,
        e
      )
    ), !0) : !1;
  }
  onBoxEnd(e) {
  }
}
const Jo = Qo;
class ea extends Jo {
  constructor(e) {
    e = e || {};
    const t = e.condition ? e.condition : jo;
    super({
      condition: t,
      className: e.className || "ol-dragzoom",
      minArea: e.minArea
    }), this.duration_ = e.duration !== void 0 ? e.duration : 200, this.out_ = e.out !== void 0 ? e.out : !1;
  }
  onBoxEnd(e) {
    const n = this.getMap().getView();
    let s = this.getGeometry();
    if (this.out_) {
      const r = n.rotatedExtentForGeometry(s), o = n.getResolutionForExtentInternal(r), a = n.getResolution() / o;
      s = s.clone(), s.scale(a * a);
    }
    n.fitInternal(s, {
      duration: this.duration_,
      easing: je
    });
  }
}
const ta = ea, xe = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};
class na extends it {
  constructor(e) {
    super(), e = e || {}, this.defaultCondition_ = function(t) {
      return ji(t) && Yi(t);
    }, this.condition_ = e.condition !== void 0 ? e.condition : this.defaultCondition_, this.duration_ = e.duration !== void 0 ? e.duration : 100, this.pixelDelta_ = e.pixelDelta !== void 0 ? e.pixelDelta : 128;
  }
  handleEvent(e) {
    let t = !1;
    if (e.type == v.KEYDOWN) {
      const n = e.originalEvent, s = n.keyCode;
      if (this.condition_(e) && (s == xe.DOWN || s == xe.LEFT || s == xe.RIGHT || s == xe.UP)) {
        const o = e.map.getView(), a = o.getResolution() * this.pixelDelta_;
        let l = 0, h = 0;
        s == xe.DOWN ? h = -a : s == xe.LEFT ? l = -a : s == xe.RIGHT ? l = a : h = a;
        const c = [l, h];
        fn(c, o.getRotation()), Go(o, c, this.duration_), n.preventDefault(), t = !0;
      }
    }
    return !t;
  }
}
const ia = na;
class sa extends it {
  constructor(e) {
    super(), e = e || {}, this.condition_ = e.condition ? e.condition : Yi, this.delta_ = e.delta ? e.delta : 1, this.duration_ = e.duration !== void 0 ? e.duration : 100;
  }
  handleEvent(e) {
    let t = !1;
    if (e.type == v.KEYDOWN || e.type == v.KEYPRESS) {
      const n = e.originalEvent, s = n.charCode;
      if (this.condition_(e) && (s == "+".charCodeAt(0) || s == "-".charCodeAt(0))) {
        const r = e.map, o = s == "+".charCodeAt(0) ? this.delta_ : -this.delta_, a = r.getView();
        Pn(a, o, void 0, this.duration_), n.preventDefault(), t = !0;
      }
    }
    return !t;
  }
}
const ra = sa;
class oa {
  constructor(e, t, n) {
    this.decay_ = e, this.minVelocity_ = t, this.delay_ = n, this.points_ = [], this.angle_ = 0, this.initialVelocity_ = 0;
  }
  begin() {
    this.points_.length = 0, this.angle_ = 0, this.initialVelocity_ = 0;
  }
  update(e, t) {
    this.points_.push(e, t, Date.now());
  }
  end() {
    if (this.points_.length < 6)
      return !1;
    const e = Date.now() - this.delay_, t = this.points_.length - 3;
    if (this.points_[t + 2] < e)
      return !1;
    let n = t - 3;
    for (; n > 0 && this.points_[n + 2] > e; )
      n -= 3;
    const s = this.points_[t + 2] - this.points_[n + 2];
    if (s < 1e3 / 60)
      return !1;
    const r = this.points_[t] - this.points_[n], o = this.points_[t + 1] - this.points_[n + 1];
    return this.angle_ = Math.atan2(o, r), this.initialVelocity_ = Math.sqrt(r * r + o * o) / s, this.initialVelocity_ > this.minVelocity_;
  }
  getDistance() {
    return (this.minVelocity_ - this.initialVelocity_) / this.decay_;
  }
  getAngle() {
    return this.angle_;
  }
}
const aa = oa;
class la extends it {
  constructor(e) {
    e = e || {}, super(
      e
    ), this.totalDelta_ = 0, this.lastDelta_ = 0, this.maxDelta_ = e.maxDelta !== void 0 ? e.maxDelta : 1, this.duration_ = e.duration !== void 0 ? e.duration : 250, this.timeout_ = e.timeout !== void 0 ? e.timeout : 80, this.useAnchor_ = e.useAnchor !== void 0 ? e.useAnchor : !0, this.constrainResolution_ = e.constrainResolution !== void 0 ? e.constrainResolution : !1;
    const t = e.condition ? e.condition : Uo;
    this.condition_ = e.onFocusOnly ? nn(ki, t) : t, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_, this.mode_ = void 0, this.trackpadEventGap_ = 400, this.trackpadTimeoutId_, this.deltaPerZoom_ = 300;
  }
  endInteraction_() {
    this.trackpadTimeoutId_ = void 0;
    const e = this.getMap();
    if (!e)
      return;
    e.getView().endInteraction(
      void 0,
      this.lastDelta_ ? this.lastDelta_ > 0 ? 1 : -1 : 0,
      this.lastAnchor_
    );
  }
  handleEvent(e) {
    if (!this.condition_(e) || e.type !== v.WHEEL)
      return !0;
    const n = e.map, s = e.originalEvent;
    s.preventDefault(), this.useAnchor_ && (this.lastAnchor_ = e.coordinate);
    let r;
    if (e.type == v.WHEEL && (r = s.deltaY, Ls && s.deltaMode === WheelEvent.DOM_DELTA_PIXEL && (r /= pi), s.deltaMode === WheelEvent.DOM_DELTA_LINE && (r *= 40)), r === 0)
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
  handleWheelZoom_(e) {
    const t = e.getView();
    t.getAnimating() && t.cancelAnimations();
    let n = -G(
      this.totalDelta_,
      -this.maxDelta_ * this.deltaPerZoom_,
      this.maxDelta_ * this.deltaPerZoom_
    ) / this.deltaPerZoom_;
    (t.getConstrainResolution() || this.constrainResolution_) && (n = n ? n > 0 ? 1 : -1 : 0), Pn(t, n, this.lastAnchor_, this.duration_), this.mode_ = void 0, this.totalDelta_ = 0, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_ = void 0;
  }
  setMouseAnchor(e) {
    this.useAnchor_ = e, e || (this.lastAnchor_ = null);
  }
}
const ha = la;
class ca extends st {
  constructor(e) {
    e = e || {};
    const t = e;
    t.stopDown || (t.stopDown = It), super(t), this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.threshold_ = e.threshold !== void 0 ? e.threshold : 0.3, this.duration_ = e.duration !== void 0 ? e.duration : 250;
  }
  handleDragEvent(e) {
    let t = 0;
    const n = this.targetPointers[0], s = this.targetPointers[1], r = Math.atan2(
      s.clientY - n.clientY,
      s.clientX - n.clientX
    );
    if (this.lastAngle_ !== void 0) {
      const c = r - this.lastAngle_;
      this.rotationDelta_ += c, !this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_ && (this.rotating_ = !0), t = c;
    }
    this.lastAngle_ = r;
    const o = e.map, a = o.getView();
    if (a.getConstraints().rotation === vn)
      return;
    const l = o.getViewport().getBoundingClientRect(), h = Ln(this.targetPointers);
    h[0] -= l.left, h[1] -= l.top, this.anchor_ = o.getCoordinateFromPixelInternal(h), this.rotating_ && (o.render(), a.adjustRotationInternal(t, this.anchor_));
  }
  handleUpEvent(e) {
    return this.targetPointers.length < 2 ? (e.map.getView().endInteraction(this.duration_), !1) : !0;
  }
  handleDownEvent(e) {
    if (this.targetPointers.length >= 2) {
      const t = e.map;
      return this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.handlingDownUpSequence || t.getView().beginInteraction(), !0;
    } else
      return !1;
  }
}
const ua = ca;
class da extends st {
  constructor(e) {
    e = e || {};
    const t = e;
    t.stopDown || (t.stopDown = It), super(t), this.anchor_ = null, this.duration_ = e.duration !== void 0 ? e.duration : 400, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1;
  }
  handleDragEvent(e) {
    let t = 1;
    const n = this.targetPointers[0], s = this.targetPointers[1], r = n.clientX - s.clientX, o = n.clientY - s.clientY, a = Math.sqrt(r * r + o * o);
    this.lastDistance_ !== void 0 && (t = this.lastDistance_ / a), this.lastDistance_ = a;
    const l = e.map, h = l.getView();
    t != 1 && (this.lastScaleDelta_ = t);
    const c = l.getViewport().getBoundingClientRect(), u = Ln(this.targetPointers);
    u[0] -= c.left, u[1] -= c.top, this.anchor_ = l.getCoordinateFromPixelInternal(u), l.render(), h.adjustResolutionInternal(t, this.anchor_);
  }
  handleUpEvent(e) {
    if (this.targetPointers.length < 2) {
      const n = e.map.getView(), s = this.lastScaleDelta_ > 1 ? 1 : -1;
      return n.endInteraction(this.duration_, s), !1;
    } else
      return !0;
  }
  handleDownEvent(e) {
    if (this.targetPointers.length >= 2) {
      const t = e.map;
      return this.anchor_ = null, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1, this.handlingDownUpSequence || t.getView().beginInteraction(), !0;
    } else
      return !1;
  }
}
const ga = da;
function fa(i) {
  i = i || {};
  const e = new he(), t = new aa(-5e-3, 0.05, 100);
  return (i.altShiftDragRotate !== void 0 ? i.altShiftDragRotate : !0) && e.push(new $o()), (i.doubleClickZoom !== void 0 ? i.doubleClickZoom : !0) && e.push(
    new Zo({
      delta: i.zoomDelta,
      duration: i.zoomDuration
    })
  ), (i.dragPan !== void 0 ? i.dragPan : !0) && e.push(
    new Wo({
      onFocusOnly: i.onFocusOnly,
      kinetic: t
    })
  ), (i.pinchRotate !== void 0 ? i.pinchRotate : !0) && e.push(new ua()), (i.pinchZoom !== void 0 ? i.pinchZoom : !0) && e.push(
    new ga({
      duration: i.zoomDuration
    })
  ), (i.keyboard !== void 0 ? i.keyboard : !0) && (e.push(new ia()), e.push(
    new ra({
      delta: i.zoomDelta,
      duration: i.zoomDuration
    })
  )), (i.mouseWheelZoom !== void 0 ? i.mouseWheelZoom : !0) && e.push(
    new ha({
      onFocusOnly: i.onFocusOnly,
      duration: i.zoomDuration
    })
  ), (i.shiftDragZoom !== void 0 ? i.shiftDragZoom : !0) && e.push(
    new ta({
      duration: i.zoomDuration
    })
  ), e;
}
function ci(i) {
  return i[0] > 0 && i[1] > 0;
}
function _a(i, e, t) {
  return t === void 0 && (t = [0, 0]), t[0] = i[0] * e + 0.5 | 0, t[1] = i[1] * e + 0.5 | 0, t;
}
function le(i, e) {
  return Array.isArray(i) ? i : (e === void 0 ? e = [i, i] : (e[0] = i, e[1] = i), e);
}
function Vi(i) {
  if (i instanceof gn) {
    i.setMapInternal(null);
    return;
  }
  i instanceof Ft && i.getLayers().forEach(Vi);
}
function Wi(i, e) {
  if (i instanceof gn) {
    i.setMapInternal(e);
    return;
  }
  if (i instanceof Ft) {
    const t = i.getLayers().getArray();
    for (let n = 0, s = t.length; n < s; ++n)
      Wi(t[n], e);
  }
}
class ma extends ce {
  constructor(e) {
    super(), e = e || {}, this.on, this.once, this.un;
    const t = ya(e);
    this.renderComplete_, this.loaded_ = !0, this.boundHandleBrowserEvent_ = this.handleBrowserEvent.bind(this), this.maxTilesLoading_ = e.maxTilesLoading !== void 0 ? e.maxTilesLoading : 16, this.pixelRatio_ = e.pixelRatio !== void 0 ? e.pixelRatio : pi, this.postRenderTimeoutHandle_, this.animationDelayKey_, this.animationDelay_ = this.animationDelay_.bind(this), this.coordinateToPixelTransform_ = Ze(), this.pixelToCoordinateTransform_ = Ze(), this.frameIndex_ = 0, this.frameState_ = null, this.previousExtent_ = null, this.viewPropertyListenerKey_ = null, this.viewChangeListenerKey_ = null, this.layerGroupPropertyListenerKeys_ = null, this.viewport_ = document.createElement("div"), this.viewport_.className = "ol-viewport" + ("ontouchstart" in window ? " ol-touch" : ""), this.viewport_.style.position = "relative", this.viewport_.style.overflow = "hidden", this.viewport_.style.width = "100%", this.viewport_.style.height = "100%", this.overlayContainer_ = document.createElement("div"), this.overlayContainer_.style.position = "absolute", this.overlayContainer_.style.zIndex = "0", this.overlayContainer_.style.width = "100%", this.overlayContainer_.style.height = "100%", this.overlayContainer_.style.pointerEvents = "none", this.overlayContainer_.className = "ol-overlaycontainer", this.viewport_.appendChild(this.overlayContainer_), this.overlayContainerStopEvent_ = document.createElement("div"), this.overlayContainerStopEvent_.style.position = "absolute", this.overlayContainerStopEvent_.style.zIndex = "0", this.overlayContainerStopEvent_.style.width = "100%", this.overlayContainerStopEvent_.style.height = "100%", this.overlayContainerStopEvent_.style.pointerEvents = "none", this.overlayContainerStopEvent_.className = "ol-overlaycontainer-stopevent", this.viewport_.appendChild(this.overlayContainerStopEvent_), this.mapBrowserEventHandler_ = null, this.moveTolerance_ = e.moveTolerance, this.keyboardEventTarget_ = t.keyboardEventTarget, this.targetChangeHandlerKeys_ = null, this.controls = t.controls || Fo(), this.interactions = t.interactions || fa({
      onFocusOnly: !0
    }), this.overlays_ = t.overlays, this.overlayIdIndex_ = {}, this.renderer_ = null, this.postRenderFunctions_ = [], this.tileQueue_ = new xr(
      this.getTilePriority.bind(this),
      this.handleTileChange_.bind(this)
    ), this.addChangeListener(
      X.LAYERGROUP,
      this.handleLayerGroupChanged_
    ), this.addChangeListener(X.VIEW, this.handleViewChanged_), this.addChangeListener(X.SIZE, this.handleSizeChanged_), this.addChangeListener(X.TARGET, this.handleTargetChanged_), this.setProperties(t.values);
    const n = this;
    e.view && !(e.view instanceof pe) && e.view.then(function(s) {
      n.setView(new pe(s));
    }), this.controls.addEventListener(
      $.ADD,
      function(s) {
        s.element.setMap(this);
      }.bind(this)
    ), this.controls.addEventListener(
      $.REMOVE,
      function(s) {
        s.element.setMap(null);
      }.bind(this)
    ), this.interactions.addEventListener(
      $.ADD,
      function(s) {
        s.element.setMap(this);
      }.bind(this)
    ), this.interactions.addEventListener(
      $.REMOVE,
      function(s) {
        s.element.setMap(null);
      }.bind(this)
    ), this.overlays_.addEventListener(
      $.ADD,
      function(s) {
        this.addOverlayInternal_(s.element);
      }.bind(this)
    ), this.overlays_.addEventListener(
      $.REMOVE,
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
  addControl(e) {
    this.getControls().push(e);
  }
  addInteraction(e) {
    this.getInteractions().push(e);
  }
  addLayer(e) {
    this.getLayerGroup().getLayers().push(e);
  }
  handleLayerAdd_(e) {
    Wi(e.layer, this);
  }
  addOverlay(e) {
    this.getOverlays().push(e);
  }
  addOverlayInternal_(e) {
    const t = e.getId();
    t !== void 0 && (this.overlayIdIndex_[t.toString()] = e), e.setMap(this);
  }
  disposeInternal() {
    this.controls.clear(), this.interactions.clear(), this.overlays_.clear(), this.setTarget(null), super.disposeInternal();
  }
  forEachFeatureAtPixel(e, t, n) {
    if (!this.frameState_ || !this.renderer_)
      return;
    const s = this.getCoordinateFromPixelInternal(e);
    n = n !== void 0 ? n : {};
    const r = n.hitTolerance !== void 0 ? n.hitTolerance : 0, o = n.layerFilter !== void 0 ? n.layerFilter : yt, a = n.checkWrapped !== !1;
    return this.renderer_.forEachFeatureAtCoordinate(
      s,
      this.frameState_,
      r,
      a,
      t,
      null,
      o,
      null
    );
  }
  getFeaturesAtPixel(e, t) {
    const n = [];
    return this.forEachFeatureAtPixel(
      e,
      function(s) {
        n.push(s);
      },
      t
    ), n;
  }
  getAllLayers() {
    const e = [];
    function t(n) {
      n.forEach(function(s) {
        s instanceof Ft ? t(s.getLayers()) : e.push(s);
      });
    }
    return t(this.getLayers()), e;
  }
  hasFeatureAtPixel(e, t) {
    if (!this.frameState_ || !this.renderer_)
      return !1;
    const n = this.getCoordinateFromPixelInternal(e);
    t = t !== void 0 ? t : {};
    const s = t.layerFilter !== void 0 ? t.layerFilter : yt, r = t.hitTolerance !== void 0 ? t.hitTolerance : 0, o = t.checkWrapped !== !1;
    return this.renderer_.hasFeatureAtCoordinate(
      n,
      this.frameState_,
      r,
      o,
      s,
      null
    );
  }
  getEventCoordinate(e) {
    return this.getCoordinateFromPixel(this.getEventPixel(e));
  }
  getEventCoordinateInternal(e) {
    return this.getCoordinateFromPixelInternal(this.getEventPixel(e));
  }
  getEventPixel(e) {
    const t = this.viewport_.getBoundingClientRect(), n = "changedTouches" in e ? e.changedTouches[0] : e;
    return [
      n.clientX - t.left,
      n.clientY - t.top
    ];
  }
  getTarget() {
    return this.get(X.TARGET);
  }
  getTargetElement() {
    const e = this.getTarget();
    return e !== void 0 ? typeof e == "string" ? document.getElementById(e) : e : null;
  }
  getCoordinateFromPixel(e) {
    return tn(
      this.getCoordinateFromPixelInternal(e),
      this.getView().getProjection()
    );
  }
  getCoordinateFromPixelInternal(e) {
    const t = this.frameState_;
    return t ? W(
      t.pixelToCoordinateTransform,
      e.slice()
    ) : null;
  }
  getControls() {
    return this.controls;
  }
  getOverlays() {
    return this.overlays_;
  }
  getOverlayById(e) {
    const t = this.overlayIdIndex_[e.toString()];
    return t !== void 0 ? t : null;
  }
  getInteractions() {
    return this.interactions;
  }
  getLayerGroup() {
    return this.get(X.LAYERGROUP);
  }
  setLayers(e) {
    const t = this.getLayerGroup();
    if (e instanceof he) {
      t.setLayers(e);
      return;
    }
    const n = t.getLayers();
    n.clear(), n.extend(e);
  }
  getLayers() {
    return this.getLayerGroup().getLayers();
  }
  getLoadingOrNotReady() {
    const e = this.getLayerGroup().getLayerStatesArray();
    for (let t = 0, n = e.length; t < n; ++t) {
      const s = e[t];
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
  getPixelFromCoordinate(e) {
    const t = ae(
      e,
      this.getView().getProjection()
    );
    return this.getPixelFromCoordinateInternal(t);
  }
  getPixelFromCoordinateInternal(e) {
    const t = this.frameState_;
    return t ? W(
      t.coordinateToPixelTransform,
      e.slice(0, 2)
    ) : null;
  }
  getRenderer() {
    return this.renderer_;
  }
  getSize() {
    return this.get(X.SIZE);
  }
  getView() {
    return this.get(X.VIEW);
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
    const e = this.getTargetElement();
    return e ? e.ownerDocument : document;
  }
  getTilePriority(e, t, n, s) {
    return wr(
      this.frameState_,
      e,
      t,
      n,
      s
    );
  }
  handleBrowserEvent(e, t) {
    t = t || e.type;
    const n = new _e(t, this, e);
    this.handleMapBrowserEvent(n);
  }
  handleMapBrowserEvent(e) {
    if (!this.frameState_)
      return;
    const t = e.originalEvent, n = t.type;
    if (n === Qt.POINTERDOWN || n === v.WHEEL || n === v.KEYDOWN) {
      const s = this.getOwnerDocument(), r = this.viewport_.getRootNode ? this.viewport_.getRootNode() : s, o = t.target;
      if (this.overlayContainerStopEvent_.contains(o) || !(r === s ? s.documentElement : r).contains(o))
        return;
    }
    if (e.frameState = this.frameState_, this.dispatchEvent(e) !== !1) {
      const s = this.getInteractions().getArray().slice();
      for (let r = s.length - 1; r >= 0; r--) {
        const o = s[r];
        if (o.getMap() !== this || !o.getActive() || !this.getTargetElement())
          continue;
        if (!o.handleEvent(e) || e.propagationStopped)
          break;
      }
    }
  }
  handlePostRender() {
    const e = this.frameState_, t = this.tileQueue_;
    if (!t.isEmpty()) {
      let s = this.maxTilesLoading_, r = s;
      if (e) {
        const o = e.viewHints;
        if (o[H.ANIMATING] || o[H.INTERACTING]) {
          const a = Date.now() - e.time > 8;
          s = a ? 0 : 8, r = a ? 0 : 2;
        }
      }
      t.getTilesLoading() < s && (t.reprioritize(), t.loadMoreTiles(s, r));
    }
    e && this.renderer_ && !e.animate && (this.renderComplete_ === !0 ? (this.hasListener(Ee.RENDERCOMPLETE) && this.renderer_.dispatchRenderEvent(
      Ee.RENDERCOMPLETE,
      e
    ), this.loaded_ === !1 && (this.loaded_ = !0, this.dispatchEvent(
      new De(me.LOADEND, this, e)
    ))) : this.loaded_ === !0 && (this.loaded_ = !1, this.dispatchEvent(
      new De(me.LOADSTART, this, e)
    )));
    const n = this.postRenderFunctions_;
    for (let s = 0, r = n.length; s < r; ++s)
      n[s](this, e);
    n.length = 0;
  }
  handleSizeChanged_() {
    this.getView() && !this.getView().getAnimating() && this.getView().resolveConstraints(0), this.render();
  }
  handleTargetChanged_() {
    if (this.mapBrowserEventHandler_) {
      for (let t = 0, n = this.targetChangeHandlerKeys_.length; t < n; ++t)
        O(this.targetChangeHandlerKeys_[t]);
      this.targetChangeHandlerKeys_ = null, this.viewport_.removeEventListener(
        v.CONTEXTMENU,
        this.boundHandleBrowserEvent_
      ), this.viewport_.removeEventListener(
        v.WHEEL,
        this.boundHandleBrowserEvent_
      ), this.mapBrowserEventHandler_.dispose(), this.mapBrowserEventHandler_ = null, Bt(this.viewport_);
    }
    const e = this.getTargetElement();
    if (!e)
      this.renderer_ && (clearTimeout(this.postRenderTimeoutHandle_), this.postRenderTimeoutHandle_ = void 0, this.postRenderFunctions_.length = 0, this.renderer_.dispose(), this.renderer_ = null), this.animationDelayKey_ && (cancelAnimationFrame(this.animationDelayKey_), this.animationDelayKey_ = void 0);
    else {
      e.appendChild(this.viewport_), this.renderer_ || (this.renderer_ = new mr(this)), this.mapBrowserEventHandler_ = new Cr(
        this,
        this.moveTolerance_
      );
      for (const s in S)
        this.mapBrowserEventHandler_.addEventListener(
          S[s],
          this.handleMapBrowserEvent.bind(this)
        );
      this.viewport_.addEventListener(
        v.CONTEXTMENU,
        this.boundHandleBrowserEvent_,
        !1
      ), this.viewport_.addEventListener(
        v.WHEEL,
        this.boundHandleBrowserEvent_,
        Ci ? { passive: !1 } : !1
      );
      const t = this.getOwnerDocument().defaultView, n = this.keyboardEventTarget_ ? this.keyboardEventTarget_ : e;
      this.targetChangeHandlerKeys_ = [
        x(
          n,
          v.KEYDOWN,
          this.handleBrowserEvent,
          this
        ),
        x(
          n,
          v.KEYPRESS,
          this.handleBrowserEvent,
          this
        ),
        x(t, v.RESIZE, this.updateSize, this)
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
    this.viewPropertyListenerKey_ && (O(this.viewPropertyListenerKey_), this.viewPropertyListenerKey_ = null), this.viewChangeListenerKey_ && (O(this.viewChangeListenerKey_), this.viewChangeListenerKey_ = null);
    const e = this.getView();
    e && (this.updateViewportSize_(), this.viewPropertyListenerKey_ = x(
      e,
      qe.PROPERTYCHANGE,
      this.handleViewPropertyChanged_,
      this
    ), this.viewChangeListenerKey_ = x(
      e,
      v.CHANGE,
      this.handleViewPropertyChanged_,
      this
    ), e.resolveConstraints(0)), this.render();
  }
  handleLayerGroupChanged_() {
    this.layerGroupPropertyListenerKeys_ && (this.layerGroupPropertyListenerKeys_.forEach(O), this.layerGroupPropertyListenerKeys_ = null);
    const e = this.getLayerGroup();
    e && (this.handleLayerAdd_(new ye("addlayer", e)), this.layerGroupPropertyListenerKeys_ = [
      x(e, qe.PROPERTYCHANGE, this.render, this),
      x(e, v.CHANGE, this.render, this),
      x(e, "addlayer", this.handleLayerAdd_, this),
      x(e, "removelayer", this.handleLayerRemove_, this)
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
    const e = this.getLayerGroup().getLayerStatesArray();
    for (let t = 0, n = e.length; t < n; ++t) {
      const s = e[t].layer;
      s.hasRenderer() && s.getRenderer().handleFontsChanged();
    }
  }
  render() {
    this.renderer_ && this.animationDelayKey_ === void 0 && (this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_));
  }
  removeControl(e) {
    return this.getControls().remove(e);
  }
  removeInteraction(e) {
    return this.getInteractions().remove(e);
  }
  removeLayer(e) {
    return this.getLayerGroup().getLayers().remove(e);
  }
  handleLayerRemove_(e) {
    Vi(e.layer);
  }
  removeOverlay(e) {
    return this.getOverlays().remove(e);
  }
  renderFrame_(e) {
    const t = this.getSize(), n = this.getView(), s = this.frameState_;
    let r = null;
    if (t !== void 0 && ci(t) && n && n.isDef()) {
      const o = n.getHints(
        this.frameState_ ? this.frameState_.viewHints : void 0
      ), a = n.getState();
      if (r = {
        animate: !1,
        coordinateToPixelTransform: this.coordinateToPixelTransform_,
        declutterTree: null,
        extent: $t(
          a.center,
          a.resolution,
          a.rotation,
          t
        ),
        index: this.frameIndex_++,
        layerIndex: 0,
        layerStatesArray: this.getLayerGroup().getLayerStatesArray(),
        pixelRatio: this.pixelRatio_,
        pixelToCoordinateTransform: this.pixelToCoordinateTransform_,
        postRenderFunctions: [],
        size: t,
        tileQueue: this.tileQueue_,
        time: e,
        usedTiles: {},
        viewState: a,
        viewHints: o,
        wantedTiles: {},
        mapId: j(this),
        renderTargets: {}
      }, a.nextCenter && a.nextResolution) {
        const l = isNaN(a.nextRotation) ? a.rotation : a.nextRotation;
        r.nextExtent = $t(
          a.nextCenter,
          a.nextResolution,
          l,
          t
        );
      }
    }
    this.frameState_ = r, this.renderer_.renderFrame(r), r && (r.animate && this.render(), Array.prototype.push.apply(
      this.postRenderFunctions_,
      r.postRenderFunctions
    ), s && (!this.previousExtent_ || !un(this.previousExtent_) && !Wt(r.extent, this.previousExtent_)) && (this.dispatchEvent(
      new De(me.MOVESTART, this, s)
    ), this.previousExtent_ = At(this.previousExtent_)), this.previousExtent_ && !r.viewHints[H.ANIMATING] && !r.viewHints[H.INTERACTING] && !Wt(r.extent, this.previousExtent_) && (this.dispatchEvent(
      new De(me.MOVEEND, this, r)
    ), Fs(r.extent, this.previousExtent_))), this.dispatchEvent(new De(me.POSTRENDER, this, r)), this.renderComplete_ = this.hasListener(me.LOADSTART) || this.hasListener(me.LOADEND) || this.hasListener(Ee.RENDERCOMPLETE) ? !this.tileQueue_.getTilesLoading() && !this.tileQueue_.getCount() && !this.getLoadingOrNotReady() : void 0, this.postRenderTimeoutHandle_ || (this.postRenderTimeoutHandle_ = setTimeout(() => {
      this.postRenderTimeoutHandle_ = void 0, this.handlePostRender();
    }, 0));
  }
  setLayerGroup(e) {
    const t = this.getLayerGroup();
    t && this.handleLayerRemove_(new ye("removelayer", t)), this.set(X.LAYERGROUP, e);
  }
  setSize(e) {
    this.set(X.SIZE, e);
  }
  setTarget(e) {
    this.set(X.TARGET, e);
  }
  setView(e) {
    if (!e || e instanceof pe) {
      this.set(X.VIEW, e);
      return;
    }
    this.set(X.VIEW, new pe());
    const t = this;
    e.then(function(n) {
      t.setView(new pe(n));
    });
  }
  updateSize() {
    const e = this.getTargetElement();
    let t;
    if (e) {
      const n = getComputedStyle(e), s = e.offsetWidth - parseFloat(n.borderLeftWidth) - parseFloat(n.paddingLeft) - parseFloat(n.paddingRight) - parseFloat(n.borderRightWidth), r = e.offsetHeight - parseFloat(n.borderTopWidth) - parseFloat(n.paddingTop) - parseFloat(n.paddingBottom) - parseFloat(n.borderBottomWidth);
      !isNaN(s) && !isNaN(r) && (t = [s, r], !ci(t) && !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length) && console.warn(
        "No map visible because the map container's width or height are 0."
      ));
    }
    this.setSize(t), this.updateViewportSize_();
  }
  updateViewportSize_() {
    const e = this.getView();
    if (e) {
      let t;
      const n = getComputedStyle(this.viewport_);
      n.width && n.height && (t = [
        parseInt(n.width, 10),
        parseInt(n.height, 10)
      ]), e.setViewportSize(t);
    }
  }
}
function ya(i) {
  let e = null;
  i.keyboardEventTarget !== void 0 && (e = typeof i.keyboardEventTarget == "string" ? document.getElementById(i.keyboardEventTarget) : i.keyboardEventTarget);
  const t = {}, n = i.layers && typeof i.layers.getLayers == "function" ? i.layers : new Ft({
    layers: i.layers
  });
  t[X.LAYERGROUP] = n, t[X.TARGET] = i.target, t[X.VIEW] = i.view instanceof pe ? i.view : new pe();
  let s;
  i.controls !== void 0 && (Array.isArray(i.controls) ? s = new he(i.controls.slice()) : (A(
    typeof i.controls.getArray == "function",
    47
  ), s = i.controls));
  let r;
  i.interactions !== void 0 && (Array.isArray(i.interactions) ? r = new he(i.interactions.slice()) : (A(
    typeof i.interactions.getArray == "function",
    48
  ), r = i.interactions));
  let o;
  return i.overlays !== void 0 ? Array.isArray(i.overlays) ? o = new he(i.overlays.slice()) : (A(
    typeof i.overlays.getArray == "function",
    49
  ), o = i.overlays) : o = new he(), {
    controls: s,
    interactions: r,
    keyboardEventTarget: e,
    overlays: o,
    values: t
  };
}
const pa = ma;
class Ea extends hn {
  constructor(e, t, n) {
    super(), n = n || {}, this.tileCoord = e, this.state = t, this.interimTile = null, this.key = "", this.transition_ = n.transition === void 0 ? 250 : n.transition, this.transitionStarts_ = {}, this.interpolate = !!n.interpolate;
  }
  changed() {
    this.dispatchEvent(v.CHANGE);
  }
  release() {
    this.state === T.ERROR && this.setState(T.EMPTY);
  }
  getKey() {
    return this.key + "/" + this.tileCoord;
  }
  getInterimTile() {
    if (!this.interimTile)
      return this;
    let e = this.interimTile;
    do {
      if (e.getState() == T.LOADED)
        return this.transition_ = 0, e;
      e = e.interimTile;
    } while (e);
    return this;
  }
  refreshInterimChain() {
    if (!this.interimTile)
      return;
    let e = this.interimTile, t = this;
    do {
      if (e.getState() == T.LOADED) {
        e.interimTile = null;
        break;
      } else
        e.getState() == T.LOADING ? t = e : e.getState() == T.IDLE ? t.interimTile = e.interimTile : t = e;
      e = t.interimTile;
    } while (e);
  }
  getTileCoord() {
    return this.tileCoord;
  }
  getState() {
    return this.state;
  }
  setState(e) {
    if (this.state !== T.ERROR && this.state > e)
      throw new Error("Tile load sequence violation");
    this.state = e, this.changed();
  }
  load() {
    M();
  }
  getAlpha(e, t) {
    if (!this.transition_)
      return 1;
    let n = this.transitionStarts_[e];
    if (!n)
      n = t, this.transitionStarts_[e] = n;
    else if (n === -1)
      return 1;
    const s = t - n + 1e3 / 60;
    return s >= this.transition_ ? 1 : Si(s / this.transition_);
  }
  inTransition(e) {
    return this.transition_ ? this.transitionStarts_[e] !== -1 : !1;
  }
  endTransition(e) {
    this.transition_ && (this.transitionStarts_[e] = -1);
  }
}
const Hi = Ea, He = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};
function Ca(i, e, t) {
  const n = i;
  let s = !0, r = !1, o = !1;
  const a = [
    pt(n, v.LOAD, function() {
      o = !0, r || e();
    })
  ];
  return n.src && Ss ? (r = !0, n.decode().then(function() {
    s && e();
  }).catch(function(l) {
    s && (o ? e() : t());
  })) : a.push(pt(n, v.ERROR, t)), function() {
    s = !1, a.forEach(O);
  };
}
class Ta extends Hi {
  constructor(e, t, n, s, r, o) {
    super(e, t, o), this.crossOrigin_ = s, this.src_ = n, this.key = n, this.image_ = new Image(), s !== null && (this.image_.crossOrigin = s), this.unlisten_ = null, this.tileLoadFunction_ = r;
  }
  getImage() {
    return this.image_;
  }
  setImage(e) {
    this.image_ = e, this.state = T.LOADED, this.unlistenImage_(), this.changed();
  }
  handleImageError_() {
    this.state = T.ERROR, this.unlistenImage_(), this.image_ = Ra(), this.changed();
  }
  handleImageLoad_() {
    const e = this.image_;
    e.naturalWidth && e.naturalHeight ? this.state = T.LOADED : this.state = T.EMPTY, this.unlistenImage_(), this.changed();
  }
  load() {
    this.state == T.ERROR && (this.state = T.IDLE, this.image_ = new Image(), this.crossOrigin_ !== null && (this.image_.crossOrigin = this.crossOrigin_)), this.state == T.IDLE && (this.state = T.LOADING, this.changed(), this.tileLoadFunction_(this, this.src_), this.unlisten_ = Ca(
      this.image_,
      this.handleImageLoad_.bind(this),
      this.handleImageError_.bind(this)
    ));
  }
  unlistenImage_() {
    this.unlisten_ && (this.unlisten_(), this.unlisten_ = null);
  }
}
function Ra() {
  const i = Ct(1, 1);
  return i.fillStyle = "rgba(0,0,0,0)", i.fillRect(0, 0, 1, 1), i.canvas;
}
const $i = Ta, va = 0.5, xa = 10, ui = 0.25;
class wa {
  constructor(e, t, n, s, r, o) {
    this.sourceProj_ = e, this.targetProj_ = t;
    let a = {};
    const l = vt(this.targetProj_, this.sourceProj_);
    this.transformInv_ = function(y) {
      const E = y[0] + "/" + y[1];
      return a[E] || (a[E] = l(y)), a[E];
    }, this.maxSourceExtent_ = s, this.errorThresholdSquared_ = r * r, this.triangles_ = [], this.wrapsXInSource_ = !1, this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!s && !!this.sourceProj_.getExtent() && N(s) == N(this.sourceProj_.getExtent()), this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? N(this.sourceProj_.getExtent()) : null, this.targetWorldWidth_ = this.targetProj_.getExtent() ? N(this.targetProj_.getExtent()) : null;
    const h = Pe(n), c = St(n), u = Mt(n), d = bt(n), g = this.transformInv_(h), f = this.transformInv_(c), _ = this.transformInv_(u), p = this.transformInv_(d), C = xa + (o ? Math.max(
      0,
      Math.ceil(
        Math.log2(
          Ht(n) / (o * o * 256 * 256)
        )
      )
    ) : 0);
    if (this.addQuad_(
      h,
      c,
      u,
      d,
      g,
      f,
      _,
      p,
      C
    ), this.wrapsXInSource_) {
      let y = 1 / 0;
      this.triangles_.forEach(function(E, m, R) {
        y = Math.min(
          y,
          E.source[0][0],
          E.source[1][0],
          E.source[2][0]
        );
      }), this.triangles_.forEach(
        function(E) {
          if (Math.max(
            E.source[0][0],
            E.source[1][0],
            E.source[2][0]
          ) - y > this.sourceWorldWidth_ / 2) {
            const m = [
              [E.source[0][0], E.source[0][1]],
              [E.source[1][0], E.source[1][1]],
              [E.source[2][0], E.source[2][1]]
            ];
            m[0][0] - y > this.sourceWorldWidth_ / 2 && (m[0][0] -= this.sourceWorldWidth_), m[1][0] - y > this.sourceWorldWidth_ / 2 && (m[1][0] -= this.sourceWorldWidth_), m[2][0] - y > this.sourceWorldWidth_ / 2 && (m[2][0] -= this.sourceWorldWidth_);
            const R = Math.min(
              m[0][0],
              m[1][0],
              m[2][0]
            );
            Math.max(
              m[0][0],
              m[1][0],
              m[2][0]
            ) - R < this.sourceWorldWidth_ / 2 && (E.source = m);
          }
        }.bind(this)
      );
    }
    a = {};
  }
  addTriangle_(e, t, n, s, r, o) {
    this.triangles_.push({
      source: [s, r, o],
      target: [e, t, n]
    });
  }
  addQuad_(e, t, n, s, r, o, a, l, h) {
    const c = Kn([r, o, a, l]), u = this.sourceWorldWidth_ ? N(c) / this.sourceWorldWidth_ : null, d = this.sourceWorldWidth_, g = this.sourceProj_.canWrapX() && u > 0.5 && u < 1;
    let f = !1;
    if (h > 0) {
      if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
        const p = Kn([e, t, n, s]);
        f = N(p) / this.targetWorldWidth_ > ui || f;
      }
      !g && this.sourceProj_.isGlobal() && u && (f = u > ui || f);
    }
    if (!f && this.maxSourceExtent_ && isFinite(c[0]) && isFinite(c[1]) && isFinite(c[2]) && isFinite(c[3]) && !Ot(c, this.maxSourceExtent_))
      return;
    let _ = 0;
    if (!f && (!isFinite(r[0]) || !isFinite(r[1]) || !isFinite(o[0]) || !isFinite(o[1]) || !isFinite(a[0]) || !isFinite(a[1]) || !isFinite(l[0]) || !isFinite(l[1]))) {
      if (h > 0)
        f = !0;
      else if (_ = (!isFinite(r[0]) || !isFinite(r[1]) ? 8 : 0) + (!isFinite(o[0]) || !isFinite(o[1]) ? 4 : 0) + (!isFinite(a[0]) || !isFinite(a[1]) ? 2 : 0) + (!isFinite(l[0]) || !isFinite(l[1]) ? 1 : 0), _ != 1 && _ != 2 && _ != 4 && _ != 8)
        return;
    }
    if (h > 0) {
      if (!f) {
        const p = [(e[0] + n[0]) / 2, (e[1] + n[1]) / 2], C = this.transformInv_(p);
        let y;
        g ? y = (Ke(r[0], d) + Ke(a[0], d)) / 2 - Ke(C[0], d) : y = (r[0] + a[0]) / 2 - C[0];
        const E = (r[1] + a[1]) / 2 - C[1];
        f = y * y + E * E > this.errorThresholdSquared_;
      }
      if (f) {
        if (Math.abs(e[0] - n[0]) <= Math.abs(e[1] - n[1])) {
          const p = [(t[0] + n[0]) / 2, (t[1] + n[1]) / 2], C = this.transformInv_(p), y = [(s[0] + e[0]) / 2, (s[1] + e[1]) / 2], E = this.transformInv_(y);
          this.addQuad_(
            e,
            t,
            p,
            y,
            r,
            o,
            C,
            E,
            h - 1
          ), this.addQuad_(
            y,
            p,
            n,
            s,
            E,
            C,
            a,
            l,
            h - 1
          );
        } else {
          const p = [(e[0] + t[0]) / 2, (e[1] + t[1]) / 2], C = this.transformInv_(p), y = [(n[0] + s[0]) / 2, (n[1] + s[1]) / 2], E = this.transformInv_(y);
          this.addQuad_(
            e,
            p,
            y,
            s,
            r,
            C,
            E,
            l,
            h - 1
          ), this.addQuad_(
            p,
            t,
            n,
            y,
            C,
            o,
            a,
            E,
            h - 1
          );
        }
        return;
      }
    }
    if (g) {
      if (!this.canWrapXInSource_)
        return;
      this.wrapsXInSource_ = !0;
    }
    (_ & 11) == 0 && this.addTriangle_(e, n, s, r, a, l), (_ & 14) == 0 && this.addTriangle_(e, n, t, r, a, o), _ && ((_ & 13) == 0 && this.addTriangle_(t, s, e, o, l, r), (_ & 7) == 0 && this.addTriangle_(t, s, n, o, l, a));
  }
  calculateSourceExtent() {
    const e = Ie();
    return this.triangles_.forEach(function(t, n, s) {
      const r = t.source;
      _t(e, r[0]), _t(e, r[1]), _t(e, r[2]);
    }), e;
  }
  getTriangles() {
    return this.triangles_;
  }
}
const Ia = wa;
let jt;
const qi = [];
function di(i, e, t, n, s) {
  i.beginPath(), i.moveTo(0, 0), i.lineTo(e, t), i.lineTo(n, s), i.closePath(), i.save(), i.clip(), i.fillRect(0, 0, Math.max(e, n) + 1, Math.max(t, s)), i.restore();
}
function Yt(i, e) {
  return Math.abs(i[e * 4] - 210) > 2 || Math.abs(i[e * 4 + 3] - 0.75 * 255) > 2;
}
function Pa() {
  if (jt === void 0) {
    const i = document.createElement("canvas").getContext("2d");
    i.globalCompositeOperation = "lighter", i.fillStyle = "rgba(210, 0, 0, 0.75)", di(i, 4, 5, 4, 0), di(i, 4, 5, 0, 5);
    const e = i.getImageData(0, 0, 3, 3).data;
    jt = Yt(e, 0) || Yt(e, 4) || Yt(e, 8);
  }
  return jt;
}
function gi(i, e, t, n) {
  const s = kr(t, e, i);
  let r = Qn(
    e,
    n,
    t
  );
  const o = e.getMetersPerUnit();
  o !== void 0 && (r *= o);
  const a = i.getMetersPerUnit();
  a !== void 0 && (r /= a);
  const l = i.getExtent();
  if (!l || cn(l, s)) {
    const h = Qn(i, r, s) / r;
    isFinite(h) && h > 0 && (r /= h);
  }
  return r;
}
function La(i, e, t, n) {
  const s = Je(t);
  let r = gi(
    i,
    e,
    s,
    n
  );
  return (!isFinite(r) || r <= 0) && wi(t, function(o) {
    return r = gi(
      i,
      e,
      o,
      n
    ), isFinite(r) && r > 0;
  }), r;
}
function Aa(i, e, t, n, s, r, o, a, l, h, c, u) {
  const d = Ct(
    Math.round(t * i),
    Math.round(t * e),
    qi
  );
  if (u || (d.imageSmoothingEnabled = !1), l.length === 0)
    return d.canvas;
  d.scale(t, t);
  function g(m) {
    return Math.round(m * t) / t;
  }
  d.globalCompositeOperation = "lighter";
  const f = Ie();
  l.forEach(function(m, R, P) {
    Zs(f, m.extent);
  });
  const _ = N(f), p = ne(f), C = Ct(
    Math.round(t * _ / n),
    Math.round(t * p / n)
  );
  u || (C.imageSmoothingEnabled = !1);
  const y = t / n;
  l.forEach(function(m, R, P) {
    const w = m.extent[0] - f[0], b = -(m.extent[3] - f[3]), z = N(m.extent), K = ne(m.extent);
    m.image.width > 0 && m.image.height > 0 && C.drawImage(
      m.image,
      h,
      h,
      m.image.width - 2 * h,
      m.image.height - 2 * h,
      w * y,
      b * y,
      z * y,
      K * y
    );
  });
  const E = Pe(o);
  return a.getTriangles().forEach(function(m, R, P) {
    const w = m.source, b = m.target;
    let z = w[0][0], K = w[0][1], Q = w[1][0], ue = w[1][1], de = w[2][0], Ye = w[2][1];
    const J = g((b[0][0] - E[0]) / r), ie = g(
      -(b[0][1] - E[1]) / r
    ), L = g((b[1][0] - E[0]) / r), Y = g(
      -(b[1][1] - E[1]) / r
    ), se = g((b[2][0] - E[0]) / r), ee = g(
      -(b[2][1] - E[1]) / r
    ), Re = z, k = K;
    z = 0, K = 0, Q -= Re, ue -= k, de -= Re, Ye -= k;
    const te = [
      [Q, ue, 0, 0, L - J],
      [de, Ye, 0, 0, se - J],
      [0, 0, Q, ue, Y - ie],
      [0, 0, de, Ye, ee - ie]
    ], F = Ys(te);
    if (!!F) {
      if (d.save(), d.beginPath(), Pa() || !u) {
        d.moveTo(L, Y);
        const D = 4, Le = J - L, ge = ie - Y;
        for (let U = 0; U < D; U++)
          d.lineTo(
            L + g((U + 1) * Le / D),
            Y + g(U * ge / (D - 1))
          ), U != D - 1 && d.lineTo(
            L + g((U + 1) * Le / D),
            Y + g((U + 1) * ge / (D - 1))
          );
        d.lineTo(se, ee);
      } else
        d.moveTo(L, Y), d.lineTo(J, ie), d.lineTo(se, ee);
      d.clip(), d.transform(
        F[0],
        F[2],
        F[1],
        F[3],
        J,
        ie
      ), d.translate(
        f[0] - Re,
        f[3] - k
      ), d.scale(
        n / t,
        -n / t
      ), d.drawImage(C.canvas, 0, 0), d.restore();
    }
  }), c && (d.save(), d.globalCompositeOperation = "source-over", d.strokeStyle = "black", d.lineWidth = 1, a.getTriangles().forEach(function(m, R, P) {
    const w = m.target, b = (w[0][0] - E[0]) / r, z = -(w[0][1] - E[1]) / r, K = (w[1][0] - E[0]) / r, Q = -(w[1][1] - E[1]) / r, ue = (w[2][0] - E[0]) / r, de = -(w[2][1] - E[1]) / r;
    d.beginPath(), d.moveTo(K, Q), d.lineTo(b, z), d.lineTo(ue, de), d.closePath(), d.stroke();
  }), d.restore()), d.canvas;
}
class ba extends Hi {
  constructor(e, t, n, s, r, o, a, l, h, c, u, d) {
    super(r, T.IDLE, { interpolate: !!d }), this.renderEdges_ = u !== void 0 ? u : !1, this.pixelRatio_ = a, this.gutter_ = l, this.canvas_ = null, this.sourceTileGrid_ = t, this.targetTileGrid_ = s, this.wrappedTileCoord_ = o || r, this.sourceTiles_ = [], this.sourcesListenerKeys_ = null, this.sourceZ_ = 0;
    const g = s.getTileCoordExtent(
      this.wrappedTileCoord_
    ), f = this.targetTileGrid_.getExtent();
    let _ = this.sourceTileGrid_.getExtent();
    const p = f ? $e(g, f) : g;
    if (Ht(p) === 0) {
      this.state = T.EMPTY;
      return;
    }
    const C = e.getExtent();
    C && (_ ? _ = $e(_, C) : _ = C);
    const y = s.getResolution(
      this.wrappedTileCoord_[0]
    ), E = La(
      e,
      n,
      p,
      y
    );
    if (!isFinite(E) || E <= 0) {
      this.state = T.EMPTY;
      return;
    }
    const m = c !== void 0 ? c : va;
    if (this.triangulation_ = new Ia(
      e,
      n,
      p,
      _,
      E * m,
      y
    ), this.triangulation_.getTriangles().length === 0) {
      this.state = T.EMPTY;
      return;
    }
    this.sourceZ_ = t.getZForResolution(E);
    let R = this.triangulation_.calculateSourceExtent();
    if (_ && (e.canWrapX() ? (R[1] = G(
      R[1],
      _[1],
      _[3]
    ), R[3] = G(
      R[3],
      _[1],
      _[3]
    )) : R = $e(R, _)), !Ht(R))
      this.state = T.EMPTY;
    else {
      const P = t.getTileRangeForExtentAndZ(
        R,
        this.sourceZ_
      );
      for (let w = P.minX; w <= P.maxX; w++)
        for (let b = P.minY; b <= P.maxY; b++) {
          const z = h(this.sourceZ_, w, b, a);
          z && this.sourceTiles_.push(z);
        }
      this.sourceTiles_.length === 0 && (this.state = T.EMPTY);
    }
  }
  getImage() {
    return this.canvas_;
  }
  reproject_() {
    const e = [];
    if (this.sourceTiles_.forEach(
      function(t, n, s) {
        t && t.getState() == T.LOADED && e.push({
          extent: this.sourceTileGrid_.getTileCoordExtent(t.tileCoord),
          image: t.getImage()
        });
      }.bind(this)
    ), this.sourceTiles_.length = 0, e.length === 0)
      this.state = T.ERROR;
    else {
      const t = this.wrappedTileCoord_[0], n = this.targetTileGrid_.getTileSize(t), s = typeof n == "number" ? n : n[0], r = typeof n == "number" ? n : n[1], o = this.targetTileGrid_.getResolution(t), a = this.sourceTileGrid_.getResolution(
        this.sourceZ_
      ), l = this.targetTileGrid_.getTileCoordExtent(
        this.wrappedTileCoord_
      );
      this.canvas_ = Aa(
        s,
        r,
        this.pixelRatio_,
        a,
        this.sourceTileGrid_.getExtent(),
        o,
        l,
        this.triangulation_,
        e,
        this.gutter_,
        this.renderEdges_,
        this.interpolate
      ), this.state = T.LOADED;
    }
    this.changed();
  }
  load() {
    if (this.state == T.IDLE) {
      this.state = T.LOADING, this.changed();
      let e = 0;
      this.sourcesListenerKeys_ = [], this.sourceTiles_.forEach(
        function(t, n, s) {
          const r = t.getState();
          if (r == T.IDLE || r == T.LOADING) {
            e++;
            const o = x(
              t,
              v.CHANGE,
              function(a) {
                const l = t.getState();
                (l == T.LOADED || l == T.ERROR || l == T.EMPTY) && (O(o), e--, e === 0 && (this.unlistenSources_(), this.reproject_()));
              },
              this
            );
            this.sourcesListenerKeys_.push(o);
          }
        }.bind(this)
      ), e === 0 ? setTimeout(this.reproject_.bind(this), 0) : this.sourceTiles_.forEach(function(t, n, s) {
        t.getState() == T.IDLE && t.load();
      });
    }
  }
  unlistenSources_() {
    this.sourcesListenerKeys_.forEach(O), this.sourcesListenerKeys_ = null;
  }
  release() {
    this.canvas_ && (ur(this.canvas_.getContext("2d")), qi.push(this.canvas_), this.canvas_ = null), super.release();
  }
}
const sn = ba;
class Ma {
  constructor(e) {
    this.highWaterMark = e !== void 0 ? e : 2048, this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null;
  }
  canExpireCache() {
    return this.highWaterMark > 0 && this.getCount() > this.highWaterMark;
  }
  expireCache(e) {
    for (; this.canExpireCache(); )
      this.pop();
  }
  clear() {
    this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null;
  }
  containsKey(e) {
    return this.entries_.hasOwnProperty(e);
  }
  forEach(e) {
    let t = this.oldest_;
    for (; t; )
      e(t.value_, t.key_, this), t = t.newer;
  }
  get(e, t) {
    const n = this.entries_[e];
    return A(n !== void 0, 15), n === this.newest_ || (n === this.oldest_ ? (this.oldest_ = this.oldest_.newer, this.oldest_.older = null) : (n.newer.older = n.older, n.older.newer = n.newer), n.newer = null, n.older = this.newest_, this.newest_.newer = n, this.newest_ = n), n.value_;
  }
  remove(e) {
    const t = this.entries_[e];
    return A(t !== void 0, 15), t === this.newest_ ? (this.newest_ = t.older, this.newest_ && (this.newest_.newer = null)) : t === this.oldest_ ? (this.oldest_ = t.newer, this.oldest_ && (this.oldest_.older = null)) : (t.newer.older = t.older, t.older.newer = t.newer), delete this.entries_[e], --this.count_, t.value_;
  }
  getCount() {
    return this.count_;
  }
  getKeys() {
    const e = new Array(this.count_);
    let t = 0, n;
    for (n = this.newest_; n; n = n.older)
      e[t++] = n.key_;
    return e;
  }
  getValues() {
    const e = new Array(this.count_);
    let t = 0, n;
    for (n = this.newest_; n; n = n.older)
      e[t++] = n.value_;
    return e;
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
  peek(e) {
    if (!!this.containsKey(e))
      return this.entries_[e].value_;
  }
  pop() {
    const e = this.oldest_;
    return delete this.entries_[e.key_], e.newer && (e.newer.older = null), this.oldest_ = e.newer, this.oldest_ || (this.newest_ = null), --this.count_, e.value_;
  }
  replace(e, t) {
    this.get(e), this.entries_[e].value_ = t;
  }
  set(e, t) {
    A(!(e in this.entries_), 16);
    const n = {
      key_: e,
      newer: null,
      older: this.newest_,
      value_: t
    };
    this.newest_ ? this.newest_.newer = n : this.oldest_ = n, this.newest_ = n, this.entries_[e] = n, ++this.count_;
  }
  setSize(e) {
    this.highWaterMark = e;
  }
}
const Sa = Ma;
function fi(i, e, t, n) {
  return n !== void 0 ? (n[0] = i, n[1] = e, n[2] = t, n) : [i, e, t];
}
function Nt(i, e, t) {
  return i + "/" + e + "/" + t;
}
function Bi(i) {
  return Nt(i[0], i[1], i[2]);
}
function Oa(i) {
  return i.split("/").map(Number);
}
function Da(i) {
  return (i[1] << i[0]) + i[2];
}
function Fa(i, e) {
  const t = i[0], n = i[1], s = i[2];
  if (e.getMinZoom() > t || t > e.getMaxZoom())
    return !1;
  const r = e.getFullTileRange(t);
  return r ? r.containsXY(n, s) : !0;
}
class Na extends Sa {
  clear() {
    for (; this.getCount() > 0; )
      this.pop().release();
    super.clear();
  }
  expireCache(e) {
    for (; this.canExpireCache() && !(this.peekLast().getKey() in e); )
      this.pop().release();
  }
  pruneExceptNewestZ() {
    if (this.getCount() === 0)
      return;
    const e = this.peekFirstKey(), n = Oa(e)[0];
    this.forEach(
      function(s) {
        s.tileCoord[0] !== n && (this.remove(Bi(s.tileCoord)), s.release());
      }.bind(this)
    );
  }
}
const Qi = Na, Vt = {
  TILELOADSTART: "tileloadstart",
  TILELOADEND: "tileloadend",
  TILELOADERROR: "tileloaderror"
};
class Ga extends ce {
  constructor(e) {
    super(), this.projection = B(e.projection), this.attributions_ = _i(e.attributions), this.attributionsCollapsible_ = e.attributionsCollapsible !== void 0 ? e.attributionsCollapsible : !0, this.loading = !1, this.state_ = e.state !== void 0 ? e.state : "ready", this.wrapX_ = e.wrapX !== void 0 ? e.wrapX : !1, this.interpolate_ = !!e.interpolate, this.viewResolver = null, this.viewRejector = null;
    const t = this;
    this.viewPromise_ = new Promise(function(n, s) {
      t.viewResolver = n, t.viewRejector = s;
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
    return M();
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
  setAttributions(e) {
    this.attributions_ = _i(e), this.changed();
  }
  setState(e) {
    this.state_ = e, this.changed();
  }
}
function _i(i) {
  return i ? Array.isArray(i) ? function(e) {
    return i;
  } : typeof i == "function" ? i : function(e) {
    return [i];
  } : null;
}
const za = Ga;
class Ji {
  constructor(e, t, n, s) {
    this.minX = e, this.maxX = t, this.minY = n, this.maxY = s;
  }
  contains(e) {
    return this.containsXY(e[1], e[2]);
  }
  containsTileRange(e) {
    return this.minX <= e.minX && e.maxX <= this.maxX && this.minY <= e.minY && e.maxY <= this.maxY;
  }
  containsXY(e, t) {
    return this.minX <= e && e <= this.maxX && this.minY <= t && t <= this.maxY;
  }
  equals(e) {
    return this.minX == e.minX && this.minY == e.minY && this.maxX == e.maxX && this.maxY == e.maxY;
  }
  extend(e) {
    e.minX < this.minX && (this.minX = e.minX), e.maxX > this.maxX && (this.maxX = e.maxX), e.minY < this.minY && (this.minY = e.minY), e.maxY > this.maxY && (this.maxY = e.maxY);
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
  intersects(e) {
    return this.minX <= e.maxX && this.maxX >= e.minX && this.minY <= e.maxY && this.maxY >= e.minY;
  }
}
function Oe(i, e, t, n, s) {
  return s !== void 0 ? (s.minX = i, s.maxX = e, s.minY = t, s.maxY = n, s) : new Ji(i, e, t, n);
}
const es = Ji, Za = [0, 0, 0], fe = 5;
class Xa {
  constructor(e) {
    this.minZoom = e.minZoom !== void 0 ? e.minZoom : 0, this.resolutions_ = e.resolutions, A(
      ps(
        this.resolutions_,
        function(s, r) {
          return r - s;
        },
        !0
      ),
      17
    );
    let t;
    if (!e.origins) {
      for (let s = 0, r = this.resolutions_.length - 1; s < r; ++s)
        if (!t)
          t = this.resolutions_[s] / this.resolutions_[s + 1];
        else if (this.resolutions_[s] / this.resolutions_[s + 1] !== t) {
          t = void 0;
          break;
        }
    }
    this.zoomFactor_ = t, this.maxZoom = this.resolutions_.length - 1, this.origin_ = e.origin !== void 0 ? e.origin : null, this.origins_ = null, e.origins !== void 0 && (this.origins_ = e.origins, A(this.origins_.length == this.resolutions_.length, 20));
    const n = e.extent;
    n !== void 0 && !this.origin_ && !this.origins_ && (this.origin_ = Pe(n)), A(
      !this.origin_ && this.origins_ || this.origin_ && !this.origins_,
      18
    ), this.tileSizes_ = null, e.tileSizes !== void 0 && (this.tileSizes_ = e.tileSizes, A(this.tileSizes_.length == this.resolutions_.length, 19)), this.tileSize_ = e.tileSize !== void 0 ? e.tileSize : this.tileSizes_ ? null : yn, A(
      !this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_,
      22
    ), this.extent_ = n !== void 0 ? n : null, this.fullTileRanges_ = null, this.tmpSize_ = [0, 0], this.tmpExtent_ = [0, 0, 0, 0], e.sizes !== void 0 ? this.fullTileRanges_ = e.sizes.map(function(s, r) {
      const o = new es(
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
  forEachTileCoord(e, t, n) {
    const s = this.getTileRangeForExtentAndZ(e, t);
    for (let r = s.minX, o = s.maxX; r <= o; ++r)
      for (let a = s.minY, l = s.maxY; a <= l; ++a)
        n([t, r, a]);
  }
  forEachTileCoordParentTileRange(e, t, n, s) {
    let r, o, a, l = null, h = e[0] - 1;
    for (this.zoomFactor_ === 2 ? (o = e[1], a = e[2]) : l = this.getTileCoordExtent(e, s); h >= this.minZoom; ) {
      if (this.zoomFactor_ === 2 ? (o = Math.floor(o / 2), a = Math.floor(a / 2), r = Oe(o, o, a, a, n)) : r = this.getTileRangeForExtentAndZ(
        l,
        h,
        n
      ), t(h, r))
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
  getOrigin(e) {
    return this.origin_ ? this.origin_ : this.origins_[e];
  }
  getResolution(e) {
    return this.resolutions_[e];
  }
  getResolutions() {
    return this.resolutions_;
  }
  getTileCoordChildTileRange(e, t, n) {
    if (e[0] < this.maxZoom) {
      if (this.zoomFactor_ === 2) {
        const r = e[1] * 2, o = e[2] * 2;
        return Oe(
          r,
          r + 1,
          o,
          o + 1,
          t
        );
      }
      const s = this.getTileCoordExtent(
        e,
        n || this.tmpExtent_
      );
      return this.getTileRangeForExtentAndZ(
        s,
        e[0] + 1,
        t
      );
    }
    return null;
  }
  getTileRangeForTileCoordAndZ(e, t, n) {
    if (t > this.maxZoom || t < this.minZoom)
      return null;
    const s = e[0], r = e[1], o = e[2];
    if (t === s)
      return Oe(
        r,
        o,
        r,
        o,
        n
      );
    if (this.zoomFactor_) {
      const l = Math.pow(this.zoomFactor_, t - s), h = Math.floor(r * l), c = Math.floor(o * l);
      if (t < s)
        return Oe(h, h, c, c, n);
      const u = Math.floor(l * (r + 1)) - 1, d = Math.floor(l * (o + 1)) - 1;
      return Oe(h, u, c, d, n);
    }
    const a = this.getTileCoordExtent(e, this.tmpExtent_);
    return this.getTileRangeForExtentAndZ(a, t, n);
  }
  getTileRangeExtent(e, t, n) {
    const s = this.getOrigin(e), r = this.getResolution(e), o = le(this.getTileSize(e), this.tmpSize_), a = s[0] + t.minX * o[0] * r, l = s[0] + (t.maxX + 1) * o[0] * r, h = s[1] + t.minY * o[1] * r, c = s[1] + (t.maxY + 1) * o[1] * r;
    return Ue(a, h, l, c, n);
  }
  getTileRangeForExtentAndZ(e, t, n) {
    const s = Za;
    this.getTileCoordForXYAndZ_(e[0], e[3], t, !1, s);
    const r = s[1], o = s[2];
    return this.getTileCoordForXYAndZ_(e[2], e[1], t, !0, s), Oe(
      r,
      s[1],
      o,
      s[2],
      n
    );
  }
  getTileCoordCenter(e) {
    const t = this.getOrigin(e[0]), n = this.getResolution(e[0]), s = le(this.getTileSize(e[0]), this.tmpSize_);
    return [
      t[0] + (e[1] + 0.5) * s[0] * n,
      t[1] - (e[2] + 0.5) * s[1] * n
    ];
  }
  getTileCoordExtent(e, t) {
    const n = this.getOrigin(e[0]), s = this.getResolution(e[0]), r = le(this.getTileSize(e[0]), this.tmpSize_), o = n[0] + e[1] * r[0] * s, a = n[1] - (e[2] + 1) * r[1] * s, l = o + r[0] * s, h = a + r[1] * s;
    return Ue(o, a, l, h, t);
  }
  getTileCoordForCoordAndResolution(e, t, n) {
    return this.getTileCoordForXYAndResolution_(
      e[0],
      e[1],
      t,
      !1,
      n
    );
  }
  getTileCoordForXYAndResolution_(e, t, n, s, r) {
    const o = this.getZForResolution(n), a = n / this.getResolution(o), l = this.getOrigin(o), h = le(this.getTileSize(o), this.tmpSize_);
    let c = a * (e - l[0]) / n / h[0], u = a * (l[1] - t) / n / h[1];
    return s ? (c = ht(c, fe) - 1, u = ht(u, fe) - 1) : (c = lt(c, fe), u = lt(u, fe)), fi(o, c, u, r);
  }
  getTileCoordForXYAndZ_(e, t, n, s, r) {
    const o = this.getOrigin(n), a = this.getResolution(n), l = le(this.getTileSize(n), this.tmpSize_);
    let h = (e - o[0]) / a / l[0], c = (o[1] - t) / a / l[1];
    return s ? (h = ht(h, fe) - 1, c = ht(c, fe) - 1) : (h = lt(h, fe), c = lt(c, fe)), fi(n, h, c, r);
  }
  getTileCoordForCoordAndZ(e, t, n) {
    return this.getTileCoordForXYAndZ_(
      e[0],
      e[1],
      t,
      !1,
      n
    );
  }
  getTileCoordResolution(e) {
    return this.resolutions_[e[0]];
  }
  getTileSize(e) {
    return this.tileSize_ ? this.tileSize_ : this.tileSizes_[e];
  }
  getFullTileRange(e) {
    return this.fullTileRanges_ ? this.fullTileRanges_[e] : this.extent_ ? this.getTileRangeForExtentAndZ(this.extent_, e) : null;
  }
  getZForResolution(e, t) {
    const n = an(
      this.resolutions_,
      e,
      t || 0
    );
    return G(n, this.minZoom, this.maxZoom);
  }
  tileCoordIntersectsViewport(e, t) {
    return Xi(
      t,
      0,
      t.length,
      2,
      this.getTileCoordExtent(e)
    );
  }
  calculateTileRanges_(e) {
    const t = this.resolutions_.length, n = new Array(t);
    for (let s = this.minZoom; s < t; ++s)
      n[s] = this.getTileRangeForExtentAndZ(e, s);
    this.fullTileRanges_ = n;
  }
}
const ts = Xa;
function ns(i) {
  let e = i.getDefaultTileGrid();
  return e || (e = ja(i), i.setDefaultTileGrid(e)), e;
}
function Ka(i, e, t) {
  const n = e[0], s = i.getTileCoordCenter(e), r = An(t);
  if (cn(r, s))
    return e;
  {
    const o = N(r), a = Math.ceil(
      (r[0] - s[0]) / o
    );
    return s[0] += o * a, i.getTileCoordForCoordAndZ(s, n);
  }
}
function ka(i, e, t, n) {
  n = n !== void 0 ? n : "top-left";
  const s = is(i, e, t);
  return new ts({
    extent: i,
    origin: Ks(i, n),
    resolutions: s,
    tileSize: t
  });
}
function Ua(i) {
  const e = i || {}, t = e.extent || B("EPSG:3857").getExtent(), n = {
    extent: t,
    minZoom: e.minZoom,
    tileSize: e.tileSize,
    resolutions: is(
      t,
      e.maxZoom,
      e.tileSize,
      e.maxResolution
    )
  };
  return new ts(n);
}
function is(i, e, t, n) {
  e = e !== void 0 ? e : Ir, t = le(t !== void 0 ? t : yn);
  const s = ne(i), r = N(i);
  n = n > 0 ? n : Math.max(r / t[0], s / t[1]);
  const o = e + 1, a = new Array(o);
  for (let l = 0; l < o; ++l)
    a[l] = n / Math.pow(2, l);
  return a;
}
function ja(i, e, t, n) {
  const s = An(i);
  return ka(s, e, t, n);
}
function An(i) {
  i = B(i);
  let e = i.getExtent();
  if (!e) {
    const t = 180 * et.degrees / i.getMetersPerUnit();
    e = Ue(-t, -t, t, t);
  }
  return e;
}
class Ya extends za {
  constructor(e) {
    super({
      attributions: e.attributions,
      attributionsCollapsible: e.attributionsCollapsible,
      projection: e.projection,
      state: e.state,
      wrapX: e.wrapX,
      interpolate: e.interpolate
    }), this.on, this.once, this.un, this.opaque_ = e.opaque !== void 0 ? e.opaque : !1, this.tilePixelRatio_ = e.tilePixelRatio !== void 0 ? e.tilePixelRatio : 1, this.tileGrid = e.tileGrid !== void 0 ? e.tileGrid : null;
    const t = [256, 256];
    this.tileGrid && le(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()), t), this.tileCache = new Qi(e.cacheSize || 0), this.tmpSize = [0, 0], this.key_ = e.key || "", this.tileOptions = {
      transition: e.transition,
      interpolate: e.interpolate
    }, this.zDirection = e.zDirection ? e.zDirection : 0;
  }
  canExpireCache() {
    return this.tileCache.canExpireCache();
  }
  expireCache(e, t) {
    const n = this.getTileCacheForProjection(e);
    n && n.expireCache(t);
  }
  forEachLoadedTile(e, t, n, s) {
    const r = this.getTileCacheForProjection(e);
    if (!r)
      return !1;
    let o = !0, a, l, h;
    for (let c = n.minX; c <= n.maxX; ++c)
      for (let u = n.minY; u <= n.maxY; ++u)
        l = Nt(t, c, u), h = !1, r.containsKey(l) && (a = r.get(l), h = a.getState() === T.LOADED, h && (h = s(a) !== !1)), h || (o = !1);
    return o;
  }
  getGutterForProjection(e) {
    return 0;
  }
  getKey() {
    return this.key_;
  }
  setKey(e) {
    this.key_ !== e && (this.key_ = e, this.changed());
  }
  getOpaque(e) {
    return this.opaque_;
  }
  getResolutions() {
    return this.tileGrid ? this.tileGrid.getResolutions() : null;
  }
  getTile(e, t, n, s, r) {
    return M();
  }
  getTileGrid() {
    return this.tileGrid;
  }
  getTileGridForProjection(e) {
    return this.tileGrid ? this.tileGrid : ns(e);
  }
  getTileCacheForProjection(e) {
    const t = this.getProjection();
    return A(
      t === null || Fe(t, e),
      68
    ), this.tileCache;
  }
  getTilePixelRatio(e) {
    return this.tilePixelRatio_;
  }
  getTilePixelSize(e, t, n) {
    const s = this.getTileGridForProjection(n), r = this.getTilePixelRatio(t), o = le(s.getTileSize(e), this.tmpSize);
    return r == 1 ? o : _a(o, r, this.tmpSize);
  }
  getTileCoordForTileUrlFunction(e, t) {
    t = t !== void 0 ? t : this.getProjection();
    const n = this.getTileGridForProjection(t);
    return this.getWrapX() && t.isGlobal() && (e = Ka(n, e, t)), Fa(e, n) ? e : null;
  }
  clear() {
    this.tileCache.clear();
  }
  refresh() {
    this.clear(), super.refresh();
  }
  updateCacheSize(e, t) {
    const n = this.getTileCacheForProjection(t);
    e > n.highWaterMark && (n.highWaterMark = e);
  }
  useTile(e, t, n, s) {
  }
}
class Va extends Te {
  constructor(e, t) {
    super(e), this.tile = t;
  }
}
const Wa = Ya;
function Ha(i, e) {
  const t = /\{z\}/g, n = /\{x\}/g, s = /\{y\}/g, r = /\{-y\}/g;
  return function(o, a, l) {
    if (o)
      return i.replace(t, o[0].toString()).replace(n, o[1].toString()).replace(s, o[2].toString()).replace(r, function() {
        const h = o[0], c = e.getFullTileRange(h);
        return A(c, 55), (c.getHeight() - o[2] - 1).toString();
      });
  };
}
function $a(i, e) {
  const t = i.length, n = new Array(t);
  for (let s = 0; s < t; ++s)
    n[s] = Ha(i[s], e);
  return qa(n);
}
function qa(i) {
  return i.length === 1 ? i[0] : function(e, t, n) {
    if (e) {
      const s = Da(e), r = Ke(s, i.length);
      return i[r](e, t, n);
    } else
      return;
  };
}
function Ba(i) {
  const e = [];
  let t = /\{([a-z])-([a-z])\}/.exec(i);
  if (t) {
    const n = t[1].charCodeAt(0), s = t[2].charCodeAt(0);
    let r;
    for (r = n; r <= s; ++r)
      e.push(i.replace(t[0], String.fromCharCode(r)));
    return e;
  }
  if (t = /\{(\d+)-(\d+)\}/.exec(i), t) {
    const n = parseInt(t[2], 10);
    for (let s = parseInt(t[1], 10); s <= n; s++)
      e.push(i.replace(t[0], s.toString()));
    return e;
  }
  return e.push(i), e;
}
class bn extends Wa {
  constructor(e) {
    super({
      attributions: e.attributions,
      cacheSize: e.cacheSize,
      opaque: e.opaque,
      projection: e.projection,
      state: e.state,
      tileGrid: e.tileGrid,
      tilePixelRatio: e.tilePixelRatio,
      wrapX: e.wrapX,
      transition: e.transition,
      interpolate: e.interpolate,
      key: e.key,
      attributionsCollapsible: e.attributionsCollapsible,
      zDirection: e.zDirection
    }), this.generateTileUrlFunction_ = this.tileUrlFunction === bn.prototype.tileUrlFunction, this.tileLoadFunction = e.tileLoadFunction, e.tileUrlFunction && (this.tileUrlFunction = e.tileUrlFunction), this.urls = null, e.urls ? this.setUrls(e.urls) : e.url && this.setUrl(e.url), this.tileLoadingKeys_ = {};
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
  handleTileChange(e) {
    const t = e.target, n = j(t), s = t.getState();
    let r;
    s == T.LOADING ? (this.tileLoadingKeys_[n] = !0, r = Vt.TILELOADSTART) : n in this.tileLoadingKeys_ && (delete this.tileLoadingKeys_[n], r = s == T.ERROR ? Vt.TILELOADERROR : s == T.LOADED ? Vt.TILELOADEND : void 0), r != null && this.dispatchEvent(new Va(r, t));
  }
  setTileLoadFunction(e) {
    this.tileCache.clear(), this.tileLoadFunction = e, this.changed();
  }
  setTileUrlFunction(e, t) {
    this.tileUrlFunction = e, this.tileCache.pruneExceptNewestZ(), typeof t < "u" ? this.setKey(t) : this.changed();
  }
  setUrl(e) {
    const t = Ba(e);
    this.urls = t, this.setUrls(t);
  }
  setUrls(e) {
    this.urls = e;
    const t = e.join(`
`);
    this.generateTileUrlFunction_ ? this.setTileUrlFunction($a(e, this.tileGrid), t) : this.setKey(t);
  }
  tileUrlFunction(e, t, n) {
  }
  useTile(e, t, n) {
    const s = Nt(e, t, n);
    this.tileCache.containsKey(s) && this.tileCache.get(s);
  }
}
const Qa = bn;
class Ja extends Qa {
  constructor(e) {
    super({
      attributions: e.attributions,
      cacheSize: e.cacheSize,
      opaque: e.opaque,
      projection: e.projection,
      state: e.state,
      tileGrid: e.tileGrid,
      tileLoadFunction: e.tileLoadFunction ? e.tileLoadFunction : el,
      tilePixelRatio: e.tilePixelRatio,
      tileUrlFunction: e.tileUrlFunction,
      url: e.url,
      urls: e.urls,
      wrapX: e.wrapX,
      transition: e.transition,
      interpolate: e.interpolate !== void 0 ? e.interpolate : !0,
      key: e.key,
      attributionsCollapsible: e.attributionsCollapsible,
      zDirection: e.zDirection
    }), this.crossOrigin = e.crossOrigin !== void 0 ? e.crossOrigin : null, this.tileClass = e.tileClass !== void 0 ? e.tileClass : $i, this.tileCacheForProjection = {}, this.tileGridForProjection = {}, this.reprojectionErrorThreshold_ = e.reprojectionErrorThreshold, this.renderReprojectionEdges_ = !1;
  }
  canExpireCache() {
    if (this.tileCache.canExpireCache())
      return !0;
    for (const e in this.tileCacheForProjection)
      if (this.tileCacheForProjection[e].canExpireCache())
        return !0;
    return !1;
  }
  expireCache(e, t) {
    const n = this.getTileCacheForProjection(e);
    this.tileCache.expireCache(
      this.tileCache == n ? t : {}
    );
    for (const s in this.tileCacheForProjection) {
      const r = this.tileCacheForProjection[s];
      r.expireCache(r == n ? t : {});
    }
  }
  getGutterForProjection(e) {
    return this.getProjection() && e && !Fe(this.getProjection(), e) ? 0 : this.getGutter();
  }
  getGutter() {
    return 0;
  }
  getKey() {
    let e = super.getKey();
    return this.getInterpolate() || (e += ":disable-interpolation"), e;
  }
  getOpaque(e) {
    return this.getProjection() && e && !Fe(this.getProjection(), e) ? !1 : super.getOpaque(e);
  }
  getTileGridForProjection(e) {
    const t = this.getProjection();
    if (this.tileGrid && (!t || Fe(t, e)))
      return this.tileGrid;
    {
      const n = j(e);
      return n in this.tileGridForProjection || (this.tileGridForProjection[n] = ns(e)), this.tileGridForProjection[n];
    }
  }
  getTileCacheForProjection(e) {
    const t = this.getProjection();
    if (!t || Fe(t, e))
      return this.tileCache;
    {
      const n = j(e);
      return n in this.tileCacheForProjection || (this.tileCacheForProjection[n] = new Qi(
        this.tileCache.highWaterMark
      )), this.tileCacheForProjection[n];
    }
  }
  createTile_(e, t, n, s, r, o) {
    const a = [e, t, n], l = this.getTileCoordForTileUrlFunction(
      a,
      r
    ), h = l ? this.tileUrlFunction(l, s, r) : void 0, c = new this.tileClass(
      a,
      h !== void 0 ? T.IDLE : T.EMPTY,
      h !== void 0 ? h : "",
      this.crossOrigin,
      this.tileLoadFunction,
      this.tileOptions
    );
    return c.key = o, c.addEventListener(v.CHANGE, this.handleTileChange.bind(this)), c;
  }
  getTile(e, t, n, s, r) {
    const o = this.getProjection();
    if (!o || !r || Fe(o, r))
      return this.getTileInternal(
        e,
        t,
        n,
        s,
        o || r
      );
    {
      const a = this.getTileCacheForProjection(r), l = [e, t, n];
      let h;
      const c = Bi(l);
      a.containsKey(c) && (h = a.get(c));
      const u = this.getKey();
      if (h && h.key == u)
        return h;
      {
        const d = this.getTileGridForProjection(o), g = this.getTileGridForProjection(r), f = this.getTileCoordForTileUrlFunction(
          l,
          r
        ), _ = new sn(
          o,
          d,
          r,
          g,
          l,
          f,
          this.getTilePixelRatio(s),
          this.getGutter(),
          function(p, C, y, E) {
            return this.getTileInternal(p, C, y, E, o);
          }.bind(this),
          this.reprojectionErrorThreshold_,
          this.renderReprojectionEdges_,
          this.getInterpolate()
        );
        return _.key = u, h ? (_.interimTile = h, _.refreshInterimChain(), a.replace(c, _)) : a.set(c, _), _;
      }
    }
  }
  getTileInternal(e, t, n, s, r) {
    let o = null;
    const a = Nt(e, t, n), l = this.getKey();
    if (!this.tileCache.containsKey(a))
      o = this.createTile_(e, t, n, s, r, l), this.tileCache.set(a, o);
    else if (o = this.tileCache.get(a), o.key != l) {
      const h = o;
      o = this.createTile_(e, t, n, s, r, l), h.getState() == T.IDLE ? o.interimTile = h.interimTile : o.interimTile = h, o.refreshInterimChain(), this.tileCache.replace(a, o);
    }
    return o;
  }
  setRenderReprojectionEdges(e) {
    if (this.renderReprojectionEdges_ != e) {
      this.renderReprojectionEdges_ = e;
      for (const t in this.tileCacheForProjection)
        this.tileCacheForProjection[t].clear();
      this.changed();
    }
  }
  setTileGridForProjection(e, t) {
    const n = B(e);
    if (n) {
      const s = j(n);
      s in this.tileGridForProjection || (this.tileGridForProjection[s] = t);
    }
  }
  clear() {
    super.clear();
    for (const e in this.tileCacheForProjection)
      this.tileCacheForProjection[e].clear();
  }
}
function el(i, e) {
  i.getImage().src = e;
}
const tl = Ja;
class nl extends tl {
  constructor(e) {
    e = e || {};
    const t = e.projection !== void 0 ? e.projection : "EPSG:3857", n = e.tileGrid !== void 0 ? e.tileGrid : Ua({
      extent: An(t),
      maxResolution: e.maxResolution,
      maxZoom: e.maxZoom,
      minZoom: e.minZoom,
      tileSize: e.tileSize
    });
    super({
      attributions: e.attributions,
      cacheSize: e.cacheSize,
      crossOrigin: e.crossOrigin,
      interpolate: e.interpolate,
      opaque: e.opaque,
      projection: t,
      reprojectionErrorThreshold: e.reprojectionErrorThreshold,
      tileGrid: n,
      tileLoadFunction: e.tileLoadFunction,
      tilePixelRatio: e.tilePixelRatio,
      tileUrlFunction: e.tileUrlFunction,
      url: e.url,
      urls: e.urls,
      wrapX: e.wrapX !== void 0 ? e.wrapX : !0,
      transition: e.transition,
      attributionsCollapsible: e.attributionsCollapsible,
      zDirection: e.zDirection
    }), this.gutter_ = e.gutter !== void 0 ? e.gutter : 0;
  }
  getGutter() {
    return this.gutter_;
  }
}
const il = nl, sl = '&#169; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.';
class rl extends il {
  constructor(e) {
    e = e || {};
    let t;
    e.attributions !== void 0 ? t = e.attributions : t = [sl];
    const n = e.crossOrigin !== void 0 ? e.crossOrigin : "anonymous", s = e.url !== void 0 ? e.url : "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    super({
      attributions: t,
      attributionsCollapsible: !1,
      cacheSize: e.cacheSize,
      crossOrigin: n,
      interpolate: e.interpolate,
      maxZoom: e.maxZoom !== void 0 ? e.maxZoom : 19,
      opaque: e.opaque !== void 0 ? e.opaque : !0,
      reprojectionErrorThreshold: e.reprojectionErrorThreshold,
      tileLoadFunction: e.tileLoadFunction,
      transition: e.transition,
      url: s,
      wrapX: e.wrapX,
      zDirection: e.zDirection
    });
  }
}
const ol = rl, ft = {
  PRELOAD: "preload",
  USE_INTERIM_TILES_ON_ERROR: "useInterimTilesOnError"
};
class al extends gn {
  constructor(e) {
    e = e || {};
    const t = Object.assign({}, e);
    delete t.preload, delete t.useInterimTilesOnError, super(t), this.on, this.once, this.un, this.setPreload(e.preload !== void 0 ? e.preload : 0), this.setUseInterimTilesOnError(
      e.useInterimTilesOnError !== void 0 ? e.useInterimTilesOnError : !0
    );
  }
  getPreload() {
    return this.get(ft.PRELOAD);
  }
  setPreload(e) {
    this.set(ft.PRELOAD, e);
  }
  getUseInterimTilesOnError() {
    return this.get(ft.USE_INTERIM_TILES_ON_ERROR);
  }
  setUseInterimTilesOnError(e) {
    this.set(ft.USE_INTERIM_TILES_ON_ERROR, e);
  }
  getData(e) {
    return super.getData(e);
  }
}
const ll = al;
class hl extends mi {
  constructor(e) {
    super(), this.ready = !0, this.boundHandleImageChange_ = this.handleImageChange_.bind(this), this.layer_ = e, this.declutterExecutorGroup = null;
  }
  getFeatures(e) {
    return M();
  }
  getData(e) {
    return null;
  }
  prepareFrame(e) {
    return M();
  }
  renderFrame(e, t) {
    return M();
  }
  loadedTileCallback(e, t, n) {
    e[t] || (e[t] = {}), e[t][n.tileCoord.toString()] = n;
  }
  createLoadedTileFinder(e, t, n) {
    return function(s, r) {
      const o = this.loadedTileCallback.bind(this, n, s);
      return e.forEachLoadedTile(t, s, r, o);
    }.bind(this);
  }
  forEachFeatureAtCoordinate(e, t, n, s, r) {
  }
  getLayer() {
    return this.layer_;
  }
  handleFontsChanged() {
  }
  handleImageChange_(e) {
    e.target.getState() === He.LOADED && this.renderIfReadyAndVisible();
  }
  loadImage(e) {
    let t = e.getState();
    return t != He.LOADED && t != He.ERROR && e.addEventListener(v.CHANGE, this.boundHandleImageChange_), t == He.IDLE && (e.load(), t = e.getState()), t == He.LOADED;
  }
  renderIfReadyAndVisible() {
    const e = this.getLayer();
    e && e.getVisible() && e.getSourceState() === "ready" && e.changed();
  }
  disposeInternal() {
    delete this.layer_, super.disposeInternal();
  }
}
const cl = hl;
let Ne = null;
function ul() {
  const i = document.createElement("canvas");
  i.width = 1, i.height = 1, Ne = i.getContext("2d");
}
class dl extends cl {
  constructor(e) {
    super(e), this.container = null, this.renderedResolution, this.tempTransform = Ze(), this.pixelTransform = Ze(), this.inversePixelTransform = Ze(), this.context = null, this.containerReused = !1, this.pixelContext_ = null, this.frameState = null;
  }
  getImageData(e, t, n) {
    Ne || ul(), Ne.clearRect(0, 0, 1, 1);
    let s;
    try {
      Ne.drawImage(e, t, n, 1, 1, 0, 0, 1, 1), s = Ne.getImageData(0, 0, 1, 1).data;
    } catch {
      return Ne = null, null;
    }
    return s;
  }
  getBackground(e) {
    let n = this.getLayer().getBackground();
    return typeof n == "function" && (n = n(e.viewState.resolution)), n || void 0;
  }
  useContainer(e, t, n) {
    const s = this.getLayer().getClassName();
    let r, o;
    if (e && e.className === s && (!n || e && e.style.backgroundColor && ln(
      Un(e.style.backgroundColor),
      Un(n)
    ))) {
      const a = e.firstElementChild;
      a instanceof HTMLCanvasElement && (o = a.getContext("2d"));
    }
    if (o && o.canvas.style.transform === t ? (this.container = e, this.context = o, this.containerReused = !0) : this.containerReused && (this.container = null, this.context = null, this.containerReused = !1), !this.container) {
      r = document.createElement("div"), r.className = s;
      let a = r.style;
      a.position = "absolute", a.width = "100%", a.height = "100%", o = Ct();
      const l = o.canvas;
      r.appendChild(l), a = l.style, a.position = "absolute", a.left = "0", a.transformOrigin = "top left", this.container = r, this.context = o;
    }
    !this.containerReused && n && !this.container.style.backgroundColor && (this.container.style.backgroundColor = n);
  }
  clipUnrotated(e, t, n) {
    const s = Pe(n), r = St(n), o = Mt(n), a = bt(n);
    W(t.coordinateToPixelTransform, s), W(t.coordinateToPixelTransform, r), W(t.coordinateToPixelTransform, o), W(t.coordinateToPixelTransform, a);
    const l = this.inversePixelTransform;
    W(l, s), W(l, r), W(l, o), W(l, a), e.save(), e.beginPath(), e.moveTo(Math.round(s[0]), Math.round(s[1])), e.lineTo(Math.round(r[0]), Math.round(r[1])), e.lineTo(Math.round(o[0]), Math.round(o[1])), e.lineTo(Math.round(a[0]), Math.round(a[1])), e.clip();
  }
  dispatchRenderEvent_(e, t, n) {
    const s = this.getLayer();
    if (s.hasListener(e)) {
      const r = new Ai(
        e,
        this.inversePixelTransform,
        n,
        t
      );
      s.dispatchEvent(r);
    }
  }
  preRender(e, t) {
    this.frameState = t, this.dispatchRenderEvent_(Ee.PRERENDER, e, t);
  }
  postRender(e, t) {
    this.dispatchRenderEvent_(Ee.POSTRENDER, e, t);
  }
  getRenderTransform(e, t, n, s, r, o, a) {
    const l = r / 2, h = o / 2, c = s / t, u = -c, d = -e[0] + a, g = -e[1];
    return Qe(
      this.tempTransform,
      l,
      h,
      c,
      u,
      -n,
      d,
      g
    );
  }
  disposeInternal() {
    delete this.frameState, super.disposeInternal();
  }
}
const gl = dl;
class fl extends gl {
  constructor(e) {
    super(e), this.extentChanged = !0, this.renderedExtent_ = null, this.renderedPixelRatio, this.renderedProjection = null, this.renderedRevision, this.renderedTiles = [], this.newTiles_ = !1, this.tmpExtent = Ie(), this.tmpTileRange_ = new es(0, 0, 0, 0);
  }
  isDrawableTile(e) {
    const t = this.getLayer(), n = e.getState(), s = t.getUseInterimTilesOnError();
    return n == T.LOADED || n == T.EMPTY || n == T.ERROR && !s;
  }
  getTile(e, t, n, s) {
    const r = s.pixelRatio, o = s.viewState.projection, a = this.getLayer();
    let h = a.getSource().getTile(e, t, n, r, o);
    return h.getState() == T.ERROR && a.getUseInterimTilesOnError() && a.getPreload() > 0 && (this.newTiles_ = !0), this.isDrawableTile(h) || (h = h.getInterimTile()), h;
  }
  getData(e) {
    const t = this.frameState;
    if (!t)
      return null;
    const n = this.getLayer(), s = W(
      t.pixelToCoordinateTransform,
      e.slice()
    ), r = n.getExtent();
    if (r && !cn(r, s))
      return null;
    const o = t.pixelRatio, a = t.viewState.projection, l = t.viewState, h = n.getRenderSource(), c = h.getTileGridForProjection(l.projection), u = h.getTilePixelRatio(t.pixelRatio);
    for (let d = c.getZForResolution(l.resolution); d >= c.getMinZoom(); --d) {
      const g = c.getTileCoordForCoordAndZ(s, d), f = h.getTile(
        d,
        g[1],
        g[2],
        o,
        a
      );
      if (!(f instanceof $i || f instanceof sn) || f instanceof sn && f.getState() === T.EMPTY)
        return null;
      if (f.getState() !== T.LOADED)
        continue;
      const _ = c.getOrigin(d), p = le(c.getTileSize(d)), C = c.getResolution(d), y = Math.floor(
        u * ((s[0] - _[0]) / C - g[1] * p[0])
      ), E = Math.floor(
        u * ((_[1] - s[1]) / C - g[2] * p[1])
      ), m = Math.round(
        u * h.getGutterForProjection(l.projection)
      );
      return this.getImageData(f.getImage(), y + m, E + m);
    }
    return null;
  }
  loadedTileCallback(e, t, n) {
    return this.isDrawableTile(n) ? super.loadedTileCallback(e, t, n) : !1;
  }
  prepareFrame(e) {
    return !!this.getLayer().getSource();
  }
  renderFrame(e, t) {
    const n = e.layerStatesArray[e.layerIndex], s = e.viewState, r = s.projection, o = s.resolution, a = s.center, l = s.rotation, h = e.pixelRatio, c = this.getLayer(), u = c.getSource(), d = u.getRevision(), g = u.getTileGridForProjection(r), f = g.getZForResolution(o, u.zDirection), _ = g.getResolution(f);
    let p = e.extent;
    const C = e.viewState.resolution, y = u.getTilePixelRatio(h), E = Math.round(N(p) / C * h), m = Math.round(ne(p) / C * h), R = n.extent && ze(n.extent);
    R && (p = $e(
      p,
      ze(n.extent)
    ));
    const P = _ * E / 2 / y, w = _ * m / 2 / y, b = [
      a[0] - P,
      a[1] - w,
      a[0] + P,
      a[1] + w
    ], z = g.getTileRangeForExtentAndZ(p, f), K = {};
    K[f] = {};
    const Q = this.createLoadedTileFinder(
      u,
      r,
      K
    ), ue = this.tmpExtent, de = this.tmpTileRange_;
    this.newTiles_ = !1;
    const Ye = l ? qt(
      s.center,
      C,
      l,
      e.size
    ) : void 0;
    for (let te = z.minX; te <= z.maxX; ++te)
      for (let F = z.minY; F <= z.maxY; ++F) {
        if (l && !g.tileCoordIntersectsViewport([f, te, F], Ye))
          continue;
        const D = this.getTile(f, te, F, e);
        if (this.isDrawableTile(D)) {
          const U = j(this);
          if (D.getState() == T.LOADED) {
            K[f][D.tileCoord.toString()] = D;
            let Ae = D.inTransition(U);
            Ae && n.opacity !== 1 && (D.endTransition(U), Ae = !1), !this.newTiles_ && (Ae || !this.renderedTiles.includes(D)) && (this.newTiles_ = !0);
          }
          if (D.getAlpha(U, e.time) === 1)
            continue;
        }
        const Le = g.getTileCoordChildTileRange(
          D.tileCoord,
          de,
          ue
        );
        let ge = !1;
        Le && (ge = Q(f + 1, Le)), ge || g.forEachTileCoordParentTileRange(
          D.tileCoord,
          Q,
          de,
          ue
        );
      }
    const J = _ / o * h / y;
    Qe(
      this.pixelTransform,
      e.size[0] / 2,
      e.size[1] / 2,
      1 / h,
      1 / h,
      l,
      -E / 2,
      -m / 2
    );
    const ie = Ds(this.pixelTransform);
    this.useContainer(t, ie, this.getBackground(e));
    const L = this.context, Y = L.canvas;
    Ti(this.inversePixelTransform, this.pixelTransform), Qe(
      this.tempTransform,
      E / 2,
      m / 2,
      J,
      J,
      0,
      -E / 2,
      -m / 2
    ), Y.width != E || Y.height != m ? (Y.width = E, Y.height = m) : this.containerReused || L.clearRect(0, 0, E, m), R && this.clipUnrotated(L, e, R), u.getInterpolate() || (L.imageSmoothingEnabled = !1), this.preRender(L, e), this.renderedTiles.length = 0;
    let se = Object.keys(K).map(Number);
    se.sort(on);
    let ee, Re, k;
    n.opacity === 1 && (!this.containerReused || u.getOpaque(e.viewState.projection)) ? se = se.reverse() : (ee = [], Re = []);
    for (let te = se.length - 1; te >= 0; --te) {
      const F = se[te], D = u.getTilePixelSize(
        F,
        h,
        r
      ), ge = g.getResolution(F) / _, U = D[0] * ge * J, Ae = D[1] * ge * J, Gt = g.getTileCoordForCoordAndZ(
        Pe(b),
        F
      ), Mn = g.getTileCoordExtent(Gt), rt = W(this.tempTransform, [
        y * (Mn[0] - b[0]) / _,
        y * (b[3] - Mn[3]) / _
      ]), rs = y * u.getGutterForProjection(r), Sn = K[F];
      for (const os in Sn) {
        const be = Sn[os], On = be.tileCoord, Dn = Gt[1] - On[1], as = Math.round(rt[0] - (Dn - 1) * U), Fn = Gt[2] - On[2], ls = Math.round(rt[1] - (Fn - 1) * Ae), re = Math.round(rt[0] - Dn * U), oe = Math.round(rt[1] - Fn * Ae), Ve = as - re, We = ls - oe, Nn = f === F, Gn = Nn && be.getAlpha(j(this), e.time) !== 1;
        let zt = !1;
        if (!Gn)
          if (ee) {
            k = [re, oe, re + Ve, oe, re + Ve, oe + We, re, oe + We];
            for (let ot = 0, hs = ee.length; ot < hs; ++ot)
              if (f !== F && F < Re[ot]) {
                const V = ee[ot];
                Ot(
                  [re, oe, re + Ve, oe + We],
                  [V[0], V[3], V[4], V[7]]
                ) && (zt || (L.save(), zt = !0), L.beginPath(), L.moveTo(k[0], k[1]), L.lineTo(k[2], k[3]), L.lineTo(k[4], k[5]), L.lineTo(k[6], k[7]), L.moveTo(V[6], V[7]), L.lineTo(V[4], V[5]), L.lineTo(V[2], V[3]), L.lineTo(V[0], V[1]), L.clip());
              }
            ee.push(k), Re.push(F);
          } else
            L.clearRect(re, oe, Ve, We);
        this.drawTileImage(
          be,
          e,
          re,
          oe,
          Ve,
          We,
          rs,
          Nn
        ), ee && !Gn ? (zt && L.restore(), this.renderedTiles.unshift(be)) : this.renderedTiles.push(be), this.updateUsedTiles(e.usedTiles, u, be);
      }
    }
    return this.renderedRevision = d, this.renderedResolution = _, this.extentChanged = !this.renderedExtent_ || !Wt(this.renderedExtent_, b), this.renderedExtent_ = b, this.renderedPixelRatio = h, this.renderedProjection = r, this.manageTilePyramid(
      e,
      u,
      g,
      h,
      r,
      p,
      f,
      c.getPreload()
    ), this.scheduleExpireCache(e, u), this.postRender(L, e), n.extent && L.restore(), L.imageSmoothingEnabled = !0, ie !== Y.style.transform && (Y.style.transform = ie), this.container;
  }
  drawTileImage(e, t, n, s, r, o, a, l) {
    const h = this.getTileImage(e);
    if (!h)
      return;
    const c = j(this), u = t.layerStatesArray[t.layerIndex], d = u.opacity * (l ? e.getAlpha(c, t.time) : 1), g = d !== this.context.globalAlpha;
    g && (this.context.save(), this.context.globalAlpha = d), this.context.drawImage(
      h,
      a,
      a,
      h.width - 2 * a,
      h.height - 2 * a,
      n,
      s,
      r,
      o
    ), g && this.context.restore(), d !== u.opacity ? t.animate = !0 : l && e.endTransition(c);
  }
  getImage() {
    const e = this.context;
    return e ? e.canvas : null;
  }
  getTileImage(e) {
    return e.getImage();
  }
  scheduleExpireCache(e, t) {
    if (t.canExpireCache()) {
      const n = function(s, r, o) {
        const a = j(s);
        a in o.usedTiles && s.expireCache(
          o.viewState.projection,
          o.usedTiles[a]
        );
      }.bind(null, t);
      e.postRenderFunctions.push(
        n
      );
    }
  }
  updateUsedTiles(e, t, n) {
    const s = j(t);
    s in e || (e[s] = {}), e[s][n.getKey()] = !0;
  }
  manageTilePyramid(e, t, n, s, r, o, a, l, h) {
    const c = j(t);
    c in e.wantedTiles || (e.wantedTiles[c] = {});
    const u = e.wantedTiles[c], d = e.tileQueue, g = n.getMinZoom(), f = e.viewState.rotation, _ = f ? qt(
      e.viewState.center,
      e.viewState.resolution,
      f,
      e.size
    ) : void 0;
    let p = 0, C, y, E, m, R, P;
    for (P = g; P <= a; ++P)
      for (y = n.getTileRangeForExtentAndZ(o, P, y), E = n.getResolution(P), m = y.minX; m <= y.maxX; ++m)
        for (R = y.minY; R <= y.maxY; ++R)
          f && !n.tileCoordIntersectsViewport([P, m, R], _) || (a - P <= l ? (++p, C = t.getTile(P, m, R, s, r), C.getState() == T.IDLE && (u[C.getKey()] = !0, d.isKeyQueued(C.getKey()) || d.enqueue([
            C,
            c,
            n.getTileCoordCenter(C.tileCoord),
            E
          ])), h !== void 0 && h(C)) : t.useTile(P, m, R, r));
    t.updateCacheSize(p, r);
  }
}
const _l = fl;
class ml extends ll {
  constructor(e) {
    super(e);
  }
  createRenderer() {
    return new _l(this);
  }
}
const yl = ml;
var pl = Object.defineProperty, El = Object.getOwnPropertyDescriptor, ss = (i, e, t, n) => {
  for (var s = n > 1 ? void 0 : n ? El(e, t) : e, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(e, t, s) : o(s)) || s);
  return n && s && pl(e, t, s), s;
};
let wt = class extends us {
  constructor() {
    super();
  }
  firstUpdated() {
    new pa({
      target: this.mapElement,
      layers: [
        new yl({
          source: new ol()
        })
      ],
      view: new pe({
        center: [0, 0],
        zoom: 2
      })
    });
  }
  render() {
    return ds`
      <link rel="stylesheet" href="../node_modules/ol/ol.css" />
      <div id="map"></div>
    `;
  }
};
wt.styles = cs`
    html,
    body {
      margin: 0;
      height: 100%;
    }

    #map {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
    }
  `;
ss([
  gs("div")
], wt.prototype, "mapElement", 2);
wt = ss([
  fs("openlayers-element")
], wt);
export {
  wt as OpenLayersElement
};
