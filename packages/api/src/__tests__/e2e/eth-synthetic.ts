import { EthereumApi, LaminarApi } from '../..';
import Web3 from 'web3';

describe('ethereum api', () => {
  jest.setTimeout(300000);

  const api = new EthereumApi({
    provider: new Web3.providers.HttpProvider('https://kovan.infura.io/v3/16a5aa3a08c24d56b1586cd06b4055d5')
  });

  beforeAll(async () => {
    await api.isReady();
  });

  it('allPoolIds', done => {
    api.synthetic.allPoolIds().subscribe(result => {
      console.log(result);
    });
  });

  it('poolInfo', done => {
    api.synthetic.poolInfo('0xb587B74502104cf1002d1F9cF4f7D7662E45A63D').subscribe(result => {
      console.log(result);
    });
  });
});