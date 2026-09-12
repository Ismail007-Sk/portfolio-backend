import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import cloudinary from "../config/cloudinary.js";
import { ValidationError } from "../errors/ValidationError.js";

// =========================
// UPLOAD TYPES
// =========================

export type UploadType =
  | "projectImage"
  | "cv"
  | "certification"
  | "certificationIssuer"
  | "achievementIcon"
  | "skillIcon"
  | "experienceIcon"
  | "profilePic";

// =========================
// CLOUDINARY FOLDER CONFIG
// =========================

const CLOUDINARY_FOLDER_CONFIG: Record<UploadType, string> = {
  projectImage: "portfolio/projects/images",
  cv: "portfolio/cv",
  certification: "portfolio/certifications",
  certificationIssuer: "portfolio/certifications/issuer",
  achievementIcon: "portfolio/achievements/icon",
  skillIcon: "portfolio/skill",
  experienceIcon: "portfolio/experience",
  profilePic: "portfolio/profile/pic",
};

// =========================
// FILE LIMITS & EXTENSIONS
// =========================

const ALLOWED_IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp"];
const ALLOWED_PDF_EXTS = [".pdf"];
const ALLOWED_SVG_EXTS = [".svg"];

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;
const MAX_PDF_SIZE = 3 * 1024 * 1024;
const MAX_ICON_SIZE = 3 * 1024 * 1024;

function getMaxFileSize(uploadType: UploadType): number {
  if (uploadType === "projectImage" || uploadType === "profilePic") {
    return MAX_IMAGE_SIZE;
  }

  if (
    [
      "certificationIssuer",
      "achievementIcon",
      "skillIcon",
      "experienceIcon",
    ].includes(uploadType)
  ) {
    return MAX_ICON_SIZE;
  }

  return MAX_PDF_SIZE;
}

// =========================
// FILE VALIDATION
// =========================

function isValidFile(
  filename: string,
  mimetype: string,
  uploadType: UploadType
): boolean {
  const ext = path.extname(filename).toLowerCase();

  switch (uploadType) {
    case "projectImage":
    case "profilePic":
      return (
        ALLOWED_IMAGE_EXTS.includes(ext) &&
        (mimetype.startsWith("image/") ||
          mimetype === "application/octet-stream")
      );

    case "cv":
    case "certification":
      return (
        ALLOWED_PDF_EXTS.includes(ext) &&
        (mimetype === "application/pdf" ||
          mimetype === "application/octet-stream")
      );

    case "certificationIssuer":
    case "achievementIcon":
    case "skillIcon":
    case "experienceIcon":
      return (
        [...ALLOWED_IMAGE_EXTS, ...ALLOWED_SVG_EXTS].includes(ext) &&
        (mimetype.startsWith("image/") ||
          mimetype === "application/octet-stream")
      );

    default:
      return false;
  }
}

// =========================
// MULTER
// =========================

const storage = multer.memoryStorage();

export function createUploadMiddleware(uploadType: UploadType) {
  return multer({
    storage,

    fileFilter: (
      _req: Express.Request,
      file: Express.Multer.File,
      cb: multer.FileFilterCallback
    ) => {
      if (
        !isValidFile(
          file.originalname,
          file.mimetype,
          uploadType
        )
      ) {
        return cb(
          new ValidationError(
            `Unsupported file type: ${file.originalname}`
          )
        );
      }

      cb(null, true);
    },

    limits: {
      fileSize: getMaxFileSize(uploadType),
      files: 1,
    },
  });
}

// =========================
// SINGLE FILE MIDDLEWARES
// =========================

export const projectImageUpload =
  createUploadMiddleware("projectImage");

export const cvUpload =
  createUploadMiddleware("cv");

export const certificationUpload =
  createUploadMiddleware("certification");

export const certificationIssuerUpload =
  createUploadMiddleware("certificationIssuer");

export const achievementIconUpload =
  createUploadMiddleware("achievementIcon");

export const skillIconUpload =
  createUploadMiddleware("skillIcon");

export const experienceIconUpload =
  createUploadMiddleware("experienceIcon");

export const profilePicUpload =
  createUploadMiddleware("profilePic");

// =========================
// COMBINED CERTIFICATION UPLOAD
// =========================

export const certificationFilesUpload = multer({
  storage,

  fileFilter: (_req: any, file: any, cb: any) => {
    let uploadType: UploadType;

    switch (file.fieldname) {
      case "certificate":
        uploadType = "certification";
        break;

      case "issuerIcon":
        uploadType = "certificationIssuer";
        break;

      default:
        return cb(
          new ValidationError(
            `Unexpected upload field: ${file.fieldname}`
          )
        );
    }

    if (
      !isValidFile(
        file.originalname,
        file.mimetype,
        uploadType
      )
    ) {
      return cb(
        new ValidationError(
          `Unsupported file type: ${file.originalname}`
        )
      );
    }

    cb(null, true);
  },

  limits: {
    // Global safety ceiling
    fileSize: MAX_IMAGE_SIZE,
    files: 2,
  },
}).fields([
  { name: "certificate", maxCount: 1 },
  { name: "issuerIcon", maxCount: 1 },
]);


// =========================
// COMBINED PROFILE UPLOAD
// =========================

export const profileFilesUpload = multer({
  storage,

  fileFilter: (_req: any, file: any, cb: any) => {
    let uploadType: UploadType;

    switch (file.fieldname) {
      case "cv":
        uploadType = "cv";
        break;

      case "profilePic":
        uploadType = "profilePic";
        break;

      default:
        return cb(
          new ValidationError(
            `Unexpected upload field: ${file.fieldname}`
          )
        );
    }

    if (
      !isValidFile(
        file.originalname,
        file.mimetype,
        uploadType
      )
    ) {
      return cb(
        new ValidationError(
          `Unsupported file type: ${file.originalname}`
        )
      );
    }

    cb(null, true);
  },

  limits: {
    // Global safety ceiling
    fileSize: MAX_IMAGE_SIZE,
    files: 2,
  },
}).fields([
  { name: "cv", maxCount: 1 },
  { name: "profilePic", maxCount: 1 },
]);

// =========================
// UPLOAD BUFFER TO CLOUDINARY
// =========================

function uploadBufferToCloudinary(
  buffer: Buffer,
  options: {
    folder: string;
    public_id: string;
    resource_type: "image" | "raw";
    use_filename?: boolean;
    unique_filename?: boolean;
  }
): Promise<{
  secure_url: string;
  public_id: string;
}> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        public_id: options.public_id,
        resource_type: options.resource_type,

        ...(options.use_filename !== undefined && {
          use_filename: options.use_filename,
        }),

        ...(options.unique_filename !== undefined && {
          unique_filename: options.unique_filename,
        }),
      },

      (error, result) => {
        if (error || !result) {
          return reject(
            error ?? new Error("Cloudinary upload failed")
          );
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });
}





// =========================
// SAVE FILE TO CLOUDINARY
// =========================

export async function saveUploadedFile(
  file: Express.Multer.File,
  uploadType: UploadType
): Promise<{
  fileUrl: string;
  filename: string;
}> {
  // Validate file type
  if (
    !isValidFile(
      file.originalname,
      file.mimetype,
      uploadType
    )
  ) {
    throw new ValidationError(
      `Unsupported file type: ${file.originalname}`
    );
  }

  // Validate size
  const maxSize = getMaxFileSize(uploadType);

  if (file.size > maxSize) {
    throw new ValidationError(
      `File exceeds maximum size of ${
        maxSize / 1024 / 1024
      }MB`
    );
  }

  const ext = path.extname(file.originalname).toLowerCase();

  // Random filename with original extension
  const filename = `${randomUUID()}${ext}`;

  const folder = CLOUDINARY_FOLDER_CONFIG[uploadType];

  // PDF → raw, everything else → image
  const resourceType =
    ext === ".pdf" ? "raw" : "image";

  // PDF keeps extension in public_id
  // Images keep existing behavior (extension removed)
  const publicId =
    ext === ".pdf"
      ? filename
      : filename.replace(ext, "");

  const result = await uploadBufferToCloudinary(
    file.buffer,
    {
      folder,
      public_id: publicId,
      resource_type: resourceType,

      ...(ext === ".pdf" && {
        use_filename: true,
        unique_filename: false,
      }),
    }
  );

  return {
    fileUrl: result.secure_url,
    filename,
  };
}

// =========================
// DELETE FILE FROM CLOUDINARY
// =========================

export async function deleteUploadedFile(
  fileUrl: string
): Promise<void> {
  try {
    const url = new URL(fileUrl);

    const pathname = url.pathname;

    // Remove:
    // /image/upload/
    // /raw/upload/
    const uploadIndex = pathname.indexOf("/upload/");

    if (uploadIndex === -1) {
      console.error(
        "Invalid Cloudinary URL:",
        fileUrl
      );
      return;
    }

  let publicId = pathname
    .substring(uploadIndex + "/upload/".length)
    .split("?")[0] ?? "";

    // Remove version segment:
    // v123456789/
    publicId = publicId.replace(
      /^v\d+\//,
      ""
    );

    // Decode URL-encoded characters
    publicId = decodeURIComponent(publicId);

    const extension = path.extname(publicId);

    if (extension) {
      publicId = publicId.slice(
        0,
        -extension.length
      );
    }

    const resourceType = url.pathname.includes(
      "/raw/upload/"
    )
      ? "raw"
      : "image";

    await cloudinary.uploader.destroy(
      publicId,
      {
        resource_type: resourceType,
        invalidate: true,
      }
    );
  } catch (error) {
    console.error(
      "Failed to delete Cloudinary file:",
      fileUrl,
      error
    );
  }
}