module lofibets::lofibets {

    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;
    use sui::event;

    // ── Errors ───────────────────────────────────────────────────────────────
    const EMarketNotActive: u64 = 0;
    const EMarketNotResolved: u64 = 1;
    const EWrongMarket: u64 = 2;
    const EWrongChoice: u64 = 3;
    const EZeroBet: u64 = 4;
    const EAlreadyResolved: u64 = 5;

    // ── Constants ────────────────────────────────────────────────────────────
    const STATUS_ACTIVE: u8 = 0;
    const STATUS_RESOLVED: u8 = 1;
    const WINNER_NONE: u8 = 0;
    const WINNER_YES: u8 = 1;
    const WINNER_NO: u8 = 2;

    // ── AdminCap ─────────────────────────────────────────────────────────────
    public struct AdminCap has key, store {
        id: UID,
    }

    // ── Market ───────────────────────────────────────────────────────────────
    public struct Market has key {
        id: UID,
        walrus_blob_id: vector<u8>,
        question: vector<u8>,
        yes_pool: Balance<SUI>,
        no_pool: Balance<SUI>,
        status: u8,
        winner: u8,
    }

    // ── BetReceipt ───────────────────────────────────────────────────────────
    public struct BetReceipt has key, store {
        id: UID,
        market_id: ID,
        choice: bool,
        amount_staked: u64,
    }

    // ── Events ───────────────────────────────────────────────────────────────
    public struct MarketCreated has copy, drop {
        market_id: ID,
        walrus_blob_id: vector<u8>,
    }

    public struct BetPlaced has copy, drop {
        market_id: ID,
        bettor: address,
        choice: bool,
        amount: u64,
    }

    public struct MarketResolved has copy, drop {
        market_id: ID,
        winner: u8,
    }

    public struct WinningsClaimed has copy, drop {
        market_id: ID,
        claimant: address,
        payout: u64,
    }

    // ── Init ─────────────────────────────────────────────────────────────────
    fun init(ctx: &mut TxContext) {
        transfer::transfer(
            AdminCap { id: object::new(ctx) },
            tx_context::sender(ctx)
        );
    }

    // ── create_market ────────────────────────────────────────────────────────
    public fun create_market(
        _admin: &AdminCap,
        walrus_blob_id: vector<u8>,
        question: vector<u8>,
        ctx: &mut TxContext
    ) {
        let market = Market {
            id: object::new(ctx),
            walrus_blob_id,
            question,
            yes_pool: balance::zero<SUI>(),
            no_pool: balance::zero<SUI>(),
            status: STATUS_ACTIVE,
            winner: WINNER_NONE,
        };

        event::emit(MarketCreated {
            market_id: object::id(&market),
            walrus_blob_id: market.walrus_blob_id,
        });

        transfer::share_object(market);
    }

    // ── place_bet ────────────────────────────────────────────────────────────
    public fun place_bet(
        market: &mut Market,
        coin: Coin<SUI>,
        choice: bool,
        ctx: &mut TxContext
    ) {
        assert!(market.status == STATUS_ACTIVE, EMarketNotActive);
        let amount = coin::value(&coin);
        assert!(amount > 0, EZeroBet);

        let bet_balance = coin::into_balance(coin);

        if (choice) {
            balance::join(&mut market.yes_pool, bet_balance);
        } else {
            balance::join(&mut market.no_pool, bet_balance);
        };

        let receipt = BetReceipt {
            id: object::new(ctx),
            market_id: object::id(market),
            choice,
            amount_staked: amount,
        };

        event::emit(BetPlaced {
            market_id: object::id(market),
            bettor: tx_context::sender(ctx),
            choice,
            amount,
        });

        transfer::transfer(receipt, tx_context::sender(ctx));
    }

    // ── resolve_market ───────────────────────────────────────────────────────
    public fun resolve_market(
        _admin: &AdminCap,
        market: &mut Market,
        winning_choice: bool,
    ) {
        assert!(market.status == STATUS_ACTIVE, EAlreadyResolved);
        market.status = STATUS_RESOLVED;
        market.winner = if (winning_choice) { WINNER_YES } else { WINNER_NO };

        event::emit(MarketResolved {
            market_id: object::id(market),
            winner: market.winner,
        });
    }

    // ── claim_winnings ───────────────────────────────────────────────────────
    public fun claim_winnings(
        market: &mut Market,
        receipt: BetReceipt,
        ctx: &mut TxContext
    ) {
        assert!(market.status == STATUS_RESOLVED, EMarketNotResolved);

        let BetReceipt { id, market_id, choice, amount_staked } = receipt;

        assert!(market_id == object::id(market), EWrongMarket);

        let winner_is_yes = market.winner == WINNER_YES;
        assert!(
            (winner_is_yes && choice) || (!winner_is_yes && !choice),
            EWrongChoice
        );

        let yes_total = balance::value(&market.yes_pool);
        let no_total = balance::value(&market.no_pool);
        let combined = yes_total + no_total;
        let winning_pool_total = if (winner_is_yes) { yes_total } else { no_total };

        let payout = (amount_staked * combined) / winning_pool_total;

        let payout_balance = if (winner_is_yes) {
            balance::split(&mut market.yes_pool, payout)
        } else {
            balance::split(&mut market.no_pool, payout)
        };

        event::emit(WinningsClaimed {
            market_id: object::id(market),
            claimant: tx_context::sender(ctx),
            payout,
        });

        object::delete(id);

        transfer::public_transfer(
            coin::from_balance(payout_balance, ctx),
            tx_context::sender(ctx)
        );
    }

    // ── View helpers ─────────────────────────────────────────────────────────
    public fun yes_pool_amount(market: &Market): u64 { balance::value(&market.yes_pool) }
    public fun no_pool_amount(market: &Market): u64 { balance::value(&market.no_pool) }
    public fun market_status(market: &Market): u8 { market.status }
    public fun market_winner(market: &Market): u8 { market.winner }
    public fun market_question(market: &Market): vector<u8> { market.question }
    public fun market_walrus_id(market: &Market): vector<u8> { market.walrus_blob_id }
}
