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

/**
 * @param {Object} info Image info variant
 * @param {string} info.variant TMDb image variant
 * @returns {string} Local image directory
 */
const getImageDir = ({ variant }: Pick<ImageInfo, "variant">): string =>
  `${cacheDirectory}/image/${variant}/`;

/**
 * @param {Object} info Image info path, variant
 * @param {number} info.movieId TMDb movie id
 * @param {string} info.path TMDb image url path
 * @param {string} info.variant TMDb image variant
 * @returns {string} Image file URI
 */
const imageFileUri = ({ movieId, path, variant }: ImageInfo): string =>
  `${getImageDir({ variant })}${movieId}.${path.split(".").slice(-1)[0]}`;

/**
 * @param {Object} info Image info path, variant
 * @param {string} info.path TMDb image url path
 * @param {string} info.variant TMDb image variant
 * @returns {string} Image URI
 */
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

/**
 * Checks if image directory exists. If not, creates it
 *
 * @param {Object} info Image info variant
 */
const ensureDirExists = async (
  info: Pick<ImageInfo, "variant">
): Promise<void> => {
  const dirInfo = await getInfoAsync(getImageDir(info));
  if (!dirInfo.exists) {
    await makeDirectoryAsync(getImageDir(info), { intermediates: true });
  }
};

/**
 * Returns URI to our local image file
 * If our image doesn't exist locally, it downloads it
 *
 * @param {Object} info Image info variant, path, movie id
 * @returns {Promise} image uri string
 */
export const getSingleImageUri = async (info: ImageInfo): Promise<string> => {
  await ensureDirExists(info);

  const fileUri = imageFileUri(info);
  const fileInfo = await getInfoAsync(fileUri);

  if (!fileInfo.exists) {
    await downloadAsync(getImageUri(info), fileUri);
  }

  return fileUri;
};

/**
 * Exports shareable URI - it can be shared outside your app
 *
 * @param {Object} info Image info variant, path, movie id
 * @returns {Promise} image content uri string
 */
export const getImageContentUri = async (info: ImageInfo): Promise<string> =>
  getContentUriAsync(await getSingleImageUri(info));

/**
 * Deletes whole imagehy directory with all its content
 *
 * @param {Object} info Image info variant
 */
export const deleteAllImages = async (
  info: Pick<ImageInfo, "variant">
): Promise<void> => {
  await deleteAsync(getImageDir(info));
};
