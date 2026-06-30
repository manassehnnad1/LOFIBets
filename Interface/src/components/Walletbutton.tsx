import { useCurrentAccount, useDisconnectWallet, ConnectModal } from '@mysten/dapp-kit'
import { useState } from 'react'

export default function WalletButton() {
  const account = useCurrentAccount()
  const { mutate: disconnect } = useDisconnectWallet()
  const [showMenu, setShowMenu] = useState(false)
  const [open, setOpen] = useState(false)

  function shortAddress(addr: string) {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  function handleDisconnect() {
    disconnect()
    setShowMenu(false)
    // clear dapp-kit's cached wallet from localStorage
    localStorage.removeItem('dapp-kit:last-connected-wallet-name')
    localStorage.removeItem('dapp-kit:last-connected-account-address')
  }

  if (!account) {
    return (
      <ConnectModal
        trigger={
          <button
            style={{
              fontFamily: "'Elms Sans', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              padding: "12px 24px",
              borderRadius: "0px",
              background: "#3d4f7c",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 5px 0 #232d47",
              letterSpacing: "0.02em",
            }}
          >
            Connect Wallet
          </button>
        }
        open={open}
        onOpenChange={setOpen}
      />
    )
  }

  return (
    <div style={{ position: "relative" }}>
      {/* connected button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        style={{
          fontFamily: "'Elms Sans', sans-serif",
          fontSize: "0.9rem",
          fontWeight: 700,
          padding: "12px 24px",
          borderRadius: "0px",
          background: "#0c53a3",
          color: "#ffffff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 5px 0 #1a6fd4",
          letterSpacing: "0.02em",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#4ade80",
          display: "inline-block",
          flexShrink: 0,
        }} />
        {shortAddress(account.address)}
      </button>

      {/* dropdown */}
      {showMenu && (
        <>
          {/* backdrop to close on outside click */}
          <div
            onClick={() => setShowMenu(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "calc(100% + 10px)",
              right: 0,
              background: "#ffffff",
              borderRadius: "16px",
              padding: "8px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              border: "1px solid rgba(10,13,20,0.08)",
              minWidth: "200px",
              zIndex: 100,
            }}
          >

            {/* copy address */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(account.address)
                setShowMenu(false)
              }}
              style={{
                width: "100%",
                padding: "10px 12px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "0.85rem",
                fontFamily: "'Elms Sans', sans-serif",
                fontWeight: 500,
                color: "#0a0d14",
                borderRadius: "10px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f4f6f9")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              📋 Copy Address
            </button>

            {/* disconnect */}
            <button
              onClick={handleDisconnect}
              style={{
                width: "100%",
                padding: "10px 12px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "0.85rem",
                fontFamily: "'Elms Sans', sans-serif",
                fontWeight: 500,
                color: "#e53e3e",
                borderRadius: "10px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fff5f5")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              🔌 Disconnect
            </button>
          </div>
        </>
      )}
    </div>
  )
}