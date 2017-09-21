import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { CgpCalculatorPage } from '../cgp-calculator/cgp-calculator';

/**
 * Generated class for the DepartmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-department',
  templateUrl: 'department.html',
})
export class DepartmentPage {

	private sch_id;
	private deparmentList;
	private levelList;
	private loader;
	public dept;
	public level;
	private deptLevelForm: FormGroup;
  private cgpPage;
  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams, 
    	private _db: DatabaseServiceProvider,
    	public loadingCtrl: LoadingController,
    	private _fb: FormBuilder,
  		) {
  		this.sch_id = this.navParams.get('sch_id');
  		this.getDepartment(this.sch_id);
      this.cgpPage = CgpCalculatorPage;
  	}
  	ngOnInit()
  	{
  		this.deptLevelForm = this._fb.group({
  			dept_id: [null, Validators.compose([Validators.required])],
  			level_id: [null, Validators.compose([Validators.required])]
  		})
  	}
  	ionViewDidLoad() {

    	//console.log('ionViewDidLoad DepartmentPage');
  	}

  	getDepartment(data)
  	{
  		this.loader = this.loadingCtrl.create({
	      content: 'Please wait.. loading Department',
	      spinner: 'crescent'
	    });
	    this.loader.present();
  		console.log(data)
  		if(data)
  		{
  			this._db.getDepartment(data).subscribe((response) =>{
		    this.loader.dismissAll();
  			this.deparmentList = response;
  		})
  		}
  	}

  	getLevels(data)
  	{
  		console.log(data)
  		this.loader = this.loadingCtrl.create({
	      content: 'Please wait.. loading Courses',
	      spinner: 'crescent'
	    });
	    this.loader.present();
  		if(data)
  		{
  			this._db.getLevels(data).subscribe((response) =>{
  			this.levelList = response;
  			console.log(this.levelList)
		    this.loader.dismissAll();
  		})
  		}
  	}

  	cgpaPage(data)
  	{
  		console.log(data)
      this.navCtrl.setRoot(this.cgpPage);
  	}

}
