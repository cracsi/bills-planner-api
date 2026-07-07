import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { MetodoDePago } from '../../metodos-de-pago/entities/metodo-de-pago.entity';
import { Pago } from '../../pagos/entities/pago.entity';

@Entity('cuenta_de_pago')
export class CuentaDePago {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.cuentasDePago, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  @Column({ name: 'usuario_id' })
  usuarioId!: string;

  @ManyToOne(() => MetodoDePago, (metodo) => metodo.cuentasDePago)
  @JoinColumn({ name: 'metodo_pago_id' })
  metodoPago!: MetodoDePago;

  @Column({ name: 'metodo_pago_id' })
  metodoPagoId!: string;

  @Column({ type: 'varchar', length: 255 })
  alias!: string;

  @Column({ type: 'varchar', length: 255 })
  datos!: string;

  @OneToMany(() => Pago, (pago) => pago.cuentaDePago)
  pagos!: Pago[];
}