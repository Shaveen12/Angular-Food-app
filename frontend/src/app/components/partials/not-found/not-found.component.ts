import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  @Input()
  visible = false;

  @Input()
  notFoundMessage = 'Not Found';

  @Input()
  resetLinkText = "Reset";

  @Input()
  resetLinkRoute = "/";
}
