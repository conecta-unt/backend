export class CreateTeamDTO {
  name: string;
  members: {
    id: number;
    role: 'colaborator' | 'supervisor';
  }[];
}
