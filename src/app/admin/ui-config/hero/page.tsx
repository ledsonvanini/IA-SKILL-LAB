"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Trash, Image as ImageIcon, Save, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";

const INITIAL_BANNERS = [
    { id: "1", url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&h=500&fit=crop&crop=bottom" },
    { id: "2", url: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1400&h=500&fit=crop" },
    { id: "3", url: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1400&h=500&fit=crop" },
];

export default function HeroConfigPage() {
    const [banners, setBanners] = useState(INITIAL_BANNERS);
    const [newUrl, setNewUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAdd = () => {
        if (!newUrl.trim()) return;
        setBanners((prev) => [...prev, { id: Math.random().toString(), url: newUrl }]);
        setNewUrl("");
    };

    const handleRemove = (id: string) => {
        setBanners((prev) => prev.filter((b) => b.id !== id));
    };

    const moveUp = (index: number) => {
        if (index === 0) return;
        const newBanners = [...banners];
        const temp = newBanners[index - 1];
        newBanners[index - 1] = newBanners[index];
        newBanners[index] = temp;
        setBanners(newBanners);
    };

    const moveDown = (index: number) => {
        if (index === banners.length - 1) return;
        const newBanners = [...banners];
        const temp = newBanners[index + 1];
        newBanners[index + 1] = newBanners[index];
        newBanners[index] = temp;
        setBanners(newBanners);
    };

    const handleSave = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            alert("Banners salvos com sucesso! (Mock)");
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link href="/admin/ui-config">
                        <Button type="button" variant="ghost" className="px-2">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-[var(--foreground)] tracking-tight flex items-center gap-3">
                            <ImageIcon className="text-blue-500" />
                            Configuração do Hero (Banners)
                        </h1>
                        <p className="text-sm text-[var(--muted)] mt-1">
                            Gerencie as imagens de destaque que aparecem no topo da página inicial.
                        </p>
                    </div>
                </div>
                <Button onClick={handleSave} className="gap-2 px-6 shadow-sm shadow-[var(--color-primary)]/20" disabled={isSubmitting}>
                    {isSubmitting ? "Salvando..." : <><Save size={18} /> Salvar Alterações</>}
                </Button>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-4">Adicionar Novo Banner</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label className="text-xs font-semibold text-[var(--muted)] mb-1 block">URL da Imagem</label>
                        <input
                            type="url"
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors"
                            placeholder="https://exemplo.com/imagem.jpg"
                        />
                    </div>
                    <div className="sm:w-32 flex items-end">
                        <Button onClick={handleAdd} className="w-full bg-blue-600 hover:bg-blue-700 shadow-blue-500/20 shadow-lg text-white font-bold h-[46px]">
                            <Plus size={18} className="mr-2" /> Adicionar
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[var(--border)] bg-[var(--background)]">
                    <h3 className="font-bold text-[var(--muted)]">Banners Ativos ({banners.length})</h3>
                    <p className="text-xs text-[var(--muted)] mt-1">O primeiro banner da lista será o primeiro a ser exibido no site.</p>
                </div>

                <div className="divide-y divide-[var(--border)]">
                    {banners.map((banner, index) => (
                        <div key={banner.id} className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6 group hover:bg-[var(--background)] transition-colors">

                            {/* Actions Order */}
                            <div className="flex sm:flex-col gap-2">
                                <button
                                    onClick={() => moveUp(index)}
                                    disabled={index === 0}
                                    className="p-1 rounded bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--background)] disabled:opacity-30 transition-colors"
                                >
                                    <ArrowUp size={16} />
                                </button>
                                <button
                                    onClick={() => moveDown(index)}
                                    disabled={index === banners.length - 1}
                                    className="p-1 rounded bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--background)] disabled:opacity-30 transition-colors"
                                >
                                    <ArrowDown size={16} />
                                </button>
                            </div>

                            {/* Preview Image */}
                            <div className="w-full sm:w-[300px] h-[120px] rounded-xl overflow-hidden border border-[var(--border)] shrink-0 bg-[var(--background)] relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={banner.url} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
                                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-bold backdrop-blur-sm">
                                    #{index + 1}
                                </div>
                            </div>

                            {/* Info & URL */}
                            <div className="flex-1 min-w-0 w-full">
                                <p className="text-sm font-bold truncate mb-1" title={banner.url}>{banner.url}</p>
                            </div>

                            {/* Delete */}
                            <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 shrink-0" onClick={() => handleRemove(banner.id)}>
                                <Trash size={18} />
                            </Button>
                        </div>
                    ))}

                    {banners.length === 0 && (
                        <div className="p-12 text-center text-[var(--muted)]">
                            <ImageIcon size={48} className="mx-auto mb-4 opacity-30" />
                            <p>Nenhum banner cadastrado. O site não exibirá o carrossel principal.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
