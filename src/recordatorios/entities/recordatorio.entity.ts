import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Factura } from '../../facturas/entities/factura.entity';

@Entity('recordatorios')
export class Recordatorio {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Factura, (factura) => factura.recordatorios, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'factura_id' })
  factura!: Factura;

  @Column({ name: 'factura_id' })
  facturaId!: string;

  // Recurring offset — fires every cycle, N days before the due date.
  @Column({ type: 'int', name: 'dias_antes' })
  diasAntes!: number;

  @Column({ type: 'varchar', length: 500 })
  mensaje!: string;
}