import { Heart, MessageCircle, Send, Trash2 } from "lucide-react";
import { Badge } from "./Badger";
import { Modal } from "./Modal";
import { cn } from "./utils";
import { useState } from "react";
import {
  useDeleteComment,
  useShowArticle,
} from "../pages/MyArticles/hooks/articlesMe";
import { UAv } from "./Uav";
import Loading from "./Loading";
import { useAuthStore } from "../store/authSotre";
import { TextArea } from "./TextArea";
import { useCreateComment } from "../services/Comments/hooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function ArticleDetail({
  open,
  onClose,
  articleId,
}: {
  open: boolean;
  onClose: () => void;
  articleId: string;
}) {
  const { data: article, isLoading } = useShowArticle(articleId);
  const { user } = useAuthStore();
  const [text, setText] = useState("");

  const { mutateAsync: createComment, isPending } = useCreateComment();

  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    if (!text.trim()) return;

    await createComment({
      payload: {
        content: text,
        articleId: articleId,
      },
    });

    queryClient.invalidateQueries({
      queryKey: ["show-article", articleId],
    });

    setText("");
    toast.success("Comentário publicado!");
  };

  const { mutateAsync: removeComment, isPending: isPendingDeleteComment } =
    useDeleteComment(articleId);

  const handleDeleteComment = async (commentId: string) => {
    try {
      await removeComment(commentId);

      toast.success("Comentário excluído!");
    } catch {
      toast.error("Erro ao excluir comentário.");
    }
  };

  const handleLike = () => {
    //   toggleLike(article.id, me.id);
    //   toast(hasLiked ? "Curtida removida." : "Você curtiu este artigo!", {
    //     icon: hasLiked ? "💔" : "❤️",
    //   });
    // };
  };

  return (
    <Modal open={open} onClose={onClose} title="" wide>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="-mt-4">
          <img
            src={article?.cover}
            alt={article?.title}
            className="w-full h-48 object-cover rounded-lg mb-5 bg-muted"
          />
          <div className="flex gap-1.5 flex-wrap mb-3">
            {article?.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <h2
            className="text-2xl font-bold text-foreground leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {article?.title}
          </h2>
          {article?.user && (
            <div className="flex items-center gap-2.5 mb-5 pb-5 border-b border-border">
              <UAv user={article?.user} size="sm" />
              <div>
                <div className="text-sm font-medium text-foreground">
                  {article?.user.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {/* {article.createdAt} */}
                  data de criação
                </div>
              </div>
            </div>
          )}
          <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap mb-6">
            {article?.content}
          </div>
          <div className="flex items-center gap-5 py-4 border-t border-b border-border mb-6">
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors",
                // hasLiked
                //   ? "text-accent"
                //   : "text-muted-foreground hover:text-accent",
              )}
            >
              <Heart size={15} fill={1 ? "currentColor" : "none"} />
              {0} {1 === 1 ? "curtida" : "curtidas"}
            </button>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MessageCircle size={15} />
              {article?.comments?.length}{" "}
              {article?.comments?.length === 1 ? "comentário" : "comentários"}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm mb-4">
              Comentários
            </h3>
            {article?.comments?.length === 0 && (
              <p className="text-muted-foreground text-sm mb-4">
                Nenhum comentário ainda. Seja o primeiro!
              </p>
            )}
            <div className="space-y-3 mb-5">
              {article?.comments?.map((c) => {
                return (
                  <div key={c.id} className="flex gap-2.5">
                    <UAv user={c.user} size="sm" />
                    <div className="flex w-full justify-between bg-muted/40 rounded-lg px-3 py-3">
                      <div>
                        <div className="text-xs font-semibold text-foreground mb-0.5">
                          {c.user.name}{" "}
                          <span className="font-normal text-muted-foreground">
                            · data de criação do comentario
                          </span>
                        </div>
                        <div className="text-sm text-foreground">
                          {c.content}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteComment(c.id)}
                        disabled={isPendingDeleteComment}
                        className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-muted-foreground hover:text-red-600"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 items-start">
              <UAv user={user} size="sm" />
              <div className="flex-1 flex gap-2">
                <TextArea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Escreva um comentário..."
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                />
                <button
                  onClick={handleSubmit}
                  disabled={isPending || !text.trim()}
                  className="self-end p-2.5 bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-40 transition-opacity"
                >
                  <Send size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
