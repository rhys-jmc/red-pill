import {
  cacheDirectory,
  deleteAsync,
  downloadAsync,
  getContentUriAsync,
  getInfoAsync,
  makeDirectoryAsync,
} from "expo-file-system";

type ImageInfo = {
  readonly movieId: number;
  readonly path: string;
  readonly variant: "poster" | "profile" | "backdrop" | "provider";
};

const getImageDir = ({ variant }: Pick<ImageInfo, "variant">): string =>
  `${cacheDirectory}/image/${variant}/`;

const imageFileUri = ({ movieId, path, variant }: ImageInfo): string =>
  `${getImageDir({ variant })}${movieId}.${path.split(".").slice(-1)[0]}`;

const getImageUri = ({
  path,
  variant,
}: Pick<ImageInfo, "path" | "variant">): string =>
  `https://themoviedb.org/t/p/${
    variant === "backdrop"
      ? "w1000_and_h450_multi_faces"
      : variant === "provider"
      ? "original"
      : "w600_and_h900_bestv2"
  }${path}`;

// Checks if image directory exists. If not, creates it
const ensureDirExists = async (
  config: Pick<ImageInfo, "variant">
): Promise<void> => {
  const dirInfo = await getInfoAsync(getImageDir(config));
  if (!dirInfo.exists) {
    await makeDirectoryAsync(getImageDir(config), { intermediates: true });
  }
};

// Returns URI to our local image file
// If our image doesn't exist locally, it downloads it
export const getSingleImageUri = async (config: ImageInfo): Promise<string> => {
  await ensureDirExists(config);

  const fileUri = imageFileUri(config);
  const fileInfo = await getInfoAsync(fileUri);

  if (!fileInfo.exists) {
    await downloadAsync(getImageUri(config), fileUri);
  }

  return fileUri;
};

// Exports shareable URI - it can be shared outside your app
export const getImageContentUri = async (config: ImageInfo): Promise<string> =>
  getContentUriAsync(await getSingleImageUri(config));

// Deletes whole imagehy directory with all its content
export const deleteAllImages = async (
  config: Pick<ImageInfo, "variant">
): Promise<void> => {
  await deleteAsync(getImageDir(config));
};
