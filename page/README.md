# Simple Stock Flow · Sitio Público de Presentación

> **Prueba técnica SDD · Ficha ADSO 3413974**  
> Sitio público estático de presentación de la solución *Simple Stock Flow*.

---

## 1. ¿Qué es este repositorio y qué rol cumple en Simple Stock Flow?

Este repositorio contiene la **página de aterrizaje estática** (*Landing Page*) de *Simple Stock Flow*.
Cumple el rol de **portal público informativo** para presentar el producto, sus características funcionales, los fundamentos de arquitectura limpia (Onion/Hexagonal) y la metodología de desarrollo guiado por especificación (SDD) aplicada en la ficha ADSO 3413974.

**Características no negociables:**
- Construido en HTML5 semántico y CSS responsivo (móvil y escritorio).
- **Cero llamadas a la API:** No realiza peticiones HTTP (sin `fetch`, sin `axios`), funcionando de forma 100% autónoma.
- Idioma en español (`<html lang="es">`) con ortografía y tildes impecables (Artículo XI).
- Acceso público sin requerir credenciales ni autenticación.

---

## 2. ¿Cómo se ejecuta localmente?

Dado que es un sitio 100% estático, no requiere compiladores ni contenedores obligatorios.

### Opción 1: Abrir directamente en el navegador
Hacer doble clic en `index.html` o abrirlo con cualquier navegador web moderno:
```bash
start index.html
```

### Opción 2: Con servidor HTTP ligero (Python)
```bash
python -m http.server 8085
```
Abrir `http://localhost:8085` en el navegador.

---

## 3. Variables de entorno requeridas

Este repositorio **no utiliza variables de entorno**, ya que es un entregable puramente estático que opera del lado del cliente sin dependencias de backend ni secretos.

---

## 4. ¿Cómo se ejecutan las pruebas?

La verificación de este repositorio consiste en:
1. **Validación HTML5 y W3C:** Asegurar etiquetas semánticas correctas (`header`, `section`, `nav`, `footer`).
2. **Prueba de Invariante de Red:** Verificar en las herramientas de desarrollo del navegador (pestaña Red / Network) que no se dispare ninguna petición hacia `/api/` o endpoints dinámicos.
3. **Prueba de Responsividad:** Comprobar la correcta visualización en pantallas móviles (< 640px) y escritorio (>= 1024px).

---

## 5. Decisiones técnicas relevantes tomadas durante la implementación

1. **Autonomía Total sin Dependencias de Red a la API:**
   - En cumplimiento estricto del enunciado y el Artículo XI, el sitio no interactúa con el backend de Laravel ni con la base de datos MySQL, garantizando disponibilidad inmediata incluso si los servicios de API están apagados.
2. **Diseño Moderno con Tailwind CSS:**
   - Se utiliza el motor de Tailwind para lograr un aspecto visual profesional en modo oscuro, coherente con la paleta de colores de la aplicación SPA (`test-simple-stock-flow-app`).
3. **Divulgación Integral del Ecosistema:**
   - La página documenta de manera transparente los 6 repositorios que componen la prueba y explica los principios de la Arquitectura Onion implementada en el backend.
