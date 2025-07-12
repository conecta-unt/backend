import { Injectable } from 'src/bootstrap';
import { Request } from 'express';
import { CreateOfferDTO } from './create.dto';
import { UserPayload } from 'src/global/types/user';
import { Offer, User } from 'src/context/auth/infrastructure/persistence';
import { EmailService } from 'src/global/services/mail.service';
import { AppConfigService } from 'src/global/services/app-config.service';

@Injectable()
export class CreateOfferUseCase {
  constructor(
    private readonly config: AppConfigService,
    private readonly email: EmailService,
  ) {}

  async execute(req: Request, data: CreateOfferDTO) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userPayload = (req as any).userPayload as UserPayload;

    const newOffer = Offer.create({
      type: data.type,
      description: data.description,
      supervisorRequired: data.supervisorRequired,
      teamRequired: data.team,
      user: { id: userPayload.id } as User,
    });

    await newOffer.save();

    const emails = await User.createQueryBuilder('user')
      .select('user.email')
      .where('user.role IN (:...roles)', { roles: [3, 4] })
      .getRawMany();

    const userEmails = emails.map(
      (email: { user_email: string }) => email.user_email,
    );

    const type =
      data.type === 'internship'
        ? 'Pasantía'
        : data.type === 'project'
          ? 'Proyecto'
          : 'Asesoría';

    const now = new Date();

    await this.email.sendEmail({
      email: userEmails,
      template: 'new-offer',
      subject: 'Nueva oferta',
      context: {
        serviceName: this.config.serviceName,
        type,
        description: data.description,
        supervisorRequired: data.supervisorRequired ? 'Sí' : 'No',
        teamRequired: data.team ? 'Sí' : 'No',
        createdAt: `${now.toLocaleDateString('es-PE')} ${now.toLocaleTimeString('es-PE')}`,
      },
    });

    return {
      id: newOffer.id,
      type: newOffer.type,
      description: newOffer.description,
      supervisorRequired: newOffer.supervisorRequired,
      team: newOffer.teamRequired,
      createdAt: newOffer.createdAt,
    };
  }
}
