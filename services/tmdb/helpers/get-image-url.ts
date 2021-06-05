export const getImageUri = (
  path: string,
  variant: "poster" | "backdrop"
): string =>
  `https://themoviedb.org/t/p/${
    variant === "poster" ? "w600_and_h900_bestv2" : "w1000_and_h450_multi_faces"
  }${path}`;
