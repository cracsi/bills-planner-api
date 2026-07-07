import { Test, TestingModule } from '@nestjs/testing';
import { CuentasDePagoController } from './cuentas-de-pago.controller';
import { CuentasDePagoService } from './cuentas-de-pago.service';

describe('CuentasDePagoController', () => {
  let controller: CuentasDePagoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuentasDePagoController],
      providers: [CuentasDePagoService],
    }).compile();

    controller = module.get<CuentasDePagoController>(CuentasDePagoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
