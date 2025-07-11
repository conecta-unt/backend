export abstract class MemberRepository {
  abstract createMany(
    teamId: number,
    members: { id: number; role: string }[],
  ): Promise<void>;
}
