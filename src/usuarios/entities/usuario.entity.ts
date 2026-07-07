import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Factura } from '../../facturas/entities/factura.entity';
import { CuentaDePago } from '../../cuentas-de-pago/entities/cuenta-de-pago.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  nombre!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', name: 'password_hash' })
  passwordHash!: string;

  @OneToMany(() => Factura, (factura) => factura.usuario)
  facturas!: Factura[];

  @OneToMany(() => CuentaDePago, (cuenta) => cuenta.usuario)
  cuentasDePago!: CuentaDePago[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}