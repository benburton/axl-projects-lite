import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Project } from './project';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProjectService {
  private projectsUrl = 'api/projects';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getProjects(): Promise<Project[]> {
    return this.http.get(this.projectsUrl)
      .toPromise()
      .then(response => response.json().data as Project[])
      .catch(this.handleError);
  }

  getProject(id: number): Promise<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Project)
      .catch(this.handleError);
  }

  update(project: Project): Promise<Project> {
    const url = `${this.projectsUrl}/${project.id}`;
    return this.http
      .put(url, JSON.stringify(project), { headers: this.headers })
      .toPromise()
      .then(() => project)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(): Promise<Project> {
    return this.http
      .post(this.projectsUrl, JSON.stringify({header: 'New Project'}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Project)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // replace this with a UI component that shows error condition
    return Promise.reject(error.message || error);
  }

}
