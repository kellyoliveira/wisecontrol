import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        data: {
          title: 'Home',
        },
        loadChildren: () => import('./features/home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'transactions',
        data: {
          title: 'Transações',
        },
        loadChildren: () => import('./features/transactions/transactions.module').then(m => m.TransactionsPageModule)
    },
    {
        path: 'transaction-detail/:id',
        data: {
          title: 'Detalhes da Transação',
        },
        loadChildren: () => import('./features/transaction-detail/transaction-detail.module').then(m => m.TransactionDetailPageModule)
    },
    {
      path: 'accounts',
      data: {
        title: 'Contas',
      },
      loadChildren: () => import('./features/accounts/accounts.module').then(m => m.AccountsPageModule)
    },
    {
      path: 'account-register',
      data: {
        title: 'Nova Conta',
      },
      loadChildren: () => import('./features/account-register/account-register.module').then(m => m.AccountRegisterPageModule)
    },
    {
      path: 'credit-register',
      data: {
        title: 'Nova Conta',
      },
      loadChildren: () => import('./features/credit-register/credit-register.module').then(m => m.CreditRegisterPageModule)
    } 
    ,
    {
      path: 'debit-register',
      data: {
        title: 'Nova Conta',
      },
      loadChildren: () => import('./features/debit-register/debit-register.module').then(m => m.DebitRegisterPageModule)
    } 
];
