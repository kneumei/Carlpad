import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { CarlpadConnectionService } from './carlpad-connection.service';

@Injectable()
export class CarlpadTransmissionService {

    private stream : Observable<Array<number>>;
    private subscription : Subscription;

    constructor(private connectionService : CarlpadConnectionService){
        this.stream = Observable.interval(1000)
                                .mapTo([1,1])
     }

    start() :void {
        if(this.subscription) return;
        this.subscription = this.stream.subscribe(() =>  this.connectionService.send("1,1"));
    }

    stop(): void {
        if(!this.subscription) return;
        this.subscription.unsubscribe();
    }
}