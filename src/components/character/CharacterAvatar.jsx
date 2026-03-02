import { buildDiceBearUrl } from "../../constants/characters.js";

// variant="circle"  — rounded-full, object-cover object-top (default, for cards/bars)
// variant="sprite"  — no crop, object-contain, natural dimensions (for story/confession)
export function CharacterAvatar({ character, size = 120, className = "", variant = "circle" }) {
  const src = character.imagePath
    ? character.imagePath
    : buildDiceBearUrl(character, size);

  if (variant === "sprite") {
    return (
      <img
        src={src}
        alt={character.name}
        className={`object-contain drop-shadow-2xl ${className}`}
        style={{ maxHeight: size, width: "auto", maxWidth: "100%" }}
        loading="eager"
      />
    );
  }

  return (
    <img
      src={src}
      alt={character.name}
      width={size}
      height={size}
      className={`rounded-full object-cover object-top flex-shrink-0 ${className}`}
      loading="eager"
    />
  );
}
