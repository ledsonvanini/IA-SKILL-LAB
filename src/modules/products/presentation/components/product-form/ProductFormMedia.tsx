"use client";

import { useFormContext, useWatch } from "react-hook-form";
import type { ProductFormData } from "./schema";
import { UploadCloud, X } from "lucide-react";

export function ProductFormMedia() {
    const { setValue, control, formState: { errors } } = useFormContext<ProductFormData>();
    const images = useWatch({ control, name: "images" }) || [];

    const handleMockUpload = () => {
        if (images.length >= 4) return;
        setValue("images", [...images, `https://picsum.photos/seed/${Math.random()}/400/400`], {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    const removeImage = (index: number) => {
        setValue("images", images.filter((_, i) => i !== index), {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    return (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Mídia</h2>

            <div className="space-y-4">
                {/* Upload Box */}
                <button
                    type="button"
                    onClick={handleMockUpload}
                    disabled={images.length >= 4}
                    className={`w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed group ${errors.images ? "text-[var(--color-danger)] border-[var(--color-danger)] hover:bg-[var(--color-danger-bg)]/50" : "text-[var(--muted)] border-[var(--border)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)]/50"}`}
                >
                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${errors.images ? "bg-[var(--color-danger-bg)] border-[var(--color-danger)]" : "bg-[var(--background)] border-[var(--border)]"}`}>
                        <UploadCloud size={20} />
                    </div>
                    <span className="font-bold text-sm">Clique para enviar imagem</span>
                    <span className="text-xs mt-1">PNG, JPG até 5MB (Max 4)</span>
                </button>
                {errors.images && (
                    <p className="text-xs text-[var(--color-danger)] font-medium mt-1">{errors.images.message}</p>
                )}

                {/* Previews */}
                {images.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        {images.map((img, i) => (
                            <div key={i} className="relative aspect-square rounded-lg border border-[var(--border)] overflow-hidden group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(i)}
                                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0 shadow-sm"
                                    aria-label="Remove image"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
