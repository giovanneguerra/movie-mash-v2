import { Component, Input, inject } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie';
import { MovieService } from 'src/app/core/services/movie.service';
import { Router } from '@angular/router';
import { NoDescriptionPipe } from '../../shared/pipes/no-description.pipe';
import { TrimTextPipe } from '../../shared/pipes/trim-text.pipe';
import { GenrePipe } from '../../shared/pipes/genre.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { NgClass, NgFor, SlicePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TooltipPipe } from 'src/app/shared/pipes/tooltip.pipe';
import { DisplayImagePipe } from 'src/app/shared/pipes/display-image.pipe';

@Component({
  selector: 'moma-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    NgClass,
    ExtendedModule,
    MatTooltipModule,
    MatChipsModule,
    NgFor,
    SlicePipe,
    GenrePipe,
    TrimTextPipe,
    NoDescriptionPipe,
    TooltipPipe,
    DisplayImagePipe,
  ],
})
export class MovieCardComponent {
  movieService = inject(MovieService);
  router = inject(Router);
  @Input() movie: Movie;

  onMovieClick(movieId: number) {
    this.router.navigate(['/movie-detail', movieId]);
  }
}
