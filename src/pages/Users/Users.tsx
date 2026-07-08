import { useState } from "react";
import type { User } from "../../store/authSotre";
import { Edit2, Trash2 } from "lucide-react";
import { UserFormDialog } from "../../components/UserFormDialog";
import { useGetUsers } from "./hooks/users";
import { UAv } from "../../components/Uav";
import { Badge } from "../../components/Badger";
import dayjs from "dayjs";
import { useDebounce } from "use-debounce";
import { Filters } from "../../components/Filters";
import { Pagination } from "../../components/Pagination";
import Loading from "../../components/Loading";

const Users = () => {
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<User | undefined>();

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const [debouncedSearch] = useDebounce(search, 500);
  const [debouncedRole] = useDebounce(role, 500);

  const { data, isLoading } = useGetUsers({
    page,
    search: debouncedSearch,
    role: debouncedRole,
  });
  const users = data?.data;
  const meta = data?.meta;

  return (
    <div className="p-8 w-full flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="text-2xl font-bold text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Usuários
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {meta?.total} cadastrados
          </p>
        </div>
      </div>

      <Filters
        search={{
          value: search,
          onChange: setSearch,
          placeholder: "Buscar por nome ou email...",
        }}
        role={{
          value: role,
          onChange: setRole,
        }}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Usuário", "E-mail", "Função", "Artigos", "Cadastro", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users?.map((u) => {
                return (
                  <tr
                    key={u.id}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <UAv user={u} size="sm" />
                        <span className="font-medium text-foreground">
                          {u.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {u.email}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge red={u.role === "ADMIN"}>
                        {u.role === "ADMIN" ? "Admin" : "Usuário"}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {u._count.articles}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {dayjs(u.createdAt).format("DD/MM/YYYY")}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-0.5">
                        <button
                          onClick={() => {
                            setEditUser(u);
                            setShowForm(true);
                          }}
                          className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => {}}
                          className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-muted-foreground hover:text-red-600"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        page={page}
        totalPages={meta?.totalPages ?? 1}
        onPageChange={setPage}
      />

      <UserFormDialog
        key={editUser?.id ?? "new-user"}
        open={showForm}
        onClose={() => setShowForm(false)}
        editUser={editUser}
      />
    </div>
  );
};

export default Users;
