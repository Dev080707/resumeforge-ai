import React from "react";

export function Field({
  label,
  error,
  children,
  required,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {error && <span className="block text-xs text-red-500 mt-1">{error}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} resize-y ${props.className ?? ""}`} />;
}

export function TagInput({
  tags,
  onChange,
  placeholder,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  const [value, setValue] = React.useState("");

  const addTag = () => {
    const v = value.trim();
    if (v && !tags.includes(v)) {
      onChange([...tags, v]);
    }
    setValue("");
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-brand-900"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(tags.filter((t) => t !== tag))}
              aria-label={`Remove ${tag}`}
              className="hover:text-red-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <TextInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
          }
        }}
        onBlur={addTag}
        placeholder={placeholder ?? "Type and press Enter"}
      />
    </div>
  );
}

export function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-card">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
      {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-5">{subtitle}</p>}
      {!subtitle && <div className="mb-5" />}
      <div className="space-y-5">{children}</div>
    </div>
  );
}
