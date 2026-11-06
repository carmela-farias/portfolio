# carmelafarias.site

Personal site, hand-written. No framework, no build step.

## Barranca

The design system behind the site, named for the red clay bluffs over the
Paraná river. Every colour, radius, spacing value and type step the site
renders comes from `css/tokens.css`. Nothing in the layers below declares a
raw value.

## Cascade layers

The stylesheet is split one file per layer, declared in order:

```css
@layer reset, tokens, type, layout, color, motion;
```

| layer    | owns                                        |
|----------|---------------------------------------------|
| `reset`  | browser defaults                            |
| `tokens` | every value the system exposes              |
| `type`   | families, scale, rhythm                     |
| `layout` | structure and spacing, all multiples of `--unit` |
| `color`  | surfaces, ink, borders, accent              |
| `motion` | transitions — the page is correct without it |

The **↻ build** control on the home page disables those stylesheets and
re-enables them in cascade order. It is not a simulation: what you watch
is the real architecture assembling itself.

## Running it

Any static server. No dependencies.

```sh
python3 -m http.server
```

## Structure

```
index.html        home
work/             case studies
css/              one file per cascade layer
js/system.js      token controls + build sequence
assets/
```
