# 🎨 Imágenes del producto — Habitando

El configurador tiene **3 niveles** y elige automáticamente el mejor disponible:

1. **3D real (GLB)** ← lo que quieres. Si existe `assets/3d/cojin.glb`, muestra un
   visor 360° girable (model-viewer) y lo **recolorea** a los 6 colores. *(prioridad máxima)*
2. **Render PNG** por color en `assets/renders/cojin-<color>.png` *(si no hay 3D)*
3. **Cojín SVG** dibujado por código *(fallback, siempre se ve algo)*

---

## ✅ Opción recomendada: 3D real con GLB

### Paso 1 — Descarga el modelo
En Sketchfab → modelo **«almohada/pillow» de el_blase** → botón **Download 3D Model**
→ descarga el formato **GLB** (8 MB). *(No el .blend / .usdz / .gltf — GLB es un solo
archivo autocontenido, ideal para web.)*

> Licencia: **CC BY 4.0** (uso comercial permitido **dando crédito al autor**). La
> página ya muestra el crédito en el footer automáticamente cuando hay 3D. **No lo
> quites** mientras uses este modelo (si subes tu propio modelo, sí puedes quitarlo).

### Paso 2 — Colócalo aquí
```
assets/3d/cojin.glb
```
¡Eso es todo! Al recargar, el configurador detecta el archivo y activa el 3D solo.

### Notas
- El recoloreo funciona sobre el material base del modelo. Si el modelo trae una
  textura de tela (bouclé/chenille), el color la tiñe y conserva el tejido. Si es
  liso, queda color sólido (igual se ve 3D y girable).
- Para un cojín **tuyo** con tela real: encarga/haz un modelo en Blender, exporta a
  **GLB** con su textura, y reemplaza `assets/3d/cojin.glb`. Mismo nombre = cero código.

---

## Alternativa: renders PNG (catálogo 2D)
Si prefieres imágenes fijas en vez de 3D, genera un PNG **fondo transparente** por color
y súbelo a `assets/renders/` con estos nombres exactos:

`cojin-terracota.png` · `cojin-crema.png` · `cojin-verde.png` · `cojin-lima.png` · `cojin-beige.png` · `cojin-carbon.png`

Misma cámara en los 6. Mega-prompt para generarlos con IA (Leonardo/Midjourney):

```
Ultra-realistic 3D product render of a premium square decorative cushion with
piped welt edges and soft pointed corners, floating centered, studio softbox
lighting, isolated on a fully TRANSPARENT background (PNG, alpha). Fixed frontal
camera, slight 12° top-down tilt. <<FABRIC + COLOR>>. 8k, photorealistic.
```
- terracota → `chunky bouclé teddy, warm terracotta (#BE5A30)`
- crema → `chunky bouclé teddy, soft cream (#E3DAC9)`
- verde → `chenille velvet, deep forest green (#2E4A3C)`
- lima → `chenille velvet, lime green (#7E9A34)`
- beige → `chenille velvet, sandy beige (#C2AE90)`
- carbon → `chenille velvet, charcoal grey (#3B3B3B)`
