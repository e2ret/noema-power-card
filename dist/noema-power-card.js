/* ============================================================
 * Noema Power Card — v1.1.0 (International Edition)
 * Universal Lovelace card constructor: LED bars & buttons.
 * Zero dependencies. GUI configuration.
 *
 * v1.1.0:
 *  - Full i18n via Home Assistant language (en / ru)
 *  - All UI strings extracted (editor, status, dialogs)
 *  - Automatic language detection from hass.locale / hass.language
 *
 * https://github.com/e2ret/noema-power-card
 * ============================================================ */

const NPC_VERSION = "1.1.0";
const NPC_SEGMENTS = 40;

console.info(
  `%c NOEMA-POWER-CARD %c v${NPC_VERSION} `,
  "color: white; background: #0A6847; font-weight: 700;",
  "color: #0A6847; background: white; font-weight: 700;"
);

/* ------------------------------------------------------------------ */
/*  Translations (embedded for single-file HACS distribution)         */
/* ------------------------------------------------------------------ */

const NPC_TRANSLATIONS = {
  en: {
    "card.name": "Noema Power Card",
    "card.description": "Constructor: LED bars and buttons for any devices",
    "status.no_data": "No data",
    "status.charging": "Charging from AC",
    "status.battery": "Running on battery",
    "status.watts": "W",
    "dialog.confirm": "Execute «{name}»?",
    "dialog.confirm_generic": "Execute?",
    "dialog.yes": "Yes",
    "dialog.no": "No",
    "editor.title": "Card title",
    "editor.image": "Image (/local/...)",
    "editor.graph_entity_1": "Graph 1 behind hero",
    "editor.graph_entity_2": "Graph 2 behind hero",
    "editor.graph_hours": "Period, hours",
    "editor.background": "Card background",
    "editor.background_color": "Background color (for “Custom color” mode)",
    "editor.background_transparent": "Transparent (default)",
    "editor.background_color_option": "Custom color",
    "editor.sensors": "Sensors",
    "editor.buttons": "Buttons",
    "editor.controls": "Controls",
    "editor.add_sensor": "＋ Add sensor",
    "editor.add_divider": "＋ Divider",
    "editor.add_button": "＋ Add button",
    "editor.add_control": "＋ Add control",
    "editor.delete": "✕ Delete",
    "editor.move_up": "↑",
    "editor.move_down": "↓",
    "editor.sensor": "Sensor",
    "editor.button": "Button",
    "editor.control": "Control",
    "editor.divider": "Divider",
    "editor.divider_named": "— Divider: {name}",
    "editor.entity": "Entity",
    "editor.name": "Name",
    "editor.unit": "Unit of measurement",
    "editor.color": "Bar color",
    "editor.min": "Scale minimum",
    "editor.max": "Scale maximum",
    "editor.decimals": "Decimal places",
    "editor.flow_in": "Input sensor, W (for ball pulse)",
    "editor.flow_out": "Output sensor, W (for ball pulse)",
    "editor.style": "Display style",
    "editor.style_bar": "Bar (LED segments)",
    "editor.style_liquid": "Liquid (tank with waves)",
    "editor.wide": "Full width (single column)",
    "editor.invert": "Invert: gradient and spark direction",
    "editor.animate": "Running spark when active (on by default)",
    "editor.btn_color": "Button color",
    "editor.btn_color_cyan": "Cyan (default)",
    "editor.btn_color_red": "Red (dangerous action)",
    "editor.btn_color_yellow": "Yellow (caution)",
    "editor.btn_color_green": "Green (safe)",
    "editor.btn_color_blue": "Blue (info)",
    "editor.button_type": "Type: Toggle or Push",
    "editor.button_type_toggle": "Toggle (switch)",
    "editor.button_type_push": "Push (button)",
    "editor.confirm": "Ask for confirmation",
    "editor.step": "Control step",
    "editor.color_level": "Gradient red→green",
    "editor.color_heat": "Gradient green→red",
    "editor.color_good": "Green",
    "editor.color_warn": "Yellow",
    "editor.color_bad": "Red",
    "editor.color_info": "Blue",
  },
  ru: {
    "card.name": "Noema Power Card",
    "card.description": "Конструктор: LED-бары и кнопки для любых устройств",
    "status.no_data": "нет данных",
    "status.charging": "Зарядка от сети",
    "status.battery": "Работа от аккумулятора",
    "status.watts": "Вт",
    "dialog.confirm": "Выполнить «{name}»?",
    "dialog.confirm_generic": "Выполнить?",
    "dialog.yes": "Да",
    "dialog.no": "Нет",
    "editor.title": "Название карточки",
    "editor.image": "Картинка (/local/...)",
    "editor.graph_entity_1": "График 1 за hero-блоком",
    "editor.graph_entity_2": "График 2 за hero-блоком",
    "editor.graph_hours": "Период, часов",
    "editor.background": "Фон карточки",
    "editor.background_color": "Цвет фона (для режима «Свой цвет»)",
    "editor.background_transparent": "Прозрачный (по умолчанию)",
    "editor.background_color_option": "Свой цвет",
    "editor.sensors": "Сенсоры",
    "editor.buttons": "Кнопки",
    "editor.controls": "Регуляторы",
    "editor.add_sensor": "＋ Добавить сенсор",
    "editor.add_divider": "＋ Разделитель",
    "editor.add_button": "＋ Добавить кнопку",
    "editor.add_control": "＋ Добавить регулятор",
    "editor.delete": "✕ Удалить",
    "editor.move_up": "↑",
    "editor.move_down": "↓",
    "editor.sensor": "Сенсор",
    "editor.button": "Кнопка",
    "editor.control": "Регулятор",
    "editor.divider": "Разделитель",
    "editor.divider_named": "— Разделитель: {name}",
    "editor.entity": "Сущность",
    "editor.name": "Название",
    "editor.unit": "Единица измерения",
    "editor.color": "Цвет полосы",
    "editor.min": "Минимум шкалы",
    "editor.max": "Максимум шкалы",
    "editor.decimals": "Знаков после запятой",
    "editor.flow_in": "Сенсор входа, Вт (для пульса шара)",
    "editor.flow_out": "Сенсор выхода, Вт (для пульса шара)",
    "editor.style": "Вид отображения",
    "editor.style_bar": "Полоса (LED-сегменты)",
    "editor.style_liquid": "Жидкость (бак с волнами)",
    "editor.wide": "На всю ширину (одна колонка)",
    "editor.invert": "Инверсия: градиент и направление искры",
    "editor.animate": "Бегущая искра при активности (по умолчанию вкл)",
    "editor.btn_color": "Цвет кнопки",
    "editor.btn_color_cyan": "Голубой (по умолчанию)",
    "editor.btn_color_red": "Красный (опасное действие)",
    "editor.btn_color_yellow": "Жёлтый (осторожно)",
    "editor.btn_color_green": "Зелёный (безопасное)",
    "editor.btn_color_blue": "Синий (информация)",
    "editor.button_type": "Тип: Тумблер или Кнопка",
    "editor.button_type_toggle": "Тумблер (switch)",
    "editor.button_type_push": "Кнопка (button)",
    "editor.confirm": "Спрашивать подтверждение",
    "editor.step": "Шаг регулятора",
    "editor.color_level": "Градиент красный→зелёный",
    "editor.color_heat": "Градиент зелёный→красный",
    "editor.color_good": "Зелёный",
    "editor.color_warn": "Жёлтый",
    "editor.color_bad": "Красный",
    "editor.color_info": "Синий",
  },
};

/**
 * Resolve language from Home Assistant hass object.
 * Falls back to "en".
 */
function npcLang(hass) {
  if (!hass) return "en";
  const lang =
    (hass.locale && hass.locale.language) ||
    hass.language ||
    (hass.user && hass.user.language) ||
    "en";
  const short = String(lang).toLowerCase().split("-")[0];
  return NPC_TRANSLATIONS[short] ? short : "en";
}

/**
 * Translate a key. Supports simple {placeholder} substitution.
 * Usage: this.t("status.charging") or this.t("dialog.confirm", { name: "Foo" })
 */
function npcT(hass, key, vars) {
  const dict = NPC_TRANSLATIONS[npcLang(hass)] || NPC_TRANSLATIONS.en;
  let str = dict[key] ?? NPC_TRANSLATIONS.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return str;
}

/* ------------------------------------------------------------------ */
/*  Color utilities (unchanged)                                       */
/* ------------------------------------------------------------------ */

function npcLerp(stops, t) {
  t = Math.max(0, Math.min(1, t));
  let a = stops[0],
    b = stops[stops.length - 1];
  for (let k = 0; k < stops.length - 1; k++) {
    if (t >= stops[k][0] && t <= stops[k + 1][0]) {
      a = stops[k];
      b = stops[k + 1];
      break;
    }
  }
  const f = b[0] === a[0] ? 0 : (t - a[0]) / (b[0] - a[0]);
  const c = a[1].map((v, j) => Math.round(v + (b[1][j] - v) * f));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

const NPC_STOPS = {
  level: [
    [0.0, [224, 72, 62]],
    [0.35, [240, 140, 46]],
    [0.6, [243, 212, 59]],
    [0.85, [79, 201, 91]],
    [1.0, [79, 201, 91]],
  ],
  heat: [
    [0.0, [79, 201, 91]],
    [0.5, [79, 201, 91]],
    [0.72, [243, 212, 59]],
    [1.0, [224, 72, 62]],
  ],
};

function npcAlpha(c, a) {
  if (c.startsWith("rgb(")) return c.replace("rgb(", "rgba(").replace(")", `,${a})`);
  if (c.startsWith("#") && c.length === 7) {
    const r = parseInt(c.slice(1, 3), 16),
      g = parseInt(c.slice(3, 5), 16),
      b = parseInt(c.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  }
  return c;
}

const NPC_PALETTES = {
  level: (i, n) => npcLerp(NPC_STOPS.level, i / (n - 1)),
  heat: (i, n) => npcLerp(NPC_STOPS.heat, i / (n - 1)),
  good: () => "#4fc95b",
  warn: () => "#f0a92e",
  bad: () => "#e0483e",
  info: () => "#3b9df3",
};

/* ------------------------------------------------------------------ */
/*  Card                                                                */
/* ------------------------------------------------------------------ */

class NoemaPowerCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement("noema-power-card-editor");
  }

  static getStubConfig() {
    return { title: "EcoFlow", sensors: [], buttons: [] };
  }

  setConfig(config) {
    this._config = {
      title: "",
      sensors: [],
      buttons: [],
      controls: [],
      ...config,
    };
    this._built = false;
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._built) this._build();
    this._update();
  }

  /** Shortcut used throughout the card */
  t(key, vars) {
    return npcT(this._hass, key, vars);
  }

  _num(entityId) {
    if (!entityId) return null;
    const st = this._hass.states[entityId];
    if (!st || st.state === "unavailable" || st.state === "unknown") return null;
    const v = parseFloat(st.state);
    return isNaN(v) ? null : v;
  }

  _segmentsHtml() {
    let s = "";
    for (let i = 0; i < NPC_SEGMENTS; i++) s += `<i style="--i:${i}"></i>`;
    return s;
  }

  _build() {
    const c = this._config;
    const t = (k, v) => this.t(k, v);

    const heroLiquid = (c.sensors || []).some((s) => s.style === "liquid" && s.wide);
    const headHtml =
      c.title || c.image
        ? c.image && !heroLiquid
          ? `<div class="efc-head">
             <img class="efc-head-img" src="${c.image}" alt="">
             <div class="efc-title">${c.title || ""}</div>
             <div class="efc-head-spacer"></div>
           </div>`
          : `<div class="efc-head"><div class="efc-title">${c.title || ""}</div></div>`
        : "";

    const sensorsHtml = (c.sensors || [])
      .map((s, i) => {
        if (s.type === "divider") {
          return `
        <div class="efc-divider">
          ${s.name ? `<span>${s.name}</span>` : ""}
        </div>`;
        }
        if (s.style === "liquid") {
          const ball = `
          <div class="efc-liq-wrap" id="w-x${i}" ${s.entity ? `data-entity="${s.entity}" style="cursor:pointer"` : ""}>
            <div class="efc-liq" id="b-x${i}">
              <div class="efc-liq-fill"></div>
              <div class="efc-liq-info">
                <span class="efc-liq-val" id="v-x${i}">—</span>
                <span class="efc-liq-name">${s.name || s.entity || ""}</span>
              </div>
            </div>
          </div>`;

          const statusHtml =
            s.flow_in || s.flow_out
              ? `<div class="efc-flowstatus" id="fs-x${i}">
                   <span class="efc-fs-icon" id="fsi-x${i}">🔋</span>
                   <span class="efc-fs-label" id="fsl-x${i}"></span>
                   <span class="efc-fs-line"></span>
                   <span class="efc-fs-power" id="fsp-x${i}"></span>
                 </div>`
              : "";
          if (s.wide && c.image) {
            return `
        <div class="efc-cell wide">
          <div style="position:relative;">
            <svg id="hgraph" viewBox="0 0 400 130" preserveAspectRatio="none"
              style="position:absolute;left:0;right:0;top:-12px;bottom:-12px;height:calc(100% + 24px);width:100%;pointer-events:none;opacity:0.4;z-index:0;">
              <path id="hg1" fill="none" stroke="rgba(79,201,91,0.8)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path id="hg2" fill="none" stroke="rgba(59,157,243,0.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="efc-hero" style="position:relative;z-index:1;">
              <img class="efc-hero-img" src="${c.image}" alt="">
              ${ball}
            </div>
          </div>
          <div style="height:10px"></div>${statusHtml}
        </div>`;
          }
          return `
        <div class="efc-cell${s.wide ? " wide" : ""}" ${s.entity ? `data-entity="${s.entity}" style="cursor:pointer"` : ""}>${ball}${statusHtml}</div>`;
        }
        return `
        <div class="efc-cell${s.wide ? " wide" : ""}" ${s.entity ? `data-entity="${s.entity}" style="cursor:pointer"` : ""}>
          <div class="efc-row1">
            <span class="efc-name">${s.name || s.entity || ""}</span>
            <span class="efc-val" id="v-x${i}">—</span>
          </div>
          <div class="efc-led" id="b-x${i}">${this._segmentsHtml()}</div>
        </div>`;
      })
      .join("");

    const controlsHtml = (c.controls || [])
      .map(
        (ct, i) => `
          <div class="efc-ctl">
            <span class="efc-ctl-name">${ct.name || ct.entity || ""}</span>
            <input class="efc-ctl-range" type="range" id="ctl-${i}">
            <span class="efc-ctl-val" id="ctlv-${i}">—</span>
          </div>`
      )
      .join("");

    const bgMode = c.background === "color" ? "color" : "transparent";
    const bgColor = Array.isArray(c.background_color)
      ? `rgb(${c.background_color.join(",")})`
      : c.background_color || "";

    this.innerHTML = `
      <ha-card class="efc-card">
        <style>
          ha-card.efc-card {
            background: transparent;
            border: none;
            box-shadow: none;
          }
          .efc-wrap {
            position: relative;
            padding: 14px 16px;
            border-radius: var(--ha-card-border-radius, 12px);
            overflow: hidden;
            font-family: Impact, 'Arial Narrow Bold', sans-serif;
            color: var(--primary-text-color, #fff);
          }
          .efc-wrap.bg-color {
            background: var(--efc-bg, #1c1c1e);
          }
          .efc-wrap.bg-transparent {
            background: transparent;
          }
          .efc-head {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 10px;
            min-height: 40px;
          }
          .efc-head-img {
            height: 72px;
            width: auto;
            flex: 0 0 auto;
            object-fit: contain;
          }
          .efc-head-spacer { flex: 0 0 auto; width: 72px; }
          .efc-title {
            flex: 1;
            text-align: center;
            font-size: 26px;
            letter-spacing: 1px;
            color: var(--primary-color, #f9b17a);
          }

          .efc-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px 22px;
          }
          @media (max-width: 420px) {
            .efc-grid { grid-template-columns: 1fr; }
          }
          .efc-cell { min-width: 0; }
          .efc-cell.wide { grid-column: 1 / -1; }
          .efc-cell[data-entity]:hover .efc-row1 .efc-name { opacity: 1; }
          .efc-cell[data-entity]:hover .efc-row1 .efc-val {
            text-shadow: 0 0 12px currentColor;
          }
          .efc-liq-wrap[data-entity]:hover {
            filter: brightness(1.08);
          }
          .efc-hero {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 28px;
            padding: 4px 0;
          }
          .efc-hero .efc-liq-wrap { margin: 0; }
          .efc-hero-img {
            height: 115px;
            width: auto;
            object-fit: contain;
            filter: drop-shadow(0 6px 14px rgba(0,0,0,0.5));
          }
          @media (max-width: 420px) {
            .efc-hero { gap: 14px; }
            .efc-hero .efc-liq-wrap { margin: 0; }
            .efc-hero-img { height: 96px; }
          }

          .efc-liq-wrap {
            position: relative;
            width: 115px;
            height: 115px;
            margin: 6px auto;
            border-radius: 50%;
            box-shadow: 0 0 8px var(--liq-cl, transparent),
                        0 0 18px var(--liq-cl, transparent);
            transition: box-shadow .8s ease;
          }

          .efc-liq {
            position: relative;
            width: 115px;
            height: 115px;
            border-radius: 50%;
            overflow: hidden;
            background: var(--liq-bg, rgba(255,255,255,0.06));
            border: 1px solid var(--liq-cl, rgba(255,255,255,0.10));
          }
          .efc-liq-fill {
            position: absolute;
            left: 0; right: 0; bottom: 0;
            height: var(--fill, 0%);
            background: var(--liq-c, #2a86a0);
            transition: height .8s ease, background .8s ease;
          }
          .efc-liq::before {
            content: "";
            position: absolute;
            z-index: 1;
            left: 50%;
            top: calc(100% - var(--fill, 0%) - 5px);
            width: 230px;
            height: 230px;
            margin-left: -115px;
            border-radius: 42%;
            background: var(--liq-c, #2a86a0);
            animation: efc-liqspin 9s linear infinite;
            pointer-events: none;
          }
          .efc-liq::after {
            content: "";
            position: absolute;
            z-index: 1;
            left: 50%;
            top: calc(100% - var(--fill, 0%) - 9px);
            width: 230px;
            height: 230px;
            margin-left: -115px;
            border-radius: 44%;
            background: var(--liq-cl, rgba(42,134,160,0.45));
            animation: efc-liqspin 13s linear infinite reverse;
            pointer-events: none;
          }
          .efc-liq.flat::before, .efc-liq.flat::after { display: none; }
          @keyframes efc-liqspin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          .efc-liq-wrap.discharge {
            animation: efc-liqpulse 2.4s ease-in-out infinite;
          }
          @keyframes efc-liqpulse {
            0%, 100% {
              box-shadow: 0 0 8px var(--liq-cl, transparent),
                          0 0 18px var(--liq-cl, transparent);
            }
            50% {
              box-shadow: 0 0 22px var(--liq-cl, transparent),
                          0 0 52px var(--liq-cl, transparent);
            }
          }
          .efc-liq-wrap.charge {
            box-shadow: 0 0 16px var(--liq-cl, transparent),
                        0 0 40px var(--liq-cl, transparent);
          }

          .efc-flowstatus {
            grid-column: 1 / -1;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 16px;
            margin-top: 2px;
            border-radius: 14px;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            position: relative;
            overflow: hidden;
            opacity: 0;
            max-height: 0;
            padding-top: 0;
            padding-bottom: 0;
            transition: opacity .5s ease, max-height .5s ease,
                        padding .5s ease, border-color .6s ease,
                        box-shadow .6s ease;
          }
          .efc-flowstatus.charge, .efc-flowstatus.discharge {
            opacity: 1;
            max-height: 60px;
            padding-top: 8px;
            padding-bottom: 8px;
          }
          .efc-flowstatus.discharge {
            border-color: rgba(79, 201, 91, 0.35);
            box-shadow: inset 0 0 24px rgba(79, 201, 91, 0.10),
                        0 0 14px rgba(79, 201, 91, 0.12);
          }
          .efc-flowstatus.charge {
            border-color: rgba(59, 157, 243, 0.4);
            box-shadow: inset 0 0 24px rgba(59, 157, 243, 0.12),
                        0 0 14px rgba(59, 157, 243, 0.14);
          }
          .efc-flowstatus.switch {
            animation: efc-modeflash .7s ease;
          }
          @keyframes efc-modeflash {
            0%   { filter: brightness(2.2); }
            100% { filter: brightness(1); }
          }
          .efc-fs-icon {
            display: flex;
            align-items: center;
            font-size: 18px;
            flex: 0 0 auto;
          }
          .efc-fs-label {
            font-family: sans-serif;
            font-size: 14px;
            opacity: .85;
            flex: 0 0 auto;
            white-space: nowrap;
          }
          .efc-fs-line {
            flex: 1;
            height: 3px;
            border-radius: 2px;
            position: relative;
            background: rgba(255,255,255,0.10);
            overflow: hidden;
          }
          .efc-fs-line::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            width: 46px;
            height: 3px;
            margin-top: -1.5px;
            border-radius: 2px;
            background: linear-gradient(90deg,
              transparent 0%,
              var(--fs-cl, rgba(79,201,91,.4)) 55%,
              var(--fs-c, #4fc95b) 100%);
            box-shadow: 0 0 6px var(--fs-cl, transparent);
            animation: efc-fsflow 2.4s ease-in-out infinite;
          }
          .efc-flowstatus.charge .efc-fs-line::after {
            animation-name: efc-fsflow-rev;
            transform: scaleX(-1);
          }
          @keyframes efc-fsflow {
            0%   { left: -46px; }
            70%, 100% { left: 100%; }
          }
          @keyframes efc-fsflow-rev {
            0%   { left: 100%; }
            70%, 100% { left: -46px; }
          }
          .efc-fs-power {
            font-size: 22px;
            letter-spacing: 1px;
            flex: 0 0 auto;
          }

          .efc-liq-info {
            position: absolute;
            inset: 0;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2px;
            text-shadow: 0 1px 4px rgba(0,0,0,0.55);
          }
          .efc-liq-val {
            font-size: 26px;
            letter-spacing: 1px;
          }
          .efc-liq-name {
            font-family: sans-serif;
            font-size: 11px;
            opacity: .85;
          }
          .efc-divider {
            grid-column: 1 / -1;
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 4px 0 -2px;
          }
          .efc-divider::before,
          .efc-divider::after {
            content: "";
            flex: 1;
            height: 1px;
            background: rgba(255,255,255,0.18);
          }
          .efc-divider span {
            font-family: sans-serif;
            font-size: 12px;
            letter-spacing: 1px;
            text-transform: uppercase;
            opacity: .65;
            white-space: nowrap;
          }
          .efc-row1 {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            font-size: 13px;
          }
          .efc-row1 .efc-name { opacity: .75; font-family: sans-serif; }
          .efc-row1 .efc-val  { font-size: 19px; }

          .efc-led {
            display: flex;
            gap: 2px;
            height: 10px;
            margin-top: 5px;
          }
          .efc-led i {
            flex: 1 1 0;
            min-width: 0;
            border-radius: 2px;
            background: var(--efc-seg, #666);
            opacity: 0.16;
            transition: opacity .4s ease, background .4s ease, box-shadow .4s ease;
          }
          .efc-led i.on {
            opacity: 1;
            box-shadow: 0 0 4px var(--efc-seg), 0 0 9px var(--efc-seg);
          }
          .efc-led.anim i.on {
            animation: efc-spark 3.6s linear infinite;
            animation-delay: calc(var(--i) * -0.06s);
          }
          .efc-led.anim.rev i.on {
            animation-delay: calc(var(--i) * 0.06s);
          }
          @keyframes efc-spark {
            0%, 3% { filter: brightness(2.2) saturate(1.35); }
            7%, 100% { filter: brightness(1); }
          }

          .efc-btns {
            display: flex;
            gap: 18px;
            margin-top: 16px;
            justify-content: center;
            flex-wrap: wrap;
          }
          .efc-tglwrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
          }
          .efc-tgl {
            flex: 0 0 auto;
            width: 34px;
            height: 62px;
            border-radius: 17px;
            background: rgba(224, 72, 62, 0.30);
            border: 1px solid rgba(224, 72, 62, 0.35);
            position: relative;
            cursor: pointer;
            transition: background .25s ease, box-shadow .25s ease;
          }
          .efc-tgl i {
            position: absolute;
            left: 50%;
            margin-left: -13px;
            bottom: 3px;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: #d9d9d9;
            box-shadow: 0 2px 5px rgba(0,0,0,0.45);
            transition: transform .25s cubic-bezier(.4,1.4,.6,1), background .25s ease;
          }
          .efc-tgl:hover {
            box-shadow: 0 0 10px rgba(255,255,255,0.15);
          }
          .efc-tgl:active i {
            transform: scale(0.92);
          }
          .efc-tgl:focus-visible {
            outline: 2px solid var(--primary-color, #f9b17a);
            outline-offset: 2px;
          }
          .efc-tgl.on {
            background: rgba(52, 199, 89, 0.35);
            border-color: rgba(52, 199, 89, 0.55);
            box-shadow: 0 0 12px rgba(52,199,89,0.40);
          }
          .efc-tgl.on i {
            transform: translateY(-28px);
            background: #fff;
          }
          .efc-tgl.on:active i {
            transform: translateY(-28px) scale(0.92);
          }
          .efc-tgllbl {
            font-size: 12px;
            font-family: sans-serif;
            opacity: .8;
            text-align: center;
            max-width: 76px;
            line-height: 1.15;
          }

          .efc-pushwrap {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .efc-push {
            width: 100%;
            height: 46px;
            border-radius: 14px;
            border: none;
            background: rgba(255,255,255,0.06);
            color: var(--efc-btn-clr, rgba(255,255,255,0.9));
            font-family: Impact, sans-serif;
            font-size: 14px;
            letter-spacing: 0.5px;
            text-align: center;
            cursor: pointer;
            user-select: none;
            padding: 0 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            box-shadow:
              4px 4px 10px rgba(0,0,0,0.45),
              -3px -3px 8px rgba(255,255,255,0.06),
              inset 0 1px 0 rgba(255,255,255,0.10);
            transition: box-shadow .12s ease, transform .08s ease, color .15s ease;
          }
          .efc-push[data-color="red"]    { --efc-btn-clr: #f47c72; --efc-btn-in: rgba(224,72,62,0.18); }
          .efc-push[data-color="yellow"] { --efc-btn-clr: #f3d43b; --efc-btn-in: rgba(243,212,59,0.15); }
          .efc-push[data-color="green"]  { --efc-btn-clr: #4fc95b; --efc-btn-in: rgba(79,201,91,0.15); }
          .efc-push[data-color="blue"]   { --efc-btn-clr: #3b9df3; --efc-btn-in: rgba(59,157,243,0.18); }
          .efc-push[data-color="cyan"],
          .efc-push:not([data-color])    { --efc-btn-clr: #2fbae5; --efc-btn-in: rgba(47,186,229,0.15); }
          .efc-push:hover {
            box-shadow:
              4px 4px 10px rgba(0,0,0,0.45),
              -3px -3px 8px rgba(255,255,255,0.06),
              inset 0 1px 0 rgba(255,255,255,0.10),
              inset 0 0 18px var(--efc-btn-in, rgba(255,255,255,0.08));
            color: #fff;
          }
          .efc-push:active, .efc-push.pressed {
            transform: scale(0.97);
            box-shadow:
              1px 1px 4px rgba(0,0,0,0.5),
              -1px -1px 3px rgba(255,255,255,0.04),
              inset 3px 3px 8px rgba(0,0,0,0.45),
              inset -2px -2px 5px rgba(255,255,255,0.05),
              inset 0 0 22px var(--efc-btn-in, rgba(255,255,255,0.1));
          }
          .efc-push:focus-visible {
            outline: 2px solid var(--primary-color, #f9b17a);
            outline-offset: 3px;
          }

          .efc-ctls {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 16px;
            padding: 12px 14px;
            border-radius: 14px;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
          }
          .efc-ctl {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .efc-ctl-name {
            font-family: sans-serif;
            font-size: 13px;
            opacity: .78;
            flex: 0 0 auto;
            min-width: 110px;
          }
          .efc-ctl-val {
            font-size: 18px;
            letter-spacing: 1px;
            flex: 0 0 auto;
            min-width: 64px;
            text-align: right;
          }
          .efc-ctl-range {
            flex: 1;
            -webkit-appearance: none;
            appearance: none;
            height: 6px;
            border-radius: 4px;
            outline: none;
            background: linear-gradient(90deg,
              var(--ctl-c, #2fbae5) var(--p, 0%),
              rgba(255,255,255,0.12) var(--p, 0%));
            cursor: pointer;
          }
          .efc-ctl-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #f2f2f2;
            border: none;
            box-shadow: 0 0 8px var(--ctl-c, #2fbae5),
                        0 2px 5px rgba(0,0,0,0.5);
            transition: transform .12s ease;
          }
          .efc-ctl-range::-webkit-slider-thumb:hover { transform: scale(1.15); }
          .efc-ctl-range::-webkit-slider-thumb:active { transform: scale(0.95); }
          .efc-ctl-range::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #f2f2f2;
            border: none;
            box-shadow: 0 0 8px var(--ctl-c, #2fbae5),
                        0 2px 5px rgba(0,0,0,0.5);
          }
          .efc-ctl-range::-moz-range-track {
            height: 6px;
            border-radius: 4px;
            background: transparent;
          }

          .efc-confirm {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.78);
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            z-index: 5;
            border-radius: inherit;
          }
          .efc-confirm.show { display: flex; }
          .efc-confirm b {
            font-size: 18px;
            font-family: sans-serif;
            color: #fff;
            text-align: center;
            padding: 0 20px;
          }
          .efc-cbtns { display: flex; gap: 16px; }
          .efc-confirm button {
            font-family: Impact, sans-serif;
            font-size: 16px;
            padding: 6px 26px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: transform .08s ease, filter .15s ease;
          }
          .efc-confirm button:hover { filter: brightness(1.2); }
          .efc-confirm button:active { transform: translateY(1px); }
          .efc-yes { background: #b3261e; color: #fff; }
          .efc-no  { background: #444; color: #fff; }
        </style>

        <div class="efc-wrap bg-${bgMode}" ${bgMode === "color" && bgColor ? `style="--efc-bg:${bgColor}"` : ""}>
          ${headHtml}
          ${sensorsHtml ? `<div class="efc-grid">${sensorsHtml}</div>` : ""}
          ${(() => {
            const pushHtml = (c.buttons || [])
              .map((b, i) => {
                const isPush =
                  b.button_type === "push" ||
                  (b.entity && b.entity.split(".")[0] === "button");
                if (!isPush) return "";
                const bc = b.btn_color || "cyan";
                return `<div class="efc-pushwrap"><button class="efc-push" id="btn-${i}" tabindex="0" data-color="${bc}">${b.name || b.entity || ""}</button></div>`;
              })
              .join("");
            const tglHtml = (c.buttons || [])
              .map((b, i) => {
                const isPush =
                  b.button_type === "push" ||
                  (b.entity && b.entity.split(".")[0] === "button");
                if (isPush) return "";
                return `<div class="efc-tglwrap"><div class="efc-tgl" id="btn-${i}" role="switch" tabindex="0" aria-label="${b.name || b.entity || ""}"><i></i></div><span class="efc-tgllbl">${b.name || b.entity || ""}</span></div>`;
              })
              .join("");
            return (
              (pushHtml ? `<div class="efc-btns efc-btns-push">${pushHtml}</div>` : "") +
              (tglHtml ? `<div class="efc-btns efc-btns-tgl">${tglHtml}</div>` : "")
            );
          })()}
          ${controlsHtml ? `<div class="efc-ctls">${controlsHtml}</div>` : ""}

          <div class="efc-confirm" id="efc-confirm">
            <b id="efc-confirm-text">${t("dialog.confirm_generic")}</b>
            <div class="efc-cbtns">
              <button class="efc-yes" id="efc-yes">${t("dialog.yes")}</button>
              <button class="efc-no" id="efc-no">${t("dialog.no")}</button>
            </div>
          </div>
        </div>
      </ha-card>
    `;

    const dlg = this.querySelector("#efc-confirm");
    const dlgText = this.querySelector("#efc-confirm-text");
    this._pending = null;

    this.querySelector("#efc-no")?.addEventListener("click", () => {
      dlg.classList.remove("show");
      this._pending = null;
    });
    this.querySelector("#efc-yes")?.addEventListener("click", () => {
      dlg.classList.remove("show");
      if (this._pending) this._callButton(this._pending);
      if (this._pendingPush) {
        const el = this._pendingPush;
        el.classList.add("pressed");
        setTimeout(() => el.classList.remove("pressed"), 300);
      }
      this._pending = null;
      this._pendingPush = null;
    });

    if (c.graph_entity_1 || c.graph_entity_2) {
      const now = Date.now();
      if (!this._graphTs || now - this._graphTs > 300000) {
        this._graphTs = now;
        const hours = c.graph_hours || 24;
        const from = new Date(now - hours * 3600000).toISOString();
        const entities = [c.graph_entity_1, c.graph_entity_2].filter(Boolean);
        this._hass
          .callApi(
            "GET",
            `history/period/${from}?filter_entity_id=${entities.join(",")}&minimal_response=true&no_attributes=true`
          )
          .then((data) => {
            const drawPath = (id, arr) => {
              const el = this.querySelector("#" + id);
              if (!el || !arr || arr.length < 2) return;
              const raw = arr.map((s) => parseFloat(s.state)).filter((v) => !isNaN(v));
              if (raw.length < 2) return;
              const step = Math.max(1, Math.floor(raw.length / 80));
              const vals = raw.filter((_, i) => i % step === 0);
              const mn = Math.min(...vals),
                mx = Math.max(...vals),
                rng = mx - mn || 1;
              const W = 400,
                H = 130,
                p = 14;
              const pts = vals.map((v, i) => ({
                x: p + (i / (vals.length - 1)) * (W - p * 2),
                y: H - p - ((v - mn) / rng) * (H - p * 2),
              }));
              let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
              for (let i = 1; i < pts.length; i++) {
                const cp = (pts[i - 1].x + pts[i].x) / 2;
                d += ` C${cp.toFixed(1)},${pts[i - 1].y.toFixed(1)} ${cp.toFixed(1)},${pts[i].y.toFixed(1)} ${pts[i].x.toFixed(1)},${pts[i].y.toFixed(1)}`;
              }
              el.setAttribute("d", d);
            };
            if (data[0]) drawPath("hg1", data[0]);
            if (data[1]) drawPath("hg2", data[1]);
          })
          .catch(() => {});
      }
    }

    (c.buttons || []).forEach((b, i) => {
      const el = this.querySelector("#btn-" + i);
      if (!el || !b.entity) return;
      const isPush =
        b.button_type === "push" || (b.entity && b.entity.split(".")[0] === "button");
      const fire = () => {
        const needConfirm = b.confirm !== false;
        if (needConfirm) {
          dlgText.textContent = this.t("dialog.confirm", {
            name: b.name || b.entity,
          });
          this._pendingPush = isPush ? el : null;
          this._pending = b;
          dlg.classList.add("show");
        } else {
          if (isPush) {
            el.classList.add("pressed");
            setTimeout(() => el.classList.remove("pressed"), 300);
          }
          this._callButton(b);
        }
      };
      el.addEventListener("click", fire);
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") fire();
      });
    });

    (c.controls || []).forEach((ct, i) => {
      const inp = this.querySelector("#ctl-" + i);
      if (!inp || !ct.entity) return;
      const paint = () => {
        const min = Number(inp.min),
          max = Number(inp.max);
        const p = max > min ? ((Number(inp.value) - min) / (max - min)) * 100 : 0;
        inp.style.setProperty("--p", p + "%");
        const v = this.querySelector("#ctlv-" + i);
        if (v) v.textContent = Number(inp.value) + (ct.unit ? " " + ct.unit : "");
      };
      inp.addEventListener("input", () => {
        this._ctlDrag = i;
        paint();
      });
      inp.addEventListener("change", () => {
        this._ctlDrag = null;
        this._hass.callService("number", "set_value", {
          entity_id: ct.entity,
          value: Number(inp.value),
        });
      });
    });

    this.querySelector(".efc-wrap")?.addEventListener("click", (e) => {
      const cell = e.target.closest("[data-entity]");
      if (!cell) return;
      const entityId = cell.dataset.entity;
      if (!entityId) return;
      if (e.target.closest(".efc-btns, .efc-ctls, .efc-confirm")) return;
      this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          detail: { entityId },
          bubbles: true,
          composed: true,
        })
      );
    });

    this._built = true;
  }

  _callButton(b) {
    const domain = b.entity.split(".")[0];
    if (domain === "switch") {
      this._hass.callService("switch", "toggle", { entity_id: b.entity });
    } else if (domain === "button") {
      this._hass.callService("button", "press", { entity_id: b.entity });
    } else if (domain === "script") {
      this._hass.callService("script", "turn_on", { entity_id: b.entity });
    } else {
      this._hass.callService("homeassistant", "toggle", { entity_id: b.entity });
    }
  }

  _update() {
    const c = this._config;

    (c.sensors || []).forEach((s, i) => {
      const v = this._num(s.entity);
      const valEl = this.querySelector("#v-x" + i);
      if (valEl) {
        valEl.textContent =
          v === null
            ? this.t("status.no_data")
            : v.toFixed(s.decimals ?? 0) + (s.unit ? " " + s.unit : "");
      }
      if (s.style === "liquid") {
        const liq = this.querySelector("#b-x" + i);
        if (liq) {
          const min = s.min ?? 0;
          const max = s.max ?? 100;
          const basePal = NPC_PALETTES[s.color] || NPC_PALETTES.level;
          const pal = s.invert ? (j, n2) => basePal(n2 - 1 - j, n2) : basePal;
          let frac = 0;
          if (v !== null) frac = Math.max(0, Math.min(1, (v - min) / (max - min)));
          const col = pal(Math.round(frac * 99), 100);
          liq.style.setProperty("--fill", frac * 100 + "%");
          liq.style.setProperty("--liq-c", col);
          liq.style.setProperty("--liq-cl", npcAlpha(col, 0.55));
          liq.style.setProperty("--liq-bg", npcAlpha(col, 0.16));
          liq.classList.toggle("flat", frac <= 0.005 || frac >= 0.995);
          const wrap = this.querySelector("#w-x" + i);
          if (wrap) {
            wrap.style.setProperty("--liq-cl", npcAlpha(col, 0.5));
            const fin = s.flow_in ? this._num(s.flow_in) : null;
            const fout = s.flow_out ? this._num(s.flow_out) : null;
            const charging = fin !== null && fin > 5;
            const discharging = !charging && fout !== null && fout > 1;
            wrap.classList.toggle("charge", charging);
            wrap.classList.toggle("discharge", discharging);
            const fs = this.querySelector("#fs-x" + i);
            if (fs) {
              const mode = charging ? "charge" : discharging ? "discharge" : "idle";
              const prev = fs.dataset.mode;
              if (mode !== prev) {
                fs.dataset.mode = mode;
                fs.className = "efc-flowstatus " + (mode === "idle" ? "" : mode);
                if (prev && mode !== "idle") {
                  fs.classList.add("switch");
                  setTimeout(() => fs.classList.remove("switch"), 750);
                }
              }
              if (mode !== "idle") {
                const green = "#4fc95b",
                  blue = "#3b9df3";
                const cMain = mode === "charge" ? blue : green;
                fs.style.setProperty("--fs-c", cMain);
                fs.style.setProperty("--fs-cl", npcAlpha(cMain, 0.55));
                this.querySelector("#fsi-x" + i).textContent =
                  mode === "charge" ? "⚡" : "🔋";
                this.querySelector("#fsl-x" + i).textContent =
                  mode === "charge"
                    ? this.t("status.charging")
                    : this.t("status.battery");
                this.querySelector("#fsp-x" + i).textContent =
                  Math.round(mode === "charge" ? fin : fout) +
                  " " +
                  this.t("status.watts");
              }
            }
            if (this._dbg !== `${fin}|${fout}|${charging}|${discharging}`) {
              this._dbg = `${fin}|${fout}|${charging}|${discharging}`;
              console.debug(
                `EFC liquid: flow_in=${fin} flow_out=${fout} → charge=${charging} discharge=${discharging}`
              );
            }
          }
        }
        return;
      }
      const led = this.querySelector("#b-x" + i);
      if (led) {
        const min = s.min ?? 0;
        const max = s.max ?? 100;
        const basePal = NPC_PALETTES[s.color] || NPC_PALETTES.level;
        const pal = s.invert ? (j, n2) => basePal(n2 - 1 - j, n2) : basePal;
        const segs = led.children;
        const n = segs.length;
        let fillCount = 0;
        if (v !== null) {
          const t = (v - min) / (max - min);
          fillCount = Math.round(Math.max(0, Math.min(1, t)) * n);
        }
        for (let j = 0; j < n; j++) {
          segs[j].style.setProperty("--efc-seg", pal(j, n));
          segs[j].classList.toggle("on", j < fillCount);
        }
        led.classList.toggle("anim", s.animate !== false && v !== null && v > min);
        led.classList.toggle("rev", !!s.invert);
      }
    });

    if (c.graph_entity_1 || c.graph_entity_2) {
      const now = Date.now();
      if (!this._graphTs || now - this._graphTs > 300000) {
        this._graphTs = now;
        const hours = c.graph_hours || 24;
        const from = new Date(now - hours * 3600000).toISOString();
        const entities = [c.graph_entity_1, c.graph_entity_2].filter(Boolean);
        this._hass
          .callApi(
            "GET",
            `history/period/${from}?filter_entity_id=${entities.join(",")}&minimal_response=true&no_attributes=true`
          )
          .then((data) => {
            const drawPath = (id, arr) => {
              const el = this.querySelector("#" + id);
              if (!el || !arr || arr.length < 2) return;
              const raw = arr.map((s) => parseFloat(s.state)).filter((v) => !isNaN(v));
              if (raw.length < 2) return;
              const step = Math.max(1, Math.floor(raw.length / 80));
              const vals = raw.filter((_, i) => i % step === 0);
              const mn = Math.min(...vals),
                mx = Math.max(...vals),
                rng = mx - mn || 1;
              const W = 400,
                H = 130,
                p = 14;
              const pts = vals.map((v, i) => ({
                x: p + (i / (vals.length - 1)) * (W - p * 2),
                y: H - p - ((v - mn) / rng) * (H - p * 2),
              }));
              let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
              for (let i = 1; i < pts.length; i++) {
                const cp = (pts[i - 1].x + pts[i].x) / 2;
                d += ` C${cp.toFixed(1)},${pts[i - 1].y.toFixed(1)} ${cp.toFixed(1)},${pts[i].y.toFixed(1)} ${pts[i].x.toFixed(1)},${pts[i].y.toFixed(1)}`;
              }
              el.setAttribute("d", d);
            };
            if (data[0]) drawPath("hg1", data[0]);
            if (data[1]) drawPath("hg2", data[1]);
          })
          .catch(() => {});
      }
    }

    (c.buttons || []).forEach((b, i) => {
      const el = this.querySelector("#btn-" + i);
      if (!el || !b.entity) return;
      const isPush =
        b.button_type === "push" || (b.entity && b.entity.split(".")[0] === "button");
      if (!isPush) {
        const st = this._hass.states[b.entity];
        el.classList.toggle("on", !!st && st.state === "on");
      }
    });

    (c.controls || []).forEach((ct, i) => {
      const inp = this.querySelector("#ctl-" + i);
      if (!inp || !ct.entity) return;
      const st = this._hass.states[ct.entity];
      if (!st) return;
      const a = st.attributes || {};
      inp.min = ct.min ?? a.min ?? 0;
      inp.max = ct.max ?? a.max ?? 100;
      inp.step = ct.step ?? a.step ?? 1;
      if (this._ctlDrag !== i) {
        inp.value = parseFloat(st.state) || 0;
      }
      const min = Number(inp.min),
        max = Number(inp.max);
      const p = max > min ? ((Number(inp.value) - min) / (max - min)) * 100 : 0;
      inp.style.setProperty("--p", p + "%");
      const v = this.querySelector("#ctlv-" + i);
      if (v) v.textContent = Number(inp.value) + (ct.unit ? " " + ct.unit : "");
    });
  }

  getCardSize() {
    return 3;
  }
}

/* ------------------------------------------------------------------ */
/*  Visual editor                                                       */
/* ------------------------------------------------------------------ */

class NoemaPowerCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = {
      sensors: [],
      buttons: [],
      controls: [],
      ...config,
      sensors: [...(config.sensors || [])],
      buttons: [...(config.buttons || [])],
      controls: [...(config.controls || [])],
    };
    if (this._selfUpdate) {
      this._selfUpdate = false;
      return;
    }
    this._render();
    this._rendered = true;
  }

  set hass(hass) {
    this._hass = hass;
    this.querySelectorAll("ha-form").forEach((f) => (f.hass = hass));
  }

  t(key, vars) {
    return npcT(this._hass, key, vars);
  }

  _fire() {
    this._selfUpdate = true;
    const cfg = { type: "custom:noema-power-card", ...this._config };
    for (const k of Object.keys(cfg)) {
      if (cfg[k] === "" || cfg[k] === undefined) delete cfg[k];
    }
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: cfg },
        bubbles: true,
        composed: true,
      })
    );
  }

  _mkForm(schema, data, onChange) {
    const f = document.createElement("ha-form");
    f.schema = schema;
    f.data = data;
    f.computeLabel = (s) => this.t("editor." + s.name) || s.name;
    if (this._hass) f.hass = this._hass;
    f.addEventListener("value-changed", (ev) => {
      ev.stopPropagation();
      f.data = ev.detail.value;
      onChange(ev.detail.value);
      this._fire();
    });
    return f;
  }

  _mkSection(titleText) {
    const d = document.createElement("h3");
    d.style.cssText =
      "margin:16px 0 4px;font-size:13px;font-weight:600;letter-spacing:.6px;text-transform:uppercase;opacity:.7;";
    d.textContent = titleText;
    return d;
  }

  _mkItemBox(summaryText, open) {
    const panel = document.createElement("ha-expansion-panel");
    panel.setAttribute("outlined", "");
    panel.header = summaryText;
    if (open) panel.expanded = true;
    const body = document.createElement("div");
    body.style.cssText = "padding:0 16px 12px;";
    panel.appendChild(body);
    return { det: panel, sum: { set textContent(v) { panel.header = v; } }, body };
  }

  _mkBtn(label, onClick) {
    const b = document.createElement("mwc-button");
    b.textContent = label;
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      onClick();
    });
    return b;
  }

  _mkAddBtn(label, onClick) {
    const b = document.createElement("mwc-button");
    b.setAttribute("outlined", "");
    b.style.cssText = "margin-top:4px;";
    b.textContent = label;
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      onClick();
    });
    return b;
  }

  _itemSummary(item, fallback) {
    return item.name || item.entity || fallback;
  }

  _getSchemas() {
    const t = (k) => this.t(k);
    return {
      main: [
        { name: "title", selector: { text: {} } },
        { name: "image", selector: { text: {} } },
        { name: "graph_entity_1", selector: { entity: {} } },
        { name: "graph_entity_2", selector: { entity: {} } },
        {
          name: "graph_hours",
          selector: { number: { min: 1, max: 72, step: 1, mode: "box" } },
        },
        {
          name: "background",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "transparent", label: t("editor.background_transparent") },
                { value: "color", label: t("editor.background_color_option") },
              ],
            },
          },
        },
        { name: "background_color", selector: { color_rgb: {} } },
      ],
      sensor: [
        { name: "entity", required: true, selector: { entity: {} } },
        { name: "name", selector: { text: {} } },
        {
          name: "unit",
          selector: {
            select: {
              mode: "dropdown",
              custom_value: true,
              options: [
                { value: "%", label: "%" },
                { value: "W", label: "W" },
                { value: "kW", label: "kW" },
                { value: "Wh", label: "Wh" },
                { value: "kWh", label: "kWh" },
                { value: "V", label: "V" },
                { value: "A", label: "A" },
                { value: "°C", label: "°C" },
                { value: "h", label: "h" },
                { value: "min", label: "min" },
                { value: "Hz", label: "Hz" },
                { value: "ppm", label: "ppm" },
                { value: "µg/m³", label: "µg/m³" },
                { value: "lx", label: "lx" },
                { value: "dB", label: "dB" },
              ],
            },
          },
        },
        {
          name: "color",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "level", label: t("editor.color_level") },
                { value: "heat", label: t("editor.color_heat") },
                { value: "good", label: t("editor.color_good") },
                { value: "warn", label: t("editor.color_warn") },
                { value: "bad", label: t("editor.color_bad") },
                { value: "info", label: t("editor.color_info") },
              ],
            },
          },
        },
        { name: "min", selector: { number: { mode: "box", step: 0.1 } } },
        { name: "max", selector: { number: { mode: "box", step: 0.1 } } },
        { name: "decimals", selector: { number: { min: 0, max: 3, mode: "box" } } },
        { name: "flow_in", selector: { entity: { domain: "sensor" } } },
        { name: "flow_out", selector: { entity: { domain: "sensor" } } },
        {
          name: "style",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "bar", label: t("editor.style_bar") },
                { value: "liquid", label: t("editor.style_liquid") },
              ],
            },
          },
        },
        { name: "wide", selector: { boolean: {} } },
        { name: "invert", selector: { boolean: {} } },
        { name: "animate", selector: { boolean: {} } },
      ],
      control: [
        {
          name: "entity",
          required: true,
          selector: { entity: { domain: ["number", "input_number"] } },
        },
        { name: "name", selector: { text: {} } },
        { name: "unit", selector: { text: {} } },
        { name: "min", selector: { number: { mode: "box", step: 1 } } },
        { name: "max", selector: { number: { mode: "box", step: 1 } } },
        { name: "step", selector: { number: { mode: "box", step: 0.1 } } },
      ],
      button: [
        {
          name: "entity",
          required: true,
          selector: {
            entity: { domain: ["switch", "button", "script", "input_boolean"] },
          },
        },
        { name: "name", selector: { text: {} } },
        {
          name: "btn_color",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "cyan", label: t("editor.btn_color_cyan") },
                { value: "red", label: t("editor.btn_color_red") },
                { value: "yellow", label: t("editor.btn_color_yellow") },
                { value: "green", label: t("editor.btn_color_green") },
                { value: "blue", label: t("editor.btn_color_blue") },
              ],
            },
          },
        },
        {
          name: "button_type",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "toggle", label: t("editor.button_type_toggle") },
                { value: "push", label: t("editor.button_type_push") },
              ],
            },
          },
        },
        { name: "confirm", selector: { boolean: {} } },
      ],
      divider: [{ name: "name", selector: { text: {} } }],
    };
  }

  _render() {
    this.innerHTML = "";
    const schemas = this._getSchemas();
    const t = (k, v) => this.t(k, v);

    this.appendChild(
      this._mkForm(schemas.main, this._config, (v) => {
        Object.assign(this._config, v);
      })
    );

    this.appendChild(this._mkSection(t("editor.sensors")));

    const move = (arr, i, dir) => {
      const j = i + dir;
      if (j < 0 || j >= arr.length) return;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      this._openIdx = null;
      this._render();
      this._fire();
    };

    this._config.sensors.forEach((s, i) => {
      const isDiv = s.type === "divider";
      const { det, sum, body } = this._mkItemBox(
        isDiv
          ? s.name
            ? t("editor.divider_named", { name: s.name })
            : t("editor.divider")
          : this._itemSummary(s, t("editor.sensor") + " " + (i + 1)),
        this._openIdx === "s" + i
      );
      body.appendChild(
        this._mkForm(isDiv ? schemas.divider : schemas.sensor, s, (v) => {
          this._config.sensors[i] = isDiv ? { type: "divider", ...v } : v;
          sum.textContent = isDiv
            ? v.name
              ? t("editor.divider_named", { name: v.name })
              : t("editor.divider")
            : this._itemSummary(v, t("editor.sensor") + " " + (i + 1));
        })
      );
      const row = document.createElement("div");
      row.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;padding-top:8px;";
      row.appendChild(this._mkBtn(t("editor.move_up"), () => move(this._config.sensors, i, -1)));
      row.appendChild(this._mkBtn(t("editor.move_down"), () => move(this._config.sensors, i, 1)));
      row.appendChild(
        this._mkBtn(t("editor.delete"), () => {
          this._config.sensors.splice(i, 1);
          this._openIdx = null;
          this._render();
          this._fire();
        })
      );
      body.appendChild(row);
      this.appendChild(det);
    });

    const addRow = document.createElement("div");
    addRow.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;";
    addRow.appendChild(
      this._mkAddBtn(t("editor.add_sensor"), () => {
        this._config.sensors.push({
          entity: "",
          color: "level",
          min: 0,
          max: 100,
        });
        this._openIdx = "s" + (this._config.sensors.length - 1);
        this._render();
      })
    );
    addRow.appendChild(
      this._mkAddBtn(t("editor.add_divider"), () => {
        this._config.sensors.push({ type: "divider", name: "" });
        this._openIdx = "s" + (this._config.sensors.length - 1);
        this._render();
        this._fire();
      })
    );
    this.appendChild(addRow);

    this.appendChild(this._mkSection(t("editor.buttons")));
    this._config.buttons.forEach((b, i) => {
      const { det, sum, body } = this._mkItemBox(
        this._itemSummary(b, t("editor.button") + " " + (i + 1)),
        this._openIdx === "b" + i
      );
      body.appendChild(
        this._mkForm(schemas.button, b, (v) => {
          this._config.buttons[i] = v;
          sum.textContent = this._itemSummary(v, t("editor.button") + " " + (i + 1));
        })
      );
      const brow = document.createElement("div");
      brow.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;padding-top:8px;";
      brow.appendChild(this._mkBtn(t("editor.move_up"), () => move(this._config.buttons, i, -1)));
      brow.appendChild(this._mkBtn(t("editor.move_down"), () => move(this._config.buttons, i, 1)));
      brow.appendChild(
        this._mkBtn(t("editor.delete"), () => {
          this._config.buttons.splice(i, 1);
          this._openIdx = null;
          this._render();
          this._fire();
        })
      );
      body.appendChild(brow);
      this.appendChild(det);
    });
    this.appendChild(
      this._mkAddBtn(t("editor.add_button"), () => {
        this._config.buttons.push({ entity: "", confirm: true });
        this._openIdx = "b" + (this._config.buttons.length - 1);
        this._render();
      })
    );

    this.appendChild(this._mkSection(t("editor.controls")));
    this._config.controls.forEach((ct, i) => {
      const { det, sum, body } = this._mkItemBox(
        this._itemSummary(ct, t("editor.control") + " " + (i + 1)),
        this._openIdx === "c" + i
      );
      body.appendChild(
        this._mkForm(schemas.control, ct, (v) => {
          this._config.controls[i] = v;
          sum.textContent = this._itemSummary(v, t("editor.control") + " " + (i + 1));
        })
      );
      const crow = document.createElement("div");
      crow.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;padding-top:8px;";
      crow.appendChild(this._mkBtn(t("editor.move_up"), () => move(this._config.controls, i, -1)));
      crow.appendChild(this._mkBtn(t("editor.move_down"), () => move(this._config.controls, i, 1)));
      crow.appendChild(
        this._mkBtn(t("editor.delete"), () => {
          this._config.controls.splice(i, 1);
          this._openIdx = null;
          this._render();
          this._fire();
        })
      );
      body.appendChild(crow);
      this.appendChild(det);
    });
    this.appendChild(
      this._mkAddBtn(t("editor.add_control"), () => {
        this._config.controls.push({ entity: "" });
        this._openIdx = "c" + (this._config.controls.length - 1);
        this._render();
      })
    );
  }
}

customElements.define("noema-power-card-editor", NoemaPowerCardEditor);
customElements.define("noema-power-card", NoemaPowerCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "noema-power-card",
  name: "Noema Power Card",
  description: NPC_TRANSLATIONS.en["card.description"],
  preview: true,
  documentationURL: "https://github.com/e2ret/noema-power-card",
});
