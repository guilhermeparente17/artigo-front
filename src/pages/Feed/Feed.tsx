import { BookOpen } from "lucide-react";
import { useArticles } from "./hooks/articles";
import { ArticleCard } from "../../components/ArticlesCard";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { ArticleDetail } from "../../components/ArticleDetail";
import { useDebounce } from "use-debounce";
import { Filters } from "../../components/Filters";
import type { Articles } from "./types";
import { Pagination } from "../../components/Pagination";

const Feed = () => {
  const [selected, setSelected] = useState<Articles | null>(null);
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("");
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(search, 500);
  const [debouncedAuthor] = useDebounce(author, 500);
  const [debouncedTag] = useDebounce(tag, 500);

  const { data, isLoading } = useArticles({
    page,
    search: debouncedSearch,
    author: debouncedAuthor,
    tag: debouncedTag,
  });

  const articles = data?.data;
  const meta = data?.meta;

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, debouncedAuthor, debouncedTag]);

  return (
    <div className="p-8 w-full">
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

      <section className="flex flex-col gap-5">
        <Filters
          search={{
            value: search,
            onChange: setSearch,
            placeholder: "Buscar por título...",
          }}
          author={{
            value: author,
            onChange: setAuthor,
          }}
          tag={{
            value: tag,
            onChange: setTag,
          }}
        />

        <div className="flex flex-col min-h-[calc(100vh-240px)]">
          <div className="flex-1">
            {isLoading ? (
              <Loading />
            ) : articles?.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground w-full flex justify-center items-center flex-col">
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
          </div>
          <Pagination
            page={meta?.page ?? 1}
            totalPages={meta?.totalPages ?? 1}
            onPageChange={setPage}
          />
        </div>
      </section>
      {selected && (
        <ArticleDetail
          articleId={selected?.id}
          open={!!selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default Feed;
