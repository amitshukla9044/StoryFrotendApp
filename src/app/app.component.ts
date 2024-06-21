import { Component } from '@angular/core';
import { TestserviceService } from './testservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DemoApp';
  errorMsg='';
  noOfRecordsPerPage = 10;
  pageNumber = 0;
  storyNumberList: any = [];
  storyDetailListMaster: any = [];
  storyDetailListSearchMaster: any = [];
  storyDetailList: any = [];
  isLoader:boolean=true;
  constructor(private testserviceService: TestserviceService, private router: Router) {
   
  }
  ngOnInit() {
    this.getTopStoryList()
  }
  getTopStoryList() {
   
    this.testserviceService.getTopStoryList().subscribe(
      result => {
      
      this.storyDetailListSearchMaster = result;
      this.storyDetailListMaster=result;
      this.applyPagging();
     
    },
    (err)=>{
     
      this.errorMsg='Error Occurred'}
    
  )
  }


  // Apply pagging with slice function in array
  applyPagging() {
  
    this.isLoader=false;
    this.storyDetailList = this.storyDetailListSearchMaster.slice(this.pageNumber * this.noOfRecordsPerPage,
      (this.pageNumber * this.noOfRecordsPerPage) + this.noOfRecordsPerPage);

   
  }

  // For next and privous button, pagging apply here
  callNextPrecStory(text: string) {
   
    this.isLoader=true;
    if (text == 'Prev')
      this.pageNumber = this.pageNumber - 1;
    if (text == 'Next')
      this.pageNumber = this.pageNumber + 1;
    this.applyPagging();
  }

  // it call when you click on search button
  autoSearch(searchText: string) {
   
    if (searchText == '')
      return;
    this.isLoader=true;
    this.storyDetailListSearchMaster = this.storyDetailListMaster.filter((a: any) => a.title.toLowerCase().indexOf(searchText) > -1);
    this.pageNumber = 0;
    this.applyPagging();
  }
  // for clear the data of input search
  clearSearch() {
    this.storyDetailListSearchMaster = this.storyDetailListMaster;
    this.pageNumber = 0;
    this.applyPagging();
  }

  convertDecimal() {
    if ((this.storyDetailListSearchMaster.length / this.noOfRecordsPerPage).toString().indexOf('.') > -1)
      return Math.trunc(this.storyDetailListSearchMaster.length / this.noOfRecordsPerPage) + 1
    else
      return Math.trunc(this.storyDetailListSearchMaster.length / this.noOfRecordsPerPage)
  }
}
