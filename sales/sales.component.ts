import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomerService } from '../services/customer-service/customer.service';
import { BookstoreserviceService } from '../services/bookstore-service/bookstoreservice.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
})
export class SalesComponent implements OnInit {
  ngOnInit(): void {
    this.items = [
      {
        label: 'Search Customer',
      },
      {
        label: 'Create New Customer',
      },
      {
        label: 'Add or update the book',
      },
      {
        label: 'invoice of the book',
      },
    ];
    this.bookstore.getbooks().subscribe((value) => {
      this.bookdata = value;
    });
  }

  next12: boolean = true;
  constructor(
    private customer: CustomerService,
    private bookstore: BookstoreserviceService
  ) {
    this.searchCustomer = new FormGroup({
      searchname: new FormControl('hello', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });

    this.Customerregister = new FormGroup({
      CustomerName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      CustomerEmail: new FormControl('', [
        Validators.email,
        Validators.required,
      ]),
      CustomerPhoneNumber: new FormControl('', [Validators.required]),
      address: new FormArray([this.growaddress()]),
      zipcode: new FormControl('', [Validators.required]),
    });

    this.Booksearch = new FormGroup({
      BookName: new FormControl(''),
      Bookpublisher: new FormControl(''),
      BookAuthorName: new FormControl(''),
    });

    const searchcustomer = this.searchCustomer.get('searchname');

    searchcustomer?.valueChanges.subscribe((x) => {
      this.SearchNameError(searchcustomer as FormControl);
    });

    const customername = this.Customerregister.get('CustomerName');

    customername?.valueChanges.subscribe((x) => {
      this.CustomerNameValidators(customername as FormControl);
    });

    const customeremail = this.Customerregister.get('CustomerEmail');
    customeremail?.valueChanges.subscribe((x) => {
      this.CustomerEmailValidators(customeremail as FormControl);
    });

    const customerphonenumber = this.Customerregister.get(
      'CustomerPhoneNumber'
    );
    customerphonenumber?.valueChanges.subscribe((x) => {
      this.phonenumbererror = this.Validation(
        customerphonenumber as FormControl
      );
    });

    const zipcode = this.Customerregister.get('zipcode');
    zipcode?.valueChanges.subscribe((x) => {
      this.zipcodeerror = this.Validation(zipcode as FormControl);
    });
    const Address = this.Customerregister.get('address');
    Address?.valueChanges.subscribe((x) => {
      console.log(x + 'value');
      this.validationsFormArray(Address as FormArray);
    });

    const title = this.Booksearch.get('BookName');
    title?.valueChanges.subscribe((x) => {
      this.searchfunction();
    });
    const publisher = this.Booksearch.get('Bookpublisher');
    publisher?.valueChanges.subscribe((x) => {
      this.searchfunction();
    });
    const author = this.Booksearch.get('BookAuthorName');
    author?.valueChanges.subscribe((x) => {
      this.searchfunction();
    });
  }
  searchCustomer!: FormGroup;
  Customerregister!: FormGroup;
  Booksearch!: FormGroup;

  // value: string = '';
  loadfunction() {
    setTimeout(() => {
      this.next12 = false;
    }, 2000);
    this.searchCustomer1();
  }
  searchbookbutton: boolean = true;
  items: any[] = [];
  active: number = 0;
  customeravailable: boolean = false;
  existingcustomer: any[] = [];
  customerNameerror = '';
  customeremailerror = '';
  searchNameerror = '';
  phonenumbererror = '';
  zipcodeerror = '';
  customerarray: any[] = [];
  Addresserror: string[] = [];
  Registeredperviously: boolean = false;
  bookdata: any[] = [];
  customerselected: any[] = [];
  customerbrought: any[] = [];
  quantity: number = 1;
  Grandtotal: number = 0;

  first = 0;

  rows = 10;
  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  next() {
    this.active = this.active + 1;
  }
  pre() {
    this.active = this.active - 1;
  }
  view() {
    this.customeravailable = true;
    this.active = this.active + 2;
  }
  next1() {
    this.active = this.active - 2;
  }
  searchCustomer1() {
    this.customerarray = [];
    this.customer.getCustomer().subscribe((value: any) => {
      let cus = this.searchCustomer.get('searchname')?.value;
      this.existingcustomer = value;
      value.forEach((value: any) => {
        if (value.customername === cus) {
          this.customerarray.push(value);
          this.customeravailable = true;
        }
      });
      if (!this.customerarray.length) {
        this.customeravailable = false;
      }
      console.log(this.customerarray);
    });
  }
  get address() {
    return this.Customerregister.get('address') as FormArray;
  }
  Addnewrow() {
    const address = this.Customerregister.get('address') as FormArray;
    address.push(this.growaddress());
  }
  removeaddress(i: number) {
    const address = this.Customerregister.get('address') as FormArray;
    address.removeAt(i);
  }
  growaddress() {
    return new FormGroup({
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  CustomerNameValidators(name: FormControl) {
    console.log(name);
    if (name.errors && (name.touched || name.dirty)) {
      if (name.errors['required']) {
        this.customerNameerror = 'This field is required';
      } else if (name.errors['minlength']) {
        this.customerNameerror = 'The minLength required is ' + 4;
        // name.errors['minlength']['requiredlength'];
      } else {
        this.customerNameerror = '';
      }
    } else {
      this.customerNameerror = '';
    }
  }

  CustomerEmailValidators(email: FormControl) {
    if (email.errors && (email.touched || email.dirty)) {
      if (email.errors['required']) {
        this.customeremailerror = 'This field is required';
      } else if (email.errors['email']) {
        this.customeremailerror = 'It is of type email required ';
        // name.errors['minlength']['requiredlength'];
      } else {
        this.customeremailerror = '';
      }
    } else {
      this.customeremailerror = '';
    }
  }

  SearchNameError(search: FormControl) {
    console.log(search);
    if (search.errors && (search.touched || search.dirty)) {
      if (search.errors['required']) {
        this.searchNameerror = 'This field is required';
      } else if (search.errors['minlength']) {
        this.searchNameerror = 'The minLength required is ' + 4;
        // name.errors['minlength']['requiredlength'];
      } else {
        this.searchNameerror = '';
      }
    } else {
      this.searchNameerror = '';
    }
  }

  Validation(field: FormControl): string {
    this.customerNameerror;
    if (field.errors && (field.touched || field.dirty)) {
      if (field.errors['required']) {
        return 'This field is required';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  validationsFormArray(field: FormArray) {
    field.controls.forEach((field, index) => {
      if (field.value.address == '') {
        this.Addresserror[index] = 'This is required';
      } else {
        this.Addresserror[index] = '';
      }
    });
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
  searchfunction1() {
    this.customerselected = [];
    const title = this.Booksearch.get('BookName')?.value;
    const publisher = this.Booksearch.get('Bookpublisher')?.value;
    const author = this.Booksearch.get('BookAuthorName')?.value;

    this.bookdata.filter((value) => {
      if (
        value.title == title ||
        this.checkauthor(value.bookAuthors, author) ||
        value.publisherName == publisher
      ) {
        this.customerselected.push(value);
      }
    });
  }
  checkauthor(data: any[], check: string) {
    return data.some((value: any) => value == check);
  }
  newregister() {
    let customernamefind = this.Customerregister.get('CustomerName')?.value;
    let customerfind: any[] = [];
    this.existingcustomer.filter((value: any) => {
      if (value.customername == customernamefind) {
        customerfind.push(value);
      }
    });
    if (customerfind.length > 0) {
      alert('You have enter registered name please enter the other name');
      this.active = 1;
    } else {
      let i = this.existingcustomer.length + 1;
      let customer = {
        id: i,
        customername: this.Customerregister.get('CustomerName')?.value,
        customeremail: this.Customerregister.get('CustomerEmail')?.value,
        customerPhoneNumber: this.Customerregister.get('CustomerPhoneNumber')
          ?.value,
      };

      this.customer.addcustomer(customer).subscribe(
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
    this.searchCustomer1();
  }
  adddata1(value1: number) {
    this.customerbrought.forEach((value: any, index: number) => {
      console.log(value.id, value1);
      if (value.id == value1) {
        this.customerbrought[index] = {
          id: value.id,
          title: value.title,
          sellingPrice: value.sellingPrice,
          quantity: value.quantity + 1,
          amount: value.sellingPrice * (value.quantity + 1),
        };
      }
    });
    console.log(this.customerbrought);
    this.grandtotal();
  }
  delete(value1: number) {
    this.customerbrought.forEach((value: any, index: number) => {
      if (value.id == value1) {
        if (value.quantity <= 1) {
          this.customerbrought.splice(index, 1);
        } else {
          this.customerbrought[index] = {
            id: value.id,
            title: value.title,
            sellingPrice: value.sellingPrice,
            quantity: value.quantity - 1,
            amount: value.sellingPrice * (value.quantity - 1),
          };
        }
      }
    });
    console.log(this.customerbrought);
    this.grandtotal();
  }

  grandtotal() {
    this.Grandtotal = 0;

    this.customerbrought.forEach((value: any) => {
      this.Grandtotal = this.Grandtotal + value.amount;
    });
  }
  select(value: number) {
    let matchdata: any[] = [];

    this.bookstore.getbookbyid(value).subscribe((value: any) => {
      console.log(value);
      let data = {
        id: value.id,
        title: value.title,
        sellingPrice: value.sellingPrice,
        quantity: 1,
        amount: value.sellingPrice * 1,
      };
      if (data) {
        matchdata = this.customerbrought.filter((p: any) => p.id == data.id);
        if (matchdata.length > 0) {
          this.customerbrought.forEach((value: any, index: number) => {
            if (value.id == data.id) {
              this.customerbrought[index] = {
                id: value.id,
                title: value.title,
                sellingPrice: value.sellingPrice,
                quantity: value.quantity + 1,
                amount: value.sellingPrice,
              };
            }
          });
        } else {
          this.customerbrought.push(data);
        }

        console.log(this.customerbrought);
      }
      alert('This is books is moved to billing');
      this.grandtotal();
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
