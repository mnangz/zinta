import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by" style="text-align: centre;">
      Developed by <b><a href="" target="_blank">Zintle Zide & Tamuka Mnangagwa</a></b>
    </span>
  `,
})
export class FooterComponent {
}
