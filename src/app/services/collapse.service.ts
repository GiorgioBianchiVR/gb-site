import { Injectable } from '@angular/core';
import { CollapseSection } from '../models/CollapseSection';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CollapseService {

  sections: CollapseSection[] = [];

  constructor(private http: HttpClient) { }

  initializeSections(path: string) {
    this.http.get<CollapseSection[]>(path)
    .subscribe(data => {
      this.sections = data;
    });
  }

}
