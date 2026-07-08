import { Heart, MessageCircle } from "lucide-react";
import { Chip } from "./Chip";
import { UAv } from "./Uav";
import { cn } from "./utils";
import { useCreateLike, useDeleteLike } from "../services/Likes/hooks";
import { useAuthStore } from "../store/authSotre";
import { toast } from "sonner";
import type { Articles } from "../pages/MyArticles/types";

export function ArticleCard({
  article,
  onClick,
}: {
  article: Articles;
  onClick: () => void;
}) {
  const { user } = useAuthStore();
  // const me = useAuth((s) => s.user)!;
  // const { users, likes, comments, toggleLike } = useStore();
  // const author = users.find((u) => u.id === article.authorId);
  // const likeCount = likes.filter((l) => l.articleId === article.id).length;
  // const commentCount = comments.filter(
  //   (c) => c.articleId === article.id,
  // ).length;

  const userLike = article?.likes.find((like) => like.userId === user?.id);

  const hasLiked = !!userLike;
  const { mutateAsync: removeLike } = useDeleteLike(article.id);
  const { mutateAsync: toggleLike, isPending: isLiking } = useCreateLike(
    article.id,
  );

  const handleLike = async () => {
    if (!article) return;

    try {
      if (hasLiked && userLike) {
        await removeLike({
          id: userLike.id,
          articleId: article.id,
        });

        toast("Curtida removida.", {
          icon: "💔",
        });
      } else {
        await toggleLike(article.id);

        toast("Você curtiu este artigo!", {
          icon: "❤️",
        });
      }
    } catch {
      toast.error("Erro ao atualizar a curtida.");
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="relative h-44 bg-muted overflow-hidden">
        <img
          src={article.cover}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {article.tags.slice(0, 2).map((t) => (
            <Chip key={t} label={t} />
          ))}
        </div>
      </div>
      <div className="p-5">
        <h3
          className="font-bold text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-accent transition-colors"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {article.content}
        </p>
        {article.user && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UAv user={article.user} size="xs" />
              <div>
                <div className="text-xs font-medium text-foreground">
                  {article.user.name}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {article.createdAt}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
                disabled={isLiking}
                className={cn(
                  "flex items-center gap-1 transition-colors hover:text-accent disabled:opacity-50",
                  hasLiked && "text-accent",
                )}
              >
                <Heart size={13} fill={hasLiked ? "currentColor" : "none"} />
                {article._count.likes}
              </button>
              <span className="flex items-center gap-1">
                <MessageCircle size={13} />
                {0}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
