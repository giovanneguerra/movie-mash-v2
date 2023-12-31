import { Component, Input, Signal } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { NgIf, NgFor } from '@angular/common';
import { TooltipPipe } from 'src/app/shared/pipes/tooltip.pipe';

@Component({
  selector: 'moma-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, MovieCardComponent, MatProgressSpinnerModule],
})
export class MoviesListComponent {
  @Input() title: string;
  @Input() moviesList: Signal<Movie[]>;
}
