import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInAnimation = 
  trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.95)' }),
      animate('400ms ease-out', 
              style({ opacity: 1, transform: 'scale(1)' }))
    ])
  ]);
