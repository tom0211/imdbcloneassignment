import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movieedit',
  templateUrl: './movieedit.component.html',
  styleUrls: ['./movieedit.component.scss']
})
export class MovieeditComponent implements OnInit {
  movieData: any;
  title: string = "";
  releaseDate: string = "";
  genre: string = "";
  description: string = ''
  directorId: string = ''


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      const movieId = params['movieId'];

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
  onClickSave() {

  }
}
