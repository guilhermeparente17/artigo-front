import { BookOpen, FileText, Heart, MessageCircle, Users } from "lucide-react";
import { useArticles } from "../Feed/hooks/articles";
import { PALETTE } from "../../utils/consts";
import { UAv } from "../../components/Uav";
import { Badge } from "../../components/Badger";
import dayjs from "dayjs";
import { useSummary } from "./hooks/summary";
import Loading from "../../components/Loading";
import { SummaryCardsSkeleton } from "../../components/SummaryCardSkeleton";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Filters } from "../../components/Filters";
import { Pagination } from "../../components/Pagination";

const Dashboard = () => {
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
  const { data: summary, isLoading: isLoadingSummary } = useSummary();

  const articles = data?.data;
  const meta = data?.meta;

  const stats = [
    {
      label: "Usuários",
      value: summary?.users,
      icon: <Users size={18} />,
      color: PALETTE[0],
    },
    {
      label: "Artigos",
      value: summary?.articles,
      icon: <FileText size={18} />,
      color: PALETTE[1],
    },
    {
      label: "Comentários",
      value: summary?.comments,
      icon: <MessageCircle size={18} />,
      color: PALETTE[2],
    },
    {
      label: "Curtidas",
      value: summary?.likes,
      icon: <Heart size={18} />,
      color: PALETTE[3],
    },
  ];

  const recent =
    articles &&
    [...articles]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 6);

  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <h1
          className="text-2xl font-bold text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Visão geral da plataforma
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {isLoadingSummary ? (
          <SummaryCardsSkeleton />
        ) : (
          stats.map((s) => (
            <div
              key={s.label}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: s.color }}
                >
                  {s.icon}
                </div>
              </div>
              <div
                className="text-3xl font-bold text-foreground"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {s.value}
              </div>
            </div>
          ))
        )}
      </div>

      <section className="flex flex-col gap-5 min-h-[calc(100vh-240px)]">
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

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground text-sm">
              Artigos Recentes
            </h2>
            <span className="text-xs text-muted-foreground">
              {articles?.length} no total
            </span>
          </div>

          <div className="divide-y divide-border">
            <div>
              {isLoading ? (
                <div className="py-4">
                  <Loading />
                </div>
              ) : recent?.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground w-full flex justify-center items-center flex-col">
                  <BookOpen size={40} className="mx-auto mb-3 opacity-20" />
                  <p>Nenhum artigo de outros usuários ainda.</p>
                </div>
              ) : (
                recent?.map((a) => {
                  const author = a.user;
                  const lc = a.likes.length;
                  const cc = a.comments.length;
                  return (
                    <div
                      key={a.id}
                      className="px-6 py-3.5 flex items-center gap-4 hover:bg-muted/20 transition-colors"
                    >
                      <img
                        src={a.cover}
                        alt={a.title}
                        className="w-11 h-11 rounded-lg object-cover bg-muted shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground truncate">
                          {a.title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                          {author && (
                            <>
                              <UAv user={author} size="xs" />
                              {author.name} ·
                            </>
                          )}
                          {dayjs(a.createdAt).format("DD/MM/YYYY")}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                        <span className="flex items-center gap-1">
                          <Heart size={11} />
                          {lc}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle size={11} />
                          {cc}
                        </span>
                      </div>
                      <div className="hidden md:flex gap-1">
                        {a.tags.slice(0, 1).map((t) => (
                          <Badge key={t}>{t}</Badge>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <Pagination
          page={meta?.page ?? 1}
          totalPages={meta?.totalPages ?? 1}
          onPageChange={setPage}
        />
      </section>
    </div>
  );
};

export default Dashboard;
