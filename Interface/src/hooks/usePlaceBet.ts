import { useSignAndExecuteTransaction } from '@mysten/dapp-kit'
import { Transaction } from '@mysten/sui/transactions'
import { PACKAGE_ID, MARKET_ID } from '../constants'

export function usePlaceBet() {
  const { mutate: signAndExecute, isPending } = useSignAndExecuteTransaction()
  

  function placeBet(
    choice: boolean,
    amountInMist: number,
    onSuccess: () => void,
    onError: (e: Error) => void
  ) {
    const tx = new Transaction()

    // ✅ Set the sender explicitly and gas budget
    tx.setGasBudget(10_000_000) // 0.01 SUI — safe default for testnet

    // ✅ Cast to bigint — this is the most common silent failure
    const [betCoin] = tx.splitCoins(tx.gas, [BigInt(amountInMist)])

    tx.moveCall({
      target: `${PACKAGE_ID}::lofibets::place_bet`,
      arguments: [
        tx.object(MARKET_ID),
        betCoin,
        tx.pure.bool(choice),
      ],
    })

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: (result) => {
          console.log('✅ TX digest:', result.digest)
          onSuccess()
        },
        onError: (e) => {
          console.error('❌ TX error:', e)
          onError(e)
        },
      }
    )
  }

  return { placeBet, isPending }
}