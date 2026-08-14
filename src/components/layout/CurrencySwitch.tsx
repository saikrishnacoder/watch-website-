import { useMoney } from "../../context/CurrencyContext";

export function CurrencySwitch({ compact = false }: { compact?: boolean }) {
  const { code, setCode, currencies } = useMoney();

  return (
    <div className={`currency-switch ${compact ? "is-compact" : ""}`} role="group" aria-label="Currency">
      {currencies.map((item) => (
        <button
          key={item.code}
          type="button"
          className={code === item.code ? "is-on" : ""}
          onClick={() => setCode(item.code)}
          aria-pressed={code === item.code}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
