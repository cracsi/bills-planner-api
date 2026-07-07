import { Test, TestingModule } from '@nestjs/testing';
import { CuentasDePagoService } from './cuentas-de-pago.service';

describe('CuentasDePagoService', () => {
  let service: CuentasDePagoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuentasDePagoService],
    }).compile();

    service = module.get<CuentasDePagoService>(CuentasDePagoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
