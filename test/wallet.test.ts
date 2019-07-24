import { LibraWallet, Mnemonic } from '../lib';

describe('LibraWallet', () => {
  it('creates correct account', () => {
    const wallet = new LibraWallet({ mnemonic: 'debris retire cannon unlock winner recall can congress chief roof either destroy mind version release ticket obvious raven shop dirt matter bus ill fall'});
    const firstAccount = wallet.newAccount();

    expect(firstAccount.getAddress().toString()).toEqual('ec679ae483c72fc99da0a3f365233c98d226c4de12e326ffead2f12f8488467b')
  });
  describe('generateMnemonic()', () => {
    it('should generate 100 unique mnemonic', () => {
      const mnemonics = [];

      for (let i = 0; i < 100; i++) {
        const mnemonic = new Mnemonic().toString();
        mnemonics.push(mnemonic);
      }

      expect([...new Set(mnemonics)].length).toBe(100);
    });
  });
});
