import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Movie } from '../shared/types/Movie';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.scss']
})
export class MoviedetailsComponent implements OnInit {
  movieData: any;
  movieId: string = "";
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      const movieId = params['movieId'];
      this.movieId = movieId;
      if (!movieId) {
        this.router.navigate(['/dashboard']);
        return;
      }
      this.apiService.getMovieById(movieId).subscribe((response) => {
        console.log(response);
        this.movieData = response
      }, (error) => {
        alert(error.error.message);
        this.router.navigate(['/dashboard']);
        return;
      })
    })
  }
  ngOnInit(): void {

  }
  onClickEdit() {
    const navigationExtra: NavigationExtras = {
      queryParams: {
        movieId: this.movieId
      }
    }
    this.router.navigate(['/add'], navigationExtra);
  }

  onClickDelete() {
    this.apiService.deleteMovie(this.movieId).subscribe(res => {
      alert("Movie Deleted.")
      this.router.navigate(['/dashboard']);
    })
  }
}
