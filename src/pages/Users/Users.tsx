import { useState } from "react";
import type { User } from "../../store/authSotre";
import { Edit2, Trash2 } from "lucide-react";
import { UserFormDialog } from "../../components/UserFormDialog";
import { useGetUsers } from "./hooks/users";
import { UAv } from "../../components/Uav";
import { Badge } from "../../components/Badger";
import dayjs from "dayjs";

const Users = () => {
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<User | undefined>();

  const { data: users } = useGetUsers();

  return (
    <div className="p-8 w-full">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-bold text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Usuários
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {users?.length} cadastrados
          </p>
        </div>
      </div>

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
                <tr key={u.id} className="hover:bg-muted/20 transition-colors">
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
