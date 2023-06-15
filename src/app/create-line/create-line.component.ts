import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BuslineService } from '../busline.service';


@Component({
  selector: 'app-create-line',
  templateUrl: './create-line.component.html',
  styleUrls: ['./create-line.component.css']
})
export class CreateLineComponent implements OnInit {

  constructor(private buslineService : BuslineService) { }

  formLine = new FormGroup({
    fromCity : new FormControl(),
    toCity : new FormControl(),
    creationDate : new FormControl(),
    price : new FormControl(),
    agency : new FormControl(),
  })
  ngOnInit(): void {
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
      },
      error=>
      {
        console.log(error)
      })


  }

}
