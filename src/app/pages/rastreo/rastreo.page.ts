import { Component, OnInit, wtfStartTimeRange } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-rastreo',
  templateUrl: './rastreo.page.html',
  styleUrls: ['./rastreo.page.scss'],
})
export class RastreoPage implements OnInit {
  time: BehaviorSubject<string> = new BehaviorSubject ('00');

  timer: number; //en segundos

  constructor() {}

  ngOnInit() {
  }

  startTimer(duration: number){
    this.timer= duration * 60;
    setInterval( () => {
      this.updateTimeValue();
    }, 1000);
  }

  updateTimeValue(){
    let minutes: any = this.timer /60;
    let seconds: any = this.timer %60;

    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);
  
    const text = minutes + ' minutos';
    this.time.next(text);

    --this.timer;
  }

}

