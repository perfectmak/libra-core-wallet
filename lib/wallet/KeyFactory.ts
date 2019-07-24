import KeyPrefixes from '../constants/KeyPrefixes';
import { KeyPair } from '../crypto/Eddsa';
import { Sha3256Hkdf } from '../crypto/Hkdf';
import { Pbkdf } from '../crypto/Pbkdf';
import { Mnemonic } from './Mnemonic';

/**
 * Seed is used by KeyFactory to generate
 * new key pairs for accounts
 *
 */
export class Seed {
  public static fromMnemonic(words: string[] | Mnemonic, salt: string = 'LIBRA'): Seed {
    const mnemonic: Mnemonic = Array.isArray(words) ? new Mnemonic(words) : words;
    const bytes = new Pbkdf('sha3-256').sha3256Pbkdf2(
      Buffer.from(mnemonic.toBytes()),
      Buffer.from(`${KeyPrefixes.MnemonicSalt}${salt}`),
      2048,
      32,
    );
    return new Seed(bytes);
  }
  public readonly data: Uint8Array;

  /**
   *
   */
  constructor(data: Uint8Array) {
    if (data.length !== 32) {
      throw new Error('Seed data length must be 32 bits');
    }
    this.data = data;
  }
}

export class KeyFactory {
  private readonly seed: Seed;
  private readonly hkdf: Sha3256Hkdf;
  private readonly masterPrk: Uint8Array;

  constructor(seed: Seed) {
    this.seed = seed;
    this.hkdf = new Sha3256Hkdf();
    this.masterPrk = this.hkdf.extract(this.seed.data, KeyPrefixes.MasterKeySalt);
  }

  /**
   * Generates a new key pair at the number position.
   *
   */
  public generateKey(childDepth: number): KeyPair {
    const childDepthBuffer = Buffer.from(
      Number(childDepth)
        .toString(16)
        .padStart(16, '0')
        .slice(0, 16),
      'hex',
    )
    childDepthBuffer.reverse()
    const info = Buffer.from([
      ...Uint8Array.from(Buffer.from(KeyPrefixes.DerivedKey)),
      ...Uint8Array.from(childDepthBuffer),
    ])
    const secretKey = this.hkdf.expand(this.masterPrk, info, 32);

    return KeyPair.fromSecretKey(secretKey);
  }
}
