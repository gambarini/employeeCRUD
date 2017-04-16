import { Component }          from '@angular/core';

@Component({
  selector: 'my-app',
  template: `

    <employees-list></employees-list>

  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee';
}
