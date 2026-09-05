import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Gem, Coins, ArrowDown, CheckCircle2, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import styles from "./ExchangeModal.module.css";

// States: "confirm" | "processing" | "success" | "error"
export default function ExchangeModal({
  open,
  state,
  option,
  preview,
  error,
  onCancel,
  onConfirm,
  onContinue,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape" && state !== "processing") {
        if (state === "success") onContinue();
        else onCancel();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, state, onCancel, onContinue]);

  useEffect(() => {
    if (open && state === "success") {
      confetti({
        particleCount: 130,
        spread: 75,
        origin: { x: 0.5, y: 0.45 },
        colors: ["#7c3aed", "#f59e0b", "#22c55e", "#38bdf8", "#ffffff"],
      });
    }
  }, [open, state]);

  const afterGems = preview?.after?.gems;
  const afterVes = preview?.after?.ves;

  return (
    <AnimatePresence>
      {open && option && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => state !== "processing" && (state === "success" ? onContinue() : onCancel())}
        >
          <motion.div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label={state === "success" ? "Conversion complete" : "Confirm conversion"}
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => (state === "success" ? onContinue() : onCancel())}
              disabled={state === "processing"}
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>

            {state === "success" ? (
              <div className={styles.successWrap}>
                <motion.div
                  className={styles.successIcon}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                >
                  <CheckCircle2 size={44} />
                </motion.div>
                <h2 className={styles.title}>Conversion Complete</h2>
                <p className={styles.successText}>
                  {option.requiredGems} Gems converted
                  <br />
                  <strong>+{option.receiveVEs} VEs</strong> added to your balance.
                </p>
                <div className={styles.afterGrid}>
                  <div className={styles.afterBox}>
                    <span>Gems balance</span>
                    <strong>{Number(afterGems ?? preview?.balances?.gems ?? 0).toLocaleString("en-IN")}</strong>
                  </div>
                  <div className={styles.afterBox}>
                    <span>VEs balance</span>
                    <strong>{Number(afterVes ?? preview?.balances?.ves ?? 0).toLocaleString("en-IN")} VEs</strong>
                  </div>
                </div>
                <button type="button" className={styles.confirmBtn} onClick={onContinue} autoFocus>
                  Continue
                </button>
              </div>
            ) : (
              <>
                <h2 className={styles.title}>Confirm Conversion</h2>
                <p className={styles.sub}>Review your reward conversion before confirming.</p>

                <div className={styles.flowBox}>
                  <div className={styles.flowRow}>
                    <Gem size={17} /> {option.requiredGems} Gems
                  </div>
                  <div className={styles.flowArrow} aria-hidden="true">
                    <ArrowDown size={15} />
                  </div>
                  <div className={`${styles.flowRow} ${styles.ve}`}>
                    <Coins size={17} /> {option.receiveVEs} VEs
                  </div>
                </div>

                <div className={styles.afterGrid}>
                  <div className={styles.afterBox}>
                    <span>Gems after conversion</span>
                    <strong>
                      {preview ? Number(afterGems).toLocaleString("en-IN") : "…"}
                    </strong>
                  </div>
                  <div className={styles.afterBox}>
                    <span>VEs after conversion</span>
                    <strong>
                      {preview ? `${Number(afterVes).toLocaleString("en-IN")} VEs` : "…"}
                    </strong>
                  </div>
                </div>

                {!preview && state !== "error" && (
                  <p className={styles.verifyNote}>Verifying balances on the server…</p>
                )}

                {state === "error" && (
                  <div className={styles.errorBox} role="alert">
                    {error || "Conversion failed. Please try again."}
                  </div>
                )}

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={onCancel}
                    disabled={state === "processing"}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={styles.confirmBtn}
                    onClick={onConfirm}
                    disabled={state === "processing" || !preview}
                  >
                    {state === "processing" ? (
                      <>
                        <Loader2 size={15} className={styles.spin} /> Converting…
                      </>
                    ) : (
                      "Confirm Conversion"
                    )}
                  </button>
                </div>
                {state === "processing" && (
                  <p className={styles.verifyNote}>Processing on the server — the button is locked to prevent double conversion.</p>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
