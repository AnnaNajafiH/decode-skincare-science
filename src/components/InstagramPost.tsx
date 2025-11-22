import React from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  ShoppingBag,
} from "lucide-react";

interface InstagramPostProps {
  username: string;
  avatar?: string;
  slides: Array<{
    text: string;
    visualHint: string;
    backgroundColor?: string;
  }>;
  caption: string;
  hashtags: string[];
  likes?: number;
  timeAgo?: string;
  // Optional product that the post can link to (shopping)
  product?: {
    name: string;
    url: string;
    image?: string;
    sku?: string;
  } | null;
  backgroundImage?: string | null;
}

const InstagramPost: React.FC<InstagramPostProps> = ({
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
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [liked, setLiked] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  // Debug: log the background image value
  console.log("Instagram Post backgroundImage:", backgroundImage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full sm:max-w-md mx-auto m-4 sm:m-6 overflow-hidden">
      {/* Instagram Header */}
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
              <span className="text-white font-black text-xl tracking-tight">
                B
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="font-black text-beiersdorf-blue text-lg tracking-tight">
              B
            </span>
            <span className="font-light text-gray-700 text-base">
              .SkinWise
            </span>
          </div>
        </div>
        <button className="text-gray-600 hover:text-gray-900">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Carousel */}
      <div className="relative aspect-square overflow-hidden">
        {/* Background image (blurred) */}
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="background"
            className="absolute inset-0 w-full h-full object-cover blur-sm scale-105 z-0"
          />
        )}

        {/* Overlay for readability */}
        {backgroundImage ? (
          <div className="absolute inset-0 bg-black/30 z-[1]" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 z-0" />
        )}

        {/* Watermark */}
        {backgroundImage && (
          <div className="absolute top-1 left-1 z-20 rounded px-2 py-1">
            <span className="text-sm font-semibold text-beiersdorf-blue">
              B.SkinWise
            </span>
          </div>
        )}

        {/* Slide Content */}
        <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
          <div className="text-center space-y-4 px-2">
            <div
              className={`text-3xl font-bold leading-tight ${
                backgroundImage ? "text-white drop-shadow-md" : "text-gray-900"
              }`}
            >
              {slides[currentSlide]?.text}
            </div>
            <div
              className={`text-sm italic ${
                backgroundImage ? "text-white/90" : "text-gray-600"
              }`}
            >
              💡 {slides[currentSlide]?.visualHint}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md z-20 text-gray-700 font-bold text-xl"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md z-20 text-gray-700 font-bold text-xl"
            >
              ›
            </button>
          </>
        )}

        {/* Slide Indicators */}
        <div className="absolute top-2 left-0 right-0 flex justify-center gap-1 z-20">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all ${
                idx === currentSlide ? "w-8 bg-white" : "w-1 bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded-full z-20">
          {currentSlide + 1}/{slides.length}
        </div>

        {/* Product overlay button on the image */}
        {product && (
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View product ${product.name}`}
            className="absolute left-3 bottom-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-2 shadow-md hover:scale-105 transform transition z-20 cursor-pointer"
          >
            <span className="text-sm font-medium text-beiersdorf-blue">
              View product
            </span>
            <ShoppingBag className="w-4 h-4 text-beiersdorf-blue" />
          </a>
        )}
      </div>

      {/* Instagram Actions */}
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

        {/* Likes */}
        <div className="font-semibold text-sm">
          {(likes + (liked ? 1 : 0)).toLocaleString()} likes
        </div>

        {/* Caption */}
        <div className="text-sm">
          <span className="font-semibold">{username}</span>{" "}
          <span>{caption}</span>
        </div>

        {/* Hashtags */}
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

        {/* Time */}
        <div className="text-xs text-gray-500 uppercase">{timeAgo}</div>
      </div>

      {/* product card removed: shopping overlay on image now handles product linking */}
    </div>
  );
};

export default InstagramPost;
