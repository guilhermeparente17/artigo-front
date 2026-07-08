import { Search, Tag, User } from "lucide-react";
import { TextInput } from "./TextInput";

type FilterField = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

type FiltersProps = {
  search?: FilterField;
  author?: FilterField;
  tag?: FilterField;
  role?: FilterField;
};

export function Filters({ search, author, tag, role }: FiltersProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {search && (
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <TextInput
              className="pl-10"
              placeholder={search.placeholder ?? "Buscar..."}
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
            />
          </div>
        )}

        {author && (
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <TextInput
              className="pl-10"
              placeholder={author.placeholder ?? "Autor"}
              value={author.value}
              onChange={(e) => author.onChange(e.target.value)}
            />
          </div>
        )}

        {tag && (
          <div className="relative">
            <Tag
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <TextInput
              className="pl-10"
              placeholder={tag.placeholder ?? "Tag"}
              value={tag.value}
              onChange={(e) => tag.onChange(e.target.value)}
            />
          </div>
        )}

        {role && (
          <select
            value={role.value}
            onChange={(e) => role.onChange(e.target.value)}
            className="
      w-full px-3 py-2 text-sm
      bg-card border border-border
      rounded-md
      focus:outline-none
      focus:ring-2 focus:ring-ring
      transition
      text-foreground
    "
          >
            <option value="">Todas as funções</option>

            <option value="ADMIN">Administrador</option>

            <option value="USER">Usuário</option>
          </select>
        )}
      </div>
    </div>
  );
}
