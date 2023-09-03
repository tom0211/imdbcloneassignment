import { Actor } from '../shared/types/Actor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { Director } from '../shared/types/Director';
import { DirectorListDpd } from '../shared/types/DirecorListDpd';
import { Movie } from '../shared/types/Movie';
import { MovieListDpd } from '../shared/types/MovieListDpd';
import { ActorListDpd } from '../shared/types/ActorListDpd';
import { Cast } from '../shared/types/Cast';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  actorForm: FormGroup;
  directorForm: FormGroup;
  movieForm: FormGroup;
  castForm: FormGroup;

  movieGenres: string[] = [
    'Action',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Animation',
    'Crime',
    'Experimental',
    'Historical',
    'Romance',
    'Science Fiction',
    'Thriller',
    'Western',
    'Others'
  ];
  directorList: DirectorListDpd[] = [];
  movieList: MovieListDpd[] = [];
  actorList: ActorListDpd[] = [];

  actorThumb: string = "";
  directorThumb: string = "";
  movieThumb: string = "";

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.actorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: [''],
      gender: ['Male'],
      thumb: ['', Validators.required]
    });
    this.directorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: [''],
      thumb: ['']
    });
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      releaseDate: ['', Validators.required],
      genre: [''],
      description: [''],
      thumb: ['', Validators.required],
      director: ['']
    });
    this.castForm = this.fb.group({
      movieid: ['', Validators.required],
      actorid: ['', Validators.required],
      role: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadDirectors();
    this.loadMovies();
    this.loadActors();
  }
  loadDirectors() {
    this.apiService.getAllDirectors().subscribe(
      (directors) => {
        this.directorList = directors
      },
      (error) => {
        console.log('Error fetching directors:' + error)
      }
    )
  }
  loadMovies() {
    this.apiService.getAllMovies().subscribe(
      (movies) => {
        this.movieList = movies
      },
      (error) => {
        console.log('Error fetching movies:' + error)
      }
    )
  }
  loadActors() {
    this.apiService.getAllActors().subscribe(
      (actors) => {
        this.actorList = actors
      },
      (error) => {
        console.log('Error fetching movies:' + error)
      }
    )
  }
  onActorThumbFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file, 'Actor');
    }
  }
  onDirectorThumbFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file, 'Director');
    }
  }
  onMovieThumbFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file, 'Movie');
    }
  }
  convertToBase64(file: File, value: string) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (value === 'Actor') {
        this.actorThumb = reader.result ? reader.result.toString() : "";
      }
      if (value === 'Director') {
        this.directorThumb = reader.result ? reader.result.toString() : "";
      }
      if (value === 'Movie') {
        this.movieThumb = reader.result ? reader.result.toString() : "";
      }

    };
  }
  onSubmitActor() {
    if (this.actorForm.valid) {
      const data: Actor = {
        firstName: this.actorForm.get('firstName')?.value,
        lastName: this.actorForm.get('lastName')?.value,
        birthDate: this.actorForm.get('birthDate')?.value,
        gender: this.actorForm.get('gender')?.value,
        thumb: this.actorThumb,
      }
      this.apiService.addActor(data).subscribe((res) => {
        alert("Actor Added");
        window.location.reload();
        // this.router.navigate(['/add']) //create actor list and route
      }, (error) => {
        alert("Error Adding actor: " + error.error.message)
      })
    }
  }
  onSubmitDirector() {
    if (this.directorForm.valid) {
      const data: Director = {
        firstName: this.directorForm.get('firstName')?.value,
        lastName: this.directorForm.get('lastName')?.value,
        birthDate: this.directorForm.get('birthDate')?.value,
        thumb: this.directorThumb
      }
      this.apiService.addDirector(data).subscribe((res) => {
        alert("Director Added");
        window.location.reload();
        // this.router.navigate(['/add']) //create director list and route
      }, (error) => {
        alert("Error Adding Director: " + error.error.message)
      })
    }
  }
  onSubmitMovie() {
    if (this.movieForm.valid) {
      const data: Movie = {
        title: this.movieForm.get('title')?.value,
        releaseDate: this.movieForm.get('releaseDate')?.value,
        genre: this.movieForm.get('genre')?.value,
        description: this.movieForm.get('description')?.value,
        thumb: this.movieThumb,
        director: this.movieForm.get('director')?.value
      }
      this.apiService.addMovie(data).subscribe((res) => {
        alert("Movie Added");
        window.location.reload();
        // this.router.navigate(['/add']) //create director list and route
      }, (error) => {
        alert("Error Adding Movie: " + error.error.message)
      })
    }
  }
  onSubmitCast() {
    if (this.castForm.valid) {
      const data: Cast = {
        movieid: this.castForm.get('movieid')?.value,
        actorid: this.castForm.get('actorid')?.value,
        role: this.castForm.get('role')?.value,
      }
      this.apiService.addCast(data).subscribe((res) => {
        alert("Cast Added");
        window.location.reload();
        // this.router.navigate(['/add']) //create director list and route
      }, (error) => {
        alert("Error Adding Cast: " + error.error.message)
      })
    }
  }
}