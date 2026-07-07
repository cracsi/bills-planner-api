import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Pago } from '../../pagos/entities/pago.entity';
import { Recordatorio } from '../../recordatorios/entities/recordatorio.entity';

@Entity('facturas')
export class Factura {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.facturas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'usuario_id' })
  usuarioId: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  valor: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  descripción: string;

  @Column({ type: 'varchar', name: 'link_pago', nullable: true })
  linkPago: string;

  @Column({ type: 'varchar', name: 'instrucciones_pago', nullable: true })
  instruccionesPago: string;

  // Cycle-scoped. Only the scheduler / payment logic should ever write to
  // this — never exposed as a directly-editable field in a create/update DTO.
  @Column({ type: 'boolean', default: false })
  pagado: boolean;

  // Source of truth: day of month the bill is due (e.g. 15). Recurs monthly.
  @Column({ type: 'int', name: 'dia_vencimiento' })
  diaVencimiento: number;

  // Cached/derived from diaVencimiento — recomputed by the scheduler each
  // cycle. Stored so we can query/sort/filter by it directly in SQL.
  @Column({ type: 'date', name: 'fecha_vencimiento', nullable: true })
  fechaVencimiento: string;

  // Source of truth: days after due date until suspension (e.g. 5).
  @Column({ type: 'int', name: 'dia_suspension' })
  diaSuspension: number;

  // Cached/derived, same pattern as fechaVencimiento.
  @Column({ type: 'date', name: 'fecha_suspension', nullable: true })
  fechaSuspension: string;

  @OneToMany(() => Pago, (pago) => pago.factura)
  pagos: Pago[];

  @OneToMany(() => Recordatorio, (recordatorio) => recordatorio.factura)
  recordatorios: Recordatorio[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}