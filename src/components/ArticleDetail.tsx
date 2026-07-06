import { Heart, MessageCircle, Send } from "lucide-react";
import { Badge } from "./Badger";
import { Modal } from "./Modal";
import { cn } from "./utils";
import { useState } from "react";
import { useShowArticle } from "../pages/MyArticles/hooks/articlesMe";
import { UAv } from "./Uav";
import Loading from "./Loading";
import { useAuthStore } from "../store/authSotre";
import { TextArea } from "./TextArea";

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

  const postComment = () => {
    // if (!text.trim()) return;
    // addComment({ articleId: article.id, authorId: me.id, text });
    // setText("");
    // toast.success("Comentário publicado!");
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
              {1} {1 === 1 ? "curtida" : "curtidas"}
            </button>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MessageCircle size={15} />
              {1} {1 === 1 ? "comentário" : "comentários"}
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
                    <UAv user={article.user} size="sm" />
                    <div className="flex-1 bg-muted/40 rounded-lg px-3 py-2">
                      <div className="text-xs font-semibold text-foreground mb-0.5">
                        {article.user.name}{" "}
                        <span className="font-normal text-muted-foreground">
                          · data de criação do comentario
                        </span>
                      </div>
                      <div className="text-sm text-foreground">{c.content}</div>
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
                      postComment();
                    }
                  }}
                />
                <button
                  onClick={postComment}
                  disabled={!text.trim()}
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
