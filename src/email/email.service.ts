import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly resend: Resend;

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
  }

  async enviarRecordatorio(destinatario: string, mensaje: string): Promise<void> {
    await this.resend.emails.send({
      from: 'Bills Planner <onboarding@resend.dev>',
      to: destinatario,
      subject: 'Recordatorio de factura',
      text: mensaje,
    });
  }
}