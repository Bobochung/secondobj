/**
 * Angular 核心库
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //模式表单
import { Ng2SmartTableModule } from 'ng2-smart-table'
/**
 * Components 一下相关组件
 */
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CmsListComponent } from './components/cms-list/cms-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { RedBgDirective } from './diretives/red-bg.directive';
import { BlogComponent } from './components/blog/blog.component';
import { TestComponent } from './components/test/test.component';
import { StrucDirectiveDirective } from './directives/struc-directive.directive';
import { BooleanPipe } from './pipes/boolean.pipe';
import { BlogDatailComponent } from './components/blog-datail/blog-datail.component';


/**
 * @NgModule 表示一个注解/标注/装饰/修饰/宏定义
 * declarations: 声明(导入的自定义组件(包含Component的))
 * imports: 导入的相关模块(包含Module的)
 * providers: 导入自定义服务
 * bootstrap: 启动组件
 */
@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    FooterComponent,
    NavigationComponent,
    SignInComponent,
    SignUpComponent,
    BackToTopComponent,
    ContactComponent,
    AboutComponent,
    HomeComponent,
    NotFoundComponent,
    UserListComponent,
    CmsListComponent,
    ProfileComponent,
    UploadFileComponent,
    RedBgDirective,
    BlogComponent,
    TestComponent,
    StrucDirectiveDirective,
    BooleanPipe,
    BlogDatailComponent,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
