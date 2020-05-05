import { Observable, of, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TokenBalance, TokenInfo } from '../types';
import EthereumApi from './EthereumApi';

class Currencies {
  private apiProvider: EthereumApi;

  constructor(provider: EthereumApi) {
    this.apiProvider = provider;
  }

  public oracleValues: undefined;

  public tokens = (): Observable<TokenInfo[]> => {
    return of([
      {
        name: 'DAI',
        displayName: 'DAI',
        precision: 18,
        isBaseToken: true,
        isNetworkToken: false,
        id: this.apiProvider.tokenContracts.DAI.options.address.toLowerCase()
      },
      {
        name: 'fEUR',
        displayName: 'Euro',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: this.apiProvider.tokenContracts.fEUR.options.address.toLowerCase()
      },
      {
        name: 'fJPY',
        displayName: 'Yen',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: this.apiProvider.tokenContracts.fJPY.options.address.toLowerCase()
      },
      {
        name: 'fXAU',
        displayName: 'Gold',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: this.apiProvider.tokenContracts.fXAU.options.address.toLowerCase()
      },
      {
        name: 'fAAPL',
        displayName: 'Apple',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: this.apiProvider.tokenContracts.fAAPL.options.address.toLowerCase()
      }
    ]);
  };

  public balances = (address: string): Observable<TokenBalance[]> => {
    return this.tokens().pipe(
      switchMap(tokens => {
        return combineLatest(
          ...tokens.map(({ id }) =>
            this.apiProvider
              .getTokenContract(id)
              .methods.balanceOf(address)
              .call()
              .then((result: any) => {
                return {
                  tokenId: id,
                  free: result
                };
              })
          )
        );
      })
    );
  };
}

export default Currencies;
