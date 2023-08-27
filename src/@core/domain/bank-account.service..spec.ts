import { DataSource, Repository } from 'typeorm';
import { BankAccountSchema } from '.././infra/db/bank-account.schema';
import { BankAccountTypeOrmRepository } from '.././infra/db/bank-account-typeorm.repository';
import { BankAccount } from 'src/@core/domain/bank-account';
import { BankAccountService } from './bank-account.service';

describe('BankAccountService Test', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<BankAccountSchema>;
  let repository: BankAccountTypeOrmRepository;
  let bankAccountService: BankAccountService;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: true,
      entities: [BankAccountSchema],
    });

    await dataSource.initialize();
    ormRepo = dataSource.getRepository(BankAccountSchema);
    repository = new BankAccountTypeOrmRepository(ormRepo);
    bankAccountService = new BankAccountService(repository);
  });

  it('should create a new bank account', async () => {
    const bankAccount = new BankAccount('123', 100, '1111-11');
    await bankAccountService.create(bankAccount.account_number);
    const model = await ormRepo.findOneBy({ account_number: '1111-11' });
    expect(model.id).toBe(1);
  });
});
