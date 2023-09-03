import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actor } from './types/Actor';
import { Director } from './types/Director';
import { Movie } from './types/Movie';
import { Cast } from './types/Cast';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  login(uname: string, pswd: string): Observable<any> {
    const loginData = { username: uname, password: pswd };
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  register(username: string, password: string): Observable<any> {
    const user = { username: username, password: password };
    return this.http.post(`${this.baseUrl}/addUser`, user);
  }

  //Adding Actor
  addActor(data: Actor): Observable<any> {
    return this.http.post(`${this.baseUrl}/actors`, data);
  }
  //Adding Director
  addDirector(data: Director): Observable<any> {
    return this.http.post(`${this.baseUrl}/directors`, data);
  }

  addMovie(data: Movie): Observable<any> {
    return this.http.post(`${this.baseUrl}/movies`, data);
  }
  updateMovie(id: string, data: Movie): Observable<any> {
    return this.http.put(`${this.baseUrl}/movies/${id}`, data);
  }

  deleteMovie(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/movies/${id}`);
  }
  deleteAllCastForMovie(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteAllCastForMovie/${id}`);
  }
  addCast(data: Cast): Observable<any> {
    return this.http.post(`${this.baseUrl}/cast`, data);
  }

  getAllDirectors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/directorsList`);
  }
  getAllActors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/actors`);
  }
  getAllMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/moviesTitle`);
  }
  getAllMoviesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movies`);
  }
  getMovieById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/movies/${id}`);
  }
  addMovieCast(movieId: string, actorList: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/addMovieCast/${movieId}`, actorList);
  }
  searchByMovieTitle(title: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/moviesSearch?title=${title}`)
  }
  searchByMoviesActor(actorName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/moviesSearchByActor?actorname=${actorName}`)
  }
}
