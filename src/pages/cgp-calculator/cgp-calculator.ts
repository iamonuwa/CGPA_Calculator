import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  LoadingController, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
//import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { EditCgpPage } from '../edit-cgp/edit-cgp';
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
  level;
  dept;
  grade;
  course;
  selectedCourse;
  cgpData = [];
  	constructor(
	  	public navCtrl: NavController, 
	  	public navParams: NavParams,
		  private _db: DatabaseServiceProvider, 
		  public loadingCtrl: LoadingController,
	    private _fb: FormBuilder,
      public modalCtrl: ModalController
		//public localStorage: LocalStorageProvider
  		) {
      
  		this.dept_id = this.navParams.get('dept_id');
  		this.level_id = this.navParams.get('level_id');
  		this.getCourses(this.level_id);
      this.getDept(this.dept_id)
      this.getLevel(this.level_id)
  	}

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CgpCalculatorPage');
  }

  ngOnInit() {
  		this.cgpForm = this._fb.group({
        course_id: [null, Validators.compose([Validators.required])],
        exam_score: [null, Validators.compose([Validators.required])],
        quiz_score: [null, Validators.compose([Validators.required])],
  			//cgp : this._fb.array([ this.createItem() ])
  		})
  	}
  	/**
  	 * @method createItem
  	 * create new form group
  	 * @return true
  	 */
  	createItem(): FormGroup {
	  	return this._fb.group({
		    course_id: [null, Validators.compose([Validators.required])],
		    exam_score: [null],
		    quiz_score: [null, Validators.compose([Validators.required])],
		   // compulsory: [null]
		  });
	}
	/**
  	 * @method addItem
  	 * add new form group dynamically
  	 * @return true
  	 */
	addItem(): void {
		this.items = this.cgpForm.get('cgp') as FormArray;
		this.items.push(this.createItem());
	}

	/**
  	 * @method deleteItem
  	 * delete form group dynamically
  	 * @return true
  	 */
	deleteItem(index: number): void {
        const arrayControl = <FormArray>this.cgpForm.controls['cgp'];
        arrayControl.removeAt(index);
    }

    getCourses(data)
  	{
  		if(data)
  		{
  			this._db.getCourses(data).subscribe((response) =>{
    			this.courseList = response;
    		})
  		}
  	}

    getDept(dept_key)
    {
      this._db.getSingleDept(dept_key).subscribe((response) => {
        this.dept = response;
      })
    }
    getLevel(level_key)
    {
      this._db.getSingleLevel(level_key).subscribe((response) => {
        this.level = response;
      })
    }

    gradeCalculator(total)
    {
      if(total >= 70 && total <= 100)
      {
         return this.grade =  'A';
      }
      if(total >= 50 && total <= 69)
      {
         return this.grade =  'B';
      }
      if(total >= 40 && total <= 49)
      {
         return this.grade =  'C';
      }
      if(total >= 30 && total <= 39)
      {
         return this.grade =  'D';
      }
      if(total < 30)
      {
         return this.grade =  'E';
      }
    }

    selectCourse(course)
    {
      this.selectedCourse = course;
    }

    gradePoint()
    {
      let gradeP = [
        {grade: 'A', value: 5},
        {grade: 'B', value: 4},
        {grade: 'C', value: 3},
        {grade: 'D', value: 2},
        {grade: 'E', value: 1},
      ];
      for (var i in gradeP) {
            if(gradeP[i].grade == this.grade)
            {
              return gradeP[i].value * this.selectedCourse.unit;
            }
          
        }
    }

    addGpCourse(formData)
    {
      console.log(formData)
      this.cgpData.push(formData)
      this.cgpForm.reset();
      console.log(this.cgpData)
       let item = this.courseList.indexOf(this.selectedCourse);
       this.courseList.splice(item, 1);


    }

    editCgpModal() {
    let modal = this.modalCtrl.create(EditCgpPage, {cgp_data: this.cgpData });
    modal.present();
  }
}
