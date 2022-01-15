import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectDropdownComponent } from './multi-select-dropdown.component';

@NgModule({
  declarations: [MultiSelectDropdownComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MultiSelectDropdownComponent
  ]
})
export class MultiSelectDropdownModule { }
