import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CuentaDePago } from '../../cuentas-de-pago/entities/cuenta-de-pago.entity';

@Entity('metodo_de_pago')
export class MetodoDePago {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ type: 'varchar', length: 100 })
  tipo!: string;

  @OneToMany(() => CuentaDePago, (cuenta) => cuenta.metodoPago)
  cuentasDePago!: CuentaDePago[];
}