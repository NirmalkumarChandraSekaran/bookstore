import { Component, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PurchaseService } from '../services/purchase-service/purchase.service';
import { BookstoreserviceService } from '../services/bookstore-service/bookstoreservice.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css',
})
export class PurchaseComponent {
  next12: boolean = true;
  constructor(
    private Messageservice: MessageService,
    private purcahse: PurchaseService,
    private bookstore: BookstoreserviceService
  ) {
    this.searchvendor = new FormGroup({
      searchname: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });

    this.Vendorregister = new FormGroup({
      vendorName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      vendoremail: new FormControl('', [Validators.required, Validators.email]),
      vendorphonenumber: new FormControl('', [Validators.required]),
      address: new FormArray([this.growrow()]),
      zipcode: new FormControl('', [Validators.required]),
    });

    this.Booksearch = new FormGroup({
      BookName: new FormControl('', [Validators.required]),
      Bookpublisher: new FormControl('', [Validators.required]),
      BookAuthorName: new FormControl('', [Validators.required]),
      sellingPrice: new FormControl('', [Validators.required]),
      inventory: new FormControl('', [Validators.required]),
    });

    const searchname = this.searchvendor.get('searchname');

    searchname?.valueChanges.subscribe((x) => {
      this.searchnameerror = this.Validations(searchname as FormControl);
    });

    const vendorname = this.Vendorregister.get('vendorName');

    vendorname?.valueChanges.subscribe((x) => {
      this.vendornameerror = this.Validations(vendorname as FormControl);
    });

    const vendoremail = this.Vendorregister.get('vendoremail');

    vendoremail?.valueChanges.subscribe((x) => {
      this.vendoremailerror = this.Validations(vendoremail as FormControl);
    });

    const vendorphonenumber = this.Vendorregister.get('vendorphonenumber');

    vendorphonenumber?.valueChanges.subscribe((x) => {
      this.vendorphoneerror = this.Validations(
        vendorphonenumber as FormControl
      );
    });

    const zipcode = this.Vendorregister.get('zipcode');
    zipcode?.valueChanges.subscribe((x) => {
      this.zipcodeerror = this.Validations(zipcode as FormControl);
    });

    const address = this.Vendorregister.get('address');
    address?.valueChanges.subscribe((x) => {
      this.Validationformarray(address as FormArray);
    });

    const title = this.Booksearch.get('BookName');
    title?.valueChanges.subscribe((x) => {
      this.booktitleerror = this.Validations(title as FormControl);
    });
    const publisher = this.Booksearch.get('Bookpublisher');
    publisher?.valueChanges.subscribe((x) => {
      this.bookpublishererror = this.Validations(publisher as FormControl);
    });
    const author = this.Booksearch.get('BookAuthorName');
    author?.valueChanges.subscribe((x) => {
      this.bookauthorerror = this.Validations(author as FormControl);
    });
    const sellingprice = this.Booksearch.get('sellingPrice');
    sellingprice?.valueChanges.subscribe((x) => {
      this.sellingpriceerror = this.Validations(sellingprice as FormControl);
      const inventory = this.Booksearch.get('inventory');
      inventory?.valueChanges.subscribe(() => {
        this.inventoryerror = this.Validations(inventory as FormControl);
      });
    });
  }
  searchvendor!: FormGroup;
  Vendorregister!: FormGroup;
  Booksearch!: FormGroup;
  searchnameerror = '';
  vendornameerror = '';
  vendoremailerror = '';
  vendorphoneerror = '';
  booktitleerror = '';
  bookauthorerror = '';
  bookpublishererror = '';
  sellingpriceerror = '';
  inventoryerror = '';
  zipcodeerror = '';
  vendoravailable: boolean = false;
  vendorlist: any[] = [];
  existingvendor: any = [];
  searchbookbutton: boolean = true;
  searchbuttonclick: number = 0;
  addresserror: string[] = [];
  visible: boolean = false;
  Grandtotal: number = 0;

  updatedarray: any[] = [];
  purchaseditems: any[] = [];
  newinventory: number = 0;
  showDialog() {
    this.visible = true;
  }
  loadfunction() {
    setTimeout(() => {
      this.next12 = false;
    }, 2000);
    this.searchvendor1();
  }

  items: any[] = [];
  active: number = 0;
  Vendoravailable: boolean = false;

  ngOnInit() {
    this.items = [
      {
        label: 'Search vendor',
      },
      {
        label: 'Create New Vendor',
      },
      {
        label: 'Add or update the book',
      },
      {
        label: 'invoice of the book',
      },
    ];
  }

  next() {
    this.active = this.active + 1;
  }
  pre() {
    this.active = this.active - 1;
  }
  view() {
    this.Vendoravailable = true;
    this.active = this.active + 2;
  }
  next1() {
    this.active = this.active - 2;
  }

  get address() {
    return this.Vendorregister.get('address') as FormArray;
  }
  growrow() {
    return new FormGroup({
      address: new FormControl('', [Validators.required]),
    });
  }
  Addnewrow() {
    const address = this.Vendorregister.get('address') as FormArray;
    address.push(this.growrow());
  }
  removeaddress(i: number) {
    const address = this.Vendorregister.get('address') as FormArray;
    address.removeAt(i);
  }

  Validations(field: FormControl): string {
    if (field.errors && (field.touched || field.dirty)) {
      if (field.errors['required']) {
        return 'this is required';
      } else if (field.errors['minlength']) {
        return 'this required of minlength of' + 4;
      } else if (field.errors['email']) {
        return 'this required of email format with @in it';
      } else {
        return '';
      }
    }

    return '';
  }

  searchfunction() {
    const title = this.Booksearch.get('BookName')?.value;
    const publisher = this.Booksearch.get('Bookpublisher')?.value;
    const author = this.Booksearch.get('BookAuthorName')?.value;

    if (title == '' && author == '' && publisher == '') {
      this.searchbookbutton = true;
    } else {
      this.searchbookbutton = false;
    }
  }
  Validationformarray(field: FormArray) {
    field.controls.forEach((field, index) => {
      if (field.value.address == '') {
        this.addresserror[index] = 'This is required';
      } else {
        this.addresserror[index] = '';
      }
    });
  }
  searchvendor1() {
    this.vendorlist = [];
    let searchvalue = this.searchvendor.get('searchname')?.value;

    this.purcahse.getvendor().subscribe((value: any[]) => {
      this.existingvendor = value;
      value.forEach((value1: any) => {
        if (searchvalue === value1.vendorname) {
          alert('inside if');
          this.vendoravailable = true;
          this.vendorlist.push(value1);
        }

        console.log(this.vendorlist);
      });
      if (!this.vendorlist.length) {
        this.vendoravailable = false;
      }
    });
  }
  newregister() {
    let vendorfind: any[] = [];

    const vendorName = this.Vendorregister.get('vendorName')?.value;
    this.existingvendor.filter((value: any) => {
      if (value.vendorname == vendorName) {
        vendorfind.push(value);
      }
    });
    if (vendorfind.length > 0) {
      alert('You have entered the name of existing please enter new one');
      this.active = 1;
    } else {
      let i = this.existingvendor.length + 1;
      let Vendor = {
        id: i,
        vendorname: this.Vendorregister.get('vendorName')?.value,
        vendoremail: this.Vendorregister.get('vendoremail')?.value,
        vendorPhoneNumber: this.Vendorregister.get('vendorphonenumber')?.value,
      };

      this.purcahse.addvendor(Vendor).subscribe(
        (value) => {
          if (value) {
            console.log('added successflly');
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
    this.searchvendor1();
  }

  difference(value: number) {
    this.newinventory = value;
    console.log(this.newinventory);
  }

  generateFiveDigitNumber(): string {
    let number = Math.floor(10000 + Math.random() * 90000);
    let a: string = number.toString();
    return a;
  }
  addbook() {
    this.visible = false;
    const title = this.Booksearch.get('BookName')?.value;
    const publisher = this.Booksearch.get('Bookpublisher')?.value;
    const author = this.Booksearch.get('BookAuthorName')?.value;
    const sellingprice = this.Booksearch.get('sellingPrice')?.value;
    const inventory = this.Booksearch.get('inventory')?.value;
    let addbookdata = {
      id: this.generateFiveDigitNumber(),
      publisherName: publisher,
      title: title,
      sellingPrice: sellingprice,
      inventory: inventory,
      bookAuthors: author,
    };
    this.bookstore.addnewbook(addbookdata).subscribe((value: any) => {
      if (value) {
        this.purchaseditems.push(value);
        console.log('value added');
      }
      this.grandtotal();
    });
  }
  update(data: any) {
    this.updatedarray.push(data);
    this.retificted(data);
    this.grandtotal();
  }
  retificted(data: any) {
    this.updatedarray.filter((value: any) => {
      if (value.id == data.id) {
        this.purchaseditems.push({
          id: value.id,
          title: value.title,
          sellingPrice: value.sellingPrice,
          inventory: this.newinventory,
          bookAuthors: value.authors,
        });
      }
    });
  }
  grandtotal() {
    this.Grandtotal = 0;

    this.purchaseditems.forEach((value: any) => {
      let amount = parseInt(value.sellingPrice);
      let inventory = parseInt(value.inventory);
      this.Grandtotal = this.Grandtotal + amount * inventory;
    });
  }
  visible1: boolean = false;

  Finish() {
    this.visible1 = true;
  }
  complete() {
    this.active = 0;
    this.visible1 = false;
  }
}
