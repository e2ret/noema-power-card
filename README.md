# Noema Power Card
![Dashboard](one.png)

Универсальная Lovelace-карта-конструктор для Home Assistant: LED-бары с неоновым свечением, «жидкий» шар с волнами, neumorphism-кнопки, вертикальные тумблеры и регуляторы.

Часть экосистемы **Noema** — проектов для умного дома от [e2ret](https://github.com/e2ret).

Самодостаточная: **не требует** card-mod, bar-card, mushroom или других зависимостей. Один JS-файл. Настройка через визуальный редактор.

## Возможности

- **Конструктор без обязательных полей** — подходит для любых устройств
- **LED-бары** с плавным градиентом, неоновым свечением и бегущим импульсом
- **«Жидкий» шар** с вращающимися волнами, пульсацией при разряде и SVG-графиком истории
- **Строка потока энергии** — «Работа от аккумулятора / Зарядка от сети» с бегущей кометой
- **Neumorphism-кнопки** с вдавливанием при нажатии, выбором цвета
- **Вертикальные тумблеры** с цветным фоном состояния
- **Регуляторы** — неоновые слайдеры для number-сущностей
- **Hero-блок** — картинка устройства рядом с шаром, за ними графики истории двух сенсоров
- Разделители-секции, одна/две колонки, клик на ячейку → more-info

## Установка через HACS

1. HACS → ⋮ → **Пользовательские репозитории**
2. URL: `https://github.com/e2ret/noema-power-card`, категория: **Dashboard**
3. Установить, Ctrl+Shift+R

## Установка вручную

1. Скопировать `dist/noema-power-card.js` в `/config/www/`
2. Настройки → Панели → ⋮ → Ресурсы → `/local/noema-power-card.js` (JavaScript-модуль)

## Использование

Добавить карточку → **Noema Power Card** → настроить через GUI или YAML:

```yaml
type: custom:noema-power-card
title: EcoFlow River 3 UPS
image: /local/images/river3.png
graph_entity_1: sensor.battery_level
graph_entity_2: sensor.cell_temperature
graph_hours: 24
sensors:
  - entity: sensor.battery_level
    name: Аккумулятор
    unit: "%"
    style: liquid
    wide: true
    flow_in: sensor.battery_input_power
    flow_out: sensor.battery_output_power
  - entity: sensor.cell_temperature
    name: Температура
    unit: °C
    color: heat
    min: 15
    max: 60
    wide: true
buttons:
  - entity: button.proxmox_reboot
    name: Перезагрузить
    button_type: push
    btn_color: yellow
  - entity: button.proxmox_shutdown
    name: Выключить
    button_type: push
    btn_color: red
  - entity: switch.dc_12v_port
    name: 12В
controls:
  - entity: number.battery_charge_limit_max
    name: Лимит заряда
    unit: "%"
```

### Параметры сенсора

| Параметр | Описание |
|---|---|
| `entity` | Сущность |
| `name` | Подпись |
| `unit` | Единица |
| `style` | `bar` или `liquid` (шар) |
| `color` | `level`, `heat`, `good`, `warn`, `bad`, `info` |
| `min` / `max` | Шкала |
| `wide` | На всю ширину |
| `invert` | Инверсия градиента |
| `animate` | Бегущий импульс (вкл по умолчанию) |
| `flow_in` / `flow_out` | Сенсоры потока для шара и строки статуса |

### Параметры кнопки

| Параметр | Описание |
|---|---|
| `entity` | switch / button / script |
| `name` | Подпись |
| `button_type` | `toggle` (тумблер) или `push` (кнопка) |
| `btn_color` | `cyan`, `red`, `yellow`, `green`, `blue` |
| `confirm` | Попап подтверждения |

## Совместимость

EcoFlow BLE, ecoflow-cloud, NUT, Proxmox, ESPHome и любые интеграции с числовыми сенсорами.

## Лицензия

MIT
