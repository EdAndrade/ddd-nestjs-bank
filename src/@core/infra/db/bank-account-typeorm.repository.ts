import { BankAccountSchema } from './bank-account.schema';
import { BankAccount } from 'src/@core/domain/bank-account';
import { BankAccountRepository } from 'src/@core/domain/bank-account.repository';
import { Repository } from 'typeorm';

export class BankAccountTypeOrmRepository implements BankAccountRepository {
  constructor(private ormRepo: Repository<BankAccountSchema>) {}

  async findByAccountNumber(account_number: string): Promise<BankAccount> {
    const model = await this.ormRepo.findOneBy({
      account_number: account_number,
    });
    return new BankAccount(model.balance, model.account_number, model.id);
  }

  async insert(bankAccount: BankAccount): Promise<void> {
    const model = this.ormRepo.create(bankAccount);
    await this.ormRepo.save(model);
  }

  async update(bankAccount: BankAccount): Promise<void> {
    await this.ormRepo.update(bankAccount.id, {
      balance: bankAccount.balance,
    });
  }
}
