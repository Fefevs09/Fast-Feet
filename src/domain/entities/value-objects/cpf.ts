export class CPF {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  /**
   * Receives a string and normalize it as a CPF
   *
   * Example: "123.456.789-80" => "12345678980"
   * @param text {string}
   *
   */
  static createFromText(text: string) {
    const cpfText = text.normalize('NFKD').trim().replace(/[^\d]/g, '');

    return new CPF(cpfText);
  }
}
