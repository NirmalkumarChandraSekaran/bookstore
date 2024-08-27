import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookstoreserviceService } from '../services/bookstore-service/bookstoreservice.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrl: './bookstore.component.css',
})
export class BookstoreComponent implements OnInit {
  constructor(
    private Bookstore: BookstoreserviceService,
    private router: Router
  ) {
    this.currentpath = this.router.url;
    console.log(this.currentpath);
    this.path = this.currentpath.split('/');

    if (this.path[this.path.length - 1] == 'Bookstore') {
      this.changepath = true;
    } else {
      console;
    }
  }
  @Output() update2 = new EventEmitter();
  @Output() difference = new EventEmitter();
  bookid: number = 0;
  data: any[] = [];
  FormGroup1!: FormGroup;
  currentpath = '';
  path: string[] = [];
  changepath: boolean = false;
  diff: number = 0;
  oldinventory: number = 0;
  ngOnInit() {
    this.loaddata();

    this.FormGroup1 = new FormGroup({
      inventory: new FormControl(''),
      sellingPrice: new FormControl(''),
    });
  }
  loaddata() {
    this.Bookstore.getbooks().subscribe((res) => {
      this.data = res;
    });
  }
  visible: boolean = false;

  showDialog(value: number) {
    console.log(value);
    this.bookid = value;
    this.Bookstore.getbookbyid(value).subscribe((value1: any) => {
      this.FormGroup1.setValue({
        inventory: value1.inventory,
        sellingPrice: value1.sellingPrice,
      });
      console.log(value1.inventory);
      if (value1.inventory == null) {
        value1.inventory = '0';
      }
      this.oldinventory = parseInt(value1.inventory);
      console.log(this.oldinventory);
    });
    this.visible = true;
  }
  update() {
    let inventory = this.FormGroup1.get('inventory')?.value;
    let sellingPrice = this.FormGroup1.get('sellingPrice')?.value;
    debugger;
    let invent1 = parseInt(inventory);
    if (this.oldinventory < invent1) {
      this.diff = invent1 - this.oldinventory;
    } else if (this.oldinventory > invent1) {
      this.diff = this.oldinventory - invent1;
    } else {
      this.diff = this.oldinventory;
    }

    this.Bookstore.getbookbyid(this.bookid).subscribe((value: any) => {
      if (value) {
        value.inventory = inventory;
        value.sellingPrice = sellingPrice;
        console.log(value);
        this.Bookstore.updatedate(this.bookid, value).subscribe(
          (update1: any) => {
            if (update1) {
              console.log(update1);
              this.difference.emit(this.diff);
              this.update2.emit(update1);
              console.log('updated successfully');
              this.ngOnInit();
            }
          },
          (error) => {
            console.error('Error retrieving book:', error);
          }
        );
      }
    });
  }

  delete(value: number) {
    this.Bookstore.deletebook(value).subscribe(
      (value) => {
        if (value) {
          console.log('deleted successfully');
          this.ngOnInit();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
