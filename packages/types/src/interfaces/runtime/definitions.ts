import definitions from '@polkadot/types/interfaces/runtime/definitions';

export default {
  types: {
    ...definitions.types,
    CurrencyId: {
      _enum: ['LAMI', 'AUSD', 'FEUR', 'FJPY']
    },
    CurrencyIdOf: 'CurrencyId',
    Amount: 'i128',
    AmountOf: 'Amount',
    OracleKey: 'CurrencyId',
    OracleValue: 'Price',
    LiquidityPoolId: 'u32',
    Leverages: 'u16',
    LiquidityPoolOption: {
      bidSpread: 'Permill',
      askSpread: 'Permill',
      additionalCollateralRatio: 'Option<Permill>',
      enabled: 'Leverages'
    },
    Position: {
      collateral: 'Balance',
      synthetic: 'Balance'
    }
  }
};
