import { Btn } from "../../components/Btn";
import {
  Edit2,
  FileText,
  Heart,
  MessageCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { useArticlesMe } from "./hooks/articlesMe";
import { ArticleForm } from "../../components/ArticleForm";
import { useState } from "react";
import dayjs from "dayjs";
import type { ArticlesMeTypes } from "./types";
import { Badge } from "../../components/Badger";

import { ArticleDetail } from "../../components/ArticleDetail";
import { DeleteArticleModal } from "../../components/DeleteArticleModal";

const MyArticles = () => {
  const [showForm, setShowForm] = useState(false);
  const { data: articlesMe } = useArticlesMe();
  const [selected, setSelected] = useState<ArticlesMeTypes | null>(null);
  const [editArticle, setEditArticle] = useState<ArticlesMeTypes | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null,
  );

  return (
    <div className="p-8 w-full">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-bold text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Meus Artigos
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {articlesMe?.length <= 1
              ? `${articlesMe?.length} publicação`
              : `${articlesMe?.length} publicações`}
          </p>
        </div>
        <Btn
          onClick={() => {
            setEditArticle(undefined);
            setShowForm(true);
          }}
        >
          <Plus size={15} /> Criar Artigo
        </Btn>
      </div>

      {articlesMe?.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-xl text-muted-foreground">
          <FileText size={40} className="mx-auto mb-3 opacity-20" />
          <p className="font-medium mb-1">Nenhum artigo publicado</p>
          <p className="text-sm">Comece criando seu primeiro artigo.</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
          {articlesMe?.map((a) => {
            return (
              <div
                key={a.id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-muted/20 transition-colors"
              >
                <img
                  src={a.cover}
                  alt={a.title}
                  onClick={() => setSelected(a)}
                  className="w-14 h-14 rounded-lg object-cover bg-muted shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                />
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => setSelected(a)}
                >
                  <div className="font-semibold text-sm text-foreground truncate">
                    {a.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {dayjs(a.createdAt).format("DD/MM/YYYY")}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart size={11} />
                      {a.likes.length}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={11} />
                      {a.comments.length}
                    </span>
                    <div className="flex gap-1">
                      {a.tags.slice(0, 6).map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <button
                    onClick={() => {
                      setEditArticle(a);
                      setShowForm(true);
                    }}
                    className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedArticleId(a.id);
                      setOpenDelete(true);
                    }}
                    className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-muted-foreground hover:text-red-600"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ArticleForm
        article={editArticle}
        open={showForm}
        onClose={() => setShowForm(false)}
      />

      {selectedArticleId && (
        <DeleteArticleModal
          open={openDelete}
          onClose={() => {
            setOpenDelete(false);
            setSelectedArticleId(null);
          }}
          articleId={selectedArticleId}
        />
      )}

      {selected && (
        <ArticleDetail
          open={!!selected}
          onClose={() => setSelected(null)}
          articleId={selected?.id}
        />
      )}
    </div>
  );
};

export default MyArticles;
