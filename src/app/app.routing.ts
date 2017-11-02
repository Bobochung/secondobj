// 引入angular的router模块
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// 导入自定义组件
import { TodoComponent } from './components/todo/todo.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CmsListComponent } from './components/cms-list/cms-list.component';
import { ProfileComponent } from './components/profile/profile.component';


const AppRoutes: Routes = [
    // 默认路由
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'user-list',
        component: UserListComponent
    },
    {
        path: 'cms-list',
        component: CmsListComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
