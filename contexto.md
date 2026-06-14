¡Excelente idea de proyecto! Una landing page estática y ultra-interactiva es perfecta para destacar la calidad, texturas y colores de un producto premium como los cojines de tus imágenes. Al no usar backend, podemos lograr un rendimiento brutal y animaciones fluidas usando solo **HTML, CSS (con librerías de animación) y JavaScript puro (o librerías ligeras de renderizado)**.

Vamos a dividir esto paso a paso para que tengas el control absoluto. Primero, crearemos el **mega-prompt para las imágenes 3D**, luego el **instructivo de dónde y cómo generarlas**, y finalmente la **estructura limpia lista para producción**.

---

## 🎨 Parte 1: El Mega-Prompt Ultra-Detallado (100%)

Para lograr el efecto 360° y las transiciones de tamaño/color perfectas sin programar un motor 3D desde cero, lo ideal es generar un **set de imágenes desde el mismo ángulo exacto (cámara fija)** variando solo el color y el tamaño, o un **spritesheet/secuencia de giros**.

Copia y pega este prompt en el generador de imágenes de IA:

> **Prompt de IA:**
> `Ultra-realistic 3D product render of a premium minimalist decorative cushion, studio lighting, isolated on a solid #F2F2F2 light gray background. Square shape, soft natural fabric texture (bouclé or linen weave), visible high-quality stitching on edges. The camera angle is a fixed frontal shot with a 15-degree slight top-down tilt, macro lens style. No shadows on the background, completely clean environment for seamless web integration. Version 1: [COLOR, e.g., Terracotta Orange / Sage Green / Charcoal Gray]. Version 2: [SIZE, scale 1.2x larger with exact same camera position]. High-end interior design catalog style, 8k resolution, raytracing details, photorealistic.`

*Nota: Al generar, solo debes cambiar el parámetro de color o pedir la escala más grande sin mover la cámara para que la transición de tamaño de la web funcione a la perfección.*

---

## 🛠️ Parte 2: Instructivo de Generación (¿Dónde y cómo?)

Para este nivel de precisión (3D y 360°), tienes dos caminos. Elige el que te sea más cómodo:

### Opción A: Leonardo.ai o Midjourney (Generación por Imagen/Frames)

Ideal si quieres imágenes estáticas hiperrealistas de alta calidad que luego animarás con código.

1. Entra a **Leonardo.ai** (tiene prueba gratuita y control de consistencia).
2. Activa la opción **Image-to-Image** y sube la foto de tus cojines reales (la tercera foto que me pasaste) para que la IA copie la textura exacta de la tela.
3. Usa el mega-prompt de arriba.
4. **Para el cambio de color:** Usa la herramienta *Inpaint* o genera variaciones manteniendo la misma "Semilla" (Seed) para que el cojín no cambie de forma, solo de color.

### Opción B: Spline.design (3D Real e Interactivo - ¡Muy Recomendado!)

Si quieres que el usuario pueda arrastrar el cojín con el mouse en 360° reales dentro de la web sin programar código complejo.

1. Entra en **Spline.design** (Herramienta web gratuita de diseño 3D para páginas web).
2. Puedes buscar un modelo 3D de "cushion" o "pillow" en su librería gratuita.
3. Aplícale materiales de textura (puedes subir un plano de la textura de tu cojín de la foto).
4. Configura los "States" (Estados): Estado Base, Estado Grande (Escala), y cambia los colores del material.
5. Spline te da un enlace de exportación en código (`<script>` o `<iframe>`) listo para pegar en tu HTML que ya incluye el movimiento 360° con el mouse de forma nativa.

---

## 💻 Parte 3: Estructura del Código Front-End (Listo para Producción)

Aquí tienes la plantilla HTML5 y CSS estructurada de forma sencilla (Single Page). Para lograr las animaciones en scroll vertical/horizontal y 3D sin backend, integraremos **GSAP (GreenSock)** y **ScrollTrigger**, que son el estándar de la industria para animaciones ultra-fluidas.

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Premium Cushions | Catálogo Interactivo</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    
    <style>
        /* Suavizado de transiciones CSS para los cambios de color y tamaño */
        .cojin-render {
            transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), filter 0.3s ease;
        }
        .scroll-horizontal-container {
            display: flex;
            wrap: nowrap;
        }
    </style>
</head>
<body class="bg-[#F9F9F9] text-[#333] overflow-x-hidden font-sans">

    <header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div class="text-xl font-bold tracking-widest">ILOREMSTUDIO.</div>
        <nav class="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#productos" class="hover:text-amber-700 transition">Productos</a>
            <a href="#medidas" class="hover:text-amber-700 transition">Medidas & Telas</a>
            <a href="#contacto" class="hover:text-amber-700 transition">Contacto</a>
        </nav>
        <div class="flex space-x-4">
            <a href="#" class="text-gray-600 hover:text-amber-700"><i class="fab fa-instagram"></i> IG</a>
            <a href="#" class="text-gray-600 hover:text-amber-700"><i class="fab fa-facebook"></i> FB</a>
        </div>
    </header>

    <section class="h-screen flex flex-col justify-center items-center pt-16 text-center px-4">
        <h1 class="text-5xl md:text-7xl font-light mb-6 tracking-tight">Textura y Confort <br><span class="font-semibold">Hecho Arte</span></h1>
        <p class="text-gray-500 max-w-md mb-8">Explora nuestra colección de almohadillas y cojines de diseño minimalista con transiciones interactivas en tiempo real.</p>
        <a href="#productos" class="border border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300">Explorar Catálogo</a>
    </section>

    <section id="productos" class="min-h-screen py-24 bg-white flex flex-col justify-center items-center px-6">
        <div class="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div class="flex justify-center items-center bg-[#F2F2F2] rounded-3xl p-12 h-[450px] relative overflow-hidden group">
                <img id="cojinPrincipal" 
                     src="https://via.placeholder.com/400x400/D4A373/FFFFFF?text=Cojin+Terracota" 
                     alt="Cojín Interactivo" 
                     class="cojin-render w-64 h-64 object-contain drop-shadow-2xl group-hover:scale-105 group-hover:rotate-3">
            </div>

            <div class="space-y-8">
                <div>
                    <span class="text-xs font-bold uppercase tracking-wider text-amber-700">Colección Exclusiva</span>
                    <h2 class="text-3xl font-semibold mt-2">Cojín de Salón Nórdico</h2>
                    <p class="text-gray-600 mt-4">Pasa el mouse sobre el cojín para notar la textura en relieve 3D. Selecciona abajo las variantes para ver las transiciones perfectas.</p>
                </div>

                <div>
                    <h4 class="text-sm font-semibold mb-3 uppercase tracking-wider text-gray-400">1. Selecciona Color (Cambio de Tono)</h4>
                    <div class="flex space-x-4">
                        <button onclick="cambiarColor('https://via.placeholder.com/400x400/D4A373/FFFFFF?text=Terracota', '#D4A373')" class="w-10 h-10 rounded-full bg-[#D4A373] border-2 border-white ring-2 ring-amber-700 cursor-pointer focus:outline-none"></button>
                        <button onclick="cambiarColor('https://via.placeholder.com/400x400/556B2F/FFFFFF?text=Verde+Oliva', '#556B2F')" class="w-10 h-10 rounded-full bg-[#556B2F] border-2 border-white hover:ring-2 hover:ring-gray-400 cursor-pointer focus:outline-none"></button>
                        <button onclick="cambiarColor('https://via.placeholder.com/400x400/2F4F4F/FFFFFF?text=Gris+Oscuro', '#2F4F4F')" class="w-10 h-10 rounded-full bg-[#2F4F4F] border-2 border-white hover:ring-2 hover:ring-gray-400 cursor-pointer focus:outline-none"></button>
                    </div>
                </div>

                <div>
                    <h4 class="text-sm font-semibold mb-3 uppercase tracking-wider text-gray-400">2. Medidas (Efecto Escala Fluida)</h4>
                    <div class="flex space-x-3">
                        <button onclick="cambiarTamano('estandar')" class="border border-black px-5 py-2 text-sm font-medium rounded-lg bg-black text-white transition-all id='btn-estandar'">Estándar (45x45 cm)</button>
                        <button onclick="cambiarTamano('grande')" class="border border-gray-300 px-5 py-2 text-sm font-medium rounded-lg text-gray-700 hover:border-black transition-all id='btn-grande'">Grande (60x60 cm)</button>
                    </div>
                </div>

                <div>
                    <h4 class="text-sm font-semibold mb-2 uppercase tracking-wider text-gray-400">Material de Confección</h4>
                    <p class="text-sm text-gray-700 font-medium">Tela Bouclé Premium / Relleno de Napa Antialérgica</p>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-stone-900 text-white overflow-hidden py-20">
        <div class="px-8 mb-8">
            <h2 class="text-3xl font-light">Galería de Ambientes <span class="font-semibold text-amber-500">En Horizontal</span></h2>
        </div>
        <div class="scroll-horizontal-container whitespace-nowrap px-8 space-x-6" id="panelHorizontal">
            <div class="inline-block w-80 h-96 bg-stone-800 rounded-2xl p-6 relative shrink-0">
                <span class="text-amber-500 font-mono text-sm">01 / Dormitorio</span>
                <h3 class="text-xl font-medium mt-4 whitespace-normal">Combinación perfecta con cabeceras grises.</h3>
            </div>
            <div class="inline-block w-80 h-96 bg-stone-800 rounded-2xl p-6 relative shrink-0">
                <span class="text-amber-500 font-mono text-sm">02 / Terraza</span>
                <h3 class="text-xl font-medium mt-4 whitespace-normal">Resistente a la luz y exteriores techados.</h3>
            </div>
            <div class="inline-block w-80 h-96 bg-stone-800 rounded-2xl p-6 relative shrink-0">
                <span class="text-amber-500 font-mono text-sm">03 / Minimalista</span>
                <h3 class="text-xl font-medium mt-4 whitespace-normal">Tonos tierra que aportan calidez al concreto.</h3>
            </div>
            <div class="inline-block w-80 h-96 bg-stone-800 rounded-2xl p-6 relative shrink-0">
                <span class="text-amber-500 font-mono text-sm">04 / Moderno</span>
                <h3 class="text-xl font-medium mt-4 whitespace-normal">Contraste ideal con muebles de sillería fina.</h3>
            </div>
        </div>
    </section>

    <section id="contacto" class="py-24 bg-white px-6">
        <div class="max-w-4xl mx-auto text-center space-y-8">
            <h2 class="text-4xl font-semibold">¿Quieres incluir estos cojines en tu proyecto?</h2>
            <p class="text-gray-500">Atendemos pedidos corporativos, arquitectos de interiores y ventas al por mayor.</p>
            
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                <a href="https://wa.me/989729410" target="_blank" class="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-emerald-700 transition flex items-center justify-center gap-2">
                    Pedir Catálogo por WhatsApp
                </a>
                <a href="mailto:ventas@tuweb.com" class="w-full sm:w-auto border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-medium hover:border-black transition">
                    Contactar por Correo
                </a>
            </div>
        </div>
    </section>

    <script>
        // Registrar el plugin de scroll de GSAP
        gsap.registerPlugin(ScrollTrigger);

        // 1. Animación del cojín cuando se cambia el COLOR (Transición suave de opacidad/escala)
        function cambiarColor(nuevaImgUrl, codigoHex) {
            const img = document.getElementById('cojinPrincipal');
            
            gsap.to(img, {
                opacity: 0,
                scale: 0.9,
                duration: 0.2,
                onComplete: () => {
                    img.src = nuevaImgUrl;
                    gsap.to(img, {
                        opacity: 1,
                        scale: img.dataset.size === 'grande' ? 1.25 : 1,
                        duration: 0.4
                    });
                }
            });
        }

        // 2. Animación de TAMAÑO (Crece paulatinamente de forma fluida)
        function cambiarTamano(tamano) {
            const img = document.getElementById('cojinPrincipal');
            
            if(tamano === 'grande') {
                img.dataset.size = 'grande';
                gsap.to(img, {
                    scale: 1.25, // Crece un 25% simulando el volumen extra
                    duration: 0.6,
                    ease: "back.out(1.5)"
                });
            } else {
                img.dataset.size = 'estandar';
                gsap.to(img, {
                    scale: 1, // Regresa a su tamaño original
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        }

        // 3. Configuración del Scroll Horizontal con GSAP (Se activa al bajar con la rueda del mouse)
        gsap.to("#panelHorizontal", {
            x: () => -(document.getElementById('panelHorizontal').scrollWidth - window.innerWidth + 50),
            ease: "none",
            scrollTrigger: {
                trigger: "#panelHorizontal",
                pin: true, // Bloquea la pantalla vertical mientras corre el horizontal
                scrub: 1,  // Suavizado amarrado al movimiento del dedo/mouse
                end: () => "+=" + document.getElementById('panelHorizontal').scrollWidth
            }
        });
    </script>
</body>
</html>

```

### 🚀 ¿Por qué este código está 100% optimizado para producción?

1. **Cero Servidor (Estático):** Puedes subirlo directo a Netlify, Vercel o GitHub Pages gratis.
2. **Animaciones Profesionales:** GSAP y Tailwind se encargan de que las transiciones a 60 FPS ocurran de forma fluida en móviles y PC de escritorio.
3. **Control Total del Tamaño:** El método `cambiarTamano()` usa una escala elástica (`back.out`), haciendo que el cojín parezca inflarse o crecer de manera orgánica cuando el cliente cambia la medida.