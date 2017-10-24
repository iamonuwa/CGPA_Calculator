import { Component} from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { DepartmentPage } from '../department/department';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	private universityList;
	private deparmentList;
	private coursesList;
	private deptPage;
	private loader;
  private levelList;
  
  	constructor(
  		public navCtrl: NavController, 
  		private _db: DatabaseServiceProvider, 
  		public loadingCtrl: LoadingController,
  		public storage: LocalStorageProvider
  		) 
  	{
  		this.getUniversities();
  		this.deptPage = DepartmentPage;
  	}

  	addUni(data)
  	{
  		this._db.addUniversity(data)
  	}
  	addDept(uni, course, desc)
  	{
  		let data ={uni_id: uni, name: course, description: desc}
  		this._db.addDept(data)
  	}
  	addLevels(uni, level, desc)
  	{
  		let data ={dept_id: uni, name: level, description: desc}
  		this._db.addLevels(data)
  	}
  	addCourse(dept,level, course, course_unit)
  	{
  		let data ={dept_id: dept,level_id: level, name: course, unit:course_unit}
  		this._db.addCourse(data)
  	}

  	getUniversities()
  	{
  		this.loader = this.loadingCtrl.create({
	      content: 'Please wait.. loading school',
	      spinner: 'crescent'
	    });
	    this.loader.present();
  		this._db.getUniversity().subscribe((response) =>{
  			if(response)
		    {
		        this.loader.dismissAll();
  				this.universityList = response;
		    }
  			
  		})
  	}
  	getDepartment(data)
  	{
  		if(data)
  		{
  			this._db.getDepartment(data).subscribe((response) =>{
  			this.deparmentList = response;
  		})
  		}
  	}
  	getCourses(data)
  	{
  		if(data)
  		{
  			this._db.getCourses(data).subscribe((response) =>{
  			this.coursesList = response;
  		})
  		}
  	}

  	getDepartmentPage(data)
  	{
    	if(data)
    	{
    		this.navCtrl.push(this.deptPage, {sch_id: data});
    	}else{
    		this.storage.showToast('Please select a School', 'top');
    	}
  	}
    getLevels(data)
    {
      this.loader = this.loadingCtrl.create({
        content: 'Please wait.. loading Courses',
        spinner: 'crescent'
      });
      this.loader.present();
      if(data)
      {
        this._db.getLevels(data).subscribe((response) =>{
        this.levelList = response;
        this.loader.dismissAll();
      })
      }
    }
}
