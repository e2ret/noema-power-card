# ⚡ Noema Power Card

<p align="center">
  <img src="one.png" width="700">
</p>

![Dashboard](one.png)

🇺🇸 [English](README.md) • 🇷🇺 [Русский](README_RU.md)

> **A modern all-in-one Lovelace dashboard card for Home Assistant.**
>
> Beautiful neon LED bars, animated liquid battery visualization, neumorphic controls, historical graphs, and a visual configuration editor — all in a **single JavaScript file**.

Part of the **Noema** ecosystem of smart home projects by **[e2ret](https://github.com/e2ret)**.

---

## ✨ Features

### 🎨 Modern UI

- 🌈 Animated **Neon LED Bars**
- 💧 Interactive **Liquid Battery Sphere**
- ⚡ Animated **Energy Flow Indicator**
- 🟢 Neumorphic Buttons
- 🎛️ Vertical Toggle Switches
- 🎚️ Neon Sliders for Number entities

### 📊 Smart Visualization

- 📈 SVG history graphs
- 🖼️ Hero image with background charts
- 🌊 Animated battery waves
- ✨ Charging/discharging effects
- 💥 Pulse animation on low battery

### ⚙️ Flexible Configuration

- 🧩 Visual GUI Editor
- 📦 Zero required fields
- 🖱️ Click any tile for Home Assistant **more-info**
- 📐 One or two column layout
- 🔧 Supports virtually any numeric sensor

---

## 🚀 Why Noema Power Card?

Unlike traditional dashboard cards, **Noema Power Card** combines multiple UI components into one lightweight card.

✅ No dependencies

✅ No card-mod

✅ No Mushroom

✅ No Bar Card

✅ No custom themes

✅ Just one JavaScript file

---

# 📦 Installation

## Install via HACS (Recommended)

1. Open **HACS**
2. Go to **⋮ → Custom repositories**
3. Add:

```
https://github.com/e2ret/noema-power-card
```

Category:

```
Dashboard
```

4. Install the card
5. Reload your browser (**Ctrl + Shift + R**)

---

## Manual Installation

Copy

```
dist/noema-power-card.js
```

to

```
/config/www/
```

Then add the resource:

```yaml
resources:
  - url: /local/noema-power-card.js
    type: module
```

or, when installed through HACS:

```yaml
resources:
  - url: /hacsfiles/noema-power-card/noema-power-card.js
    type: module
```

---

# 🧩 Example Configuration

```yaml
type: custom:noema-power-card
title: EcoFlow River 3 UPS
image: /local/images/river3.png

graph_entity_1: sensor.battery_level
graph_entity_2: sensor.cell_temperature
graph_hours: 24

sensors:
  - entity: sensor.battery_level
    name: Battery
    unit: "%"
    style: liquid
    wide: true
    flow_in: sensor.battery_input_power
    flow_out: sensor.battery_output_power

  - entity: sensor.cell_temperature
    name: Temperature
    unit: °C
    color: heat
    min: 15
    max: 60
    wide: true

buttons:
  - entity: button.proxmox_reboot
    name: Reboot
    button_type: push
    btn_color: yellow

  - entity: button.proxmox_shutdown
    name: Shutdown
    button_type: push
    btn_color: red

  - entity: switch.dc_12v_port
    name: 12V

controls:
  - entity: number.battery_charge_limit_max
    name: Charge Limit
    unit: "%"
```

---

# 📊 Sensor Options

| Option | Description |
|----------|-------------|
| `entity` | Sensor entity |
| `name` | Display name |
| `unit` | Unit of measurement |
| `style` | `bar` or `liquid` |
| `color` | `level`, `heat`, `good`, `warn`, `bad`, `info` |
| `min` | Minimum value |
| `max` | Maximum value |
| `wide` | Full-width card |
| `invert` | Reverse gradient |
| `animate` | Animated pulse (enabled by default) |
| `flow_in` | Charging power sensor |
| `flow_out` | Discharging power sensor |

---

# 🔘 Button Options

| Option | Description |
|----------|-------------|
| `entity` | switch / button / script |
| `name` | Display name |
| `button_type` | `toggle` or `push` |
| `btn_color` | `cyan`, `red`, `yellow`, `green`, `blue` |
| `confirm` | Confirmation dialog |

---

# 🔌 Compatible Integrations

Works with virtually any integration exposing numeric sensors, including:

- 🔋 EcoFlow BLE
- ☁️ ecoflow-cloud
- 🔌 NUT (Network UPS Tools)
- 🖥️ Proxmox
- 🏠 ESPHome
- 📡 MQTT
- ⚡ Any Home Assistant numeric entity

---

# 🖼️ Screenshots

| Dashboard | Controls |
|-----------|----------|
| ![](one.png) | *(Add another screenshot here)* |

---

# 💡 Use Cases

Perfect for monitoring:

- 🔋 Portable Power Stations
- ⚡ UPS Systems
- 🏠 Home Energy Storage
- ☀️ Solar Installations
- 🔌 Smart Power Distribution
- 🖥️ Home Labs
- 🏡 Smart Homes

---

# ❤️ Part of the Noema Ecosystem

**Noema** is a collection of modern Home Assistant components focused on elegant design, smooth animations, and exceptional usability.

---

# 📄 License

Licensed under the **MIT License**.
