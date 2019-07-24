# Libra Core Wallet

Unofficial javascript library for creating and exporting Libra Accounts.
It is built with typescript works both in the browser and in Node.

It is what is used internally by [libra-core](https://github.com/perfectmak/libra-core)

## Table of Content

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
  * [Creating an Account](#creating-an-account)
  * [Exporting and Importing Accounts Private Key](#exporting-and-importing-accounts-private-key)
- [Development](#development)
- [Contribution](#contribution)
- [License](#license)

<!-- tocstop -->

## Installation
To install with npm run:

```
npm install libra-core-wallet
```

## Usage

Import the wallet like:

```javascript
import { LibraWallet } from 'libra-core-wallet';
```

### Creating an Account

In order to create a libra account, you would need to instantiate the `LibraWallet` like:

```javascript
// you may need to use require for node
import { LibraWallet, Account as LibraAccount } from 'libra-core-wallet';

// please don't use this mnemonic outside of this sample code
// also mnemonics are optional. If you don't specify one a random mnemonic is generated and used.
const wallet = new LibraWallet({
  mnemonic: 'upgrade salt toy stable drop paddle'
});

// generate a new account
const account = wallet.newAccount();

// or if you have your secret key you can create an account from it
// const secretKey = 'pub-hex-secret-key-here' 
// const account = LibraAccount.fromSecretKey(secretKey);


// you can see your address by:
console.log(account.getAddress().toHex());
```

### Exporting and Importing Accounts Private Key

```javascript
// you may need to use require for node
import { LibraWallet, Account as LibraAccount } from 'libra-core-wallet';

...

// generate a new account
const account = wallet.newAccount();

// extract/export accounts privateKey
const privateKey = account.keyPair.getPrivateKey();
const privateKeyHex = Buffer.from(privateKey).toString('hex');

// you can persist the privateKeyHex string as you wish

// then to import/recreate the account object 
const importedAccount = LibraAccount.fromPrivateKey(privateKeyHex);


// you can see your address by:
console.log(account.getAddress().toHex());
```

## Development
- Clone the repository
- Run `npm install` to install the dependency
- Test with `npm test`

## Contribution
- If you notices a bug or anomaly, please open an issue to track it.
- If you intend on working on a feature that doesn't have an issue yet. Please open an issue first so we can track its progress together.


## License
MIT
