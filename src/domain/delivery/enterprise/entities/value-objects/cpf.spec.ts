import { CPF } from './cpf';

it('should be able to create a CPF', () => {
  const pureCpf = '123.456.789-00';
  const newCpf = CPF.createFromText(pureCpf);

  expect(newCpf.value).toEqual('12345678900');
});
