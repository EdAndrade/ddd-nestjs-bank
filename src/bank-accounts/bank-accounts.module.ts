import { Module } from '@nestjs/common';
import { BankAccountsController } from './bank-accounts.controller';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { BankAccountSchema } from '../@core/infra/db/bank-account.schema';
import { BankAccountService } from 'src/@core/domain/bank-account.service';
import { DataSource } from 'typeorm';
import { BankAccountTypeOrmRepository } from 'src/@core/infra/db/bank-account-typeorm.repository';
import { BankAccountRepository } from 'src/@core/domain/bank-account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccountSchema])],
  controllers: [BankAccountsController],
  providers: [
    BankAccountService,
    {
      provide: BankAccountTypeOrmRepository,
      useFactory: (repo: BankAccountRepository) => {
        return new BankAccountService(repo);
      },
      inject: [BankAccountTypeOrmRepository],
    },
  ],
})
export class BankAccountsModule {}
