export default function ColorPicker({label, value, onChange, colors, disabledColor}) {
    return (
        <div>
            <div>{label}</div>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                {colors.map((c) => (
                    <option key={c} value={c} disabled={c === disabledColor}>
                        {c}
                    </option>
                ))}
            </select>
        </div>
    );
}