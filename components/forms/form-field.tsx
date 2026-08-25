import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
export const FormField = ({
  label,
  name,
  id,
  required,
  placeholder,
  onChange,
  error,
  value,
  textarea,
}: {
  label: string;
  name: string;
  id: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => void;
  error?: string;
  value?: string;
}) => {
  return (
    <div className="space-y-5">
      <Label htmlFor={id}>{label}</Label>
      {textarea ? (
        <Textarea
          id={id}
          name={name}
          required={required}
          placeholder={placeholder}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void
          }
          value={value}
          className="bg-slate-800/60 text-slate-300 border-slate-700/50  pl-5 pr-4 border-0 focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        />
      ) : (
        <Input
          id={id}
          name={name}
          required={required}
          placeholder={placeholder}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
          }
          value={value}
          className="bg-slate-800/60 text-slate-300 border-slate-700/50  pl-5 pr-4 border-0 focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        ></Input>
      )}
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};
