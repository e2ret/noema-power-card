# Noema Power Card
![Dashboard](one.png)

# Noema Power Card for Home Assistant

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/default)
[![GitHub Release](https://img.shields.io/github/v/release/e2ret/noema-power-card)](https://github.com/e2ret/noema-power-card/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[🇬🇧 English](README.md) | [🇷🇺 Русская версия](README_RU.md)

A sleek, intuitive custom Lovelace card for Home Assistant designed to monitor and visualize real-time power distribution, grid import/export, solar generation, battery status, and household energy consumption.

---

## 🌟 Features

- ⚡ **Real-time Flow Visualization**: Clear graphical representation of energy moving between Solar, Grid, Battery, and Home.
- 🎨 **Fully Customizable**: Flexible styling options, icons, color schemes, and conditional displays.
- 📱 **Responsive Design**: Looks great on desktop, mobile devices, and wall-mounted tablets.
- 🧩 **HACS Support**: Easy installation and automatic updates via Home Assistant Community Store.

---

## 🚀 Installation

### Option 1: Via HACS (Recommended)

1. Open **HACS** in your Home Assistant instance.
2. Click on the three dots in the top right corner and select **Custom repositories**.
3. Add Repository URL: `https://github.com/e2ret/noema-power-card`
4. Category: **Dashboard** (or **Lovelace**).
5. Click **Add**, find **Noema Power Card**, and click **Download**.
6. Refresh your browser page.

### Option 2: Manual Installation

1. Download the `noema-power-card.js` file from the latest [Release](https://github.com/e2ret/noema-power-card/releases).
2. Copy `noema-power-card.js` to your Home Assistant directory: `<config>/www/community/noema-power-card/noema-power-card.js`.
3. Go to **Settings** -> **Dashboards** -> **Three dots (top right)** -> **Resources**.
4. Add a new resource:
   - **URL**: `/local/community/noema-power-card/noema-power-card.js`
   - **Resource Type**: `JavaScript Module`

---

## ⚙️ Configuration

Add the card to your dashboard via the UI or by adding the following YAML snippet:

```yaml
type: custom:noema-power-card
title: "Power Distribution"
entities:
  grid_power: sensor.grid_power
  solar_power: sensor.solar_power
  battery_power: sensor.battery_power
  battery_soc: sensor.battery_state_of_charge
  home_power: sensor.house_consumption
