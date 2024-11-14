import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoissonPageRoutingModule } from './boisson-routing.module';

import { BoissonPage } from './boisson.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoissonPageRoutingModule
  ],
  declarations: [BoissonPage]
})
export class BoissonPageModule {}
