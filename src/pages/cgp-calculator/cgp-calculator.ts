import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  LoadingController,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { DepartmentPage } from '../department/department';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
/**
 * Generated class for the CgpCalculatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cgp-calculator',
  templateUrl: 'cgp-calculator.html',
})
export class CgpCalculatorPage {

	private cgpForm: FormGroup;
	items;
	private level_id;
	private dept_id;
	private courseList
  	constructor(
	  	public navCtrl: NavController, 
	  	public navParams: NavParams,
		private _db: DatabaseServiceProvider, 
		public loadingCtrl: LoadingController,
	    private _fb: FormBuilder,
		public localStorage: LocalStorageProvider
  		) {
  		this.dept_id = this.navParams.get('dept_id');
  		this.level_id = this.navParams.get('level_id');
  		this.getCourses(this.level_id);
  	}

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CgpCalculatorPage');
  }

  ngOnInit() {
  		this.cgpForm = this._fb.group({
  			fees : this._fb.array([ this.createItem() ])
  		})
  	}
  	/**
  	 * @method createItem
  	 * create new form group
  	 * @return true
  	 */
  	createItem(): FormGroup {
	  	return this._fb.group({
		    ledger_id: [null, Validators.compose([Validators.required])],
		    description: [null],
		    amount: [null, Validators.compose([Validators.required])],
		    compulsory: [null]
		  });
	}
	/**
  	 * @method addItem
  	 * add new form group dynamically
  	 * @return true
  	 */
	addItem(): void {
		this.items = this.cgpForm.get('fees') as FormArray;
		this.items.push(this.createItem());
	}

	/**
  	 * @method deleteItem
  	 * delete form group dynamically
  	 * @return true
  	 */
	deleteItem(index: number): void {
        const arrayControl = <FormArray>this.cgpForm.controls['fees'];
        arrayControl.removeAt(index);
    }

    getCourses(data)
  	{
  		if(data)
  		{
  			this._db.getCourses(data).subscribe((response) =>{
  			this.courseList = response;
  			console.log(this.courseList)
  		})
  		}
  	}
}
