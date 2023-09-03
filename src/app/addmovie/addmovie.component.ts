import { ActorListDpd } from './../shared/types/ActorListDpd';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { DirectorListDpd } from '../shared/types/DirecorListDpd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Director } from '../shared/types/Director';
import { Actor } from '../shared/types/Actor';
import { Movie } from '../shared/types/Movie';
import { ActivatedRoute, Router } from '@angular/router';
import { Cast } from '../shared/types/Cast';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.scss']
})
export class AddmovieComponent implements OnInit {
  genreList = [
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
  ]
  directorList: DirectorListDpd[] = []
  actorList: ActorListDpd[] = []
  selectedActorIds: string[] = [];
  actorThumb: string = "";
  directorThumb: string = "";
  movieThumb: string = "";
  movieForm: FormGroup;
  directorForm: FormGroup;
  actorForm: FormGroup;
  movieData: any;
  routeMovieId: string = "";


  constructor(private apiService: ApiService, private datePipe: DatePipe, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.movieForm = this.formBuilder.group({
      movieTitle: ['', Validators.required],
      movieReleaseDate: ['', Validators.required],
      movieGenre: ['', Validators.required],
      movieDescription: [''],
      movieDirector: ['', Validators.required],
    })
    this.directorForm = this.formBuilder.group({
      directorFirstName: ['', Validators.required],
      directorLastName: ['', Validators.required],
      directorBirthDate: ['', Validators.required]
    })
    this.actorForm = this.formBuilder.group({
      actorFirstName: ['', Validators.required],
      actorLastName: ['', Validators.required],
      actorGender: ['', Validators.required],
      actorBirthDate: ['', Validators.required]
    })



  }
  setMovieData(data: any) {
    this.movieForm.get('movieTitle')?.setValue(data.title);
    const date = new Date(data.releaseDate)
    this.movieForm.get('movieReleaseDate')?.setValue(date.toISOString().split('T')[0]);
    this.movieForm.get('movieGenre')?.setValue(data.genre);
    this.movieForm.get('movieDescription')?.setValue(data.description);
    this.movieForm.get('movieDirector')?.setValue(data.directorid);
    data.cast.forEach((element: any) => {
      this.selectedActorIds.push(element.actorid._id)
    });
    this.getActorList()
  }
  ngOnInit(): void {
    this.getDirectorList();
    this.getActorList();
    this.route.queryParams.subscribe(params => {
      this.routeMovieId = params['movieId'];
      if (params['movieId']) {
        this.apiService.getMovieById(this.routeMovieId).subscribe((response) => {
          console.log(response);
          this.movieData = response;
          this.setMovieData(response);
        }, (error) => {
          alert(error.error.message);
          this.router.navigate(['/dashboard']);
          return;
        })
      }
    })

  }


  getDirectorList() {
    this.apiService.getAllDirectors().subscribe(res => {
      this.directorList = res;
    })
  }
  getActorList() {
    this.apiService.getAllActors().subscribe(res => {
      this.actorList = res;
    })
  }
  onMovieThumbFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file, 'Movie');
    }
  }
  onDirectorThumbFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file, 'Director');
    }
  }

  onActorThumbFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file, 'Actor');
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
  onSubmitDirector() {
    if (this.directorForm.valid) {
      const data: Director = {
        firstName: this.directorForm.get('directorFirstName')?.value,
        lastName: this.directorForm.get('directorLastName')?.value,
        birthDate: this.directorForm.get('directorBirthDate')?.value,
        thumb: this.directorThumb
      }
      console.log(data);
      this.apiService.addDirector(data).subscribe((res) => {
        this.directorForm.reset();
        alert("Director Added");
        this.getDirectorList();
      }, (error) => {
        alert("Error Adding Director: " + error.error.message)
      })
    }
  }
  onSubmitActor() {
    if (this.actorForm.valid) {
      const data: Actor = {
        firstName: this.actorForm.get('actorFirstName')?.value,
        lastName: this.actorForm.get('actorLastName')?.value,
        birthDate: this.actorForm.get('actorBirthDate')?.value,
        gender: this.actorForm.get('actorGender')?.value,
        thumb: this.actorThumb,
      }
      console.log(data);
      this.apiService.addActor(data).subscribe((res) => {
        this.actorForm.reset();
        alert("Actor Added");
        this.getActorList();
      }, (error) => {
        alert("Error Adding actor: " + error.error.message)
      })
    }
  }
  onSubmitMovie() {
    if (this.movieForm.valid) {
      const data: Movie = {
        title: this.movieForm.get('movieTitle')?.value,
        releaseDate: this.movieForm.get('movieReleaseDate')?.value,
        genre: this.movieForm.get('movieGenre')?.value,
        description: this.movieForm.get('movieDescription')?.value,
        thumb: this.movieThumb,
        director: this.movieForm.get('movieDirector')?.value
      }
      console.log(data);
      console.log(this.selectedActorIds);

      this.route.queryParams.subscribe(params => {
        if (!params['movieId']) {
          console.log('normal movie add');

          //add movie
          this.apiService.addMovie(data).subscribe((res) => {
            if (res) {
              this.apiService.addMovieCast(res._id, this.selectedActorIds).subscribe((res) => {
                this.movieForm.reset();
                alert("Movie Added");
                this.router.navigate(['/dashboard'])
              }, (error) => {
                alert("Error Adding Cast: " + error.error.message)
              })
            }


          }, (error) => {
            alert("Error Adding Movie: " + error.error.message)
          })

        } else {
          console.log('update movie add');
          //update movie cast
          this.apiService.deleteAllCastForMovie(this.routeMovieId).subscribe((res) => {
            //add again
            this.apiService.addMovieCast(this.routeMovieId, this.selectedActorIds).subscribe((res) => {
              this.apiService.updateMovie(this.routeMovieId, data).subscribe((res) => {
                if (res) {
                  this.movieForm.reset();
                  alert("Movie Updated");
                  this.router.navigate(['/dashboard'])
                }
              }, (error) => {
                alert("Error Adding Movie: " + error.error.message)
              })
            }, (error) => {
              alert("Error Adding Cast: " + error.error.message)
            })
          }, (err) => {
            console.error(err.error.message);

          })
        }
      })
    }
  }
}
