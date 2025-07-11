export abstract class TeamRepository {
  abstract create(name: string): Promise<{ id: number; name: string }>;
}
