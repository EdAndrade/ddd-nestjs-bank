import { BankAccount } from 'src/@core/domain/bank-account';

export interface BankAccountRepository {
  insert(bankAccount: BankAccount): Promise<void>;
  findByAccountNumber(accountNumber: string): Promise<BankAccount>;
  update(bankAccount: BankAccount): Promise<void>;
}
