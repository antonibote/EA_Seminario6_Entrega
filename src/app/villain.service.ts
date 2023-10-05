import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Villain } from './villain';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class VillainService {
  
  constructor(
  private messageService: MessageService,
    private http: HttpClient
    ) { }

    /* //To return an array of mock heroes
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }
  */
 
  //The heroes web API expects a special header in HTTP save requests:
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private villainsUrl = 'api/villains';  // URL to web api


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  /** GET heroes from the server */
  getVillains(): Observable<Villain[]> {
    return this.http.get<Villain[]>(this.villainsUrl)
      .pipe(
        tap(_ => this.log('fetched villains')),
        catchError(this.handleError<Villain[]>('getVillains', []))
     );
  }
/*
  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
  */

  /** GET hero by id. Will 404 if id not found */
  getVillain(id: number): Observable<Villain> {
    const url = `${this.villainsUrl}/${id}`;
    return this.http.get<Villain>(url).pipe(
      tap(_ => this.log(`fetched villain id=${id}`)),
      catchError(this.handleError<Villain>(`getHero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateVillain(villain: Villain): Observable<any> {
    return this.http.put(this.villainsUrl, villain, this.httpOptions).pipe(
      tap(_ => this.log(`updated villain id=${villain.id}`)),
      catchError(this.handleError<any>('updateVillain'))
    );
  }

  /** POST: add a new hero to the server */
  addVillain(villain: Villain): Observable<Villain> {
    return this.http.post<Villain>(this.villainsUrl, villain, this.httpOptions).pipe(
      tap((newVillain: Villain) => this.log(`added villain w/ id=${newVillain.id}`)),
      catchError(this.handleError<Villain>('addVillain'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteVillain(id: number): Observable<Villain> {
    const url = `${this.villainsUrl}/${id}`;

    return this.http.delete<Villain>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted villain id=${id}`)),
      catchError(this.handleError<Villain>('deleteVillain'))
    );
  }

    /* GET heroes whose name contains search term */
  searchVillains(term: string): Observable<Villain[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
   }
    return this.http.get<Villain[]>(`${this.villainsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found villains matching "${term}"`) :
         this.log(`no villains matching "${term}"`)),
     catchError(this.handleError<Villain[]>('searchVillains', []))
   );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
  this.messageService.add(`VillainService: ${message}`);
  }
}
