import React from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  ShoppingBag,
} from "lucide-react";

type Slide = { text: string; visualHint: string; backgroundColor?: string };
type ProductInfo = { name: string; url: string; image?: string; sku?: string };

export interface InstagramPostProps {
  username: string;
  avatar?: string;
  slides: Slide[];
  caption: string;
  hashtags: string[];
  likes?: number;
  timeAgo?: string;
  product?: ProductInfo | null;
  backgroundImage?: string | null;
}

const InstagramPostClean: React.FC<InstagramPostProps> = ({
  username = "@beiersdorf",
  avatar,
  slides,
  caption,
  hashtags,
  likes = 0,
  timeAgo = "2m",
  product = null,
  backgroundImage = null,
}) => {
  const hasBg = Boolean(backgroundImage);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [liked, setLiked] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const nextSlide = () => setCurrentSlide((s) => (s + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((s) => (s - 1 + slides.length) % slides.length);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full sm:max-w-md mx-auto m-4 sm:m-6 overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt={username}
                className="w-full h-full rounded-full"
              />
            ) : (
              <span className="text-white font-bold text-sm">B</span>
            )}
          </div>
          <div>
            <p className="font-semibold text-sm">{username}</p>
            <p className="text-xs text-gray-500">B.SkinWise</p>
          </div>
        </div>
        <button className="text-gray-600 hover:text-gray-900">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="relative aspect-square overflow-hidden">
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="background"
            className="absolute inset-0 w-full h-full object-cover blur-md scale-105 -z-10"
          />
        )}

        {backgroundImage ? (
          <div className="absolute inset-0 bg-black/30 z-0" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 z-0" />
        )}

        {backgroundImage && (
          <div className="absolute top-3 left-3 z-20 bg-white/80 rounded px-2 py-1">
            <span className="text-sm font-semibold text-beiersdorf-blue">
              B.SkinWise
            </span>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
          <div className="text-center space-y-4 px-2">
            <div
              className={`text-3xl font-bold leading-tight ${
                hasBg ? "text-white drop-shadow-md" : "text-gray-900"
              }`}
            >
              {slides[currentSlide]?.text}
            </div>
            <div
              className={`text-sm italic ${
                hasBg ? "text-white/90" : "text-gray-600"
              }`}
            >
              💡 {slides[currentSlide]?.visualHint}
            </div>
          </div>
        </div>

        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md"
            >
              ›
            </button>
          </>
        )}

        <div className="absolute top-2 left-0 right-0 flex justify-center gap-1">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === currentSlide ? "w-8 bg-white" : "w-1 bg-white/50"
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded-full">
          {currentSlide + 1}/{slides.length}
        </div>

        {product && (
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute left-3 bottom-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-2 shadow-md hover:scale-105 transform transition"
          >
            <span className="text-sm font-medium text-beiersdorf-blue">
              View product
            </span>
            <ShoppingBag className="w-4 h-4 text-beiersdorf-blue" />
          </a>
        )}
      </div>

      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLiked(!liked)}
              className={`transition ${
                liked ? "text-red-500" : "text-gray-900"
              }`}
            >
              <Heart className={`w-7 h-7 ${liked ? "fill-current" : ""}`} />
            </button>
            <button className="text-gray-900">
              <MessageCircle className="w-7 h-7" />
            </button>
            <button className="text-gray-900">
              <Send className="w-7 h-7" />
            </button>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className={`transition ${
              saved ? "text-gray-900" : "text-gray-900"
            }`}
          >
            <Bookmark className={`w-6 h-6 ${saved ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="font-semibold text-sm">
          {(likes + (liked ? 1 : 0)).toLocaleString()} likes
        </div>

        <div className="text-sm">
          <span className="font-semibold">{username}</span>{" "}
          <span>{caption}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {hashtags.map((tag) => (
            <span
              key={tag}
              className="text-sm text-beiersdorf-blue hover:underline cursor-pointer"
            >
              #{tag.replace(/\s+/g, "")}
            </span>
          ))}
        </div>

        <div className="text-xs text-gray-500 uppercase">{timeAgo}</div>
      </div>
    </div>
  );
};

export default InstagramPostClean;
