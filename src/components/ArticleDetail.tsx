import { Send } from "lucide-react";
import type { ArticlesTypes } from "../pages/Feed/types";
import { Badge } from "./Badger";
import { Modal } from "./Modal";
import { cn } from "./utils";
import { useState } from "react";

export function ArticleDetail({
  article,
  open,
  onClose,
}: {
  article: ArticlesTypes;
  open: boolean;
  onClose: () => void;
}) {
  // const me = useAuth((s) => s.user)!;
  // const { users, comments, likes, addComment, toggleLike } = useStore();
  const [text] = useState("");

  // const author = users.find((u) => u.id === article.authorId);
  // const artComments = comments.filter((c) => c.articleId === article.id);
  // const likeCount = likes.filter((l) => l.articleId === article.id).length;
  // const hasLiked = likes.some(
  //   (l) => l.articleId === article.id && l.userId === me.id,
  // );

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
      <div className="-mt-4">
        <img
          src={article.cover}
          alt={article.title}
          className="w-full h-48 object-cover rounded-lg mb-5 bg-muted"
        />
        <div className="flex gap-1.5 flex-wrap mb-3">
          {article.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <h2
          className="text-2xl font-bold text-foreground leading-tight mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {article.title}
        </h2>
        {/* {author && (
          <div className="flex items-center gap-2.5 mb-5 pb-5 border-b border-border">
            <UAv user={author} size="sm" />
            <div>
              <div className="text-sm font-medium text-foreground">
                {author.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {article.createdAt}
              </div>
            </div>
          </div>
        )} */}
        <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap mb-6">
          {article.content}
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
            {/* <Heart size={15} fill={hasLiked ? "currentColor" : "none"} /> */}
            {/* {likeCount} {likeCount === 1 ? "curtida" : "curtidas"} */}
          </button>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            {/* <MessageCircle size={15} />
            {artComments.length}{" "}
            {artComments.length === 1 ? "comentário" : "comentários"} */}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm mb-4">
            Comentários
          </h3>
          {/* {artComments.length === 0 && (
            <p className="text-muted-foreground text-sm mb-4">
              Nenhum comentário ainda. Seja o primeiro!
            </p>
          )} */}
          <div className="space-y-3 mb-5">
            {/* {artComments.map((c) => {
              const auth = users.find((u) => u.id === c.authorId);
              return auth ? (
                <div key={c.id} className="flex gap-2.5">
                  <UAv user={auth} size="sm" />
                  <div className="flex-1 bg-muted/40 rounded-lg px-3 py-2">
                    <div className="text-xs font-semibold text-foreground mb-0.5">
                      {auth.name}{" "}
                      <span className="font-normal text-muted-foreground">
                        · {c.createdAt}
                      </span>
                    </div>
                    <div className="text-sm text-foreground">{c.text}</div>
                  </div>
                </div>
              ) : null;
            })} */}
          </div>
          <div className="flex gap-2 items-start">
            {/* <UAv user={me} size="sm" /> */}
            <div className="flex-1 flex gap-2">
              {/* <TextArea
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
              /> */}
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
    </Modal>
  );
}
