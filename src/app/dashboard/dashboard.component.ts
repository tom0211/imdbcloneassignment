import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { NavigationExtras, Router } from '@angular/router';
import { Movie } from '../shared/types/Movie';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searchQuery: string = '';
  searchFilter: string = '';

  movieList: Movie[] = [];
  constructor(private apiService: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.getMovieList();
  }
  getMovieList() {
    if (this.searchQuery.length > 0) {
      if (this.searchFilter === 'Titles') {
        this.apiService.searchByMovieTitle(this.searchQuery).subscribe((res) => {
          this.movieList = res;
        }, (error) => {

        })
      }
      if (this.searchFilter === 'Actor') {
        console.log('searchingf by actor');
        this.apiService.searchByMoviesActor(this.searchQuery).subscribe((res) => {
          this.movieList = res;
        }, (error) => {

        })
      }

    } else {
      console.log("default movie list");
      this.apiService.getAllMoviesList().subscribe((res) => {
        this.movieList = res;
        console.log(res);

      }, (error) => {

      })

    }



  }

  updateQueryViaSearch(data: { query: string, filter: string }) {
    this.searchQuery = data.query;
    this.searchFilter = data.filter;
    this.getMovieList();
  }

  checkDetailsOfMovie(movie: any) {
    const navigationExtra: NavigationExtras = {
      queryParams: {
        movieId: movie._id
      }
    }
    this.router.navigate(['/movie'], navigationExtra);
  }
}
