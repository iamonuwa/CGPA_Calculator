import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/*
  Generated class for the DatabaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseServiceProvider {

	items: FirebaseListObservable<any[]>;

  	constructor(public http: Http, private db: AngularFireDatabase) {
    	//console.log('Hello DatabaseServiceProvider Provider');
  	}
  	getUniversity()
  	{
  		return this.db.list('/universities');//.map(response => {response});
  	}
    getDepartment(data)
    {
      return this.db.list('/departments', {
        query: {
          orderByChild: 'uni_id',
          startAt: data
        }
      });//.map(response => {response});
    }
    getLevels(data)
    {
      return this.db.list('/levels', {
        query: {
          orderByChild: 'dept_id',
          equalTo: data
          //startAt: data
        }
      });//.map(response => {response});
    }
    getCourses(data)
    {
      return this.db.list('/courses', {
        query: {
          orderByChild: 'dept_id',
          equalTo: data
          //startAt: data
        }
      });//.map(response => {response});
    }

    addUniversity(data)
    {
      return this.db.list('/universities').push(data);
    }

    addDept(data)
    {
      return this.db.list('/departments').push(data);
    }
    addCourse(data)
    {
      return this.db.list('/courses').push(data);
    }
     addLevels(data)
    {
      return this.db.list('/levels').push(data);
    }
}
