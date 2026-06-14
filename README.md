# Habitando — Landing de cojines premium

Landing page estática, interactiva y sin backend para **Habitando by Iloremstudio**.
Vende cojines decorativos en bouclé y chenille con un configurador en vivo
(color + medida) y CTA directo a WhatsApp.

## Stack
- HTML único (`index.html`) — **cero build**
- Tailwind CSS (CDN) · GSAP + ScrollTrigger · Lenis (smooth scroll)
- Fuentes: Fraunces (serif) + Inter (sans)

## Estructura
```
index.html              ← toda la landing
assets/
  ambiente-1/2/3.jpg     ← galería (fotos reales optimizadas)
  renders/               ← renders 3D del configurador (ver RENDERS.md)
images/                  ← originales (HEIC convertidos a jpg)
RENDERS.md               ← mega-prompts + nombres de archivo exactos
```

## Configurar antes de publicar
1. **Número de WhatsApp** → `index.html`, constante `WHATSAPP` (línea ~430).
2. **Precios** → objeto `SIZES` en el mismo script.
3. **Renders** → genera los 6 PNG según `RENDERS.md` (hay fallback por color mientras tanto).
4. **Redes / correo** → enlaces del header, footer y sección contacto.

## Desarrollo local
```bash
python3 -m http.server 8080   # luego abre http://localhost:8080
```
> Recomendado servir por HTTP (no `file://`) para que GSAP/ScrollTrigger midan bien.

## Deploy
Sube la carpeta tal cual a **Vercel**, **Netlify** o **GitHub Pages**. Es 100% estático.
