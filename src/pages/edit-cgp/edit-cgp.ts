import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';

/**
 * Generated class for the EditCgpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-cgp',
  templateUrl: 'edit-cgp.html',
})
export class EditCgpPage {

	cgpData;
	constructor(
	  	public navCtrl: NavController, 
	  	public navParams: NavParams,
	  	public viewCtrl: ViewController
	  	) {
	  		this.cgpData = this.navParams.get('cgp_data');
	  		console.log(this.cgpData)

	}

	ionViewDidLoad() {
	    console.log('ionViewDidLoad EditCgpPage');
	}
	dismiss() {
		this.viewCtrl.dismiss();
	}

	totalScore(quiz_score, exam_score)
	{
		return parseInt(quiz_score) + parseInt(exam_score);
	}
}
