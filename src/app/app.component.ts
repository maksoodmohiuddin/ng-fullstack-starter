import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#">MyWeatherApp</a>
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myWeatherApp';
}
