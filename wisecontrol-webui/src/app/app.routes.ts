import { Routes } from '@angular/router';
import { UserGuard } from './core/guards/user.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        data: {
          title: 'Home',
        },
        loadChildren: () => import('./features/home/home.module').then(m => m.HomePageModule),
        canActivate: [UserGuard]
    },
    {
        path: 'transactions',
        data: {
          title: 'Transações',
        },
        loadChildren: () => import('./features/transactions/transactions.module').then(m => m.TransactionsPageModule),
        canActivate: [UserGuard]
    },
    {
        path: 'transaction-detail/:id',
        data: {
          title: 'Detalhes da Transação',
        },
        loadChildren: () => import('./features/transaction-detail/transaction-detail.module').then(m => m.TransactionDetailPageModule),
        canActivate: [UserGuard]
    },
    {
      path: 'accounts',
      data: {
        title: 'Contas',
      },
      loadChildren: () => import('./features/accounts/accounts.module').then(m => m.AccountsPageModule),
      canActivate: [UserGuard]
    },
    {
      path: 'account-register',
      data: {
        title: 'Nova Conta',
      },
      loadChildren: () => import('./features/account-register/account-register.module').then(m => m.AccountRegisterPageModule),
      canActivate: [UserGuard]
    },
    {
      path: 'credit-register',
      data: {
        title: 'Nova Conta',
      },
      loadChildren: () => import('./features/credit-register/credit-register.module').then(m => m.CreditRegisterPageModule),
      canActivate: [UserGuard]
    } 
    ,
    {
      path: 'debit-register',
      data: {
        title: 'Nova Conta',
      },
      loadChildren: () => import('./features/debit-register/debit-register.module').then(m => m.DebitRegisterPageModule),
      canActivate: [UserGuard]
    },
    {
      path: 'transaction-succeed',
      data: {
        title: 'Registro de Transação',
      },
      loadChildren: () => import('./features/transaction-succeed/transaction-succeed.module').then(m => m.TransactionSucceedPageModule),
      canActivate: [UserGuard]
    }, 
    {
      path: 'login',
      data: {
        title: 'Autenticação de Usuário',
      },
      loadChildren: () => import('./features/login/login.module').then(m => m.LoginPageModule)
    }, 
    {
      path: 'user-register',
      data: {
        title: 'Registro de Usuário',
      },
      loadChildren: () => import('./features/user-register/user-register.module').then(m => m.UserRegisterPageModule)
    }, 
  ];
