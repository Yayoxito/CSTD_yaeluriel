# Breakout Game - Super Ball Edition

### Creado por: **Yael Uriel Ordaz García**
**Fecha:** 25 de marzo de 2026  

---

## Descripción del juego
Este es un videojuego de tipo **Breakout** desarrollado en JavaScript. El objetivo es destruir todos los bloques de la pantalla rebotando una pelota con una paleta controlada por el jugador.

---

## Instrucciones de Juego

### Controles:
*   **[A]**: Mover la paleta a la **Izquierda**.
*   **[D]**: Mover la paleta a la **Derecha**.
*   **[Espacio]**: 
    *   Lanzar la pelota al iniciar o después de perder una vida.
    *   Reiniciar el juego en la pantalla de *Game Over* o *You Win*.

### Reglas:
1.  **Vidas:** Comienzas con **3 vidas**.
2.  **Pérdida de Vida:** Si la pelota toca el borde inferior de la pantalla, perderás una vida.
3.  **Victoria:** Debes destruir todos los bloques (99 bloques en total).
4.  **Derrota:** El juego termina si tus vidas llegan a 0.

---

## Funcionalidad Extra (Super Bola)
Se ha implementado una mecánica de **Power-Up** para hacer el juego más dinámico:

*   **Barra de Carga:** Se llena 1 punto por cada bloque golpeado con la bola normal.
*   **Activación:** Al llegar a **15 puntos**, la bola cambia su color a **cian** y aumenta su velocidad de 0.5 a 0.9.
*   **Ventaja:** En modo Super Bola, los bloques no detienen el rebote de la pelota (la atraviesan), permitiendo destruir filas enteras rápidamente.
*   **Seguro de vida:** Si la Super Bola cae por el borde inferior, el jugador **no pierde una vida**; solo se reinicia la bola y se pierde el efecto especial.

---

## Estructura del Proyecto (Directorio Breakout)
De acuerdo a la organización del repositorio, el contenido relevante es:

```text
/Breakout
  ├── README.md              # Este archivo
  ├── /assets/sprites        # Imágenes (bloque.PNG, fondo.jpg)
  ├── /css                   # Estilos (styles.css)
  ├── /html                  # Estructura (index_breakout.html)
  └── /js                    # Lógica (breakout.js y librerías en /libs)
```
---

## Instalación y Ejecución
Para ejecutar el juego correctamente, sigue estos pasos:
1. Asegúrate de tener clonado el repositorio en tu equipo local.
2. Navega hasta la carpeta: CSTD_yaeluriel/Videojuegos/Breakout/.
3. Entra en la subcarpeta html.
4. Abre el archivo **index_breakout.html** con algun navegador (chrome, edge, etc).
