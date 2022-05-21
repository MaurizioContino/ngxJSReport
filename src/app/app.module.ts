import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FieldComponent } from './controls/field/field.component';
import { HttpClientModule } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TableComponent } from './controls/table/table.component';
import { TjoinComponent } from './controls/tjoin/tjoin.component';
import { AreaComponent } from './controls/area/area.component';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { JoinIconsComponent } from './controls/join-icons/join-icons.component';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {MenubarModule} from 'primeng/menubar';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {TabViewModule} from 'primeng/tabview';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {SplitterModule} from 'primeng/splitter';
import { ReportComponent } from './controls/report/report.component';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {AccordionModule} from 'primeng/accordion';
import { ChipModule } from 'primeng/chip';
import { TableSelectionComponent } from './controls/table-selection/table-selection.component';
import { FieldSelectedComponent } from './controls/field-selected/field-selected.component';
import { FilterComponent } from './controls/filter/filter.component';
import { HavingComponent } from './controls/having/having.component';
import { DataPreviewComponent } from './controls/data-preview/data-preview.component';
import { ParametersComponent } from './controls/parameters/parameters.component';
import { TableModule } from 'primeng/table';
import { DataExportComponent } from './controls/data-export/data-export.component';
import { DataImportComponent } from './controls/data-import/data-import.component';
import { DBLoginComponent } from './controls/dblogin/dblogin.component';
import {CardModule} from 'primeng/card';
import {PasswordModule} from 'primeng/password';
import { MainComponent } from './pages/main/main.component';
import { ServerConfigComponent } from './controls/server-config/server-config.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    TableComponent,
    TjoinComponent,
    AreaComponent,
    JoinIconsComponent,
    ReportComponent,
    TableSelectionComponent,
    FieldSelectedComponent,
    FilterComponent,
    HavingComponent,
    DataPreviewComponent,
    ParametersComponent,
    DataExportComponent,
    DataImportComponent,
    DBLoginComponent,
    MainComponent,
    ServerConfigComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    PerfectScrollbarModule,
    FormsModule,
    FontAwesomeModule,
    MenubarModule,
    ButtonModule,
    DialogModule,
    OverlayPanelModule,
    TabViewModule,
    RadioButtonModule,
    DropdownModule,
    InputTextModule,
    SplitterModule,
    ChipModule,
    ScrollPanelModule,
    AccordionModule,
    TableModule,
    CardModule,
    PasswordModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
