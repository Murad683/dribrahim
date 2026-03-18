import { useRef, useState } from 'react';
import { ImagePlus, Trash2, UploadCloud } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CaseImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const readImageFile = (file: File, onLoad: (result: string) => void) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const result = event.target?.result;

    if (typeof result === 'string') {
      onLoad(result);
    }
  };

  reader.readAsDataURL(file);
};

export function CaseImageUpload({ value, onChange }: CaseImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file?: File) => {
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed', {
        description: 'Choose a JPG, PNG, WEBP, or another valid image format.',
      });
      return;
    }

    readImageFile(file, (result) => {
      onChange(result);
      toast.success('Image selected', {
        description: 'Local preview generated for this case.',
      });
    });
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFile(event.dataTransfer.files?.[0]);
        }}
        className={cn(
          'glass-card glow-border group overflow-hidden rounded-[28px] border border-dashed p-4 transition-all duration-300',
          isDragging
            ? 'border-blue-400 bg-blue-50/70 shadow-lg shadow-blue-500/20'
            : 'border-slate-200/80 bg-white/65 hover:border-blue-300 hover:bg-blue-50/40',
        )}
      >
        {value ? (
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
              <img src={value} alt="Case preview" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent" />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  inputRef.current?.click();
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500/30"
              >
                <UploadCloud className="h-4 w-4" />
                Replace Image
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={(event) => {
                  event.stopPropagation();
                  onChange('');
                }}
                className="border-slate-200 bg-white/75"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200/80 bg-white/55 px-6 py-10 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm shadow-blue-500/10">
              <ImagePlus className="h-8 w-8" />
            </div>
            <h3 className="font-display text-lg font-semibold text-slate-900">Drop case image here</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Drag and drop an image or click to generate a local preview for this case card.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-4 py-2 text-sm font-medium text-blue-600">
              <UploadCloud className="h-4 w-4" />
              Browse image
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
