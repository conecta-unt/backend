import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from '../src/context/auth/infrastructure/persistence/entities/role.entity';

export default class RoleSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Role);
    await repo.insert([
      // The first is the default role
      { name: 'individual_client' },
      { name: 'bussines_client' },
      { name: 'teacher' },
      { name: 'student' },
    ]);
  }
}
