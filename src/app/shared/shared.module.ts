// If we want to use the directive ( hide-header.directive ) for more than one directive, we need to create a SharedModule.
// So that we can add the SharedModule to all the modules we want to use the directive in.

import { NgModule } from "@angular/core";
//import { CommonModule } from "@angular/common";
//import { HideHeaderDirective } from "../directives/hide-header.directive";
import { HidenavModule } from "ionic4-hidenav";

@NgModule({
  //declarations: [HideHeaderDirective],
  exports: [//HideHeaderDirective,
     HidenavModule],
  imports: [//CommonModule, 
    HidenavModule],
})
export class SharedModule {}
