# Platzinger

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Notas

### Interfaces
Los tipos de datos Interfaces de TypScript, son muy parecidos a una clase, en la que se definen propiedades internas que pueden ser de cualquiera de los otros tipos. Estas propiedades internas pueden definirse como obligatorias u opcionales usando el símbolo “”?"". Las interfaces definen en cierto modo estructuras personalizadas de datos en las que lo principal es que al ser implementadas usando ciertas IDEs (como Webstorm), muestran mensajes de control y validación para asegurar el uso adecuado de dicha interface, en tiempo real durante el desarrollo.

La forma de declarar una interface se puede ver en el siguiente ejemplo:

```
export interface User {
  nick: string,
  subnick?: string,
  age?: number,
  email: string,
  friend: boolean,
  uid: any
}
```

### *ngFor

NgFor es una directiva estructural que afecta (agrega, modifica o elimina) un elemento HTML. Las directivas estructurales las identificamos porque llevan un * antes de la directiva, por ejemplo: *ngFor

NgFor nos permite recorrer un arreglo de datos y por cada elemento generar o imprimir en el DOM un elemento HTML nuevo, con algún valor cambiado basado en el elemento leído del arreglo.

```
<p *ngFor="let user of friends; let i = index">
 {{ i }}. {{ user.nick }} - {{ user.email }}
</p>
```

### *ngIf

NgIF es una directiva estructural de Angular que evalúa un valor o una expresión buleana, en función de la cual se mostrará o no, un elemento HTML. El elemento se mostrará sólo cuando la condición sea verdadera (true).

```
ng-container *ngFor="let user of friends; let i = index">
  <p *ngIf="user.friend" >
    {{ i }}. {{ user.nick }} - {{ user.email }}
  </p>
</ng-container>
```

### Navegacion con Parametros

Al navegar entre pantallas, hay ocasiones en las que es necesario pasar datos particulares. Usando routerLink podemos incluir parámetros de manera similar a como lo hacemos con subdominios o subdirectorios. Para recibir e interpretar estos parámetros correctamente es necesario definir las rutas específicas en appRoutes y consultarlos luego en el componente con el objeto ActivatedRoute.

El componente que recibe los parametros debe realizar este import: `import { ActivatedRoute } from '@angular/router';`
En el constructor realizar lo siguiente:

```
export class ConversationComponent implements OnInit {
  friendId: any;
  constructor(private activatedRoute: ActivatedRoute) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);
   }

  ngOnInit() {
  }
}
```

En el array de rutas se debe incorporar el parametros en el path que se va a mandar:

```
const appRoutes: Routes = [
  { path: 'conversation/:uid', component: ConversationComponent },
];
```

### Servicios

Un servicio es una clase que puede ser inyectada en uno o varios componentes y que es muy útil para compartir datos o funciones entre éstos, evitando la duplicidad de código.

Se crean a través del Angular CLI con el siguiente comando:

`ng generate service <directorio>/<nombre del servicio>`
Al ejecutar este comando se generan en nuestro proyecto los siguientes archivos:
```
/<directorio>
  <nombre del servicio>.service.spec.ts
  <nombre del servicio>.service.ts
```
Luego en el componente, inyectamos el Servicio de manera similar a cómo inyectamos el ActivatedRoute.

```
export class HomeComponent implements OnInit {
  friends: User[];
  constructor(private userService: UserService) { 
    this.friends = userService.getFriends();
  }
  
  ngOnInit() {}
}
```

### Pipes

Los pipes en angular, son elementos que se pueden incluir en el HTML y nos permiten aplicar transformaciones a los datos antes de mostrarlos.

Algunos de los pipes más usados son:

1. json
2. number: ‘<formato-decimal>’
3. date: ‘<formato de fecha>’

```
<p>
  {{ friend | json }}
</p>
<p>
  {{ price | number: '1.2-2' }}
</p>
<p>
  {{ today | date: 'short' }}
</p>
<p>
  {{ today | date: 'medium' }}
</p>
<p>
  {{ today | date: 'full' }}
</p>
<p>
  {{ today | date: 'EEEE dd/MM/yy' }}
</p>
```

output:
```
{ "nick": "Eduardo", "subnick": "Mi mensaje personal", "status": "online", "age": 28, "email": "eduardo@platzi.com", "friend": true, "uid": 1 }

78.23

3/27/19, 1:43 PM

Mar 27, 2019, 1:43:00 PM

Wednesday, March 27, 2019 at 1:43:00 PM GMT-03:00

Wednesday 27/03/19
```

Puedes consultar más formatos en la documentación oficial de [Angular - Pipes](https://angular.io/api/common/DatePipe).

#### Pipes - Custom

Para crear un pipe personalizado debemos crear un archivo de TypeScript e importar las clases Pipe y PipeTransform desde @angular/core.

```
import {Pipe, PipeTransform} from '@angular/core';

@Pipe ({
  name: 'nombre-del-pipe' // --- este es el nombre con que se implementa en el html
})
export class MiCustomPipe implements PipeTransform {
  public transform ( value, args: string ) {
     return <valor transformado>
  }
}
```

### Estilos

Se recomienda instalar los paquetes con versiones exactas para evitar incompatibilidades con versiones futuras de las librerías.

`npm install bootstrap --save-exact`
`npm install @fortawesome/fontawesome-free --save-exact`

Luego de instalados los paquetes con npm, la implementación se hace importando las librerías en la sección styles del archivo angular.json

...
  ""styles"": [
    ""node_modules/bootstrap/dist/css/bootstrap.css"",
    ""node_modules/@fortawesome/fontawesome-free/css/all.css"",
    ""src/styles.css""
  ]
...