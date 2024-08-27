import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { StepperModule } from 'primeng/stepper';
import { StepsModule } from 'primeng/steps';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast'; // Optional for messages
import { MessageService, ConfirmationService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputMaskModule } from 'primeng/inputmask';
import { Message } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { MessageModule } from 'primeng/message';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    CheckboxModule,
    StepperModule,
    StepsModule,
    ToastModule,
    SidebarModule,
    FloatLabelModule,
    ScrollPanelModule,
    InputMaskModule,
    MessageModule,
    RippleModule,
  ],

  exports: [
    CommonModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    CheckboxModule,
    StepperModule,
    StepsModule,
    ToastModule,
    SidebarModule,
    FloatLabelModule,
    ScrollPanelModule,
    InputMaskModule,
  ],

  providers: [MessageService, ConfirmationService],
})
export class primetemplate {}
