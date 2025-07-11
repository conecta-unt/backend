export abstract class MemberRepository {
  abstract createMany(
    teamId: number,
    members: { id: number; role: string; confirmed?: boolean }[],
  ): Promise<void>;
}
