interstitial
===
It changes target dom to be like in a cage with screen.

## Install

```bash
npm install cage-element
```

## Sample

```javascript
var Cage = require('cage-element');
var target = document.querySelector('#target');
var ce = new Cage(target);
ce.build(); # cage the element
ce.unbuild(); # uncage the element
```

## Author
[kuro-daei](https://github.com/kuro-daei)

## Repository
[GitHub](https://github.com/kuro-daei/cage-element)

## Lisence
Apache-2.0
