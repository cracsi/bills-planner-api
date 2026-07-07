import { Test, TestingModule } from '@nestjs/testing';
import { MetodosDePagoService } from './metodos-de-pago.service';

describe('MetodosDePagoService', () => {
  let service: MetodosDePagoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetodosDePagoService],
    }).compile();

    service = module.get<MetodosDePagoService>(MetodosDePagoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
