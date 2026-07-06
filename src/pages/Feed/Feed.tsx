import { BookOpen } from "lucide-react";
import { useArticles } from "./hooks/articles";
import { ArticleCard } from "../../components/ArticlesCard";
import { useState } from "react";
import type { ArticlesTypes } from "./types";
import { ArticleDetail } from "../../components/ArticleDetail";
import Loading from "../../components/Loading";

const Feed = () => {
  const { data: articles, isLoading } = useArticles();
  const [selected, setSelected] = useState<ArticlesTypes | null>(null);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1
          className="text-2xl font-bold text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Feed
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Artigos publicados pela comunidade
        </p>
      </div>
      {articles?.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <BookOpen size={40} className="mx-auto mb-3 opacity-20" />
          <p>Nenhum artigo de outros usuários ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {articles?.map((a) => (
            <ArticleCard
              key={a.id}
              article={a}
              onClick={() => setSelected(a)}
            />
          ))}
        </div>
      )}
      {selected && (
        <ArticleDetail
          article={selected}
          open={!!selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default Feed;
