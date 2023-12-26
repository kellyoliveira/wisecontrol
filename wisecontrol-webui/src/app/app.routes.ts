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
        path: 'transaction-detail',
        data: {
          title: 'Detalhes da Transação',
        },
        loadChildren: () => import('./features/transaction-detail/transaction-detail.module').then(m => m.TransactionDetailPageModule)
    }
];
