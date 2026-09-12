import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { randomUUID } from "crypto";
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
// DIRECTORY & URL CONFIG
// =========================

const UPLOAD_BASE = path.resolve(process.cwd(), "uploads");

const UPLOAD_CONFIG: Record<UploadType, { dir: string; urlPath: string }> = {
  projectImage: {
    dir: path.join(UPLOAD_BASE, "projects", "images"),
    urlPath: "/uploads/projects/images",
  },
  cv: {
    dir: path.join(UPLOAD_BASE, "cv"),
    urlPath: "/uploads/cv",
  },
  certification: {
    dir: path.join(UPLOAD_BASE, "certifications"),
    urlPath: "/uploads/certifications",
  },
  certificationIssuer: {
    dir: path.join(UPLOAD_BASE, "certifications", "issuer"),
    urlPath: "/uploads/certifications/issuer",
  },
  achievementIcon: {
    dir: path.join(UPLOAD_BASE, "achievements", "icon"),
    urlPath: "/uploads/achievements/icon",
  },
  skillIcon: {
    dir: path.join(UPLOAD_BASE, "skill"),
    urlPath: "/uploads/skill",
  },
  experienceIcon: {
    dir: path.join(UPLOAD_BASE, "experience"),
    urlPath: "/uploads/experience",
  },
  profilePic: {
    dir: path.join(UPLOAD_BASE, "profile", "pic"),
    urlPath: "/uploads/profile/pic",
  },
};

// =========================
// FILE LIMITS & EXTENSIONS
// =========================

const ALLOWED_IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp"];
const ALLOWED_PDF_EXTS = [".pdf"];
const ALLOWED_SVG_EXTS = [".svg"];

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_PDF_SIZE = 10 * 1024 * 1024;   // 10 MB
const MAX_ICON_SIZE = 10 * 1024 * 1024;  // 10 MB

function getMaxFileSize(uploadType: UploadType): number {
  if (uploadType === "projectImage" || uploadType === "profilePic") return MAX_IMAGE_SIZE;
  if (
    ["certificationIssuer", "achievementIcon", "skillIcon", "experienceIcon"].includes(uploadType)
  ) {
    return MAX_ICON_SIZE;
  }
  return MAX_PDF_SIZE;
}

// =========================
// FILE VALIDATION HELPER
// =========================

function isValidFile(filename: string, mimetype: string, uploadType: UploadType): boolean {
  const ext = path.extname(filename).toLowerCase();

  switch (uploadType) {
    case "projectImage":
    case "profilePic":
      return (
        ALLOWED_IMAGE_EXTS.includes(ext) &&
        mimetype.startsWith("image/") || mimetype === "application/octet-stream"
      );

    case "cv":
    case "certification":
      return (
        ALLOWED_PDF_EXTS.includes(ext) &&
        (mimetype === "application/pdf" || mimetype === "application/octet-stream")
      );

    case "certificationIssuer":
    case "achievementIcon":
    case "skillIcon":
    case "experienceIcon":
      // ✅ ACCEPTS BOTH PNG/JPG/WEBP AND SVG
      return (
        [...ALLOWED_IMAGE_EXTS, ...ALLOWED_SVG_EXTS].includes(ext) &&
        (mimetype.startsWith("image/") || mimetype === "application/octet-stream")
      );

    default:
      return false;
  }
}

// =========================
// MULTER MIDDLEWARES
// =========================

const storage = multer.memoryStorage();

export function createUploadMiddleware(uploadType: UploadType) {
  return multer({
    storage,
    fileFilter: (_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
      
      if (!isValidFile(file.originalname, file.mimetype, uploadType)) {
        return cb(new ValidationError(`Unsupported file type: ${file.originalname}`));
      }
      cb(null, true);
    },
    limits: {
      fileSize: getMaxFileSize(uploadType),
      files: 1,
    },
  });
}

// Single File Middlewares
export const projectImageUpload = createUploadMiddleware("projectImage");
export const cvUpload = createUploadMiddleware("cv");
export const certificationUpload = createUploadMiddleware("certification");
export const certificationIssuerUpload = createUploadMiddleware("certificationIssuer");
export const achievementIconUpload = createUploadMiddleware("achievementIcon");
export const skillIconUpload = createUploadMiddleware("skillIcon");
export const experienceIconUpload = createUploadMiddleware("experienceIcon");
export const profilePicUpload = createUploadMiddleware("profilePic");

// Combined Certification Upload Middleware
export const certificationFilesUpload = multer({
  storage,
  fileFilter: (_req: any, file: any, cb: any) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowed = [...ALLOWED_PDF_EXTS, ...ALLOWED_SVG_EXTS, ...ALLOWED_IMAGE_EXTS];

    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new ValidationError(`Unsupported file type: ${file.originalname}`));
    }
  },
  limits: { fileSize: MAX_PDF_SIZE, files: 2 },
}).fields([
  { name: "certificate", maxCount: 1 },
  { name: "issuerIcon", maxCount: 1 },
]);

// Combined Profile Upload Middleware (CV + Profile Picture)
export const profileFilesUpload = multer({
  storage,
  fileFilter: (_req: any, file: any, cb: any) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowed = [...ALLOWED_PDF_EXTS, ...ALLOWED_IMAGE_EXTS];

    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new ValidationError(`Unsupported file type: ${file.originalname}`));
    }
  },
  limits: { 
    fileSize: MAX_IMAGE_SIZE, 
    files: 2 
  },
}).fields([
  { name: "cv", maxCount: 1 },
  { name: "profilePic", maxCount: 1 },
]);

// =========================
// SAVE FILE LOCALLY
// =========================

export async function saveUploadedFile(
  file: Express.Multer.File,
  uploadType: UploadType
): Promise<{ fileUrl: string; filename: string }> {
  // Validate file type
  if (!isValidFile(file.originalname, file.mimetype, uploadType)) {
    throw new ValidationError(`Unsupported file type: ${file.originalname}`);
  }

  // Validate size
  const maxSize = getMaxFileSize(uploadType);
  if (file.size > maxSize) {
    throw new ValidationError(`File exceeds maximum size of ${maxSize / 1024 / 1024}MB`);
  }

  const ext = path.extname(file.originalname).toLowerCase();
  const filename = `${randomUUID()}${ext}`;
  const { dir, urlPath } = UPLOAD_CONFIG[uploadType];

  // Ensure target directory exists
  await fs.mkdir(dir, { recursive: true });

  // Save file to disk
  const filePath = path.join(dir, filename);
  await fs.writeFile(filePath, file.buffer);

  return {
    fileUrl: `${urlPath}/${filename}`,
    filename,
  };
}

// =========================
// DELETE FILE
// =========================

export async function deleteUploadedFile(fileUrl: string): Promise<void> {
  try {
    const filePath = path.resolve(process.cwd(), fileUrl.replace(/^\//, ""));
    await fs.unlink(filePath);
  } catch (error: any) {
    if (error?.code !== "ENOENT") {
      console.error("Failed to delete uploaded file:", fileUrl, error);
    }
  }
}