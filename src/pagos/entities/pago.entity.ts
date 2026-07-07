import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Factura } from '../../facturas/entities/factura.entity';
import { CuentaDePago } from '../../cuentas-de-pago/entities/cuenta-de-pago.entity';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Factura, (factura) => factura.pagos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'factura_id' })
  factura!: Factura;

  @Column({ name: 'factura_id' })
  facturaId!: string;

  @ManyToOne(() => CuentaDePago, (cuenta) => cuenta.pagos)
  @JoinColumn({ name: 'cuenta_de_pago_id' })
  cuentaDePago!: CuentaDePago;

  @Column({ name: 'cuenta_de_pago_id' })
  cuentaDePagoId!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  valor!: number;

  @Column({ type: 'date' })
  fecha!: string;
}