export const getImageUri = (
  path: string,
  variant: "poster" | "profile" | "backdrop"
): string =>
  `https://themoviedb.org/t/p/${
    variant === "backdrop"
      ? "w1000_and_h450_multi_faces"
      : "w600_and_h900_bestv2"
  }${path}`;
