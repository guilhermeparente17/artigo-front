import { AlertTriangle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Modal } from "./Modal";
import { Btn } from "./Btn";
import Loading from "./Loading";
import { useShowArticle } from "../pages/MyArticles/hooks/articlesMe";
import { deleteArticle } from "../services/Articles/deleteArticle";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  open: boolean;
  onClose: () => void;
  articleId: string;
};

export function DeleteArticleModal({ open, onClose, articleId }: Props) {
  const { data, isLoading } = useShowArticle(articleId);
  const queryClient = useQueryClient();

  async function handleDelete() {
    try {
      await deleteArticle(articleId);

      toast.success("Artigo excluído com sucesso!");

      queryClient.invalidateQueries({
        queryKey: ["articles-me"],
      });

      onClose();
    } catch (err) {
      toast.error("Não foi possível excluir o artigo.");
      console.log(err);
    }
  }

  const article = data;

  return (
    <Modal open={open} onClose={onClose} title="Excluir artigo">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
              <AlertTriangle size={24} />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-lg">Tem certeza?</h3>

              <p className="text-sm text-muted-foreground mt-1">
                Esta ação excluirá permanentemente o artigo abaixo. Essa
                operação não poderá ser desfeita.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border overflow-hidden bg-card">
            <img
              src={article?.cover}
              alt={article?.title}
              className="w-full h-36 object-cover"
            />

            <div className="p-4">
              <h4 className="font-semibold text-foreground line-clamp-2">
                {article?.title}
              </h4>

              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {article?.description}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <p className="text-sm text-red-500">
              Todos os comentários, curtidas e informações relacionadas a este
              artigo também serão removidos.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Btn variant="outline" onClick={onClose}>
              Cancelar
            </Btn>

            <Btn
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 size={16} />
              Excluir artigo
            </Btn>
          </div>
        </div>
      )}
    </Modal>
  );
}
