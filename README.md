# Sistema de Gestión y Administración de Citas (SGAC)
_Este sistema se encargará de la administración de citas del cuerpo estudiantil universitario._

## Colaboradores 💻
* Miguel Alejandro Gutierrez Ortega.
* Daniela Marquez Galindo.
* Armando Muñoz Hernandez.
* María Isabel Pérez Mendoza.

## Objetivo del proyecto 📋
Mejorar el proceso de agendación de citas en las diferentes áreas y procesos administrativos de la Universidad Tecnológica de Xicotepec de Juárez, para evitar aglomeraciones en la institución educativa.

## Tipos de usuario 👥
* **Alumno.** Este usuario podrá agendar una cita a cualquier área administrativa de la institución.
* **Administrador.** Este se encargará de gestionar y manipular la información de todo el sistema.
* **Administrador de Área.** Este usuario podrá cambiar el estatus de las citas a confirmada, finalizada o cancelada.

### Funcionalidades ⌨️

```
* Los usuarios podrán logearse para de esta manera tener sincronización entre la cita y la persona que a realizado dicha cita
* Se podrá crear una cita para que de esta manera los alumnos hagan un espacio para tratar los asuntes pertinentes con las partes involucradas
* En caso de haber error o inconveniente, la cita se podrá eliminar
* El propietario de la cita podrá obtener un registro en donde se le indique el día, la hora y el lugar en donde será citado
* Las áreas podrán visualizar las solicitudes de cita
* Las áreas podrán determinar el día, la hora y el lugar en donde se agendará la cita
* Las áreas podrán eliminar cancelar una cita ya establecida
```

## Entornos de desarrollo 🛠️
1. FrontEnd:
    - _Angular._ Se utilizará este framework para la creación de un sistema basado en MVC (Modelo, Vista, Controlador).
    - _Bootstrap._ A través de este framework, se dará diseño a la interfaz del sistema.

2. BackEnd:
    - _TypeScript._ Por medio de este, se codificará la lógica del proyecto, ya que gracias al framework de Angular se hará uso del modelo, vista, controlador.

3. Base de Datos:
    - _Cloud Firestore_ Usaremos este tipo de base de datos NoSQL por medio de la plataforma Firebase, pues esta nos brindará funcionalidades adicionales al desarrollo de nuestro proyecto.

