import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BuslineService } from '../busline.service';


@Component({
  selector: 'app-create-line',
  templateUrl: './create-line.component.html',
  styleUrls: ['./create-line.component.css']
})
export class CreateLineComponent implements OnInit {

  constructor(private buslineService : BuslineService) { }

  formLine = new FormGroup({
    fromCity : new FormControl('', Validators.required),
    toCity : new FormControl('', Validators.required),
    creationDate : new FormControl('', Validators.required),
    price : new FormControl('', [Validators.required,Validators.pattern(/^\d+$/)]),
    agency : new FormControl('', Validators.required),
  })
  Success : boolean = false
  Error :string = ""
  ngOnInit(): void {
  }
  get fromCity()
  {
    return this.formLine.get('fromCity')
  }

  get toCity()
  {
    return this.formLine.get('toCity')
  }

  get creationDate()
  {
    return this.formLine.get('creationDate')
  }

  get price ()
  {
    return this.formLine.get('price')
  }

  get agency()
  {
    return this.formLine.get('agency')
  }

  addLine()
  {
    let line =

    {
      price: this.formLine.get('price')?.value,
      fromCity: this.formLine.get('fromCity')?.value,
      toCity: this.formLine.get('toCity')?.value,
      creationDate:this.formLine.get('creationDate')?.value,
      agency: this.formLine.get('agency')?.value,
    }

    this.buslineService.addBusline(line).subscribe(res=>
      {
       console.log("dodatoo", res)
       this.Success = true;
       this.Error = '';
      },
      error=>
      {
        console.log(error)
        this.Success = false
        this.Error = "Fields are invalid."
      })


  }

}
