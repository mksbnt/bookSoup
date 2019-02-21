import { NgModule } from '@angular/core';

import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material'
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule ,MatMenuModule, MatIconModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatListModule, MatNativeDateModule, MatAutocompleteModule],
  exports: [MatButtonModule, MatCheckboxModule ,MatMenuModule, MatIconModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatListModule, MatNativeDateModule, MatAutocompleteModule],
})

export class MaterialModule { }